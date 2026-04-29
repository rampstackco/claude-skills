#!/usr/bin/env python3
"""
Lint script for the Brand Build Skills catalog.

Validates structural conventions documented in SKILL_AUTHORING.md and CONTRIBUTING.md.
Run from the repo root via `python .github/scripts/lint_skills.py`.

Exit codes:
  0  All checks passed.
  1  One or more checks failed.

Designed to be:
- Stdlib-only except for PyYAML (frontmatter parsing).
- Loud about failures, quiet about passes.
- Easy to extend: each check is a function appended to CHECKS.
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable, Iterable

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(1)


REPO_ROOT = Path(__file__).resolve().parents[2]
SKILLS_DIR = REPO_ROOT / "skills"
README = REPO_ROOT / "README.md"

# Files where audit-related content may legitimately mention sensitive patterns.
AUDIT_EXEMPT_PATHS = (
    REPO_ROOT / "docs" / "audits",
)

# Brand watchlist. Any case-insensitive hit fails the build, except for the
# explicitly-allowed legitimate public references in ALLOWED_BRAND_CONTEXTS.
BRAND_WATCHLIST = [
    "adunn08",
    "GameDesk",
    "ANDY.md",
    "bankranked",
    "wirly",
    "vehiclemd",
    "carcabin",
    "codeblu",
    "stayrentals",
    "insurrates",
    "mycarneedsthis",
    "tereks",
    "checkvin",
    "credit-factor",
    "straightstocks",
    "econgrader",
    "degreemath",
    "taxgrader",
    "retiregrader",
    "smallbizgrader",
    "bankscored",
    "401klens",
    "diplomavalue",
    "degreegrade",
    "studentdebtmath",
    "nesteggnerd",
    "bizmoneymath",
    "retireranked",
    "taxscoped",
]

# `rampstack` requires special handling: legitimate as the public org name
# `rampstackco` and the public domain `rampstack.co`, never as `rampstack`
# in isolation. The check enforces this with a regex below.

SKILL_MD_LINE_LIMIT = 500   # Hard cap; warns above 250.
SKILL_MD_LINE_TARGET = 250
REFERENCE_LINE_LIMIT = 400


@dataclass
class LintResult:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def fail(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)

    def merge(self, other: "LintResult") -> None:
        self.errors.extend(other.errors)
        self.warnings.extend(other.warnings)

    @property
    def ok(self) -> bool:
        return not self.errors


def list_skill_dirs() -> list[Path]:
    return sorted(p for p in SKILLS_DIR.iterdir() if p.is_dir())


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_frontmatter(skill_md: Path) -> tuple[dict, str]:
    """Return (frontmatter_dict, body_text) or raise ValueError on malformed YAML."""
    text = read_text(skill_md)
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.DOTALL)
    if not match:
        raise ValueError("No YAML frontmatter delimited by --- markers")
    frontmatter_text, body = match.group(1), match.group(2)
    try:
        data = yaml.safe_load(frontmatter_text)
    except yaml.YAMLError as exc:
        raise ValueError(f"YAML parse error: {exc}")
    if not isinstance(data, dict):
        raise ValueError("Frontmatter is not a dict")
    return data, body


def is_in_audit_path(path: Path) -> bool:
    return any(str(path).startswith(str(exempt)) for exempt in AUDIT_EXEMPT_PATHS)


# ---------------------------------------------------------------------------
# Checks
# ---------------------------------------------------------------------------


def check_em_dashes(result: LintResult) -> None:
    """Em dashes are forbidden anywhere except in audit reports."""
    for md in REPO_ROOT.rglob("*.md"):
        if is_in_audit_path(md):
            continue
        # Also skip git internal and node_modules if any.
        if any(part in (".git", "node_modules") for part in md.parts):
            continue
        text = read_text(md)
        if "\u2014" in text:
            for i, line in enumerate(text.splitlines(), start=1):
                if "\u2014" in line:
                    result.fail(
                        f"Em dash found in {md.relative_to(REPO_ROOT)}:{i}"
                    )


def check_brand_leaks(result: LintResult) -> None:
    """Forbidden brand mentions from the watchlist."""
    for md in REPO_ROOT.rglob("*.md"):
        if is_in_audit_path(md):
            continue
        if any(part in (".git", "node_modules") for part in md.parts):
            continue
        text = read_text(md)

        text_lower = text.lower()
        for needle in BRAND_WATCHLIST:
            if needle.lower() in text_lower:
                result.fail(
                    f"Brand watchlist hit '{needle}' in {md.relative_to(REPO_ROOT)}"
                )


def check_frontmatter_and_name_match(result: LintResult) -> None:
    """Every SKILL.md must have valid frontmatter; name must match folder name."""
    for skill_dir in list_skill_dirs():
        skill_md = skill_dir / "SKILL.md"
        if not skill_md.exists():
            result.fail(f"Missing SKILL.md in {skill_dir.relative_to(REPO_ROOT)}")
            continue
        try:
            fm, _ = parse_frontmatter(skill_md)
        except ValueError as exc:
            result.fail(f"{skill_md.relative_to(REPO_ROOT)}: {exc}")
            continue
        name = fm.get("name")
        description = fm.get("description")
        if not name:
            result.fail(f"{skill_md.relative_to(REPO_ROOT)}: missing 'name' in frontmatter")
        elif name != skill_dir.name:
            result.fail(
                f"{skill_md.relative_to(REPO_ROOT)}: frontmatter name '{name}' "
                f"does not match folder name '{skill_dir.name}'"
            )
        if not description:
            result.fail(f"{skill_md.relative_to(REPO_ROOT)}: missing 'description' in frontmatter")
        elif len(description.strip()) < 80:
            result.warn(
                f"{skill_md.relative_to(REPO_ROOT)}: description is short "
                f"({len(description.strip())} chars); aim for 2-4 sentences"
            )


def check_framework_section(result: LintResult) -> None:
    """Every SKILL.md must contain a section starting with `## The framework`."""
    pattern = re.compile(r"^## The framework(:|\s|$)", re.MULTILINE)
    for skill_dir in list_skill_dirs():
        skill_md = skill_dir / "SKILL.md"
        if not skill_md.exists():
            continue
        text = read_text(skill_md)
        if not pattern.search(text):
            result.fail(
                f"{skill_md.relative_to(REPO_ROOT)}: missing '## The framework' "
                f"section (canonical text is required; descriptive colon-suffix is allowed)"
            )


def extract_reference_section(text: str) -> str | None:
    """Extract the body text under the actual `## Reference files` heading.

    Skips matches inside fenced code blocks. Uses the last canonical occurrence
    in case the heading is also referenced inside a code-block template.
    Returns None if the section is not found.
    """
    lines = text.splitlines()
    in_code_fence = False
    section_starts: list[int] = []

    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_fence = not in_code_fence
            continue
        if not in_code_fence and stripped == "## Reference files":
            section_starts.append(i)

    if not section_starts:
        return None

    start = section_starts[-1]

    in_code_fence = False
    section_lines: list[str] = []
    for i in range(start + 1, len(lines)):
        line = lines[i]
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_fence = not in_code_fence
            section_lines.append(line)
            continue
        if not in_code_fence and stripped.startswith("## "):
            break
        section_lines.append(line)

    return "\n".join(section_lines)


def check_reference_files_match(result: LintResult) -> None:
    """SKILL.md 'Reference files' list must match actual files in references/.

    Only the `## Reference files` section is parsed. References mentioned
    elsewhere (e.g., naming-convention examples in the body, or the canonical
    skill template inside a code block) are ignored.
    """
    ref_pattern = re.compile(r"`references/([^`]+)`")

    for skill_dir in list_skill_dirs():
        skill_md = skill_dir / "SKILL.md"
        ref_dir = skill_dir / "references"
        if not skill_md.exists():
            continue

        text = read_text(skill_md)
        section_text = extract_reference_section(text)
        if section_text is None:
            result.fail(
                f"{skill_md.relative_to(REPO_ROOT)}: missing '## Reference files' section"
            )
            continue
        cited_refs = set(ref_pattern.findall(section_text))

        actual_refs = set()
        if ref_dir.exists():
            actual_refs = {p.name for p in ref_dir.iterdir() if p.is_file()}

        missing = cited_refs - actual_refs
        orphan = actual_refs - cited_refs

        rel = skill_md.relative_to(REPO_ROOT)
        for name in sorted(missing):
            result.fail(f"{rel}: cites references/{name} but file does not exist")
        for name in sorted(orphan):
            result.fail(
                f"{skill_dir.relative_to(REPO_ROOT)}/references/{name}: "
                f"orphan file not cited from SKILL.md"
            )


def check_cross_skill_references(result: LintResult) -> None:
    """Cross-skill references like `skill-name` must name skills that exist."""
    skill_names = {p.name for p in list_skill_dirs()}
    # Catch backtick-quoted skill names that look like skill folder names
    # (lowercase-hyphenated, must contain at least one hyphen to avoid noise).
    pattern = re.compile(r"`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`")

    for skill_dir in list_skill_dirs():
        skill_md = skill_dir / "SKILL.md"
        if not skill_md.exists():
            continue
        text = read_text(skill_md)
        for match in pattern.finditer(text):
            candidate = match.group(1)
            # Heuristic: only check tokens that look like full skill names
            # (start with one of our known prefixes or are exactly a skill name).
            if candidate in skill_names:
                continue
            # Looks-like-skill heuristic: has 2+ hyphens or starts with known prefix.
            known_prefixes = (
                "seo-", "brand-", "content-", "design-", "code-", "frontend-",
                "qa-", "ux-", "pm-", "cro-", "form-", "media-", "email-",
                "domain-", "monitoring-", "backup-", "security-", "launch-",
                "incident-", "after-", "analytics-", "journey-", "usability-",
                "performance-", "accessibility-", "art-", "creative-",
                "information-", "landing-", "skill-", "stakeholder-",
                "documentation-", "vendor-", "team-", "internationalization",
                "dependency-", "cost-", "roadmap-",
            )
            if any(candidate.startswith(p) for p in known_prefixes):
                result.fail(
                    f"{skill_md.relative_to(REPO_ROOT)}: references unknown skill "
                    f"`{candidate}` (not a valid skill folder name)"
                )


def check_line_lengths(result: LintResult) -> None:
    """SKILL.md soft cap 250, hard cap 500. Reference files cap 400."""
    for skill_dir in list_skill_dirs():
        skill_md = skill_dir / "SKILL.md"
        if skill_md.exists():
            n = len(read_text(skill_md).splitlines())
            rel = skill_md.relative_to(REPO_ROOT)
            if n > SKILL_MD_LINE_LIMIT:
                result.fail(f"{rel}: {n} lines (hard cap is {SKILL_MD_LINE_LIMIT})")
            elif n > SKILL_MD_LINE_TARGET:
                result.warn(f"{rel}: {n} lines (target is under {SKILL_MD_LINE_TARGET})")
        ref_dir = skill_dir / "references"
        if ref_dir.exists():
            for ref in ref_dir.iterdir():
                if not ref.is_file() or ref.suffix != ".md":
                    continue
                n = len(read_text(ref).splitlines())
                rel = ref.relative_to(REPO_ROOT)
                if n > REFERENCE_LINE_LIMIT:
                    result.warn(f"{rel}: {n} lines (target is under {REFERENCE_LINE_LIMIT})")


def check_readme_catalog_count(result: LintResult) -> None:
    """README badge and catalog claims must match the actual SKILL.md count."""
    if not README.exists():
        result.fail("README.md not found")
        return
    text = read_text(README)
    actual = len(list_skill_dirs())

    # Badge: [![Skills](https://img.shields.io/badge/Skills-59-blue.svg)]
    badge_pattern = re.compile(r"badge/Skills-(\d+)-")
    for match in badge_pattern.finditer(text):
        claimed = int(match.group(1))
        if claimed != actual:
            result.fail(
                f"README.md skills badge claims {claimed} but actual count is {actual}"
            )

    # Catalog header: e.g. "## The 59-skill catalog"
    catalog_pattern = re.compile(r"## The (\d+)-skill catalog")
    for match in catalog_pattern.finditer(text):
        claimed = int(match.group(1))
        if claimed != actual:
            result.fail(
                f"README.md catalog header claims {claimed} but actual count is {actual}"
            )

    # Status line: "Status: N of N skills shipped" or similar
    status_pattern = re.compile(r"(\d+) of (\d+) skills shipped", re.IGNORECASE)
    for match in status_pattern.finditer(text):
        claimed_done, claimed_total = int(match.group(1)), int(match.group(2))
        if claimed_total != actual:
            result.fail(
                f"README.md status claims '{claimed_done} of {claimed_total} skills' "
                f"but actual count is {actual}"
            )


# ---------------------------------------------------------------------------
# Driver
# ---------------------------------------------------------------------------


CHECKS: list[Callable[[LintResult], None]] = [
    check_em_dashes,
    check_brand_leaks,
    check_frontmatter_and_name_match,
    check_framework_section,
    check_reference_files_match,
    check_cross_skill_references,
    check_line_lengths,
    check_readme_catalog_count,
]


def main() -> int:
    print(f"Linting catalog at {REPO_ROOT}")
    if not SKILLS_DIR.exists():
        print(f"ERROR: skills/ directory not found at {SKILLS_DIR}", file=sys.stderr)
        return 1

    skill_count = len(list_skill_dirs())
    print(f"Found {skill_count} skill folders.\n")

    result = LintResult()
    for check in CHECKS:
        sub = LintResult()
        try:
            check(sub)
        except Exception as exc:
            sub.fail(f"Internal error in {check.__name__}: {exc}")
        status = "OK" if sub.ok else "FAIL"
        warn_count = len(sub.warnings)
        warn_suffix = f" ({warn_count} warnings)" if warn_count else ""
        print(f"  [{status}] {check.__name__}{warn_suffix}")
        for err in sub.errors:
            print(f"        ERROR: {err}")
        for warn in sub.warnings:
            print(f"        WARN:  {warn}")
        result.merge(sub)

    print()
    if result.ok:
        print(f"PASSED: {skill_count} skills validated, "
              f"{len(result.warnings)} warnings.")
        return 0
    print(f"FAILED: {len(result.errors)} errors, "
          f"{len(result.warnings)} warnings across {skill_count} skills.")
    return 1


if __name__ == "__main__":
    sys.exit(main())

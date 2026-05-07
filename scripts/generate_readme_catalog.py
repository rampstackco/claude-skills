#!/usr/bin/env python3
"""Generate README.md catalog content from skill folder metadata.

Walks ``skills/`` and parses each ``SKILL.md`` frontmatter for the fields
``name``, ``description``, ``category``, ``catalog_summary``, and
``display_order``. Produces the README catalog section, the skill count
badge, the subtitle blockquote, the "What you get" counts, the catalog
header, the table-of-contents anchor, and the catalog intro line.

Two operating modes:

    --check  Exit 0 if README is in sync with skill metadata. Exit 2 with
             a unified diff if README is stale.
    --write  Update README.md in place between marker comments. Print a
             one-line summary on success.

Run from the repo root: ``python scripts/generate_readme_catalog.py --check``.

Markers in README.md:

    <!-- COUNT_BADGE:START -->          ... <!-- COUNT_BADGE:END -->
    <!-- COUNT_INTRO:START -->          ... <!-- COUNT_INTRO:END -->
    <!-- COUNT_WHATYOUGET:START -->     ... <!-- COUNT_WHATYOUGET:END -->
    <!-- COUNT_TOC:START -->            ... <!-- COUNT_TOC:END -->
    <!-- COUNT_CATALOG_HEADER:START --> ... <!-- COUNT_CATALOG_HEADER:END -->
    <!-- COUNT_CATALOG_INTRO:START -->  ... <!-- COUNT_CATALOG_INTRO:END -->
    <!-- CATALOG:START -->              ... <!-- CATALOG:END -->
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from difflib import unified_diff
from pathlib import Path

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(1)


REPO_ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = REPO_ROOT / "skills"
README = REPO_ROOT / "README.md"


# Canonical category order. Drives the README catalog section order and the
# allowed values for the ``category`` frontmatter field. Each tuple is
# (category_id, display_title, optional_intro_paragraph).
CATEGORIES: list[tuple[str, str, str | None]] = [
    ("strategy-and-discovery", "Strategy and discovery", None),
    ("brand", "Brand", None),
    ("design", "Design", None),
    ("content", "Content", None),
    (
        "seo-foundation",
        "SEO foundation",
        "Tool-agnostic SEO skills. These define the conceptual frameworks. "
        "The SEO audit suite below adds the Ahrefs MCP-powered execution layer.",
    ),
    (
        "seo-audit-suite",
        "SEO audit suite (Ahrefs MCP-powered)",
        "End-to-end SEO audit workflows that pull data from the Ahrefs MCP "
        "and produce concrete deliverables. These skills assume the Ahrefs "
        "MCP is connected.",
    ),
    ("product", "Product", None),
    ("development", "Development", None),
    ("qa", "Quality assurance", None),
    ("operations", "Operations", None),
    ("growth", "Growth", None),
    (
        "growth-tooling",
        "Growth tooling",
        "Interactive web tools that turn visitors into leads. Lead "
        "magnets, calculators, quizzes, multi-step forms, chatbots, "
        "and the cross-tool funnel architecture that orchestrates them.",
    ),
    (
        "marketing",
        "Marketing",
        "Paid media discipline: strategy, creative, and performance "
        "analytics. Pairs with the paid media platforms in the "
        "/integrations catalog at rampstack.co.",
    ),
    ("research", "Research", None),
    ("cross-cutting", "Cross-cutting workflows", None),
    ("process-and-team", "Process and team", None),
]
CATEGORY_IDS = {cid for cid, _, _ in CATEGORIES}


MARKERS = [
    "COUNT_INTRO",
    "COUNT_WHATYOUGET",
    "COUNT_TOC",
    "COUNT_CATALOG_HEADER",
    "COUNT_CATALOG_INTRO",
    "CATALOG",
]


@dataclass(frozen=True)
class Skill:
    slug: str
    name: str
    description: str
    category: str
    catalog_summary: str
    display_order: int | None


def parse_frontmatter(skill_md: Path) -> dict:
    """Read SKILL.md and return its YAML frontmatter as a dict."""
    text = skill_md.read_text(encoding="utf-8")
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.DOTALL)
    if not match:
        raise ValueError(f"{skill_md}: no YAML frontmatter delimited by --- markers")
    data = yaml.safe_load(match.group(1))
    if not isinstance(data, dict):
        raise ValueError(f"{skill_md}: frontmatter is not a YAML dict")
    return data


def load_skills() -> list[Skill]:
    """Walk SKILLS_DIR and return validated Skill records.

    Raises SystemExit with a list of validation errors if any skill is
    missing required fields or has an unknown category.
    """
    skills: list[Skill] = []
    errors: list[str] = []
    for entry in sorted(SKILLS_DIR.iterdir()):
        if not entry.is_dir():
            continue
        skill_md = entry / "SKILL.md"
        if not skill_md.exists():
            continue
        try:
            fm = parse_frontmatter(skill_md)
        except ValueError as exc:
            errors.append(str(exc))
            continue
        name = fm.get("name")
        description = fm.get("description")
        category = fm.get("category")
        catalog_summary = fm.get("catalog_summary")
        display_order = fm.get("display_order")
        missing = [
            label
            for label, value in (
                ("name", name),
                ("description", description),
                ("category", category),
                ("catalog_summary", catalog_summary),
            )
            if not value
        ]
        if missing:
            errors.append(
                f"{entry.name}: missing frontmatter fields: {', '.join(missing)}"
            )
            continue
        if category not in CATEGORY_IDS:
            allowed = ", ".join(sorted(CATEGORY_IDS))
            errors.append(
                f"{entry.name}: unknown category '{category}'. "
                f"Allowed values: {allowed}"
            )
            continue
        skills.append(
            Skill(
                slug=entry.name,
                name=str(name),
                description=str(description),
                category=str(category),
                catalog_summary=str(catalog_summary),
                display_order=int(display_order) if display_order is not None else None,
            )
        )
    if errors:
        raise SystemExit("Skill frontmatter validation failed:\n  " + "\n  ".join(errors))
    return skills


def group_by_category(skills: list[Skill]) -> dict[str, list[Skill]]:
    """Bucket skills by category id and sort within each bucket.

    Sort key: (display_order ascending, slug ascending). Skills without a
    display_order sort to the end alphabetically.
    """
    grouped: dict[str, list[Skill]] = {cid: [] for cid, _, _ in CATEGORIES}
    for skill in skills:
        grouped[skill.category].append(skill)
    sentinel = 10_000
    for items in grouped.values():
        items.sort(
            key=lambda s: (s.display_order if s.display_order is not None else sentinel, s.slug)
        )
    return grouped


def count_reference_files() -> int:
    """Count files under any skills/*/references/ directory."""
    total = 0
    for entry in sorted(SKILLS_DIR.iterdir()):
        if not entry.is_dir():
            continue
        ref_dir = entry / "references"
        if not ref_dir.exists():
            continue
        for ref in ref_dir.iterdir():
            if ref.is_file():
                total += 1
    return total


def generate_catalog(grouped: dict[str, list[Skill]]) -> str:
    """Build the full catalog markdown block: section headers and tables."""
    lines: list[str] = []
    counter = 0
    for index, (cid, title, intro) in enumerate(CATEGORIES):
        items = grouped.get(cid, [])
        lines.append(f"### {title} ({len(items)})")
        lines.append("")
        if intro:
            lines.append(intro)
            lines.append("")
        lines.append("| # | Skill | What it does |")
        lines.append("|---|---|---|")
        for skill in items:
            counter += 1
            lines.append(
                f"| {counter} | [`{skill.slug}`](skills/{skill.slug}/SKILL.md) | "
                f"{skill.catalog_summary} |"
            )
        if index < len(CATEGORIES) - 1:
            lines.append("")
    return "\n".join(lines)


def generate_badge(total: int) -> str:
    return f"[![Skills](https://img.shields.io/badge/Skills-{total}-blue.svg)](#the-{total}-skill-catalog)"


def generate_intro_blockquote(total: int) -> str:
    return (
        f"> {total} stack-agnostic skills covering brand, design, content, "
        "SEO, dev, ops, growth, and research. Includes an Ahrefs MCP-powered "
        "SEO audit suite. Use them on Next.js, WordPress, Shopify, Webflow, "
        "plain HTML, or anything else."
    )


def generate_whatyouget(total: int, ref_total: int, cat_total: int) -> str:
    return (
        f"- **{total} skills** across {cat_total} categories, every one "
        "with a complete `SKILL.md` and at least one reference file\n"
        f"- **{ref_total} reference files** (templates, checklists, decision "
        "matrices, worked examples)"
    )


def generate_toc_link(total: int) -> str:
    return f"- [The {total}-skill catalog](#the-{total}-skill-catalog)"


def generate_catalog_header(total: int) -> str:
    return f"## The {total}-skill catalog"


def generate_catalog_intro(total: int) -> str:
    return (
        f"All {total} skills are shipped. Each has a complete SKILL.md "
        "plus at least one reference file (template, checklist, or playbook)."
    )


def replace_block(text: str, marker: str, new_content: str) -> str:
    """Replace the body between a START/END marker pair.

    The replacement body is sandwiched by single newlines, producing::

        <!-- MARKER:START -->
        {new_content}
        <!-- MARKER:END -->
    """
    pattern = re.compile(
        rf"(<!-- {re.escape(marker)}:START -->)(.*?)(<!-- {re.escape(marker)}:END -->)",
        re.DOTALL,
    )
    matches = list(pattern.finditer(text))
    if not matches:
        raise ValueError(f"Marker pair '{marker}' not found in README.md")
    if len(matches) > 1:
        raise ValueError(f"Marker pair '{marker}' appears more than once in README.md")
    replacement = f"\\1\n{new_content}\n\\3"
    return pattern.sub(replacement, text, count=1)


def replace_badge_count(text: str, total: int) -> str:
    """Substitute the skill count in the Skills badge markdown.

    The badge sits inline inside a centered div alongside other badges.
    A line that begins with an HTML comment triggers CommonMark's HTML
    block (type 2) parsing, which prevents inline markdown from being
    parsed on that line. Wrapping the badge with marker comments breaks
    the badge rendering. Anchor on the unique full-badge markdown
    pattern instead, so the substitution touches only the badge in the
    centered div and leaves the TOC link and catalog header (which
    have their own marker-based substitution) alone.
    """
    badge_pattern = re.compile(
        r"\[!\[Skills\]\(https://img\.shields\.io/badge/Skills-(\d+)-blue\.svg\)\]"
        r"\(#the-(\d+)-skill-catalog\)"
    )
    matches = list(badge_pattern.finditer(text))
    if not matches:
        raise ValueError("Skills badge markdown pattern not found in README.md")
    if len(matches) > 1:
        raise ValueError("Skills badge markdown pattern appears more than once in README.md")
    replacement = (
        f"[![Skills](https://img.shields.io/badge/Skills-{total}-blue.svg)]"
        f"(#the-{total}-skill-catalog)"
    )
    return badge_pattern.sub(replacement, text, count=1)


def render_readme(text: str, skills: list[Skill]) -> str:
    """Apply all marker replacements and return the updated README content."""
    grouped = group_by_category(skills)
    total = len(skills)
    ref_total = count_reference_files()
    cat_total = len(CATEGORIES)
    text = replace_badge_count(text, total)
    text = replace_block(text, "COUNT_INTRO", generate_intro_blockquote(total))
    text = replace_block(
        text, "COUNT_WHATYOUGET", generate_whatyouget(total, ref_total, cat_total)
    )
    text = replace_block(text, "COUNT_TOC", generate_toc_link(total))
    text = replace_block(text, "COUNT_CATALOG_HEADER", generate_catalog_header(total))
    text = replace_block(text, "COUNT_CATALOG_INTRO", generate_catalog_intro(total))
    text = replace_block(text, "CATALOG", generate_catalog(grouped))
    return text


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate README catalog content from skill folder metadata."
    )
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--check",
        action="store_true",
        help="Exit non-zero with a diff if README is stale.",
    )
    mode.add_argument(
        "--write",
        action="store_true",
        help="Update README.md in place between marker comments.",
    )
    args = parser.parse_args()

    if not SKILLS_DIR.exists():
        print(f"ERROR: skills/ directory not found at {SKILLS_DIR}", file=sys.stderr)
        return 1

    try:
        skills = load_skills()
    except SystemExit as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    current = README.read_text(encoding="utf-8")
    try:
        updated = render_readme(current, skills)
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    if args.check:
        if current == updated:
            return 0
        diff = unified_diff(
            current.splitlines(keepends=True),
            updated.splitlines(keepends=True),
            fromfile="README.md (current)",
            tofile="README.md (generated)",
        )
        sys.stdout.writelines(diff)
        print(
            "\nREADME catalog is stale. "
            "Run: python scripts/generate_readme_catalog.py --write"
        )
        return 2

    README.write_text(updated, encoding="utf-8")
    ref_total = count_reference_files()
    print(
        f"Updated {len(MARKERS)} sections in README.md, "
        f"{len(skills)} skills, {ref_total} reference files"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

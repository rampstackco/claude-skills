#!/usr/bin/env python3
r"""One-shot script for the cross-linking pass.

Convert plain-text mentions of ``references/X.md`` and ``SKILL.md`` into
markdown links so readers can navigate between SKILL.md and reference
files in rendered markdown (GitHub web view, README catalog).

Patterns handled:

1. In every ``skills/*/SKILL.md``, replace inline-code mentions
   ``\`references/X.md\`` that are NOT already part of a markdown link
   with ``[\`references/X.md\`](references/X.md)``.

2. In every ``skills/*/references/*.md``, replace plain-text mentions
   of ``SKILL.md`` that are NOT already part of a markdown link with
   ``[SKILL.md](../SKILL.md)``.

The ``skill-template.md`` template file is skipped for the SKILL.md
substitution because its mentions are templating instructions, not
references to a sibling SKILL.md.

Run from the repo root: ``python scripts/crosslink_pass.py``.

Idempotent: running twice produces the same result as running once.
Reports counts so the result can be diffed.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = REPO_ROOT / "skills"

# Files to skip for the SKILL.md -> [SKILL.md](../SKILL.md) substitution.
# The template file's mentions are templating instructions, not references.
SKIP_SKILL_LINK_FILES = {
    SKILLS_DIR / "skill-creation-walkthrough" / "references" / "skill-template.md",
}

# Pattern 1: ``\`references/X.md\`` that's NOT already preceded by ``[`` (which
# would mean it's the link text inside ``[\`references/X.md\`](references/X.md)``).
REF_INLINE_CODE_RE = re.compile(
    r"(?<!\[)`(references/[a-z][a-z0-9-]*\.md)`"
)

# Pattern 2: bare ``SKILL.md`` (not inline code, not a link target). Match a
# word-boundary before so we don't catch ``MYSKILL.md``. Skip mentions inside
# inline code spans (between backticks) and existing links.
SKILL_BARE_RE = re.compile(
    r"(?<![`/\[\w-])SKILL\.md(?!\)|`)"
)


def link_references_in_skill_md(text: str) -> tuple[str, int]:
    """Replace inline-code reference paths with markdown links."""
    count = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal count
        path = match.group(1)
        count += 1
        return f"[`{path}`]({path})"

    return REF_INLINE_CODE_RE.sub(replace, text), count


def link_skill_md_in_reference(text: str) -> tuple[str, int]:
    """Replace bare SKILL.md mentions with markdown links."""
    count = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal count
        count += 1
        return "[SKILL.md](../SKILL.md)"

    return SKILL_BARE_RE.sub(replace, text), count


def main() -> int:
    if not SKILLS_DIR.exists():
        print(f"ERROR: {SKILLS_DIR} not found", file=sys.stderr)
        return 1

    skill_md_changes = 0
    skill_md_files_touched = 0
    skill_md_total = 0
    ref_changes = 0
    ref_files_touched = 0
    ref_total = 0

    for skill_dir in sorted(SKILLS_DIR.iterdir()):
        if not skill_dir.is_dir():
            continue

        # Pattern 1: SKILL.md
        skill_md_path = skill_dir / "SKILL.md"
        if skill_md_path.exists():
            skill_md_total += 1
            text = skill_md_path.read_text(encoding="utf-8")
            new_text, count = link_references_in_skill_md(text)
            if new_text != text:
                skill_md_path.write_text(new_text, encoding="utf-8")
                skill_md_files_touched += 1
                skill_md_changes += count

        # Pattern 2: references/*.md
        ref_dir = skill_dir / "references"
        if ref_dir.exists():
            for ref_path in sorted(ref_dir.iterdir()):
                if not ref_path.is_file() or ref_path.suffix != ".md":
                    continue
                ref_total += 1
                if ref_path in SKIP_SKILL_LINK_FILES:
                    continue
                text = ref_path.read_text(encoding="utf-8")
                new_text, count = link_skill_md_in_reference(text)
                if new_text != text:
                    ref_path.write_text(new_text, encoding="utf-8")
                    ref_files_touched += 1
                    ref_changes += count

    print(
        f"SKILL.md pass: {skill_md_changes} replacements across "
        f"{skill_md_files_touched} of {skill_md_total} files"
    )
    print(
        f"references pass: {ref_changes} replacements across "
        f"{ref_files_touched} of {ref_total} files"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

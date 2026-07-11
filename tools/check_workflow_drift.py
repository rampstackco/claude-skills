#!/usr/bin/env python3
"""Drift check: every skill slug a workflow binds must exist in SKILLS.lock.

The authoring contract binds skills by SLUG on each phase's `Skills:` line
(the Run block then invokes those same slugs in prose). This check reads those
lines, extracts the bound slugs, and asserts each is a real skill in
SKILLS.lock. It is the operate-time twin of the catalog's authoring-time
verification: a workflow that names a skill the catalog does not have would
silently fail to run, so the reference is caught here instead.

Two bare words appear on `Skills:` lines as authoring markers rather than
slugs: `none` (a phase that is deliberately a human judgment stop) and
`routing` (a phase that routes to other workflows). They are listed explicitly
so a genuine typo is still caught rather than waved through.

Usage:
  python tools/check_workflow_drift.py     # exit 1 on any unknown slug
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORKFLOWS_DIR = ROOT / "workflows"
LOCK_PATH = ROOT / "SKILLS.lock"

SKILLS_LINE = re.compile(r"^Skills:\s*(.*)$", re.MULTILINE)
SLUG_SHAPE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

# Bare words used on Skills: lines as authoring markers, not skill slugs.
NON_SKILL_MARKERS = {"none", "routing"}


def bound_slugs(text: str):
    """Yield the skill slugs a workflow file binds on its Skills: lines."""
    for m in SKILLS_LINE.finditer(text):
        value = m.group(1)
        # The slug list ends at the first parenthetical note or semicolon.
        for cut in ("(", ";"):
            idx = value.find(cut)
            if idx != -1:
                value = value[:idx]
        for token in value.split(","):
            token = token.strip()
            if not token or " " in token:
                continue
            yield token


def main() -> int:
    if not LOCK_PATH.exists():
        print("SKILLS.lock is missing; cannot run the drift check.")
        return 1
    known = set(json.loads(LOCK_PATH.read_text(encoding="utf-8")).keys())

    checked = set()
    unknown = []
    for path in sorted(WORKFLOWS_DIR.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        for token in bound_slugs(text):
            if token in NON_SKILL_MARKERS:
                continue
            if not SLUG_SHAPE.match(token):
                unknown.append((path.name, token, "not slug-shaped"))
                continue
            checked.add(token)
            if token not in known:
                unknown.append((path.name, token, "not in SKILLS.lock"))

    print(f"Checked {len(checked)} distinct slugs against SKILLS.lock:")
    for slug in sorted(checked):
        print(f"  {slug}")
    if unknown:
        print("\nDRIFT:")
        for name, token, why in unknown:
            print(f"  {name}: '{token}' {why}")
        return 1
    print("\nNo drift: every bound slug exists in SKILLS.lock.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

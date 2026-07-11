#!/usr/bin/env python3
"""Generate or verify WORKFLOWS.lock, the canonical manifest of workflow files.

A workflow file is any Markdown file in workflows/ whose opening fenced block
declares both a slug and a status. The tier docs (README.md, CONNECTORS.md,
AGREEMENT-LOG.md) have no such block and are skipped. WORKFLOWS.lock is the
count source for the tier; no count is hand-typed anywhere.

Usage:
  python tools/gen_workflows_lock.py           # write WORKFLOWS.lock
  python tools/gen_workflows_lock.py --check    # verify, exit 1 on drift
"""
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORKFLOWS_DIR = ROOT / "workflows"
LOCK_PATH = ROOT / "WORKFLOWS.lock"

FENCE = re.compile(r"```(.*?)```", re.DOTALL)
SLUG = re.compile(r"^slug:\s*(\S+)\s*$", re.MULTILINE)
STATUS = re.compile(r"^status:\s*(\S+)\s*$", re.MULTILINE)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def parse_workflow(path: Path):
    """Return (slug, status) if the file is a workflow, else None."""
    text = path.read_text(encoding="utf-8")
    fence = FENCE.search(text)
    if not fence:
        return None
    block = fence.group(1)
    slug = SLUG.search(block)
    status = STATUS.search(block)
    if not slug or not status:
        return None
    return slug.group(1), status.group(1)


def build_manifest() -> dict:
    manifest = {}
    for path in sorted(WORKFLOWS_DIR.glob("*.md")):
        parsed = parse_workflow(path)
        if parsed is None:
            continue
        slug, status = parsed
        if slug != path.stem:
            raise SystemExit(
                f"{path.name}: declared slug '{slug}' does not match filename stem "
                f"'{path.stem}'. Fix one so the manifest key is unambiguous."
            )
        manifest[slug] = {
            "file": path.name,
            "sha256": sha256(path.read_bytes()),
            "status": status,
        }
    return manifest


def main() -> int:
    manifest = build_manifest()
    serialized = json.dumps(manifest, indent=2, sort_keys=True) + "\n"
    # Compare and write as bytes with LF newlines so the lock is byte-stable
    # across platforms; text mode on Windows would emit CRLF and break --check
    # on a Linux runner.
    payload = serialized.encode("utf-8")
    if "--check" in sys.argv:
        if not LOCK_PATH.exists():
            print("WORKFLOWS.lock is missing. Run tools/gen_workflows_lock.py.")
            return 1
        if LOCK_PATH.read_bytes() != payload:
            print("WORKFLOWS.lock is out of date. Regenerate and commit it.")
            return 1
        print(f"WORKFLOWS.lock is current ({len(manifest)} workflows).")
        return 0
    LOCK_PATH.write_bytes(payload)
    print(f"Wrote WORKFLOWS.lock with {len(manifest)} workflows.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

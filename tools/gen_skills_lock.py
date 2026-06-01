#!/usr/bin/env python3
"""Generate or verify SKILLS.lock, a checksum manifest of every skill file.

Usage:
  python tools/gen_skills_lock.py          # write SKILLS.lock
  python tools/gen_skills_lock.py --check   # verify, exit 1 on drift
"""
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = ROOT / "skills"
LOCK_PATH = ROOT / "SKILLS.lock"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()


def build_manifest() -> dict:
    manifest = {}
    for skill_dir in sorted(p for p in SKILLS_DIR.iterdir() if p.is_dir()):
        files = {}
        for f in sorted(skill_dir.rglob("*")):
            if f.is_file():
                rel = f.relative_to(skill_dir).as_posix()
                files[rel] = sha256(f)
        manifest[skill_dir.name] = files
    return manifest


def main() -> int:
    manifest = build_manifest()
    serialized = json.dumps(manifest, indent=2, sort_keys=True) + "\n"
    if "--check" in sys.argv:
        if not LOCK_PATH.exists():
            print("SKILLS.lock is missing. Run tools/gen_skills_lock.py.")
            return 1
        if LOCK_PATH.read_text() != serialized:
            print("SKILLS.lock is out of date. Regenerate and commit it.")
            return 1
        print("SKILLS.lock is current.")
        return 0
    LOCK_PATH.write_text(serialized)
    print(f"Wrote SKILLS.lock with {len(manifest)} skills.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

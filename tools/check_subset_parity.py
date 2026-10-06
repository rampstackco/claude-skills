#!/usr/bin/env python3
"""Drift check: every subset repo's skills must be byte-identical to this catalog.

claude-skills-pm, -seo and -starter ship copies of skills from this repo.
Nothing told them when a skill changed here, so all three drifted for months
(#111, #112, #113, #115 and #116 never reached them). Each subset runs its own
parity check on push and pull_request, but those only fire when the subset
changes, and drift starts here. This check is the scheduled half: it reads
each subset's main and compares the git blob SHA of every SKILL.md and every
file under references/ against this checkout, in both directions. A file that
differs, a file missing in the subset, and a file the subset has that this
catalog does not all fail, listed per repo and per file.

Only the skills a subset holds are compared. Per-skill README.md files are out
of scope on purpose: they are generated here from openaddict.com and are not
copied to the subsets.

claude-skills-widgets is not listed: it holds patterns and components, no
skills, so there is nothing to compare.

Each subset is read with two public calls (main to a commit, then that
commit's tree). GITHUB_TOKEN is sent when set, only to lift the rate limit;
the subsets are public, so the result does not depend on it.

Usage:
  python tools/check_subset_parity.py
  python tools/check_subset_parity.py --fixture PATH   # read subset trees from
                                                        # a JSON file, not the API

Exit codes:
  0  Every subset matches this catalog.
  1  One or more subset files differ, are missing, or are extra.
  2  A subset could not be read (network, rate limit, truncated tree).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = ROOT / "skills"
API = "https://api.github.com"
USER_AGENT = "claude-skills subset-parity check"
SUBSETS = [
    "rampstackco/claude-skills-pm",
    "rampstackco/claude-skills-seo",
    "rampstackco/claude-skills-starter",
]
SUBSET_REF = "main"


def get_json(url: str) -> dict:
    headers = {"User-Agent": USER_AGENT, "Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def in_scope(rel: str) -> bool:
    """SKILL.md and everything under references/, relative to a skill folder."""
    return rel == "SKILL.md" or rel.startswith("references/")


def blob_sha(path: Path) -> str:
    """The git blob SHA of a working-tree file, as git would store it.

    .gitattributes keeps the working tree LF; CRLF is still folded so a
    checkout made without that policy cannot false-fail.
    """
    data = path.read_bytes().replace(b"\r\n", b"\n")
    return hashlib.sha1(b"blob %d\0" % len(data) + data).hexdigest()


def catalog_files(skill_names: set[str]) -> dict[str, str]:
    files = {}
    for name in sorted(skill_names):
        skill_dir = SKILLS_DIR / name
        if not skill_dir.is_dir():
            continue
        for f in sorted(skill_dir.rglob("*")):
            rel = f.relative_to(skill_dir).as_posix()
            if f.is_file() and in_scope(rel):
                files[f"{name}/{rel}"] = blob_sha(f)
    return files


def subset_tree(repo: str) -> tuple[str, list[dict]]:
    commit = get_json(f"{API}/repos/{repo}/commits/{SUBSET_REF}")["sha"]
    tree = get_json(f"{API}/repos/{repo}/git/trees/{commit}?recursive=1")
    if tree.get("truncated"):
        raise RuntimeError(
            f"{repo}@{commit} tree came back truncated; "
            "refusing to compare against a partial file list"
        )
    return commit, tree["tree"]


def subset_files(tree: list[dict]) -> dict[str, str]:
    files = {}
    for entry in tree:
        if entry["type"] != "blob" or not entry["path"].startswith("skills/"):
            continue
        parts = entry["path"].split("/", 2)
        if len(parts) == 3 and in_scope(parts[2]):
            files[f"{parts[1]}/{parts[2]}"] = entry["sha"]
    return files


def compare(subset: dict[str, str]) -> list[str]:
    skill_names = {key.split("/", 1)[0] for key in subset}
    catalog = catalog_files(skill_names)
    problems = []
    for key in sorted(set(subset) | set(catalog)):
        if key not in catalog:
            problems.append(f"    only in subset, not here:  skills/{key}")
        elif key not in subset:
            problems.append(f"    here, missing in subset:   skills/{key}")
        elif subset[key] != catalog[key]:
            problems.append(f"    differs from this catalog: skills/{key}")
    return problems


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n", 1)[0])
    parser.add_argument(
        "--fixture",
        type=Path,
        help='JSON of {"owner/repo": {"commit": sha, "tree": [...]}} '
        "used instead of the API, for testing the check itself",
    )
    args = parser.parse_args()
    fixture = json.loads(args.fixture.read_text(encoding="utf-8")) if args.fixture else None

    failed = unreadable = 0
    for repo in SUBSETS:
        try:
            if fixture is not None:
                commit, tree = fixture[repo]["commit"], fixture[repo]["tree"]
                source = f"fixture {args.fixture.as_posix()}"
            else:
                commit, tree = subset_tree(repo)
                source = SUBSET_REF
        except (urllib.error.URLError, RuntimeError, KeyError) as error:
            print(f"{repo}: could not read {SUBSET_REF}: {error}")
            unreadable += 1
            continue

        subset = subset_files(tree)
        skills = len({key.split("/", 1)[0] for key in subset})
        problems = compare(subset)
        status = "FAILED" if problems else "PASSED"
        print(f"{repo}@{commit} ({source}): {status}, "
              f"{len(subset)} files in {skills} skills")
        if problems:
            failed += 1
            print(f"  {len(problems)} file(s) out of parity:")
            print("\n".join(problems))

    if failed:
        print(f"\n{failed} subset(s) out of parity. Sync the listed files from "
              "this repo byte-for-byte in each subset, regenerate its "
              "SKILLS.lock with tools/gen_skills_lock.py, and open a PR there.")
        return 1
    if unreadable:
        return 2
    print("\nEvery subset matches this catalog.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

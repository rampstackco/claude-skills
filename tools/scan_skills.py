#!/usr/bin/env python3
"""Heuristic safety scan for skill files. Flags known-risky patterns.

Usage:
  python tools/scan_skills.py [path ...]   # scans given files, or all skills

Prints findings. Exit code is always 0; this is advisory, not a gate.
Promote to a blocking check only after baselining against the full catalog.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = ROOT / "skills"
SCRIPT_SUFFIXES = {".py", ".js", ".ts", ".mjs", ".cjs", ".sh", ".bash"}

SCRIPT_RULES = [
    ("HIGH", "shell or subprocess execution",
     re.compile(r"\b(subprocess|os\.system|child_process|spawn|popen)\b|"
                r"\b(bash|sh)\s+-c\b")),
    ("HIGH", "dynamic code execution", re.compile(r"\b(eval|exec)\s*\(")),
    ("HIGH", "environment or secret access",
     re.compile(r"os\.environ|process\.env|getenv|id_rsa|"
                r"\.aws/credentials|ANTHROPIC_API_KEY")),
    ("HIGH", "network egress",
     re.compile(r"\b(curl|wget)\b|requests\.|urllib|httpx|fetch\(|axios|"
                r"socket\.")),
]
MARKDOWN_RULES = [
    ("MEDIUM", "instruction override / injection phrasing",
     re.compile(r"ignore (the |all )?(previous|prior|above)|"
                r"disregard (the |your )?(instructions|system)|exfiltrat",
                re.IGNORECASE)),
    ("MEDIUM", "references agent memory or config files",
     re.compile(r"\b(MEMORY\.md|SOUL\.md|CLAUDE\.md)\b|~/\.claude|"
                r"\.claude/settings", re.IGNORECASE)),
    ("LOW", "instructs running shell on activation",
     re.compile(r"run (this )?(command|script|shell)|execute the following",
                re.IGNORECASE)),
]


def targets(args):
    if args:
        return [Path(a) for a in args if Path(a).is_file()]
    return [p for p in SKILLS_DIR.rglob("*") if p.is_file()]


def scan_file(path):
    findings = []
    try:
        text = path.read_text(errors="ignore")
    except OSError:
        return findings
    rules = SCRIPT_RULES if path.suffix in SCRIPT_SUFFIXES else MARKDOWN_RULES
    for severity, label, pattern in rules:
        for m in pattern.finditer(text):
            line = text[: m.start()].count("\n") + 1
            findings.append((severity, label, str(path), line))
    return findings


def main():
    all_findings = []
    for path in targets(sys.argv[1:]):
        all_findings.extend(scan_file(path))
    if not all_findings:
        print("No findings.")
        return 0
    for severity, label, path, line in sorted(all_findings):
        print(f"[{severity}] {path}:{line}  {label}")
    print(f"\n{len(all_findings)} finding(s). Advisory only. Review in context.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

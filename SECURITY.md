# Security Policy

This describes how skills in this catalog are reviewed, signed, and verified,
and how to report a security issue.

## How skills are protected

Every skill goes through the same process before it lands on `main`:

- Provenance. Changes merge through required pull requests with signed commits
  and linear history enforced on `main`, so every skill traces back to a
  verified identity.
- Integrity. Each skill and its bundled files are hashed, and the checksums are
  committed to `SKILLS.lock`. Verify a skill matches the reviewed version by
  regenerating the manifest with `python tools/gen_skills_lock.py --check`.
- Review. Before merge, each skill is checked against a documented safety
  checklist covering bundled script behavior, network calls, environment and
  secret access, instruction content, trigger scope, and writes to agent memory
  files. See CONTRIBUTING.md for the checklist.

## What this does and does not cover

This process is designed to catch known classes of unsafe skill content and to
give you a way to verify what you installed. It is not a guarantee that a skill
is free of all risk. Skills are instructions and code that run with the
permissions of your agent, so review any skill against your own environment
before use, as you would any third-party code.

## Reporting a vulnerability

Report security issues privately through GitHub's private vulnerability
reporting on this repository (Security tab, then Report a vulnerability). If you
cannot use that, email security@rampstack.co.

Include the affected skill, a description of the issue, and reproduction steps
if you have them. Do not open a public issue or PR for a security report.

## Disclosure

We aim to acknowledge a report within 3 business days and to agree a disclosure
timeline with the reporter. Security discussion stays in the private advisory
until a fix ships.

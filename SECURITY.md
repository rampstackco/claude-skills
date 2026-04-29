# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in this repository, please report it privately. Do **not** open a public GitHub issue.

### Preferred: GitHub Security Advisories

The fastest way to report is via GitHub's private vulnerability reporting:

1. Go to the [Security tab](https://github.com/rampstackco/claude-skills/security) of this repository
2. Click **Report a vulnerability**
3. Fill out the form with as much detail as possible

This keeps the report confidential while we investigate and patch.

### Alternate: email

You can also email the security team directly at **security@rampstack.co**.

When reporting, please include:

- A description of the vulnerability
- Steps to reproduce
- The potential impact
- Any suggested mitigation, if you have one
- Whether you would like public credit when the fix ships

## What to expect

- **Acknowledgment** within 3 business days
- **Initial assessment** within 7 business days, including a severity classification
- **Status updates** every 7 days while the fix is in progress
- **Public disclosure** coordinated with the reporter once a fix is available

## Scope

This repository is a library of Claude Skills (markdown files and reference documents). It contains no executable code, no servers, and no runtime. The most likely security concerns are:

- **Prompt injection vectors** in skill content that could manipulate an LLM consuming the skills against user intent
- **Sensitive information leakage** in skill content (private credentials, internal URLs, personal data)
- **Malicious links** in references or examples
- **Misleading security guidance** in skills like `security-baseline` or `code-review-web` that could cause downstream harm if followed

If you find any of the above, please report it via the channels above.

## Out of scope

The following are not security vulnerabilities for this repository:

- Issues with third-party tools recommended in skills (Ahrefs MCP, GitHub MCP, etc.). Report those to the respective vendors.
- Issues with how Claude itself handles skill content. Report those to [Anthropic](https://www.anthropic.com/security).
- General feedback or suggestions on skill quality. Use [Issues](https://github.com/rampstackco/claude-skills/issues) for those.

## Hall of fame

We thank security researchers who responsibly disclose vulnerabilities. With permission, we will list contributors who help keep this library safe in this section.

_No reports yet._

---

Thank you for helping keep this project and its users safe.

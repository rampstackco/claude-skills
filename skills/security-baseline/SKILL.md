---
name: security-baseline
description: "Establish a security baseline for a website or web app. Use this skill when configuring HTTPS and TLS, setting security headers, planning secrets management, evaluating CSP policies, doing a basic security audit, or hardening a site before launch. Triggers on security headers, HTTPS, TLS, CSP, content security policy, HSTS, secrets management, vulnerability scan, security audit, harden, OWASP, security baseline. Also triggers when a security review is required for compliance or before going live."
---

# Security Baseline

Establish the security floor for any production website or web app. Stack-agnostic. Covers the things that should be in place before public launch and verified periodically after.

---

## When to use

- Pre-launch security review
- Setting up a new site or environment
- Periodic security audit (quarterly recommended)
- Onboarding a new vendor or third-party integration
- Responding to a security finding or report
- Hardening after an incident

## When NOT to use

- Active incident response (use `incident-response`)
- Code-level security review (use `code-review-web`)
- Email-specific authentication (SPF/DKIM/DMARC) (use `email-deliverability`)
- DNS-level security (CAA, DNSSEC) (use `domain-strategy`)
- Performance-related security (DDoS protection sizing) (use `performance-optimization`)

---

## Required inputs

- The site or app in scope (URLs, environments)
- The hosting platform and CDN
- Authentication method (if any)
- Third-party scripts and integrations
- Compliance context (PCI, SOC2, GDPR, etc., if applicable)
- Existing security tooling

---

## The framework: 6 layers

Security is layered. Each layer addresses a different attack surface.

### Layer 1: Transport security

How data moves from server to client.

- HTTPS everywhere. No HTTP variants serving content.
- TLS 1.2 minimum, TLS 1.3 preferred. Disable TLS 1.0 and 1.1.
- HSTS (Strict-Transport-Security) header set, with `includeSubDomains` and `preload` for high-confidence sites.
- Strong cipher suites only. Modern browsers handle this if you pick a modern config from your provider.
- Certificates from a trusted CA, monitored for expiration.

### Layer 2: Response headers

What the browser is told about your site.

| Header | Purpose | Default value |
|---|---|---|
| `Strict-Transport-Security` | Force HTTPS | `max-age=31536000; includeSubDomains` |
| `Content-Security-Policy` | Restrict resource loading | Site-specific |
| `X-Content-Type-Options` | Prevent MIME sniffing | `nosniff` |
| `X-Frame-Options` | Clickjacking protection | `DENY` or `SAMEORIGIN` |
| `Referrer-Policy` | Control referrer info | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Control browser features | Site-specific (camera, mic, etc.) |
| `Cross-Origin-Opener-Policy` | Process isolation | `same-origin` (where compatible) |
| `Cross-Origin-Embedder-Policy` | Cross-origin restrictions | `require-corp` (where applicable) |

CSP deserves its own attention. See the framework section below.

### Layer 3: Authentication and authorization

How users prove who they are and what they can do.

- Strong password requirements (length over complexity rules; allow long passphrases)
- Account lockout or rate limiting on login
- 2FA available, required for admin accounts
- Session tokens: short-lived, secure, HttpOnly cookies
- Logout invalidates tokens server-side, not just client-side
- Password reset flows that don't reveal account existence
- Authorization checked on every request (don't rely on UI hiding)

### Layer 4: Input handling

How untrusted input is processed.

- Validate on the server (client validation is UX, not security)
- Parameterized queries for any database access (no string concatenation into SQL)
- Output encoding by context (HTML, JS, URL, CSS)
- File upload restrictions (type, size, location, scanning)
- Rate limiting on endpoints that could be abused
- CSRF tokens on state-changing requests

### Layer 5: Secrets management

Where credentials and keys live.

- No secrets in code, config files in repos, or environment variables baked into images
- Secrets in a dedicated secrets manager
- Different secrets per environment (no shared dev/prod secrets)
- Rotation schedule documented and followed
- Audit log of secret access
- Limited blast radius (each service has its own credentials, scoped narrowly)

### Layer 6: Operational security

How the team operates.

- Access controls reviewed quarterly (offboard immediately on departure)
- 2FA enforced on every admin account (hosting, DNS, registrar, code host, deploy tools)
- Audit logs enabled and reviewed
- Vulnerability scanning (dependencies, containers, infrastructure)
- Patch cadence defined
- Incident response runbook exists (see `incident-response`)
- Backups exist and are tested (see `backup-and-disaster-recovery`)
- Security contact published (security.txt at /.well-known/security.txt)

---

## Content Security Policy

CSP is the most powerful response header and the most often misconfigured. Worth its own treatment.

### What CSP does

CSP tells the browser which sources are allowed for various resource types: scripts, styles, images, frames, connections, etc. A strict CSP prevents most XSS attacks even when input handling has bugs.

### Two flavors

**Strict CSP (recommended):** uses `nonce-` or `hash-` based source allowlists. Inline scripts must be explicitly allowed via nonce.

```
Content-Security-Policy: script-src 'self' 'nonce-{random}' 'strict-dynamic'; object-src 'none'; base-uri 'self';
```

**Allowlist CSP (legacy):** lists allowed domains. Easier to set up, much weaker.

```
Content-Security-Policy: script-src 'self' https://trusted.com; ...
```

Strict CSP requires application changes (every inline script needs a nonce). The investment pays off.

### Roll out CSP gradually

1. Start with `Content-Security-Policy-Report-Only` to log violations without blocking.
2. Set up a violation report endpoint.
3. Watch for legitimate violations (third-party scripts, inline handlers).
4. Tune the policy.
5. Switch to enforcing mode once violations are mostly false positives.
6. Continue monitoring violation reports for new issues.

### Common CSP mistakes

- `unsafe-inline` in script-src. Defeats most of CSP's value.
- `unsafe-eval` in script-src. Often required by older libraries; refactor or replace.
- Wildcard sources (`*`). Defeats the policy.
- Allowing CDNs that host arbitrary user content. Attackers can upload scripts to the CDN.
- Not restricting `frame-ancestors`. Use this for clickjacking defense (more flexible than `X-Frame-Options`).

---

## Workflow

### Step 1: Run a baseline scan

Use a free scanner: securityheaders.com, observatory.mozilla.org. Get a current grade. This is the floor.

### Step 2: Inventory the surface

- Domains and subdomains in scope
- Public endpoints (forms, APIs)
- Authentication entry points
- Admin interfaces
- Third-party integrations and their permissions

### Step 3: Audit each layer

Walk the 6 layers. For each, document:
- What's in place
- What's missing
- Risk level (high, medium, low)

### Step 4: Prioritize

High risk, easy fixes go first:
- HSTS not set
- Default headers missing
- Admin without 2FA
- Old TLS versions enabled

Medium risk, medium fixes next:
- CSP rollout
- Input validation gaps
- Secret management improvements

Low risk, nice-to-haves last:
- Permissions-Policy refinements
- Optional headers (Cross-Origin-* family)

### Step 5: Implement and verify

For each fix:
- Make the change
- Test in a non-production environment
- Verify with a scanner
- Roll out
- Re-verify in production

### Step 6: Set up monitoring

- Certificate expiration alerts
- CSP violation reporting
- Failed login monitoring
- Unusual admin activity alerts
- Dependency vulnerability alerts (Dependabot, Snyk, or equivalent)

### Step 7: Document the baseline

Write a security baseline document. It says what's expected on every site:
- Required headers
- Required configurations
- Required practices

New sites get audited against this. Existing sites get re-audited periodically.

### Step 8: Schedule review

Quarterly is the floor. Add reviews after major changes or incidents.

---

## Common compliance touchpoints

Not legal advice. Surfaces where security baseline meets compliance requirements:

- **PCI DSS** (if handling payment cards): much more involved than baseline. The baseline is a starting point, not sufficient.
- **SOC 2:** baseline aligns with most CC controls (CC6 series). Documented baseline plus evidence of execution is the audit ask.
- **GDPR / privacy regs:** baseline supports security obligations (Article 32). Privacy is broader than security.
- **HIPAA, HITRUST, FedRAMP:** baseline is necessary, far from sufficient. Get specialized help.

When compliance applies, the baseline is necessary but not the full answer.

---

## Failure patterns

**HSTS without `includeSubDomains`.** Attacker tricks browser into HTTP on a subdomain you haven't HTTPS'd yet.

**HSTS preload without commitment.** Once preloaded, removing it takes weeks. Don't preload until HTTPS is solid across all subdomains forever.

**CSP with `unsafe-inline`.** Defeats most of CSP. Either go strict (nonce-based) or accept that CSP is providing limited protection.

**Default headers missing.** `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` are easy and free. Set them.

**Admin without 2FA.** The single most common high-impact vulnerability across small teams. Fix today.

**Secrets in environment variables baked into images.** Anyone with image access has the secrets. Use a runtime secret manager.

**No security.txt.** Researchers find issues; they need somewhere to report. Publish a security.txt at /.well-known/security.txt.

**Old TLS versions enabled.** Disable TLS 1.0 and 1.1. Most providers offer this as a checkbox.

**CDN allowing arbitrary inline scripts via misconfigured CSP.** The CDN proxies user content; attackers leverage that. Audit the CSP against actual loaded resources.

**No incident response plan.** When (not if) something happens, no runbook = chaos. See `incident-response`.

**Vulnerability scanning without remediation.** Reports pile up. The scan is theater unless someone fixes findings.

**Penetration test ignored.** Pen test report sits on a shelf. Test results without remediation are worse than no test.

---

## Output format

A security baseline document includes:

- **Inventory:** what's in scope
- **Layer-by-layer status:** what's in place, what's missing
- **Required headers:** with values, applied per environment
- **Required configurations:** TLS, secrets, auth
- **Required operational practices:** access reviews, patch cadence, audit logging
- **Findings:** prioritized list of gaps
- **Remediation plan:** owners, dates
- **Re-audit cadence:** when this is reviewed next

---

## Reference files

- `references/headers-checklist.md`: A copy-paste checklist of recommended security headers with example values, organized by tier of importance.

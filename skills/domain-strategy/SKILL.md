---
name: domain-strategy
description: "Plan, manage, and optimize a domain portfolio. Use this skill for DNS architecture decisions, redirect strategies, registrar choice, parking unused domains, multi-site setups, and domain consolidation or split planning. Triggers on DNS, domain, registrar, redirect, parking, subdomain, apex, www vs non-www, multi-site, portfolio, hreflang setup, domain migration. Also triggers when planning a new site that needs domain decisions made before launch."
---

# Domain Strategy

Decide how domains, subdomains, and DNS work across a portfolio. Stack-agnostic. Works for one site or one hundred.

---

## When to use

- Setting up DNS for a new site (apex vs www, primary vs aliases)
- Choosing or switching registrars
- Planning redirects across multiple domains (parked, retired, consolidated)
- Deciding subdomain vs subfolder vs separate domain for a new product line
- Consolidating multiple sites into one
- Splitting one site into multiple
- Setting up DNS for email, security records, third-party services

## When NOT to use

- Migrating content between platforms with URL changes (use `content-migration`)
- Email authentication setup specifically (use `email-deliverability`)
- Security headers or HTTPS config (use `security-baseline`)
- Internationalization domain choices (use `internationalization`)

---

## Required inputs

- Current domain inventory (every domain you own or operate)
- Status of each (live, parked, redirected, retired)
- Strategic role of each (primary brand, sub-brand, defensive registration, campaign)
- Current DNS provider and registrar for each
- Email and third-party service dependencies

---

## The framework: 5 decisions

Every domain decision falls into one of these buckets. Address them in order.

### Decision 1: Apex vs www as canonical

Pick one. Redirect the other to it. Pick before launch. Changing later is painful.

- **Apex (example.com):** cleaner, more memorable, the modern default.
- **www (www.example.com):** historically standard, easier to add CDN-level CNAME records (apex CNAME is technically forbidden but most providers offer ALIAS or ANAME).

Whichever you pick, the other must 301 to it. Both serving content is duplicate content and a soft signal of poor setup.

### Decision 2: Subdomain vs subfolder vs separate domain

For a new product, blog, or content section:

| Pattern | Use when |
|---|---|
| Subfolder (`example.com/blog`) | Same brand, want SEO equity to flow, default choice |
| Subdomain (`blog.example.com`) | Different stack or platform, organizationally separate but related |
| Separate domain (`exampleblog.com`) | Different brand, different audience, intentional separation |

Default to subfolder. The case for subdomain or separate domain has to be made.

### Decision 3: Registrar strategy

The registrar is where the domain is registered. The DNS provider is where DNS records live. They can be the same or different.

Decisions:
- **Single registrar vs multiple:** single is simpler. Multiple makes sense for redundancy at scale.
- **Lock and 2FA:** non-negotiable. Domain hijacking is real and costly.
- **Auto-renew:** on for everything you care about. Off only for intentional drops.
- **WHOIS privacy:** on by default. Free at most modern registrars.
- **Transfer lock:** on except during planned transfers.

### Decision 4: DNS provider

The DNS provider controls how domains resolve. Critical for performance, reliability, and security.

Pick a provider that gives you:
- Fast global resolution (anycast network)
- DNSSEC support
- API access for automation
- Reasonable record limits
- Good audit logs

Default DNS records every domain needs:
- A or AAAA records (or CNAME) for the apex and www
- MX records (even just nullified if no email)
- TXT for domain verification, SPF
- CAA records (locks down which certificate authorities can issue certs for the domain)

### Decision 5: Parked domain strategy

Domains you own but aren't actively using. Three valid strategies:

1. **Redirect to a primary site.** Best for defensively registered domains close to your main brand. 301 every path to the primary's homepage or matching path.
2. **Hold blank.** A simple page or DNS NXDOMAIN. Acceptable for domains you may use later.
3. **Park with a landing page.** Generic "coming soon" page. Lowest value. Avoid registrar default parking pages (often serve ads against your brand).

Anti-pattern: letting parked domains serve duplicate or near-duplicate content from your main site. This is an SEO liability.

---

## Workflow

### Step 1: Inventory

Pull every domain you own from every registrar. Build a single sheet:

| Domain | Registrar | DNS provider | Status | Role | Renewal date | Notes |
|---|---|---|---|---|---|---|

If you can't account for every domain, the strategy can't be accurate.

### Step 2: Classify by role

Each domain gets one role:
- **Primary** (the main site for a brand)
- **Alias** (redirects to a primary)
- **Defensive** (registered to prevent others from getting it; usually parked)
- **Campaign** (short-term, specific use)
- **Retired** (no longer active; either drop at expiry or redirect permanently)

The classification drives the configuration.

### Step 3: Audit current configuration

For each domain check:
- Is the canonical (apex vs www) consistent with the strategy?
- Are redirects 301 (permanent) where intended?
- Is HTTPS enforced on every variant?
- Are DNS records minimal and intentional?
- Is the registrar locked?
- Is auto-renew on?
- Is 2FA on the registrar account?

Document gaps. Each gap is a ticket.

### Step 4: Set the canonical pattern

For new domains and any that need fixing:

- Pick apex or www as canonical
- Configure 301 redirect for the non-canonical
- Force HTTPS for both
- Verify with curl: `curl -I http://example.com`, `curl -I http://www.example.com`, `curl -I https://www.example.com`. All should chain to a single 200 on the canonical.

### Step 5: Document the redirect map

Across the portfolio, document every redirect:

| Source | Destination | Type | Reason | Date set |
|---|---|---|---|---|

This is invaluable when something breaks or when planning consolidations.

### Step 6: Set up monitoring

Monitor:
- DNS resolution (alert on NXDOMAIN or wrong IP)
- HTTPS certificate expiration (alert at 30, 14, 7 days out)
- Redirect chains (alert if a 301 starts returning 200 or 404)
- Renewal dates (alert at 90, 30, 7 days out)

This is the bridge between domain strategy and `monitoring-and-alerting`.

### Step 7: Document and revisit

Domain strategy is a quarterly review topic. Renewals, consolidations, and new launches change the picture. Without scheduled review, the portfolio drifts.

---

## Failure patterns

**Both apex and www serve content.** Duplicate content. Pick one, redirect the other.

**302 redirects where 301 was intended.** 302 is temporary. 301 is permanent. SEO equity passes through 301, not (reliably) through 302.

**HTTPS not enforced.** HTTP variant serving content alongside HTTPS. Force HTTPS at the edge or the load balancer.

**Registrar default parking pages.** Parked domains serving registrar ads. Free for the registrar, bad for you. Replace with a redirect or your own page.

**Domains in multiple registrars by accident.** Migrations that didn't fully complete. Consolidate.

**No CAA records.** Anyone with a misconfigured ACME client can issue a cert for your domain. CAA limits which CAs can issue. Add it.

**Auto-renew off "to save money."** Domain accidentally drops, gets snapped up, costs ten times more (or is unrecoverable). Auto-renew is cheap insurance.

**Subdomains used where subfolders would have been better.** SEO equity gets fragmented across hostnames. The case for a subdomain has to be made; the default is subfolder.

**Parked domains with thin content "for SEO."** Search engines don't reward this. They penalize doorway pages. Either redirect or leave blank.

---

## Output format

A domain strategy document includes:

- **Inventory:** the spreadsheet of every domain
- **Classification:** the role of each
- **Canonical decisions:** apex vs www, locked
- **Redirect map:** every redirect in the portfolio
- **DNS standards:** the default record set
- **Registrar standards:** locked, 2FA, auto-renew
- **Monitoring:** what's watched, where alerts go
- **Renewal calendar:** the next 12 months
- **Review cadence:** when this gets revisited

---

## Reference files

- `references/dns-record-reference.md`: Common DNS records explained, with the syntax for the most useful ones (A, AAAA, CNAME, MX, TXT, CAA, SRV, etc.) and when each is needed.

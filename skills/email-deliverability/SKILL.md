---
name: email-deliverability
description: "Make sure email actually reaches inboxes. Use this skill when setting up email authentication (SPF, DKIM, DMARC), diagnosing emails landing in spam, planning a domain reputation strategy, monitoring sender reputation, or hardening against email spoofing. Triggers on email deliverability, SPF, DKIM, DMARC, spam folder, sender reputation, mailbox provider, soft bounces, bounce rate, BIMI, MTA-STS, deliverability audit. Also triggers when a marketing or transactional email isn't reaching users."
---

# Email Deliverability

Get email into inboxes, not spam folders. Set up authentication. Monitor reputation. Diagnose problems before they hurt the business.

---

## When to use

- Setting up email for a new domain
- A meaningful percentage of email is going to spam
- Customers report they're not receiving emails
- Setting up DMARC, SPF, or DKIM
- Hardening against domain spoofing
- Migrating email service providers
- Sender reputation has dropped
- Pre-launch audit before sending volume increases

## When NOT to use

- Writing the email content itself (use `email-sequences`)
- Designing the email program strategy (use `email-sequences`)
- DNS records in general (use `domain-strategy`)
- Outbound spam coming FROM your account (different problem; investigate compromised credentials)

---

## Required inputs

- The sending domain(s)
- The email service provider (ESP, transactional service, mail server)
- Current DNS records (or access to them)
- Email volume (transactional vs marketing, daily volume)
- Current deliverability state (if known: bounce rate, spam complaints)

---

## The framework: 3 pillars

Email deliverability rests on three pillars. Weakness in any one limits the others.

### Pillar 1: Authentication

Mailbox providers verify email is actually from who it claims to be from. Three records.

**SPF (Sender Policy Framework)**

Lists which servers are authorized to send mail for the domain. Published as a TXT record at the apex.

```
v=spf1 include:_spf.mailprovider.com -all
```

- `include:` adds another sender's authorized list
- `-all` (hard fail): mail from unlisted senders fails authentication
- `~all` (soft fail): unlisted senders are suspicious but pass; useful during rollout
- `+all`: never use; allows anyone to send

Only one SPF record per domain. Multiple SPF records break SPF entirely. Combine senders into a single record.

SPF has a 10-DNS-lookup limit. Each `include:` may use multiple lookups. Hit the limit and SPF stops working. Watch this carefully.

**DKIM (DomainKeys Identified Mail)**

A cryptographic signature on each outgoing email. The mail server signs with a private key; the public key is published in DNS.

```
selector1._domainkey.example.com    TXT    "v=DKIM1; k=rsa; p=MIGfMA0G..."
```

Selectors differ by ESP. Some use `default._domainkey`, some use unique selectors per service. Most ESPs walk you through publishing the records.

DKIM proves the message wasn't modified in transit and that the sender controls the domain.

**DMARC (Domain-based Message Authentication, Reporting, and Conformance)**

The policy layer. Tells receivers what to do when SPF or DKIM fails, and where to send reports.

```
_dmarc.example.com    TXT    "v=DMARC1; p=reject; rua=mailto:dmarc-aggregate@example.com; ruf=mailto:dmarc-forensic@example.com; pct=100; adkim=s; aspf=s"
```

Components:
- `p=`: policy. `none`, `quarantine`, or `reject`.
- `rua=`: aggregate reports (daily, summary). Always set this.
- `ruf=`: forensic reports (per-message). Optional, can be high volume.
- `pct=`: percentage of failing mail subject to the policy. Useful for gradual rollout.
- `adkim=`, `aspf=`: alignment mode. `s` (strict), `r` (relaxed). Strict means From: domain must match exactly.

DMARC is the most important record. It's what makes spoofing your domain hard.

### Pillar 2: Reputation

Mailbox providers (Gmail, Outlook, Yahoo) score every sender. Reputation drives delivery.

Reputation factors:
- **Authentication pass rates** (SPF, DKIM, DMARC)
- **Engagement signals** (opens, replies, marking as not-spam)
- **Negative signals** (spam complaints, deletions without opens, blocking)
- **List hygiene** (low bounce rates, no spam traps)
- **Volume consistency** (sudden spikes look like spam)
- **Content patterns** (link reputation, attachment patterns)
- **IP and domain history**

Reputation is per (sending domain × mailbox provider). Gmail's view of you is independent of Outlook's.

### Pillar 3: List quality and engagement

Authentication and reputation rest on list quality. Bad list = bad reputation eventually.

- Only send to people who explicitly opted in
- Confirmed (double) opt-in for marketing wherever feasible
- Honor unsubscribes immediately and reliably
- Remove hard bounces immediately
- Sunset disengaged contacts (no opens in 6 months: reduce frequency or remove)
- Avoid third-party lists, scraped emails, or "purchased opt-ins"

The single biggest deliverability lever for most senders is list hygiene.

---

## Workflow

### Step 1: Audit current state

Check the current DNS records:

```bash
dig +short txt example.com
dig +short txt selector1._domainkey.example.com
dig +short txt _dmarc.example.com
```

Also check:
- Current bounce rate (target: under 2%)
- Current spam complaint rate (target: under 0.1%)
- Current open rate (varies by industry; falling trend is a warning)
- Current sending volume

Tools: mxtoolbox.com, dmarcian.com, mail-tester.com (for individual messages).

### Step 2: Fix authentication

If any of SPF, DKIM, DMARC is missing or misconfigured, fix first.

**SPF fix order:**
1. Identify all legitimate senders (transactional ESP, marketing ESP, support tools, etc.)
2. Get the `include:` value or IP for each
3. Combine into a single SPF record
4. Verify lookup count is under 10
5. Use `-all` for hard fail (or `~all` if rolling out gradually)

**DKIM fix order:**
1. Generate a new selector per sending service
2. Publish the public key in DNS
3. Configure the ESP to sign with the private key
4. Verify with a test send (check headers for `dkim=pass`)

**DMARC fix order:**
1. Publish DMARC with `p=none` initially (monitoring mode)
2. Set up an aggregate report endpoint (use a DMARC analytics service or your own)
3. Watch reports for at least 2-4 weeks
4. Identify any legitimate senders failing alignment; fix them
5. Move to `p=quarantine` with `pct=10`, gradually increase
6. Move to `p=reject` once confidence is high

The full progression typically takes 2-3 months. Rushing causes legitimate mail to bounce.

### Step 3: Set up monitoring

Ongoing visibility:

- **DMARC aggregate reports**: parsed daily. Watch for new sources, alignment failures, volume changes.
- **Bounce rate**: per ESP dashboard. Target under 2% for transactional, under 5% for marketing.
- **Spam complaint rate**: target under 0.1%.
- **Reputation tools**: Google Postmaster Tools (free), Microsoft SNDS, Talos, Sender Score.
- **Blacklist monitoring**: most ESPs include this; otherwise mxtoolbox.com or hetrixtools.com.

### Step 4: Address list hygiene

- Remove hard bounces from your sending lists immediately (most ESPs do this; verify)
- Set up suppression lists (unsubscribes, manual blocks, deliverability sinkholes)
- Sunset disengaged contacts (re-engagement campaigns or just remove)
- Review opt-in flows: do people know what they're signing up for?

### Step 5: Content and pattern audit

If reputation is good and authentication passes, check content:

- HTML-only emails (no plain-text alternative) raise flags
- Heavy image-to-text ratios raise flags
- Suspicious link patterns (bare IPs, URL shorteners, hijacked domains)
- Specific spam-trigger words in subject lines (less important than it used to be, still real)
- Lots of mismatched domains in URLs
- Generic from-name like "info@" rather than a real-sounding sender

### Step 6: Plan for growth

Email volume affects reputation. Sudden spikes look like spam.

- Warm up new sending IPs gradually (start at 50/day, 2x daily)
- Warm up new domains gradually (similar pattern)
- Spread sends throughout the day
- Don't switch ESPs the week before a big launch

### Step 7: Set up BIMI (optional but valuable)

BIMI (Brand Indicators for Message Identification) shows your logo next to authenticated emails in supporting clients (Gmail, Apple Mail, Yahoo, others).

Requires:
- DMARC at `p=quarantine` or `p=reject` (so this comes after the DMARC progression)
- A trademarked logo as an SVG (specific format requirements)
- A Verified Mark Certificate (VMC) from a CA, for Gmail and others
- A `_bimi` DNS record pointing to the SVG and VMC

BIMI improves trust signals and engagement. Worth doing once DMARC enforcement is in place.

### Step 8: Document and revisit

Document the email architecture:
- Sending domains and subdomains
- Each ESP and what it sends
- DNS records for each
- Monitoring setup
- Escalation if deliverability degrades

Revisit quarterly or when a new ESP is added.

---

## Failure patterns

**Multiple SPF records.** Two or more SPF records on the same domain breaks SPF. Combine into one.

**SPF DNS lookup limit exceeded.** Too many `include:` directives or chained includes. Flatten or simplify.

**DMARC at `p=none` forever.** Monitoring without enforcement. Spoofing remains easy. Move to enforcement.

**DMARC at `p=reject` too quickly.** Legitimate mail bounces because alignment wasn't verified. Use the gradual rollout.

**Sending from a different domain than the From: address.** Causes alignment failures. Fix the From: domain or ensure proper alignment.

**Using a shared ESP IP without ESP-specific configuration.** Some ESPs don't sign with your DKIM by default; the signature is the ESP's, not yours. Configure custom DKIM.

**Sending from a domain that also sends marketing.** A spam complaint on a marketing email hurts transactional deliverability. Use a subdomain for transactional (`transactional.example.com`) or marketing (`mail.example.com`).

**No bounce monitoring.** Hard bounces accumulate, reputation tanks, deliverability cliff-falls. Monitor.

**Bought lists or scraped contacts.** Spam traps in those lists destroy reputation. Don't.

**No double opt-in for marketing.** Single opt-in lets bots and typos onto the list. Bots generate spam complaints, destroy reputation.

**Ignoring DMARC reports.** Reports show problems early. Set up a parser. Look weekly.

**Treating "marked as not-spam" as the goal.** The goal is to never land in spam in the first place. Once reputation is bad, recovery takes months.

---

## Output format

A deliverability audit document includes:

- **Domain inventory:** every sending domain
- **Authentication status:** SPF, DKIM, DMARC per domain
- **Sender inventory:** every ESP or service that sends mail, what's configured
- **Reputation status:** per major mailbox provider where measurable
- **List hygiene:** bounce rate, complaint rate, opt-in process
- **Findings:** prioritized issues
- **Roadmap:** SPF/DKIM/DMARC fixes, BIMI plan, monitoring plan
- **Monitoring setup:** what's watched, where alerts go

---

## Reference files

- `references/dmarc-rollout-playbook.md`: Step-by-step for moving from no DMARC to `p=reject`, with timing, monitoring, and how to handle problems found along the way.

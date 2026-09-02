# DMARC Rollout Playbook

A staged, low-risk path from no DMARC to full `p=reject` enforcement. Typical duration: 2-3 months. Rushing breaks things.

---

## Why DMARC matters

Without DMARC at enforcement, anyone can send email claiming to be from your domain. Phishing campaigns can spoof your brand to your customers, your investors, your own employees.

DMARC at `p=reject` means mailbox providers will reject mail that fails authentication. The spoofing attacks fail.

The goal of this playbook: get to `p=reject` without losing legitimate mail.

---

## Prerequisites

Before starting:

- [ ] SPF is published, single record, under 10 lookups
- [ ] DKIM is published, every legitimate sender signs with your domain's key
- [ ] You have a DMARC report destination (a parsing service or your own endpoint)
- [ ] You have access to make DNS changes
- [ ] You know who is responsible for fixing email-related issues

If any of these are missing, fix them first. DMARC enforcement on top of broken SPF or DKIM means losing legitimate mail.

---

## Stage 1: Monitor (Week 1-2)

### Goal
Discover every legitimate sender of mail from your domain. Many will be unexpected.

### Action

Publish DMARC at `p=none`:

```
v=DMARC1; p=none; rua=mailto:dmarc-aggregate@example.com; pct=100; adkim=r; aspf=r
```

Notes:
- `p=none`: no enforcement; mailbox providers report but take no action
- `rua=`: where aggregate reports go. Use a DMARC analytics service or your own endpoint
- `adkim=r`, `aspf=r`: relaxed alignment (less strict; eases initial rollout)

### What to watch

Aggregate reports start arriving from major mailbox providers within 24-48 hours. Reports are XML, daily, summarized.

Look for:
- Every IP and sender sending mail "From: yourdomain"
- Pass/fail rates for SPF and DKIM
- Volume per sender
- Unexpected senders (often: a marketing tool, a customer support tool, a forgotten old service)

### Common discoveries

- Marketing ESP signing with their domain, not yours
- Internal tools sending email through unauthorized servers
- Help desk forwarding mail in a way that breaks alignment
- A SaaS notification service no one remembered
- Compromised accounts (rare but real)
- Spoofers trying to phish

### Exit criteria

- All legitimate senders identified
- All legitimate senders pass SPF or DKIM (ideally both)
- The volume of failing legitimate mail is well understood

---

## Stage 2: Quarantine 10% (Week 3-4)

### Goal
Begin enforcement on a small percentage. Watch for legitimate mail being affected.

### Action

Update DMARC to:

```
v=DMARC1; p=quarantine; pct=10; rua=mailto:dmarc-aggregate@example.com; adkim=r; aspf=r
```

Now 10% of failing mail goes to spam at supporting providers. 90% still passes through.

### What to watch

- Aggregate reports continuing to flow
- Customer reports of legitimate mail in spam
- Internal complaints (your own team is often the canary)

### What to do if problems

If a known-legitimate sender starts having mail quarantined:

1. Identify the sender and the failure (SPF? DKIM? Alignment?)
2. Fix the sender (add to SPF, configure DKIM, fix alignment)
3. Verify the fix in subsequent reports
4. Continue

If an unknown legitimate sender starts having mail quarantined:

1. Investigate. Is this real legitimate use? (Internal tool? New SaaS?)
2. If yes, fix the authentication for it
3. If no, this is the spoofing DMARC is meant to stop

### Exit criteria

- Reports show no legitimate mail being quarantined
- Sustained for at least one week with no surprises

---

## Stage 3: Quarantine 100% (Week 5-6)

### Goal
Enforce quarantine for all failing mail. Build confidence before reject.

### Action

```
v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-aggregate@example.com; adkim=r; aspf=r
```

### What to watch

Same as Stage 2 but expect higher volume of spam-foldered mail. Most should be illegitimate.

### Exit criteria

- No legitimate mail quarantined for at least one week
- Spoofing volume in reports is clearly visible (this is what DMARC is catching)

---

## Stage 4: Reject 10% (Week 7-8)

### Goal
Start rejecting failing mail. Fail-mode is harder than quarantine; legitimate mail that fails is bounced, not delivered to spam.

### Action

```
v=DMARC1; p=reject; pct=10; rua=mailto:dmarc-aggregate@example.com; adkim=r; aspf=r
```

10% of failing mail is rejected. The other 90% goes to quarantine (the previous policy applies).

### What to watch

- Bounce rates from your sending tools (transactional and marketing)
- Customer reports of "I never got the email"
- Reports of legitimate mail being rejected

If bounces spike, something legitimate is failing. Investigate immediately and consider rolling back.

### Exit criteria

- No spike in bounces or "didn't receive email" reports
- Sustained for at least one week

---

## Stage 5: Reject 50% (Week 9-10)

### Action

```
v=DMARC1; p=reject; pct=50; rua=mailto:dmarc-aggregate@example.com; adkim=r; aspf=r
```

### What to watch

Same as Stage 4. Legitimate failures will be more visible at higher percentage.

### Exit criteria

Same as Stage 4. No spike in legitimate mail rejection.

---

## Stage 6: Reject 100% (Week 11+)

### Goal
Full enforcement. Spoofing is now blocked.

### Action

```
v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-aggregate@example.com; adkim=r; aspf=r
```

### What to watch

Continue monitoring reports. New senders, configuration drift, and changes in the email infrastructure can introduce new failures over time.

### Maintenance

- Review reports at least weekly
- Audit sender list quarterly
- Re-verify SPF and DKIM after any infrastructure change

---

## Optional: Strict alignment

After `p=reject` is stable, consider tightening alignment:

```
v=DMARC1; p=reject; pct=100; rua=...; adkim=s; aspf=s
```

Strict alignment requires the From: domain to match exactly (not just a parent domain). This catches subdomain spoofing too.

Verify in monitoring mode (back to `p=none` with `adkim=s; aspf=s`) before enforcing.

---

## Subdomain policy

DMARC includes `sp=` for subdomain policy. Without it, subdomains inherit the main policy.

For high-security applications:

```
v=DMARC1; p=reject; sp=reject; ...
```

This rejects spoofs on subdomains too. Important for parked or unused subdomains; an attacker can pick any subdomain by default.

---

## Edge cases

### Forwarders and mailing lists

When mail is forwarded (e.g., user@oldcompany.com forwards to user@newcompany.com), SPF often fails (the forwarder is now the sender from SPF's view).

DKIM survives forwarding if the message body isn't modified. Mailing lists that modify headers or add footers can break DKIM.

Solutions:
- ARC (Authenticated Received Chain): restores authentication across forwards. Major providers support it.
- DKIM only (don't rely on SPF for DMARC alignment): if DKIM passes, DMARC passes regardless of SPF
- Mailing list software that's DMARC-aware

### Bulk transactional providers

Some providers (notification services, password reset emails) have hundreds of customers sharing IP space. Authentication usually requires custom domain setup; the default shared sending often fails alignment.

Solution: configure the provider to use your domain for DKIM and From: address. Most providers offer "custom domain" or "sender authentication" features.

### Email-on-acid testing services

If you use email testing services that "send on your behalf" but don't authenticate, those will fail. Either configure them or accept the failure (they're not user-facing).

---

## What can go wrong

**Legitimate mail starts bouncing.** Roll back to the previous stage immediately. Investigate the failure. Fix. Try again.

**Spoofing complaints rise.** Counterintuitively, after DMARC enforcement, you may see a temporary rise in complaints because spoofing that was previously delivered (silently spoofed your customers) now bounces (and the spoofer gets a bounce notification, then sometimes complains to the wrong place). This usually settles within a week.

**Volume of reports overwhelms.** Reports are voluminous from large mailbox providers. Use a DMARC analytics service rather than parsing manually.

**Forensic reports (`ruf=`) flooding.** Forensic reports include full message content of failures and can be high volume. Many use `rua=` (aggregate) only, especially after Stage 1.

---

## Tools

- **Reporting/Analytics:** Postmark, dmarcian, EasyDMARC, Valimail, Cloudflare Email Routing (free for some scenarios), or roll your own with a DMARC parser library.
- **Testing:** mxtoolbox.com, mail-tester.com, dmarcian.com.
- **Lookups:** `dig +short txt _dmarc.example.com`.

---

## Timing summary

| Stage | Policy | Duration | What you're doing |
|---|---|---|---|
| 1 | `p=none` | 1-2 weeks | Discovery |
| 2 | `p=quarantine; pct=10` | 1-2 weeks | Initial enforcement |
| 3 | `p=quarantine; pct=100` | 1-2 weeks | Full quarantine |
| 4 | `p=reject; pct=10` | 1-2 weeks | Initial rejection |
| 5 | `p=reject; pct=50` | 1-2 weeks | Half rejection |
| 6 | `p=reject; pct=100` | Ongoing | Full enforcement |

Total: 6-12 weeks. Don't shortcut. The cost of moving slowly is low; the cost of breaking legitimate mail is high.

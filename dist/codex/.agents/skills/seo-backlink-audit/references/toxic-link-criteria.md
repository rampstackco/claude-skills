# Toxic link criteria

A decision framework for classifying a backlink as toxic and worth disavowing. Bias the framework toward keeping links unless the case is clear. Disavowing legitimate links damages rankings.

---

## The disavow bar

Disavow when one or more of the following is true:

1. The site has been hit with an algorithmic devaluation that correlates with link-based signals.
2. The site has received a manual action citing unnatural links.
3. There is clear evidence of a negative SEO attack with low-quality links pointed at the property.
4. Pre-acquisition due diligence on a property reveals a known toxic profile.

Outside these cases, the default is to leave links alone. Google has stated repeatedly that they ignore most low-quality links automatically.

---

## Per-link signals (any one is concerning, multiple is decisive)

### Site-level signals

| Signal | Severity |
| --- | --- |
| Site is in a known link network | High |
| Site exists primarily to host links | High |
| Site has thin or auto-generated content | High |
| Site is on a suspect TLD pattern (mass registered) | Medium |
| Site has no organic traffic per Ahrefs estimates | Medium |
| Site is in an irrelevant language or geography | Medium |
| Site has been deindexed or penalized | High |
| Site is parked or for sale | High |
| Site has a footprint shared with many other suspect sites | High |

### Page-level signals

| Signal | Severity |
| --- | --- |
| Page is a low-effort link page or directory | Medium |
| Page has a high outbound link count with no editorial logic | Medium |
| Page is hidden from the site's main navigation | Medium |
| Page is in a foreign language with no relevance | Medium |
| Page has been hacked or is serving malware | High |

### Link-level signals

| Signal | Severity |
| --- | --- |
| Anchor text is exact-match commercial and unnatural in context | High |
| Link is in a footer with hundreds of others | Medium |
| Link is part of a sitewide footer link | Medium |
| Link is in a comment with promotional text | Low |
| Link is paid without disclosure | High |

---

## Deciding by domain versus by URL

Disavow at the domain level when:

- The entire site is suspect.
- Multiple pages from the same site link to you.
- You expect the site to keep adding links.

Disavow at the URL level when:

- Only one specific page is suspect on an otherwise legitimate site.
- The site has editorial credibility but a single contributor placed the link.

Default to domain-level disavow when in doubt. URL-level disavows are fragile: the site can move the content and the disavow no longer applies.

---

## Outreach before disavow

Disavow is a last resort. Before disavowing, attempt outreach for high-value but problematic links:

1. Find a contact (whois, contact page, social).
2. Send a polite link removal request.
3. Wait 14 days.
4. Send a follow-up.
5. If no response after 30 days, disavow.

Document outreach attempts. If a manual action review is needed later, Google requires evidence of cleanup effort beyond just a disavow file.

---

## Disavow file format

The disavow file is a plain text file submitted to Google Search Console.

Format:

```
# Disavow file for [property]
# Last updated: [date]
# Submitted: [date or pending]

# Section 1: Domain-level disavows

domain:lowqualitysite-example.com
domain:linkfarm-example.net
domain:hackedsite-example.org

# Section 2: URL-level disavows

https://otherwiselegitimate-example.com/sponsored-post-page

# Section 3: Notes for future me

# - Disavowed lowqualitysite-example.com after manual action 2024-03
# - Reviewed quarterly
```

Rules:

- One entry per line
- `domain:` prefix for domain-level
- Full URL for URL-level
- Lines starting with `#` are comments and ignored
- File must be UTF-8 plain text
- Maximum 100,000 lines or 2 MB

---

## Bulk classification heuristic

When auditing thousands of referring domains, use this triage:

### Round 1: filter obvious keepers

Mark as KEEP without further review:

- Domain Rating above a relevance-appropriate threshold and topical match
- Known media, government, education domains
- Linking from a page with organic traffic

Skip these. They are not toxic.

### Round 2: filter obvious toxics

Mark as TOXIC for further review:

- Domain Rating zero with no organic traffic
- TLDs in known spam patterns
- Domains matching known link network footprints
- Sites that link to thousands of unrelated properties

### Round 3: review the middle

The remaining domains need manual review. Apply the per-link signal table above.

Expected breakdown for a healthy profile: 80%+ keep, 5-15% review, under 5% toxic. If toxic exceeds 20%, the profile has structural problems beyond a disavow.

---

## After disavow

- Submit the file in Search Console.
- Document submission date in your audit log.
- Wait 4-8 weeks before evaluating impact.
- Recrawl can take longer for larger sites.
- Do not submit revised disavows weekly. Submit, wait, evaluate.

If a manual action was the trigger, file a reconsideration request with:

- Summary of the cleanup effort
- Evidence of outreach attempts
- The submitted disavow file
- An honest acknowledgment of the cause

---

## Common mistakes

- **Disavowing low-traffic links indiscriminately.** Most have no negative effect. Disavowing them can lose minor positive equity.
- **Disavowing competitor links by accident.** Double-check the file before submission.
- **Forgetting that disavow is reversible.** Resubmit a file without the entry to remove a disavow. Test cautiously.
- **Treating disavow as a recurring task.** It is not. Audit and submit when needed. Otherwise leave it alone.
- **Disavowing without documenting why.** Six months later you will not remember which entries were intentional.
- **Using disavow as a substitute for outreach.** For high-value links, removal is better than disavow.

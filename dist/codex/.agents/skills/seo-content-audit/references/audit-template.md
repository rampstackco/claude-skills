# Content Audit Template

Spreadsheet column definitions and report template for a site-wide content audit. The output is a per-URL decision (keep / update / merge / redirect / delete) plus a summary report for stakeholders.

---

## What this audit produces

- A spreadsheet (one row per URL) with all signals and the final decision
- A report that summarizes the decisions, the rationale, and the next-step backlog
- A roll-up of expected SEO impact and effort

---

## Required spreadsheet columns

Every row is one URL. Every column below is required.

| Column | Type | Source | Description |
|---|---|---|---|
| **URL** | Text | Crawl | Full URL |
| **Title tag** | Text | Crawl | Current `<title>` |
| **H1** | Text | Crawl | Current H1 |
| **Word count** | Number | Crawl | Body text words |
| **Publish date** | Date | CMS / inferred | Original publish date |
| **Last updated** | Date | CMS | Most recent meaningful update |
| **Page type** | Pick list | Manual / patterned URL | Article / product / category / landing / utility / legal / etc. |
| **Topic cluster** | Pick list | Manual | Which topic cluster (from content strategy) |
| **Primary query target** | Text | Manual / GSC top query | The query the page should rank for |
| **Sessions (last 90d)** | Number | Analytics | Organic sessions |
| **Conversions (last 90d)** | Number | Analytics | Goal completions attributable to this URL |
| **Top ranking position** | Number | GSC / rank tracker | Best position achieved in last 90d |
| **Average position** | Number | GSC | Average position in last 90d |
| **Impressions (last 90d)** | Number | GSC | |
| **CTR (last 90d)** | Number | GSC | |
| **Backlinks (referring domains)** | Number | Backlink tool | |
| **Internal inlinks** | Number | Crawl | Number of internal pages linking to this URL |
| **Last meaningful traffic** | Date | Analytics | Most recent month with traffic above threshold |
| **Decision** | Pick list | Manual | Keep / Update / Merge / Redirect / Delete |
| **Reasoning** | Text | Manual | One sentence per decision |
| **Action notes** | Text | Manual | What needs to happen if Update or Merge |
| **Owner** | Person | Manual | Who executes |
| **Target completion** | Date | Manual | When the action ships |
| **Status** | Pick list | Manual | Backlog / In progress / Shipped / Verified |

---

## Optional but recommended columns

| Column | Description |
|---|---|
| **Cannibalization risk** | Other URLs ranking for the same primary query. See `cannibalization-resolution.md`. |
| **Schema present** | Yes / No / Type |
| **Has index tag** | Indexable / noindex |
| **Status code** | 200 / 301 / 404 etc. (catches accidental noindex or broken pages) |
| **Time on page** | From analytics; rough engagement signal |
| **Bounce rate or scroll depth** | From analytics |
| **Current canonical** | Self / other URL |
| **Image count** | Helps identify thin pages |
| **Outbound external links** | |
| **Topic authority signal** | Original research, expert author, structured comparison, etc. - subjective but useful |

---

## The 5 decision types

### Keep

Page is performing or recently published. No action needed. Track for future audits.

**Default for:**
- Top 20% of pages by sessions
- Pages within 3 months of publish (too early to judge)
- Cornerstone pages with strong rankings or backlinks

### Update

Page is on the right topic but has decayed (rankings down, content stale, broken links, missing schema).

**Action:** add to the editorial backlog with a specific update brief. Common updates: refresh examples and dates, expand thin sections, add new H2s for related queries surfacing in GSC, improve title and meta, add schema, update screenshots and links.

### Merge

Two or more pages cover the same intent and split signals. Combine into one stronger page.

**Action:** pick the canonical winner (usually the one with more backlinks and more search visibility), redirect the loser(s) to the winner, fold the loser's unique content into the winner.

### Redirect

Page no longer relevant but has equity (backlinks, traffic, internal links) worth preserving.

**Action:** 301 redirect to the closest topical match. If no match exists, redirect to the parent category or topic hub. Avoid blanket redirects to homepage (Google often treats them as soft 404s).

### Delete

Page has no traffic, no rankings, no backlinks, no internal links pointing to it, and no strategic role.

**Action:** return 410 Gone (preferred) or 404 if 410 is not supported. Update sitemap. Remove internal links pointing to the deleted page.

### Decision tree

```
Page is performing well?
├── Yes → Keep
└── No → Page is on a relevant topic?
         ├── Yes → Page is the only one on this topic?
         │         ├── Yes → Update (refresh and expand)
         │         └── No → Merge (consolidate into stronger version)
         └── No → Page has equity (backlinks, internal links)?
                  ├── Yes → Redirect to closest topical match
                  └── No → Delete (410 Gone)
```

---

## Triage thresholds

The audit looks at hundreds or thousands of URLs. Triage thresholds let you focus.

### Performing (default Keep)

- 100+ organic sessions in last 90 days, OR
- 1+ conversions in last 90 days, OR
- 10+ referring domains, OR
- Average position 1-10 for primary query

### Decaying (default Update or Merge)

- 5-100 sessions in last 90 days
- Average position 11-50
- Last meaningful traffic 6-24 months ago

### Dormant (default Redirect or Delete)

- 0-5 sessions in last 90 days
- Average position 51+
- Last meaningful traffic 24+ months ago

These are starting points. Adjust to your site's volume.

---

## Cannibalization check

For each primary query target, group URLs targeting the same query. If 2+ URLs target the same query:

- **One ranking, one not:** the non-ranking one is a Merge or Redirect candidate.
- **Both ranking but neither in top 5:** classic split-signal case. Merge into one definitive page.
- **One ranking strong, one ranking weak:** the weak one is a Merge candidate.

For deeper diagnosis and resolution patterns, see `cannibalization-resolution.md`.

---

## Report template

The audit produces a stakeholder-readable report.

### Section 1: executive summary

- Total URLs audited
- Decisions: Keep / Update / Merge / Redirect / Delete (with counts and percentages)
- Estimated SEO impact: traffic preserved, traffic potential unlocked, traffic risk if action delayed
- Estimated effort: hours of writing, engineering URL work, design work

### Section 2: decisions by topic cluster

Per cluster: how many pages, decisions, top action items.

### Section 3: top opportunities

The 10-20 highest-leverage actions (typically Updates and Merges that protect strong rankings or unlock obvious wins).

### Section 4: risks if no action

What happens if the team does not act. Common: continued ranking decay, cannibalization that suppresses both URLs, technical risk (crawl budget), content sprawl that confuses readers.

### Section 5: backlog and sequencing

Prioritized backlog with owners and target dates. Sequence so that:

- Redirects ship first (they are mechanical and preserve equity)
- Merges ship second (combine before refreshing)
- Updates ship third (work on what remains)
- Deletes happen last (after all redirects and merges that depend on those URLs are in)

---

## Pre-audit checklist

Before running the audit:

- [ ] Analytics access granted (GA4 or equivalent)
- [ ] Search Console access granted
- [ ] Crawl tool ready (Screaming Frog, Sitebulb, or hosted equivalent)
- [ ] Backlink data source identified (Ahrefs, Semrush, GSC limited data)
- [ ] Topic clusters defined (from content strategy)
- [ ] Threshold values agreed (sessions, position, age)
- [ ] Decision authority confirmed (who can approve Delete and Merge actions)
- [ ] Implementation owner confirmed (who runs the post-decision work)

---

## Post-audit verification

After the actions ship:

- [ ] Verify all redirects resolve correctly (no chains, no loops)
- [ ] Verify all 410/404 pages return correct status
- [ ] Update sitemap to remove deleted URLs and reflect canonical changes
- [ ] Resubmit sitemap in Search Console
- [ ] Monitor the merged URLs for ranking confirmation (typically 2-8 weeks)
- [ ] Re-run a slim audit at 90 days to confirm decay was halted

---

## Sign-off

Audit produced by: [Name, date]
Decisions approved by: [Name, role, date]
Implementation owner: [Name, date]

Next audit scheduled: [Date - typically annual or after major content investment]

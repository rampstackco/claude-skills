---
name: seo-backlink-audit
description: "Audit a backlink profile using Ahrefs MCP data: profile health, anchor text distribution, toxic link identification, lost link reclamation, and gap analysis against competitors. Use this skill when reviewing backlink health, scoping a disavow project, recovering from a manual action, planning link building, or doing M&A due diligence on a property's link equity. Triggers on backlink audit, link profile, toxic links, disavow, anchor text analysis, lost links, link reclamation, referring domains, link gap. Also triggers when traffic decline correlates with link loss or when an unnatural link warning appears in Search Console."
---

# SEO Backlink Audit

Audit a backlink profile using data pulled from the Ahrefs MCP. Stack-agnostic. Produces a profile health assessment, a toxic link list (if needed), a reclamation list, and a gap analysis against competitors.

---

## When to use

- Periodic backlink health check (quarterly or biannual)
- Recovering from a Google manual action or unnatural link warning
- Scoping a disavow file
- Pre-acquisition due diligence on link equity
- Planning a link building campaign (need a baseline)
- Investigating ranking drops correlated with link loss
- Recovering lost links after a migration or replatform

## When NOT to use

- Building new links (use `seo-offpage`)
- General SEO audits (use `seo-audit-orchestration`)
- Keyword opportunity analysis (use `seo-keyword-gap-audit`)
- Technical issues unrelated to links (use `seo-site-health-audit`)

---

## Required inputs

- Target property (root domain, subdomain, or URL prefix)
- Competitor set (3-5 properties with comparable strategies)
- Time window (typically last 12-24 months)
- Confirmation Ahrefs MCP is connected and has access to the property
- Search Console manual action status (if any)
- Recent SEO history (migrations, link campaigns, penalties)

---

## The framework: 5 dimensions of a backlink profile

A profile is healthy when all five dimensions are healthy. Issues in any one can cap rankings or invite penalties.

### Dimension 1: Referring domain quality

Volume of links matters less than the quality and relevance of the linking domains.

Pull from Ahrefs:

- Total referring domains (current and trended)
- Domain Rating distribution (DR bands)
- Topical relevance of linking domains
- Geographic distribution (where appropriate)
- Domain age and trust signals

Healthy signal: a long tail of relevant, established domains. Concentration in any single source is a risk.

### Dimension 2: Link velocity

How fast links are gained or lost.

Pull from Ahrefs:

- New referring domains per month (trended 12-24 months)
- Lost referring domains per month
- Net change

Healthy signal: steady positive growth. Sudden spikes suggest paid campaigns or negative SEO. Sudden drops correlate with redirect mistakes, content removal, or the linking sites going down.

### Dimension 3: Anchor text distribution

The mix of anchor types tells search engines what the property is about and whether the profile looks natural.

Categories to map:

- Branded (the brand name)
- Naked URL
- Generic ("click here", "this page")
- Exact-match keyword
- Partial-match keyword
- Image (alt text or none)

Healthy signal: branded and naked URL anchors dominate. Exact-match keyword anchors are a small minority. Heavy exact-match concentration triggers spam filters.

### Dimension 4: Link types

Not all links are equal.

Categories:

- Dofollow versus nofollow
- Editorial versus directory or comment
- In-content versus footer or sidebar
- Sponsored or UGC tagged
- Redirect chains
- Lost links recoverable via outreach

Healthy signal: editorial in-content dofollow links from relevant sites dominate.

### Dimension 5: Competitive gap

What links do peers have that you do not?

Pull from Ahrefs:

- Domains linking to 2+ competitors but not the target
- Domains linking to 1 competitor with high relevance to the target
- Top performing competitor pages by referring domain count

Healthy signal: the gap is shrinking over time. A widening gap is a strategic risk.

---

## Workflow

1. **Charter the audit.** Goal, scope, time window, competitor set.
2. **Pull baseline data.** Referring domains, anchor text, link types, lost links, competitor overlap.
3. **Map the profile across 5 dimensions.** One section per dimension.
4. **Identify red flags.** Velocity spikes, anchor concentration, low-DR concentration, suspect TLDs, repeated footprints.
5. **Build the toxic list (if needed).** Use the criteria in `references/toxic-link-criteria.md`.
6. **Build the reclamation list.** Lost links worth recovering via outreach.
7. **Build the gap list.** Domains linking to peers, prioritized by relevance.
8. **Synthesize.** Profile health verdict, top 3 risks, top 3 opportunities.
9. **Recommend.** Disavow (rare), reclamation outreach, link building targets, monitoring cadence.
10. **Document and hand off.** Outputs feed `seo-offpage` and `seo-audit-orchestration`.

---

## Failure patterns

- **Disavow happy.** Most profiles do not need a disavow. Disavowing legitimate links damages rankings. Use it only after a manual action or clear algorithmic signals.
- **Counting links instead of evaluating them.** A profile with 10,000 referring domains can be weaker than one with 200 high-quality editorial links.
- **Ignoring lost links.** Recovering a lost link is faster and cheaper than building a new one.
- **No competitor benchmark.** Profile health is relative. A "low" backlink count for a tier-1 competitor is a "great" count for a niche site.
- **Anchor text panic.** A high exact-match percentage in absolute terms is fine for niche sites where the brand and keyword overlap. Investigate before disavowing.
- **One-time audit.** Profile health drifts. Audit on a cadence (quarterly minimum for active properties).
- **Treating Ahrefs as ground truth.** Ahrefs sees most links but not all. Triangulate with Search Console for completeness.
- **Over-indexing on Domain Rating.** DR is a relative metric, not a quality signal. A DR-30 niche site can be more valuable than a DR-80 generalist.

---

## Output format

A backlink audit document with:

1. **Executive summary.** Profile health verdict and top risks.
2. **Profile snapshot.** Key metrics: referring domains, DR distribution, anchor mix, velocity.
3. **5-dimension analysis.** One section per dimension with findings.
4. **Toxic link list.** If needed. Disavow file ready format.
5. **Reclamation list.** Lost links worth recovering, with contact paths.
6. **Gap list.** Top 50 domains linking to competitors but not target.
7. **Recommendations.** Disavow (Y/N), reclamation outreach plan, link building targets.
8. **Methodology.** Data sources, pull dates, criteria used.

Length: 8-15 pages depending on profile complexity.

---

## Reference files

- `references/toxic-link-criteria.md` - Decision framework for classifying a link as toxic, including the disavow file format and threshold guidance.

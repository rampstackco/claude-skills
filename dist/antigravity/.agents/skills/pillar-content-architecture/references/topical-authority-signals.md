# Topical authority signals

SEO and AEO/GEO signals at the hub level. Two-engine optimization framing.

---

## Why hubs produce stronger signals than orphans

Search engines and AI engines both read internal-link graphs and content patterns to infer topical authority. A hub with 12 connected pieces produces signals an orphan set cannot match:

- **Density of internal links on the topic.** PageRank flows within the hub; pages reinforce each other.
- **Comprehensive entity coverage across pieces.** The hub mentions more named tools, methods, experts, and statistics than any single piece could.
- **Repeated topical signal at scale.** Multiple pieces with overlapping topical vocabulary, distinct facets, consistent structure.
- **Crawl-rate compounding.** Search engines crawl high-link-density clusters more frequently; AI engines re-index hubs more aggressively.

Same total content volume; different architectural outcome. 12 orphans on the same topic produce scattered, weaker signals than a 12-piece hub.

---

## SEO signals at the hub level

### Internal-link graph density

Google's PageRank algorithm flows authority through internal links. A pillar with 12 cluster pieces linking back to it concentrates PageRank on the pillar; the pillar in turn passes authority to clusters via top-down links. The graph shape compounds.

**Heuristic.** Compare PageRank on a pillar before and after the cluster ships. Most teams see ranking improvements on the pillar within 3 to 6 months as the cluster matures.

### Comprehensive entity coverage

The hub mentions more named entities than any single page could: tools, methods, experts, datasets, frameworks. Search engines extract entity graphs at crawl time; comprehensive coverage signals topical depth.

**The discipline.** Each piece in the hub mentions the topic's required entities (entities the SERP top 10 share) and the gap entities (entities only 1 or 2 SERP results mention). The hub-level entity graph is the union across all pieces.

### URL structure clarity

The `/topic/cluster-piece/` pattern signals topical grouping. Crawlers follow the URL hierarchy and infer the hub structure even before parsing internal links.

### Breadcrumb hierarchy

BreadcrumbList schema tells crawlers the hub structure explicitly. Some SERPs surface breadcrumb URLs as rich-result enhancements.

### Schema markup at scale

Article, HowTo, FAQPage, BreadcrumbList schema across the hub. Each schema type passes additional structured data to crawlers. The hub is structured for extraction in a way that orphan content rarely is.

### E-E-A-T signals

Experience, Expertise, Authoritativeness, Trustworthiness. Google's quality framework. Hub-level E-E-A-T comes from:

- Author credentials displayed on every piece (with Person schema)
- Expertise demonstrated through depth and accuracy
- Authoritativeness signaled by entity coverage and citations
- Trustworthiness signaled by clear authorship, last-updated dates, and corrections to prior work when relevant

E-E-A-T is not a discrete signal; it is the aggregate of many small signals. Hubs accumulate E-E-A-T faster than orphans because the signals compound across pieces.

---

## AEO and GEO signals at the hub level

AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Mode) cite content based on different patterns than traditional search ranking. Hubs serve AI engines as well as search engines if the right signals are present.

### Answer-paragraph format under H2 headings

40 to 60 word self-contained answers immediately following H2 questions. AI engines extract these as citation candidates. The pattern repeats across pillar and clusters; the hub becomes a structured set of citation-ready answers.

### TL;DR section on pillars

The pillar's TL;DR (150 to 250 words) is the most-cited section by AI engines. Place it at the top, make it self-contained, write it as the canonical summary.

### FAQPage schema

AI engines (Perplexity especially) heavily cite FAQPage-marked content. Pair every pillar's FAQ section with FAQPage schema. Cluster pieces with genuine FAQs also benefit.

### Specific statistics with cited sources

"23% of feature flag rollouts include a kill switch (Feature Flag Survey 2025, n=412)" cites better than "many feature flag rollouts include a kill switch." Specific numbers with sources are higher-citation signals; vague qualifiers are lower-citation.

### Named experts and named methods

"As Adam Kalai noted in the original CUPED paper" cites better than "experts have shown." Named attribution earns citation; anonymous attribution does not. The hub should mention 5+ named experts or methods across pillar and clusters.

### Distinctive POV

AI engines preferentially cite content with a clear, attributable position. "Kill switches should be the first safety mechanism designed, not the last" is a POV. "Kill switches are important" is not. The hub's POV is the brand's editorial position; consistency across pieces reinforces attribution.

---

## The two-engine optimization

Pillars and clusters serve search engines and answer engines together, not as competing optimizations.

**Both reward depth.** Search engines reward comprehensive treatment of a topic. AI engines reward citation-ready depth. Same content; different extraction.

**Both reward structure.** Search engines parse heading hierarchy for ranking. AI engines parse heading hierarchy for citation extraction. Same structure; different use.

**Both reward entity coverage.** Search engines use entities for topical relevance. AI engines use entities for retrieval and citation. Same entities; different scoring.

**Both reward freshness.** Search engines reward recent updates. AI engines re-index recently-updated content more aggressively. Same updates; different cadence.

The implication. Optimizing for AEO/GEO does not trade off against SEO. The hub architecture that earns search rankings is the same architecture that earns AI citations. Teams that treat them as separate optimizations under-invest in both.

---

## Measuring topical authority signals

Hub-level metrics worth tracking:

**Search-side:**

- Aggregate organic traffic to all pieces in the hub
- Average position for the pillar's primary keyword
- Number of cluster pieces ranking in top 10 for their target keywords
- Internal-link count per cluster piece (from inventory)
- Crawl frequency (Google Search Console)

**AI-side:**

- Brand mention rate from Profound, Frase, AirOps, or similar tools
- Citation share by engine (ChatGPT, Perplexity, Gemini, Claude)
- Top-cited pieces (which clusters get cited most often)
- AI crawler hit frequency (server logs, Profound Agent Analytics)

The hub-level dashboard composes these metrics. Tracking at the hub level (not per piece) is what surfaces architecture-level patterns: which clusters drive traffic, which clusters drive citations, which clusters are dead weight.

See the `seo-aeo-geo` skill for AEO/GEO program-level strategy.

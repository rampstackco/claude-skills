# AEO and GEO for programmatic pages

Direct-answer extraction, structured data signals, citation patterns, two-engine optimization.

Answer engines treat programmatic pages differently from editorial pages. The differences shape how pSEO templates should be designed for the AI search era.

---

## Direct-answer extraction

AI engines extract the top-200-word answer; templates that lead with the answer get cited.

**The pattern.** The opening of the page is the citation candidate. AI engines pull from the first answer-shaped paragraph, FAQPage schema entries, and structured-data fields. Everything after the opening is supporting depth that justifies the citation but is rarely cited directly.

**Template implication.** The first 200 rendered words must answer the user's specific query in a self-contained way. A page about "homes for sale in Denver under $500k" should answer that exact query in the opening: count of listings, average price, top neighborhoods, with structured data backing each claim.

**Anti-pattern.** Welcome paragraphs, navigation hints, "below you will find" filler. These dilute the citation candidate and reduce the page's AI-engine pull.

**Snippet-bait paragraphs at H2 level.** Beyond the top-200-word answer, each H2 should have a 40 to 60 word snippet-bait paragraph. AI engines often quote multiple snippet-bait paragraphs as multi-paragraph citations.

---

## Structured data signals

JSON-LD with comprehensive schema is read by AI engines as authority signal at scale.

**The "thin schema" penalty.** Programmatic pages with minimal schema (just the basic Article or Product type, with required fields only) lose to programmatic pages with deep schema (complete schema graph, optional fields populated, cross-entity references). The underlying data may be similar; the schema markup is what AI engines see.

**Schema patterns that signal quality at scale.**

- **Type-appropriate schema.** Product for product pages, LocalBusiness for location pages, Article for editorial pages, FAQPage for FAQ sections, BreadcrumbList for navigation context.
- **Cross-entity references.** Schema entries that reference other entities in the dataset (relatedProduct, parentOrganization, hasPart) signal a connected knowledge graph rather than isolated pages.
- **Aggregate schema.** Reviews, ratings, statistics presented as structured aggregateRating, aggregateOffer, aggregateProperty fields.
- **FAQPage schema on FAQ sections.** AI engines (Perplexity especially) cite FAQPage-marked content heavily; programmatic pages that include FAQ sections should mark them.

**Schema validation.** Run schema validation on every page; failures produce silent invisibility in AI surfaces. The validation is automated and gates publish.

---

## Citation patterns

AI engines cite programmatic data pages and editorial pages for different query types.

**Factual-query lane.** AI engines tend to cite programmatic data pages for factual queries: prices, statistics, comparisons, factual details, specifications, locations, ratings. The page renders the fact as structured data; the AI engine cites the structured data as the answer.

**Analytical-query lane.** AI engines tend to cite editorial pages for analytical queries: why, how, what should I think, recommendations with reasoning, opinions, judgments. Programmatic pages cannot compete in this lane; the data does not supply the analysis the user wants.

**Implication for pSEO design.** Design templates to fit the factual-query lane. Do not try to make programmatic pages compete for analytical queries that editorial content owns. The two lanes coexist; pSEO is one half of a two-lane content strategy.

**The "hybrid page" pattern.** Some pSEO programs add an editorial layer to programmatic pages (per-page expert commentary, AI-summarized analysis with human review). Hybrid pages can compete in both lanes when the editorial layer is genuinely substantive. Without substantive editorial layer, hybrid pages read as factual pages with filler attached and lose in both lanes.

---

## Quality crackdown sensitivity

AI engines have their own quality signals beyond search engines. Thin programmatic content gets deprioritized faster in AI surfaces than in traditional search.

**The migration of penalty risk.** Pre-AI search era, thin pSEO sets could rank for 12 to 24 months before quality crackdowns hit. AI engines apply quality signals more aggressively. Thin pSEO sets in 2026 lose AI citations within 3 to 6 months even when traditional search rankings are still holding.

**Signals AI engines use beyond traditional search signals.**

- **Distinctiveness.** Pages that read as templated boilerplate get deprioritized. Pages that surface page-specific data prominently get cited.
- **Source credibility.** Pages with named authors, expert credentials, and citation chains get cited preferentially. Anonymous pSEO pages with no attribution lose to attributed pages.
- **Citation traceability.** Pages that cite their underlying data sources (with links to the source) get treated as authoritative. Pages that present facts without sourcing get treated as unreliable.
- **Freshness.** Pages with recent update dates get cited preferentially for time-sensitive queries. Stale pages lose AI citations even when traditional search rankings hold.

**The implication.** pSEO programs designed pre-AEO need template updates: stronger above-the-fold answers, deeper schema markup, FAQPage schema on FAQ sections, source citations on factual claims, named authorship where the program supports it.

---

## Two-engine optimization

pSEO pages should serve both search engines and answer engines.

**Both engines reward depth.** Search engines reward comprehensive coverage; AI engines reward citation-ready depth. Same content, different extraction.

**Both engines reward structure.** Search engines parse heading hierarchy for ranking; AI engines parse heading hierarchy for citation extraction. Same structure, different use.

**Both engines reward freshness.** Search engines reward recent updates; AI engines re-index recently updated content more aggressively. Same updates, different cadence.

**The two-engine implication.** Designing for AEO does not trade off against SEO. The template improvements that earn AI citations (top-200-word answers, FAQPage schema, named authorship, source citations) also earn search rankings. Teams that treat AEO and SEO as separate optimizations under-invest in both.

---

## Set-level reputation signals

Beyond individual page signals, AI engines apply set-level reputation. The set's overall quality affects each page's citation likelihood.

**Domain-level reputation.** A domain with a substantive editorial content layer plus a high-quality pSEO set ranks both layers more strongly than a domain with only pSEO. The editorial layer establishes the domain's expertise; the pSEO layer benefits.

**Set-level signal compounds.** A 10,000-page pSEO set with 90% high-quality pages and 10% thin gets the entire set treated as high-quality. The same set with 60% high-quality pages and 40% thin gets the entire set deprioritized. The bad pages drag the good ones down.

**The implication.** Set-level QC discipline (covered in `quality-control-at-scale.md`) is also AEO discipline. Holding the quality threshold across the set protects the set's AI-citation reputation, not just its search ranking.

---

## Measurement

Hub-level AEO/GEO metrics worth tracking on the pSEO set:

- Brand mention rate from AI search visibility tools (Profound, Frase visibility tracking, AirOps AEO data)
- Citation share by engine (ChatGPT, Perplexity, Gemini, Claude, Google AI Mode) on the set's target queries
- Top-cited pages within the set (which template patterns get cited most)
- AI crawler hit frequency from server logs (GPTBot, PerplexityBot, ClaudeBot)

Track at the set level, not just per page. Aggregate trends surface patterns that per-page tracking misses.

# Template design patterns

Variable density, above-the-fold answer, heading hierarchy, schema integration, link slots.

The template is the structure that data fills. Templates are designed at the methodology level here; specific framework implementations (rendering, slot composition, build-time generation versus on-demand rendering) are stack-specific and belong in internal team documentation.

---

## Above-the-fold answer

The first 200 words of the rendered page answer the user's specific query.

**Why.** Search engines and AI engines both extract the top of the page disproportionately. Featured snippets pull from the first answer-shaped paragraph. AI engines extract the first 200 words as the canonical citation. The reader who lands on the page from a SERP decides within 5 seconds whether to stay; the answer needs to be visible.

**The pattern.** Lead with the structured answer to the specific query: the price, the rating, the count, the comparison, the location, the recommendation. Follow with supporting details that justify or expand the answer. The opening is not a marketing introduction; it is the answer paragraph.

**Anti-pattern.** "Welcome to our [page type] page. Below you will find information about [topic]." This intro reads as filler to crawlers and humans. Cut it; lead with the answer.

---

## Variable density

The template accommodates records with sparse fields and dense records gracefully.

**Sparse-record handling.** Some records will have fewer fields populated. The template needs fallback patterns: hide sections that depend on missing fields, substitute computed defaults, surface "limited data available" rather than rendering empty headings.

**Dense-record handling.** Some records will have many fields. The template needs progressive disclosure: collapse less-essential sections behind expandable headings, paginate long lists, prioritize the most-queried fields above the fold.

**The shape principle.** Two pages from the same template can differ significantly in length and depth based on data density without either looking broken. A page with 20% of optional fields populated should still feel competent; a page with 95% should not feel overstuffed.

---

## Heading hierarchy reflects data

H2s and H3s map to data sections, not to template decoration.

**The pattern.** The H2 set is the same across all pages in the template, but the content under each H2 reflects each page's specific data. "Overview," "Details," "Comparisons," "Related" might be the H2 set; what populates each varies per page.

**Snippet-bait paragraphs at H2 level.** Each H2 has a 40 to 60 word answer paragraph immediately following it that summarizes that section's specific content. AI engines often quote these as multi-paragraph citations.

**Anti-pattern.** Every page has a different H2 set because the template branches on data. The inconsistency confuses crawlers; the heading structure should be predictable across the set.

---

## Schema markup as part of template

Structured data renders machine-readable signals at scale.

**The principle.** Pick the schema type that matches the page's content (Product, Article, LocalBusiness, FAQPage, BreadcrumbList, etc.). Embed the schema in the template; populate from the same data that renders the visible page. The schema is generated, not hand-written; the template ensures every page has it.

**Validation discipline.** Run schema validation as an automated check on every generated page. Schema errors produce silent failures in search and AI surfaces; the validation catches them before publish.

**Schema field coverage.** Populate every relevant schema field, not just the required ones. Optional schema fields (aggregateRating, additionalProperty, areaServed, etc.) signal depth at scale even when individual fields are not visibly rendered.

---

## Internal linking placeholders

The template includes link slots for related-record cross-references, parent-category links, and sibling-record links.

**Standard slot patterns.**

- **Breadcrumb slot.** Path from home to current record. 3 to 4 levels typical.
- **Parent-category slot.** Link up to the hub page for the record's category.
- **Sibling slot.** 5 to 15 related sibling records. Computed from cross-record fields in the schema.
- **Related-record slot.** 3 to 5 records related across categories (different parent, similar attributes).
- **Related-content slot.** Editorial content related to the record (blog posts, guides, comparison editorials).

**Total internal links per page.** 15 to 30 typical for a well-linked pSEO page. Below 10, the page is under-linked; above 50, the page reads as link-dense and dilutes anchor signal.

---

## Distinctive value per page

Each generated page must offer something the user could not get by going up to the parent or sideways to a sibling.

**The test.** Generate three sample pages from the template using different records. Read all three. Can you tell them apart on substance, not just on the names? If the pages are interchangeable in everything but identifiers, the template is not generating distinct value.

**The fix.** Surface the distinctive fields prominently. The fields that vary most across the set are the ones that justify the page's existence; those should be in the above-the-fold answer and in the H2 structure, not buried as "additional details."

---

## Quality bar: the random-sample test

The template's quality bar. A randomly sampled page from the set, viewed in isolation, should answer the user's likely query competently.

**The test sequence.**

1. Pick 5 random records from the dataset.
2. Render them through the template.
3. Read each page as if you arrived from a search results page.
4. Score each page on three dimensions: does it answer the query, is the depth competitive with editorial content for the same query, would you trust this page as a source.

If any of the 5 fails, the template needs work before scaling. The 5-page sample is the minimum viable QC; the cohort tracking discipline scales it across the program's lifetime.

---

## Methodology-level design choices that stay in the public skill

The principles above. Field-count heuristics, slot patterns, hierarchy choices, validation discipline, sample-test discipline.

## Implementation choices that stay internal

The framework rendering choice (build-time generation, server rendering, hybrid), the specific component composition pattern, the specific data-fetching layer, the deployment topology, the cache-invalidation strategy. These vary by stack and team and should not be prescribed at the methodology level.

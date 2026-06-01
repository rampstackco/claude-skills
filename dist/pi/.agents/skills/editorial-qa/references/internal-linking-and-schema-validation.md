# Internal linking and schema validation

Link discipline, anchor text variation, schema patterns and validation.

The internal-linking and schema layer is where SEO compounds. Each piece's link contribution and schema contribution feeds the program's overall ranking and citation signal. QA enforces the discipline so individual pieces do not drift from the program's link graph and schema standards.

---

## Internal linking

### Outbound links specified in brief

- **The brief named X outbound links.** Verify each is present in the piece.
- **Anchor text matches the brief's specification.** "Click here" is dead anchor text; the brief should specify keyword-aware anchor text per link.
- **Links go where the brief said.** The link target is the page the brief specified, not a deprecated alternate or a different page that happens to share the topic.

### Anchor text variation

The "every link has the same anchor text" anti-pattern.

**Pattern.** A piece links to the pillar 3 times. All 3 links use the exact-match keyword as anchor. This signals manipulation to ranking systems and dilutes the anchor's signal.

**Fix.** Vary the anchor across the 3 links. One uses the exact-match keyword; one uses a descriptive natural-language phrase; one uses a brand-mention anchor or a context-driven phrase.

**The audit.** For each piece, count the outbound links to the same target. If multiple links to the same target use identical anchor text, vary at least one.

### Link-target liveness

- **Every internal link target exists.** No 404s. The link goes to a live page on the site.
- **No links to deprecated pages.** If a target page was retired, the link should redirect (via 301) or the link itself should be replaced.
- **External links work.** Click them; verify they resolve and lead to the intended source.

The external-link audit catches hallucinated citations (see `fact-accuracy-and-citation-discipline.md`) and link rot.

### Internal link count

- **3 to 7 internal links for a typical 1,500-word piece.** Below 3 signals under-linked (orphan-shaped). Above 10 signals link-stuffing.
- **8 to 15 for a pillar piece.** Pillars carry more outbound links to their cluster.
- **The link count should be by design, not by accident.** The brief specifies the link count; the writer should hit it; QA verifies.

### Self-cannibalization check

- **The piece does not compete with an existing piece for the same target keyword.** Search the site for the primary keyword. If an existing piece is in the top 5 internal results, flag the new piece.

The flag triggers a decision: consolidate, differentiate, or kill one. Detail in `pillar-content-architecture/references/internal-linking-architecture.md` for the broader internal linking discipline.

---

## Schema validation

### Schema type matches content

- **Article schema for editorial pieces.** Default for blog posts, long-form articles, thought leadership.
- **HowTo schema for instructional pieces.** Step-by-step guides with explicit steps that the schema can structure.
- **Product schema for product pages.** Programmatic pSEO pages rendering products usually use Product schema.
- **LocalBusiness schema for location-based pages.** Programmatic pSEO for geographic categories.
- **FAQPage schema for genuine FAQ sections.** As an embedded schema within the page, not as the page's primary schema (unless the page is FAQ-shaped throughout).
- **BreadcrumbList schema for navigation context.** Most pages benefit; pillar pages especially.

### Schema validates

- **Schema validates against schema.org definitions.** No missing required fields. No malformed JSON-LD. No invalid field types.
- **Validation method.** Run the schema through a validator (Google's Structured Data Testing Tool, schema.org's validator, or equivalent). Failures appear as errors with field-specific messages.

### Schema is consistent with on-page content

- **Schema reflects what the page actually shows.** Do not claim 5-star rating in schema if there is no rating on the page. Do not claim a HowTo with 7 steps if the page only walks through 4. Mismatch between schema and content can trigger manual penalties.

### Optional schema fields earn their keep

- **Populated optional schema fields signal depth.** Programmatic pages with comprehensive schema (`aggregateRating`, `additionalProperty`, `areaServed`, etc.) score higher with AI engines than pages with bare-minimum schema.
- **The trade-off.** Filling optional fields requires data. If the data does not exist, do not fabricate it; either populate genuinely or leave the field absent.

---

## The link audit pattern

For each piece in QA:

1. **Outbound links present.** Match against brief.
2. **Anchor text variation.** Same-target links use varied anchor text.
3. **Targets live.** No 404s, no deprecated pages.
4. **Link count in band.** 3 to 7 for typical, 8 to 15 for pillar.
5. **Self-cannibalization.** No competition with existing pieces.
6. **Inbound links queued for post-publish update.** The brief queued 1 to 3 existing pages that should add links to this piece after publish; the QA log queues those updates.

The 6-step audit takes 5 minutes per piece. Worth the time; under-linked or stuffed pieces fail to compound.

---

## The schema audit pattern

For each piece in QA:

1. **Schema type appropriate.** Article, HowTo, Product, LocalBusiness, FAQPage, or BreadcrumbList per content shape.
2. **Schema validates.** Run through a validator; resolve errors before publish.
3. **Schema matches content.** No false claims (false ratings, false step counts).
4. **Optional fields populated.** Where data exists, fields populate; the page signals depth.
5. **Multiple schema types when appropriate.** Article + FAQPage + BreadcrumbList is common for pillar pieces with FAQ sections.

The schema audit takes 3 to 5 minutes per piece (less with automation; more on first-pass for new content types).

---

## Common failures

**Brief specified link, writer skipped it.** Halt and return; brief-adherence catches this earlier in the QA sequence.

**Anchor text identical across links.** Auto-fix in the editor pass; vary the anchor on at least 2 of every 3 same-target links.

**Schema fails validation.** Auto-fix; the editor or a script ships the corrected schema.

**Schema claims rating that is not on the page.** Halt and return; this is the manual-penalty risk.

**Internal link count below brief.** Flag and return for the writer to add the missing links per the brief's specification.

---

## Methodology-level choices that stay in the public skill

The 6-step link audit, the 5-step schema audit, the anchor variation rule, the schema-content consistency rule, the optional-field discipline.

## Implementation choices that stay internal

The specific schema validation tooling (Google's tool, schema.org's tool, custom CI integration). The specific link checker (Screaming Frog, custom Puppeteer script, headless browser audit). The specific CMS integration that auto-populates schema from page metadata. The specific deployment pipeline that runs schema validation on every publish. These vary by stack and team.

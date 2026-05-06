# SEO and AEO compliance checklist

SEO and AEO checks combined into one workflow. The two-engine optimization principle holds: pieces that earn search rankings are largely the same pieces that earn AI citations.

This checklist runs late in the QA sequence (after brief-adherence, fact-accuracy, structure, AI-content audit, voice). SEO and AEO failures are mostly auto-fixable; halting on them is rarely the right call.

---

## SEO checks

### Title and headings

- **Target keyword in title.** The brief's primary keyword appears in the page title; the title is 50 to 65 characters; the title reads naturally rather than keyword-stuffed.
- **H1 present and matches title intent.** Some CMSs use the title as H1; some have separate H1. Either way, one H1 per page that establishes the topic.
- **Heading hierarchy clean.** No orphan H3s (every H3 sits under an H2). No H4 without H3. The hierarchy is tree-shaped, not arbitrary.
- **H2 keyword variation.** Supporting cluster keywords appear naturally across H2s without forcing.

### Meta and URL

- **Meta description compelling and keyword-aware.** 140 to 160 characters; includes the primary keyword without stuffing; reads as a benefit-statement that earns the click from SERP.
- **URL slug short and descriptive.** Hyphens, lowercase, keyword-aware, date-free, under 60 characters. Generic example: `/feature-flag-rollout/kill-switches/`.
- **Canonical URL set.** The piece has a canonical URL pointing to itself (or to the canonical version if this piece is a duplicate-by-design like an X vs Y comparison page).

### On-page

- **Image alt text descriptive.** Every image has alt text that describes the image's content, not "image of [thing]" or generic placeholders.
- **External links open appropriately.** Most external links open in a new tab; rel attributes (`noopener`, `noreferrer`, `sponsored`, `nofollow`) match the link's purpose.
- **Internal link count appropriate.** 3 to 7 internal links for a 1,500-word piece; 8 to 15 for a pillar piece. Below the floor signals under-linked; well above signals link-stuffing.

---

## AEO checks

The AEO surface complements the SEO surface. AI engines weight different patterns; the checks below catch what AI engines specifically reward.

### Answer paragraphs at H2 level

- **40 to 60 word answer paragraph immediately following each H2 question.** AI engines extract these as citation candidates. The paragraph is self-contained: read alone, it answers the H2's specific question completely.
- **Snippet-bait pattern repeats throughout.** Not just the top of the piece. Every H2 gets one.

### TL;DR section

- **Pillar pieces include a TL;DR section near the top.** 150 to 250 words. Self-contained. The most-cited section by AI engines for pillar-shaped content.
- **TL;DR placement.** After the hero, before the table of contents. The reader sees TL;DR within the first scroll.

### FAQ schema

- **FAQ section with FAQPage schema.** Pieces that contain FAQ-shaped content (genuine reader questions with answers) mark the FAQ section with FAQPage structured data. Perplexity especially cites FAQPage content heavily.
- **Genuine FAQs only.** Do not mark fake FAQs (questions nobody actually asks) with FAQPage schema. Search engines and AI engines detect fabricated FAQs and deprioritize.

### Statistics with sources

- **Specific statistics with cited sources.** AI engines weight statistics with sources higher than vague qualifiers. "23% of B2B buyers cite [specific source]" beats "many B2B buyers."
- **The numbers are real.** Verify in the fact-accuracy gate; do not let hallucinated statistics ship just because they would help SEO/AEO.

### Named entities

- **Entity coverage matches brief.** The required entities from the brief are present; the standard entities are present where relevant; the gap entities are present where the brief committed to them.
- **Entities mentioned with weight.** Pass the brief's depth-of-coverage requirement: not just "CUPED is mentioned in passing" but "CUPED is developed in the methodology H2 with the formula and an example."

### Distinctive POV

- **The piece takes a position.** AI engines preferentially cite content with attributable claims. "Kill switches should be the first safety mechanism designed, not the last" is a POV. "Kill switches are important" is not.
- **The POV is consistent with brand stance.** Voice doc specified the brand stance; the piece's POV aligns.

---

## Auto-fix vs flag vs halt

Most SEO/AEO failures are auto-fixable: the editor or a script can fix slug, meta description, image alt text, schema markup without writer involvement.

Some require flag-and-revise: heading structure, internal link count, answer paragraph patterns. The editor flags; the writer revises.

Halt-conditions are rare for SEO/AEO. The typical case where halt makes sense: the piece is structurally wrong for the target SERP (brief specified listicle; piece is long-form prose). That is a brief-adherence failure that surfaced late; route back to the brief-adherence gate.

---

## The combined SEO/AEO audit

Run as one pass. The checks overlap (both reward heading structure, both reward depth, both reward freshness). Treating SEO and AEO as separate workflows doubles the audit time without doubling the catch rate.

The discipline. One audit, one checklist, two-engine optimization mindset. The piece serves both surfaces or it serves neither well.

---

## Pillar-specific extensions

Pillar pieces have additional SEO/AEO requirements.

- **TL;DR section** (covered above)
- **Comprehensive entity coverage.** Pillar pieces should mention 15 to 25 entities across the topic; cluster pieces have lower bars.
- **Internal links to cluster pieces.** Pillar links out to each cluster piece via contextual anchors, not via a footer dump.
- **Schema includes BreadcrumbList.** Tells crawlers and AI engines that this is the hub of a topical cluster.

---

## Programmatic-page-specific extensions

For programmatic SEO pages, SEO/AEO checks adapt.

- **Top-200-word answer.** First 200 words answer the user's specific query directly. AI engines cite programmatic data pages for factual queries primarily.
- **Schema population at scale.** Every page has Article, Product, LocalBusiness, or other type-appropriate schema; schema fields populate from the same data that renders the visible page.
- **Sampling discipline.** Full-audit SEO/AEO checks are infeasible at scale; sample 50 to 200 pages per cycle (see `qa-at-scale-patterns.md`).

---

## Methodology-level choices that stay in the public skill

The combined SEO/AEO check sequence, the auto-fix/flag/halt taxonomy, the pillar-specific extensions, the programmatic-specific extensions.

## Implementation choices that stay internal

The specific tooling for automated SEO/AEO checks (Lighthouse audits, schema validators, headless-CMS-specific plugins). The specific schema-validation library or service. The specific staging environment where pre-publish checks run. The specific deployment pipeline that gates publish on SEO/AEO compliance. These vary by stack and team.

---
name: seo-onpage
description: "Run a comprehensive on-page SEO audit or optimization pass covering title tags, meta descriptions, header structure, content quality, internal links, image optimization, URL hygiene, and on-page schema. Use this skill whenever the user asks to optimize a page, audit on-page SEO, fix titles or meta tags, review header structure, check internal linking, improve a single URL's search performance, or write SEO-friendly copy. Triggers on on-page SEO, page audit, title tag, meta description, H1, header structure, internal links, image alt, URL slug, page optimization, optimize this page, SEO this page. Also triggers for any single-page review where ranking, click-through, or relevance signal quality is the goal, even if the user does not say 'SEO' explicitly."
---

# On-Page SEO

Optimize a single page for search relevance, click-through, and crawler comprehension. Stack-agnostic. Works on any CMS, framework, or static site.

---

## When to use

- Auditing or optimizing a single page (homepage, product page, article, landing page)
- Writing or reviewing title tags and meta descriptions
- Fixing header structure or content hierarchy
- Reviewing internal links from or to a page
- Improving a page's CTR from search results

## When NOT to use

- Site-wide crawl, indexing, or speed issues (use `seo-technical`)
- Keyword research or intent mapping (use `seo-keyword`)
- Competitor SERP analysis (use `seo-competitor`)
- Auditing many pages at once for prune/merge decisions (use `seo-content-audit`)

---

## Required inputs

- The page URL or the draft content if pre-launch
- The primary target query (one phrase the page should rank for)
- The page's role in the site (commercial, informational, navigational)

If the target query is unknown, run `seo-keyword` first or ask the user to name one.

---

## The framework: 8 dimensions

A complete on-page audit covers eight dimensions. Score each as Pass, Needs work, or Fail. Note the specific fix.

### 1. Title tag
- One unique title per URL across the site
- Roughly 50 to 60 characters (longer gets truncated in SERPs)
- Primary query near the front
- Brand at the end if it earns inclusion
- Distinct from the H1 (often very similar, but should not be identical word-for-word)

### 2. Meta description
- One unique description per URL
- Roughly 150 to 160 characters
- Restates the value proposition, not the title
- Includes a soft CTA where natural
- Treats the description as ad copy that earns the click

### 3. Header structure
- Exactly one H1 per page
- H1 contains or paraphrases the primary query
- H2 sections cover the major sub-topics
- H3+ used only when an H2 has genuine sub-points
- No skipped levels (no H2 followed by H4)
- Headers describe sections accurately enough that a reader could navigate by them alone

### 4. Body content
- Opens with the primary user intent answered in the first paragraph
- Covers the topic comprehensively (define your competition's depth, then match or exceed it)
- Includes related entities and supporting concepts naturally
- Avoids keyword stuffing (write for the reader, not the bot)
- Reading level matches the audience (run a readability check)
- Paragraphs short enough to scan on mobile (3 to 5 lines)

### 5. Internal links
- At least 2 to 3 outbound internal links to closely related pages
- At least 2 to 3 inbound internal links from related pages
- Anchor text is descriptive, not "click here" or "learn more"
- Links to canonical URLs, not redirects
- No broken internal links

### 6. Images and media
- Every meaningful image has descriptive alt text (skip alt for purely decorative images)
- File names are descriptive ("blue-running-shoe.jpg" not "IMG_4032.jpg")
- Modern format used where supported (WebP, AVIF)
- Lazy loading on below-the-fold images
- Width and height attributes set to prevent layout shift

### 7. URL slug
- Lowercase, hyphen-separated
- Includes the primary query naturally (no stuffing)
- Short (under 60 characters where possible)
- No dates unless the page is genuinely time-bound
- No session IDs, tracking parameters, or random hashes
- Matches the site's URL pattern conventions

### 8. On-page schema
- Appropriate Schema.org type for the content (Article, Product, FAQPage, HowTo, Recipe, etc.)
- Required properties filled (review Schema.org docs for the type)
- Validates in Google's Rich Results Test or equivalent
- Matches what is visible on the page (do not lie to crawlers)
- Author and publisher schema linked correctly for content pages

---

## Workflow

1. **Confirm the target query.** If unclear, ask. Do not optimize without one.
2. **Render the page.** View it as a user would. Read the content top to bottom.
3. **View the rendered HTML.** Inspect the actual served markup, not just the visual page. Check `<title>`, `<meta>`, headers, and schema in the source.
4. **Run the 8-dimension framework.** Score each, note specific fixes.
5. **Prioritize.** Group fixes into Critical (broken or missing), Important (suboptimal), and Nice-to-have (polish).
6. **Write the report.** Use the template in `references/audit-template.md`.
7. **Offer to draft fixes.** If the user wants, draft the new title, meta, headers, or copy directly.

---

## Failure patterns

When you spot one of these, push back before delivering.

- **"Make it more SEO."** Vague. Ask for the target query and what's broken first.
- **"Add the keyword 5 times in the body."** Keyword density is not a real ranking signal. Prioritize relevance and topical depth instead.
- **Optimizing a page that is not crawlable or indexable.** Check `seo-technical` first. No on-page work helps a noindexed page.
- **Optimizing a page with no clear user intent.** A page that does not serve a real query will not rank no matter how well-tagged it is.
- **Targeting the same query as another page on the site.** This is cannibalization. Use `seo-content-audit` to decide which page should rank.

---

## Output format

Default output is a markdown audit at `seo-audit-[page-slug].md` in the project root. Structure:

1. Page summary (URL, target query, role)
2. Score across 8 dimensions
3. Critical fixes
4. Important fixes
5. Nice-to-have polish
6. Drafted replacements (if requested)

Keep audits under 1500 words. If a page needs more detail, link to deeper appendices.

---

## Reference files

- `references/audit-template.md` - Fillable audit template, copy and use.
- `references/onpage-checklist.md` - Quick-reference checklist for the 8 dimensions.
- `references/title-and-meta-patterns.md` - Patterns for writing strong titles and meta descriptions.

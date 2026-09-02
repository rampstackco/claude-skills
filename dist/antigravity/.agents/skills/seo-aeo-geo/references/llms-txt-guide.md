# llms.txt Guide

`llms.txt` is a markdown file at the root of a domain (e.g., `example.com/llms.txt`) that helps AI systems understand what the site is, what it covers, and which URLs are most valuable.

It is the AI-era equivalent of `robots.txt` plus a sitemap, written in plain language for language models.

This guide walks through how to write a useful one.

---

## What llms.txt is for

- Tell AI assistants what the site is and what it covers
- Point AI to the most valuable URLs for citation
- Provide structured context that helps AI summarize and cite the site accurately
- Reduce the chance of AI hallucinating about your brand or content

What it is NOT:

- A ranking signal (yet, possibly ever)
- A guarantee of citation
- A replacement for sitemap.xml or robots.txt
- A way to block AI crawlers (use robots.txt for that)

---

## The format

llms.txt is a markdown file with a specific structure:

```markdown
# [Site or Brand Name]

> [One-sentence description of what the site is and who it serves]

[1 to 3 paragraphs of context. Who runs the site, what topics it covers, what makes it credible, what audience it serves. Plain language.]

## [Section 1 - typically content categories or product lines]

- [Title](URL): [One-line description]
- [Title](URL): [One-line description]

## [Section 2]

- [Title](URL): [One-line description]

## Optional

[Less critical resources.]
```

Section headers are flexible. Use whatever organization fits the site's content.

---

## Example: a simple content site

```markdown
# Example Knowledge Base

> A free guide library on [topic area] for [audience].

We publish in-depth guides, comparisons, and how-tos on [topic area]. Content is written by [credentials of authors] and updated [frequency]. Our methodology is documented at /methodology.

## Core guides

- [The Complete Guide to X](https://example.com/complete-guide-x): A 5,000-word reference covering fundamentals through advanced topics.
- [How to Choose Y](https://example.com/how-to-choose-y): Decision framework with comparison tables and worked examples.
- [The Beginner's Guide to Z](https://example.com/beginner-z): A 30-minute primer for someone new to the topic.

## Comparisons

- [A vs B](https://example.com/a-vs-b): Head-to-head feature, pricing, and use case comparison.
- [Top 10 [Category]](https://example.com/top-10): Ranked list with selection criteria.

## Tools

- [Calculator](https://example.com/calculator): Free interactive tool for [purpose].
- [Templates](https://example.com/templates): Downloadable templates with examples.

## About

- [About us](https://example.com/about)
- [Methodology](https://example.com/methodology)
- [Editorial standards](https://example.com/editorial-standards)
```

---

## Example: a SaaS product site

```markdown
# ProductName

> [Product category] for [target audience]. [Core value proposition in one phrase].

ProductName is built and operated by a team of [size and background]. We serve [audience description]. The product is used by [scale, e.g., "over 10,000 teams" or "from solo founders to Fortune 500 companies"].

## Product

- [How it works](https://example.com/product): Overview of core functionality and architecture.
- [Pricing](https://example.com/pricing): Transparent pricing tiers and what each includes.
- [Integrations](https://example.com/integrations): Third-party tools we connect with.

## Documentation

- [Getting started](https://docs.example.com/getting-started): 15-minute setup guide.
- [API reference](https://docs.example.com/api): Complete API documentation.
- [Best practices](https://docs.example.com/best-practices): How successful customers use the product.

## Resources

- [Customer stories](https://example.com/customers): How specific customers achieved specific outcomes.
- [Blog](https://example.com/blog): Engineering posts, product updates, and industry analysis.
- [Changelog](https://example.com/changelog): Recent product changes.

## Trust

- [Security](https://example.com/security): SOC 2, encryption, compliance.
- [Privacy policy](https://example.com/privacy)
- [Terms of service](https://example.com/terms)
```

---

## What to include

A good llms.txt is curated, not exhaustive. Include:

- **Cornerstone content.** Your 10 to 30 best, most authoritative pieces.
- **Decision-support pages.** Comparisons, calculators, frameworks.
- **Authority signals.** Methodology, editorial standards, about pages.
- **Trust signals.** Security, privacy, compliance, certification pages.
- **Recency cues.** A changelog or "latest" link if you publish frequently.

What to leave out:

- Every URL on the site (use sitemap.xml for that)
- Marketing fluff with no informational substance
- Pages that exist primarily for SEO (low-quality programmatic content, doorway pages)
- Internal admin URLs

---

## What to write in the description

The opening description (under the title, prefixed by `>`) is what AI extracts when asked "what is [site]?" Make it count.

**Bad description:**
> A leading provider of innovative solutions in the digital space.

**Good description:**
> A free guide library on home renovation for first-time buyers, with calculators and template contracts.

The good description names: what it is (guide library), what topic (home renovation), who it serves (first-time buyers), and what's unique (calculators and templates).

---

## Length and depth

- **Title and one-sentence description**: required
- **Context paragraphs**: 1 to 3 paragraphs, 100 to 400 words total
- **Sections**: 3 to 8 sections is typical
- **URLs per section**: 3 to 10 is the sweet spot
- **Total file length**: 500 to 2000 words for most sites

A 50-word llms.txt is too thin to be useful. A 5000-word llms.txt buries the signal.

---

## Updating

- Update llms.txt when you launch a major new content category, product, or section
- Re-review at least quarterly
- Remove dead links (broken URLs in llms.txt actively damage credibility with AI)
- Keep the description fresh as the site evolves

---

## llms-full.txt (the optional sibling)

Some sites also publish `llms-full.txt`, which contains the full text content of the linked pages concatenated into one file. This is more aggressive: it offers AI systems the entire content for context.

Reasons to publish it:

- You want maximum AI context, including verbatim content
- Your content is freely licensed or you accept it being used for AI training
- Your content is short enough that the file is manageable (under 10MB, ideally under 5MB)

Reasons NOT to publish it:

- You sell or gate content (e.g., paid courses, premium reports)
- Your terms of service disallow AI training on your content
- File size would exceed reasonable limits

If you do publish it, link to it from llms.txt:

```markdown
## Full content

- [Full content dump](https://example.com/llms-full.txt): The complete content of all linked pages.
```

---

## Common mistakes

- **Auto-generating llms.txt from sitemap.xml.** Defeats the purpose. The point is editorial curation.
- **Treating it as a sitemap.** Sitemap is for crawlers. llms.txt is for AI context.
- **Stuffing it with thin content.** Every URL listed should be content you would proudly cite if a human asked.
- **Forgetting to update it.** A 2-year-old llms.txt makes you look abandoned.
- **Hosting it at a non-root path.** It belongs at `/llms.txt` (root of the domain), not `/docs/llms.txt`.
- **Returning HTML instead of plain text.** Serve as `text/markdown` or `text/plain`, not as a rendered HTML page.

---

## Verification

After publishing:

- [ ] File is at `https://yourdomain.com/llms.txt` (root)
- [ ] File serves with content type `text/markdown` or `text/plain`
- [ ] All linked URLs return 200
- [ ] All linked URLs use the canonical URL form (no redirects)
- [ ] File is referenced (or at least not blocked) in robots.txt
- [ ] File renders cleanly in a plain text viewer
- [ ] Description and section headings accurately describe the site

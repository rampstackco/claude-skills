---
name: information-architecture
description: "Design the structure of a website or product including sitemap, navigation, URL structure, content types, taxonomy, and labeling. Use this skill whenever the user asks to plan a sitemap, design navigation, structure URLs, define content types, build taxonomies, design site search, or organize content at the system level. Triggers on sitemap, site structure, navigation, IA, information architecture, URL structure, content types, taxonomy, categorization, breadcrumbs, hub pages, faceted navigation, site search, labeling. Also triggers when content is being created without a structural plan, or when an existing site's structure is being audited or restructured."
---

# Information Architecture

Design the structure that holds the content. Stack-agnostic. Applies to marketing sites, product surfaces, knowledge bases, e-commerce, and editorial content.

A well-designed IA makes the rest of the project easier. A poorly-designed IA forces every downstream decision to fight the structure.

---

## When to use

- Designing a new site or major section from scratch
- Restructuring an existing site
- Adding a new content type or category
- Designing site navigation or menu systems
- Defining URL structure and slug patterns
- Building taxonomies or tag systems
- Auditing an existing IA for problems

## When NOT to use

- Single-page design (use `design-standards`)
- Content production (use `content-and-copy`)
- SEO-driven content planning (use `seo-keyword`)
- Initial brand and audience discovery (use `brand-discovery`)

---

## Required inputs

- The site or product scope
- The audience and what they're trying to do
- The content that exists or is planned
- Any constraints (parent IA, regulatory, technical)

If audience is unclear, run `brand-discovery` first. If content scope is unclear, run `content-strategy` first.

---

## The framework: 6 layers

Information architecture has six layers. Each builds on the one below.

### 1. Mental models

Before structure, understand how the audience thinks about the domain.

- What concepts do they group together naturally?
- What words do they use? (Often different from what the company uses.)
- What is the dominant frame of reference? (By task? By role? By topic? By time?)
- What do they expect to find where, based on conventions in similar products?

**Methods:**

- **Card sorting** (open or closed): Give the audience the content items, ask them to group them. Open card sorts surface natural groupings. Closed card sorts validate proposed groupings.
- **Tree testing:** Give a proposed structure, ask users to find specific items. Surfaces where the structure breaks down.
- **First-click testing:** Given a goal, where do users click first? If first clicks are wrong, the labels and structure are wrong.

### 2. Sitemap

The map of all pages and how they relate.

**Sitemap deliverables:**

- A hierarchy diagram showing parent-child relationships
- Indication of page types (static, dynamic, listing, detail)
- Cross-references showing how pages relate beyond the hierarchy
- Sometimes a separate user-flow overlay for key journeys

**Sitemap types:**

- **Hub-and-spoke** (cornerstone content + supporting content): Common for content marketing
- **Tree** (strict hierarchy, every page has one parent): Common for product documentation
- **Faceted** (content lives in many overlapping categories): Common for e-commerce
- **Flat** (everything reachable from the home): Common for small sites

Most sites blend types. Pick the dominant pattern and document the exceptions.

### 3. URL structure

URLs are part of the IA. They are user-facing, indexed by search engines, and shape how content is referenced.

**URL principles:**

- Reflect the content hierarchy
- Lowercase, hyphen-separated
- Predictable (same pattern across same content type)
- Stable (URLs don't change without redirects)
- Short (under 60 characters where possible)
- Descriptive (slug indicates the content)
- Free of dates unless time-bound
- Free of session IDs and tracking parameters in canonical form

**Common patterns:**

```
/                                   home
/[section]                          section landing
/[section]/[subsection]             subsection landing
/[section]/[subsection]/[item]      detail page
/blog                               blog index
/blog/[slug]                        blog post
/blog/category/[category]           category index
/blog/tag/[tag]                     tag index
/products                           product catalog
/products/[category]                category page
/products/[category]/[product]      product detail
```

Pick a pattern and stick to it. Inconsistent URL patterns confuse users, crawlers, and analytics.

### 4. Navigation

The chrome that gets users where they need to go.

**Primary navigation:**

- The top-level structure of the site
- Should reflect what the audience cares about, not what the org chart looks like
- 5 to 7 items maximum (more becomes cognitively heavy)
- Each label is recognizable in 2 to 3 words
- Order matters (left/first gets the most attention)

**Secondary navigation:**

- Within-section navigation
- Often shown as sidebars, sub-menus, or in-page tabs
- Supports the primary nav, doesn't duplicate it

**Utility navigation:**

- Account, search, login, support
- Visually subordinate to primary nav
- Often top-right (LTR languages)

**Breadcrumbs:**

- For nested hierarchies (3+ levels deep)
- Always linked except the current page
- Match the URL hierarchy or the conceptual hierarchy
- Marked up with BreadcrumbList schema

**Footer navigation:**

- Comprehensive; sometimes includes everything
- Organized by category for findability
- Includes secondary content (privacy, terms, contact)

### 5. Taxonomy and metadata

The classification system applied to content.

**Categories:**

- A small, controlled list (typically 5 to 15)
- Mutually exclusive ideal (one item, one category)
- Used for structural navigation

**Tags:**

- A larger, often growing list (50+)
- Multi-assignment (one item, many tags)
- Used for cross-cutting connections, related-content, and long-tail discovery

**Metadata fields:**

- Author, date, content type, audience segment
- Whatever is useful for filtering, sorting, and surfacing

**Common failures:**

- Categories that overlap (item could go in 3 different categories)
- Tags that are unmaintained (sprawl into thousands, become useless)
- Metadata fields that get filled inconsistently
- Different content types using different taxonomies for the same thing (chaos)

### 6. Labeling

What you call things.

**Label principles:**

- Audience language, not internal language
- Specific enough to be useful, short enough to scan
- Consistent across the site (call it "Product" or "Solutions" but not both)
- Tested with real users (closed card sort or tree test surfaces label problems)

**Common label problems:**

- "Solutions" (vague; usually means "products with marketing copy")
- "Resources" (catch-all; everything ends up there)
- Internal jargon ("PRD," "OKRs") that doesn't match user vocabulary
- Labels that change meaning across the site

---

## Workflow

1. **Understand the audience and content.** Use existing discovery and content strategy if available.
2. **Card sort or interview** to surface mental models.
3. **Draft the sitemap.** Hierarchy, page types, cross-references.
4. **Define URL patterns.** One pattern per content type.
5. **Design navigation.** Primary, secondary, utility, footer, breadcrumbs.
6. **Build taxonomy.** Categories (controlled, small) and tags (open, large).
7. **Validate labels.** Tree test or closed card sort with target users.
8. **Document.** Use the template in `references/ia-document-template.md`.
9. **Hand off to design and development.** IA decisions inform navigation components, URL routing, and taxonomy implementation.

---

## Failure patterns

- **IA designed by org chart.** "Engineering" and "Marketing" sections make sense to the company, not to the audience.
- **Categories that proliferate.** Every team adds a category for their thing. Becomes unscannable. Hold the line at 5 to 15.
- **Tags that sprawl.** No tag governance. Tags become a junk drawer.
- **Inconsistent URL patterns.** Some posts at /blog/[slug], some at /[slug], some at /articles/[slug]. Pick one.
- **Navigation that hides primary content.** The most important pages should be one click from home.
- **Search as a substitute for IA.** "Just use search" is not a structure. Search supports IA, doesn't replace it.
- **No validation.** Card sorts, tree tests, and first-click tests are cheap and surface huge problems early.
- **Treating IA as a one-time deliverable.** IA evolves with content. Plan for evolution.

---

## Output format

Default output is an IA document at `information-architecture.md` plus visual assets:

1. Executive summary
2. Audience and mental models (synthesized)
3. Sitemap (hierarchical diagram)
4. URL structure (per content type)
5. Navigation specification (primary, secondary, utility, footer, breadcrumbs)
6. Taxonomy (categories and tag governance)
7. Labels (validated wording for navigation, categories, content types)
8. Implementation notes for design and development

Visual deliverables:
- Sitemap diagram (Whimsical, Figma, OmniGraffle, etc.)
- Navigation wireframes for primary surfaces
- Optional: card sort and tree test results

---

## Reference files

- `references/ia-document-template.md` - Template for the IA deliverable.
- `references/url-pattern-library.md` - URL pattern conventions for common content types.

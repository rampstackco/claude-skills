# Information Architecture Document Template

A fillable template for the IA deliverable. Captures the sitemap, navigation, content types, taxonomy, and URL conventions.

The IA document is the single source of truth for "what is this site, structurally." Engineering, design, content, and SEO all reference it.

---

## Project metadata

**Site / app:** [Name]
**Phase:** [New build / restructure / refresh]
**Date:** [YYYY-MM-DD]
**IA lead:** [Name]
**Status:** [Draft / In review / Approved]

---

## 1. Audience and intent

The IA serves audience tasks. Start with the tasks.

### Primary audiences

| Audience | Top tasks on this site |
|---|---|
| | |
| | |
| | |

### Top tasks

The 5-10 things people most commonly want to do or find.

1. [Task]
2. [Task]
3. [Task]
4. [Task]
5. [Task]

Each task should be discoverable in 3 clicks or fewer from the homepage.

---

## 2. Sitemap

The full set of pages the site contains, organized by hierarchy.

### Top-level navigation

The 4-7 sections that appear in the main nav.

```
Home
├── [Section 1]
├── [Section 2]
├── [Section 3]
├── [Section 4]
├── [Section 5]
└── [Utility nav: Login, Search, Cart, etc.]
```

### Full sitemap

```
Home (/)
├── Section 1 (/section-1/)
│   ├── Sub-page 1.1 (/section-1/sub-page-1-1/)
│   ├── Sub-page 1.2 (/section-1/sub-page-1-2/)
│   └── Sub-page 1.3 (/section-1/sub-page-1-3/)
├── Section 2 (/section-2/)
│   ├── Category 2.1 (/section-2/category-2-1/)
│   │   └── Detail pages (/section-2/category-2-1/[slug]/)
│   └── Category 2.2 (/section-2/category-2-2/)
├── Section 3 (/section-3/)
├── About (/about/)
├── Contact (/contact/)
├── Legal
│   ├── Privacy (/privacy/)
│   ├── Terms (/terms/)
│   └── Cookies (/cookies/)
└── 404 (/[unmatched])
```

### Pages outside primary nav

Pages that exist but are not in the top nav. Reachable from footers, contextual links, search, or direct entry.

| Page | URL | Reached from |
|---|---|---|
| | | |
| | | |

---

## 3. Navigation

### Primary nav

- **Items:** [List]
- **Behavior on desktop:** [Always visible / dropdown / mega menu]
- **Behavior on mobile:** [Hamburger / bottom nav / slide-in]
- **Active state indicator:** [Underline / color / weight]
- **Sticky on scroll:** [Yes / no]

### Secondary nav

If applicable. Examples: section nav within a section, sidebar nav for docs, breadcrumbs.

- **Used in:** [Sections]
- **Pattern:** [Sidebar / breadcrumbs / tabs / pills]

### Utility nav

Login, search, cart, language switcher, account. Where they live on desktop and mobile.

### Footer nav

Comprehensive map of the site, plus legal and contact.

- **Sections:** [Group names and what is in each]
- **Treatment:** [Links only / links + descriptions / multi-column / single column on mobile]

---

## 4. Content types

The reusable patterns that pages fall into. Each content type has a defined schema.

### Content type: [Name, e.g., "Article"]

- **Purpose:** [What this content type is for]
- **Required fields:** [Title, body, author, publish date, etc.]
- **Optional fields:** [Hero image, related articles, summary]
- **URL pattern:** [`/blog/[slug]/`]
- **Template:** [Which page template renders this]
- **SEO defaults:** [Default title pattern, meta description pattern, schema type]
- **Open Graph defaults:** [OG image source, OG type]

(Repeat for each content type: page, article, product, case study, landing page, author, category, tag, etc.)

---

## 5. Taxonomy

How content is organized and tagged for filtering, related-content surfacing, and navigation.

### Categories (hierarchical)

The primary classification, often used in URLs.

- Category 1
  - Subcategory 1.1
  - Subcategory 1.2
- Category 2

Categories are typically mutually exclusive (a piece belongs to one).

### Tags (flat, multi-select)

Cross-cutting attributes a piece can have multiple of.

- [Tag]
- [Tag]
- [Tag]

### Custom taxonomies

Domain-specific facets (e.g., for a recipe site: cuisine, dietary, cook time, meal type).

| Taxonomy | Values | Used by content types |
|---|---|---|
| | | |
| | | |

---

## 6. URL conventions

See `url-pattern-library.md` for the full URL pattern reference. The IA document captures decisions specific to this site.

| Type | Pattern | Example |
|---|---|---|
| Home | `/` | `/` |
| Static page | `/[slug]/` | `/about/` |
| Section landing | `/[section]/` | `/products/` |
| Article detail | `/blog/[slug]/` | `/blog/how-to-x/` |
| Product detail | `/products/[slug]/` | `/products/widget/` |
| Category archive | `/category/[slug]/` | `/category/news/` |
| Tag archive | `/tag/[slug]/` | `/tag/announcements/` |
| Author page | `/author/[slug]/` | `/author/jane-doe/` |
| Search results | `/search/?q=[query]` | `/search/?q=widget` |

### Trailing slash policy

[All URLs end with trailing slash / no trailing slash. Pick one and enforce via redirect.]

### Casing

[Lowercase only. Hyphens for word separation.]

---

## 7. Search

- **In-site search included?:** [Yes / no]
- **Source of truth:** [Internal index, Algolia, Elasticsearch, native CMS search]
- **Surface in nav:** [Always visible / icon-only / hidden behind utility nav]
- **Result page URL:** [`/search/?q=[query]`]
- **Result types:** [Pages, articles, products, etc.]
- **Filters:** [What filters appear on the result page]
- **Empty-state message:** [Text and suggested actions]

---

## 8. Cross-linking strategy

How pages link to other pages within the site.

### Hub-and-spoke

Pillar pages (hubs) link to related detailed pages (spokes). Spokes link back to the hub.

| Hub | Spokes |
|---|---|
| `/topic-area/` | `/topic-area/[detail-1]`, `/topic-area/[detail-2]` |

### Related content blocks

Where they appear, what populates them.

- **Article footer:** [Same category / same tag / manually curated]
- **Product detail page:** [Same category, similar price, frequently bought with]
- **Sidebar:** [Trending, recent]

### Contextual links in body copy

The single highest-value cross-link mechanism. Editorial guidelines:

- Link the first natural mention of a related topic
- 2-5 contextual links per article
- Anchor text describes the destination, not "click here"

---

## 9. Pagination, infinite scroll, and load more

For listing pages (archives, search, category, etc.).

| Listing type | Pattern | Page size | URL behavior |
|---|---|---|---|
| Article archive | Pagination | 10 per page | `/blog/page/2/` |
| Search results | Load more | 20 per page | URL stays at `/search/?q=...` |
| Product grid | Pagination | 24 per page | `/products/?page=2` |

Pick deliberately. Each pattern affects SEO, accessibility, and analytics.

---

## 10. Multilingual / multi-region

If applicable. See `internationalization` skill for full guidance.

- **Languages supported:** [List]
- **Regions supported:** [List]
- **URL pattern for locale:** [`/en/`, `/es/` subdir / `en.example.com` subdomain / no prefix on default locale]
- **Hreflang strategy:** [How locale alternates are declared]
- **Default locale fallback:** [What happens for unmatched locales]

---

## 11. Open questions

- [ ] [Question]
- [ ] [Question]
- [ ] [Question]

---

## 12. Change log

| Date | Change | Approved by |
|---|---|---|
| | | |
| | | |

---

## Sign-off

IA approved by:

- IA lead: [Name, date]
- Engineering lead: [Name, date]
- Content lead: [Name, date]
- SEO lead: [Name, date]

Implementation can begin: [Date]

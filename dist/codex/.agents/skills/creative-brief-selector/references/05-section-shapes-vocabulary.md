# Section shapes vocabulary

A canonical, open vocabulary of section shapes the brief picks from for the hero and footer sections (with optional later extension to trust-strip, CTA-close, and how-it-works sections). The vocabulary is a starting point, not a closed enum. Builds can document and propose a new shape if none of the listed labels fits.

Section shapes are first-class brief outputs. The brief picks a shape per section explicitly and records the rationale next to palette and voice rationale. Two new fields per signature record (`hero_shape` and `footer_shape`) let the divergence check fire against shape collision across shipped demos.

The divergence rules for shapes are in [`03-divergence-check.md`](03-divergence-check.md) (Rules 4, 5, 6).

---

## Hero shapes (open list, starting set)

### `dual-column-image-and-text`

Image on one side of the hero, heading and lede and CTAs on the other. CSS grid with two columns (often around 1.1fr / 1fr). The engine's house default and the shape most prone to overuse in a portfolio that grows without explicit shape selection.

- **When it fits**: brands where the photograph and the type carry roughly equal weight and the eye is meant to ricochet between them. Premium DTC product hero is the canonical fit; a single product on the image side and a price-and-CTA on the type side.
- **References**: [allbirds.com](https://allbirds.com), [tecovas.com](https://tecovas.com).
- **Archetype affinities**: Luxe Considered, Warm Conversational, Editorial Restrained (mild).

### `wide-photograph-with-band-below`

Single full-width hero photograph (aspect 16:9 or wider) spanning the content width, with structured content (search rail, CTA pair, lede, filter chips) stacked vertically below the photograph. The photograph carries the page; the band below carries the affordances.

- **When it fits**: inventory marketplaces, regional specialists, sites where the photograph signals what the marketplace is for and the band carries the controls. Also fits magazine-style editorial registers where one strong image opens an article.
- **References**: [bringatrailer.com](https://bringatrailer.com), [icon4x4.com](https://icon4x4.com).
- **Archetype affinities**: Rugged Utilitarian, Documentary Honest, Editorial Restrained.

### `full-bleed-image-with-overlay`

Image fills the section (or near-fills, often at `object-cover` with `absolute inset-0`), with type overlaid via a gradient. Dramatic, cinema-poster register. Strongest visual signal of all hero shapes; correspondingly the easiest to over-saturate.

- **When it fits**: hospitality experiences where the place is the product (balloon ride, restaurant, hotel), mission-driven nonprofits where the documentary photograph is the evidence, premium B2B where the product is photographed at scale. Atmospheric and cinematic.
- **References**: [bombasses.com](https://bombasses.com) (hospitality), [charitywater.org](https://charitywater.org) (institution-mission).
- **Archetype affinities**: Documentary Honest, Luxe Considered (composed with Documentary Honest), Editorial Restrained.

### `type-led-prose`

No image in the hero. The H1 and lede do the work; image (if any) appears below the hero as a supporting element. Editorial publication register. The whitespace and the type carry the page.

- **When it fits**: editorial publications, ideas-led brands, B2B SaaS where the proposition is conceptual, premium consultancies, law and finance where understated credibility is the play.
- **References**: [nytimes.com](https://nytimes.com), [stripe.com](https://stripe.com) (mild type-led, with type leading and a subtle product render below).
- **Archetype affinities**: Editorial Restrained, Technical Precise (mild).

### `centered-single-column`

Narrow content column centered on the page, H1 and lede only, minimal. Often paired with atmospheric brand registers where the centered alignment signals "considered, not loud."

- **When it fits**: portfolio brands, atmospheric or contemplative registers, single-product brands where the page is essentially a long-scroll story and the hero is just the opening line.
- **References**: [linear.app](https://linear.app), [framer.com](https://framer.com) (both run centered single-column heroes at times).
- **Archetype affinities**: Editorial Restrained, Luxe Considered.

### `asymmetric-large-image-small-text`

One element dominates the hero (usually an image at 70 to 80 percent of width), the other is caption-scale beside or below it. Distinct from `dual-column-image-and-text` by the imbalance: the dual-column is roughly balanced, the asymmetric leans heavily.

- **When it fits**: magazine cover style, photography portfolios, single-product hero where the product carries everything and the type is a caption-scale credit line.
- **References**: [magnum.com](https://magnum.com), [aesop.com](https://aesop.com) (varies; some pages use asymmetric layouts).
- **Archetype affinities**: Luxe Considered, Documentary Honest, Editorial Restrained.

### `grid-of-elements`

The hero IS a grid: product tiles, listing cards, directory entries, no single anchor image. The inventory or directory itself is the hero. Distinct from `wide-photograph-with-band-below` by having no single dominant image; the grid carries the meaning.

- **When it fits**: directory and marketplace shapes where the breadth of the catalog is the value, ecommerce catalog shapes where shoppability above the fold is the conversion lever.
- **References**: [airbnb.com](https://airbnb.com) (search results hero is the grid), [unsplash.com](https://unsplash.com).
- **Archetype affinities**: Technical Precise, Editorial Restrained (with restraint), Rugged Utilitarian (if the directory is the working catalog).

### `data-table-or-spec-led`

A data table or spec block is the hero element. The numbers and the comparison carry the page. Technical Precise register, B2B engineering context, comparison-led purchase decisions.

- **When it fits**: B2B engineering procurement, hardware comparison sites, financial product comparison, anywhere the buyer is data-anchored before they care about photography.
- **References**: [parametric-portfolios.com](https://parametric-portfolios.com), [substack.com/pricing](https://substack.com/pricing) (pricing-table-as-hero variants).
- **Archetype affinities**: Technical Precise, Editorial Restrained.

---

## Footer shapes (open list, starting set)

### `single-line-strip`

One row carrying the brand disclosure paragraph and the footer nav, no multi-column structure. Mobile and desktop render the same content reflowed. The default across most demos in the showcase portfolio.

- **When it fits**: small-collection brands, single-purpose microsites, demo and showcase contexts, brands where the footer is meant to be functional chrome rather than navigation in its own right.
- **References**: most editorial brand sites with a small surface area.
- **Archetype affinities**: any; this is the chrome default.

### `multi-column-sitemap`

Three to six columns of links plus brand info. Common on larger commerce sites where the footer carries category navigation, popular searches, account shortcuts, customer service, about-the-company, and resources.

- **When it fits**: ecommerce catalog with deep category trees, multi-tenant marketplaces with seller-side and buyer-side links, B2B sites with documentation libraries.
- **References**: [amazon.com](https://amazon.com), [shopify.com](https://shopify.com), most large retailers.
- **Archetype affinities**: Technical Precise, Rugged Utilitarian (if functional), any commerce-heavy archetype.

### `type-only-no-links`

Minimal editorial footer, copyright and disclosure only, no nav. The footer is essentially a colophon.

- **When it fits**: ideas-led brands, single-page narratives, publications where the nav lives in the top chrome and the bottom is just the credit line.
- **References**: [pitchfork.com](https://pitchfork.com) (varies; minimal footer), portfolio sites.
- **Archetype affinities**: Editorial Restrained, Luxe Considered.

### `editorial-colophon-with-masthead`

Masthead-style footer naming the editorial team or contributors. Fits publication register where the footer credits the people behind the work.

- **When it fits**: publications, magazine sites, editorial collectives, organizations where the people are the brand.
- **References**: [theatlantic.com](https://theatlantic.com), [theverge.com](https://theverge.com).
- **Archetype affinities**: Editorial Restrained, Documentary Honest.

### `newsletter-band-with-credits`

Newsletter signup as the dominant footer element, with credits below. The newsletter is the conversion goal; the footer is the conversion surface.

- **When it fits**: content sites, newsletter-first publications, brands where the newsletter is the customer-relationship channel.
- **References**: [substack.com](https://substack.com), most content sites operating newsletter-led growth.
- **Archetype affinities**: Editorial Restrained, Warm Conversational.

### `dark-cta-then-credits`

Two-row footer with a dark CTA band on top and a credits strip below. The CTA band acts as the page-bottom conversion surface; the credits strip is the actual footer.

- **When it fits**: conversion-led sites where the bottom of the page is the second-most-attended surface (after the hero), marketing sites, B2B with a sign-up funnel.
- **References**: [vercel.com](https://vercel.com), [linear.app](https://linear.app).
- **Archetype affinities**: Technical Precise, any conversion-led register.

---

## Optional extensions (not formally checked at this dispatch's scope)

The framework can grow to cover additional section shapes as the portfolio surfaces them. Currently documented loosely; not part of the divergence check fields.

- **Trust-strip shapes**: four-signal block, two-paragraph narrative band, logo wall, citation row.
- **CTA-close shapes**: dark band with single CTA, gradient band with pair of CTAs, image-backed close, newsletter close.
- **How-it-works shapes**: three-card strip, numbered list with images, flow diagram, timeline.

When a brief's shape choice for one of these sections proves load-bearing for the build's distinctness, a future framework dispatch can promote the section to a checked field.

---

## How to extend the vocabulary

A build that discovers a section shape not present in the vocabulary:

1. Documents the shape in the brief with a name (kebab-case), a one-paragraph description, and one or two real-world references.
2. Adds the shape to this file under the appropriate section (hero or footer) with the same format the existing shapes use.
3. Commits the vocabulary addition in the build PR.

The vocabulary grows with the portfolio. Stale shapes (no demo uses them, no live references remain) can be retired in subsequent dispatches.

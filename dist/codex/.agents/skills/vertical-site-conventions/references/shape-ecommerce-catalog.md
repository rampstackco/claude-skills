# Shape: ecommerce-catalog

Dense catalog storefronts. Auto-parts, hardware, industrial supply, mass-merchant retail. The reader arrives with a part to find or a category to browse. The build leads with the path that gets them to the part.

This file is a default set of composition conventions for the shape. When `competitor-experience-audit` has been run for the specific vertical (auto-parts, hardware, tooling), the audit's experience bar overrides these defaults. Use these when no audit has been run, or as a sanity check on an audit's output.

---

## 1. Primary-task prominence

**Primary task:** the path to a part. For verticals where compatibility matters (auto-parts, electronics), this is a fitment / compatibility selector. For undifferentiated catalogs (hardware, office supply), this is a search input. For mass merchants, this is category-entry-grid.

**Build conventions:**
- The primary task is the largest, earliest interactive element. Not a sidebar widget; not a modal triggered by a marketing CTA.
- Competing CTAs (newsletter, account, brand pitch) live below the fold or in the chrome.
- The primary task is sticky to the chrome on scroll. A visitor mid-page who realizes the fitment is wrong can change it without scrolling back to the hero.
- For fitment-led verticals: setting the vehicle / compatibility once carries to every subsequent page. The selection is the global context, surfaced visibly.

## 2. Layout register and density

**Register:** storefront-dense. Not editorial; not marketing-airy. The page is a working surface, not a brand brochure.

**Build conventions:**
- More than four modules above the fold on desktop is normal for this shape. Two-module heros are off-vertical.
- **Above the fold at a 1280x800 desktop viewport** (not "the first or second viewport"; the assertion is hard) the page carries: the primary task, the category surface band, AND at least one merchandising or trust signal. A category band that requires any scroll to reach reads as airy and off-vertical for this shape; a real build verifies this against a rendered capture, not in prose.
- Whitespace is functional, not generous. The leaders in this shape are dense; an airy build reads as not-a-real-store.
- Route color, type, and aesthetic to `creative-direction` and `design-standards`. This shape's register can be utilitarian, premium-utilitarian, or technical; not flowery or expressive.

## 3. Merchandising and category surface

**Conventions:**
- A category surface band sits **above the fold at a 1280x800 desktop viewport.** Eight to twelve category entry points is typical for a wide catalog; four to six for a focused one. ("First or second viewport" is too loose; a real build hit that and still read airy because the band slipped below the fold.)
- Depth signaling is one of: mega-menu hover (broad catalogs), grid of category cards on the home (narrow catalogs), faceted-search side rail on category pages. Pick one; do not stack.
- Category cards carry an icon, an image, or a tight text-only treatment. Hybrid icon-plus-text reads as catalog; image-only reads as marketing.
- Hierarchical surface (parent plus child categories) is conventional for broad catalogs. Flat surface fits focused catalogs.
- A **promotional or deal surface** lives near the top: a deal-of-the-week strip, a promo band, a featured-offer row. The field carries it to signal "this is an active store with offers." Its absence reads as brochure-like rather than storefront-like. The promo can be a single strip with one or two offers; it does not have to be a full module.
- An **inventory or catalog-depth signal** appears somewhere a first-time visitor will see it: a part count, "12,000+ parts in stock," a category-count figure, or a near-equivalent that establishes the catalog has real depth. The field carries it as a credibility move; its absence reads as a thin or demo catalog. The figure can be approximate, can be in the hero, the trust band, or the chrome.
- Featured / promoted collections appear below the category surface, not above; categories carry the navigation load. (The promotional surface above is distinct from featured collections; one is a deal band, the other is a curation grid.)

## 4. Navigation and search paths

**Paths the shape carries:**
- By category: primary. Always present.
- By search: primary. Always present, in the header.
- By brand or manufacturer: secondary to primary for broad catalogs (often a band in the chrome or a top-level page).
- By attribute (price, size, color, condition): primary on category pages via the faceted side rail.
- By vehicle / compatibility / fitment: primary for compatibility-led verticals; absent for undifferentiated catalogs.
- Newsletter, account, cart: chrome-level secondary affordances.

**Build conventions:**
- Search input is in the header, not in a side panel. Visible width meaningful (not collapsed to an icon).
- Faceted filtering on the listing page is conventional; flat lists are off-vertical for broad catalogs.
- Sort options (price asc, price desc, name, relevance) are visible on the listing.
- Search and category browse coexist; one is not gated behind the other.

## 5. Brand register and conviction

**Typical postures:** utilitarian, premium-utilitarian, technical, value-led. Cross-reference `creative-direction` and `brand-archetype-system` for the controlled vocabulary; do not invent new register names here.

**Build conventions (consistency, not register choice):**
- The register carries into the empty states, the cart, the demo modals, and the trust signals. A premium-utilitarian register that dissolves into generic copy below the fold is a composition failure.
- Voice consistency in headings, microcopy, CTAs, and empty states.
- Product imagery posture is consistent: studio product photography across listing and detail; lifestyle imagery in the hero or category headers, if used at all.

## 6. Trust and conversion signals

**Signals this shape carries:**
- Reviews / ratings: average plus count on listing cards and at the top of the detail page. If reviews are absent, surface an alternative (warranty, return policy, brand reputation).
- Pricing transparency: price visible on the listing card; total cost (price plus shipping plus tax) surfaced before checkout, not after.
- Stock signals: in stock, low stock, lead time, backorder. Surfaced on the listing and detail.
- Fitment / compatibility confirmation: required for fitment-led verticals. The confirmation badge ("confirmed to fit your {vehicle}") on the detail page is conventional.
- Shipping promises: free over $X, same-day, two-day. Surfaced in the chrome or hero.
- Return policy: linked from the cart and the detail page. The exact text is in `terms` or `returns`.
- Brand or store badges: certifications, "X years in business", authorized-dealer, where relevant.

For showcase or demo builds, the functional-vs-demo line: real where touchable (real cart state, real fitment filtering), honestly demo where it needs a backend (clearly labeled demo checkout modal, no fake payment, no real account creation).

## 7. Recurring vertical conventions (the synthesis)

A credible ecommerce-catalog storefront, against the field of leaders, carries eleven conventions:

1. A primary task that owns the hero (fitment, search, or category-grid; not a brand pitch).
2. **(Density-bearing)** A category surface band **above the fold at a 1280x800 desktop viewport**, not buried in a menu and not requiring scroll to reach.
3. Working faceted filtering on category pages.
4. A persistent global context indicator if the vertical is fitment-led (the confirmed vehicle, the selected compatibility, the active filter set).
5. Visible price on every listing card, with no "click to reveal".
6. Reviews or an explicit substitute (warranty, return policy) near the buying action.
7. A working cart with real client-side state across pages.
8. A clearly labeled checkout flow (real in production; honestly demo in showcase builds).
9. **(Density-bearing)** A promotional or deal surface near the top: a deal-of-the-week strip, a promo band, or a featured-offer row.
10. **(Density-bearing)** An inventory or catalog-depth signal a first-time visitor will see (a part count, an SKU total, a category count, or a near-equivalent).
11. **(Density-bearing, new)** Section count and merchandising volume at the field's level, not at a token-row level. A credible storefront carries roughly thirteen-plus distinct merchandising surfaces top-to-bottom on the home (desktop and mobile each, mobile typically taller), three SKU rails carrying twelve-plus product cards in total, a multi-card deals grid of four-to-eight distinct deal cards (not a single thin promo strip), a category grid of eight-plus photographic tiles, a four-to-six-cell services and trust band, twenty-five-plus distinct images on the home, and a five-to-seven-column footer. A build that hits conventions 2, 9, and 10 with one four-card rail and a five-tile category band passes the presence-check and still reads thin against the field; the bar is volume, not presence.

**Threshold and density-bearing items.** A build hitting 9 or more of these is at the experience bar for the shape; the wedge is what the build does beyond that. A build missing 3 or more is off-vertical and needs composition work, not a polish pass.

Conventions **2, 9, 10, and 11 are the density-bearing ones**, the items whose absence makes a checklist-passing build still read airy or brochure-like instead of storefront-dense. A build can miss a nice-to-have (a strong substitute for reviews, for example) and still read as the vertical; missing any of the density-bearing four is the failure mode the auto-parts builds exposed across multiple iterations. Treat the density-bearing items as non-skippable: if any one is missing, the build will read off-vertical regardless of how many other conventions it hits.

**Why convention 11 needed to be added separately.** Before this entry, a build could carry the category band, the promo strip, and the inventory signal (conventions 2, 9, 10) and still read thin, because the prior conventions named *which* sections, never *how many* or *how full*. A category band with five tiles passed convention 2; a promo strip with one offer passed convention 9; a part-count badge passed convention 10. The build read storefront-correct on the checklist and read SaaS-airy in a rendered comparison against the field. Convention 11 closes that gap: the bar is the field's actual volume, observed top-to-bottom on a rendered home page, not a presence-check that any single token instance satisfies.

---

## Capture-path note (audit infrastructure)

The named field leaders in heavily-defended verticals (auto-parts is one) sit behind CDN/WAF bot-mitigation layers that block Fork A rendered capture even with realistic User-Agent strings. In a render-and-match attempt against the four leading parts retailers, all four were intercepted (Cloudflare, Akamai 403, DataDome interstitial, network-idle timeout) and Fork A returned zero homepage content. A synthesis pass on zero captured content silently falls back to training-knowledge abstraction, which is the exact failure mode this shape was added to defend against.

**The lesson, recorded as audit-infrastructure guidance for this shape:** in bot-walled verticals, the realistic capture path is screenshot ingestion (a human takes desktop and mobile screenshots of each leader and drops them at a known path; the audit reads the PNGs with vision and produces the section-and-density target from observed evidence). Render-and-match through Fork A alone is not a reliable capture path for this shape. The audit script's selection of capture path should treat Fork A as the default and fall back to screenshot ingestion when zero or trivial content is returned; absent that fallback, the audit silently degrades to abstraction and the build it informs reads thin.

---

## Common positioning wedges in this shape

From the gaps the audited fields tend to share:

- **Fitment-first as the entire navigation pattern.** Most catalogs treat fitment as a sidebar widget. A build that makes fitment the primary, persistent, single-source-of-truth navigation owns the "wrong-fit return is impossible" position.
- **Pricing transparency to the dollar.** Most catalogs hide total cost until checkout. A build that surfaces shipping plus tax on the listing card owns the "no surprises" position.
- **Honest stock and lead-time signals.** Most catalogs use "low stock" theatrically. A build that names actual lead time owns the "we tell you when it ships, not what we want you to feel" position.
- **Real reviews vs review theater.** Most catalogs surface 4.7-star aggregates that no one trusts. A build that surfaces verified-buyer reviews with the bad ones visible owns the trust position.

Pick one wedge per build. Two wedges dilute the positioning; zero wedges hits the bar without a reason to remember.

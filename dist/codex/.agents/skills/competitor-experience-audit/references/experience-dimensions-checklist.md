# Experience Dimensions Checklist

Score each leading site on each dimension using the observable questions below. Mark `not_assessable` whenever the evidence does not support a judgment; do not guess. The audit's value rests on honest observation.

The rule for every dimension: name what is observably true across the field, not whether you like it. If you cannot point at a specific observable thing, you are giving taste, not a pattern.

---

## 1. Primary-task prominence

The visitor arrives with a primary job. The leading sites either lead with that job or bury it.

- [ ] What is the largest, earliest interactive element on the first viewport?
- [ ] Does that element correspond to the visitor's primary task in the vertical? (Auto-parts: a fitment selector. Hospitality-food: a menu or reservation entry. Inventory-listing: a search or filter. Local-service-booking: a "book now" or service picker.)
- [ ] How many clicks or scrolls from arrival to completing the core task?
- [ ] How many competing CTAs share the hero with the primary task?
- [ ] Is the primary task reachable from a sticky element on scroll?

Rendered required: **partial.** The primary task can usually be identified from a static fetch (it is in the markup), but its visual dominance and protection from competitors requires the rendered view.

---

## 2. Layout register and density

Storefront, editorial, marketing-airy, hybrid. Cross-reference `creative-direction` aesthetic positions (editorial-restrained, polished-standard, controlled-maximalist, expressive-maximalist) for vocabulary.

- [ ] How many distinct modules appear above the fold on a standard desktop viewport?
- [ ] How many on a mobile viewport?
- [ ] What is the content-per-viewport ratio: dense (a catalog or storefront), calm (an editorial), generous (a landing page or brochure)?
- [ ] Where does the page read as a storefront vs a marketing page?
- [ ] Does the whitespace ratio match a retail or a publication register?

Rendered required: **yes.** Static HTML cannot tell you what users see in the first viewport.

---

## 3. Merchandising and category surface

How much of the catalog or offering is surfaced at once, and in what shape.

- [ ] How many category, collection, or entry-point modules appear before scroll?
- [ ] How is depth signaled (mega-menu hover, fly-out, side rail, faceted search, breadcrumb expansion)?
- [ ] Is the surface flat (one tier visible) or hierarchical (parent plus child)?
- [ ] Are the categories shown as text, icon, image, or hybrid?
- [ ] Is a search-first path offered alongside the category-first path?

Rendered required: **partial.** Counts and structure show up in static markup; visual emphasis and reveal patterns need rendering.

---

## 4. Primary navigation and search paths

The know-what-I-want path and the browse path. Both, or only one.

- [ ] Is a search input prominent (in the header, large input), secondary (small, in a side panel), or absent?
- [ ] Which paths does the primary nav offer (by category, by brand, by attribute, by vehicle, by location, by occasion, by audience)?
- [ ] Score each available path: primary / secondary / absent.
- [ ] Where does the primary nav sit (top bar, side drawer, mega-menu, sticky)?
- [ ] On mobile, does the primary nav collapse into a hamburger or stay flat?

Rendered required: **partial.** Path inventory is in the static markup; visual prominence and primary-vs-secondary judgment needs the rendered view.

---

## 5. Brand register and conviction

The posture the leading sites take and whether they hold it across the page.

- [ ] Color palette: muted / saturated; warm / cool; monochrome / multi-hue.
- [ ] Typography: humanist / geometric / serif-led / display-led; one face or paired.
- [ ] Imagery: photographic (studio, lifestyle, editorial); illustrated; abstract; none.
- [ ] Voice in headings: direct, persuasive, technical, warm, plain, institutional.
- [ ] Voice in microcopy and CTAs: matches the heading voice or breaks from it.
- [ ] Brand posture: utilitarian / premium / friendly / institutional / technical / expressive.

Cross-reference `creative-direction` and `brand-archetype-system` for the controlled vocabulary; use those terms rather than inventing new ones.

Rendered required: **yes.** Brand register is a visual judgment; static HTML alone cannot support it.

---

## 6. Trust and conversion signals

The recurring conventions a credible commercial page in this vertical carries.

- [ ] Reviews / ratings present (where, how prominent, count or average shown).
- [ ] Guarantees (return policy, money-back, warranty) surfaced or hidden.
- [ ] Pricing transparency: price visible without interaction; total cost surfaced before checkout; "starting at" or full?
- [ ] Stock or availability signals (in stock, low stock, lead time).
- [ ] Fitment, sizing, eligibility, or compatibility confirmation (where the vertical requires it).
- [ ] Shipping or service-level promises (ETA, free over $X, same-day).
- [ ] Institutional trust signals (years in business, association badges, certifications).
- [ ] Social proof (logos of customers, press mentions, testimonials).

Rendered required: **partial.** Many trust signals are visible in markup; placement and emphasis are rendered judgments.

---

## 7. Recurring vertical conventions (synthesis)

The patterns that recur across the field define what a credible site in this vertical is expected to have. This is not a new measurement; it is the synthesis of dimensions 1 through 6.

- [ ] Which conventions appear on 3 of N or more of the leaders?
- [ ] Which appear on fewer than 3 (single-site moves, not conventions)?
- [ ] Which are absent across the field (the gap a positioning opportunity exploits)?

The output of this dimension is a short list: "If your build does not do X, Y, Z, it will read as off-vertical." That list is what goes into the experience bar.

---

## Scoring rubric

For each dimension, score the field (not a single site):

- **Pattern present.** 3 of N or more leaders converge on a recognizable convention. Name it.
- **Mixed.** The field splits across two or three distinct approaches. Name each, and note which the new build should adopt.
- **Gap.** No convention emerges, or every leader misses the dimension. Often this is the positioning opportunity.
- **Not assessable.** The evidence does not support a judgment. Name what evidence would be needed.

For each site (operated-side only; the public version drops named scores):

- Mark each dimension `pattern-aligned`, `outlier`, or `not assessable`.

---

## What this checklist will not do

- Rate a single site's design taste. Use `design-standards` for production design review.
- Tell you which vertical your build belongs in. The vertical and field are inputs to this skill, not outputs.
- Replace user research. Use `ux-research` and `usability-testing` for real-user assessment.
- Generate creative direction from scratch. Use `creative-direction` and `brand-discovery` for that.
- Produce a SERP or backlink competitive analysis. Use `seo-competitor`.

This checklist names patterns and gaps so a downstream build has a real bar to meet. Everything else is out of scope.

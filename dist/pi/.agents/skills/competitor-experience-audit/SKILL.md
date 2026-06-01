---
name: competitor-experience-audit
description: "Audit the brand, UX, and site design of the leading sites in a vertical as a set of observable cross-site patterns, producing the experience bar a new build must meet or beat. Use this skill whenever the user wants to assess the competitive design field, capture vertical conventions, identify the design and UX bar of a category, or set the experience standard before a build. Triggers on competitor experience audit, UX audit, site design audit, brand audit, design conventions, what makes these sites good, vertical conventions, storefront patterns, merchandising patterns, layout density, primary task, design bar, category conventions, retail vs marketing register, what does the field do. Also triggers when an audit of the competitive field has captured technical signals (SEO, accessibility) but never named the brand, UX, or design conventions, and the build downstream will read as off-vertical without that bar."
category: research
catalog_summary: "Cross-site experience patterns and gaps across a vertical"
display_order: 6
---

# Competitor Experience Audit

Capture the brand, UX, and site design that the leading sites in a vertical observably share, and where they fall short. The output is the experience bar a new build must meet or beat, grounded in cross-site patterns rather than aesthetic opinion.

Stack-agnostic. Works on any SiteShape (ecommerce-catalog, inventory-listing, hospitality-food, b2b-manufacturer, and so on). Auto-parts catalogs are the first test case, not the only target.

This skill is the brand / UX / design counterpart to a technical audit like `seo-onpage` or `accessibility-audit`. Technical findings are objective (a missing canonical is missing). Design is more subjective, so this skill is deliberately written to make the subjective assessable: every dimension is judged by observable questions about what the leading sites actually do, reported as patterns and gaps, and marked `not_assessable` whenever the evidence does not support a judgment.

---

## When to use

- Setting the experience bar for a new build in a vertical you have not built in before
- Capturing the design and UX conventions a credible site in the category is expected to carry
- Auditing the competitive field for a critic or strategy review where SEO and accessibility have been covered but design and experience have not
- Naming the positioning opportunity that recurs across the leaders (the gap even the leaders share)
- Pairing with a technical audit (SEO, accessibility) so the competitor review captures both axes

## When NOT to use

- Rating a single page or one brand's design taste in isolation (use `design-standards` or `brand-style-guide` for production design decisions on a known build)
- Backlink, keyword, or SERP-overlap competitive analysis (use `seo-competitor`)
- Generating a creative direction from scratch for a new brand (use `creative-direction` and `brand-discovery`)
- User research with real participants on your own product (use `ux-research`, `usability-testing`)
- Auditing a single page's on-page SEO or accessibility against the audit suite (use `seo-onpage`, `accessibility-audit`)

---

## Required inputs

- The vertical and a list of the leading sites in it (3 to 6 sites; more than 6 stops surfacing new patterns)
- Access to the rendered sites (a real browser view, not just static HTML; see "Static vs rendered" below)
- The site shape the audit feeds, if known (ecommerce-catalog, inventory-listing, etc.); this scopes which dimensions to weight
- Any explicit constraint on the build downstream (the brand voice, the audience, the conversion the build will own)

If the list of leading sites is unknown, ask. Picking the wrong field produces an experience bar against the wrong vertical.

### Static vs rendered

Some dimensions can be partially assessed from static HTML (primary navigation, the catalog/category surface count, the presence of search). Most cannot. Layout density, brand register, motion, trust-signal prominence, and the rendered hierarchy of the first viewport all need the rendered page to judge honestly. If you only have static HTML for a site, mark every rendered-only dimension `not_assessable` for that site rather than guessing.

---

## The framework: 7 experience dimensions

Each dimension is judged by observable questions across the leading sites in the field, then reported as a cross-site pattern plus the gap (where the leaders converge, and where even they fall short).

Score each dimension as `Pattern present` (the field converges on a recognizable convention), `Mixed` (the field splits across two or three approaches), or `Gap` (no convention emerges, or every leader misses it). Mark `not_assessable` when the evidence cannot support a judgment.

Never write `Good design` or `Bad design` or any aesthetic verdict. The dimensions are about what the field observably does, not whether you like it.

### 1. Primary-task prominence

Does the site lead with the visitor's primary job, or bury it?

- What is the largest, earliest interactive element on the first viewport? (For auto-parts: typically a fitment selector. For hospitality-food: a menu or reservation entry.)
- How many clicks or scrolls to the core task?
- Does the site protect the primary task from competing CTAs in the hero?

Observable signal: count the elements that compete for first attention, identify which one the layout actually privileges, name what the field converges on as the primary task.

### 2. Layout register and density

Is the layout retail-dense, editorial, or marketing-airy? Cross-reference `creative-direction` aesthetic positions (editorial restrained, polished standard, controlled maximalist, expressive maximalist) for vocabulary; do not redefine that here.

- How many distinct modules appear above the fold?
- What is the content-per-viewport ratio (dense storefront, calm editorial, generous marketing)?
- Does the page read as a storefront, a catalog, a landing page, or a brochure?

Observable signal: count modules above the fold across the field; describe the register the leaders share, not whether you find it attractive.

### 3. Merchandising and category surface

How much of the catalog or offering is surfaced at once, and in what shape?

- How many category, collection, or entry-point modules appear before scroll?
- How is depth signaled (mega-menu, grid, side rail, faceted search)?
- Is the surface flat (one tier visible) or hierarchical (parent plus child categories shown together)?

Observable signal: count the category entry points and describe the navigation depth pattern the field uses.

### 4. Primary navigation and search paths

Do the sites serve both the know-what-I-want path and the browse path?

- Is search prominent and primary, secondary, or absent?
- What paths are offered (by category, by brand, by attribute, by vehicle, by location, by occasion)?
- Where does the primary nav sit (top, side, sticky, mega-menu)?

Observable signal: list the paths the field offers, score whether each path is primary, secondary, or missing.

### 5. Brand register and conviction

What brand posture do the leading sites take, and is it consistent across the page?

- Color, type, imagery: utilitarian, premium, friendly, institutional, technical, expressive?
- Voice in headings and microcopy: direct, persuasive, technical, warm, plain?
- Trust signals: institutional (long-standing, association badges), social (reviews, community), or operational (in-stock, warranty, fitment confirmation)?

Cross-reference the `creative-direction` and `brand-archetype-system` skills for the vocabulary. Report the register the field converges on. Do not rate the taste; describe what posture the leaders take.

### 6. Trust and conversion signals

What recurring trust and conversion conventions does the field use?

- Reviews, guarantees, social proof, badges
- Pricing transparency (price visible, no surprises, total cost surfaced)
- Stock and availability signals
- Fitment, sizing, eligibility, or compatibility confirmation (where the vertical requires it)
- Return, shipping, or service-level promises

Observable signal: which signals appear across the field, where they appear, and which the leaders share.

### 7. Recurring vertical conventions (the synthesis)

The patterns that recur across the leaders and define what a credible site in this vertical is expected to have. This is the synthesis of dimensions 1 through 6 into a short list of "if your build does not do this, it will read as off-vertical."

Observable signal: which conventions recur on 3 of N or more of the leading sites; which are absent across the field (the gap that a positioning opportunity exploits).

---

## The honesty guardrail (load-bearing)

This is not negotiable. The credibility of an experience audit erodes the moment it slides into taste:

- Report what the leading sites observably do and where they observably fall short, as cross-site patterns. Do not render personal aesthetic judgments ("this is ugly", "good design", "the typography is clean"). Aesthetic verdicts belong in `art-direction` or `design-standards`, not here.
- When the evidence does not support a judgment, say so plainly and mark the dimension `not_assessable` for that site or that pattern. Common cases: layout and density cannot be judged from un-rendered static HTML; motion and animation cannot be judged from a screenshot; brand voice cannot be judged from a single page.
- Do not name a convention from one site. A pattern is a recurrence across the field (3 of N or more); one site doing something distinctive is a single-site observation, not a convention.
- The output is a grounded experience bar: the conventions and gaps of the field, usable as a standard a build must meet. It is not an opinion piece.

If the user asks "is this design good", redirect to observable patterns ("the leading sites in the field share X, Y, Z; this build does X and W but not Y or Z; that is the gap"). If the user asks for an aesthetic call, point them at `design-standards` or `art-direction`.

---

## Workflow

1. **Confirm the vertical and the leading sites.** Ask if either is unclear; an audit against the wrong field is worse than no audit.
2. **Render and view each site as a user would.** Open in a real browser, on the device class the field's visitors use (desktop and mobile for ecommerce; mobile-first for hospitality-food; etc.). Do not work from static HTML alone for any dimension marked rendered-only.
3. **Assess each dimension across the field.** Use [`references/experience-dimensions-checklist.md`](references/experience-dimensions-checklist.md) to score each site on each dimension. Mark `not_assessable` wherever the evidence is thin.
4. **Synthesize cross-site patterns.** For each dimension, name the recurring convention (or the split, or the gap). Distinguish patterns the field converges on from single-site moves.
5. **Name the gap (the positioning opportunity).** Where do even the leaders fall short? That is where a new build's positioning can exploit the field.
6. **Write the bar.** Use the template in [`references/audit-template.md`](references/audit-template.md). Default output is a markdown experience bar, generalized to pattern-level if it will feed a public showcase workup (no named competitors in the public version).
7. **Hand the bar to the build skills.** The output is the standard `creative-direction`, `design-standards`, `information-architecture`, and the relevant build skill (`landing-page-copy`, `frontend-component-build`) read as the experience bar to meet.

---

## Failure patterns

When you spot one of these, push back before delivering.

- **"Rate the design of these sites."** Vague. Redirect to observable patterns: what the leading sites in the field do across the seven dimensions, not whether you like it.
- **Judging un-rendered pages for layout, density, or motion.** Mark `not_assessable` and get the rendered view. Static HTML supports only partial assessment; do not guess at design quality you cannot see.
- **Naming a convention from one site.** A pattern is a recurrence across the field. One site doing something distinctive is a single-site observation; flag it that way, not as a convention.
- **Substituting personal taste for field patterns.** "I think the colors are good" is not an audit finding. "The field converges on a navy-and-rust register; this site uses it" is.
- **Aesthetic verdicts dressed as observations.** Watch for "clean", "modern", "professional", "premium-feeling" with no observable signal underneath. If you cannot point at a specific observable thing, you are giving taste, not a pattern.
- **Skipping the gap.** An audit that names only what the leaders do well is half the value. The recurring weakness across the field is where a positioning opportunity lives; name it.
- **Generalizing too soon.** A 2-site sample is not the field. If you can only render 2 of 5 leaders, mark the audit `partial` and call out what is assessed vs what is not.

---

## Output format

Default output is a markdown experience bar at `experience-audit-[vertical-slug].md` in the project root. Structure:

1. Vertical and the field surveyed (sites assessed, what could not be rendered)
2. Score per dimension across the field
3. Cross-site patterns (the conventions the leaders converge on)
4. Gaps (where the field falls short, the positioning opportunity)
5. The experience bar (the synthesis: what a credible build in this vertical must do)
6. `Not_assessable` items (what could not be judged and why)

Keep the bar under 1500 words. If a dimension needs deeper treatment, link to a deeper appendix rather than expanding inline.

### Scrub for showcase use

If the audit will feed a public showcase workup, scrub for named competitors before publishing. The named version stays operated-side; the public workup carries the patterns and the gaps in generalized form. This mirrors how Basano's competitor review already handles named sites in its model-backed audit.

---

## Reference files

- [`references/audit-template.md`](references/audit-template.md) - Fillable experience-audit template, copy and use. Generalized and named variants both present.
- [`references/experience-dimensions-checklist.md`](references/experience-dimensions-checklist.md) - The observable questions per dimension, in scoring order.

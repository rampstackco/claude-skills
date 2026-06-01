# Vertical Site Conventions Checklist

Run this checklist as the composition pre-ship review. It mirrors the seven dimensions `competitor-experience-audit` measures, on the build side. Mark each item present, absent for a stated reason, or routed elsewhere (with a link).

Three or more absences across the seven dimensions means the build is off-vertical and needs composition work, not a polish pass.

---

## 1. Primary-task prominence

- [ ] The vertical's primary task is named (from the experience bar or per-shape reference).
- [ ] The primary task is the largest, earliest interactive element in the hero.
- [ ] No competing CTA is louder than the primary task in the hero.
- [ ] The primary task is reachable without scroll on the device class the vertical's visitors use.
- [ ] A compact version of the primary task is sticky to the chrome on scroll (for commercial pages).
- [ ] If the primary task is not the hero, the compromise is documented and the closest equivalent is surfaced.

## 2. Layout register and density

- [ ] The vertical's register is named (storefront-dense, editorial-calm, marketing-airy, image-led).
- [ ] The module count above the fold is decided deliberately, not by default, and matches the field's content-per-viewport.
- [ ] The visual register (color, type, aesthetic) is routed to `creative-direction` and `design-standards`, not redefined here.
- [ ] The page does not default to a generic SaaS-airy layout when the field uses a denser register.

## 3. Merchandising and category surface

- [ ] The number of category, collection, or entry-point modules above the fold matches the field.
- [ ] The depth signaling pattern is chosen and committed to (mega-menu, grid, faceted side rail, breadcrumb hierarchy). Not stacked.
- [ ] Flat or hierarchical category presentation matches the vertical.
- [ ] Category presentation style (icon, image, text, hybrid) matches the field.
- [ ] The nav tree structural modeling is routed to `information-architecture`, not redefined here.

## 4. Navigation and search paths

- [ ] The paths the field offers are inventoried (by category, brand, attribute, vehicle, location, occasion, audience).
- [ ] Each path is scored primary, secondary, or absent against the vertical.
- [ ] Primary paths land in the hero or primary nav; secondary paths land in chrome or below the fold.
- [ ] Search input prominence matches the vertical (header-primary, secondary side-rail, or absent).
- [ ] Paths the field does not use are not surfaced (do not invent paths the vertical does not carry).

## 5. Brand register and conviction

- [ ] The brand register is set by `creative-direction` and `brand-archetype-system`, not by this skill.
- [ ] The register carries from the hero into the nav, cards, empty states, trust signals, and footer.
- [ ] Voice is applied consistently in headings, microcopy, CTAs, and empty states. Empty states do not fall back to generic copy.
- [ ] Imagery posture is consistent across the page (no switch from studio photography to abstract illustration mid-page without a reason).

## 6. Trust and conversion signals

- [ ] The vertical's required signals are inventoried from the experience bar or per-shape reference.
- [ ] Each required signal is built into the page where the field places it (reviews near the buying action, service-area in the hero, certifications in the chrome, etc.).
- [ ] For showcase or demo builds, the functional-vs-demo line is honored: real where touchable, honestly demo where it needs a backend (clearly labeled demo modals, no fake payment, no real account creation).

## 7. The synthesis: recurring vertical conventions

Pull the conventions from the experience bar's dimension 7 (or the per-shape reference's "recurring conventions" section). For each:

- [ ] Convention 1: __________________ , [present / absent (reason) / routed to ____]
- [ ] Convention 2:
- [ ] Convention 3:
- [ ] Convention 4:
- [ ] Convention 5:
- [ ] Convention 6:
- [ ] Convention 7:
- [ ] Convention 8:
- [ ] Convention 9:
- [ ] Convention 10:
- [ ] (Add rows as needed for the vertical's full convention list.)

**Density-bearing items.** Some conventions are density-bearing: their absence makes a checklist-passing build still read airy or brochure-like instead of storefront-dense. For the ecommerce-catalog shape, conventions 2 (category surface band above the fold at 1280x800), 9 (a promotional or deal surface near the top), and 10 (an inventory or catalog-depth signal a first-time visitor sees) are the density-bearing trio. Each shape's per-shape reference names its own density-bearing items.

Mark the density-bearing items explicitly in the list above. Missing any one density-bearing item is sufficient to fail the synthesis on its own, regardless of how many other conventions hit. This rule comes from a real build hitting 6 of 8 conventions in an earlier (pre-density-bearing) form of this reference and still reading off-vertical because the density-bearing items it missed were the load-bearing ones.

**Threshold:** a build hitting 8 of 10 (or the equivalent ratio for shapes with a different convention count) is at the experience bar for the shape; the wedge is what the build does beyond that. A build missing 3 or more conventions, OR any density-bearing item, is off-vertical and needs composition work, not a polish pass. Go back to dimensions 1 through 6.

---

## The wedge

If the experience bar named a recurring gap across the field, the build can exploit it as positioning. State which gap is being exploited and how the build addresses it.

- **Gap exploited:** [from the audit's gaps section]
- **How the build addresses it:**
- **What that buys the build:**

If the build is not exploiting a gap, that is fine; the build hits the experience bar and competes on execution. Say so explicitly.

---

## Hand-off list

- [ ] `frontend-component-build`: the components the build needs and the states each must support.
- [ ] `design-standards`: the tokens, contrast, and spacing the composition assumes.
- [ ] `creative-direction`: the register and voice the composition carries.
- [ ] `information-architecture`: the nav tree and URL structure the composition expects.

The hand-off list is what makes this skill's output a real spec for the implementation skills, not a wish list. Each item should be specific enough that the implementation skill can read it and start.

# Shape: local-service-booking

Barber shops, salons, gyms, BJJ schools, dental practices, repair shops, dog groomers. The reader arrives wanting to book a time, see prices, or confirm the place exists.

This file is a default set of composition conventions for the shape. When `competitor-experience-audit` has been run for the specific vertical (barbershops, dentists, repair shops), the audit's experience bar overrides these defaults. Use these when no audit has been run, or as a sanity check on an audit's output.

---

## 1. Primary-task prominence

**Primary task:** book an appointment. For unbookable services (drop-in only), the primary task is to call or to confirm hours. The booking action is the largest CTA on the page; everything else competes for second place.

**Build conventions:**
- The book-now action is in the chrome (persistent on every page) AND in the hero, not one or the other.
- A first-time visitor who arrived to book should reach a booking surface in one click from the home page. A flow that requires "services then pick then book" is one click too many.
- For services where the picked practitioner matters (barber, stylist, trainer, dentist), the booking action surfaces the practitioner choice before the time choice. For services where practitioner does not matter (oil change, dog wash), it does not.
- The booking action is the same component everywhere on the site so a visitor cannot get lost. One booking modal, one form, surfaced from every CTA.

## 2. Layout register and density

**Register:** image-led-warm. Less dense than a catalog; more dense than a marketing page. The page should feel like a room the visitor wants to be in.

**Build conventions:**
- **Above the fold at a 1280x800 desktop viewport**, the page carries: the booking CTA, an interior photograph of the space, AND a trust signal (years, license, review average, or named practitioners). A booking page without a photograph of the room reads as a third-party scheduler iframe, not a shop.
- A hero image of the space (or a close-up of the craft) is conventional and load-bearing. Stock or generic imagery reads as "any salon"; the shop's specific room reads as the shop.
- Whitespace is generous but purposeful. Editorial-airy is off-vertical; the visitor needs to see the menu and book without scrolling far.
- Route color, type, and aesthetic to `creative-direction` and `design-standards`. This shape's register can be warm-classic, considered-premium, institutional-professional (medical, legal), or rugged-craft; not corporate-flat or marketing-flashy.

## 3. Service menu and pricing

**Conventions:**
- A **service menu with duration and price visible per item** lives above the fold at a 1280x800 desktop viewport, OR is one click from the home page and clearly signposted. Hiding prices behind a phone call is off-vertical for the field's modern bar; it tells the visitor the shop is friction-tolerant.
- Service descriptions are plain language, not marketing. Two sentences max per service.
- Service categories (haircut, shave, beard, package) are grouped, not flat-listed, for shops with more than five services.
- Packages (cut-and-shave, cut-and-color) are surfaced as their own line items with their own price, not as "add $X to the base service".
- For services where duration varies (skin fade vs classic cut), the longer duration is named honestly; the shop blocks the chair for the time the cut takes.

## 4. Trust block and identity

**Signals this shape carries above the fold:**
- Years in business ("Est. 2014", "11 years on Walnut Street").
- License or certification, where the vertical has one (master barber license, dental board, state cosmetology, ASE certification for repair shops).
- Review average plus count (not just the stars; the count is the credibility).
- Address visible, not buried in a footer-only treatment.
- Hours visible, not buried in a footer-only treatment. A visitor planning a drop-in needs to know if the shop is open right now.
- For practitioner-driven shops: the practitioners' names and faces. Anonymous "our team" copy reads as franchise; named, photographed practitioners read as shop.

**Build conventions:**
- The trust block is **aggregated**, not scattered. Years in one footer line, reviews on a separate widget, hours on a separate page is the field's miss; pulling them into a single above-the-fold block is the field's lever.
- JSON-LD `LocalBusiness` (or the more specific subtype: `HairSalon`, `BarberShop`, `Dentist`, `AutoRepair`) carries address, hours, telephone, and aggregateRating in structured form. Most competitors ship none.

## 5. Practitioner roster

**Conventions for practitioner-driven shops (barber, stylist, trainer, dentist):**
- A **roster with faces** above the booking CTA is the conversion lever the field leaves on the table. Most competitors gate the practitioner choice inside the booking flow; surfacing it before the booking choice removes a decision point.
- Each practitioner card carries: name, face, years of experience, specialties (one to three short tags).
- Bio length is one or two sentences, plain language. Long bios read as profile pages, not a roster.
- For non-practitioner-driven shops (drop-in repair, walk-in clinic), this section is absent or replaced by a "what makes this shop different" block.

## 6. Booking flow specifics

**Conventions:**
- The booking surface is a modal or a single-page form, not a multi-step wizard. Local-service appointments are not enterprise sales.
- The form asks: name, service, practitioner (if applicable), preferred date, preferred time window, notes. It does not ask for an account, a password, or marketing consent at this stage.
- Confirmation is honest. Real production: SMS or email within the hour. Demo build: clearly labeled demo-only, no fake confirmation copy ("you're booked!" with no booking).
- Cancellation policy, late policy, and payment policy are visible on the booking page, not hidden in terms.
- Phone-as-fallback: a visible phone number for visitors who would rather call. Local-service customers vary in digital comfort; the field's best builds carry both.

## 7. Navigation paths

**Paths the shape carries:**
- Services (menu, prices, durations): primary.
- Book: primary, persistent.
- Visit (address, hours, directions, parking, accessibility): primary.
- About / story / team: secondary.
- Newsletter, account, cart: absent or chrome-level afterthought. Local-service shops are not subscription products.

**Build conventions:**
- Hours and address are in the chrome (footer at minimum) on every page.
- Accessibility info (step-free entrance, adjustable chairs, accessible restroom, quieter hours) sits on the Visit page; competitors rarely carry it and it is a real differentiator.

## 8. Trust and conversion signals

**Signals this shape carries:**
- Reviews / ratings: average plus count, surfaced above the fold. A four-and-up rating without a count reads as theater.
- Years in business: visible in the chrome or hero. Local shops earn trust over time and the field rewards saying so.
- License or certification number: visible, on the Visit or About page if not in the chrome.
- Plain-language service descriptions: no upcharge surprises.
- Cancellation and late policies stated openly. Generous grace windows read as confident; harsh ones read as defensive.
- Quieter hours / accessibility / language spoken: trust signals the field rarely carries; presence reads as care.

For showcase or demo builds, the functional-vs-demo line: real where touchable (real form state, real validation, real interaction), honestly demo where it needs a backend (clearly labeled demo booking modal, no fake confirmation, no fake account creation).

## 9. Recurring vertical conventions (the synthesis)

A credible local-service-booking site, against the field of leaders, carries ten conventions:

1. A book-now action that owns the hero and persists in the chrome on every page.
2. **(Density-bearing)** An interior or craft photograph of the **specific** shop above the fold at a 1280x800 desktop viewport, not stock or generic.
3. A service menu with duration and price visible per item, one click from the home page at most.
4. **(Density-bearing)** A trust block aggregated above the fold: years in business, license or certification, review average plus count. Not scattered across footer and about page.
5. For practitioner-driven shops: a roster with faces and specialties above the booking CTA.
6. Address and hours in the chrome (footer at minimum) on every page.
7. JSON-LD LocalBusiness (or vertical-specific subtype) with address, hours, telephone, and aggregateRating.
8. A booking flow that is a single-page form or modal, not a multi-step wizard; asks for name, service, time, and nothing more at this stage.
9. **(Density-bearing)** A cancellation, late, and payment policy stated openly on the booking page, not hidden in terms.
10. A phone-as-fallback path: a visible phone number for visitors who would rather call.

**Threshold and density-bearing items.** A build hitting 8 or more of these is at the experience bar for the shape; the wedge is what the build does beyond that. A build missing 3 or more is off-vertical and needs composition work, not a polish pass.

Conventions **2, 4, and 9 are the density-bearing ones**, the items whose absence makes a checklist-passing build still read as a third-party scheduler iframe or a franchise template instead of a specific shop with a specific room. A build can miss a nice-to-have (the practitioner roster for a drop-in shop, for example) and still read as the vertical; missing any of conventions 2, 4, or 9 makes the build read as anyone's shop. Treat the density-bearing items as non-skippable: if any one is missing, the build will read off-vertical regardless of how many other conventions it hits.

---

## Common positioning wedges in this shape

From the gaps the audited fields tend to share:

- **Booking-first composition.** Most competitors bury the booking action below the fold or behind a third-party scheduler iframe that breaks the visual contract. A build that makes the booking action the largest element on every page, with the shop's identity intact, owns the "we want you to book" position.
- **Roster-before-booking.** Most competitors gate the practitioner choice inside the booking flow. A build that surfaces a small, photographed roster above the booking CTA owns the "you pick the chair, then the time" position.
- **Honest service menu.** Most competitors hide prices behind a phone call or list services without durations. A build that posts duration and price for every service owns the "no surprises" position.
- **Specific-room photography.** Most competitors use stock or generic salon imagery. A build that leads with the shop's actual room owns the "this is the place" position.
- **Aggregated trust above the fold.** Most competitors scatter the trust signals (years, license, reviews) across the chrome and about page. A build that pulls them into a single above-the-fold block owns the "we are real, we are local, we are licensed" position before the visitor scrolls.

Pick one wedge per build. Two wedges dilute the positioning; zero wedges hits the bar without a reason to remember.

# Shape: hospitality-food

Restaurants, cafés, bakeries, food halls, ghost kitchens with a storefront. The reader arrives wanting to know if they want to eat there: what the food is, what it costs, when the place is open, whether they can get a table.

This file is a default set of composition conventions for the shape. When `competitor-experience-audit` has been run for the specific vertical (fine dining, neighborhood restaurant, café, bakery), the audit's experience bar overrides these defaults. Use these when no audit has been run, or as a sanity check on an audit's output.

---

## 1. Primary-task prominence

**Primary task:** see the menu. The reservation action is the secondary primary task. For walk-in-only restaurants and cafés, the menu and the hours-and-address pair are the primary tasks; for reservation-led restaurants, the menu and the reservation flow share the lead.

**Build conventions:**
- The menu is reachable in one click from the home page. A site that buries the menu behind a PDF link, behind a modal, or below the fold without a clear cue is off-vertical. The menu is the page, not a download.
- The reservation action is the largest CTA in the chrome (after the menu link). For walk-in-only shops, the equivalent is "where we are" and "when we open."
- The reservation flow is on-site, not punted to a third-party widget iframe. A widget that breaks the site's visual contract dissolves the room's identity at the moment the visitor is closest to deciding.
- The site's primary task is the same component everywhere. One reservation modal, one form, surfaced from every CTA.

## 2. Layout register and density

**Register:** image-led, atmospheric. Less dense than a catalog; more density than a marketing page; more atmosphere than a service-booking page. The page should feel like the room.

**Build conventions:**
- **Above the fold at a 1280x800 desktop viewport**, the page carries: an edge-to-edge dish or room photograph, the restaurant name and one-line identity, AND the reservation CTA. A hospitality-food hero without a real photograph reads as a marketing template.
- The hero photograph is a single subject (one dish, one corner of the room, one moment of service), not a collage. Tiled grids of every dish lose focus; stock food imagery loses identity; single-subject photography on a confident background is the convention.
- Whitespace is generous and atmospheric. The dish gets to breathe. Catalog-dense layouts are off-vertical for this shape unless the vertical is a fast-casual chain.
- Route color, type, and aesthetic to `creative-direction` and `design-standards`. This shape's register can be editorial-restrained (fine dining), warm-neighborhood (everyday), industrial-bright (fast-casual), or playful-soft (bakery, café); not corporate-flat.

## 3. The menu

**Conventions:**
- A **menu page**, not a PDF, with each item carrying a name, a description, and a price visible per item. Hiding prices is off-vertical; it tells the visitor the shop is luxury-pretense rather than confidence.
- Items are grouped by course (starters, mains, sides, desserts, drinks). For tasting menus, the courses are the structure. For diner-style menus, the categories are functional.
- Item descriptions are written, not enumerated. Two or three short sentences per item. Adjective stacks ("savory, hearty, comforting") read as marketing; ingredient-and-method copy ("twenty-four-hour bone broth, brisket, eye round") reads as the kitchen.
- Signature dishes carry a small visible mark (badge, label) so the visitor knows what to order. Hiding the signature inside the list misses the assist.
- Allergen notes are surfaced (peanut, shellfish, gluten) where the kitchen's handling requires it. Generic "ask your server" copy is acceptable but less confident than naming the handling.

## 4. Chef, provenance, and story

**Conventions:**
- A short chef-perspective or chef-partner passage is conventional, on the home page or the about page. Two short paragraphs at most; first-person, ingredient-literate, no marketing register.
- Provenance content (where the ingredients come from, who farms what, who supplies the seafood) carries the hospitality wedge for restaurants whose positioning leans on it. For places where it does not, this is absent.
- Staff bios beyond the chef are absent in fine dining and present in neighborhood restaurants and cafés (named baristas, pastry chefs, line cooks). Match the register of the shop.
- The story is not a brand history; it is a kitchen perspective. Brands tell origin stories; restaurants tell what they care about.

## 5. Reservations flow

**Conventions:**
- The form asks: name, party size, date, time, email, allergies and notes. Nothing more at this stage; not an account, not a password, not marketing consent.
- Confirmation is honest. Real production: email confirmation within the hour, sometimes within minutes. Demo build: clearly labeled demo-only, no fake confirmation copy.
- Cancellation, late, and allergy policies are visible on the reservation page, not hidden in terms or buried in confirmation email.
- Walk-in policy is named openly if relevant ("walk-ins welcome at the bar", "no walk-ins").
- Phone-as-fallback: a visible phone number for visitors who would rather call. Restaurant customers vary; the field's best builds carry both.

## 6. Address, hours, and visit info

**Conventions:**
- Address visible in the chrome on every page. Hours visible at minimum in the footer; the home page should carry "open tonight" or the day's hours above the fold.
- Hours that vary (brunch on Sundays, late on weekends, closed Mondays) are listed line-by-line, not summarized.
- Transit and parking notes belong on a Visit page; they are a trust signal for visitors planning to travel to the restaurant.
- Accessibility notes (step-free entrance, accessible restroom, dress code, noise level) are conventional on the Visit page and rare in the field; their presence reads as care.
- A live map embed is optional; a static "find us" image plus a deep link to the visitor's preferred map app works as well and avoids the embed's accessibility and performance overhead.

## 7. Press, reviews, and aggregate trust

**Conventions:**
- One named-publication pull-quote is the conventional press treatment, not a logo wall. A short, specific quote that names what the restaurant is good at carries more credibility than five logos.
- Aggregate ratings (Google, Yelp, Resy) are present in the chrome or near the reservation action, not in a logo grid. Numbers plus counts; not stars alone.
- Awards (Michelin, James Beard, regional press) are listed plain text in the chrome or on About, not in a badge wall.
- For demo or showcase builds, the functional-vs-demo line: a placeholder press quote is acceptable but should be labeled as such in the workup, not implied to be a real publication.

## 8. Trust and conversion signals

**Signals this shape carries:**
- The dish photograph itself, edge-to-edge, dramatic light, single subject.
- The chef's-perspective passage that does the work of branding.
- Plain-language menu descriptions with prices.
- Open cancellation, late, and allergy policies on the reservation page.
- Visible address and hours.
- Aggregate ratings near the reservation action.

For showcase or demo builds, the functional-vs-demo line: real where touchable (real form state, real validation, real interaction), honestly demo where it needs a backend (clearly labeled demo reservation modal, no fake confirmation, no fake account creation).

## 9. Recurring vertical conventions (the synthesis)

A credible hospitality-food site, against the field of leaders, carries ten conventions:

1. An edge-to-edge hero photograph of a single dish, room, or moment, above the fold at a 1280x800 desktop viewport.
2. **(Density-bearing)** A menu page, not a PDF, with name, description, and price visible per item, reachable in one click from the home.
3. Item descriptions in ingredient-and-method voice, not adjective stacks; signature dishes marked.
4. A reservation action that is on-site, not a third-party widget iframe, available from the chrome on every page.
5. **(Density-bearing)** A short chef-perspective or chef-partner passage, first-person, two short paragraphs at most. The story of the kitchen, not a brand history.
6. Address and hours visible above the fold; full hours line-by-line on the home or visit page.
7. JSON-LD Restaurant with hasMenu, servesCuisine, acceptsReservations, openingHoursSpecification, and aggregateRating.
8. Cancellation, late, and allergy policies stated openly on the reservation page.
9. **(Density-bearing)** One named-publication press pull-quote OR a visible aggregate rating (count plus number), placed near the reservation CTA. Not a logo wall.
10. A phone-as-fallback path: a visible phone number for visitors who would rather call.

**Threshold and density-bearing items.** A build hitting 8 or more of these is at the experience bar for the shape; the wedge is what the build does beyond that. A build missing 3 or more is off-vertical and needs composition work, not a polish pass.

Conventions **1, 5, and 9 are the density-bearing ones**, the items whose absence makes a checklist-passing build still read as a template instead of the room. A build can miss a nice-to-have (the phone-as-fallback, for example) and still read as the vertical; missing any of conventions 1, 5, or 9 will make the build read as a marketing page about food rather than a restaurant. Treat the density-bearing items as non-skippable: if any one is missing, the build will read off-vertical regardless of how many other conventions it hits.

---

## Common positioning wedges in this shape

From the gaps the audited fields tend to share:

- **The menu is the page.** Most competitors hide the menu behind a PDF or a modal. A build that surfaces the menu in plain HTML with ingredient-literate descriptions owns the "we know what we cook" position.
- **On-site reservations.** Most competitors punt to a third-party reservation widget. A build that keeps the reservation flow visually within the site's identity owns the "the room is the experience" position.
- **Single-subject photography.** Most competitors either tile every dish or use stock food imagery. A build that leads with edge-to-edge single-subject photography on a confident background owns the "this is the dish" position.
- **Chef's-perspective voice.** Most competitors write in marketing register (adjective stacks, brand voice). A build that writes the menu in the chef's voice (ingredient, method, restraint) owns the "we are not selling you, we are cooking for you" position.
- **Provenance literacy.** Most competitors gesture vaguely at "local, seasonal." A build that names the farmer, the supplier, the cut, owns the "we know where the food came from" position.

Pick one wedge per build. Two wedges dilute the positioning; zero wedges hits the bar without a reason to remember.

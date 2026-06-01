# Reference bank

The bank holds curated live reference sites for archetype-and-vertical combinations the portfolio has built against. Each file covers one combination, with positive references (sites that exemplify the position) and negative references (sites in the same vertical but in the WRONG register).

The bank is the institutional memory of the portfolio. A new build for a combination that has been done before loads the existing file and adapts. A new build for a sparse combination supplies discovered references and commits them back to the bank as part of its build PR.

---

## File naming convention

`<archetype>-<vertical-specific-tag>.md`

Examples:

- `premium-dtc-maker-western-boots.md`
- `heritage-local-service-barbershop.md`
- `hospitality-experience-balloon-ride.md`

The archetype prefix is the canonical name from `brand-archetype-system` (composed archetypes are hyphenated with the lead first). The vertical-specific tag is the narrowest description of the vertical the file covers (not the broad shape; the specific category within it).

---

## File structure

Each file has the same structure:

```markdown
# <Archetype>, <Vertical>

- **Archetype**: <Canonical archetype name, with composition note if any>.
- **Vertical**: <Broad shape> (specifically <narrow category>).
- **Position summary**: <One-line position the references collectively exemplify>.

## Positive references

- [<URL 1>] - <one-line why; what specifically this site does that a build in this position should inherit>
- [<URL 2>] - <one-line why>
- [<URL 3>] - <one-line why>
- [<URL 4>] - <one-line why, optional but encouraged>

## Negative references

- [<URL or named category>] - <one-line why this register is the wrong one for this position>

## Extension note

- <When was this file last updated and against which build>
```

---

## Adding references

A build that uses this skill on a combination that has a file already:

1. Loads three to four references from the existing file in step 3 of the process.
2. If the build discovered any new live references in addition (because the bank's references were stale or the build needed more breadth), append them to the positive references list in the same file with a one-line why.
3. Commit the file edit as part of the build PR.

A build that uses this skill on a combination with no existing file:

1. Creates a new file under `reference-bank/` named per the convention above.
2. Fills the file with three to six positive references discovered during the build's step 3.
3. Fills negative references with one to two categories or named sites that the build should not pull from.
4. Commits the file as part of the build PR.

---

## Reference quality bar

Each positive reference should be a real live site that:

- Exemplifies the chosen position observably (palette, layout, voice, imagery, or all four).
- Is operating at a quality level the build can credibly aspire to.
- Has been live recently (within the past year if possible; older references are acceptable if they remain the canonical example).

Each negative reference should be a real live site or a named category that:

- Sits in the same vertical but in a different register.
- Helps the build understand what to NOT pull from.

The one-line why for each reference is what makes the reference usable in step 4 of the process. A URL without a why is decoration; the why is what tells the next build what specifically to inherit or avoid.

---

## When to retire a reference

A reference should be removed from the bank when:

- The URL stops showing what it was cited for (brand redesign, site shutdown, paywall changed the visible register).
- A more canonical example for the same position emerges.
- The build that originally cited the reference has been superseded and the new build uses different references.

Retirement is a normal part of bank maintenance. The bank reflects what is currently usable, not what was once usable.

---

## Seeded combinations

Eleven combinations live in the bank:

- [`premium-dtc-maker-western-boots.md`](premium-dtc-maker-western-boots.md) - Premium DTC maker register applied to a small-collection western-boot maker.
- [`heritage-local-service-barbershop.md`](heritage-local-service-barbershop.md) - Heritage local-service register applied to a neighborhood barbershop.
- [`hospitality-experience-balloon-ride.md`](hospitality-experience-balloon-ride.md) - Documentary-honest hospitality-experience register applied to a scenic-flight operator.
- [`editorial-restrained-documentary-honest-specialty-coffee-subscription.md`](editorial-restrained-documentary-honest-specialty-coffee-subscription.md) - Editorial-restrained subscription-app register applied to a single-origin specialty coffee subscription.
- [`rugged-utilitarian-documentary-honest-regional-used-vehicle-marketplace.md`](rugged-utilitarian-documentary-honest-regional-used-vehicle-marketplace.md) - Rugged-utilitarian inventory-listing register applied to a regional used-truck-and-SUV marketplace.
- [`editorial-restrained-literary-quarterly.md`](editorial-restrained-literary-quarterly.md) - Editorial-restrained editorial-publication register applied to a themed literary and ideas quarterly.
- [`luxe-considered-editorial-restrained-residential-architectural-brokerage.md`](luxe-considered-editorial-restrained-residential-architectural-brokerage.md) - Luxe-considered-editorial-restrained inventory-listing register applied to a residential brokerage of architecturally significant homes (the first same-shape divergence test against the rugged-utilitarian regional-used-vehicle-marketplace entry).
- [`bold-confident-editorial-restrained-aaa-game-studio.md`](bold-confident-editorial-restrained-aaa-game-studio.md) - Bold-confident-editorial-restrained corporate-portfolio register applied to a AAA-adjacent action game studio (the first portfolio entry in Bold Confident; the gentler entry into the bold register before a game-title demo).
- [`bold-confident-vibrant-saturated-single-ip-game-title.md`](bold-confident-vibrant-saturated-single-ip-game-title.md) - Bold-confident-vibrant-saturated single-IP marketing register applied to a post-launch AAA action game title (the first single-IP marketing entry; the title side of the game-studio pair, claiming the saturated leap the studio brief reserved).
- [`minimal-essentialist-documentary-honest-trades-directory.md`](minimal-essentialist-documentary-honest-trades-directory.md) - Minimal-essentialist-documentary-honest directory-marketplace register applied to a homeowner-facing local-trades directory (the first directory-marketplace shape and the first multi-provider entry; encodes the multi-provider conventions and the no-fabricated-reviews resolution).
- [`luxe-considered-curated-stays-directory.md`](luxe-considered-curated-stays-directory.md) - Pure-luxe-considered directory-marketplace register applied to an aspirational curated short-term-stays marketplace (the second directory-marketplace entry; the same-shape divergence partner to the trades directory, showing the shape across two opposite registers; reframes the multi-provider conventions for hosts and stays).

Each seed file was built against a real shipped demo or shipped brief and reflects the references that build drew from. As the portfolio grows, the bank grows with it.

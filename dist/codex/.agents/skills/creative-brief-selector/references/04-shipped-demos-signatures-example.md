# Shipped-demos signatures: worked example

An illustrative signatures file with seven worked entries. This file is example-only; the live signatures file for any consuming project lives in that project (typically at `progress/shipped-demos-signatures.yml`), not in this skill.

The schema is defined in [`03-divergence-check.md`](03-divergence-check.md). Each entry has seven fields: `slug`, `archetype`, `dominant_hue_family`, `voice_register`, `primary_structural_pattern`, `hero_shape`, `footer_shape`. The last two (`hero_shape`, `footer_shape`) are the latest additions; their canonical vocabulary lives in [`05-section-shapes-vocabulary.md`](05-section-shapes-vocabulary.md).

The seven entries below are illustrative records of seven sibling-shape demos a portfolio might ship. They are written here as a worked example of what the file looks like in practice. The archetype values reference the canonical names from `brand-archetype-system`.

---

## Example signatures

```yaml
demos:
  - slug: fitfirst-parts
    archetype: technical-precise
    dominant_hue_family: slate-and-amber
    voice_register: fitment-first-technical
    primary_structural_pattern: fitment-selector-then-rails
    hero_shape: dual-column-image-and-text
    footer_shape: multi-column-sitemap

  - slug: iron-and-rye-barbershop
    archetype: warm-conversational-retro-nostalgic
    dominant_hue_family: warm-walnut-brass
    voice_register: warm-everyday-craft
    primary_structural_pattern: barber-roster-then-services-menu
    hero_shape: dual-column-image-and-text
    footer_shape: single-line-strip

  - slug: pho-heights
    archetype: documentary-honest-luxe-considered
    dominant_hue_family: dark-linen-amber
    voice_register: chef-essay-first-person
    primary_structural_pattern: editorial-hero-then-signatures-menu
    hero_shape: full-bleed-image-with-overlay
    footer_shape: single-line-strip

  - slug: volta-robotics
    archetype: technical-precise
    dominant_hue_family: graphite-and-signal-orange
    voice_register: spec-forward-technical
    primary_structural_pattern: product-strip-then-spec-table
    hero_shape: full-bleed-image-with-overlay
    footer_shape: single-line-strip

  - slug: clearflow-initiative
    archetype: editorial-restrained
    dominant_hue_family: forest-green-cream
    voice_register: restrained-citation-bearing
    primary_structural_pattern: theory-of-change-hero-then-evidence-band
    hero_shape: full-bleed-image-with-overlay
    footer_shape: single-line-strip

  - slug: pinto-mesa-boots
    archetype: luxe-considered-rugged-utilitarian
    dominant_hue_family: leather-bone-saddle
    voice_register: story-forward-third-person
    primary_structural_pattern: shoppable-grid-product-forward
    hero_shape: dual-column-image-and-text
    footer_shape: single-line-strip

  - slug: drift-and-dawn
    archetype: documentary-honest-luxe-considered
    dominant_hue_family: dawn-navy-coral
    voice_register: atmospheric-second-person
    primary_structural_pattern: arc-timeline-hero-with-packages-strip
    hero_shape: full-bleed-image-with-overlay
    footer_shape: single-line-strip
```

---

## Why each field is what it is

### fitfirst-parts (ecommerce-catalog)

- **archetype**: `technical-precise`. The build leads with a YMM (year-make-model) fitment selector. Grids, monospace numerics, system-feeling.
- **dominant_hue_family**: `slate-and-amber`. Cool slate ground with warm amber accents on safety and action surfaces.
- **voice_register**: `fitment-first-technical`. The voice asks "does it fit your vehicle" before anything else.
- **primary_structural_pattern**: `fitment-selector-then-rails`. The home leads with the selector, then rails of parts filtered by the confirmed vehicle.

### iron-and-rye-barbershop (local-service-booking)

- **archetype**: `warm-conversational-retro-nostalgic`. Heritage barbershop register; walnut and brass; period-specific cues.
- **dominant_hue_family**: `warm-walnut-brass`. Walnut wood and brass hardware are the recognizable palette.
- **voice_register**: `warm-everyday-craft`. The voice is the shop talking about its work in plain terms.
- **primary_structural_pattern**: `barber-roster-then-services-menu`. Roster (initials) leads, services menu follows, atmosphere gallery threads the page.

### pho-heights (hospitality-food)

- **archetype**: `documentary-honest-luxe-considered`. Dark linen photography, real-food register, premium restraint.
- **dominant_hue_family**: `dark-linen-amber`. Dark linen background dominates; amber surfaces as the accent.
- **voice_register**: `chef-essay-first-person`. The chef-partner essay is the page's voice.
- **primary_structural_pattern**: `editorial-hero-then-signatures-menu`. Edge-to-edge hero, chef essay, signatures section with image-led cards.

### volta-robotics (b2b-manufacturer)

- **archetype**: `technical-precise`. Industrial spec-table register. Same archetype as fitfirst-parts but a different hue family and a different structural pattern (so rule 1 does not fire on this pair).
- **dominant_hue_family**: `graphite-and-signal-orange`. Industrial graphite with hazard-orange accents on action surfaces.
- **voice_register**: `spec-forward-technical`. Specs lead, narrative supports.
- **primary_structural_pattern**: `product-strip-then-spec-table`. Product strip up top, deep spec tables follow.

### clearflow-initiative (institution-mission)

- **archetype**: `editorial-restrained`. Counsel-restrained register; numbers before adjectives; citation-bearing voice.
- **dominant_hue_family**: `forest-green-cream`. Deep forest green sections with warm cream surfaces.
- **voice_register**: `restrained-citation-bearing`. Third-person about the org, low-register confidence, numbers leading.
- **primary_structural_pattern**: `theory-of-change-hero-then-evidence-band`. Theory of change in the hero, evidence band (lives reached, water systems built) follows.

### pinto-mesa-boots (ecommerce-standout)

- **archetype**: `luxe-considered-rugged-utilitarian`. Premium DTC maker register with workwear and craft secondary.
- **dominant_hue_family**: `leather-bone-saddle`. Bone cream ground with saddle tan and walnut accents; oxblood as the demo-only chip.
- **voice_register**: `story-forward-third-person`. The brand talks about itself in the third person, with material before adjectives.
- **primary_structural_pattern**: `shoppable-grid-product-forward`. Product-forward hero, six-boot shoppable grid on the home, by-last wayfinding.

### drift-and-dawn (hospitality-experience)

- **archetype**: `documentary-honest-luxe-considered`. Photography-led, atmospheric, aspirational. Same composed archetype as pho-heights but a different vertical and a different hue family (so rule 1 does not fire on this pair).
- **dominant_hue_family**: `dawn-navy-coral`. Pre-dawn navy with coral and pale-gold accents, deliberately distinct from the hospitality-experience stone-and-amber default the original build used.
- **voice_register**: `atmospheric-second-person`. The brand walks the visitor through the morning in second person.
- **primary_structural_pattern**: `arc-timeline-hero-with-packages-strip`. Hero with arc preview, packages strip with named prices, six-moment timeline on the experience page.

---

## What this example exercises

The seven entries are constructed to exercise the divergence rules:

- **Rule 1 not firing**: `fitfirst-parts` and `volta-robotics` share `archetype: technical-precise` but differ on `dominant_hue_family` (`slate-and-amber` vs `graphite-and-signal-orange`). No block.
- **Rule 1 not firing**: `pho-heights` and `drift-and-dawn` share `archetype: documentary-honest-luxe-considered` but differ on `dominant_hue_family` (`dark-linen-amber` vs `dawn-navy-coral`). No block. The deliberate retune from the original `slate-and-amber` to `dawn-navy-coral` is what kept this pair from blocking.
- **Rule 3 historical case**: the original `drift-and-dawn` (pre-retune, hue family `slate-and-amber`) would have triggered rule 3 against `fitfirst-parts` (also `slate-and-amber`) across different archetypes. The retune resolved the recurring family.

---

## How to use this example

Copy the YAML block to a `progress/shipped-demos-signatures.yml` file in the consuming project. Edit the entries to match the actual shipped builds. Append new entries as builds ship. The divergence check in [`03-divergence-check.md`](03-divergence-check.md) reads from this file.

This file is example-only. The skill does not parse this example file at runtime; it parses the consuming project's signatures file. The example exists to show what the file should look like.

---
name: creative-brief-selector
description: "Produce a creative brief grounded in live reference sites and deliberately distinct from existing demos, for any new brand build. Composes with brand-archetype-system and creative-direction. Use this skill at the start of any brand or microsite build when the result needs to land in a specific aesthetic position and not drift into a default house style. Triggers on creative brief, design brief, build brief, brand direction, where should this brand sit, what should this site look like, reference sites for, archetype for, distinct from our other brands, divergence from prior, not the same as. Also triggers when prior builds have come out as siblings and a systematic divergence approach is needed."
category: brand
catalog_summary: "Live-reference-grounded creative briefs with divergence check against prior builds"
display_order: 6
---

# Creative Brief Selector

A starting-point selector for brand and microsite builds. Given a business spec (name, vertical, shape, one-line vibe, optional list of shipped demos), produces a creative brief grounded in three things:

1. An archetype position from `brand-archetype-system`, picked or composed to be deliberately distinct from the shipped demos.
2. A small set of live reference sites for that archetype-and-vertical combination, drawn from a curated bank plus optional per-build discovery.
3. A divergence check against the shipped demos that flags palette, voice, structural pattern, and section-shape overlap before the brief is handed off.

The brief output is concrete tokens, not abstract families, including explicit section-shape choices (hero shape and footer shape) as first-class outputs alongside palette and voice. It is meant to be loaded by downstream build skills as the single creative artifact for the build.

---

## When to use

- Starting any new brand or microsite build that should land in a specific aesthetic position.
- The first build in a portfolio (no prior builds to diverge from yet, but the divergence schema can be seeded for the next one).
- The second through nth build in a portfolio, where the risk of sibling output is real.
- After a portfolio audit that surfaced sibling builds: this skill is the systemic fix for the pattern.
- When a build's creative direction is being chosen between two adjacent archetypes and the call needs a reference-grounded reason.

## When NOT to use

- The user wants pure aesthetic methodology guidance (use `creative-direction`).
- The user has a finished archetype and a finished brief and is asking for execution (skip to the downstream build skills).
- The user wants a logo or a finished identity (use `logo-design`, `brand-identity`).
- The user wants to define voice for an existing brand (use `brand-voice`).
- Defining brand strategy from zero positioning (use `brand-ideation` first, then return to this skill).

---

## How this composes with other skills

This skill works upstream of build-time skills and parallel to the aesthetic methodology layer:

- **`brand-archetype-system`** (upstream input). The archetype catalog this skill picks from. The skill names the archetype in the rendered brief; it does not redefine the archetype's defaults.
- **`creative-direction`** (parallel input). The four-axis vocabulary the archetypes reference. If the consumer needs the full axis brief, run `creative-direction` first; this skill's brief consumes its outputs.
- **`brand-identity`** (downstream). Once the brief is approved, brand-identity turns it into a finished identity system.
- **`landing-page-copy`, `content-and-copy`, `art-direction`** (downstream). Every downstream skill that produces aesthetic output references this skill's brief.

Direct verbatim copying of an archetype's default palette into a new brand is the failure mode this skill exists to prevent. The brief shifts the archetype's defaults toward the business spec's specifics.

---

## The framework: five steps, three rules, one hybrid bank

1. **Locate the design space.** Pick one to two candidate archetypes from `brand-archetype-system` that fit the vertical and shape.
2. **Run input-side divergence.** Read the shipped-demos signatures. Discard candidates that would land sibling to anything shipped. Record what was rejected and why.
3. **Pull references.** From the curated reference bank under `references/reference-bank/`, load the file(s) matching the chosen archetype-and-vertical. Augment with one to two discovered live references if the bank is sparse. Add discovered references back to the bank in the build PR.
4. **Adapt.** Shift the chosen archetype's defaults (palette, type, voice, layout, imagery direction) toward the business spec. The brief lands as concrete tokens, not abstract families.
5. **Render and verify.** Render the brief using the template in [`references/02-brief-template.md`](references/02-brief-template.md). Run output-side divergence. Output the brief plus the references list plus the divergence-check result.

Full step-by-step in [`references/01-process.md`](references/01-process.md). The divergence schema and its three overlap rules are in [`references/03-divergence-check.md`](references/03-divergence-check.md).

---

## The hybrid references model

A curated bank that grows with each build. Each file under `references/reference-bank/` covers one archetype-and-vertical combination and holds three to six live reference URLs, each with a one-line why and optional palette or type observations. The bank ships with three seed combinations covering western-boot maker, heritage barbershop, and balloon-ride experience.

When a build draws from a sparse combination, the build is expected to commit the live references it discovered back to the bank as part of its build PR. The bank gets denser with use.

---

## The divergence schema

Each shipped demo carries a signature with seven fields:

- `slug`
- `archetype` (the canonical archetype name from `brand-archetype-system`)
- `dominant_hue_family` (the recognizable colour family, e.g. leather-bone-saddle, dawn-navy-coral, dark-linen-amber)
- `voice_register` (e.g. story-forward third-person, atmospheric second-person, fitment-first technical)
- `primary_structural_pattern` (e.g. shoppable-grid-product-forward, arc-timeline-hero, fitment-selector-then-rails)
- `hero_shape` (e.g. dual-column-image-and-text, wide-photograph-with-band-below, full-bleed-image-with-overlay; canonical vocabulary in `references/05-section-shapes-vocabulary.md`)
- `footer_shape` (e.g. single-line-strip, multi-column-sitemap, type-only-no-links; same vocabulary file)

Overlap rules (full set in [`references/03-divergence-check.md`](references/03-divergence-check.md)):

- Two demos share archetype AND share dominant_hue_family => **SIBLING (block)**.
- Two demos share archetype AND share voice_register AND share primary_structural_pattern => **SIBLING (block)**.
- Two demos share only dominant_hue_family across different archetypes => **WARN**.
- The candidate's hero_shape matches the hero_shape of two or more shipped demos => **WARN**.
- The candidate's hero_shape matches three or more shipped demos AND any share an archetype family => **BLOCK**.
- The candidate's footer_shape matches three or more shipped demos => **WARN**.

A worked example file of seven signatures lives at [`references/04-shipped-demos-signatures-example.md`](references/04-shipped-demos-signatures-example.md) for illustration; the live signatures file for any consuming project lives in that project, not in this skill.

---

## Trademark and attribution

Archetypes are NAMED for aesthetic families, NOT for brands, following the convention of `brand-archetype-system`. Live reference sites are cited as exemplars using nominative attribution language: "exemplified by [URL]", "characteristic of", "in the register of". This is descriptive and nominative fair use territory, durable across brand redesigns. A brand that pivots its identity does not invalidate the archetype it once exemplified.

---

## Reference files

- [`references/00-overview.md`](references/00-overview.md) - The case for the skill, the hybrid references model, the two-direction divergence, the trademark posture.
- [`references/01-process.md`](references/01-process.md) - The five-step process, each step concrete enough to execute.
- [`references/02-brief-template.md`](references/02-brief-template.md) - The fillable brief template with section-by-section guidance.
- [`references/03-divergence-check.md`](references/03-divergence-check.md) - The signature schema and the overlap rules.
- [`references/04-shipped-demos-signatures-example.md`](references/04-shipped-demos-signatures-example.md) - Worked example signatures file with seven demos.
- [`references/05-section-shapes-vocabulary.md`](references/05-section-shapes-vocabulary.md) - Canonical open vocabulary of hero and footer section shapes plus archetype affinities.

The curated reference bank lives in a `reference-bank/` subdirectory under `references/`. The bank ships with a README plus three seed archetype-and-vertical files: `premium-dtc-maker-western-boots.md`, `heritage-local-service-barbershop.md`, and `hospitality-experience-balloon-ride.md`. The bank's purpose and extension procedure are documented in its README; the seed files each carry three to four positive live references and one to two negative references for the chosen position. Load the bank file matching the build's archetype-and-vertical at step 3 of the process.

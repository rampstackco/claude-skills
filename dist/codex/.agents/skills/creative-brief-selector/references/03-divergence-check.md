# The divergence check

The signature schema, the overlap rules, and the comparison procedure.

---

## Signature schema

Each shipped demo carries a signature with seven fields. The schema is small on purpose: any field that takes judgment to populate gets argued about; a small mechanical schema gets used.

```yaml
- slug: <kebab-case slug, e.g. pinto-mesa-boots>
  archetype: <canonical archetype name from brand-archetype-system, e.g. luxe-considered>
  dominant_hue_family: <named hue family, e.g. leather-bone-saddle>
  voice_register: <named register, e.g. story-forward-third-person>
  primary_structural_pattern: <named pattern, e.g. shoppable-grid-product-forward>
  hero_shape: <named shape from 05-section-shapes-vocabulary.md, e.g. dual-column-image-and-text>
  footer_shape: <named shape from 05-section-shapes-vocabulary.md, e.g. single-line-strip>
```

The last two fields (`hero_shape` and `footer_shape`) are the latest schema additions. The canonical vocabulary for both lives in [`05-section-shapes-vocabulary.md`](05-section-shapes-vocabulary.md).

### slug

The kebab-case slug for the shipped build. Used to identify the demo in rejection logs and warn or block reasons.

### archetype

The canonical archetype name from `brand-archetype-system`. Use the file slug from `references/core-archetypes/` (e.g. `luxe-considered`, `documentary-honest`, `warm-conversational`). If the demo composes two archetypes, record both as a hyphenated pair with the lead first (e.g. `luxe-considered-rugged-utilitarian`).

### dominant_hue_family

The recognizable colour family the demo reads as, in three to four words. Examples:

- `leather-bone-saddle` (Pinto Mesa Boots v2)
- `dawn-navy-coral` (Drift & Dawn after the dawn retune)
- `dark-linen-amber` (Pho Heights)
- `warm-walnut-brass` (Iron & Rye)
- `forest-green-cream` (Clearflow Initiative)
- `slate-and-amber` (the original Drift & Dawn pre-retune, kept for historical reference)
- `stone-and-amber` (the recurring family the imagery passes surfaced as the drift signal)

The naming convention: two to four colour terms separated by hyphens, lowercase. The terms should be specific enough that two demos with materially different palettes get different families even if they share an undertone.

### voice_register

The brand's voice in three to four words. Examples:

- `story-forward-third-person`
- `atmospheric-second-person`
- `fitment-first-technical`
- `evidence-and-mission-first`
- `restrained-citation-bearing`
- `warm-everyday-craft`

The naming convention: hyphenated phrase that names the register the voice samples in the brief operate in.

### primary_structural_pattern

The structural pattern the homepage runs, in three to five words. Examples:

- `shoppable-grid-product-forward`
- `arc-timeline-hero-with-packages-strip`
- `fitment-selector-then-rails`
- `editorial-hero-then-courses-grid`
- `barber-roster-then-services-menu`
- `theory-of-change-hero-then-evidence-band`

The naming convention: name the homepage's primary spine in a way another build can recognize from the rendered page.

### hero_shape

The shape of the hero section, drawn from the vocabulary in [`05-section-shapes-vocabulary.md`](05-section-shapes-vocabulary.md). Examples:

- `dual-column-image-and-text`
- `wide-photograph-with-band-below`
- `full-bleed-image-with-overlay`
- `type-led-prose`
- `centered-single-column`
- `asymmetric-large-image-small-text`
- `grid-of-elements`
- `data-table-or-spec-led`

A build that needs a shape not in the vocabulary documents and proposes a new label per the extension procedure in `05-section-shapes-vocabulary.md`.

### footer_shape

The shape of the footer section, drawn from the vocabulary in [`05-section-shapes-vocabulary.md`](05-section-shapes-vocabulary.md). Examples:

- `single-line-strip`
- `multi-column-sitemap`
- `type-only-no-links`
- `editorial-colophon-with-masthead`
- `newsletter-band-with-credits`
- `dark-cta-then-credits`

---

## Overlap rules

The comparison is mechanical. The skill applies these rules in order; the first rule that fires determines the outcome for that pair.

### Rule 1: Same archetype + same dominant_hue_family

If two demos share `archetype` AND share `dominant_hue_family`, they are **SIBLING (block)**.

Two demos in the same archetype with the same hue family will read as the same brand at a glance. The block forces an adaptation in either archetype or palette before the brief can ship.

### Rule 2: Same archetype + same voice_register + same primary_structural_pattern

If two demos share `archetype` AND share `voice_register` AND share `primary_structural_pattern`, they are **SIBLING (block)**.

This catches the case where the palettes diverge but the underlying skeleton is identical. The build will look different on first glance and identical on the second.

### Rule 3: Same dominant_hue_family across different archetypes

If two demos share `dominant_hue_family` but their `archetype` differs, the outcome is **WARN**.

A recurring hue family across different archetypes is the most common drift signal in a portfolio. The warn surfaces the recurrence so the consumer can choose to break the pattern or accept it as the portfolio's signature.

### Rule 4: Hero shape collision (warn)

If the candidate's proposed `hero_shape` matches the `hero_shape` of two or more shipped demos, the outcome is **WARN**.

The warn surfaces a deliberation note listing every shipped demo using the same shape. The brief author either justifies the repeat (and records that justification in the brief's section-shapes rationale) or picks a different shape from the vocabulary. Two demos sharing a hero shape is acceptable for a portfolio of nine to twelve demos; three or more is the point where the shape starts reading as the engine's house default.

### Rule 5: Hero shape archetype-collision (block)

If the candidate's proposed `hero_shape` matches the `hero_shape` of three or more shipped demos AND any of those matching demos share an archetype family with the proposed brief, the outcome is **BLOCK**.

This catches the case where the brief is heading toward the strongest sibling result possible: the same hero shape AND a related archetype. The block forces the brief to choose differently on at least one dimension (a different hero shape, or a different archetype lead, or a documented justification that escalates to the deliberation notes with explicit reasoning).

Archetype-family overlap is computed by comparing the lead archetype tokens. Composed archetypes share a family if either of their tokens matches. For example, `editorial-restrained` and `editorial-restrained-documentary-honest` share the `editorial-restrained` family; `documentary-honest-luxe-considered` and `rugged-utilitarian-documentary-honest` share the `documentary-honest` family.

### Rule 6: Footer shape collision (warn)

If the candidate's proposed `footer_shape` matches the `footer_shape` of three or more shipped demos, the outcome is **WARN**.

Footers tolerate more repetition than heroes since they carry less visual weight and are more functional than expressive. The threshold (three matching demos for a warn, not two) is correspondingly higher. There is no block-level rule for footer shapes at this scope; if a portfolio-wide footer shape emerges as the house default, it becomes part of the portfolio's signature rather than a per-build distinctness failure.

### Rule 7: Anything else

If no rule above fires, the outcome is **PASSED**.

---

## Why shapes carry weight

Heroes carry the most visual weight on a page and the most signal to the visitor. Hero-shape repetition across a portfolio compresses the perceived distance between builds even when palette, voice, and structural pattern diverge. The early showcase portfolio surfaced this drift signal: most builds shipped a `dual-column-image-and-text` or `full-bleed-image-with-overlay` hero regardless of brief specification, because the engine pattern-matched the most recently built shape.

Footers carry less weight and are typically more functional than expressive. They tolerate more repetition before the repetition becomes a distinctness cost.

Rules 4, 5, and 6 exist to make hero-shape and footer-shape choice an explicit selection at brief time rather than an implicit inheritance from the most recently built demo.

---

## Comparison procedure

```
# Pairwise rules (run on every candidate-shipped pair):
for candidate in candidates:
  for shipped in shipped_demos:
    if rule_1(candidate, shipped):
      record_block(candidate, shipped, fields=['archetype', 'dominant_hue_family'])
      continue
    if rule_2(candidate, shipped):
      record_block(candidate, shipped, fields=['archetype', 'voice_register', 'primary_structural_pattern'])
      continue
    if rule_3(candidate, shipped):
      record_warn(candidate, shipped, fields=['dominant_hue_family'])
      continue

# Aggregate rules (run once per candidate against the full set):
for candidate in candidates:
  hero_matches = [s for s in shipped_demos if s.hero_shape == candidate.hero_shape]
  if len(hero_matches) >= 3 and any(shares_archetype_family(candidate, s) for s in hero_matches):
    record_block(candidate, hero_matches, fields=['hero_shape', 'archetype'])  # rule 5
  elif len(hero_matches) >= 2:
    record_warn(candidate, hero_matches, fields=['hero_shape'])  # rule 4

  footer_matches = [s for s in shipped_demos if s.footer_shape == candidate.footer_shape]
  if len(footer_matches) >= 3:
    record_warn(candidate, footer_matches, fields=['footer_shape'])  # rule 6
```

The check produces three lists: blocks, warns, and a passed flag (true iff blocks and warns are both empty).

### Input-side outcome

- If any block was recorded against the primary candidate, discard it. If the secondary candidate also blocks, return to step 1 and pick fresh candidates.
- Warns at input-side are surfaced in the rejection log but do not discard the candidate.

### Output-side outcome

After the brief is rendered, the brief's own signature is checked against every shipped demo using the same rules. The outcome is one of:

- **passed**: no blocks, no warns. The brief is ready to hand off.
- **warn-with-reasons**: warns only. The brief shares a single field (most commonly `dominant_hue_family`) with a shipped demo. Surface the warn with the matched fields so the consumer can make a deliberate call.
- **block-with-reasons**: at least one block. The brief is sibling to a shipped demo. Return to step 4 of the process and adapt further before re-rendering.

---

## What changes a block to a warn or a pass

Concretely:

- **Shift the dominant_hue_family.** Swap the dominant accent colour, change the page background's temperature, or change the accent colour family (saddle to oxblood to navy). Recompute the family.
- **Shift the primary_structural_pattern.** Change which move leads the page. A "product-forward" pattern becomes "story-forward" by reordering the spine moves. Recompute the pattern.
- **Shift the voice_register.** Change the voice from third-person to second-person, or from atmospheric to technical. Recompute the register.
- **Compose a different archetype pair.** If the chosen archetype is locked, change the secondary archetype to shift the brief's centre of mass.

Each adaptation should be a deliberate choice, recorded in the brief's adaptation notes (step 4 of the process).

---

## The signatures file

The signatures file is a project artifact, not part of this skill. The consuming project maintains it (typically as `progress/shipped-demos-signatures.yml` or similar). The illustrative format is in [`04-shipped-demos-signatures-example.md`](04-shipped-demos-signatures-example.md).

Whenever a new build ships, append its signature to the file. The signatures grow with the portfolio; the divergence check stays current.

---

## Failure modes

- **Filling fields with vibe words.** "vibrant-modern" is not a hue family; "saddle-bone-walnut" is. The schema works because the field values are specific. Vague values produce vague checks.
- **Re-using the same family across builds without recomputing.** When a build's palette shifts during step 4, the dominant_hue_family must shift with it. A stale signature is worse than a missing signature.
- **Treating warns as ignorable.** A warn is the portfolio's drift early-warning. Three consecutive warns on the same hue family is the portfolio adopting a house signature, which is the failure mode this skill exists to prevent.
- **Hand-waving the rules.** The rules are mechanical. If a candidate blocks under rule 1, it blocks; the answer is to adapt, not to argue with the rule.

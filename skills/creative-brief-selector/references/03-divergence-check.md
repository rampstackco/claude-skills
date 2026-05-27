# The divergence check

The signature schema, the overlap rules, and the comparison procedure.

---

## Signature schema

Each shipped demo carries a signature with five fields. The schema is small on purpose: any field that takes judgment to populate gets argued about; a small mechanical schema gets used.

```yaml
- slug: <kebab-case slug, e.g. pinto-mesa-boots>
  archetype: <canonical archetype name from brand-archetype-system, e.g. luxe-considered>
  dominant_hue_family: <named hue family, e.g. leather-bone-saddle>
  voice_register: <named register, e.g. story-forward-third-person>
  primary_structural_pattern: <named pattern, e.g. shoppable-grid-product-forward>
```

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

### Rule 4: Anything else

If no rule above fires, the outcome is **PASSED**.

---

## Comparison procedure

```
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

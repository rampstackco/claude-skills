# The five-step process

Each step concrete enough to execute. Run in order. Do not skip the divergence steps.

---

## Inputs

The skill takes a business spec:

- **Name** (the brand name to be used in the brief)
- **Vertical** (e.g. western-boot maker, neighborhood barbershop, balloon-ride operator)
- **Shape** (the site shape: ecommerce-catalog, ecommerce-standout, local-service-booking, hospitality-experience, hospitality-food, institution-mission, inventory-listing, subscription-app, b2b-manufacturer, directory-marketplace)
- **One-line vibe** (a sentence describing what the brand wants to feel like)
- **Shipped-demos signatures file** (optional; the project artifact listing prior builds' signatures)

If the shipped-demos file is absent, the build is the first in the portfolio. Run the divergence steps anyway and seed the signatures file with the rendered brief's signature.

---

## Step 1. Locate the design space

Read the business spec. Pick one to two candidate archetypes from `brand-archetype-system` that fit the vertical and shape.

**How to pick:**

- Read the vertical and shape against the 12 core archetypes. Most verticals have two or three plausible candidates; the shape narrows it.
- A western-boot maker maps plausibly to Luxe Considered (heritage premium), Rugged Utilitarian (workwear and craft), or Editorial Restrained (boutique editorial). The shape (ecommerce-standout, with a small editorial collection) narrows toward Luxe Considered with a Rugged Utilitarian secondary.
- A neighborhood barbershop maps plausibly to Warm Conversational (everyday-craft), Retro Nostalgic (period-specific), or Documentary Honest (real-people-real-work). The shape (local-service-booking, with a booking action) narrows toward Warm Conversational with a Retro Nostalgic secondary.
- A balloon-ride operator maps plausibly to Documentary Honest (landscape-and-light), Luxe Considered (aspirational-experience), or Warm Conversational (small-operator-warm). The shape (hospitality-experience, with a named arc and a booking flow) narrows toward Documentary Honest with a Luxe Considered secondary.

**Output of this step:**

- Primary candidate archetype (name)
- Optional secondary candidate archetype (name) with a note on which leads
- Two-sentence rationale tying each candidate to the vertical and shape

---

## Step 2. Run input-side divergence

Read the shipped-demos signatures file. Compare each candidate against every shipped demo using the rules in [`03-divergence-check.md`](03-divergence-check.md).

**Procedure:**

- For each candidate (primary, then secondary if present):
  - For each shipped demo:
    - If archetype matches AND dominant_hue_family matches => discard the candidate as SIBLING.
    - If archetype matches AND voice_register matches AND primary_structural_pattern matches => discard the candidate as SIBLING.
- If all candidates are discarded, return to step 1 and pick fresh candidates from a different position on the four creative-direction axes.

**Output of this step:**

- The surviving candidate (the chosen archetype)
- A rejection log listing any discarded candidates with the reason (which shipped demo collided and on which fields)

The rejection log is part of the brief output. It documents what the build was deliberately NOT.

---

## Step 3. Pull references

From `reference-bank/`, load the file matching the chosen archetype-and-vertical. Read the positive references and the negative references.

**If the bank has the combination:**

- Pull three to four positive references from the bank's list. Prefer the ones marked as canonical or most-recent.
- Read the negative references; they tell the build what register to avoid.

**If the bank is sparse for the combination:**

- Pull whatever positive references are available (one or two if that is all the bank has).
- Augment with one to two discovered live references that exemplify the position. Search the web for the vertical with the archetype's signal terms (e.g. for Luxe Considered DTC western boots: "premium western boot maker editorial photography prices visible").
- Note the discovered references with the same format as the bank (URL plus one-line why). Add them back to the bank as part of the build PR.

**Output of this step:**

- A list of three to four live reference URLs, each with a one-line why
- A note on which references came from the bank versus which were discovered
- A list of negative references (registers to avoid)

---

## Step 4. Adapt

Take the chosen archetype's defaults from `brand-archetype-system` (palette, type, voice, layout, imagery direction). Shift them toward the business spec's specifics.

**Adaptations to document:**

- **Palette.** Pick 6 to 8 specific hex values that fit the brand. Name each with a token name (e.g. `Bone cream #f5ecd7`, `Saddle tan #a8753a`, `Pre-dawn navy #1a1f3a`). Each token gets a role (page background, primary text, primary CTA, accent, etc.).
- **Type system.** Pick the display family (often a serif from the archetype), the body family (often Inter or similar), and the micro-label treatment (tracking, casing, weight). Document the explicit differentiators from shipped demos (e.g. "tight uppercase tracking 0.04em on micro-labels, distinct from the loose 0.18em tracking the hospitality-experience build uses").
- **Voice.** Pick the voice register (e.g. story-forward third-person; atmospheric second-person; fitment-first technical). Write five to ten voice samples in this voice using the brand name.
- **Layout.** Pick the structural pattern (e.g. shoppable-grid-product-forward; arc-timeline-hero; fitment-selector-then-rails). Describe the spine moves the homepage will run (four to six numbered moves).
- **Section shapes.** Pick a `hero_shape` and a `footer_shape` from the vocabulary in [`05-section-shapes-vocabulary.md`](05-section-shapes-vocabulary.md). The hero shape carries the most visual weight on the page; pick it deliberately based on archetype, audience, and the shapes already shipped in the portfolio. Document the rejected shapes in the brief with one-line reasons. Skipping this step means the engine inherits the most recently built hero shape regardless of brief specification, which is the drift signal this skill exists to catch.
- **CTA grammar.** Pick the verb register (e.g. "Shop the collection," "Book a dawn," "See the morning"). Verb-first, shape-appropriate.
- **Imagery direction.** Describe the shoot's register (e.g. "warm-bone studio seamless, three-quarter angle, soft overhead, products fill 70 percent of frame"). Specify aspect ratios per page slot.

**Each adaptation choice gets a sentence of why.** The brief is a referenceable artifact; it should explain itself.

**Output of this step:**

- The full adaptation set, ready to render into the brief template.

---

## Step 5. Render and verify

Render the brief using the template in [`02-brief-template.md`](02-brief-template.md).

After rendering, compute the brief's own signature and run output-side divergence:

- `archetype`: the chosen archetype (from step 1)
- `dominant_hue_family`: derived from the palette tokens
- `voice_register`: from the voice section
- `primary_structural_pattern`: from the spine moves
- `hero_shape`: from the section-shapes choice in step 4
- `footer_shape`: from the section-shapes choice in step 4

Compare this signature against every shipped demo using the full rule set in [`03-divergence-check.md`](03-divergence-check.md). The check now runs seven rules: the original three pairwise rules (archetype/hue, archetype/voice/pattern, recurring hue across archetypes) plus the three aggregate shape rules (hero shape collision warn at two matches, hero shape archetype-collision block at three matches with shared family, footer shape warn at three matches).

**Possible outcomes:**

- **passed.** No overlaps. The brief is ready to hand off.
- **warn-with-reasons.** The brief shares a single field (most commonly dominant_hue_family) with a shipped demo, but not enough to be sibling. Surface the warn with the matched fields so the consumer can make a deliberate call.
- **block-with-reasons.** The brief is sibling to a shipped demo. Return to step 4 and adapt further before re-rendering. Common fixes: swap the dominant accent colour, restructure one of the spine moves, shift the voice register.

**Output of this step:**

- The rendered brief
- The references list (from step 3)
- The divergence-check result with all matched fields if any
- A one-line summary suitable for the build PR's description

---

## Failure modes

- **Skipping step 2.** Picking the archetype that "feels right" without checking against shipped demos is how the portfolio drifts toward house style.
- **Skipping step 5.** Adapting in step 4 without re-checking on output is how the brief itself becomes the carrier of drift.
- **Verbatim copying from the archetype's default palette.** The archetypes provide anchor points, not endpoints. If the brief's palette is the archetype's palette unchanged, the brief is the archetype, not a build.
- **Citing references without why-lines.** A reference URL without a one-line why is decoration. The why is what makes the reference usable in step 4.
- **Hand-waving the divergence check.** The check is not a vibe call. It is a mechanical comparison against the schema. If it produces a block, the adaptation is incomplete.
- **Treating the rejection log as overhead.** The rejection log is part of the deliverable. It tells the next build what is already taken.

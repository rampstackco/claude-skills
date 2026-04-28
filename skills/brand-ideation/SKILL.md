---
name: brand-ideation
description: "Generate, evaluate, and narrow brand concepts during early ideation including positioning territories, naming candidates, mood directions, and narrative angles. Use this skill whenever the user is in the early phase of brand creation, exploring brand directions, brainstorming names, building moodboards, generating positioning options, or trying to choose between multiple brand directions. Triggers on brand ideation, brand concept, naming, brand name, name candidates, positioning, brand positioning, mood board, brand directions, exploring brands, early brand work, brand exploration, brand brainstorm, brand options. Also triggers when the user has multiple half-formed brand ideas and needs help converging on one, even if they do not say 'ideation' explicitly."
---

# Brand Ideation

Generate and converge on brand directions before committing to identity work. This is upstream of `brand-identity` (the visual system) and `brand-style-guide` (the documentation). It is the divergent-then-convergent thinking phase where ideas are cheap and direction matters more than polish.

---

## When to use

- Generating naming options for a new brand or product
- Exploring positioning territories before committing
- Building moodboards and visual direction options
- Drafting narrative or origin-story angles
- Helping the user converge from many half-ideas to one direction
- Stress-testing an existing brand idea before investing in identity work

## When NOT to use

- The brand direction is already locked, the user wants logo and identity work (use `brand-identity`)
- Documenting an existing brand system (use `brand-style-guide`)
- Defining voice for an existing brand (use `brand-voice`)
- Initial discovery and audience research (use `brand-discovery`)

---

## Required inputs

- The category or product type
- The audience (at least roughly)
- The reason this brand exists (the problem it solves or the gap it fills)
- Constraints (existing brand assumptions, parent brand, regulatory limits)
- Number of directions desired (typically 3 to 5)

If the audience is unclear, run `brand-discovery` first.

---

## The framework: 4 stages

Brand ideation moves through four stages. Each stage diverges (generate options) then converges (pick a direction).

### Stage 1: Positioning territories

A positioning territory is the strategic space the brand occupies. It is not a tagline. It is the answer to "what does this brand stand for that competitors do not?"

Generate 3 to 5 territories using these angles:

- **Functional benefit.** "The fastest way to X." (Risk: easy to copy.)
- **Emotional benefit.** "The brand that makes you feel Y." (Risk: vague if not earned.)
- **Identity.** "For people who are Z." (Risk: alienates non-Z customers.)
- **Antagonist.** "The opposite of [incumbent]." (Risk: defines you by them.)
- **Originator.** "The first or only one to do W." (Risk: must be defensible.)
- **Worldview.** "We believe V." (Risk: must be lived, not just stated.)

For each territory, write:
- **Statement** (one sentence)
- **Why this is true** (the proof point)
- **What this rejects** (the territory we are NOT going to)
- **Risk** (what makes this fragile)

### Stage 2: Naming directions

Names cluster by approach. Generate names across multiple approaches, not just one.

| Approach | Description | Examples |
|---|---|---|
| Descriptive | Says what it is | "General Electric," "American Airlines" |
| Evocative | Suggests a feeling or quality | "Patagonia," "Oasis," "Stripe" |
| Founder | Person's name | "Disney," "Ford," "Tesla" |
| Acronym | Letters from longer phrase | "IBM," "BMW," "AWS" |
| Coined | Made-up word | "Kodak," "Häagen-Dazs," "Asana" |
| Metaphor | Borrowed concept | "Apple," "Amazon," "Twitch" |
| Compound | Two words combined | "Facebook," "PayPal," "Spotify" |
| Suggestive | Hints at function without describing | "Tide," "Sprint," "Slack" |

Generate 8 to 15 candidates per direction. Apply naming filters before short-listing:

- **Pronounceable** in target languages
- **Spellable** without confusion
- **Available** as a domain (.com or relevant TLD), social handles, and trademark
- **Distinctive** in the category (search the name + category, see what comes up)
- **Stretchable** (does the name still work if the company expands?)
- **Free of negative associations** (run it past native speakers of any major target market)

A short-listable name passes all six. Most names fail at least one. The bar is necessarily high.

### Stage 3: Mood and visual direction

Generate visual directions BEFORE designing anything. Each direction should be distinct enough that a designer would produce visibly different work for each.

For each mood direction (typically 2 to 4):

- **Mood adjectives** (3 to 5 words)
- **Color territory** (warm/cool, saturated/muted, light/dark - not specific hex yet)
- **Type territory** (serif/sans, modern/classical, geometric/humanist)
- **Imagery direction** (photography style, illustration style, iconography)
- **Reference brands or sites** (3 to 5 that exemplify the direction)
- **What this rejects** (the visual territory we are NOT going to)

A mood direction is "Editorial sophistication: Warm cream paper backgrounds, classical serifs, archival photography. Think: The New York Times Magazine meets a literary journal."

A bad mood direction is "Modern and clean."

### Stage 4: Narrative and origin

Every brand has a story. The narrative answers: how do we tell people why this exists?

Common narrative shapes:

- **Founder story.** A real person solved a real problem they had.
- **Mission story.** A bigger purpose drives every decision.
- **Discovery story.** We found something the world did not know.
- **Heritage story.** This has always been done a certain way; we honor or refresh it.
- **Frustration story.** The category was broken; we built the alternative.
- **Vision story.** Here is the future we are pulling toward.

For each candidate narrative:

- **One-sentence summary**
- **The opening line** (how the story starts when told for the first time)
- **The proof points** (what makes it true and not marketing puff)
- **The hero** (who the audience identifies with - the founder, the customer, the world)

---

## Workflow

1. **Confirm the inputs.** Category, audience, reason for being, constraints.
2. **Stage 1: Generate 3 to 5 positioning territories.** Use the 6 angles above. Name what each rejects.
3. **Pick 1 to 2 territories.** Move forward with the strongest.
4. **Stage 2: Generate 30 to 50 naming candidates** across at least 4 approaches. Filter to 8 to 12 that pass the six-criteria check.
5. **Stage 3: Generate 2 to 4 mood directions.** Each must be distinguishable enough to brief a designer.
6. **Stage 4: Generate 2 to 3 narrative shapes.** Pick the one that fits the founders, the audience, and the proof points.
7. **Converge.** Present the user with: 1 positioning, 8 to 12 naming finalists, 2 to 4 mood directions, 2 to 3 narrative shapes. Help them pick.
8. **Output.** Use the template in `references/ideation-output-template.md`.

---

## Failure patterns

- **Generating one option and calling it "the answer."** The point of ideation is divergence. Without options, there is no real choice.
- **Skipping the rejection step.** A territory that does not name what it rejects is not a territory. Same for moods.
- **Naming before positioning.** Names without positioning end up arbitrary. Position first.
- **Falling in love with one name too early.** Run the full filter on every candidate. The clever name that fails the trademark check is not a candidate.
- **"Modern, clean, minimal" mood direction.** Means nothing. Always require specific reference brands.
- **Skipping pronunciation tests.** Especially for international brands. A name that confuses non-English speakers loses search volume forever.
- **Mistaking ideation for execution.** The output of this stage is direction, not finished assets. Resist the urge to design logos here.

---

## Output format

Default output is a markdown brief at `brand-ideation.md` in the project root. Includes:

1. The chosen positioning territory (with what it rejects)
2. Naming finalists (8 to 12) with notes on each
3. Mood directions (2 to 4) with reference URLs
4. Narrative shape (chosen) with opening line and proof points
5. Open questions and decisions still needed before identity work begins

Optional: a separate `naming-explorations.md` with the full list of 30 to 50 candidates (the "kill file") in case the chosen finalists fail later checks.

---

## Reference files

- `references/ideation-output-template.md` - Fillable template for the ideation deliverable.
- `references/naming-evaluation-rubric.md` - The 6-criteria filter applied with examples.

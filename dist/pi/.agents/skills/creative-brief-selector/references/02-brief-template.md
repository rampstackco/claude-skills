# The brief template

A fillable markdown skeleton. Fill every section. A section left blank is a section the build will fill with the house default, which is exactly the drift this skill exists to prevent.

The template is modeled on the structure proven by real shipped builds. The worked example link at the bottom of this file shows the structure rendered against a real build.

---

## Template

```markdown
# Creative direction: <Brand Name> as <archetype position>

A reusable brief for the <Brand Name> build. <One-sentence purpose: what shape is this, what position is this, why this brief>.

Use this brief for:

- <Specific use case 1>
- <Specific use case 2>

Do NOT use this brief for:

- <Adjacent shape that should NOT use this brief>
- <Adjacent position that should NOT use this brief>

## The <N> spine moves

1. **<Move 1 name>.** <One paragraph describing the move, specific to the shape>.
2. **<Move 2 name>.** <One paragraph>.
3. **<Move 3 name>.** <One paragraph>.
4. **<Move 4 name>.** <One paragraph>.
<continue 5, 6 if the shape calls for them>

## Register

- **Positive reference frame**: <one sentence describing what the brand IS, with named exemplars in nominative attribution>
- **Negative reference frame**: <one sentence describing what the brand is NOT, with named non-exemplars>

## Live reference sites

The references this brief draws from. Each is a real site exemplifying the chosen position.

- [<URL 1>] - <one-line why; what specifically this site does that the brief inherits>
- [<URL 2>] - <one-line why>
- [<URL 3>] - <one-line why>
- [<URL 4>] - <one-line why, optional>

Negative references (do NOT pull from):

- [<URL>] - <one-line why this register is the wrong one>

## Section shapes (hero and footer; first-class brief outputs)

Pick a `hero_shape` and a `footer_shape` from [`05-section-shapes-vocabulary.md`](05-section-shapes-vocabulary.md). Document the choice with rationale; the choice is not optional and a brief without these fields does not pass the divergence check.

### `hero_shape`: <chosen shape label, e.g. `wide-photograph-with-band-below`>

<One paragraph: why this shape, what the chosen shape signals to the visitor that the alternatives do not, what shapes were rejected and why. Reference the section-shapes vocabulary by label.>

Rejected shapes:

- `<rejected shape 1>` - <one-line why this shape was wrong for this brief>
- `<rejected shape 2>` - <one-line why this shape was wrong for this brief>

### `footer_shape`: <chosen shape label, e.g. `single-line-strip`>

<One paragraph: why this footer shape, what it does for the page that alternatives do not.>

Rejected shapes:

- `<rejected shape>` - <one-line why>

## Palette token shape (specific to this brand; do not reuse across brands)

| Token | Hex | Role |
|---|---|---|
| <Token 1 name> | `#hex` | <Role> |
| <Token 2 name> | `#hex` | <Role> |
| <Token 3 name> | `#hex` | <Role> |
| <Token 4 name> | `#hex` | <Role> |
| <Token 5 name> | `#hex` | <Role> |
| <Token 6 name> | `#hex` | <Role> |
| <Token 7 name> | `#hex` | <Role, optional> |
| <Token 8 name> | `#hex` | <Role, optional> |

Do NOT re-use <named hue family from a shipped demo, e.g. "stone-50 + amber-300 (the hospitality-experience default from the X build)">.

## Type system

- **Display.** <Family choice with stack notation>, <weight>, <tracking>.
- **Body.** <Family choice>, <weight>.
- **Brand wordmark.** <Family, case, tracking>. Distinct from <named shipped demo's wordmark treatment, e.g. "the loose 0.22em tracking used on the hospitality build">.
- **Micro-labels.** <Family, case, tracking>. <One-line on the explicit differentiator from shipped demos>.
- **Numerics.** <Family, tabular-nums or proportional, treatment for prices>.

## CTA grammar

- **Primary on home.** "<Verb-first label>". <One-line on why this verb>.
- **Secondary on home.** "<Verb-first label>". <One-line on why this verb>.
- **On product or detail page.** "<Label>". Verb-shape-appropriate.
- **On craft or about page.** "<Label>". Should close back to the primary action.

## Image-ready spine

The structure must be image-ready before any imagery pass runs. Per page slot:

| Page | Aspect | Count | Source |
|---|---|---|---|
| <Page slot 1> | <e.g. 5:6 portrait> | 1 | <e.g. the signature product> |
| <Page slot 2> | <e.g. 4:5 portrait> | <e.g. one per product> | <e.g. each product, on its own card> |
| <Page slot 3> | <e.g. 16:9 wide> | 1 | <e.g. one lifestyle scene supporting the craft band> |
| <continue for every page> | | | |

Each slot uses a placeholder during Phase A and is filled by the imagery pass in Phase B. Placeholders carry the alt text the final image will carry, so the swap is structurally drop-in.

## Voice samples

Five to ten lines in the brand's voice, used downstream by content-and-copy and landing-page-copy.

- <Sample 1>
- <Sample 2>
- <Sample 3>
- <Sample 4>
- <Sample 5>
- <Sample 6, optional>
- <Sample 7, optional>

## Honesty contract (unchanging across the portfolio)

- <Functional element, e.g. cart, booking form> is real client-side, <demo surface, e.g. checkout, payment> is a clearly labelled demo that processes nothing.
- Fictitious brand disclosure in the footer and in any JSON-LD `description` field.
- Demo-only labelling on any demo surface in the brand's primary accent colour.
- All prices and figures fictitious. No promotional cadence, no fabricated reviews, no fabricated press quotes.
- No real brand mark. The logo pass, if any, is a separate later run.

## Acceptance checklist (Phase A criteria)

A build matches this brief if:

- [ ] <Move 1 acceptance criterion>
- [ ] <Move 2 acceptance criterion>
- [ ] <Move 3 acceptance criterion>
- [ ] <Move 4 acceptance criterion>
- [ ] Palette is documentable as <N> tokens, distinct from any shipped demo's tokens.
- [ ] Type micro-labels have a distinct treatment from <named shipped demo's treatment>.
- [ ] Per-page image slots are wired with descriptive alt text, ready for a Phase B drop-in.
- [ ] Honesty contract intact.

## Divergence-check result

- **Archetype**: <chosen archetype name from brand-archetype-system>
- **Dominant hue family**: <derived from palette, e.g. "leather-bone-saddle">
- **Voice register**: <e.g. "story-forward third-person">
- **Primary structural pattern**: <e.g. "shoppable-grid-product-forward">
- **Hero shape**: <chosen label from 05-section-shapes-vocabulary.md>
- **Footer shape**: <chosen label from 05-section-shapes-vocabulary.md>

**Input-side divergence**: <passed | warn-with-reasons | block-with-reasons>. <If anything was rejected at step 2, list it here: rejected <archetype> because it collided with <shipped demo slug> on <field>>.

**Output-side divergence**: <passed | warn-with-reasons | block-with-reasons>. <If warn or block, list the matched fields and the colliding demo. Rules 4 and 6 surface as warns; Rule 5 surfaces as a block; Rules 1, 2, 3 surface per their definitions in 03-divergence-check.md.>

---
```

---

## Worked example

The Pinto Mesa Boots store-spine brief at `rampstackco-app/progress/ecommerce-standout-store-spine-brief.md` is a faithful render of this template against a real shipped build (ecommerce-standout shape; Luxe Considered with Rugged Utilitarian influence). It demonstrates:

- The five spine moves (product-forward hero, shoppable grid, honest wayfinding, craft as supporting band, premium trust signals).
- The leather-forward palette with explicit do-not-reuse against the prior hospitality build's stone-and-amber.
- The type differentiation (tight uppercase microlabel tracking, distinct from the prior hospitality build's loose tracking).
- The image-ready spine with per-page aspect / count / source.
- The acceptance checklist as Phase-A criteria.

Use the worked example as a structural reference when rendering new briefs.

---

## Common section failures

- **Skipping the "Do NOT use this brief for" section.** The negative-use section is what keeps the brief from being mis-applied to an adjacent shape.
- **Spine moves that are abstract.** "Lead with the product" is not a spine move. "Lead with the signature product shown large at 5:6 with one primary CTA and price-forward entry" is.
- **Palette without explicit do-not-reuse lines.** The do-not-reuse line is what makes the divergence check checkable.
- **Type system without the explicit differentiator from shipped demos.** This is the single field most likely to drift if not pinned.
- **CTA grammar in mood words.** "Welcoming" is not CTA grammar. "Shop the collection" is.
- **Image-ready spine without aspect ratios.** Without the aspect ratios the imagery pass cannot generate to the right shape.
- **Honesty contract treated as boilerplate.** The contract is part of what makes the brand demo-honest; cut and paste it but verify each line still applies to the specific build.
- **Acceptance checklist as motivational language.** The checklist is the build's pass/fail criteria, not a vibe statement.

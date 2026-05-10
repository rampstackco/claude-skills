---
name: brand-archetype-system
description: "Apply pre-composed aesthetic archetype defaults to jumpstart brand design work covering color, typography, layout, voice, and imagery direction. Use this skill whenever the user wants a starting point for brand visual and verbal direction, references a brand they want to design near (for example 'something like Stripe' or 'editorial like Linear'), needs to converge faster from many directions to one, or wants known-good defaults for a specific industry vertical. Triggers on archetype, design archetype, brand archetype, near to (brand), in the style of, similar aesthetic, design starting point, brand template, vertical-typical, industry-typical. Also triggers when the user has a brief and wants to map it to a known aesthetic family rather than design from first principles."
category: brand
catalog_summary: "12 archetype defaults across 18 verticals: color, type, voice, imagery starters"
display_order: 5
---

# Brand Archetype System

Pre-composed aesthetic archetype defaults that jumpstart brand design work. Each archetype bundles color tendencies, type pairings, layout patterns, voice samples, and imagery direction for a recognizable aesthetic family. Stack-agnostic. Tool-agnostic.

This is a starting-point library, not a methodology library. The agent applies archetype defaults to a specific brief; the archetypes themselves provide anchor points, not endpoints.

---

## When to use

- The user wants a starting point rather than designing from first principles
- The user references a brand or aesthetic family they want to design near
- Need to converge faster from many directions to one
- The user wants vertical-typical defaults (for example fintech consumer, B2B developer tools)
- The user wants to test what a brief would look like in a different archetype

## When NOT to use

- The user wants pure methodology guidance (use `brand-identity`)
- The user is in early ideation needing positioning territories (use `brand-ideation`)
- Defining voice for an existing brand (use `brand-voice`)
- Documenting a finished brand (use `brand-style-guide`)

---

## How this composes with other skills

This skill works upstream of `brand-identity` (provides starting defaults that brand-identity refines into a finished system) and parallel to `creative-direction` (archetypes can be located by position on the 4 creative-direction axes).

Typical flow when this skill is invoked:
1. User provides a brief or references a target archetype
2. Agent picks the most relevant core archetype, or composes from 2 adjacent archetypes
3. Agent adapts the archetype's defaults to the brief (color tokens shift, type swaps to vertical-appropriate fonts, voice samples rewrite for the brand)
4. Agent flags adaptation choices made

Direct verbatim copying of an archetype's default palette into a new brand is a failure mode. Archetypes constrain the design space; the brief specifies the point within that space.

---

## The framework: 12 core archetypes plus 18 vertical applications

Two layers of content in `references/`:

### Core archetypes (12 files)

Located in `references/core-archetypes/`. Each is an aesthetic family with:
- Aesthetic summary
- Position on the 4 `creative-direction` axes
- Color palette starter (4 to 6 hex values with token names and rationale)
- Type pairing starter (Google Fonts pairing with size scale)
- Layout and composition patterns
- Voice samples (5 to 10 representative lines)
- Component pattern descriptions (heroes, buttons, cards, tables)
- Imagery direction
- When to pick and when to avoid
- Adaptation guidance
- Exemplar brands with attribution language

### Vertical applications (18 files)

Located in `references/by-vertical/`. Each maps named brands to core archetypes in that vertical with:
- Vertical summary
- Common archetypes
- Brand-to-archetype mapping (5 to 10 brands per vertical)
- Vertical-specific adaptation notes
- Common archetype evolution patterns as brands mature

### Two overview files

- `00-archetype-system-overview.md`: how the system works, the taxonomy
- `01-how-to-apply-an-archetype.md`: the adaptation discipline, the failure modes

---

## The 12 core archetypes

| # | Archetype | Single-line summary |
|---|---|---|
| 01 | Editorial Restrained | Low-saturation, type-led, generous whitespace, considered |
| 02 | Technical Precise | Monospace and grid prominent, data-dense, system-feeling |
| 03 | Warm Conversational | Human imagery, mid-saturation, friendly type, approachable |
| 04 | Bold Confident | High-contrast, large display type, saturated, direct |
| 05 | Playful Energetic | Bright colors, illustration-led, dynamic, character-driven |
| 06 | Luxe Considered | Serif-led, generous spacing, restrained palette, premium |
| 07 | Clinical Trustworthy | Cool palette, sans-serif, clean medical or financial register |
| 08 | Rugged Utilitarian | Earth tones, workwear influence, no-nonsense type |
| 09 | Retro Nostalgic | Period-specific palette and type, intentional vintage reference |
| 10 | Minimal Essentialist | Black, white, single accent, sans-serif only, sparse |
| 11 | Vibrant Saturated | High-saturation across full palette, color as character |
| 12 | Documentary Honest | Photography-led, real people, low-touched imagery |

## The 18 vertical applications

- B2B SaaS: Developer Tools, Business Productivity, Marketing and Sales, Data and Analytics
- Fintech: Consumer, Enterprise
- DTC: Fashion, Beauty, Home and Lifestyle, Food and Beverage
- Consumer Health and Wellness
- Hospitality and Travel
- Media and Publishing
- EdTech
- Gaming and Entertainment
- Marketplace
- Crypto and Web3
- Real Estate and Proptech

---

## Trademark and attribution

Archetypes are NAMED for aesthetic families, NOT for brands. "Editorial Restrained" not "Stripe-like." Brands are referenced as exemplars in description text using attribution language: "exemplified by [brands]", "common among [brands]", "characteristic of [brands]".

This is descriptive and nominative fair use territory, durable across brand redesigns. A brand that pivots its identity does not invalidate the archetype it once exemplified.

---

## The four creative-direction axes (reference)

Each archetype positions on the 4 axes defined in the `creative-direction` skill. Brief summary for cross-reference:

- **Tone register**: Professional, Conversational, Playful
- **Aesthetic register**: Restrained, Considered, Expressive, Maximal
- **Audience relationship**: Authority, Peer, Companion, Performer
- **Sensory ambition**: Functional, Considered, Immersive, Theatrical

Each core archetype file specifies its position on each axis.

---

## Reference files

- [`references/00-archetype-system-overview.md`](references/00-archetype-system-overview.md) - How the two-layer system fits together, entry patterns, when archetypes compose, and the recurring failure modes.
- [`references/01-how-to-apply-an-archetype.md`](references/01-how-to-apply-an-archetype.md) - The 5-step adaptation process: locate the design space, map the brief to adjustable dimensions, adapt color, adapt type, write voice samples. Includes the cross-archetype coherence check.

The 12 core archetype files live in the `core-archetypes/` subdirectory under references, numbered 01 (Editorial Restrained) through 12 (Documentary Honest). The 18 vertical application files live in the `by-vertical/` subdirectory under references, numbered 01 (B2B SaaS Developer Tools) through 18 (Real Estate and Proptech). Load the relevant core archetype file plus the relevant vertical file together for any brief that names both an aesthetic family and an industry.


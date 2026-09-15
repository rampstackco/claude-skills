# Editorial Restrained

## Aesthetic summary

Low-saturation, type-led, generous whitespace. Considered rather than performed. The brand earns attention through restraint instead of demanding it through volume. Reads as institutional confidence without stiffness.

## Position on the 4 creative-direction axes

- **Tone register**: Conversational (warm but precise, comfortable with first person)
- **Aesthetic register**: Restrained
- **Audience relationship**: Peer
- **Sensory ambition**: Considered

## Color palette starter

| Token | Hex | Role |
|---|---|---|
| ink | #0F1B2D | Primary text, body, anchors |
| ink-muted | #1F2D44 | Secondary text |
| paper | #FAF9F6 | Warm off-white background |
| paper-soft | #F3F1EC | Card surfaces, subtle elevation |
| accent | #5B8B85 | Single accent for links and key actions |
| accent-muted | #3F6E55 | Hover states, secondary accent applications |
| highlight | #C9A227 | Numeric callouts, display sizes only |
| highlight-body | #8E6E1A | Same hue at body-text contrast (WCAG AA) |
| line | #EDEFF2 | Borders, separators |

Rationale:
- Ink at #0F1B2D not pure black. Pure black on warm paper feels harsh; navy ink reads as ink-on-paper.
- Paper at #FAF9F6 not pure white. Warm tint signals editorial register versus UI register.
- Accent restricted to one hue. Two-color systems read as institutional; multi-color reads as consumer.
- Highlight restricted to display sizes; the body-contrast variant (#8E6E1A) covers WCAG AA at smaller scales without losing the warm-gold character.

## Type pairing starter

- **Display**: IBM Plex Serif (Google Fonts, free). 700 for hero, 600 for sections.
- **Body**: Inter (Google Fonts, free). 400 for prose, 500 for UI labels.
- **Numerics**: JetBrains Mono (Google Fonts, free). 400 to 500 for KPIs and code.

Size scale (modular, 1.2 ratio anchored at 16px):
- Hero: 56 to 72px serif
- H2: 32 to 40px serif
- H3: 22 to 26px serif
- Body: 16 to 18px sans
- Small: 13 to 14px sans
- Mono: 14 to 16px monospace

Pairing rationale: serif display plus sans body is the classic editorial pairing (NYT, magazines). IBM Plex specifically has open apertures and modest contrast that reads as institutional but modern. JetBrains Mono for numbers communicates precision without being overtly technical.

## Layout and composition

- Generous whitespace. Sections separated by 96 to 128px vertical rhythm minimum.
- Single-column hero, content left-aligned, max-width around 720px for prose.
- Asymmetric grids on landing pages: 2-column with deliberate imbalance (40/60 or 60/40) more often than centered or 50/50.
- Density: low. The page should breathe.
- Cards: subtle elevation via 1px line border at line color, no drop shadows.

## Imagery direction

- Photography: editorial, low-touched, real environments, natural light.
- Illustration: rare. If used, line-only, single color, technical drawing register.
- Product UI: shown in stylized chrome with branded surfaces; rarely the actual app screenshot.
- Decorative imagery: avoided. Everything earns its place.

## Voice samples

- "Built around the question, not against the event stream."
- "Real components, real brand foundations, real working forms."
- "The measurement surface PLG teams actually need."
- "Onboarding metrics live in the cracks between general-purpose tools."
- "Focused, not just smaller."
- "Sample funnel, real benchmarks, your cohort."
- "Pre-built activation funnels. Time-to-first-value benchmarking."

Cadence: complete sentences. Comma-separated qualifiers more often than dashed asides. Direct claims with built-in qualification. No exclamation marks. Numerals over written numbers.

## Component pattern descriptions

**Hero**: Eyebrow (uppercase, accent color, letterspaced 0.16em), then serif headline 56 to 72px, then sans subhead 18px paragraph, then 2 buttons (primary solid ink, secondary outline), optional KPI strip below.

**Buttons**: Primary is solid ink, white text. Secondary is white surface, ink border 1px, ink text. No gradients. No drop shadows. Hover state shifts opacity to 0.9 or fills the secondary surface.

**Cards**: Paper-soft background, 1px line border, 24 to 32px internal padding. Numerals top-left in mono. Title in serif. Body in sans.

**Tables**: Paper-soft header row, line color separators between rows, monospace numerics aligned right.

## When to pick this

- B2B brand for a measured, considered audience (PMs, engineers, founders, finance)
- Category is loud and your differentiation is calm
- Product earns attention through depth rather than novelty
- Audience reads documentation and trusts restraint

## When to avoid

- Consumer brand for an audience that wants energy and warmth
- Product that needs to feel inviting at first touch
- Category where competitors are already restrained (you will disappear)
- Brand that needs to communicate playfulness or character

## Adaptation guidance

When applying this archetype to a specific brief:

1. **Keep the structure** (whitespace, single-accent, restrained type pairing). Adapt specific values.
2. **Color**: shift accent hue to match emotional direction. Muted teal feels rational; muted plum feels considered; muted moss feels grounded; muted slate feels institutional.
3. **Type**: IBM Plex Serif is a starting point. Substitutes that fit: GT Sectra, Tiempos, Fraunces, Source Serif.
4. **Density**: dial up or down based on audience. Developers tolerate more density; founders prefer more whitespace.
5. **Highlight color**: optional. Brands without a numeric story do not need it.

Direct copying of all defaults verbatim produces generic Editorial Restrained output. The brief should produce a meaningful variant.

## Exemplar brands

Editorial Restrained is exemplified by Linear, Vercel, Stripe Press, Resend, and the fictional Threshold reference build in this catalog. Earlier examples include Pentagram's institutional work and the early Medium publication system.

These brands share: serif display, sans body, single accent, generous whitespace, editorial photography or stylized product UI, peer-relationship voice.

The archetype overlaps with Technical Precise (Stripe docs, Sentry); blended brands typically use Editorial Restrained for marketing surfaces and Technical Precise for documentation surfaces.

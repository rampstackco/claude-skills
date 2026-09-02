# Technical Precise

## Aesthetic summary

Monospace prominent in display and numerics. Grid visible in compositions. Data density tolerated and embraced. Dark mode often dominant. Cool palette with high precision feel. The brand communicates that it understands the technical substance of what it is selling, and that its audience does too.

## Position on the 4 creative-direction axes

- **Tone register**: Professional (precise, low-affect, treats the reader as informed)
- **Aesthetic register**: Restrained
- **Audience relationship**: Authority
- **Sensory ambition**: Functional

## Color palette starter

| Token | Hex | Role |
|---|---|---|
| ink | #0A0E1A | Light-mode primary text |
| ink-muted | #1F2937 | Light-mode secondary text |
| paper | #FFFFFF | Light-mode background |
| paper-soft | #F6F8FA | Light-mode card surface |
| surface-dark | #0F1117 | Dark-mode primary background |
| surface-dark-elevated | #161922 | Dark-mode card surface |
| text-dark | #E6E9F2 | Dark-mode primary text |
| text-dark-muted | #9DA4B4 | Dark-mode secondary text |
| accent | #7C5CFF | Saturated single accent (violet shown) |
| accent-muted | #5B3FD6 | Active state |
| signal-success | #16A34A | Positive numeric signal |
| signal-warn | #F59E0B | Caution signal |
| signal-error | #DC2626 | Error signal |
| line | #2A2F3C | Dark-mode line, panel separators |

Rationale:
- Dark mode is first-class; the palette is built dark-mode primary with light-mode adaptations.
- Single saturated accent (violet, electric blue, lime, or cyan) lets the rest of the palette stay neutral.
- Signal colors are functional, not decorative; reserved for status communication in dashboards and logs.
- Lines visible (#2A2F3C in dark, #E5E7EB in light) to reinforce the grid character.

## Type pairing starter

- **Display**: Geist Sans (Vercel, free) or Inter Display. 600 to 700 weight.
- **Body**: Geist Sans or Inter. 400 to 500.
- **Monospace**: Geist Mono or JetBrains Mono. Prominent in display, numerics, code samples, KPIs, badges, and labels.

Size scale (modular, 1.25 ratio anchored at 15px for higher density):
- Hero: 48 to 64px sans
- Hero-mono: 36 to 48px mono (for technical brands using mono in display)
- H2: 28 to 36px sans
- Body: 15 to 16px sans
- Small: 13px sans
- Code: 14 to 15px mono

Pairing rationale: Geist (and its mono variant) was designed specifically for technical product interfaces. Inter plus JetBrains Mono is the equivalent if Geist is not available. The mono should appear regularly enough that the reader registers the brand uses it deliberately.

## Layout and composition

- Higher density than Editorial Restrained. The reader expects information.
- Grids are visible: hairline borders on cards and tables, monospace coordinates in nav, table-of-contents sidebars.
- Code samples are treated as primary content, not supplementary.
- Hero often pairs a clean headline with a live-looking product surface (dashboard, terminal, code editor).
- Dark mode is the design target; light mode is the adaptation.

## Imagery direction

- Photography: rare. When used, abstract or product-context, not people.
- Illustration: technical diagrams, network graphs, architecture maps. Single accent color over neutral background.
- Product UI: shown as real screenshots or near-real chrome. The product surface itself is the brand asset.
- Decorative imagery: minimal. The information density is the visual.

## Voice samples

- "Latency p99: 47ms across 12 regions."
- "Idempotent by default. Versioned endpoints. Zero-downtime migrations."
- "Built for the request volume you actually have at 3am."
- "Error budgets, not vibes."
- "Your stack already speaks this protocol."
- "Run it locally. Deploy it globally. Same primitives."
- "Observability that does not require its own observability."

Cadence: short. Often fragments. Numerals over words. Technical specificity over abstraction. Comfortable with industry vocabulary.

## Component pattern descriptions

**Hero**: Often split layout: left side is headline plus sub plus 2 CTAs, right side is a live product surface (terminal, dashboard, code editor). Or full-bleed dark with an oversized mono headline.

**Buttons**: Primary is solid accent on dark, or solid ink on light. Secondary is bordered. Often a small mono prefix on labels ("$ deploy" pattern).

**Cards**: Hairline border, dark-elevated background, monospace metadata in the header row, sans body. Often with a small status dot (signal color) in the corner.

**Tables**: Dense. Hairline rows. Mono numerics, right-aligned. Hover state with a faint accent tint. Sortable columns marked.

**Code blocks**: First-class. Syntax highlighting palette is part of the brand. Copy button. Language label.

## When to pick this

- Developer audience
- Observability, platform, infrastructure, or DX product
- Audience values data density and precise specification
- Brand needs to communicate "we built this, we run it, we understand it"

## When to avoid

- Consumer audience that wants warmth
- Product that is not technically substantive (the archetype will read as costume)
- Brand needs to communicate approachability over rigor
- Photography or human imagery is central to the brand story

## Adaptation guidance

1. **Accent hue**: violet for product-first brands, electric blue for infrastructure, lime or cyan for AI-adjacent, soft green for sustainability-leaning.
2. **Mono density**: dial up for developer brands (mono in hero, mono in nav, mono in labels) and dial down for prosumer brands wanting only the precision signal.
3. **Dark mode**: required. Skip this archetype if the brand cannot ship a dark mode.
4. **Photography**: if the brand needs human imagery, blend with Editorial Restrained or Warm Conversational instead of forcing it into Technical Precise.
5. **Voice density**: stay specific. Vague claims in this archetype read as worse than vague claims elsewhere, because the visual is promising specificity.

## Exemplar brands

Technical Precise is exemplified by Stripe (especially the documentation and developer surfaces), Sentry, Datadog, Vercel, Cursor, and Linear in its most technical surfaces. Adjacent older examples include the early Heroku CLI and the original GitHub UI before its consumer-tilted redesigns.

These brands share: dark-mode-first, monospace prominent, code as first-class content, saturated single accent, dense tables and grids, low-affect voice.

The archetype frequently blends with Editorial Restrained at the marketing surface level (Stripe's marketing pages, Vercel's announcements) while keeping the technical surface pure Technical Precise.

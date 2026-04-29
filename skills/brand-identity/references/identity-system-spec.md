# Identity System Spec

A spec template for documenting each element of the brand identity system. This is the working document during identity build, before the polished style guide. It locks decisions and exposes gaps.

Fill every section. The point of the spec is to surface what is undecided.

---

## System metadata

**Brand:** [Name]
**Version:** [v1.0, v1.1, etc.]
**Date:** [YYYY-MM-DD]
**Owner:** [Name]
**Status:** [Draft / In review / Approved]

---

## 1. Logo system

### Primary logo

- **Form:** [Wordmark / lettermark / combination mark / pictorial / abstract]
- **Construction notes:** [Geometry, custom letterforms, optical adjustments]
- **Source files:** [SVG, AI, layered]
- **Color versions:** [Full color, single color, reversed (white on dark)]
- **Minimum size:** [Pixels for digital, inches/mm for print]
- **Clear space:** [Minimum margin around logo, defined as multiple of a logo element, e.g., "1x cap height"]

### Logo variants

| Variant | When to use | Source file |
|---|---|---|
| Horizontal | Default | |
| Stacked | Constrained widths, social avatars | |
| Mark only | Favicons, app icons, watermarks | |
| Wordmark only | Inline text contexts | |

### Misuse rules

What never to do with the logo. Ten short rules at most.

- Do not stretch
- Do not rotate
- Do not recolor outside the approved palette
- Do not place on busy photography without a scrim
- (etc.)

### Application examples

Where the logo lives. Document the canonical placements.

- Web header: [Position, size, color treatment]
- Email signature: [Position, size]
- Favicon: [Variant used, sizes generated]
- App icon: [Variant, background, padding]
- Print: [Letterhead, business card]
- Social: [Avatar variant, banner specs]

---

## 2. Color

### Primary palette

| Token name | Hex | RGB | HSL | Usage |
|---|---|---|---|---|
| `color-brand-primary` | | | | Primary brand color, dominant in identity |
| `color-brand-secondary` | | | | Secondary brand color |
| `color-brand-tertiary` | | | | Optional accent |

### Neutrals

| Token name | Hex | Usage |
|---|---|---|
| `color-neutral-0` | #FFFFFF | Background, max contrast |
| `color-neutral-50` | | |
| `color-neutral-100` | | |
| `color-neutral-200` | | |
| ... | | |
| `color-neutral-900` | | |
| `color-neutral-1000` | #000000 | |

### Semantic tokens

| Token name | Resolves to | Usage |
|---|---|---|
| `color-text-primary` | | Body text |
| `color-text-secondary` | | Captions, less important text |
| `color-text-disabled` | | Disabled state |
| `color-text-inverse` | | Text on dark backgrounds |
| `color-bg-primary` | | Default background |
| `color-bg-elevated` | | Cards, modals |
| `color-border-default` | | Card borders, dividers |
| `color-success` | | |
| `color-warning` | | |
| `color-error` | | |
| `color-info` | | |

### Color rules

- Never invent a new color. If a use case is not covered, propose a new token.
- Brand color contrast against approved backgrounds must meet WCAG AA for text. See `contrast-and-accessibility.md`.
- Dark mode tokens defined separately or via theme switch logic.

---

## 3. Typography

### Type families

| Role | Family | Weights used | License |
|---|---|---|---|
| Display | | | |
| Body | | | |
| Mono (code, data) | | | |

### Type scale

| Token | Size | Line height | Weight | Use case |
|---|---|---|---|---|
| `text-display-1` | | | | Hero headline |
| `text-display-2` | | | | Section headline |
| `text-h1` | | | | Page title |
| `text-h2` | | | | Section title |
| `text-h3` | | | | Sub-section |
| `text-body-lg` | | | | Lead paragraph |
| `text-body` | | | | Default body |
| `text-body-sm` | | | | Caption, supporting text |
| `text-label` | | | | UI labels |
| `text-overline` | | | | Eyebrow text |

### Typography rules

- Display weights only at display sizes. Do not use display weights for body.
- Body line height target 1.5 to 1.65 for readability.
- Line length target 50 to 75 characters per line.
- Avoid mixing more than two type families on a single page.

---

## 4. Iconography

- **Style:** [Outline / filled / mixed / two-tone]
- **Stroke weight:** [Specific px or em value]
- **Corner radius:** [Specific px]
- **Grid:** [24x24 default, with optional 16, 32, 48 sizes]
- **Source:** [Custom set / Lucide / Heroicons / Phosphor / Material]
- **Naming convention:** [`icon-[noun]-[modifier]`]
- **License:** [If using a third-party set]

### Icon rules

- Icons paired with labels by default. Icon-only buttons require an accessible label.
- Decorative icons get `aria-hidden="true"`.
- Functional icons inherit text color via `currentColor`.

---

## 5. Imagery

### Photography

- **Style:** [Editorial / lifestyle / product / documentary / abstract]
- **Color treatment:** [Natural / treated / desaturated / signature filter]
- **Composition:** [Tight / wide / asymmetrical / symmetrical / negative space]
- **Subject direction:** [Demographics, environments, energy]

### Illustration

- **Style:** [If applicable - flat / textured / line / mixed]
- **Color usage:** [Limited palette / full palette]
- **Pattern library:** [Where it lives]

### Stock and AI policy

- **Stock photography:** [Allowed / banned / case-by-case with approval]
- **AI-generated imagery:** [Allowed / banned / case-by-case]
- **Sources approved:** [Specific platforms or studios]

---

## 6. Motion

- **Default duration:** [ms - typically 200-300]
- **Default easing:** [Standard easing curve, e.g., `cubic-bezier(0.4, 0, 0.2, 1)`]
- **Token naming:** [`motion-duration-fast`, `motion-easing-standard`]
- **Reduced motion:** [What animates becomes static when `prefers-reduced-motion: reduce`]

---

## 7. Voice (cross-reference)

Voice has its own deliverable. See the brand voice document. The identity spec only notes voice attributes that interact with visual identity (e.g., if voice is "quiet," typography should not be loud).

---

## Open questions

- [ ] [Token naming convention finalized?]
- [ ] [Dark mode strategy defined?]
- [ ] [Brand color WCAG contrast verified across approved backgrounds?]
- [ ] [Icon set licensed for production?]
- [ ] [Photography source defined?]

---

## Sign-off

- Design lead: [Name, date]
- Creative director: [Name, date]
- Engineering lead (for token implementability): [Name, date]

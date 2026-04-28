---
name: brand-identity
description: "Design or evaluate a brand visual identity system covering logo, color, typography, imagery direction, iconography, and motion principles. Use this skill whenever the user wants to design a logo, build a visual identity, define brand colors, choose brand typography, develop iconography, plan brand imagery, or evaluate an existing identity for cohesion. Triggers on logo design, brand identity, visual identity, brand mark, wordmark, monogram, color palette, brand colors, brand typography, type system, iconography, brand imagery, motion design, brand system, identity system. Also triggers when the user has a brand direction approved and now needs the visual artifacts that express it."
---

# Brand Identity

Design or evaluate the visual artifacts that express a brand: logo system, color, typography, imagery, iconography, and motion. Stack-agnostic. Tool-agnostic.

This skill assumes a brand direction is already approved (positioning, mood, name). If not, run `brand-ideation` first.

---

## When to use

- Designing a logo system
- Defining a brand color palette
- Choosing brand typography
- Developing iconography or illustration style
- Defining imagery direction (photography, illustration)
- Establishing motion principles
- Auditing an existing identity for cohesion or gaps

## When NOT to use

- Brand direction is not yet defined (use `brand-ideation`)
- Documenting a finished system (use `brand-style-guide`)
- Defining voice and tone (use `brand-voice`)
- Building UI components from an existing brand (use `design-standards` or `design-system`)

---

## Required inputs

- The brand name and approved positioning
- The mood direction (from ideation, or supplied as references)
- Audience and category context
- Application contexts (web, print, packaging, motion - whatever applies)
- Constraints (parent brand requirements, regulatory marks, accessibility minimums)

---

## The framework: 5 elements

A complete identity has five elements. Each element should reinforce the others. Inconsistency between them is the most common identity failure.

### 1. Logo system

Most brands need not one logo but a system of marks for different contexts.

**Components of a logo system:**

- **Primary mark.** The main logo. Used wherever there is room.
- **Wordmark.** Just the typography, no symbol. Used in tight horizontal contexts.
- **Symbol or glyph.** Just the symbol, no type. Used in app icons, favicons, social avatars.
- **Lockup variations.** Horizontal, stacked, square - whichever apply.
- **Monogram.** The initial(s) styled as a mark. Optional but useful for small contexts.

**Design principles:**

- **Legible at 16 pixels.** Test the logo at favicon size. If it falls apart, redesign.
- **Reproducible in single-color.** If the logo only works in full color, it cannot be screen-printed, embroidered, or rendered in browser favicons.
- **Distinctive silhouette.** Squint at it. Can you still tell what it is? If it looks like every other logo in the category at silhouette, redesign.
- **Construction grid.** Every curve and angle is intentional. Document the construction.

**Common failure:**
- Designing only the primary mark and discovering at launch that the wordmark, glyph, and small-size variants do not exist.

### 2. Color system

A color system is more than a palette. It is the rules for how color carries meaning.

**Components:**

- **Primary color.** The signature color most associated with the brand.
- **Secondary colors.** 1 to 3 supporting colors that extend the palette.
- **Neutrals.** The grays and tints that make up most of the surface area.
- **Semantic colors.** Success, warning, error, info - if the brand operates in product UI.
- **Accent colors.** Used sparingly for highlight and emphasis.

**Per color, document:**
- Hex, RGB, HSL, CMYK (if print is in scope), and Pantone (if brand-critical print exists)
- WCAG AA contrast against the other colors in the system
- Allowed and disallowed pairings (some brand colors look terrible together)
- Usage notes (when to use, when not to use)

**Design principles:**

- **Test for accessibility.** WCAG AA requires 4.5:1 contrast for normal text, 3:1 for large text. If the brand color cannot pass either against white, you have a problem.
- **Test for color blindness.** Around 8 percent of men have some form of color blindness. Critical UI signals should not rely on color alone.
- **Define neutrals carefully.** Neutrals are 80 percent of the surface area in most brand applications. They carry more weight than the brand color.
- **Limit the palette.** A 30-color palette is unmanageable. 5 to 8 carefully chosen colors beats a sprawling system.

### 3. Typography

Type is the second-most-recognizable element of a brand after the logo.

**Components of a type system:**

- **Display typeface.** For headlines and brand moments.
- **Body typeface.** For long-form reading. Often the same as display, sometimes different.
- **Monospace typeface** (if applicable for technical brands).
- **Type scale.** The set of sizes used across applications. Typically 5 to 8 steps.
- **Type weights and styles.** Which weights and italics are part of the system.

**Design principles:**

- **Pairing.** If using two typefaces, they must work together at body and display sizes. Common pattern: serif display + sans body, or geometric sans display + humanist sans body.
- **Web licensing.** Confirm web licensing covers expected pageviews. Some popular typefaces have prohibitive web licenses.
- **Variable fonts** are increasingly the right call for performance and flexibility.
- **Fallback stack.** Specify system fallbacks for when the brand font fails to load. The fallback should be visually similar.
- **Open-source alternatives.** Document open-source equivalents for situations where licensing is impractical (third-party tools, embedded contexts).

### 4. Imagery and illustration

Imagery direction is often underspecified, leading to brand drift over time.

**Photography direction:**

- **Subject matter.** What does the brand show?
- **Composition style.** Tight crops, wide environments, candid, posed?
- **Lighting.** Bright and natural, dramatic and directional, soft and diffused?
- **Color treatment.** True color, warm shifted, desaturated, high-contrast?
- **What to reject.** Stock photo aesthetics, specific cliches in the category.

**Illustration direction:**

- **Style.** Flat, dimensional, hand-drawn, geometric, abstract, representational?
- **Color use.** Full palette, restricted palette, brand colors only?
- **Line treatment.** Bold and outlined, soft and shaded, no outlines?
- **Subject matter.** What gets illustrated and what does not?

**Iconography:**

- **Style.** Filled or outline. Rounded or sharp. Single weight or variable.
- **Grid.** Pixel-perfect grid (often 24x24 or 16x16 base).
- **Stroke weight.** Consistent across the icon set.
- **Set.** Which icons exist, and how new icons get added consistently.

### 5. Motion

If the brand lives in any digital product, marketing video, or animated touchpoint, motion is part of the identity.

**Motion principles to define:**

- **Easing curves.** Default easings used across animations. Linear, ease-in-out, custom.
- **Duration scale.** Fast (100ms), medium (200-300ms), slow (500ms+) and when each applies.
- **Choreography.** How elements enter, exit, and respond to interaction.
- **Brand moments.** Signature animations (logo build, page transitions, loaders).

**Design principles:**

- **Restraint.** Most motion in product UI should be quick and subtle. Reserve dramatic motion for brand moments.
- **Reduced motion.** Always provide a `prefers-reduced-motion` alternative for users with vestibular sensitivities.
- **Performance.** Animations must be 60fps on the target devices. Profile before shipping.

---

## Workflow

1. **Confirm brand direction.** Positioning, mood, audience. If unclear, return to `brand-ideation`.
2. **Audit applications.** List every place the brand will appear (web, print, packaging, app, social, signage, video). The application contexts drive what the system needs to handle.
3. **Element-by-element design.** Start with logo and color, since these constrain typography. Then type. Then imagery, iconography, motion.
4. **Stress-test.** Apply the system to 3 to 5 mock applications (homepage, social post, business card, product UI, signage). Where does it break? Iterate.
5. **Document.** Each element with rules, examples, and dos/don'ts. This becomes the input to `brand-style-guide`.
6. **Get sign-off** before broad rollout. Identity changes after rollout are 10x the cost of changes during design.

---

## Failure patterns

- **Designing logos in isolation from application.** A logo that looks great on a hi-res mockup but illegible at favicon size is a design failure.
- **Picking a brand color without contrast testing.** A brand color that fails WCAG AA against white means UI built on the brand will be inaccessible by default.
- **Specifying typography without checking web licensing.** Discovering at deploy that the foundry charges per-pageview for the chosen typeface is a budget-buster.
- **Skipping imagery direction.** Without it, the brand becomes whatever stock photos the next person picks.
- **Treating motion as decoration.** Inconsistent motion erodes brand cohesion as fast as inconsistent color.
- **Designing only primary states.** What does the brand look like in error? In dark mode? In a localization where the wordmark needs to flip direction? These are not edge cases; they are the brand.

---

## Output format

Default output is a structured set of files:

- `identity/logo/` - All logo variants (SVG primary, plus PNG/JPG exports at common sizes)
- `identity/colors.md` - Color system with hex codes, contrast ratios, usage rules
- `identity/typography.md` - Type system with scale, weights, fallbacks
- `identity/imagery.md` - Imagery direction with reference examples
- `identity/iconography/` - Icon set or icon style spec
- `identity/motion.md` - Motion principles
- `identity/applications/` - 3 to 5 application mockups stress-testing the system

These feed directly into `brand-style-guide`.

---

## Reference files

- `references/identity-system-spec.md` - Detailed spec template for documenting each element.
- `references/contrast-and-accessibility.md` - Accessibility checks for color and type, with the math.

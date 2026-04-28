---
name: design-standards
description: "Apply production-grade design standards when building or reviewing pages, components, or UI. Use this skill whenever the user asks to build a page, design a component, lay out a section, review the UI, fix the layout, or check design quality. Triggers on build a page, create a component, design a section, hero, card, CTA, layout, review the UI, fix the design, design system, design tokens, spacing, typography scale, button standards, mobile design. Also triggers for any production design decision where contrast, accessibility, spacing, or visual hierarchy matters."
---

# Design Standards

Production design standards for any web project. Stack-agnostic. Tool-agnostic. Covers tokens, contrast, hierarchy, spacing, mobile rules, and the pre-ship checklist.

This skill complements `brand-identity` (which defines the visual system) and `brand-style-guide` (which documents it). This skill is for the day-to-day work of applying those standards in real components and pages.

---

## When to use

- Building a new page, section, or component
- Reviewing UI for quality, accessibility, or consistency
- Setting up design tokens for a new project
- Fixing layout, contrast, or hierarchy issues
- Establishing a button or form standard
- Pre-ship design review

## When NOT to use

- Defining a brand identity from scratch (use `brand-identity`)
- Documenting a finished brand system (use `brand-style-guide`)
- Building a formal component library (use `design-system`)
- Frontend code architecture (use `frontend-component-build`)
- Accessibility-only audits with WCAG remediation (use `accessibility-audit`)

---

## Required inputs

- The page or component being built or reviewed
- The brand's design tokens (colors, type, spacing) - or willingness to define them
- The target devices and viewports

If brand tokens are undefined, define a working set first using the template in `references/design-tokens-template.md`.

---

## The framework: 6 standards

Six standards apply to every piece of UI. Hold the line on these and most design problems disappear.

### 1. Design tokens

Every project needs tokens defined before any UI gets built. Tokens are the source of truth.

**Color tokens** (minimum):
- Primary brand color
- Primary hover (typically 15 to 25 percent darker)
- Background variants (surface, alt-section, hero/dark, footer)
- Text scale (heading, body, muted, on-dark)
- Semantic (success, warning, error, info)

**Spacing tokens:**
- A consistent scale (e.g., 4, 8, 12, 16, 24, 32, 48, 64, 96)
- Page max-width
- Section vertical padding (large, medium, small)
- Card padding
- Grid gaps

**Type tokens:**
- Display, H1 through H4, body large, body, small, caption
- Each with size, weight, line height, letter spacing
- Font fallback stacks

**Radius tokens:**
- Tight (cards, badges)
- Standard (buttons, inputs)
- Round (avatars, pill buttons)

Document the tokens once. Reference them everywhere. Hardcoded values are technical debt.

### 2. WCAG AA contrast (non-negotiable)

Contrast is not a preference. It is a baseline. A design that fails AA is broken, regardless of how it looks to designers with full vision.

| Element | Required ratio |
|---|---|
| Normal body text | 4.5:1 |
| Large text (18pt regular or 14pt bold) | 3:1 |
| UI components and graphical elements | 3:1 |

Common failures to avoid:
- Light gray body text on white that calculates to 2 to 4:1
- Brand color used for body text without a darker variant
- Light borders on form fields that compute under 3:1
- Bright orange or yellow on white at small sizes

For the math, the contrast checker, and brand-color strategies, see `brand-identity/references/contrast-and-accessibility.md`.

### 3. Visual hierarchy

A well-designed page has a clear scan order. Hierarchy comes from:

- **Size.** The largest element gets noticed first.
- **Weight.** Bold beats regular at the same size.
- **Color.** Saturated beats neutral. High-contrast beats low.
- **Spacing.** What sits alone gets emphasis. What gets crowded recedes.
- **Position.** Top-left and center get weight. Edges and corners recede.

Apply hierarchy intentionally. Every visual element should be reachable through the hierarchy. If three things compete for primary attention, none of them wins.

**Common failures:**
- Multiple elements styled as the "primary" CTA (creates ambiguity)
- Body text and headlines too close in size
- Hero image fighting the hero text for attention
- Icon, headline, and image at similar visual weight

### 4. Spacing and rhythm

Spacing is what separates a polished layout from a cluttered one.

**Rules:**
- Use the spacing scale, not arbitrary values
- Related elements sit closer together than unrelated ones (proximity principle)
- Section breathing room: minimum 64px desktop, 48px mobile
- Card padding: minimum 24px desktop, 16px mobile
- Form field spacing: minimum 16px between fields
- Touch targets: minimum 44 by 44 pixels

**Common failures:**
- Inconsistent spacing within similar contexts (one card has 24px padding, the next has 32px)
- Cramped sections that bleed into each other
- Touch targets under 44 pixels on mobile
- Headline butted directly against subheadline with no rhythm

### 5. Mobile rules

Most users are on mobile. Designing for desktop first guarantees mobile failures.

**Standards:**
- Test on a 375 to 390 pixel viewport before declaring complete
- All interactive elements minimum 44 by 44 pixels
- Sticky bottom bars: page wrapper needs bottom padding equal to bar height
- No fixed pixel widths without max-width constraint
- Text never smaller than 14 pixels for body content
- Tap targets get 8 pixels of spacing minimum on all sides
- Modal and popover content scrolls; body locks
- Form inputs: at least 16px text size to prevent iOS auto-zoom

**Common failures:**
- Designs that work in browser dev tools but break on real devices
- Sticky navigation eating 80px of viewport without compensation
- Horizontal scroll appearing because of one over-wide element
- Tap targets that are visually fine but impossibly close to other tap targets

### 6. Component consistency

The same thing should look the same everywhere. Variations should be intentional.

**Common consistency principles:**
- Buttons: one primary style, one secondary style, one ghost style. Not five.
- Cards: one base card pattern with variants. Not bespoke cards per page.
- Icons: one stroke weight, one corner style across the icon set
- Avatars and brand marks: one shape rule (rounded-lg or fully round, pick one and stick to it)
- Form inputs: one set of input states (default, focus, error, disabled) used everywhere

**Common failures:**
- Three different "primary buttons" used inconsistently across pages
- Some cards with rounded-2xl corners, others with rounded-xl
- Iconography style drifting between sections
- Brand avatar that switches between square and round depending on the page

---

## Workflow

1. **Confirm tokens.** If tokens are not yet defined, define a working set first. Document them.
2. **Sketch hierarchy.** Before writing markup, identify the primary action, secondary actions, and supporting content. Confirm the scan order makes sense.
3. **Build mobile-first.** Lay out for the smallest target viewport before scaling up.
4. **Apply tokens.** All values come from the token set. No hardcoded colors, sizes, or spacing.
5. **Run contrast checks.** Every text-on-background combination passes AA. Every UI element passes 3:1.
6. **Test at viewport breakpoints.** 375, 768, 1024, 1440 minimum. Confirm nothing breaks.
7. **Run the pre-ship checklist** in `references/preship-checklist.md`.

---

## Failure patterns

- **Designing without tokens.** Hardcoded colors and spacing. Hard to maintain. Inconsistent at scale.
- **Skipping contrast checks.** Especially on brand colors used for text. Most brand colors fail AA.
- **Designing only for desktop.** Mobile reveals every layout sin. Test mobile first or last, but always.
- **Rounded-everything.** Treating "modern" as "rounded all the things." Rounded corners are a tool, not a default.
- **Visual hierarchy mush.** Three things competing as primary. Reader does not know where to look.
- **Touch target violations.** Visually nice 32px buttons that fail finger ergonomics on real devices.
- **Component drift.** Each page rebuilds the card or button from scratch. Design system erodes.

---

## Output format

This skill produces design decisions and review notes more than artifacts. Outputs include:

- **Design tokens file** (when starting a project): `design-tokens.md` or equivalent
- **Component or page review**: markdown notes scored against the 6 standards, with specific fixes
- **Pre-ship checklist results**: pass/fail across the checklist with notes

When generating component code (HTML, CSS, framework-specific markup), the SKILL.md remains stack-agnostic. Stack-specific patterns live in reference files.

---

## Reference files

- `references/design-tokens-template.md` - Template for setting up tokens for any project.
- `references/preship-checklist.md` - Final design review checklist before shipping.
- `references/tailwind-patterns.md` - Optional. Tailwind-specific component patterns (hero, cards, buttons, data rows) for projects on that stack.

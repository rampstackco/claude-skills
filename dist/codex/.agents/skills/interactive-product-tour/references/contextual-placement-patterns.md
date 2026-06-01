# Contextual placement patterns

Tooltip, spotlight, sidebar, inline. Placement and visual design.

The placement decides whether help feels ambient or imposed. Done well, help is findable when wanted, ignorable when not. Done poorly, help blocks the user or disappears before they read it.

---

## The non-imposition principle

Help should be findable when wanted, ignorable when not. Help that demands the user's full attention is help that costs trust.

**The win.** A tooltip appears next to a feature, visible but not blocking. The user reads if interested, dismisses or ignores if not. The interaction is brief and respectful.

**The fail.** A modal overlay blocks the entire screen, demanding the user click to dismiss before continuing. The user loses momentum; resents the interruption.

The discipline. Match placement intensity to help importance. Most help should be lightweight.

---

## Pattern A: Tooltip on hover

Help appears next to the element on hover.

**How it works.**

- User hovers over the element.
- Tooltip appears next to it.
- Tooltip dismisses when hover ends.

**Strengths.**

- Lightweight.
- Familiar pattern.
- Non-intrusive.

**Weaknesses.**

- Mouse-only by default; keyboard users may miss.
- Limited content (cannot fit much in a tooltip).
- Dismisses too easily for content the user needs to read.

**When to use.** Brief hints, definitions, quick clarifications. Not for multi-step guidance.

---

## Pattern B: Spotlight overlay

Element highlighted; help appears alongside.

**How it works.**

- The relevant element is highlighted (often via dimmed surrounding area).
- A help card appears nearby explaining the element.
- User clicks "Got it" or similar to dismiss.

**Strengths.**

- More prominent; harder to miss.
- Can fit more content than tooltip.
- Good for feature-specific tours.

**Weaknesses.**

- More disruptive.
- Dimming the page can frustrate users who wanted to do something else.

**When to use.** Feature-specific tours, the kind of help that warrants the user's full attention briefly.

---

## Pattern C: Sidebar

Help appears in a side panel.

**How it works.**

- Help opens in a panel (often right side of screen).
- User can read while the main content remains accessible.
- Panel persists until dismissed.

**Strengths.**

- Persistent reference; user can refer back.
- Does not block main content.
- Can fit substantial content.

**Weaknesses.**

- Takes screen space.
- May not work on mobile.

**When to use.** When the help is reference material the user may want to consult while working. Multi-step guides where the user is doing the steps in the main content.

---

## Pattern D: Inline

Help appears in the page flow.

**How it works.**

- Help is embedded directly in the page content.
- Often appears as a banner, inline hint, or contextual section.
- User scrolls past or interacts with it.

**Strengths.**

- Non-disruptive.
- Always findable (does not appear and disappear).
- Works well on mobile.

**Weaknesses.**

- Can be missed entirely.
- Adds page length.

**When to use.** Empty states, contextual hints that should always be visible, supplementary information that some users want.

---

## Pattern E: Modal overlay

Help blocks the screen until dismissed.

**How it works.**

- A full-screen or large modal appears.
- User must dismiss to continue.

**Strengths.**

- Highest visibility.
- Forces attention on critical messages.

**Weaknesses.**

- Most disruptive.
- Easily abused; produces annoyance.
- Should be reserved for critical messages.

**When to use.** Compliance-critical messages, terms updates, data-loss warnings. Almost never for routine help.

---

## Placement choice by content type

What pattern fits what content.

**Brief hints (1 sentence):** tooltip on hover.

**Feature explanations (2-3 sentences plus example):** spotlight overlay.

**Multi-step guides (3-5 steps):** spotlight overlay sequence or sidebar.

**Reference material (multiple paragraphs):** sidebar.

**Empty states and contextual hints:** inline.

**Compliance / critical messages:** modal overlay.

The match between content and placement is part of the design discipline.

---

## Visual design discipline

How help looks.

**Visual weight.**

- Tooltips: light, almost invisible until needed.
- Spotlights: medium; visible but not aggressive.
- Modals: heavy; demand attention.

**Brand consistency.**

- Help styling matches the product's design system.
- Tone matches brand voice.
- Colors should not feel "this is a tour"; they should feel like part of the product.

**Iconography.**

- Help often uses small icons (info, lightbulb) to signal "this is help."
- Icons should be consistent across help surfaces.

---

## Animation discipline

How help appears and disappears.

**Subtle animation.** Fade in, slight slide. Reinforces transition without distracting.

**Aggressive animation.** Bounce, attention-grabbing motion. Useful sparingly; abused, becomes annoyance.

**No animation.** Instant appear/disappear. Snappy; some users prefer it.

**Prefers-reduced-motion.** Respect user system preferences. No bouncing for users who configured reduced motion.

---

## Mobile placement considerations

Mobile changes everything.

**Tooltips.** Hover does not exist on mobile; tooltips need touch alternative. Often replaced with tap-to-show.

**Spotlights.** Spotlight overlays need to fit mobile screens. Smaller content; fewer steps.

**Sidebars.** Often impossible on mobile; replaced with full-screen modals or omitted.

**Inline.** Works well on mobile. Usually the safest mobile-first pattern.

**Modal overlays.** Take over the screen on mobile; even more disruptive than on desktop.

The mobile discipline. Test help on actual devices. Mobile help should be lighter and more inline-oriented.

---

## Common placement failures

**Wrong pattern for content.** Modal for a brief hint; tooltip for a multi-step guide.

**Visual weight wrong.** Aggressive animation for routine help; invisible animation for critical messages.

**Mobile broken.** Tooltips that do not work on touch; sidebars that take over the mobile screen.

**Brand-inconsistent.** Help styled differently from the rest of the product; feels bolted on.

**Animation distracting.** Bouncing tooltips that draw the eye constantly.

**No reduced-motion respect.** Animations fire regardless of system preferences.

**Help blocks the action it is teaching.** Spotlight overlays the very element the user needs to click.

---

## Methodology-level choices that stay in the public skill

The non-imposition principle. Patterns A through E. Placement choice by content type. Visual design discipline. Animation discipline. Mobile considerations. Common failures.

## Implementation choices that stay internal

Specific placement designs for specific tours. Specific tooling. Specific brand styles. The team's mobile testing benchmarks. These vary by team and product.

---
name: frontend-component-build
description: "Build production-ready frontend components with accessible markup, sensible props, defined states, and tested behavior. Use this skill whenever the user wants to build a component from scratch, refactor an existing one, design a component API, or implement a UI element with proper states and accessibility. Triggers on build a component, create a button, create a modal, create a form input, component API, props design, component states, refactor component, accessible component. Also triggers when implementing UI from a design that needs to be reusable."
---

# Frontend Component Build

Build production-ready components. Stack-agnostic principles. Most patterns translate to React, Vue, Svelte, or vanilla web components.

This skill is about implementing a component well. For broader system design see `design-system`. For day-to-day visual decisions see `design-standards`.

---

## When to use

- Building a new component from scratch
- Refactoring an existing component
- Designing a component API (props, slots, events)
- Adding accessibility to an existing component
- Implementing a component from a design

## When NOT to use

- Building a full design system (use `design-system`)
- Page-level design decisions (use `design-standards`)
- Backend or data work (use `code-review-web`)
- Performance-only optimization (use `performance-optimization`)

---

## Required inputs

- The component's purpose (what UI need it serves)
- The design (or willingness to design it)
- The framework or technical context
- The states the component must support
- Accessibility requirements

---

## The framework: 6 dimensions

A complete component handles six dimensions. Skip any one and the component is incomplete.

### 1. Anatomy

Identify the parts that make up the component before writing any markup.

**Common anatomies:**
- Button: container + label + (optional) icon + (optional) loading indicator
- Modal: backdrop + container + header + body + footer + close affordance
- Form input: label + input + (optional) help text + (optional) error message
- Card: container + (optional) header + body + (optional) footer + (optional) media

Naming the parts up front makes the API obvious.

### 2. Variants

What variations does the component support?

- **Visual variants** (primary, secondary, ghost, danger)
- **Size variants** (small, medium, large)
- **Functional variants** (with icon, without icon, icon-only)

Variants should be a managed set, not a free-for-all. Document the supported set; reject requests for new variants without a real use case.

### 3. States

What states must the component handle?

- **Default**
- **Hover** (when pointer is supported)
- **Focus** (always - keyboard navigation requires it)
- **Active / pressed**
- **Disabled**
- **Loading** (where applicable)
- **Error** (for inputs, forms, validation-bound components)
- **Empty** (for components that display data)

Every state needs visual treatment AND accessibility treatment.

### 4. Props / API

Design the component's contract.

**API design principles:**

- **Required props minimal.** What's truly needed every time? That's required. Everything else has a sensible default.
- **Boolean props are red flags.** Three booleans means seven combinations. Prefer enum strings: `variant: "primary" | "secondary" | "ghost"` over `primary={true} ghost={false}`.
- **Children > props.** Where content is content, accept children. Don't invent `headerText` and `bodyText` props when slots work.
- **Composition > configuration.** A component that does 5 things via 12 props often should be 5 smaller components.
- **Type the props.** TypeScript or PropTypes or JSDoc. The type is documentation that won't go out of date.

### 5. Accessibility

Build it accessible from the start. Adding accessibility later is 5x harder.

**Universal:**
- Semantic HTML elements (`<button>`, `<a>`, `<nav>`, `<form>`, etc.) over generic `<div>`
- Keyboard navigable (Tab, Shift+Tab, Enter/Space for buttons)
- Focus visible
- Tap targets minimum 44 by 44 pixels
- ARIA only where semantic HTML is insufficient

**Component-specific:**

- **Button:** use `<button>`. Don't fake one with a `<div>`.
- **Modal:** focus trap, ESC to close, returns focus to trigger on close, `role="dialog"` and `aria-labelledby`.
- **Form input:** label associated via `for`/`id` or `aria-labelledby`. Error messages linked via `aria-describedby`. `aria-invalid` when in error state.
- **Toggles:** `<button>` with `aria-pressed` for two-state, or `role="switch"` for on/off.
- **Tabs:** `role="tablist"` / `role="tab"` / `role="tabpanel"` with `aria-selected` and arrow-key navigation.
- **Tooltips and popovers:** triggered by focus AND hover. Dismissible with ESC.
- **Loading states:** announce with `aria-live` so screen readers know something changed.

### 6. Tests

Verify the component works before declaring it done.

**Test types by priority:**

1. **Visual regression.** Renders correctly across variants and states. (Storybook + visual diff tools, or manual screenshots.)
2. **Accessibility.** Passes axe or equivalent automated checks.
3. **Keyboard navigation.** Tab, Enter, Escape, arrow keys all work as expected.
4. **Component logic.** Props produce expected output. Events fire correctly. (Unit tests.)
5. **Integration.** Component works inside its expected parent contexts.

A component without at least automated accessibility testing is not done.

---

## Workflow

1. **Understand the use case.** What UI need does this component serve? Where will it appear? Adjacent components?
2. **Sketch the anatomy.** Name the parts.
3. **List variants and states.** Match the design system or define new ones if needed.
4. **Design the API.** Required props, optional props, children, events. Type it.
5. **Build the markup with semantic HTML.** Choose the right elements. Avoid generic `<div>` for interactive things.
6. **Style with tokens.** No hardcoded colors, spacing, or sizes.
7. **Add interaction.** Focus management, keyboard handlers, ARIA.
8. **Add states.** Hover, focus, active, disabled, loading, error.
9. **Test.** Automated accessibility, keyboard navigation, visual regression.
10. **Document.** Usage, API, examples, anti-patterns.

---

## Failure patterns

- **Building with `<div onClick>`.** Loses keyboard accessibility, screen reader semantics, and focus. Use `<button>` or `<a>`.
- **Hardcoding colors and sizes.** Tokens exist for a reason. Hardcoded values resist theming and consistency.
- **Boolean prop explosion.** `<Button primary large rounded fullWidth disabled icon />`. Too many booleans means you actually need fewer variants designed more thoughtfully.
- **Forgetting focus states.** Hover gets attention; focus gets neglected. Keyboard users see invisible buttons.
- **Skipping disabled-state thought.** A disabled button should look obviously disabled AND be `aria-disabled` AND not respond to clicks.
- **Inventing ARIA.** ARIA roles and properties have specific behaviors. Made-up ARIA is worse than no ARIA. Use semantic HTML first.
- **Loading state that doesn't announce.** Screen readers don't know the spinner appeared. Use `aria-live="polite"` or `role="status"`.
- **Tooltip-only critical content.** Hover-only content is invisible to keyboard and touch users. Critical content goes in the visible UI.
- **Component without docs.** Future-you, your teammate, or the next maintainer cannot use what they cannot understand.

---

## Output format

A complete component delivery includes:

- **Component code** (in the appropriate framework)
- **Storybook (or equivalent) entry** showing all variants and states
- **Documentation:**
  - Anatomy diagram or description
  - Props/API table
  - Usage examples (basic, advanced, edge cases)
  - When to use vs. when to use an alternative
  - Anti-patterns (what to avoid)
  - Accessibility notes
- **Tests** (visual regression + accessibility + logic)

---

## Reference files

- `references/component-spec-template.md` - Template for documenting a component (props, states, accessibility, edge cases) before building.
- `references/component-api-patterns.md` - Common patterns for designing flexible component APIs (compound components, controlled vs uncontrolled, polymorphic `as` prop, render props, slots).
- `references/accessibility-patterns.md` - ARIA patterns for common interactive components.

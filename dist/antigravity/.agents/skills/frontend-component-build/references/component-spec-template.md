# Component Spec Template

Fillable template for documenting a component before writing code. The cost of writing a spec is small. The cost of building, shipping, and rebuilding a component because the API was wrong is large.

Fill every section. If a section is "N/A", say why.

---

## Identity

**Component name:** [PascalCase. e.g., `Button`, `DatePicker`, `DropdownMenu`]
**Layer:** [Primitive / Pattern / Template]
**Status:** [Proposal / Draft / In review / Production]
**Owner:** [Name]
**Related components:** [Sibling components, parent components, components this composes or replaces]

---

## Purpose

One paragraph. What this component does, who uses it, and why it exists at all.

If you cannot articulate why this is a system component (vs a one-off in product code), it should not be in the system yet.

> [Purpose statement]

---

## Use cases

List the real, concrete use cases this component must serve. If the list is empty or hypothetical, the component is premature.

1. [Specific scenario, e.g., "Submit a form on the checkout page"]
2. [Specific scenario]
3. [Specific scenario]

### Anti-use cases

When NOT to use this component. Helps consumers pick the right primitive.

- [Scenario, e.g., "Triggering navigation - use `Link` instead"]
- [Scenario]

---

## API

### Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | No | Visual treatment |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | |
| `disabled` | `boolean` | `false` | No | |
| `loading` | `boolean` | `false` | No | Shows spinner; auto-disables interaction |
| `leadingIcon` | `ReactNode` | - | No | |
| `trailingIcon` | `ReactNode` | - | No | |
| `as` | `ElementType` | `'button'` | No | Polymorphic root element |
| `onClick` | `(e: MouseEvent) => void` | - | No | |
| `children` | `ReactNode` | - | Yes | Visible label |
| (etc.) | | | | |

### Slots / composition

If this is a compound component, describe each sub-component and its role.

| Slot / sub-component | Purpose | Required |
|---|---|---|
| `Card.Header` | Title and optional icon | No |
| `Card.Body` | Main content | Yes |
| `Card.Footer` | Actions | No |

### Events

| Event | Payload | When fires |
|---|---|---|
| `onChange` | `{ value: string }` | User changes value, on blur or on each keystroke depending on `mode` prop |

### Refs / imperative handles

If the component exposes imperative methods, list them.

| Method | Signature | Purpose |
|---|---|---|
| `focus` | `() => void` | Move focus to the component's primary interactive element |

---

## States

List every state the component can be in. Each state needs a visual treatment.

| State | Visual | Trigger |
|---|---|---|
| Default | | Initial render |
| Hover | | Pointer over (non-touch) |
| Focus | | Keyboard focus |
| Active / pressed | | Mouse down or `Enter`/`Space` |
| Disabled | | `disabled` prop true |
| Loading | | `loading` prop true |
| Error | | Error context (validation failure, API error) |
| Empty / no data | | (For data-bearing components) |
| Read-only | | (For form inputs) |

### State combinations

Some states combine. Document the priority rules.

- Loading + disabled: spinner shows, looks disabled.
- Error + focus: focus ring shows in error color.
- (etc.)

---

## Accessibility

This section is non-negotiable. Every interactive component has an accessibility section. If the component is decorative, say so explicitly.

### Role and semantics

- **Native element:** [What HTML element is the root, e.g., `<button>`, `<input type="text">`]
- **ARIA role (if not native):** [e.g., `role="dialog"`]
- **Label requirement:** [How is the accessible name set? `aria-label`, visible label, etc.]

### Keyboard interaction

| Key | Action |
|---|---|
| `Tab` | |
| `Shift + Tab` | |
| `Enter` | |
| `Space` | |
| `Escape` | |
| `Arrow keys` | |
| `Home / End` | |

### Screen reader behavior

- What is announced on focus?
- What is announced on state change (loading, error)?
- Are there `aria-live` regions for status updates?

### Focus management

- Where does focus go on mount? On unmount?
- Is focus trapped (e.g., modals)?
- Is focus visible (focus ring)?

### Color contrast

Confirm WCAG AA at minimum (3:1 for non-text, 4.5:1 for body text, 3:1 for large text). Note any state where contrast is at risk (disabled state often fails AA on purpose; document the choice).

### Touch target size

- Minimum 44x44px on mobile (WCAG 2.5.5).
- Document if smaller and why.

---

## Edge cases

The cases that always come up after launch. Document them now.

- [ ] **Empty content:** What if `children` is empty?
- [ ] **Very long content:** What if the label is 200 characters? Truncate, wrap, or expand?
- [ ] **No data:** For data-bearing components, what does the empty state look like?
- [ ] **Loading:** What does the loading state look like? Skeleton? Spinner? Disabled?
- [ ] **Error:** Inline error? Toast? Both?
- [ ] **Disabled with tooltip:** A disabled `<button>` cannot receive focus, so a tooltip explaining why it is disabled needs special handling.
- [ ] **Right-to-left:** Does the layout flip correctly?
- [ ] **High zoom (200%):** Does the layout hold?
- [ ] **Dark mode:** Are tokens used so dark mode works automatically?
- [ ] **Reduced motion:** Are animations disabled when `prefers-reduced-motion: reduce`?

---

## Variants and customization

### Built-in variants

What variants ship out of the box (`size`, `variant`, etc.). Document each.

### Customization API

How can consumers customize without forking? `className` pass-through? Style props? Slots? CSS custom properties?

### What is NOT customizable

Be explicit about what consumers cannot override. This is the system's stance, not a bug.

---

## Internationalization

- [ ] Text is via prop or children (not hardcoded)
- [ ] Plural and count formatting uses `Intl.PluralRules`
- [ ] Date / time formatting uses `Intl.DateTimeFormat`
- [ ] Layout works in RTL (logical properties: `margin-inline-start`, `padding-inline-end`)
- [ ] Bidirectional text (mixed LTR / RTL strings) handled

---

## Performance

- **Bundle weight target:** [KB compressed]
- **Render cost:** [Should be cheap. If expensive, document why.]
- **Re-render risk:** [Memoize? Stable callbacks expected from consumers?]
- **Lazy-loadable:** [Yes / no]

---

## Testing

### Unit tests

- [ ] Renders default state
- [ ] Renders all variants
- [ ] Fires events on interaction
- [ ] Respects disabled / loading state
- [ ] Forwards refs

### Accessibility tests

- [ ] Axe passes on default state
- [ ] Axe passes on each variant
- [ ] Keyboard navigation tested
- [ ] Screen reader pass (manual or automated)

### Visual regression tests

- [ ] Each variant snapshot
- [ ] Each state snapshot
- [ ] RTL snapshot
- [ ] Dark mode snapshot

---

## Open questions

- [ ] [Question]
- [ ] [Question]

---

## Sign-off

- Design approved: [Name, date]
- Engineering approved: [Name, date]
- Accessibility reviewed: [Name, date]
- Ready for production: [Date]

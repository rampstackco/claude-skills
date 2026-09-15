# ARIA patterns reference

Decision-grade ARIA patterns for the audit. Covers when to use ARIA, when to skip it, and the common patterns that recur across web products.

ARIA is powerful and easy to misuse. The most common mistake is reaching for ARIA when semantic HTML would have done the job already. The second most common mistake is applying ARIA without the supporting JavaScript that makes the attribute true (e.g., `aria-expanded="false"` on a button that does not actually toggle anything).

This file expands the audit checks in [SKILL.md](../SKILL.md) with the specific patterns auditors should verify and the anti-patterns to flag.

---

## The semantic-HTML-first principle

Before reaching for ARIA, check whether semantic HTML already does what is needed.

**The principle.** ARIA exists to fill gaps in HTML. When semantic HTML provides the same semantics natively, the semantic element is the right answer. Adding ARIA on top of semantic HTML is usually redundant and sometimes broken.

**Examples of redundant ARIA.**

- `<button role="button">` is redundant; the element is already a button.
- `<nav role="navigation">` is redundant; `<nav>` already has the role.
- `<a href="..." role="link">` is redundant; the element is already a link.
- `<input type="checkbox" role="checkbox">` is redundant.

**Examples of correct ARIA.**

- A `<div>` styled to behave like a button needs `role="button"`. A real `<button>` does not.
- A custom dropdown built on `<div>`s needs `role="combobox"` plus full keyboard handling. A `<select>` does not.
- A live status region needs `role="status"` or `aria-live`. A static element does not.

**The audit check.** For every ARIA attribute on a page, ask: would this element have the same semantics without ARIA? If yes, the ARIA is redundant; flag it.

**The first ARIA rule.** No ARIA is better than bad ARIA. Bad ARIA actively confuses assistive technology; missing ARIA at most leaves a feature inaccessible (which is bad, but recoverable). Bad ARIA misrepresents the UI to the user, which is worse.

---

## Interactive widget patterns

Patterns that recur across products.

### Accordion (expandable disclosure section)

**Required ARIA.**

- Trigger button: `aria-expanded="true"` or `aria-expanded="false"` reflecting state.
- Trigger button: `aria-controls="<id-of-panel>"` pointing to the controlled region.
- Panel: `id="<the-id>"` matching `aria-controls`.

**Required behavior.**

- Trigger is a `<button>` (not a `<div>` or `<a>`).
- Trigger toggles `aria-expanded` when activated.
- Click and keyboard (Enter, Space) both work.

**Audit checks.**

- `aria-expanded` reflects current state, not a stale value.
- `aria-controls` ID exists in the DOM.
- Multiple accordions on a page: focus stays on trigger after toggle (does not jump unexpectedly).

### Tabs

**Required ARIA.**

- Tab list: `role="tablist"`.
- Each tab: `role="tab"`, `aria-selected="true"` or `aria-selected="false"`, `aria-controls="<panel-id>"`.
- Each panel: `role="tabpanel"`, `id="<panel-id>"`, `aria-labelledby="<tab-id>"`.

**Required behavior.**

- Arrow keys move between tabs.
- Tab key moves into and out of the tablist (not between tabs).
- Selected tab has `tabindex="0"`; non-selected tabs have `tabindex="-1"` (roving tabindex).
- Activating a tab updates `aria-selected` and shows the corresponding panel.

**Audit checks.**

- All tabs reachable via arrow keys.
- Tab key escapes the tablist after one press.
- Only one tab has `aria-selected="true"` at a time.

### Modal / dialog

**Required ARIA.**

- Container: `role="dialog"` (or `role="alertdialog"` for confirmations).
- Container: `aria-modal="true"` when modal.
- Container: `aria-labelledby="<heading-id>"` pointing to the dialog's heading, or `aria-label="<purpose>"`.
- Optional: `aria-describedby="<description-id>"` pointing to descriptive content.

**Required behavior.**

- Focus moves into the modal when opened (typically to the first focusable element or the dialog itself).
- Focus is trapped within the modal while open (Tab cycles within; cannot escape).
- Escape closes the modal.
- Focus returns to the triggering element when the modal closes.
- Background content has `inert` attribute or `aria-hidden="true"` (and is not focusable).

**Audit checks.**

- Focus management on open and close (the most common modal failure).
- Tab does not escape into background content.
- Screen reader does not read background content while modal is open.

### Toggle button (button that holds state)

**Required ARIA.**

- `aria-pressed="true"` or `aria-pressed="false"` reflecting state.

**Examples.** Mute button, favorite button, bold/italic in a text editor.

**Audit checks.**

- `aria-pressed` reflects state, not a stale value.
- Toggling produces an audible state change (some screen readers announce the new pressed state).
- Use of toggle button is appropriate (the button is genuinely a toggle, not a momentary action).

### Disclosure widget (show/hide additional content)

**Required ARIA.**

- Trigger: `<button>` with `aria-expanded="true"` or `aria-expanded="false"`.
- Optional: `aria-controls="<region-id>"` if the controlled region is not adjacent.

**Examples.** "Show more" buttons, "Read more" expansions.

**Difference from accordion.** Accordions are typically grouped (multiple panels in a related set, often only one open at a time); disclosure widgets are standalone reveals. The ARIA is similar; the surrounding pattern differs.

### Navigation

**Required ARIA.**

- `<nav>` element (semantic; no `role="navigation"` needed).
- For multiple navs on a page: each `<nav>` should have `aria-label` or `aria-labelledby` to distinguish them ("Primary", "Footer", "Breadcrumb").
- Current page link: `aria-current="page"`.

**Audit checks.**

- Multiple navs are distinguishable to screen readers.
- The current page is identified.
- Skip link is present and works (typically "Skip to main content").

---

## Live region patterns

Regions that announce dynamically.

### aria-live

**Values.**

- `aria-live="polite"`: announces when the user is idle. Most common.
- `aria-live="assertive"`: announces immediately, interrupting the user. Use sparingly.
- `aria-live="off"`: do not announce. Default; rarely set explicitly.

**The polite-vs-assertive choice.**

- Polite for status updates that can wait (form save confirmation, content updates).
- Assertive for urgent messages (errors that block submission, session timeout warnings, security alerts).

**Anti-pattern.** Assertive on routine updates. The screen reader interrupts whatever the user was doing; trust degrades quickly.

### aria-atomic

`aria-atomic="true"` tells screen readers to announce the entire region when any part changes, not just the changed part.

**When to use.** When the announcement only makes sense in context (e.g., "5 of 10 items processed" should announce as a whole, not just "5").

**When not to use.** For long regions where atomic announcements would be repetitive.

### role="status"

Implicit `aria-live="polite"`. Use for non-urgent status messages.

**Examples.** "Item added to cart," "Form saved," "Loading complete."

### role="alert"

Implicit `aria-live="assertive"` and `aria-atomic="true"`. Use for urgent messages.

**Examples.** Form submission errors, session timeout warnings, security alerts.

**Audit checks.**

- Status and alert regions exist where needed (audit dynamic flows).
- They announce when content changes (test with screen reader).
- The region is not assertive when polite would do.
- The region is not used for static content (status/alert are for dynamic announcements).

---

## Hiding from screen reader patterns

When and how to hide content.

### aria-hidden

`aria-hidden="true"` removes the element and its children from the accessibility tree.

**When to use.**

- Decorative icons that have an adjacent text label (the icon is redundant; hide it).
- Background visual elements that have no semantic meaning.
- Modal closed state (when not using `inert`).

**When NOT to use.**

- On focusable elements. A focusable element with `aria-hidden="true"` produces a confusing experience: keyboard users can focus it, but screen readers will not announce it.
- On meaningful content. If the content is meaningful enough to render visually, it is meaningful enough to announce.
- On entire interactive widgets. The keyboard user can still tab into them; the screen reader cannot announce them.

**Audit check.** For every `aria-hidden="true"`, verify the element is not focusable and contains no focusable descendants. The combination is the most common ARIA bug.

### Visually-hidden CSS class

A CSS pattern that hides content visually but keeps it in the accessibility tree.

**Common implementation.**

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**When to use.**

- Skip links that should be invisible until focused.
- Form labels that the design hides but accessibility requires.
- Additional context for screen reader users (e.g., "Item 3 of 10 in shopping cart").

**Anti-pattern.** Using `display: none` or `visibility: hidden` for content that should remain in the accessibility tree. Both remove from the tree; visually-hidden does not.

---

## Description and labeling patterns

How to give elements accessible names and descriptions.

### aria-label

Provides an accessible name when no visible label exists.

**When to use.**

- Icon-only buttons (`<button aria-label="Close">`).
- Generic links that need context (`<a aria-label="Read more about pricing" href="...">Read more</a>`).
- Form inputs without visible labels (rare; usually a visible label is better).

**When not to use.**

- When a visible `<label>` exists. The visible label is the accessible name.
- For decorative content. Use `aria-hidden` instead.

### aria-labelledby

Points to one or more existing elements whose text becomes the accessible name.

**When to use.**

- When the visible label is in another element (e.g., a `<legend>` for a fieldset).
- When the accessible name comes from multiple elements (e.g., "Add to cart" combined with the product name).
- For dialogs labeled by their heading.

**Syntax.** `aria-labelledby="id1 id2"` (space-separated IDs; the names concatenate).

### aria-describedby

Points to one or more existing elements whose text becomes the accessible description (announced after the name and role).

**When to use.**

- Form fields with help text that should announce after the label.
- Buttons with secondary explanation.
- Errors associated with form inputs (`aria-describedby="error-id"`).

**Syntax.** Same as `aria-labelledby`.

**The labeling priority.** Browsers compute the accessible name in this priority order: `aria-labelledby` > `aria-label` > `<label>` > placeholder/title (last-resort and unreliable). The accessible description follows: `aria-describedby` > `title`.

---

## State indicator patterns

ARIA attributes for component state.

### aria-busy

`aria-busy="true"` tells assistive tech that the element is in a transitional state (e.g., loading).

**When to use.**

- Sections being updated dynamically.
- Long-running operations where partial content would be confusing.

**Audit check.** `aria-busy` is removed when the operation completes.

### aria-disabled

`aria-disabled="true"` indicates an element is disabled.

**When to use vs `disabled` attribute.**

- Native HTML `disabled` removes the element from the tab order and prevents interaction.
- `aria-disabled="true"` keeps the element focusable but indicates disabled state. Useful when you want users to focus and read why the element is disabled, but cannot activate it.

**Audit check.** When using `aria-disabled`, the element should still appear disabled visually and click handlers should be suppressed.

### aria-invalid

`aria-invalid="true"` indicates a form input has a validation error.

**When to use.**

- After validation finds an error.
- Combined with `aria-describedby` pointing to the error message.

**Audit check.** `aria-invalid` is set/cleared as validation state changes; not a stale attribute.

---

## Common ARIA anti-patterns

Patterns to flag in the audit.

### Overusing roles on semantic elements

**Pattern.** `<button role="button">`, `<nav role="navigation">`, `<a role="link">`.

**Why it fails.** Redundant; clutters markup; sometimes overrides correct semantics.

**Cure.** Remove the redundant role.

### ARIA without supporting behavior

**Pattern.** `aria-expanded="false"` on a button that has no JavaScript to toggle it.

**Why it fails.** The attribute lies; assistive tech reports state that does not match reality.

**Cure.** Either implement the behavior or remove the attribute.

### Focusable element with aria-hidden

**Pattern.** A `<button>` or `<a>` with `aria-hidden="true"`.

**Why it fails.** Keyboard users can focus it; screen readers ignore it. The user encounters a focused element with no announcement.

**Cure.** Either remove `aria-hidden` (if the element is meaningful) or remove from tab order with `tabindex="-1"` and disable interaction.

### Modal without focus management

**Pattern.** `role="dialog"` opens; focus stays on the triggering element behind the modal.

**Why it fails.** Screen reader users do not realize a modal opened. Keyboard users can tab into background content.

**Cure.** Move focus into the modal on open. Trap focus while open. Return focus to trigger on close.

### Live region without dynamic updates

**Pattern.** Static `<div role="status">Loading complete</div>` rendered in initial HTML.

**Why it fails.** Live regions only announce when their content changes after page load. Static content in a live region announces nothing.

**Cure.** Either remove the role (if the content is static) or update the content dynamically.

### Assertive live region for routine updates

**Pattern.** `role="alert"` on every form-save confirmation.

**Why it fails.** Each confirmation interrupts whatever the user was doing. Trust degrades quickly.

**Cure.** Use `role="status"` (polite) for non-urgent updates; reserve `role="alert"` for urgent messages.

### Form input without accessible name

**Pattern.** `<input type="text">` with placeholder but no label.

**Why it fails.** Screen reader announces "edit" or similar generic; user does not know what the input is for. Placeholder disappears when typing, removing context.

**Cure.** Add a visible `<label>` (preferred) or `aria-label`. Placeholder is not a label.

### Error message not associated with input

**Pattern.** Error text appears near a form input but no programmatic association.

**Why it fails.** Screen reader users do not hear the error when focused on the input.

**Cure.** Use `aria-describedby="error-id"` on the input, with the error message in an element with that ID. Optionally add `aria-invalid="true"`.

### Tab order broken by tabindex

**Pattern.** Positive `tabindex` values (`tabindex="1"`, `tabindex="2"`) used to control order.

**Why it fails.** Positive tabindex creates a separate tab order that often conflicts with DOM order; very brittle; almost always wrong.

**Cure.** Use `tabindex="0"` to add to natural order, `tabindex="-1"` to remove from natural order. Avoid positive values.

---

## ARIA in audit reports

What to flag in audit findings.

**Per finding, document:**

- The element (URL plus selector or screenshot).
- The current ARIA (or its absence).
- The behavior observed.
- The behavior expected.
- The fix.

**Severity calibration.**

- Modal without focus management: P0 (blocks assistive-tech users).
- Form input without accessible name: P0.
- Live region using assertive for routine updates: P1.
- Redundant `role="button"` on a `<button>`: P3 (cosmetic, but trims technical debt).

The severity tracks user impact, not specification adherence per se. A redundant role does not block users; a missing label does.

---

## ARIA testing approach

How auditors verify ARIA.

**Tooling.**

- Browser DevTools accessibility tree (Chrome, Firefox, Safari) shows what assistive tech sees.
- axe DevTools flags many ARIA misuses.
- Screen reader testing is the ultimate verification.

**Common verification steps.**

- Inspect the accessibility tree for each interactive component.
- Verify dynamic ARIA attributes change when state changes.
- Verify focus management on open/close patterns (modals, menus, popovers).
- Test with at least one screen reader to hear what users hear.

The accessibility tree (DevTools) often reveals issues invisible to automated scanners. Make it part of the audit.

---

## ARIA references

Beyond this file.

- W3C ARIA Authoring Practices Guide (APG): https://www.w3.org/WAI/ARIA/apg/. Patterns and examples.
- WAI-ARIA 1.2 specification: https://www.w3.org/TR/wai-aria-1.2/. Canonical reference.
- The W3C ARIA Roles, States, and Properties listing: https://www.w3.org/TR/wai-aria-1.2/#role_definitions. Searchable.

The APG is the most practical resource. Most patterns in this file are simplified summaries of APG patterns; for production implementation, consult the APG examples.

---

## Methodology-level choices that stay in the public skill

The semantic-HTML-first principle. Required ARIA and behavior for common interactive patterns (accordion, tabs, modal, toggle button, disclosure, navigation). Live region patterns (aria-live, aria-atomic, role="status", role="alert"). Hiding patterns (aria-hidden, visually-hidden CSS). Description and labeling patterns (aria-label, aria-labelledby, aria-describedby). State indicators (aria-busy, aria-disabled, aria-invalid). Common anti-patterns. ARIA in audit reports. ARIA testing approach. References.

## Implementation choices that stay internal

Specific component implementations in the team's framework. Specific JavaScript and class-name conventions for live regions, focus management, and ARIA toggling. Specific design-system patterns for dialogs, tabs, and accordions. The team's ARIA testing protocols and tooling configurations. These vary by team and stack.

# Accessibility Patterns

ARIA patterns for common interactive components. Each follows the WAI-ARIA Authoring Practices guidelines.

When in doubt, use semantic HTML. Reach for ARIA only when semantic HTML cannot express what's needed.

---

## Button

```html
<button type="button">
  Click me
</button>
```

That's it. Don't reinvent it.

**For buttons that toggle a state:**
```html
<button type="button" aria-pressed="false">
  Bookmark
</button>
```
Toggle `aria-pressed` between `"true"` and `"false"` on click.

**For buttons that disclose content:**
```html
<button type="button" aria-expanded="false" aria-controls="menu-1">
  Menu
</button>
<ul id="menu-1" hidden>...</ul>
```
Toggle `aria-expanded` and `hidden` together.

**Anti-patterns:**
- `<div onClick>` instead of `<button>`
- Buttons that look like buttons but use `<a href="#">`
- Missing `type="button"` (defaults to `type="submit"` inside forms, causing accidental submits)

---

## Link

```html
<a href="/destination">
  Link text
</a>
```

**For external links opening in new tab:**
```html
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  External site
</a>
```

**Anti-patterns:**
- `<a>` without `href` (breaks keyboard navigation; use `<button>` instead)
- `<a href="#">` for buttons (causes URL pollution and unexpected behavior)
- Generic link text ("click here," "read more")

---

## Form input with label

```html
<div>
  <label for="email">Email address</label>
  <input id="email" type="email" name="email" required />
  <p id="email-help">We'll never share your email.</p>
</div>
```

**With help text linked:**
```html
<input id="email" type="email" aria-describedby="email-help" />
<p id="email-help">We'll never share your email.</p>
```

**With error state:**
```html
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">Please enter a valid email.</p>
```

**Anti-patterns:**
- Placeholder as label (placeholder disappears on input, leaving field unlabeled)
- Label not associated (visual proximity isn't enough)
- Error indicated by color only (color-blind users miss it)

---

## Modal / dialog

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm action</h2>
  <p id="dialog-description">Are you sure you want to delete this?</p>
  <button type="button" data-close>Cancel</button>
  <button type="button" data-confirm>Delete</button>
</div>
```

**Behavior requirements:**
- Trap focus inside the modal while open
- Return focus to the trigger element on close
- Close on Escape key
- Close on backdrop click (optional, but expected)
- Background content should be inert (`inert` attribute or `aria-hidden`)
- Body scroll locked while modal is open

**Anti-patterns:**
- Modal without focus trap (Tab escapes to background page)
- Modal without `aria-modal` and `role="dialog"`
- Modal that doesn't return focus on close
- Background content remains tabbable

---

## Disclosure (accordion section)

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="section-1"
>
  Section title
</button>
<div id="section-1" hidden>
  Section content...
</div>
```

For full accordion (multiple disclosures, optionally limit one open at a time), repeat the pattern.

---

## Tabs

```html
<div role="tablist" aria-label="Settings sections">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="panel-1"
    id="tab-1"
    tabindex="0"
  >
    Profile
  </button>
  <button
    role="tab"
    aria-selected="false"
    aria-controls="panel-2"
    id="tab-2"
    tabindex="-1"
  >
    Notifications
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Profile content...
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  Notifications content...
</div>
```

**Behavior requirements:**
- Arrow keys navigate between tabs
- Active tab has `aria-selected="true"` and `tabindex="0"`
- Inactive tabs have `aria-selected="false"` and `tabindex="-1"`
- Selecting a tab shows the corresponding panel
- Home / End keys jump to first / last tab

---

## Toggle switch

```html
<button
  type="button"
  role="switch"
  aria-checked="false"
  id="darkmode-toggle"
>
  <span class="visually-hidden">Dark mode</span>
</button>
<label for="darkmode-toggle">Dark mode</label>
```

Toggle `aria-checked` between `"true"` and `"false"` on click.

**Alternatively, use a real checkbox styled as a switch:**
```html
<label>
  <input type="checkbox" role="switch" />
  Dark mode
</label>
```

---

## Combobox / autocomplete

```html
<label for="city">City</label>
<input
  id="city"
  type="text"
  role="combobox"
  aria-autocomplete="list"
  aria-controls="city-listbox"
  aria-expanded="false"
  autocomplete="off"
/>
<ul id="city-listbox" role="listbox" hidden>
  <li role="option" id="city-1" aria-selected="false">London</li>
  <li role="option" id="city-2" aria-selected="false">Lagos</li>
</ul>
```

**Behavior requirements:**
- Down arrow opens listbox
- Arrow keys navigate options
- Enter selects highlighted option
- Escape closes listbox
- `aria-activedescendant` on the input points to highlighted option
- Type-ahead filtering

This is one of the most complex patterns. Test thoroughly with screen readers.

---

## Menu / menubar

```html
<button
  type="button"
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="user-menu"
>
  Account
</button>
<ul role="menu" id="user-menu" hidden>
  <li role="menuitem" tabindex="-1"><a href="/profile">Profile</a></li>
  <li role="menuitem" tabindex="-1"><a href="/settings">Settings</a></li>
  <li role="menuitem" tabindex="-1"><a href="/logout">Sign out</a></li>
</ul>
```

**Behavior requirements:**
- Down arrow / up arrow navigate menu items
- Escape closes menu
- Click outside closes menu
- Focus returns to trigger on close

**Important:** `role="menu"` is for command-style menus (like a desktop application's File menu). For navigation, use `<nav>` with regular links instead.

---

## Loading and live regions

```html
<div role="status" aria-live="polite">
  Loading results...
</div>
```

Use `role="status"` (or `aria-live="polite"`) for non-urgent updates.
Use `role="alert"` (or `aria-live="assertive"`) for urgent errors.

**Anti-patterns:**
- Spinners with no announcement (screen readers don't know anything changed)
- Live regions that announce too aggressively (`aria-live="assertive"` for non-critical updates)

---

## Skip link

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
...
<main id="main-content">...</main>
```

CSS:
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
}
.skip-link:focus {
  top: 0;
}
```

The skip link should be the first focusable element on the page. Visible only when focused.

---

## Visually hidden but available to screen readers

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

Use for content that screen readers need but sighted users don't (e.g., the label of an icon-only button).

```html
<button type="button">
  <SearchIcon aria-hidden="true" />
  <span class="visually-hidden">Search</span>
</button>
```

**Anti-pattern:** `display: none` or `visibility: hidden` removes content from the accessibility tree too. Use `visually-hidden` for content meant for screen readers only.

---

## Generic notes

- **Test with a real screen reader.** VoiceOver (macOS, iOS) and NVDA (Windows) are free.
- **Test with keyboard alone.** Unplug the mouse. Can you accomplish the task?
- **Run automated tests.** axe DevTools, Lighthouse, WAVE catch the basics.
- **Don't fake elements that exist.** A `<div role="button">` is worse than a `<button>`.
- **Less ARIA is more.** Most components need little or no ARIA. Semantic HTML does the work.

For deep accessibility audits, use `accessibility-audit`.

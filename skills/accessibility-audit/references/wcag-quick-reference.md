# WCAG 2.1 AA Quick Reference

A condensed list of WCAG 2.1 AA success criteria with the practical audit check for each.

For the canonical specification, refer to W3C: https://www.w3.org/TR/WCAG21/

---

## Principle 1: Perceivable

### 1.1 Text alternatives

**1.1.1 Non-text content (A)**
- All meaningful images have descriptive `alt` text
- Decorative images have `alt=""` (empty alt)
- Complex images have long descriptions
- Form inputs have associated labels
- CAPTCHA has alternatives for users who cannot perceive it
- Audit check: scan for `<img>` without `alt`, run alt-text quality review

### 1.2 Time-based media

**1.2.1 Audio-only and video-only prerecorded (A)**
- Audio-only content has a transcript
- Video-only content (no audio) has a description or transcript

**1.2.2 Captions prerecorded (A)**
- Pre-recorded video content has captions

**1.2.3 Audio description or media alternative (A)**
- Pre-recorded video has audio description OR an alternative

**1.2.4 Captions live (AA)**
- Live video content has captions

**1.2.5 Audio description prerecorded (AA)**
- Pre-recorded video has audio description

### 1.3 Adaptable

**1.3.1 Info and relationships (A)**
- Structure conveyed through markup, not just visual styling
- Headings use `<h1>` through `<h6>`, not styled `<div>`
- Lists use `<ul>`, `<ol>`, `<li>`
- Tables use `<table>`, `<th>`, `<td>` correctly with `scope` attributes
- Form inputs have `<label>` associated via `for`/`id` or `aria-labelledby`

**1.3.2 Meaningful sequence (A)**
- Reading order makes sense without CSS
- Audit check: disable CSS, read the page top to bottom

**1.3.3 Sensory characteristics (A)**
- Instructions don't rely solely on shape, size, color, or position
- Audit check: avoid "click the green button" or "the button on the right"

**1.3.4 Orientation (AA)**
- Content does not restrict view to a single orientation (portrait or landscape)

**1.3.5 Identify input purpose (AA)**
- Form fields collecting user information use `autocomplete` attributes correctly

### 1.4 Distinguishable

**1.4.1 Use of color (A)**
- Color is not the only way information is conveyed
- Audit check: check error states, status indicators, chart elements

**1.4.2 Audio control (A)**
- Audio that plays automatically for more than 3 seconds has pause/stop control

**1.4.3 Contrast minimum (AA)**
- Normal text contrast ratio at least 4.5:1
- Large text (18pt regular or 14pt bold) at least 3:1
- Audit check: contrast checker on every text/background pair

**1.4.4 Resize text (AA)**
- Text can be resized to 200% without loss of content or functionality
- Audit check: zoom to 200% in the browser, verify usability

**1.4.5 Images of text (AA)**
- Use real text, not images of text, except for logos or where customization is essential

**1.4.10 Reflow (AA)**
- Content can be presented without horizontal scrolling at 320px viewport
- Audit check: resize to 320px, verify no horizontal scroll

**1.4.11 Non-text contrast (AA)**
- UI components and graphical objects at least 3:1 contrast ratio against adjacent colors
- Audit check: borders, icons, form field outlines, focus rings

**1.4.12 Text spacing (AA)**
- No loss of content or functionality when text spacing is increased to specific minimums
- Audit check: apply line-height: 1.5, letter-spacing: 0.12em, word-spacing: 0.16em, paragraph-spacing: 2x font size

**1.4.13 Content on hover or focus (AA)**
- Hover/focus tooltips can be dismissed, hovered, and persist until dismissed

---

## Principle 2: Operable

### 2.1 Keyboard accessible

**2.1.1 Keyboard (A)**
- All functionality available from keyboard
- Audit check: navigate the entire site without a mouse

**2.1.2 No keyboard trap (A)**
- Focus can always be moved away from any component using keyboard alone
- Audit check: open every modal, dropdown, widget; verify Tab can leave

**2.1.4 Character key shortcuts (A)**
- If single-character keyboard shortcuts exist, they can be turned off, remapped, or only active on focus

### 2.2 Enough time

**2.2.1 Timing adjustable (A)**
- Time limits can be turned off, adjusted, or extended (with exceptions for real-time and essential)

**2.2.2 Pause, stop, hide (A)**
- Auto-updating content can be paused or stopped (with exceptions for essential)

### 2.3 Seizures and physical reactions

**2.3.1 Three flashes or below threshold (A)**
- Nothing flashes more than 3 times per second

### 2.4 Navigable

**2.4.1 Bypass blocks (A)**
- Skip link present at the top of the page
- Or, use proper landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)

**2.4.2 Page titled (A)**
- Each page has a unique, descriptive `<title>`

**2.4.3 Focus order (A)**
- Focus order matches visual and logical reading order

**2.4.4 Link purpose in context (A)**
- Link purpose is clear from the link text alone, or from text + immediate surrounding context
- Avoid "click here," "read more," "learn more" without context

**2.4.5 Multiple ways (AA)**
- Multiple ways to find content (sitemap, search, navigation menu)

**2.4.6 Headings and labels (AA)**
- Headings and labels are descriptive

**2.4.7 Focus visible (AA)**
- Keyboard focus indicator is visible
- Audit check: Tab through the page; can you always see where focus is?

### 2.5 Input modalities

**2.5.1 Pointer gestures (A)**
- Multipoint or path-based gestures have single-point alternative

**2.5.2 Pointer cancellation (A)**
- Down-event does not trigger action; action triggers on up-event or has way to abort

**2.5.3 Label in name (A)**
- Accessible name (for screen readers) contains the visible label text

**2.5.4 Motion actuation (A)**
- Motion-triggered functionality has UI alternative and can be disabled

---

## Principle 3: Understandable

### 3.1 Readable

**3.1.1 Language of page (A)**
- Page language declared in HTML: `<html lang="en">`

**3.1.2 Language of parts (AA)**
- Inline foreign-language passages marked: `<span lang="fr">...</span>`

### 3.2 Predictable

**3.2.1 On focus (A)**
- Receiving focus does not change context (no auto-submit, no unexpected navigation)

**3.2.2 On input (A)**
- Changing a setting does not automatically change context unless user is warned

**3.2.3 Consistent navigation (AA)**
- Navigation appears in the same relative order across pages

**3.2.4 Consistent identification (AA)**
- Components with the same function are identified consistently

### 3.3 Input assistance

**3.3.1 Error identification (A)**
- Errors are identified and described in text (not just color or icon)

**3.3.2 Labels or instructions (A)**
- Labels or instructions provided for inputs requiring user input

**3.3.3 Error suggestion (AA)**
- When errors occur and suggestions are known, suggestions are provided

**3.3.4 Error prevention (legal, financial, data) (AA)**
- For pages causing legal commitments or financial transactions: submissions are reversible, checked for errors, OR confirmed before final submission

---

## Principle 4: Robust

### 4.1 Compatible

**4.1.1 Parsing (A) [removed in 2.2 but still in 2.1]**
- Markup is well-formed (no duplicate IDs, properly nested elements)

**4.1.2 Name, role, value (A)**
- For all UI components, name and role can be programmatically determined; states, properties, and values can be set
- Use semantic HTML, ARIA where needed

**4.1.3 Status messages (AA)**
- Status messages can be programmatically determined through role or properties so they can be announced by assistive technology
- Use `role="status"`, `role="alert"`, or `aria-live`

---

## Audit check summary

For each criterion, the audit needs to:

1. **Identify the requirement** (what does WCAG ask for?)
2. **Test against the site** (does the site meet it?)
3. **Document failures** (which pages, which elements, what's wrong)
4. **Specify the fix** (what specific change resolves it)
5. **Assign severity** (P0 critical, P1 important, P2 minor, P3 polish)
6. **Estimate effort** (small, medium, large)

A complete audit covers all 30+ AA criteria. Most sites fail 5 to 15 of them on first audit. Don't try to fix all at once. Sequence by severity and impact.

---

## What WCAG does NOT cover

WCAG is a floor, not a ceiling. Some accessibility considerations are outside its scope:

- **Cognitive accessibility nuances** (reading level, attention, memory) - some basics in 3.1, but limited
- **Audience-specific needs** (the cognitive support a user with dyslexia needs vs. a user with autism)
- **Mental models** (whether the navigation makes sense to your specific audience)

For these, supplement WCAG with usability testing including users with disabilities, and with specific design patterns aimed at cognitive accessibility.

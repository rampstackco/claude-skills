# Form Anatomy Checklist

A field-by-field, behavior-by-behavior checklist for auditing or designing a form. Walk through it for any form before shipping.

---

## Overall structure

- [ ] **Purpose is clear** from headline, subheadline, or surrounding context
- [ ] **Single column** layout (multi-column forms are slower to scan and complete)
- [ ] **Form is reasonably short** (cut fields you don't strictly need)
- [ ] **Required vs optional** is clear (mark one or the other based on which is shorter)
- [ ] **Logical grouping** of related fields with visible spacing
- [ ] **Submit button** is visible without scrolling on common viewports
- [ ] **Submit button text** is specific to the action ("Get the report" beats "Submit")

---

## Per-field checklist

For each field, verify:

### Label

- [ ] Has a visible label (or, for compact forms, a clearly associated visible cue)
- [ ] Label is **above** the input (preferred) or floats (acceptable for compact)
- [ ] Label is descriptive (not just the field name from the database)
- [ ] Label is associated with the input via `for=` and `id=` or a wrapping `<label>`

### Input type

- [ ] Uses semantic input type:
  - `email` for emails
  - `tel` for phone
  - `number` for numeric (when not formatted, like a count or amount)
  - `date` for dates
  - `url` for URLs
  - `text` for general
- [ ] Native input where possible (date, color, range) before custom widgets
- [ ] `inputmode` attribute set when it differs from type (e.g., `inputmode="decimal"` on a price)

### Autocomplete

- [ ] `autocomplete=` attribute set with the appropriate value
  - `name`, `given-name`, `family-name`
  - `email`
  - `tel`
  - `street-address`, `address-line1`, `postal-code`, `country`
  - `cc-name`, `cc-number`, `cc-exp`, `cc-csc`
  - `current-password`, `new-password`
- [ ] Doesn't disable autocomplete without good reason

### Validation

- [ ] Validates on blur, not on every keystroke
- [ ] Validates again on submit (in case fields were skipped)
- [ ] Error message is specific ("Email must include @" not "Invalid")
- [ ] Error message appears next to the field
- [ ] Error state is visually distinct (not just color; also icon or pattern)
- [ ] `aria-invalid="true"` on errored fields
- [ ] `aria-describedby` linking the field to its error message

### Server-side validation

- [ ] Server validates everything client validates (client validation is UX, server is correctness)
- [ ] Server validates fields the client can't (uniqueness, business rules, etc.)
- [ ] Server returns specific error messages
- [ ] Server is the source of truth for "save"

### Hint text

- [ ] If a field needs explanation, hint text is below the field (not in placeholder)
- [ ] Hint text uses `aria-describedby` to associate with the input
- [ ] Hint text doesn't contain critical info that would be missed if not read

### Required vs optional

- [ ] Marked clearly (consistently use either "required" markers or "optional" markers, not both)
- [ ] `required` attribute set on truly required fields
- [ ] Required fields announced to assistive tech (the `required` attribute does this)
- [ ] Field has a fallback if accidentally skipped (server validation catches it gracefully)

### Width

- [ ] Field width matches expected input length (don't make a postal code field as wide as a name field)
- [ ] Mobile field width is full-width minus reasonable margins

### Specific field types

**Password:**
- [ ] `autocomplete="current-password"` for login, `"new-password"` for signup
- [ ] Toggle to show password (not in lieu of, but in addition to, dots)
- [ ] Length and complexity hints visible before typing
- [ ] Allow long passphrases (no max length under 64+ chars)

**Email:**
- [ ] `type="email"` and `autocomplete="email"`
- [ ] Server validates format more strictly than the browser default
- [ ] Confirms for high-stakes use (with a second email field) or relies on confirmation email

**Phone:**
- [ ] `type="tel"` and `autocomplete="tel"`
- [ ] Liberal validation (accept various formats)
- [ ] Country code handling if international

**Date:**
- [ ] `type="date"` for native picker, or a well-tested custom picker
- [ ] Timezone handling thought through (server side)

**Address:**
- [ ] Multiple fields (line 1, line 2, city, region, postal code, country)
- [ ] `autocomplete` on each
- [ ] Validation by country (US ZIP differs from UK postcode)
- [ ] Optional autocomplete via address API for high-conversion forms

**File upload:**
- [ ] Accepted types declared with `accept=`
- [ ] Size limit communicated and enforced (client and server)
- [ ] Drag-and-drop and click-to-browse both work
- [ ] Selected file feedback (name, size, preview if image)
- [ ] Progress indicator for slow uploads
- [ ] Server scans uploads if user-generated content goes public

**Select / dropdown:**
- [ ] Native `<select>` for short lists (under ~15 options)
- [ ] Custom searchable component for long lists
- [ ] Default option that's not selectable (e.g., "Select a country")
- [ ] Sort by likelihood (popular options first), or alphabetical, not random

**Radio buttons:**
- [ ] Use for 2-7 mutually exclusive options
- [ ] All options visible (no scrolling)
- [ ] One option pre-selected only if a sensible default exists

**Checkboxes:**
- [ ] Use for boolean choices and multi-select
- [ ] Label is clickable (associated with checkbox)
- [ ] Marketing opt-ins are off by default (legal requirement in many regions)
- [ ] Terms-of-service is unchecked by default (active acceptance)

**Multi-step forms:**
- [ ] Progress indicator (3 of 5)
- [ ] State saved between steps (refresh-resilient)
- [ ] Back navigation doesn't lose data
- [ ] Validation per step
- [ ] Final review step before submit (high-stakes only)

---

## Spam defense

- [ ] Honeypot field (hidden, must remain empty)
- [ ] Time-based detection (reject very fast or very slow submissions)
- [ ] Rate limiting per IP / per session
- [ ] Modern CAPTCHA (Turnstile, hCaptcha invisible, reCAPTCHA v3) if needed
- [ ] Server-side spam content filtering for high-volume forms
- [ ] Logging of rejected submissions for tuning

---

## Accessibility

- [ ] Form is fully keyboard-navigable (Tab, Shift+Tab, Enter to submit)
- [ ] Tab order matches visual order
- [ ] Focus is visible (don't remove the focus outline)
- [ ] Form errors are announced to screen readers
- [ ] Color contrast meets WCAG (4.5:1 for text, 3:1 for UI)
- [ ] Errors aren't communicated only by color
- [ ] Form works at 200% zoom
- [ ] Touch targets at least 44px on mobile
- [ ] No time limits without warning and the option to extend

---

## Submission

- [ ] Submit button is disabled while submission is in flight (prevent double-submit)
- [ ] Loading state on the button or near the form
- [ ] Success state is clear (inline message, redirect to confirmation page, or both)
- [ ] Failure state is clear (specific reason, what to do, support contact)
- [ ] State preserved on submission failure (user doesn't lose data)
- [ ] Email confirmation sent for signups, purchases, RSVPs
- [ ] Internal notification (if applicable) is timely

---

## Privacy and compliance

- [ ] Privacy notice or link visible near the form
- [ ] Terms of service link if relevant
- [ ] Marketing consent (where required by jurisdiction) is explicit and unchecked by default
- [ ] Data sent over HTTPS only
- [ ] Sensitive fields (passwords, payment) not autofilled by URL params (don't appear in browser history)

---

## Performance

- [ ] Form loads quickly (lazy-load any heavy assets like CAPTCHAs until needed)
- [ ] Submit handler doesn't block the UI
- [ ] No unnecessary fetches on field interaction
- [ ] CAPTCHA loads asynchronously

---

## Monitoring

- [ ] Completion rate tracked
- [ ] Field-level drop-off tracked (where do people abandon?)
- [ ] Errors tracked (which fields cause the most errors?)
- [ ] Spam rate tracked (compare layers of defense over time)
- [ ] Submission failures tracked (server errors, integration failures)

---

## Pre-launch test

Before publishing a form publicly:

- [ ] Submit successfully with valid data
- [ ] Submit unsuccessfully with bad data (verify error UX)
- [ ] Submit with no data (verify required-field UX)
- [ ] Submit with the honeypot filled (verify silent rejection)
- [ ] Submit very fast (verify time-based rejection)
- [ ] Submit on mobile (verify mobile UX)
- [ ] Submit with keyboard only (verify accessibility)
- [ ] Submit with a screen reader (verify announcements)
- [ ] Submit with autocomplete enabled (verify it works)
- [ ] Verify data lands in the correct downstream system
- [ ] Verify confirmation email arrives (if applicable)
- [ ] Verify internal notification arrives (if applicable)
- [ ] Try to submit duplicate (verify deduplication if applicable)

---

## Post-launch review (after first week)

- [ ] Completion rate vs target
- [ ] Spam rate (tune defense if needed)
- [ ] Errors (most common errors? could be UX problems)
- [ ] Drop-off (which field loses people?)
- [ ] Downstream system happy? (CRM data clean, no broken integrations)
- [ ] Customer reports (anyone reporting a broken form?)

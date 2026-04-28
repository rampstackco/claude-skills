---
name: form-strategy
description: "Design forms that convert, validate well, resist spam, and integrate cleanly with downstream systems. Use this skill when designing or auditing any form (contact, signup, checkout, multi-step, embedded), planning validation logic, fighting spam, choosing form tooling, or improving form conversion. Triggers on form design, form validation, form conversion, multi-step form, form spam, captcha, honeypot, form abandonment, signup form, contact form. Also triggers when form completion rates are low or spam is overwhelming."
---

# Form Strategy

Forms are where intent becomes action. Design them well or lose conversions, frustrate users, and drown in spam. Stack-agnostic.

---

## When to use

- Designing or redesigning a form
- Conversion is dropping on a key form
- Spam volume is overwhelming the inbox or database
- Auditing forms across a site
- Planning validation logic
- Choosing form tooling (form service, custom build, no-code)
- Integrating forms with CRM, email, or other downstream systems
- Multi-step form decisions

## When NOT to use

- Generic conversion optimization (use `cro-optimization`)
- The copy on the form (use `landing-page-copy`)
- Backend handling beyond form-specific concerns (use `frontend-component-build`, `code-review-web`)
- General accessibility (use `accessibility-audit`)

---

## Required inputs

- The form's purpose (what action, what outcome)
- Current form (URL, screenshot, or fields)
- Current performance (completion rate, spam rate, conversion to next step)
- Downstream system (where submissions go: CRM, email, database, support tool)
- Business context (volume, urgency of leads, cost of false vs missed signups)

---

## The framework: 5 dimensions

Every form decision falls into one of these dimensions.

### Dimension 1: Field strategy

The biggest lever. Every additional field reduces conversion.

**Questions to ask for each field:**
- Is this required to deliver value to the user?
- Is this required to deliver value to the business?
- Can it be inferred from another source (email domain, behavior, context)?
- Can it be asked later (after first contact, on second visit, on settings page)?

**Default rule:** ask for the minimum to make the next step happen. Everything else later.

For a B2B contact form: name and email get you started. Phone, company size, role are nice-to-haves that often hurt conversion more than they help qualification.

For a checkout: country, postal code, address, name, payment. Anything else (referral source, marketing opt-in, account creation) is optional or moved to post-purchase.

### Dimension 2: Field design

How each field looks and behaves.

- **Labels above inputs** beat placeholders. Placeholder labels disappear when typing.
- **Inline labels** (floating labels) work for very compact forms.
- **Single column** for almost every form. Eyes flow vertically.
- **Logical grouping** with visible spacing. Don't put unrelated fields next to each other.
- **Right input type:** `email` for emails, `tel` for phone, `number` for numbers, `date` for dates. Mobile keyboards adapt.
- **Autocomplete attributes:** `autocomplete="email"`, `autocomplete="given-name"`, etc. Browsers and password managers fill them in.
- **Sensible defaults** for fields where one applies (country pre-selected by IP, etc.). Don't default to anything that would mislead if wrong.

### Dimension 3: Validation

Tell users what's wrong, when, and how to fix it.

- **Validate on blur, not on every keystroke.** Inline errors that appear as someone types are jarring.
- **Re-validate on submit** (catch fields the user skipped).
- **Specific messages:** "Email must include @" beats "Invalid email."
- **Position errors next to the field** they refer to.
- **Don't submit a form when there are errors.** Highlight the first errored field. Scroll to it.
- **Validate server-side too.** Client validation is UX. Server validation is correctness.

For format-flexible fields (phone numbers, postal codes), validate liberally. Reject only what's clearly wrong, not what's "non-standard." Many phone formats exist.

### Dimension 4: Spam defense

Public forms attract spam. Plan for it from day one.

**Layered defense:**

1. **Honeypot field.** A hidden field that humans don't fill in but bots do. If it's filled, reject silently. Free, low-friction, surprisingly effective for low-effort spam.
2. **Time-based detection.** Reject submissions completed in under 2-3 seconds (bots) or after very long delays (suspicious sessions).
3. **Rate limiting.** Reject if the same IP submits too many times.
4. **CAPTCHA as a last resort.** Modern invisible CAPTCHAs (hCaptcha, reCAPTCHA v3, Turnstile) are low-friction. Old image CAPTCHAs are conversion-killers.
5. **Behavioral signals.** Did the cursor move? Was there scroll? Modern services track this.
6. **Content filtering.** Reject obvious spam content (links, foreign-language content if your audience is local, common spam words).
7. **Server-side review.** A queue rather than direct delivery to inboxes for high-spam-target forms.

For most contact forms: honeypot + time check + Turnstile (or similar) is sufficient.

### Dimension 5: Submission flow

What happens after submit.

- **Inline success message** for short forms. Don't redirect just to confirm.
- **Confirmation page** for high-value submissions (to provide next steps, set expectations).
- **Email confirmation** for signups, purchases, RSVPs. Always.
- **Save data on errors** so the user doesn't re-enter everything.
- **Optimistic UI** (show success before the server confirms) for low-stakes forms; risky for high-stakes.

For multi-step forms:
- Show progress (3 of 5)
- Save state between steps (in case of refresh or navigation)
- Allow back navigation without losing data
- Validate per step, not just at the end

---

## Workflow

### Step 1: Audit current state

For each form on the site:
- What's its purpose?
- Number of fields, required vs optional
- Current completion rate
- Current spam rate
- Validation rules
- What happens after submit
- Where the data goes downstream

### Step 2: Define success per form

Different forms have different success metrics:
- Lead form: qualified leads (defined by sales)
- Newsletter: confirmed subscriptions (after double opt-in)
- Contact: substantive replies (not just submissions)
- Checkout: successful payments

Track the metric that matters, not just submissions.

### Step 3: Cut fields ruthlessly

Apply the field strategy filter. For each field, answer:
- Required to deliver value? Keep.
- Nice to have? Move to optional or later.
- Used for routing or qualification? Often can be inferred.

A 7-field form becomes a 3-field form. Conversion rises.

### Step 4: Set up spam defense

Before launching a public form:
- Add a honeypot field
- Add time-based detection
- Add rate limiting
- Add a modern CAPTCHA if the form is high-traffic or high-spam

After launch, monitor. Tune layers based on what's actually getting through.

### Step 5: Improve validation

Walk through each field:
- Is validation specific?
- Does it run at the right time (blur or submit, not on keystroke)?
- Are error messages actionable?
- Is server-side validation matching client-side?

### Step 6: Verify accessibility

Critical baseline:
- Every input has an associated label (visually visible or `aria-label`)
- Errors are associated with inputs (`aria-describedby`, `aria-invalid`)
- Focus order matches visual order
- Color isn't the only way to indicate errors
- Form is fully keyboard-navigable

See `accessibility-audit` for the full WCAG audit.

### Step 7: Test downstream

Submit the form. Verify:
- Data lands where it should
- Required fields are populated correctly
- Spam defenses are working (test with a script)
- The user gets the confirmation they expect
- Internal notification is timely

Forms break silently when downstream systems change. Test after any integration update.

### Step 8: Monitor

- Completion rate over time
- Spam rate over time
- Errors per submission (high errors = bad UX)
- Drop-off field (where do people abandon?)

---

## Failure patterns

**Too many fields.** Most B2B contact forms have 3x more fields than they need. Cut.

**Validation that fires while typing.** Annoying. Causes errors before the user has finished.

**Generic error messages.** "Invalid input." Where? Why? Be specific.

**Required fields not marked.** Users discover they're required only after submission fails. Mark required (or, for short forms, mark optional).

**Autocomplete disabled.** "For security." It's almost never a security improvement and always a UX cost. Leave autocomplete on.

**Tab order is broken.** Tab key skips fields or jumps backward. Set `tabindex` only when necessary; use natural DOM order.

**Submit button below the fold.** Especially on mobile. Users don't see it.

**No save on error.** User submits, has one error, returns to the form, all fields empty. Nightmare. Save the state.

**Captcha as the only spam defense.** Captchas are friction. Layered defense beats brute-force friction.

**Captcha visible by default.** Modern CAPTCHAs (Turnstile, reCAPTCHA v3) are invisible most of the time and only escalate when needed. Use those.

**Newsletter signup that's actually a marketing list.** Honor opt-in scope. If the user signed up for product updates, don't add them to the marketing newsletter.

**Confirmation page that's a dead end.** "Thanks for submitting" with no next step. What now? Provide an action (read related content, return to homepage, follow on social).

**No double opt-in for marketing email.** Bots and typos pollute the list. See `email-deliverability` for why this matters.

**Email field accepting `name@` as valid.** Browser spec validation is loose. Validate against an actual format.

**Custom date pickers worse than native.** The native `<input type="date">` is now good on most platforms. Don't reinvent unless you have a specific reason.

**Forms that lose state on refresh.** For long forms, save to localStorage and restore on load.

---

## Output format

A form audit document includes:

- **Form inventory:** every form on the site
- **Per-form review:** purpose, fields, performance
- **Recommendations:** field cuts, validation improvements, spam defense, design changes
- **Spam defense plan:** layers per form
- **Accessibility status:** WCAG compliance per form
- **Downstream integration map:** where each form's data goes
- **Monitoring plan:** what's tracked

---

## Reference files

- `references/form-anatomy-checklist.md`: A field-by-field, behavior-by-behavior checklist for auditing or designing a form, covering structure, accessibility, validation, and spam defense.

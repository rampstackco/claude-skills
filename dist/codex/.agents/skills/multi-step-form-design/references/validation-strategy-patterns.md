# Validation strategy patterns

Per-step vs end-only vs hybrid. Validation message discipline.

The validation strategy determines when errors are caught and how they are communicated. Done well, validation catches errors helpfully and protects the form from invalid submissions. Done poorly, validation rejects valid inputs or surfaces errors at the worst time.

---

## The catch-helpful principle

Validation should catch errors at the point where helping the user is most efficient. Errors caught too early feel intrusive; errors caught too late waste the user's investment.

**The win.** A user enters an invalid email; inline validation catches it immediately; the user fixes it and continues.

**The fail (too early).** A user is mid-typing an email; "must contain @" appears before they have finished typing.

**The fail (too late).** A user completes 5 steps; submission fails because of a step-1 error they did not see flagged.

The strategy choice depends on the form's length, the audience, and the validation complexity.

---

## Pattern A: Per-step validation

Each step's fields are validated before allowing progression to the next step.

**How it works.**

- The user completes the current step.
- Validation runs on all fields in the step.
- If errors exist, they are shown; the Next button does not advance.
- The user fixes errors and proceeds.

**Strengths.**

- Errors caught at the point of input.
- User does not invest in completing later steps only to discover an early error.
- Form feels responsive.

**Weaknesses.**

- Can feel intrusive if validation is too strict on every step transition.
- May block the user from progressing when they want to revise the field later.

**When to use.** Default for most multi-step forms. Each step's data is validated as a coherent unit.

---

## Pattern B: End-only validation

All validation runs at submission.

**How it works.**

- The user completes all steps.
- Validation runs only when the user clicks Submit.
- All errors surface at once.

**Strengths.**

- User completes uninterrupted.
- Validation logic is simpler (one validation pass).

**Weaknesses.**

- User invests in entire form only to discover an early error.
- Errors at the end can lose the user.
- Errors that span multiple steps are confusing to surface.

**When to use.** Rarely. Sometimes appropriate for very short forms where per-step validation overhead is not worth it.

---

## Pattern C: Hybrid

Required-field validation per step; full validation at end.

**How it works.**

- Per-step: critical errors (missing required fields, malformed email format) catch immediately.
- End: nuanced validation (cross-field consistency, business rules) catches at submission.

**Strengths.**

- Combines the responsiveness of per-step with the simplicity of end-only.
- The user gets immediate feedback on critical issues.
- Complex validation logic does not interrupt the flow.

**Weaknesses.**

- More complex to design (two validation tiers).
- Risk of inconsistent user experience if the tiers are not well-coordinated.

**When to use.** When validation has both critical-immediate components (required fields, format checks) and nuanced-end components (cross-field rules, business logic). The default pattern for most multi-step forms with significant validation needs.

---

## Pattern D: Real-time validation

Validation runs as the user types or interacts with each field.

**How it works.**

- As the user types, validation runs on the field.
- Errors appear inline as soon as they are detectable.
- Some implementations validate on field blur (when the user leaves the field) rather than every keystroke.

**Strengths.**

- Earliest possible error detection.
- User sees the result of their input immediately.

**Weaknesses.**

- Can feel intrusive if validation appears before the user finishes typing.
- Real-time validation on complex rules can lag.
- Easy to surface errors prematurely.

**When to use.** When the validation is simple enough to run instantly (format checks) and when the audience benefits from immediate feedback. Best practice: validate on blur rather than every keystroke.

---

## Validation message discipline

The error messages themselves matter.

**Helpful messages.**

- "Phone number must include area code" (specific guidance).
- "Try a value between 1 and 1000" (specific range).
- "Email must include @ and a domain" (specific format).
- "This field is required" (when blank).

**Unhelpful messages.**

- "Invalid input" (generic).
- "Error" (no information).
- "Out of range" (no range specified).
- "You must enter..." (scolding tone).

**Tone discipline.** Messages should be helpful, not scolding. "Try a value between 1 and 1000" beats "You must enter a value between 1 and 1000."

**Specificity.** "Phone number must be 10 digits" beats "Invalid phone number." Specific guidance lets the user fix the issue immediately.

---

## Inline placement

Where errors appear matters.

**Inline placement.** Errors appear next to the field that triggered them. The user sees the error in context.

**Banner placement.** Errors appear in a banner at the top of the step. Easy to miss; less helpful.

**Mixed placement.** Some errors inline, some in a banner. Confusing.

The discipline. Inline placement is the default. Banners can supplement (summarizing all errors on the step) but should not replace inline.

---

## Validation timing

When validation triggers.

**On blur.** Validation runs when the user leaves the field. Default for most field types.

**On change.** Validation runs as the user types. Useful for some real-time feedback (password strength, character count) but intrusive for most validation.

**On submit.** Validation runs when the user clicks the Next or Submit button. Always required as the final check.

The combination matters. Most fields work well with on-blur for individual validation plus on-submit for final check.

---

## Cross-field validation

Validation that depends on multiple fields.

**Examples.**

- "End date must be after start date."
- "Sum of allocations must equal 100 percent."
- "If selected 'enterprise,' company size must be above 200."

**The challenge.** Cross-field validation does not fit per-field timing. The validation can only run when both fields have values.

**Approaches.**

- **End-only validation for cross-field rules.** The cross-field check runs at submission.
- **End-of-step validation.** The cross-field check runs when the step containing both fields is completed.
- **Reactive cross-field validation.** Each time either field changes, the cross-field check runs.

The choice depends on the form's complexity and the user's likely workflow.

---

## Validation strictness

How aggressively to reject inputs.

**Too strict.** Rejects valid inputs because the validation is over-specified. "Email format invalid" for an email with a plus-sign alias.

**Too loose.** Accepts invalid inputs that fail at submission. The user finds out late.

**The right strictness.** Match validation rules to actual business requirements. Do not reject inputs the system can handle; do not accept inputs the system will choke on.

**Common over-strictness mistakes.**

- Email validation that rejects plus-sign aliases.
- Phone validation that rejects international formats.
- Name validation that rejects non-Latin characters.
- Address validation that rejects valid international addresses.

The discipline. Validation should reflect what the system actually requires, not what is stereotypical.

---

## Validation and accessibility

Validation must work for users with assistive technology.

**Screen reader announcements.** Errors should be announced when they appear. ARIA live regions for inline errors; focus management for error summaries.

**Keyboard navigation.** Users should be able to navigate to error messages with keyboard alone.

**Visual cues alongside text.** Color-coding for errors should not be the only signal; text labels and icons help users who cannot perceive color.

Detail in `accessibility-audit` for deeper accessibility coverage.

---

## Validation and mobile

Mobile validation has specific considerations.

**Touch-friendly error states.** Error indicators should be visible without pinch-zoom.

**Inline placement on mobile.** Errors appearing below or above the field; do not push critical content off-screen.

**Mobile keyboards.** Use input types (email, tel, number) so mobile keyboards adapt; this also helps validation.

**Real-time validation latency.** On mobile, real-time validation can lag and feel sluggish; default to on-blur for performance.

---

## Validation testing

Test validation across edge cases.

**Test cases to include.**

- Empty required fields.
- Format-invalid inputs (malformed emails, invalid phone numbers).
- Format-valid but business-invalid inputs (email without account, valid date in the past for a future-only field).
- Boundary inputs (minimum, maximum, just-outside).
- Special characters and international inputs.

**The discipline.** Validation should pass valid inputs and reject invalid ones consistently. Test with realistic edge cases the audience will encounter.

---

## Common validation failures

**Generic error messages.** "Invalid input" without guidance.

**Over-strict validation.** Rejecting valid inputs that fall outside narrow expectations.

**Late validation.** Errors caught only at submission for issues that should have surfaced earlier.

**Banner-only error placement.** User cannot see which field has the issue.

**Validation that rejects internationally.** US-only formatting rules applied to international audiences.

**Inconsistent validation rules.** Same field validated differently in different contexts.

**Validation without accessibility.** Errors invisible to screen readers; color-only cues.

**Validation that interrupts typing.** Real-time validation surfacing errors before the user finishes typing.

---

## Methodology-level choices that stay in the public skill

The catch-helpful principle. Patterns A through D with strengths, weaknesses, and when-to-use guidance. Validation message discipline (helpful vs unhelpful). Inline placement. Validation timing. Cross-field validation. Validation strictness. Validation and accessibility (cross-reference). Validation and mobile. Validation testing. Common failures.

## Implementation choices that stay internal

Specific validation rules for specific forms. Specific tooling for validation implementation. Specific brand-voice error messages. The team's accessibility review processes. These vary by team.

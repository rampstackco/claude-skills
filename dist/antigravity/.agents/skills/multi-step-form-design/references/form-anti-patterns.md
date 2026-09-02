# Form anti-patterns

The patterns that look like multi-step forms but degrade conversion. Anti-patterns are easy to ship; the cost shows up in completion rates, lead quality, and brand reputation over time.

---

## The kitchen-sink-single-page

The pattern. 30 fields on one page. Overwhelms before the user starts.

The signal. First-field drop-off near 100 percent on anything beyond a contact form. Users scroll, see the length, and leave.

The cost. The form's data collection is correct; the structure is wrong; nobody completes it.

The cure. Multi-step the form; group fields into coherent steps. Detail in `references/multi-step-decision-criteria.md` and `references/step-architecture-patterns.md`.

---

## The progress-theater form

The pattern. The form is broken into steps but the steps are arbitrary. "Step 1: name. Step 2: email. Step 3: phone."

The signal. Completion rate marginally better than kitchen-sink; users feel the form is gimmicky; some abandon mid-form because each step feels pointless.

The cost. The build effort produced a form that is no better than the alternative. The audience perceives the format as decorative.

The cure. Restructure into genuinely-staged steps. Detail in `references/step-architecture-patterns.md`.

---

## The arbitrary-chunking form

The pattern. Each step has 1-2 fields; the user wonders why this is multi-step.

The signal. Quick completions but high abandonment; the format adds friction without value.

The cost. The user perceives the form as gimmicky; trust degrades.

The cure. Either consolidate to single-page (if the form has only 4-6 fields) or expand the staging to coherent units (if the form has more fields that group naturally).

---

## The hidden-length form

The pattern. No progress indicator; the user does not know how long the form is.

The signal. Mid-form drop-off climbs as users lose patience; abandonment correlates with time spent.

The cost. Users who would have completed if they knew the length abandon out of uncertainty.

The cure. Add an honest progress indicator. Detail in `references/progress-indicator-patterns.md`.

---

## The interrogation-form-with-steps

The pattern. 25 fields across 5 steps; the format is multi-step but the data collection is excessive.

The signal. Drop-off at every step; cumulative completion rate is poor; the form earns "interrogation" reputation.

The cost. The audience that completes is over-disclosed and may resent the friction; the audience that does not complete walks away with a negative impression.

The cure. Audit the field set. Remove fields that are not necessary for the form's purpose. The right field count is often half what teams initially design.

---

## The validation-strict form

The pattern. Validation rejects valid inputs because the rules are over-specified. Email validation rejects plus-sign aliases; phone validation rejects international formats; name validation rejects non-Latin characters.

The signal. Users with valid but unusual inputs abandon when validation fails. Reports of "the form would not let me submit."

The cost. The form filters out valid users. The team perceives the form as working because submissions look clean; the team does not see the audience that could not get past validation.

The cure. Audit validation rules against actual business requirements. Detail in `references/validation-strategy-patterns.md`.

---

## The mobile-broken form

The pattern. Form works on desktop; breaks on mobile. Sliders impossible to grab; dropdowns overflow; touch targets too small.

The signal. Mobile completion drops to half of desktop or worse.

The cost. The mobile audience either bounces or has a worse experience that misrepresents the brand. Mobile is often the majority of traffic.

The cure. Mobile-first design and testing. Test on actual devices, not just dev tools.

---

## The trust-broken form

The pattern. Save-and-resume offered without clear trust communication. Users do not save because they distrust persistence.

The signal. Save-rate is low; users abandon mid-form rather than save.

The cost. The save mechanism's investment produces no value; the audience that would have saved instead leaves permanently.

The cure. Trust communication. What is saved, what is not, how long it persists, who can access it. Detail in `references/save-and-resume-mechanics.md`.

---

## The variable-step form

The pattern. Conditional logic that changes the step count visibly. "Step 4 of 5" becomes "Step 4 of 7" mid-form.

The signal. Users feel misled; abandonment climbs at the moment the indicator shifts.

The cost. Trust damage. The user trusted the indicator; the indicator lied.

The cure. Either avoid conditional steps that change the count, or communicate the variability upfront ("This form has 5-7 steps depending on your answers"). Detail in `references/progress-indicator-patterns.md`.

---

## The submission-anxiety form

The pattern. The submit button is unclear, or the user does not know what happens after submission, or the final step demands information they did not have ready.

The signal. Final-submission drop-off is high; users completed all fields but did not submit.

The cost. The form gets near-completion and loses the conversion at the last step.

The cure. Clear submission CTA, explicit post-submission preview, optional confirmation step. Detail in `references/drop-off-measurement-and-remediation.md`.

---

## The popup-interrupted form

The pattern. The user is mid-form; a popup appears (newsletter signup, chat invitation, special offer). The user's flow breaks.

The signal. Drop-off spikes at the popup moment; users complain about the interruption.

The cost. The form's user experience is hostile. The brand earns "annoying" reputation.

The cure. Suppress popups during form completion. Save promotional content for after submission or for the next visit.

---

## The reset-on-error form

The pattern. The user submits; validation fails; the form resets, losing the user's inputs.

The signal. Users who hit the error do not retry; they leave.

The cost. The form treats errors punitively. Trust collapses.

The cure. Preserve inputs on error. Show the error inline; let the user fix and resubmit without re-entering everything.

---

## The slow-validation form

The pattern. Real-time validation that lags. The user types; validation runs; the form feels sluggish.

The signal. Users feel the form is slow; abandonment climbs at long-validation steps.

The cost. The form's perceived performance damages the brand.

The cure. Move validation to on-blur (when the user leaves the field) instead of on every keystroke. Reserve real-time validation for instant checks (format, character count).

---

## The incompatible-with-autofill form

The pattern. Form does not support browser autofill. The user has to type every field manually.

The signal. Mobile completion is worse than desktop; users with password managers abandon.

The cost. The form treats users as if autofill does not exist. Friction without justification.

The cure. Support standard autofill attributes. Use semantic HTML input types. Test with browser autofill enabled.

---

## The save-but-lose-on-resume form

The pattern. Save-and-resume offered; user saves; resume returns the user to the start of the form, losing their progress.

The signal. Resume rate is high (users click the recovery link) but completion rate from resume is low (users abandon when they see they have to redo work).

The cost. The save mechanism's apparent value disappears at resume; trust collapses worse than if save had not been offered.

The cure. Test the resume experience. Verify that resuming returns the user to their actual progress with inputs preserved. Detail in `references/save-and-resume-mechanics.md` (resume experience section).

---

## The over-conditional form

The pattern. 25 conditional rules across 8 fields. Each rule individually justifiable; cumulatively the form is fragile and hard to maintain.

The signal. Bug reports about specific paths failing; testing surfaces broken rules; conditional logic decays unnoticed.

The cost. Maintenance burden compounds. Form behavior becomes hard to reason about.

The cure. Audit conditional logic. Remove rules that do not justify their maintenance overhead. Detail in `references/conditional-logic-patterns.md`.

---

## How to detect anti-patterns in a portfolio

Audit cadence. Quarterly review of every active form, looking specifically for these anti-patterns.

**Audit questions per form.**

- Does the form have natural step groupings (anti-pattern check: progress-theater, arbitrary-chunking)?
- Is the progress indicator honest and stable (anti-pattern check: hidden-length, variable-step)?
- Does each field affect the form's outcome (anti-pattern check: interrogation-form)?
- Is validation calibrated to actual requirements (anti-pattern check: validation-strict)?
- Does the form work on mobile (anti-pattern check: mobile-broken)?
- Is save-and-resume tested end-to-end (anti-pattern check: save-but-lose-on-resume, trust-broken)?
- Are inputs preserved on error (anti-pattern check: reset-on-error)?
- Is conditional logic maintained (anti-pattern check: over-conditional)?

**The retire decision.** Anti-pattern forms often warrant retirement or redesign. Maintaining broken forms costs more than the diminishing returns they produce.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing for each. Cures matched to anti-patterns. The audit cadence and audit questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped historically and the lessons learned. Specific portfolio audit results. Specific retirement and redesign decisions. The team's audit calendar and reviewer list. These vary by team.

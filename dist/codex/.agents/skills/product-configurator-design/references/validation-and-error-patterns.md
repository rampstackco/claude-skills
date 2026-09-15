# Validation and error patterns

Helpful validation. Inline, pre-emptive, final.

Validation catches invalid input. Done well, validation is helpful and inline; done poorly, validation is punitive or arrives only at submission.

---

## The catch-helpful principle

Validation should catch errors at the point where helping the user is most efficient.

**The win.** User selects an option that requires another. Inline validation surfaces immediately; explains; auto-corrects or guides.

**The fail.** User configures complete configuration. Submits. Validation runs at backend. User sees error; loses momentum.

The discipline. Validation timing matters; specific, helpful messages matter; preserve user inputs on error.

---

## Pattern A: Inline validation

Validation runs as the user makes choices.

**How it works.**

- User selects an option.
- System validates against the rest of the configuration.
- If invalid, message appears next to the choice.

**Strengths.** Errors caught at point of input.

**Weaknesses.** Real-time validation can lag; intrusive if too aggressive.

**When to use.** Default for most configurators.

---

## Pattern B: Pre-emptive validation

Constraints prevent invalid choices from being selectable.

**How it works.**

- Options that would create conflicts are disabled with explanation.
- User cannot select the invalid option.

**Strengths.** Errors prevented; user does not encounter them.

**Weaknesses.** Some users want to see the option even if disabled.

**When to use.** When the constraint is hard and explanation is clear.

---

## Pattern C: Final validation

Validation runs at submission.

**How it works.**

- User completes configuration.
- Submit; system runs full validation.
- Errors surfaced at this stage.

**Strengths.** Catches errors that span multiple fields.

**Weaknesses.** Late; user invested in completing.

**When to use.** As supplement to inline validation; not primary.

---

## Pattern D: Hybrid

Combining patterns.

**Common combination.** Pre-emptive for hard constraints; inline for soft validation; final as backup.

**Strengths.** Multiple safety nets.

**Weaknesses.** Complexity.

**When to use.** Production configurators with multiple constraint types.

---

## Validation message discipline

What the message says.

**Strong messages.**

- Specific to the issue.
- Explains why.
- Offers a path (alternative option, contact for custom).

**Examples.**

- "Option A requires Option B; we have selected B for you."
- "Option C is incompatible with Option D. Choose one or contact us for custom."
- "Quantity exceeds 1000; for larger quantities contact our team."

**Weak messages.**

- "Invalid configuration."
- "Error."
- "Please correct the issues."

The discipline. Specific, helpful, offers paths.

---

## Validation strictness

How aggressively to validate.

**Too strict.** Rejects valid inputs at edge cases. Frustrates users.

**Too loose.** Accepts invalid inputs that fail downstream.

**The right strictness.** Validation matches actual product constraints.

---

## Preserve inputs on error

What happens when validation engages.

**The principle.** Errors should not lose user inputs.

**The pattern.** Error appears; rest of configuration preserved; user adjusts the specific issue.

**The reset-on-error failure.** Form resets entirely on error. User loses all work; abandons.

The cure. Errors are local; configuration state preserved.

---

## Mobile validation

Validation on mobile.

**Mobile considerations.**

- Inline messages must fit mobile screens.
- Auto-correct should work with touch.
- Error states must be visible without zoom.

The mobile discipline. Test validation on actual devices.

---

## Validation testing

Test validation across cases.

**Test cases.**

- Valid configurations: pass through.
- Invalid configurations (each constraint type): caught with helpful message.
- Edge cases (boundary values, unusual combinations): handled.
- Mobile: works on touch.

---

## Common validation failures

**Late validation.** Errors caught only at submission.

**Generic error messages.** No guidance.

**Strict validation rejects valid inputs.** Edge cases lost.

**Loose validation accepts invalid.** Fails downstream.

**Reset-on-error.** User loses work.

**Validation interrupts typing.** Real-time validation too eager.

**Mobile-broken validation.** Errors invisible or off-screen.

---

## Methodology-level choices that stay in the public skill

The catch-helpful principle. Patterns A through D. Validation message discipline. Validation strictness. Preserve inputs on error. Mobile validation. Validation testing. Common failures.

## Implementation choices that stay internal

Specific validation rules for specific configurators. Specific copy. Specific tooling. These vary by team.

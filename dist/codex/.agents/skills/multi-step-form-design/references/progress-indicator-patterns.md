# Progress indicator patterns

Step counter, progress bar, step list. When each works. Indicator failures.

The progress indicator reinforces momentum and reduces uncertainty about how much is left. Bad indicators flatter or mislead; good indicators reflect honest progress.

---

## The honesty principle

The progress indicator must reflect actual remaining work. Indicators that flatter the user or hide remaining complexity break trust.

**The honest indicator.** "Step 3 of 5" when there are exactly 5 steps and the user is on step 3.

**The dishonest indicator.**

- "Almost done" when 5 fields remain on the next step.
- Progress bar that fills to 80 percent when 50 percent of fields remain.
- Step counter that shifts from "5 of 7" to "5 of 9" because conditional logic added steps.

The honesty discipline. Match the indicator to the actual work; do not flatter; communicate variability when it exists.

---

## Pattern A: Step counter

"Step 2 of 4." Simple, common, effective for short forms.

**How it works.**

- The current step number is shown.
- The total step count is shown.
- The format is consistent across the form.

**Strengths.**

- Easy to implement.
- Easy to understand.
- Compact.

**Weaknesses.**

- Does not reflect within-step progress.
- Misleading when step lengths vary significantly.
- Breaks if conditional logic changes the total step count.

**When to use.** Forms with 3-6 steps where step lengths are roughly similar.

---

## Pattern B: Progress bar

Visual fill showing percentage complete.

**How it works.**

- A bar fills from left to right (or follows other visual progression).
- The fill represents percentage of fields completed (or percentage of weight in some weighted scheme).
- Optionally includes a percentage label.

**Strengths.**

- Reflects continuous progress.
- Handles variable-length steps better than step counter.
- Visually engaging.

**Weaknesses.**

- More complex to design and implement.
- Risk of dishonest fill (bar fills fast, last 10 percent represents most of the remaining work).

**When to use.** Forms with variable step lengths or where the user benefits from continuous-progress signal.

---

## Pattern C: Step list

Named steps shown with the current one highlighted.

**How it works.**

- All step names visible (often in a sidebar or header).
- Current step highlighted.
- Completed steps marked (checkmark or different color).
- Future steps indicated.

**Strengths.**

- Shows the user the full form path.
- Reduces uncertainty about what is coming.
- Lets the user navigate back to specific steps.

**Weaknesses.**

- Takes more screen real estate.
- Can overwhelm if there are many steps.
- Forces the form to commit to step names upfront.

**When to use.** Forms with 3-7 well-named steps where the user benefits from seeing the structure.

---

## Pattern D: No indicator

Sometimes appropriate for very short forms.

**When to use.**

- Forms with 2-3 steps where the indicator overhead exceeds its value.
- Forms where the user's expectation is "this is short" and the indicator would imply length.

**Risks.**

- Without indication, longer forms can feel endless.
- Users may abandon because they cannot predict the form's length.

**The discipline.** No indicator is rarely the right answer for forms with more than 3 steps.

---

## Pattern E: Hybrid

Combining patterns. A step counter plus a progress bar; or a step list plus a percentage.

**Strengths.**

- Multiple signals reinforce each other.
- Different users benefit from different indicators.

**Weaknesses.**

- Visual complexity grows.
- Risk of redundant or conflicting signals.

**When to use.** Long forms (5+ steps) where rich indication helps the user understand the form's shape.

---

## Indicator failures

Patterns that break trust.

**Failure 1: Indicator that shifts mid-form.**

The form starts as "Step 4 of 5"; conditional logic adds steps; the form is now "Step 4 of 7." The user feels misled.

The cure. Either avoid conditional steps that change the count, or communicate the variability upfront ("This form has 5-7 steps depending on your answers").

**Failure 2: Indicator that hides remaining work.**

"Almost done" when 5 fields remain on the next step. The user trusted the indicator and now feels betrayed.

The cure. Calibrate the indicator to reflect remaining fields, not just remaining steps.

**Failure 3: Indicator that fills fast and slows down.**

Progress bar fills to 70 percent in the first 2 steps; the remaining 30 percent takes the next 5 steps. The user expects the form to end soon and is frustrated when it does not.

The cure. Weight the progress bar by actual work, not just step count. If step 5 represents most of the remaining work, the bar should reflect that.

**Failure 4: Indicator with no current-step context.**

The progress bar shows 50 percent but the user does not know what the current step is about. Reduces orientation.

The cure. Include both progress (where you are) and current-step name (what you are doing).

**Failure 5: Indicator that is decorative without being honest.**

Progress that looks fast but the next step is the longest one. The indicator misleads about pacing.

The cure. Honest pacing. The indicator should reflect actual time-to-complete, not just step count.

---

## Indicator placement

Where the indicator lives on the page.

**Top placement.** Above the form fields. Common; user sees it on every step.

**Sidebar placement.** Alongside the form. Good for step-list patterns; takes more space.

**Bottom placement.** Below the form fields. Less common; user has to scroll to see it on long steps.

**Sticky placement.** Indicator stays visible as the user scrolls within a step. Useful for long steps.

The choice depends on form length per step and visual hierarchy. Top placement is the safe default.

---

## Indicator and mobile

The indicator must work on mobile.

**Mobile-specific considerations.**

- Step counter: easy to mobile (small footprint).
- Progress bar: easy (full-width fits).
- Step list: harder; may need to collapse to step counter on mobile.
- Hybrid: simplify on mobile; do not stack multiple indicators.

**The mobile discipline.** Ensure the indicator is visible without scrolling. Mobile users should see "Step 2 of 5" or the progress bar without searching for it.

---

## Indicator messaging

Optional language alongside the indicator.

**Encouragement messages.** "Halfway there!" or "Almost done!" Can boost motivation; can also feel patronizing.

**Time estimates.** "About 2 minutes left." Useful when honest; misleading when wrong.

**Step-name labels.** "Step 2: Your Company." Useful when steps have meaningful names.

**The discipline.** Encouragement and estimates should be honest. Patronizing or wrong messaging breaks trust faster than no messaging.

---

## Indicator updating

When the indicator updates.

**On step transition.** The indicator updates as the user moves to the next step. Common pattern.

**On field completion.** The indicator updates as fields within a step are filled. More granular; less common.

**Smooth animation.** Subtle animation on transition reinforces progress.

**No animation.** Instant update is fine; flashy animation can be distracting.

---

## When indicators add no value

Some forms work without indicators.

**Very short forms.** 2-step forms often do not need indication. The user knows it is short.

**High-frequency forms.** Forms the user fills repeatedly may not need indication after the first time.

**Single-action forms.** A subscription form with email and submit does not need a progress indicator.

The discipline. Default to including an indicator for multi-step forms. Skip only when the form is genuinely simple enough that the indicator adds noise.

---

## Indicator audit

Periodically audit the indicator.

**The audit.**

- Read the indicator on each step. Does it reflect honest progress?
- Test the form with conditional logic. Does the indicator handle the variability?
- Check mobile rendering. Does the indicator work on touch devices?
- Check accuracy. Does "almost done" actually mean almost done?

**The drift.** Indicators decay as forms evolve. Steps get added; conditional logic gets added; the indicator falls out of sync.

**The cure.** Quarterly audit alongside form audit. Update the indicator when the form structure changes.

---

## Common indicator failures

**No indicator on a long form.** User does not know how much remains; abandons.

**Indicator shifts mid-form.** Conditional logic surprised the user.

**Dishonest pacing.** Bar fills fast, work remains slow.

**Indicator without current-step context.** Progress without orientation.

**Indicator overflowing on mobile.** Step list designed for desktop; cramped on mobile.

**Patronizing language.** "Almost done" repeatedly when the user is at step 2 of 6.

**Wrong time estimates.** "About 1 minute left" when 5 minutes remain.

---

## Methodology-level choices that stay in the public skill

The honesty principle. Patterns A through E with strengths, weaknesses, and when-to-use guidance. Indicator failures (5 patterns). Indicator placement, mobile considerations, messaging, updating. When indicators add no value. Indicator audit. Common failures.

## Implementation choices that stay internal

Specific indicator designs for specific forms. Specific tooling for indicator implementation. Specific brand-voice messaging alongside indicators. The team's mobile testing benchmarks. These vary by team.

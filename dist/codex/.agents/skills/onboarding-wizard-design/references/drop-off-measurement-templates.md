# Drop-off measurement templates

Per-step instrumentation. Common drop-off patterns and remediation. Without per-step tracking, drop-off remediation is guesswork.

The metrics inform every other improvement. Set up tracking before the wizard launches.

---

## The instrumentation requirement

Track step start, step completion, step abandonment for every step.

**Minimum tracking.**

- Wizard start (user landed on step 1).
- Step start (user reached step N).
- Step completion (user finished step N, advanced to step N+1).
- Step abandonment (user left without completing).
- Wizard completion (user finished all steps, reached end).
- Skip events (per step where applicable).

**Derived metrics.**

- Step completion rate (users who reached step / users who completed it).
- Step skip rate (users who reached step / users who skipped).
- Funnel completion rate (started wizard / finished).
- Time per step.

Without this data, every diagnostic is theoretical.

---

## Common drop-off points

Three patterns recur across onboarding wizards.

**First-step drop-off.** User landed on the wizard, looked at it, left.

Common causes.
- Wizard length visible upfront and intimidating.
- Value proposition unclear.
- Audience expected no wizard.
- Mobile UX broken.

**Mid-wizard drop-off.** User abandoned mid-process.

Common causes.
- Specific step too demanding (high field count, sensitive question, ambiguous input).
- Cumulative fatigue (wizard too long).
- Friction at validation or backend processing.
- Time pressure (user expected faster).

**Late-step drop-off.** User completed most steps but abandoned near the end.

Common causes.
- Final step requires information the user does not have.
- Wizard length felt longer than expected.
- Submission anxiety (user does not know what happens after).

---

## Remediation patterns

For each drop-off pattern.

**First-step drop-off.**

- Reduce visible upfront length (defer to multi-screen or progressive disclosure).
- Clarify value ("This 5-step setup connects your data and shows your first insight").
- Reduce step-1 cognitive load (start with the easiest step).
- Test mobile experience.

**Mid-wizard drop-off.**

- Audit the high-drop step. Is it too demanding? Sensitive? Ambiguous?
- Reduce field count or split into multiple smaller steps.
- Add progress indicator if missing.
- Add reassurance copy if the step is sensitive.
- Reword ambiguous fields.

**Late-step drop-off.**

- Reduce final-step requirements (move some fields earlier).
- Add post-submission preview ("After this, we'll set up your dashboard").
- Add explicit confirmation step before submission.

---

## Drop-off and skip distinction

Skip is intentional; drop-off is involuntary. Track them separately.

**Skip metrics.**

- Skip rate per step (users who reached step / users who skipped).
- Resume rate per skip (users who skipped step / users who returned to complete).
- Activation rate per skip (users who skipped specific steps and still activated).

**Drop-off metrics.**

- Abandonment rate per step (users who reached step / users who left without completing or skipping).
- Time-to-abandonment.
- Re-engagement rate (users who came back to retry the wizard).

**The diagnostic value.** Skip suggests the user does not value this step right now. Drop-off suggests the wizard failed to engage the user.

---

## Tracking conditional paths

Wizards with branching logic have multiple paths.

**Per-path tracking.**

- Tag each user's path through the wizard.
- Measure completion rate per path.
- Identify paths that drop off disproportionately.

**Path-specific remediation.** A path that drops off at step 4 may need step-4 redesign for users on that path. Other paths may not need attention.

---

## Drop-off and audience segmentation

Different audiences may drop off at different points.

**Segment-level tracking.**

- Tag users by source, device, role, or other relevant segment.
- Measure drop-off per segment.
- Identify segment-specific issues.

**Common segment patterns.**

- Mobile users drop off more on long steps.
- Paid-traffic users drop off earlier than organic.
- New users drop off more than returning visitors.

**Remediation by segment.** Sometimes the right answer is segment-specific (e.g., shorter wizard variant for mobile).

---

## Time-to-completion tracking

How long the wizard takes.

**Total time distribution.** Plot the time-to-complete distribution. Median, p25, p75, p95.

**Per-step time.** Which steps take longest? Are they earning the time?

**Patterns.**

- Wizards taking more than 10 minutes typically see significant drop-off.
- Steps taking more than 2 minutes typically see step-level drop-off.
- Long-tail completers (p95) often signal usability issues.

**Remediation by time.** Wizards or steps taking too long should be split or simplified.

---

## A/B testing wizards

Test changes rigorously.

**Test design.** Hypothesize the cause of drop-off; design a treatment; A/B test treatment vs control; measure both step-level drop-off and overall activation.

**Common test types.**

- Wizard length (shorter vs longer).
- Step ordering (different sequences).
- Field count per step.
- Skip prominence.
- Help text presence/absence.
- Default-heavy vs required-now-optional-later.

**Test discipline.** One variable at a time. Long enough to capture activation signal. Measure both wizard metrics and downstream activation.

---

## When drop-off is signal, not failure

Some drop-off is healthy.

**The signal.** Wrong audience self-selecting out. A wizard that filters out audiences who would not activate anyway is doing its job.

**The discipline.** Distinguish drop-off from unfit audience (good) from drop-off from fit audience (bad). The downstream activation metric reveals which.

The decision. Optimize for completed-by-fit-audience, not for raw completion rate.

---

## Wizard analytics dashboard

What to surface.

**Per-step funnel.** Start rate, completion rate, drop-off rate per step.

**Skip rates per step.** Where skip is enabled.

**Time-to-completion distribution.** With percentile breakdown.

**Activation rate per cohort.** Wizard completers vs non-completers; activation by skip pattern.

**Trend over time.** Have the metrics changed since the last release?

---

## Common analytics failures

**No instrumentation.** Wizard launched without tracking; quality is invisible.

**Aggregate-only tracking.** Wizard completion tracked but not per-step; remediation requires guesswork.

**Instrumentation drift.** Tracking implemented at launch; field renames or step changes broke the tracking.

**Skip and drop-off conflated.** Cannot distinguish intentional skip from involuntary drop-off.

**Activation not tracked.** Wizard metrics in isolation; cannot tell if completion correlates with activation.

**No segment-level data.** Aggregate hides segment-specific issues.

---

## Methodology-level choices that stay in the public skill

The instrumentation requirement. Common drop-off points and causes. Remediation patterns. Drop-off vs skip distinction. Tracking conditional paths. Per-segment analytics. Time-to-completion. A/B testing. When drop-off is signal. Dashboard composition. Common failures.

## Implementation choices that stay internal

Specific dashboards for specific wizards. Specific tooling. Specific A/B test designs. The team's audit calendar. These vary by team and product.

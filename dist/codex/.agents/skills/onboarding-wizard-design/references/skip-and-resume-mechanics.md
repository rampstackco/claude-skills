# Skip and resume mechanics

Skip patterns and resume patterns. The skip-friendly-empty failure. Honest skip, honest resume.

When users skip, where they land. When they resume, what they see. Skip mechanics done well let users escape without abandoning; done poorly, they produce skip-friendly-empty wizards where users skip into a useless product and churn.

---

## The skip principle

Skip should never produce an empty product. If skipping is offered, the user must land in a state where they can still progress; the wizard's deferred steps must be retrievable.

**The win.** A user clicks "Skip for now" on a setup step. The product places them in a partially-configured state with a clear callout: "Your workspace needs a connected data source to show insights. Set it up here when you're ready." The user understands; engages later.

**The fail (skip-friendly-empty).** A user clicks "Skip" on every step. The product places them in an empty state with no context; the user does not know what to do; they leave and never return.

The discipline. Skip exists, but skip is consequence-honest and recoverable.

---

## Skip patterns

Common patterns for offering skip.

**Pattern A: Soft skip with context.**

How it works. The skip option is available but explains what gets deferred. "Skip for now; we will remind you to connect your data source later."

When to use. Most wizards. Honest about the consequence; provides a path back.

**Pattern B: Skip-and-defer.**

How it works. Skipped steps are queued for later in-product prompts. The wizard does not require completion; the prompts handle re-engagement.

When to use. When the wizard would otherwise be too long; defer everything that can be deferred.

**Pattern C: Skip-with-warning.**

How it works. Skipping triggers an honest warning. "Skipping setup means you won't see [X] until you complete it. Continue?"

When to use. When skipping has real consequences the user should know about. Use sparingly; warnings on every step desensitize.

**Pattern D: No skip.**

How it works. The step must be completed. No skip option.

When to use. For wizards that absolutely require completion (compliance forms, paid signups, regulatory required steps). Use sparingly; users who cannot skip and cannot complete leave instead.

---

## Skip prominence

How visible the skip option is.

**Equal prominence.** Skip and continue have similar visual weight. Honest about both options. Most common.

**Continue-prominent.** Continue is the visual primary; skip is a secondary link. Encourages completion without forbidding skip.

**Skip-prominent.** Skip is more visible than continue. Almost never the right choice; produces skip-friendly-empty.

**Hidden skip.** Skip exists but is hidden behind a "more options" toggle. Discouraged; users cannot find escape if they need it.

The discipline. Continue-prominent for important steps; equal prominence for most steps; never skip-prominent.

---

## Skip-friendly-empty: the failure mode

The pattern where skip is too prominent and consequence-free.

**The pattern.** Every step has a "Skip" button as prominent as "Continue." Skip is consequence-free; users skip every step.

**The result.** Users land in an empty product; they have no context; they leave.

**The cost.** Activation rate falls off a cliff. The wizard's design effort produces an experience nobody actually completes.

**The cure.** Rebalance skip prominence. Make consequences visible. Add resume mechanics so skipped steps can be completed later.

---

## Resume patterns

Where users land when they return.

**Auto-resume on next login.**

How it works. The user returns; the wizard automatically lands at the step they left.

When to use. When wizard completion is genuinely required for product use.

**Manual resume from in-product entry.**

How it works. A persistent "Complete setup" surface in-product returns the user to the wizard.

When to use. When the wizard is recommended but not required; users can engage with the product partially.

**Soft resume.**

How it works. The wizard fades out as the user completes equivalent actions in-product naturally. No explicit re-entry needed.

When to use. When the in-product experience surfaces equivalent prompts; the wizard becomes redundant.

**No resume.**

How it works. Skipped steps are skipped permanently; the wizard runs once.

When to use. Rarely. Most wizards benefit from some resume mechanism.

---

## Skip-and-defer in-product prompt design

The prompts that bring users back.

**Trigger logic.** Prompts trigger based on user behavior, time elapsed, or context. "You have not connected a data source yet; here is how" appears when the user attempts to use a feature requiring data.

**Frequency limits.** Prompts should not nag. One reminder per session is often enough; some prompts should appear once and dismiss permanently.

**Dismiss mechanics.** "Don't show this again" is honest. Hidden dismiss options are hostile.

**Completion routing.** When the user accepts the prompt, route to the right setup flow (often shorter than the original wizard step).

---

## Skip mechanics by step type

Different steps warrant different skip treatment.

**Critical setup steps (without which the product cannot work).** Skip should be possible but consequence-warned. Resume mechanics aggressive.

**Optional configuration steps.** Skip easy and consequence-free; resume mechanics gentle.

**Identity/personalization steps.** Skip easy; the product can default; resume not necessary.

**Marketing/data-collection steps.** Skip easy; the product does not need this; resume rarely warranted (skip is a clean signal of opt-out).

The discipline. Skip prominence and resume aggressiveness should match the step's importance.

---

## Resume measurement

Track resume effectiveness.

**Skip rate per step.** What percentage of users skip each step?

**Resume rate per step.** What percentage of users who skipped a step later return to complete it?

**Activation rate per skip pattern.** Do users who skipped step X activate at lower rates?

**Diagnostic uses.**

- High skip + low resume: wizard losing users who never come back. Audit consequences.
- High skip + high resume: skip-and-defer working. The wizard is producing graceful escapes.
- Low skip overall: wizard is engaging users; check completion and activation as next metrics.

---

## Resume copy discipline

What the resume prompt says.

**Helpful resume copy.**

- "Connect your data source to see insights. It takes 2 minutes."
- "You skipped inviting teammates earlier. Want to do that now?"
- "Almost done. Two steps left to finish setup."

**Unhelpful resume copy.**

- "You did not finish onboarding."
- "Complete setup."
- "You missed steps."

The voice discipline. Resume copy should be helpful, not scolding. The user did not fail; they deferred.

---

## Common skip-and-resume failures

**Skip too prominent.** Users skip everything; activation collapses.

**No skip option.** Users who need to escape leave entirely.

**Hidden skip.** Users cannot find escape; frustration builds; they leave.

**No resume mechanism.** Skipped users never return to complete; configuration stays incomplete.

**Aggressive resume prompts.** Prompts every session; users dismiss permanently.

**Resume routes to wrong place.** User accepts prompt; lands in unrelated flow.

**Resume copy scolds.** User feels punished for skipping; trust degrades.

**Skip without consequence-disclosure.** Users skip not knowing what they will miss; abandon when they discover.

---

## Methodology-level choices that stay in the public skill

The skip principle. Skip patterns (4 patterns). Skip prominence guidance. The skip-friendly-empty failure. Resume patterns (4 patterns). Skip-and-defer prompt design. Skip mechanics by step type. Resume measurement. Resume copy discipline. Common failures.

## Implementation choices that stay internal

Specific skip and resume implementations for specific wizards. Specific prompt copy in brand voice. Specific tooling for resume infrastructure. The team's resume measurement baselines. These vary by team and product.

# Trigger-moment design

Where paywalls earn their interruption. Strong vs weak trigger moments.

The single most consequential decision in upgrade flow design. Paywalls surface at moments where the user has demonstrated they are getting value. Get this wrong and conversion suffers regardless of paywall design quality.

---

## The earned-interruption principle

Each paywall should answer: what value did the user just demonstrate, and how does the paid plan extend that value?

**The win.** User has used a feature 50 times. Hits the 50th-use limit. Paywall surfaces: "You have used [feature] 50 times this month. Upgrade to remove the limit and unlock [related advanced capabilities]." The trigger is fresh; the value is demonstrated; the user is positioned to say yes.

**The fail.** Same user. Paywall surfaces on first login: "Upgrade for more features." User has not yet demonstrated value; the upgrade ask is premature; user dismisses.

The discipline. Paywalls earn their interruption by connecting to recent demonstrated value.

---

## Strong trigger moments

Patterns that recur across products.

**Usage threshold reached.**

How it works. User has used a feature N times in a period. Further use requires paid plan.

Why it works. The user clearly values the feature. The threshold is predictable; the paywall is honest about the constraint.

**Capacity limit hit.**

How it works. User reached free-tier capacity (storage, seats, queries). Upgrade unlocks more.

Why it works. User encountered an unambiguous block. The block is part of the free-tier promise; the upgrade is the resolution.

**Advanced feature attempted.**

How it works. User clicked into a feature that requires paid plan.

Why it works. Interest is fresh; the user wanted this specific feature. Upgrade ask connects to the specific interest.

**Workflow completed successfully.**

How it works. User completed an action that produced visible value (saved view, exported result, completed flow). Upgrade ask connects continuing or expanding that value to paid plan.

Why it works. Value is fresh; user just experienced what the product does. Upgrade frames continuation.

**Team-collaboration moment.**

How it works. User wants to invite teammates; team capabilities require paid plan.

Why it works. The collaboration intent is concrete; team capabilities are a clear value extension.

**Time-trial ending.**

How it works. Trial-based products surface upgrade as trial nears end.

Why it works. Predictable; user expected it; the conversion conversation is timely.

**Multi-session usage.**

How it works. User has returned multiple times; engagement signal strong; soft upgrade prompt.

Why it works. The user has demonstrated commitment through return; soft prompt fits.

---

## Weak trigger moments

Patterns that fail.

**First-login paywall.**

The pattern. Upgrade ask on first login.

Why it fails. User has not yet seen value; the ask is premature.

**Random in-product placement.**

The pattern. Persistent paywall on the dashboard with no specific trigger.

Why it fails. Not connected to user behavior; users develop blindness.

**Every-page banner.**

The pattern. Persistent upgrade banner across all surfaces.

Why it fails. Visual noise; users learn to ignore.

**Paywall on the action the user expected free.**

The pattern. User believed a feature was free (because of marketing or onboarding); paywall surfaces when they try to use it.

Why it fails. Trust damage. The user feels deceived.

**Paywall on irrelevant moments.**

The pattern. Paywall surfaces during user actions unrelated to the paid feature.

Why it fails. Confusing; user does not connect the ask to anything.

**Paywall right after an error.**

The pattern. User just had a bad experience; immediately gets an upgrade ask.

Why it fails. Tone-deaf; trust degrades.

---

## Trigger moment design discipline

Designing each trigger.

**Step 1: Identify the demonstrated value.** What did the user just do that demonstrates value?

**Step 2: Identify the connection to paid.** How does the paid plan extend or continue that value?

**Step 3: Time the ask.** When in the user's flow does the ask land cleanly without breaking momentum?

**Step 4: Match presentation to importance.** Strong triggers warrant modal; soft triggers inline.

**Step 5: Plan the response paths.** What if user accepts? Declines? Asks for info? Each path designed.

The output is a trigger moment that the user perceives as fair.

---

## Trigger frequency

How often paywalls fire.

**Per-trigger.** A specific trigger should not fire repeatedly. Once it has fired and been declined, give space before re-asking.

**Cumulative session frequency.** Total paywall exposures per session capped (often 1-2). Beyond that, additional triggers defer.

**Per-week.** For users who use the product frequently, weekly cap prevents fatigue.

**The over-trigger trap.** Each individual trigger looks reasonable; cumulative exposure is annoying.

---

## Personalized trigger logic

Different users may warrant different triggers.

**Power-user vs new-user.** Power users may have different trigger thresholds; new users may need more time.

**Plan tier.** Free users see free-to-paid triggers; paid users see paid-to-higher-paid triggers.

**Engagement frequency.** Daily active vs returning monthly may warrant different timing.

**The discipline.** Personalize where data justifies; do not over-segment.

---

## Trigger testing

Test triggers before launching.

**Test cases.**

- New user encounters trigger: appropriate timing?
- Returning user encounters trigger: re-fire respect?
- Power user encounters trigger: relevant?
- User who declined trigger encounters again: respectful?

**Production monitoring.**

- Per-trigger fire rate.
- Per-trigger conversion rate.
- Decline rate per trigger.
- Cumulative session exposure.

The data informs which triggers earn their place and which should be retired.

---

## Trigger maintenance

Triggers decay.

**What decays.**

- Thresholds set years ago no longer match current usage patterns.
- Features the trigger references have changed or been deprecated.
- Audience composition shifted; old triggers no longer fit.

**Maintenance cadence.** Quarterly review. Triggers that fire too often, too rarely, or with low conversion warrant attention.

---

## Common trigger-moment failures

**Premature triggers.** Asking before value is demonstrated.

**Unconnected triggers.** Paywall not tied to the user's recent action.

**Over-frequent triggers.** Cumulative exposure becomes noise.

**Stale triggers.** Threshold values set long ago no longer match usage.

**Mistimed triggers.** Right concept, wrong moment in the user's flow.

**Triggers right after errors.** Tone-deaf placement after frustration.

**Triggers that violate free-tier promise.** Asking the user to pay for something they were told was free.

---

## Methodology-level choices that stay in the public skill

The earned-interruption principle. Strong trigger moments (7 patterns). Weak trigger moments (6 patterns). Trigger moment design discipline. Trigger frequency. Personalized trigger logic. Trigger testing. Maintenance. Common failures.

## Implementation choices that stay internal

Specific triggers for specific products. Specific thresholds. Specific tooling. The team's audit calendar. These vary by team and product.

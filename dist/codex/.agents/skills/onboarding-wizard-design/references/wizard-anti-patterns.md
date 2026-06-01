# Wizard anti-patterns

The patterns that look like onboarding but degrade activation. Anti-patterns are easy to ship; the cost shows up in activation rate, retention, and brand reputation over time.

---

## The tutorial-overload wizard

The pattern. Every feature explained in a 12-step intro before the user has touched the product.

The signal. High skip rate; users abandon mid-wizard; activation rate poor.

The cost. Design effort produces a sequence almost nobody completes. Users who do complete have not seen value; activation suffers.

The cure. Prune steps to those that contribute to the ah-ha moment. Defer feature explanations to in-product tours and contextual help.

---

## The skip-friendly-empty wizard

The pattern. "Skip onboarding" button at every step, so prominent that users always take it.

The signal. Skip rate near 100 percent; users land in unconfigured product; activation rate falls.

The cost. The product appears empty to users who skipped; they do not know what to do; they leave.

The cure. Rebalance skip prominence. Add consequence-honest skip warnings. Add resume mechanisms so skipped steps come back as in-product prompts.

---

## The decoration-step wizard

The pattern. Steps that exist for completeness or feature pride, not for value.

The signal. Drop-off concentrates on specific steps users perceive as pointless; analytics shows steps users always skip.

The cost. Wizard length without value; user perceives the wizard as bloated.

The cure. Audit each step. Cut steps that do not contribute to the ah-ha moment.

---

## The tutorial-as-ah-ha wizard

The pattern. Treating "learned about features" as activation. Wizard ends; user has seen a tour; team treats this as success.

The signal. High completion rate, low retention. Users completed the wizard but did not engage afterward.

The cost. The wizard's success metric is wrong. Real activation never happens.

The cure. Define the ah-ha moment as action-tied. Redesign the wizard to converge on the moment.

---

## The demo-as-ah-ha wizard

The pattern. The wizard ends with a polished demo using fake data.

The signal. Users see what is possible; do not return because their actual data has not been touched.

The cost. The wizard's value is contrived; activation does not stick because the value was hypothetical.

The cure. Make the ah-ha moment real. Use the user's actual data.

---

## The over-branched wizard

The pattern. 5 wizard variants for 5 imagined personas. Maintenance burden compounds.

The signal. Variants diverge over time; some break; activation per variant is uneven.

The cost. Maintenance overhead high; quality of any one variant degrades.

The cure. Reduce variants to 2-3 max. Combine variants where the differentiation does not produce materially different paths.

---

## The under-branched wizard

The pattern. One wizard for distinct audiences. Admins, end-users, technical, non-technical all see the same flow.

The signal. Some segments activate well; others do not. Per-segment data shows the gap.

The cost. The audiences underserved leave; the wizard's design effort produces good outcomes for one segment and bad for others.

The cure. Differentiate where the audience genuinely splits.

---

## The hidden-skip wizard

The pattern. Skip exists but is hidden behind a "more options" toggle or appears only after the user struggles.

The signal. Users who need to escape leave the product entirely instead of skipping.

The cost. Forced friction loses users who would have engaged later if they had been allowed to defer.

The cure. Make skip findable. Make consequences clear. Add resume.

---

## The validation-strict wizard

The pattern. Validation rejects valid inputs because rules are over-specified.

The signal. Users with valid but unusual inputs cannot proceed; abandon.

The cost. Filter loses real users.

The cure. Audit validation. Email plus-aliases, international phone, non-Latin names should pass.

---

## The mobile-broken wizard

The pattern. Wizard works on desktop; breaks on mobile.

The signal. Mobile completion half of desktop or worse.

The cost. Mobile audience underserved; mobile is often majority of traffic.

The cure. Mobile-first design and testing.

---

## The unmaintained wizard

The pattern. Wizard built once; product evolved; wizard not updated.

The signal. Users hit broken steps; references to deprecated features; analytics drift.

The cost. The wizard becomes liability; current users get worse experience than past users.

The cure. Quarterly maintenance. Product changes trigger wizard updates as part of the change.

---

## The interrogation-disguised-as-wizard

The pattern. Wizard asks 12 fields, of which 5 affect product setup. The other 7 are sales-qualification or marketing data.

The signal. Drop-off climbs at fields that feel like sales forms; users sense the manipulation.

The cost. Filter loses users who would have engaged with a product-focused wizard.

The cure. Audit fields. Remove or defer fields that do not contribute to product setup. Capture sales/marketing data later in the relationship.

---

## The popup-interrupted wizard

The pattern. User is mid-wizard; a popup appears (newsletter, chat, special offer); flow breaks.

The signal. Drop-off spikes at the popup moment; users complain about interruption.

The cost. Wizard's user experience hostile; brand earns annoying reputation.

The cure. Suppress popups during wizard completion. Save promotional content for after.

---

## The reset-on-error wizard

The pattern. User submits; validation fails; wizard resets, losing user inputs.

The signal. Users who hit error do not retry; they leave.

The cost. The wizard treats errors punitively; trust collapses.

The cure. Preserve inputs on error. Show error inline; let the user fix and resubmit.

---

## The wizard-without-activation-metric

The pattern. Wizard tracked by completion rate alone. Activation not measured.

The signal. Completion looks fine; team cannot diagnose whether the wizard is producing engaged users.

The cost. The wizard's success metric is wrong; bad wizards look good in dashboards.

The cure. Define and track activation explicitly. Wizard completion is leading indicator at best.

---

## How to detect anti-patterns in a portfolio

Audit cadence. Quarterly review of every active wizard, looking for these anti-patterns.

**Audit questions per wizard.**

- Does each step contribute to the ah-ha moment (anti-pattern check: tutorial-overload, decoration)?
- Is skip honest about consequences and recoverable (anti-pattern check: skip-friendly-empty, hidden-skip)?
- Does the wizard match the product's current state (anti-pattern check: unmaintained)?
- Is activation tracked (anti-pattern check: completion-only metrics)?
- Does the wizard work on mobile (anti-pattern check: mobile-broken)?
- Is validation calibrated to actual requirements (anti-pattern check: validation-strict)?
- Are inputs preserved on error (anti-pattern check: reset-on-error)?
- Is the audience segmentation right (anti-pattern check: over-branched, under-branched)?

**The retire decision.** Anti-pattern wizards often warrant redesign or retirement.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing for each. Cures matched. The audit cadence and questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped historically and the lessons learned. Specific portfolio audit results. Specific retirement decisions. The team's audit calendar. These vary by team.

# Common onboarding failures

9+ failure patterns with diagnoses and cures. The patterns that surface as "activation is low" or "users skip the wizard" or "we cannot tell if the wizard works."

---

## "Activation rate is low; completion rate is high."

**The diagnosis.** Wizard completed but did not engineer the ah-ha moment. Audit what users did after completing.

**The cure.** Redesign around the ah-ha moment (`references/ah-ha-moment-engineering.md`). Define activation explicitly; verify the wizard produces it; cut steps that do not contribute.

---

## "Skip rate is over 50 percent."

**The diagnosis.** Either the wizard is not earning its time or skip is too prominent. Audit both.

**The cure.** Audit step value (each step contribute to ah-ha?). Audit skip prominence (skip too easy?). Detail in `references/step-architecture-patterns.md` and `references/skip-and-resume-mechanics.md`.

---

## "Users complete the wizard then abandon the product within 24 hours."

**The diagnosis.** Time-to-value too long; ah-ha moment not in first session.

**The cure.** Move the ah-ha moment earlier. If the moment naturally takes longer, design an interim ah-ha for the first session.

---

## "Wizard works for new users; existing users hit broken steps."

**The diagnosis.** Wizard not maintained alongside product; deprecated features still in flow.

**The cure.** Maintenance discipline. Quarterly audit. Product changes trigger wizard updates as part of the change.

---

## "Different segments complete at very different rates."

**The diagnosis.** Audience-fit varies; consider role-based or use-case-based branching.

**The cure.** Differentiate by segment where the differentiation produces materially different paths. Detail in `references/user-type-variation-patterns.md`.

---

## "Mobile completion is half of desktop."

**The diagnosis.** Mobile UX broken or compromised.

**The cure.** Mobile-first design and testing. Test on actual devices.

---

## "We added more onboarding steps; activation went down."

**The diagnosis.** Tutorial-overload pattern; more is not better.

**The cure.** Cut steps that do not contribute to the ah-ha moment. Defer feature explanations to in-product tours.

---

## "Skip mechanics work but users do not return to complete setup."

**The diagnosis.** Skip-and-defer not working; in-product prompts to return are missing or ignored.

**The cure.** Audit prompt logic. Ensure prompts trigger at moments of relevance, with frequency limits, and route to the right setup flow.

---

## "Wizard analytics broke after the last release."

**The diagnosis.** Instrumentation drift; track and refresh.

**The cure.** Verify analytics after every release. Add a smoke test to the deployment process.

---

## "We A/B tested wizard length; conversion did not change."

**The diagnosis.** Length alone may not be the issue. Could be step content, skip prominence, or the underlying ah-ha definition.

**The cure.** Test variables that matter (skip prominence, ah-ha placement, step coherence). Length is one variable; isolate the right one.

---

## "Activation looks good; retention is poor."

**The diagnosis.** Activation metric may be wrong. Users hit a moment that does not predict retention.

**The cure.** Validate the ah-ha moment with cohort analysis. Did users who hit it actually retain? If not, the moment is wrong.

---

## "We cannot tell which step needs work."

**The diagnosis.** Aggregate completion tracked but not per-step.

**The cure.** Per-step instrumentation (`references/drop-off-measurement-templates.md`).

---

## "Wizard worked great at launch; activation has declined."

**The diagnosis.** Decay. Audience shifted; product evolved; references stale.

**The cure.** Quarterly audit. Update what has decayed.

---

## "Sales says the leads from signup are different than they used to be."

**The diagnosis.** Audience composition shifted; the wizard's segmentation may be obsolete.

**The cure.** Update branching or differentiation. Audit the audiences arriving and what they need.

---

## "We built a wizard; the team thinks the bot would have been better."

**The diagnosis.** Possibly. Different products warrant different activation tools.

**The cure.** Validate. If the bot would serve better, test or migrate. The wizard format is not always the right tool.

---

## "Power users complete the wizard then abandon."

**The diagnosis.** Wizard does not respect power users' speed. They want to skip ahead.

**The cure.** Add power-user paths. Skip should be available; advanced configuration should be findable post-wizard.

---

## "We localized the wizard; activation in some locales dropped."

**The diagnosis.** Translation quality, cultural mismatch, or audience-fit specific to the locale.

**The cure.** Audit translation. Audit cultural assumptions. Verify audience-fit per locale.

---

## "The wizard works on Chrome; it crashes on Safari mobile."

**The diagnosis.** Browser/device-specific bugs.

**The cure.** Cross-browser, cross-device testing.

---

## The pattern across failures

Most onboarding wizard failures fall into one of three patterns.

**Pattern 1: The wizard does not engineer the ah-ha moment.** Tutorial-overload, decoration steps, demo-as-ah-ha, late ah-ha. The fix is to redefine and converge on the moment.

**Pattern 2: The wizard does not match the audience.** Skip-friendly-empty, validation-strict, mobile-broken, segment mismatch. The fix is matching the wizard to where the audience actually is.

**Pattern 3: The wizard decays.** Stale references, broken steps, analytics drift. The fix is maintenance discipline.

The metric pattern: wizard failures often look fine on completion alone. The signal is in activation, retention, drop-off per step. Programs that track only completion keep shipping the same patterns.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (ah-ha, audience-fit, decay). The principle that completion alone is insufficient.

## Implementation choices that stay internal

Specific failure cases the team has encountered and the lessons learned. Specific multi-metric dashboards. Specific cures. The team's audit and retirement processes. These vary by team.

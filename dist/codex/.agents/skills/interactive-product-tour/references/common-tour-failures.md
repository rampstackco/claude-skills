# Common tour failures

9+ failure patterns with diagnoses and cures.

---

## "Tours show but feature adoption does not improve."

**The diagnosis.** Help may be visually present but not contextually relevant. Tour content may be unclear or call-to-action absent.

**The cure.** Audit trigger logic (`references/trigger-logic-patterns.md`). Verify tours fire at moments of friction. Audit content; ensure tours have clear CTAs.

---

## "Users disable tours globally."

**The diagnosis.** The system is annoying users. Audit frequency, dismissal, over-triggering.

**The cure.** Frequency caps (`references/dismissal-and-non-intrusion-patterns.md`). Per-user state tracking (`references/completion-tracking-and-re-trigger.md`). Audit cumulative exposure per session.

---

## "First-login tour completion is 80 percent; feature adoption is unchanged."

**The diagnosis.** One-and-done pattern. Tour content not retained at moment of need.

**The cure.** Move from single first-login tour to library of contextual micro-tours. Detail in `references/tour-architecture-patterns.md`.

---

## "Tooltips appear everywhere; nobody clicks them."

**The diagnosis.** Tooltip-spam. Visual blindness has set in.

**The cure.** Audit triggers. Remove tooltips that are not earning their place. Reserve hints for moments of friction.

---

## "Tour content references features we deprecated 6 months ago."

**The diagnosis.** Maintenance lapse.

**The cure.** Quarterly tour audit. Tag tours by feature; deprecate tours when features deprecate.

---

## "Power users complain about pop-ups for things they already know."

**The diagnosis.** No power-user differentiation.

**The cure.** Add feature-usage gating. Detail in `references/power-user-vs-new-user-patterns.md`.

---

## "Tours work on desktop, break on mobile."

**The diagnosis.** Mobile UX of help system not tested.

**The cure.** Mobile-first design and testing. Different placement patterns for mobile.

---

## "Some teams ship tours; others don't bother. Inconsistent."

**The diagnosis.** No tour governance. Some teams build tours, others ignore them.

**The cure.** Tour ownership. Designate who maintains the system. Tour authoring guidelines.

---

## "Tours triggered correctly but users do not act on the suggestion."

**The diagnosis.** Help content unclear or call-to-action absent.

**The cure.** Audit tour content. Each tour should have a clear, actionable CTA matched to the user's likely intent.

---

## "Tour completion looks fine; adoption is mixed by feature."

**The diagnosis.** Some tours work, others do not. Per-tour adoption tracking surfaces which.

**The cure.** Per-tour adoption-lift measurement. Retire or redesign tours that do not produce adoption lift.

---

## "We added more tours; user complaints went up."

**The diagnosis.** Cumulative frequency overload. Each tour reasonable; total exposure too much.

**The cure.** Per-session frequency caps. Audit cumulative exposure.

---

## "Returning users miss new features we shipped during their absence."

**The diagnosis.** No re-orientation help for long-absent users.

**The cure.** Returning-user re-orientation pattern. Detail in `references/power-user-vs-new-user-patterns.md`.

---

## "Tour analytics broke after the last release."

**The diagnosis.** Instrumentation drift.

**The cure.** Verify analytics after every release. Add to deployment smoke test.

---

## "Tour fires but user is mid-task; they abandon."

**The diagnosis.** Trigger logic does not respect ongoing tasks.

**The cure.** Detect mid-task state; defer tour. Trigger at moments of natural pause.

---

## "We A/B tested tour content; adoption did not move."

**The diagnosis.** Content was not the issue. Could be trigger, audience, or feature design.

**The cure.** Test variables that matter. Trigger logic, audience targeting, feature design itself. Sometimes the tour cannot save a bad feature.

---

## "Tours are clear; adoption is good; users still file support tickets."

**The diagnosis.** Tours covered the feature but not the edge cases. Documentation is needed for depth.

**The cure.** Tours plus docs. Tours teach the common case; docs cover edge cases.

---

## "Power users say tours feel patronizing."

**The diagnosis.** Copy tone wrong; or tours fire on features power users have mastered.

**The cure.** Match copy to brand voice (treat users as adults). Add power-user differentiation.

---

## "Tour platform broke after last platform update."

**The diagnosis.** Tour platform changes (Userpilot/Pendo/Appcues SDK updates) can break existing tours.

**The cure.** Test after platform updates. Have a rollback plan.

---

## The pattern across failures

Most tour failures fall into one of three patterns.

**Pattern 1: The tour does not surface at the right moment.** Tooltip-spam, one-and-done, over-trigger, under-trigger. The fix is trigger logic.

**Pattern 2: The tour does not match the audience or device.** No power-user differentiation, mobile-broken, patronizing. The fix is matching to user state.

**Pattern 3: The tour decays.** Stale references, broken triggers, deprecated features still tour-covered. The fix is maintenance.

The metric pattern: tour failures often look fine on completion alone. The signal is in feature adoption, support ticket reduction, user retention. Programs that track only completion keep shipping the same patterns.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (trigger, audience-fit, decay). The principle that completion alone is insufficient.

## Implementation choices that stay internal

Specific failure cases the team has encountered and the lessons learned. Specific multi-metric dashboards. Specific cures. The team's audit and retirement processes. These vary by team.

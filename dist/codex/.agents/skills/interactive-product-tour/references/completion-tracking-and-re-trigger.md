# Completion tracking and re-trigger

Per-user state, re-trigger logic, the over-trigger and under-trigger traps.

Knowing what each user has seen, deciding when to show again. Done well, tours feel ambient; done poorly, tours either re-show endlessly or fail to re-surface when needed.

---

## The state-aware principle

The tour system should know what each user has seen, completed, dismissed, and ignored. Decisions about whether to show, re-show, or skip a tour should be based on this state.

**The win.** A user who completed the advanced filtering tour does not see it again. A user who skipped it might see it again at a moment of more relevance. A user who dismissed all tours sees nothing.

**The fail.** Users see the same tour every time they log in. Users who dismissed tours globally still get them. Users who would benefit from a re-shown tour at the right moment never see it again.

The discipline. Track state per user per tour; use state to inform re-trigger logic.

---

## Per-user state tracking

What to track.

**Per tour, per user.**

- Has the user seen this tour?
- Did they complete it?
- Did they dismiss it without completing?
- When did they last interact with it?
- Did they take the suggested action after the tour?

**Globally per user.**

- Are tours globally enabled or disabled?
- What is their tenure on the product?
- What user state attributes apply (plan, role, segment)?

**Aggregate.**

- Tour completion rate.
- Tour dismissal rate.
- Action-taken-after-tour rate.

The data informs both individual and system decisions.

---

## Re-trigger logic

When to re-show.

**Completed tours.**

- Default: do not re-show. The user got what they needed.
- Exception: re-show if the feature changed materially. The tour is no longer the same tour.

**Dismissed tours.**

- Respect the dismissal.
- If the feature becomes relevant again much later (60+ days, significant feature change), consider gentle re-surfacing with respect.

**Skipped tours (saw but did not complete).**

- Re-trigger at moments of more relevance. The user did not commit; help may land better contextually.
- After 2-3 skip events, treat like dismissed; respect the pattern.

**Ignored tours (saw but did not interact).**

- Treat similarly to skipped.
- Re-trigger at moments of higher friction.

---

## The over-trigger trap

Showing the same tour to users who have completed it.

**The pattern.** No completion tracking; tours fire on every page load.

**The signal.** Users complain about repeat tours; users disable tours globally; trust drops.

**The cost.** The tour system loses credibility. Users who would have benefited from new tours dismiss them along with the over-triggered repeats.

**The cure.** Track completion. Tours that have been completed do not re-fire (with rare exceptions for material feature changes).

---

## The under-trigger trap

Tours never re-surfacing when the user hits the same friction again.

**The pattern.** First-login tours that show once and never come back.

**The signal.** Users hit the same feature later; have forgotten the tour; ask support; the help failed at the moment of need.

**The cost.** The tour system was decorative; the help did not compound adoption.

**The cure.** Re-trigger logic at moments of need. Even completed tours can re-surface in abbreviated form when the user hits the relevant feature months later.

---

## Re-trigger conditions

Specific conditions that warrant re-triggering.

**Material feature change.** The feature the tour covers has changed enough that the tour content is materially different. Re-show with "this feature has changed; here is what is new."

**Long absence.** User returned after 60+ days; subset of tours can re-surface as re-orientation.

**Plan change.** User upgraded plan; tours for previously-locked features become relevant.

**Role change.** User's role changed (e.g., promoted to admin); admin-relevant tours become applicable.

**Time-based decay.** Some tours benefit from periodic refreshers (rare; use carefully).

The discipline. Each re-trigger condition should be deliberate, not default.

---

## Frequency limits

Even thoughtful re-triggers can over-fire.

**Per-tour frequency.**

- Default: never re-show after completion.
- Re-trigger conditions: maximum once per condition met.

**Per-session frequency.**

- Maximum tours per session (cumulative across all tours): often 1-3.
- Beyond that, defer additional tours to next session.

**Per-week frequency.**

- Some users encounter many features in a week; the system should not fire 20 tours.
- Cap weekly tour exposure to maintain attention.

The discipline. Audit cumulative tour exposure per session and per week. Individual tour decisions are not enough.

---

## Dismiss vs disable distinction

Two different signals.

**Dismiss.** User closed a specific tour. Tells the system "this tour is not for me right now."

**Disable.** User turned off all tours via settings. Tells the system "I do not want any tours."

**Treatment.**

- Dismiss: respect for that tour; consider re-trigger at moments of higher relevance.
- Disable: respect globally; do not show any tours.

**The disable-respect failure.** Some tour systems override the global disable for "important" tours. This breaks user trust. Disable should mean disable (compliance triggers excepted, with disclosure).

---

## Tour analytics for completion

Track what each tour produces.

**Per-tour metrics.**

- Trigger rate (how often does this tour fire?).
- Completion rate (of users who saw it, how many completed?).
- Dismissal rate (how many dismissed without completing?).
- Action-taken rate (how many took the suggested action after?).
- Adoption lift (do users who saw the tour adopt the feature at higher rates than those who did not?).

The metrics inform whether the tour is earning its place.

**The adoption-lift question.** If users who saw the tour adopt the feature at the same rate as users who did not, the tour is not adding value. Either redesign or retire.

---

## Common completion-tracking failures

**No tracking.** Tours fire repeatedly; users complain.

**Tracking exists but ignored.** State stored but trigger logic does not use it; over-trigger persists.

**Stale state.** User dismissed tour 6 months ago; product changed; tour does not re-show despite being newly relevant.

**Cross-device gaps.** State tracked per device; user switches device and re-encounters every tour.

**Disable not respected.** Global disable ignored for "important" tours; user trust collapses.

**No adoption-lift measurement.** Tours track completion but not whether they produced adoption; weak tours persist.

**Re-trigger overzealous.** Re-trigger conditions fire too liberally; users see tours they completed re-appear without justification.

---

## Methodology-level choices that stay in the public skill

The state-aware principle. Per-user state tracking. Re-trigger logic. The over-trigger and under-trigger traps. Re-trigger conditions. Frequency limits. Dismiss vs disable distinction. Tour analytics. Common failures.

## Implementation choices that stay internal

Specific tracking implementations. Specific re-trigger logic per tour. Specific frequency baselines. The team's tooling. These vary by team and product.

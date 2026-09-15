# Trigger logic patterns

Event-based, time-based, state-based, combined triggers. The discipline that distinguishes useful triggers from noise.

The trigger answers "when does this help surface and why." Decorative triggers (showing help when it is not needed) become tooltip-spam. Useful triggers surface help at moments of friction.

---

## The relevance principle

Trigger help when the user is at a moment of friction or genuine need. Do not trigger help when the user is moving through familiar territory.

**The win.** A user clicks into a feature for the first time. The tour system recognizes this is the user's first encounter and surfaces a brief contextual hint. The user reads, takes the suggested action, moves on.

**The fail.** Same user, same feature. The tour system has no first-encounter detection; it triggers on every page load. The user has dismissed the same tooltip 12 times; develops blindness to all tooltips.

The discipline. Each trigger should answer "why this user, why now."

---

## Pattern A: Event-based triggers

Help appears in response to a user action.

**How it works.**

- The user performs an action (clicks a feature, enters a section, completes a flow).
- The trigger fires based on the event.
- Help appears contextually.

**Examples.**

- First click into a new section.
- Completed a flow for the first time.
- Hit a state where help would be useful (empty list, no data connected, no teammates invited).

**Strengths.**

- Most relevant; help responds to what the user just did.
- Naturally contextual.

**Weaknesses.**

- Requires per-event tracking.
- Can over-trigger if events are too granular.

**When to use.** Default for most contextual help. Events drive the trigger.

---

## Pattern B: Time-based triggers

Help appears after time elapsed.

**How it works.**

- A timer starts when relevant condition is met.
- After a defined interval, help triggers.
- Time can be session time, time on page, time since last action, or time since last login.

**Examples.**

- User has been on a page for 60 seconds without acting (signals stuck).
- User returned after 30 days of absence (signals re-orientation needed).
- User has been a customer for 90 days (signals capacity for advanced features).

**Strengths.**

- Catches stuck users events alone might miss.
- Useful for re-engagement of long-absent users.

**Weaknesses.**

- Time alone is a noisy signal.
- "Stuck" might just be reading.
- Easy to misuse and produce annoyance.

**When to use.** Sparingly. Time-based triggers should always combine with event or state signals.

---

## Pattern C: State-based triggers

Help appears based on user state.

**How it works.**

- The user has attributes (new vs power; small vs large account; specific role; specific plan).
- Trigger fires based on attribute match.

**Examples.**

- Power users see help only on newly-shipped features.
- Enterprise customers see different tour on workspace features than SMB.
- Users on free plan see different upgrade-related help than paid.

**Strengths.**

- Personalizes help to user segment.
- Avoids over-helping users who do not need it.

**Weaknesses.**

- Requires user-state infrastructure.
- State changes (plan upgrade, role change) need to update triggers.

**When to use.** When help differs significantly by user segment. State modulates event triggers.

---

## Pattern D: Combined triggers

Most production tour systems combine event, time, and state.

**Example combined trigger.**

"Show tour for advanced filtering feature when:
- User clicks the filter icon for the first time (event).
- User has been on the platform more than 7 days (state, not too new).
- User is on a paid plan (state, feature is paid-only).
- User has not dismissed this specific tour before (state, respect prior dismissal)."

The combination produces relevant triggers without false positives.

**The discipline.** Trigger conditions accumulate. Each condition prevents over-triggering.

---

## Trigger frequency limits

Even relevant triggers can over-fire.

**Per-tour limits.**

- Once per user (most tours).
- Once per quarter (re-orientation tours).
- Once per session per page (low-priority hints).

**Per-session limits.**

- Cap total tour interruptions per session (e.g., max 2 tours per session).
- Cap total tooltip appearances per session.

**The cumulative-frequency problem.** Each individual tour may be reasonable; the cumulative count across many tours can become noise.

The discipline. Audit cumulative triggers per session, not just per tour.

---

## Trigger disabling and respect

Users may disable tours globally.

**The pattern.** A settings option lets users disable all tours.

**The discipline.** Respect the disable. No tour should override the global setting (compliance triggers may be exception).

**Re-engaging disabled users.**

- Do not auto-re-enable.
- Surface specific high-value features as one-time prompts that respect the disable.
- Trust that users who disabled know what they want.

---

## Trigger logic and accessibility

Triggers must work for users with assistive technology.

**Considerations.**

- Triggers should not assume mouse hover (keyboard users miss them).
- Triggers should not auto-fire to overwhelm screen readers.
- Triggers should respect prefers-reduced-motion.

Detail in `accessibility-audit` for deeper accessibility coverage.

---

## Trigger logic testing

Test triggers across user paths.

**Test cases.**

- New user encounters feature: trigger fires.
- Returning user encounters same feature: trigger does not re-fire (respects history).
- Power user encounters newly-shipped feature: trigger fires.
- User who dismissed a tour: dismissed tour does not re-fire.
- User who disabled tours globally: no tours fire.
- User on mobile vs desktop: triggers behave consistently.

**Production monitoring.**

- Track trigger fire rate per tour.
- Track tour completion rate per tour.
- Track unique users who saw each tour.
- Anomalies (sudden spike in triggers) often indicate logic issues.

---

## Common trigger logic failures

**Over-triggering.** Triggers fire on every page load; users develop blindness.

**Under-triggering.** Triggers fire only on first-login; users miss help when they need it later.

**No state awareness.** Power users see beginner tours; new users see tours for features they have not unlocked.

**No frequency limits.** Each individual tour is fine; cumulative triggers per session are noise.

**Disabled users not respected.** Tours fire despite global disable.

**Stale triggers.** Triggers reference features deprecated 6 months ago.

**Untested edge cases.** Specific user paths produce broken triggers; nobody noticed.

---

## Methodology-level choices that stay in the public skill

The relevance principle. Patterns A through D (event, time, state, combined). Trigger frequency limits. Trigger disabling and respect. Accessibility considerations. Trigger testing. Common failures.

## Implementation choices that stay internal

Specific trigger configurations for specific tours. Specific tooling for trigger management. The team's testing protocols. Specific frequency baselines. These vary by team and product.

# Dismissal and non-intrusion patterns

Dismissal mechanics. The non-intrusion principle.

How tours close, how they respect the user's path, how they avoid becoming friction. The discipline that makes tours feel ambient rather than imposed.

---

## The non-intrusion principle

Help should be findable when wanted, ignorable when not. Tours that demand the user's full attention earn user resentment quickly.

**The win.** A tooltip appears next to a feature. The user reads, dismisses, moves on. Two seconds total. The interaction was brief.

**The fail.** A modal blocks the screen. The user has to read or dismiss before continuing. The interruption costs momentum and trust.

The discipline. Match intensity to importance. Most tours should be light.

---

## Dismissal patterns

How tours close.

**Pattern A: Click X.**

How it works. A standard close button (often X or "Close") dismisses the tour.

When to use. Default. Always available; users always know how to dismiss.

**Pattern B: Click outside.**

How it works. Tour dismisses if the user clicks anywhere outside the help element.

When to use. For non-modal tooltips; lightweight help.

**Pattern C: Auto-dismiss.**

How it works. Tour fades after a few seconds of no interaction.

When to use. Sparingly. Risky because users may not have read it. Best for very brief notifications.

**Pattern D: Persistent until acted on.**

How it works. Tour stays until the user takes the suggested action.

When to use. For guided flows where the user is meant to perform the action. Discouraged for routine help (intrusive).

**Pattern E: Dismiss-and-don't-show-again.**

How it works. Dismissing offers an explicit "don't show me this again" option.

When to use. For tours users may want to never see again (low-priority recurring tips).

---

## Dismiss prominence

How visible the dismiss is.

**Equal prominence.** Dismiss and primary action have similar visual weight.

**Primary-prominent.** Primary action ("Got it" or "Try it") is bold; dismiss is secondary.

**Hidden dismiss.** Dismiss requires clicking outside or finding a small X. Discouraged; users feel trapped.

The discipline. Dismiss should be findable in under 2 seconds without searching.

---

## Click-outside dismissal

When the user clicks elsewhere, what happens.

**Pattern: Dismiss fully.** Tour closes; user continues with what they were doing.

**Pattern: Pause and resume.** Tour pauses; if the user comes back, it resumes. Rarely the right choice; introduces unpredictability.

**Pattern: Block click.** Tour stays; click outside is captured but does not pass through. Most intrusive; reserved for compliance.

The discipline. Click-outside should usually dismiss. Users want to continue; let them.

---

## Auto-dismiss design

When help fades automatically.

**Time-based.** Help disappears after N seconds.

- 3-5 seconds: too short for anything but a single sentence.
- 8-12 seconds: reasonable for short help.
- 15+ seconds: probably too long; users have moved on.

**Action-based.** Help disappears when the user takes the suggested action.

- Useful for guided steps.
- Risk: user does something else; help disappears confusingly.

**Hover-based.** Help disappears when hover ends.

- Tooltip default.
- Brief by nature.

**The auto-dismiss risk.** Users who needed the help may have been reading slowly; auto-dismiss takes the help away before they finish.

The cure. Either give enough time, or let users explicitly dismiss.

---

## Frequency caps for non-intrusion

How many tours can fire in a session.

**Per-session caps.**

- Maximum tours per session: 1-3 typical.
- Beyond that, additional tours defer to next session.

**Per-page caps.**

- Maximum tours per page load: usually 1.
- Multiple tooltips on a page can stack; visual noise climbs.

**Per-day caps.**

- For users who use the product all day, daily caps prevent fatigue.

The discipline. Cumulative exposure matters as much as individual tour quality.

---

## Spacing and animation

How tours appear and disappear.

**Subtle entry.** Fade in; slight slide. Reinforces transition without distracting.

**Aggressive entry.** Bounce, pulse, shake. Gets attention; abused, becomes annoyance.

**Subtle exit.** Fade out; quick.

**The animation discipline.** Subtle entries and exits. Save aggressive animation for rare attention-needed moments.

---

## Spatial respect

Where the help appears matters.

**Avoid blocking the action.** Help should not cover the element it is teaching.

**Avoid blocking critical content.** Help should not obscure the user's primary work area.

**Avoid covering navigation.** Help that hides nav prevents the user from leaving.

**Allow scroll.** If the user needs to scroll while help is visible, scroll should still work.

---

## Help dismissal preserves user state

When the user dismisses, what is preserved.

**Form data:** preserved. Dismissing help should not reset form inputs.

**Page state:** preserved. Dismissing help should not navigate away.

**User progress:** preserved. Dismissing help should not undo work.

**The state-loss failure.** Help dismissal that resets the page or loses inputs costs trust catastrophically.

---

## Power-user dismissal patterns

Power users want to dismiss faster.

**Keyboard dismissal.** ESC closes help. Power users use keyboard.

**Click-anywhere-to-dismiss.** Allows fast dismissal without targeting the X.

**Settings to disable globally.** Allows opting out of all tours.

The discipline. Power users should be able to dismiss in under a second.

---

## New-user dismissal patterns

New users may need more time.

**Persistent tooltips for guided flows.** Help stays visible during the flow it is teaching.

**Linked help.** Dismissing help leaves a way to find it again ("Need help? Check our guides").

**Contextual reminders.** Help re-surfaces if the user struggles with the same area later.

The discipline. New users should not lose access to help permanently from a single dismissal.

---

## Common dismissal failures

**Dismiss too prominent.** User dismisses before reading; misses the help.

**Dismiss hidden.** User cannot find the dismiss; feels trapped.

**Auto-dismiss too short.** Help disappears before reading; user does not know what was there.

**Dismiss does not respect.** Tour reappears after dismiss.

**Dismiss loses state.** Form inputs reset; user loses work.

**No keyboard dismiss.** Power users cannot dismiss quickly.

**Modal blocks until dismissed.** User cannot continue without engaging.

**Help blocks the action.** Spotlight covers the very element being taught.

---

## Methodology-level choices that stay in the public skill

The non-intrusion principle. Patterns A through E for dismissal. Dismiss prominence. Click-outside dismissal. Auto-dismiss design. Frequency caps. Spacing and animation. Spatial respect. State preservation on dismiss. Power-user vs new-user dismissal patterns. Common failures.

## Implementation choices that stay internal

Specific dismissal designs for specific tours. Specific animation timings. Specific frequency baselines. The team's tooling. These vary by team and product.

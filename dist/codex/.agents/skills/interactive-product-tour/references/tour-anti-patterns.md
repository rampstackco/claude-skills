# Tour anti-patterns

The patterns that look like tours but degrade the product. Easy to ship; the cost shows up in feature adoption, user trust, and brand reputation.

---

## The tooltip-spam tour

The pattern. Every button, link, and feature has a "click for tour" hint or pulsing dot.

The signal. Users develop blindness to the dots; click rates collapse; tour completion rates near zero.

The cost. The visual clutter degrades the product; users learn to ignore all tooltips, including useful ones.

The cure. Audit triggers. Reserve hints for moments of genuine friction. Detail in `references/trigger-logic-patterns.md`.

---

## The one-and-done tour

The pattern. A single first-login tour. Never re-surfaces.

The signal. Users skip or skim; help unavailable at moments of later need.

The cost. Feature adoption suffers; support tickets persist for tour-covered features.

The cure. Library of micro-tours triggered contextually. Detail in `references/tour-architecture-patterns.md`.

---

## The mega-tour

The pattern. A single tour with 25 steps covering the whole product.

The signal. High abandonment mid-tour; high skip rate; activation does not lift.

The cost. Tutorial-overload pattern applied to tours. Users abandon; help fails.

The cure. Break into micro-tours, each tied to a specific feature.

---

## The over-trigger tour

The pattern. Tour fires on every page load; no completion tracking.

The signal. Repeat exposure; user complaints; tours globally disabled.

The cost. Tour system loses credibility.

The cure. Per-user state tracking. Completed tours do not re-fire.

---

## The under-trigger tour

The pattern. Tour fires only on first-login. Users hit the same friction later; help does not return.

The signal. Specific features show low adoption among long-tenured users; help failed at the moment of need.

The cost. The tour system was decorative for everyone after their first session.

The cure. Re-trigger logic at moments of relevance, even for tours seen long ago.

---

## The dismissive-of-disable tour

The pattern. User disabled all tours globally; system fires tours anyway because they are deemed important.

The signal. User trust collapses; explicit complaints.

The cost. The tour system overrode the user's clear preference; trust does not recover quickly.

The cure. Respect the global disable. Use compliance-only triggers for legally required messages, with clear disclosure.

---

## The blocks-the-action tour

The pattern. Spotlight overlay covers the element it is teaching; user cannot click through.

The signal. User confusion; users dismiss and abandon the action they were about to take.

The cost. The tour failed at its job; the user did not learn the feature because the tour blocked the feature.

The cure. Spotlight placement that highlights without blocking. The user should be able to take the action while the help is visible.

---

## The auto-dismiss-too-fast tour

The pattern. Help fades after 3 seconds.

The signal. Users complain about help disappearing before they read it.

The cost. The help is technically present but functionally absent.

The cure. Either longer auto-dismiss (8-12 seconds), or let users dismiss explicitly.

---

## The validation-strict tour

The pattern. Tour requires the user to take a specific action to proceed; the user takes a different valid path.

The signal. Tour gets stuck; user abandons.

The cost. Forced linearity penalizes users who explore.

The cure. Tour either accepts multiple valid paths or dismisses if the user explores elsewhere.

---

## The brand-inconsistent tour

The pattern. Tour styling looks different from the rest of the product. Generic platform styling rather than brand-aligned.

The signal. Users perceive the tour as bolted on; brand consistency suffers.

The cost. The product feels less polished; tours feel like a separate system.

The cure. Custom-styled tours matching the product's design system.

---

## The mobile-broken tour

The pattern. Tour designed for desktop; breaks on mobile.

The signal. Mobile completion rates much lower; mobile-specific complaints.

The cost. Mobile audience underserved.

The cure. Mobile-first design and testing. Detail in `references/contextual-placement-patterns.md` (mobile section).

---

## The unmaintained tour

The pattern. Tour built once; product evolved; tour content references deprecated features.

The signal. Users hit broken steps; references that no longer apply.

The cost. Trust degrades; users ignore tours expecting them to be wrong.

The cure. Quarterly maintenance. Product changes trigger tour updates as part of the change.

---

## The orphan-tour

The pattern. Tour exists for a feature that was deprecated 6 months ago; nobody removed it.

The signal. Tour fires; clicks lead to 404 or to a removed UI; users confused.

The cost. The tour points to nothing; user trust degrades.

The cure. Tour deprecation alongside feature deprecation.

---

## The fake-engagement tour

The pattern. Tour optimizes for click-through rate by making the action button huge and the dismiss tiny.

The signal. Click-through rate looks high; downstream feature adoption does not match.

The cost. Surface metrics look fine; real adoption does not improve.

The cure. Track adoption as the metric; design honestly. Click-through alone is not enough.

---

## The interrupting tour

The pattern. Tour fires while the user is mid-task; takes over the screen.

The signal. User abandonment spikes at the interruption; users complain.

The cost. The tour cost the user a task completion.

The cure. Tour triggers should respect ongoing tasks. Detect mid-task state; defer.

---

## The patronizing-copy tour

The pattern. Tour copy talks down to users. "Welcome! Let me show you around. Here's how to do something simple."

The signal. Power users dismiss; new users feel patronized.

The cost. Tone hurts trust.

The cure. Match copy to brand voice. Treat users as adults.

---

## How to detect anti-patterns in a portfolio

Audit cadence. Quarterly review of every active tour, looking for these anti-patterns.

**Audit questions per tour.**

- Is the tour triggered relevantly (anti-pattern check: tooltip-spam, over-trigger, under-trigger)?
- Does the tour respect dismissal (anti-pattern check: dismissive-of-disable)?
- Does the tour block the action it teaches (anti-pattern check: blocks-the-action)?
- Is auto-dismiss timed appropriately (anti-pattern check: auto-dismiss-too-fast)?
- Does the tour match the brand's design (anti-pattern check: brand-inconsistent)?
- Does the tour work on mobile (anti-pattern check: mobile-broken)?
- Is the tour current (anti-pattern check: unmaintained, orphan)?
- Is adoption tracked (anti-pattern check: fake-engagement)?

**The retire decision.** Anti-pattern tours often warrant retirement or redesign.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing for each. Cures matched. The audit cadence and questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped historically and the lessons learned. Specific portfolio audit results. Specific retirement decisions. The team's audit calendar. These vary by team.

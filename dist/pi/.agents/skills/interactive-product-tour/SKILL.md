---
name: interactive-product-tour
description: "Designing in-product tours, tooltips, and contextual help that teach product capabilities without becoming friction. Trigger logic, tour architecture, contextual placement, completion tracking. Honest about tooltip-spam (visual noise that users develop blindness to), one-and-done (help invisible at the moment of need), and contextual-when-needed (surfaces help at the moment friction occurs) patterns. Triggers on product tour, in-product tooltip, contextual help, walkthrough, feature tour, hint system, in-app guidance, tour platform. Also triggers when feature adoption is low, when users miss key product capabilities, or when an in-product help system is being scoped for the first time."
category: growth-tooling
catalog_summary: "Designing in-product tours and contextual help. Distinguishes tooltip-spam (every button has a tour stop) from one-and-done (tour shows once, never seen again) from contextual-when-needed (surfaces help at the moment friction occurs)"
display_order: 8
---

# Interactive Product Tour

A senior product marketing director's playbook for designing in-product tours, tooltips, and contextual help that teach product capabilities without becoming friction. Trigger logic, tour architecture, contextual placement, completion tracking. The discipline of building help systems that surface at moments of need and disappear when not needed.

Most product tours fail in one of two ways. They paint every button, link, and feature with "click for tour" hints until the visual noise is so great that users develop blindness to the dots. Or they show a single first-login tour the user skips or skims, after which the same help never re-surfaces when the user actually hits a moment of friction. Help that is invisible at the moment of need is help that does not exist.

The tours that work do something different. They trigger when the user is at a moment of friction, not all the time. They surface contextual hints when the user enters a section they have not explored, clicks into a feature requiring setup, or returns after a long absence. The system knows what the user knows and surfaces help at the right moment.

The voice is the senior product marketing director who has watched feature adoption double when tours were redesigned and watched it collapse when more tooltips were piled onto every surface. Practical, opinionated about the trigger logic that distinguishes useful help from visual noise, willing to call out when no in-product tour at all is the right answer.

When to use this skill: scoping an in-product help system for the first time, auditing a tour system that produces engagement metrics with no adoption lift, designing the trigger logic that decides when help surfaces, or deciding which features warrant tours vs documentation.

---

## What this skill covers

This skill spans in-product tours, tooltips, and contextual help. The growth-tooling distinctions:

- `onboarding-wizard-design` is the sequential first-run experience. This skill is contextual help WITHIN the product, surfacing across the lifecycle.
- `chatbot-flow-design` is conversational help. This skill is non-conversational tour and tooltip help.
- **`interactive-product-tour` (this skill)** is trigger logic, tour architecture, contextual placement, completion tracking, and the discipline of being absent until needed.
- `discovery-research-synthesis` is research that informs tour content. Input, not part of.
- `pm-spec-writing` is the spec for engineers building the tour. This skill is about WHAT to build; pm-spec-writing is about communicating it.

The audience: product marketers, growth marketers, in-house product teams, agencies running activation work for SaaS clients.

Out of scope: first-run wizards (covered by `onboarding-wizard-design`); conversational help (covered by `chatbot-flow-design`); the engineering implementation; specific Userpilot/Pendo/Appcues platform configurations (those stay implementation-side).

---

## The tour decision: when tours earn vs when documentation suffices

Before designing the tour system, decide whether tours are the right tool.

**Tours earn investment when:**

- The product has features users genuinely miss without prompting. Specific functionality buried in menus, advanced workflows that require sequence, integrations users do not know exist.
- The audience benefits from in-context guidance more than out-of-context documentation. Tours teach in the place the user will use the feature; docs require context-switching.
- The team can maintain tours as the product evolves. Tour content decays; without maintenance commitment, tours point to deprecated UI.
- The success metric is defined. Feature adoption, time-to-value for specific capabilities, reduction in support tickets for tour-covered features.

**Tours do NOT earn investment when:**

- The product's feature set is small enough that documentation suffices. A few tooltips on key features may be all that is needed.
- The audience prefers self-directed discovery. Some audiences resent in-product guidance and prefer to explore.
- The team cannot maintain tours alongside product changes. Stale tours are worse than no tours.
- The product changes frequently. Tour maintenance can exceed tour value if the product churns rapidly.

The decision is not "should we have a tour system"; it is "is in-product tour the right tool for this product and audience."

Detail in [`references/tour-decision-criteria.md`](references/tour-decision-criteria.md).

---

## Tooltip-spam vs one-and-done vs contextual-when-needed

The keystone framing.

**Tooltip-spam.** Every button, link, and feature has a "click for tour" hint or pulsing dot. Visual noise. Users develop blindness to the dots; the tour system fails as a teaching surface. Cost: the design effort produces help nobody perceives; the visual clutter degrades the product overall.

**One-and-done.** A single tour shown on first login. Users skip or skim. The same tour never re-surfaces when the user actually hits a moment of friction. Cost: help that is invisible at the moment of need does not help. Feature adoption stays low; support tickets persist for features the tour covered.

**Contextual-when-needed.** Tours and tooltips trigger when the user is at a moment of friction (entered a section they have not explored, clicked into a feature requiring setup, returned after a long absence, hit a feature flag's first activation). The system knows what the user knows and surfaces help at the right moment. Cost: trigger logic is meaningful work; payoff is help that compounds adoption over time.

The litmus test. Watch a user encounter a feature for the first time. Does the help system surface useful guidance at that moment, or did it surface guidance at first-login that the user has long forgotten? If the former, contextual-when-needed. If the latter, one-and-done. If the help is competing with 14 other tooltip dots scattered across the page, tooltip-spam.

---

## Trigger logic: event-based vs time-based vs state-based

The mechanism that decides when help surfaces.

**Event-based triggers.** Help appears in response to a user action. Clicked a feature for the first time, entered a new section, completed a flow.

When to use. Default for most contextual help. The user did something; help responds.

**Time-based triggers.** Help appears after time elapsed. Returned to the product after 30 days of absence; been on this page for 60 seconds without acting.

When to use. Time can signal need (long absence; stuck on a page). Use sparingly; time alone is a noisy signal.

**State-based triggers.** Help appears based on user state. New user vs power user; account size; feature usage history.

When to use. When the help differs by user segment. State-based triggers personalize help.

**Combined triggers.** Most production tour systems combine all three. Event-driven, with time and state modulating frequency and content.

The discipline. The trigger answers "when does this help surface and why." Decorative triggers (showing help when it is not needed) become tooltip-spam.

Detail in [`references/trigger-logic-patterns.md`](references/trigger-logic-patterns.md).

---

## Tour architecture: single tour vs branched vs library of micro-tours

How help is organized.

**Single tour.** One linear tour covering the product. Simple; rigid; rarely fits how users actually explore.

**Branched tour.** Tour adapts based on user choices or path through the product. More relevant; more complex.

**Library of micro-tours.** Dozens of small focused tours, each tied to a specific feature or workflow. Triggered contextually. Most flexible; most maintenance.

**The choice.** Most modern systems use the micro-tour library approach. Single tours feel canned; branched tours are hard to maintain at scale; a library of contextual micro-tours matches how users actually explore.

Detail in [`references/tour-architecture-patterns.md`](references/tour-architecture-patterns.md).

---

## Contextual placement: where help appears, how it dismisses

The visual design of help.

**Placement patterns.**

- **Tooltip on hover.** Help appears next to the element on hover. Lightweight; familiar.
- **Spotlight overlay.** Element highlighted, help appears alongside. More prominent; more disruptive.
- **Sidebar.** Help appears in a side panel. Can persist while the user works.
- **Inline.** Help appears in the page flow. Non-disruptive; harder to dismiss.

**Dismissal mechanics.**

- **Click X.** Standard close. Always available.
- **Click outside.** Help dismisses if the user interacts with anything else. Implies non-modal help.
- **Auto-dismiss.** Help fades after a few seconds. Risky; users may not have read it.
- **Persistent until acted on.** Help stays until the user takes the suggested action. Powerful for guided flows; intrusive otherwise.

**Non-intrusion principle.** Help should be findable when wanted, ignorable when not. Modal help that blocks the screen is intrusive; help that disappears too easily fails to teach.

Detail in [`references/contextual-placement-patterns.md`](references/contextual-placement-patterns.md) and [`references/dismissal-and-non-intrusion-patterns.md`](references/dismissal-and-non-intrusion-patterns.md).

---

## Completion tracking and re-trigger logic

Knowing what each user has seen, deciding when to show again.

**Per-user state tracking.**

- Which tours has the user completed?
- Which tours has the user dismissed?
- Which tours has the user seen but not completed?
- Time since last interaction.

**Re-trigger logic.**

- Completed tours: usually do not re-show.
- Dismissed tours: respect the dismissal; possibly re-show after a long delay if the feature becomes relevant again.
- Skipped tours: re-show at moments of relevance.
- Long-absent users: re-orient with abbreviated help.

**The over-trigger trap.** Showing the same tour to users who have completed it. Trust degrades; users disable tours.

**The under-trigger trap.** Tours never re-surfacing when the user hits the same friction again. Help fails at the moment of need.

Detail in [`references/completion-tracking-and-re-trigger.md`](references/completion-tracking-and-re-trigger.md).

---

## Power-user vs new-user differentiation

Different users need different help.

**The principle.** Power users do not want tours on features they already use. New users need tours on features they are encountering for the first time. The help system should know the difference.

**Differentiation signals.**

- Feature usage history (has the user used this feature before?).
- Tenure (how long has the user been on the product?).
- Engagement frequency (active daily vs returning monthly).
- Self-reported skill level (rare; usually inferred).

**Differentiation patterns.**

- Power users see help only on new features.
- New users see help on the features matching their stage of exploration.
- Returning users see re-orientation help if their last session was long ago.

**The over-helping trap.** Helping power users with features they mastered. Trust degrades.

**The under-helping trap.** Treating all users as power users. New users miss critical help.

Detail in [`references/power-user-vs-new-user-patterns.md`](references/power-user-vs-new-user-patterns.md).

---

## Common failure modes

Rapid-fire. Diagnoses in [`references/common-tour-failures.md`](references/common-tour-failures.md).

- "Tours show but feature adoption does not improve." Help may be visually present but not contextually relevant. Audit trigger logic.
- "Users disable tours globally." The system is annoying users. Audit frequency, dismissal, and over-triggering.
- "First-login tour completion is 80 percent; feature adoption is unchanged." One-and-done pattern; tour content not retained at moment of need.
- "Tooltips appear everywhere; nobody clicks them." Tooltip-spam; rebalance to contextual triggers.
- "Tour content references features we deprecated 6 months ago." Maintenance lapse.
- "Power users complain about pop-ups for things they already know." No power-user differentiation.
- "Tours work on desktop, break on mobile." Mobile UX of help system not tested.
- "Some teams ship tours; others don't bother. Inconsistent." No tour governance; some teams build, others ignore.
- "Tours triggered correctly but users do not act on the suggestion." Help content unclear or call-to-action absent.

---

## The framework: 12 considerations for product tour design

When designing or auditing an in-product tour system, walk these 12 considerations.

1. **The tour decision.** Are tours the right tool, or does documentation suffice?
2. **Contextual-when-needed, not tooltip-spam or one-and-done.** Help surfaces at moments of friction.
3. **Trigger logic sound.** Event-based primary, with time and state modulation.
4. **Tour architecture matches usage.** Library of micro-tours preferred for most products.
5. **Contextual placement non-intrusive.** Help findable when wanted, ignorable when not.
6. **Dismissal mechanics honest.** Standard close, click-outside dismiss, no auto-dismiss before reading.
7. **Completion tracking instrumented.** Per-user state, per-tour status.
8. **Re-trigger logic respectful.** Completed tours do not re-show; dismissed tours respected.
9. **Power-user vs new-user differentiation.** Help calibrated to user state.
10. **Mobile parity.** Help works on the devices the audience uses.
11. **Maintenance discipline.** Tours updated alongside product changes; quarterly audit.
12. **Adoption as success metric.** Not just tour completion; feature adoption is the metric that matters.

The output of the framework is a tour system that earns the user's attention by being absent until needed, surfaces help at moments of relevance, and produces feature adoption.

---

## Reference files

- [`references/tour-decision-criteria.md`](references/tour-decision-criteria.md) - When tours earn the build vs when documentation suffices.
- [`references/trigger-logic-patterns.md`](references/trigger-logic-patterns.md) - Event-based, time-based, state-based, combined triggers. The discipline that distinguishes useful triggers from noise.
- [`references/tour-architecture-patterns.md`](references/tour-architecture-patterns.md) - Single tour vs branched vs library of micro-tours. The architecture that fits how users actually explore.
- [`references/contextual-placement-patterns.md`](references/contextual-placement-patterns.md) - Tooltip, spotlight, sidebar, inline. Placement and visual design.
- [`references/completion-tracking-and-re-trigger.md`](references/completion-tracking-and-re-trigger.md) - Per-user state, re-trigger logic, the over-trigger and under-trigger traps.
- [`references/power-user-vs-new-user-patterns.md`](references/power-user-vs-new-user-patterns.md) - Differentiation signals and patterns. The over-helping and under-helping traps.
- [`references/dismissal-and-non-intrusion-patterns.md`](references/dismissal-and-non-intrusion-patterns.md) - Dismissal mechanics. The non-intrusion principle.
- [`references/tour-anti-patterns.md`](references/tour-anti-patterns.md) - The patterns that look like tours but degrade the product.
- [`references/common-tour-failures.md`](references/common-tour-failures.md) - 9+ failure patterns with diagnoses and cures.

---

## Closing: tours earn the user's attention by being absent until needed

The tour systems that work as compounding assets are the ones the user does not perceive as a tour system. Help surfaces at the moment of friction; disappears when the friction passes; never piles up as visual noise. The user encounters a feature for the first time, sees a brief contextual hint, takes the suggested action, and moves on. The system did its job; the user did not have to think about the system.

That is the bar. Below the bar are tooltip-spam (visual noise that users develop blindness to) and one-and-done (help invisible at the moment of need). Above the bar are contextual-when-needed systems where trigger logic, tour architecture, contextual placement, and re-trigger respect work together to make help feel ambient rather than imposed.

The discipline is in the design choices. The decision to build a tour system at all, or rely on documentation. The trigger logic that decides when help surfaces. The architecture that organizes micro-tours by feature and workflow. The placement and dismissal that make help non-intrusive. The completion tracking that prevents re-showing what users already know. The power-user differentiation that respects expertise. The maintenance cadence that keeps tours in sync with the product.

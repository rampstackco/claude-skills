---
name: onboarding-wizard-design
description: "Designing first-run product onboarding wizards that get users to the ah-ha moment without overwhelming them. Step architecture, progressive disclosure, escape hatches, completion incentives, drop-off measurement. Honest about tutorial-overload (dump everything upfront), skip-friendly-empty (skipped onboarding leads to abandoned product), and earned-progressive-disclosure (right things at the right moments) patterns. Triggers on onboarding wizard, product onboarding, first-run experience, signup flow, activation flow, FRX, time-to-value, ah-ha moment design. Also triggers when activation rates are low, when users skip onboarding and never return, when onboarding flows are being scoped for the first time, or when audience research shows users not finding key features."
category: growth-tooling
catalog_summary: "Designing first-run product onboarding wizards. Distinguishes tutorial-overload (dump everything upfront) from skip-friendly-empty (skipped onboarding leads to abandoned product) from earned-progressive-disclosure (right things at the right moments)"
display_order: 7
---

# Onboarding Wizard Design

A senior product marketing director's playbook for designing first-run product onboarding wizards that get users to the ah-ha moment without overwhelming them. Step architecture, progressive disclosure, escape hatches, completion incentives, drop-off measurement. The discipline of building an onboarding sequence the user actually completes.

Most product onboarding wizards fail in one of two ways. They cram every feature into a 12-step intro the user has not earned the patience for. Or they offer a "skip onboarding" button so prominent that users skip into an empty product with no context, and then churn the next day because they never found the value. The activation rate is the metric that matters, and most wizards are optimizing for the wrong thing.

The wizards that work do something different. Each step earns the user one step closer to value. The wizard surfaces the right thing at the right moment, not everything upfront. Skip exists but is balanced against staying engaged. The user reaches the ah-ha moment with a sense that the product respected their time.

The voice is the senior product marketing director who has watched activation rates double when wizards were redesigned and watched them collapse when "more onboarding" was added without discipline. Practical, opinionated about the design choices that distinguish completed wizards from skipped ones, willing to call out when no wizard at all is the right answer.

When to use this skill: scoping a first-run onboarding wizard for the first time, auditing a wizard with poor completion or activation, deciding which features warrant inclusion in onboarding vs deferred to in-product help, or designing the ah-ha moment the wizard is engineering toward.

---

## What this skill covers

This skill spans first-run product onboarding wizards. The growth-tooling distinctions:

- `multi-step-form-design` is pre-signup data capture (forms before the user has access). This skill is post-signup product onboarding. Different phase, different audience state.
- `interactive-product-tour` is contextual help WITHIN the product, surfacing across the lifecycle. This skill is the sequential first-run experience.
- `chatbot-flow-design` is conversational help. This skill is non-conversational sequential setup.
- **`onboarding-wizard-design` (this skill)** is the post-signup wizard's structure, ah-ha moment design, progressive disclosure, skip mechanics, drop-off measurement.
- `pm-spec-writing` is the spec for engineers building the wizard. This skill is about WHAT to build; pm-spec-writing is about communicating it.

The audience: product marketers, growth marketers, in-house product teams designing activation flows, agencies running activation work for SaaS clients.

Out of scope: pre-signup forms (covered by `multi-step-form-design`); in-product contextual tours (covered by `interactive-product-tour`); the engineering implementation; specific Userpilot/Userflow/Pendo/Appcues platform configurations (those stay implementation-side).

---

## The wizard decision: when wizards earn vs when contextual help suffices

Before designing the wizard, decide whether a wizard is the right tool.

**Wizards earn investment when:**

- The product has a meaningful setup step before value emerges. Connect a data source, invite a teammate, configure a workspace. Without setup, the product is empty; the wizard makes setup tractable.
- The ah-ha moment requires multiple actions in sequence. Single-action ah-ha moments (paste a URL, see a result) often work better with contextual prompts than with wizards.
- The audience expects guided onboarding. B2B SaaS with technical setup, enterprise software, configurable products. Some audiences (consumer, frictionless tools) reject wizard friction.
- The team can maintain the wizard. Wizards decay as the product evolves; without maintenance commitment, the wizard becomes a liability.

**Wizards do NOT earn investment when:**

- The product reaches value immediately. Single-input tools, simple consumer products. A wizard adds friction without lift.
- Contextual help would suffice. Tooltips, in-feature hints, and progressive in-product education sometimes serve better than upfront wizards.
- The audience expects no friction. Some audiences abandon at any wizard; meet them where they are.
- The team cannot maintain the wizard alongside product changes. Stale wizards point to deprecated features; users hit broken steps.

The decision is not "should we have an onboarding wizard"; it is "is the wizard the right tool for this specific product and audience."

Detail in [`references/wizard-decision-criteria.md`](references/wizard-decision-criteria.md).

---

## Tutorial-overload vs skip-friendly-empty vs earned-progressive-disclosure

The keystone framing.

**Tutorial-overload.** Every feature explained in a 12-step intro before the user has touched the product. Cognitive overload. Users skip if they can; abandon if they cannot. Cost: the wizard's design effort produces a sequence almost nobody completes; activation rate suffers because the user did not reach the value-giving moment.

**Skip-friendly-empty.** "Skip onboarding" button at every step, so prominent that users always take it. Users skip; arrive at an empty product with no context; churn within hours. Cost: activation rate falls off a cliff because users never set up the basics that make the product functional.

**Earned-progressive-disclosure.** Each step earns the user one step closer to value. The wizard surfaces the right thing at the right moment, not everything upfront. Skip exists but is friction-balanced against staying engaged (e.g., skip places the user in a partially-set-up state with clear callouts to complete setup later). Cost: design effort is significant; activation rate often climbs significantly as a result.

The litmus test. Watch a new user complete (or skip) the wizard. Did they reach a moment where the product visibly demonstrated value within their first session? If yes, the wizard is earned-progressive-disclosure. If they completed every step but never reached value, tutorial-overload. If they skipped and never returned, skip-friendly-empty.

---

## Step architecture: what belongs in each step, sequence logic

The structure that makes wizards actually work.

**The principle.** Each step should move the user one step closer to value. Steps that do not should be cut.

**Common step patterns.**

- **Welcome and orientation.** Quick context-setting, often skippable. Sets expectations for what the wizard will do.
- **Identity and account context.** Who are you, what's your role, what brought you here. Often used to personalize subsequent steps.
- **Critical setup step.** The one thing the product cannot work without (connect data source, invite teammates, set primary use case). This is often where wizards justify their existence.
- **First-action step.** Get the user to take a meaningful action that produces visible result. The ah-ha moment lives here or right after.
- **Configuration deferral.** Surface the things that can be set up later but are commonly needed; let the user defer with a clear path back.
- **Confirmation and next steps.** Recap what was set up; surface what to do next; route to in-product home.

**Step coherence test.** Each step should answer: did this step move the user closer to value? Steps that exist for completeness or feature-pride should be cut.

Detail in [`references/step-architecture-patterns.md`](references/step-architecture-patterns.md).

---

## The ah-ha moment design

What the wizard is actually trying to engineer.

**The principle.** The ah-ha moment is the moment the user feels "oh, this is what the product does for me." The wizard's structure should engineer toward that moment.

**Identifying the ah-ha moment.**

- It is the visible demonstration of value, not just feature explanation.
- It is action-tied, not knowledge-tied. The user did something and saw the result.
- It is single-shot. One clear moment, not a checklist of moments.
- It is honest. The user genuinely got value; not a contrived demo.

**Design implications.**

- The wizard's path should converge on the ah-ha moment. Steps that do not contribute should be deferred or cut.
- The ah-ah moment should appear within the user's first session, ideally within 5-10 minutes of signup. Longer time-to-value correlates with churn.
- The ah-ha moment differs by audience. The B2B admin's ah-ha moment differs from the end-user's. Wizards may need to differentiate.

**Common ah-ha moment patterns.**

- **First successful query/output.** The user ran something against their data and saw a useful result.
- **First meaningful collaboration moment.** The user shared something with a teammate and saw the response.
- **First saved configuration.** The user set up something they will return to.
- **First value-demonstrating insight.** The user saw a metric, recommendation, or pattern that surprised them.

Detail in [`references/ah-ha-moment-engineering.md`](references/ah-ha-moment-engineering.md).

---

## Progressive disclosure patterns

How to surface only what is needed at each step.

**The principle.** Show only the inputs, options, and information the user needs to complete the current step. Defer everything else to in-product help or later configuration.

**Pattern A: Default-heavy.** Each step has smart defaults. The user can accept or override. Most users accept; advanced users override. Reduces cognitive load.

**Pattern B: Required-now, optional-later.** Required fields surface in the wizard; optional configuration surfaces in-product after activation. The wizard stays focused.

**Pattern C: Expand-on-demand.** Sections collapsed by default; the user expands if interested. Rare; works when the user has agency to explore.

**Pattern D: Branching.** Different users see different steps based on earlier answers. Powerful but adds maintenance complexity.

The discipline. Each piece of information shown in the wizard must justify its inclusion. Decorative information adds friction; surface it later.

Detail in [`references/progressive-disclosure-patterns.md`](references/progressive-disclosure-patterns.md).

---

## Skip and resume mechanics

When users skip, where they land. When they resume, what they see.

**The skip principle.** Skip should never produce an empty product. If skipping is offered, the user must land in a state where they can still progress; the wizard's deferred steps must be retrievable.

**Skip patterns.**

- **Soft skip with context.** "Skip for now" deposits the user into a partially-set-up state with clear callouts to complete deferred setup.
- **Skip-and-defer.** Skipped steps are queued for later in-product prompts.
- **Skip-with-warning.** "Skipping setup will limit your experience to X. Continue?" Honest about consequences.
- **No skip.** For wizards that absolutely require completion (compliance forms, paid signups). Use sparingly.

**Resume patterns.**

- **Auto-resume on next login.** The user lands at the step they left.
- **Manual resume from in-product entry.** A persistent "Complete setup" surface that returns the user to the wizard.
- **Soft resume.** Wizard fades out as the user completes equivalent actions in-product naturally.

**The skip-friendly-empty failure.** Skip is too prominent and consequence-free; the user lands in an unconfigured product and has no path back. Activation collapses.

**The cure.** Skip is honest about consequences and offers a path back. The user who skips knows what they skipped.

Detail in [`references/skip-and-resume-mechanics.md`](references/skip-and-resume-mechanics.md).

---

## Drop-off measurement and remediation

Where users abandon the wizard, and how to fix it.

**Per-step instrumentation.** Track step start, step completion, step abandonment for every step. The metrics inform every other improvement.

**Common drop-off patterns.**

- **First-step drop-off.** User landed on the wizard, looked at it, left. Often signals the wizard's value proposition is not clear or the audience expected no wizard.
- **Mid-wizard drop-off.** User abandoned mid-process. Audit the specific step; field count, sensitive info, unclear progress.
- **Skip-everything drop-off.** User skipped every available step. Either the wizard is not earning its time or the skip is too prominent.

**Remediation patterns.**

- First-step drop-off: clarify the wizard's purpose; reduce upfront fields; consider whether the wizard is needed at all.
- Mid-wizard drop-off: audit the high-drop step; reduce friction; reconsider whether that step belongs in the wizard.
- Skip-everything drop-off: rebalance skip prominence; consider whether the wizard should be replaced with contextual prompts.

**The instrumentation requirement.** Without per-step tracking, drop-off remediation is guesswork. Set up tracking before launch.

Detail in [`references/drop-off-measurement-templates.md`](references/drop-off-measurement-templates.md).

---

## Wizard variations by user type

Different users may need different wizards.

**The admin vs end-user distinction.** Admins set up the workspace; end-users start using it. Wizards aimed at both fail both. Differentiated wizards serve each.

**The technical vs non-technical distinction.** Technical users skip explanations; non-technical users need them. The wizard's tone and depth should match.

**The size-of-team distinction.** Solo founders have different setup needs than 50-person teams. Wizards may branch.

**Differentiation patterns.**

- **Role-based branching.** First step asks role; subsequent steps adapt.
- **Use-case-based branching.** First step asks use case; wizard tailors.
- **Size-based branching.** Solo, team, enterprise paths differ.

**The over-differentiated trap.** Too many variants produce unmaintainable wizards. Most wizards work with 2-3 variants at most.

Detail in [`references/user-type-variation-patterns.md`](references/user-type-variation-patterns.md).

---

## Common failure modes

Rapid-fire. Diagnoses in [`references/common-onboarding-failures.md`](references/common-onboarding-failures.md).

- "Activation rate is low; completion rate is high." Wizard completed but did not engineer the ah-ha moment. Audit what users did after completing.
- "Skip rate is over 50 percent." Either the wizard is not earning its time or skip is too prominent. Audit both.
- "Users complete the wizard then abandon the product within 24 hours." Time-to-value too long; ah-ha moment not in first session.
- "Wizard works for new users; existing users hit broken steps." Wizard not maintained alongside product; deprecated features still in flow.
- "Different segments complete at very different rates." Audience-fit varies; consider role-based or use-case-based branching.
- "Mobile completion is half of desktop." Mobile UX of the wizard broken.
- "We added more onboarding steps; activation went down." Tutorial-overload pattern; more is not better.
- "Skip mechanics work but users do not return to complete setup." Skip-and-defer not working; in-product prompts to return are missing or ignored.
- "Wizard analytics broke after the last release." Instrumentation drift; track and refresh.

---

## The framework: 12 considerations for onboarding wizard design

When designing or auditing an onboarding wizard, walk these 12 considerations.

1. **The wizard decision.** Is a wizard the right tool, or do contextual prompts suffice?
2. **Earned-progressive-disclosure, not tutorial-overload or skip-friendly-empty.** Each step earns one step closer to value.
3. **Step architecture sound.** Each step moves the user closer to value; non-contributing steps cut.
4. **The ah-ha moment engineered.** Single visible value moment, action-tied, in the first session.
5. **Progressive disclosure applied.** Show only what is needed now; defer the rest.
6. **Skip mechanics honest.** Skip exists but does not produce an empty product.
7. **Resume mechanics work.** Skipped users have a path back; instrumented for follow-through.
8. **Drop-off measurement instrumented.** Per-step tracking from launch.
9. **User-type variations balanced.** 2-3 variants max; over-differentiation avoided.
10. **Mobile parity.** Wizard works on the devices the audience uses.
11. **Activation as success metric.** Not just completion rate; the metric is post-wizard product engagement.
12. **Maintenance discipline.** Wizard updated alongside product changes; quarterly audit.

The output of the framework is an onboarding wizard that gets users to the ah-ha moment, respects their time, and produces activation rates the team can defend.

---

## Reference files

- [`references/wizard-decision-criteria.md`](references/wizard-decision-criteria.md) - When wizards earn the build vs when contextual help suffices.
- [`references/step-architecture-patterns.md`](references/step-architecture-patterns.md) - What belongs in each step. Sequence logic. Step coherence test.
- [`references/ah-ha-moment-engineering.md`](references/ah-ha-moment-engineering.md) - Identifying the ah-ha moment; designing the wizard to converge on it.
- [`references/progressive-disclosure-patterns.md`](references/progressive-disclosure-patterns.md) - Default-heavy, required-now-optional-later, expand-on-demand, branching patterns.
- [`references/skip-and-resume-mechanics.md`](references/skip-and-resume-mechanics.md) - Skip patterns and resume patterns. The skip-friendly-empty failure.
- [`references/drop-off-measurement-templates.md`](references/drop-off-measurement-templates.md) - Per-step instrumentation. Common drop-off patterns and remediation.
- [`references/user-type-variation-patterns.md`](references/user-type-variation-patterns.md) - Admin vs end-user, technical vs non-technical, size-based branching.
- [`references/wizard-anti-patterns.md`](references/wizard-anti-patterns.md) - The patterns that look like onboarding but degrade activation.
- [`references/common-onboarding-failures.md`](references/common-onboarding-failures.md) - 9+ failure patterns with diagnoses and cures.

---

## Closing: wizards earn the user's first session

The onboarding wizards that work as compounding assets are the ones that get the user to value within their first session. Not because the wizard had every feature explained. Not because the wizard was skipped quickly. Because the wizard engineered the ah-ha moment, respected the user's time, and surfaced the right thing at the right moment.

That is the bar. Below the bar are tutorial-overload (everything upfront, nobody completes) and skip-friendly-empty (skip too prominent, nobody activates). Above the bar are earned-progressive-disclosure wizards where each step earns the user one step closer to value, skip is honest about consequences, and the activation metric reflects the wizard's actual job.

The discipline is in the design choices. The decision to build a wizard at all, or defer to contextual help. The step architecture that converges on the ah-ha moment. The progressive disclosure that surfaces the right thing at the right moment. The skip mechanics that protect the user from an empty product. The drop-off instrumentation that informs ongoing improvement. The maintenance cadence that keeps the wizard in sync with the product it represents.

When in doubt, ask: did the user reach the ah-ha moment in their first session, and did the wizard help or hinder that? If yes to the first and helped on the second, the wizard earned its build. If no to either, redesign.

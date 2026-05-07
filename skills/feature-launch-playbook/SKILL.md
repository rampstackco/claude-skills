---
name: feature-launch-playbook
description: "The operational playbook for launching a feature well. Positioning, internal alignment, customer comms, sales enablement, support readiness, rollout strategy, monitoring with pre-defined rollback triggers, post-launch measurement against spec hypotheses, and the discipline that distinguishes shipping from releasing from actually launching. Triggers on launch plan, feature launch, launch checklist, ship vs release, rollout strategy, gradual rollout, sales enablement, support readiness, launch announcement, post-launch measurement, launch failure, declared victory too early. Also triggers when planning a launch (any size, any segment), auditing an existing launch process, fixing the we shipped it but the metric did not move problem, or building a launch checklist for the team."
category: product
catalog_summary: "The operational discipline of launching a feature well: positioning, internal alignment, customer comms, sales enablement, support readiness, rollout strategy, monitoring, and post-launch measurement"
display_order: 10
---

# Feature Launch Playbook

A veteran PM-leader's playbook for launching features well, not just shipping them.

Most teams conflate shipping, releasing, and launching. Shipping means engineering work is complete. Releasing means users can access it, even if it is behind a flag at 1 percent. Launching is the discipline of positioning, internal alignment, customer comms, sales enablement, support readiness, rollout strategy, monitoring, and post-launch measurement that turns "feature exists" into "feature lands."

A feature that ships without launching costs you the same engineering investment but captures a fraction of the value. Sales does not know how to sell it. Support does not know how to help with it. Customers do not notice it. The metric you said you would move does not move because nobody knows the feature is there.

This skill is the operational playbook. It assumes you have already written the spec (`pm-spec-writing`), prioritized it onto the roadmap (`roadmap-planning`), instrumented it (`product-analytics-setup`), and possibly tested it (`experiment-design`). The launch is the next discipline: how to actually get the feature in front of the right users, with the right context, in a way that lets you measure whether it worked.

When to use this skill: planning a launch (any size, any segment), auditing an existing launch process, fixing the "we shipped it but the metric did not move" problem, or building a launch checklist for the team.

---

## What this skill is for

This skill spans the operational launch discipline. It composes with the rest of the Product skill suite.

- `pm-spec-writing` defines the launch hypotheses; this skill validates them.
- `roadmap-planning` provides the launch context (what came before, what comes next).
- `product-analytics-setup` is the instrumentation prerequisite; without it you cannot measure the launch.
- `experiment-design` and `data-warehouse-experimentation` provide the methodology for testing whether the launch worked.
- `feature-flagging` provides the rollout infrastructure this skill depends on.

This skill does not cover pricing decisions, brand campaigns, or full GTM strategy. Those need a marketing team partner; this is the PM operational playbook for the engineering and product side.

The audience is broad: every PM ships features, every PM has launched poorly at least once, every PM benefits from a checklist that stops the worst failure modes from recurring. The voice is veteran PM-leader to PM. Specific, opinionated, honest about what discipline matters at what stage.

---

## Ship vs release vs launch

The keystone distinction. Three definitions.

**Shipping** means engineering completes the work. Code is on production. No users can access it yet, or only internal users via a flag. The PR is merged and deployed.

**Releasing** means users can access it. Could be 1 percent rollout, could be 100 percent. The feature is "live" in some technical sense. The flag is on for at least one user.

**Launching** means positioning, internal alignment, customer comms, sales enablement, support readiness, rollout strategy, monitoring, and post-launch measurement are all in flight. The feature has been introduced to the people who would benefit from it, with the context they need to use it.

The pathology. PMs report "we shipped feature X" when what happened is engineering completed the work. The feature might be released to 1 percent of users with no announcement, no documentation, no sales enablement, no measurement plan. From a value-capture perspective, that is an unlaunched feature.

The discipline. Use precise vocabulary. "Engineering shipped on Tuesday. We are releasing to 25 percent on Thursday. We are launching publicly next month." The vocabulary forces honest accounting of what has and has not happened.

Most "feature failed" diagnoses turn out to be "feature was unlaunched." This skill is structured around the launch dimension because that is where most teams under-invest.

---

## Launch tiers

Not every feature needs the full playbook. Match the work to the feature.

**Tier 1 (full launch).** Net-new product, major feature reshaping the product narrative, pricing change, breaking change. Full playbook: positioning, all comms channels, sales enablement, customer success briefing, dedicated post-launch measurement, executive announcement.

**Tier 2 (focused launch).** Meaningful improvement that materially affects user value or competitive positioning. Subset of the playbook: in-app comms, blog post or release note, support readiness, rollout strategy, post-launch measurement.

**Tier 3 (release note).** Incremental improvement, bug fix made positive, polish. Minimal: changelog entry, release note, light monitoring.

The trap on either side.

- Treating every release as Tier 1 produces comms fatigue. Customers tune out the announcement firehose; your real Tier 1 launches lose signal in the noise.
- Treating every release as Tier 3 produces unlaunched features. The feature ships, the metric does not move, the team concludes "users do not want this" when the actual cause is "users were not told."

Match the tier to the feature. This skill primarily covers Tier 1 and Tier 2. Tier 3 is mostly the changelog discipline; the launch playbook applies but compressed to the changelog entry plus light monitoring.

Detail in [`references/launch-tier-decision.md`](references/launch-tier-decision.md).

---

## Pre-launch: positioning

Positioning answers: who is this for, what problem does it solve, why now, and what is the user-visible promise.

The positioning canvas. One page, filled out before any comms drafting.

- **Target user.** Segment, role, jobs-to-be-done. Specific enough that a sales rep could describe the customer profile in one sentence.
- **Problem it solves.** Specifically, in user words. Not "we improve productivity"; instead "the customer support manager who needs to triage 200 tickets a day cannot tell which are urgent without opening each one."
- **Current alternative.** What users do today without this. The status quo is the real competition.
- **User-visible promise.** One sentence. The promise the user will hear when they encounter the feature in the wild.
- **Proof points.** Three to five specific capabilities or outcomes. Concrete, not adjectives.
- **Anti-positioning.** What this is NOT, what it does not try to do. Prevents over-promising.

The most common positioning failure is a vague target user. "It is for PMs" is not a target. "It is for B2B SaaS PMs at companies with 50 to 500 customers who need to coordinate roadmap discussions across engineering and customer success" is a target. The specificity is what lets sales, marketing, and support speak the same language about who this is for.

Detail in [`references/positioning-canvas.md`](references/positioning-canvas.md).

---

## Pre-launch: internal alignment

Stakeholders who need to know before launch.

- **Engineering leadership.** Capacity for follow-ups, support escalations, post-launch fixes.
- **Sales leadership.** Revenue forecast updates, deal coaching, pipeline impact.
- **Customer success leadership.** Proactive customer notifications, deal saves at risk, expansion conversations.
- **Marketing leadership.** Paid spend coordination, blog calendar, social timing.
- **Support leadership.** Training, FAQ, escalation paths.
- **Executive sponsor.** Visibility, public messaging, investor or board reporting.

The discipline. A single internal launch brief, distributed two to four weeks before launch (Tier 1) or one week before (Tier 2). The brief contains a one-page summary, an FAQ, a decision log of choices already made, and the launch calendar. The brief should answer "what do I need to do differently because of this launch."

The most common internal alignment failure: launching without sales knowing. Sales finds out from a customer asking about it. Trust erodes for the next launch. The fix is the launch brief plus a sales-specific briefing one to two weeks before customer-facing launch.

Detail in [`references/internal-alignment-checklist.md`](references/internal-alignment-checklist.md).

---

## Pre-launch: customer comms plan

Channels and decision factors.

- **In-app.** Highest reach for active users; right for product-internal features. Tooltips, banners, modals.
- **Email (transactional or campaign).** High reach across active and inactive users; right for material changes that affect existing workflows.
- **Blog post.** SEO plus lead gen plus narrative; right for Tier 1 launches with external story.
- **Release notes.** Discoverable, archived, queryable; right for every Tier 2 and above. Often the canonical reference customers find later.
- **Social (LinkedIn, X, Bluesky).** Reach beyond existing customers; right when launch has external narrative or competitive angle.
- **Webinar or customer call.** Depth for enterprise customers; right for Tier 1 with material customer impact.
- **Sales-led briefing.** High-touch for top accounts; right when launch affects pricing, contracts, or strategic positioning.

For each channel: who drafts, who approves, what is the timing, what is the call to action.

The comms calendar pattern. A single document with all channels and dates, distributed in the internal launch brief. Prevents the "blog post went out before sales got the briefing" failure. Ordering typically goes: sales briefing first, support training second, customer success outreach to top accounts third, public comms fourth.

Detail in [`references/customer-comms-playbook.md`](references/customer-comms-playbook.md).

---

## Pre-launch: sales enablement (B2B)

For B2B products, sales enablement is not optional for Tier 1 and most Tier 2 launches. The deliverables.

- **One-page battlecard.** Positioning, target customer, top objections, proof points. Sales can read it in two minutes and pitch the feature in five.
- **Demo script and recorded demo.** A repeatable demo the rep can run with a customer; the recorded version is the fallback for reps who join after the launch.
- **Pricing change documentation** if applicable. Sales reps cannot answer pricing questions accurately without explicit guidance.
- **Deal coaching guide.** Which deals does this unblock, which does it complicate. Specific named accounts where appropriate.
- **Internal training session** live or recorded, with Q&A archived. Sales reps need the chance to ask questions before they take the feature to a customer.

The "shadow launch" failure. Feature ships, sales hears about it from product team Slack, no battlecard, sales reps either ignore it or misrepresent it to customers. Customers churn because the feature was promised in a way that did not match reality.

For B2C and PLG products, this section is mostly skipped. The user is the buyer; there is no sales motion. Note this explicitly so PMs in those contexts do not feel they are missing the discipline.

Detail in [`references/sales-enablement-template.md`](references/sales-enablement-template.md).

---

## Pre-launch: support readiness

Support is often the first to encounter the failure modes of a new feature. They need.

- **Training** live or recorded, with Q&A. The same content as the sales training adapted to support workflows.
- **FAQ document** covering known questions, known limitations, and known bugs at launch. The FAQ updates daily during the first week as new questions surface.
- **Escalation path** for issues that need engineering or PM. Named owners and turnaround time commitments.
- **Monitoring access** or a way to ask for it. Support reps should be able to verify whether a customer's issue is feature-specific.

The discipline. The support team's confusion is the test customer's confusion. If support does not understand the feature, neither will customers. Train support before customer-facing launch comms go out.

Detail in [`references/support-readiness-checklist.md`](references/support-readiness-checklist.md).

---

## Launch day: rollout strategy

Four common patterns matched to feature type.

**All-at-once (big bang).** Zero to 100 percent in a single deploy. Right for marketing-coordinated launches where the announcement IS the rollout. Risky for anything where bugs would affect a meaningful customer base. Use sparingly.

**Gradual percentage rollout.** 1 percent, then 10 percent, then 25 percent, then 50 percent, then 100 percent over hours or days, monitored at each step. Right for most feature launches; the default unless there is a reason to deviate.

**Flag-gated cohort rollout.** Targeted to specific user segments. Free tier first, then paid. Small accounts first, then enterprise. Right for features with cohort-specific risk profiles.

**Phased launch (multi-week).** Launch to a subset of users, regions, or customers; gather feedback; iterate; expand. Right for Tier 1 launches with high uncertainty about user reception.

The decision framework. Feature blast radius times confidence in correctness times external commitments.

- High blast radius plus low confidence plus no external commitment: phased.
- Low blast radius plus high confidence plus external launch date: all-at-once.
- The middle (most launches): gradual percentage rollout.

Detail in [`references/rollout-strategy-patterns.md`](references/rollout-strategy-patterns.md).

---

## Launch day: monitoring

Pre-launch, define what you will monitor and what alerts you. Common dimensions.

- **Error rates.** Overall plus feature-specific.
- **Latency.** Overall plus feature-specific.
- **Feature usage rate.** People who SHOULD use it actually do.
- **Funnel completion.** Users complete the new flow.
- **Support ticket volume.** Especially feature-specific tags.
- **Customer satisfaction signals.** NPS comments, feedback widget mentions.

Define the rollback trigger explicitly before launch. Examples.

- "Error rate above 1 percent sustained for 5 minutes triggers rollback."
- "Support tickets mentioning the feature exceed 50 in the first hour triggers escalation."
- "Funnel completion drops below 50 percent of pre-launch baseline for any cohort triggers paused rollout."

The "no rollback trigger" failure. Launch goes sideways. The team debates whether to roll back for an hour while the issue compounds. Pre-defined triggers remove the debate; the rule fires automatically and the team executes the rollback.

Detail in [`references/monitoring-readiness-checklist.md`](references/monitoring-readiness-checklist.md).

---

## Launch day: comms execution

The comms calendar from the customer comms section executes on launch day. Each channel has a clear owner, a clear time, and a clear sequence.

- In-app banner activates when rollout reaches X percent.
- Email sends after a 4-hour stability check.
- Blog post publishes at the time announced internally.
- Sales briefing happens one day before public comms.
- Support training happens one week before launch.

The "comms misfire" failure. Blog post auto-publishes at the scheduled time, but the rollout was paused two hours earlier due to an issue. Customers click through to a feature that is behind a flag for them. They lose trust; the launch story breaks.

The fix. Make external comms manually triggered, gated on a rollout health check. The comms timing in the calendar is the planned timing; the actual fire is conditional on the rollout passing the health check.

---

## Post-launch: measurement against spec hypotheses

The spec (per `pm-spec-writing`) should have stated explicit hypotheses about what the feature would change. The launch measurement plan validates or invalidates each.

Four measurement dimensions.

1. **Adoption.** Did the right users actually use it? The reach question. Is the feature visible to the target segment, and are they trying it.
2. **Engagement.** Did users who tried it come back? The stickiness question. First use is necessary but not sufficient.
3. **Outcome.** Did the metric the spec said this would move actually move? The effect question. The hypothesis the spec made.
4. **Side effects.** Did any other metric move that was not supposed to? The safety question. Sometimes the feature works but breaks something else.

Time horizons. Most launches need two to four weeks of post-launch data for engagement signals, four to eight weeks for outcome signals. Do not declare success or failure too early.

The "no measurement plan" failure. Feature ships; the team moves on; six months later nobody knows if it worked. The feature becomes maintenance debt; the team cannot decide whether to invest in it further.

Detail in [`references/post-launch-measurement-framework.md`](references/post-launch-measurement-framework.md).

---

## Post-launch: iteration and follow-ups

Within the first four weeks post-launch, expect.

- Bug discoveries that did not surface in QA or limited rollout.
- Usability issues that did not surface in user research.
- Adoption gaps in cohorts you did not expect to under-adopt.
- Feature requests for adjacent capabilities.

The discipline. Document every issue, triage weekly, prioritize fixes against the original measurement plan.

If adoption is below target, the question is. Is it a marketing problem (users do not know about the feature)? A usability problem (users try the feature and bounce)? A value problem (users try the feature and do not see value)? A wrong-segment problem (the target was not who we thought)?

Each diagnosis maps to a different fix.

- Marketing problem: more comms, repeat comms, sales reactivation.
- Usability problem: design or onboarding fix.
- Value problem: feature redesign or repositioning.
- Wrong-segment problem: re-target the comms to a different audience.

The "we declared victory" failure. The launch metric hits target in week 1 (often due to the launch announcement spike); the team moves on; the metric falls back to baseline by week 4. The launch was reported as successful but the feature did not actually land.

The fix. Declare success or failure based on a stable post-launch trend, not the launch-week spike. Most launches need at least a four-week stable trend before the success or failure call is reliable.

---

## Common failure modes

Twelve patterns recur across feature launches. Detail in [`references/common-launch-failures.md`](references/common-launch-failures.md).

- "We shipped it but nothing happened." Unlaunched. No comms plan, no internal alignment, no measurement.
- "Sales is confused and selling it wrong." No enablement. Battlecard, demo, training were skipped or rushed.
- "Support is overwhelmed." No training, no FAQ. Support is encountering the feature for the first time when customers ask.
- "We rolled out and immediately rolled back." No rollout strategy, no health check. The big-bang deploy hit production and broke.
- "The blog post went out but the feature is broken." Comms misfire. The comms were not gated on rollout health.
- "Adoption was great in week 1, now it is flat." Declared victory on the launch spike. The metric reverted to baseline.
- "We do not know if it worked." No measurement plan tied to spec hypotheses.
- "Customers say we did not tell them." Comms did not reach the right segments. Email went to active users only; inactive users were not notified.
- "Enterprise customers found out from their account manager three days late." No high-touch tier in comms. Top accounts deserve sales-led briefing before public comms.
- "Our metric moved but it was actually because of a different launch that week." No isolation. Cannot attribute the metric movement to this launch versus other concurrent changes.
- "We launched the wrong feature." Positioning unclear. Customers expected something different from what shipped; the gap between expectation and reality reads as a failed launch even though the feature works.
- "It worked but nobody knew about it internally." No internal alignment. Sales did not capitalize on the feature in deals; customer success did not save accounts that were churning over the gap this feature now closes.

---

## The framework: 12 considerations for a real launch

When planning a launch, walk these 12 considerations. Skipping any of them produces one of the failure modes above.

1. **Tier the launch.** Tier 1, Tier 2, or Tier 3. Match the effort to the feature.
2. **Position it.** Target user, problem, promise, proof points, anti-positioning.
3. **Align internally.** Single launch brief, distributed two to four weeks before launch.
4. **Plan customer comms.** Channel mix, calendar, owners, gates.
5. **Enable sales.** Battlecard, demo, training, deal coaching (B2B only).
6. **Ready support.** Training, FAQ, escalation paths, monitoring access.
7. **Pick a rollout strategy.** All-at-once, gradual, flag-gated, or phased.
8. **Define monitoring.** Metrics, alerts, rollback triggers. Pre-defined, not in-the-moment.
9. **Sequence comms execution.** Gated on health checks. Never auto-fire if the rollout is paused.
10. **Tie measurement to spec hypotheses.** Adoption, engagement, outcome, side effects.
11. **Iterate post-launch.** Weekly triage. Distinguish marketing, usability, value, and segment problems.
12. **Declare success or failure on a stable trend.** Not the launch-week spike.

The output of the framework is a launch plan document. The positioning canvas, the internal launch brief, the comms calendar, the rollout strategy with health-check gates, the monitoring spec with rollback triggers, and the post-launch measurement plan tied to the spec hypotheses. The plan is reviewed two weeks before launch; gaps are filled before the launch date.

---

## Reference files

- [`references/launch-tier-decision.md`](references/launch-tier-decision.md) - Tier 1, 2, 3 decision framework with worked examples.
- [`references/positioning-canvas.md`](references/positioning-canvas.md) - One-page positioning template with B2B SaaS, B2C, and developer feature examples.
- [`references/internal-alignment-checklist.md`](references/internal-alignment-checklist.md) - Stakeholders, brief structure, distribution timing by tier.
- [`references/customer-comms-playbook.md`](references/customer-comms-playbook.md) - Channels, calendar, owners, gates.
- [`references/sales-enablement-template.md`](references/sales-enablement-template.md) - Battlecard, demo, deal coaching, training (B2B). Skip note for B2C and PLG.
- [`references/support-readiness-checklist.md`](references/support-readiness-checklist.md) - Training, FAQ, escalation, monitoring access.
- [`references/rollout-strategy-patterns.md`](references/rollout-strategy-patterns.md) - Four patterns matched to feature types. Decision framework: blast radius times confidence times external commitments.
- [`references/monitoring-readiness-checklist.md`](references/monitoring-readiness-checklist.md) - Metrics dimensions, alert thresholds, pre-defined rollback triggers.
- [`references/post-launch-measurement-framework.md`](references/post-launch-measurement-framework.md) - Adoption, engagement, outcome, side effects. Time horizons. Tying back to spec hypotheses.
- [`references/common-launch-failures.md`](references/common-launch-failures.md) - Twelve failure patterns with diagnoses and fixes.

---

## Closing: most failed launches are unlaunched

When a feature "fails," the most common diagnosis is not that the feature was wrong. It is that the launch was incomplete. Sales did not know. Customers were not told. Support could not help. The metric did not move because the launch did not reach the people who would have moved it.

Before declaring a feature failed, audit the launch against this playbook. Half the time the feature was fine; the launch never happened.

The discipline of separating shipping from releasing from launching is the single most useful PM vocabulary upgrade. Use it explicitly. Use it in stand-ups, in roadmap reviews, in launch retrospectives. The team that uses precise language about what has happened catches unlaunched features before declaring them failed and reallocates the engineering investment toward features that would actually capture value.

When in doubt about whether a launch is ready, ask: is the launch brief written and distributed? Has sales seen the battlecard? Does support have the FAQ? Is the rollout strategy chosen and the rollback trigger defined? Are the comms gated on a health check? Is the measurement plan tied to the spec hypotheses?

If any of those answers is no, the launch is not ready. Delaying the launch by a week to close the gaps is cheaper than launching incomplete and capturing a fraction of the value the feature could have delivered.

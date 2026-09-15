# Rollout strategy patterns

Four rollout patterns matched to feature types. Decision framework: blast radius times confidence times external commitments.

The principle. The rollout is the mechanism by which users actually encounter the feature. The pattern depends on what would happen if the feature breaks, how confident the team is in correctness, and whether external comms are tied to a specific date.

---

## Pattern 1: all-at-once (big bang)

**Mechanism.** Zero to 100 percent of eligible users in a single deploy. No gradual rollout.

**Right for.**

- Marketing-coordinated launches where the announcement IS the rollout. The press is briefed for a specific date; the feature has to be live for everyone at that moment.
- Low-blast-radius features. The feature affects a small portion of the user experience; even if it breaks, the customer impact is limited.
- High-confidence releases. The feature has been tested thoroughly, used internally, validated with a beta cohort.

**Risky for.**

- High-traffic critical paths (checkout, login, primary navigation). Any bug affects a meaningful share of users immediately.
- Features without a clean rollback path. If the deploy breaks, recovery is hard.
- Features with cohort-specific risk (works for free users, breaks for enterprise). The cohort variance is not exposed before launch.

**Operational shape.** One deploy. Health check after deploy. Rollback path ready but rarely used. Monitoring tightens for 24 hours post-deploy.

---

## Pattern 2: gradual percentage rollout

**Mechanism.** 1 percent, then 10 percent, then 25 percent, then 50 percent, then 100 percent over hours or days. Health checks at each step.

**Right for.**

- Most feature launches. The default unless there is a reason to deviate.
- Features touching critical paths. The 1 percent rollout catches errors before they affect a meaningful share of users.
- Features with uncertain interaction effects. Other systems may behave differently when the feature is on; gradual rollout surfaces interactions safely.

**Risky for.**

- Marketing-coordinated launches with a fixed announcement date. The press writes about a feature that 90 percent of users do not have yet.

**Operational shape.**

- 1 percent to 10 percent: 4 to 24 hours. Watch error rates, latency, feature usage rate.
- 10 percent to 25 percent: 24 to 48 hours. Watch the same metrics plus support volume.
- 25 percent to 50 percent: 48 to 72 hours. Watch all metrics plus customer feedback.
- 50 percent to 100 percent: 24 to 72 hours.

The pace is configurable. Faster for low-risk features; slower for high-risk.

The rollback at any step. If a metric breaches a threshold, the rollout pauses. If the issue is severe, rollback to 0 percent. If the issue is minor, fix forward at the current percentage.

---

## Pattern 3: flag-gated cohort rollout

**Mechanism.** Targeted to specific user segments. Free tier first, then paid. Small accounts first, then enterprise. Specific named accounts first, then broad rollout.

**Right for.**

- Features with cohort-specific risk profiles. A pricing change affects existing customers differently from new customers; roll out to new customers first.
- Features that need cohort-specific configuration. Enterprise customers may need a setup step; roll out to them after they are configured.
- Features where the cost of a bad rollout varies by cohort. Bug in front of a Fortune 500 prospect costs more than a bug in front of a free-tier user.

**Operational shape.**

- The flag service controls which cohorts have the feature enabled.
- Cohorts are defined explicitly: account tier, account ID list, region, signup date range.
- Each cohort gets its own monitoring slice. Issues affecting one cohort do not pause the rollout to other cohorts.

**Risky for.**

- Features that interact across cohorts. If enterprise customers can see what free-tier customers create, a partial cohort rollout exposes a feature inconsistency that breaks workflows.

---

## Pattern 4: phased launch (multi-week)

**Mechanism.** Launch to a subset of users, regions, or customers; gather feedback; iterate; expand. Multi-week timeline.

**Right for.**

- Tier 1 launches with high uncertainty about user reception. Pricing changes often launch this way.
- Major UX redesigns. The team needs to learn what users do with the new design before broader rollout.
- Features that depend on user behavior change. The team needs to see whether users adopt before declaring readiness.

**Operational shape.**

- Phase 1: limited rollout (5 to 10 percent of eligible users). 1 to 2 weeks. Heavy feedback collection.
- Phase 2: iteration based on phase 1 feedback. Could be days; could be weeks.
- Phase 3: expanded rollout (25 to 50 percent). 1 to 2 weeks.
- Phase 4: general availability.

The total timeline is 4 to 8 weeks for a typical phased launch. Longer for major UX changes; shorter for feature additions.

**Risky for.**

- Features that need to be all-on for users to encounter them naturally. A change to the homepage hero needs to be either visible or not; phased rollout creates inconsistent experiences across users.

---

## The decision framework

Three factors. Pick the rollout that matches.

### Factor 1: blast radius

What happens if the feature breaks for a meaningful share of users?

- **Low.** Optional new tool that users opt into. Bug affects only users who tried the new tool.
- **Medium.** New surface in an existing flow. Bug affects users mid-flow but not users on other paths.
- **High.** Critical path change. Bug affects most active users immediately.

### Factor 2: confidence in correctness

How confident is the team that the feature works.

- **Low.** First time the team has built this kind of feature. Edge cases unknown.
- **Medium.** The team has built similar features before. Most edge cases anticipated.
- **High.** Iterative refinement of an existing feature. Behavior well-understood.

### Factor 3: external commitments

Is the launch date tied to external press, partner coordination, or a public commitment.

- **None.** Internal team knows the rough timeline; no external coordination.
- **Soft.** Marketing has scheduled comms but the date can shift by a few days.
- **Hard.** Press is briefed for a specific day. Partner is coordinating launches. The date is fixed.

### The decision matrix

| Blast radius | Confidence | External commitment | Recommended pattern |
|---|---|---|---|
| Low | High | Hard | All-at-once |
| Low | High | Soft or none | All-at-once or gradual |
| Low | Medium | Any | Gradual |
| Low | Low | Any | Gradual or phased |
| Medium | High | Hard | Gradual fast |
| Medium | High | Soft or none | Gradual |
| Medium | Medium | Any | Gradual |
| Medium | Low | Any | Phased |
| High | High | Any | Gradual slow |
| High | Medium | Any | Gradual or flag-gated |
| High | Low | Any | Phased |

The defaults. Most launches use gradual percentage rollout. The other patterns are for specific situations.

---

## Cohort-specific rollout sequencing

When using flag-gated cohort rollout, the sequence matters.

**Internal users first.** Eat your own dog food. Catch the obvious issues before any external user sees them.

**Free or trial users next.** Lower-stakes; if the feature has issues, the cost of a bad experience is lower than for paying customers.

**Self-service paid users.** Customers who use the product without a sales rep. They will encounter the feature naturally; their feedback is high-quality.

**Top accounts last (with sales-led briefing first).** Top accounts hear about the feature from their account executive before encountering it. By the time they have access, the feature is stable.

Reverse the sequence in specific cases.

- A feature designed specifically for enterprise customers should roll out to those customers first; the feedback is the design feedback.
- A feature gated by configuration that only enterprise customers complete should roll out to them first; otherwise the feature is invisible to the cohort that can use it.

---

## What "rollback trigger" means

A pre-defined rule that determines when the team rolls back without further debate.

Examples.

- Error rate above 1 percent sustained for 5 minutes.
- Latency above the pre-launch P95 by 50 percent for 10 minutes.
- Funnel completion drops below 50 percent of pre-launch baseline for any cohort.
- Support tickets mentioning the feature exceed 50 in the first hour.

The trigger fires automatically; the team executes the rollback without re-litigating whether to do it.

The "no rollback trigger" failure. Launch goes sideways. The team debates whether to roll back for an hour while the issue compounds. Pre-defined triggers remove the debate.

The discipline. Define the trigger before launch. Write it down. Rehearse the rollback. Make the trigger automatic where possible (alerting plus on-call paging); make the rollback execution one command, not a multi-step process.

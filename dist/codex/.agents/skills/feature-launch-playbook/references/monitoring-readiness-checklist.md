# Monitoring readiness checklist

Metrics dimensions, alert thresholds, pre-defined rollback triggers. The "no rollback trigger" failure mode.

The principle. Monitoring catches launch issues before they compound into customer pain. The discipline is defining what to watch and what to do BEFORE launch, so the team executes rather than debates during the launch window.

---

## What to monitor

Six dimensions for most launches.

### 1. Error rates

- **Overall error rate.** The baseline. Has the deploy increased errors across the application.
- **Feature-specific error rate.** Errors in code paths the new feature touches. Often the first signal of a feature-specific bug.
- **Per-cohort error rate.** Errors broken down by user segment, plan, region. Catches cohort-specific bugs.

### 2. Latency

- **Overall P50, P95, P99.** Has the deploy slowed the application.
- **Feature-specific latency.** New code paths often have unoptimized queries; latency tracking catches them.
- **Database query latency.** New features often add new queries; database load can spike.

### 3. Feature usage rate

- **Reach.** Of users in the rollout cohort, how many actually trigger the feature within their first session post-rollout.
- **Frequency.** Of users who used the feature once, how many used it again.
- **The expected vs actual gap.** Pre-launch projections vs actual numbers. Large gaps in either direction need investigation.

### 4. Funnel completion

- **End-to-end completion of the workflow the feature is part of.** Did users complete the flow at the same rate as pre-launch.
- **Step-by-step drop-off.** Where in the flow are users abandoning. Compare pre-launch to post-launch step-by-step.
- **Per-cohort completion.** Cohort-specific drop-off can hide in aggregate metrics.

### 5. Support ticket volume

- **Overall ticket volume.** Has the team's support load increased.
- **Feature-tagged tickets.** Tickets where the customer mentions the feature.
- **Ticket sentiment.** Frustrated tickets vs informational tickets vs positive tickets.

### 6. Customer satisfaction signals

- **NPS comments.** Mentions of the feature in NPS responses.
- **Feedback widget.** In-product feedback explicitly about the feature.
- **Social mentions.** Twitter or LinkedIn posts about the launch.

---

## Alert thresholds

For each dimension, pre-defined thresholds that fire alerts.

### Error rates

- **Yellow.** Overall error rate up by more than 25 percent vs pre-launch baseline. Investigate without escalation.
- **Orange.** Overall error rate up by more than 50 percent vs baseline. Escalate to PM and engineering on-call.
- **Red.** Overall error rate above 1 percent absolute. Trigger rollback.

### Latency

- **Yellow.** P95 up by 25 percent vs baseline. Investigate.
- **Orange.** P95 up by 50 percent. Escalate.
- **Red.** P95 doubled or worse. Trigger rollback if sustained for 10 minutes.

### Feature usage rate

- **Yellow.** Below 50 percent of pre-launch projection. Investigate (probably comms or discovery problem).
- **Orange.** Below 25 percent of projection. Escalate; the launch may not be reaching users.
- **Red.** Near zero usage. Likely an instrumentation bug; the feature is not firing or the metric is not capturing.

### Funnel completion

- **Yellow.** Down by 10 percent from pre-launch baseline. Investigate.
- **Orange.** Down by 25 percent. Escalate; the feature may be breaking the flow.
- **Red.** Down by 50 percent for any cohort. Trigger rollback for that cohort or pause the rollout.

### Support volume

- **Yellow.** Feature-tagged tickets exceed 10 in the first hour. Investigate.
- **Orange.** Feature-tagged tickets exceed 50 in the first hour. Escalate.
- **Red.** Feature-tagged tickets exceed 100 in the first hour. Trigger rollback or pause; the feature has a real problem.

The numbers above are illustrative. Calibrate to the team's actual support volume and the feature's expected reach.

---

## Pre-defined rollback triggers

A rollback trigger is a rule that fires automatically. The team executes the rollback without re-litigating whether to.

### Examples

**For a feature touching the checkout flow.**

- Error rate above 1 percent sustained for 5 minutes.
- Funnel completion drops below 50 percent of pre-launch baseline.
- Stripe API errors increase by 100 percent.

**For a new internal tool.**

- Error rate above 5 percent sustained for 5 minutes (higher tolerance because internal users provide more context).
- Adoption near zero after 24 hours (instrumentation bug or feature not deployed).

**For a pricing change.**

- Subscription cancellation rate increase by 50 percent in the first 48 hours.
- Customer service contact rate about pricing increase by 200 percent.
- Revenue forecast adjustment indicates a 10 percent quarterly miss.

The pattern. Each rollback trigger names a specific metric, a specific threshold, and a specific time window. The team rehearses what to do when the trigger fires.

### What rollback means

Rollback can be one of several things.

- **Full rollback.** Flag off, code reverted, user-visible state returns to pre-launch.
- **Pause at current rollout percentage.** Flag stays on for users who already have it; no new users get the feature.
- **Cohort-specific rollback.** Flag off for the cohort showing issues; flag on for cohorts that look healthy.
- **Fix-forward.** A small fix is deployed; rollout continues at the previous percentage. Risky; only use when the fix is high-confidence.

The team should know which rollback path applies to which trigger before launch.

---

## The on-call rotation

For Tier 1 launches, the on-call rotation should include.

- **Primary engineering on-call.** Standard rotation. Receives alerts, executes rollbacks.
- **Secondary engineering on-call.** Backup if primary is unreachable.
- **PM contact.** The PM who owns the launch is reachable during the launch window.
- **Support escalation contact.** The support lead responsible for routing customer issues to the right team.
- **Marketing contact.** For comms decisions if the rollout pauses.

Reachability hours for Tier 1 launches: 24/7 for the first 48 hours, business hours plus on-call after that.

---

## The "no rollback trigger" failure

The pattern.

- Launch goes sideways. Error rate is up; support volume is high; engineering is investigating.
- The team debates whether to roll back. The debate takes an hour.
- During the debate hour, more users encounter the issue. Support tickets pile up. The press notices. Trust erodes.
- The team eventually rolls back, but the recovery is now harder than it would have been one hour earlier.

The fix. Pre-define the rollback triggers. Write them down. Get team agreement before launch. When a trigger fires, execute the rollback. Debate the appropriateness of the trigger after the rollback, not during the incident.

The discipline. The cost of a wrong rollback (the team rolls back when the feature was actually fine) is small (a paused launch and a re-rollout). The cost of a delayed rollback (the team debates while the issue compounds) is large (customer impact, reputation, recovery cost). Bias toward fast rollback.

---

## Post-rollback retrospective

After any rollback, hold a retrospective within 48 hours.

Agenda.

1. What was the trigger that fired.
2. What was the actual problem.
3. Was the rollback the right call (almost always yes; even false positives that catch nothing teach the team about the system).
4. What is the path to re-launch (fix the bug, test it, validate the test, schedule a new rollout).
5. What did we learn that updates the next launch's monitoring.

The retrospective is not a blame session. It is an investment in the next launch's monitoring quality.

---

## Health check before each rollout step

For gradual percentage rollouts, define a health check that gates each step.

The health check passes when.

- All Yellow thresholds clear for the prior percentage step's full duration.
- No Orange or Red alerts in the prior step.
- Support volume stable.
- Customer feedback (NPS, social) neutral or positive.

The health check fails when any of the above conditions does not hold. The rollout pauses at the current step until the health check passes.

The pattern. The rollout proceeds when the system is healthy; it does not proceed on a schedule. Schedule-driven rollouts that ignore health checks are how launches go sideways.

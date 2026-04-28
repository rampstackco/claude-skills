---
name: monitoring-and-alerting
description: "Design and run a monitoring system for a website or web app. Use this skill when setting up uptime checks, defining SLOs, configuring error tracking, choosing what to alert on, designing on-call rotations, or fixing alert fatigue. Triggers on monitoring, alerts, uptime, SLO, SLA, error rate, on-call, pager, alert fatigue, observability, dashboards, what should we monitor. Also triggers when an incident reveals a gap in monitoring."
---

# Monitoring and Alerting

Decide what to watch, what to alert on, and how to make sure the right person finds out when things break.

---

## When to use

- Setting up monitoring on a new site or service
- Defining SLOs (service level objectives) and error budgets
- Choosing which alerts page someone vs which go to a quiet channel
- Designing or fixing on-call rotation
- Diagnosing alert fatigue
- Filling monitoring gaps revealed by an incident
- Migrating monitoring vendors

## When NOT to use

- Responding to an active incident (use `incident-response`)
- Writing the post-mortem (use `after-action-report`)
- Designing analytics dashboards for product metrics (use `analytics-strategy`)
- Performance optimization itself (use `performance-optimization`)

---

## Required inputs

- The system you're monitoring (URLs, services, dependencies)
- Existing monitoring tools (uptime, errors, logs, APM)
- Business hours and team timezone(s)
- Who is on-call or available for incidents
- Existing SLOs or success metrics, if any

---

## The framework: 4 layers

Monitoring works in layers. Skip a layer and you'll miss a class of problems.

### Layer 1: Availability

Is the site up? The simplest, most important layer.

- HTTP checks from multiple regions (every 1-5 minutes)
- DNS resolution checks
- Certificate expiration checks
- Status code checks (alert on 5xx, not just timeout)

Threshold: any sustained downtime (more than 2 consecutive failed checks) pages.

### Layer 2: Correctness

The site is up, but is it serving the right thing?

- Synthetic checks (a script that loads the homepage, clicks a button, validates expected text)
- Critical user journeys (signup, checkout, search)
- Content presence checks (homepage hasn't gone blank)
- API contract checks (response shape and key fields are present)

Threshold: failures of critical-path synthetics page. Non-critical page-level synthetics alert during business hours only.

### Layer 3: Performance

The site is up and correct, but is it fast enough?

- Core Web Vitals (LCP, INP, CLS) from real users (RUM)
- Synthetic performance (Lighthouse, WebPageTest, custom)
- API response times (p50, p95, p99)
- Database query times for slow queries
- Dependency response times (third-party APIs)

Threshold: regressions from baseline (e.g., p95 doubled in 5 minutes). Don't alert on absolute thresholds without baselines.

### Layer 4: Errors and anomalies

The site is up, correct, and fast for most, but errors are happening.

- Error rate (% of requests returning 5xx)
- Client-side error rate (uncaught JS exceptions)
- Log error volume (unexpected spikes)
- Anomaly detection (traffic falling off a cliff)
- Background job failures
- Queue depth

Threshold: rate-based, not count-based. "Error rate above 1% for 5 minutes" beats "more than 100 errors per minute."

---

## SLOs and error budgets

A Service Level Objective is the target for reliability. Common form: "99.9% of homepage requests succeed in under 2 seconds, measured over 30 days."

The components:
- **The thing you're measuring** (homepage requests)
- **The success criterion** (returns 2xx in under 2 seconds)
- **The target** (99.9% of them)
- **The window** (over 30 days)

The error budget is the inverse: 0.1% of requests can fail. If you've used the whole budget, slow down on risky changes.

### Picking SLOs

Don't aim for 100%. Don't aim for "five nines" (99.999%) unless you really need it. Each nine costs an order of magnitude more.

| SLO | Allowed downtime per month |
|---|---|
| 99% | 7 hours, 18 minutes |
| 99.9% | 43 minutes |
| 99.95% | 21 minutes |
| 99.99% | 4 minutes, 22 seconds |
| 99.999% | 26 seconds |

For most marketing sites, 99.9% is plenty. For SaaS, 99.95% is reasonable. Anything higher needs significant infrastructure investment.

### Using error budgets

When the budget is healthy, ship aggressively. When the budget is half-spent, slow down. When the budget is exhausted, freeze risky changes until reliability recovers.

This is what makes SLOs useful: they create a feedback loop between reliability and velocity.

---

## Workflow

### Step 1: Inventory what's already monitored

What tools are in place? What checks exist? What dashboards? What alerts?

Many teams have a tangle of half-configured tools. The first job is the inventory.

### Step 2: Map the system

Draw the architecture. Front-end, back-end, database, third-party APIs, queues, workers. Each box is a candidate for monitoring.

For each box, ask:
- What does "up" mean?
- What does "correct" mean?
- What does "fast" mean?
- What's the most common failure mode?

### Step 3: Define the SLOs

Pick 3-5 SLOs. They should be:
- Tied to user-visible behavior (not internal metrics)
- Achievable with current infrastructure
- Measured automatically
- Reviewed at least quarterly

### Step 4: Set up checks across the 4 layers

For each box, configure checks at each layer. Some boxes won't have all four; that's fine.

| Box | Availability | Correctness | Performance | Errors |
|---|---|---|---|---|
| Homepage | HTTP check | Synthetic | LCP/INP | JS errors |
| Login API | HTTP check | Synthetic flow | p95 latency | 5xx rate |

### Step 5: Decide what pages and what doesn't

Three tiers:

1. **Page (wakes someone up):** site down, critical flow broken, error rate spike, security incident.
2. **Notify (during business hours):** non-critical synthetic failure, performance regression, slow query, dependency degradation.
3. **Log (no notification):** anomalies for later review, low-priority warnings, info-level events.

Anything in tier 1 must be:
- Actionable (the on-call can do something about it)
- Important (it represents real impact)
- Rare (less than 1-2 per week is the goal)

If tier 1 alerts fire frequently, alert fatigue sets in. People stop responding.

### Step 6: Configure routing

Where do alerts go?

- Tier 1: paging system (e.g., PagerDuty, Opsgenie). Direct to on-call.
- Tier 2: chat channel (Slack, Teams). Tagged with the area.
- Tier 3: dashboard or log only.

Each tier should have a documented escalation path. If the on-call doesn't ack within 5-15 minutes, escalate.

### Step 7: Build dashboards

One dashboard per audience:

- **Real-time ops dashboard:** current health, recent alerts, error rates, throughput
- **SLO dashboard:** SLO status and error budget consumption
- **Per-service dashboards:** detail for individual services or pages
- **Executive dashboard:** uptime over weeks/months, key business metrics

Dashboards are different from alerts. Alerts say "look now." Dashboards say "here's what's happening."

### Step 8: Run an alert audit

Every quarter, audit:
- Which alerts fired? Were they actionable?
- Which alerts didn't fire when they should have?
- Are any alerts noisy (more than once a week, low actionability)?
- Are runbooks up to date?
- Have SLOs been met? Any consistently breached?

Tune the system. Monitoring drifts without active maintenance.

---

## Failure patterns

**Alert on cause, not symptom.** "CPU is high" is a cause. "Users are slow" is a symptom. Alert on symptoms; investigate causes.

**Alert without a runbook.** If the on-call doesn't know what to do, the alert is useless. Every paging alert needs a runbook (even a one-line one).

**No baselines for "normal."** Alerting on "more than 100 errors per minute" sounds reasonable but a busy day might exceed that without anything being wrong. Use rate-based and anomaly-based alerts.

**Single-region monitoring.** Your monitoring service in the same region as your site means you'll miss regional outages and you'll get woken up when monitoring itself has issues.

**Monitoring the monitoring.** Or rather, not. If your alerting platform is down, who tells you? Most paging services offer their own status feeds. Subscribe.

**Too many tiers of severity.** P0/P1/P2/P3/P4 with different SLAs becomes a sorting exercise. Three tiers (page, notify, log) is plenty.

**Synthetics that don't match reality.** A synthetic that hits the homepage every minute tests "is the homepage up." It doesn't test "is the actual user flow working." Build synthetics for the journeys that matter.

**Static thresholds that never get tuned.** Traffic grows, behavior changes, thresholds set last year are wrong. Review thresholds quarterly.

**On-call rotation with no handoffs.** Each new on-call has to figure out the system. Document. Run weekly handoff meetings or async updates.

**Pager fatigue.** If on-call is paged more than once or twice a week, something is wrong. Audit the alerts. Reduce, tune, or fix the underlying issues.

---

## Output format

A monitoring plan includes:

- **System map:** what's being monitored
- **SLOs:** the 3-5 reliability targets
- **Checks per layer:** availability, correctness, performance, errors
- **Alert tiering:** what pages, what notifies, what logs
- **Routing:** where alerts go, escalation paths
- **Dashboards:** what audiences see
- **Runbooks:** linked from each paging alert
- **Audit cadence:** when this gets reviewed

---

## Reference files

- `references/slo-design-guide.md`: Detailed walkthrough of writing SLOs, error budget policies, and common SLO mistakes for web services.

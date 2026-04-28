---
name: analytics-strategy
description: "Design measurement frameworks including event taxonomy, KPI hierarchy, dashboard architecture, attribution models, and analytics implementation strategy. Use this skill whenever the user wants to plan analytics, design dashboards, build event taxonomies, define KPIs, set up tracking, or audit existing measurement. Triggers on analytics strategy, measurement plan, event taxonomy, tracking plan, KPI framework, dashboard design, north star metric, attribution model, conversion tracking, GA4 setup, Mixpanel setup, analytics audit. Also triggers when the user has data but no clear way to use it, or wants to make decisions but doesn't know what to track."
---

# Analytics Strategy

Design measurement frameworks that produce decisions, not just dashboards. Stack-agnostic. Tool-agnostic.

This skill is for measurement planning. For conversion optimization, use `cro-optimization`. For SEO measurement specifically, use `seo-onpage` and adjacent SEO skills.

---

## When to use

- Setting up analytics on a new product or site
- Auditing existing analytics setup
- Designing dashboards for a team or business
- Defining KPIs and a north star metric
- Building event taxonomies for product analytics
- Designing attribution models for marketing
- Translating business questions into measurement plans

## When NOT to use

- Conversion testing or optimization (use `cro-optimization`)
- SEO performance measurement (use SEO skills)
- Pure data infrastructure decisions (different domain)

---

## Required inputs

- The business or product context (what does success look like)
- The audience for the analytics (who needs to make what decisions)
- The current measurement state (existing tools, tracking, gaps)
- The questions the team needs to answer

---

## The framework: 4 layers

A complete measurement strategy covers all four. Each layer feeds the next.

### 1. North star and KPI hierarchy

The single metric that captures the most important outcome, plus the supporting metrics.

**North star metric:**

- One metric. Singular.
- Captures customer-perceived value.
- Leads to revenue, but isn't revenue itself (revenue is too far downstream).
- Examples: weekly active users, completed jobs, revenue-generating sessions, hours of value delivered.

**Underneath the north star, the KPI hierarchy:**

```
North star metric
├── Acquisition KPI (how new users enter)
├── Activation KPI (when new users get value)
├── Engagement KPI (how often users return)
├── Retention KPI (how many stick over time)
└── Monetization KPI (how value translates to revenue)
```

This is the "AARRR" or "pirate metrics" framework. It works because it covers the full lifecycle.

### 2. Event taxonomy

The vocabulary the product uses to describe what users do.

**Event design principles:**

- **Verb + noun.** `signed_up`, `created_project`, `completed_checkout`. Past tense, snake_case.
- **One event per discrete action.** Not "interacted_with_modal" - too vague. Specifically `opened_modal_X`, `closed_modal_X`, `confirmed_in_modal_X`.
- **Properties capture context.** Each event has properties (key-value pairs) for context. `signed_up` has properties like `signup_method`, `referrer`, `plan`.
- **Standardize property names.** `user_id` everywhere, not `userId` here and `id` there.
- **Document everything.** A tracking plan that lives nowhere is a tracking plan no one follows.

**Event coverage:**

- All key user actions tracked
- All conversion points tracked
- All errors tracked
- All page views tracked (with consistent properties)
- All button clicks that matter (not all button clicks - that's noise)

**Anti-patterns:**

- 500+ events with no documentation
- Inconsistent naming (`buttonClicked`, `Button Clicked`, `clicked_button`)
- Property keys that vary across events
- Events fired client-side that should be server-side (and vice versa)
- PII in event properties (privacy issue and tooling issue)

### 3. Dashboards and reports

The interface between data and decisions.

**Dashboard design principles:**

- **One audience per dashboard.** Executive dashboard != product team dashboard. Different metrics, different cadence.
- **One question per chart.** A chart should answer one question, not three.
- **Annotations matter.** Note launches, experiments, holidays, outages. A spike means nothing without context.
- **Context comparisons.** "10,000 signups this month" - compared to what? Last month, last year, target?
- **Lead with the action.** What does this dashboard help someone decide?

**Common dashboard types:**

| Dashboard | Audience | Metrics | Cadence |
|---|---|---|---|
| Executive | Leadership | North star, top 3 KPIs, big-picture trends | Weekly review |
| Product | Product team | Funnel metrics, feature adoption, retention | Daily / weekly |
| Marketing | Marketing team | Acquisition by channel, CAC, attribution | Daily / weekly |
| Operations | Ops / on-call | Performance, errors, capacity | Real-time |
| Custom (per team) | Specific team | Their specific KPIs | Their cadence |

### 4. Attribution and segmentation

How to connect cause and effect.

**Attribution models:**

- **First-touch.** Credit the first interaction. Useful for awareness understanding.
- **Last-touch.** Credit the final interaction before conversion. Default in many tools, often misleading.
- **Linear.** Spread credit equally across touches. Avoids over-crediting any single channel.
- **Time-decay.** Recent touches get more credit. Reasonable middle ground.
- **Position-based.** First and last get more credit, middle touches less.
- **Data-driven (algorithmic).** Tools like Google Analytics 4 use ML. Black box but increasingly the default.

For most businesses: pick one primary attribution model, use multiple secondary models for validation.

**Segmentation principles:**

- Segment by what causes different behavior, not by what's easy to track
- Useful segments: source/channel, plan tier, geography, device, cohort (signup date)
- Less useful: demographic guesses without behavioral validation

---

## The tracking plan document

Output of the analytics strategy. A living document.

**Structure:**

1. **Goals and KPIs.** Business objectives, north star, KPI hierarchy.
2. **Event catalog.** Every event, with properties, when fired, why tracked.
3. **User properties.** Persistent attributes (plan, signup_date, role).
4. **Page taxonomy.** Page categories, page properties.
5. **Naming conventions.** Snake_case, verb_noun, etc.
6. **Implementation notes.** Client-side vs server-side, SDK details, sampling.
7. **Privacy and compliance.** PII rules, consent handling, data retention.
8. **Governance.** Who can add events, review process, change log.

---

## Workflow

1. **Define the questions.** What does the team need to answer? Working backward from questions to metrics works better than starting from metrics.
2. **Define the north star.** One metric. Tested against the criteria above.
3. **Build the KPI hierarchy.** Acquisition, activation, engagement, retention, monetization.
4. **Audit existing tracking.** What's there? What's broken? What's missing?
5. **Design the event taxonomy.** Cover the user journey. Document everything.
6. **Implement with care.** Test each event. Verify properties. Catch issues in staging.
7. **Build dashboards.** One per audience. Lead with action.
8. **Establish review cadence.** Weekly business review, monthly KPI review, quarterly strategy review.
9. **Govern.** Who adds events, who reviews, how changes propagate.

---

## Failure patterns

- **Tracking everything.** Noise overwhelms signal.
- **Tracking nothing strategic.** Page views and that's it. Cannot answer real questions.
- **No documentation.** Tracking plan lives in someone's head.
- **Inconsistent naming.** Same concept, three names. Reports become detective work.
- **Events fired but never reviewed.** Tracking debt accumulates.
- **Dashboards no one looks at.** Built for vanity, not decisions.
- **Single attribution model treated as truth.** All models lie. Some lie usefully.
- **PII in events.** Compliance and tooling problems.
- **Client-side only.** Critical business events should be server-side too. Ad blockers, network issues, edge cases lose client-side events.
- **No connection to business outcomes.** Metrics exist in a silo, never connected to revenue, retention, or strategic decisions.

---

## Output format

Default output: a markdown tracking plan at `analytics-tracking-plan.md` plus a dashboard inventory.

Tracking plan structure:

```markdown
# Tracking Plan

## North star metric
[Definition, calculation, target]

## KPI hierarchy
[Each KPI with definition, calculation, owner]

## Event catalog
| Event | When fired | Properties | Owner | Status |
|---|---|---|---|---|
| user_signed_up | After successful signup form submit | source, plan, referrer | Marketing | Live |
| project_created | When user clicks Create Project | project_type, template_used | Product | Live |
| ... | | | | |

## User properties
[List with definitions]

## Naming conventions
[Rules]

## Privacy and compliance
[Rules]

## Governance
[Process]
```

---

## Reference files

- `references/event-taxonomy-template.md` - Starter event catalog with patterns for common product types.

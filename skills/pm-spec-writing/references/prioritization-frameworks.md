# Prioritization Frameworks

Beyond the simple impact/effort grid, there are several frameworks for prioritizing work. Each is useful in different situations. None is universally correct.

---

## Impact / Effort matrix

The simplest and most common.

**How it works:** plot every candidate on a 2x2 grid.

```
                    Low Effort           High Effort

High Impact    Quick wins          Major projects
               (Ship now)          (Plan and batch)

Low Impact     Backlog batch       Skip or defer
               (When time allows)  (Reconsider)
```

**Strengths:** Fast. Forces blunt judgment. Useful for triage.

**Weaknesses:** Subjective. "Impact" and "effort" are estimates that get inflated.

**When to use:** Triage of a long list. Initial sorting.

---

## RICE

A weighted scoring method that produces a numeric priority score.

**How it works:**

```
RICE Score = (Reach × Impact × Confidence) / Effort
```

- **Reach:** How many users this affects per period (e.g., per quarter). Use real numbers.
- **Impact:** The per-user impact, scored on a fixed scale:
  - 3 = Massive (transformative)
  - 2 = High (significant lift)
  - 1 = Medium (modest lift)
  - 0.5 = Low (minor lift)
  - 0.25 = Minimal (barely noticeable)
- **Confidence:** How certain you are of the reach and impact estimates, as a percentage.
  - 100% = high confidence (data-backed)
  - 80% = medium confidence (some evidence)
  - 50% = low confidence (mostly intuition)
- **Effort:** Person-months (or person-weeks for smaller work).

**Example:**

A new onboarding flow:
- Reach: 5,000 new users per quarter
- Impact: 1 (modest improvement to activation)
- Confidence: 80%
- Effort: 2 person-months

RICE = (5000 × 1 × 0.8) / 2 = 2,000

A bug fix on a rarely-used page:
- Reach: 50 users per quarter
- Impact: 2 (significant for those affected)
- Confidence: 100%
- Effort: 0.25 person-months

RICE = (50 × 2 × 1) / 0.25 = 400

The onboarding flow scores higher.

**Strengths:** Numeric. Forces explicit estimates. Surfaces the math behind judgment.

**Weaknesses:** Garbage-in-garbage-out. Reach and impact estimates can be wildly wrong.

**When to use:** Comparing across many candidate features. When stakeholders disagree on priority.

---

## MoSCoW

Categorical, used for release scoping.

**How it works:** every item is one of four:

- **Must have** - non-negotiable for this release
- **Should have** - important but not critical
- **Could have** - nice if time allows
- **Won't have** - explicitly out of scope (this release)

**Example for a redesign launch:**

- **Must:** New navigation, mobile responsive, all P0 pages migrated
- **Should:** New blog template, updated forms
- **Could:** New illustrations on lower-traffic pages
- **Won't:** Internationalization (deferred to phase 2)

**Strengths:** Clear scope boundaries. Forces explicit "won't have" decisions, which prevent scope creep.

**Weaknesses:** Not a framework for relative priority within categories.

**When to use:** Defining the scope of a release. Cutting features when timeline pressure hits.

---

## Cost of Delay / Weighted Shortest Job First

A framework from lean product development. Optimizes for delivering value sooner.

**How it works:**

```
Priority = Cost of Delay / Job Duration
```

- **Cost of Delay:** What is the cost (in revenue, risk, customer impact) of NOT doing this for one more period?
- **Job Duration:** How long will this take?

The work with the highest "Cost of Delay per unit time" gets done first.

**Example:**

A revenue-impacting bug:
- Cost of Delay: $5,000 per week of lost conversions
- Duration: 1 week
- Priority score: 5,000

A large feature:
- Cost of Delay: $20,000 per week of unrealized revenue
- Duration: 12 weeks
- Priority score: 1,667

Even though the feature has higher absolute cost of delay, the bug ships first because it delivers value faster.

**Strengths:** Captures urgency. Useful for revenue-sensitive decisions.

**Weaknesses:** Cost of Delay is hard to estimate.

**When to use:** Operational backlogs. Revenue-sensitive features.

---

## Value vs Effort with strategic alignment

A 3-axis variant for when strategic fit matters more than raw impact.

**How it works:** score each candidate on:

- **Value** (1 to 5)
- **Effort** (1 to 5, inverted - 5 means low effort)
- **Strategic fit** (1 to 5)

Composite score: Value + Effort + Strategic fit.

Candidates with the highest composite score win.

**Strengths:** Captures that some valuable work is wrong for the company right now.

**Weaknesses:** Three axes is more complex than most teams can sustain.

**When to use:** When the team is being pulled toward locally-valuable work that does not advance the strategy.

---

## The "next thing" framework

The simplest, for solo founders or very small teams.

**How it works:** ask one question:

> "What is the single most important thing I could ship in the next two weeks?"

Ship it. Then ask the question again.

**Strengths:** Maximum focus. Avoids analysis paralysis.

**Weaknesses:** Misses opportunities to batch related work. Susceptible to recency bias.

**When to use:** Solo work. When the backlog is short. When velocity matters more than precision.

---

## Choosing a framework

| Situation | Framework |
|---|---|
| Long backlog, need triage | Impact / Effort matrix |
| Comparing features for the next quarter | RICE |
| Defining a release scope | MoSCoW |
| Revenue-sensitive operations work | Cost of Delay / WSJF |
| Strategic misalignment risk | Value + Effort + Strategic fit |
| Solo founder, weekly cadence | "Next thing" |

The frameworks are tools. The output is a prioritized list. If the list is helpful and team agrees, the framework worked. If it's not, try another framework or revisit the inputs.

---

## Common pitfalls

- **Framework theater.** Spending more time on the framework than the work. Pick one. Move on.
- **Estimate inflation.** Engineers underestimate effort by 2x. PMs overestimate impact by 3x. Calibrate over time.
- **Static prioritization.** A one-time sort that never gets revisited. Re-prioritize at least monthly.
- **Ignoring sunk cost dynamics.** Just because you've worked on something for 3 months does not mean it deserves to ship. Cut your losses if the priority math no longer works.
- **Optimizing the wrong metric.** A framework's output is only as good as the metric you're optimizing for. Make sure that metric is correct.
- **Treating the score as truth.** A RICE score is a directional signal, not a verdict. Use judgment alongside the math.

---

## Recommended default

For most teams, the default is:

1. **Impact / Effort matrix** for triage and backlog grooming
2. **RICE** for comparing feature candidates within a quarter
3. **MoSCoW** for release scoping when timeline is fixed

That covers 90 percent of prioritization decisions a typical product team faces.

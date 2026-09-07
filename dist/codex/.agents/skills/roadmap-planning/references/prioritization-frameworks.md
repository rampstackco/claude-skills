# Prioritization Frameworks

Five frameworks for prioritizing work. Each suits different problems. Pick one per planning cycle. Use it consistently.

---

## RICE

Best for: feature-heavy roadmaps where features are roughly comparable in shape.

### The math

```
RICE Score = (Reach × Impact × Confidence) ÷ Effort
```

- **Reach:** how many people will this affect in a fixed period (e.g., users per quarter). Use real numbers, not relative scores.
- **Impact:** how much will it affect each person? Use a fixed scale: 3 (massive), 2 (high), 1 (medium), 0.5 (low), 0.25 (minimal).
- **Confidence:** how sure are you in the estimates? 100% (high), 80% (medium), 50% (low). Below 50%, you don't know enough to score.
- **Effort:** total person-months to deliver. Be honest. Include design, dev, QA, launch.

Higher score = higher priority.

### Where it shines

Comparing many similarly-shaped feature ideas. Forces conversation about the inputs (Reach, Impact, Confidence) instead of a gut "I think this is more important."

### Where it fails

- Foundational work (infra, platform, refactors). Reach and Impact don't apply cleanly.
- Strategic bets where Confidence is low but the upside is huge. RICE punishes low-confidence work.
- "Cost of inaction" items (security, compliance). These often score badly but must ship.

### Common mistakes

- Inventing Reach numbers without a basis. If you don't have data, your Reach is a guess wrapped in math.
- Effort estimates that come from PMs, not engineers. Effort is always the engineer's call.
- Treating Impact as a continuous variable. The scale is fixed for a reason - so it's comparable.
- Re-scoring each cycle without checking what shipped last cycle and what its actual Reach × Impact turned out to be.

---

## MoSCoW

Best for: fixed-deadline projects where you have to decide what's in scope and what isn't.

### The buckets

- **Must have:** without these, the project fails. Non-negotiable for launch.
- **Should have:** important but not deal-breaking. Plan to include unless capacity tightens.
- **Could have:** nice to include if there's room. First to be cut.
- **Won't have (this time):** explicitly out of scope. Documented to prevent drift.

### Where it shines

Deadline-driven launches. New site builds. Migrations. Anything with a fixed go-live date.

### Where it fails

- Open-ended product work without a hard deadline. Everything tends to drift to "Must have."
- Long-running platforms. The buckets don't help sequence multi-quarter work.

### Common mistakes

- "Must have" creeping. By the end of planning, 80% of items are Must. Hard rule: "Must have" should be 30-50% of items, never more.
- No "Won't have." The "Won't have" list is the discipline. Without it, scope grows.
- Ambiguous lines between Must and Should. Define each explicitly. "If we ship without X, will the product work?" If yes, X is Should, not Must.

---

## Kano

Best for: product investment decisions about feature investment vs polish vs new bets.

### The categories

- **Threshold features:** users expect them. Their absence causes dissatisfaction. Their presence is barely noticed. (Examples: a working login. Email password reset.)
- **Performance features:** users notice them and value them linearly. More is better. (Examples: speed, search relevance, design quality.)
- **Excitement features:** users don't expect them. Their presence is delight. Their absence is unnoticed. (Examples: a clever zero state, an unexpected automation.)

### How to use

Audit the product. Categorize every feature. Decide where to invest:

- Threshold features must be present and working. Underinvestment is a tax on everything else.
- Performance features should get sustained investment. They are how the product stays competitive.
- Excitement features are the differentiation budget. Spend selectively, expect them to age into Performance and eventually Threshold.

### Where it shines

Product strategy conversations. "Should we polish what we have or ship something new?" Kano answers it: are the Thresholds shipped? Then Performance. Then Excitement.

### Where it fails

- Doesn't help with sequencing among features in the same category.
- The categories shift over time. Today's Excitement is tomorrow's Threshold.

### Common mistakes

- Treating Excitement as the most valuable category. It's not. Threshold gaps will sink you faster than missing Excitement features.
- Confusing Excitement with novelty. Many "innovative" features are just Performance features in disguise.

---

## Cost of Delay

Best for: portfolios where timing matters more than effort, especially under capacity constraints.

### The math

```
Cost of Delay per Week = Value Lost Per Week the Item Doesn't Ship
```

For each candidate, estimate: if we delay this by one week, what does it cost in revenue, retention, market position, or risk?

Then divide by effort:

```
Cost of Delay Divided by Duration (CD3) = Cost of Delay per Week ÷ Duration in Weeks
```

The highest CD3 ships first.

### Where it shines

Sequencing inside a constrained team. Surfaces items where every week of delay matters (compliance deadlines, seasonal launches, competitive responses).

### Where it fails

- Estimating Cost of Delay is hard. Many items have qualitative cost ("brand damage," "team morale") that resists numerical estimates.
- Bias toward urgent over important. Recurring time-sensitive items (deadlines, customer escalations) keep beating strategic work.

### Common mistakes

- Treating all delays as having the same cost shape. Some items have flat cost (delay a week or a year, same outcome). Others have step changes (miss a deadline, lose 80% of the value).
- Ignoring the cost of NOT delaying (opportunity cost from working on this instead of something else).

---

## Strategic Alignment + Impact

Best for: executive-facing roadmaps and any planning where the question is "should we do this at all?"

### The matrix

A 2×2 grid: Strategic Alignment (low/high) on one axis, Impact (low/high) on the other.

- **High alignment / High impact:** ship now. Resource heavily.
- **High alignment / Low impact:** ship if cheap. Question if expensive.
- **Low alignment / High impact:** dangerous. Either redefine strategy or cut. Items here drag the team away from the plan.
- **Low alignment / Low impact:** cut. Always.

### Where it shines

Cutting noise from the backlog. The bottom-right quadrant (Low/Low) is where most of the noise lives, and the matrix makes it obvious.

Communicating with leadership. "This is high impact but not aligned" is a defensible reason to deprioritize.

### Where it fails

- Doesn't sequence within quadrants. Inside "High/High," you still need a tiebreaker.
- "Strategic alignment" is judgment, not math. Different people will plot the same item differently.

### Common mistakes

- Plotting everything as High/High to avoid the conversation. The matrix is only useful if there's a Low quadrant.
- Treating Strategic Alignment as fixed. Strategy changes. Re-plot every cycle.

---

## Picking a framework

| If your team is... | Use |
|---|---|
| Building features for a product, comparable in shape | RICE |
| Launching against a fixed deadline | MoSCoW |
| Deciding investment levels across product areas | Kano |
| Sequencing under capacity constraints with timing-sensitive items | Cost of Delay |
| Cutting noise and aligning with leadership | Strategic Alignment + Impact |

You can use more than one in a single planning cycle, but apply each consistently within its scope. Don't switch frameworks halfway through to justify a pre-decided answer.

---

## The meta-rule

Every framework has known weaknesses. Every framework can be gamed by stakeholders who learn how the math works.

The frameworks are conversation tools, not decision tools. Their value is forcing the team to articulate inputs (reach, impact, alignment, urgency) instead of arguing about outputs.

A good roadmap can be defended without the framework. The framework is the work, not the result.

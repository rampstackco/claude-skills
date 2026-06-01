# Evaluation rubric

A scoring template for vendor evaluations. Adapt the dimensions, weights, and scale to fit the decision.

## The rubric structure

Score each candidate on each dimension using a 1-5 scale. Multiply by the dimension's weight. Sum for a total.

Numbers do not make the decision. They make differences visible. Use the totals to challenge your gut, not replace it.

## Dimensions and what to score

### Functional fit (typical weight: 25%)

How well does the product do the specific job?

| Score | Meaning |
| --- | --- |
| 5 | Does the job exactly. Built for this use case. |
| 4 | Does the job with minor configuration. |
| 3 | Does the job with workarounds or extensions. |
| 2 | Partial fit. Significant gaps. |
| 1 | Wrong tool for the job. |

Evaluation method: trial the product on real (or representative) data.

### Total cost (typical weight: 20%)

Three-year total cost of ownership, including hidden fees and scaling.

| Score | Meaning |
| --- | --- |
| 5 | Cost is well below alternatives. Pricing is predictable. No hidden fees. |
| 4 | Cost is competitive. Pricing scales gracefully. |
| 3 | Cost is fair. Some scaling concerns. |
| 2 | Cost is high or scaling is punitive. |
| 1 | Cost is prohibitive or pricing is opaque. |

Evaluation method: project cost at 1x, 5x, and 10x current usage. Read the pricing page line by line. Ask sales for a custom quote at projected scale.

### Reliability (typical weight: 15%)

How often does it work?

| Score | Meaning |
| --- | --- |
| 5 | Strong SLA, public status page, low historical incidents. |
| 4 | Reasonable SLA, transparent status, infrequent incidents. |
| 3 | Standard SLA, some visibility, occasional issues. |
| 2 | Weak SLA, limited visibility, frequent issues. |
| 1 | No SLA, no status page, customer reports of unreliability. |

Evaluation method: read the SLA, browse status page history for 90 days, search for outage reports.

### Integrations and ecosystem (typical weight: 15%)

How well does it fit your stack and what is the exit story?

| Score | Meaning |
| --- | --- |
| 5 | Native integrations to your stack, comprehensive API, easy data export. |
| 4 | Most integrations exist or are easy to build. Clean export path. |
| 3 | Some integrations, partial API, exportable with effort. |
| 2 | Limited integrations, weak API, hard to export. |
| 1 | Closed ecosystem, no API, vendor lock-in. |

Evaluation method: list the integrations you need. Check each. Test the export.

### Operational fit (typical weight: 10%)

How easy is it to run?

| Score | Meaning |
| --- | --- |
| 5 | Self-service, well-documented, low ongoing burden. |
| 4 | Mostly self-service. Support responds when needed. |
| 3 | Requires some hand-holding from vendor. |
| 2 | Requires significant ops effort or vendor intervention. |
| 1 | Black box that needs constant management. |

Evaluation method: read the docs, send a test support question, ask "who would own this internally" and gauge the answer.

### Vendor durability (typical weight: 10%)

Will they be around in 3 years?

| Score | Meaning |
| --- | --- |
| 5 | Profitable, established, deep customer base, growing. |
| 4 | Well-funded, growing, healthy customer base. |
| 3 | Stable but uncertain. Some risk signals. |
| 2 | Layoffs, leadership turnover, customer churn signals. |
| 1 | Likely to be acquired, shut down, or pivot. |

Evaluation method: company news search, LinkedIn for headcount trends, customer review sites for sentiment.

### Support quality (typical weight: 5%)

What happens when something goes wrong?

| Score | Meaning |
| --- | --- |
| 5 | Fast, technical, available 24/7 if needed. |
| 4 | Reliable, knowledgeable, business-hours coverage. |
| 3 | Adequate. Sometimes slow. |
| 2 | Slow, scripted, escalation needed for real issues. |
| 1 | Unreachable or unhelpful. |

Evaluation method: send a real technical question during the trial. Time the response. Read the answer.

## Worked example: picking an email service provider

Job statement: "Send 200K transactional emails per month, 50K marketing emails per month, with deliverability above 98%, webhook delivery confirmation, and integration with our CRM."

### Weighted scores

| Dimension | Weight | Vendor A | Vendor B | Vendor C |
| --- | --- | --- | --- | --- |
| Functional fit | 25% | 5 (1.25) | 4 (1.00) | 5 (1.25) |
| Total cost | 20% | 3 (0.60) | 4 (0.80) | 2 (0.40) |
| Reliability | 15% | 5 (0.75) | 4 (0.60) | 5 (0.75) |
| Integrations | 15% | 4 (0.60) | 3 (0.45) | 5 (0.75) |
| Operational fit | 10% | 4 (0.40) | 5 (0.50) | 3 (0.30) |
| Vendor durability | 10% | 5 (0.50) | 3 (0.30) | 5 (0.50) |
| Support quality | 5% | 4 (0.20) | 4 (0.20) | 5 (0.25) |
| **Total** | **100%** | **4.30** | **3.85** | **4.20** |

### What the numbers say

Vendor A and Vendor C are close. The difference comes down to cost (B and A both better than C) vs integrations (C better than A and B).

### What the numbers do not say

The numbers do not capture:

- A's pricing has a cliff at 500K monthly emails. We project crossing that within 18 months.
- C has best-in-class deliverability for our specific industry.
- B is rumored to be in acquisition talks.

The numbers narrow the field to A and C. The qualitative read picks one. In this hypothetical: Vendor C wins on the strength of deliverability and ecosystem fit, despite being more expensive, because deliverability is the actual job and cost is recoverable.

### What the decision memo looks like

```
Vendor: C
Reasoning:
- Best functional fit on deliverability and webhook reliability.
- Strongest ecosystem and exit story.
- Higher cost is justified by ROI from deliverability lift.
- A was a strong second; we will revisit if C disappoints in
  year 1.

Decision date: [date]
Reviewer: [person]
Next review: [date + 12 months]
Contract terms:
- 1-year commit, with option to extend
- Termination notice: 60 days
- Data export confirmed working in trial
```

## Adapting the rubric

Different decisions weight dimensions differently. Some examples:

- **Hosting decision**: reliability and operational fit weighted higher.
- **CMS decision**: functional fit and integrations weighted higher.
- **Analytics decision**: vendor durability and integrations weighted higher (you keep data here for years).
- **Payment processor decision**: reliability, support quality, and vendor durability weighted higher.

Adjust weights before scoring. If you adjust after, you are rationalizing.

## How to use the rubric without lying to yourself

- Score independently first if multiple stakeholders are evaluating. Compare scores. Discuss the differences.
- Sleep on the scores before deciding.
- If the math points to a vendor your gut hates, find out why. Either the rubric is missing a dimension or your gut is wrong. Both happen.
- Document the score, the weights, and the qualitative notes. Store with the contract.

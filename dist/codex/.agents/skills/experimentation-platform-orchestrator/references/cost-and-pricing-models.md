# Cost and pricing models

Pricing shapes per platform, real-world cost ranges at different traffic tiers, the total cost frame, and finance conversation patterns.

Pricing on experimentation platforms is rarely transparent on the public site for paid tiers. The numbers below are typical ranges from real customer conversations as of May 2026. Verify with each vendor before committing.

---

## The three pricing shapes

**Vendor-native (event-based).** Statsig, Optimizely. Billing scales with the number of events sent to the platform. Easy to predict at small scale: events per month times rate per million. Painful at very high scale because the rate per million does not always decrease quickly.

**Warehouse-native (seat plus warehouse compute).** GrowthBook (paid), Eppo. Billing scales with the number of seats and the warehouse compute the platform consumes. Warehouse compute is your existing line item, so the marginal cost of more experiments is small once the platform is paid for. Less elastic on team size, more elastic on experiment volume.

**Product-suite (combined event volume).** PostHog, Amplitude. Billing scales with combined event volume across all features (analytics, experiments, replays, error tracking, surveys). Often the most cost-effective when used heavily; can be the most expensive when only one feature is needed.

---

## Free tiers

Free tiers exist for the early-stage and pre-PMF cases. The numbers below are current as of May 2026.

| Platform | Free tier shape |
|---|---|
| PostHog | 1M events per month free across all features |
| Statsig | 1M events per month free; full feature access |
| Amplitude | 10M events per month free with basic features (some advanced features paid) |
| GrowthBook | Free open-source self-hosted; cloud has a free tier with 3 users and 5 active experiments |
| Optimizely | No meaningful free tier |
| Eppo | No meaningful free tier |
| Kameleoon | No meaningful free tier; free trial only |

For pre-PMF and early-stage teams, the free-tier choice is between PostHog and Statsig. Both work. Pick the one whose product surface matches your needs (PostHog if you also want analytics; Statsig if you want experiments and flags primarily). The decision is reversible at low cost while you are still on the free tier.

---

## Real-world cost ranges

Approximate ranges for paid tiers. Bands are wide because pricing varies by contract size, sales discount, and feature mix.

### Vendor-native (events per month)

| Volume | Statsig (typical) | Optimizely (typical) |
|---|---|---|
| 1M to 10M | $0 (free) to $1K/month | Custom contract; rarely under $30K/year |
| 10M to 100M | $1K to $8K/month | $30K to $100K/year |
| 100M to 1B | $8K to $40K/month | $100K to $400K/year |
| 1B+ | $40K+/month with custom negotiation | $400K+/year with custom negotiation |

Optimizely consistently sits at a higher absolute price point than Statsig for the same volume. The premium pays for the marketing-led ergonomics, the visual editor, and the personalization features. Whether the premium is justified is a per-team judgment.

### Warehouse-native (seats and compute)

| Team size | Eppo (typical) | GrowthBook paid (typical) |
|---|---|---|
| 5 to 10 seats | $20K to $40K/year | $5K to $15K/year |
| 10 to 30 seats | $40K to $120K/year | $15K to $50K/year |
| 30+ seats | Custom contract | Custom contract |

Plus warehouse compute. For a Snowflake-based setup running 100 to 300 active experiments per year, expect $2K to $20K/year of additional warehouse compute attributable to experimentation queries. The exact number depends on metric complexity and refresh cadence.

### Product-suite (combined events)

| Volume | PostHog (typical) | Amplitude (typical) |
|---|---|---|
| 1M to 10M | $0 (free) to $500/month | $0 (free) to $2K/month |
| 10M to 100M | $500 to $5K/month | $2K to $20K/month |
| 100M to 1B | $5K to $30K/month | $20K to $100K/month |
| 1B+ | Custom negotiation | Custom negotiation |

PostHog is consistently more cost-effective for combined product analytics plus experiments. Amplitude charges a premium for the depth of its behavioral analytics; if experiments are the primary use, PostHog is hard to justify against.

---

## The total cost frame

Sticker price is one input to the cost decision. Total cost is the right frame.

**Engineer time.** Wiring, maintenance, dashboard upkeep, debugging integration issues. Ranges from 5% to 30% of an engineer's time depending on platform and team size. Vendor-native is usually lower; warehouse-native is usually higher (more setup); multi-platform is usually highest.

**Statistical correctness.** A single wrong-result experiment can cost more than a year of platform fees. If a platform's defaults produce confidently-wrong recommendations, the cost is the experiment that shipped wrong, not the platform fee. Worth a real review at platform decision time.

**Governance overhead.** Self-hosted open-source platforms require self-built governance (audit, permissions, approval workflows). For regulated industries, this is hours of compliance review per quarter. Enterprise tiers absorb this overhead in their pricing.

**Migration risk.** What is the cost if you choose wrong and need to migrate? See `migration-playbook.md` for engineer-week ranges. Multiply by the probability you will need to migrate, and that is the migration risk component of total cost.

**Cultural drift.** The platform's defaults shape what the team thinks experimentation is. PM-led platforms produce PM-led cultures. Marketing-led platforms produce marketing-led cultures. The drift is hard to price but real.

---

## Finance conversation patterns

Three patterns that work when justifying a platform decision to finance.

### Pattern 1: cost per experiment

Compute the all-in cost per experiment shipped: platform fees plus engineer time amortized across experiments per year. This converts platform cost into a unit that finance understands. A team running 50 experiments per year on a $40K platform fee is paying $800 per experiment in platform alone, plus engineer time. A team running 200 experiments on the same fee is paying $200 per experiment.

The frame: more experiments per year reduces unit cost. Justify investment by showing a path to higher experiment throughput.

### Pattern 2: avoided wrong-result experiments

Estimate the cost of a wrong-result decision. For revenue experiments, this is often $50K to $500K (the value of the experiment shipped wrong). Multiply by the rate of wrong-result decisions before and after a platform change.

The frame: a more rigorous platform avoids wrong-result decisions. A few avoided wrong-results per year easily justify the platform premium.

### Pattern 3: total cost of ownership across alternatives

Build a 3-year TCO model for the top two or three candidates. Include platform fees, engineer time, migration costs, and governance overhead. Show the comparison.

The frame: the cheapest sticker price is rarely the cheapest TCO. The platform that minimizes engineer time often wins on TCO even if it costs more per month.

Use whichever pattern matches finance's mental model. Pattern 1 works for ROI-focused finance leaders. Pattern 2 works for risk-focused leaders. Pattern 3 works for procurement-focused leaders.

---

## Negotiation tips

Three patterns work in vendor negotiations.

1. **Multi-year commits unlock 15 to 30% discounts.** If the team is confident in the platform, lock in the discount.
2. **Event volume tiers are negotiable.** The published pricing is the starting position. Custom contracts at scale always run below it.
3. **Bundle features for unit-cost reduction.** Combining experiments and feature flags in one contract often costs less than the same features separately.

Do not negotiate from desperation. If the team is in a "we have to migrate this quarter" position, the vendor knows and the discount evaporates. Negotiate from a position of optionality: keep the trial of the alternative platform live until the contract closes.

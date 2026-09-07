# North Star metric selection

Rules for picking a North Star metric (NSM), examples by product type, anti-patterns, and migration patterns when changing NSM.

The principle. The NSM is the single number the team optimizes against. Picking the wrong number focuses the team on the wrong work for as long as the team uses it.

---

## NSM selection rules

A trustworthy NSM passes four tests.

1. **Reflects user value, not company value alone.** Revenue is company value; the NSM should track an action that delivers user value. Revenue can be the trailing measure; the NSM is the leading driver.
2. **Captures the core action that, if it grows, the business grows.** The NSM should be cause-correlated with revenue growth, retention, and any other business goal. If you double the NSM and the business does not improve, the NSM is wrong.
3. **Measurable consistently across time.** The definition should not drift. If the NSM definition changes every quarter, year-over-year comparison is impossible.
4. **Hard to game.** The team should not be able to grow the NSM via shortcuts that do not deliver user value. A gameable NSM produces local maxima that the team optimizes toward at the expense of the actual mission.

---

## Examples by product type

### Engagement-driven products

The product creates ongoing value through repeated use.

| Product | NSM | Why it works |
|---|---|---|
| Slack | Messages sent in workspaces of 3+ active users per week | Captures recurring value; harder to game than DAU; size threshold filters out trial-only users. |
| Figma | Weekly active editors | The action that delivers value (creating in Figma); active editors filters out viewers who do not get full product value. |
| Notion | Weekly content blocks created per workspace | Captures the core verb (creating); per-workspace normalizes for team size variance. |
| Linear | Weekly issues created per workspace | The product use case is project tracking; issues created is the load-bearing action. |

### Transaction-driven products

The product makes money on each transaction.

| Product | NSM | Why it works |
|---|---|---|
| Airbnb | Nights booked (not bookings) | Nights captures the value delivered to hosts and guests; bookings count is gameable via short stays. |
| Uber | Rides completed (not requests) | Completion includes the driver-side fulfillment; requests alone misses the supply-side metric. |
| Etsy | GMV per active buyer | GMV per buyer is more stable than total GMV; it tracks user value rather than top-line growth alone. |

### Conversion-driven products (SaaS subscription)

The product is sold via subscription; the NSM tracks recurring engagement that drives renewal.

| Product | NSM | Why it works |
|---|---|---|
| HubSpot | Activated workspaces (defined as workspaces using 3+ products) | Multi-product use is the activation signal that drives expansion revenue. |
| Stripe (developer-side) | Production payments processed per merchant per week | Captures the core transaction; per-merchant per-week filters for active integrations. |
| Calendly | Meetings booked via Calendly per user per week | The exact value delivered (meetings booked) and the recurring cadence. |

### Content-driven products (media, publishing)

The product delivers value through content consumption.

| Product | NSM | Why it works |
|---|---|---|
| Spotify | Hours listened per active user | Hours captures depth of engagement; per active user normalizes for catalog growth. |
| YouTube (creator-side) | Watch time per video per audience cohort | Watch time is the core metric that drives ads and creator earnings. |
| Substack (writer-side) | Paid subscribers added per month | The action that converts to revenue; not just total subscribers (which is lagging). |

---

## Anti-patterns

Six NSMs that consistently produce the wrong incentives.

### Bad NSM 1: signups

Captures top-of-funnel volume, not value. A team optimizing for signups loosens activation criteria and chases low-quality acquisition channels. The NSM grows; the business does not.

### Bad NSM 2: revenue

Lagging, not action-oriented. The team can optimize against revenue only by changing pricing or sales tactics. Revenue is the trailing outcome; the NSM should be the leading action that produces revenue.

### Bad NSM 3: DAU (daily active users)

Useful for engagement-driven products with a daily cadence. Misleading for products with a longer cadence (weekly, monthly). DAU on a B2B SaaS often shows an unhealthy daily ritual the product does not actually need.

### Bad NSM 4: page views or sessions

Captures traffic, not value. A team optimizing for page views or sessions loosens content quality and adds engagement loops that do not deliver user value.

### Bad NSM 5: feature usage

The team optimizes for "feature X used" by promoting feature X aggressively. The feature usage grows; the underlying user value may not. NSM should capture cross-cutting value, not feature-specific use.

### Bad NSM 6: reviews or NPS

Captures sentiment, not value. NPS is useful as a health metric but a poor NSM because it is heavily influenced by survey design and customer-service interactions, neither of which the product team controls directly.

---

## Supporting metrics framework

The NSM does not stand alone. Around it lives a framework of input metrics and health metrics.

### One NSM

The single number the team optimizes against.

### Three to five input metrics

The metrics that drive the NSM. If the input metrics improve, the NSM should follow.

For "weekly active editors" (Figma's NSM):
- Signups per week (the top of the funnel)
- Signup-to-active conversion rate (the activation step)
- Week-over-week active retention (the repeat-use step)

For "messages sent in workspaces of 3+ active users per week" (Slack's NSM):
- Workspaces created per week
- Workspaces reaching 3+ active members
- Messages per active workspace per week

The team's roadmap should map every initiative to one or more input metrics.

### Five to ten health metrics

Metrics that warn of problems. They should not regress while the NSM grows.

- Monthly churn rate
- Account-level concentration (is growth coming from one big customer?)
- Support ticket volume per active user
- Latency or error rate
- Activation rate (signup-to-NSM-action)

If any health metric regresses while the NSM grows, the team should investigate before declaring success.

---

## Migration patterns when changing NSM

The NSM should change rarely. When it does, the migration is high-risk.

### Pattern 1: phased migration

Run both NSMs in parallel for a quarter. Track team behavior; document where the new NSM produces different incentives. Decide based on real evidence, not speculation.

### Pattern 2: shadow mode first

The new NSM is tracked privately by the data team. The team continues to optimize against the old NSM. After 90 days, the data team reports on the divergence. Public switch happens only if the new NSM clearly aligns better with business outcomes.

### Pattern 3: replace plus reinforce

The new NSM replaces the old. The old metric becomes a health metric (still tracked, no longer the primary target). Over the next 6 months, ensure the old metric does not regress while the new NSM grows.

---

## When to refuse to change the NSM

Three signs that a proposed NSM change is wrong.

1. **The change is reactive to a single quarter's bad numbers.** "Our NSM went down so we should change the NSM" is not a reason to change the NSM.
2. **The proposed new NSM is gameable.** A new NSM that the team can grow without delivering user value is worse than the existing NSM, even if the old one is imperfect.
3. **The change has no concrete decision the team will make differently.** If switching from old NSM to new NSM does not change which initiatives the team prioritizes, the change is theater.

The NSM should be stable for years. Change it when the business model changes substantively or when the existing NSM is producing demonstrably wrong incentives.

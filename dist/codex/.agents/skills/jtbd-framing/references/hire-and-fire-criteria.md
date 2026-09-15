# Hire and fire criteria

Why users adopt a product (hire), why they switch away (fire). The two questions ground JTBD in real decisions users make.

Hire and fire criteria are the JTBD methodology's most actionable contribution to product strategy. They surface what the product needs to be excellent at to win adoption (hire) and what the product needs to maintain to retain users (fire). The two are often different; products that win on hire criteria can lose on fire criteria.

---

## Hire criteria

What makes a user adopt a product.

**The components.**

- The struggling moment the user is trying to solve.
- The alternatives they considered or tried first.
- What made the chosen product the answer (vs the alternatives).
- The expected job output: what the user expected to accomplish with the product.

**Worked example.** A PM user adopting a new analytics tool:

- Struggling moment: "I was spending hours every week assembling product metrics from three different sources before standup, and I was always uncertain whether I had the right slice."
- Alternatives considered: "Continued the manual spreadsheet approach. Tried to extend the existing BI tool. Considered building an internal dashboard."
- Why this product won: "It connected to all three sources out of the box, the slice I needed was a 30-second config, and the team could share the same view."
- Expected job output: "I would walk into standup with the metrics ready, with no manual reconciliation work the night before."

**The discovery prompt.** "Tell me about the moment you decided to start using [product]. What were you doing before? What made you switch?"

---

## Fire criteria

What makes a user switch away.

**The components.**

- The struggling moment that recurred even with the chosen product.
- The alternative that started looking better.
- What tipped the user from "considering switching" to "switching."
- The job output that the chosen product failed to deliver consistently.

**Worked example.** A PM user switching away from an analytics tool:

- Struggling moment: "Once we hit cross-source aggregations the basic config could not handle, I was back to manual workarounds."
- Alternative looking better: "A team I respect started using a different tool that handled cross-source natively."
- Tipping point: "When I had to rebuild a report three weeks in a row because the workaround broke whenever the source schemas changed."
- Failed job output: "The 30-second-config promise did not hold for the analyses that mattered most."

**The discovery prompt.** "If you switched away from [product] tomorrow, what would the trigger be? What would the alternative need to do that [product] does not?"

For users who have actually switched: "What was the moment you decided to switch away?"

---

## Why hire and fire are often different

Hire criteria reveal what the product needs to be excellent at to win adoption. Fire criteria reveal what the product needs to maintain to retain users. The asymmetry is consequential.

**Examples of the asymmetry.**

- A product that wins adoption with a fast onboarding (hire criterion) can lose users to depth limitations once they get past onboarding (fire criterion). The product needs both: fast onboarding AND depth that handles harder cases.
- A product that wins adoption with a single integration (hire criterion) can lose users when their tooling stack expands and the product does not keep up (fire criterion). The product needs both: a strong landing integration AND breadth as users grow.
- A product that wins adoption with a low price (hire criterion) can lose users when their budget expands and competitors offer more value at higher tiers (fire criterion). The product needs both: accessible entry AND value at higher tiers.

**The implication.** Strategy work that focuses only on hire criteria builds for adoption. Strategy work that focuses only on fire criteria builds for retention. Mature strategy addresses both, often through different parts of the product or different lifecycle stages.

---

## Recent-switch interview discipline

Users who recently switched (in either direction) are particularly rich for JTBD interviews.

**Why recent switches matter.**

- The user remembers the specific moment of the switch decision; older switches get smoothed into abstractions.
- The user remembers the alternatives they considered, the criteria they used, the moment of tipping.
- The data is grounded in real decisions, not hypothetical preferences.

**The recruiting target.** Users who switched in the last 30-90 days are the highest-value recruits for hire/fire interviews. Users who switched 6+ months ago provide weaker data.

**The interview structure.**

- Walk through the situation that prompted the switch consideration.
- Identify the alternatives evaluated.
- Surface the criteria the user used to evaluate.
- Identify the tipping moment.
- Compare expected vs realized outcomes after the switch.

---

## Hire and fire across segments

Different segments often have different hire and fire criteria.

**Worked example.** A team productivity SaaS:

- Small-team segment: hire criterion is "fast setup; works without admin"; fire criterion is "team grew and the product feels limiting."
- Mid-size segment: hire criterion is "supports our existing roles and permissions"; fire criterion is "missing reporting and audit features as we standardize."
- Enterprise segment: hire criterion is "compliance and security pass our review"; fire criterion is "vendor responsiveness during incidents."

**The discipline.** Surface segment differences in hire and fire criteria explicitly. A product that wins on small-team hire criteria but loses on mid-size fire criteria has a known retention pattern that strategy must address.

---

## The "why didn't you switch sooner" question

A specific prompt that reveals the friction barrier to switching.

**The prompt.** "Looking back, why didn't you switch sooner?"

**What it surfaces.**

- The switching cost the user had to overcome (data migration, team retraining, contract obligations).
- The alternatives that almost won earlier but did not (and why).
- The accumulated frustration that finally broke through the inertia.

**Why it matters.**

- High switching costs protect incumbents. Users tolerate friction longer when switching is expensive.
- The pattern of frustration accumulation reveals which fire criteria are load-bearing (the ones users finally cannot tolerate).
- The almost-won alternatives reveal what would have been compelling enough earlier.

---

## Hire and fire criteria for non-switching users

Not every user has switched. Some users are at the start of their relationship with the product; others have used it for years without considering alternatives.

**For new users:** focus on hire criteria. The recent decision is the adoption decision; the fire criteria are hypothetical.

**For long-tenured users:** focus on fire criteria. The hypothetical "what would make you switch" reveals the latent fire criteria even without a switch event. The product can use these to address fire risks before they become switch events.

**For users who tried and abandoned:** rich data. They evaluated, found the product wanting, and stuck with the prior alternative. The reasons reveal both hire criteria the product failed and fire criteria for the alternative they kept.

---

## Patterns across hire criteria

Common patterns in hire criteria across product domains.

**Speed-to-value.** Users hire products that get them to first value quickly. Long onboarding loses adoption races; fast onboarding wins.

**Specific job fit.** Users hire products that look like they will solve the specific job. Generic products that "could be used for many things" lose to specific products that "solve this exact problem."

**Confidence in continuity.** Users hire products they trust will be there in 2 years. Established products win on this; startups have to compensate with other criteria.

**Workflow continuity.** Users hire products that fit their existing workflows. Products that demand workflow change face higher hire bars.

**Recommendation chain.** Users hire products that someone they trust recommended. Word-of-mouth is often a stronger hire criterion than feature comparison.

---

## Patterns across fire criteria

Common patterns in fire criteria across product domains.

**Reliability degradation.** Users fire products that become unreliable. A product that ships bugs faster than it ships fixes loses users.

**Scaling friction.** Users fire products that get harder to use as they grow. The product that was great for 5 users may be painful at 50.

**Vendor responsiveness.** Users fire products whose vendors stop responding. Support quality, account management, and incident response all matter.

**Pricing trajectory.** Users fire products whose pricing escalates faster than the value they get. Enterprise tiers that gate basic functionality drive fire decisions.

**Competitive pressure.** Users fire products when alternatives reach feature parity plus advantage. Products that stop innovating lose to products that overtake them.

---

## Common hire-and-fire failures

**Asking only about hire.** The team interviews about adoption decisions but never about switch decisions. The strategy biases toward adoption; retention concerns surface late.

**Asking only about fire.** The team focuses on churn analysis without understanding hire criteria. New customer acquisition struggles because the team does not know what wins adoption.

**Treating hire and fire as the same.** The team assumes the criteria match. Strategy ends up optimized for hire-with-no-fire-attention or vice versa.

**Hypothetical-only fire data.** Long-tenured users describing what they "would" switch over. Useful but weaker than real-switch data.

**Ignoring segment differences.** Hire and fire criteria collapsed across segments. Strategy that works for one segment fails for another.

---

## Methodology-level choices that stay in the public skill

The hire and fire criteria components. Why they are often different. The recent-switch interview discipline. Hire and fire across segments. The "why didn't you switch sooner" question. Hire and fire for non-switching users. Patterns across hire and fire criteria. Common failures.

## Implementation choices that stay internal

Specific interview templates for hire and fire interviews. Specific recruitment criteria for recent switchers. Specific synthesis tooling for hire and fire data. The team's own conventions for hire-fire balance in strategy work. These vary by team and research practice.

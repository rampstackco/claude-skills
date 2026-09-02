# Channel-source weighting

Decision-relative weighting. Worked examples of how channels weight differently for different decisions.

The discipline that distinguishes triaged-synthesis from averaged-noise. Different sources warrant different weights for different decisions; treating all sources as equal produces decisions made on aggregate volume rather than on signal that matters.

---

## The weighting principle

Each piece of feedback has a source. The source's weight in a decision depends on how relevant the source is to that decision.

**Worked principle.** A piece of feedback from an enterprise customer has different weight than a piece of feedback from a trial user when the decision is about enterprise pricing. The enterprise customer's feedback is high-weight; the trial user's feedback is low-weight (they are not the audience for the decision).

The same piece of feedback from a trial user has different weight when the decision is about trial conversion. Now the trial user is the audience; their feedback is high-weight.

The weighting is decision-relative, not source-absolute.

---

## Worked examples of channel weighting

### Decision: Should we prioritize the enterprise admin role overhaul this quarter?

**Audience for the decision.** Existing enterprise customers and enterprise prospects.

**Channel weights for this decision.**

- Sales call data with enterprise prospects: high weight. They directly inform the decision.
- Support ticket data from enterprise customers: high weight. Existing enterprise friction is directly relevant.
- Customer council data from enterprise members: high weight. Curated enterprise perspective.
- NPS data from enterprise customers: moderate weight. Aggregate signal but not specific to admin features.
- NPS data from small-team customers: low weight. Different segment; admin features not relevant.
- Social mentions: variable weight. Enterprise practitioners' posts higher than anonymous trial accounts.
- In-app feedback from small-team users: low weight. Different segment.

The decision weighs enterprise sources heavily. Volume from non-enterprise sources should not displace enterprise signal.

### Decision: Should we redesign the onboarding flow for new free-tier signups?

**Audience for the decision.** Free-tier new signups.

**Channel weights for this decision.**

- Support tickets from free-tier users in their first week: high weight. Direct friction signal.
- In-app feedback from free-tier users during onboarding: high weight. Moment-of friction.
- NPS data from free-tier users: moderate weight. Aggregate sentiment.
- Sales call data: low weight. Sales calls are usually with prospects, not free signups; pre-decision conversation differs from post-signup experience.
- Customer council data: low weight. Councils usually have established customers, not new signups.
- Support tickets from long-tenured customers: low weight. Their onboarding friction was a year ago; current onboarding may differ.

The decision weighs new-signup sources heavily. Long-tenured customer feedback is informative for other decisions but not this one.

### Decision: Should we launch a new pricing tier?

**Audience for the decision.** Both prospects and existing customers (existing customers may move tiers; prospects' tier choice affects acquisition).

**Channel weights for this decision.**

- Sales call data on pricing conversations: high weight. Prospects' pricing perception is critical.
- Support tickets about pricing or upgrade requests: high weight. Existing customer pricing pain points.
- Customer council discussion on pricing: high weight. Strategic discussion with curated customers.
- NPS data with pricing comments: moderate weight. Some signal but not decision-specific.
- Social mentions about pricing: moderate weight. Public perception affects acquisition.
- In-app feedback unrelated to pricing: low weight. Off-topic for this decision.

Multiple high-weight channels because the decision spans audiences.

### Decision: Should we invest in social mention monitoring as a primary channel?

**Audience for the decision.** Strategic question about feedback aggregation infrastructure.

**Channel weights for this decision.**

- Past examples of social signal driving decisions: high weight. Direct evidence.
- Past examples where social signal misled (vocal minority, anonymous accounts): high weight as counter-evidence.
- Other companies' published patterns on social signal: moderate weight. Indicative but not specific.
- Internal team intuition about social signal: low weight unless backed by data.

The decision weighs evidence of past signal-driven decisions heavily.

---

## The averaged-noise failure

When sources are weighted equally regardless of decision relevance.

**The pattern.**

- The team aggregates all feedback equally.
- Volume from any source counts the same.
- The most-feedback issue gets prioritized regardless of source.

**Why it fails.**

- Decisions get made on aggregate volume rather than on signal that matters for that decision.
- Decisions that should be enterprise-driven get displaced by volume from segments that do not matter for that decision.
- The team optimizes for the squeaky-wheel signal because it is loudest in the aggregate.

**Worked failure.** The team is deciding whether to prioritize enterprise admin features. NPS and in-app feedback show low priority for this area (because most respondents are small-team users who do not need enterprise admin). Sales calls and enterprise support tickets clearly indicate the priority. The team aggregates volume, sees more total feedback against enterprise admin priority, and deprioritizes. Enterprise customers churn.

**The cure.** Weight by decision relevance. Enterprise channels weight high for enterprise decisions; small-team feedback should not displace enterprise signal on enterprise decisions.

---

## The loudest-voice failure

When the most vocal source dominates regardless of representativeness.

**The pattern.**

- A small number of customers complain frequently and loudly.
- Their feedback dominates synthesis because they generate the most volume.
- Their preferences shape the roadmap.

**Why it fails.**

- Vocal minorities do not represent the broader user base.
- Silent majority's needs go unaddressed.
- The roadmap optimizes for the customers most likely to complain rather than the customers most strategic for the business.

**The cure.** Weight by source quality and representativeness, not by volume. A complaint repeated 50 times by one user is not 50x the signal of one complaint by 50 distinct users.

---

## How to set weights

In practice, weighting is qualitative. Quantitative scoring schemes often produce false precision.

**The discipline.**

- For each decision, identify the audience (who the decision serves).
- Identify which channels surface signal from that audience.
- Identify which channels do not (and why their feedback is less relevant for this decision).
- In synthesis, give high-weight channel signal more attention than low-weight channel signal.

**Quantitative weighting risks.**

- Scoring systems (this channel = 3x weight; that channel = 1x) often produce false precision.
- Decisions made on weighted scores rather than on judgment can miss qualitative nuances.
- The discipline is qualitative judgment informed by source-relevance, not arithmetic.

**The honest framing.** Weighting is a judgment call. The synthesis names the weighting choices explicitly: "We weighted enterprise channel signal heavily here because the decision is about enterprise priorities." Readers can disagree with the weighting; disagreement is productive.

---

## Source bias acknowledgment

Each source has biases that affect its signal.

**Sources skew toward.**

- Support: users willing to contact support; tend toward problem-reporting.
- NPS: users with strong opinions; middle-ground underrepresented.
- In-app feedback: users who interact with widgets; specific segments may dominate.
- Sales calls: prospects, not existing customers; pre-purchase context.
- Social: users who post publicly; enthusiasts and angry voices.
- Councils: curated members; specific selection criteria.

**The synthesis discipline.** When weighting, acknowledge the bias. "Support tickets show high friction in this area" should be paired with "noting the support-channel bias toward users who contact support." The acknowledgment makes synthesis more honest and readers more informed.

---

## Multi-channel triangulation as weighting

When patterns appear across multiple channels, weighting becomes easier.

**Strong cross-channel signal.** Same pattern in support, NPS, in-app, and sales. The cross-channel pattern survives any single channel's bias.

**Single-channel signal.** Pattern in only one channel. Weighting depends on channel reliability for the decision; treat with more caution.

**Conflicting cross-channel signal.** Different channels disagree. Investigate the source of the conflict; the disagreement often reveals segment differences or context-specific patterns.

The discipline. Cross-channel triangulation is a form of weighting: patterns that survive multiple channels' biases are more reliable signal.

---

## Weighting in tooling

Some feedback aggregation tools support explicit weighting (priority scores, segment-specific dashboards).

**Tooling support.**

- Tagging by source channel and segment.
- Filtering and grouping by tag combinations.
- Dashboards that show signal per segment or channel.

**The tooling principle.** Tooling supports weighting; the weighting judgment still belongs to humans. Tools that automate weighting away from human judgment risk false precision.

**The build-vs-buy tension.** Many programs end up with custom dashboards or filtering that supports their specific weighting. Generic tooling rarely supports the program's specific decision-relative weighting needs out of the box.

---

## Common weighting failures

**No weighting.** All sources treated equally. Averaged-noise pattern.

**Static weighting.** Same weights regardless of decision. Misses that different decisions need different weights.

**Quantitative false precision.** Scoring systems that produce decisions without judgment.

**Volume as proxy for weight.** Loudest-voice pattern; whoever generates most feedback wins.

**Bias acknowledgment skipped.** Synthesis claims stronger signal than the channel's bias warrants.

**Single-channel reliance.** Decisions made on one channel's signal without triangulation.

---

## Methodology-level choices that stay in the public skill

The decision-relative weighting principle. Worked weighting examples for different decisions. The averaged-noise and loudest-voice failures. How to set weights. Source bias acknowledgment. Multi-channel triangulation. Weighting in tooling. Common failures.

## Implementation choices that stay internal

Specific weighting conventions for specific decision types. Specific tooling that supports weighting. Specific dashboard configurations. The team's own conventions for naming weighting choices in synthesis. These vary by team.

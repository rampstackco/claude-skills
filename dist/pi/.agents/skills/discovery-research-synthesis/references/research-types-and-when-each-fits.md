# Research types and when each fits

Five common discovery research types, what each surfaces, what synthesis they support, and how to compose them within a single discovery cycle.

Research-type selection is upstream of synthesis. The wrong types collected for the question produce data that synthesis cannot rescue. The right types collected, even at modest scale, produce synthesis that drives decisions.

---

## Customer interviews

**Format.** 30-90 minute conversations, structured or semi-structured. Often one-on-one, sometimes in pairs or small groups for specific contexts.

**Artifacts.** Recordings, transcripts, moderator notes, sometimes follow-up email exchanges.

**What this surfaces.**

- Why users do what they do (motivation, context, constraints).
- The struggling moments and workarounds users have built.
- The mental model behind user behavior.
- The trade-offs users are weighing that the team did not anticipate.
- The vocabulary users actually use (often different from internal product language).

**What this does not surface.**

- What users actually do in practice (interview self-report differs from behavioral data).
- Patterns that emerge only at scale (a single interview is one data point).
- Pricing willingness to pay (interview answers about price are notoriously unreliable).

**Synthesis implications.**

- Highest per-artifact richness; warrants careful per-transcript tagging.
- Best paired with other research types that quantify the qualitative patterns.
- Pattern thinness risk: 8-15 interviews surfaces patterns; 3-5 surfaces hypotheses that need more validation.

**Typical batch size.** 8-15 interviews per discovery cycle. Larger batches saturate (most patterns emerge by interview 8-10 in a focused topic).

---

## Support ticket reviews

**Format.** Audit of recent support tickets, often spanning a defined time window or a defined product area.

**Artifacts.** Tagged ticket dataset, agent-conversation transcripts, sometimes recorded support calls.

**What this surfaces.**

- The friction users actually hit (revealed by ticket volume).
- The vocabulary users use to describe broken experiences.
- The disconnect between intended user flow and actual user behavior.
- Repeated workflows that produce confusion or errors.
- Documentation and onboarding gaps.

**What this does not surface.**

- Why users got there (the ticket starts at the problem; the path before is not visible).
- The experience of users who did not contact support (silent struggling).
- Users who succeed without friction.

**Synthesis implications.**

- Lower per-artifact richness; higher volume; signal lives in patterns across many tickets.
- Best for surfacing concrete friction points; weak for understanding motivation.
- Often pairs with interviews (interviews explain why; tickets document where).

**Typical batch size.** 100-500 tickets per audit, often filtered by topic or product area.

---

## Sales call analysis

**Format.** Recording or transcript review of recent sales calls. Often pairs with sales team feedback on patterns they hear repeatedly.

**Artifacts.** Call recordings, sales notes, CRM-tagged objections, deal-stage data.

**What this surfaces.**

- Objections prospects raise (what makes the sale hard).
- Pricing-conversation patterns and price sensitivity by segment.
- Competitive mentions (which competitors are top-of-mind, what differentiation prospects ask about).
- The gap between marketing positioning and what sales actually leads with.
- Use cases prospects describe (sometimes different from how marketing describes the product).
- Words prospects use to describe their situation (vocabulary signal).

**What this does not surface.**

- Existing-customer experience (sales calls are pre-purchase).
- Why prospects who did not buy did not buy (lost-deal analysis is a separate research mode).

**Synthesis implications.**

- Pairs well with positioning and pricing decisions.
- Useful for marketing-product alignment work.
- Sales teams often have synthesis hypotheses already; the research either confirms or challenges those.

**Typical batch size.** 15-30 calls per audit.

---

## Survey data

**Format.** Quantitative responses to structured questions, often with optional qualitative comments.

**Artifacts.** Response dataset, segmented by audience attributes.

**What this surfaces.**

- The frequency and severity of patterns identified through other research.
- Segment differences (do Pro users and Free users have different needs).
- Quantitative validation of qualitative hypotheses.
- Aggregate satisfaction or NPS-style sentiment.

**What this does not surface.**

- Why users responded the way they did (closed-ended responses do not explain).
- Patterns that the survey questions did not anticipate (surveys cannot find what they did not ask about).
- Behavior (surveys reveal what users say, not what they do).

**Synthesis implications.**

- Best as validation of qualitative patterns at scale, not as primary discovery.
- Survey design biases (leading questions, response order effects, satisficing) compromise data; treat with skepticism.
- Open-ended comments are often the highest-value section of a survey.

**Typical batch size.** 100-2,000 responses, depending on segment specificity.

---

## In-app feedback

**Format.** Users submitting feedback through in-product channels (feedback widgets, NPS prompts, post-task surveys, error-state feedback forms).

**Artifacts.** Submitted feedback corpus, often timestamped and contextualized by where in the product the feedback was triggered.

**What this surfaces.**

- Friction at the moment users encounter it (high context fidelity).
- Patterns across many low-effort submissions.
- Feature requests grounded in specific usage moments.
- Bugs and broken experiences not captured by support.

**What this does not surface.**

- Users who did not bother to submit feedback (silent majority).
- Why users hit the friction (the feedback names the problem; not always the cause).
- Patterns from users who do not actively use the feedback channels.

**Synthesis implications.**

- Volume varies widely; some products see high in-app feedback volume, others minimal.
- Often pairs with support tickets (similar surface area; different submission channels).
- Useful as ongoing signal; this skill is more about the periodic-audit case (`user-feedback-aggregation` covers continuous synthesis).

**Typical batch size.** Ongoing; synthesized in periodic audits over defined windows.

---

## Composition across types

Strong discovery cycles combine research types deliberately.

**The pair-and-validate pattern.**

- Interviews (depth, ~12 conversations) provide qualitative patterns.
- Support tickets (volume, ~300 tickets) document where friction surfaces in practice.
- Survey (validation, ~500 responses) quantifies the patterns at scale.
- Synthesis weaves all three: interview patterns ground the why, tickets ground the where, survey grounds the how-many.

**The triangulate-the-decision pattern.**

- A specific decision (should we redesign onboarding) gets evidence from three sources.
- Interviews surface the experience of recent signups.
- Sales calls surface what prospects say onboarding will look like.
- Support tickets surface what new users actually hit.
- Synthesis converges three perspectives on the same decision.

**The single-type sufficiency pattern.**

- Some discovery questions only need one type. A pricing review might need only sales call analysis. A support-volume reduction effort might need only ticket analysis.
- Discipline: do not commission research types that will not contribute to the decision.

**The wrong-pairs to avoid.**

- Interviews + survey only, with no behavioral data: both are self-report; both can be wrong in the same direction.
- Survey only, no qualitative: the survey assumes the questions are right.
- Sales calls only, no customer voice: the prospect view is one segment; existing-customer voice may differ.

---

## Research-type pitfalls per type

**Interview pitfalls.** Recruiting bias (the easiest-to-recruit users are not always representative). Leading questions. Confirming the team's prior hypothesis rather than challenging it. Small-batch over-generalization.

**Support ticket pitfalls.** Survivorship bias (only users who contacted support are visible; users who silently churned are not). Tag quality (poor tagging compounds in synthesis). Time-window choice (a window that misses recent product changes can mislead).

**Sales call pitfalls.** Stage selection (early-stage discovery calls and late-stage closing calls reveal different things). Sales-team interpretation (sales reps' framings can color how calls are tagged). Anonymization vs detail (privacy needs can erase the specifics that matter).

**Survey pitfalls.** Response bias (who responds is not representative of who is asked). Question wording. Ordering effects. Satisficing (respondents click through without engaging). Falsely-precise quantitative output from low-quality data.

**In-app feedback pitfalls.** Channel bias (the kinds of users who submit in-app feedback differ from those who do not). Volume-driven prioritization (loudest categories get attention; quieter ones get missed).

---

## When to commission what

A short framework.

1. **Decision driving the research.** What product decision is this research meant to inform?
2. **Best research type for that decision.** Discovery (interviews lead), validation (survey or quantitative leads), friction-mapping (support and in-app feedback lead), positioning (sales call analysis leads).
3. **Composition.** Which secondary types triangulate the primary?
4. **Capacity.** What can be collected within the time and budget the decision allows?
5. **Existing data check.** Has the team already collected research that would answer the question? Mining existing artifacts often produces value before commissioning new research.

---

## Methodology-level choices that stay in the public skill

The five research types and what each surfaces. The composition patterns. The wrong-pairs to avoid. The pitfalls per type. The when-to-commission framework. The principle that research-type selection is upstream of synthesis quality.

## Implementation choices that stay internal

Specific recruiting platforms and incentive structures. Specific transcription tooling. Specific support-ticket platforms and their tagging schemas. Specific survey tools and statistical-significance configurations. Specific in-app feedback widgets and integration patterns. The team's own conventions for sample sizes within the bands. These vary by team, budget, and tooling.

# Beta type decisions

Closed/open, alpha/beta/RC, internal/external, time-bounded/open-ended. The combination decision and how it matches signal need.

Beta type is the upstream decision that constrains everything downstream: who participates, what feedback channels make sense, what graduation looks like. Getting the type wrong makes the rest of the program harder.

---

## Closed vs open

The cohort-control axis.

**Closed beta.** Invite-only. Participants are selected by the team based on criteria. Cohort is bounded.

**Strengths.**

- Calibrated cohort: the team knows who is in the beta and can match participants to the GA user profile.
- Quality of feedback: invited participants typically engage more substantively than self-selected open-beta users.
- NDA enforceability: closed cohorts can sign NDAs; open cohorts usually cannot.
- Synthesis tractability: bounded cohort means feedback volume is manageable.

**Weaknesses.**

- Recruiting overhead: identifying and inviting participants is real work.
- Limited diversity: the cohort reflects the team's recruiting choices; gaps in selection produce gaps in feedback.
- Slower feedback volume: smaller cohorts produce less total feedback.

**Open beta.** Anyone can join. Cohort is self-selecting.

**Strengths.**

- Volume: large numbers of participants quickly.
- No recruiting overhead: participants opt in.
- Marketing value: open betas can build pre-launch audience awareness.

**Weaknesses.**

- Self-selection bias: early adopters and enthusiasts skew the cohort; their feedback may not represent the broader target user.
- Signal-to-noise ratio: most participants do not provide actionable feedback; the team must mine signal from volume.
- NDA difficulty: open cohorts cannot reasonably enforce NDAs; the feature is essentially public.

---

## Alpha vs beta vs RC

The polish axis.

**Alpha.**

- Very early. Significant bugs expected.
- Internal users or trusted partners only.
- Goal: surface fundamental issues before broader exposure.
- Feedback orientation: bug discovery, fundamental flow validation.

**Beta.**

- More polished. Major bugs caught; remaining issues are friction or edge cases.
- Broader cohort. External customers in calibrated cohorts.
- Goal: validate the feature works for real users in real contexts.
- Feedback orientation: usage patterns, friction, behavioral signal, edge cases.

**RC (release candidate).**

- Essentially launch-ready. Production-grade quality expected.
- Cohort can be large (open beta or extended beta).
- Goal: last validation before GA, performance at scale, infrastructure readiness.
- Feedback orientation: scale issues, infrastructure issues, last-mile polish.

**The progression.** Many features pass through all three (alpha → beta → RC) before GA. Some skip alpha (sufficient internal testing) or skip RC (the beta is the last validation). The decision depends on feature complexity and risk tolerance.

---

## Internal vs external

The audience axis.

**Internal beta.** Only employees use the feature.

**Strengths.**

- Fast feedback: employees are easy to recruit and follow up with.
- High engagement: employees usually feel some ownership of company products.
- NDA simplicity: confidentiality is implicit.

**Weaknesses.**

- Missing customer context: employees experience features differently than customers (familiarity, infrastructure context, motivations).
- Bias toward team-known patterns: employees use products in ways the team designed for; customers often use products differently.
- Limited signal: internal-only cannot validate customer-context complexity.

**External beta.** Real customers use the feature.

**Strengths.**

- Real customer experience: feedback reflects how customers actually use the product.
- Behavioral signal: usage patterns from real customers inform GA decisions.
- Trust building: customers who beta-test become advocates.

**Weaknesses.**

- Requires customer relationship: cannot just turn the feature on for employees.
- Recruiting overhead: identifying willing customers and managing the cohort.
- Risk: bugs reaching customers can damage trust if not handled well.

**The combination.** Most strong betas pass through both: internal alpha, then external beta. Some skip internal (when internal use cases differ enough from customer use cases that internal validation is misleading).

---

## Time-bounded vs open-ended

The duration axis.

**Time-bounded beta.** A defined end date. Common durations: 4 weeks, 6 weeks, 8 weeks, 12 weeks.

**Strengths.**

- Forces the graduation decision. The end date arrives; the team must decide ready or not.
- Clarity for participants: they know how long they are committing.
- Resource bounding: the team's beta-running effort is bounded.

**Weaknesses.**

- Calendar pressure can force premature graduation: "we are at the end date so we are graduating" regardless of signal.
- Some signals need longer to surface: behavioral patterns may not be visible in 4 weeks.

**Open-ended beta.** No defined end. The beta runs until the team decides to graduate.

**Strengths.**

- Signal-driven graduation: the team graduates when the criteria are met, regardless of calendar.
- Allows long-running validation: behavioral signal can develop over months.
- Suits design partner programs: ongoing relationships rather than time-bounded cohorts.

**Weaknesses.**

- Beta-purgatory risk: beta runs indefinitely because nobody forces the graduation decision.
- Participant fatigue: open-ended commitments without clear duration drain engagement.
- Resource drain: the team's beta-running effort is open-ended.

**The default.** Most betas should be time-bounded. Open-ended is appropriate for design partner programs and specific extended-validation scenarios.

---

## The combination decision

How to choose across the four axes.

**Worked combinations.**

**Standard structured beta:** closed + beta + external + time-bounded (6-8 weeks).

- Use when: shipping a meaningful feature that needs validation before GA. Most common combination.

**Alpha:** closed + alpha + internal + open-ended (typically 2-6 weeks of internal testing before external alpha).

- Use when: very early feature; need to surface fundamental issues before exposing customers.

**Design partner program:** closed + alpha or beta + external + open-ended.

- Use when: building a feature with deep customer involvement; small set of partner customers (3-10) collaborating closely on shaping the feature.

**Open early access:** open + beta or RC + external + time-bounded (4-12 weeks).

- Use when: pre-GA marketing matters; the feature is sufficiently polished that early access can build audience; team can handle the volume.

**RC validation:** open or closed + RC + external + time-bounded (2-4 weeks).

- Use when: the feature is essentially launch-ready; need last validation at scale or in the production environment.

**Internal-only RC:** closed + RC + internal + time-bounded.

- Use when: the feature is for internal users (e.g., admin tools used by support team), or when external testing is impractical for the type of feature.

---

## When the combination decision goes wrong

Common mismatches.

**Open + alpha.** Open cohorts on an alpha-stage feature exposes customers to bugs the team has not caught. Damages trust. Cure: alpha should be closed; open up at beta stage when the feature is more polished.

**Closed + RC.** Closed RCs miss the at-scale validation that RCs are meant to provide. The cohort is too small to surface scale issues. Cure: RCs are usually open or large-closed.

**External + alpha + open-ended.** External customers commit to an alpha that has no end date and many bugs. Engagement decays. Cure: alpha should be internal or trusted-partner only; external alpha should be time-bounded and limited.

**Open + beta + open-ended.** Volume cohort with no end date. The beta runs forever; participants lose interest; the team cannot synthesize. Cure: time-bound the beta; force graduation decision.

---

## Beta type for specific contexts

Common contexts and the typical type combinations.

**B2B SaaS feature launch.** Closed + beta + external + time-bounded. 20-200 participants from existing customer base, 6-8 weeks.

**Consumer product launch.** Open + beta + external + time-bounded (or open + RC). 1,000-10,000+ participants, 4-8 weeks. Marketing value is part of the rationale.

**Enterprise platform major release.** Closed + alpha + design-partner + open-ended initially, then closed + beta + extended cohort + time-bounded for validation.

**Developer-tool launch.** Open + beta + external + time-bounded, with public roadmap and community feedback channels.

**Internal tool launch.** Closed + alpha or beta + internal + time-bounded. The cohort is the internal users who will use the tool post-GA.

**Compliance-impacting feature.** Closed + extended beta + external + carefully selected design partners. The validation needs to surface compliance edge cases before GA.

---

## Common beta-type failures

**Defaulting to soft-launch.** Skipping beta-type decisions and just turning the feature on for some users. Decide the type explicitly.

**Defaulting to open beta for everything.** Open volume substituted for calibrated cohorts. Open is right for some contexts; not for all.

**Mismatching alpha/beta/RC to feature polish.** Calling something "beta" when it is alpha (too many bugs); calling something "RC" when it is beta (not yet production-grade).

**Internal-only when external context matters.** Validates an internal experience that does not match what customers will encounter.

**Open-ended without graduation criteria.** Beta drifts into perpetual beta because no firm end was set.

---

## Methodology-level choices that stay in the public skill

The four axes (closed/open, alpha/beta/RC, internal/external, time-bounded/open-ended). Strengths and weaknesses per axis. Worked combinations. Common mismatches. Beta type for specific contexts. Common failures.

## Implementation choices that stay internal

Specific platform feature-flagging configurations. Specific recruitment platforms and processes. Specific NDA templates. Specific time-bounding workflows. The team's own conventions for beta-type decisions in different contexts. These vary by team and tooling.

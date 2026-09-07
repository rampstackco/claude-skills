# Participant selection criteria

Criteria that produce calibrated cohorts. Common selection failures. The cohort size question.

Participant selection determines what the beta can produce. Calibrated cohorts produce decision-grade signal; misaligned cohorts produce noise that does not represent the GA user. Selection is upstream of every other beta decision.

---

## Criteria that produce calibrated cohorts

**Match the post-launch user profile.** If the feature is for enterprise admins, beta participants should be enterprise admins, not curious individual users.

- Worked example: a feature for product managers at growth-stage SaaS companies. Beta participants should be PMs at growth-stage SaaS companies. Not designers, engineers, or PMs at very-early or very-late stage companies.
- The matching dimensions depend on the feature: role, company size, industry, usage volume, tenure, technical sophistication.

**Variety across relevant dimensions.** Not all participants identical.

- If the feature has segment-specific behavior, the cohort spans segments.
- If usage volume varies, the cohort includes high-volume and low-volume users.
- If geography matters (compliance, latency, language), the cohort spans relevant geographies.
- The variety should match the GA user diversity.

**Feedback willingness.** Participants who agree to provide feedback through structured channels.

- Soft commitment ("I will give feedback when I have time") is weaker than explicit commitment ("I will respond to weekly check-ins and complete the structured survey").
- Recruiting should make the feedback expectation explicit. Participants who agree are more likely to engage; participants who decline are honest about their availability.

**Existing relationship strength.** Customers with strong existing relationships are more likely to engage substantively.

- Champion users, design partners, customers with active customer success relationships engage more.
- Customers in churn-risk are less likely to engage; their feedback may also be less representative (the relationship is already strained).

**Real usage of the broader product.** Beta participants who use the broader product actively can give grounded feedback. Participants who signed up only for the beta and do not use the product otherwise often give surface-level feedback.

---

## Criteria that produce miscalibrated cohorts

**Self-selection only.** Open beta sign-ups skew toward enthusiasts and tinkerers.

- Skews toward users who try every new feature; their feedback may not represent the broader target user.
- Misses users who would adopt at GA but who do not seek out beta sign-ups.

**Highest-paying customers only.** Skews toward enterprise patterns.

- Misses smaller-team and individual use cases.
- Enterprise feedback may emphasize features that smaller customers do not need.

**Internal employees only.** Misses customer-context complexity.

- Employees experience features differently than customers (familiarity, infrastructure, motivations).
- Internal-only validation produces "we tested" without "real customers tested."

**Whoever happens to be available.** No selection criteria; the cohort is whoever the team can recruit quickly.

- The cohort may not match the GA user; signal does not transfer to the GA decision.

**Champion users only.** All beta participants are existing strong advocates.

- Enthusiastic feedback may overstate readiness; missing the friction non-champion users would hit.

---

## Variety calibration

How to ensure the cohort spans the relevant dimensions.

**The dimension audit.**

- For the feature being beta'd, identify the dimensions that affect user experience.
- Common dimensions: role, company size, industry vertical, usage volume, geographic region, technical sophistication, tenure with the product.
- Decide which dimensions matter most for this feature.

**Cohort composition.**

- For each high-priority dimension, ensure the cohort includes representation across the values.
- If role matters: cohort includes participants in each relevant role.
- If usage volume matters: cohort includes high-volume, mid-volume, low-volume users.
- If industry varies meaningfully: cohort spans industries.

**Worked example.** A feature for product managers using analytics tools.

- Role dimension: cohort is all PMs (no other roles).
- Usage dimension: high-volume PMs (active daily users) + mid-volume PMs (weekly users). Skip low-volume because they likely will not use the feature meaningfully.
- Company size dimension: 10-50 employee, 50-200 employee, 200-500 employee. Skip enterprise (different feature priorities).
- Tenure dimension: PMs who have used the product 3+ months (so they have established workflows the new feature will integrate into). Skip new users.

The cohort composition is intentional; each participant fits multiple criteria.

---

## The cohort size question

How many participants are enough.

**The calibration is signal-need-driven.**

- Bug discovery saturates fast: 20-30 participants surface most critical issues in 2-4 weeks.
- Behavioral signal saturates slower: 50-100 participants needed to see usage patterns clearly.
- Edge case discovery: 100-500+ participants needed; some edge cases never surface in beta.

**Common cohort sizes by beta type.**

- Design partner program: 3-10 participants.
- Closed alpha: 10-30 participants.
- Closed beta: 50-200 participants.
- Open beta: 500-5,000+ participants.
- RC validation: 1,000-10,000+ participants.

**The "more is better" anti-pattern.** Teams default to large cohorts thinking volume produces signal. In practice, larger-than-needed cohorts produce volume without proportional signal increase, while making feedback synthesis harder.

**The "smaller produces calibrated" principle.** A 50-person calibrated cohort often produces stronger signal than a 5,000-person uncalibrated one. Pick the smallest cohort that produces the signal needed.

---

## The recruitment process

How participants get selected.

**Sources.**

- Existing customer base: customer success identifies candidates matching the criteria.
- Sales pipeline: late-stage prospects who could become customers and provide feedback.
- Past beta participants: customers who participated in prior betas and proved engaged.
- Public sign-up forms (for open betas): with screening criteria applied to actual selection.
- Partner referrals: customers who recommend other customers fitting the profile.

**The screening.**

- Define the criteria explicitly (role, dimension values, feedback willingness).
- Apply the screening to candidates: who fits the criteria?
- For closed betas, decide which subset of fitting candidates to invite (cohort sizing).
- For open betas with screening, the sign-up form captures qualifying information; the team selects from sign-ups.

**The invitation.**

- Personalized invitations engage better than mass invitations.
- The invitation explains: what the beta is, what is expected, what participants get, how long it runs.
- Acceptance is opt-in; participants who decline are honest.

**The capacity.**

- Recruiting takes real time. A 50-participant closed beta may take 2-4 weeks of recruiting work depending on customer base and selection criteria.
- Plan recruiting time as part of the beta timeline.

---

## The diversity-vs-control tradeoff

Calibrated cohorts can over-control diversity in ways that miss valuable signal.

**The tradeoff.**

- Tightly-defined selection criteria produce a cohort that is uniform along the criteria. Reduces variety; may miss signal from users who differ.
- Loosely-defined criteria produce more diverse cohorts but make the cohort less calibrated to the GA user.

**The middle path.**

- Define the must-have criteria (role, key segment markers).
- Allow variety in the optional dimensions (industry, geography, tenure).
- The cohort is calibrated on what matters and varied on what does not.

---

## When recruitment fails

What to do when selection criteria cannot be met.

**Insufficient candidates fitting criteria.**

- Reconsider whether the criteria are too narrow.
- Extend recruiting time if feasible.
- Accept a smaller cohort that fully fits the criteria, rather than a larger cohort that includes mismatches.

**Candidates fitting criteria decline to participate.**

- Investigate why. Is the beta commitment too heavy? The compensation insufficient? The timing wrong?
- Adjust the offer; re-invite.
- If still insufficient, consider whether the beta plan is realistic given customer engagement willingness.

**Cohort skew despite intentional selection.**

- Some dimensions skew despite efforts (e.g., one industry over-represented because that industry is more receptive).
- Acknowledge the skew explicitly in synthesis. Patterns from the over-represented dimension may not generalize.

---

## Common selection failures

**No criteria.** Whoever happens to be available joins. Cohort does not represent GA user.

**Self-selection only.** Open sign-ups skew the cohort.

**Only champions.** Cohort over-represents enthusiasts; misses friction non-champions hit.

**Internal employees only.** Misses customer-context complexity.

**Single-dimension calibration.** Cohort uniform on one dimension (role) but mismatched on others (usage, segment).

**Recruiting too late.** Beta starts before the cohort is calibrated; recruitment continues mid-beta; signal is muddled.

**Enterprise-only.** Cohort over-represents large customers; misses smaller use cases.

---

## Methodology-level choices that stay in the public skill

The criteria for calibrated cohorts. The criteria for miscalibrated cohorts. Variety calibration with worked example. The cohort size question. The recruitment process. The diversity-vs-control tradeoff. When recruitment fails. Common selection failures.

## Implementation choices that stay internal

Specific recruiting tools and CRM integration. Specific screening surveys. Specific outreach templates. Specific tracking of cohort composition. The team's own conventions for selection criteria within different beta types. These vary by team and customer base.

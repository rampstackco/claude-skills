# Beta-to-GA graduation criteria

The six graduation criteria. The "tired of the beta" anti-pattern. The perpetual beta anti-pattern.

Graduation is the decision that distinguishes a structured beta from beta theater. Honest graduation criteria, applied honestly, separate "ready for GA" from "we are tired of running the beta." Defining the criteria explicitly upfront prevents calendar-driven graduation decisions later.

---

## The six graduation criteria

The criteria that should be met before graduating from beta to GA.

### 1. Critical bugs cleared

**The criterion.** No known crashes, data loss, or core-flow failures.

**The validation.** Bug tracker shows no open critical issues. The beta cohort has not reported new critical issues in the past 1-2 weeks.

**The exception.** Some critical issues may be acceptable if they affect a tiny segment that the GA can either exclude or address with documentation. Decisions to graduate with known issues should be explicit.

### 2. Friction issues addressed or accepted

**The criterion.** Friction issues are either fixed before GA or documented as known limitations the team is choosing not to address pre-GA.

**The validation.** Each friction issue from the beta has a disposition: fixed, fix-in-progress (with timeline), accepted-for-now (with rationale), accepted-permanently (with rationale).

**The honest disposition.** "Accepted for now" is honest if the team plans to address post-GA. "Accepted permanently" is honest if the team has decided the friction is not worth the engineering cost. Hidden friction that the team hopes nobody will notice is not honest.

### 3. Behavioral validation

**The criterion.** Beta participants are using the feature in patterns the team expected. Unexpected patterns are understood (either incorporated into the GA experience or addressed).

**The validation.** Usage data from the beta cohort shows the feature being used in the ways the design assumed. Significant deviations are investigated; either the design is adjusted, or the GA experience is modified to support the actual usage pattern.

**The unexpected-pattern handling.**

- Pattern A: most beta participants are using the feature in a different way than the design assumed. The design is wrong; iterate before GA.
- Pattern B: a subset of participants is using the feature in an unexpected way that suggests an additional use case. Capture for post-GA expansion; do not delay GA.
- Pattern C: participants are not using the feature much at all. The feature may not be solving a real problem; reconsider whether to ship.

### 4. Performance under load

**The criterion.** The feature performs adequately at the scale GA will produce.

**The validation.** Performance testing under projected GA load. Beta cohort performance was acceptable; the GA scale projection has been tested.

**The infrastructure-validation focus.** For features where scale is the primary concern (data-processing features, real-time features, multi-tenant features), this criterion is the central one. RC betas often exist primarily to validate this.

### 5. Documentation and support readiness

**The criterion.** Help docs reflect actual usage; support team is trained on common issues; escalation paths work.

**The validation.**

- Help docs match the feature as it will ship at GA.
- Support team has been briefed and has handled at least the simulated beta-tier ticket volume.
- Common issues are documented for the support team's reference.
- Escalation paths from support to engineering are tested.

**The skip risk.** Teams often graduate before docs and support are ready. The GA launch then catches the support team off-guard; tickets pile up; users have a worse experience than they would have with proper readiness.

### 6. Positive signal sufficient

**The criterion.** Beta feedback is net-positive enough to launch with confidence.

**The validation.**

- Survey signal shows positive sentiment among beta participants.
- Behavioral signal shows continued usage (participants are not just trying the feature once).
- Participants would recommend the feature to others.

**The "sufficient" calibration.** Not all participants need to be delighted. A substantial majority finding value, with the dissenting voices understood (segment misfit, expectations mismatch, unfixable friction), is sufficient. A divided cohort with no clear majority signal is not.

---

## The "tired of the beta" anti-pattern

Graduation that happens because the team wants to be done with the beta.

**The pattern.**

- Beta has run for the planned duration.
- Some criteria are met; some are not.
- The team graduates anyway because "we have to ship at some point" or "the beta cannot run forever."

**Why it fails.**

- Unmet criteria mean the GA launches with known issues that are not yet addressed or acknowledged.
- Support, marketing, and customer success encounter problems the beta would have caught if extended.
- Trust degrades: customers experience friction the beta participants reported but the team did not fix.

**The cure.**

- Either extend the beta until criteria are met.
- Or graduate with explicit acknowledgment of the unmet criteria (known issues, deferred work).
- Or reset the beta if significant changes are needed.

The discipline: the graduation decision is criteria-driven, not calendar-driven. Calendar pressure can inform whether to ship a smaller scope, but it should not produce graduation despite unmet criteria.

---

## The perpetual beta anti-pattern

Graduation that does not happen because the beta drifts indefinitely.

**The pattern.**

- Beta runs without firm graduation criteria.
- Issues keep surfacing; the team keeps fixing; the beta extends.
- 6 months later, the beta is still running. The "perpetual beta" branding becomes a strategic stance ("everything is always evolving").
- The GA commitment is avoided.

**Why it fails.**

- Beta participants experience indefinite uncertainty about the feature's status.
- The team avoids the discipline of GA readiness; the feature stays in a less-mature state than it could be.
- Marketing, support, and customer success cannot operate around a beta-forever feature.
- Stakeholder trust degrades: the team is not shipping.

**The cure.**

- Force the graduation decision. Either the criteria are met (graduate) or they are not (decide what would make them met, set a timeline, commit).
- "Perpetual beta" as a strategic stance is rare and usually a rationalization.
- Some features genuinely need extended-beta status for valid reasons (regulatory complexity, unusual scale validation); these should be exceptions documented explicitly, not the default.

---

## Honest graduation patterns

When graduation criteria are mostly but not fully met.

**Graduation with known issues.**

- Some criteria fully met; one or two have known gaps.
- Graduate with explicit acknowledgment: "We are shipping with X known limitation; documented; will address in [timeline]."
- Communicate the known issues to support, marketing, customer success.
- Customers who hit the known issue are not surprised; they were warned.

**Graduation with extended monitoring.**

- Behavioral signal not fully validated due to cohort limitations.
- Graduate with monitoring infrastructure that surfaces issues at GA scale.
- Plan for fast iteration if monitoring catches issues post-GA.

**Graduation with phased rollout.**

- All criteria met for a subset of users; less certain for broader users.
- Graduate to the validated subset first; expand the rollout in phases.

These patterns preserve graduation discipline while accommodating real-world constraints.

---

## When NOT to graduate

Conditions that warrant extending or resetting the beta.

**Not to graduate.**

- Critical bugs are unaddressed.
- Major friction issues affect mainline usage.
- Behavioral signal contradicts the design assumptions.
- Performance under projected load is inadequate.
- Documentation and support are not ready.
- Beta sentiment is divided without clear positive signal.

**The honest extension.**

- Acknowledge the gap explicitly.
- Define what would close the gap.
- Set a new timeline.
- Communicate to participants and stakeholders.

**The reset.**

- If the gap requires significant feature changes, end the current beta and start a new one with the changed feature.
- Do not blend "old beta" and "new feature" data.

---

## Graduation decision-making

Who decides graduation and how.

**The decision-maker.** Typically the product manager who owns the feature, with input from engineering lead, design lead, and beta program manager.

**The decision process.**

- Beta program manager prepares a graduation review document: status against each criterion, known issues, recommendation.
- Decision meeting (60-90 minutes): review the document, discuss any open questions, make the decision.
- Decision recorded explicitly: graduate, extend, or reset.

**Stakeholder visibility.** The decision is communicated to stakeholders (executives, marketing, sales, customer success) before participants are notified.

**Graduation timing.** Once the decision is made, graduation typically takes 1-2 weeks to execute (final code, marketing prep, support readiness, participant communication).

---

## Graduation criteria for different beta types

The criteria adapt to the beta type.

**Closed beta with calibrated cohort.** All six criteria apply. The cohort is small enough to validate behavioral signal directly.

**Open beta with large volume.** Behavioral signal validates at scale. Critical bugs and performance criteria are more central. Documentation and support readiness scale with the open-beta visibility.

**RC validation.** Performance under load is the central criterion. Other criteria should already have been met in prior alpha or beta stages.

**Design partner program.** The criteria apply but graduation often happens incrementally (specific design partners moving to GA terms while the program continues with new partners). Less of a single graduation moment.

**Internal beta.** Customer-context criteria (behavioral validation, support readiness for external) may need to be validated at GA rather than during beta. Honest disclosure: the beta did not fully validate the customer experience.

---

## Common graduation failures

**Calendar-driven graduation.** Graduate when the planned duration ends regardless of criteria.

**Criteria not defined upfront.** Graduation decision happens without explicit criteria; subjective decision.

**Hidden known issues.** Graduate with known issues that are not surfaced; customers and support discover them later.

**Perpetual beta.** Indefinite extension; graduation decision avoided.

**Premature graduation.** Graduate before behavioral signal has emerged or critical bugs are fully cleared.

**No stakeholder notification.** Graduation happens; support, marketing, customer success encounter the GA launch unprepared.

**No participant communication about graduation.** Beta participants are not told about graduation timing or what changes for them.

---

## Methodology-level choices that stay in the public skill

The six graduation criteria. The "tired of the beta" anti-pattern. The perpetual beta anti-pattern. Honest graduation patterns. When not to graduate. Graduation decision-making. Graduation criteria for different beta types. Common failures.

## Implementation choices that stay internal

Specific graduation review document templates. Specific decision-meeting formats. Specific stakeholder notification workflows. The team's own conventions for graduation timing. These vary by team and tooling.

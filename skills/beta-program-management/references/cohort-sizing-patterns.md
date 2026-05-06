# Cohort sizing patterns

Saturation patterns by feedback type. Sizing decisions for different beta goals. The size-matches-signal principle.

Cohort size is a calibration decision, not a maximize-volume decision. Each beta has a specific signal need; the right cohort size is the smallest that produces that signal reliably.

---

## Saturation patterns by feedback type

Different kinds of feedback saturate at different cohort sizes.

**Critical bugs (crashes, data loss, broken core flows).**

- Saturate fast: most surface in the first 1-2 weeks with 20-30 participants.
- Beyond ~50 participants, additional volume produces few new critical bugs.
- The cohort size for bug discovery: 20-50 participants is usually sufficient.

**Friction issues (workflow interruptions, confusing flows, slow performance in specific cases).**

- Saturate moderately: most surface in 2-4 weeks with 50-100 participants.
- Volume helps surface friction in less-common usage patterns.
- The cohort size for friction discovery: 50-200 participants typical.

**Behavioral patterns (how users actually use the feature, what flows they follow, what features they ignore).**

- Saturate slowly: 4-8 weeks with 100-500 participants needed for clear patterns.
- Patterns require usage volume; small cohorts may not generate enough usage to see patterns.
- The cohort size for behavioral signal: 100-500+ participants typical.

**Edge cases (unusual configurations, rare usage contexts, specific environment combinations).**

- Saturate very slowly: 500+ participants needed; some edge cases never surface in beta and are discovered post-GA.
- Volume is the only way to surface low-frequency edge cases.
- The cohort size for edge case discovery: 500-5,000+ participants; even at this scale, rare cases may slip through.

**Performance under load (scale-related issues, infrastructure constraints, concurrent-use issues).**

- Saturate when cohort exceeds the load threshold the issue requires.
- 1,000-10,000+ participants for at-scale validation.
- Often the central goal of RC betas.

---

## Sizing decisions for different beta goals

The cohort size matches what the team needs to learn.

**Goal: Catch critical bugs before GA.**

- Cohort size: 20-50 participants.
- Duration: 2-4 weeks.
- Closed cohort, calibrated to GA user profile.
- Most critical bugs surface fast; beyond this, returns diminish.

**Goal: Validate behavioral assumptions about how users will use the feature.**

- Cohort size: 100-300 participants.
- Duration: 4-8 weeks.
- Closed cohort with variety across usage patterns.
- Behavioral patterns need usage volume to emerge clearly.

**Goal: Validate product-market fit assumptions for a major new feature.**

- Cohort size: 200-500 participants.
- Duration: 8-12 weeks.
- Closed cohort spanning segments.
- Long enough duration to see retention and continued usage, not just initial engagement.

**Goal: Validate at-scale infrastructure for a launch.**

- Cohort size: 1,000-5,000+ participants.
- Duration: 4-8 weeks.
- Often open beta or large closed RC.
- Volume is the point; calibration is less important than scale.

**Goal: Build a design partner program for ongoing collaboration.**

- Cohort size: 3-10 partners.
- Duration: open-ended (months to years).
- Highly calibrated cohort with strong relationships.
- Depth over breadth; the program is qualitative collaboration, not at-scale validation.

**Goal: Generate pre-launch marketing and audience.**

- Cohort size: 1,000-10,000+ participants.
- Duration: 4-12 weeks.
- Open beta with marketing-driven recruitment.
- The cohort serves both validation and pre-launch buzz.

---

## The size-matches-signal principle

The cohort should be the smallest size that produces the signal the team needs.

**Why "smaller is better when calibrated."**

- Smaller cohorts produce more synthesizable feedback. The team can read every transcript, review every survey response, follow up with every participant who reports an issue.
- Smaller cohorts make participant relationships stronger. Each participant feels seen; engagement is higher.
- Larger cohorts produce volume that can drown signal. The team cannot synthesize 5,000 pieces of feedback as well as 50.

**When larger is necessary.**

- The team needs at-scale validation (load, concurrent users, edge cases).
- The team needs marketing reach.
- The team needs behavioral signal that requires substantial usage volume.

**The discipline.** Default to the smallest cohort that produces the needed signal. Justify any larger size against specific signal needs.

---

## Cohort size and feedback channel design

Larger cohorts require different feedback channel design than smaller ones.

**For cohorts of 5-50.**

- Direct channels work: email, dedicated Slack, structured interviews.
- The team can engage with each participant individually.
- Synthesis can include reviewing all feedback.

**For cohorts of 50-500.**

- Mixed channels: structured surveys + sample interviews + in-product feedback widgets.
- Sampling required for synthesis: review all surveys, sample interviews and tickets.

**For cohorts of 500-5,000.**

- Aggregated channels: in-product feedback widgets, support ticket aggregation, automated surveys.
- Heavy sampling: review aggregate patterns, sample individual feedback.

**For cohorts of 5,000+.**

- Volume aggregation: NPS-style scoring, automated categorization, statistical analysis of usage patterns.
- Individual feedback rarely reviewed; patterns are the signal.

The implication. Beta planning includes feedback channel design appropriate to cohort size. Mismatches (small cohort with aggregated channels, or large cohort with direct channels) produce friction.

---

## Adjusting cohort size mid-beta

Sometimes the team realizes mid-beta that the cohort is wrong-sized.

**Cohort too small.**

- Symptom: feedback volume is insufficient to see patterns.
- Cure: open recruitment for additional participants, applying the same selection criteria.
- Caution: late additions have less time in the beta; their feedback covers less of the beta period.

**Cohort too large.**

- Symptom: feedback volume overwhelms synthesis capacity; the team is reactive rather than analytical.
- Cure: usually do not reduce; instead, scale up synthesis capacity (more reviewers, more aggregation tooling). Reducing cohort feels like a betrayal to participants.
- Prevention: better sizing decision upstream.

**Cohort skewed.**

- Symptom: feedback patterns reflect skew (one segment over-represented).
- Cure: targeted recruitment to balance the cohort, or explicit acknowledgment of skew in synthesis.
- The cohort cannot always be re-balanced quickly; sometimes the synthesis adjusts for the skew rather than the cohort.

---

## Cohort and beta duration

Cohort size and duration interact.

**Short beta (2-4 weeks).** Smaller cohort works because feedback saturates faster on critical issues. 20-100 participants typical.

**Medium beta (4-8 weeks).** Mid-size cohort matches the duration. 50-300 participants typical.

**Long beta (8+ weeks).** Larger cohort works because behavioral signal needs duration. 100-1,000+ participants.

**The mismatch failures.**

- Long beta with small cohort: insufficient volume; the duration produces no proportional signal.
- Short beta with very large cohort: insufficient time; the volume produces no proportional learning.

The matching. Beta duration and cohort size both follow from signal need; they should be consistent.

---

## Common cohort sizing failures

**Defaulting to "more is better."** Large cohorts where small calibrated ones would produce stronger signal.

**Sizing without reference to signal need.** Cohort size set arbitrarily; team cannot defend why this size.

**Cohort size mismatched to duration.** Small cohort in a long beta produces sparse signal; large cohort in a short beta produces noise.

**Cohort size mismatched to feedback channel design.** Direct channels with too many participants overwhelm; aggregated channels with too few participants under-utilize.

**Mid-beta cohort changes without synthesis adjustment.** Cohort grows or shrinks; the synthesis approach does not adapt.

**Confusing volume with signal.** Larger cohort numbers reported as success; the team did not actually learn proportionally more.

---

## Methodology-level choices that stay in the public skill

The saturation patterns by feedback type. Sizing decisions for different beta goals. The size-matches-signal principle. Cohort size and feedback channel design alignment. Adjusting cohort size mid-beta. Cohort and beta duration interaction. Common failures.

## Implementation choices that stay internal

Specific recruitment automation tooling. Specific aggregation tooling for large cohorts. Specific synthesis processes for different cohort sizes. The team's own conventions for sizing within the bands. These vary by team and tooling.

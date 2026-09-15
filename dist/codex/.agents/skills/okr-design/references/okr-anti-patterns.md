# OKR anti-patterns

Eight-plus anti-patterns including OKR-as-roadmap, sandbagging, fantasy, vanity metrics, OKR theater, compensation coupling, and others. Each anti-pattern names a recurring failure mode that decays OKR practice over time.

---

## Anti-pattern 1: OKR-as-roadmap

**The pattern.** OKRs are written as a list of features the team plans to ship.

**Examples.**

- "Objective: Ship the activation redesign. KR: Activation redesign launched by week 8. KR: Welcome email v2 launched by week 4."

**Why it fails.**

- Outputs disguised as outcomes. The team is committing to work, not to results.
- The outcome the work is meant to produce goes unspecified; the team can ship the redesign without producing the activation outcome.
- OKRs become roadmap commitments to stakeholders; mid-quarter tactical changes feel like broken promises.

**The cure.** Each OKR names the outcome the work is meant to produce. The work itself lives in the roadmap.

---

## Anti-pattern 2: Sandbagging

**The pattern.** OKRs designed to hit 100%. Targets at or below the team's current trajectory.

**How it manifests.**

- KR targets within 5% of current values.
- KR targets achievable on standard execution without focused effort.
- Average end-of-quarter scores at 95%+.
- Team consistently celebrates "hitting all our OKRs."

**Why it fails.**

- No stretch; no learning. The team did not commit to ambition; the OKR practice produced no signal beyond what the team would have done anyway.
- Sandbagging compounds. Teams that sandbag once learn that sandbagging is safe; subsequent quarters get worse.
- Stakeholder trust degrades. Stakeholders learn that "hitting OKRs" does not mean ambitious work was done.

**The cure.** Set targets above the team's current trajectory. Use the historical-trajectory test: where would the metric land without focused effort? The OKR target should be meaningfully above that.

---

## Anti-pattern 3: Aspirational fantasy

**The pattern.** OKRs that nobody can hit. Targets with no realistic effort path.

**How it manifests.**

- KR targets at 5x or 10x current values without underlying capacity changes.
- Targets set for inspiration rather than commitment.
- Average end-of-quarter scores at 30% or below.
- Team disengages from OKRs by week 3-4 of the quarter.

**Why it fails.**

- Demoralizing. Teams cannot hit fantasy targets; the targets become decoration.
- Loss of meaning. When OKRs cannot be hit, scoring loses meaning; teams stop tracking.
- Compensation distortion. If OKRs are tied to compensation, fantasy targets create unfairness; teams cannot earn rewards regardless of effort.

**The cure.** Validate against the effort-path test. Can the team identify specific initiatives that would produce the target? If yes, the target is reachable. If the team cannot identify any path, recalibrate.

---

## Anti-pattern 4: Vanity metrics

**The pattern.** KRs that measure impressive numbers not tied to the outcome.

**Examples.**

- "Reach 1M users."
- "Generate 10K leads."
- "Reach 500K social followers."

**Why it fails.**

- Numbers can be moved without producing the outcome the OKR was meant to address.
- Vanity targets often correlate with marketing or acquisition spend rather than with product outcomes.
- The team can hit vanity KRs while the underlying outcome (engagement, retention, revenue) does not improve.

**The cure.** Each KR should connect to the outcome the OKR targets. If the connection is unclear, the KR is probably vanity. Replace with a KR that more directly measures the outcome.

---

## Anti-pattern 5: OKR theater

**The pattern.** OKRs are documented and presented but do not drive decisions.

**How it manifests.**

- OKRs are set at the start of the quarter and not referenced again until end of quarter.
- Mid-quarter prioritization decisions ignore OKRs.
- The team makes the same prioritization choices that they would have made without OKRs.
- OKR scores are produced at end of quarter but do not inform the next quarter's planning.

**Why it fails.**

- The OKR practice produces overhead without value. The team spends time on OKR ceremony without changing what they would have done.
- Stakeholder skepticism builds. Stakeholders learn that OKRs are not load-bearing.
- The practice decays further over time as the team rationalizes that the ceremony does not matter.

**The cure.** Tie OKRs to specific decisions. Mid-quarter prioritization debates should reference OKRs. Roadmap items should map to OKRs. Scoring should inform the next quarter. If none of these happen, the OKR practice is theater; reform or abandon.

---

## Anti-pattern 6: Compensation coupling

**The pattern.** OKR scores directly determine bonuses or performance ratings.

**Why it fails.**

- Sandbagging incentives become severe. Teams set OKRs they know they can hit to protect their compensation.
- Honest scoring suffers. Teams round scores up to avoid compensation impact.
- Stretch ambition disappears. The OKR practice collapses to "what we are confident we can hit."
- Team trust in OKRs degrades; the practice becomes performance management theater.

**The cure.** Decouple OKRs from compensation. Compensation flows through performance reviews informed by many inputs (manager assessment, peer feedback, role expectations); OKR scores may be one input but should not be dominant.

**The transition.** Orgs that have coupled OKRs and compensation need explicit decoupling communication. Teams need to trust that scoring honestly will not affect bonuses; the trust takes 2-3 cycles to establish.

---

## Anti-pattern 7: OKR proliferation

**The pattern.** Teams set 8-12 OKRs per quarter. Every team member's work is reflected in some OKR.

**Why it fails.**

- Focus dilutes. The team works on too many things; trade-offs become impossible because everything is priority.
- Tracking burden grows. Weekly check-ins become status reports across too many KRs.
- Scoring becomes performative. Teams cannot honestly score 40+ KRs at end of quarter.

**The cure.** Cap OKRs. 2-4 objectives per team; 3-5 KRs per objective. Surface what is not in OKRs as deferred work that the team is choosing not to commit to this quarter.

---

## Anti-pattern 8: Cascade theater

**The pattern.** OKR documents include cascading ladders that look connected but do not actually drive work.

**How it manifests.**

- Team OKRs claim ladders to company OKRs but the team's actual work would have happened regardless.
- Cascading documents look impressive but do not coordinate cross-team work.
- The cascade is performed for stakeholders rather than for execution.

**Why it fails.**

- Cascading work is overhead without value.
- Cross-team coordination does not actually happen through the cascade.
- Stakeholders learn that the cascade is theater.

**The cure.** Make ladders explicit only when they genuinely connect. Loosen cascading where strict ladders produce theater. See `cascading-okrs-decisions.md` for the discipline.

---

## Anti-pattern 9: Mid-quarter recalibration as default

**The pattern.** OKRs get revised mid-quarter routinely. The team uses recalibration to soften OKRs that feel uncomfortable.

**Why it fails.**

- OKRs lose accountability. Teams learn that revising mid-quarter is acceptable; commitment loosens.
- Stretch ambition disappears. Discomfort triggers recalibration rather than effort.
- Targets drift toward sandbagging quarter over quarter.

**The cure.** Hold OKRs absent strategic shift, major disruption, or invalidating information. See `mid-quarter-recalibration.md` for the discipline.

---

## Anti-pattern 10: Output-only KRs

**The pattern.** Key results count work shipped rather than measure outcomes produced.

**Examples.**

- "Ship 5 onboarding initiatives."
- "Run 12 customer interviews."
- "Publish 8 marketing pieces."

**Why it fails.**

- Counts work, not outcomes. The team can hit these by doing work without producing the outcome.
- Optimizes for shipping volume rather than impact.
- Loses the connection between work and result.

**The cure.** For each output KR, identify the outcome the output is meant to produce. Replace the count with a measurement of the outcome.

---

## Anti-pattern 11: KRs entirely outside team influence

**The pattern.** KRs depend on factors the team cannot control.

**Examples.**

- "Total revenue grows 30%" (depends on sales execution and market conditions, not just product work).
- "Maintain market share" (depends on competitive dynamics).
- "Reach Series B" (depends on investor decisions outside the team).

**Why it fails.**

- The team cannot credibly commit. Effort does not produce predictable outcomes.
- Failure is not informative. Misses do not reveal what the team should have done differently.
- Demoralizing. Teams hit fail OKRs they had little ability to affect.

**The cure.** Rewrite KRs to focus on what the team can move. Total revenue may not be the team's KR; the team's contribution to revenue (e.g., product-led acquisition rate) might be.

---

## Anti-pattern 12: Generous scoring

**The pattern.** End-of-quarter scoring rounds up systematically.

**How it manifests.**

- KRs at 0.55 score 0.6 or 0.7.
- KRs at 0.85 score 1.0.
- The team's average score is 0.85+ even when objective outcomes were mid-range.

**Why it fails.**

- Honest signal lost. Scoring no longer reflects outcomes.
- Sandbagging compounds. Teams learn that scoring high is rewarded; subsequent quarters drift further.
- Lessons get lost. Misses scored as hits do not inform improvement.

**The cure.** Hold the discipline of honest scoring. Document context per score; the context surfaces what produced the actual outcome regardless of the number.

---

## The cross-cutting pattern

Most OKR anti-patterns share a single root: optimizing for the appearance of OKR success rather than for the underlying outcomes.

Sandbagging optimizes for hitting 100%. Fantasy optimizes for inspirational targets. OKR theater optimizes for documentation. Compensation coupling optimizes for bonus protection. Generous scoring optimizes for end-of-quarter celebration.

Each anti-pattern produces apparent OKR success while undermining the OKR practice's actual purpose. The fix in every case is the same: focus on the underlying outcomes the practice is meant to produce, not on the OKR ceremony itself.

---

## Methodology-level choices that stay in the public skill

The twelve anti-patterns with diagnoses and cures. The cross-cutting appearance-vs-outcome pattern.

## Implementation choices that stay internal

Specific anti-pattern detection in the team's tracking tools. Specific reviewer training. Specific intervention patterns when anti-patterns are detected. The team's own conventions for catching drift early. These vary by team.

# Common mistakes

Twelve failure patterns that recur in platform decisions. For each: name, symptom, root cause, fix, and prevention.

---

## 1. Picked the cheapest

**Symptom.** Six months in, the team is paying more in engineer time than they saved on the platform fee. Velocity is below the pre-decision projection.

**Root cause.** Sticker-price optimization without a total-cost frame. Engineer time, statistical correctness, and migration risk were not priced in.

**Fix.** Run a total-cost-of-ownership review. If TCO is materially worse, plan a migration to a better-fit platform. Counter-intuitively, paying more in platform fees can save more in engineer time.

**Prevention.** Use the total cost frame at decision time. The cheapest sticker price is rarely the cheapest TCO. See `cost-and-pricing-models.md` for the framing.

---

## 2. Picked the most-featured

**Symptom.** The team uses 20% of the platform's features. The other 80% are noise that complicates onboarding and inflates the bill.

**Root cause.** Demo-driven feature comparison. The platform's depth was impressive in the demo and translated into a "more features means more value" assumption.

**Fix.** Audit feature usage. If 80% of the platform is unused, evaluate whether a simpler platform serves the team better. Migrating to a smaller-surface platform reduces operational complexity.

**Prevention.** Build a "features needed" list before evaluating platforms. Use the list to filter out features you do not need; do not let demo-time enthusiasm expand it.

---

## 3. Tried multi-platform first

**Symptom.** Two platforms running, both partially used, neither fully embraced. Stakeholders cannot tell which one is the source of truth.

**Root cause.** "Best of both worlds" thinking. The team picked two platforms hoping to combine their strengths, but the integration cost exceeded the combined benefit.

**Fix.** Plan a consolidation. See `multi-platform-orchestration.md` for when consolidation is the right answer (almost always for teams in this state).

**Prevention.** Default to single-platform unless the surfaces genuinely do not overlap. Multi-platform is a 20% case, not the default.

---

## 4. Outgrew the platform but stayed for migration cost

**Symptom.** The team is hitting limits the platform cannot serve (statistical depth, governance, scale). They know it. They have not migrated because the migration project feels expensive.

**Root cause.** Migration cost is overweighted relative to the ongoing platform tax. The platform tax compounds; migration cost is fixed.

**Fix.** Run the migration. Set a 90-day window. Use the migration playbook.

**Prevention.** Do an annual platform fit review. If the platform is not the right fit, the answer is to migrate, not to defer. Deferral makes the migration harder, not easier.

---

## 5. Picked based on a demo

**Symptom.** Real usage reveals workflows that did not show up in the demo. Team velocity is below expectations. Frustration is mounting.

**Root cause.** Demos optimize for the show. Real usage reveals real tradeoffs. The decision was made before the team had data on actual workflows.

**Fix.** Run a 30-day trial on the next-best alternative. Compare real-usage friction. If the alternative is materially better, plan the migration.

**Prevention.** Always run a real trial, never just a demo. The trial should ship at least one experiment end to end on each platform under evaluation.

---

## 6. Did not check governance

**Symptom.** Discovered after rollout that anyone with platform access can modify production targeting. A bad change shipped because no review was required.

**Root cause.** Governance was not part of the evaluation. The team assumed defaults would be acceptable; they were not.

**Fix.** Build the governance layer immediately. Permission tiers, approval workflows, audit trails, environment promotion. See `governance-and-team-setup.md`.

**Prevention.** Make governance a non-negotiable evaluation criterion. For any platform under consideration, document the permission model, audit capabilities, and approval workflow before signing.

---

## 7. Picked a platform that does not fit team type

**Symptom.** Constant friction in experiment authoring. The team that should be shipping experiments is instead filing tickets. Experiment volume is below target.

**Root cause.** Team-fit mismatch. A PM-led team on a marketing-led platform, or vice versa. The platform's defaults pull the workflow in a direction the team cannot follow.

**Fix.** Either change the team's workflow to match the platform, or migrate to a platform that matches the team. The migration is usually the right answer because team workflow is hard to change quickly.

**Prevention.** Assess team fit explicitly. See the team-fit framework in `governance-and-team-setup.md`.

---

## 8. Underestimated the warehouse setup

**Symptom.** Picked a warehouse-native platform. Three months in, still not running experiments because the warehouse layer is not ready.

**Root cause.** Warehouse-native platforms expect the warehouse to already be the system of record with metrics defined and refresh cadences in place. The team did not have that foundation.

**Fix.** Either complete the warehouse setup (real engineering project) or migrate to a vendor-native platform that does not require it.

**Prevention.** Verify warehouse readiness before committing to warehouse-native. The platform decision should follow the warehouse decision, not lead it.

---

## 9. Skipped statistical depth review

**Symptom.** A critical experiment surfaced a wrong-result decision. The platform's defaults did not catch the issue (peeking, ratio metric, multiple testing, network effects).

**Root cause.** Statistical depth was not part of the evaluation. The team assumed all platforms compute the same numbers correctly; they do not.

**Fix.** Add the missing rigor. Either configure the current platform's advanced features (sequential testing, CUPED, delta method) or migrate to a platform with stronger defaults. Pair with the `experimentation-analytics` skill to interpret results going forward.

**Prevention.** Verify statistical depth at evaluation time. Ask specifically about CUPED, sequential testing, delta method for ratio metrics, and multiple testing corrections. Do not accept "we have statistical features" without specifics.

---

## 10. Ignored MCP trajectory

**Symptom.** AI-forward team picked a platform without MCP. Six months later, the team is hitting the limit of agent-driven workflows and the platform is the bottleneck.

**Root cause.** MCP trajectory was not weighted in the decision. The platform's strengths in other areas were assumed to make up for the gap.

**Fix.** Either wait for the platform to ship an MCP (uncertain timeline) or migrate to a platform with mature MCP. Eppo specifically is worth tracking for a future MCP release.

**Prevention.** For AI-forward teams, MCP availability is a primary criterion, not a tiebreaker. See `mcp-capability-comparison.md` for current state.

---

## 11. Locked the brief on the demo, not the trial

**Symptom.** Brief-time assumptions did not survive contact with real usage. The platform is technically capable but operationally uncomfortable in ways the demo did not reveal.

**Root cause.** The decision was made on the strength of the demo, with the trial running as a formality afterward. Real-usage signals were not weighted.

**Fix.** Do another trial of the next-best alternative. If the alternative removes the operational discomfort, migrate.

**Prevention.** Run the trial first. Use trial outcomes to update the brief, not the other way around. Demos are useful for screening; trials are required for committing.

---

## 12. Renewed without re-evaluating

**Symptom.** Renewal cycle came up. The team renewed because the platform was working "well enough." Six months later, an alternative shipped a feature that would have changed the decision.

**Root cause.** Renewal treated as a status-quo extension. The platform market changes faster than annual contracts, and a yearly renewal without re-evaluation drifts away from the optimal choice.

**Fix.** Run the platform decision framework at every renewal. If the answer is the same platform, renew with confidence. If the answer is different, plan a migration.

**Prevention.** Build the annual platform review into the team's calendar. Tie it to the renewal date so the review informs the renewal decision rather than competing with it.

---

## The pattern across all twelve

Most platform mistakes share one root cause: under-investment in the decision itself. A two-week evaluation that catches all twelve patterns is cheaper than a year on the wrong platform.

The fix at the meta level. Treat the platform decision as a real engineering project. Allocate time. Run trials. Audit governance. Verify statistical depth. Check MCP trajectory. Document the decision and the reasoning. Review annually.

# Flag lifecycle checklist

A phase-by-phase checklist for the operational discipline of a flag from creation through removal. Run through the phase the flag is currently in; do not skip ahead.

---

## Phase 1: Birth (creation)

Before merging the PR that introduces a new flag:

- [ ] Type committed. Release, experiment, operational, permission, or configuration. Pick one.
- [ ] Name follows the convention from `flag-naming-conventions.md`.
- [ ] Owner assigned. The team or person responsible for the flag's lifecycle.
- [ ] Target removal date set in metadata (release flags: 30-60 days; experiment flags: end of test plus 14 days; operational/permission/configuration flags: "long-lived, review annually").
- [ ] Rollout plan attached. Percentage, cohort, geo, or time-based; abort criteria defined.
- [ ] Monitoring approach attached. What metric is being watched? What alert fires if the rollout breaks something?
- [ ] Both code branches tested. The disabled branch (existing production) and the enabled branch (new code).
- [ ] Default value confirmed off in production.
- [ ] Removal sub-ticket created and scheduled (release/experiment flags only).

If any item is no, do not merge.

---

## Phase 2: Adolescence (pre-launch)

The feature behind the flag is being built in dev and staging. The flag remains off in production.

- [ ] Feature complete in code, both branches tested.
- [ ] QA sign-off on enabled branch.
- [ ] Staging rule mirrors planned production rule (does not have to match exactly; should be representative).
- [ ] Telemetry confirmed. Logs include flag value as a contextual field. Dashboards exist for the metrics the rollout will watch.
- [ ] Rollout plan reviewed by approver.

---

## Phase 3: Launch (rollout)

Production rollout begins. Each percentage step has its own gate.

For each step (typical: 1% → 10% → 50% → 100%):

- [ ] Apply rule change via platform UI, MCP, or API.
- [ ] Confirm rule applied. Flag evaluation rate matches expected percentage.
- [ ] Watch primary success metric, error rate, latency p95 for at least one peak hour.
- [ ] If clean, advance to next step.
- [ ] If degraded, hold or roll back. Document what was observed.

At 100%:

- [ ] Hold for 7 days at 100% before declaring launch complete.
- [ ] Confirm metrics stable across the full holding period.
- [ ] Schedule the 30-day review (calendar reminder for the owner).

---

## Phase 4: Maturity (post-launch)

Flag is at 100% rollout. Both code paths still exist. The new path is production.

- [ ] 30-day review: any regressions detected? Any rollbacks needed?
- [ ] Confirm the removal sub-ticket created at birth still exists and is scheduled.
- [ ] Confirm no unexpected dependencies on the flag from other code paths.

If the flag is operational, permission, or configuration, the lifecycle ends here. The flag is permanent.

If the flag is release or experiment, proceed to Phase 5.

---

## Phase 5: Death (removal)

The flag has reached its target removal date or its purpose is complete.

Code-side:

- [ ] Open a single PR that removes the flag's gating logic. One flag per PR.
- [ ] Delete the disabled branch (the old code path). Keep only the enabled branch.
- [ ] Delete tests that targeted the disabled branch.
- [ ] Update any documentation that referenced the flag.
- [ ] Confirm CI passes; tests still cover the new (now permanent) code path.
- [ ] Merge the PR.

Platform-side (after PR merges):

- [ ] Confirm the flag has zero evaluations in the platform's dashboard for at least 24 hours.
- [ ] Archive or delete the flag from the platform.
- [ ] Audit log entry confirms deletion with actor, timestamp, reason.

Documentation:

- [ ] Close the original removal sub-ticket created at birth.
- [ ] Update any team-level flag inventory the team maintains.

---

## Phase 6: Audit (quarterly)

Even with the discipline above, some flags will slip through. The quarterly audit catches them.

- [ ] Generate stale flag report from the platform (>30 days unevaluated for release/experiment, >90 days for operational).
- [ ] Triage in a meeting: keep, remove, or investigate per flag.
- [ ] Open removal PRs (one per flag) for the "remove" pile.
- [ ] Investigate the "investigate" pile; usually the answer is remove or rename.

For the full audit pattern, see `stale-flag-cleanup-playbook.md`.

---

## Common slips

The phases above describe the disciplined path. Common slips:

- Birth without removal date. Fix: require the removal date as part of the flag-creation form or PR template.
- Launch without monitoring. Fix: the rollout plan review at end of Phase 2 catches this.
- Maturity skipped (rolled to 100%, never reviewed). Fix: the 30-day review reminder is in the launch ticket.
- Death skipped (flag forgotten). Fix: the quarterly audit catches it.

The slips compound. A skipped death today is one more flag to clean up at quarter end. A hundred skipped deaths over a year is the productivity tax described in `stale-flag-cleanup-playbook.md`.

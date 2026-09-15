# Stale flag cleanup playbook

A quarterly cadence for keeping the flag inventory healthy. Without it, dead flags compound: every quarter adds 20-50 release/experiment flags that never got removed, and after two years the platform has hundreds of dead entries that nobody can confidently delete.

The playbook is mechanical. Run it every quarter, the same way. Resist the urge to skip a quarter because the platform "looks fine."

---

## What counts as stale

| Flag type | Stale threshold |
|---|---|
| Release | 30 days without evaluation |
| Experiment | 30 days without evaluation |
| Operational | 90 days without evaluation |
| Permission | Annual review; not "stale" by evaluation count |
| Configuration | Annual review; tied to contract status |

Most platforms expose a "stale flag" report or a "last evaluated" timestamp per flag. If yours does not, the SDK can be configured to emit evaluation events to an analytics destination, and the analytics database becomes the source of truth.

---

## Quarterly process

### Step 1: Generate the report

Pull the stale flag list from the platform. Filter by type-specific threshold above. Output: a list of flags with last-evaluation timestamp, owner, type, current rule.

### Step 2: Owner triage

For each flag in the list, route to the owner. The owner has three options per flag:

- **Remove.** The flag is dead. Open a code-side removal PR.
- **Keep.** The flag is still load-bearing for a real reason (operational kill switch that has not fired in 90 days but should remain; permission flag for a feature whose rule is being audited annually). Document the reason; remove from this quarter's list.
- **Investigate.** The owner does not know why the flag exists or what it controls. Spawn a sub-task to investigate; the flag stays in next quarter's list.

If a flag has no owner (the original owner left, ownership was never assigned, the flag predates the convention), rotate to the platform/SRE team for a forced decision in step 3.

### Step 3: Triage meeting

A 30-minute meeting per quarter. Attendees: representative from each team that owns flags, the platform/SRE team, the engineering lead.

Walk the list. For each flag:

- Confirm the owner's recommendation.
- For "investigate" flags, decide a deadline: investigation completes by next month or the flag is force-removed.
- For orphan flags (no owner, force-routed to platform), the platform team makes the call: remove if there is no evidence of active use, keep with documentation if there is.

The meeting produces three artifacts: a remove list, a keep list with reasons, an investigate list with deadlines.

### Step 4: Removal PRs

One PR per flag. Bundle is tempting; resist it. One-flag-per-PR has three advantages:

1. The reviewer can confirm the flag is genuinely dead by inspecting only the removed code paths.
2. If a flag was not actually dead (a code path uses it that the search missed), the rollback is a single revert.
3. The PR title and description reference the specific flag, which produces a clean audit trail.

Each PR:

- Removes the flag's evaluation calls from code.
- Consolidates the gated branches: usually keeps the "on" branch as permanent code and deletes the "off" branch.
- Removes any tests that targeted only the removed branch.
- Updates documentation that referenced the flag.

### Step 5: Platform deletion

After the removal PR merges and ships:

- Wait 24 hours for the new code to fully roll out.
- Confirm the platform shows zero evaluations of the flag for the full 24-hour window.
- Archive or delete the flag from the platform.
- Audit log entry confirms deletion with actor, timestamp, reason ("quarterly cleanup, removal PR #NNNN").

### Step 6: Verification

A week after platform deletion:

- Spot-check the codebase for any remaining references to the flag's key (string-grep). Should be zero.
- Spot-check the platform for the flag's reappearance (sometimes platforms restore archived flags via API automation; rare but worth checking).

---

## Orphan flags

Orphan flags (no owner) are the hardest case. The original owner left the company, the team that owned the area dissolved, the flag predates the ownership convention.

The pattern:

1. Default ownership routes to the platform/SRE team.
2. The platform team asks: "Is this flag's targeting rule consistent with documented product behavior? Would removing it change observable behavior for any user?"
3. If no observable change, remove. If yes, escalate to the team most plausibly impacted.
4. If no team can be identified and no observable change is detectable, the flag is a candidate for removal in the next quarterly meeting; document the orphan status and remove on a 60-day delay so any silent dependency can be discovered.

The 60-day delay is a hedge against unknown dependencies. In most cases, no one notices and the flag is safely removed. In the rare cases where a forgotten cron job or a downstream service was depending on the flag, the issue surfaces during the delay window.

---

## Tooling

Most platforms provide some automation:

- LaunchDarkly: Code References finds usages in the codebase, flags candidates for removal.
- Statsig: Stale Gates report.
- GrowthBook: stale flag dashboard.
- Flagsmith: change request workflow integrates removal with governance.

The automation reduces manual work but does not replace the triage meeting. The meeting is where humans make the keep/remove decision, which is the part automation cannot do.

---

## Make removal part of the launch checklist

The most important pattern is upstream: make flag removal part of the launch checklist, not a separate quarterly effort. When a release flag is created, the launch ticket has a sub-ticket scheduled 30 days out: "Remove flag X." When the launch goes well and the flag reaches 100 percent, the sub-ticket gets done as part of post-launch hygiene.

Quarterly cleanup is the safety net for everything that slips past the upstream discipline. The discipline reduces the safety-net workload from "300 dead flags" to "5 dead flags," which is the difference between a 30-minute triage meeting and a multi-day project.

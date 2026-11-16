# Go/No-Go Template

Fill this before the decision meeting. The meeting reads it and decides. It does not gather evidence in the room.

Every criterion is marked **passed**, **failed**, or **not evidenced**. Not evidenced counts as failed. One named person makes the decision.

---

## Template

```
# Go/no-go: [product] [version]

Candidate: [version]-rc.[N], build [identifier]
Release model: [train / continuous / milestone]
Decision owner: [name]
Deputy: [name]
Decision time: [YYYY-MM-DD HH:MM, time zone]
Prepared by: [name], [timestamp]

## Scope
Merged items in this release: [count], from [tracker query or version range]
Impact tags: [n] breaking, [n] feature, [n] fix, [n] internal
Version derivation: [highest impact] -> [major / minor / patch / CalVer increment]

## Criteria
| # | Criterion | Threshold | Evidence (link or attachment) | Status |
|---|---|---|---|---|
| 1 | Tests pass on the candidate build | All required suites green on rc.[N] | [runner summary for this build] | [passed / failed / not evidenced] |
| 2 | New work has test plans with results | Every story and bug fix in scope | [test plan links] | |
| 3 | Open S1 defects | 0 | [defect query] | |
| 4 | Open S2 defects | 0 without a workaround | [defect query, workarounds noted] | |
| 5 | Open S3 and S4 defects | Listed, accepted by the owner | [defect query] | |
| 6 | Rollback verified | Exercised within [your limit] on this deploy path | [date, result, time taken] | |
| 7 | Monitoring in place | Alerts and dashboards for changed areas exist | [links] | |
| 8 | Rollout plan complete | Stages, stop conditions, irreversible items filled | [link] | |
| 9 | Release notes drafted | Every user-facing item has a line; checked against the merged list | [link] | |
| 10 | On-call named | Owner for each stage of the rollout window | [names] | |
| 11 | Freeze exceptions | Each logged with a reason | [exception log] | |

Add rows for your product: accessibility checks, legal review, app store review, data protection review.

## Irreversible items
[List from the rollout plan, with the plan for each. "None" if none.]

## Decision
Decision: [GO / NO-GO]
Decided by: [name]
Reason: [one or two sentences tied to the criteria table]

## If no-go
Blocking criteria: [numbers from the table]
Fix: [what changes]
Owner: [name]
Next candidate: [version]-rc.[N+1], expected [date]
Next decision: [date and time]
Scope change, if any: [items removed from the release and where they go]

## Attendees
[names and roles]
```

---

## Notes on filling it in

- **Evidence is a link or an attachment.** "QA says it is fine" is not evidence. A runner summary, a defect query, or a signed test plan is.
- **Evidence is for this candidate.** A test run on `rc.1` does not cover `rc.2` for the areas the change touched.
- **Thresholds are set before the release.** Changing the threshold in the meeting to get to go is a no-go with extra steps.
- **The decision owner can still say no-go with every row passed.** Write the reason. Unknowns the table does not capture are real.
- **A go with an accepted risk names the risk.** "Go, with S2 #482 open and a documented workaround in the support macro."
- **No-go is a normal outcome.** Record it in the release history like any go. A team that never says no-go is not reading its own gate.

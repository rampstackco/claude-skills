# Release Checklist

Run this for every release. It covers the cycle from the cut through the post-release check. It does not cover the deploy commands themselves: write those once as a runbook with `launch-runbook` and call it from step 6.

For an out-of-cadence fix, use `hotfix-checklist.md` instead.

---

## 0. Before the first release: write the model down

Do this once, then revisit each quarter.

- [ ] Release model named: release train, continuous delivery, or milestone
- [ ] Cadence and cut time stated (train), or the release decision rule stated (continuous), or the scope list stated (milestone)
- [ ] Version scheme stated: SemVer, CalVer, or one for each surface (see `versioning-guide.md`)
- [ ] Freeze rules stated: what may merge, who decides exceptions, how long
- [ ] Go/no-go threshold stated: for example zero S1, zero S2 without a workaround
- [ ] Release owner role named, with a deputy
- [ ] Impact tags agreed for merged work items: breaking, feature, fix, internal
- [ ] Every merged item carries a one-line release note or "internal, no note"

### How the steps change by model

| Step | Release train | Continuous delivery | Milestone |
|---|---|---|---|
| Cut | At the fixed time, whatever is merged | Any merge can be a candidate; the release decision picks one | When the scope list is done |
| Freeze | One to two days | Usually none; the candidate is a single merge | Several days; scope is large |
| Go/no-go | Every release, short | Automated checks plus a human decision for user-facing changes | Every release, long |
| Notes | Batched per release | Batched daily or weekly from merged items | Large, often per audience |

---

## 1. Cut the candidate

- [ ] Merged list pulled from the tracker or version history since the last release tag
- [ ] Every item on the list has an impact tag and a release-note line
- [ ] Items without tags sent back to their authors before the cut, not guessed
- [ ] Version derived from the impact tags (see `versioning-guide.md`)
- [ ] Candidate built once and named: `[version]-rc.1` plus build identifier
- [ ] Candidate artifact stored where the deploy step will fetch it

## 2. Start the freeze

- [ ] Freeze announced with: start time, expected end, what may merge, exception owner
- [ ] Exception log opened (date, item, reason, approved by)
- [ ] Unfinished work in the candidate is behind a flag that is off (see `feature-flagging`)

## 3. Collect evidence

- [ ] Test run on the candidate build, runner summary attached
- [ ] Test plans for new stories and bug fixes in the candidate checked (see `test-case-authoring`)
- [ ] Open defects against the candidate listed with severity
- [ ] Rollback method named and last exercise date recorded; exercise it now if older than your stated limit
- [ ] Dashboards and alerts for the changed areas confirmed (see `monitoring-and-alerting`)
- [ ] Rollout plan filled (see `rollout-plan-template.md`), including irreversible items
- [ ] Release notes drafted and checked against the merged list
- [ ] On-call named for the rollout window

Any change to the candidate during the freeze makes a new `rc.N`. Recheck the evidence that the change touches.

## 4. Hold the go/no-go

- [ ] Template filled (see `go-no-go-template.md`) before the meeting, not during it
- [ ] Each criterion marked passed, failed, or not evidenced
- [ ] Decision owner present or a named deputy
- [ ] Decision and reason recorded
- [ ] On no-go: the blocking criteria, the fix, the owner, and the next date recorded and announced

## 5. Prepare the rollout

- [ ] Stage owners confirmed
- [ ] Stop conditions written as numbers, not adjectives
- [ ] Sent communications (emails, push, invoices) gated behind the final stage
- [ ] Support briefed on what is shipping and how to report problems

## 6. Deploy and roll out in stages

- [ ] Deploy steps run from the runbook (see `launch-runbook` for writing one)
- [ ] Internal stage: smoke checks passed, dwell time met
- [ ] Canary stage: watch signals within limits for the full dwell time
- [ ] Everyone stage: exposure complete
- [ ] Stage results recorded in the rollout plan, with times

On a stop condition: halt, roll back per the plan, record the stage, the signal, and the value. If users are affected, open an incident (see `incident-response`).

## 7. Publish the record

- [ ] Changelog: Unreleased entries moved under `[version] - YYYY-MM-DD`
- [ ] Release tagged in version control with the shipped version, not the candidate suffix
- [ ] Release notes published for each audience
- [ ] Deprecation notices published with dates
- [ ] Internal note sent (see `stakeholder-communication`)

## 8. Post-release check

- [ ] Watch signals steady through the agreed window after full exposure
- [ ] Freeze lifted and announced
- [ ] Follow-up items filed for every halt, exception, and defect found during rollout
- [ ] Release-owner notes added: what slowed the cycle, what to change next time
- [ ] Exception count logged; if it is above zero three releases running, review the freeze rules

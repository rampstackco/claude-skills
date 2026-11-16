# Hotfix Checklist

A hotfix is a release outside the cadence. It runs a shorter gate, not no gate. Use this instead of `release-checklist.md` for any out-of-cadence fix.

If production is actively failing, run `incident-response` first. Mitigate (roll back, turn a flag off) before writing a fix. The hotfix is usually what ships after mitigation.

---

## 1. Qualify

A hotfix is justified only if one of these is true. Record which.

- [ ] Production defect at S1 (severity scale from `ticket-authoring`)
- [ ] Production defect at S2 with no workaround
- [ ] Security fix that cannot wait for the next release
- [ ] Legal or compliance fix with a deadline before the next release

Does not qualify: a feature that missed the cut, an S3 someone is embarrassed about, a request from a single customer with no severity behind it. These wait for the next release. If the next release is too far away for anything, the cadence is the problem.

- [ ] Bug ticket exists with repro steps, severity, and a named fix verification test
- [ ] Release owner (or deputy) approves the hotfix in writing

## 2. Build the fix

- [ ] Branch from the released version tag, not from the main line. The main line holds unreleased work.
- [ ] Change is the smallest that fixes the defect. No refactors, no extra fixes riding along.
- [ ] Fix verification test written or updated, failing before the fix and passing after
- [ ] Second-person review completed

## 3. The shortened gate

| May be shortened | May never be skipped |
|---|---|
| Train schedule: ship now | Second-person review |
| Freeze: none beyond this change | Fix verification test passing on the hotfix build |
| Regression: the targeted set for the touched area, not the full suite | Targeted regression set for the touched area |
| Release notes: one Fixed or Security entry | Version bump (patch under SemVer, next micro under CalVer) |
| Stage dwell times: shortened | Changelog entry |
| Go/no-go meeting: a written decision by the release owner is enough | A known rollback method to the previous version |
| | At least one stage before everyone |

- [ ] Candidate built: `[patch version]-rc.1`
- [ ] Every "never skipped" item above has evidence
- [ ] Release owner records go or no-go with a reason

## 4. Roll out

- [ ] Internal or canary stage first, even if only for minutes
- [ ] Watch signals for the defect's symptom plus overall health
- [ ] Full exposure
- [ ] Defect confirmed gone in production, by the fix verification steps

## 5. Record

- [ ] Changelog entry under the patch version, dated
- [ ] Release tagged
- [ ] Short note to affected users if they saw the defect
- [ ] Support told the fix is live

## 6. Return to the main line

Do this the same day. A hotfix that lives only on a release branch comes back as a regression next release.

- [ ] Fix merged or cherry-picked onto the main line
- [ ] Fix verification test on the main line, passing
- [ ] If the main line has diverged so the fix does not apply cleanly, a separate main-line fix ticket is opened and linked
- [ ] Next release's merged list shows the fix, or shows it already present

## 7. Follow up

Every hotfix produces at least one follow-up item.

- [ ] Follow-up ticket: why the defect escaped the normal gate
- [ ] Follow-up ticket: the test or check that would have caught it
- [ ] For an S1, an after-action review (see `after-action-report`)
- [ ] Hotfix counted in the release history; more than one per cycle for three cycles is a signal about the gate, not about bad luck

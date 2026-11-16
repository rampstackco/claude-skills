# Rollout Plan Template

Fill this before the go/no-go. During the rollout, fill in the results column for each stage as it happens. The finished plan is part of the release record.

This plan stages the release build. For ramping one flagged feature inside it, follow `feature-flagging`. For the deploy commands, follow your runbook (see `launch-runbook`).

---

## Template

```
# Rollout plan: [product] [version]

Candidate: [version]-rc.[N], build [identifier]
Rollout owner: [name]
Rollback owner: [name]
Window: [start] to [expected end], [time zone]
Avoid: [dates and times with no on-call cover, peak business events]

## Watch signals
Signals for the whole release, tied to your service level objectives:
| Signal | Source | Normal range | Stop above or below |
|---|---|---|---|
| [error rate, all requests] | [dashboard link] | [range] | [number, duration] |
| [latency p95, changed endpoints] | | | |
| [key flow success rate, e.g. sign-in, checkout] | | | |
| [support contacts tagged to changed areas] | | | |

Signals for specific changes in this release:
| Change (merged item) | Signal | Stop condition |
|---|---|---|
| [item] | [signal] | [number, duration] |

## Stages
| Stage | Exposure | Who or what | Minimum dwell | Stop condition | Owner | Result |
|---|---|---|---|---|---|---|
| 1. Internal | [staff, test accounts, internal environment on production data] | [how selected] | [time] | Any watch signal past its stop value; any S1 or S2 found | [name] | [passed at HH:MM / halted at HH:MM, signal, value] |
| 2. Canary | [percent of traffic, servers, regions, or users] | [how selected] | [time covering a peak period] | [as above] | [name] | |
| 3. Everyone | 100 percent | All | Through the post-release check | [as above] | [name] | |

Advance only when the dwell time is met and every signal is inside its range. Advancing early is a decision the rollout owner records with a reason.

## Rollback
Method: [redeploy previous artifact / revert / flag off / other]
Previous good version: [version, build identifier]
Steps:
1. [step]
2. [step]
3. [verification that the previous version is serving]
Expected time to complete: [minutes]
Last exercised: [date, result, time taken]
Who can call it: [rollout owner, deputy, on-call]

## Irreversible items
Changes that cannot be undone by the rollback above.
| Item | Why it is irreversible | Plan | Owner |
|---|---|---|---|
| [schema change] | [old column dropped / data rewritten] | [expand then contract: which step this release ships] | |
| [public API field or webhook] | [clients may depend on it once published] | [forward fix only; ship behind a flag until stage 3] | |
| [email, push, invoice] | [already sent] | [send only after stage 3 passes] | |

Write "None" if the list is empty, so the reader knows it was checked.

## Halt log
| Time | Stage | Signal | Value | Action | Decided by |
|---|---|---|---|---|---|

## Handoffs
If a stop condition fires and users are affected: open an incident (see `incident-response`) and hand the rollback decision to the incident lead.
```

---

## Expand then contract, step by step

A schema change that would break the previous version if rolled back ships across several releases. Each release is safe to roll back on its own.

1. **Expand.** Add the new column, table, or field. The old one stays. Old and new code both run.
2. **Dual write.** Ship code that writes to both. Reads still use the old one.
3. **Backfill.** Copy existing data into the new structure. Verify counts.
4. **Switch reads.** Ship code that reads from the new structure. Rolling back returns to reading the old one, which is still current.
5. **Stop old writes.** Ship code that writes only to the new structure.
6. **Contract.** Remove the old structure in a later release, after the switch has held through at least one full release.

Name which step this release ships in the irreversible items table. Only step 6 is truly irreversible, and by then nothing reads the old structure.

---

## Choosing stop conditions

- **Write a number and a duration.** "Error rate above 0.5 percent for 10 minutes," not "error rate looks high."
- **Start from the normal range.** Read the last two weeks of the signal at the same time of day. Set the stop just outside the normal spread.
- **Cover what changed.** A release that touches billing needs a billing signal, not only the overall error rate.
- **Include a human signal.** Support contacts tagged to the changed area catch problems no metric was built for.
- **Decide in advance who can override.** An override is logged with a reason, like a freeze exception.

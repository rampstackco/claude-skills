# Restore Runbook Template

Fill out one of these per system that needs to be restorable. The runbook is read by a tired, panicked person at 3am. Optimize for that reader.

---

## System: [System name]

**Owner team:** [Team name]
**On-call escalation:** [Who, how to reach]
**Last drill:** [YYYY-MM-DD]
**Last verified working:** [YYYY-MM-DD]

---

## Tier and targets

| | Target | Last measured |
|---|---|---|
| Tier | [1 / 2 / 3] | |
| RPO | [Time] | [Time] |
| RTO | [Time] | [Time] |

If the last measured RTO is longer than the target, the target needs revision or the architecture needs investment.

---

## What this system does

[2-3 sentences describing what the system is and why it matters. The reader may not be familiar with this system in a panic.]

---

## What "lost" looks like

The triggers for using this runbook:

- [ ] [Specific symptom, e.g., "Database returns errors on all queries"]
- [ ] [Specific symptom, e.g., "Data has been deleted or appears corrupted"]
- [ ] [Specific symptom, e.g., "Provider region is down per their status page"]
- [ ] [Specific symptom, e.g., "Account access is locked or suspended"]

If none of these match, this might not be the right runbook. Pause and check `incident-response`.

---

## Decision: should we restore?

Restoring is destructive. Don't do it without authorization.

**Authorize restoration if:**
- [Condition 1]
- [Condition 2]
- [Condition 3]

**Do NOT restore if:**
- The system is recoverable through less destructive means (failover, replica promotion, partial fix)
- The data loss is recoverable through other channels (event replay, cache rebuild)
- We're not yet sure of the cause (restoring on top of an unknown cause can make things worse)

**Authorization required from:** [Role]
**Backup authorization from:** [Role]

Document the authorization in the incident channel before proceeding.

---

## Pre-restore checklist

- [ ] Authorization received and documented
- [ ] Communication sent: status page updated, internal notice posted
- [ ] Recent backup identified and validated
- [ ] Backup integrity verified (checksum, sample query, etc.)
- [ ] Target environment prepared (downtime accepted, traffic redirected)
- [ ] Rollback plan understood
- [ ] Timer started (track actual RTO)

---

## Restore procedure

### Step 1: Identify the backup to restore from

[Specific instructions: which backup system, how to find the right one, how to verify it's the right one.]

```
[Example commands]
```

### Step 2: Prepare the target

[Specific instructions: which environment, how to ensure no traffic, how to clear or prepare destination.]

```
[Example commands]
```

### Step 3: Run the restore

[Specific instructions: the actual restore command(s), expected duration, what success looks like.]

```
[Example commands]
```

Expected duration: [Time]

### Step 4: Verify

[Specific instructions: how to know the restore worked. Sample queries, row counts, data spot-checks.]

```
[Example commands and queries]
```

Expected results: [What to look for]

### Step 5: Re-enable traffic

[Specific instructions: how to direct traffic back to the restored system.]

```
[Example commands]
```

### Step 6: Monitor

For [time period] after the restore:

- [ ] Watch error rates (link to dashboard)
- [ ] Watch latency (link to dashboard)
- [ ] Spot-check user-visible behavior
- [ ] Confirm no further data anomalies

---

## Rollback

If the restore makes things worse:

[Specific instructions for reverting. This is rarely possible for data restores, but for failover-style restores, rollback is just the failover in reverse.]

---

## Post-restore

### Communication

- [ ] Status page updated (resolved)
- [ ] Internal notice updated (system restored)
- [ ] Customer comms (if appropriate, who and what)
- [ ] Stakeholder summary

### Documentation

- [ ] Actual RTO recorded
- [ ] Actual RPO measured (latest data point preserved vs latest data point lost)
- [ ] Notes on any deviations from the runbook
- [ ] Items to fix in the runbook

### After-action

Schedule the after-action report within 5 business days. See `after-action-report` skill for the framework.

---

## Backup details

### Backup architecture

| | Detail |
|---|---|
| Backup tool | [Tool name] |
| Frequency | [Cadence] |
| Retention | [Period] |
| Storage location | [Where, including account/region] |
| Immutable? | [Yes / No, details] |
| Encryption | [Method, key location] |

### How backups are tested

- [ ] [Test method 1]
- [ ] [Test method 2]
- [ ] [Test method 3]

Last test: [YYYY-MM-DD]
Test cadence: [How often]

---

## Dependencies

This system depends on:
- [Dependency 1, what it provides]
- [Dependency 2, what it provides]

If a dependency is also down, the restore may need to wait or proceed with workarounds. Document the workarounds:

- [Dependency unavailable scenario 1]: [Workaround]
- [Dependency unavailable scenario 2]: [Workaround]

---

## Drill log

| Date | Type (tabletop / partial / full) | Outcome | Issues found | Fixes |
|---|---|---|---|---|
| YYYY-MM-DD | [Type] | [Pass / Partial / Fail] | [Issues] | [Fixes applied] |

---

## Maintenance

This runbook needs review:
- After every restore (real or drill)
- When the system architecture changes
- When backup tooling changes
- At least quarterly

Last review: [YYYY-MM-DD] by [Name]
Next review: [YYYY-MM-DD]

---

## Common gotchas

[List of things that have surprised people during past restores or drills. Specific to this system.]

- [Gotcha 1]
- [Gotcha 2]
- [Gotcha 3]

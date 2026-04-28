---
name: backup-and-disaster-recovery
description: "Plan and run backups, set recovery objectives, and run disaster recovery drills. Use this skill when defining RPO/RTO targets, designing backup architecture, deciding what to back up and how often, planning for full-region or platform outages, or running a restoration drill. Triggers on backup, restore, RPO, RTO, disaster recovery, DR, business continuity, what if the database is gone, what if our hosting goes down, recovery drill, ransomware planning. Also triggers when an incident reveals a gap in restoration capability."
---

# Backup and Disaster Recovery

Plan for the worst case: the database is gone, the host is down for a week, the deploy was poisoned, ransomware encrypted everything. The skill is in advance preparation, not reaction.

---

## When to use

- Setting up backups for a new system
- Reviewing and validating backup architecture
- Defining RPO (recovery point objective) and RTO (recovery time objective)
- Running a disaster recovery drill
- Diagnosing gaps after an incident
- Planning for ransomware, data corruption, or insider threats
- Migrating to a new platform (DR planning belongs in the migration plan)

## When NOT to use

- Active incident response (use `incident-response`)
- Routine deploy rollbacks (use `launch-runbook`)
- Code or content versioning (covered by Git, CMS revision history)
- Routine database snapshots (use this skill to set them up; routine review goes in monitoring)

---

## Required inputs

- The systems in scope (databases, file storage, code, configs, secrets)
- The hosting platforms and providers
- Existing backup tooling and what it covers
- Tolerance for data loss (in time)
- Tolerance for downtime (in time)
- Compliance requirements (some regulations mandate specific backup standards)

---

## The framework: 4 questions

Every disaster recovery plan answers four questions explicitly.

### Question 1: What needs to be recoverable?

List every system that holds state. Categorize by criticality.

**Tier 1: must recover.** Without it, the business stops. (Customer database, transaction log, primary content store.)

**Tier 2: should recover.** Loss is painful but not fatal. (Analytics, logs, secondary services.)

**Tier 3: nice to recover.** Easy to rebuild. (Caches, derived data, temporary state.)

The tier drives RPO, RTO, backup frequency, and storage spend.

### Question 2: How much data loss is acceptable? (RPO)

RPO is the maximum age of data that's acceptable to lose, measured in time.

- RPO = 1 hour: hourly backups or continuous replication needed
- RPO = 1 day: daily backups acceptable
- RPO = 1 week: weekly backups acceptable

For most production data, RPO of 1 hour or less is the target. For critical financial systems, near-zero RPO (continuous replication).

For derived or rebuildable data, RPO of 1 day or longer is fine.

### Question 3: How much downtime is acceptable? (RTO)

RTO is the maximum time to restore service after a disaster.

| RTO target | Implies |
|---|---|
| < 5 minutes | Hot standby with automatic failover |
| < 1 hour | Warm standby with manual failover or fast restore from recent snapshot |
| < 24 hours | Cold backup with documented restore process |
| Days to weeks | Best-effort, accept extended downtime |

RTO drives architecture spend. Aggressive RTOs (< 1 hour) are expensive. Loose RTOs (days) are cheap.

### Question 4: What's the disaster?

Plan for specific scenarios. Each has different implications.

**Hardware failure.** Disk dies. Standard backups solve this. Most modern hosts handle automatically.

**Provider outage.** Region or vendor goes down. Cross-region or cross-provider redundancy needed for low RTO.

**Data corruption.** Bad migration, bug, accidental delete. Point-in-time restore needed. The latest backup might be corrupted; you need history.

**Ransomware or compromise.** Attacker encrypts or deletes. Backups must be immutable or air-gapped, otherwise the attacker takes them too.

**Account compromise.** Attacker has admin credentials, deletes everything. Same defense as ransomware: immutable backups, separate access control.

**Vendor lock-out.** Account suspended, billing dispute, vendor disappears. Backups outside the vendor needed.

**Insider threat.** Disgruntled employee deletes or exfiltrates. Audit logs, separation of duties, immutable backups.

A backup strategy that handles only hardware failure isn't a strategy. It's the easiest case.

---

## Workflow

### Step 1: Inventory state

Every system that holds state goes on a list:

| System | Data type | Tier | Current backup | Tested? |
|---|---|---|---|---|

If you can't list it, you can't protect it. Often the inventory itself reveals gaps (the "we forgot about that database" moment).

### Step 2: Set RPO and RTO per tier

For each tier, agree on RPO and RTO. Get sign-off from the people who'd be impacted by a disaster.

Push back on aspirational targets that aren't backed by infrastructure spend. RTO of 5 minutes for a system without a hot standby is not real.

### Step 3: Verify or design backup architecture

For each system, ensure:

- **Frequency** matches RPO.
- **Retention** covers point-in-time recovery (typically 30+ days for production data).
- **Storage location** is separate from the source. Same disk, same account, same region: not enough.
- **Immutability or write-once storage** for at least some backup copies. Defends against ransomware.
- **Encryption at rest.** Standard for compliance.
- **Tested restore procedure.** Untested backups are not backups.

The "3-2-1 rule" is a useful starting point: 3 copies of data, 2 different storage types, 1 offsite (or off-account, off-platform).

### Step 4: Document the restore runbook

For each system, write the runbook:

1. How to detect the disaster (cross-reference monitoring)
2. How to decide to restore (decision criteria, who authorizes)
3. The exact restore steps (commands, screenshots, sequence)
4. How to verify the restore worked
5. How to switch traffic back
6. Communication template (status page, customer notice)

The runbook is for the worst night of someone's career. Write it for tired, panicked you.

### Step 5: Run a drill

The first restore should never be during a real disaster.

Drills can be:

- **Tabletop:** walk through the runbook on paper. Useful for finding gaps in the plan.
- **Partial:** restore to a non-production environment. Verify the data, validate the steps.
- **Full:** simulate the disaster. Production failover or full restore. Maximum confidence, maximum risk.

For most teams: quarterly tabletop, annual partial drill, full drill before major launches or after major architecture changes.

### Step 6: Document drill results

After each drill, document:
- What was tested
- What worked
- What broke
- What the actual RPO and RTO were (vs. targets)
- Action items

If the actual RTO was 6 hours when the target was 1 hour, the target is fiction. Either fix the gap or revise the target.

### Step 7: Schedule the next drill

Calendar it. Assign an owner. Backups that aren't drilled drift toward useless.

---

## Special topics

### Database point-in-time recovery

Many managed databases offer point-in-time recovery (PITR) within a retention window (often 7-35 days). This typically achieves RPO of seconds to minutes.

For longer retention, schedule periodic exports to immutable storage.

PITR alone isn't enough. If the database service itself is compromised, PITR is gone too. Always have at least one backup outside the source service.

### File storage backups

Object stores (S3, GCS, Azure Blob) usually offer:

- Versioning (recover overwritten objects)
- Replication (cross-region)
- Object lock or immutability (defense against deletion)

Set all three for production-critical buckets. Don't rely on the storage provider's default retention.

### Code and config backups

Code lives in Git. The Git host (GitHub, GitLab, etc.) is your backup, but a single host is a single point of failure.

For high-criticality code:
- Mirror to a second host or your own server
- Periodic offline exports

Configs and secrets need separate handling:
- Infrastructure-as-code: in Git, mirrored
- Runtime configs: backed up alongside the system
- Secrets: in a secret manager with its own backup story

### Backups of backups

The backup system itself can fail. Backup metadata, backup credentials, encryption keys: all must be backed up.

If your backup is encrypted with a key you've lost, the backup is useless.

### Compliance backups

Some regulations require specific retention (e.g., 7 years for financial data). Comply with the highest applicable standard.

Don't conflate compliance retention with operational backup. Compliance often allows much slower restore (just need to be able to produce the data eventually).

---

## Failure patterns

**Untested backups.** The single most common failure. Backups appear to work; restore fails. Test.

**Backups in the same account or region as the source.** Account compromise or region outage takes both.

**No immutability.** Ransomware encrypts the backups too. Use object lock or air-gapped storage.

**RTO and RPO that aren't measured.** Target says "1 hour" but no one has verified the actual RTO. Assume the actual is longer than the target until proven otherwise.

**Restore runbook only in someone's head.** Person leaves or is unavailable; runbook is gone. Document.

**Backups but no DR plan.** "We have backups" isn't a plan. The plan is the runbook plus the architecture plus the drilling.

**Optimism bias.** "It won't happen to us." It happens. Plan as if it will.

**Backups too old or too new.** Want point-in-time history (in case corruption isn't immediately discovered). Daily snapshots with 30+ day retention. Or continuous replication with separate periodic snapshots for history.

**Skipping drills "because we're busy."** Then you'll be busier during the disaster.

**No communication plan.** Restoring data is half the job. Telling customers, stakeholders, and internal teams what's happening is the other half.

---

## Output format

A DR plan document includes:

- **Inventory:** every stateful system
- **Tiering:** criticality per system
- **Targets:** RPO and RTO per tier
- **Architecture:** backup tooling, frequency, storage, immutability
- **Runbooks:** restore procedures per system
- **Drill schedule:** what gets tested when
- **Drill log:** results of past drills
- **Communication templates:** what to say during a real DR event

---

## Reference files

- `references/restore-runbook-template.md`: Fillable template for a restore runbook, covering detection, authorization, steps, verification, and rollback.

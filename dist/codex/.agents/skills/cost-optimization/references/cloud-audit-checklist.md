# Cloud Audit Checklist

A practical walkthrough for auditing a cloud account for waste and rightsizing opportunities. Stack-agnostic in principle; the categories apply across AWS, GCP, Azure, and others.

Allow about a half-day for a first audit. Subsequent audits go faster.

---

## Setup

- [ ] Pull the last 12 months of billing data
- [ ] Pull current resource inventory (compute, storage, database, networking)
- [ ] Identify owners per service or project
- [ ] Note any compliance or contractual constraints

---

## Compute

### Identify idle and underused

- [ ] Instances with CPU utilization below 10% over 30 days
- [ ] Instances stopped but still incurring some charges (storage, IPs, etc.)
- [ ] Instances running 24/7 that only need business hours
- [ ] Instances forgotten from old projects
- [ ] Instances spun up for a one-time task and never deleted

For each: identify owner. Confirm it's not needed. Stop or delete.

### Rightsize active instances

- [ ] Instances with CPU peaks under 40% (probably oversized)
- [ ] Instances with memory underused
- [ ] Instances of older generation (newer generations often cheaper for same performance)
- [ ] Instances of wrong family (compute-optimized when memory-optimized would be cheaper)

For each: test smaller size in staging. Roll out gradually.

### Pricing structure

- [ ] On-demand instances with stable load (candidates for reserved or savings plans)
- [ ] Workloads that could tolerate interruption (candidates for spot/preemptible)
- [ ] Long-running workloads with no commitment (candidate for committed-use discounts)

Reserved/committed: 30-70% discount for 1-3 year commitment.
Spot/preemptible: 60-90% discount, can be terminated by provider.

### Auto-scaling

- [ ] Auto-scaling configured for variable workloads (vs always-on at peak size)
- [ ] Scaling policies actually scale down (some only scale up)
- [ ] Min size set appropriately (not over-provisioned)

---

## Storage

### Identify unused

- [ ] Snapshots not used in 6+ months
- [ ] Disks unattached to any instance
- [ ] Buckets accessed never or rarely (per access logs)
- [ ] Old log archives no one queries
- [ ] Old backups beyond retention requirements

For each: confirm it's not needed. Delete or archive.

### Lifecycle policies

- [ ] Hot data only for recent access
- [ ] Move data to warm tier after [N] days
- [ ] Move to cold/archive tier after [M] days
- [ ] Delete after [P] days (if compliant)

Lifecycle policies are set-once, save-forever. High ROI for the time invested.

### Storage class

- [ ] Verify storage class matches access pattern
  - Frequently accessed: standard
  - Infrequent: IA / nearline
  - Rarely: cold / archive
  - Compliance-only: deep archive

Mismatched storage class is a common waste category.

### Versioning

- [ ] Object versioning is on intentionally (not accidentally)
- [ ] Old versions cleaned up via lifecycle policy
- [ ] Soft-delete retention is finite (not indefinite)

Versioned buckets can accumulate massive cost from old versions.

---

## Database

### Identify underused

- [ ] Databases with low CPU/memory usage over 30 days
- [ ] Databases with low connection counts
- [ ] Databases that could be smaller instance class
- [ ] Read replicas no longer needed
- [ ] Databases for old projects

### Rightsize storage

- [ ] Storage allocated far above used
- [ ] Auto-scaling on for storage (avoid manual oversizing)
- [ ] Old logs and audit data cleaned up

### Backup retention

- [ ] Backup retention matches RPO (not aspirational, not excessive)
- [ ] Manual snapshots cleaned up (often outlive their purpose)

### Pricing structure

- [ ] Reserved capacity for steady workloads
- [ ] Spot/preemptible for non-critical analytics

### Indexes

- [ ] Unused indexes dropped (each index costs storage and write performance)
- [ ] Indexes match query patterns (use database tooling to identify)

---

## Networking

### Egress

Egress (data leaving the cloud or moving across regions) is often the most surprising cost.

- [ ] Egress to internet (largely user traffic; CDN can reduce)
- [ ] Egress between regions (often unintended; check architecture)
- [ ] Egress between availability zones (matters at scale)
- [ ] NAT gateway charges (per-GB; can be huge for high-traffic egress)

Reduce egress with:
- CDN caching (origin egress drops dramatically)
- Compression
- Multi-region only when needed (single-region egress is often cheaper)
- VPC endpoints for cloud-internal traffic (avoid going out and back in)

### Load balancers

- [ ] Idle or unused load balancers
- [ ] Load balancer count appropriate (don't run 5 when 1 works)
- [ ] Load balancer type matches use (application LB vs network LB; pricing differs)

### Public IPs

- [ ] Idle elastic IPs (charged when not attached)
- [ ] Public IPs that should be private

### CDN

- [ ] CDN in front of high-traffic origin
- [ ] Cache hit rate measured (low cache hit = wasted CDN, untrained origin)
- [ ] Compression and image optimization on at the CDN

---

## Monitoring and logs

### Log volume

- [ ] Logs ingested but never queried
- [ ] Verbose logging in production (debug level by accident)
- [ ] Logs from low-importance services at full volume

Sample or filter where possible. High-volume logs can dominate observability bills.

### Retention

- [ ] Retention matches need (do you query 90-day-old logs?)
- [ ] Compliance retention separate from operational retention (compliance can use cheaper storage)
- [ ] Aggregated metrics retained longer than raw logs (cheaper, often sufficient)

### Tooling

- [ ] Multiple monitoring tools doing the same job
- [ ] Premium tier when standard would suffice
- [ ] Per-host pricing on tools where utilization is low

---

## Specialty services

### Search (Elasticsearch, Algolia, etc.)

- [ ] Indexes for old data still queried?
- [ ] Replicas appropriate for traffic
- [ ] Tier matches need

### Cache (Redis, Memcached)

- [ ] Cache hit rate measured (low hit = expensive cache delivering little value)
- [ ] Cache size appropriate
- [ ] TTLs reasonable

### Queue / streaming (Kafka, Kinesis, SQS)

- [ ] Throughput matches actual load
- [ ] Retention matches need
- [ ] Idle streams or topics cleaned up

### Email / SMS / push

- [ ] Volume matches projection
- [ ] Per-message pricing tier appropriate
- [ ] Old or low-engagement contacts removed (don't pay to send to non-recipients)

---

## Account-level

### Multiple accounts

- [ ] Account count matches need (separation of concerns is good; sprawl is wasteful)
- [ ] Consolidated billing enabled (volume discounts across accounts)
- [ ] Inactive accounts decommissioned

### Tagging

- [ ] Tags applied to all resources
- [ ] Tags consistent (team, project, environment, cost center)
- [ ] Untagged resources have owners identified

### Budgets and alerts

- [ ] Budget alerts configured (e.g., alert at 80% of monthly target)
- [ ] Anomaly detection enabled (alert on unusual cost spikes)
- [ ] Per-team or per-project budgets where possible

---

## Findings document

For each finding, capture:

| Field | Example |
|---|---|
| Description | "Production database is 8xlarge; CPU peaks at 25%" |
| Category | Compute / storage / database / network / etc. |
| Lever | Eliminate / rightsize / restructure / negotiate / reframe |
| Estimated savings | $/month |
| Effort | Hours/days |
| Risk | Low / medium / high |
| Owner | Person or team |
| Action | Specific next step |

---

## Prioritization

After all findings:

| Priority | Description |
|---|---|
| P0 | Easy, high savings, low risk: do this week |
| P1 | Medium effort, high savings: plan this quarter |
| P2 | Easy, low savings: do as time allows |
| P3 | High effort, low savings: deprioritize |

Reserved instances and committed-use discounts often appear as P0/P1: high savings, structured effort.

---

## Tracking

After acting, track:
- Savings achieved (compare next billing cycle to baseline)
- Issues caused (any rollbacks needed?)
- Time spent
- Lessons for next audit

Cost reductions sometimes appear gradually (e.g., reserved purchase smooths in). Track over 2-3 billing cycles.

---

## Maintenance

- [ ] Set monthly cost review (15-30 min, look at trends)
- [ ] Set quarterly deeper audit (this checklist, abbreviated)
- [ ] Set annual full audit (this checklist, full)
- [ ] Set renewal calendar (each major contract, with reminder 90 days out)
- [ ] Tag governance (new resources require tags, untagged flagged)

Cost optimization is ongoing, not one-time. Without maintenance, savings reverse.

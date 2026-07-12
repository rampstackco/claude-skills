# Warehouse Data Plane Standup

```
name:            Warehouse Data Plane Standup
slug:            warehouse-data-plane-standup
tier:            forward-deployed (operations)
role:            fde
status:          template
score:           43 (demand 4, pain 4, differentiation 3, usability 4, connectors 5)
intent:          stand up the data plane the tier reads from: exports first, two stores,
                 read-only bounded access, cost governance, and an always-on sensing layer
when to use:     day zero of a forward-deployed engagement, before any workflow that
                 reads metrics
when not to use: a stack whose warehouse, exports, and governance already exist (start
                 with the workflow that needs the data); a one-off query (this is the
                 standing plane, not a query)
validation note: the occasion is the search-console bulk-export and warehouse enablement
                 session on a showcase-designated property, already on the critical path
gap note:        the two-store standup, the access-wiring, and the verification cores are
                 DECLARED CATALOG GAPS; those phases are inline procedure with
                 data-warehouse-experimentation as the nearest anchor. It is written to be
                 runnable anyway.
```

## Connectors

```
connectors:
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter
  - capability:  search-performance.read
    access:      read
  - capability:  analytics.read
    access:      read
```

This workflow stands up read-only access and wires no write path. Enabling the exports and provisioning the stores are platform actions a person performs; the engines never gain a write tool on this plane.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- A warehouse you can create datasets in, with a billing project.
- Admin access to the search-console and analytics properties whose exports you will enable.
- An operational store separate from the warehouse, or the ability to provision one.
- The access controls to grant a scoped, read-only service identity.

## Phases

### Phase 1: Enable the exports · lane: divergent (human)

Skills: none; the actions here are deliberately human
Input: the list of properties in scope; the search-console and analytics accounts
Run: a person enables the search-console bulk export and the analytics
    warehouse export (the native daily-table exports) on every property in
    scope, and records the enablement date per property. This is the one
    time-sensitive action in the standup: the exports do not backfill, so the
    history starts the day the export is enabled and the clock only runs
    forward. Turn them on before any other step.
Output artifact: the exports enabled per property, with the enablement date recorded
Done when: every in-scope property has both exports enabled with a recorded start date, confirmed in the source consoles
Fails look like: doing this last. Every day the exports are off is a day of history that will never exist, and no later step can recover it.

### Phase 2: Separate the two stores · lane: convergent (Tholo)

Skills: data-warehouse-experimentation (nearest anchor; the two-store standup core is a DECLARED GAP, procedure inline)
Capability class: warehouse.standup (declared catalog gap; nearest-miss data-warehouse-experimentation)
Input: the enabled exports; the provisioned warehouse and operational store
Run:

    Invoke data-warehouse-experimentation's warehouse-shape discipline. Stand up
    two stores with one boundary rule: the metric warehouse holds metric history
    (the export tables and their derivations), the operational store holds run
    records, decisions, and the agreement log. Pick the warehouse region once and
    match it across both exports, because it cannot be changed later without a
    migration. Nothing that answers "what did the engines and humans decide" goes
    in the warehouse; nothing that answers "what happened to the numbers" goes in
    the operational store. Record the boundary as written policy.

Output artifact: the two stores stood up, the region fixed, and the store-boundary policy recorded
Done when: both stores exist, the region matches across exports, and the boundary policy names which data lives where
Fails look like: one store doing both jobs. A single store for metrics and decisions couples query cost to operational writes and loses the separation the whole plane depends on.

### Phase 3: Wire read-only access with mandatory bounds · lane: convergent (Tholo)

Skills: data-warehouse-experimentation (nearest anchor; the access-wiring core is a DECLARED GAP, procedure inline)
Capability class: warehouse.mcp-wire (declared catalog gap; nearest-miss data-warehouse-experimentation)
Input: the metric warehouse; the identity and access controls
Run:

    Invoke data-warehouse-experimentation's access discipline. Wire the engines'
    read path through a read-only interface (a managed warehouse MCP server plus a
    thin domain layer) under a scoped service identity with dataset-scoped read
    and deny-by-default elsewhere. Encode the query-correctness rules the raw
    tools lack: the mandatory date range pushed down as a partition filter on
    every call, and any source-specific offset (search-console positions are
    zero-based, so average position is computed with the offset). A call without a
    date range is rejected, not run. No write tool is present on this path.

Output artifact: the read-only access layer, the scoped identity, and the bounds-and-offset rules encoded in the domain layer
Done when: every warehouse call goes through the bounded read path, an unbounded call is rejected, and the identity carries no write scope
Fails look like: bounds enforced by convention instead of code. A partition filter that is supposed to be there is absent on the one query written under deadline, and that is the query that scans the full history.

### Phase 4: Cost and quota governance · lane: gate (Basano)

Skills: data-warehouse-experimentation (nearest anchor; procedure inline)
Capability class: warehouse.cost-governance (declared catalog gap; nearest-miss data-warehouse-experimentation)
Input: the wired access layer; the warehouse's billing and quota controls
Run:

    Invoke data-warehouse-experimentation's cost discipline as a gate. Issue an
    unbounded query and confirm it is rejected; issue a bounded query and confirm
    it scans only the requested partitions. Set a budget alert and a quota ceiling
    on the billing project. Report the enforcement result and the alert
    configuration per source. Change nothing about the access layer here; report
    what holds and what does not.

Output artifact: a governance report (bounds-rejection confirmed, partition scan confirmed, budget alert and quota set)
Done when: an unbounded query is confirmed rejected, a bounded query is confirmed to scan only its partitions, and a budget alert exists
Fails look like: an unbounded scan reaching the warehouse. It is a cost incident waiting for a cron job, and it bills for the whole history every time it runs.

### Phase 5: Stand up the sensing layer · lane: convergent (Tholo)

Skills: monitoring-and-alerting, analytics-strategy
Capability class: sensing.standup (substitute equivalents if off-catalog)
Input: the metric warehouse with at least one series accruing
Run:

    Invoke monitoring-and-alerting to define the sensing layer and analytics-strategy
    to decide what is worth sensing. Per series, set a freshness threshold and a
    movement threshold sized to that series' own cadence, a cadence check that
    fires when an expected update is late, and an anomaly flag on a schedule. Each
    threshold is derived from the series' own history, never copied from another
    series. Emit the sensing definitions and the schedule; the layer flags and
    never acts.

Output artifact: the sensing definitions per series (freshness, movement, cadence, anomaly) and the schedule
Done when: every live series has thresholds derived from its own history and a scheduled check, and the layer only flags
Fails look like: thresholds copied between series of different cadences. A daily series' movement band applied to a weekly one alarms on every normal week and trains the team to ignore it.

### Phase 6: Verification pass · lane: gate (Basano)

Skills: data-warehouse-experimentation (nearest anchor; procedure inline)
Capability class: warehouse.verify (declared catalog gap; nearest-miss data-warehouse-experimentation)
Input: the wired plane; one known query per source
Run:

    Invoke data-warehouse-experimentation's verification discipline as a gate.
    Round-trip one bounded query per source through the read path: a
    search-console query, an analytics query, and a warehouse derivation, each
    with a date range, each returning the expected shape against a value known by
    hand. Confirm the position offset is applied where it should be. Report pass
    or fail per source with the returned evidence. Report only.

Output artifact: a verification report (one bounded round-trip per source, expected-versus-returned, offset confirmed)
Done when: each source returns the expected shape through the bounded path, or the discrepancy is filed with its evidence
Fails look like: verifying the warehouse holds data without verifying the read path returns it correctly. The tables can be perfect while the domain layer drops the offset, and every downstream number inherits the error.

## Failure modes

- Exports enabled last: history that never exists (Phase 1's failure, the load-bearing one).
- One store, both jobs: metric history and operational decisions in a single store, coupling cost to writes and losing the boundary.
- Unbounded scans: a warehouse call with no partition filter (Phase 4's failure), a cost incident waiting for a cron job.
- Copied sensing thresholds: bands moved between series of different cadences (Phase 5's failure), which alarms on normal variation.
- Region drift: exports landing in mismatched regions, which forces a migration to join them.
- Read path unverified: trusting the tables without proving the domain layer returns them with the offsets applied.

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property; the scheduled occasion is the search-console bulk-export and warehouse enablement session on an outdoor-sports content property, already on the critical path. Status flips to validated when that run record links here.

## Boundaries

- Data Surface Integrity (design v2, publishing later) consumes the series this workflow stands up; this owns the plane, that owns the freshness and consistency of what renders from it.
- Conversion-by-Source Diagnosis and Revenue Tracking Integrity read through the bounded access this workflow wires; each states its own warehouse bounds and inherits them here.
- Content Pipeline with Prove Gates ranks from the demand data this plane serves; the export enablement here is the prerequisite its demand source assumes.

# Revenue Tracking Integrity

```
name:            Revenue Tracking Integrity
slug:            revenue-tracking-integrity
tier:            forward-deployed (operations)
role:            fda
status:          template
score:           47 (demand 4, pain 5, differentiation 5, usability 3, connectors 4)
intent:          a scheduled prove pass over the money path: params surviving redirects,
                 consent not zeroing attribution, platform and warehouse reconciled, and
                 monetized links live
when to use:     any property that earns through tracked links or events, on a schedule
when not to use: diagnosing a conversion divergence on stable traffic (Conversion-by-Source
                 Diagnosis); a falling-traffic mystery (Traffic-Drop Triage)
gap note:        the money-path map, the consent matrix, and the reconciliation cores are
                 DECLARED CATALOG GAPS; those phases are inline procedure with
                 product-analytics-setup as the nearest anchor. It is written to be
                 runnable anyway.
```

## Connectors

```
connectors:
  - capability:  crawl.read
    access:      read
  - capability:  analytics.read
    access:      read
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter
  - capability:  revenue.read
    access:      read
```

Fully read-only until Phase 5, and Phase 5 only ever produces held changes and a schedule. Platform and merchant changes stay human; nothing in the audit acts on the money path.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills` then `/plugin install rampstack-skills@rampstack`
- The list of monetized link and event classes the property runs (affiliate links, checkout events, lead events).
- Read access to the platform that reports revenue or clicks, and to the analytics and warehouse stores the events land in.
- Enough accrued revenue or click data for a reconciliation window to be meaningful.
- The attribution parameter set: which parameters must survive the redirect chain.

## Phases

### Phase 1: Map the money path · lane: convergent (Tholo)

Skills: product-analytics-setup (nearest anchor; the money-path-mapping core is a DECLARED GAP, procedure inline)
Capability class: revenue.path-map (declared catalog gap; nearest-miss product-analytics-setup)
Input: the site (crawl.read), the platform records (revenue.read), and the event definitions
Run:

    Invoke product-analytics-setup's instrumentation discipline. Enumerate every
    monetized link and event CLASS, not instance: each affiliate or outbound money
    link type, its full redirect chain, the attribution parameters it must carry,
    the event it fires, and the platform record that event should become. Map each
    class end to end, from the on-page link to the reconciled revenue row. Produce
    the money-path map; test nothing yet.

Output artifact: the money-path map (each class: link, redirect chain, required params, event, platform record)
Done when: every monetized class is mapped from on-page link to platform record, with its required attribution parameters named
Fails look like: mapping link instances instead of classes. Ten thousand affiliate links share a handful of classes, and a map keyed to instances misses the class-wide break while drowning in duplicates.

### Phase 2: Liveness and parameter survival · lane: gate (Basano)

Skills: product-analytics-setup (nearest anchor; procedure inline)
Capability class: revenue.liveness-check (declared catalog gap; nearest-miss product-analytics-setup)
Input: the money-path map
Run:

    Invoke product-analytics-setup's verification discipline as a gate. Per link
    class, fetch a live instance (crawl.read), follow the full redirect chain to
    its destination, and assert two things: the link resolves to a live endpoint
    (no dead redirect, no parking page, no 404 at the merchant), and the required
    attribution parameters arrive intact at the end of the chain, not stripped by
    a redirect hop or a canonicalization. Test every class, including the ones
    that look fine. Report liveness and parameter survival per class with the
    chain as evidence. Report only.

Output artifact: a liveness-and-survival report per class (resolves live, params arrived, the chain)
Done when: every link class has a liveness verdict and a parameter-survival verdict with its redirect chain recorded
Fails look like: testing one link and trusting the class. One affiliate link resolving does not prove the class resolves, and the broken subset earns nothing while the test stays green.

### Phase 3: Consent-state matrix · lane: gate (Basano)

Skills: product-analytics-setup (nearest anchor; the consent-matrix core is a DECLARED GAP, procedure inline)
Capability class: measurement.consent-matrix (declared catalog gap; nearest-miss product-analytics-setup)
Input: the money-path map; the property's consent states
Run:

    Invoke product-analytics-setup's measurement discipline. Build the matrix:
    each money event against each consent state the property can be in (granted,
    denied, not-yet-decided, and any regional variant). For each cell, confirm
    whether the event fires and whether attribution survives. The failure this
    catches: a consent state that silently zeroes attribution, so revenue is
    earned but recorded as unattributed or not at all. Report the matrix with the
    fired-and-attributed verdict per cell. Report only.

Output artifact: the consent matrix (event by consent state, fired and attributed verdict per cell)
Done when: every money event has a verdict under every consent state the property supports
Fails look like: testing only the granted state. Consent-denied and undecided states are where attribution quietly zeroes, and a matrix that skips them certifies a path that loses money in the states most users are actually in.

### Phase 4: Reconciliation · lane: gate (Basano)

Skills: product-analytics-setup (nearest anchor; procedure inline)
Capability class: revenue.reconcile (declared catalog gap; nearest-miss product-analytics-setup)
Input: the platform-reported events and revenue (revenue.read); the warehouse-landed events (warehouse.query, bounded)
Run:

    Invoke product-analytics-setup's reconciliation discipline as a gate. For a
    bounded window, pull platform-reported events and revenue and the
    warehouse-landed equivalents, and reconcile them within a stated tolerance,
    per source, not only in total. Flag any per-source row that drifts past
    tolerance even when the totals happen to match, because offsetting errors hide
    in the total. Every warehouse query carries its date range as a partition
    filter. Report the reconciliation per source with the variance. Report only.

Output artifact: the reconciliation report (platform versus warehouse per source, variance, tolerance verdict)
Done when: every source is reconciled within tolerance for the window, or the per-source variance is flagged with evidence
Fails look like: reconciling totals while per-source rows drift. A matching grand total made of two offsetting errors reads as healthy and is two broken sources wearing a coincidence.

### Phase 5: Findings triage, held fixes, and the standing cadence · lane: divergent (Krine) then convergent (Tholo)

Skills: product-analytics-setup (nearest anchor; procedure inline)
Capability class: revenue.correct (write-held)
Input: the liveness, consent, and reconciliation reports
Run:

    Invoke product-analytics-setup to rank the findings by revenue at risk and
    present the plan for a human to approve (the divergent stop). On approval,
    land fixes held: a dead link class routed to its owner, a consent-zeroing path
    routed to a measurement fix, a reconciliation drift routed to the
    instrumentation. Then set the standing cadence: this pass recurs on a schedule
    (monthly fits most money paths), so a dead class is caught by the pass, not by
    a quarter of missing revenue. Nothing here publishes; platform and merchant
    changes stay human.

Output artifact: a ranked plan, held fixes tied to findings, and the recorded recurring cadence
Done when (public gate): a human has approved the plan, every approved fix is held, and the recurring cadence is scheduled
Operated-layer note: in an operated deployment the ranking and the human's approval land as an agreement-log row (see AGREEMENT-LOG.md)
Fails look like: running this once. A money path is only as sound as its last pass, and the dead link that appears the week after a one-time audit earns nothing until someone notices the gap in the revenue.

## Failure modes

- Instance-not-class testing (Phase 2's failure): one link checked, the class assumed.
- Granted-only consent testing (Phase 3's failure): the states where attribution zeroes go unchecked.
- Total-level reconciliation (Phase 4's failure): per-source drift hidden by a matching total.
- One-shot auditing (Phase 5's failure): a dead monetized link discovered by its revenue's absence months later.
- Unbounded reconciliation queries: a warehouse pull with no partition filter, a cost incident on the money path.
- Parameter survival assumed from presence: a parameter present on the link but stripped mid-chain, so the click lands unattributed.

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property; the scheduled occasion is a prove pass over the affiliate money path on an outdoor-sports content property once its first affiliate data accrues. Status flips to validated when that run record links here.

## Boundaries

- Conversion-by-Source Diagnosis assumes this path passes: its Phase 3 is a per-finding spot-check of measurement, and this is the scheduled end-to-end audit of the money path.
- Experiment Loop with Pre-Registered Gates (design v2, publishing later) reads verdicts only as trustworthy as this path; a revenue experiment on a broken money path measures noise.
- Warehouse Data Plane Standup wires the bounded warehouse access this workflow's reconciliation reads through.

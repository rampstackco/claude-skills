# Traffic-Drop Triage

```
name:            Traffic-Drop Triage
slug:            traffic-drop-triage
tier:            forward-deployed (operations)
role:            fda
status:          template
score:           51 (demand 5, pain 5, differentiation 4, usability 4, connectors 4)
intent:          diagnose an organic traffic drop with a disciplined decision tree,
                 evidence per branch, before anyone acts on it
when to use:     organic traffic is down and the team is about to do something about it
when not to use: routine performance review (use Conversion-by-Source Diagnosis);
                 a known deploy broke something (use Incident Response and Lane
                 Demotion); paid traffic changes (off-catalog)
validation note: gated on a showcase-designated property experiencing a diagnosable
                 drop; the pattern generalizes a real production diagnosis on an
                 unnamed property
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
  - capability:  crawl.read
    access:      read
  - capability:  repo.change
    access:      write-held      # only if Phase 4 routes to a technical fix
```

This workflow is read-only until Phase 4, and Phase 4 only ever produces held changes. Nothing in the triage acts on production.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- At least one demand-side data source (search-performance export) AND one behavior-side source (analytics events), because the single most valuable discriminator in the tree is whether they disagree.
- Enough history to compute a baseline: the same period last year if seasonality is plausible, or at minimum several stable weeks pre-drop.
- The deploy log or release history for the drop window.

## Phases

### Phase 1: Pin the drop · lane: convergent (Tholo)

Skills: seo-traffic-diagnosis
Capability class: traffic.baseline (substitute equivalents if off-catalog)
Input: search-performance and analytics data spanning the drop and the baseline window
Run:

    Invoke seo-traffic-diagnosis against the traffic data. Establish, with
    numbers: when the drop started (day precision), its magnitude vs the
    pre-drop baseline, and its shape across segments: which page templates,
    which query classes, which devices, which countries, which traffic
    sources. Do not explain the drop yet. Produce the drop profile only.

Output artifact: a drop profile (start date, magnitude, segment breakdown)
Done when: the profile states when, how much, and where, each with a number
Fails look like: averaging over segments. A sitewide average of minus 30 percent can be one template at minus 90 and everything else flat, and those are different diagnoses; the segment breakdown is the whole point of this phase

### Phase 2: Run the branches · lane: gate (Basano)

Five branches, every one checked, none acted on. Each produces evidence for or against; skipping a branch because another already looks guilty is the failure this phase exists to prevent.

**Branch A, tracking breakage.**
Skills: product-analytics-setup (nearest anchor; the breakage-detection core is a DECLARED GAP, procedure inline)
Run:

    Cross-check the two data sources for the drop window: if search-performance
    impressions and clicks are steady while analytics sessions dropped, the
    traffic did not fall, the measurement did. Check: the analytics tag present
    and firing on affected templates (crawl.read the live pages), consent-flow
    changes in the window, filter or property configuration changes, and
    whether the drop starts at a deploy boundary rather than a demand boundary.

**Branch B, technical regression.**
Skills: seo-site-health-audit, seo-technical
Run:

    Invoke seo-site-health-audit and seo-technical against the affected
    segments. Check: robots directives and noindex on affected templates,
    canonical correctness, status codes and redirect chains, sitemap presence,
    render-blocking or hydration failures on the live pages, and whether any
    of these changed at a deploy inside the drop window.

**Branch C, algorithm-update timing.**
Skills: seo-traffic-diagnosis
Run:

    Compare the drop start date against the published update timeline. Check
    the drop's shape against the update class: sitewide vs template-scoped vs
    query-class-scoped losses point at different update types. Timing
    correlation alone is not a diagnosis; require shape agreement too.

**Branch D, seasonality and demand shift.**
Skills: seo-keyword
Capability class: demand.trend
Run:

    Query the warehouse for the same period in prior years (bounded date
    ranges). Invoke seo-keyword against the affected query classes: did the
    demand itself fall? A drop that tracks the category's demand curve is not
    a site problem, and treating it as one wastes a quarter.

**Branch E, SERP displacement.**
Skills: seo-rank-tracking, seo-competitor
Run:

    Invoke seo-rank-tracking on the affected queries: are positions held or
    lost? Positions held with clicks down points at SERP-feature displacement
    (check the affected queries' current result layout). Positions lost points
    at a competitor or a relevance change; invoke seo-competitor to identify
    who took them and with what.

Output artifact: a branch evidence table: five branches, evidence for, evidence against, per-branch confidence
Done when: all five branches have evidence recorded, including the branches that came back clean
Fails look like: stopping at the first guilty-looking branch. Real drops are frequently compound (an update lands the same week a consent banner breaks measurement), and a one-branch diagnosis on a compound drop fixes half the problem while the other half compounds

### Phase 3: Diagnosis · lane: divergent (Krine)

Skills: none; this is the judgment stop
Input: the drop profile and the branch evidence table
Run:

    Rank the candidate causes by evidence strength, stating per-branch
    confidence and explicitly noting compound possibilities. Present the
    ranked diagnosis with the evidence attached. Recommend nothing yet.
    Stop for the human.

Output artifact: a ranked diagnosis with per-cause confidence and the compound read
Done when: a human has confirmed the diagnosis or sent specific branches back for deeper evidence
Operated-layer note: in an operated deployment, the engine's ranked diagnosis and the human's confirmation or override land as an agreement-log row; diagnosis agreement over time is what earns this lane trust
Fails look like: the diagnosis arriving pre-merged with the treatment. The moment the diagnosis says "and therefore we should," the human is reviewing a plan, not a finding, and anchoring does the rest

### Phase 4: Route the response · lane: convergent (Tholo)

Skills: routing per diagnosis; the responses live in their owning workflows
Input: the confirmed diagnosis
Run:

    Route each confirmed cause to its owner: technical regression -> a held
    change (repo.change) with the specific fix; tracking breakage -> a held
    fix to the measurement path, plus an annotation on the drop window so
    the record shows measurement loss, not traffic loss; update-class losses
    -> the content-quality program (Corpus Integrity and Correction, Content
    Pipeline refresh triggers), never a quick technical counterattack;
    demand decline -> a strategy note, not a fix; SERP displacement ->
    targeted format or coverage work through the Content Pipeline. Every
    response lands held; nothing merges from inside the triage.

Output artifact: held changes and routed work items, each tied to its diagnosed cause
Done when: every confirmed cause has a routed response or an explicit decision to accept it
Fails look like: fixing inside the triage. The triage's authority is diagnostic; the moment it merges its own fixes, the diagnosis and the treatment share an author and the verification story collapses

### Phase 5: Recovery watch · lane: gate (Basano)

Skills: seo-rank-tracking, seo-traffic-diagnosis
Input: the pre-registered recovery metric (set it now, before watching: which segment, back to what level, measured how)
Run:

    On a fixed cadence, measure the affected segments against the
    pre-registered recovery metric and the pre-drop baseline. Report
    trajectory per diagnosed cause. Declare recovery only when the
    pre-registered condition holds across the pre-registered window, not
    on the first good week.

Output artifact: recovery reports on cadence; a closure record when the pre-registered condition holds
Done when: recovery is declared against the pre-registered condition, or the diagnosis is reopened because the trajectory contradicts it
Fails look like: victory on one good week. Traffic is noisy; a recovery declared on a single datapoint reopens as a mystery a month later, now with the trail cold

## Failure modes

- First-plausible-branch tunnel vision (Phase 2's inline failure; the discipline is that clean branches get recorded too).
- Measurement loss recorded as traffic loss: the record must say which it was, or every future baseline is quietly wrong.
- Timing-only update attribution: correlation with an update date without shape agreement is a coin flip wearing a citation.
- Treatment anchoring: diagnosis and recommendation delivered as one artifact (Phase 3's inline failure).
- Unpre-registered recovery: the metric chosen after watching begins always finds recovery.
- Compound drops resolved as single causes: fix half, and the remaining half now looks like the fix failed.

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property experiencing a diagnosable drop. The decision tree generalizes a real production diagnosis (a mass deindexation timed to a core update, root-caused to content quality rather than technical failure, on an unnamed property); that incident informs the branches but is not validation evidence.

## Boundaries

- Incident Response and Lane Demotion owns drops caused by the pipeline's own promoted changes (a post-merge regression is an incident with a known suspect, not a mystery).
- Conversion-by-Source Diagnosis owns conversion problems on stable traffic; this workflow owns the traffic itself.
- Corpus Integrity and Correction and the Content Pipeline own the content-quality responses this workflow routes to; the triage never edits content.

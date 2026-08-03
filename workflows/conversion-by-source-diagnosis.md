# Conversion-by-Source Diagnosis

```
name:            Conversion-by-Source Diagnosis
slug:            conversion-by-source-diagnosis
tier:            forward-deployed (operations)
role:            fda
status:          template
score:           49 (demand 5, pain 5, differentiation 3, usability 4, connectors 5)
intent:          find the conversion divergences worth money in the analytics export,
                 verify they are behavior rather than measurement, and emit a ranked
                 hypothesis list a human picks from
when to use:     traffic is stable but the outcome number is not, or nobody has looked
                 at conversion by segment in a quarter
when not to use: traffic itself dropped (Traffic-Drop Triage); running the tests this
                 workflow proposes (Experiment Loop with Pre-Registered Gates);
                 verifying the tracking pipeline end to end (Revenue Tracking
                 Integrity)
```

## Connectors

```
connectors:
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter
  - capability:  analytics.read
    access:      read
  - capability:  search-performance.read
    access:      read           # intent context for landing pages
  - capability:  crawl.read
    access:      read           # measurement checks on live pages
```

Fully read-only. This workflow diagnoses and ranks; it changes nothing. Its output routes to the Experiment Loop or to held fixes owned elsewhere.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills` then `/plugin install rampstack-skills@rampstack`
- Conversion events landing in the warehouse or analytics store with source attribution (the native analytics export into the warehouse is the reference setup; enable exports before anything else, they do not backfill).
- A defined conversion event set and, where it exists, a value per event; if value is unknown, the ranking uses volume and says so.
- Enough history for a stable baseline per segment (thin segments produce loud noise; the workflow flags them rather than ranking them).

## Phases

### Phase 1: Frame the funnel and the baseline · lane: convergent (Tholo)

Skills: analytics-strategy, product-analytics-setup
Capability class: conversion.frame (substitute equivalents if off-catalog)
Input: the conversion event definitions; the analytics export in the warehouse
Run:

    Invoke analytics-strategy to state, in writing: which events count as
    conversions here, what a source is (source/medium granularity), which
    segments matter (landing page template, device, country, intent class),
    and the baseline window. Invoke product-analytics-setup to confirm the
    events named actually exist in the export with the fields the analysis
    needs. Produce the frame document. No analysis yet.

Output artifact: the frame (events, segments, baseline window, known value per event or the stated absence)
Done when: the frame names every dimension the sweep will cut by, and each named event is confirmed present in the data
Fails look like: framing after looking. A frame written once the divergences are visible quietly becomes a justification for them; the frame comes first so the sweep cannot be steered

### Phase 2: The divergence sweep · lane: convergent (Tholo)

Skills: product-analytics-setup (nearest anchor; the divergence-detection core is a DECLARED GAP, procedure inline)
Capability class: conversion.divergence-detect (declared catalog gap)
Input: the frame; bounded warehouse queries per the frame's window
Run:

    Compute conversion rate by source x landing template x device against
    the baseline, with volume attached to every cell. Surface the divergences
    worth money, in three shapes: segments converting well below their peers
    at meaningful volume (the fix candidates), sources whose conversion
    quality shifted against their own history (the quality drifts), and pages
    that earn traffic but not outcomes, cross-read with search-performance
    intent data (the rank-without-reward set). Flag thin cells as
    not-rankable instead of ranking their noise. Attach the numbers to every
    finding.

Output artifact: the divergence table (finding, segment, magnitude, volume, baseline)
Done when: every finding carries its numbers and thin cells are marked not-rankable
Fails look like: averaging across segments, the same failure that breaks traffic triage. A flat blended conversion rate can hide one template at half its peers; the cuts in the frame exist so the blend cannot

### Phase 3: Measurement gate · lane: gate (Basano)

Skills: product-analytics-setup (anchor; procedure inline)
Capability class: measurement.verify (declared catalog gap)
Input: the divergence table; the live pages of affected segments (crawl.read)
Run:

    Before any divergence is treated as behavior, test it as measurement.
    Per finding, check: consent-flow differences by source or geography
    (a consent-heavy source under-reports conversions, not visitors);
    attribution parameters surviving the landing path (redirects and
    canonicalization strip params); cross-domain or app boundaries in the
    converting path; event firing verified on the live affected templates;
    and whether the divergence's start date aligns with a tracking or
    consent deploy rather than a demand or content change. Verdict per
    finding: BEHAVIOR, MEASUREMENT, or MIXED, with evidence. Report only.

Output artifact: the divergence table, annotated with measurement verdicts
Done when: every finding carries a verdict; MEASUREMENT findings route to a tracking fix, not an optimization
Fails look like: optimizing a consent artifact. A quarter spent lifting a segment whose conversions were merely unmeasured is the expensive version of this failure, and it is common

### Phase 4: Hypothesis ranking · lane: divergent (Krine)

Skills: none; this is the judgment stop
Input: the BEHAVIOR and MIXED findings
Run:

    For each finding, state the hypothesis as mechanism, not aspiration:
    what specifically about the page, offer, or match to intent would
    explain the gap, and what change would test it. Rank by expected value
    where value is known (volume x conversion delta x value per event) and
    by volume-weighted delta where it is not, saying which basis each rank
    uses. Present the ranked list with evidence. Recommend the top
    candidates for testing; decide nothing. Stop for the human.

Output artifact: the ranked hypothesis list (mechanism, evidence, expected-value basis)
Done when: a human selects which hypotheses proceed
Operated-layer note: in an operated deployment the ranking and the human's selection land as an agreement-log row; hypothesis hit-rate over time, fed back from experiment verdicts, is what calibrates this lane
Fails look like: aspiration hypotheses ("improve the CTA") with no mechanism. A hypothesis that does not say why the gap exists cannot be falsified by a test, and the experiment it produces measures nothing

### Phase 5: Route the winners · lane: convergent (Tholo)

Skills: routing; the work lives in the owning workflows
Input: the human-selected hypotheses
Run:

    Testable hypotheses route to the Experiment Loop with Pre-Registered
    Gates, carrying their mechanism, expected effect size, and the segment
    definition (the loop's pre-registration consumes exactly these).
    Findings that are defects rather than hypotheses (a broken form, a
    measurement fix) route as held changes to their owners. Record the
    routing so experiment verdicts flow back against the original finding.

Output artifact: routed work items, each tied to its finding and hypothesis
Done when: every selected hypothesis is in the experiment queue or routed as a held fix, with the return path recorded
Fails look like: the diagnosis running its own tests. The moment this workflow ships a variant, pre-registration is retrofitted to a change already believed in, and the experiment gate is theater

## Failure modes

- Segment blending (Phase 2's inline failure).
- Measurement artifacts optimized as behavior (Phase 3's inline failure, the expensive one).
- Expected-value theater: invented per-event values lending false precision to the ranking; the basis is stated or the rank is volume-weighted, never silently guessed.
- Thin-cell confidence: ranking noise from segments too small to trust; not-rankable is a verdict, not an apology.
- Mechanism-free hypotheses (Phase 4's inline failure).
- Self-testing (Phase 5's inline failure).

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property with conversion events; the intended first substrate is a designated property whose outbound pick-click events serve as the conversion set. Status flips to validated when that run record links here.

## Boundaries

- Experiment Loop with Pre-Registered Gates owns everything from pre-registration through verdict; this workflow supplies its intake and consumes its verdicts as calibration.
- Revenue Tracking Integrity owns the money path end to end on a schedule; Phase 3 here is a per-finding spot check, not that audit.
- Traffic-Drop Triage owns falling traffic; this workflow assumes traffic is roughly stable and the outcome is the question.

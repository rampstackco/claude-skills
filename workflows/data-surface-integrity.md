# Data Surface Integrity

```
name:            Data Surface Integrity
slug:            data-surface-integrity
tier:            forward-deployed (operations)
role:            fde
status:          template
score:           49 (demand 4, pain 5, differentiation 5, usability 4, connectors 4)
intent:          keep machine-rendered data series honest: per-series freshness guards,
                 two-surface consistency from one source, honest degradation, and
                 discontinued-series retirement
when to use:     any property that renders live or periodic data series (rates, prices,
                 counts, stats) a reader is expected to trust
when not to use: authored claims about the world (Corpus Integrity and Correction);
                 whether a surface is current at all after a deploy (Post-Deploy Live
                 Verification)
validation note: gated on a designated data surface existing or the allowlist expanding;
                 neither designated property renders external data series today
gap note:        the freshness-guard and consistency cores are DECLARED CATALOG GAPS with
                 monitoring-and-alerting and seo-technical as the nearest anchors; those
                 phases are inline procedure. It is written to be runnable anyway.
```

## Connectors

```
connectors:
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter
  - capability:  crawl.read
    access:      read
  - capability:  repo.change
    access:      write-held      # only Phase 5's retirement changes
```

Read-only until Phase 5; retirement changes land held, a human merges. Nothing in the audit acts on production.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills` then `/plugin install rampstack-skills@rampstack`
- The property's machine-rendered data series and the source each renders from (the warehouse tables or feeds behind them).
- The live surfaces that render each series (crawl.read), including metadata and any narration that cites the series.
- The per-series cadence each source actually updates on.
- A place to record the discontinued-series registry and the correction-note format (the same format Corpus Integrity and Correction uses).

## If a prerequisite is unmet

Any phase can find a required input, tool, access, or data source unavailable or unverifiable. When that happens, the sanctioned output is a report-blocked statement: what the phase required, what was actually verified or obtained, and where the run stops or continues degraded.

- A report-blocked statement satisfies the phase's done-when. Partial completion counts as completion when it is stated as partial.
- Fabricating, estimating, or interpolating a required number to satisfy a done-when is never sanctioned.
- A phase handed a report-blocked upstream treats it as its own unmet prerequisite and reports blocked in turn, rather than running on an input that does not exist.

## Phases

### Phase 1: Series inventory · lane: convergent (Tholo)

Skills: monitoring-and-alerting (nearest anchor; the series-inventory core is a DECLARED GAP, procedure inline)
Capability class: data.series-inventory (declared catalog gap; nearest-miss monitoring-and-alerting)
Input: the property's data sources; the live surfaces (crawl.read)
Run:

    Invoke monitoring-and-alerting's series discipline. Inventory every
    machine-rendered series ONE series at a time: its source, the cadence that
    source actually updates on, and every surface that consumes it (tiles, tables,
    metadata, and any narration that cites it). Key the inventory by series, never
    by dataset, because a dataset holds many series on different cadences. Produce
    the per-series inventory; guard nothing yet.

Output artifact: the per-series inventory (each series: source, real cadence, every consuming surface)
Done when: every machine-rendered series is inventoried by series with its source, cadence, and consuming surfaces, including metadata and narration, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: inventorying by dataset. A dataset marked fresh can carry one series that froze months ago, and a dataset-level view never sees the frozen series inside it.

### Phase 2: Guard audit · lane: gate (Basano)

Skills: monitoring-and-alerting (nearest anchor; the freshness-guard core is a DECLARED GAP, procedure inline)
Capability class: data.freshness-guard (declared catalog gap; nearest-miss monitoring-and-alerting)
Input: the per-series inventory
Run:

    Invoke monitoring-and-alerting's threshold discipline as a gate. Per series,
    check three guards and change nothing. Freshness: a per-series staleness
    threshold exists and fires when the series exceeds its own cadence, never a
    dataset-wide threshold. Discontinued registry: a series that stopped updating
    is registered as discontinued, not silently served stale. Honest degradation:
    when a series is stale or degraded, the surface renders honestly, showing the
    as-of date and suppressing the trend arrows and deltas a frozen value cannot
    support. Report a verdict per series per guard with the rendered evidence.

Output artifact: the guard report (per series: freshness threshold, discontinued registration, honest degradation, each with a verdict)
Done when: every series has a verdict on its per-series freshness threshold, its discontinued status, and its degradation rendering, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: a trend arrow on a degraded series. An up arrow drawn from a value that stopped updating tells the reader the number is rising when it is only frozen, which is worse than showing nothing.

### Phase 3: Two-surface consistency · lane: gate (Basano)

Skills: seo-technical, qa-testing (nearest anchors; the consistency build-test core is a DECLARED GAP, procedure inline)
Capability class: data.two-surface-consistency (declared catalog gap; nearest-miss seo-technical, qa-testing)
Input: the per-series inventory (series rendered on more than one surface)
Run:

    Invoke seo-technical and qa-testing. For any value that appears on two or more
    surfaces, prove it renders from ONE source module, and back that proof with a
    build test that fails if the two surfaces ever derive the value independently.
    Check the caches too: two surfaces reading one module in code can still
    diverge when their cache lifetimes differ, so the test covers served output,
    not only source. Report consistency per shared value with the build-test
    evidence.

Output artifact: the consistency report (each shared value: single-source proof, the build test, the cache-lifetime check)
Done when: every value on two or more surfaces is proven single-source with a build test, or the divergence is flagged with evidence, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: one source in code, two lifetimes in cache. Two surfaces importing the same module look consistent in review and serve different numbers in production because one cache outlived the other.

### Phase 4: Cadence-copy alignment · lane: gate (Basano)

Skills: editorial-qa, monitoring-and-alerting (nearest anchors; the cadence-claim core is a DECLARED GAP, procedure inline)
Capability class: data.cadence-alignment (declared catalog gap; nearest-miss editorial-qa, monitoring-and-alerting)
Input: the per-series inventory; the surface copy that claims an update frequency
Run:

    Invoke editorial-qa to find the copy and monitoring-and-alerting to check the
    mechanism. Wherever a surface states its own update frequency ("updated
    daily", "live rates", "refreshed weekly"), verify the series behind it
    actually updates on that cadence. A page promising daily data over a series
    that updates monthly is a false claim the reader cannot see is false. Report
    each cadence claim against its series' real cadence with a verdict. Report
    only.

Output artifact: the cadence-alignment report (each stated frequency, the series' real cadence, a verdict)
Done when: every surface claim about its own update frequency has a verdict against the series' real cadence, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: trusting the copy. "Updated daily" is a claim like any other, and a series that refreshes monthly behind it is a dated claim that rots the moment the copy ships.

### Phase 5: Retirement protocol · lane: convergent (Tholo)

Skills: editorial-qa, brand-voice
Capability class: data.series-retirement (write-held)
Input: the discontinued series from Phase 2; the property's correction-note format
Run:

    Invoke editorial-qa and brand-voice for the retirement, the same correction
    discipline Corpus Integrity and Correction uses. For each discontinued series:
    remove it from current renders (the tile, the table, the metadata), and add a
    visible correction note anywhere the corpus narrates the series, stating that
    it is discontinued and as of when. The narration is retired with the tile, not
    left behind to describe a number that no longer renders. Everything lands
    held; a human merges.

Output artifact: held retirement changes per discontinued series (removed from renders, correction note on any narration)
Done when: every discontinued series is removed from current renders and its narration carries a visible correction note, all as held changes, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: retiring the tile but not the narration. The number disappears from the dashboard while a paragraph elsewhere still explains what it means and where it is heading, describing a series that no longer exists.

## Failure modes

- Dataset-level guards (Phase 1 and Phase 2's failure): a frozen series hiding inside a fresh dataset.
- Trend arrows on degraded series (Phase 2's failure): an arrow drawn from a value that stopped moving.
- One source in code, two lifetimes in cache (Phase 3's failure): two surfaces diverging past a shared module because their caches expire differently.
- Retiring the tile but not the narration (Phase 5's failure): the render gone, the prose still describing it.
- Cadence copy outrunning the mechanism (Phase 4's failure): a stated update frequency the series never meets.
- Guards written once and never re-run: a series added after the audit renders unguarded, so the guard set is only as complete as its last inventory.

## Worked example

Pending. Populates when this workflow is executed as written on a designated property that renders live data series; neither designated property renders external data series today, so it is gated on such a surface existing or the allowlist expanding. The freshness and degradation patterns generalize production incidents on an unnamed property (a series serving a frozen value behind a live trend arrow); that origin informs the guards but is not validation evidence.

## Boundaries

- Corpus Integrity and Correction owns authored claims about the world; this workflow owns machine-rendered data series, and Phase 5's retirement uses that workflow's correction-note pattern for any narration of a discontinued series.
- Post-Deploy Live Verification owns whether a surface is current at all after a deploy; this workflow owns whether the series it renders stay fresh, consistent, and honestly degraded between deploys.
- Warehouse Data Plane Standup stands up the bounded warehouse access and the sensing layer this workflow's guards read through.

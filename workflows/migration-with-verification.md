# Migration with Verification

```
name:            Migration with Verification
slug:            migration-with-verification
tier:            forward-deployed (operations)
role:            fde
status:          template
score:           47 (demand 4, pain 5, differentiation 4, usability 4, connectors 4)
intent:          migrate a property with the redirect map gated for completeness, old and
                 new parity proven, cutover staged behind a human, and recovery watched
                 against baselines pre-registered before the flip
when to use:     moving a property to a new domain, platform, or URL structure, where old
                 URLs carry traffic and rankings worth keeping
when not to use: verifying a single deploy on an unchanged property (Post-Deploy Live
                 Verification); a traffic drop with no known cause (Traffic-Drop Triage)
validation note: gated on a real migration of a designated property; none is planned, so
                 it holds at template until such a migration occurs
```

## Connectors

```
connectors:
  - capability:  crawl.read
    access:      read            # both the old and the new property
  - capability:  search-performance.read
    access:      read            # the pre-cutover baselines
  - capability:  repo.change
    access:      write-held      # the redirect map and any fix land as held changes
```

Read-only until the held redirect map and fixes. The cutover itself, the DNS and platform actions, is a human phase; nothing here flips a property.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- Crawl access to both the old property and the new one.
- The complete list of old URLs, from the old sitemap, the crawl, and the search-performance export together, because any one alone misses pages.
- Search-performance history for the old property, to pre-register baselines before cutover.
- The cutover runbook's platform access (DNS, hosting), held by the human who performs it.

## Phases

### Phase 1: Inventory and pre-register the baselines · lane: convergent (Tholo)

Skills: content-migration, seo-technical
Capability class: migration.baseline (substitute equivalents if off-catalog)
Input: the old property (crawl.read), its search-performance history, the new property's planned structure
Run:

    Invoke content-migration to inventory the old property and seo-technical to
    read its structure. Build the complete old-URL list as the union of the
    sitemap, the crawl, and the search-performance export, because any single
    source misses pages. Then PRE-REGISTER the baselines before cutover: the
    traffic and ranking levels per key segment, and the recovery metric (which
    segment, back to what level, measured over what window) written down now,
    while the old property is still live. Produce the inventory and the
    pre-registered baseline record.

Output artifact: the complete old-URL inventory and the pre-registered baseline record (traffic, rankings, the recovery metric), dated before cutover
Done when: every old URL is inventoried from the three sources unioned, and the baselines and recovery metric are recorded before any cutover step
Fails look like: baselines chosen after cutover. A recovery metric written once traffic has moved is fitted to whatever happened and will always find recovery; the baseline means something only if it predates the flip.

### Phase 2: Redirect-map completeness gate · lane: gate (Basano)

Skills: content-migration
Capability class: migration.redirect-completeness (substitute equivalents if off-catalog)
Input: the complete old-URL inventory; the new property's URL structure
Run:

    Invoke content-migration against the old-URL inventory. For EVERY old URL, not
    a sample, assign one of three dispositions: a 301 to a specific new URL,
    gone-with-intent (a 410 or an intentional removal with the reason recorded),
    or explicitly dropped with a written rationale. The gate is completeness: an
    old URL with no disposition is a fail, and the map is not done until the
    uncovered count is zero. Report the map with its coverage and every
    disposition's evidence. This gate reports and fixes nothing.

Output artifact: the redirect map (every old URL, its disposition, the rationale for drops) with a zero-uncovered coverage report
Done when: every old URL in the inventory carries a disposition, the uncovered count is zero, and each drop has a recorded rationale
Fails look like: a sampled map. A redirect map spot-checked instead of completed passes review and drops the long tail, and the long tail is where the accumulated ranking equity quietly lived.

### Phase 3: Parity audit, old versus new · lane: gate (Basano)

Skills: seo-technical, seo-onpage
Capability class: migration.parity-audit (substitute equivalents if off-catalog)
Input: the old and new properties (crawl.read); the redirect map
Run:

    Invoke seo-technical and seo-onpage against matched old and new URLs. For each
    mapped pair, check parity: title and meta, the canonical target, structured
    data, the presence of the content the old page ranked for, and the
    internal-link graph around it. Flag any new page that lost metadata, changed a
    canonical away from itself, dropped structured data, or is missing content its
    old counterpart carried. Report parity per pair with the evidence. Report only.

Output artifact: the parity report (each mapped pair, per-check verdict, the evidence)
Done when: every mapped pair has a parity verdict across metadata, canonical, structured data, content presence, and internal links
Fails look like: parity by URL existence. A new URL that returns 200 can still have lost the title, the schema, and half the body the old one ranked for, and a check that stops at "the page exists" certifies a page that will not hold the ranking.

### Phase 4: Staged cutover · lane: divergent (human)

Skills: launch-runbook
Capability class: migration.cutover (write-held runbook; the actions are human)
Input: the passing redirect map and parity report
Run:

    Invoke launch-runbook to author the staged cutover runbook: the ordered DNS
    and platform steps, each stage with a checkpoint that must pass before the
    next. Then a person performs the cutover per the runbook; DNS and platform
    changes are production state changes and stay human. The human records which
    stage was executed when, and holds at any checkpoint that fails rather than
    proceeding.

Output artifact: the staged cutover runbook, and the human's record of each stage executed with its checkpoint result
Done when: the cutover stages are executed per the runbook with each checkpoint recorded, or the cutover is held at a failed checkpoint
Fails look like: a big-bang cutover with no checkpoints. Flipping everything at once removes the one thing staging buys, the chance to catch a broken stage before the next one lands on top of it.

### Phase 5: Post-cutover verification · lane: gate (Basano)

Skills: none; the engine is the Post-Deploy Live Verification workflow, executed as written
Capability class: deploy.live-verify (delegated to Post-Deploy Live Verification)
Input: the new property; the redirect map
Run:

    Run Post-Deploy Live Verification as written against the new property's touched
    and blast-radius routes. Do not restate its procedure here: it owns the
    discriminator value, the build-identity read, and the two-fetch production
    discipline, and this phase inherits all of it. Then add the migration-specific
    check: verify the redirect map fires on the live property, the highest-traffic
    and the gone-with-intent URLs first, each old URL landing on its mapped target
    with the right status code. Report the live-verification verdict and the
    redirect verdicts together.

Output artifact: the Post-Deploy Live Verification closure for the new property plus the live redirect verdicts from the map
Done when: Post-Deploy Live Verification closes VERIFIED on the new property and the mapped redirects fire live with the right status codes, or the discrepancies are filed with their evidence
Fails look like: declaring the migration done at the DNS flip. DNS resolving is not the property migrated; the redirects, the parity, and the live render are, and only production fetches prove them.

### Phase 6: Monitoring window against the pre-registered baselines · lane: gate (Basano)

Skills: seo-rank-tracking, seo-traffic-diagnosis
Capability class: migration.monitor (substitute equivalents if off-catalog)
Input: the pre-registered baseline record; the new property's search-performance and ranking data on a cadence
Run:

    Invoke seo-rank-tracking and seo-traffic-diagnosis against the new property on
    a fixed cadence through the monitoring window. Measure the affected segments
    against the baselines pre-registered in Phase 1, and report the trajectory.
    Declare the migration recovered only when the pre-registered recovery metric
    holds across its pre-registered window, not on the first good week. If the
    trajectory contradicts the baseline, the migration has a regression and it
    routes out of this workflow.

Output artifact: monitoring reports on cadence, and a closure record when the pre-registered recovery condition holds
Done when: the pre-registered recovery condition holds across its window and the closure is recorded, or the window breaks baseline and the regression is routed to Traffic-Drop Triage
Fails look like: closing on the first good week. Migration traffic is noisy in the weeks after cutover, and a recovery declared on one datapoint reopens a month later as a mystery with the trail already cold.

## Failure modes

- The redirect map sampled instead of complete (Phase 2's failure): the long tail dropped, and with it the accumulated equity.
- Baselines chosen after cutover (Phase 1's failure): a recovery metric fitted to what happened always finds recovery.
- Declaring success at the DNS flip (Phase 5's failure): cutover is not migration; the redirects, the parity, and the live render are.
- The old property's cache serving past cutover: after the flip, some request paths keep serving the old property's cached render for a while, so a page can look migrated on one fetch and stale on another. Verification covers cookie-less vantages and does not stop at the first clean fetch; a clean read from one path is a sample, not the verdict. This is the split-serving class at its worst possible moment, when two properties are briefly both answering.
- Parity by URL existence (Phase 3's failure): a 200 that lost the title, the schema, and half the body.
- A big-bang cutover (Phase 4's failure): no checkpoint to catch a broken stage before the next lands on it.

## Worked example

Pending. Populates when this workflow is executed as written on a real migration of a designated property; none is planned, so it holds at template until such a migration occurs. The split-serving pattern in the failure modes generalizes production incidents on an unnamed property, where a render persisted on one request path after a change while another path served current data; that lesson informs Phase 5's vantage discipline but is not validation evidence. Status flips to validated when a run record links here.

## Boundaries

- Post-Deploy Live Verification is Phase 5's engine: this workflow runs it as written against the new property and adds the redirect checks, rather than restating its procedure.
- Traffic-Drop Triage takes over when the monitoring window breaks baseline: a post-cutover regression that contradicts the pre-registered recovery metric is a diagnosable drop, and that workflow owns the diagnosis.

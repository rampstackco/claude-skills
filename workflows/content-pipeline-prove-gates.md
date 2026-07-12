# Content Pipeline with Prove Gates

```
name:            Content Pipeline with Prove Gates
slug:            content-pipeline-prove-gates
tier:            forward-deployed (operations)
role:            fdm
status:          validated
run record:      run-records/content-pipeline-prove-gates-run-1.md
score:           49 (demand 5, pain 4, differentiation 5, usability 4, connectors 4)
intent:          run a content function as a delivery pipeline where every piece ships
                 through verification gates and a human merge
when to use:     a content property with real traffic stakes, where volume is
                 agent-produced and trust cannot be
when not to use: one-off content tasks (use the build-time Content Production module);
                 site builds (use the Website Launch Pipeline); paid-media content
                 (off-catalog)
```

## Connectors

```
connectors:
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter
  - capability:  search-performance.read
    access:      read
  - capability:  cms.draft          # for CMS-published properties
    access:      write-held
  - capability:  repo.change        # for git-published properties
    access:      write-held
  - capability:  crawl.read
    access:      read
```

One of cms.draft or repo.change is required, matching how the property publishes. Write-held means every draft lands held; nothing in this workflow publishes on its own. The agreement log referenced below is operated substrate with no connector class; see the operated-layer notes.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- A demand source the ranking can read: a search-performance export, keyword data, or query logs. If using warehouse exports, enable them before anything else; they do not backfill.
- A publishable target with a draft-and-hold mechanism (CMS drafts or PRs).
- A claims-and-style standard file (STANDARDS.md or equivalent): voice rules, phrase rules, sourcing requirements.
- A route list or sitemap the link checks can resolve against.

## Phases

### Phase 1: Rank the backlog from demand · lane: divergent (Krine)

Skills: seo-keyword, seo-keyword-gap-audit, content-strategy
Capability class: demand.rank (substitute equivalents if off-catalog)
Input: the demand source (search-performance data, keyword exports) plus whatever outcome history exists; the current content inventory
Run:

    Invoke seo-keyword and seo-keyword-gap-audit against the demand data, and
    content-strategy against the property's positioning. Rank the candidate
    topics with named, auditable criteria (demand volume tiers, intent fit to
    the property's priority pages, difficulty). Emit the top items as a ranked
    queue with the evidence attached to each: the demand numbers, the intent
    read, and why it outranks its neighbors. Do not pick the winner; present
    the ranking and stop.

Output artifact: a ranked brief queue with per-item evidence (the stop package)
Done when: a human selects the go item from the ranking
Operated-layer note: in an operated deployment, the ranking and the human's selection land as an agreement-log row (ranked-choice payload); the divergence between engine order and human pick is the calibration signal
Fails look like: ranking by raw volume alone. Volume without intent fit sends the pipeline chasing traffic the property cannot convert or hold; the criteria exist to be argued with, which requires them to be named

### Phase 2: Produce the held draft · lane: convergent (Tholo)

Skills: content-brief-authoring, brand-voice, long-form-content-frameworks, seo-onpage
Capability class: content.draft (write-held)
Input: the selected brief from Phase 1; STANDARDS.md
Run:

    Invoke content-brief-authoring to expand the selected item into a full
    brief, then draft against it using long-form-content-frameworks for
    structure, brand-voice for voice, and seo-onpage for title, headers, meta,
    and internal links. Every factual claim carries its source or derivation
    inline. Land the result as a held draft (CMS draft or draft PR). Do not
    publish, schedule, or merge.

Output artifact: a held draft with sources inline, plus the brief it was written against
Done when: the draft exists in held state and nothing has published
Fails look like: the draft publishing directly because the target's draft mechanism was skipped. Write-held is the seam; a pipeline that can publish in this phase is a different and more dangerous machine

### Phase 3: Pre-publish gate · lane: gate (Basano)

Skills: editorial-qa, seo-onpage, seo-technical
Capability class: content.pre-publish-gate (substitute equivalents if off-catalog)
Input: the held draft from Phase 2 plus STANDARDS.md
Run:

    Invoke editorial-qa, seo-onpage, and seo-technical against the attached
    draft. Using those skills' frameworks, check: every factual claim has a
    source or derivation; style and phrase rules in STANDARDS.md pass; title,
    meta description, and structured data are present and consistent; every
    internal link resolves against the site's route list. Output a pass/fail
    verdict per check with evidence. Do not fix anything; report only.

Output artifact: a prove report (verdict per check, evidence attached), attached to the held draft
Done when (public gate): every check passes, or a failure is waived in writing with a recorded rationale attached to the held draft
Operated-layer note: in an operated deployment, the verdict and any waiver land as an agreement-log row; this is operated substrate, not part of the public package
Fails look like: the gate passing on a claim citing a source that does not contain the number (source-shape checking, not source-presence checking)

### Phase 4: Human review and merge · lane: divergent (human, structural)

Skills: none; this phase is the point
Input: the held draft and its prove report
Run: a person reviews the draft the way they would review a contractor's work, reads the prove report, and merges or publishes, or sends it back with notes
Output artifact: the published piece, or a revision note back to Phase 2
Done when: a human has merged, published, or rejected; the pipeline never advances this phase on its own
Operated-layer note: the human verdict (merge, reject, revise, waive) and, on revise, what changed between proposal and merge, land in the agreement log; the proposal-to-merge diff is the pipeline's primary correction signal
Fails look like: rubber-stamping. If every draft merges untouched for weeks, either the pipeline has earned trust (the operated agreement record would show it) or the review has stopped happening; at template status, assume the second

### Phase 5: Post-publish live audit · lane: gate (Basano)

Skills: qa-testing (nearest anchor; the live-verification core is a DECLARED GAP, procedure inline)
Capability class: deploy.live-verify (declared catalog gap; nearest-miss qa-testing)
Input: the production URL of the published piece; the approved draft from Phase 4
Run:

    Fetch the live production URL (not a preview, not a staging domain, not a
    cached copy). Verify: the rendered content matches what was approved at
    merge; the canonical URL is self-referencing; title, meta description,
    social-share metadata, and structured data are present on the live render
    and match the approved values; every internal link on the live page
    resolves. If the property fronts a CDN or uses incremental rendering,
    confirm the render is current by checking a value known to have changed at
    publish. Report verdict per check with the live evidence.

Output artifact: a live-audit report tied to the production URL
Done when: every check passes against the live render, or the discrepancy is filed as a defect with the live evidence attached
Fails look like: verifying the preview. Merged is not live; a published piece can serve a stale render or the wrong metadata while the preview looks perfect, and only the production URL is ground truth

### Phase 6: Outcomes and the refresh trigger · lane: convergent (Tholo)

Skills: seo-rank-tracking, seo-content-audit, content-refresh-system
Capability class: outcomes.read + content.decay-detect
Input: search-performance and warehouse data for the published corpus, on a cadence (weekly or monthly)
Run:

    Invoke seo-rank-tracking against the published pieces' target queries and
    seo-content-audit plus content-refresh-system against the corpus on the
    set cadence. Flag pieces whose demand, position, or freshness has decayed
    past the refresh thresholds. Emit decay flags as candidate items INTO the
    Phase 1 ranking, carrying their evidence, where they compete with new
    topics on the same criteria.

Output artifact: outcome records per piece; decay flags entering the Phase 1 queue
Done when: outcomes are queryable for the next ranking cycle and decay candidates are in the queue
Fails look like: refresh running as its own separate pipeline. Decay is a demand source, not a second loop; the moment refreshes bypass the ranking, the pipeline has two front doors and the criteria govern only one of them

## Failure modes

- Gate theater: prove reports that always pass. A gate that never fails is either gating nothing or the drafts are being pre-sanitized to it; check by seeding a known-bad claim quarterly and confirming the gate catches it.
- Source-shape blindness: claims citing real sources that do not contain the claimed number (Phase 3's inline failure, the most common one in practice).
- Preview verification: Phase 5 run against anything but the production URL.
- Volume chasing: Phase 1 criteria quietly reduced to demand volume.
- Silent refresh edits: Phase 6 refreshes that change published claims without a visible note; corrections are visible or they are not corrections (see Corpus Integrity and Correction for the correction-note pattern).
- Write-held erosion: any phase acquiring publish or merge authority. At template status the human merge is absolute; graduation exists only under the operated autonomy doctrine, per lane, revocably, and never for judgment-tier gates.

## Worked example

Run 1 executed this workflow as written on bowhuntamerica.com: a demand-ranked how-to entered at Phase 1 and exited Phase 5 with a passing live audit, six pre-publish gates with no waiver, and a zero-diff human merge. The full run record, including the vantage finding Phase 5 surfaced and resolved, is linked from the front matter.

## Boundaries

- The build-time Content Production module owns one-off content tasks; this workflow owns the continuous loop. Each points here.
- Corpus Integrity and Correction owns claim-truth across the published corpus and the correction-note pattern; Phase 6 hands decayed or wrong claims to it rather than editing silently.
- Post-Deploy Live Verification owns the general deploy-verification procedure; Phase 5 is its content-shaped instance and shares its declared gap.

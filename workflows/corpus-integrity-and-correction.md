# Corpus Integrity and Correction

```
name:            Corpus Integrity and Correction
slug:            corpus-integrity-and-correction
tier:            forward-deployed (operations)
role:            fdm
status:          template
score:           49 (demand 4, pain 5, differentiation 5, usability 4, connectors 4)
intent:          keep a published corpus true over time: detect stale and wrong claims,
                 enforce derived counters, and correct visibly instead of silently
when to use:     any property whose published pages carry claims, numbers, or dated
                 facts that age; any property where the same fact appears on more
                 than one page
when not to use: pre-publish checking of a new draft (Content Pipeline, Phase 3);
                 refreshing a decayed piece for demand reasons (Content Pipeline,
                 Phase 6); live data feeds like rates or prices (Data Surface
                 Integrity owns machine-rendered series; this workflow owns
                 authored claims)
```

## Connectors

```
connectors:
  - capability:  crawl.read
    access:      read
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter
  - capability:  search-performance.read
    access:      read           # traffic-weights the triage
  - capability:  cms.draft      # or repo.change, matching how the property publishes
    access:      write-held
```

Read-only until Phase 4; corrections land held, a human merges.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- A crawlable corpus (the live site) and, for git-published properties, the content source tree.
- The property's canonical data sources for checkable claims (the statistics pages, standards bodies, or datasets its content cites).
- A decision, made once and recorded, of what counts as a visible correction on this property (the correction-note format and where it renders).

## Phases

### Phase 1: Claim inventory · lane: convergent (Tholo)

Skills: seo-content-audit, editorial-qa
Capability class: corpus.claim-extract (substitute equivalents if off-catalog)
Input: the live corpus (crawl.read), plus the content source tree where one exists
Run:

    Invoke seo-content-audit across the corpus and editorial-qa's claim
    framework per page. Extract every checkable claim: numbers, dates,
    prices, counts, superlatives, cited facts, and every claim that names a
    source. Classify each: DERIVED (rendered from a data source), RELAYED
    (typed from a source at authoring time), or DATED (true as of a stated
    date). Include claims living in titles, meta descriptions, and structured
    data; body copy is the smallest part of the register. Emit the claim
    register: claim, page(s), class, source if stated, last-verified date
    if known.

Output artifact: the claim register
Done when: the register covers the corpus including metadata surfaces, and every claim carries a class
Fails look like: inventorying body copy only. Claims rot fastest in the surfaces nobody rereads: meta descriptions, schema fields, comparison tables, and footer boilerplate

### Phase 2: Truth check · lane: gate (Basano)

Skills: editorial-qa, seo-content-audit (nearest anchors; the derived-counter and stale-claim detection cores are DECLARED GAPS, procedure inline)
Capability class: corpus.truth-check (declared catalog gap; nearest-miss editorial-qa)
Input: the claim register; the property's canonical sources
Run:

    For every RELAYED and DATED claim: check the source still exists, still
    says what the page says, and whether the value has changed or the series
    has been discontinued. For every count or total that a canonical source
    could supply (a catalog size, an item count, an integration count): flag
    any hand-typed literal as a defect regardless of whether it is currently
    correct, because a correct literal is one release away from a wrong one.
    For every fact appearing on more than one page: check the surfaces agree,
    and flag any fact with two values or two sources as a defect even when
    one of them is right. Output the discrepancy report with severity:
    WRONG-NOW, STALE-BUT-WAS-RIGHT, HAND-TYPED-DERIVABLE, TWO-SURFACE-SPLIT,
    UNVERIFIABLE (source gone). Verdict per claim, evidence attached. Do not
    fix anything; report only.

Output artifact: the discrepancy report
Done when: every register entry has a verdict, including the clean ones
Fails look like: source-presence checking. A claim citing a live source that no longer contains the claimed value passes a lazy check and fails a reader; the check is against the source's current content, not its existence

### Phase 3: Triage and the correction plan · lane: divergent (Krine)

Skills: none; this is the judgment stop
Input: the discrepancy report; search-performance data for the affected pages
Run:

    Rank the defects by reader harm: traffic-weight the affected pages
    (search-performance.read), weight claims readers act on (money, safety,
    how-to steps) above color, and mark each defect's correction class:
    SILENT-SAFE (typos, formatting, broken links) or VISIBLE-CORRECTION
    (any claim a reader may have relied on). Present the ranked plan and
    stop for the human.

Output artifact: a ranked correction plan with per-item correction class
Done when: a human approves the plan, including the correction classes
Operated-layer note: in an operated deployment the ranking and the human's approval or reordering land as an agreement-log row
Fails look like: severity by ease of fix. The cheap fixes migrate to the top because they close fast; the ranking's job is to hold reader harm above operator convenience

### Phase 4: Corrections as held changes · lane: convergent (Tholo)

Skills: editorial-qa, brand-voice
Capability class: content.correct (write-held)
Input: the approved plan; the property's correction-note format
Run:

    For each VISIBLE-CORRECTION item: fix the claim at its SOURCE (if the
    value should derive, wire the derivation rather than retyping the number;
    if the fact appears on several pages, fix the one source of truth and the
    copies with it), and add the correction note in the property's format,
    stating what was wrong, what it now says, and when it was corrected.
    Original publish dates stay untouched. Removed claims are noted as
    removed, not vanished. SILENT-SAFE items fix without notes. Everything
    lands held: CMS drafts or a draft change, never a direct publish.

Output artifact: held corrections, each tied to its plan item; correction notes in place
Done when: every approved item has a held change and nothing has published
Fails look like: silent edits to relied-upon claims. A correction a reader cannot see is indistinguishable from hoping nobody noticed, and on the day someone diffs the archive, it reads exactly that way

### Phase 5: Verify live and install the guard · lane: gate (Basano)

Skills: qa-testing (nearest anchor; live verification shares the deploy.live-verify DECLARED GAP)
Input: the production URLs of corrected pages, post-merge
Run:

    After the human merges: fetch each corrected page's production URL and
    verify the correction renders, the note renders where the format says it
    should, and the corrected value matches the source. Then install the
    guard: the Phase 1-2 pass recurs on a set cadence (quarterly fits most
    corpora), and the property's authoring rule is recorded: every new
    published number is derived or explicitly inventoried at publish time,
    which is what keeps the next pass small.

Output artifact: live verification per correction; the standing cadence and authoring rule, recorded
Done when: every merged correction is verified on its production URL and the cadence is scheduled
Fails look like: counting the fix as done at merge. Merged is not live; a correction that renders on the preview and not on production has corrected nothing

## Failure modes

- Silent edits (Phase 4's inline failure, and the workflow's reason to exist).
- Fixing copies instead of sources: retyping the right number on four pages plants the next two-surface split.
- Source-presence checking (Phase 2's inline failure).
- Severity by ease (Phase 3's inline failure).
- Metadata blindness: claims in meta descriptions, schema, and OG fields skipping the register.
- One-shot integrity: running this once and never installing the cadence; a corpus is only as honest as its most recent pass.

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property. The pattern generalizes a real count-and-copy reconciliation on rampstack.co (hand-typed counts replaced with derived values, a listed-count mismatch corrected, a paragraph-length meta rebuilt from a derived count); the visible correction-note pattern additionally generalizes production incidents on an unnamed property. Status flips to validated when a run record links here.

## Boundaries

- Content Pipeline Phase 6 hands decayed or wrong claims here rather than editing silently; Phase 3 of the pipeline prevents new debt, this workflow retires existing debt.
- Data Surface Integrity owns machine-rendered data series (rates, prices, live stats) and their freshness guards; this workflow owns authored claims about the world.
- Regulated-Content Compliance Gate owns disclosure and claim rules at publish time in regulated verticals; corrections to regulated content route through both.

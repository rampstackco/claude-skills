# CI Prove-Gate Wiring

```
name:            CI Prove-Gate Wiring
slug:            ci-prove-gate-wiring
tier:            forward-deployed (operations)
role:            fde
status:          template
score:           45 (demand 4, pain 4, differentiation 4, usability 4, connectors 5)
intent:          install prove skills as required status checks so a failing verdict
                 blocks a merge the way a failing test does
when to use:     a repo where prove checks exist but run advisory, and a merge can pass
                 without them
when not to use: pre-publish content-claim checking (that is Content Pipeline with Prove
                 Gates, Phase 3); verifying production after a merge (Post-Deploy Live
                 Verification); one-off local linting
gap note:        the CI-inventory and gate-implementation cores are DECLARED CATALOG
                 GAPS; those phases are inline procedure with qa-testing and seo-technical
                 as the nearest anchors. It is written to be runnable anyway.
```

## Connectors

```
connectors:
  - capability:  repo.change
    access:      write-held      # the wiring and every gate fix land as held PRs
  - capability:  crawl.read
    access:      read            # only if a gate fetches built output to check it
```

Everything this workflow changes lands held: the gate wiring and any fix a gate surfaces are proposed as PRs a human merges. Making the checks required and enabling branch protection are platform actions a person performs (Phase 5).

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- A repo with CI you can add status checks to, and the permission to make a check required.
- The prove checks you intend to gate on, already runnable against the repo by hand.
- A build command that produces the artifact production serves; a dev-flag build is a different artifact.
- Branch protection you can configure, or the access to request it.

## Phases

### Phase 1: Inventory the pipeline and the gate candidates · lane: convergent (Tholo)

Skills: qa-testing (nearest anchor; the CI-inventory core is a DECLARED GAP, procedure inline)
Capability class: ci.inventory (declared catalog gap; nearest-miss qa-testing)
Input: the repo, its CI configuration, and the list of prove checks that could become gates
Run:

    Invoke qa-testing's checklist discipline against the current pipeline.
    Enumerate: what CI runs today and on which events, which checks are advisory
    versus blocking, and which prove checks are run by hand but not wired. For
    each candidate gate record what it needs to run (a build artifact, a route
    list, a data source) and whether it reads source or built output. Produce the
    inventory; propose nothing yet.

Output artifact: the gate-candidate inventory (each candidate, its inputs, source-versus-built, current advisory or blocking state)
Done when: every candidate has its inputs and current state recorded, including the checks that already block
Fails look like: inventorying the CI config and missing the by-hand checks. The gate a team runs manually and trusts is the one worth wiring, and it never appears in the YAML.

### Phase 2: Define the gate set and the report contract · lane: divergent (Krine)

Skills: none; this is the judgment stop
Input: the gate-candidate inventory
Run:

    Propose the gate set: which candidates become required checks, and for each,
    the report contract every gate emits, one line per finding: file, check,
    expected, found. The contract is report-only by construction, so a gate states
    a pass or fail verdict with evidence and changes nothing. Rank candidates by
    blocking value against false-positive cost. Present the proposed set and the
    contract, and stop for the human.

Output artifact: the proposed gate set and the per-finding report contract
Done when: a human has approved the gate set and the report contract, or returned them with changes
Operated-layer note: in an operated deployment the proposed set and the human's approval or edits land as an agreement-log row; the divergence between proposed and approved is the calibration signal (see AGREEMENT-LOG.md)
Fails look like: a gate contract that lets a check fix and pass. The moment a gate rewrites the thing it judges, its green means nothing, because it is grading its own homework.

### Phase 3: Implement the checks against built output · lane: convergent (Tholo)

Skills: qa-testing, seo-technical (nearest anchors; the gate-implementation core is a DECLARED GAP, procedure inline)
Capability class: ci.gate-implement (declared catalog gap; nearest-miss qa-testing, seo-technical)
Input: the approved gate set; the production-equivalent build command
Run:

    Invoke qa-testing and seo-technical as the check frameworks, and implement
    each approved gate to run against the BUILT output with production-equivalent
    flags, not the dev server and not source. Each gate emits the Phase 2 report
    contract and exits non-zero on any fail. Wire them to run on the pull-request
    event against the branch build. Land the wiring as a held PR; merge nothing.

Output artifact: the gate implementations and their CI wiring, as a held PR that emits the report contract
Done when: each gate runs on the pull-request event against the built output and emits the report contract, in a held PR
Fails look like: asserting against a dev-flag build. A gate that passes on the dev server while the real build serves something else has verified a machine no user visits.

### Phase 4: Deliberate-failure demonstration · lane: gate (Basano)

Skills: qa-testing (nearest anchor; procedure inline)
Capability class: ci.gate-prove (declared catalog gap; nearest-miss qa-testing)
Input: the wired gates from Phase 3
Run:

    Invoke qa-testing's adversarial discipline. For each gate, seed a known-bad
    input it must catch (a missing title, a broken internal link, a failing prove
    check), run the pipeline, and capture the red: the gate failing and blocking,
    with its report contract naming the seeded fault. Then revert the seed and
    capture the green. Retain both as the gate's evidence. Report only; the seed
    is reverted, never merged.

Output artifact: per-gate failure evidence (the seeded fault, the captured red with its report, the reverted green)
Done when: every gate has a captured red on its seeded fault and a captured green after revert
Fails look like: shipping a gate no one has seen fail. A gate that has only ever passed is indistinguishable from a gate that checks nothing, and the difference surfaces the day it should have caught something.

### Phase 5: Install as required checks and branch protection · lane: divergent (human)

Skills: none; the actions here are deliberately human
Input: the proven gates and their evidence
Run: a person sets the gates as REQUIRED status checks and enables branch
    protection so a failing verdict blocks a merge the way a failing test does.
    These are platform state changes (repository settings and protection rules),
    and they stay human. The person records which gates were made required and on
    which branches.
Output artifact: the required-check and branch-protection configuration, recorded against the gate set
Done when: the named gates are required on the protected branches and a failing gate blocks the merge, confirmed by the human
Fails look like: gates that run but are not required. An advisory gate is a suggestion, and a pipeline under deadline merges past suggestions.

### Phase 6: Drift watch · lane: convergent (Tholo)

Skills: qa-testing, seo-technical (nearest anchors; procedure inline)
Capability class: ci.gate-drift (declared catalog gap; nearest-miss qa-testing, seo-technical)
Input: the installed gates; the canon each gate encodes (the prove checks, the report contract, the route list)
Run:

    Invoke qa-testing and seo-technical to re-verify each gate when its canon
    moves: a gate that encodes a check's rules is re-proven (a Phase 4 rerun) when
    that check updates, and a gate reading a route list is re-checked when routes
    change. Flag any gate whose canon moved without a re-proof as stale. Land
    re-proofs and updates as held changes.

Output artifact: a drift record per gate (the canon version proven against, the last re-proof) and held updates for any stale gate
Done when: every gate names the canon version it was last proven against, and no gate is enforcing against moved canon unproven
Fails look like: a gate frozen against last quarter's rules. It still passes and still blocks, and it is now enforcing a standard the team no longer holds.

## Failure modes

- Gate theater: gates that never fail. The Phase 4 deliberate-failure demonstration is the antidote; a gate with no captured red is not installed.
- Hooks tripping on pre-existing debt: a gate that fails on unrelated legacy files in every PR gets bypassed, and a bypassed gate is a pipeline defect. Scope gates to the staged or changed set.
- Gates that fix instead of report: any gate that mutates what it judges. Report-only is the contract; a self-fixing gate grades its own work.
- Dev-flag assertion: gating against a non-production build, so the gate verifies an artifact production never serves.
- Advisory installation: wiring gates but never making them required (Phase 5's failure); a gate that does not block is documentation.
- Stale canon: gates enforcing rules that have since moved (Phase 6's failure).

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property; the scheduled occasion is installing this tier's prove gates as required status checks on an outdoor-sports content property, with the seeded-failure evidence retained per gate. Status flips to validated when that run record links here.

## Boundaries

- Post-Deploy Live Verification begins where these gates end: CI runs against the build, that workflow runs against the world, and a green pipeline is not a verified deploy.
- Content Pipeline with Prove Gates owns the content pre-publish gate (its Phase 3); this workflow is the wiring that makes any such gate a required, report-only, non-bypassable check.
- Warehouse Data Plane Standup stands up the bounded data access a data-reading gate would query; a gate needing warehouse access consumes that contract.

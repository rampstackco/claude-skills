# Regulated-Content Compliance Gate

```
name:            Regulated-Content Compliance Gate
slug:            regulated-content-compliance-gate
tier:            forward-deployed (operations)
role:            fdm
status:          template
score:           45 (demand 3, pain 5, differentiation 4, usability 4, connectors 5)
intent:          a YMYL pre-publish gate that runs inside the content pipeline for regulated
                 properties: required disclosures present and placed, every regulated claim
                 sourced to a citable authority, and prohibited-claim patterns absent
when to use:     a regulated or YMYL property (finance, health, legal, and the like) where a
                 published claim carries real-world consequence
when not to use: an unregulated property (Content Pipeline Phase 3's ordinary gate is
                 enough); correcting already-published regulated content (Corpus Integrity
                 and Correction, under both workflows' rules)
gap note:        the placement-verification core is a DECLARED CATALOG GAP with seo-technical
                 as the nearest anchor; that phase is inline procedure. It is written to be
                 runnable anyway.
```

## Connectors

```
connectors:
  - capability:  crawl.read
    access:      read            # placement verification on the built page
```

This gate is read-only: it reads the content pipeline's held drafts and the built page, and reports. A failing gate blocks the merge; it never edits the draft. Waivers are human decisions by the register owner.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- The property's regulatory context: the disclosure requirements, the list of citable authorities, and the prohibited-claim patterns for its vertical.
- A register owner: the human accountable for the compliance register and its waivers.
- The content pipeline's held drafts as input; this gate runs inside Content Pipeline Phase 3 for regulated properties.
- A production-equivalent build, because placement is verified on the rendered page.

## Phases

### Phase 1: The compliance register · lane: divergent (human)

Skills: none; the register is written to the property's regulatory requirements and owned by a human
Capability class: compliance.register (human-owned)
Input: the property's regulatory context; the register owner
Run: the register owner writes the compliance register once and approves it:
    the disclosure requirements and where each must be placed, the list of
    citable authorities a regulated claim may be sourced to, the prohibited-claim
    patterns, and the placement rules. The register is the standard every draft
    is gated against, so it is authored and human-approved before the gate runs,
    not derived per draft. It is versioned, and it carries a review cadence
    against its own regulatory sources.
Output artifact: the approved compliance register (disclosures and placements, the authority list, prohibited patterns, the review cadence)
Done when: the register owner has approved the register and its review cadence, and it is versioned
Fails look like: a register derived per draft. A standard invented fresh for each piece is not a standard, and it drifts to whatever the current draft happens to satisfy.

### Phase 2: The compliance gate · lane: gate (Basano)

Skills: evidence-based-reviews, editorial-qa
Capability class: compliance.gate (substitute equivalents if off-catalog)
Input: a held draft from Content Pipeline Phase 3; the approved register
Run:

    Invoke evidence-based-reviews and editorial-qa against the held draft, gated
    on the register. Check three things and change nothing. Disclosures: every
    required disclosure is present. Claims: every regulated claim is sourced to a
    specific authority ON THE REGISTER'S LIST, which is authority-list checking,
    not source-presence checking; a claim citing some source that is not a listed
    authority fails, even though a source is present. Prohibited patterns: none of
    the register's prohibited-claim patterns appear. Report a verdict per check
    with the evidence. Report only; this gate blocks a merge, it does not edit the
    draft.

Output artifact: the compliance verdict per check (disclosures, authority-sourced claims, prohibited patterns), evidence attached
Done when: the draft carries a verdict on disclosures present, every regulated claim authority-sourced, and prohibited patterns absent
Fails look like: source-presence instead of authority-list checking. A claim with a citation attached passes a lazy check and fails the register when the citation is a blog rather than a listed authority; the presence of a source is not the same as sourcing to an authority.

### Phase 3: Placement verification on the built page · lane: gate (Basano)

Skills: seo-technical (nearest anchor; the placement-verification core is a DECLARED GAP, procedure inline)
Capability class: compliance.placement-verify (declared catalog gap; nearest-miss seo-technical)
Input: the built page (crawl.read); the register's placement rules
Run:

    Invoke seo-technical against the BUILT page, not the source. For each required
    disclosure, verify it renders where the register's placement rule requires: a
    disclosure that exists in the source but renders below the fold, inside a
    collapsed element, or on a path the reader does not take, fails placement even
    though it is present. Report placement per disclosure against its rule, with
    the rendered evidence. Report only.

Output artifact: the placement report (each disclosure, its required placement, its rendered placement, a verdict)
Done when: every required disclosure has a placement verdict against the register's rule, checked on the built render
Fails look like: verifying placement in the source. A disclosure in the markup that a collapsed accordion hides at render is present to a grep and absent to a reader, and the reader is who the rule protects.

### Phase 4: Waiver protocol · lane: divergent (human)

Skills: none; a waiver is the register owner's decision
Input: a compliance failure the team proposes to waive
Run: only the register owner may waive a compliance failure, and a waiver is
    never routine. The owner records what was waived, the specific rule, and the
    rationale, and the waiver is scoped to the one draft, not the standard.
    Repeated waivers of the same rule are a signal that the register is wrong or
    the process is, and they surface for review rather than accumulating silently.
Output artifact: the recorded waiver (the rule, the draft, the register owner's rationale), or the confirmation that no waiver was granted
Done when (public gate): every compliance failure is either fixed and re-gated, or waived in writing by the register owner with a recorded rationale
Operated-layer note: in an operated deployment a waiver lands as an agreement-log row with human_verdict = waive and a required human_reason, excluded from the false-pass and false-fail rate computations and reported on its own line (AGREEMENT-LOG.md)
Fails look like: routine waivers. A waiver any reviewer can grant, or one that passes without the register owner and a rationale, turns the gate into a formality the pipeline learns to wave through.

## Failure modes

- Source-presence instead of authority-list checking (Phase 2's failure): a citation present but not to a listed authority.
- Disclosure present but mis-placed (Phase 3's failure): rendered below the fold or inside a collapsed element.
- The register going stale against changed rules: a regulatory requirement moves and the register does not; the Phase 1 review cadence on the register itself is the guard.
- Treating this gate as Content Pipeline Phase 3: it is additive, an extra gate for regulated properties, never a replacement for that phase's ordinary pre-publish gate.
- Routine waivers (Phase 4's failure): waivers granted without the register owner, or so often they stop meaning anything.
- Gating the draft but not the built page: passing on source presence and never checking the render is how a compliant draft ships as a non-compliant page.

## Worked example

Pending. Populates when this workflow is executed as written on regulated content reaching a designated property; no designated property carries regulated content today, so it holds at template until such content exists on one. Status flips to validated when a run record links here.

## Boundaries

- This gate runs INSIDE Content Pipeline with Prove Gates, Phase 3, for regulated properties: it is additive to that phase's ordinary gate, never a substitute, and a regulated draft passes both.
- Corpus Integrity and Correction owns corrections to already-published regulated content; a correction to a regulated claim runs under both this workflow's authority-list rule and that workflow's visible-correction pattern.

# Incident Response and Lane Demotion

```
name:            Incident Response and Lane Demotion
slug:            incident-response-and-lane-demotion
tier:            forward-deployed (operations)
role:            cross
status:          template
score:           49 (demand 4, pain 5, differentiation 5, usability 4, connectors 4)
intent:          the event-driven counterpart to Autonomy Review: when a promoted lane's
                 post_merge_outcome regresses, demote the lane to human-gated first, then
                 roll back, then audit the false-pass row
when to use:     a promoted lane shows a post-merge regression, a known suspect rather
                 than a mystery
when not to use: a traffic drop with no known cause (Traffic-Drop Triage); an ordinary
                 defect on a lane that was never promoted (the normal held-fix flow)
gap note:        the attribution and false-pass-audit cores are DECLARED CATALOG GAPS with
                 incident-response as the nearest anchor; those phases are inline procedure.
                 It is written to be runnable anyway.
```

## Connectors

```
connectors:
  - capability:  crawl.read
    access:      read
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter
  - capability:  repo.change
    access:      write-held      # the rollback and any fix land as held changes
```

The rollback and the fix land held; a human merges them through the now human-gated lane. The demotion itself and the agreement-log rows are operated actions on the operated instance; this workflow never promotes or re-promotes a lane.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills` then `/plugin install rampstack-skills@rampstack`
- A running autonomy program with at least one promoted lane and the agreement log behind it (AGREEMENT-LOG.md); with no promoted lane, Phase 2 routes elsewhere and this workflow does not apply.
- The `post_merge_outcome` signal source: the monitoring and verification outputs that populate it.
- The lane's `post_merge_outcome` budget, the regression threshold that makes a demotion mandatory.
- The rollback mechanism for the lane's changes.

## Phases

### Phase 1: Detection intake · lane: convergent (Tholo)

Skills: incident-response, launch-runbook
Capability class: incident.intake (substitute equivalents if off-catalog)
Input: the `post_merge_outcome` signals for the window; the monitoring and verification outputs
Run:

    Invoke incident-response and launch-runbook to classify the intake. Enumerate
    what counts as a lane-attributable regression: the post_merge_outcome signal
    classes (a verification failure that recurs on a promoted lane's deploys, a
    monitored metric crossing its regression budget) as distinct from ordinary
    noise. For each signal, record the lane it points at, the merges in the
    window, and the post_merge_outcome evidence. Produce the intake; attribute
    nothing to a promoted lane yet.

Output artifact: the intake record (each signal, its candidate lane, the window's merges, the post_merge_outcome evidence)
Done when: every regression signal in the window is recorded with its candidate lane and its post_merge_outcome evidence
Fails look like: treating every wobble as an incident. A metric breathing inside its normal band is not a regression, and an intake that flags noise trains the team to demote on nothing.

### Phase 2: Attribution · lane: gate (Basano)

Skills: incident-response (nearest anchor; the lane-attribution core is a DECLARED GAP, procedure inline)
Capability class: incident.attribution (declared catalog gap; nearest-miss incident-response)
Input: the intake record
Run:

    Invoke incident-response's attribution discipline as a gate. For each signal,
    answer one question with evidence: is this regression attributable to a
    PROMOTED lane's merge? Read the agreement log for the lane's recent merges and
    their proposal_to_merge_diff, and line the regression up against a specific
    promoted-lane merge. If the lane was never promoted (gate auto-pass and merge
    authority never granted), this workflow does not apply: route a mystery drop
    to Traffic-Drop Triage and an ordinary defect to the normal held-fix flow, and
    say which. Report attribution per signal: a promoted-lane regression with the
    merge named, or routed elsewhere with the destination named.

Output artifact: the attribution verdict per signal (promoted-lane regression with the merge identified, or routed elsewhere)
Done when: every signal is either attributed to a specific promoted-lane merge with evidence, or routed to Traffic-Drop Triage or the normal defect flow with the destination named
Operated-layer note: the attribution reads the operated agreement log's rows and proposal_to_merge_diff for the lane; the schema is public (AGREEMENT-LOG.md), the instance and its rows are operated
Fails look like: blaming the gate before the evidence lands. Attributing a regression to a promoted lane without lining it up against a specific merge demotes a lane for a coincidence while the real cause keeps running.

### Phase 3: Demote first · lane: divergent (human)

Skills: none; the demotion is a deliberate human act
Input: the attribution verdict for a confirmed promoted-lane regression
Run: before any fix is written, a person returns the lane to human-gated. The
    lane stops auto-passing and stops holding merge authority at once, so it
    cannot merge again while it is being debugged. This is the ordinary first
    move, not a punishment: a promoted lane that regressed has lost the evidence
    that earned it, and it gets that evidence back the ordinary way, by re-earning
    it. Record the demotion and its reason.
Output artifact: the lane returned to human-gated, with the demotion and its reason recorded
Done when: the lane is human-gated and cannot auto-pass or auto-merge, confirmed before any fix is written
Operated-layer note: in an operated deployment the demotion is recorded as an agreement-log action against the lane, with the regression as its reason; the demotion of the operated lane is an operated act (AGREEMENT-LOG.md)
Fails look like: fixing before demoting. While the fix is being written the lane is still promoted and still merging, so the machine that produced the regression keeps producing, and the incident grows a second head.

### Phase 4: Roll back and fix as held changes · lane: convergent (Tholo)

Skills: incident-response (nearest anchor; procedure inline)
Capability class: incident.rollback (write-held)
Input: the demoted lane; the attributed merge
Run:

    Invoke incident-response's rollback discipline. Roll back the attributed merge,
    or land the corrective fix, as a HELD change (repo.change) a human merges
    through the now human-gated lane. Verify the change against the
    post_merge_outcome signal that detected the regression: it closes only when
    that signal clears. Nothing here re-promotes the lane; the change merges
    through the human gate the way every change on this lane now does.

Output artifact: the held rollback or fix, tied to the attributed merge, with the post_merge_outcome signal it must clear
Done when: the rollback or fix is a held change and the regression signal has cleared against it, with the lane still human-gated
Fails look like: closing the incident on the merge instead of on the signal. The change meant to fix the regression is verified by re-running the post_merge_outcome check that caught it, not by the fact that a PR merged.

### Phase 5: The false-pass audit · lane: gate (Basano)

Skills: incident-response (nearest anchor; the false-pass-audit core is a DECLARED GAP, procedure inline)
Capability class: incident.false-pass-audit (declared catalog gap; nearest-miss incident-response)
Input: the agreement log row for the regressed merge; the gate that passed it
Run:

    Invoke incident-response's post-incident discipline as a gate. Find the
    agreement-log row where the guardrail passed the merge that regressed: it is a
    false_pass, and the audit asks what the gate misses STRUCTURALLY, not who
    erred. Name the class of fault the gate could not see, and turn it into a
    specific gate improvement (a new check, a tightened threshold) so the same
    miss cannot re-promote a lane later. Report the audit with the false_pass row
    and the proposed gate improvement.

Output artifact: the false-pass audit (the false_pass row, the structural gap named, the proposed gate improvement)
Done when (public gate): the structural gap is named and a specific gate improvement is proposed as a held change
Operated-layer note: the audited row is the operated log's false_pass for the regressed merge; the schema and the four-way agreement values are public (AGREEMENT-LOG.md), the row is operated
Fails look like: demotion without the audit. A lane demoted and fixed but never audited leaves the gate that missed the fault unchanged, and the same miss re-promotes the same class of regression next quarter.

### Phase 6: Re-promotion path · lane: convergent (Tholo)

Skills: none; the re-promotion rule is doctrine, procedure inline
Capability class: incident.re-promotion (procedure inline)
Input: the demoted lane; the gate improvement from Phase 5
Run:

    State the re-promotion path and record it; do not walk it here. Re-promotion
    is never automatic. The lane re-earns gate auto-pass and merge authority the
    ordinary way, under Autonomy Review's thresholds, over a RESET window that
    starts after the fix and the gate improvement land, so the rows that regressed
    do not count toward the lane's recovery. Record the reset window's start and
    the conditions the lane must meet, and hand the lane to Autonomy Review.

Output artifact: the recorded reset window (its start, the thresholds the lane must re-earn) handed to Autonomy Review
Done when: the reset window is recorded with its start and re-earning conditions, and the lane is handed to Autonomy Review rather than re-promoted here
Fails look like: quietly re-promoting the lane once the fix lands. A lane restored to autonomy without re-earning it under a reset window has learned nothing, and the demotion was theater.

## Failure modes

- Fixing before demoting (Phase 3's failure): the lane keeps merging while you debug it.
- Blaming the gate on noise: attributing a regression to a promoted lane before lining it up against a specific merge (Phase 2's failure); attribution rigor comes before demotion.
- Demotion without the false-pass audit (Phase 5's failure): the same miss re-promotes later.
- Automatic or quiet re-promotion (Phase 6's failure): the lane restored without re-earning under a reset window.
- Treating demotion as shameful: demotion is the system working, the ordinary first move, and a tone that makes it an emergency makes teams avoid promoting at all.
- Closing on the merge, not the signal (Phase 4's failure): the fix verified by a merged PR rather than a cleared post_merge_outcome.

## Worked example

Pending. Populates when a promoted lane first regresses and this workflow demotes it; no lane is promoted today, so this stays template until the autonomy program has a lane to demote. Status flips to validated when that run record links here.

## Boundaries

- Traffic-Drop Triage owns the mystery drop with no known suspect; this workflow owns the regression with a known suspect, a promoted lane's own merge, and Phase 2 routes to that workflow when no promoted lane is attributable.
- Autonomy Review owns promotion; this workflow owns the revocation that promotion promised, and the two are a pair: no lane graduates there until this is armed here.
- AGREEMENT-LOG.md is the schema whose post_merge_outcome this workflow reads and whose false_pass row it audits; that file defines the columns and the four-way agreement values this workflow uses.

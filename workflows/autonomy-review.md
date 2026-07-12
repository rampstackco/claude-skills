# Autonomy Review

```
name:            Autonomy Review
slug:            autonomy-review
tier:            forward-deployed (operations)
role:            cross
status:          template
score:           43 (demand 3, pain 4, differentiation 5, usability 4, connectors 4)
intent:          the periodic ceremony over the agreement log: per-lane agreement rates,
                 which gate classes have earned auto-pass under the tier's thresholds, and
                 which divergences mean a rubric constant needs tuning
when to use:     on a cadence or at a row threshold, once the agreement log holds enough
                 rows per lane to evaluate
when not to use: executing a revocation when a promoted lane regresses (Incident Response
                 and Lane Demotion); defining the schema (AGREEMENT-LOG.md is the spec,
                 this file is its consumer)
gap note:        the agreement-log math is RampStack's and has no catalog skill by design;
                 every analytic phase is inline procedure with no nearest-miss anchor. It
                 is written to run against any log that implements AGREEMENT-LOG.md.
```

## Connectors

```
connectors:
  - capability:  warehouse.query
    access:      read
    bounds:      every query carries a date range pushed down as a partition filter   # only if an outcome join is needed
  - capability:  repo.change
    access:      write-held      # only Phase 5's rubric-tuning follow-ups
```

The agreement log has no connector class, deliberately. It is operated substrate, not a connectable capability (see CONNECTORS.md): the schema is public (AGREEMENT-LOG.md), the instance and its write path are not. This ceremony reads the operated log and proposes; it never gains a write path to the log, and the promotion it licenses is an operated decision, not a published capability.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- An agreement log implementing the AGREEMENT-LOG.md schema, with enough rows per lane to evaluate; the minimum sample below is a real gate, not a formality.
- The tier's per-lane thresholds and, for graded lanes, the `guardrail_confidence` cutoff, recorded and version-controlled.
- The published merge-authority doctrine (the three layers: access mode, gate auto-pass, merge authority), so a promotion proposal is measured against a written rule.

## Phases

### Phase 1: Assemble the window · lane: convergent (Tholo)

Skills: none; the agreement-log math is a DECLARED GAP with no catalog anchor, procedure inline
Capability class: autonomy.window-assembly (declared catalog gap; no nearest-miss, the log math is RampStack's)
Input: the agreement log for the review window (a log implementing AGREEMENT-LOG.md)
Run:

    Read the agreement log for the window and group rows by lane. Per lane,
    compute the four-way agreement rates over true_pass, false_pass, true_fail,
    and false_fail, and the row count. Pull the waived rows (human_verdict =
    waive) out first: they carry an authored agreement value plus a required
    human_reason, are excluded from false-pass and false-fail rate computations,
    and report as their own line. Agreement is the authored value on each row,
    never derived from the verdict pair; read it, do not recompute it. Present the
    per-lane window with the waived line kept separate from the rates, and
    evaluate no promotion yet.

Output artifact: the per-lane window (four-way agreement rates, row counts, the waived line reported separately)
Done when (public gate): every lane in the window has its four-way rates and row count, and waived rows are reported on their own line outside the rates
Operated-layer note: the window is read from the operated log instance; the schema and the four-way agreement values are public (AGREEMENT-LOG.md), and a reader runs this against their own log while RampStack's rows stay operated
Fails look like: folding waived rows into the rates. A waive is a recorded human override, not a guardrail miss, and counting it as a false_pass or false_fail poisons the exact number promotion depends on.

### Phase 2: Threshold evaluation per lane · lane: gate (Basano)

Skills: none; the promotion math is a DECLARED GAP with no catalog anchor, procedure inline
Capability class: autonomy.threshold-eval (declared catalog gap; no nearest-miss)
Input: the per-lane window; the tier's per-lane thresholds and the `guardrail_confidence` cutoff
Run:

    For each lane, evaluate three conditions against the written rule and report a
    pass or fail on each, changing nothing. One: the false-pass-among-passes rate
    is at or below the lane's tier threshold. Two: the lane's row count meets the
    minimum sample, because a lane under sample is not evaluable and "insufficient
    sample" is a verdict, not a delay. Three, for graded lanes only: the lane's
    guardrail_confidence clears the confidence cutoff. A lane earns eligibility
    for auto-pass only when every applicable condition holds. Report the per-lane
    evaluation with the numbers; this gate reports and decides nothing.

Output artifact: the per-lane eligibility evaluation (each condition, pass or fail, with the numbers)
Done when: every evaluable lane has a verdict on the threshold, the minimum sample, and (for graded lanes) the confidence cutoff, and under-sample lanes are marked not-evaluable
Fails look like: a ceremony on insufficient sample. A lane declared eligible on five rows has measured noise, and the promotion it licenses regresses on the first real week.

### Phase 3: The ceiling · lane: gate (Basano)

Skills: none; the ceiling is doctrine, procedure inline
Capability class: autonomy.ceiling-check (declared catalog gap; no nearest-miss)
Input: the per-lane eligibility evaluation
Run:

    Apply the ceiling before any proposal is written. Tier-3 judgment and boundary
    gates (honesty and disclosure lines, the open-versus-operated boundary,
    positioning, naming, and the meta-decision of when any lane graduates) are
    PERMANENTLY ineligible: they never earn auto-pass and never earn merge
    authority, at any status, on any sample. The ceremony that licenses a
    graduation is itself a Tier-3 act, so it can never license its own class.
    Strike every Tier-3 lane from the eligible set regardless of its rates, and
    record that the strike is structural, not a close call. Report the eligible
    set after the ceiling.

Output artifact: the eligible set with every Tier-3 lane struck, and each strike recorded as permanent
Done when: no Tier-3 lane remains in the eligible set, and the graduation meta-decision is marked as itself Tier 3 and ineligible
Fails look like: a lane graduating the ceremony's own class. The moment the review licenses the authority that licenses reviews, the ceiling is gone and the ladder is a pricing page with extra steps.

### Phase 4: Promotion, demotion, and tuning proposals · lane: divergent (human)

Skills: none; the decision is deliberately human
Input: the eligible set after the ceiling; the divergences the window surfaced
Run: a person decides. For each eligible lane, the human decides whether to
    promote it (grant gate auto-pass, or merge authority, per the doctrine's
    layers) with the evidence attached; whether a lane's divergences mean a rubric
    constant needs tuning rather than a promotion; and whether any lane should be
    demoted. Promotion is licensed here and nowhere else, and it stays revocable.
    The decision and its evidence are recorded.
Output artifact: the recorded decisions (promote, tune, demote, or hold) per lane, with evidence
Done when: every eligible lane has a recorded human decision with its evidence, or is explicitly held for more sample
Operated-layer note: in an operated deployment each decision is a Tier-3 act recorded against the lane in the agreement log; the licensing, the log instance, and the promotion are operated, and a reader running this against their own log makes their own decisions (AGREEMENT-LOG.md, open versus operated)
Fails look like: the ceremony drifting into a rubber stamp. If every review promotes and none tunes or demotes, the ceremony has stopped reviewing, and its own agreement rate, its proposals against what the evidence supported, is the number that catches it.

### Phase 5: Rubric-tuning follow-ups · lane: convergent (Tholo)

Skills: none; rubric constants are config, the change is procedure inline
Capability class: rubric.tune (write-held)
Input: the tuning decisions from Phase 4
Run:

    For each tuning decision, prepare the rubric-constant change as a held change
    (repo.change): the constant, its old and new value, and the divergence
    evidence that motivated it. Nothing auto-applies; a human merges the tuning
    the way any other held change is merged. Record the follow-up against the lane
    so the next window can tell whether the tuning moved the agreement rate.

Output artifact: held rubric-tuning changes, each tied to its lane and its motivating divergence
Done when: every Phase 4 tuning decision is a held change with its evidence, and nothing has auto-applied
Fails look like: tuning a constant to make a lane pass. A threshold moved to promote a lane it was blocking is the promotion wearing a disguise, and the divergence evidence is what keeps the tuning honest.

## Failure modes

- Ceremonies on insufficient sample: a lane declared eligible on too few rows (Phase 2's failure); insufficient sample is a verdict, not a delay.
- Counting waives in the rates: a recorded human override contaminating the false-pass or false-fail computation (Phase 1's failure).
- The ceremony as rubber stamp: a review that only ever promotes, its own agreement rate reviewable (Phase 4's failure).
- Promotion without the demotion counterpart wired: granting autonomy with no revocation path is the asymmetry the doctrine forbids; Incident Response and Lane Demotion must exist and be armed before any lane graduates.
- Licensing the ceiling's own class: a Tier-3 graduation (Phase 3's failure).
- Tuning to pass: moving a constant to promote a lane it was blocking (Phase 5's failure).

## Worked example

Pending. Populates when this ceremony is first run against the agreement log at a row threshold rather than a date; a small number of real rows exist today and the cadence adds more. Status flips to validated when that run record links here.

## Boundaries

- Incident Response and Lane Demotion executes the revocation this ceremony's promotions promise: it demotes a lane when a promoted lane's post_merge_outcome regresses, and no lane should graduate here until that counterpart is armed.
- AGREEMENT-LOG.md is the schema this ceremony consumes; that file is the spec and this workflow is its reader, and every column, verdict, and rule this file uses is defined there.

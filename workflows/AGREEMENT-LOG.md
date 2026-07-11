# Agreement log: the schema spec

The agreement log records what an engine proposed, what its guardrail said, what a human decided, and whether the two agreed. It is the substrate the autonomy doctrine reads: agreement rates per lane earn a gate class its auto-pass, and post-merge regressions revoke it. Autonomy Review reads this log; Incident Response and Lane Demotion reads its `post_merge_outcome`; nothing else mutates it.

This file is the public schema, generalized from the krine agreement-rate table (migration 0007). The schema is what you get. The instance, its write path, the designation allowlist, and every promotion decision are operated, not published. A reader who implements this schema gets their own log; they do not get ours.

The agreement log has no connector class, by design. It is operated substrate, not a connectable capability (see CONNECTORS.md). Workflow files that touch it split their done-when conditions into a public gate and an operated-log note, so a stranger running the workflow never depends on infrastructure that is not published.

## Reference schema (migration 0007, quoted with types)

The canonical source is the krine agreement-rate migration. Its columns and types, quoted as the reference:

```sql
create type human_verdict_kind as enum ('merge', 'reject', 'revise');
create type agreement_kind as enum ('true_pass', 'false_pass', 'true_fail', 'false_fail');

create table agreements (
  id                    uuid primary key default gen_random_uuid(),
  project_id            uuid references projects(id) on delete cascade,
  decision_id           text not null,
  pr_id                 text,
  lane                  text not null,
  risk_tier             text not null,
  agent_id              text not null,
  guardrail_verdict     text not null,        -- pass or fail
  guardrail_confidence  numeric,              -- graded score; null for deterministic checks
  guardrail_checks      jsonb,                -- which checks fired and their results, plus the proposal pointer
  human_verdict         human_verdict_kind,   -- merge | reject | revise; filled after human review
  human_reason          text,                 -- the rationale; filled after human review
  proposal_to_merge_diff jsonb,               -- the proposal-to-merge diff or a pointer; filled after merge
  human_review_latency  numeric,              -- seconds from PR open to human verdict
  agreement             agreement_kind,       -- authored after human review
  post_merge_outcome    text,                 -- null at merge, filled later by continuous verification
  created_at            timestamptz not null default now()
);
```

## The public spec

The public schema carries the fields a reader implementing this tier needs. It converges with the reference above rather than restating it from memory.

Retained from 0007 as-is:

| Field | Type | Meaning |
|---|---|---|
| agreement | enum: true_pass, false_pass, true_fail, false_fail | the four-way agreement value, authored (see below), never derived from the verdict pair |
| risk_tier | text | the risk classification; per-tier thresholds govern promotion, and Tier 3 is permanently excluded |
| guardrail_confidence | numeric, nullable | the graded score; null for purely deterministic checks. The confidence-cutoff promotion for graded lanes is impossible without it |
| guardrail_checks | jsonb | which checks fired and their results, and the pointer to the proposal |
| human_verdict | enum: merge, reject, revise (+ waive, added below) | what happened to the work; a separate axis from agreement, and neither maps from the other |
| proposal_to_merge_diff | jsonb | the proposal-to-merge diff or a pointer to it; the primary correction signal, and the cold-start recovery reads merged-versus-rejected diffs |
| post_merge_outcome | text | null at merge, filled later by continuous verification; the second ground truth that demotion and the hardened rung read |

Added for this tier:

| Field | Type | Meaning |
|---|---|---|
| property | text, designation-guarded | the showcase property the row belongs to; the publish path enforces the allowlist against it |
| workflow_slug | text | which workflow produced the proposal |
| phase | text | which phase of that workflow |
| artifact_ref | text | pointer to the held artifact the row is about |
| human_note | text, required on waive and revise | the rationale; generalizes 0007's `human_reason`, and carries whether a gate was too strict or a risk was knowingly accepted |
| waive | value on human_verdict | a fourth human verdict alongside merge, reject, revise |

## Agreement is authored, never derived

Agreement is AUTHORED by the human who saw the diff, never derived from the verdict pair. A guardrail pass that a human overrides to revise is a false_pass, and no naive rule produces that mapping; the human writes it. The verdict axis (what happened to the work) and the agreement axis (whether the guardrail was right) are independent, and neither is computed from the other.

Waive rows carry an authored agreement value plus a required `human_note`, are excluded from false-pass and false-fail rate computations, and report as their own line in Autonomy Review. Waives stay visible without contaminating the promotion thresholds: a gate waived because it was too strict, and a risk waived because it was knowingly accepted, are both recorded and both kept out of the rates that earn a lane its autonomy.

## The designation guard

The publish path refuses any public row whose `property` is not on the maintained showcase allowlist. The guard sits at the write boundary, not only in authoring convention: a row for a non-designated property can never become public output, and its property name can never appear in published material. The allowlist is data, maintained in one place, not a per-row judgment.

## Open versus operated

The schema is public. The instance, the write path, the allowlist, and every promotion decision are operated. A reader who implements this schema gets their own log; they do not get ours. Forking the repo yields the gates and this spec, and a reader's own log if they build one; it does not yield RampStack's rows.

## Storage

One append-only table in an operational Postgres store. Autonomy Review reads it, Incident Response and Lane Demotion reads `post_merge_outcome`, and nothing else mutates it. Do not add a second table until there is a second writer.

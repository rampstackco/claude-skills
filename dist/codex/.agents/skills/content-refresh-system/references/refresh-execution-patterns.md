# Refresh execution patterns

Single owner per refresh, editorial-workflow integration, capacity allocation, batching vs integration tradeoffs. The execution patterns that turn audit queues into shipped refreshes.

The audit produces a queue. The execution patterns turn the queue into shipped work. Programs that produce strong audits but weak execution end up with documentation of what should have been refreshed rather than refreshed pieces.

---

## Single owner per refresh

Each refresh has one owner accountable for shipping it.

**The pattern.** When a refresh is assigned, one person is named as the owner. The owner runs the work end-to-end: confirming the depth, doing or coordinating the actual editorial work, running the QA gate, shipping, re-promoting, logging the outcome.

**Why single ownership matters.** Refreshes that pass through multiple hands without a clear owner often get partially done and then stall. One person believes another is finishing the work; the work sits between them; the audit's next pass shows the piece still in queue. The accountability gap is the failure mode.

**Owner selection.** Typically the writer or editor best matched to the topic. For light edits, the owner can be anyone with capacity; for substantial revision and full rewrite, ownership matches expertise. For structural redesign, ownership often sits with a content lead because the work spans multiple pieces.

**Owner-of-owners.** A single person owns the refresh program as a whole. Their job is keeping the queue moving, escalating stalled refreshes, ensuring effectiveness measurement is happening, and reporting on the program's health to leadership. Without this role, the program drifts even if individual refreshes have owners.

---

## Editorial-workflow integration

Refreshes typically run through the same editorial workflow as new pieces, scaled to the chosen depth.

**Light edit workflow.** May skip the brief and go straight to edit. The editor pulls the piece, identifies the specific updates, makes them, runs a QA pass, and ships. 30-90 minutes of editorial time; minimal coordination.

**Substantial revision workflow.** Brief, draft, edit, QA gate, publish. The brief covers the targeted sections being rewritten; the draft is partial-rewrite; the edit and QA gate match new-piece discipline. 2-4 hours of editorial time; coordination similar to a short blog post.

**Full rewrite workflow.** Brief, draft, edit, QA gate, publish. Full new-piece workflow with the additional constraint of preserving the URL and existing internal-link integration. 8-16 hours of editorial time; coordination at long-form-piece scale.

**Structural redesign workflow.** Project-scope coordination. Multiple briefs, multiple drafts, redirect plans, internal-link audits. Multi-week timeline; coordination at flagship-project scale.

The integration discipline. Refreshes are not a separate workflow; they plug into the existing editorial workflow at the appropriate depth. Teams that build a parallel refresh workflow create coordination overhead and quality drift; teams that integrate refresh into the standard workflow benefit from the workflow's existing discipline.

---

## Capacity allocation

Refresh work consumes editorial capacity that would otherwise produce new pieces. The capacity decision is a real tradeoff.

**Allocation patterns.**

- **Newer libraries (under 100 pieces, under 2 years old):** 5-15% of capacity to refresh. Most pieces are still relatively current; signals are limited.
- **Mid-stage libraries (100-500 pieces, 2-5 years old):** 15-30% of capacity to refresh. Decay rates have built up; high-value-decaying queue is meaningful.
- **Mature libraries (500+ pieces, 5+ years old):** 25-40% of capacity to refresh. Cumulative decay is significant; without sustained refresh capacity, the library erodes.

**The capacity-vs-new-production tradeoff.**

A team producing 20 pieces per quarter might allocate 5 of those slots to refresh work, leaving 15 for new production. Or 8 to refresh, 12 to new. The split affects program shape: heavy-refresh programs preserve existing equity; heavy-new-production programs build new topical authority.

**Right-sizing the allocation.**

- If refresh queues are growing quarter-over-quarter, allocation is too low.
- If new-production output is dropping or the team complains of refresh fatigue, allocation may be too high.
- If high-value-decaying pieces stay in queue across multiple audits, allocation is misallocated (volume of work, not allocation share, may be the issue, but allocation review is the first step).

**The capacity audit.** Quarterly, review the actual refresh time spent vs the planned allocation. Programs that consistently exceed their allocation are signaling that the queue's growth rate exceeds the allocation; either grow allocation, narrow the prioritization, or accept slower queue cycle times.

---

## Batching vs integration

Two patterns for how refresh work fits into the cadence.

**Batching.** Dedicated weeks or sprints for refresh work. The team blocks 1-2 weeks per quarter for concentrated refresh execution.

- **Strength.** Focus. The team is in refresh mode; context-switching costs are low; throughput on refresh work is high.
- **Weakness.** Interrupts new production. New-piece workflows pause during refresh sprints; pieces in the new-production pipeline stall.
- **Fits.** Mid-stage libraries with manageable refresh queues; teams that prefer focused work blocks; programs with predictable seasonality where new production has natural pauses.

**Integration.** One refresh per week (or similar steady cadence) integrated into the regular production cadence.

- **Strength.** Sustains new production. New-piece work continues without pauses.
- **Weakness.** Slower refresh velocity per piece; context-switching costs are higher; refresh work can get deprioritized in favor of "more urgent" new-piece work.
- **Fits.** Mature libraries with continuous refresh queues; teams that prefer sustained pacing; programs where new production has tight commitments.

**Hybrid.** A baseline integration cadence plus periodic batching for the high-priority queue.

- **Strength.** Sustained refresh on lower-priority work; periodic concentration on high-value-decaying queues.
- **Weakness.** Coordination overhead; the team manages both modes.
- **Fits.** Mature programs with sophisticated capacity planning.

The discipline. Pick a pattern. The failure mode is no allocation discipline at all, which produces refresh work happening in the cracks at unpredictable cadence and a queue that never clears.

---

## The refresh that needs to happen now

Some refreshes cannot wait for the next allocation slot.

**Trigger conditions.**

- Sharp decay (40%+ traffic loss in 30 days) on a high-value piece.
- Algorithm-update fallout affecting a high-value piece.
- Factual error producing reputational risk.
- Broken page state (indexing failure, schema regression, redirect loop).

**The fast-track pattern.**

- Continuous monitoring detects the issue.
- The owner-of-owners decides whether the issue warrants fast-track.
- Fast-track refreshes get pulled out of the queue and shipped within days.
- The refresh skips some workflow steps if necessary (briefer brief, faster QA) but does not skip the QA gate; pieces that ship without QA produce regressions that compound.

**Fast-track capacity.** Teams need a small reserve for fast-track work. The reserve is typically 5-10% of total capacity. Without reserve, fast-track work pushes other work out and produces cascade delays.

---

## Stalled refresh recovery

Refreshes that have been in queue for more than two audit cycles need intervention.

**Common causes.**

- Owner is over-committed; the refresh is not the highest priority on their plate.
- The refresh's depth was wrong (planned as light edit, actually needed substantial revision); the owner stalled rather than escalate.
- The refresh's disposition was wrong (planned as refresh, should have been merge); the owner is uncertain how to proceed.

**The recovery pattern.**

- Owner-of-owners reviews stalled refreshes at each audit.
- Reassign owners where capacity is the issue.
- Re-scope where depth was wrong; re-disposition where the disposition was wrong.
- For refreshes stalled because the analysis revealed a deeper issue, escalate to a content lead for decision.

The stalled-refresh review prevents the queue from accumulating zombie items that everyone knows are not getting done but nobody is removing.

---

## Common execution failures

**No single owner.** Refreshes are assigned to "the team"; nobody is accountable; the refresh stalls.

**Workflow shortcuts.** The refresh skips the QA gate or the brief. Quality drifts; regressions compound.

**Capacity overcommitment.** The team plans 20% capacity for refresh; actual refresh work consumes 35%; new production suffers; team burns out.

**Refresh queue without owner-of-owners.** The queue grows; nobody is reporting on its health; the program drifts toward set-and-forget within the formal-program shape.

**Fast-track without reserve.** Urgent refreshes push planned work out; cascade delays affect downstream pieces.

**Stalled refreshes accumulating.** The queue has zombie items in it; the queue's reported health does not match the queue's actual state.

---

## Methodology-level choices that stay in the public skill

The single-owner discipline, editorial-workflow integration shapes by depth, capacity allocation patterns by library stage, batching vs integration vs hybrid tradeoffs, the refresh-that-needs-to-happen-now pattern, the stalled-refresh recovery pattern.

## Implementation choices that stay internal

Specific project-management tooling for the refresh queue. Specific notification systems for refresh assignments. Specific time-tracking for capacity audits. Specific reserves and fast-track triage workflows. The team's own conventions for owner reassignment. These vary by team, tooling, and program shape.

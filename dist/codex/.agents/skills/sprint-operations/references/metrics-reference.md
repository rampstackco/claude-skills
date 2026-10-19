# Metrics Reference

Definitions, formulas, and the tracker fields each metric needs. Every metric here is derived from tracker data. If a number cannot be computed from the tracker, fix the tracker, do not type the number in.

---

## Contents

1. Tracker fields required
2. Core metrics (eight)
3. Agent-lane metrics (five)
4. Reading the numbers
5. Common data problems

---

## 1. Tracker fields required

| Field | Used by | Notes |
|---|---|---|
| Created timestamp | Lead time | Set automatically by every tracker |
| Started timestamp | Cycle time, WIP | First transition into any "in progress" state. Map states explicitly. |
| Done timestamp | Cycle time, lead time, throughput | First transition into the done state. Use the last one if reopened tickets should count once. |
| Reopened flag or transition | Rework rate | A transition from done back to any open state |
| Sprint at commitment | Carryover, planned vs unplanned | Snapshot the sprint's ticket list when planning closes |
| Estimate | Estimate accuracy, forecasting | Points or size bucket |
| Capitalization stage | Hours ratio | Only if the team capitalizes |
| Logged hours | Hours ratio | Only on capitalizable tickets |
| Assignee type | Agent-lane metrics | Human or agent lane. A label works. |

Snapshot the committed list at the end of planning. Most trackers let tickets move in and out of a sprint silently, which makes carryover uncomputable after the fact.

---

## 2. Core metrics

### Cycle time

- **Definition.** Elapsed time from started to done for one ticket.
- **Formula.** `done_at - started_at`, per ticket, in days.
- **Report.** Median and 85th percentile for tickets done in the period. Not the mean: one stuck ticket skews it.
- **Use.** Forecasting how long a ticket will take once picked up.

### Lead time

- **Definition.** Elapsed time from request to done.
- **Formula.** `done_at - created_at`, per ticket, in days.
- **Report.** Median and 85th percentile.
- **Use.** What a requester experiences. The gap between lead time and cycle time is queue time.

### Throughput

- **Definition.** Count of tickets finished.
- **Formula.** Count of tickets with `done_at` inside the period.
- **Report.** Per sprint, with a three-sprint trailing median.
- **Use.** Planning. Pairs with points velocity if the team estimates.

### WIP

- **Definition.** Count of tickets started and not done.
- **Formula.** Daily count of tickets where `started_at <= day` and (`done_at` is empty or `done_at > day`).
- **Report.** Daily series and the sprint average. Per person if useful.
- **Use.** High WIP drives up cycle time. A WIP limit is the simplest lever a team has.

### Carryover percent

- **Definition.** Share of the committed plan not finished in the sprint.
- **Formula.** `committed_not_done / committed_total`, using the committed snapshot.
- **Report.** Per sprint, with the reason for each carried ticket.
- **Use.** Planning quality. Sustained carryover above about 20 percent means the team is over-committing.

### Planned vs unplanned ratio

- **Definition.** Share of finished work that was in the plan.
- **Formula.** `done_and_committed / done_total`.
- **Report.** Per sprint. Its complement (unplanned share) sets the capacity buffer.
- **Use.** Shows interrupt load. A ratio under 0.7 means the plan is a suggestion.

### Rework rate

- **Definition.** Share of finished tickets that were reopened.
- **Formula.** `tickets_reopened_after_done / tickets_done`, over the period. Count reopens up to 30 days after done.
- **Report.** Per sprint and per ticket type.
- **Use.** Quality signal. A rising rate points at acceptance criteria or review, not individuals.

### Estimate accuracy

- **Definition.** How well a size predicts effort.
- **Formula.** For each estimate bucket (1, 2, 3, 5, 8, or S, M, L), the median and 85th percentile cycle time. Accuracy is the spread between buckets and the tightness within them.
- **Report.** A small table, quarterly.
- **Use.** If 3-point and 5-point tickets have the same cycle time, the scale is not carrying information. Recalibrate in refinement.

---

## 3. Agent-lane metrics

Compute the core eight for agent lanes as their own rows. Then add:

| Metric | Formula | Fields |
|---|---|---|
| Dispatches issued | Count of dispatches sent in the period | Dispatch log or tickets labeled as dispatched |
| Draft-PR cycle time | `pr_ready_at - dispatch_sent_at`, median and 85th percentile | Dispatch timestamp, PR ready timestamp |
| Review rework rate | `agent_prs_changes_requested / agent_prs_reviewed` | PR review events |
| Honest-stop rate | `dispatches_ending_in_reported_blocker / dispatches_issued` | Dispatch outcome field: result, blocker, abandoned |
| Cost per merged PR | `agent_spend_in_period / agent_prs_merged` | Spend from your provider's billing export, PR merge events |

Add the reviewer's time to the lane's cost when you report it, even if only as an estimate in a separate column labeled as an estimate.

---

## 4. Reading the numbers

- **Trends over points.** Report each metric with at least three sprints of history.
- **Percentiles over averages.** The 85th percentile cycle time is the honest "how long will this take" answer.
- **Pairs over singles.** Throughput up and rework up together is not improvement. Cycle time down and WIP down together usually is.
- **Context in one line.** A holiday, an incident, or a team change explains a dip. Write it next to the number.

---

## 5. Common data problems

| Problem | Symptom | Fix |
|---|---|---|
| States not mapped | Cycle time near zero or equal to lead time | Map every workflow state to not-started, started, or done |
| No committed snapshot | Carryover cannot be computed | Snapshot at end of planning, every sprint |
| Tickets closed as duplicates counted as done | Throughput spikes | Exclude resolutions other than done or fixed |
| Bulk-closed stale tickets | Lead time spikes | Exclude a "won't do" resolution from lead time |
| Hours logged on every ticket | Hours ratio meaningless | Log only on capitalizable tickets |

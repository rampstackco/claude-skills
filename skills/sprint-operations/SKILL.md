---
name: sprint-operations
description: "Run the measurement and ceremony layer of a delivery team: the metric set, estimation and capacity, the five sprint ceremonies, and the sprint report and quarterly rollup. Use this skill whenever the user is acting as PMO or scrum lead, planning a sprint, running standup, refinement, review, or retro, measuring velocity, cycle time, or throughput, checking capacity, or reporting on how a team is doing. Triggers on PMO, sprint planning, plan the sprint, standup, refinement, backlog grooming, sprint review, retro, velocity, capacity, cycle time, lead time, throughput, WIP, burndown, carryover, sprint report, story points to hours, how is the team doing, delivery metrics, agent lanes. Also triggers when the user asks how much work fits in a sprint or whether a team is on track, even if they never say sprint or PMO."
category: process-and-team
catalog_summary: "PMO metrics, capacity, ceremonies, sprint reports, and agent-lane measurement"
display_order: 6
---

# Sprint Operations

Run the measurement and ceremony layer of a delivery team so planning is grounded in history and reporting is derived from the tracker, not typed in. Tracker-agnostic: works with Jira, Linear, GitHub Issues, or your tracker of choice.

---

## When to use

- Setting up the metric set for a new or inherited team
- Planning a sprint and checking it against real capacity
- Running standup, refinement, review, or retro with a consistent template
- Answering "how is the team doing?" with numbers instead of adjectives
- Writing the sprint report or the quarterly rollup
- Deriving a points-to-hours ratio for finance
- Measuring a team where some lanes are AI coding agents

## When NOT to use

- Writing the tickets that go into the sprint (use `ticket-authoring`)
- Writing the narrative of a retrospective or postmortem (use `after-action-report`)
- Setting objectives and key results (use `okr-design`)
- Deciding what ships this quarter (use `roadmap-planning`)
- Writing the handoff for an agent lane (use `dispatch-authoring`)
- Shaping the readout for executives (use `stakeholder-communication`)

---

## Required inputs

- Tracker access or an export with created, started, done, reopened, and sprint fields per ticket
- The team roster and planned availability for the sprint
- The last three to six sprints of history, if they exist
- The team's estimation scale (points, t-shirt sizes, or counts)
- Finance requirements for hours, if the team capitalizes development

If there is no history, say so. The first three sprints set the baseline. Do not invent one.

---

## The framework: 4 parts

### Part 1: The measurement set

Eight metrics. Each is derived from tracker timestamps and fields. None is typed into a spreadsheet by hand.

| Metric | One-line definition | Computed as |
|---|---|---|
| Cycle time | How long work takes once started | done date minus started date, per ticket; report the median and 85th percentile |
| Lead time | How long a request waits plus takes | done date minus created date, per ticket; median and 85th percentile |
| Throughput | How much finishes | count of tickets moved to done in the period |
| WIP | How much is in flight | count of tickets in any started, not-done state, sampled daily |
| Carryover percent | How much of the plan spilled | committed tickets not done at sprint end, divided by committed tickets |
| Planned vs unplanned ratio | How much of the sprint was the plan | done tickets committed at planning, divided by all done tickets |
| Rework rate | How often done was not done | tickets reopened after done, divided by tickets done |
| Estimate accuracy | How well sizing predicts effort | per size bucket, the spread of cycle times; tighter is better |

Formulas and the tracker fields each needs are in [`references/metrics-reference.md`](references/metrics-reference.md).

Read metrics as trends across sprints, never as a single number. One sprint is noise. Three is a direction.

### Part 2: Estimation and capacity

**Points are for forecasting.** They exist to answer "how much fits" and "when will it land." They are not a productivity score and are never compared across teams.

**Hours are logged separately, and only on capitalizable tickets.** If finance needs hours for capitalization, log them on the tickets whose stage is capitalizable. Do not ask the whole team to log every hour so you can convert points.

**If finance needs a points-to-hours ratio, derive it.** Per team, from trailing history: logged hours on capitalizable tickets divided by points completed on those tickets, over the last three to six sprints. Republish it each quarter with the window it was computed from.

**The failure mode of a fixed ratio.** A fixed company-wide ratio ("1 point equals 6 hours") drifts away from reality the moment a team's scale, makeup, or work mix changes. It also turns points into a time commitment, so estimates inflate to protect against it. Within two quarters the forecasts get worse and the capitalized hours are wrong.

**Capacity** is available person-days, minus known absences, minus a buffer for unplanned work set from the trailing planned vs unplanned ratio. Plan to trailing throughput adjusted for that capacity. See [`references/capacity-checklist.md`](references/capacity-checklist.md).

### Part 3: Ceremonies

Five ceremonies, each with a fixed purpose and a template.

| Ceremony | Purpose | Output |
|---|---|---|
| Planning | Commit to a sprint goal and a set of ready tickets that fits capacity | Sprint goal, committed list, capacity math |
| Daily standup | Surface blockers and WIP problems | Blocker list with owners |
| Refinement | Get the next one to two sprints of tickets to ready | Ready backlog, sized, with open questions owned |
| Review | Show what shipped against the goal | Demo notes, accepted and rejected items, feedback captured as tickets |
| Retro | Change one thing about how the team works | One to three owned actions |

The retro template runs the meeting. The write-up of a significant retro uses `after-action-report`. Do not duplicate that format here.

### Part 4: Reporting

Two reports.

- **Sprint report.** Goal met or not, the eight metrics with a three-sprint trend, carryover with reasons, notable risks, and agent-lane metrics if any. One page.
- **Quarterly rollup.** The same metrics across the quarter, the points-to-hours ratio if finance uses one, and the two or three changes the team made and whether they worked.

Both are raw material. Shape the readout for the audience with `stakeholder-communication`.

---

## Workflow

1. **Pull the data.** Export the last three to six sprints with the fields in [`references/metrics-reference.md`](references/metrics-reference.md). Confirm the started and done states are mapped correctly.
2. **Compute the baseline.** All eight metrics, per sprint, plus the trailing median.
3. **Check capacity.** Run [`references/capacity-checklist.md`](references/capacity-checklist.md) for the coming sprint.
4. **Run refinement.** Bring the next sprint's candidates to ready with `ticket-authoring`.
5. **Run planning.** Set a goal. Commit to ready tickets up to adjusted trailing throughput. Record the capacity math.
6. **Run the sprint.** Standup daily. Watch WIP and blockers, not hours.
7. **Close the sprint.** Run review, then retro. Capture actions as tickets.
8. **Report.** Fill [`references/sprint-report-template.md`](references/sprint-report-template.md). Roll up quarterly.

---

## Deep dive: measuring agent lanes

When part of the team is AI coding agents (Claude Code, Codex, or your coding agent of choice), treat each agent lane like a team member with its own row in every metric. The eight metrics still apply. Add five.

| Metric | Definition | Computed as |
|---|---|---|
| Dispatches issued | Units of work handed to agents | count of dispatches sent in the period |
| Draft-PR cycle time | Time from handoff to reviewable result | PR marked ready (or draft opened with a complete report) minus dispatch sent; median and 85th percentile |
| Review rework rate | How often agent output needs another pass | agent PRs that needed changes after first review, divided by agent PRs reviewed |
| Honest-stop rate | How often the agent stopped and reported a blocker instead of producing a result | dispatches ending in a reported blocker, divided by dispatches issued |
| Cost per merged PR | What a landed change costs | total agent spend in the period divided by agent PRs merged |

Read them together. An honest-stop rate of zero is a warning, not a win: it usually means blockers are being papered over. A rising review rework rate with a falling cycle time means speed is being bought with reviewer time. Human review time is part of the lane's cost even when it is not in the spend number.

Keep agent and human rows separate in reports so neither distorts the other's trend. Write each handoff with `dispatch-authoring` so dispatches are comparable.

---

## Failure patterns

- **Metrics typed into a spreadsheet.** They drift from the tracker and nobody can audit them. Derive everything.
- **Velocity as a performance score.** Teams inflate points and the forecast breaks. Points forecast; they do not rank.
- **Comparing points across teams.** Scales differ. Compare trends within a team only.
- **A fixed points-to-hours ratio.** Wrong within a quarter and it inflates estimates. Derive per team from trailing history and republish.
- **Logging hours on every ticket to satisfy finance.** Log on capitalizable tickets only.
- **Planning to a hoped-for number.** Plan to trailing throughput, adjusted for capacity.
- **Ignoring carryover.** Carryover above about 20 percent for three sprints means planning is broken, not the team.
- **Standup as status theater.** If nobody leaves with a blocker owned, the meeting did nothing.
- **Retro with no owned action.** Same complaints next sprint.
- **Agent lanes blended into team totals.** Hides both the gains and the review cost.

---

## Output format

- `sprint-[number]-report.md` from the sprint report template, one per sprint
- `quarterly-rollup-[YYYY-QN].md` with the same metric table across the quarter
- Ceremony notes in the tracker or a shared doc, one per ceremony, using the templates

---

## If required data is unavailable

This skill's output depends on data, measurements, or tool results it cannot generate on its own. When a required input, tool, or data source is unavailable or unverifiable, the sanctioned output is the deliverable with the gap stated: what was needed, what was actually obtained or verified, and which parts of the output are affected. Fabricating, estimating, or interpolating a required number to complete the deliverable is never sanctioned. A stated gap is a complete answer.

---

## Reference files

- [`references/metrics-reference.md`](references/metrics-reference.md) - Definitions, formulas, and the tracker fields each metric needs. Read when setting up measurement.
- [`references/capacity-checklist.md`](references/capacity-checklist.md) - Step-by-step capacity math for a sprint. Run before every planning session.
- [`references/planning-template.md`](references/planning-template.md) - Sprint planning agenda and record. Use in planning.
- [`references/standup-template.md`](references/standup-template.md) - Daily standup format focused on blockers and WIP. Use daily.
- [`references/refinement-template.md`](references/refinement-template.md) - Refinement agenda for getting tickets to ready. Use once or twice a sprint.
- [`references/review-template.md`](references/review-template.md) - Sprint review agenda and acceptance record. Use at sprint end.
- [`references/retro-template.md`](references/retro-template.md) - Retro meeting format that hands off to the after-action write-up. Use at sprint end.
- [`references/sprint-report-template.md`](references/sprint-report-template.md) - One-page sprint report with trend table. Fill after every sprint.
- [`references/example-sprint-report.md`](references/example-sprint-report.md) - A filled sprint report for a fictional team with one agent lane. Read to calibrate.

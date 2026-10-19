# Sprint Report Template

One page. Every number comes from the tracker. Each metric shows the last three sprints so the reader sees a trend, not a snapshot.

This is raw material. For an executive readout, shape it with `stakeholder-communication`.

---

## Template

```
# Sprint [N] report: [team name]

Dates: [start] to [end]
Prepared by: [name]
Data source: [tracker, export date]

## Goal
[Sprint goal text]
Result: [met / partly met / not met]. [One sentence on why.]

## Headline
[Two or three sentences. The most important thing a reader should take away.]

## Metrics
| Metric | Sprint [N-2] | Sprint [N-1] | Sprint [N] | Note |
|---|---|---|---|---|
| Throughput (tickets) | | | | |
| Points completed | | | | |
| Cycle time p50 / p85 (days) | | | | |
| Lead time p50 / p85 (days) | | | | |
| Average WIP | | | | |
| Carryover percent | | | | |
| Planned share | | | | |
| Rework rate | | | | |

## Agent lanes (if any)
| Metric | Sprint [N-2] | Sprint [N-1] | Sprint [N] | Note |
|---|---|---|---|---|
| Dispatches issued | | | | |
| Draft-PR cycle time p50 (hours) | | | | |
| Review rework rate | | | | |
| Honest-stop rate | | | | |
| Cost per merged PR | | | | |

## Carryover
| Ticket | Title | Reason | Plan |
|---|---|---|---|

## Unplanned work
| Ticket | Title | Source | Size |
|---|---|---|---|

## Risks and asks
- [Risk or ask, with owner]

## Retro actions
| Action | Owner | Due |
|---|---|---|

## Data gaps
[Anything that could not be computed, and why. Or "none."]
```

---

## Quarterly rollup additions

The quarterly rollup uses the same metric table with one column per sprint in the quarter, plus:

- **Points-to-hours ratio**, if finance uses one: this team's ratio, the sprints it was computed from, and the change from last quarter.
- **Estimate accuracy table**: median and 85th percentile cycle time per estimate bucket.
- **Changes tried**: the retro actions that shipped this quarter and what the metrics did after.
- **Agent-lane summary**: dispatches, merged PRs, honest-stop rate, and total cost, against the prior quarter.

---

## Writing the headline

Lead with the goal result and the one trend that matters most.

- Weak: "Good sprint. Team worked hard."
- Strong: "Goal met. Carryover fell for the third sprint in a row (31 to 18 percent) after the WIP limit went in. Review wait is now the bottleneck for agent PRs."

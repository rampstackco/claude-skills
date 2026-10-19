# Example Sprint Report

Fictional team: **Harbor team** at **Tidewell**, a field-inspection app for building inspectors. Five engineers, one product manager, one designer, and one agent lane (a coding agent running dispatched tickets, reviewed by the engineers). Two-week sprints.

All numbers below are fictional and internally consistent.

---

```
# Sprint 31 report: Harbor team

Dates: 2026-09-21 to 2026-10-02
Prepared by: Jordan Ellis (PM)
Data source: tracker export, 2026-10-02 17:00

## Goal
Inspectors can attach photos to a checklist item offline and sync them when back online.
Result: met. Offline attach and sync shipped to staging behind the offline_photos flag; accepted in review.

## Headline
Goal met with carryover down for the third sprint in a row, from 31 to 18 percent, after the team set a WIP limit of two per person in sprint 29. The agent lane is producing more, but review rework on its PRs rose to 43 percent; the action is to tighten the acceptance criteria in its dispatches.

## Metrics
| Metric | Sprint 29 | Sprint 30 | Sprint 31 | Note |
|---|---|---|---|---|
| Throughput (tickets) | 19 | 21 | 23 | Includes 5 agent-lane tickets |
| Points completed | 33 | 36 | 38 | |
| Cycle time p50 / p85 (days) | 3.5 / 8.0 | 3.0 / 7.0 | 2.5 / 6.0 | WIP limit effect |
| Lead time p50 / p85 (days) | 12 / 30 | 11 / 27 | 11 / 26 | Queue time unchanged |
| Average WIP | 13 | 10 | 9 | Limit is 10 for humans |
| Carryover percent | 31 | 24 | 18 | 4 of 22 committed |
| Planned share | 0.74 | 0.76 | 0.78 | 18 of 23 done were planned |
| Rework rate (percent) | 5 | 5 | 9 | 2 of 23 reopened; both agent-lane |

## Agent lanes
| Metric | Sprint 29 | Sprint 30 | Sprint 31 | Note |
|---|---|---|---|---|
| Dispatches issued | 5 | 7 | 9 | |
| Draft-PR cycle time p50 (hours) | 6 | 5 | 5 | Dispatch to PR ready |
| Review rework rate | 25 percent | 33 percent | 43 percent | 3 of 7 PRs needed changes |
| Honest-stop rate | 20 percent | 14 percent | 22 percent | 2 of 9 stopped with a reported blocker |
| Cost per merged PR | $11 | $10 | $9 | Agent spend only; review time not included |

Reviewer time on agent PRs (estimate, from review timestamps): about 1.5 person-days this sprint.

## Carryover
| Ticket | Title | Reason | Plan |
|---|---|---|---|
| HAR-412 | Sync: retry with backoff on flaky connections | Underestimated; touched two services not on its touches list | Re-estimated, split into two |
| HAR-418 | Photo compression on low-memory devices | Blocked on device lab access for 3 days | Access granted; first in next sprint |
| HAR-421 | Settings: storage usage display | Deprioritized for an unplanned P1 bug | Next sprint |
| HAR-425 | Agent lane: add sync telemetry events | Honest stop: event schema undefined in the dispatch | Schema decided in refinement; re-dispatch |

## Unplanned work
| Ticket | Title | Source | Size |
|---|---|---|---|
| HAR-430 | Checklist: crash when an item has 0 photos and is marked failed | Customer report, S2/P1 | 3 |
| HAR-431 | Login: token refresh loop on app resume | Monitoring alert | 2 |
| HAR-433 | Export: missing inspector name on PDF | Support | 1 |
| HAR-434 | Dependency security patch | Scheduled scan | 1 |
| HAR-436 | Staging data reset script | Team request | 1 |

## Risks and asks
- Review capacity is the constraint on the agent lane. Ask: hold dispatches at 9 per sprint until rework rate is back under 30 percent. Owner: Jordan.
- Device lab access is shared with another team. Ask: a standing booking for two days per sprint. Owner: Sam.

## Retro actions
| Action | Owner | Due |
|---|---|---|
| Every dispatch includes acceptance criteria copied from the story and a named test command | Jordan | Sprint 32 planning |
| Add "blocked by review" column with a 24-hour review target | Priya | Sprint 32 day 1 |

## Data gaps
Reviewer time on agent PRs is estimated from review timestamps, not logged. Labeled as an estimate above.
```

---

## Why this report works

- Every metric has three sprints of trend, so the reader sees direction.
- The agent lane has its own table, so its rework does not hide inside the team's rework rate.
- The honest stop on HAR-425 is reported as carryover with a cause, not hidden.
- The headline names the one trend that matters and the one action that follows from it.
- The data gap is stated instead of filled with a guess.

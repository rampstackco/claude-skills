# Refinement Template

Refinement gets the next one to two sprints of tickets to ready. It is where questions get answered before the sprint, not during it.

Timebox: about 5 to 10 percent of the sprint's working time, split into one or two sessions. Use `ticket-authoring` for the ticket formats and the definition of ready.

---

## Before the session

- [ ] Product owner has ordered the top of the backlog
- [ ] Each candidate ticket has a first draft from its template
- [ ] Open questions are written on the tickets, not held in someone's head
- [ ] Anything needing design or research has a spike or a design ticket already

---

## Agenda

1. **Re-check the top.** Has anything changed priority since last time?
2. **Walk each candidate.** For each ticket, in order:
   - Read the title and the acceptance criteria or repro steps aloud.
   - Run the definition-of-ready section for its type.
   - Answer what can be answered now. Assign an owner and a date to what cannot.
   - Estimate. If estimates spread widely, discuss the biggest and smallest, then re-estimate once.
   - Split anything larger than about a third of one person's sprint.
3. **Mark ready.** Only tickets that pass the checklist get the ready label.
4. **Look ahead.** Is there enough ready work for the next sprint's target plus 25 percent?

---

## Record

```
DATE: [YYYY-MM-DD]
ATTENDEES: [names]

READY THIS SESSION
| Ticket | Type | Estimate | Notes |
|---|---|---|---|

NOT READY
| Ticket | Missing | Owner | By |
|---|---|---|---|

SPLIT
- [Original ticket] into [new tickets]

SPIKES CREATED
- [Spike title, timebox]

READY BACKLOG DEPTH: [N points or tickets] vs next sprint target [N]
```

---

## Estimation notes

- Estimate relative to recently finished tickets, not in hours.
- Check estimate accuracy quarterly (see `metrics-reference.md`). If two sizes have the same cycle time, discuss what really drives effort.
- Agent-lane tickets get estimated too. Draft-PR cycle time by estimate bucket tells you which sizes agents handle well.

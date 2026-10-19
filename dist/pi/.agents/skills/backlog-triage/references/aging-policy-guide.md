# Aging Policy Guide

A backlog that only grows stops being read. An aging policy keeps it a queue: short enough to scan, current enough to trust.

The policy has three parts: a decay threshold, a ceiling, and review dates for parked items. Set all three once, write them down, and revisit them each quarter.

---

## Decay threshold

Any item untouched (no comment, no score change, no state change) for longer than the threshold comes back to triage.

| Team cadence | Suggested threshold |
|---|---|
| Weekly releases, fast-moving product | 60 days |
| Two-week sprints, steady product | 90 days |
| Monthly or slower releases | 120 days |

When an item crosses the threshold, it gets one of three outcomes in the next session:

1. **Re-scored,** with inputs refreshed. If the score holds, it stays, and the clock resets.
2. **Parked,** with a reason and a new review date.
3. **Closed,** with the reason "aged out" and a note to the reporter.

Closing an aged item is not losing it. If the problem is real, it will be reported again, and the new report will carry current context. Link the closed item so a new report can merge into it and recover the history.

---

## Ceiling

Set a maximum number of open items in the backlog. A practical starting point: three to four sprints of work at the team's recent throughput.

Example: the team finishes about 20 items per sprint. A ceiling of 70 to 80 items is three to four sprints.

When the backlog is over the ceiling:

- Every new item promoted means one item closed, parked, or declined
- The next session spends its first 10 minutes on the lowest-ranked items
- Low-severity, low-frequency bugs older than the threshold are the first to close

The ceiling is a forcing function. Teams without one never decline anything.

---

## Parked items

Parked items have a reason and a review date. On the review date, they come back to triage like an aged item.

| Park reason | Typical review date |
|---|---|
| Waiting on a dependency | When the dependency is due, plus one week |
| Out of scope this quarter | First triage session of next quarter |
| Waiting on reporter response | Two sessions from the question date |
| Low severity, low frequency | One quarter out, unless reporter count rises |

An item parked three times is a decline that nobody wants to write. Write it.

---

## Declines

A decline is a decision, not a failure. Common reasons:

- Conflicts with product direction (name the direction)
- Cost far exceeds the value at current reach
- Already solved another way (link it)
- Duplicate of a declined item
- Cannot reproduce after the reporter was asked

Every decline gets a written reason on the item and a reply to the reporter. The reply says what was decided and why, and whether new information would change it.

---

## When the backlog is already out of control

If the backlog is several times the ceiling and nobody reads it:

1. Freeze intake into the old backlog. New items go to a fresh triage inbox.
2. Sort the old backlog by last-touched date.
3. Bulk-close everything older than twice the threshold with the reason "aged out in backlog reset." Keep the links.
4. Triage what is left in batches, oldest first, over the next few sessions.
5. Set the ceiling and threshold before reopening intake.

Tell reporters before the bulk close. One message to the channel or customer list is enough.

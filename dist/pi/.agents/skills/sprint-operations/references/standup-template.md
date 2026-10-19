# Daily Standup Template

Standup exists to surface blockers and WIP problems while they are still cheap. It is not a status report to a manager. If the team leaves without a blocker owned, the meeting did nothing.

Timebox: 15 minutes. Run it from the board, not from people.

---

## Format: walk the board

Go right to left: the column closest to done first. Ask about tickets, not about people.

1. **Closest to done.** What does it take to finish this today?
2. **In review.** Who is reviewing, and when? Agent PRs waiting on review go here.
3. **In progress.** Anything stuck for more than a day?
4. **WIP check.** Is anyone holding more than the WIP limit? Is anything started that should be paused?
5. **Blockers.** Name each one, give it an owner, and take the discussion offline.
6. **Goal check.** Are we still on track for the sprint goal? Yes, at risk, or no.

---

## Record (only what changed)

```
DATE: [YYYY-MM-DD]

BLOCKERS
| Ticket | Blocker | Owner | Needed by |
|---|---|---|---|
| | | | |

WIP OVER LIMIT
- [Person or lane]: [N] in progress, limit [N]. Action: [what pauses]

SPRINT GOAL: [on track / at risk / off track]
If at risk: [one line why]

FOLLOW-UPS AFTER STANDUP
- [Topic] with [names]
```

---

## Agent lanes at standup

The person who issued the dispatch reports for the lane:

- Which dispatches are running, which returned a result, which returned a blocker
- Which agent PRs are waiting on review, and how long they have waited
- Any honest stop that needs a human decision today

An agent PR waiting two days for review is a blocker. Treat it like one.

---

## Anti-patterns

- Round-robin "yesterday, today, blockers" with no board on screen
- Problem-solving in the meeting instead of after it
- Reporting hours worked
- Skipping the goal check

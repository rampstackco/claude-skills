# Triage Session Checklist

The runbook for the weekly triage session. Timebox: 45 to 60 minutes. Run it in the same slot every week so reporters know when their item will be looked at.

---

## Before the session (triage lead, 15 to 30 minutes)

- [ ] Pull every item received since the last session
- [ ] Pull every item past its aging threshold
- [ ] Pull every parked item whose review date has arrived
- [ ] Pull every "question sent" item that got an answer
- [ ] Write intake records for anything missing one
- [ ] Do a first dedupe pass: search by symptom, area, and wording; propose merges
- [ ] Mark each item with a likely type and the inputs still missing
- [ ] Check the current backlog size against the ceiling
- [ ] Share the list with attendees at least a few hours ahead

---

## Attendees

| Role | Why they are there |
|---|---|
| Triage lead (PM or BA) | Runs the session, owns the outcome, writes the decisions down |
| Engineer | Effort, feasibility, and "is this already fixed?" |
| Support or customer-facing lead | Frequency, reporter context, who is waiting on what |
| Designer (when the top of the queue is user-facing) | Whether a story is shaped enough to be ready |

Keep it to four or five people. Triage with ten attendees becomes a roadmap debate.

---

## Agenda

| Minutes | Step | Done when |
|---|---|---|
| 0 to 5 | Confirm proposed merges | Each merge accepted or split, reporter counts updated |
| 5 to 15 | Classify | Every item has a type, or a question for the reporter |
| 15 to 35 | Score | Every classified item has a score with inputs on the record |
| 35 to 45 | Rank and promote | Top-N ranked; each item in it passed its definition of ready |
| 45 to 50 | Park and decline | Every remaining item has a state, a reason, and a date where needed |
| 50 to 55 | Aging | Stale items closed or re-scored; backlog size checked against the ceiling |
| 55 to 60 | Assign follow-ups | Reporter replies and missing-field fixes have owners |

If the session runs out of time, stop at the step you are on. Carry the remainder to the top of next week's list. Do not skip the definition of ready to finish on time.

---

## During the session: rules

- [ ] No item is promoted without its type's definition-of-ready checklist from `ticket-authoring`
- [ ] No score is accepted without its inputs written on the item
- [ ] No item is parked without a reason and a review date
- [ ] No item is declined without a written reason
- [ ] Reporter count changes only through merges
- [ ] Disagreements on rank are settled by inputs, not by seniority. If inputs are missing, the item is "unscored," not ranked by argument.

---

## After the session (triage lead, within two working days)

- [ ] Post the triage summary (ranked top-N, merges, parks, declines, questions)
- [ ] Reply to every reporter whose item was merged, parked, or declined
- [ ] Send question-back messages for items that could not be classified or scored
- [ ] Hand promoted items to their owners, or fill remaining fields with `ticket-authoring`
- [ ] Update the backlog size count

---

## Signs the session is not working

- The same items appear every week with no state change
- The top-N changes completely each week (scoring inputs are not stable)
- Nothing is ever declined
- Engineers pull items from the top and immediately ask clarifying questions
- Reporters chase updates in direct messages because nobody replies after triage

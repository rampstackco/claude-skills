# Capacity Checklist

Run this before every planning session. It turns "how much fits in the sprint?" into a number you can defend.

---

## 1. Gather the inputs

- [ ] Sprint length in working days
- [ ] Team roster, including agent lanes as separate rows
- [ ] Planned absences: vacation, holidays, training, on-call rotations
- [ ] Throughput and points completed for the last three to six sprints
- [ ] Planned vs unplanned ratio for the same sprints
- [ ] Carryover from the current sprint that will roll forward

If fewer than three sprints of history exist, say so in the plan and use the history you have. Do not borrow another team's numbers.

---

## 2. Compute available capacity

- [ ] Person-days available = sum over people of (sprint working days minus absence days)
- [ ] Capacity ratio = person-days available divided by person-days in a full-attendance sprint
- [ ] Note any role gap (no designer this sprint, no reviewer for one area)

Example: 5 people, 10-day sprint, 6 days of absence total. Available is 44 of 50. Ratio is 0.88.

---

## 3. Compute the planning target

- [ ] Baseline = trailing median throughput (tickets) or trailing median points completed
- [ ] Adjusted baseline = baseline multiplied by the capacity ratio
- [ ] Unplanned buffer = adjusted baseline multiplied by (1 minus trailing planned vs unplanned ratio)
- [ ] Planning target = adjusted baseline minus unplanned buffer
- [ ] Subtract carryover that is already committed

Example: trailing median 34 points. Ratio 0.88 gives 30. Trailing planned share 0.8, so the buffer is 6. Target is 24 points. Carryover is 5. New commitment: up to 19 points.

---

## 4. Check the agent lanes

- [ ] Agent-lane throughput is planned separately from human throughput
- [ ] Review capacity is counted: every agent PR needs a human reviewer, and that time comes out of human capacity
- [ ] Dispatches planned do not exceed the reviewers' capacity to review them in the sprint

A lane that can produce ten PRs while the team can review four will produce six PRs of WIP.

---

## 5. Check the commitment

- [ ] Every committed ticket meets the definition of ready (see `ticket-authoring`)
- [ ] No single ticket is larger than about a third of one person's sprint
- [ ] The sprint goal can be met with the committed list alone
- [ ] Stretch items are labeled as stretch and excluded from the commitment
- [ ] The capacity math is written into the planning record

---

## 6. Hours, only if finance needs them

- [ ] Hours are logged only on tickets with a capitalizable stage
- [ ] If a points-to-hours ratio is published, it is this team's ratio from its own trailing three to six sprints
- [ ] The ratio's computation window and date are stated next to it
- [ ] The ratio is republished at the start of each quarter

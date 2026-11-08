# Example: One Triage Session

Fictional product: **Brindle**, a booking and payments app for independent dog groomers. About 2,400 paying salons. The team runs two-week sprints, finishes about 18 items per sprint, and has a backlog ceiling of 70 items and a 90-day decay threshold.

Session date: Thursday, week 41. Attendees: triage lead (PM), one backend engineer, the support lead.

---

## Ten raw items in

| # | Received | Source | Reporter | Raw text (verbatim, trimmed) |
|---|---|---|---|---|
| R1 | Sep 30 | Support | Salon owner, Pinewood Paws | "Since the clocks changed every appointment in my phone calendar is an hour early." |
| R2 | Oct 2 | In-app feedback | Salon owner, Suds and Scissors | "appointments synced to my calendar are wrong by 1 hour??" |
| R3 | Oct 5 | Support | Groomer, Coat Couture | "Calendar sync shows my 10am as 9am. Brindle itself shows 10am." |
| R4 | Oct 3 | Sales call notes | Prospect, 3-location salon | "Would buy today if clients got a reminder text the day before." |
| R5 | Oct 6 | In-app feedback | Salon owner, Muddy Mutts | "SMS reminders please. No-shows are killing us." |
| R6 | Oct 4 | Monitoring alert | Payments service | "Card payment webhook returning 500 on 2.1% of requests since Oct 1." |
| R7 | Oct 5 | Internal request | Sales lead | "Add a dark mode. A prospect asked about it." |
| R8 | Oct 6 | Customer email | Salon owner, Hilltop Grooming | "Can you integrate with my horse stable management software too?" |
| R9 | Oct 7 | Support | Salon owner, unnamed | "The app is slow." |
| R10 | Oct 7 | Incident review | Backend lead | "Action item: alert when webhook error rate exceeds 1% for 10 minutes." |

---

## Merges

**Merge 1: R1, R2, R3 into R1.** Same symptom (one-hour offset), same area (calendar sync), same trigger (after the daylight saving change). R1 is the oldest, so it is the primary. R2 and R3 are closed as duplicates and linked. Reporter count on R1: 3.

**Merge 2: R4, R5 into R4.** Same ask in different words ("reminder text," "SMS reminders"). R4 is the oldest. Reporter count: 2. The engineer searched the backlog and found a closed item from five months earlier, "Text message reminders," with 4 reporters, closed as aged out. It is linked to R4, and those 4 reporters are added. Reporter count: 6.

---

## Classify

| Item | Type | Note |
|---|---|---|
| R1 | Bug | Defect in shipped calendar sync |
| R4 | Story | One user outcome: clients get a reminder before the appointment |
| R6 | Bug | Defect in payment processing |
| R7 | Story | User-facing preference |
| R8 | Story | Integration request |
| R9 | Unclear | Cannot tell which screen, device, or action. Question sent. |
| R10 | Task | Build work under the R6 investigation, no user-facing outcome of its own |

---

## Score

**R6 (bug).** Severity S1: payments fail and the salon is not told. Frequency high: 2.1 percent of card payments over 7 days, about 310 failed payments across 190 salons (from payment logs). Grid: high severity, high frequency. Queue: top, interrupt the sprint.

**R1 (bug).** Severity S2: core flow degraded (salons rely on phone calendars), workaround exists (open Brindle directly). Frequency high: 3 reporters, and the sync logs show 1,150 salons with an external calendar connected, all in affected time zones. Grid: high severity, high frequency. Queue: top of the queue, next to R6.

**R10 (task).** Inherits from R6.

**R4 (story), RICE.** Reach: 1,400 salons per quarter (salons that logged at least one no-show in the last 90 days, from the no-show report). Impact: 2 (directly reduces lost revenue). Confidence: 80 percent (6 reporters, one prospect blocking a sale, no research). Effort: 4 person-weeks (engineer estimate, includes a messaging provider integration). Score: 1,400 x 2 x 0.8 / 4 = 560.

**R7 (story), RICE.** Reach: unknown. One prospect asked, no existing customer has. Confidence: 50 percent. Reach is missing, so R7 is unscored with "reach: no data" named.

**R8 (story).** Not scored. Out of product direction (see decline).

---

## Promote, park, decline

**Promoted to the top-N:**

- **R6** passes the bug definition of ready: repro steps from the logs, environment, observed and expected, severity and priority, fix verification names a test for a webhook retry with a malformed payload.
- **R10** passes the task definition of ready: touches list is the alerting config and the payments dashboard; definition of done is "alert fires in staging when error rate is forced to 1.5 percent."
- **R1** passes the bug definition of ready after the support lead added the reproduction rate (every time, for salons in time zones that changed on Oct 1 or later).

**Scored but not ready: R4.** Score 560 puts it third on value. It fails the story definition of ready: no spec, no acceptance criteria, no decision on the messaging provider. It is not promoted. Action: PM writes the spec with `pm-spec-writing`, and a 3-day spike, "Which messaging provider meets our cost and opt-out requirements?", is opened and promoted in its place. The spike passes the spike definition of ready.

**Parked: R7.** Reason: "No reach data. One prospect request, no customer requests." Review date: first session of next quarter, or sooner if 3 customer requests arrive.

**Declined: R8.** Reason: "Brindle serves dog grooming salons. Stable management is outside the product direction for the next year. Re-request if we expand to equine services." Reply sent to the reporter the same day.

**Question sent: R9.** "Which screen feels slow, on which device, and what were you trying to do?" Status: question sent, Oct 9.

---

## Aging

Seven items crossed the 90-day threshold this week. Four were closed as aged out (all S4 cosmetic bugs with one reporter each). Three were re-scored and stayed. Backlog size: 66, under the ceiling of 70.

---

## Output: triage summary

| Rank | ID | Type | Title | Score | Inputs | Reporters | Ready |
|---|---|---|---|---|---|---|---|
| 1 | R6 | Bug | Payments: webhook returns 500 on 2.1% of card payments since Oct 1 | S1, high freq | 310 failures, 190 salons, 7 days | 1 (monitoring) | Yes |
| 2 | R10 | Task | Payments: alert when webhook error rate exceeds 1% for 10 minutes | Inherits R6 | Parent R6 | 1 | Yes |
| 3 | R1 | Bug | Calendar sync: appointments one hour early after daylight saving change | S2, high freq | 3 reporters, 1,150 synced salons | 3 | Yes |
| 4 | S1 | Spike | Which messaging provider meets our cost and opt-out requirements? | Inherits R4 (560) | Parent R4 | 6 | Yes |

- **Merges:** R1 (absorbed R2, R3; count 3). R4 (absorbed R5 and an aged-out item; count 6).
- **Scored, not ready:** R4 (560). Needs spec. Owner: PM.
- **Parked:** R7. No reach data. Review: first session next quarter.
- **Declined:** R8. Outside product direction. Reporter notified: yes.
- **Questions sent:** R9 to the salon owner, Oct 9.
- **Aging:** 4 closed, 3 re-scored. Backlog 66 of 70.

Why it works: every rank has its inputs beside it, the highest-value story was held back because it was not ready and a spike took its slot, and every item that did not make the list has a state, a reason, and a next date.

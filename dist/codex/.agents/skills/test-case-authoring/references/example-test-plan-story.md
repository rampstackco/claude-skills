# Example: Test Plan for One Story

Fictional product: **Plotwise**, a booking app for community garden plots. Members book weekly watering and harvest slots at shared gardens. The web app has unit, integration, and end-to-end suites. Staging has a fixture garden called "Test Garden."

---

## The story

```
TITLE: Members can cancel a booked slot and release it to the waitlist

TYPE: Story
PARENT EPIC: Slot waitlists
USER STORY
As a garden member, I want to cancel a slot I booked, so that someone on the waitlist can use it.

ACCEPTANCE CRITERIA
- [ ] AC-1: Given a booked slot more than 24 hours away, when the member taps Cancel and confirms, then the slot shows as Available and leaves the member's bookings.
- [ ] AC-2: Given a booked slot less than 24 hours away, when the member views it, then Cancel is disabled and the text reads "Slots can be cancelled up to 24 hours before they start."
- [ ] AC-3: Given a cancelled slot with a waitlist, when the cancellation is confirmed, then the first waitlisted member gets an email offer within 5 minutes.
- [ ] AC-4: Members find cancelling quick and easy.

REGRESSION RISK
Slot availability is read by the booking screen, the garden calendar, and the weekly reminder email.

QA NOTES
- Slot exactly 24 hours away
- Daylight saving change between now and the slot
- Waitlist of one, and a waitlist where the first member has since left the garden
```

---

## Test plan

```
TEST PLAN: Members can cancel a booked slot and release it to the waitlist
TICKET TYPE: Story
SPEC: Slot waitlists spec, section 2 "Cancellation"

SCOPE
In scope: AC-1, AC-2, AC-3; QA notes; regression risk (booking screen, calendar, reminder email).
Out of scope: waitlist offer acceptance flow (separate story "Waitlisted member accepts an offer").

COVERAGE CLASSES
| Class | Covered | Cases | If not covered, why |
|---|---|---|---|
| Happy path | yes | TC-01, TC-05 | |
| Boundary and edge | yes | TC-02, TC-03, TC-04, TC-07 | |
| Negative and error | yes | TC-06, TC-08 | |
| Regression | yes | TC-09, TC-10 | |
| Accessibility smoke | yes | TC-11 | |
| Performance smoke | no | | Single-record write; no list or query changes. Existing booking-screen budget test covers render. |

LEVELS
| Level | Cases | Notes |
|---|---|---|
| Unit | TC-02, TC-03, TC-04 | The 24-hour rule is a pure function of slot start and now |
| Integration | TC-05, TC-06, TC-07, TC-08, TC-09 | Cancellation writes, waitlist queue, email job |
| End-to-end | TC-01, TC-10 | Member-visible flow and calendar |
| Manual | TC-11 | Screen reader announcement needs a human listener |

ENVIRONMENTS
- Local: unit suite
- Staging: integration and end-to-end, fixture "Test Garden," test clock enabled, email captured by the staging mail sink

EVIDENCE TO ATTACH
- Runner summary lines for every automated case
- Screenshot of TC-01 final state and TC-02 disabled button with text visible
- Mail sink entry for TC-05 showing recipient and timestamp
- Notes from TC-11 with the announced text quoted

ENTRY CRITERIA
- Build with the feature flag `slot_cancel` on in staging
- Fixture garden loaded with members M1 (booker), M2, M3 (waitlist)

EXIT CRITERIA
- All cases pass, AC-4 resolved by the ticket author

UNTESTABLE OR DEFERRED
- AC-4: not testable as written. See the matrix.

QA NOTES SUMMARY (paste into the ticket)
11 cases: 3 unit, 5 integration, 2 end-to-end, 1 manual (screen reader). Covers AC-1 to AC-3, all three QA notes, and the three regression paths. Performance smoke not applicable (single write). Evidence posted on the ticket. AC-4 is not testable as written; rewrite proposed to the author.
```

---

## Traceability matrix

| Criterion or risk | Text (short) | Cases | Levels | Status |
|---|---|---|---|---|
| AC-1 | Cancel more than 24h ahead releases the slot | TC-01, TC-04 | e2e, unit | covered |
| AC-2 | Cancel disabled inside 24h with message | TC-02, TC-03 | unit | covered |
| AC-3 | First waitlisted member emailed within 5 min | TC-05, TC-06, TC-07, TC-08 | integration | covered |
| AC-4 | Members find cancelling quick and easy | none | | GAP: not testable as written |
| RISK: booking screen | Availability shown to other members | TC-09 | integration | covered |
| RISK: calendar and reminder | Calendar and reminder email read availability | TC-10 | e2e | covered |
| RISK: accessibility | New confirm dialog | TC-11 | manual | covered |

**AC-4 gap.** "Quick and easy" has no threshold and no observer. Two testers would not agree on pass or fail. Proposed to the ticket author:

- Rewrite as checkable: "Given a booked slot more than 24 hours away, when the member cancels from the booking list, then cancellation takes no more than two taps (Cancel, Confirm) and no page load." This is testable and would add one end-to-end case.
- Move the sentiment part to the epic's success metric: "Cancellation completion rate above 95 percent of started cancellations, measured 30 days after launch."

The plan does not invent a test for AC-4 and does not mark it passed. It stays a named gap until the author changes it.

---

## Test cases (selected)

```
ID: TC-01
TITLE: Member cancels a slot 3 days ahead and it becomes available
TRACES TO: AC-1
CLASS: happy path
PRECONDITION
- Account and role: member M1 on "Test Garden"
- Data state: M1 booked "Bed 4, watering, Saturday 08:00"; test clock set to Wednesday 08:00
- Flags: slot_cancel on
TEST DATA
- Slot: Bed 4, watering, Saturday 08:00
STEPS
1. Sign in as M1.
2. Open My bookings.
3. Tap Cancel on "Bed 4, watering, Saturday 08:00."
4. Tap Confirm in the dialog.
5. Open the Test Garden schedule for Saturday.
EXPECTED RESULT
My bookings no longer lists the slot. The schedule shows "Bed 4, watering, 08:00" as Available.
ENVIRONMENT: staging, desktop browser
LEVEL: end-to-end
AUTOMATION STATUS: to automate
EVIDENCE TO ATTACH: Screenshot of the schedule showing Available; runner summary once automated
```

```
ID: TC-03
TITLE: Slot exactly 24 hours away cannot be cancelled
TRACES TO: AC-2
CLASS: boundary and edge
PRECONDITION
- Unit under test: canCancel(slotStart, now)
TEST DATA
- slotStart: 2026-03-14T08:00 local; now: 2026-03-13T08:00 local
STEPS
1. Call canCancel with the test data.
EXPECTED RESULT
Returns false with reason code CANCEL_WINDOW_CLOSED.
ENVIRONMENT: local
LEVEL: unit
AUTOMATION STATUS: automated (can_cancel_at_exact_24h_boundary)
EVIDENCE TO ATTACH: Runner summary line for can_cancel_at_exact_24h_boundary
```

The spec says "up to 24 hours before," so exactly 24 hours is the last moment cancellation is closed. The engineer confirmed this reading with the PM before the case was written.

```
ID: TC-07
TITLE: Waitlist offer goes to the next member when the first has left the garden
TRACES TO: AC-3
CLASS: boundary and edge
PRECONDITION
- M2 was first on the waitlist and has left Test Garden; M3 is second
TEST DATA
- Slot: Bed 4, harvest, Sunday 10:00
STEPS
1. As M1, cancel the slot.
2. Run the waitlist job.
3. Read the staging mail sink.
EXPECTED RESULT
One offer email to M3 within 5 minutes of step 1. No email to M2.
ENVIRONMENT: staging
LEVEL: integration
AUTOMATION STATUS: automated (waitlist_skips_departed_member)
EVIDENCE TO ATTACH: Mail sink entry showing recipient M3 and timestamp; runner summary line
```

The remaining cases (TC-02, TC-04 to TC-06, TC-08 to TC-11) follow the same anatomy. TC-04 covers the daylight saving change between now and the slot. TC-08 covers the email service returning an error: the offer is retried and the slot stays Available.

---

## If a coding agent runs this plan

The agent reports per case: pass with the runner line quoted, fail with the output, or untestable with the reason. TC-11 is manual by design, so the agent reports it as "untestable by agent: requires a human screen reader listener," not as passed. AC-4 is reported as a gap, not as covered.

Why this plan works: every criterion is traced or named as a gap, the boundary at exactly 24 hours is pinned down before testing, each case sits at the lowest level that can observe it, and every pass leaves an artifact.

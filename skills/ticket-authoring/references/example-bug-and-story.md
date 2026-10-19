# Example: One Bug and One Story

Fictional product: **Ferngrove**, a scheduling and payroll app for small restaurant groups. The team works in two-week sprints and capitalizes development under a stage-tagging policy.

Both tickets sit under the same epic: "Overnight shift support" (application development stage).

---

## Example bug

```
TITLE: Timesheets: weekly hours double-count when a shift crosses midnight

TYPE: Bug
OWNER: unassigned
PARENT: Epic "Overnight shift support"
LABELS: timesheets, payroll, customer-reported
CAPITALIZATION STAGE: Post-implementation
Override reason: defect in the shipped weekly timesheet, not new functionality.

ENVIRONMENT
- Build or version: web 3.18.2
- Browser or device: any (reproduced in two desktop browsers)
- Account type: manager role, single location
- Data state: one employee with a shift Sunday 22:00 to Monday 04:00

REPRO STEPS
1. Sign in as a manager on the fixture location "Test Kitchen."
2. Open Schedule. Create a shift for employee "Sam Rivera," Sunday 22:00 to Monday 04:00.
3. Clock the shift in and out at those exact times using the test clock.
4. Open Timesheets. Select the week containing Sunday.
5. Open the week containing Monday.

Reproduces: every time.

OBSERVED
Sunday's week shows 6.0 hours for the shift. Monday's week also shows 6.0 hours for the same shift. Payroll export for both weeks includes the full 6.0 hours. Total across both weeks: 12.0.

EXPECTED
The shift's hours split at the week boundary per the overnight shift spec: 2.0 hours in Sunday's week, 4.0 hours in Monday's week. Total: 6.0.

CURRENT TEST RESULT
No test covers a shift that crosses a week boundary. The existing midnight test covers a shift that crosses midnight inside a single week, and passes.

SEVERITY: S2 major (payroll totals wrong, no workaround short of manual edit)
PRIORITY: P1 this sprint
Reason for priority: payroll runs every two weeks; next run is in 9 days.

REGRESSION RISK
The hours aggregation is shared by the weekly timesheet, the payroll export, and the overtime calculator. A fix in aggregation touches all three.

QA NOTES
- Shift crossing a week boundary and a month boundary at the same time
- Location in a time zone with a daylight saving change on that Sunday
- Shift edited after clock-out to cross the boundary
- Overtime threshold crossed only because of the double count

FIX VERIFICATION METHOD
Add an automated test: create a shift Sunday 22:00 to Monday 04:00 across a week boundary, clock it, and assert weekly totals of 2.0 and 4.0 and a combined payroll export total of 6.0. Run the existing midnight and overtime suites.

EXPECTED TEST RESULT AFTER FIX
New test fails on 3.18.2 and passes on the fix branch. Existing midnight and overtime suites pass with no changes to their assertions.

ATTACHMENTS
- Screenshot of both weekly timesheets showing 6.0 hours
- Payroll export rows for both weeks
```

Why it is ready: someone who has never opened Ferngrove can reproduce it, the fix has a named test, and the capitalization override explains why a ticket in a build epic is post-implementation.

---

## Example story

```
TITLE: Managers can see overnight shifts split by day on the schedule

TYPE: Story
OWNER: unassigned
PARENT EPIC: Overnight shift support
LABELS: schedule, web, managers
CAPITALIZATION STAGE: Application development (inherited)
ESTIMATE: 5 points

USER STORY
As a restaurant manager scheduling a late-night kitchen crew, I want a shift that crosses midnight to appear on both days of the schedule, so that I can see who is working at any hour without opening each shift.

SPEC
Link: Overnight shift support spec, section 3 "Schedule display."

ACCEPTANCE CRITERIA
- [ ] Given a shift from 22:00 Sunday to 04:00 Monday, when the manager views the week, then the shift appears on Sunday from 22:00 to 24:00 and on Monday from 00:00 to 04:00.
- [ ] Given that split shift, when the manager hovers either segment, then a tooltip shows the full shift "Sun 22:00 to Mon 04:00, 6.0 hours."
- [ ] Given that split shift, when the manager drags either segment, then both segments move together.
- [ ] Given a shift crossing the last day of the visible week, when the manager views the week, then the visible segment shows a "continues" marker and the next week shows the remaining segment.
- [ ] Given a viewer with the employee role, when they view their own schedule, then they see the same split display.
- [ ] Given an empty week, when the manager views it, then no split markers appear.

NON-GOALS
- Does not change timesheet or payroll calculation. That is the bug "weekly hours double-count when a shift crosses midnight."
- Does not add shifts longer than 24 hours.
- Does not change the mobile app schedule view. Separate story.

DESIGNS
- Mockup: "Schedule, overnight split, week view" (attached)

ANALYTICS EVENTS
| Event name | Trigger | Properties |
|---|---|---|
| overnight_shift_viewed | Week view renders with at least one split shift | location_id: string, split_count: int |
| overnight_shift_moved | Manager drags a split shift | location_id: string, hours: float |

FEATURE FLAG
schedule_overnight_split, default off in production, on in staging. Roll out to 10 percent of locations, then 100 percent after one payroll cycle with no related tickets.

QA NOTES
- Daylight saving change on the crossing night
- Week start set to Monday versus Sunday in location settings
- Long employee names in the narrow overnight segment
- Screen reader announces both segments as one shift

DEFINITION OF DONE
- [ ] Every acceptance criterion checked by someone other than the author
- [ ] Both analytics events verified with correct properties in staging
- [ ] Flag default confirmed off in production, on in staging
```

Why it is ready: the spec is linked, not pasted; each criterion can be checked by a second person; the non-goals draw the line against the related bug; the flag has a rollout plan.

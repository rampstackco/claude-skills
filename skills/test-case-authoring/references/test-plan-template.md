# Test Plan Template

One plan per work item. It is short: the cases carry the detail. The plan says what is in scope, which classes are covered, where it runs, and what evidence comes back.

The summary section goes into the ticket's QA notes. The rest attaches to the ticket or lives next to it.

---

## Template

```
TEST PLAN: [ticket ID and title]
TICKET TYPE: [bug / task / story / spike]
AUTHOR: [name]
DATE: [yyyy-mm-dd]
SPEC: [link, or none]

SCOPE
In scope:
- [Acceptance criteria AC-1 to AC-n, or the repro and QA notes]
- [Named risks: what else shares the code path]
Out of scope:
- [What this plan does not test, and where it is covered instead]

COVERAGE CLASSES
| Class | Covered | Cases | If not covered, why |
|---|---|---|---|
| Happy path | yes / no | TC-.. | |
| Boundary and edge | yes / no | TC-.. | |
| Negative and error | yes / no | TC-.. | |
| Regression | yes / no | TC-.. | |
| Accessibility smoke | yes / no | TC-.. | |
| Performance smoke | yes / no | TC-.. | |

LEVELS
| Level | Cases | Notes |
|---|---|---|
| Unit | TC-.. | |
| Integration | TC-.. | |
| End-to-end | TC-.. | |
| Manual | TC-.. | Reason each is manual |

ENVIRONMENTS
- [Environment]: [what runs there, data fixtures, flag states]

EVIDENCE TO ATTACH
- [Per case or per group: runner summary, screenshot, log line, recording]

ENTRY CRITERIA
- [What must be true before testing starts: build deployed, fixtures loaded, flag on]

EXIT CRITERIA
- [What must be true to call the item verified: all cases pass, or failures filed and accepted]

UNTESTABLE OR DEFERRED
- [Case or criterion, reason, what would make it testable, owner]

QA NOTES SUMMARY (paste into the ticket)
[Three to six lines: classes covered, case count by level, environments, where the evidence will be posted, anything untestable.]
```

---

## Filling the plan by ticket type

| Type | Minimum content |
|---|---|
| Bug | Failing case (the repro as a test), regression cases for every shared path, fix verification case named on the ticket |
| Story | Every criterion traced, all six classes considered, levels chosen per case |
| Task | Happy path and regression, mapped to the definition of done and the touches list |
| Spike | Exploratory charters in place of cases; exit criteria are the spike's own |

---

## Entry and exit criteria

Entry criteria stop wasted test runs. If the fixture data is not loaded, every case fails for the wrong reason.

Exit criteria stop endless testing. "All cases pass" is one valid exit. "All cases pass except TC-07, filed as a separate bug and accepted by the PM as not blocking" is another, if it is written down.

---

## Untestable or deferred

Some criteria cannot be tested before release: a metric that needs a month of data, a third-party behavior with no sandbox, a load level the staging environment cannot produce. List them here with the reason and what would make them testable. An untestable criterion hidden inside a passing plan is worse than one named in the open.

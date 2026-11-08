# Coverage Checklist

Mandatory coverage classes per ticket type, and the questions that find cases inside each class. Every mandatory class gets cases or a written "not applicable, because."

---

## Mandatory classes by type

| Class | Bug | Task | Story | Spike |
|---|---|---|---|---|
| Failing case (repro as a test) | Required | n/a | n/a | n/a |
| Happy path | If the fix changes the main flow | Required | Required | Charter |
| Boundary and edge | From QA notes | Consider | Required | Charter |
| Negative and error | From QA notes | Consider | Required | Charter |
| Regression | Required | Required | Required | n/a |
| Accessibility smoke | If user-facing | If user-facing | Required if user-facing | n/a |
| Performance smoke | If the defect was performance | Consider | Consider | n/a |

"Consider" means write cases or a one-line reason for skipping. Epics carry no cases; their stories do.

---

## Prompts per class

### Happy path

- [ ] The main flow with normal input, start to finish
- [ ] Each role that the criterion names

### Boundary and edge

- [ ] Zero, one, and many (empty list, single item, page-size plus one)
- [ ] Minimum and maximum values, and one past each
- [ ] Very long text, special characters, emoji, right-to-left text
- [ ] Time: midnight, month end, leap day, daylight saving change, time zones
- [ ] Concurrency: two users editing the same record, double submit

### Negative and error

- [ ] Invalid input: wrong format, wrong type, missing required field
- [ ] Permission boundary: a role that should not see or do this
- [ ] Dependency failure: a service down, a timeout, a slow response
- [ ] Expired state: session, link, token, cache
- [ ] The error message is specific and the user can recover

### Regression

- [ ] Every path named in the ticket's regression risk field
- [ ] Other screens or services that read or write the same data
- [ ] Existing automated suites for the area run and pass unchanged
- [ ] For a bug: the original repro no longer reproduces

### Accessibility smoke

- [ ] Every new control reachable and operable by keyboard alone
- [ ] Focus is visible and moves in a logical order
- [ ] Inputs and controls have accessible names
- [ ] State changes (errors, loading, success) are announced to a screen reader
- [ ] Text and controls meet WCAG AA contrast

This is a smoke check per item. A full audit belongs to `accessibility-audit`.

### Performance smoke

- [ ] The flow with realistic data volume (not an empty fixture)
- [ ] Response or render time within the team's budget
- [ ] No new request inside a loop, no unbounded query

This is a smoke check per item. Deeper investigation belongs to `performance-optimization`.

---

## Before calling coverage done

- [ ] Every mandatory class for the type has cases or a written reason
- [ ] Every edge case in the ticket's QA notes has a case
- [ ] Every risk in the ticket's regression risk field has a case
- [ ] Every user-facing story has at least one accessibility smoke case
- [ ] The traceability matrix shows no untraced cases

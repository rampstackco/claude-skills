---
name: test-case-authoring
description: "Write the test plan and test cases for a single work item: every acceptance criterion traced to a case, each case with test data, steps, an observable expected result, a level, and the evidence a pass must leave behind. Use this skill whenever the user wants to write test cases, a test plan, or QA notes for a ticket, plan regression tests for a bug fix, build a traceability matrix, choose between unit, integration, end-to-end, and manual tests, or charter exploratory testing for a spike. Triggers on test cases, test plan, QA notes, how do I test this, write tests for this ticket, acceptance test, regression test, traceability, test coverage for a story, exploratory testing, test charter, what should QA check, fix verification. Also triggers when the user pastes a ticket or a set of acceptance criteria and asks whether it is testable, even if they never say test plan."
---

# Test Case Authoring

Write the tests for one work item so the QA notes on the ticket have real content and the fix verification on a bug names a real test. Tool-agnostic: works with any test runner, any tracker, and any test management tool.

---

## When to use

- A story is ready and its acceptance criteria need test cases
- A bug fix needs a named verification test and a regression set
- QA notes on a ticket say "test it" and nothing else
- Checking whether a set of acceptance criteria is testable at all
- A spike needs an exploratory charter instead of pass/fail cases
- A coding agent will run the tests and needs to know what evidence to return

## When NOT to use

- Site-wide QA sweeps before a launch or after a deploy (use `qa-testing`)
- Writing the acceptance criteria themselves (use `ticket-authoring`, or `pm-spec-writing` for the spec behind them)
- Auditing a whole site for accessibility (use `accessibility-audit`)
- Reviewing the code change (use `code-review-web`)
- Deciding go or no-go for a release (use `launch-runbook`)
- Deciding which items deserve testing effort first (use `backlog-triage`)

---

## Required inputs

- The work item: type, title, acceptance criteria or repro steps, QA notes so far
- The spec or PRD it links to, if any
- The environments available (local, staging, production-like)
- The test levels the codebase supports (unit, integration, end-to-end, manual)
- Known risk areas: what else shares this code path

If the acceptance criteria are not checkable, stop and send them back. Tests written against a vague criterion inherit the vagueness.

---

## The framework: six parts

A test plan is a contract. It says what will be checked, how, at which level, and what a pass leaves behind.

### 1. From acceptance criteria to tests

Each acceptance criterion maps to at least one test case. Each test case traces back to exactly one criterion or one named risk.

- An untested criterion is a defect in the plan. Nobody will check it.
- An untraceable test is a defect too. Either it covers a risk nobody wrote down (name the risk) or it is noise (cut it).

Record the mapping in a traceability matrix. See [`references/traceability-matrix-template.md`](references/traceability-matrix-template.md).

### 2. Test case anatomy

| Field | What goes in it |
|---|---|
| ID | Stable, unique within the item, e.g., `TC-01` |
| Title | What is being checked, in a few words |
| Traces to | One acceptance criterion or one named risk |
| Precondition | State before step 1: account, role, data, flags |
| Test data | Exact values. "A valid email" is weaker than `jordan@example.test`. |
| Steps | Numbered, one action each |
| Expected result | Observable: a value, a message, a state, a status code |
| Environment | Where it runs |
| Level | Unit, integration, end-to-end, or manual |
| Automation status | Automated, to automate, or manual by design (with reason) |

Expected results are observable. "Works correctly" is not a result. "The total shows $42.00 and the order status is `paid`" is. See [`references/test-case-template.md`](references/test-case-template.md).

### 3. Coverage classes

| Class | Question it answers |
|---|---|
| Happy path | Does the main flow work with normal input? |
| Boundary and edge | What happens at limits: zero, one, max, empty, very long, time zones? |
| Negative and error | What happens with bad input, missing permissions, or a failed dependency? |
| Regression | What else uses this code path, and is it still intact? |
| Accessibility smoke | Keyboard reachable, labeled, announced, contrast holds? |
| Performance smoke | Does it stay within the budget under realistic data? |

Mandatory classes depend on the ticket type:

- **Bug:** the failing case (the repro, as a test) plus regression. Edge cases from the QA notes when they exist.
- **Story:** all six considered. Each class gets cases or a written "not applicable, because."
- **Task:** happy path plus regression.
- **Spike:** exploratory charters instead of cases.
- **Epic:** no cases of its own. Its stories carry them.

See [`references/coverage-checklist.md`](references/coverage-checklist.md).

### 4. Level selection

Pick the lowest level that can observe the expected result.

- **Unit** when the result is a return value or state inside one module. Fast, precise, cheap to keep.
- **Integration** when the result depends on two or more parts talking: a service and its database, an API and its client.
- **End-to-end** when the result is only visible through the full user path: a page, a flow across screens, an email arriving.
- **Manual** when the result needs human judgment (visual layout, copy tone, screen reader experience) or the setup costs more than the test is worth. Write the reason.

A price calculation is a unit test, not an end-to-end test that reads the price off the screen. The end-to-end test checks the price appears; the unit test checks the math.

### 5. Exploratory charters

For spikes, and for stories with real unknowns, write a charter instead of scripted cases.

- **Timebox:** 30 to 90 minutes per charter
- **Target:** the area to explore
- **Question:** what you are trying to learn

Findings are notes, not pass/fail: what you tried, what you saw, what surprised you, what bugs you filed, what new cases to script. See [`references/exploratory-charter-template.md`](references/exploratory-charter-template.md).

### 6. Evidence

A passing test leaves something behind: a log line, a test runner summary, a screenshot, a recorded run, a response body. The plan names which evidence each case must produce.

A claim of "tested" with no artifact is not a test result. This applies equally to a person and to a coding agent.

---

## Workflow

1. **Read the item.** List every acceptance criterion (story), repro and QA note (bug), or definition-of-done line (task).
2. **Check testability.** For each criterion, ask: can two people agree on pass or fail? If not, send it back to `ticket-authoring` with a rewrite proposal.
3. **Name the risks.** What else shares the code path, the data, or the screen? Each risk becomes a regression case.
4. **Write cases.** At least one per criterion, using the anatomy above.
5. **Fill the coverage classes** required for the type. Write "not applicable, because" for any class you skip.
6. **Pick a level per case.** Lowest level that observes the result.
7. **Name the evidence** each case must produce.
8. **Build the matrix.** Confirm every criterion has a case and every case has a trace.
9. **Write the plan.** Scope, classes, levels, environments, evidence. See [`references/test-plan-template.md`](references/test-plan-template.md).
10. **Attach to the ticket.** The plan summary goes in QA notes. For a bug, the failing-case test goes in fix verification.

---

## Deep dive: tests run by coding agents

When an AI coding agent runs the test plan, the plan has to be written for a reader who will not ask a question and may report success too early.

- **Name the evidence per case.** "Paste the runner summary showing TC-01 through TC-06 passed" or "attach a screenshot of the confirmation screen with the order number visible."
- **A tool success message is not evidence.** "Command completed" says the command ran, not that the test passed. The agent reads the output back and quotes the line that shows the result.
- **Untestable is a valid result.** If an environment is missing, a credential is unavailable, or a case needs human judgment, the agent reports the case as untestable with the reason. It does not mark it passed, skip it silently, or substitute a weaker check.
- **No edits to make a test pass.** The agent does not change assertions, expected values, or fixtures to turn red into green unless the plan says the expected value was wrong.
- **Report per case.** Pass, fail, or untestable, with the evidence or the reason, for every case ID in the plan.

For how this lands inside an agent brief (the verification section and the stop conditions), see `dispatch-authoring`.

---

## Failure patterns

- **Cases that restate the criterion.** "Verify the user can reset the password." No steps, no data, no expected result. Write the steps.
- **Happy path only.** The bug will be in the empty state, the error state, or the boundary. Fill the classes.
- **No test data.** "Enter a valid date" gives a different test each run. Name the value.
- **Expected result not observable.** "Works as expected," "behaves correctly," "no issues." Name the value, message, or state.
- **Everything marked manual.** When a unit or integration test could observe the result, manual is a cost paid every release. Say why it is manual or move it down a level.
- **Bug fix with no regression class.** The fix passes its own test and breaks the neighbor. Name what shares the path and test it.
- **Tests with no trace.** Cases that map to no criterion and no risk. Trace them or cut them.
- **"Tested" with no artifact.** No log, no summary, no screenshot. Not a result.

---

## Output format

For one work item, return:

1. **Test plan summary** for the ticket's QA notes: scope, classes covered, levels, environments, evidence
2. **Traceability matrix:** criterion or risk to case IDs
3. **Test cases** in full, in ID order
4. **Exploratory charters,** if any
5. **Gaps:** criteria that are not testable as written, with a proposed rewrite

Name files `test-plan-[ticket-id].md` when saving to disk.

---

## Reference files

- [`references/test-case-template.md`](references/test-case-template.md) - Fillable test case with every anatomy field. Read when writing any case.
- [`references/test-plan-template.md`](references/test-plan-template.md) - Per-item plan: scope, classes, levels, environments, evidence. Read at the start of every plan.
- [`references/traceability-matrix-template.md`](references/traceability-matrix-template.md) - Criterion-to-case matrix with gap checks. Read before calling a plan complete.
- [`references/coverage-checklist.md`](references/coverage-checklist.md) - Mandatory coverage classes per ticket type, with prompts per class. Read when deciding what to cover.
- [`references/exploratory-charter-template.md`](references/exploratory-charter-template.md) - Charter and session notes for spikes and unknowns. Read when scripted cases do not fit.
- [`references/example-test-plan-story.md`](references/example-test-plan-story.md) - A full plan for one story with four acceptance criteria, including an untestable criterion handled correctly. Read to calibrate the level of detail.

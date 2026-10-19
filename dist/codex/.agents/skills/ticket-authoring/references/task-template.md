# Task Template

A task is a unit of build work. It usually sits under a story and has no user-facing outcome on its own. "Add the column," "write the migration," "wire the event."

The touches list is the field that makes a task executable. It names what the work changes, so the executor (a person or a coding agent) knows the boundary and a reviewer can tell scope from drift.

---

## Template

```
TITLE: [verb] [object] [qualifier]

TYPE: Task
OWNER: [one name, or unassigned]
PARENT STORY: [link, or none]
LABELS: [component, platform]
CAPITALIZATION STAGE: [inherited from epic, or override with a note]
ESTIMATE: [points, per the team's scale]

TASK SPEC
[What changes, in plain language. Two to five sentences. Say what, not how, unless the how is a constraint.]

TOUCHES
- Files or modules: [paths or module names, if known]
- Services: [which services or functions change]
- Feature flags: [flag names read or created]
- Tables or schemas: [tables, columns, or indexes changed]
- Config or infrastructure: [env settings, queues, jobs, if any]

DOES NOT TOUCH
- [Anything nearby that must stay unchanged]

SCREENSHOTS
- [Current state of the affected area, if user-visible]

QA NOTES
- [What to check after the change]
- [Which existing behavior must not regress]

DEFINITION OF DONE
- [ ] [Observable outcome 1]
- [ ] [Observable outcome 2]
- [ ] Tests added or updated: [which]
- [ ] Nothing outside TOUCHES changed, or the change is noted in the PR
```

---

## Writing a touches list

You do not need perfect knowledge of the codebase. Name what you know, and mark guesses.

```
TOUCHES
- Files or modules: billing/invoice_builder (likely), billing/tests
- Services: invoice service only
- Feature flags: none
- Tables or schemas: invoices (add column due_reminder_sent_at, nullable timestamp)
- Config or infrastructure: none
```

If the executor discovers the work needs to touch something not on the list, they note it in the ticket before continuing. That note is the signal to re-estimate or split.

---

## Splitting a story into tasks

- Split along the touches list. One service, one migration, or one surface per task is a good default.
- Each task should be finishable in one to two days. Larger means split again.
- Each task should be independently reviewable, even if it ships behind a flag.
- Order tasks by dependency. Schema before code that reads it. Flag before code behind it.

---

## Definition of done, by example

Weak:

```
- [ ] Done
- [ ] Tested
```

Strong:

```
- [ ] invoices.due_reminder_sent_at exists in staging, nullable, no default
- [ ] Migration runs forward and back on a copy of production data without errors
- [ ] Unit test covers the new field in the invoice serializer
- [ ] Nothing outside TOUCHES changed, or the change is noted in the PR
```

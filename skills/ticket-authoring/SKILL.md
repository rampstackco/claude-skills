---
name: ticket-authoring
description: "Write complete, ready-to-pull work items for an issue tracker: bugs, tasks, stories, spikes, and epics, each with the fields, attachments, and done test its type requires. Use this skill whenever the user wants to write a ticket, create a Jira issue, Linear issue, or GitHub issue, file a bug report, write a user story or acceptance criteria, scope a spike, open an epic, or break work into tasks. Triggers on write a ticket, create an issue, file a bug, bug report, user story, spike, epic, task breakdown, turn this into tickets, break this down, acceptance criteria, definition of ready, ready for dev, backlog item, capitalization stage. Also triggers when the user pastes a PRD, a spec, or a bug description and asks what to do with it, even if they never say the word ticket."
category: product
catalog_summary: "Bugs, tasks, stories, spikes, and epics with a definition of ready per type"
display_order: 1
---

# Ticket Authoring

Turn specs, bug reports, and loose requests into work items someone can pull and start without asking a question. Tracker-agnostic: works in Jira, Linear, GitHub Issues, or your tracker of choice.

---

## When to use

- Turning a PRD or spec into a set of tickets
- Filing a bug that someone else will fix
- Writing a user story with checkable acceptance criteria
- Scoping a spike so it ends in a decision, not a shrug
- Opening an epic with a goal, a metric, and a way to kill it
- Auditing a backlog for tickets that are not ready to pull
- Tagging work items with a capitalization stage for finance

## When NOT to use

- Writing the PRD or spec itself (use `pm-spec-writing`)
- Deciding what ships this quarter (use `roadmap-planning`)
- Running sprint ceremonies or measuring the team (use `sprint-operations`)
- Writing up what went wrong after the fact (use `after-action-report`)
- Handing a whole plan to a coding agent to execute unattended (use `dispatch-authoring`)

---

## Required inputs

- The source material: a spec, a bug description, a request, or a conversation
- The ticket type, or enough context to pick one
- The tracker's field set, if it has required custom fields
- The parent epic or story, if one exists
- The capitalization policy, if the team capitalizes software development

If the source is vague, ask before writing. A ticket written around a guess becomes a second ticket later.

---

## The framework: five types, one definition of ready each

A ticket is ready when the person who pulls it can start work without a question. Each type has its own required fields, its own attachments, and its own done test. A field left blank is a question someone will ask in the middle of the sprint.

Every type shares a base: title, type, owner, parent link, labels, and capitalization stage.

### Bug

A bug ticket proves the defect exists and defines how to prove it is gone.

- **Title.** `[area] [symptom] when [trigger]`. Example: "Checkout: total shows $0.00 when a promo code is removed."
- **Repro steps.** Numbered. Each step is one action. Someone who has never seen the product can follow them.
- **Environment.** Build or version, browser or device, account type, data state.
- **Observed vs expected.** Two separate lines. Never one sentence with "but."
- **Current test result.** The test that fails today, or "no test covers this."
- **Severity and priority.** Two fields. Severity is how bad the defect is. Priority is when the team fixes it.
- **Regression risk.** What else touches this code path.
- **QA notes.** Edge cases to check beyond the repro.
- **Fix verification method.** The specific test that proves the fix, by name or by steps.
- **Expected test result after fix.** What passing looks like.

Done test: the named verification passes, and the repro steps no longer reproduce.

### Task

A task is a unit of build work with no direct user-facing outcome of its own.

- Task spec: what changes, in plain language
- Parent story link, if any
- **Touches list:** files, services, flags, and tables in scope. This lets an executor scope the change and lets a reviewer spot drift.
- Estimate
- Screenshots of the affected area
- QA notes
- Definition of done

Done test: every item in the definition of done is checked, and nothing outside the touches list changed without a note.

### Story

A story delivers one user-visible outcome.

- User story statement: "As a [user], I want [action], so that [outcome]."
- Link to the PRD or spec. If none exists, write one first with `pm-spec-writing`.
- Acceptance criteria in checkable form (Given, When, Then, or a checkbox list with observable outcomes)
- Explicit non-goals
- Wireframe or mockup screenshots, if any
- Analytics events to emit, with names and properties
- Feature flag, if any
- QA notes

Done test: every acceptance criterion is checked by someone other than the author.

### Spike

A spike buys information with a fixed amount of time.

- The question being answered, as one sentence ending in a question mark
- Timebox, in days
- Exit criteria: what counts as an answer
- Resources, services, and platforms to evaluate
- Competitor examples, if any
- Required output artifact: a decision memo with a recommendation. Never "we looked into it."

Done test: the memo exists, names a recommendation, and lands before the timebox ends. If time runs out, the memo says what is still unknown.

### Epic

An epic groups work toward one outcome and carries the business case.

- Date opened
- Goal, in one sentence
- Success metric, with baseline and target
- Kill criteria: the signal that ends the epic early
- Owner, one name
- Roadmap fitment: which quarter, which objective (see `roadmap-planning` and `okr-design`)
- Notes
- Capitalization stage, if the work is capitalizable

Done test: the success metric is measured, or the kill criteria fired and the epic closed on purpose.

### Severity is not priority

Severity describes the defect. Priority describes the schedule. A typo on the pricing page is low severity and high priority. A crash in an admin screen used once a quarter is high severity and can be lower priority. Collapsing them into one field hides that tradeoff.

### Capitalization stage

If the company capitalizes software development, every work item carries a stage: preliminary, application development, or post-implementation. The stage lives on the work item. It is inherited from the epic by default and overridden per ticket when the work differs. A spike inside a build epic that evaluates alternatives is preliminary. A bug fix on a shipped feature is post-implementation. See [`references/capitalization-guide.md`](references/capitalization-guide.md). This is not accounting advice. Your finance team owns the final determination.

---

## Workflow

1. **Read the source.** Identify every distinct outcome, defect, question, and unit of build work in it.
2. **Pick the type for each.** One outcome is a story. One defect is a bug. One open question is a spike. Build work under a story is a task. A group of stories toward one metric is an epic.
3. **Fill the template.** Use the type's template from references. Fill every field. Write "none" when a field is truly empty, so the reader knows it was considered.
4. **Run the definition of ready.** Check each ticket against its section of [`references/definition-of-ready-checklist.md`](references/definition-of-ready-checklist.md). Fix or flag every unchecked item.
5. **Set the capitalization stage.** Inherit from the epic. Override where the ticket's work differs, and note why.
6. **Link the tree.** Epic to stories, stories to tasks, bugs to the story that introduced them if known.
7. **Hand off.** Post to the tracker, or return the tickets as markdown ready to paste.

---

## Failure patterns

- **Bug ticket with no repro steps.** Cannot be fixed with confidence or verified. Push back until steps exist, or file it as a spike to find the repro.
- **Story with acceptance criteria that cannot be checked.** "Page loads fast" is not checkable. "Page renders the first result in under 2 seconds on a mid-tier phone" is.
- **Spike with no timebox.** Becomes an open-ended research project. Every spike gets days, not "until we know."
- **Epic with no kill criteria.** Nobody can stop it, so it never stops.
- **Severity and priority collapsed into one field.** The team loses the ability to say "bad, but not now."
- **Capitalization stage set at the epic only.** Hours on preliminary spikes and post-launch bug fixes get capitalized by default. Tag the ticket.
- **Task with no touches list.** The executor guesses the blast radius. Reviewers cannot tell scope from drift.
- **Ticket that restates the spec.** Link the spec. Copying it means two sources that will disagree by next week.
- **"Fix verification: test it."** Name the test or write the steps.

---

## Output format

One markdown block per ticket, ready to paste into the tracker. Order: epic first, then stories, then tasks and spikes under each story, then bugs.

For a batch, return a summary table first:

| # | Type | Title | Parent | Estimate | Cap stage | Ready |
|---|---|---|---|---|---|---|

Then each ticket in full. Name files `tickets-[initiative].md` when saving to disk.

---

## Reference files

- [`references/bug-template.md`](references/bug-template.md) - Fillable bug template. Read when filing any defect.
- [`references/task-template.md`](references/task-template.md) - Fillable task template with the touches list. Read when splitting build work.
- [`references/story-template.md`](references/story-template.md) - Fillable story template. Read when writing user-facing work.
- [`references/spike-template.md`](references/spike-template.md) - Fillable spike template and decision memo shape. Read before any research ticket.
- [`references/epic-template.md`](references/epic-template.md) - Fillable epic template with kill criteria and roadmap fitment. Read when opening an initiative.
- [`references/definition-of-ready-checklist.md`](references/definition-of-ready-checklist.md) - One checklist per type. Run before any ticket enters a sprint.
- [`references/example-bug-and-story.md`](references/example-bug-and-story.md) - A filled bug and a filled story for a fictional product. Read to calibrate the level of detail.
- [`references/capitalization-guide.md`](references/capitalization-guide.md) - Plain-language guide to ASC 350-40 and IAS 38 stages for PMs. Read when the team capitalizes development work.

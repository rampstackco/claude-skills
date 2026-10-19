---
name: backlog-triage
description: "Turn an inbox of raw requests (bug reports, feature asks, support escalations, feedback, incident follow-ups) into a ranked, deduplicated backlog where every item at the top meets the definition of ready, with recorded scores, merge links, and a written reason for every park and decline. Use this skill whenever the user wants to triage incoming work, groom or prune a backlog, merge duplicate tickets, score or rank requests, decide what the team works on next, or run a weekly triage session. Triggers on triage, groom the backlog, backlog grooming, prioritize the backlog, dedupe tickets, duplicate tickets, what should we work on next, inbox of bugs, feature requests pile, rank these, is this ready, backlog is too big, stale tickets, severity vs frequency. Also triggers when the user pastes a list of raw requests or bug reports and asks what to do with them, even if they never say the word triage."
category: product
catalog_summary: "Intake, dedupe, classify, score, promote or decline, and age out raw requests into a ranked, ready backlog"
display_order: 1
---

# Backlog Triage

Turn a pile of raw requests into a short, ranked queue where everything at the top can be pulled today. Tracker-agnostic: works in Jira, Linear, GitHub Issues, or your tracker of choice.

---

## When to use

- A pile of bug reports, feature asks, and escalations has no order
- The same complaint shows up as five tickets from five people
- The team asks "what should we work on next?" and nobody can answer from the backlog
- Running the weekly triage session
- The backlog has grown past the point anyone reads it
- Checking whether the top of the queue is actually ready to pull

## When NOT to use

- Writing the ticket itself, fields and all (use `ticket-authoring`)
- Sequencing initiatives across quarters (use `roadmap-planning`)
- Synthesizing a batch of research interviews (use `discovery-research-synthesis`)
- Aggregating feedback channels into themes (use `user-feedback-aggregation`)
- Running sprint planning, standups, or retros (use `sprint-operations`)
- Writing the test plan for one item already in the queue (use `test-case-authoring`)

---

## Required inputs

- The raw items: pasted text, an export, or a tracker query
- The current backlog, if one exists, to dedupe against
- The scoring model the team uses, or agreement to use the defaults here
- The backlog ceiling and aging threshold, or agreement to set them now
- Who can answer questions about each item (reporter or owner)

If an item has no source or no reporter, ask before scoring it. A score built on an anonymous one-liner is a guess with a number on it.

---

## The framework: six parts

Triage is a filter, not a sort. Most raw items should not reach the top of the queue. The ones that do must be ready to pull.

### 1. Intake

Requests arrive from support, sales, customers, monitoring, incident reviews, internal teams, and feedback programs. Every one gets an intake record before it enters the backlog:

- **Source:** channel or system it came from
- **Reporter:** a name or account, so someone can be asked a question
- **Date received**
- **Raw text:** verbatim. Paraphrase loses the detail that makes dedupe possible.
- **Affected area:** product area, page, or component, as best known

Nothing enters the backlog without an intake record. A hallway ask becomes a record or it stays a hallway ask.

### 2. Dedupe and merge

Duplicates hide demand. Five tickets with one reporter each look like five small problems. One ticket with five reporters is a signal.

Find duplicates three ways:

- **Same symptom:** "export hangs" and "CSV never downloads"
- **Same area:** two reports against the same screen in the same week
- **Same ask in different words:** "bulk edit," "change many at once," "multi-select"

To merge: keep the oldest item as the primary. Link the rest to it and close them as duplicates. Add their reporters to the primary. Update the **reporter count** field.

Reporter count is a field, not a vibe. "Lots of people want this" is not an input. "11 reporters, 3 paying accounts" is.

### 3. Classify

Assign one of the five types from `ticket-authoring`: bug, task, story, spike, or epic. A defect is a bug. A user outcome is a story. An open question is a spike. A group of outcomes toward one metric is an epic.

If you cannot classify it, the item is not ready. Send a question back to the reporter. Do not guess the type and write a ticket around the guess.

### 4. Score

Score inputs, not conclusions. Every score is written with the inputs that produced it, so anyone can re-derive it next month.

**Bugs: severity and frequency as separate fields.**

| | Low frequency (rare, few users) | High frequency (common, many users) |
|---|---|---|
| **High severity** (data loss, blocked flow, security) | Next sprint. Schedule it, with a workaround noted now. | Top of the queue. Often interrupts the current sprint. |
| **Low severity** (cosmetic, workaround exists) | Park or decline. Revisit only if frequency rises. | Batch with nearby work. Queue behind high-severity items. |

Severity uses the scale in the `ticket-authoring` bug template. Frequency comes from reporter count, error logs, or analytics, never from the loudest reporter's estimate.

**Stories and epics: value against effort, inputs on the record.** Use the model your team already trusts. If you have none, RICE is one option: reach, impact, confidence, effort. Record each input with its source. Another team might use value, urgency, and effort. The model matters less than writing the inputs down. See [`references/scoring-template.md`](references/scoring-template.md).

**Tasks and spikes** inherit priority from the story or decision they unblock.

### 5. Promote, park, or decline

Every item leaves triage in one of three states.

- **Promote** to ready only when the definition-of-ready checklist for its type passes. Use the checklist in `ticket-authoring`; do not keep a second copy.
- **Park** with a written reason and a review date. "Not now" without a date means "never" with extra steps.
- **Decline** with a written reason. "Will not do" is a valid outcome and a required field, not an empty state. Tell the reporter.

### 6. Aging

The backlog is a queue, not an archive.

- **Decay threshold.** Items untouched past a set age (for example, 90 days) come back to triage to be re-scored, parked with a new date, or closed.
- **Ceiling.** The team sets a maximum backlog size. Above it, adding one item means closing or declining another.
- **Parked items** return on their review date, not whenever someone remembers.

See [`references/aging-policy-guide.md`](references/aging-policy-guide.md).

### Cadence: the weekly triage session

- **When:** weekly, same slot. Timebox 45 to 60 minutes.
- **Who:** the triage lead (PM or BA) runs it. One engineer for effort and feasibility. One support or customer-facing voice for frequency and reporter context. Design joins when the top of the queue is user-facing.
- **Input:** every item received since the last session, plus anything past its aging threshold or review date.
- **Output:** a ranked top-N (N is roughly one sprint of work) where every item passes its definition of ready, plus the list of merges, parks, and declines with reasons. Reporters of declined and parked items get a reply within the week.

The runbook is [`references/triage-checklist.md`](references/triage-checklist.md).

---

## Workflow

1. **Collect the inbox.** Everything received since the last session, plus items past their aging threshold or review date.
2. **Write intake records** for anything that lacks one. Flag items with no reachable reporter.
3. **Dedupe.** Search the backlog by symptom, area, and wording. Merge into the oldest item and update the reporter count.
4. **Classify** each surviving item. Send a question back on anything you cannot classify.
5. **Score** with inputs recorded. Bugs on the severity and frequency grid. Stories and epics on your value and effort model.
6. **Rank** by score, then by cost of delay for ties.
7. **Promote, park, or decline.** Run the definition of ready on each item headed for the top-N. Park with a reason and a date. Decline with a reason.
8. **Apply aging.** Close or re-score stale items. Check the ceiling.
9. **Close the loop.** Reply to reporters of parked, declined, and merged items. Hand ready items to `ticket-authoring` for any fields still missing.

---

## Failure patterns

- **Loudest-voice ordering.** The item from the most senior or most persistent requester jumps the queue with no inputs recorded. Weight by reporter count and source quality. See `user-feedback-aggregation`.
- **Everything is highest severity.** When every bug is S1, severity carries no information. Recalibrate against the scale's examples and push back on inflated reports.
- **No decline path.** The backlog only grows, so it stops being read. Every session should decline something.
- **Scoring theater.** Scores typed in with no inputs, or inputs reverse-engineered to justify a score already chosen. If the inputs are not on the item, the score is not real.
- **Duplicates that each carry one reporter.** Demand is split across tickets and every one looks minor. Merge and sum.
- **Ready that is not ready.** An item promoted to the top that an engineer cannot start without a conversation. Run the definition of ready, not a gut check.
- **Triage by one person with no follow-up.** One person decides alone and never replies to reporters. Reporters stop reporting, and the backlog loses its best signal.
- **Parked with no date.** A soft decline that never gets revisited or communicated.

---

## Output format

Return a triage summary in markdown:

1. **Ranked top-N table**

| Rank | ID | Type | Title | Score | Inputs | Reporters | Ready |
|---|---|---|---|---|---|---|---|

2. **Merges:** primary ID, merged IDs, new reporter count
3. **Parked:** ID, reason, review date
4. **Declined:** ID, reason, reporter notified (yes or no)
5. **Questions sent:** ID, question, reporter
6. **Aging actions:** items closed or re-scored, current backlog size against the ceiling

Name files `triage-[yyyy-mm-dd].md` when saving to disk.

---

## If required data is unavailable

This skill's output depends on data, measurements, or tool results it cannot generate on its own. When a required input, tool, or data source is unavailable or unverifiable, the sanctioned output is the deliverable with the gap stated: what was needed, what was actually obtained or verified, and which parts of the output are affected. Fabricating, estimating, or interpolating a required number to complete the deliverable is never sanctioned. A stated gap is a complete answer.

For triage, that means: an item missing reach, frequency, or effort is ranked as "unscored" with the missing input named, not given a plausible number.

---

## Reference files

- [`references/intake-template.md`](references/intake-template.md) - The minimum intake record and the question-back message. Read when an item arrives without one.
- [`references/triage-checklist.md`](references/triage-checklist.md) - The weekly session runbook, minute by minute. Read before running a session.
- [`references/scoring-template.md`](references/scoring-template.md) - The severity and frequency grid for bugs and a value and effort sheet with inputs. Read when scoring anything.
- [`references/aging-policy-guide.md`](references/aging-policy-guide.md) - How to set the decay threshold and ceiling, and what to do when the backlog is over it. Read when the backlog feels unreadable.
- [`references/example-triage-session.md`](references/example-triage-session.md) - Ten raw items in, a ranked list out, with two merges, one park, and one decline. Read to calibrate the level of detail.

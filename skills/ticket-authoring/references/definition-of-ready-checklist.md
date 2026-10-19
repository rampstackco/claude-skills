# Definition of Ready Checklist

Run the section for the ticket's type before it enters a sprint. Every box should be checked or explicitly marked "none" with a reason. An unchecked box is a question someone will ask mid-sprint.

---

## All types

- [ ] Title is specific enough to find in search
- [ ] Type is set and matches the work
- [ ] Owner is one name, or the ticket is explicitly unassigned for pull
- [ ] Parent link is set, or "none" is deliberate
- [ ] Capitalization stage is set (inherited or overridden with a reason), if the team capitalizes
- [ ] No pasted spec text. The spec is linked.

---

## Bug

- [ ] Title follows `[area] [symptom] when [trigger]`
- [ ] Repro steps are numbered, one action per step, from a known starting state
- [ ] Reproduction rate is stated (every time, N of M, once)
- [ ] Environment lists build, device or browser, account type, and data state
- [ ] Observed and expected are separate lines
- [ ] Current test result is stated (failing test name, or "no test covers this")
- [ ] Severity and priority are set as separate fields
- [ ] Regression risk names the code paths that share this behavior
- [ ] QA notes list edge cases beyond the repro
- [ ] Fix verification method names a specific test or numbered steps
- [ ] Expected test result after the fix is stated in observable terms
- [ ] A screenshot, recording, or log excerpt is attached

---

## Task

- [ ] Task spec says what changes in plain language
- [ ] Parent story is linked, or "none" is deliberate
- [ ] Touches list names files or modules, services, flags, tables, and config
- [ ] "Does not touch" names nearby things that must stay unchanged
- [ ] Estimate is set
- [ ] Screenshots of the affected area are attached, if user-visible
- [ ] QA notes are present
- [ ] Definition of done lists observable outcomes, not "done" and "tested"
- [ ] Task fits in one to two days, or it has been split

---

## Story

- [ ] User story statement names a specific user, an action, and an outcome
- [ ] Spec or PRD is linked
- [ ] Every acceptance criterion is checkable by someone other than the author
- [ ] Empty, error, and permission states are covered by criteria
- [ ] Non-goals are listed
- [ ] Designs are attached or linked, or "none" is deliberate
- [ ] Analytics events are named with trigger and properties, or "none" is deliberate
- [ ] Feature flag is named with default state, or "none" is deliberate
- [ ] QA notes are present
- [ ] Estimate is set and fits within one sprint

---

## Spike

- [ ] Question is one sentence ending in a question mark
- [ ] Why-now names the decision this unblocks
- [ ] Timebox is set in days, with a hard stop date
- [ ] Exit criteria define what counts as an answer
- [ ] Resources, services, and platforms to evaluate are listed
- [ ] Competitor or prior-art examples are listed, or "none" is deliberate
- [ ] Output artifact is a decision memo with a named location
- [ ] Capitalization stage is preliminary, or the override is explained

---

## Epic

- [ ] Date opened is set
- [ ] Goal is one sentence
- [ ] Success metric has a baseline, a target, and a measurement date
- [ ] Kill criteria are observable, dated, and owned
- [ ] Owner is one name
- [ ] Roadmap fitment names the quarter and the objective
- [ ] Scope in and scope out are listed
- [ ] Capitalization stage is set, with the date it last changed
- [ ] At least one child story or spike exists

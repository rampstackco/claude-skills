# Spike Template

A spike spends a fixed amount of time to answer one question. Its deliverable is a decision memo with a recommendation. "We looked into it" is not a deliverable.

---

## Template

```
TITLE: Spike: [the question, shortened]

TYPE: Spike
OWNER: [one name]
PARENT: [epic or story the answer unblocks]
LABELS: [component, research]
CAPITALIZATION STAGE: [preliminary, by default; override with a note]

QUESTION
[One sentence ending in a question mark.]

WHY NOW
[What decision is blocked until this is answered.]

TIMEBOX
[N working days. Start date. Hard stop date.]

EXIT CRITERIA
[What counts as an answer. Example: "A recommendation between options A, B, and C, with cost at 10x current volume and one known risk per option."]

RESOURCES TO EVALUATE
- Services or platforms: [list]
- Internal systems: [list]
- Documentation or standards: [list]

COMPETITOR OR PRIOR-ART EXAMPLES
- [Example and what to look at, or none]

OUT OF SCOPE
- [What the spike will not investigate]

OUTPUT ARTIFACT
Decision memo at [location], using the shape below.
```

---

## Decision memo shape

```
# Decision memo: [question]

Date: [YYYY-MM-DD]
Author: [name]
Timebox used: [N of M days]

## Recommendation
[One paragraph. What to do and why.]

## Options considered
| Option | Fit | Cost | Risk | Notes |
|---|---|---|---|---|

## Evidence
[What was tested, measured, or read. Links.]

## Still unknown
[What the timebox did not answer, and what it would take to answer it.]

## Follow-up tickets
- [Ticket to create if the recommendation is accepted]
```

---

## Timebox rules

- A spike gets days, not "until we know." One to five days covers most spikes.
- When the timebox ends, the memo ships with whatever is known. "Still unknown" is a valid section.
- Extending a spike is a new decision, made in refinement, with a reason. It is not automatic.

---

## Good and bad spike questions

| Weak | Strong |
|---|---|
| Look into search | Can the current database's full-text search return results under 1 second for 1M records, or do we need a separate search service? |
| Research payment providers | Which of three payment providers supports split payouts in our five launch countries at under 3 percent total fees? |
| Investigate flaky tests | What are the top three causes of the 40 test failures that passed on retry last month? |

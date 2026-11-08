# Exploratory Charter Template

A charter points a timeboxed session at a question. It is the right tool when the answer is not known well enough to script cases: a spike, a new integration, a story with real unknowns, or a bug with no repro.

Findings are notes, not pass/fail.

---

## Charter

```
CHARTER ID: [EX-01]
TICKET: [ticket ID and title]
TIMEBOX: [30 / 60 / 90 minutes]
TESTER: [name, or agent]

EXPLORE: [target area, e.g., "the import flow with files from other tools"]
WITH: [resources, e.g., "five sample files of different sizes and encodings"]
TO DISCOVER: [the question, e.g., "where does the import fail, and does it tell the user why?"]

SETUP
- Environment: [where]
- Data: [what is loaded]
- Flags: [states]
```

The one-line form is: **Explore** [target] **with** [resources] **to discover** [question].

---

## Session notes

```
SESSION: [EX-01], [date], [start time] to [end time]

WHAT I TRIED
- [Action and input]
- [Action and input]

WHAT I SAW
- [Observation, with screenshot or log reference]
- [Observation]

SURPRISES
- [Anything unexpected, even if not a bug]

BUGS FILED
- [ticket ID and title, or none]

QUESTIONS RAISED
- [Question for the PM, designer, or engineer]

NEW SCRIPTED CASES TO WRITE
- [Case title and trace]

COVERAGE
- Explored: [what the session covered]
- Not explored: [what was left, and whether it needs another charter]

TIME SPLIT (rough)
- Setup: [n] min / Testing: [n] min / Investigating bugs: [n] min
```

---

## Charter rules

- **One question per charter.** Two questions means two charters.
- **Stop at the timebox.** If the question is not answered, write what is still unknown and propose the next charter.
- **Record as you go.** Notes written after the session lose the detail that made the bug reproducible.
- **File bugs with repro steps.** A finding that is a bug becomes a bug ticket with `ticket-authoring`.
- **Turn knowns into cases.** Once a behavior is understood, write a scripted case so it is checked every release.

---

## Example charters

| Explore | With | To discover |
|---|---|---|
| The CSV import | Files exported from three other tools, one with a byte-order mark | Which files fail and whether the error names the problem |
| Checkout on a slow network | Network throttled to a slow mobile profile | Whether double-tapping Pay can create two orders |
| A candidate messaging provider's sandbox | The provider's test numbers and opt-out keywords | Whether opt-out replies reach our webhook within a minute |

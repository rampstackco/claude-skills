# Epic Template

An epic groups stories toward one outcome and carries the business case. It is the level where the team decides whether to keep going, so it needs a metric to aim at and a signal to stop.

---

## Template

```
TITLE: [outcome, in a few words]

TYPE: Epic
DATE OPENED: [YYYY-MM-DD]
OWNER: [one name]
LABELS: [product area, initiative]

GOAL
[One sentence. The outcome for users or the business.]

SUCCESS METRIC
- Metric: [one primary metric]
- Baseline: [current value and date measured]
- Target: [value]
- Measured by: [date or window]

KILL CRITERIA
- [Signal that ends the epic early. Example: "Pilot cohort adoption under 10 percent after 4 weeks."]
- [Second signal, if any]

ROADMAP FITMENT
- Quarter: [e.g., Q3]
- Objective: [the OKR or roadmap theme this serves]
- Dependencies: [other epics or teams]

CAPITALIZATION STAGE
[preliminary / application development / post-implementation / not capitalizable]
Stage changed on: [date, if it moved]
Reason: [one line]

SCOPE
- In: [stories or capabilities included]
- Out: [explicitly excluded]

CHILD ITEMS
- [Story link]
- [Story link]
- [Spike link]

NOTES
[Context, decisions, links to the spec and research.]
```

---

## Writing kill criteria

Kill criteria are decided before the work starts, when nobody is attached to it yet. They answer: "What would we have to see to stop?"

Good kill criteria are:

- **Observable.** Tied to a metric or an event, not a feeling.
- **Dated.** Checked at a specific point.
- **Owned.** One person calls it.

Examples:

- "If fewer than 15 of 50 pilot accounts use the feature weekly by week 6, stop and write up what we learned."
- "If the integration partner has not shipped their API by the end of Q2, close the epic and move the budget."
- "If build cost passes 2x the estimate before the beta, return to the roadmap review."

An epic closed by its kill criteria is a success of the process. Write an `after-action-report` and move on.

---

## Roadmap fitment

Every epic should trace to a roadmap item and an objective. If it traces to neither, it is either missing from the roadmap or it should not be an epic. See `roadmap-planning` and `okr-design`.

---

## Capitalization stage at the epic level

The epic carries the default stage for its children. Tickets inherit it unless they override. Record the date the stage moves (usually from preliminary to application development when the project is approved and funded). See `capitalization-guide.md`.

# Scoring Template

Two scoring sheets: one for bugs, one for stories and epics. Both record inputs on the item so the score can be re-derived by someone who was not in the room.

The rule for both: if an input is unknown, the item is "unscored" with the missing input named. Do not fill the gap with a plausible number.

---

## Bugs: severity and frequency

Score severity and frequency as two separate fields. Do not combine them into one number. The grid decides queue position.

### Sheet

```
ITEM: [ID and title]
SEVERITY: [S1 / S2 / S3 / S4]  (scale from the ticket-authoring bug template)
Severity evidence: [what makes it this level, e.g., "payroll totals wrong, no workaround"]

FREQUENCY: [high / low]
Frequency evidence:
- Reporter count: [n]
- Affected accounts or users from logs or analytics: [n, source, date range]
- Reproduction rate: [every time / N of M / once]

GRID CELL: [high sev + high freq / high sev + low freq / low sev + high freq / low sev + low freq]
QUEUE POSITION: [from the grid below]
Override (if any): [reason, e.g., "contractual SLA for this account"]
```

### The grid

| | Low frequency | High frequency |
|---|---|---|
| **High severity (S1, S2)** | Next sprint. Note a workaround now. | Top of the queue. Consider interrupting the current sprint. |
| **Low severity (S3, S4)** | Park or decline. Revisit if frequency rises. | Batch with nearby work. Queue behind high-severity items. |

Set the frequency line for your product before you use the grid. For example: "high frequency" means more than 1 percent of weekly active accounts, or more than 5 reporters in 30 days. Write the line down so the grid gives the same answer each week.

---

## Stories and epics: value against effort

Use the model your team already uses. If there is none, RICE is one option. Record every input and where it came from.

### Sheet (RICE shown)

```
ITEM: [ID and title]

REACH: [number of users or accounts per period]
Source: [analytics query, reporter count, segment size]

IMPACT: [3 massive / 2 high / 1 medium / 0.5 low / 0.25 minimal]
Rationale: [one line on what changes for the user]

CONFIDENCE: [100% / 80% / 50%]
Rationale: [what evidence exists: research, reporter count, experiment, hunch]

EFFORT: [person-weeks]
Source: [engineer estimate, name and date]

SCORE: (Reach x Impact x Confidence) / Effort = [n]
```

### Worked line

Reach 400 accounts per quarter (from the usage report), impact 1 (saves a weekly manual step), confidence 80 percent (11 reporters, no research), effort 2 person-weeks (engineer estimate). Score: 400 x 1 x 0.8 / 2 = 160.

### Other models

- **Value, urgency, effort:** three 1 to 5 ratings with a one-line rationale each. Score: (value + urgency) / effort.
- **Cost of delay over duration:** estimate what a week of delay costs, divide by weeks of work. Strong when cost of delay is measurable.

Pick one per team and keep it for at least a quarter. Switching models every month makes every ranking incomparable to the last.

---

## Tasks and spikes

Tasks inherit the score of their parent story. Spikes inherit the score of the decision they unblock. Record the parent, not a new score.

---

## Ties and overrides

- **Ties:** break by cost of delay, then by age (oldest first).
- **Overrides:** allowed, written on the item with a reason and a name. "Customer contract requires a fix by the 30th, approved by [name]." An override with no name is loudest-voice ordering.

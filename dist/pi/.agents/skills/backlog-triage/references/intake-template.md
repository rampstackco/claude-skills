# Intake Template

An intake record is the minimum a request needs before it enters the backlog. It is not a ticket. It is the raw material triage turns into a ticket, a merge, a park, or a decline.

Copy the template, fill every field, and write "unknown" where a field cannot be filled yet. "Unknown" is a question to send, not a blank to ignore.

---

## Template

```
INTAKE ID: [tracker ID or running number]
DATE RECEIVED: [yyyy-mm-dd]
SOURCE: [support queue / sales call / in-app feedback / monitoring alert / incident review / internal request / feedback program]
REPORTER: [name or account, and how to reach them]
REPORTER COUNT: 1
ACCOUNT CONTEXT: [plan, segment, or internal team, if known]

RAW TEXT
[Verbatim. Quote the reporter exactly. Attach screenshots, logs, or call notes.]

AFFECTED AREA
[product area, screen, component, or "unknown"]

FIRST READ (triage lead)
- Likely type: [bug / task / story / spike / epic / unclear]
- Possible duplicates: [IDs, or none found]
- Missing to classify or score: [list, or none]

STATUS: [new / question sent / merged into X / scored / promoted / parked / declined]
```

---

## Field rules

- **Raw text is verbatim.** "User says export is broken" loses the detail. "Clicked Export CSV on the Invoices tab, spinner for 5 minutes, nothing downloaded" is dedupable and reproducible.
- **Reporter must be reachable.** An email, an account ID, or a teammate who owns the relationship. If nobody can be asked a question, the item cannot be made ready.
- **Reporter count starts at 1.** It only goes up through merges. Never estimate it.
- **Affected area can be a guess,** marked as a guess. It drives dedupe search, so a rough area beats none.

---

## Where intake comes from

| Source | Typical shape | What to add at intake |
|---|---|---|
| Support queue | Customer words, often emotional | Account context, ticket link, reproduction attempt by support |
| Sales or success call | Secondhand summary | The customer's own words if recorded, deal or renewal context |
| In-app feedback | Short, anonymous-ish | Account and page from the widget metadata |
| Monitoring alert | Precise, no user context | Affected user count from logs, first-seen date |
| Incident review | Action item | Link to the review, owner, due date from the review |
| Internal request | Often a solution, not a problem | The problem behind the ask. Ask "what happens if we do not do this?" |
| Feedback program | Already themed | The theme's reporter count and source mix from the synthesis |

---

## The question-back message

When an item cannot be classified or scored, send one message with every question at once. Do not drip them.

```
Hi [reporter],

Thanks for flagging [one-line summary]. Before we can prioritize it we need:

1. [Specific question, e.g., "Which browser and which account were you using?"]
2. [Specific question, e.g., "Does this happen every time, or only sometimes?"]
3. [Specific question, e.g., "What were you trying to get done when this happened?"]

We review new items every [day]. If we hear back by then, it goes into that session.
```

Set the item status to "question sent" with the date. If no answer arrives in two sessions, park it with the reason "no response from reporter."

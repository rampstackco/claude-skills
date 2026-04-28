# AAR Template

Fillable after-action report template. Three variations: incident AAR, launch AAR, project closeout AAR. The structure is similar; the inputs and emphasis differ.

---

## Universal sections (used in all three variations)

### Header

```markdown
# AAR: [Event name]

**Type:** [Incident / Launch / Project]
**Date of event:** [YYYY-MM-DD or range]
**AAR date:** [YYYY-MM-DD]
**Severity / scope:** [SEV-1 / Major launch / Project closeout]
**Facilitator:** [Name]
**Participants:** [Names]
**Distribution:** [Internal only / Internal + customers / Public]
```

---

## Variation 1: Incident AAR

### Summary

> [2 to 3 paragraphs. What happened, what was the impact, what was the root cause, what are the top action items. Should stand alone for executives who read only this section.]

### Impact

- **Users affected:** [Number and segment. "All US users" or "Approximately 12% of paid customers in EU."]
- **Duration:** [Detection to resolution]
- **Severity:** [SEV-1 / 2 / 3 / 4]
- **Revenue impact:** [If quantifiable]
- **Customer-facing communication:** [What was said, when]
- **Regulatory implications:** [If any]

### Timeline

| Time | Event | Notes |
|---|---|---|
| T-X | [Pre-incident state, recent deploy, etc.] | |
| T-0 | [Detection event] | |
| T+5min | [Acknowledgment] | |
| T+10min | [Severity assessed, IC assigned] | |
| T+Xmin | [Investigation milestone] | |
| T+Ymin | [Mitigation applied] | |
| T+Zmin | [Verification] | |
| T+Nmin | [Resolution declared] | |
| T+Hours | [Customer comms, post-incident] | |

Timeline source: [Logs, chat, monitoring, IC notes]

### Detection

- **How was it detected?** [Alert / customer report / internal observation]
- **Time to detection:** [From event start to detection]
- **Was detection adequate?** [Should we have detected this faster? How?]

### Response

- **Time to acknowledgment:** [Detection to acknowledgment]
- **Time to mitigation:** [Detection to mitigation]
- **Time to resolution:** [Detection to resolution]
- **Were the right people involved?** [Yes / No, why]
- **Did the response procedure work?** [Yes / No, what gaps]

### Root cause analysis

**Surface symptom:** [What users experienced]

**Five whys:**

1. Why did [symptom] happen? [Answer]
2. Why did [Answer 1] happen? [Answer]
3. Why did [Answer 2] happen? [Answer]
4. Why did [Answer 3] happen? [Answer]
5. Why did [Answer 4] happen? [Answer - often the system fix]

**Or, causal chain (multiple contributing factors):**

- Factor 1 (technical): [Description]
- Factor 2 (configuration): [Description]
- Factor 3 (process): [Description]
- Factor 4 (monitoring): [Description]

### Contributing factors

What didn't cause this but made it worse, or removed safety nets:

- [Factor]
- [Factor]
- [Factor]

### What went well

- [Detection mechanism that worked]
- [Decision that was correct]
- [Tool that performed as designed]
- [Communication that was effective]

### Action items

| Action | Owner | Due | Type | Status |
|---|---|---|---|---|
| [Specific action] | [Name] | [Date] | Monitoring | Open |
| [Specific action] | [Name] | [Date] | Code | Open |
| [Specific action] | [Name] | [Date] | Process | Open |
| [Specific action] | [Name] | [Date] | Documentation | Open |
| [Specific action] | [Name] | [Date] | Training | Open |

### Lessons

[Reflections beyond the action items. Often the most-quoted section in the long term.]

---

## Variation 2: Launch AAR

### Summary

> [2 to 3 paragraphs. What launched, did it go well, what surprised us, what should we do differently next time.]

### Outcomes

- **What launched:** [Specific scope]
- **Launch window:** [Planned vs actual]
- **Maintenance time:** [If applicable]
- **Issues during launch:** [Count and severity]
- **Rollback?:** [Yes / No]
- **Post-launch incidents:** [In the first 7 days]
- **Business outcomes:** [If measurable, e.g., conversion impact]

### Timeline

| Time | Event | Notes |
|---|---|---|
| Pre-launch | [Major decisions, milestones] | |
| Launch start | | |
| Cutover steps | [Each step with timing] | |
| Verification | | |
| Public announcement | | |
| First 24 hours | [Notable observations] | |
| First week | [Notable observations] | |

### What went according to plan

- [Step that worked exactly as runbook described]
- [Communication that was clear]
- [Decision that proved correct]

### What deviated from plan

- [Deviation, why, what we did]
- [Deviation, why, what we did]

### What surprised us

- [Unexpected observation]
- [Unexpected user behavior]
- [Unexpected technical behavior]

### What we'd do differently

- [Change to runbook for next launch]
- [Change to pre-launch QA]
- [Change to communication plan]

### What we'd repeat

- [Practice that worked, want to keep]

### Action items

| Action | Owner | Due | Type | Status |
|---|---|---|---|---|
| [Specific action] | | | | |

### Lessons

[Reflections.]

---

## Variation 3: Project closeout AAR

### Summary

> [2 to 3 paragraphs. What we set out to do, what we delivered, what we learned, what comes next.]

### Goals vs outcomes

| Goal | Outcome | Notes |
|---|---|---|
| [Original goal 1] | [Met / Partially met / Not met] | [Notes] |
| [Original goal 2] | [Met / Partially met / Not met] | [Notes] |
| [Original goal 3] | [Met / Partially met / Not met] | [Notes] |

### Timeline

| Phase | Planned | Actual | Variance |
|---|---|---|---|
| Discovery | | | |
| Design | | | |
| Build | | | |
| QA | | | |
| Launch | | | |

### What went well

- [Practice / decision / process that worked]
- [Practice / decision / process that worked]
- [Practice / decision / process that worked]

### What didn't go well

- [Pain point with system-level explanation]
- [Pain point with system-level explanation]

### What surprised us

- [Surprising input from users / market / internal]
- [Surprising scale / complexity / opportunity]

### What we'd do differently

For people working on similar projects in the future:

- [Specific change]
- [Specific change]
- [Specific change]

### Decisions in retrospect

| Decision | Was it right? | Why or why not |
|---|---|---|
| [Major decision 1] | | |
| [Major decision 2] | | |
| [Major decision 3] | | |

### Action items

| Action | Owner | Due | Type | Status |
|---|---|---|---|---|
| [Specific action] | | | | |

### Lessons

[Reflections.]

### Recommendations for next phase

[If the project continues. Otherwise, recommendations for what builds on this work.]

---

## Universal facilitator guide

### Before the meeting (pre-work)

- Send the timeline draft to all participants
- Ask each participant to write their personal account of what they observed and did (1 to 2 paragraphs each)
- Compile contributing data: logs, metrics, ticket counts, customer feedback
- Send participants the agenda 24 hours in advance

### During the meeting

- Set the tone in the first 60 seconds: "This is blameless. Focus on systems, not individuals."
- Walk the timeline. Add corrections from participants.
- For root cause: ask "why" until the answers stop being substantive. Note when it shifts from technical to process.
- For action items: insist on specificity, owner, date.
- Don't let the meeting become a debugging session. Investigation happened before; this is for analysis.
- Capture the document live where possible. Edits in real time prevent recall errors.

### After the meeting

- Polish the document within 48 hours
- Distribute to broader audience
- File action items into a tracking system
- Schedule follow-up to verify action items closed (typically 30 days out)

---

## Common AAR anti-patterns

| Anti-pattern | What it looks like | Better |
|---|---|---|
| Naming and shaming | "Sarah deployed the bug" | "Our review process didn't catch the issue. Why? What checklist or test would have?" |
| Generic actions | "Improve testing" | "Add a test for X scenario to the existing test suite by [date]" |
| No follow-through | Action items filed, never tracked | Action item review at next AAR; pattern of unclosed items surfaces |
| Skipping success | Only failures discussed | Equal time to what went well |
| Sole authorship | One person writes the AAR | Group discussion + sole author for polish |
| Long delay | AAR happens 2 months later | AAR within 2 weeks of event |
| Skipping minor incidents | "Not worth the time" | Patterns hide in the minors |

---
name: after-action-report
description: "Run a structured after-action review (postmortem, retrospective) on a launch, incident, or completed project to capture timeline, root cause analysis, contributing factors, and actionable lessons. Use this skill whenever the user wants to run a postmortem, retrospective, AAR, or after-action review on any past event. Triggers on after-action report, AAR, postmortem, retrospective, retro, post-incident review, what went well what didn't, lessons learned, blameless postmortem, root cause analysis, RCA, five whys. Also triggers when the user has just shipped something or just resolved an incident and wants to capture learnings."
---

# After-Action Report

Run a structured retrospective on a launch, incident, or completed project. Produce actionable lessons, not just a document.

This skill is for after-the-fact analysis. For active incident response, use `incident-response`. For planning launches, use `launch-runbook`.

---

## When to use

- After any incident (any severity)
- After every major launch
- At the end of a project (sprint retro, quarterly retro, project closeout)
- When a recurring issue has happened enough times to demand investigation
- When a decision didn't work out and the team wants to learn

## When NOT to use

- During an active incident (use `incident-response`)
- For pre-launch planning (use `launch-runbook`)
- For one-off bug fixes that don't merit broad analysis

---

## Required inputs

- The event being analyzed (incident, launch, project)
- A timeline reconstructed from logs, chat, tickets
- Participant accounts of what they observed and did
- Outcomes and impact (what actually happened to users, the business)

---

## The framework: blameless analysis

The most important principle: blameless. Without it, retrospectives produce hidden information and theatrical lessons rather than real ones.

### What blameless means

- Focus on systems, not individuals
- Assume everyone made reasonable decisions given what they knew at the time
- The question is "why was this decision reasonable to make?" not "who screwed up?"
- Fixing the system means the next person in that situation succeeds where this person didn't

### What blameless does not mean

- No accountability (action items still have owners)
- No hard truths (sometimes the system is broken in obvious ways)
- No standards (some patterns of failure are individual, not systemic)
- No discomfort (real reflection is uncomfortable)

---

## The framework: 6 sections

A complete AAR covers six sections.

### 1. Summary

A 2 to 3 paragraph overview. Captures:

- What happened
- Impact (users, business, time)
- Root cause (in plain language)
- Top action items

This is what executives read. Anyone who reads only this section should leave with the most important information.

### 2. Timeline

A reconstructed timeline of events.

For incidents:
- T-0: Detection
- T+X: Acknowledgment
- T+Y: Severity assessed, IC assigned
- T+Z: Investigation began
- ... mitigation, communication, resolution events
- T+N: Resolution declared

For launches:
- Pre-launch decisions and milestones
- Launch day events
- Post-launch monitoring observations

For projects:
- Major milestones, decisions, pivots
- Both planned and emergent

The timeline is the source of truth. Disagreements about what happened get resolved here.

### 3. Root cause analysis

What caused this, in plain language.

Use one or both of:

**Five whys.** Start with the surface symptom. Ask "why?" Repeat 5 times (or until you reach a true root). Each "why" should yield a substantive answer, not a tautology.

Example:
- Why did the site go down? Database connection pool exhausted.
- Why was the pool exhausted? Background job opened too many connections.
- Why did the background job open too many connections? Connection cleanup code didn't run on errors.
- Why didn't cleanup run on errors? Original code review didn't cover error paths.
- Why didn't the review cover error paths? No checklist for error handling in our review process.

The fifth why often reveals the system fix. In this case: improve the review process.

**Causal chain.** Multiple contributing factors that combined.

- Factor 1: Background job opened too many connections (technical)
- Factor 2: Connection limit was set too low for actual traffic (configuration)
- Factor 3: No alert on connection pool saturation (monitoring)
- Factor 4: Recent traffic doubled without infra capacity review (process)

No single fix addresses the incident. Multiple gaps need attention.

### 4. Contributing factors

Factors that didn't cause the event but made it worse, or removed safety nets that would have caught it.

- Monitoring gaps
- Documentation gaps
- Process gaps
- Tooling gaps
- Knowledge gaps

A "would have been caught earlier if..." factor.

### 5. What went well

Real lessons require capturing successes, not just failures.

- What detection worked?
- What response worked?
- What decisions were good?
- What tools or processes performed as expected?

This is not consolation. It's calibration. Things that worked here should be reinforced and replicated.

### 6. Action items

Specific, owned, dated.

| Action | Owner | Due | Type |
|---|---|---|---|
| Add alert on connection pool saturation | [name] | [date] | Monitoring |
| Add error handling checklist to PR template | [name] | [date] | Process |
| Audit other background jobs for similar issue | [name] | [date] | Code |

**Action item criteria:**

- **Specific.** "Improve monitoring" is not actionable. "Add alert on connection pool saturation, threshold 80%, page on-call" is.
- **Owned.** A name. Not "the team."
- **Dated.** A real date. Not "soon."
- **Sized.** Roughly hours, days, or weeks of effort.
- **Closeable.** Definition of done is clear.

Action items that don't close in their committed timeframe should re-surface in the next AAR. Patterns of unclosed actions point to deeper organizational issues.

---

## Workflow

### 1. Schedule the AAR

Within 1 to 2 weeks of the event. Long enough that emotions cooled and facts gathered. Short enough that memories are fresh.

For incidents: pre-decided in the response procedure.
For launches: schedule on the runbook.
For projects: schedule at project closeout.

### 2. Gather inputs

Before the meeting:

- Reconstructed timeline (often the scribe's notes if there was one)
- Logs, chat transcripts, tickets, incident updates
- Individual accounts from each participant (written, before the meeting)
- Impact data (users affected, duration, revenue impact, etc.)

### 3. Run the meeting

Typical agenda (60 to 90 minutes):

- Read the summary as drafted (5 min)
- Walk the timeline together. Add corrections. Resolve disagreements. (20 to 30 min)
- Discuss root cause. Use five whys or causal chain. (15 to 20 min)
- Discuss contributing factors. (10 min)
- Discuss what went well. (10 min)
- Identify action items. Owners and dates. (10 min)

A facilitator runs the meeting. Often the IC for an incident, or a project lead for a project. The facilitator is not the scribe.

### 4. Write the document

Within a few days of the meeting. The full AAR includes all 6 sections.

### 5. Distribute

Internal: post in a known location. Make searchable. Reference in onboarding.

For high-severity incidents: external summary may be appropriate (status page, customer email, public blog).

### 6. Track action items

Every action item should be tracked to closure. The next AAR re-surfaces unclosed ones.

---

## Failure patterns

- **Skipping the AAR for "small" incidents.** Patterns get missed.
- **Naming and shaming.** Real lessons get hidden when people fear blame.
- **Generic action items.** "Improve testing" instead of specific testing change.
- **Action items that never close.** Filed, forgotten. Same incident recurs.
- **Theater retrospectives.** Going through the motions without genuine reflection.
- **Skipping "what went well."** Misses calibration on what's working.
- **Blame externalized.** "Our vendor failed." OK, what's our system for vendor risk?
- **Single-person AAR.** One person writes the whole thing. Misses other perspectives.
- **AAR only for failures.** Successful launches deserve AARs too. Lessons from success are valuable.
- **Long delays.** Memories fade. Conversations cool. Get it done within 2 weeks.

---

## Output format

A markdown document at `aar-[date]-[event-name].md`.

Structure:

```markdown
# AAR: [Event name]

**Date of event:** [YYYY-MM-DD]
**AAR date:** [YYYY-MM-DD]
**Severity / scope:** [SEV-1 / Major launch / Project closeout]
**Facilitator:** [Name]
**Participants:** [Names]

## Summary
[2 to 3 paragraphs]

## Impact
- Users affected: [number, segment]
- Duration: [time]
- Revenue / business impact: [if applicable]

## Timeline
[Timestamped events]

## Root cause analysis
[Five whys or causal chain]

## Contributing factors
[List]

## What went well
[List]

## Action items
| Action | Owner | Due | Type | Status |
|---|---|---|---|---|
| | | | | |

## Lessons
[Reflections that don't fit elsewhere. Often the most quotable section.]
```

---

## Reference files

- `references/aar-template.md` - Fillable AAR template covering incidents, launches, and projects.

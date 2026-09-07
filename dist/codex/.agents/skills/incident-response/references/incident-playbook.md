# Incident Playbook

The reference document during an incident. Severity definitions, role responsibilities, communication templates, and decision rubrics.

---

## Severity rubric

### SEV-1: Critical

**Definition:**
- Major customer-facing functionality completely broken
- Data loss or data integrity at risk
- Active security breach or vulnerability being exploited
- Significant revenue impact ongoing

**Response:**
- All-hands response activated
- Incident commander assigned (within 10 minutes of detection)
- War room (video call) opened
- Public status page updated immediately
- Executive notification within 15 minutes
- Customer-facing communication within 30 minutes

**Acknowledgment SLA:** 5 minutes
**Update cadence:** Every 15 minutes
**Resolution target:** As fast as humanly possible

### SEV-2: Major

**Definition:**
- Significant degradation affecting many users
- Important feature unavailable
- Performance severely degraded
- Revenue impact, but limited

**Response:**
- Incident commander assigned (within 30 minutes)
- Active investigation in incident channel
- Status page updated
- Internal communication to broader org
- Public communication if customer-facing

**Acknowledgment SLA:** 15 minutes
**Update cadence:** Every 30 minutes
**Resolution target:** Within hours

### SEV-3: Minor

**Definition:**
- Limited impact (specific feature, specific user segment)
- Workaround available
- No revenue impact, or minor

**Response:**
- Single owner assigned
- Standard on-call response
- No status page update unless customer-facing
- No public communication unless trending

**Acknowledgment SLA:** 1 hour
**Update cadence:** As progress dictates
**Resolution target:** Within a day

### SEV-4: Low

**Definition:**
- Cosmetic issue
- Edge case affecting few users
- No customer impact

**Response:**
- Track as bug, not incident
- Address in normal queue

**Acknowledgment SLA:** Next business day
**Resolution target:** As prioritized

---

## Roles

### Incident Commander (IC)

**Responsibilities:**
- Owns the response
- Makes decisions when options exist
- Assigns work to others
- Decides when to escalate severity
- Decides when to declare resolution
- Coordinates without doing technical work themselves

**NOT the IC's job:**
- Doing the actual debugging
- Speculating about cause publicly
- Writing status page updates (delegates to comms lead)

**Selection criteria:** Calm under pressure, good at coordination, clear communicator. Does not need to be the most senior or most technical.

### Communications Lead

**Responsibilities:**
- Posts internal updates on schedule
- Drafts status page updates
- Coordinates with customer support
- Drafts executive notifications
- Manages external messaging

**Removes:** Communication burden from IC and ops lead.

### Operations Lead

**Responsibilities:**
- Drives the technical investigation
- Identifies the cause
- Identifies and applies mitigations
- Coordinates with subject matter experts
- Verifies fixes

### Scribe

**Responsibilities:**
- Captures the timeline as the incident unfolds
- Records decisions and rationale
- Records actions taken
- Provides material for the AAR

**Often filled by:** A junior engineer (good learning experience), someone not in the active investigation, or anyone tasked specifically with note-taking.

### Subject Matter Experts (SMEs)

Pulled in as needed. Service owners, database experts, security experts, third-party vendors. Pulled by IC, not self-deploying.

---

## Status page templates

### SEV-1 / SEV-2 initial

> "We are currently investigating reports of [user-facing description of impact]. Affected users may experience [specific symptoms]. We will update by [time, typically +30 minutes]."

### Identified

> "We have identified the cause of the issue affecting [scope]. Engineers are deploying a fix. Next update by [time]."

### Monitoring

> "A fix has been applied. We are monitoring to confirm full resolution. Next update by [time]."

### Resolved

> "This incident has been resolved. All services have returned to normal. A full incident report will be posted within [typically 1 week]. Thank you for your patience."

### Patterns to avoid

| Avoid | Why | Use instead |
|---|---|---|
| "Some users may be experiencing issues" | Vague | "Users in [region] may experience [specific symptom]" |
| "We are working on it" | Empty | "Engineers are investigating [hypothesis or symptom]" |
| "Should be resolved shortly" | Speculative | "Next update by [specific time]" |
| "We apologize for the inconvenience" | Hollow | Acknowledge specifically, then state action |
| Technical jargon | Excludes users | Plain language describing user experience |
| Blame language | "Our database vendor failed" | Focus on user impact and our response |

---

## Decision rubrics

### Should we roll back?

Roll back if:
- A recent deploy correlates with the start of the incident
- Rollback can be completed safely
- The risk of leaving the broken state exceeds the risk of rollback

Don't roll back if:
- The incident clearly predates the recent deploy
- Rollback would cause data loss or worse impact
- A targeted fix is available and faster

When unsure: roll back. Recovery from rollback is usually cheaper than continued debugging in a broken state.

### Should we declare SEV-1?

Declare SEV-1 if any are true:
- Most users cannot use the core product
- Revenue is being lost at significant rate
- Data integrity is at risk
- A security breach is happening
- Senior leadership awareness is required

When unsure between SEV-1 and SEV-2: start with SEV-1. Easier to de-escalate than to scale up.

### Should we communicate publicly?

Communicate publicly if any are true:
- Customers are experiencing impact and will notice
- Customer support is receiving inquiries
- The incident is visible externally (status page, social media chatter)
- Regulatory notification may be required (data breach, certain financial systems)

Don't communicate publicly if:
- Impact is invisible to users
- Confidence is high that it will be resolved before users notice (but lean toward communication)

When unsure: communicate. Silence on the status page is worse than a brief acknowledgment.

### Should we escalate?

Escalate to senior leadership if:
- Severity has reached SEV-1
- Resolution is taking longer than expected at SEV-2
- Decisions are needed that exceed the IC's authority
- Reputational risk is material

---

## On-call rotation principles

A healthy on-call:

- **Rotates regularly.** Same person on call indefinitely is unsustainable.
- **Has a clear primary and secondary.** Backup if primary is unavailable.
- **Has documented runbooks.** On-call is not pop quiz.
- **Has acknowledgment SLAs that match severity.** A 1-hour SLA on SEV-1 is too slow.
- **Is paid or compensated** in some form. Time on-call has cost.
- **Includes a hand-off ritual.** Outgoing on-call briefs incoming on open issues, recent deploys, hot spots.

Anti-patterns:

- One person who is "always on" because they know the system best
- On-call without monitoring (you can only respond to what you know)
- On-call who lacks production access (cannot mitigate)
- No primary/backup, just one person

---

## Common mitigation patterns

| Symptom | Try first |
|---|---|
| Errors after recent deploy | Roll back the deploy |
| Errors with no recent deploy | Check third-party dependencies, recent config changes |
| Database errors | Check connection pool, recent query changes, capacity |
| Latency spike | Check load, capacity, slow downstream |
| Specific feature broken | Feature flag off if available |
| Security incident | Isolate affected systems, rotate credentials, preserve logs |
| Data integrity issue | Stop writes, snapshot, investigate before continuing |

When unsure of cause but mitigation is available: mitigate. Investigate cause separately.

---

## After the incident

Once resolved:

1. Final status page update (resolved)
2. Final internal update
3. Capture initial timeline (the scribe's notes)
4. Identify obvious follow-up action items, file tickets
5. Schedule AAR within 1 to 2 weeks
6. Hand off any monitoring to normal operations

In the next 24 to 48 hours, while memory is fresh:

- Each participant writes their own brief account of what they observed and did
- These individual accounts become primary source material for the AAR
- This avoids reconstruction errors that come from trying to piece together what happened weeks later

---

## Anti-patterns to call out

- **Hero culture.** One person stays up all night to fix it; gets praised. Real lesson: the system is too brittle, and the team has too little redundancy.
- **Blame in retrospectives.** "Whose fault was this?" produces hidden mistakes next time.
- **Skipping AARs for "minor" incidents.** The minor incidents are often the patterns that predict major ones.
- **Action items that never close.** Action items get filed, never actioned. The same incident recurs.
- **Status pages updated only at start and end.** "Updating every 30 minutes" with the same content is still better than silence.
- **Investigating root cause while users are impacted.** Mitigate first.

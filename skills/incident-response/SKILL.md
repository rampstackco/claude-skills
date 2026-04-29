---
name: incident-response
description: "Manage active production incidents through detection, triage, mitigation, communication, and resolution with structured roles and decision-making. Use this skill whenever the user has an active incident, a production issue, a service outage, a security incident, or needs to plan incident response procedures. Triggers on incident response, production incident, outage, service down, site down, P0, P1, severity, downtime, on-call, incident commander, status page, postmortem prep. Also triggers when something is actively broken in production and the user is figuring out what to do."
---

# Incident Response

Manage active production incidents from detection to resolution. Stack-agnostic. Tool-agnostic.

This skill is for active incidents and incident process. For after-the-fact analysis, use `after-action-report`. For planned launches, use `launch-runbook`.

---

## When to use

- An active incident is happening
- Building incident response procedures
- Defining severity levels
- Setting up on-call rotations
- Training a team on incident response

## When NOT to use

- Post-incident retrospective (use `after-action-report`)
- Planned launches (use `launch-runbook`)
- Pre-launch issue triage (use `qa-testing`)

---

## Required inputs

- Awareness of the incident (alert, customer report, internal observation)
- Access to production systems and monitoring
- Roles and authorities clearly defined
- Communication channels operational

---

## The framework: 5 phases

### 1. Detection

How the incident becomes known.

**Detection sources:**

- Automated alerts (monitoring, SLO violations, error rate spikes)
- Customer reports (support tickets, social media, status page subscribers)
- Internal observation (engineer notices something off)
- Third-party (security researchers, partners)

**On detection:**

- Acknowledge within target time (typically 5 to 15 minutes for critical)
- Assess severity (see severity rubric below)
- Page the on-call if not already paged
- Open the incident channel

### 2. Triage

Establish severity and impact.

**Severity rubric:**

| Severity | Definition | Response |
|---|---|---|
| SEV-1 (Critical) | Major customer-facing functionality broken. Data integrity at risk. Security breach. | All-hands. Incident commander. Active war room. Public communication required. |
| SEV-2 (Major) | Significant degradation. Some customers affected. Revenue impact. | Incident commander assigned. Active response. Internal communication. May or may not need public communication. |
| SEV-3 (Minor) | Limited impact. Workaround available. Affecting a small group of users. | Standard on-call response. Single owner. |
| SEV-4 (Low) | Cosmetic, edge-case, or low-frequency. No urgent action needed. | Tracked as bug. Addressed in normal queue. |

Severity can change. Re-evaluate as more info emerges.

### 3. Mitigation

Stop the bleeding before fixing the cause.

**Mitigation patterns (faster than full fix):**

- **Rollback** (revert recent deploy)
- **Feature flag off** (disable the broken feature without deploy)
- **Failover** (route to healthy replica or region)
- **Scale up** (more capacity to absorb the load)
- **Throttle** (reject some traffic to protect the rest)
- **Graceful degradation** (turn off non-essential features to keep core functional)
- **Maintenance mode** (last resort, blocks all users)

**Mitigation principle:** Stop user impact first. Cause analysis second.

### 4. Communication

Three audiences during an incident:

**Internal team:**
- Real-time updates in incident channel
- Cadence: every 15 minutes minimum during active incident
- Format: timestamped status updates with what we know, what we're doing, ETA

**Internal stakeholders:**
- Higher-level updates to broader org
- Cadence: every 30 to 60 minutes
- Format: business-impact framing, not technical detail

**External / customers:**
- Status page updates
- Cadence: every 30 minutes minimum during active incident
- Format: plain language, no blame, what users are experiencing, what to expect

**Communication principles:**
- Acknowledge before you have answers ("We're aware and investigating")
- Update on schedule even if no progress ("Still investigating, no new information")
- Never speculate publicly about cause
- Confirm resolution explicitly when restored

### 5. Resolution

Verified fix, customers restored, incident closed.

**Resolution criteria:**

- Mitigation in place and verified
- Root cause identified (or explicitly deferred to AAR)
- All affected systems back to normal
- Customers can resume normal use
- Final status update posted (internal and external)
- Incident channel can be closed (or archived for AAR)

After closure:
- Schedule AAR within 1 to 2 weeks
- Capture initial timeline while memories are fresh
- Track follow-up action items

---

## Roles during an incident

| Role | Responsibility |
|---|---|
| Incident commander (IC) | Owns the response. Calls decisions. Assigns work. Not necessarily the most technical person; needs to coordinate. |
| Communications lead | Owns internal and external messaging. Reduces IC's communication burden. |
| Operations lead | Drives the technical investigation and mitigation. Often the most senior on-call engineer. |
| Scribe | Captures the timeline as the incident unfolds. Critical for AAR. |
| Subject matter experts | Pulled in as needed. Service owners, database experts, security experts. |

For small teams or low-severity incidents, one person can hold multiple roles. Each role's responsibilities should still be explicit.

---

## Decision-making during an incident

**The IC's authority:**

- Call rollback or other mitigations
- Pull additional people in
- Escalate severity
- Make the call when unclear options exist

**Non-decisions to avoid:**

- "Let's wait and see" when mitigations are available and impact is occurring
- Discussing root cause while users are actively impacted (mitigate first)
- Premature resolution announcements before verification
- Death-by-committee (pull in lots of people, no one decides)

When in doubt: act. A wrong action that can be rolled back beats inaction while users suffer.

---

## Status page communication patterns

**Initial:**
> "We are investigating reports of [issue]. Updates to follow."

**Identified:**
> "We have identified the issue affecting [scope]. Engineers are working on a fix. Next update by [time]."

**Monitoring:**
> "A fix has been applied. We are monitoring to confirm resolution. Next update by [time]."

**Resolved:**
> "This incident has been resolved. Service has been restored. A full incident report will be posted within [timeframe]."

Patterns to avoid:

- Vague language ("experiencing some issues" - what kind?)
- Missing affected scope ("login is down" - everywhere or just one region?)
- Missing time commitments
- "Should be resolved soon" without verification
- Using "back up" before verification

---

## Workflow

1. **Acknowledge.** First responder acknowledges within target time.
2. **Assess severity.** Use the rubric. Open the appropriate response channel.
3. **Assign roles.** IC, comms, ops at minimum.
4. **Communicate.** Initial status update. Internal channel active.
5. **Investigate.** Logs, metrics, recent changes. The four most common causes: a recent deploy, a configuration change, a third-party dependency change, a load spike.
6. **Mitigate.** Stop the bleeding. Don't wait for full root cause.
7. **Verify mitigation.** Don't trust dashboards alone; test the user flow.
8. **Communicate resolution.** Internal and external.
9. **Close incident.** Final timeline noted. Action items tracked.
10. **Schedule AAR.** Within 1 to 2 weeks.

---

## Failure patterns

- **No clear IC.** Multiple people debugging in parallel, no coordination. Slower to mitigate, easier to make conflicting changes.
- **Skipping mitigation, going straight to root cause.** Users keep suffering while engineers debug.
- **Premature "all clear."** Announcing resolution before verification.
- **Communication silence.** Users don't know if anyone is working on it.
- **Status updates too vague.** "We're working on it" with no detail.
- **Speculating publicly about cause.** Often wrong, always damaging trust.
- **Pulling in too many people.** Coordination overhead exceeds value.
- **No scribe.** The timeline gets lost. AAR has to reconstruct from chat logs.
- **Skipping AAR for "minor" incidents.** Patterns get missed. Lessons get re-learned.
- **Blame culture.** People hide mistakes, incidents take longer.

---

## Output format

During an active incident: incident channel updates and status page updates as per the framework above.

After incident close: a brief incident summary feeding into the AAR.

```markdown
# Incident: [Brief title]

**Date:** [YYYY-MM-DD]
**Severity:** [SEV-1 / 2 / 3 / 4]
**Duration:** [Detection to resolution]
**Customer impact:** [Who, how many, how]

## Summary
[1 to 2 paragraphs]

## Timeline
[Timestamped events]

## Mitigation
[What was done]

## Action items
[Follow-ups, with owners]

## AAR scheduled for
[Date]
```

---

## Reference files

- `references/incident-playbook.md` - Severity definitions, roles, status page templates, decision rubrics.

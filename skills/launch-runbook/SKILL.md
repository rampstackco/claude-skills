---
name: launch-runbook
description: "Plan and execute a launch runbook covering pre-launch verification, go-live procedures, DNS cutover, post-launch monitoring, and rollback procedures. Use this skill whenever the user is preparing to launch a website or product, planning a DNS cutover, building a go-live checklist, or executing a launch day. Triggers on launch runbook, go-live, launch day, DNS cutover, deploy to production, site launch, product launch, cutover plan, launch checklist, deployment procedure. Also triggers when a launch is approaching and the team needs structured coordination, even if 'runbook' is not explicitly stated."
---

# Launch Runbook

Plan and execute the launch of a website, product, or major release. The runbook is the document everyone uses on launch day. Stack-agnostic.

This skill is for the launch event. For pre-launch QA, use `qa-testing`. For post-launch incident handling, use `incident-response`.

---

## When to use

- Launching a new website or major redesign
- Migrating from one platform to another
- Releasing a major product or feature
- Coordinating cross-team launches
- Building a runbook for a recurring deploy

## When NOT to use

- Pre-launch testing (use `qa-testing`)
- Post-launch incident response (use `incident-response`)
- After-launch retrospective (use `after-action-report`)

---

## Required inputs

- The launch scope (what's being launched)
- The launch window (date, time, duration)
- The team (roles, on-call rotation)
- The rollback criteria (when to abort)
- The communication plan (who tells whom what, when)

---

## The framework: 4 phases

A launch has four phases. The runbook covers all four.

### Phase 1: Pre-launch (T-30 days to T-1 hour)

Verify everything is ready before the launch window.

**T-30 days:**
- Final scope locked
- Cross-team commitments confirmed
- Pre-launch QA scheduled
- Comms plan drafted

**T-7 days:**
- Pre-launch QA complete
- All critical and major issues resolved
- Performance baseline measured
- Rollback procedures documented and tested
- DNS TTL lowered (if DNS change is part of launch)

**T-1 day:**
- Final go/no-go meeting
- Roles confirmed
- Communication channels set up
- Backup of current production state

**T-1 hour:**
- Team assembled in shared communication channel
- Tools and access verified
- Final smoke test on staging

### Phase 2: Cutover (T-0)

The actual launch. Sequenced steps with owners and verifications.

**Standard cutover steps:**

1. Announce start to internal team
2. Enable maintenance mode (if applicable)
3. Run final database migrations (if applicable)
4. Deploy code to production
5. Verify deploy completed without errors
6. Run smoke tests on production
7. DNS cutover (if applicable)
8. Verify DNS propagation
9. Disable maintenance mode
10. Run full smoke tests on production
11. Announce launch to internal team
12. Begin monitoring window

Each step has:
- Owner
- Pre-conditions
- Action
- Verification
- Time estimate
- Rollback procedure

### Phase 3: Verification (T+0 to T+24 hours)

Confirm the launch is healthy.

**Within first hour:**
- Critical user flows working (checkout, signup, login)
- No spike in error rates
- Performance within expected ranges
- Analytics tracking firing
- Email and notifications working

**Within first 24 hours:**
- No regression in key business metrics
- No accumulating error patterns
- Core Web Vitals stable
- Search Console showing no critical issues (if SEO-relevant)

### Phase 4: Stabilization (T+24 hours to T+7 days)

Monitor the long tail.

- Track error rates day over day
- Track performance day over day
- Track key business metrics vs baseline
- Address any non-blocking issues identified
- Plan the AAR (after-action report)

---

## Roles and responsibilities

A launch has clear role assignments. Ambiguity here is the most common cause of launch chaos.

| Role | Responsibility |
|---|---|
| Launch lead | Owns the runbook. Calls go/no-go. Calls rollback. |
| Deploy operator | Executes the technical deploy steps. |
| QA lead | Runs verification tests and confirms each milestone. |
| Comms lead | Posts internal updates, manages external messaging. |
| On-call engineer | Available for issues during and after launch. |
| Stakeholder rep | Approves on behalf of business stakeholders. |

For small teams, one person may fill multiple roles. Each role's responsibilities should still be explicit.

---

## Rollback criteria

Define before the launch. Decisions are easier to make pre-emptively than under pressure.

**Automatic rollback triggers:**
- Error rate exceeds X percent of normal
- Critical user flow (defined) is broken
- Database integrity issue
- Security vulnerability discovered post-deploy

**Discretionary rollback triggers:**
- Performance degradation beyond Y percent
- Significant degradation in key business metric
- Customer-facing error patterns

**Decision authority:** The launch lead calls rollback. Pre-define who acts as deputy if launch lead is unavailable.

---

## Communication plan

### Internal channels

- **Primary launch channel:** Real-time chat for the launch team only
- **Status channel:** Broader internal updates
- **War room:** Optional video call for high-stakes launches

### Update cadence during launch

- Every 15 minutes during cutover
- Every hour during verification phase
- Daily during stabilization phase

### External communication

- **Customer-facing announcement:** Pre-drafted, scheduled to publish at confirmed-success milestone
- **Status page:** Updated proactively if any user impact
- **Support team:** Briefed in advance on what's launching, common questions, escalation path

---

## Workflow

1. **Build the runbook 30 days out.** Scope, sequence, roles, rollback criteria, comms plan.
2. **Test the rollback procedure.** Untested rollback is hope, not procedure.
3. **Run a tabletop exercise.** Walk through the runbook with the full team. Find gaps.
4. **Lower DNS TTL** 48 to 72 hours before launch (if DNS change is part of launch).
5. **Day-of:** Run the runbook step by step. Verify each step before moving to next.
6. **Monitor.** First hour, first day, first week. Document anything noteworthy.
7. **Schedule the AAR** within 1 to 2 weeks of launch.

---

## Failure patterns

- **Runbook written by one person, not reviewed.** Single perspective misses scenarios.
- **No tested rollback.** Discovering rollback is broken at the moment you need it.
- **Vague step descriptions.** "Deploy to production" without specifying which tool, which command, which environment.
- **No verification step after each action.** Errors propagate.
- **Communication gaps.** Team doesn't know launch is happening, or doesn't know it succeeded.
- **Launching at end of day Friday.** Or before a holiday. Reduce the time available to respond.
- **Skipping pre-launch QA** to hit a date. The bugs appear on launch day instead.
- **Launch fatigue.** Long launches without breaks lead to errors. Plan rest cycles for multi-day launches.
- **No on-call for first 24 hours.** Someone must be reachable.

---

## Output format

Default output: a markdown runbook at `launch-runbook-[project].md` plus supporting checklists.

Structure:

1. Launch metadata (what, when, who)
2. Roles and responsibilities
3. Pre-launch checklist (T-30, T-7, T-1, T-1hr)
4. Cutover sequence (numbered steps, owners, verifications)
5. Rollback procedure
6. Rollback criteria (automatic and discretionary)
7. Communication plan
8. Verification checklist (first hour, first day)
9. Stabilization plan (first week)
10. Contacts (escalation paths, on-call)

---

## Reference files

- `references/runbook-template.md` - Fillable runbook template with example cutover sequences.

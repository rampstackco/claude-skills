# Launch Runbook Template

Fillable runbook for a launch. Copy this template, fill in specifics for your launch.

---

## Launch metadata

**What's launching:** [Specific scope. "New marketing site at example.com replacing the legacy site."]

**Launch date:** [YYYY-MM-DD]

**Launch window start:** [Time, timezone]

**Launch window end:** [Time, timezone]

**Maintenance window required:** [Yes / No, and if yes, expected duration]

**Launch lead:** [Name + contact]

**Deputy launch lead:** [Name + contact, in case primary is unavailable]

---

## Roles

| Role | Person | Backup | Contact |
|---|---|---|---|
| Launch lead | | | |
| Deploy operator | | | |
| QA lead | | | |
| Comms lead | | | |
| On-call engineer (post-launch) | | | |
| Stakeholder rep | | | |

---

## Pre-launch checklist

### T-30 days
- [ ] Final scope locked and signed off
- [ ] Cross-team commitments confirmed
- [ ] Pre-launch QA scheduled
- [ ] Communications plan drafted
- [ ] Rollback procedure documented

### T-14 days
- [ ] Pre-launch QA in progress
- [ ] Performance baseline measured (current production)
- [ ] Critical and major issues triaged
- [ ] Internal launch announcement drafted

### T-7 days
- [ ] All critical issues resolved
- [ ] All major issues resolved or accepted with mitigation
- [ ] Rollback procedure tested in staging
- [ ] DNS TTL lowered to 60 to 300 seconds (if DNS change is part of launch)
- [ ] Final go/no-go date confirmed

### T-2 days
- [ ] Final go/no-go meeting held
- [ ] Decision: GO / NO-GO / DEFER
- [ ] All team members confirmed available for launch window
- [ ] Backup of current production state taken
- [ ] Customer support briefed on what's launching

### T-1 day
- [ ] Final smoke test on staging passes
- [ ] Communication channels set up
- [ ] On-call rotation confirmed for first 24 hours
- [ ] Pre-drafted internal and external messaging ready

### T-1 hour
- [ ] Team assembled in launch communication channel
- [ ] All required tools and access verified
- [ ] Final smoke test on staging passes
- [ ] Launch lead confirms GO

---

## Cutover sequence

For each step:
- **Owner:** Person executing
- **Pre-condition:** What must be true to start
- **Action:** What to do
- **Verification:** How to confirm success
- **Estimated time:** How long this should take
- **Rollback:** What to do if this step fails

---

### Step 1: Announce start

- **Owner:** Comms lead
- **Pre-condition:** Launch lead has confirmed GO
- **Action:** Post in internal status channel: "Starting launch of [scope] at [time]. Expected duration: [X minutes]."
- **Verification:** Message posted, key stakeholders confirmed they saw it
- **Time:** 2 minutes

### Step 2: Enable maintenance mode

- **Owner:** Deploy operator
- **Pre-condition:** Step 1 complete
- **Action:** [Specific command or action to enable maintenance mode]
- **Verification:** Visit production URL, confirm maintenance page is showing
- **Time:** 2 minutes
- **Rollback:** Disable maintenance mode

### Step 3: Final database migrations

- **Owner:** Deploy operator
- **Pre-condition:** Step 2 complete, database backup confirmed
- **Action:** [Specific migration command]
- **Verification:** Migration log shows success, schema verified
- **Time:** [estimate]
- **Rollback:** Restore from backup taken in T-2

### Step 4: Deploy code to production

- **Owner:** Deploy operator
- **Pre-condition:** Step 3 complete
- **Action:** [Specific deploy command or CI trigger]
- **Verification:** Deploy log shows success, version endpoint returns new version
- **Time:** [estimate based on past deploys]
- **Rollback:** Re-deploy previous version

### Step 5: Run smoke tests on production

- **Owner:** QA lead
- **Pre-condition:** Step 4 complete
- **Action:** Run smoke test suite against production
- **Verification:** All smoke tests pass
- **Time:** [estimate]
- **Rollback:** If failures, evaluate severity. Critical failures = rollback to step 4.

### Step 6: DNS cutover (if applicable)

- **Owner:** Deploy operator
- **Pre-condition:** Step 5 passes
- **Action:** Update DNS records: [specific records and values]
- **Verification:** Use `dig` or DNS lookup tools to confirm new records propagating
- **Time:** Propagation up to 5 minutes (if TTL was lowered) up to 24+ hours (if not)
- **Rollback:** Revert DNS records to previous values

### Step 7: Disable maintenance mode

- **Owner:** Deploy operator
- **Pre-condition:** Step 6 verified
- **Action:** [Specific command to disable maintenance mode]
- **Verification:** Visit production URL, confirm new site loads
- **Time:** 2 minutes

### Step 8: Full smoke test on production

- **Owner:** QA lead
- **Pre-condition:** Step 7 complete
- **Action:** Run full smoke test suite (more comprehensive than step 5)
- **Verification:** All tests pass; critical user flows verified manually
- **Time:** [estimate]
- **Rollback:** If failures, evaluate. Critical failures = full rollback.

### Step 9: Announce success

- **Owner:** Comms lead
- **Pre-condition:** Step 8 passes
- **Action:** Post in internal status channel: "Launch complete. All checks pass."
- **Verification:** Confirmed by stakeholders
- **Time:** 2 minutes

### Step 10: Begin monitoring window

- **Owner:** On-call engineer
- **Pre-condition:** Step 9 complete
- **Action:** Begin elevated monitoring for first 60 minutes. Watch error rates, performance, key business metrics.
- **Verification:** Dashboards open, alerts armed
- **Time:** Continuous

---

## Rollback procedure

If rollback is called, execute these steps:

1. Announce rollback in internal status channel
2. Re-enable maintenance mode (if applicable)
3. Revert DNS records to previous values (if changed)
4. Re-deploy previous code version
5. Restore database from backup (if migrations were destructive)
6. Verify previous version is functioning
7. Disable maintenance mode
8. Run smoke tests on rolled-back state
9. Announce rollback complete
10. Schedule post-mortem

**Estimated total rollback time:** [Estimate, typically 15 to 60 minutes]

**Authority to call rollback:** Launch lead (or deputy if launch lead unavailable)

---

## Rollback criteria

### Automatic rollback (no debate, just do it)
- [ ] Production error rate exceeds [X]% above baseline
- [ ] Critical user flow broken: [specify which flows]
- [ ] Database integrity issue detected
- [ ] Security vulnerability discovered

### Discretionary rollback (launch lead's call)
- [ ] Performance degradation beyond [Y]%
- [ ] Significant degradation in [specific business metric]
- [ ] Customer-facing error pattern emerging

---

## Communication plan

### Internal updates during launch
- **Cadence:** Every 15 minutes during cutover
- **Channel:** [Specific Slack channel / Teams channel / etc.]
- **Format:** "[Time] - [Step name] - [Status: started / in progress / complete / blocked]"

### Customer-facing announcement
- **When:** After step 9 (success announce internal)
- **Where:** [Specific channels: blog post, email, social, etc.]
- **Pre-drafted:** [Link to draft]
- **Approver:** [Name]

### Status page updates
- Pre-launch: [Status set to "Maintenance scheduled"]
- During: [Status set to "Maintenance in progress"]
- Post-success: [Status set to "Operational"]
- If issues: [Status set to "Investigating" or "Identified"]

### Support team brief
- Pre-launch brief covers: what's launching, what users may notice, common questions, escalation path
- During-launch updates posted to support channel

---

## Verification checklist (first hour)

- [ ] Homepage loads
- [ ] Critical user flow 1: [specify] - works
- [ ] Critical user flow 2: [specify] - works
- [ ] Critical user flow 3: [specify] - works
- [ ] Sign-up / sign-in - works
- [ ] Payment flow (if applicable) - works
- [ ] Email sending - works
- [ ] Analytics tracking firing
- [ ] Error rate within normal range
- [ ] Performance within normal range
- [ ] No security alerts triggered
- [ ] Search Console shows no critical issues (if SEO-relevant launch)

---

## Verification checklist (first 24 hours)

- [ ] No regression in key business metrics: [list specific metrics]
- [ ] Error rate stable
- [ ] Performance stable
- [ ] No accumulating error patterns
- [ ] Core Web Vitals stable
- [ ] Customer support volume within normal range

---

## Contacts

| Role | Name | Phone | Slack | Email |
|---|---|---|---|---|
| Launch lead | | | | |
| Deputy lead | | | | |
| Engineering on-call | | | | |
| Database admin | | | | |
| DNS / infrastructure | | | | |
| Customer support lead | | | | |
| Executive sponsor | | | | |

---

## Post-launch

- [ ] Schedule AAR within 1 to 2 weeks
- [ ] Document any deviations from runbook
- [ ] Capture metrics: rollback rate, time to launch, issues found, etc.
- [ ] File improvements to runbook for next launch

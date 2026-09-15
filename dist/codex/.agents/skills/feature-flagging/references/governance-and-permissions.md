# Governance and permissions

Different roles need different access to the flag system. Engineering needs broad ability to create flags. Product needs to author targeting rules in dev and staging. Production targeting changes deserve a smaller approver pool. The pattern below balances access with audit.

---

## Permission tiers

Four tiers cover most cases. Not every organization needs all four.

| Tier | Scope | Typical members |
|---|---|---|
| Viewer | Read-only across all environments | Most of engineering, product, support, finance, executive |
| Editor | Create and modify flags in dev and staging | The team that owns the flag's surface |
| Approver | Promote flag changes from staging to production | Team lead, on-call engineer, designated approvers |
| Admin | Delete flags, modify permissions, access audit logs | Platform team plus a backup |

Smaller organizations may collapse Editor and Approver into a single "Engineer" tier. Larger organizations may add a fifth tier ("Owner") for cross-cutting governance.

---

## Environment-based permissions

Permissions vary by environment. The same person can have Editor in dev/staging and Viewer in production. The environment-based scope is the second axis after role.

| Environment | Default access | Notes |
|---|---|---|
| Dev | Editor for engineering, Viewer for everyone else | Sandbox; mistakes are cheap |
| Staging | Editor for the owning team, Viewer for everyone else | Pre-production; mistakes are detectable |
| Production | Approver for the owning team, Viewer for everyone else | Live; mistakes are expensive |

Production changes go through review like deploys. The change request describes the rule diff, the rollout plan, and the abort criteria. An approver applies the change after review. The rule does not silently appear in production because someone clicked a button.

---

## Approval workflow

For production-impacting changes:

1. Editor authors the change in staging.
2. Editor tests the change in staging (the rule applies, the metric moves as expected).
3. Editor opens a change request in the platform (most platforms have a built-in change-request workflow; if not, a Slack channel with a bot suffices).
4. The request includes: rule diff, rollout plan, abort criteria, link to relevant ticket/PR, link to staging test results.
5. An approver reviews. If clean, applies. If not, comments and the editor revises.
6. The change applies in production with the audit trail attached.

For low-risk operational changes (a kill switch flip during an incident), the workflow can be compressed: the approver applies directly without a separate change request, and the audit trail captures the change with the incident reference. Document this exception explicitly so emergencies do not produce unexplained audit entries.

---

## Audit trail

Every flag change must be logged with:

- Actor (who applied it, by user identity).
- Timestamp.
- Before-state and after-state (the rule diff).
- Reason (free-text or linked ticket).

Most platforms do this automatically. Configure the audit log to also write to the central log aggregator (Datadog, Splunk, ELK, the team's choice). The platform's audit log is fine for routine inspection; the centralized log is where investigation happens during incidents.

Audit retention: at least one year. Two years for organizations with regulatory obligations.

---

## Emergency override

An emergency override is the path that lets on-call flip a kill switch at 3 AM without going through the standard approval workflow.

The pattern:

1. A small group has Approver permission on the operational kill switches specifically.
2. The group includes the on-call rotation; on-call inherits Approver for the duration of their shift.
3. Emergency overrides apply with the standard audit trail; the reason field includes the incident reference.
4. After the incident, the override is reviewed in the post-mortem.

Test the override in incident drills. The first time on-call flips a kill switch should not be at 3 AM with revenue dropping; it should be in a drill with everyone calm. If the drill reveals the override path is broken (the on-call's account does not have the right permission, the platform's UI is confusing, the mobile app does not let you change rules), fix it immediately.

---

## Service accounts

Automation needs flag access too. CI/CD pipelines may flip flags as part of deploys; monitoring systems may flip kill switches based on alerts; orchestration agents may modify flags via MCP.

Service accounts:

- Each automation has its own service account with a clearly named identity (`ci_pipeline`, `monitoring_alert_bot`, `agent_orchestrator`).
- Service accounts have the minimum permission needed for their scope. The CI account that flips release flags after deploy does not need permission to delete flags.
- Service account credentials rotate on a schedule (90 days for production access).
- Audit log entries from service accounts are clearly marked so they can be filtered separately from human changes.

Mixing human and service-account credentials in the same identity is the most common audit-trail mistake. The investigation question "who changed this flag at 2 AM" should not have the answer "an automation, but we are not sure which one because it was authenticated as a human admin."

---

## The "production console freeze" anti-pattern

Some organizations respond to a production flag incident by tightening access so much that every flag change requires a ticket, a meeting, and a 24-hour delay. The result is over-correction: routine flag changes get queued, the team starts authoring rules in code instead of in the platform, and the platform stops being load-bearing.

The fix is not to freeze access. The fix is to:

- Tighten the approval workflow (require change requests for production).
- Tighten the audit log (capture every change with reason).
- Tighten the emergency override (drill it).
- Loosen the day-to-day workflow so editors can do their jobs without paperwork.

Bureaucracy substitutes for trust. Trust is built via the audit log and the approval workflow. Once the audit log is solid, day-to-day editing can stay fast.

---

## Cross-team coordination

When a flag's surface overlaps with another team's work, coordinate before the change. The experiment registry pattern from the `experiment-design` skill applies here too: maintain a shared list (in the platform, in a wiki, in a shared doc) of flags currently being modified or rolled out per surface. Before launching a flag rollout, check the registry for conflicts.

Cross-team coordination does not have to be heavy. A 5-minute Slack check ("we're rolling out flag X on the checkout flow tomorrow at 1 PM, anyone working on adjacent flags?") is enough for most cases. The cost of skipping the check is the cross-team conflict scenario from the [SKILL.md](../SKILL.md), where two flags interact and produce broken UI.

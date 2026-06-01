# Governance and team setup

Permission tiers, approval workflows, audit trail requirements, environment promotion, team fit assessment, and onboarding playbooks.

Governance is the unglamorous discipline that prevents the worst outcomes. A team that ships fast without governance will eventually have an "anyone can modify production targeting" incident. This reference is the structure that prevents it.

---

## The four governance pillars

### Permission tiers

A typical permission model has four tiers.

1. **Read.** See experiments, flags, and results. Default for analysts, partners, and read-only stakeholders.
2. **Author.** Create and modify experiments and flags in non-production environments. Default for PMs and engineers shipping experiments.
3. **Production.** Modify production targeting. Reserved for senior engineers, leads, or designated experiment owners.
4. **Admin.** Manage users, billing, integrations. Reserved for engineering leadership and platform owners.

Map roles to tiers. Document who has which tier. Review quarterly. Remove access proactively when someone changes roles.

For platforms that do not natively support fine-grained permissions (some open-source self-hosted setups), build the permission model in the deployment process. For example, only certain CI/CD pipelines can push to production targeting.

### Approval workflows

Production-impacting changes go through review. The minimum approval workflow has three steps.

1. The author proposes the change (new experiment, modified targeting, rollout to higher percentage).
2. A second person reviews. The reviewer is not the author.
3. The change is logged with actor, timestamp, before-and-after, and reason.

Lighter approval is acceptable for low-risk experiments (5% rollout to internal users). Stricter approval applies to high-risk experiments (revenue, billing, security-adjacent).

Some platforms (Optimizely Enterprise, Statsig Enterprise) build the approval workflow into the platform. Others require self-built workflows in your deployment process or change management tool.

### Audit trails

Every change logged. The log includes actor, timestamp, before state, after state, and reason. The log is immutable and queryable.

Audit trails matter for two reasons. The first is compliance: regulated industries require them. The second is post-incident analysis: when a wrong-result decision ships, the audit trail tells you exactly when and why the experiment was modified.

For platforms that do not natively log every change (smaller open-source setups), build the audit at the deployment-pipeline level. Every push to the experimentation platform's API runs through a logging proxy.

### Environment promotion

Experiments and flags promoted through environments: dev, staging, production. The promotion is not automatic. Each promotion is a deliberate decision.

The minimum environment model is dev plus production. The fuller model is dev, staging, production. Larger organizations add a pre-production environment that mirrors production traffic for risk-free smoke testing.

Promotion rules. Experiments are tested in dev first. The experiment definition (targeting, variants, metrics) is identical across environments. Only the user population differs. Promotion to production requires approval.

---

## Team fit assessment

The platform's defaults shape the team's experimentation culture. Pick the alignment that matches who you actually want running experiments.

**PM-led culture.** PMs author and own experiments. Engineers wire metrics and SDK changes. The platform should have a low-overhead experiment authoring surface, clear analytics, and good metric documentation.

Best fit: Statsig, PostHog. Both have PM-friendly authoring surfaces.

**Engineer-led culture.** Engineers author and own experiments. PMs review and prioritize. The platform should have a code-first authoring surface and good SDK ergonomics.

Best fit: PostHog, GrowthBook. Both have strong code-first paths.

**Data-team-led culture.** Analysts and data scientists author experiments. The platform should have warehouse-native architecture, deep statistical defaults, and SQL-first metric definitions.

Best fit: Eppo, GrowthBook. Both are warehouse-native.

**Marketing-led culture.** Marketing teams author experiments without engineer involvement. The platform should have a visual editor and non-technical experiment authoring.

Best fit: Optimizely, Kameleoon. Both have mature visual editors.

The wrong fit is constant friction. A PM-led team on a marketing-led platform will struggle with the visual-editor-first authoring surface. A marketing-led team on an engineer-led platform will not be able to ship without filing engineering tickets.

---

## Onboarding cost

Time to first experiment for a new team member is a real metric. Track it after platform decisions.

**Statsig and PostHog.** Hours to days. The authoring surfaces are PM-friendly; new team members can ship a low-risk experiment in a single afternoon with documentation.

**Optimizely.** Days to weeks. The visual editor is approachable for non-engineers, but the platform's depth means navigation takes time. New marketing team members can ship faster than new engineering team members.

**Eppo and GrowthBook.** Days if the warehouse and metrics are already wired in. Weeks if not. The setup overhead is in the warehouse layer, not the platform itself.

**Amplitude.** Hours if the team is already using Amplitude for analytics. The experiments surface is a small extension of the analytics surface. New team members already familiar with Amplitude pick it up quickly.

**Kameleoon.** Hours for the visual editor. Days for the win-to-code workflow. The specialty workflow has its own learning curve.

---

## Onboarding playbook

A repeatable onboarding playbook for a new PM or engineer joining an experimentation discipline.

### Day 1: orientation

- Read the platform documentation overview (1 hour).
- Walk through one completed experiment in the platform with the team owner (30 minutes).
- Review the team's metric definitions and ownership matrix (30 minutes).
- Get permissions provisioned at the Author tier (varies; aim for same day).

### Day 2 to 5: shadow

- Sit in on one experiment review meeting.
- Read the last 3 to 5 experiment writeups.
- Pair with a senior team member on a low-risk experiment.

### Week 2: ship

- Author and ship a low-risk internal experiment (5% rollout to internal users).
- Write up results.
- Get feedback from a senior team member.

### Week 3 to 4: own

- Take ownership of a backlogged experiment.
- Ship it end to end.
- Present results to stakeholders.

After week 4, the new team member is fully onboarded. Track the time to first experiment as a metric. Investigate when it exceeds two weeks; that is a signal of either platform friction or onboarding-process drift.

---

## Common governance failures

Three patterns recur.

1. **Permission creep.** Everyone gets Production tier "for convenience." Six months later, no one knows who can modify production targeting. The fix is quarterly access reviews and a strict default to Read or Author tier.
2. **Approval theater.** Changes go through an approval workflow but reviewers do not actually review. The fix is to require a substantive comment on every approval, not just a click.
3. **Audit log drift.** The audit log exists but no one reads it. The fix is to surface audit log highlights (high-risk changes, unusual targeting modifications) in a weekly digest.

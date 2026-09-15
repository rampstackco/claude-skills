# Team-size modulation

A 2-person team and a 12-person team need different orchestration. The framework (phases, gates, lock points, handoffs) is the same; the cadence's review density, sync ceremony, and tool-stack adjustments scale with team size.

This file covers four scales: solo, small (2-3), medium (4-7), large (8+). For each: review density, sync cadence, handoff formality, risk profile, tool-stack adjustments, and AI agent participation pattern.

---

## Solo (1 person)

Everything is the same person playing every role. The brief author, identity designer, voice writer, copy writer, design lead, and engineer are all you.

- **Review density.** Self-review only. Per-phase self-review checklists replace formal gates. The risk is that nothing actually catches mistakes; the discipline is to step away from the work between drafting and reviewing (overnight is best, an afternoon walk is the minimum).
- **Sync cadence.** Daily plan, weekly review against the orchestration plan. Document the daily plan and the weekly review in a project state file (CLAUDE.md, AGENTS.md, or .agent/state.md).
- **Handoff formality.** Inline. Self-handoffs document themselves in the project state file rather than as separate artifacts.
- **Risk profile.** Phases blur together. Lock points get unfrozen without ceremony. The brief that was approved last week becomes "well, I had a better idea, let me just edit it" and downstream work drifts.
- **Tool-stack adjustments.** Skip Jira workflow validators, Linear cycle ceremony, formal review routing. Use the simplest tool the project needs (often Notion or markdown files in a repo). Resist setting up tooling beyond what's actually used; solo projects fail more often from over-tooling than from under-tooling.
- **AI agent participation pattern.** Heavy. Solo work benefits most from agent participation because the agent is the second pair of eyes that solo work otherwise lacks. The agent runs QA verification gates, reviews copy against the locked voice, runs accessibility audits, and surfaces patterns the solo person might miss. The orchestration plan output specifies which agent runs at which gate.

---

## Small (2-3 people)

Single reviewer per gate. Async handoffs are fine. Daily standup is sufficient for sync.

- **Review density.** One reviewer per gate. The team picks a primary reviewer per phase based on expertise (design lead reviews identity gates, copy lead reviews voice and copy gates, the senior engineer reviews QA verification and launch readiness).
- **Sync cadence.** Daily 15-minute standup. Weekly 60-minute phase review. Async messaging in between.
- **Handoff formality.** Documented but inline (a Notion page comment, a Linear issue description, a Slack message in the project channel). The small team can rely on shared context that larger teams cannot.
- **Risk profile.** The single reviewer becomes a bottleneck. When the design lead is the only person who can pass the identity approval gate and they're on PTO, the project blocks. Mitigation: the orchestration plan specifies a backup reviewer per gate.
- **Tool-stack adjustments.** Light tool setup. Linear's default workflow is fine; Jira can run with a basic workflow scheme; Notion runs with basic database schemas. Don't set up complex automations until the team feels the lack of them.
- **AI agent participation pattern.** Moderate. Agents handle production tasks, QA verification, and adjacent observation filing. Humans handle reviews, gate approvals, and decisions that require taste or political judgment. The orchestration plan specifies which roles agents fill and which stay human.

---

## Medium (4-7 people)

Multiple reviewers, async sync points, weekly phase reviews. The team is large enough that shared context erodes; documentation matters more.

- **Review density.** Two reviewers per gate (one primary, one secondary for cross-check). Reviewer rotation across phases prevents one person from becoming the bottleneck.
- **Sync cadence.** Daily standup. Weekly phase review. Bi-weekly cross-track sync if there are parallel tracks. Async messaging in between with explicit channels per phase.
- **Handoff formality.** Documented in the canonical platform (Jira issue, Linear project, Notion database row). Slack threads are fine for discussion but the canonical record lives in the work-tracking platform.
- **Risk profile.** Review density becomes the gating factor. Reviewers stack up at end of phase, leading to fatigue reviews and rubber-stamped approvals. Mitigation: within-phase mini-gates that flatten review demand. Instead of reviewing 8 deliverables on phase-end Friday, review 2 mid-week and 6 at phase-end.
- **Tool-stack adjustments.** Custom fields, labels, and automation start to matter. Set up workflow validators that prevent premature transitions. Set up custom views per role (designer view, engineer view, PM view) so each person sees only what's relevant to them.
- **AI agent participation pattern.** Agents handle QA verification gates, surface adjacent observations, and run reports (which tickets are stuck, which gates are open, which assignees are overloaded). Humans handle reviews and approvals. The agent's role expands from "do production work" to "monitor the orchestration plan and surface drift".

---

## Large (8+ people)

Formal phase reviews, dedicated PM for orchestration, multiple parallel tracks. Cross-track drift is the dominant risk.

- **Review density.** Three or more reviewers per gate. Phase reviews become formal meetings with prepared agendas. Reviewer rotation is mandatory; the project cannot rely on any one person.
- **Sync cadence.** Daily standup per track. Weekly cross-track sync. Bi-weekly project-wide review. Monthly stakeholder review for projects spanning multiple months.
- **Handoff formality.** Strict. Every handoff specifies artifacts, locked items, and change-request protocols in writing. Async handoffs without artifact specification break large teams; the receiving track wastes a week trying to figure out what was actually handed off.
- **Risk profile.** Cross-track drift. Track A and Track B both interpret the brief differently; by week 3 the two tracks read as different brands. Mitigation: a dedicated brief-owner role whose job is to maintain the brief as canonical reference, plus cross-track sync ceremonies and explicit change-request protocols. Brief drift is a leading indicator; the brief-owner role exists to catch it before it becomes track drift.
- **Tool-stack adjustments.** Full workflow scheme with validators. Custom fields tracking phase, gate status, approver, locked status. Multiple boards or views per track. Automation rules for status synchronization across linked platforms (Jira-GitHub, Linear-GitHub). Reporting dashboards.
- **AI agent participation pattern.** Agents become orchestration monitors. The agent's role is to track phase status across tracks, surface drift, run cross-track sync prep (which tracks are on schedule, which are slipping), file adjacent observations across track boundaries, and run QA verification gates. The agent is most valuable at the cross-track surface where humans cannot easily hold all the context.

---

## How to choose your scale's pattern

Match the cadence to actual team size. The most common mistake is to use a small-team cadence on a medium-team project, which leads to the single-reviewer bottleneck, OR to use a large-team cadence on a small-team project, which leads to ceremony overhead that nothing earns.

When the team scales mid-project (a 2-person small team grows to 5 people during production phase, for example), the orchestration plan should specify the transition: at what point does the cadence shift, what new reviewers come online, what additional ceremonies start. The plan's risk register should flag scaling moments as a known risk because cadence transitions are themselves a source of drift.

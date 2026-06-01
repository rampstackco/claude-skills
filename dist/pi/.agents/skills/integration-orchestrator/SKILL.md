---
name: integration-orchestrator
description: "Generate a phased delivery orchestration plan for creative-direction-driven work, mapping which skills run when, what locks at which gate, how handoffs occur between phases, and how the cadence implements in the team's actual tools (Jira, Linear, Notion, Figma, GitHub) with AI agents participating via MCP and CLI. Distinct from `creative-brief` (static project brief) and `creative-direction` (aesthetic direction). This skill produces a temporal map: phase-by-phase cadence, lock points, handoff specs, gate definitions, automation and QA verification gates, and platform-specific implementation. Triggers on integration orchestrator, delivery cadence, project orchestration, when does the brief lock, how to phase creative direction, brand build cadence, rebrand timeline, campaign delivery plan, design-development handoff, brief freeze, identity gate, copy approval phase, QA gate, automated verification, MCP integration for project management, Claude Code workflow setup, agent-driven QA. Triggers when a team is starting a creative-direction project and needs to sequence the work, OR when a project is mid-flight and the cadence has broken (freeze points being unfrozen, parallel work getting out of sync), OR when a team is integrating AI agents into their existing PM workflow. Does NOT fire when the user needs project scoping (use `creative-brief`), aesthetic direction (use `creative-direction`), or general project management without a creative-direction throughline."
category: product
catalog_summary: "Sequence creative-direction work across phases, gates, handoffs, and QA verification"
display_order: 3
---

# Integration Orchestrator

A brief tells a team what to make. Creative direction tells them what it should feel like. Neither tells them when each decision locks, who reviews what, or what stops the next phase from starting before the prior one is done. That is the gap this skill fills.

The output is a phased orchestration plan the PM can paste into a calendar Monday morning and start running Tuesday. Phases, gates, lock points, handoffs, QA verification rules, and a platform-specific implementation guide for whatever stack the team actually uses (Jira, Linear, Notion, Figma, GitHub, agile sprints).

---

## What this skill is

A creative-direction project has three layers. The brief layer defines scope, audience, deliverables, constraints, success criteria. The direction layer defines tone, aesthetic, relationship, and sensory ambition. Both produce written artifacts. Neither answers the temporal question: when does the brief lock, when does identity lock, when does copy lock, who reviews each, what gets blocked while a gate is open, what happens when a downstream task discovers the brief is wrong, and what makes "Done" mean tested rather than self-reported.

This skill produces that temporal layer. Most teams have briefs and creative direction but no orchestration plan. The result, by week 3, is everyone working in parallel with no shared sense of which decisions are still open and which are locked. Brief drift. Re-work. Identity tokens shifted after copy was already drafted against the old ones. Engineering shipping before design had a chance to review. "Done" tickets that were never actually verified.

The orchestration plan answers all of that. It is not theory. It is a phased timeline with calendar weeks, ticket templates the PM can paste into Jira or Linear, MCP commands for setup, gate definitions with measurable pass criteria, handoff specs with artifact requirements, and QA verification gates with Playwright or Chrome MCP invocations.

---

## When to use

- Starting a new brand build, rebrand, or campaign and the team needs to sequence the work
- Mid-flight project where the brief is being revisited and downstream work is suffering from constant resets
- Setting up a new team's agent-driven workflow with MCPs and CLI integration
- Multi-team work where handoffs between brand, design, and engineering have broken down
- Establishing QA verification gates so "Done" is measurable, not self-reported
- Migrating from ad-hoc orchestration to a documented cadence
- Onboarding a new PM or design lead onto an existing project that has running tickets but no documented sequencing
- Adding new platforms or tools to an existing workflow and the cadence needs to be re-mapped

---

## When NOT to use

- Use `creative-brief` instead if the deliverable is the project brief itself: scope, audience, deliverables, constraints, success criteria. The orchestrator skill takes the brief as input.
- Use `creative-direction` if the deliverable is the aesthetic direction: tone, aesthetic, relationship, sensory. The orchestrator schedules the work that answers to the direction; it does not produce the direction.
- Generic project management software is the platform; this skill produces the plan that runs IN the platform. Do not run this skill if the team needs help picking a tool; it assumes the tool stack is already chosen.
- Sprint-planning tactics (story-pointing, retros, velocity charts) live downstream of orchestration. The skill produces the cadence; sprint planning fills it in.

---

## Required inputs

- **Project type.** New brand build, rebrand, single landing page, campaign, identity refresh, website refresh, microsite, product launch. The type implies a default phase decomposition that the skill adapts to the specific project.
- **Team composition.** Total size and role mix. Solo, small (2-3), medium (4-7), large (8+). Whether AI agents (Claude Code, Claude in Chrome, others) participate in production, QA, or both.
- **Tool stack.** Which of Jira, Linear, Notion, Figma, GitHub the team uses. Plus QA tooling (Playwright, Chrome MCP, Windows MCP, mobile testing harnesses) if known. Plus communication and paging channel (Slack, email, in-tool mention). The output adapts to the actual stack.
- **Timeline target.** Express (compressed timelines, fewer reviewers, accept higher rework risk), standard (typical cadence at the project type's default duration), or thorough (more reviewers, formal phase reviews, lower rework risk at the cost of slower delivery).
- **Existing constraints.** What is already locked? Brief approved, identity locked, platform fixed, brand voice already shipped, content management system non-negotiable. The orchestrator plan handles greenfield and mid-flight equally; the existing constraints input is how mid-flight projects are accommodated.
- **AI agent participation.** Which workflows include agents and at what fidelity. Examples: Claude Code does production tasks against a state file in the repo; Claude in Chrome runs human-readable QA flows on the staging deployment; the agent has access to the Linear MCP and the GitHub MCP but not Jira; the agent can move tickets between Todo, In Progress, Waiting, and Blocked but cannot move to Done (Done requires a human verification step).
- **Risk profile.** Optional input naming the failure modes the team is most worried about: brief drift, parallel-work conflicts, QA gaps, agent runaway. The orchestration plan front-loads mitigations for the named risks.

---

## The framework: 7 considerations for orchestration

A delivery orchestration plan sits at the intersection of seven considerations. Each filters the choices that follow.

### 1. Phasing

How the project decomposes into phases. The standard shape is discovery, direction, identity, production, QA, and launch. Not every project type uses every phase. A campaign skips identity (it inherits the locked brand identity). A landing page collapses discovery and direction into a single brief phase. A rebrand replaces discovery with audit (positioning is known; the audit assesses what to keep).

The shape of the phases matters less than the explicit answer to two questions per project: which phases run sequentially because the downstream phase cannot start without the prior phase's output, and which phases overlap because their outputs do not depend on each other. Identity must complete before copy starts (copy depends on tone-axis position, which is part of identity). QA must complete before launch. Discovery and audit may overlap with brief drafting, because the brief consumes discovery findings as they emerge.

### 2. Gates

A gate is the approval moment that governs phase transition. The standard gates are brief approval, direction approval, identity approval, voice approval, copy approval, design approval, QA verification, and launch readiness. Each gate has a trigger (the work that opens it), an approver (the person or test suite that passes it), required-to-pass criteria (the measurable thing that says yes or no), what's blocked until the gate passes, and what's already locked from prior gates.

Gates work when the criteria are measurable. "Brief approved" is too vague; "client signed the brief artifact in writing or in a recorded review" is measurable. "QA passed" is too vague; "Playwright critical-flow suite green, console error count at or below baseline, accessibility floor maintained" is measurable. Gates that are not measurable become political; gates that are measurable become structural.

### 3. Lock points

A lock point is the moment an artifact becomes immutable. The brief locks after direction is approved. Identity tokens lock after the identity gate. Voice rules lock after voice approval. Copy locks per page after copy approval. Once locked, the artifact cannot be changed by downstream work; it can only change via a formal change request that triggers re-review of dependent work.

Without explicit lock points, every artifact is conceptually editable forever. That is the source of brief drift. The orchestrator plan names what locks at which gate, where the locked artifact lives, who can request a change, and what gets re-reviewed if a change is approved. Locked is not the same as final; locked means "any further change to this triggers downstream review work, so make changes deliberately."

### 4. Handoffs

A handoff is the moment work transfers between phases or skills. The standard handoffs are discovery to brief, brief to identity, brief to voice, identity plus voice to copy, identity plus copy to design, design to engineering, engineering to launch. Each transfers specific artifacts and decisions. Each leaves some things open and locks others.

There is also a cross-cutting handoff: the adjacent observation handoff. While working on the homepage hero, an agent or person notices the footer copy is inconsistent with the new voice. That observation is not the current task. It is filed as an observation in the project triage queue. The PM or tech lead reviews observations on a regular cadence and triages them into proper tickets. This pattern keeps current work focused while not losing the contextually-relevant findings the team would otherwise either drop or derail current work to address.

### 5. Team-size modulation

A 2-person team and a 12-person team need different orchestration. Solo work is one person playing every role. Small (2-3) means a single reviewer per gate and async handoffs are fine. Medium (4-7) needs multiple reviewers and async sync points. Large (8+) needs formal phase reviews, a dedicated PM for orchestration, and explicit cross-track sync ceremonies because parallel tracks drift apart without them.

The orchestration plan output modulates by scale. Solo gets self-review checklists per phase. Small gets per-gate "review by" assignments. Medium gets reviewer rotation and within-phase mini-gates. Large gets formal phase reviews, cross-track sync, and a brief-owner role. The framework is the same; the cadence's review density and ceremony level change.

### 6. Tool-stack implementation

Phases and gates exist in concept; they implement in tools. The orchestration plan specifies the implementation per platform: in Jira, phases become Epics with custom fields for "Phase", "Locked", "Approver", and "Gate Status"; in Linear, phases become Projects with cycles and label-driven views; in Notion, the brief becomes a database row with relation properties tying to direction docs, identity specs, voice guides, and copy decks; in Figma, phases become library folders with frame-level review status; in GitHub, phases interact with branch protection, PR templates, and CODEOWNERS-driven review routing.

Where MCPs exist (Atlassian, Linear, Notion, GitHub), the plan specifies which orchestration setup operations the MCP can execute and which remain manual UI work. Where MCPs are limited (Figma's Dev Mode MCP is dev-mode-focused; the design library setup remains manual), the plan documents the recommendation without claiming end-to-end automation.

### 7. Automation and QA verification

The single most consequential discipline in the framework. Tasks only move from "QA" to "Done" after automated verification passes. This makes Done a measurable gate, not a self-reported one.

The standard status taxonomy is Todo, In Progress, Waiting, Blocked, Done. Blocked is a first-class status, distinct from Waiting. Waiting means the task is paused for normal handoff or scheduled review; Blocked means the task cannot proceed without human resolution of a specific issue. Agents move tasks to Blocked when they cannot autonomously resolve work; this prevents agents from spinning on un-resolvable problems and burning context.

QA verification gates fire automatically. Playwright MCP runs critical-flow tests; Chrome MCP runs human-readable walkthroughs and captures evidence; Windows MCP handles desktop apps; mobile testing harnesses cover mobile applications. Failure routes to Blocked, files an adjacent observation if the failure surfaced something unrelated, pages the human via the configured channel, and stops. The agent does not retry autonomously.

---

## Common project-type cadences

Seven templates. Each is a skeletal phase map; the cadence-patterns reference file expands each.

- **New brand build.** 6 to 8 weeks across 5 phases: Discovery (1 week), Direction (1 week), Identity (1 to 2 weeks), Production (2 to 3 weeks), Launch (1 week). Gates fire after each phase; identity locks before copy starts.
- **Rebrand.** 4 to 6 weeks across 4 phases: Audit (1 week, replaces Discovery), Direction (1 week), Identity (1 to 2 weeks), Production (1 to 2 weeks). Audit assumes positioning and audience are known; the work is assessing what to keep, drop, or refresh.
- **Single landing page.** 1 to 2 weeks across 3 phases: Brief (2 to 3 days), Production (5 to 7 days), QA-Launch (1 to 2 days). Identity is assumed locked. Voice is assumed locked. The work is page-specific copy, design, and engineering.
- **Campaign.** 2 to 4 weeks across 4 phases: Brief (3 to 5 days), Production (1 to 2 weeks), QA (3 to 5 days), Launch (1 to 2 days). Campaign assumes brand identity and voice exist and are locked.
- **Identity refresh.** 3 to 4 weeks across 3 phases: Audit (1 week), Identity (1 to 2 weeks), Production (1 week). Skips discovery and positioning. The output is a refreshed identity system that goes into production for application examples.
- **Website refresh.** 4 to 8 weeks across 4 phases: Audit (1 week), Direction (1 week), Production (2 to 4 weeks), QA-Launch (1 to 2 weeks). Direction may produce a refreshed brief if the audit surfaces positioning gaps.
- **Microsite or product launch.** 3 to 5 weeks across 4 phases: Brief (3 to 5 days), Production (2 to 3 weeks), QA (3 to 5 days), Launch (2 to 3 days). The microsite or product launch usually has a fixed launch date that drives backward planning.

Each cadence reads as if the PM could paste it into a calendar and start running. Phase boundaries align with calendar weeks where possible, because that is how teams actually plan.

---

## Failure patterns

The orchestration plan exists to prevent these. Each is a real failure mode, observed in the wild on real projects.

- **Brief becomes a write-once doc.** The brief is drafted, signed, then nobody references it again. Downstream work drifts. The fix: lock the brief at a gate and treat any reference to it as a reading, not an edit.
- **Brief gets unfrozen mid-flight without re-reviewing dependent work.** Someone tweaks the brief's audience or positioning; the change does not propagate to identity, voice, or copy that already depend on the old version. The fix: a formal change-request protocol that triggers re-review of dependent artifacts.
- **Identity locks before voice.** The typography is finalized before the voice is approved. Result: the type and the voice register conflict (a friendly voice in austere type, or a serious voice in casual type). The fix: voice approval gate fires before or alongside identity lock.
- **Copy starts before voice locks.** Writers draft against a moving target. Rework is invisible because the original draft never gets compared against the locked voice. The fix: voice approval before copy production.
- **Multiple parallel design tracks lose brief alignment.** Track A and Track B both interpret the brief slightly differently; by week 3 the two tracks read as different brands. The fix: cross-track sync ceremonies and a brief-owner role.
- **Engineering starts before design freeze.** Components get built against design that is still moving. Rework downstream when design lands somewhere else. The fix: design approval gate before engineering starts on the affected surface.
- **Reviews stack at end of phase.** Everyone defers their review to the final day; the gate becomes a 10-hour review marathon and approvers approve under fatigue. The fix: within-phase mini-gates that flatten review demand.
- **Async handoffs without artifact specification.** "Hand the design over to engineering" without specifying what artifacts (Figma file URL, exported tokens, asset library reference, PR draft template) means engineering opens half a dozen Slack threads to find what they need. The fix: explicit artifact specification per handoff.
- **QA gate is self-reported.** "Done" tickets get moved to Done without verification. Bugs land in production. The fix: automated verification that fires before status transitions to Done; failure routes to Blocked.
- **Agents spin on un-resolvable work.** A Claude Code task cannot resolve itself; the agent retries, burns context, runs out of tokens, leaves the work in a worse state than when it started. The fix: Blocked is a first-class status; agents move tasks to Blocked when they cannot autonomously resolve, document the blocker, and stop.

---

## Output format

Default output is a markdown document, typically saved as `ORCHESTRATION.md` at the project root or in a `docs/` subdirectory. The document contains the full plan and is the canonical reference for the team.

Structure:

1. **Project orchestration plan.** Phased timeline with calendar weeks, milestone dates, phase outputs.
2. **Per-phase gate specs.** What enters, what exits, who approves, the measurable pass criteria for each gate including the QA verification gate.
3. **Lock-point register.** What becomes immutable when, where the locked artifact lives, who can request a change, and what re-review work a change triggers.
4. **Tool-stack implementation guide.** Concrete setup for Jira, Linear, Notion, Figma, and GitHub as applicable, with MCP commands or CLI invocations for the parts that automate.
5. **QA verification gate spec.** Which automated tests must pass, which MCPs run them, where evidence attaches, what happens on failure.
6. **Handoff specs.** Artifacts transferred per handoff, locked items, change-request protocols, adjacent-observation routing.
7. **Cross-skill dependency graph.** Which skills run in which phase, what each skill consumes, what each produces.
8. **Risk register.** Cadence-specific risks with mitigations.

The document is the orchestration plan. The next step after delivery is for the PM to set up the team's tools to match (Jira epics, Linear projects, Notion databases, Figma libraries, GitHub branch protection) and start running the plan.

---

## Reference files

- [`references/cadence-patterns.md`](references/cadence-patterns.md). The 7 project-type cadences in detail with phase decomposition, timelines, gate definitions, and tool-stack implementation skeletons.
- [`references/gate-definitions.md`](references/gate-definitions.md). Each standard gate with trigger, approver, pass criteria, what's blocked, what's already locked, and change-request protocols.
- [`references/handoff-protocols.md`](references/handoff-protocols.md). The standard handoffs between phases and skills, plus the adjacent observation handoff for filing things noticed while working nearby.
- [`references/platform-implementation.md`](references/platform-implementation.md). How the orchestration maps to Jira, Linear, Notion, Figma, and GitHub, including MCP integration notes per platform and CLI alternatives where MCP is the wrong tool.
- [`references/team-size-modulation.md`](references/team-size-modulation.md). How cadences scale across solo, small, medium, and large teams.
- [`references/automation-and-qa-tooling.md`](references/automation-and-qa-tooling.md). The QA verification gate pattern, MCP vs CLI tradeoffs, session memory and momentum patterns, code-to-ticket linkage, and evidence trails.
- [`references/example-orchestration.md`](references/example-orchestration.md). A complete worked example showing all sections populated for a representative scenario.

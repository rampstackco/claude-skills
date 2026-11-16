---
name: release-management
description: "Run the recurring release cycle that turns merged work into a shipped, communicated release: a stated release model, a version derived from the changes, a release candidate and freeze, a written go/no-go gate, staged rollout with an exercised rollback, a hotfix path, and the changelog and release notes. Use this skill whenever the user wants to cut a release, plan or run a release train, decide what version a release should be, freeze code, hold a go/no-go, write a rollout or rollback plan, ship a hotfix, or write release notes, a changelog entry, or a deprecation notice. Triggers on release, cut a release, release notes, changelog, version bump, semver, calver, what version should this be, release train, code freeze, release candidate, RC, go/no-go, rollout plan, staged rollout, canary, rollback plan, hotfix, deprecation notice, release manager, release captain. Also triggers when the user has a set of merged changes and asks how to ship them or what to tell users, even if they never say release."
category: operations
catalog_summary: "The recurring release cycle: release model, versioning, freeze, go/no-go, staged rollout and rollback, hotfixes, changelog and notes"
display_order: 1
---

# Release Management

Run the cycle that turns merged work into a shipped, communicated release, every time, the same way. This is the recurring cycle, not the one-time go-live. Stack-agnostic and tool-agnostic: works with any CI system, any deploy method, and any tracker.

---

## When to use

- Setting up how a team releases: the model, the cadence, the version scheme
- Cutting a release from a set of merged work items
- Deciding what version number a release gets
- Running a freeze and a release candidate
- Holding a go/no-go and recording the decision
- Planning staged exposure and the rollback path for a release
- Shipping a hotfix without breaking the main line
- Writing the changelog entry, the release notes, or a deprecation notice

## When NOT to use

- The first launch or cutover of a site or product, DNS changes, or the step-by-step deploy-day procedure (use `launch-runbook`)
- Positioning, sales enablement, and customer comms around one feature (use `feature-launch-playbook`)
- Flag types, targeting, ramp schedules, and flag cleanup (use `feature-flagging`). This skill uses flags as a rollout tool. It does not teach them.
- A release that is on fire right now (use `incident-response`, then `after-action-report`)
- Writing the test plan for one ticket (use `test-case-authoring`)
- Sprint ceremonies and delivery metrics (use `sprint-operations`)
- Updating the packages you depend on (use `dependency-management`)

---

## Required inputs

- The release model in use, or a statement that none is written down
- What is in the candidate: the list of merged work items since the last release
- Open defects against the candidate, with severity
- Test evidence for the candidate: runner summaries, test plan results, manual sign-offs
- The rollback method and when it was last exercised
- The audiences for the notes: end users, admins, API consumers, internal teams

If no model is written down, say so and pick one first. If the merged list is not available from the tracker or the version control history, stop. A release record typed from memory is wrong by the second item.

---

## The framework: 7 parts

### Part 1: Release model

Pick one model and write it down. A team with no stated model is running the worst one by accident: scope-driven dates with a fixed-cadence promise and no freeze.

| Model | How it works | Fits when | Costs | Failure mode |
|---|---|---|---|---|
| Release train | Fixed cadence. Whatever is ready at the cut ships. Late work waits for the next train. | Many contributors, users who value predictability, app store or customer review cycles | Work that misses the cut waits a full cycle; needs flags for unfinished work | The train waits for one feature, and the cadence becomes a suggestion |
| Continuous delivery | Every merge is releasable. Releasing is a decision, not an event. | Strong automated tests, fast rollback, a service you control end to end | Heavy investment in test automation and deploy safety | "Releasable" quietly means "deployed untested"; nobody can say what shipped when |
| Milestone release | Scope sets the date. Ships when the named scope is done. | Hardware, regulated software, major versions with migration work | Dates slip with scope; long gaps between releases grow risk | Scope grows, the date moves, and the release becomes a big bang |

Write the model, the cadence, the cut time, and the release owner role in one paragraph the whole team can find. See [`references/release-checklist.md`](references/release-checklist.md) for how each model maps onto the per-release steps.

### Part 2: Versioning

**Semantic Versioning** (the SemVer spec) for anything others depend on: libraries, APIs, SDKs, CLIs, file formats. `MAJOR.MINOR.PATCH`.

- **Major:** an incompatible change to the public interface. A removed field, a renamed endpoint, a changed default that breaks callers.
- **Minor:** new, backward-compatible functionality, including a new deprecation.
- **Patch:** backward-compatible fixes only.
- **Pre-release identifiers** mark candidates: `3.4.0-rc.1`. They sort before `3.4.0`.
- **Build metadata** records the build: `3.4.0+build.512`. It does not affect ordering.

**Calendar Versioning** for products where the date is the signal: apps, sites, internal platforms on a train. `2026.11.1` says when, not how compatible.

**The version is derived, never chosen.** The highest-impact change in the release sets the bump. One breaking change makes it a major, no matter how small the release feels. Tag each merged work item with its impact (breaking, feature, fix, internal) at merge time so the bump is a lookup, not a debate. Worked bumps are in [`references/versioning-guide.md`](references/versioning-guide.md).

### Part 3: Release candidate and freeze

A **release candidate** is one specific, immutable build, named by its version and build identifier. You test the artifact that will ship, not the branch it came from. Any change produces a new candidate (`rc.2`), and evidence tied to the old one is rechecked.

A **freeze** is the window between the cut and the go/no-go. Write down three things:

- **What may still merge.** Fixes for defects in the candidate at or above the go/no-go threshold. Version and release note edits. Nothing else.
- **Who decides exceptions.** The release owner, by name. Each exception is logged with a reason.
- **How long it lasts.** The shortest window that lets the gate run. For a two-week train, one to two working days is typical.

A freeze that is routinely broken is not a freeze. If every release logs exceptions, the freeze is too long, the cut is too late, or the gate is finding problems that belonged in review.

### Part 4: Go or no-go

A written gate with named criteria, evidence for each, and one decision owner. The decision is not whoever is loudest in the room.

| Criterion | Evidence |
|---|---|
| Tests pass on the candidate | Runner summary for the candidate build; test plans for new work from `test-case-authoring` |
| Open defects within threshold | Count by severity (S1 to S4 from `ticket-authoring`) against the stated threshold, for example zero S1, zero S2 without a workaround |
| Rollback verified | Date and result of the last exercised rollback for this deploy path |
| Monitoring in place | Dashboards and alerts for the changed areas exist and fire (see `monitoring-and-alerting`) |
| Release notes drafted | Draft linked, checked against the merged list |
| Owners on call | Named on-call for the rollout window |

Each criterion is marked passed, failed, or not evidenced. Not evidenced counts as failed. A no-go is a normal outcome: record the reason, the fix, and the next date. Use [`references/go-no-go-template.md`](references/go-no-go-template.md).

### Part 5: Rollout and rollback

Expose the release in stages. Each stage has a watch list, a minimum dwell time, a stop condition, and an owner.

| Stage | Exposure | Typical dwell |
|---|---|---|
| Internal | Staff, test accounts, or an internal environment on production data | Until the smoke checks pass and one working session has run on it |
| Canary | A small share of traffic, servers, regions, or users | Long enough to cover a peak period for the changed paths |
| Everyone | Full exposure | Watch continues through the post-release check |

Watch the signals tied to your service level objectives and the paths this release changed. Write the stop condition as a number before the stage starts: "checkout error rate above 0.5 percent for 10 minutes." When a stop condition fires, halt, roll back per the plan, and record it. If users are affected, it is an incident: hand off to `incident-response`.

Per-feature exposure inside a release belongs to flags. Ramp schedules and flag lifecycle are in `feature-flagging`. Choosing the rollout pattern for one feature launch is in `feature-launch-playbook`.

**Rollback is a path you have walked.** Name the method (redeploy the previous artifact, revert, turn a flag off), the time it takes, and the last date it was exercised. A rollback never exercised is a guess.

**Some changes cannot be rolled back.** List them in the rollout plan with their own plan.

- **Data migrations.** Use expand then contract: add the new structure alongside the old, ship code that works with both, migrate, switch, and remove the old structure in a later release. Each step is reversible on its own.
- **External contracts.** A published API field or webhook that clients start using cannot be withdrawn without breaking them. Plan forward fixes, not rollbacks.
- **Sent communications.** Emails, push notifications, and invoices are out the door. Gate them behind the final stage.

See [`references/rollout-plan-template.md`](references/rollout-plan-template.md).

### Part 6: Hotfix path

A hotfix is a release outside the cadence. It qualifies when a production defect is S1, or S2 with no workaround, or when a security or legal fix cannot wait. A feature someone forgot does not qualify. It waits for the next release.

| May be shortened | May never be skipped |
|---|---|
| The train schedule and the full freeze | A second person's review of the change |
| The full regression pass (run the targeted set for the touched area) | The fix verification test from the bug ticket, passing on the hotfix build |
| Full release notes (a single Fixed or Security entry) | A version bump (patch under SemVer) and a changelog entry |
| Stage dwell times (shortened, not removed) | A known rollback method |

Branch from the released version, not from the main line. Get the fix back onto the main line the same day and confirm the next release contains it. A hotfix that never returns to the main line ships the bug again next release.

Every hotfix produces a follow-up item: why the defect escaped, and the test that would have caught it. For an S1, that is an `after-action-report`. See [`references/hotfix-checklist.md`](references/hotfix-checklist.md).

### Part 7: Release record and communication

**The changelog is the durable record.** Follow Keep a Changelog conventions: newest version first, each with a date, an Unreleased section at the top, and entries grouped under Added, Changed, Deprecated, Removed, Fixed, and Security. Written for people, not machines.

**The record is derived from merged work items.** Each item carries a one-line release note (or "internal, no note") at merge time. At the cut, the Unreleased entries move under the new version. Nobody retypes the list from memory.

**Release notes are written for the reader affected.** Lead with what changes for them and what they need to do. Group by impact, not by team. Separate notes for different audiences when their actions differ. A list of commit messages is not release notes.

**Deprecation notices carry a date.** What is deprecated, what replaces it, the removal date or version, what happens after, and how a reader can check if they are affected.

**Internal communication** tells support, success, and sales what is shipping before customers see it. Shape it with `stakeholder-communication`. Launch comms for a headline feature are `feature-launch-playbook`. See [`references/release-notes-template.md`](references/release-notes-template.md).

---

## Workflow

1. **Confirm the model.** Read the written release model. If there is none, write one before cutting anything.
2. **Pull the merged list.** Every work item merged since the last release, with its impact tag and release-note line.
3. **Derive the version.** Apply [`references/versioning-guide.md`](references/versioning-guide.md) to the impact tags.
4. **Cut the candidate and start the freeze.** Build `rc.1`. Announce the freeze rules and the exception owner.
5. **Collect evidence.** Tests, defect counts, rollback date, monitoring, notes draft, on-call names.
6. **Hold the go/no-go.** Fill [`references/go-no-go-template.md`](references/go-no-go-template.md). Record the decision and the reason. On no-go, set the next date.
7. **Roll out in stages.** Follow [`references/rollout-plan-template.md`](references/rollout-plan-template.md). Halt on any stop condition.
8. **Publish the record.** Move the changelog entries under the version, publish the release notes, send the internal note.
9. **Run the post-release check.** Confirm the watch signals are steady, the freeze is lifted, and follow-up items exist.

The whole cycle, step by step, is [`references/release-checklist.md`](references/release-checklist.md). For a hotfix, use [`references/hotfix-checklist.md`](references/hotfix-checklist.md) instead.

---

## Deep dive: releases with coding agents in the loop

When AI coding agents (Claude Code, Codex, or your coding agent of choice) author a share of the merged changes, the release cycle does not change. The inputs need more checking.

- **The gate does not change.** Agent-authored changes meet the same criteria, the same thresholds, and the same freeze rules as anyone else's.
- **A human owns the go/no-go.** An agent can collect evidence and fill the template. It does not make the call.
- **"Tests passed" is not evidence.** An agent's summary message counts only when the runner output for the candidate build is attached. The same rule applies to people.
- **Agent changes are listed like any other.** They appear in the merged list, carry impact tags, and get release-note lines. Do not hide them, and do not label them differently in user-facing notes.
- **Agent-drafted notes are checked against the merged list.** Every line in the draft maps to a merged item, and every user-facing merged item has a line. Drafts invent features and drop fixes.

Write each agent handoff with `dispatch-authoring` so its verification section produces evidence the gate can use.

---

## Failure patterns

- **No stated release model.** Dates promised on a cadence, scope managed by milestone, no freeze. Write one down.
- **Version numbers chosen by feel.** "It feels like a minor." Derive the bump from the impact tags.
- **A freeze everyone merges through.** The candidate changes daily and the evidence is stale. Enforce the exception rule or shorten the window.
- **Go/no-go decided by whoever is in the room.** No named owner, no written criteria. Name one owner and fill the template.
- **A rollback path never exercised.** Discovered broken during the halt. Exercise it on a schedule and record the date.
- **Big-bang exposure.** Zero to everyone with no stage. Stage every release, even a small one.
- **A hotfix that never returns to the main line.** The next release ships the bug again. Merge back the same day.
- **Release notes that are a commit dump.** Readers cannot find what affects them. Write by impact for each audience.
- **A changelog retyped from memory.** Items missing, items invented. Derive it from merged work.
- **An irreversible migration shipped on "we can roll back."** The old schema is gone. Use expand then contract and list it as irreversible.
- **"Not evidenced" marked as passed.** The gate becomes a formality. Missing evidence is a failed criterion.

---

## Output format

For each release, produce:

1. `CHANGELOG.md` entry under the new version, in Keep a Changelog form
2. `release-[version]-go-no-go.md` from the go/no-go template, with the decision and reason
3. `release-[version]-rollout.md` from the rollout plan template, with stage results filled in
4. `release-notes-[version].md`, one section per audience, plus any deprecation notices
5. Follow-up items in the tracker for every halt, exception, and hotfix

---

## If required data is unavailable

This skill's output depends on data, measurements, or tool results it cannot generate on its own. When a required input, tool, or data source is unavailable or unverifiable, the sanctioned output is the deliverable with the gap stated: what was needed, what was actually obtained or verified, and which parts of the output are affected. Fabricating, estimating, or interpolating a required number to complete the deliverable is never sanctioned. A stated gap is a complete answer.

For this skill, a go/no-go criterion with no evidence is recorded as "not evidenced," never as passed. A merged list that cannot be pulled means the version and the notes cannot be derived; say so instead of writing them from memory.

---

## Reference files

- [`references/release-checklist.md`](references/release-checklist.md) - The per-release runbook from the cut through the post-release check, with the model-by-model differences. Run every release.
- [`references/go-no-go-template.md`](references/go-no-go-template.md) - Criteria, evidence, owner, decision, and reason. Fill before every release decision.
- [`references/rollout-plan-template.md`](references/rollout-plan-template.md) - Stages, watch signals, stop conditions, rollback steps, and irreversible items. Fill before the go/no-go.
- [`references/release-notes-template.md`](references/release-notes-template.md) - Reader-facing notes by audience, a changelog entry, and a deprecation notice block. Use when publishing.
- [`references/hotfix-checklist.md`](references/hotfix-checklist.md) - Qualification, the shortened gate, and the merge back to the main line. Run for any out-of-cadence fix.
- [`references/versioning-guide.md`](references/versioning-guide.md) - SemVer and CalVer decision rules with worked version bumps. Read when choosing a scheme or deriving a version.
- [`references/example-release.md`](references/example-release.md) - One release train cycle for a fictional product, including a no-go that slips a week and a canary halted on a stop condition. Read to calibrate.

---
name: dispatch-authoring
description: "Write the structured handoff from a planning session to a coding agent: a dispatch with a header, Gate 0 checks, scope, specification, verification, delivery rules, and stop conditions, so the agent can execute unattended and return a reviewable draft PR. Use this skill whenever the user wants to hand work to an agent, write an agent brief, write instructions for Claude Code, Codex, or a Cursor agent, queue work to run overnight, or turn a plan into something an AI coder can execute without asking questions. Triggers on dispatch, hand off to an agent, agent brief, agent handoff, task brief for an AI coder, instructions for Claude Code, Codex task, Cursor agent, background agent, run this overnight, give this to an agent, unattended run. Also triggers when the user has a plan or a spec and asks how to get an agent to build it, even if they never say dispatch."
category: process-and-team
catalog_summary: "Planner-to-agent handoffs with Gate 0, verification, held draft PRs, and stop conditions"
display_order: 7
---

# Dispatch Authoring

Write the handoff that lets a coding agent execute a plan unattended and come back with something a human can review. Agent-agnostic: works for Claude Code, Codex, or your coding agent of choice.

---

## When to use

- Handing a planned change to a coding agent to run without supervision
- Queueing work to run overnight or in the background
- Turning a spec or a ticket set into an executable brief for an agent
- Standardizing handoffs so agent runs are comparable and measurable
- Reviewing a draft dispatch before it goes out

## When NOT to use

- Writing the spec or PRD the dispatch implements (use `pm-spec-writing`)
- Writing the tickets the work is tracked in (use `ticket-authoring`)
- Reviewing the PR the agent returns (use `code-review-web`)
- Measuring how agent lanes perform over time (use `sprint-operations`)
- Pairing interactively with an agent on a small change. A dispatch is for unattended runs.

---

## Required inputs

- The plan or spec the agent will implement
- The target repository, its visibility (public or private), and its default branch
- The repo's own contribution and authoring rules, if any
- The commands that prove the work: tests, lint, build, generators
- Who merges, and who cleans up afterward

If you do not know how the work will be verified, stop and find out. A dispatch without verification is a request for a confident guess.

---

## The framework: 7 parts of a dispatch

A dispatch is read top to bottom by an agent with no other context. Each part answers one question the agent would otherwise have to guess at.

### 1. Header

Date, target repo, visibility, lane, branch name, and roles (who planned, who executes, who merges). The header lets the agent and the reviewer confirm they are talking about the same work.

### 2. Gate 0

Checks the agent runs before any write. Each one has a stop action if it fails.

- Correct remote, matched against the exact owner and repo name
- Correct visibility. A public repo needs extra care with what goes in it.
- Fresh worktree or branch, never the canonical checkout or the default branch
- Required reading, in order: the repo's authoring guide, contribution guide, the closest existing example, the scripts the dispatch will call
- Record how generated files are produced (which script, which flag). Never hand-edit a generated file.

### 3. Scope

What is in, then what is out, in that order. Name the files or areas that may change. Name the ones that must not.

### 4. Specification

The work, in enough detail that the agent does not need to ask. Point at the source spec instead of pasting it, unless the agent cannot reach it. Give constraints, conventions, and examples to match. Where you want judgment, say so and say what to optimize for.

### 5. Verification

How the agent proves the work is done: the exact commands, the expected result of each, and the files to read back. Ask for the output to be pasted, not summarized.

### 6. Delivery

Branch name, commit structure, held draft PR, PR body format, and cleanup responsibility. The agent opens the PR as a draft and stops. It never merges.

### 7. Stop conditions

When the agent must stop and report rather than proceed: a Gate 0 check fails, a required script is missing, the spec is ambiguous in a way that changes the result, an operation is destructive or irreversible (force-push, history rewrite, deleting data, touching the default branch).

### Principles to state in every dispatch

- **The agent never merges.** A human reads the diff before it lands.
- **Honest stop beats fabricated completion.** A clear "blocked on X" is a good outcome. A plausible result built on a guess is a bad one.
- **A successful tool message is not evidence.** Read the file back. Run the check. Paste the output.
- **One dispatch per worktree.** Parallel dispatches in one checkout collide.
- **Derive counts and lists at run time.** Write "every skill in the folder," not "the 42 skills." Hardcoded numbers go stale between writing and running.

---

## Workflow

1. **Confirm the plan is ready.** The spec exists, the tickets are ready, and the verification commands are known.
2. **Copy the template.** Start from [`references/dispatch-template.md`](references/dispatch-template.md).
3. **Fill the header.** Double-check owner, repo, and visibility against the actual remote.
4. **Write Gate 0.** Use [`references/gate-zero-checklist.md`](references/gate-zero-checklist.md). Every check has a stop action.
5. **Write scope, then specification.** In then out. Then the work, with examples to match.
6. **Write verification.** Exact commands, expected results, files to read back.
7. **Write delivery and stop conditions.** Draft PR only. Name the PR body format from [`references/pr-body-template.md`](references/pr-body-template.md).
8. **Read it as the agent.** Find every place you would have to ask a question. Answer it in the dispatch or turn it into a stop condition.
9. **Send it, then log it.** Record the dispatch date and outcome so `sprint-operations` can measure the lane.

---

## Failure patterns

- **No Gate 0.** The agent writes to the wrong repo, the wrong branch, or the canonical checkout.
- **"Make it work" as verification.** The agent will report success. Name the commands and the expected output.
- **Permission to merge.** Removes the only human check. Never grant it in a dispatch.
- **Hardcoded counts.** "Update all 37 entries" is wrong the day someone adds the 38th.
- **No stop conditions.** The agent improvises through a missing script or an ambiguous spec, and the PR looks finished.
- **Spec pasted and paraphrased.** Two versions of the truth. Point at the source.
- **Scope with only "in."** Agents tidy up nearby code unless told not to.
- **Two dispatches in one checkout.** Edits collide and the PRs contain each other's work.
- **Trusting the agent's summary.** Read the diff and the pasted verification output, not the closing paragraph.
- **Private details in a public repo dispatch.** Internal paths, client names, and private repo names leak into commits and PR bodies.

---

## Output format

One markdown file per dispatch, named `dispatch-[short-name]-[YYYY-MM-DD].md`, using the seven parts in order. Keep it in the planner's own records, not in the target repo. The agent's PR body follows [`references/pr-body-template.md`](references/pr-body-template.md).

---

## Reference files

- [`references/dispatch-template.md`](references/dispatch-template.md) - Fillable seven-part dispatch. Start every dispatch here.
- [`references/gate-zero-checklist.md`](references/gate-zero-checklist.md) - The pre-write checks and the stop action for each. Use when writing Gate 0 and when reviewing a dispatch.
- [`references/pr-body-template.md`](references/pr-body-template.md) - The draft PR body the agent returns, with verification output and open questions. Paste into the dispatch's delivery section.
- [`references/example-dispatch-new-skill.md`](references/example-dispatch-new-skill.md) - A filled dispatch adding one skill to a fictional skills catalog. Read to calibrate detail and tone.

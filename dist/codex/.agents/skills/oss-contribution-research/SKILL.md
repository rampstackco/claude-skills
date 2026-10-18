---
name: oss-contribution-research
description: "Research and prepare an outside contribution to an open-source repo, then stop at a queue item for a human to approve: policy check, intake, duplicate check, reproduction, patch, the repo's own checks, an independent critic rerun, and a disclosed, hashed draft of the exact text to post. Use this skill whenever the user wants to contribute to someone else's repo, fix an upstream bug, pick up a good-first-issue, draft an AI-assisted pull request for an outside project, or run a gated contribution pipeline. Triggers on open source contribution, contribute to this repo, upstream fix, outside PR, external PR, good first issue, fix this issue in their repo, contribution research, AI-assisted PR, disclose AI in PR. Also triggers when the user names an issue in a repo they do not maintain and asks for a fix, even if they do not say contribute."
---

# OSS Contribution Research

Prepare one outside contribution to an open-source repo, gate by gate, and stop at a queue item a human approves. The agent running this skill never posts.

---

## When to use

- Picking up an existing issue or confirmed bug in a repo the user does not maintain
- Checking whether a repo accepts AI-assisted pull requests before any work starts
- Asking a maintainer for a go-ahead before writing a patch (an intake comment)
- Turning a fix into a small, disclosed pull request draft that a human approves
- Running a contribution pipeline with an approval queue and a per-repo registry

## When NOT to use

- Reviewing a pull request in a repo the user maintains (use `code-review-web`)
- Updating packages or lockfiles in the user's own project (use `dependency-management`)
- Writing a new feature spec for the user's own product (use `pm-spec-writing`)
- Writing a new skill for this catalog (use `skill-creation-walkthrough`)
- Unsolicited refactors, rewrites, or features in someone else's repo. This skill refuses them.

---

## Required inputs

- **Target.** The repo (`owner/repo`) and an existing issue URL, or a bug the agent can reproduce.
- **Registry.** The user's per-repo registry file (`registry.yaml` in the user's private approval queue repo). It holds the policy class, disclosure format per action type, review mode, cadence cap, a cached last submission date, and status for each target repo.
- **Queue state.** Whether the queue has an open issue labeled `pipeline:paused`, and the queue's posted items (issues labeled `status:posted`). The posted items are the record of past submissions.
- **A read-only token.** Research and patch steps run on a read-only forge token. Filing the finished item into the approval queue is a separate, internal step on the user's normal login, after research is complete. Posting to the outside repo happens only through the queue's poster, and only on approved items.
- **A local clone** of the target repo on a branch the user's fork can push later.

If the registry or queue state is missing, stop and ask for it. Do not infer a policy or a disclosure format.

---

## The framework: gates in order, stop at the first fail

Each gate either passes with evidence or stops the run with a reason. A stop is a valid result. Report it; do not route around it.

1. **Pipeline gate.** An open `pipeline:paused` issue in the queue stops everything (kill switch).
2. **Repo gate.** Classify the repo's AI-PR policy as `allows`, `silent`, or `bans`, with the cited line (see `references/policy-classification.md`). Stop on `bans`. Also stop when the policy requires the human owner to attest to reviewing the complete change, when the repo accepts issues but not pull requests, when it accepts pull requests only from members, or when the registry status is not `active`.
3. **Throttle and cadence gate.** Stop if the user already has an open pull request on this repo. Stop if the cadence cap says the next submission is not due. Take the last submission date from the queue's posted items for this repo. The registry's date is a cached hint only; when the two disagree, the date from the queue wins.
4. **Issue gate.** Work only on an existing issue or a bug confirmed by reproduction. No unsolicited refactors or features.
5. **Duplicate and claim gate.** Search open and closed pull requests and the issue thread. Stop on an open pull request for the issue, an assignee, or a "working on this" comment.
6. **Intake gate.** Where the repo asks for maintainer assignment, an `accepted` label, or a go-ahead, and none exists yet, the output is an intake queue item (a short comment asking to take the issue). No patch is written until the go-ahead arrives.
7. **Repro gate.** A failing test or a documented reproduction exists before any fix.
8. **Patch.** The smallest single-purpose change that fixes the issue, in the repo's own style.
9. **Checks gate.** The repo's own test suite and linters pass locally.
10. **Size gate.** The change is reviewable in under 5 minutes from a 3 to 5 sentence summary. If not, split it or drop it.
11. **Critic gate.** A separate agent reruns the reproduction and the test suite itself, on a different model family where one is available. Re-reading the diff does not count. A critic fail blocks the item.
12. **Disclosure.** Use the registry's format for this repo and this action type: pull request description, issue comment, or review reply. No generic footer. When the repo's policy class is `silent` and the registry has no format for the action type, use the default disclosure line (see `references/pr-description-template.md`). When the repo has an explicit policy that does not cover the action type, the registry says `unknown`: stop.

Operating constraints that sit across every run:

- **Kill switch.** Any close of the user's pull request that cites AI or low-quality automated work pauses that repo and the pipeline.
- **Stale rule.** One polite ping after 14 days of maintainer silence, then close and move on. Both are queue items, never direct posts.

---

## Workflow

1. **Load state.** Read the registry entry for the target repo, check the queue for `pipeline:paused`, and list the queue's posted items for this repo. Confirm the token in use is read-only.
2. **Run gates 1 to 5** from the registry, the repo's guidance files, and the issue thread. Record each result with a link.
3. **Decide the action type.** No go-ahead where one is required: draft an intake item and skip to step 8. Go-ahead in hand, or none required: continue.
4. **Reproduce.** Write the failing test or the reproduction steps. Run it and keep the output.
5. **Patch and check.** Make the smallest fix. Run the repo's tests and linters. Fix only what the change broke.
6. **Size it.** Write the 3 to 5 sentence summary first. If the summary cannot carry the change, split or drop.
7. **Hand to the critic.** Give the critic the repo, the branch, and the reproduction. It reruns both on its own and reports pass or fail with output.
8. **Draft the exact text.** Pull request title and body, intake comment, or review reply, with disclosure in the registry's format for that action type. See `references/pr-description-template.md`.
9. **Build the queue item.** Fill `references/queue-item-template.md` exactly. Include the full diff inline when the registry sets `review_mode: full-diff`. Compute the sha256 of the exact text block.
10. **Stop.** Return the queue item to the user. Filing it in the queue is a separate step on the user's normal login, not on the read-only token. Posting happens only through the queue's poster after the user approves.

---

## Failure patterns

- **Patch before intake.** Writing code for an issue the maintainers have not opened to outside work. Their auto-close bots do not read the diff.
- **Policy by vibe.** Calling a repo `allows` because it has a friendly README. Cite the line or write "none found".
- **One footer for every repo.** Some repos forbid attribution footers; others require a fixed disclosure line. The registry decides, per action type.
- **Summary that is a test log.** "All 214 tests pass" is a gate result, not a summary. The summary says what changed and why, in words the user can repeat to a maintainer.
- **Critic that re-reads.** A second agent agreeing with the diff proves nothing. The critic reruns the reproduction and the suite.
- **Volume.** Several pull requests to one repo in a week reads as automation, whatever the quality. The cadence cap exists for this.
- **Trusting a cached date.** Reading the last submission from the registry when the queue's posted items say otherwise. The queue is the record; the registry date can lag.
- **Silent scope creep.** Fixing a neighboring bug or reformatting a file in the same diff. Split it or leave it.
- **Posting from the research session.** Any outbound write from this skill is a defect, including a "quick" comment asking to be assigned.

---

## Output format

One queue item in markdown, ready to be filed as an issue in the user's approval queue. The structure, section headings, and hash rule are fixed; see `references/queue-item-template.md`. A worked intake example is in `references/example-intake-item.md`.

When a gate stops the run, the output is a short stop report instead: the gate, the reason, the evidence link, and what would clear it.

---

## Reference files

- [`references/queue-item-template.md`](references/queue-item-template.md) - The exact queue-item format, the gate lines, and the hash rule. Read before step 9.
- [`references/policy-classification.md`](references/policy-classification.md) - Where to look for an AI-PR policy, how to classify it, how to cite it, and the eligibility stops. Read during gate 2.
- [`references/pr-description-template.md`](references/pr-description-template.md) - Drafting the exact text per action type with per-repo disclosure. Read at step 8.
- [`references/example-intake-item.md`](references/example-intake-item.md) - A filled intake queue item for a fictional repo.

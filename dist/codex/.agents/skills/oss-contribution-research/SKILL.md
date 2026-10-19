---
name: oss-contribution-research
description: "Research and prepare an outside contribution to an open-source repo, then stop at a queue item for a human to approve: policy check, intake, duplicate check, reproduction, patch, the repo's own checks, an independent critic rerun, and a disclosed, hashed draft of the exact text to post. Use this skill whenever the user wants to contribute to someone else's repo, fix an upstream bug, pick up a good-first-issue, draft an AI-assisted pull request for an outside project, follow up on their own outside PR, or run a gated contribution pipeline. Triggers on open source contribution, contribute to this repo, upstream fix, outside PR, external PR, good first issue, fix this issue in their repo, contribution research, AI-assisted PR, disclose AI in PR, reply to review on my PR. Also triggers when the user names an issue in a repo they do not maintain and asks for a fix, even if they do not say contribute."
---

# OSS Contribution Research

Prepare one outside contribution to an open-source repo, gate by gate, and stop at a queue item a human approves. The agent running this skill never posts.

---

## When to use

- Picking up an existing issue or confirmed bug in a repo the user does not maintain
- Checking whether a repo accepts AI-assisted pull requests before any work starts
- Asking a maintainer for a go-ahead before writing a patch (an intake comment)
- Turning a fix into a small, disclosed pull request draft that a human approves
- Following up on the user's own outside pull request: a review reply, the 14-day ping, or the 28-day close
- Running a contribution pipeline with an approval queue and a per-repo registry

## When NOT to use

- Reviewing a pull request in a repo the user maintains (use `code-review-web`)
- Updating packages or lockfiles in the user's own project (use `dependency-management`)
- Writing a new feature spec for the user's own product (use `pm-spec-writing`)
- Writing a new skill for this catalog (use `skill-creation-walkthrough`)
- Unsolicited refactors, rewrites, or features in someone else's repo. This skill refuses them.

---

## Required inputs

- **Target.** The repo (`owner/repo`) and an existing issue or pull request URL, or a bug the agent can reproduce.
- **Queue snapshot.** Each run starts on the user's normal login. It makes read-only (GET) calls to the user's private approval queue repo and exports a snapshot to a local file. The snapshot holds three things:
  - the registry (`registry.yaml`), with each repo's policy class, disclosure template per action type, review mode, cadence cap, cached last submission date and status;
  - the posted ledger: issues labeled `status:posted`, with the poster's posted markers;
  - the pause state: whether any open issue is labeled `pipeline:paused`.
- **A read-only token.** After the snapshot is written, the run switches to a read-only forge token for all outside research and patch work. It reads the queue only from the snapshot.
  - **Filing.** Filing the finished item into the queue is a separate, internal step on the user's normal login.
  - **Posting.** Posting to the outside repo happens only through the queue's poster, and only on approved items.
  - **Freshness.** The poster revalidates everything at post time, so the snapshot is never the last check.
- **A local clone** of the target repo on a branch the user's fork can push later.

If the snapshot is missing, stop and ask for it. Do not infer a policy, a disclosure template, or a submission history.

---

## The framework: gates in order, stop at the first fail

Each gate either passes with evidence or stops the run with a reason. A stop is a valid result. Report it; do not route around it.

1. **Pipeline gate.** A `pipeline:paused` issue in the snapshot stops everything (kill switch).
2. **Repo gate.** Classify the repo's AI-PR policy as `allows`, `silent`, or `bans`, with the cited line (see `references/policy-classification.md`). Stop on `bans`, and stop when the registry status is not `active`. Stop in each of these cases too, with no exception for a fuller review flow: an excluded repo stays excluded.
   - The policy requires the human owner to attest to reviewing the complete change.
   - The repo accepts issues but not pull requests.
   - The repo accepts pull requests only from members.
3. **Ownership gate.** Before any throttle or duplicate check, classify the target as the user's own work or someone else's.
   - **Own work.** The user's own open pull request, or the user's own claim or intake comment on the issue. It routes to a follow-up item, not a block:
     - a review reply;
     - the 14-day ping (`reply` with `purpose: ping`);
     - the 28-day close (`close`);
     - after an approved intake, the `pr` item itself.
   - **Competing work.** Another person's PR, assignment, or claim. It goes to gate 5, which stops.
4. **Throttle and cadence gate.** This gate applies to new pull requests only, not to replies or closes on the user's own work.
   - Stop if the user already has a different open pull request on this repo.
   - Stop if the cadence cap says the next submission is not due. Take the last submission date from the snapshot's posted ledger. The registry's date is a cached hint only; when the two disagree, the ledger wins.
5. **Duplicate and claim gate.** Search open and closed pull requests and the issue thread. Stop on someone else's open pull request, assignment, or "working on this" comment.
6. **Issue gate.** Work only on an existing issue or a bug confirmed by reproduction. No unsolicited refactors or features.
7. **Intake gate.** Where the repo asks for maintainer assignment, an `accepted` label, or a go-ahead, and none exists yet, the output is an intake queue item (a short comment asking to take the issue). No patch is written until the go-ahead arrives.
8. **Repro gate.** A failing test or a documented reproduction exists before any fix.
9. **Patch.** The smallest single-purpose change that fixes the issue, in the repo's own style.
10. **Checks gate.** The repo's own test suite and linters pass locally, at the commit that will be submitted.
11. **Size gate.** The change is reviewable in under 5 minutes from a 3 to 5 sentence summary. If not, split it or drop it.
12. **Critic gate.** A separate agent reruns the reproduction and the test suite itself, at the exact head commit, on a different model family where one is available. Re-reading the diff does not count. A critic fail blocks the item.
13. **Disclosure.** Fill the item's structured Disclosure field from the registry template for this repo and this action type: `pr_description`, `issue_comment`, or `review_reply` (also used for a close).
    - **`none`.** The disclosure text is `none`.
    - **`unknown`.** Stop.
    - **Template with slots.** Fill every `{slot}` with what actually happened and put that exact line in the text to post (see `references/pr-description-template.md`).
    - **No attribution.** Where a repo forbids AI attribution, no tool name, trailer, or co-author line appears in the pull request body or in any commit.

Operating constraints that sit across every run:

- **Kill switch.** Any close of the user's pull request that cites AI or low-quality automated work pauses that repo and the pipeline.
- **Stale rule.** One polite ping at 14 days of maintainer silence, then a close at 28 days if still silent. Both are queue items the poster sends; neither is posted by hand.
- **Actions.** The poster sends exactly four actions: `intake`, `pr`, `reply`, and `close`. Nothing outbound happens outside them.

---

## Workflow

1. **Snapshot, then switch.** On the user's normal login, export the queue snapshot (registry, posted ledger, pause state) with GET calls only. Then switch to the read-only token and confirm it is the one in use.
2. **Run gates 1 to 3** from the snapshot, the repo's guidance files, and the target thread. Record each result with a link. If gate 3 finds the user's own work, draft the follow-up item and skip to step 9.
3. **Run gates 4 to 6** for new work.
4. **Decide the action type.** No go-ahead where one is required: draft an intake item and skip to step 9. Go-ahead in hand, or none required: continue.
5. **Reproduce.** Write the failing test or the reproduction steps. Run it and keep the output.
6. **Patch and check.** Make the smallest fix. Run the repo's tests and linters. Fix only what the change broke. Push the branch to the user's fork and record the full head SHA and the base SHA it was built on.
7. **Size it.** Write the 3 to 5 sentence summary first. If the summary cannot carry the change, split or drop.
8. **Hand to the critic.** Give the critic the repo, the branch, the head SHA, and the reproduction. It reruns both on its own and reports PASS or FAIL with output and the SHA it ran.
9. **Draft the exact text.** Pull request title and body, intake comment, reply, or closing comment, with the disclosure line from the registry template. See `references/pr-description-template.md`.
10. **Build the queue item.** Fill `references/queue-item-template.md` exactly:
    - a unique `item_id`;
    - for a `pr`, the head and base SHAs;
    - one structured result per gate;
    - the Disclosure field;
    - the full diff of `base_sha...head_sha` when the registry sets `review_mode: full-diff`;
    - the sha256 of the exact text block.
11. **Stop.** Return the queue item to the user. Filing it in the queue is a separate step on the user's normal login, not on the read-only token. Posting happens only through the queue's poster after the user approves.

---

## Failure patterns

- **Patch before intake.** Writing code for an issue the maintainers have not opened to outside work. Their auto-close bots do not read the diff.
- **Policy by vibe.** Calling a repo `allows` because it has a friendly README. Cite the line or write "none found".
- **One footer for every repo.** Some repos forbid AI attribution in bodies and commits; others require a fixed disclosure line. The registry template decides, per action type.
- **Blocking on your own work.** Treating the user's own open pull request or claim as a duplicate. Gate 3 routes it to a reply, ping, or close.
- **Summary that is a test log.** "All 214 tests pass" is a gate result, not a summary. The summary says what changed and why, in words the user can repeat to a maintainer.
- **Critic that re-reads.** A second agent agreeing with the diff proves nothing. The critic reruns the reproduction and the suite at the head SHA.
- **Moving the branch after approval.** Any push after the item is filed changes the head SHA, and the poster refuses the item. File a new item instead.
- **Volume.** Several pull requests to one repo in a week reads as automation, whatever the quality. The cadence cap exists for this.
- **Trusting a cached date.** Reading the last submission from the registry when the posted ledger says otherwise. The ledger is the record; the registry date can lag.
- **Silent scope creep.** Fixing a neighboring bug or reformatting a file in the same diff. Split it or leave it.
- **Posting from the research session.** Any outbound write from this skill is a defect, including a "quick" comment asking to be assigned.

---

## Output format

One queue item in markdown, ready to be filed as an issue in the user's approval queue. The structure, section headings, field names, and hash rule are fixed; see `references/queue-item-template.md`. A worked intake example is in `references/example-intake-item.md`.

When a gate stops the run, the output is a short stop report instead: the gate, the reason, the evidence link, and what would clear it.

---

## Reference files

- [`references/queue-item-template.md`](references/queue-item-template.md) - The exact queue-item format, the structured gate and disclosure fields, and the hash rule. Read before step 10.
- [`references/policy-classification.md`](references/policy-classification.md) - Where to look for an AI-PR policy, how to classify it, how to cite it, and the eligibility stops. Read during gate 2.
- [`references/pr-description-template.md`](references/pr-description-template.md) - Drafting the exact text per action type with per-repo disclosure. Read at step 9.
- [`references/example-intake-item.md`](references/example-intake-item.md) - A filled intake queue item for a fictional repo.

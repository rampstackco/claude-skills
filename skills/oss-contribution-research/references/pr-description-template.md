# Exact-text templates

Drafts for the "Exact text to post" block. This is the text that appears under the user's name, so it is short, specific, and disclosed in the target repo's own format. Take the disclosure from the registry entry for the repo and the action type:

| Action | Registry key |
|---|---|
| Pull request | `pr_description` |
| Intake comment | `issue_comment` |
| Review reply | `review_reply` |

For a repo whose policy class is `silent`, the registry carries these defaults:

- **Pull request description:** one prose line in the body, with no tool or vendor name and no footer:

  ```text
  Drafted with AI assistance and approved by me. Verification: [what was actually run].
  ```

  Write the verification in the passive voice and list only what was run, for example "the issue was reproduced, a regression test was added, and the full test suite passes locally." Do not say the user reproduced, tested, or reviewed the change personally.
- **Issue comment and review reply:** no disclosure line. The user approves the text word for word and posts it under their own name. If a maintainer asks about AI use, the drafted reply answers directly and plainly.

**No AI attribution.** Some repos forbid attributing commits or pull request bodies to an AI tool. There, disclosure stays the prose line above, and no tool or model name, trailer, co-author line, or generated-by line appears in the body or in any commit message.

If the value is `unknown`, the repo has an explicit policy that does not cover this action type. Stop.

## Pull request (action: pr)

The first line is the title, then one blank line, then the body. Follow the repo's title convention if it has one, for example `fix(parser): ...`.

```text
[type(scope): what the fix does]

Fixes #[issue].

[What was wrong, in one or two sentences, from the user's side of the bug.]

[What the change does and why this approach, in two or three sentences.]

How to verify: [the failing test that now passes, or the reproduction steps].

[Disclosure in the registry's pr_description format.]
```

Rules:

- If the repo's pull request template has checkboxes or declarations, fill only those the user can truthfully make.
- Never tick a box that attests to a human review on the user's behalf. Leave it for the user to fill in through the approval step.
- No claims the diff does not support, such as "improves performance" without a measurement.
- No unrelated cleanup mentioned or included.

## Intake comment (action: intake)

```text
[One sentence: what was reproduced, and on which version or commit.]
[One sentence: the fix being considered, in plain terms.]
Would a pull request for this be welcome? [If the repo assigns issues: Could this be assigned to me?]

[Disclosure in the registry's issue_comment format.]
```

Keep it under 80 words. Maintainers read many of these. A reproduction makes the comment worth reading.

## Review reply (action: reply)

```text
[Address each review point in order: what changed, or why not, in one or two sentences each.]
[Link the new commit.]

[Disclosure in the registry's review_reply format.]
```

Rules:

- Reply to the review. Do not reopen a design question the maintainer already settled.
- Where the repo asks agents to update an existing comment rather than post another, keep replies to one per review round.

## Disclosure placement

| Pattern in the registry | Where it goes |
|---|---|
| Disclosure with extent | The final paragraph of the body, naming what the AI did (code, tests, description). |
| Fixed description line | Verbatim on its own line, with the agent's own name and link. |
| Environment disclosure | A short list: model, harness, harness version, plugins. |
| No AI attribution | The prose line, with no tool or model name. No trailer, no co-author line, no generated-by line, no badge, in the body or the commits. |
| Silent policy | Pull request description: the prose line. Comments and replies: none. |

# Queue-item template

The final output of the skill. One item covers one outbound action. Section headings and field names are exact, because the queue's poster parses them and refuses anything ambiguous. Copy the block below and replace every bracketed field.

## Template

````markdown
Title: [intake|pr|reply|close] [owner/repo]#[issue or PR number] [short description]

## Target
- item_id: [unique slug, a-z 0-9 and -, 8 to 80 characters, e.g. feedparse-412-intake]
- repo: [owner/repo]
- url: [https://github.com/owner/repo/issues/N, or /pull/N for a reply on a PR, a ping, or a close; the one full URL in the item]
- action: [intake | pr | reply | close]
- purpose: ping                         (reply only, for the 14-day ping)
- head: [user's fork owner:branch]      (pr only)
- base: [target base branch]            (pr only)
- head_sha: [full 40-character SHA]     (pr only)
- base_sha: [full 40-character SHA]     (pr only)

## Policy
[allows | silent] with the cited line and its URL, or "none found". Then the disclosure rule for this repo and this action type, copied from the registry.

## Gates
- intake: [PASS | N/A] | [maintainer go-ahead or assignment, as owner/repo#n in a code span plus the comment date, or why it does not apply]
- duplicate: PASS | [no one else's open PR, assignee, or claim; what was searched, date]
- cadence: PASS | [last submission date or none, from the posted ledger; cap]
- repro: [PASS | N/A] | [test name or repro record path, or why it does not apply]
- checks: [PASS | N/A] | [commands run and result, at the head SHA]
- size: PASS | [reviewable in under 5 minutes from this summary]
- critic: [PASS | N/A] | [independent rerun at head SHA, first 7+ characters; model family; result]

## Disclosure
- format: [pr_description | issue_comment | review_reply]
- text: [the disclosure line exactly as it appears in the exact text, or none]

## Summary
[3 to 5 plain sentences: what the change does and why. A non-author could repeat this to a maintainer. No test results here; those go in Gates.]

Files touched: [list]. Lines: +[added] / -[removed]. Branch: [link to the branch on the user's fork].

## Full diff (only when the registry sets review_mode: full-diff)
```diff
[git diff base_sha...head_sha, complete]
```

## Exact text to post
```text
[verbatim text, disclosure line included]
```

## Hash
[sha256 of the exact text block]
````

## Actions

| Action | What the poster sends | Target URL |
|---|---|---|
| `intake` | A comment on the issue | The issue |
| `pr` | Opens a pull request from `head` into `base` | The issue it fixes |
| `reply` | A comment on the issue or pull request conversation. With `purpose: ping`, it is the 14-day ping. | The thread being answered |
| `close` | A closing comment, then closes the user's own pull request (28-day rule) | The user's pull request |

There is no other action type and no manual path. Anything outbound that does not fit these four is out of scope for the pipeline.

## Rules

- **Title.** It agrees with the Target section on the type, the repo and the number.
- **Target.** Each field appears once.
  - **`item_id`.** It is unique across the queue. Never reuse one, even for a retry.
  - **`pr` fields.** A `pr` item names the head on the user's fork and the full head and base SHAs.
  - **Branch freeze.** Do not push to the branch after filing: the poster refuses the item if the branch is no longer at `head_sha`.
- **Gates.** One line per gate: `- <gate>: PASS | <evidence>` or `- <gate>: N/A | <reason>`, with the value in capitals.
  - **N/A.** A gate that does not apply to the action reads `N/A` with the reason. For example, an intake item has no patch yet, so repro, checks and critic read `N/A | no patch yet`.
  - **`pr` items.** These need `PASS` on all seven gates, and the critic evidence names the head SHA.
  - **Failures.** A gate that failed means there is no queue item; write a stop report instead. An item carrying `FAIL` is refused.
- **Disclosure.** `format` is `pr_description` for a pull request, `issue_comment` for an intake comment, and `review_reply` for a reply or a close.
  - **Template.** `text` matches the registry template for that repo and format, with every `{slot}` filled with what actually happened.
  - **Placement.** The same line appears on its own line in the exact text.
  - **`none`.** When the template is `none`, the text is `none`.
  - **Placeholders.** Text in `<...>` or `{...}`, `TODO`, `TBD`, `e.g.` or `...` in a slot is refused.
- **Exact text to post.** The section holds exactly one fenced block and nothing else.
  - For `pr` items, the first line of the block is the pull request title, then one blank line, then the body.
  - If the text contains triple backticks, fence it with four.
- **Full diff.** Include it for `pr` items when the registry entry says `review_mode: full-diff`, and leave the section out otherwise. Paste `git diff base_sha...head_sha` unedited: the poster generates the same diff and refuses on any difference.
- **Cross-references.** The queue repo is private, but a pasted issue or pull request URL in the item body still creates a cross-reference event on the public thread, and so does a bare `#n` or `owner/repo#n` outside a code span. In Policy, Gates and Summary, name outside issues and pull requests as `owner/repo#n` inside a code span, with a date or author when one comment is meant. The Target `url` field is the one full URL in the item, because the poster parses it; until the poster accepts another form there, that line is still a reference. The exact text block is fenced, so nothing in it is autolinked from the queue.
- **Hash.** The value is the sha256 of the lines between the opening and closing fence of the exact text block:
  - lines joined with `\n`
  - CRLF normalized to LF
  - no trailing newline

  Any edit to the text after approval changes the hash, and the poster refuses the item.

## Computing the hash

Write the text to a file without a trailing newline, then:

```
sha256sum exact-text.txt          # Linux
shasum -a 256 exact-text.txt      # macOS
certutil -hashfile exact-text.txt SHA256   # Windows
```

If the queue repo ships a hash helper, prefer it, because it applies the same normalization the poster uses. Read it, and the queue's own format and poster docs, from the local clone of the queue repo: the read-only token cannot read a private repo.

## Validating before filing

The poster has a fixture (dry-run) mode that evaluates an item from a local file against a local registry file and never writes. Before filing, run it with the finished item as the fixture. It parses the sections, checks the labels, the disclosure, the gates and the hash, and prints the calls it would make. An item that blocks there is fixed before it is filed, not after.

# Queue-item template

The final output of the skill. One item covers one outbound action. Section headings are exact, because the queue's poster parses them. Copy the block below and replace every bracketed field.

## Template

````markdown
Title: [intake|pr|reply|other] [owner/repo]#[issue or PR number] [short description]

## Target
- repo: [owner/repo]
- url: [https://github.com/owner/repo/issues/N or /pull/N]
- action: [intake | pr | reply | other]
- head: [fork-owner:branch]        (pr only)
- base: [target base branch]       (pr only)

## Policy
[allows | silent] with the cited line and its URL, or "none found". Then the required disclosure format for this repo and this action type, copied from the registry.

## Gates
- [x] intake: maintainer go-ahead or assignment ([link])
- [x] duplicate/claim check (no open PR, assignee, or claim; [what was searched, date])
- [x] cadence cap (last submission [date or none], cap [cap])
- [x] repro: failing test or documented reproduction ([test name or steps link])
- [x] repo checks pass locally ([commands run, result])
- [x] size: reviewable in under 5 minutes from this summary
- [x] critic: independent rerun of reproduction and tests ([model family], [pass or fail])

## Summary
[3 to 5 plain sentences: what the change does and why. A non-author could repeat this to a maintainer. No test results here; those go in Gates.]

Files touched: [list]. Lines: +[added] / -[removed]. Branch: [link to the branch on the user's fork].

## Full diff (only when the registry sets review_mode: full-diff)
```diff
[the complete diff]
```

## Exact text to post
```text
[verbatim text, disclosure included]
```

## Hash
[sha256 of the exact text block]
````

## Rules

- **Title.** It agrees with the Target section on the type, the repo and the number.
- **Gates.** All seven gates are present and checked. A gate that does not apply to the action is checked and marked `n/a` with the reason. For example, an intake item has no patch yet, so repro, checks and critic read `n/a, no patch yet`. A gate that failed means there is no queue item; write a stop report instead.
- **Exact text to post.** The section holds exactly one fenced block and nothing else.
  - For `pr` items, the first line of the block is the pull request title, then one blank line, then the body.
  - If the text contains triple backticks, fence it with four.
- **Full diff.** Include it when the registry entry says `review_mode: full-diff`, and leave the section out otherwise.
- **Type `other`.** These items are never posted automatically. The user acts on them by hand.
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

If the queue repo ships a hash helper, prefer it, because it applies the same normalization the poster uses.

# Example: intake queue item

A fictional repo, `example-org/feedparse`, has an open issue #412: parsing an RSS feed with an empty `<pubDate/>` raises an exception instead of returning no date. Its CONTRIBUTING file asks outside contributors to comment on an issue and wait for a maintainer before opening a pull request. Gates 1 to 5 pass. Gate 6 has no go-ahead yet, so the output is an intake item, not a patch.

The registry entry for `example-org/feedparse` has:

- status `active`
- review mode `summary`
- cadence cap `1 open PR at a time`
- no prior submission
- `issue_comment` disclosure rule: "Say in the comment that it was drafted by an AI agent and reviewed by the user before posting."
- `issue_comment` disclosure template: `This comment was drafted by an AI agent and reviewed by me before posting.`

````markdown
Title: [intake] example-org/feedparse#412 ask to fix empty pubDate exception

## Target
- item_id: feedparse-412-intake-empty-pubdate
- repo: example-org/feedparse
- url: https://github.com/example-org/feedparse/issues/412
- action: intake

## Policy
allows: CONTRIBUTING.md:41 "AI-assisted contributions are welcome if disclosed" (https://github.com/example-org/feedparse/blob/main/CONTRIBUTING.md). Disclosure for issue_comment: say the comment was drafted by an AI agent and reviewed by the user before posting.

## Gates
- intake: N/A | this item is the intake request (CONTRIBUTING.md:18 asks for a comment first)
- duplicate: PASS | no open PR body names `example-org/feedparse#412`, no assignee, no claim in 6 comments; open PRs listed 2026-10-17
- cadence: PASS | last submission none in the posted ledger; cap 1 open PR at a time
- repro: N/A | no patch yet (issue reproduced locally on main at a1b2c3d with the feed in the issue)
- checks: N/A | no patch yet
- size: PASS | comment only
- critic: N/A | no patch yet

## Disclosure
- format: issue_comment
- text: This comment was drafted by an AI agent and reviewed by me before posting.

## Summary
The feed parser crashes when a feed item has an empty publication date tag, instead of treating the date as missing. The issue is open, confirmed by two users, and nobody has claimed it. The repo asks outside contributors to check in before opening a pull request, so this comment asks whether a fix is welcome. No code has been written yet.

Files touched: none. Lines: +0 / -0. Branch: none yet.

## Exact text to post
```text
Reproduced on main (a1b2c3d) with the feed attached above: an empty <pubDate/> raises ValueError in parse_date instead of returning None.
A fix would treat an empty or whitespace-only date as missing, with a test for this feed.
Would a pull request for this be welcome?

This comment was drafted by an AI agent and reviewed by me before posting.
```

## Hash
af8a741e1fee86268cc1e637f27ca75e03c531de6b9a9dbfc3ad70e7a8811aa5
````

What happens next:

- Before filing, the item is run through the poster's fixture dry-run with the local registry. It reports one planned comment on `example-org/feedparse#412` with the exact text, and the hash matches.
- The user reads the Summary and the exact text on their phone and comments `approve`. The queue's poster then posts the comment.
- When a maintainer replies with a go-ahead, the skill runs again from gate 6. It then produces a `pr` item with a patch, the critic result, and a pull request body.

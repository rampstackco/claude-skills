# PR Body Template

The draft PR body is the agent's report. The reviewer reads it before the diff, so it should say what changed, prove it with pasted output, and surface every decision the dispatch did not cover.

Put this template, or a pointer to it, in the dispatch's delivery section.

---

## Template

````
## Summary

[Two to four sentences. What this PR does and why. Link the dispatch or the source spec.]

## Scope

| Item | Change |
|---|---|
| [file, folder, or component] | [added / changed / regenerated] |

Out of scope, untouched: [list from the dispatch]

## Verification

Each command as run, with its output pasted. Not summarized.

### 1. [Check name]
```
$ [command]
[output]
```

### 2. [Check name]
```
$ [command]
[output]
```

[Repeat for every verification step in the dispatch.]

## Gate 0 record

- Remote: [what was found]
- Visibility: [what was found]
- Branch and worktree: [names]
- Generated files and their generators: [file: script and flag]

## Judgment calls

Decisions the dispatch did not cover, and what was chosen:

- [Decision]: [choice]. Reason: [one line].

## Stop conditions hit

[None, or each one with what was found and what was done.]

## Open questions

- [Question for the planner or reviewer]

## Not done

[Anything in the dispatch that was not completed, and why. Or "none."]
````

---

## Rules for the agent

- Paste output. "All checks pass" without output is not verification.
- Run each verification after the final commit, not before.
- List every judgment call, even small ones. The reviewer decides whether it was small.
- If something is not done, say so in "Not done." A complete-looking PR that is partly done costs more review time than an honest partial.
- Leave the PR as draft. Do not request review unless the dispatch says to.

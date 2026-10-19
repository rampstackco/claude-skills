# Dispatch Template

Copy this file, replace every bracketed field, and delete any guidance line in parentheses before sending. Keep the seven parts in this order. An agent reads top to bottom with no other context.

---

## Template

```
# Dispatch: [short description of the work]

Date: [YYYY-MM-DD]
Target repo: [owner/repo] ([PUBLIC or PRIVATE])
Default branch: [main]
Branch: [type/short-name]
Lane: [single agent, single worktree, single held draft PR]
Planner: [who wrote this]. Executor: [which agent]. Merger: [who merges; never the agent].

## Gate 0 (run before any write)

1. Confirm the remote is [owner/repo]. Stop and report if it resolves anywhere else.
2. Confirm visibility is [public/private]. (If public: nothing internal goes in files, commits, or the PR body.)
3. Create a fresh worktree on branch [branch]. Never write to the canonical checkout or to [default branch].
4. Read, in this order, before writing anything:
   - [authoring or style guide]
   - [contribution guide]
   - [closest existing example to match]
   - [each script this dispatch calls; read its docstring]
5. Record how each generated file is produced (script and flag). Do not hand-edit generated files. If no script produces one this dispatch needs, stop and report.
6. Check for agent instruction files in the repo ([e.g., a contributor guide for agents]). If present, follow them too.

## Scope

In:
- [What is created or changed]
- [Generated files that will change as a result]

Out:
- [Nearby things that must not change]
- [Refactors, renames, or cleanups not asked for]

## Specification

[The work. Point at the source spec by path or link. State constraints, conventions, and examples to match. Where judgment is wanted, say what to optimize for.]

## Verification (run all, paste output in the PR body)

1. [Exact command]. Expected: [result].
2. [Exact command]. Expected: [result].
3. Read back [file or files] from disk and confirm [property].
4. [Search command] returns nothing for [forbidden pattern].
5. [Any count or list check, derived at run time, never compared to a number typed in this dispatch.]

## Delivery

- Branch [branch]. Commits: [structure and message format].
- Open ONE draft PR titled [title]. Body follows the PR body template: scope, verification output pasted verbatim, judgment calls, open questions.
- Leave it as draft. Do not request review. Do not merge.
- Cleanup: [who removes the worktree and branch, and when].
- Report back: PR URL, verification summary, any stop condition hit.

## Stop conditions

Stop and report rather than proceed if:
- Any Gate 0 check fails
- A script this dispatch relies on does not exist or behaves differently than described
- The spec is ambiguous in a way that would change the result
- Any step would require force-pushing, rewriting shared history, deleting data, or touching [default branch]
- [Any work-specific condition]

A stop is a good outcome. Report what you found, what you did, and what you need.

## Open questions deferred to the planner (do not block on these)

- [Question the agent should not try to answer]
```

---

## Notes on each part

- **Header.** Owner and repo exactly as the remote shows them. A one-character typo is how work lands in a fork.
- **Gate 0.** Every check needs a stop action. A check without one is a suggestion.
- **Scope.** "Out" is as important as "in." Agents tidy up nearby code unless told not to.
- **Specification.** Match an existing example in the repo whenever one exists. "Match the style of X" carries more than a paragraph of adjectives.
- **Verification.** Commands and expected results. Paste, do not paraphrase.
- **Delivery.** Draft PR, never merge. Name who cleans up.
- **Stop conditions.** Write the ones you can predict. The agent should treat anything irreversible as one even if unlisted.

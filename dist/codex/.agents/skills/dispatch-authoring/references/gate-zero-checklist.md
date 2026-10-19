# Gate 0 Checklist

Gate 0 is the set of checks an agent runs before it writes anything. Each check has a stop action. Use this list when writing a dispatch's Gate 0, and again when reviewing a dispatch before it goes out.

---

## Identity

- [ ] **Remote matches.** The agent compares the remote URL to the exact `owner/repo` in the header.
  Stop action: report the remote it found and write nothing.
- [ ] **Visibility matches.** The agent confirms public or private through the hosting platform, not by assumption.
  Stop action: report the mismatch. A private-intended change in a public repo is a leak.
- [ ] **Default branch named.** The dispatch names the default branch so the agent can refuse to touch it.
  Stop action: if the default branch is checked out with uncommitted changes, report and do not stash or reset.

## Isolation

- [ ] **Fresh worktree or branch.** The agent creates a new worktree (or a new branch in a disposable clone) for this dispatch only.
  Stop action: if the branch name already exists, report. Do not reuse or reset it.
- [ ] **Canonical checkout untouched.** The dispatch says where not to write.
  Stop action: any write outside the worktree is a stop.
- [ ] **One dispatch per worktree.** No other dispatch is running in the same worktree.

## Reading

- [ ] **Required reading listed in order.** Authoring guide, contribution guide, the closest existing example, then the scripts the dispatch calls.
- [ ] **Agent instruction files checked.** Any repo-level instructions for agents are read and followed.
- [ ] **Scripts read, not assumed.** The agent reads each script's docstring or header before running it.
  Stop action: if a named script does not exist, report. Do not write a replacement.

## Generated files

- [ ] **Generators identified.** For each generated file the work will change (manifests, lock files, catalogs, dist builds), the agent records the script and flag that produces it.
  Stop action: if no script produces it, report. Never hand-edit a generated file.
- [ ] **Generators runnable.** The agent confirms each generator runs on the clean tree before making changes, so later failures are attributable.
  Stop action: if a generator fails on the clean tree, report the failure before writing anything.

## Safety

- [ ] **No destructive operations needed.** The plan does not require force-push, history rewrite, deleting branches, or deleting data.
  Stop action: if it does, report and wait.
- [ ] **No secrets needed.** The work does not require credentials beyond what the session already has.
  Stop action: if it does, report. Do not search for credentials.
- [ ] **Public repo hygiene.** For a public repo, the dispatch lists what must not appear: internal paths, private repo names, client names, internal hostnames.

---

## Review questions for the planner

Before sending, read Gate 0 as the agent and ask:

1. Could the agent write to the wrong place if any one line here were wrong?
2. Does every check have an observable pass or fail?
3. Does every failure have a stop action?
4. Is any count or list hardcoded that the agent should derive at run time instead?

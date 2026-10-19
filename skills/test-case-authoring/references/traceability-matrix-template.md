# Traceability Matrix Template

The matrix proves two things: every acceptance criterion has a test, and every test has a reason to exist. Build it after writing cases and before calling the plan done.

---

## Template

```
TRACEABILITY: [ticket ID and title]

| Criterion or risk | Text (short) | Cases | Levels | Status |
|---|---|---|---|---|
| AC-1 | [short paraphrase] | TC-01, TC-02 | unit, e2e | covered |
| AC-2 | [short paraphrase] | TC-03 | integration | covered |
| AC-3 | [short paraphrase] | none | | GAP: not testable as written |
| RISK: [name] | [what could break] | TC-08 | integration | covered |
```

Status values: `covered`, `partial` (some sub-condition untested, name it), `GAP` (no case, with the reason), `untestable` (with what would make it testable), `deferred` (with owner and date).

---

## Reverse check: cases to criteria

```
| Case | Traces to | Class |
|---|---|---|
| TC-01 | AC-1 | happy path |
| TC-02 | AC-1 | boundary and edge |
| TC-03 | AC-2 | happy path |
| TC-08 | RISK: [name] | regression |
```

Every case appears once. Every case has exactly one trace. A case that traces to nothing is either a missing risk (name it and add a risk row) or noise (cut it).

---

## Gap checks

Run these before the plan is done.

- [ ] Every acceptance criterion has at least one case, or a status of GAP, untestable, or deferred with a reason
- [ ] Every case traces to exactly one criterion or one named risk
- [ ] No criterion is covered only by a manual case when a lower level could observe it
- [ ] Every risk from the ticket's regression risk field has a row
- [ ] Every GAP has a proposed rewrite of the criterion sent back to the ticket author

---

## Handling a gap

A GAP row is useful output, not a failure of the plan. It means the criterion needs to change before anyone can say it is done.

| Criterion as written | Why it is a gap | Proposed rewrite |
|---|---|---|
| "Search is fast" | No threshold, no data size | "Given 10,000 records, when the user types 3 characters, then results render within 1 second" |
| "Users will love the new layout" | Not observable at test time | Move to a post-launch metric on the epic; drop from the story's criteria |
| "Works on all devices" | Unbounded | "Given viewports of 375px, 768px, and 1440px, the page has no horizontal scroll" |

Send the rewrite to the ticket author. The criterion is theirs to change.

---

## For bugs

The matrix for a bug is short:

| Row | Cases |
|---|---|
| REPRO: [the failing behavior] | TC-01 (fails before the fix, passes after) |
| QA NOTE: [each edge case listed on the ticket] | TC-02 to TC-0n |
| RISK: [each shared path from regression risk] | TC-.. |

The repro case is the one named in the ticket's fix verification method.

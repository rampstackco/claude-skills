# Refresh vs merge vs delete

The disposition decision. When to refresh, when to merge, when to delete and redirect. The under-recognized failure of refreshing pieces that should have been merged or deleted.

Most refresh programs default to refresh as the disposition. The default is wrong. Some pieces should be merged into stronger siblings; some should be deleted and redirected. The disposition decision is upstream of the depth decision: a piece getting deleted does not need depth, and a piece being merged is doing a different kind of work than refresh.

---

## Refresh

The piece has a clear topic, real demand, and either a strong-enough current position to recover or a strong-enough strategic role in the library to justify the work.

**Criteria for refresh disposition.**

- The piece has demonstrated demand: it draws meaningful traffic now or did historically.
- The topic is one the brand wants to own; the piece's existence is strategically warranted.
- A path to recovery exists: refresh of the right depth has a reasonable chance of producing improvement.
- No sister piece is competing for the same query in a way that splits authority.
- The piece's URL has accumulated authority worth preserving.

**When refresh fits but might not.**

- Sometimes a refresh-eligible piece is also a merge candidate. A high-value-decaying piece that is decaying because a sister piece is stronger may produce more value through merge than through refresh of either piece alone.
- Sometimes refresh has been tried and did not produce recovery. The first failed refresh shifts disposition consideration toward merge or full-rewrite-with-new-positioning rather than another refresh attempt.

**Refresh failure modes.**

- Refreshing pieces that are not recoverable. The topic is dying; the brand cannot win against the competition; the SERP intent has shifted to a format the brand does not produce. Refresh in these cases is theater.
- Refreshing without resolving the underlying issue. If a piece is decaying because a sister piece is competing for the same query, refresh of the original piece does not solve the cannibalization. Both pieces continue to underperform.

---

## Merge

Two or more pieces are competing for the same query, splitting authority and confusing the reader. Combine into one stronger piece; redirect the merged URLs.

**Criteria for merge disposition.**

- Two or more pieces target the same primary query or a closely overlapping query cluster.
- Combined authority across the pieces is meaningful; merging would produce a piece with stronger authority than any individual piece has.
- The pieces' coverage overlaps enough that consolidation produces a coherent piece, not a Frankenstein of mismatched sections.
- The team can identify which URL the survivor occupies (typically the one with strongest existing authority) and which URLs redirect to the survivor.

**The merge decision in detail.**

- **Identify the survivor URL.** Usually the URL with strongest existing rankings, traffic, and backlinks. The survivor inherits the consolidated content; other URLs redirect to it.
- **Plan the consolidated content.** Outline the merged piece. Decide which sections come from which source piece. Plan the gaps where new content will fill what neither piece had.
- **Author the consolidated piece.** Write or rewrite as needed. The consolidated piece is usually stronger than any of the source pieces because it is built from the strongest components plus targeted new content.
- **Implement redirects.** 301 redirects from the merged URLs to the survivor. Redirects need to be implemented at publish time, not after; the merged URLs going to 404 or 410 produces traffic loss that did not need to happen.
- **Update internal links.** Pieces that linked to the merged URLs should be updated to link to the survivor.

**Merge failure modes.**

- Merging without redirects. The merged URLs go to 404; the consolidated authority does not transfer; traffic is lost.
- Merging pieces that did not actually compete. If two pieces target different intents, merging them produces a piece that does neither well.
- Frankenstein merges. The consolidated piece reads as multiple pieces stitched together rather than as a unified piece. Cure: rewrite the consolidated piece as a piece in its own right, using the source pieces as input rather than as components.

---

## Delete

The piece has no real demand, the topic is no longer relevant to the brand's positioning, or the piece is a low-quality artifact from an earlier era of the program.

**Criteria for delete disposition.**

- The piece draws minimal traffic and has minimal residual authority.
- The topic is not load-bearing for the program; the brand does not need to own it.
- No merge candidate exists; the piece's content does not consolidate cleanly into any stronger piece.
- Maintaining the piece costs ongoing audit attention without proportional return.

**The delete decision in detail.**

- **Identify the redirect target.** The deleted URL should redirect to the closest sibling piece, or to the relevant hub or category page, or to the homepage if no other target fits. Deleting without redirect (returning 404 or 410) is correct only when the piece's residual authority is genuinely zero, which is rare.
- **Implement the redirect.** 301 redirect to the chosen target.
- **Update internal links.** Pieces that linked to the deleted URL should be updated to link to the redirect target directly. The redirect chain still works but direct links are cleaner.
- **Document the deletion.** The audit log should capture the delete decision, the rationale, and the redirect target. Future audits can reference the log if a question arises about the URL.

**Delete failure modes.**

- Avoiding delete because deleting feels destructive. The library accumulates low-value pieces forever, costing ongoing audit attention and diluting overall library quality.
- Delete without redirect. The URL returns 404; whatever residual authority existed is lost; users who linked to the URL or bookmarked it find a dead link.
- Delete of pieces that should have been merged. The piece's content had value the team did not recognize; merging would have preserved it. Delete is appropriate when no merge candidate exists, not as the easy path to avoid the merge analysis.

---

## The disposition decision flow

A short framework for choosing.

1. **Does the piece have demonstrated demand?** Traffic, rankings, conversions, or strategic role. If yes, continue. If no, the disposition is likely delete (or merge if there is a candidate).
2. **Is there a sibling piece competing for the same query?** If yes, evaluate merge. The merged piece has a strong chance of outperforming both original pieces.
3. **Is the topic load-bearing for the brand?** If no, refresh disposition is unlikely to be the right answer; consider merge into a stronger sibling or delete.
4. **Has refresh been tried recently without recovery?** If yes, the next disposition should be merge or full-rewrite-with-new-positioning, not another refresh attempt.
5. **What is the cheapest disposition that addresses the actual problem?** Refresh is often defaulted to because it feels less destructive; merge and delete are sometimes the cheaper paths to the actual outcome.

---

## The under-recognized failure: refreshing what should have been merged or deleted

The pattern that costs refresh programs the most capacity.

**How it shows up.** The team spends 4 hours refreshing a low-value-decaying piece that even at its best will not draw meaningful traffic. The refresh ships. The piece ranks slightly better for two weeks, then drifts back down. Three months later the piece is in the same audit queue.

**Why it happens.**

- Refresh feels less destructive than merge or delete.
- The merge analysis takes time; refresh feels like the immediate action.
- Delete requires team agreement; refresh can be done by a single owner.
- The team has not internalized that some pieces should not be refreshed.

**The cure.** Make merge and delete first-class dispositions in the audit. Every piece in the audit gets one of: refresh, merge, delete, monitor, no action. The audit is not "which pieces to refresh"; it is "what disposition each piece should get." Refresh becomes one option among several rather than the default.

**The capacity recovery.** Programs that adopt the merge-and-delete-as-first-class-dispositions discipline typically recover 20-40% of refresh capacity for higher-value work. The pieces that were getting refreshed but should have been merged or deleted stop consuming capacity; the freed capacity goes to high-value-decaying pieces that produce real recovery.

---

## Disposition decisions that need approval

Some dispositions are higher-risk than others and warrant approval beyond the audit owner.

**Delete dispositions.** Always need approval. Deletes are essentially irreversible without significant work to undelete; the redirect strategy is consequential; the team should be aligned on the decision.

**Merge dispositions involving high-value pieces.** Need approval. Merging into a survivor URL means the non-survivor URLs lose their identity. If the non-survivor pieces had high-value characteristics, the merge needs review.

**Refresh dispositions on stable high-value pieces.** Need approval. Touching a stable high-value piece is a high-risk operation; the audit owner should not unilaterally decide to refresh.

**Light edit and substantial revision on decaying pieces.** Usually do not need approval beyond the audit owner. The risk-reward is straightforward.

---

## Methodology-level choices that stay in the public skill

The three dispositions and their criteria, the disposition decision flow, the under-recognized failure of refreshing what should have been merged or deleted, the merge and delete mechanics, the dispositions that need approval.

## Implementation choices that stay internal

Specific redirect implementation in the team's CMS or hosting layer. Specific internal-link update automation that catches links to merged or deleted URLs. Specific approval workflows for high-risk dispositions. Specific audit-log templates that capture disposition rationale. These vary by team, tooling, and CMS.

# Brief governance patterns

Versioning, single-approver, archival alongside the published piece, audit trail.

---

## Versioning

Every brief has a version. Significant changes bump the version; cosmetic edits do not.

**Version-bump triggers:**
- Target keyword change (the piece is now optimizing for a different keyword)
- Audience shift (the JTBD has changed)
- Scope expansion or contraction (word count target moves by 50%+; new H2s added or removed)
- Success criteria change (the metric the piece is being measured against shifts)

**No version bump for:**
- Typo fixes
- Anchor text adjustments on internal links
- Adding a sentence of clarification to an existing field
- Reformatting

The writer always works from the current version. If a writer is mid-draft when the brief bumps from v2 to v3, the strategist tells the writer immediately and decides whether to restart, integrate the changes, or freeze the v2 draft.

The brief has a version field at the top: `brief_version: 3`. The version is the contract identifier.

---

## Single approver

The brief approver is the editorial owner of the content program. Single approver, not a committee.

**Why single approver:**
- A committee bog dilutes the brief. Each member adds a field; nobody removes fields. The brief grows from 1 page to 4 pages and stops being readable.
- A committee splits accountability. When the published piece misses, no single person owns the brief that produced it.
- A single approver enforces taste. The program has a consistent editorial voice because one person is gatekeeping.

**The approver is also the editor.** The same person who approves the brief reviews the draft. This prevents the gap between "what the brief asked for" and "what the editor wants"; the same person owns both sides.

Splitting these roles is how briefs and reviews drift apart. The strategist who briefed the piece sees the gap; an external editor reads the draft and changes the lede because of personal taste, not because of the brief.

**The exception:** for high-stakes pieces (pillar content, thought leadership with named author, comparison pieces involving competitors), a second reader is useful. The second reader provides input but does not approve. The single approver still decides.

---

## Archival

After publish, the brief is archived alongside the content piece.

**Common archival patterns:**
- **Notion database row.** Brief and published-piece URL on the same row. Custom fields for brief version, approver, publish date, success-criteria results.
- **dbt model with content metadata.** For warehouse-native content tracking; brief stored as JSON in the model's seed data.
- **CMS metadata fields.** Contentful, Sanity, and similar CMSs allow custom metadata fields; the brief lives in a "brief" field on the content entry.
- **Git repo.** For docs sites and developer-facing content programs; brief in a sibling markdown file to the published piece.

**Why archival matters.** Future content audits reference both brief and published piece to assess gap between intent and execution. Without the brief in the archive, an audit cannot tell whether the piece succeeded against the original goal or drifted from it.

The audit question is "did we ship what we briefed, and did the briefed piece achieve its success criteria?" Both halves need source-of-truth records: the brief for what was asked, the published piece for what was delivered, the metrics for what the piece achieved.

---

## Audit trail

A content program that runs at scale needs an audit trail. The audit trail answers four questions per piece:

1. **What did we brief?** The archived brief, with version history.
2. **What did we publish?** The published URL, with publish date and last-update date.
3. **How did the piece perform against the success criteria?** Rank position at 30 / 60 / 90 days; AI citation count if measured (Profound, Frase, AirOps); conversion data from the analytics stack.
4. **What did we learn?** A short post-publish note: what worked, what did not, what to brief differently next time.

The audit trail compounds. After 50 pieces, the program can see patterns: pillar pieces with comprehensive outlines outperform pieces with thin outlines; comparison pieces with explicit "when X wins" / "when Y wins" framing outperform pieces with implicit positioning; entity-coverage scores above 80 correlate with citation count.

The audit trail is what turns content production from a per-piece activity into a learning system. Without the trail, every piece is a one-off; with the trail, the program improves quarter over quarter.

---

## The "post-mortem on a failed piece" pattern

When a piece misses its success criteria, the post-mortem walks the brief.

1. Read the brief. Was it complete? Were the 12 fields populated?
2. Read the published piece. Did it follow the brief?
3. Identify the gap. Was the brief wrong (target keyword too competitive, intent misclassified)? Was the execution off (writer drifted from outline, entities missed)? Was the SERP harder than expected (well-executed brief, well-written piece, still no rank)?
4. Update the brief template if the failure is systemic (next time, run a deeper SERP check before briefing).
5. Update the writer-handoff if the failure is communication (next time, the brief is read aloud at handoff).
6. Accept the failure if the failure is variance (some pieces miss; the program does not chase every miss).

The post-mortem is short, half a page. It feeds the audit trail and informs the next brief. It does not turn into a multi-page analysis that nobody reads.

---

## Brief field: governance metadata

The brief carries governance metadata at the top:

> **Brief metadata**
> - Brief version: 3
> - Approver: editorial-lead@team.com
> - Approval date: 2026-04-22
> - Writer assigned: J. Smith (or AI agent: Frase v4)
> - Target publish date: 2026-05-15
> - Archive location: Notion content-pipeline database, row #847

The metadata is six lines, not a paragraph. It identifies the contract; the rest of the brief is the contract terms.

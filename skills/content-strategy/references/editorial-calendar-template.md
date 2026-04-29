# Editorial Calendar Template

A spreadsheet column definition and calendar structure for content planning. Use as a setup spec for a new editorial calendar in any tool (Sheets, Airtable, Notion, Linear, Asana).

The calendar is not the strategy. The calendar is the strategy made operational. If a strategy decision is missing, the calendar will reveal it.

---

## Calendar structure

### Single source of truth

The editorial calendar is one document. Not five. If the team uses multiple tools (writing in Notion, scheduling in Buffer, etc.), one tool is the source of truth and the others mirror it.

The source of truth answers, at a glance:

- What is being published this week?
- What is in production right now?
- What is committed for the next quarter?
- What is the backlog?
- Who owns each piece?

---

## Required columns

Every row is one piece of content. Every column below is required.

| Column | Type | Description |
|---|---|---|
| **ID** | Text or auto-number | Unique identifier per piece. Used in cross-references. |
| **Title (working)** | Text | Working title. Final title can change at publish. |
| **Type** | Pick list | Article / guide / case study / video / podcast / email / social series / landing page / etc. |
| **Topic cluster** | Pick list | Which content cluster this piece belongs to (from the strategy doc). |
| **Stage of funnel** | Pick list | Awareness / Consideration / Decision / Retention / Advocacy. |
| **Primary audience** | Pick list | Maps to defined segments. |
| **Primary keyword** | Text | The query target if SEO-relevant. |
| **Search intent** | Pick list | Informational / commercial / navigational / transactional. (See `seo-keyword/references/intent-classification-guide.md`.) |
| **Primary CTA** | Text | What action should the reader take? |
| **Channels** | Multi-select | Web, email, organic social, paid, partnerships. |
| **Owner (writer)** | Person | Who drafts. |
| **Editor** | Person | Who reviews. |
| **Reviewer (SME)** | Person | Subject matter expert if needed. |
| **Approver** | Person | Who signs off before publish. |
| **Status** | Pick list | See status workflow below. |
| **Brief due date** | Date | When the brief should be ready. |
| **Draft due date** | Date | When the draft should be ready. |
| **Edit due date** | Date | When edits should be done. |
| **Publish date (target)** | Date | The intended publish date. |
| **Publish date (actual)** | Date | When it actually went live. |
| **Brief link** | URL | Link to the content brief document. |
| **Draft link** | URL | Link to the working draft. |
| **Final link** | URL | Live URL after publish. |
| **Performance notes** | Text | Updated 30 / 60 / 90 days post-publish. |

---

## Optional but recommended columns

| Column | Description |
|---|---|
| **Estimated effort (hours)** | For capacity planning. |
| **Tag(s)** | Cross-cutting tags beyond cluster (e.g., "originals research," "thought leadership," "evergreen"). |
| **Related pieces** | IDs of companion pieces (series, follow-ups, redirects). |
| **Distribution plan link** | Specific plan for how this piece is amplified post-publish. |
| **Repurpose plan** | What this becomes downstream (newsletter, social cuts, video). |
| **Source / inspiration** | Where the idea came from (data, customer ask, competitor gap, etc.). |
| **Cost** | If freelance or paid placement. |

---

## Status workflow

Every piece moves through these statuses, in this order.

| # | Status | Meaning | Exit criteria |
|---|---|---|---|
| 1 | **Idea** | Captured but not committed. | Idea passes the prioritization screen. |
| 2 | **Backlog** | Committed for some future quarter. | Scheduled for a specific quarter. |
| 3 | **Scheduled** | Targeted for a publish week. | Brief assigned. |
| 4 | **In brief** | Brief being written. | Brief approved. |
| 5 | **In draft** | Writer is drafting. | Draft submitted to editor. |
| 6 | **In edit** | Editor reviewing. | Edits accepted by writer. |
| 7 | **In review** | SME and approver reviewing. | All approvals received. |
| 8 | **Ready to publish** | Final, scheduled in CMS. | Publish date arrives. |
| 9 | **Published** | Live. | (Terminal) |
| 10 | **Killed** | Decided not to ship. | (Terminal, with reason recorded) |

### Why this matters

If 30 pieces are sitting in "In draft" for 6 weeks, the bottleneck is writers. If 20 are in "In review," the bottleneck is approvers. The calendar exposes pipeline health, not just publish dates.

---

## Calendar views

The same data, sliced different ways. Each view answers a different question.

### Calendar view (by week)

Columns: weeks. Rows: channels (web, email, social).

Used for: planning rhythm, spotting overlap and gaps.

### Pipeline view (by status)

Columns: status. Rows: pieces.

Used for: identifying bottlenecks.

### Owner view (by writer / editor)

Columns: people. Rows: pieces.

Used for: workload balancing.

### Cluster view (by topic cluster)

Columns: clusters. Rows: pieces in pipeline + already published.

Used for: ensuring topical authority is being built coherently.

### Funnel view (by funnel stage)

Columns: stage. Rows: pieces.

Used for: ensuring balance across funnel.

### Performance view (post-publish)

Columns: traffic, conversions, time on page, social shares. Rows: published pieces.

Used for: retrospective and topic prioritization for next cycle.

---

## Cadence rituals

The calendar is reviewed on a rhythm.

| Ritual | Cadence | Attendees | Purpose |
|---|---|---|---|
| **Daily standup** | Daily, 15 min | Editorial team | What is shipping today, blockers. |
| **Weekly editorial planning** | Weekly | Content lead + writers | Confirm next 2 weeks, surface blockers, accept new ideas. |
| **Monthly review** | Monthly | Content team + marketing lead | Look at last month's pipeline, performance, and adjust the next month. |
| **Quarterly planning** | Quarterly | Content team + cross-functional | Plan the next quarter's content based on strategy and last quarter's data. |
| **Annual review** | Annually | All stakeholders | Review the year's themes, performance, and rebuild the strategy. |

---

## Capacity planning

Use the calendar to plan capacity, not just track output.

### Throughput math

- **Available writer time per week:** writers × hours allocated to writing
- **Average effort per piece:** hours from "Idea" to "Ready to publish"
- **Throughput:** available time ÷ effort

If planned output exceeds throughput, the calendar will reveal it as drift (slipped dates, deferred backlog).

### Buffer

Real teams hit 70-80% of planned throughput. Plan to 70%. Treat the remaining 30% as buffer for inevitable surprises (priority shifts, sick days, longer-than-expected reviews).

---

## Backlog management

The backlog is not a wishlist. It is a curated set of committed-but-not-scheduled ideas.

- Cap the backlog at 3-6 months of throughput. Beyond that, ideas go stale.
- Re-rank quarterly using the strategy doc's prioritization criteria.
- Kill backlog items that no longer match the strategy. Killing is a feature, not a failure.

---

## Killed pieces

When a piece is killed, record:

- Date
- Reason (strategy shifted, owner left, evidence the piece would not perform, redundant with another piece)
- What happens to the brief or partial draft (archive, salvage for another piece, delete)

Killed pieces inform future filtering.

---

## Performance review

For every published piece, update the calendar with performance at 30 / 60 / 90 days. Capture:

- Sessions / pageviews
- Conversion events (CTAs clicked, signups, purchases)
- Time on page or read depth
- Social shares
- Backlinks earned
- Notes on what worked or did not

Aggregate quarterly to inform the next quarter's plan.

---

## Sign-off

Calendar setup approved by:

- Content lead: [Name, date]
- Marketing lead: [Name, date]
- Tooling owner: [Name, date]

Calendar lives at: [URL]

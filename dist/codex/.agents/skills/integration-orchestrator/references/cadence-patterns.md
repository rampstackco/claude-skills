# Cadence patterns

The 7 project-type cadences in working detail. Each cadence covers phase decomposition, calendar timelines, gate definitions, lock-point map, and tool-stack implementation skeleton.

## The 5-status taxonomy

Every cadence in this file uses the same 5-status taxonomy:

- **Todo.** Work scoped, not yet started.
- **In Progress.** Work being actively done.
- **Waiting.** Work paused for normal handoff or scheduled review. Examples: a ticket waiting for the next standup, a PR waiting for its assigned reviewer, a design awaiting client review at the next scheduled session.
- **Blocked.** Work cannot proceed without human resolution of a specific issue. Distinct from Waiting. An agent moves a task to Blocked when it cannot autonomously resolve and documents the blocker. The agent then stops; it does not retry.
- **Done.** Work complete AND verified. The QA verification gate must pass before transition to Done. Self-reported "I think this works" does not transition to Done; the automated test gate (or, in non-engineering contexts, the explicit reviewer signoff) does.

Status transitions are restricted at the gate level. The QA gate prevents transition to Done. The approval gates prevent forward progress until the gate passes. Blocked tickets generate a paging signal to the configured channel.

---

## 1. New brand build (6 to 8 weeks)

The full lifecycle. Greenfield brand or a brand whose existing assets are being replaced wholesale.

### Phase decomposition

| Phase | Duration | Output |
|---|---|---|
| Discovery | 1 week | Audience, positioning, competitive landscape, references |
| Direction | 1 week | Creative direction brief (axes locked) |
| Identity | 1 to 2 weeks | Logo system, color, typography, imagery direction, motion |
| Production | 2 to 3 weeks | Voice guide, copy, design system, page builds |
| Launch | 1 week | QA, soft launch, full launch |

### Gates

- **End of Discovery.** Brief approval. Required: client signed brief artifact (in writing or recorded review).
- **End of Direction.** Direction approval. Required: axis positions locked, references curated.
- **End of Identity.** Identity approval. Required: logo system, color tokens, typography, imagery direction documented.
- **Mid-Production.** Voice approval. Required: voice guide signed.
- **End of Production.** Copy approval and design approval. Required: per-page copy and design signed.
- **Pre-Launch.** QA verification. Required: Playwright critical-flow suite green, console error count at or below baseline, accessibility floor maintained.
- **Launch readiness.** Final go/no-go. Required: deployment checklist complete, rollback plan documented.

### Lock points

Brief locks at end of Direction. Identity tokens lock at end of Identity. Voice locks mid-Production. Copy locks per page at end of Production. Design tokens lock with identity; design final lock at end of Production.

### Tool-stack implementation

- **Jira:** 1 Epic per phase, Stories per work item, custom fields for Phase / Locked / Approver / Gate Status. Workflow scheme with the 5-status taxonomy.
- **Linear:** 1 Project per phase, Cycles per week, Labels per skill (`brand-identity`, `brand-voice`, `landing-page-copy`, etc.).
- **Notion:** Brief database with one row, related databases for direction docs, identity specs, voice guides, copy decks. Phase dashboard views.
- **Figma:** Library structure: Discovery moodboards, Direction tokens, Identity components, Production frames. Frame-level review status.
- **GitHub:** Branch protection on `main`. PRs from `phase/{phase-name}/*` branches.

### Example ticket titles

- Discovery: "Audience: 5 archetypes interviewed", "Positioning: locate the brand against 3 competitors"
- Direction: "Direction: confirm tone-axis position", "Direction: rejection list signed off"
- Identity: "Identity: logo lockup variants for review", "Identity: color tokens locked"
- Production: "Voice guide: tone-shift table approved", "Copy: homepage hero v3 reviewed"
- Launch: "QA: Playwright critical flow regression green", "Launch: deploy to production"

---

## 2. Rebrand (4 to 6 weeks)

Existing brand. Audience and positioning known. Audit replaces discovery.

### Phase decomposition

| Phase | Duration | Output |
|---|---|---|
| Audit | 1 week | What to keep, drop, refresh; positioning gaps |
| Direction | 1 week | Creative direction brief |
| Identity | 1 to 2 weeks | Refreshed logo, color, type, imagery |
| Production | 1 to 2 weeks | Updated voice guide, copy, design library, page builds |

### Gates

Audit approval, direction approval, identity approval, voice approval, copy approval, design approval, QA verification, launch readiness. Same gates as new brand build minus the Launch phase (rebrand often launches with the production push rather than a separate phase).

### Lock points

Audit findings lock at end of Audit (decisions about what to keep stay in scope; revisiting requires change request). All other lock points match new brand build.

### Tool-stack implementation

Same as new brand build. The Audit phase typically uses a Notion database with rows for "Existing asset / Decision (keep/drop/refresh)/Owner / Status".

---

## 3. Single landing page (1 to 2 weeks)

The brand identity and voice are locked. The work is page-specific copy, design, and engineering.

### Phase decomposition

| Phase | Duration | Output |
|---|---|---|
| Brief | 2 to 3 days | Page brief, success criteria |
| Production | 5 to 7 days | Copy, design, build |
| QA-Launch | 1 to 2 days | QA, deploy |

### Gates

- **End of Brief.** Page brief approval. Required: success metric defined.
- **Mid-Production.** Copy approval. Required: signed against existing voice guide.
- **End of Production.** Design approval and engineering review. Required: design final, build complete.
- **End of QA-Launch.** QA verification and launch readiness combined. Required: Playwright run green, console errors at baseline, deploy executed.

### Lock points

Page brief locks at end of Brief. Copy locks mid-Production. Design tokens are inherited from the brand identity (already locked). Design final locks at end of Production.

### Tool-stack implementation

- **Jira / Linear:** Single Epic for the page, 5 to 8 Stories.
- **Notion:** Single brief row, one direction artifact (the page brief).
- **Figma:** Working file referencing the brand library; one set of frames.
- **GitHub:** Single feature branch, PR template, branch protection on `main`.

---

## 4. Campaign (2 to 4 weeks)

Brand identity and voice locked. Multiple deliverables under one campaign theme.

### Phase decomposition

| Phase | Duration | Output |
|---|---|---|
| Brief | 3 to 5 days | Campaign brief, deliverable list |
| Production | 1 to 2 weeks | Per-deliverable copy, design, build |
| QA | 3 to 5 days | Cross-deliverable QA |
| Launch | 1 to 2 days | Coordinated launch |

### Gates

Campaign brief approval, per-deliverable copy approval, per-deliverable design approval, cross-deliverable QA verification, launch readiness.

### Lock points

Campaign brief locks at end of Brief. Per-deliverable copy locks at copy approval. Per-deliverable design locks at design approval. Cross-deliverable consistency checked at QA gate (a single change request on the campaign brief triggers re-review across all deliverables).

### Tool-stack implementation

- **Jira / Linear:** 1 Epic for campaign, 1 Story per deliverable plus per-deliverable subtasks.
- **Notion:** Campaign brief row plus deliverable rows in a related database.
- **Figma:** Library file plus one frame per deliverable.
- **GitHub:** Multiple feature branches off a campaign branch, single PR per deliverable.

---

## 5. Identity refresh (3 to 4 weeks)

Existing brand. Voice and positioning stay. Identity gets refreshed.

### Phase decomposition

| Phase | Duration | Output |
|---|---|---|
| Audit | 1 week | What stays, what changes |
| Identity | 1 to 2 weeks | Refreshed logo, color, type, imagery |
| Production | 1 week | Application examples (web, signage, social) |

### Gates

Audit approval, identity approval, production review. Voice and copy gates skipped (voice stays locked; copy gets light updates if any).

### Lock points

Audit findings lock at end of Audit. Identity tokens lock at end of Identity. Application examples lock at end of Production but tokens remain canonical.

### Tool-stack implementation

- **Figma:** Refresh of existing library; new component versions; old components deprecated rather than deleted (downstream files still reference them).
- **Notion:** Identity spec row with relations to before/after asset databases.
- **Jira / Linear:** Smaller scope than rebrand; 1 Epic, 8 to 15 Stories.
- **GitHub:** Library updates land via versioned PR; downstream consumers update on their own cadence.

---

## 6. Website refresh (4 to 8 weeks)

Existing site. Either a partial refresh (specific sections) or a full overhaul.

### Phase decomposition

| Phase | Duration | Output |
|---|---|---|
| Audit | 1 week | Current site assessment, gaps, priorities |
| Direction | 1 week | Refreshed brief if positioning has shifted |
| Production | 2 to 4 weeks | Voice updates, copy, design, build |
| QA-Launch | 1 to 2 weeks | Cross-page QA, soft launch, full launch |

### Gates

Audit approval, direction approval (if direction phase happens; some refreshes skip), per-section copy approval, per-section design approval, QA verification, launch readiness.

### Lock points

Audit findings lock at end of Audit. Direction (if produced) locks at end of Direction. Per-section copy locks at copy approval per section. Design tokens lock with the design library; design final per section locks at design approval.

### Tool-stack implementation

- **Jira / Linear:** 1 Epic per phase, sub-Epics per section if the site is large.
- **Notion:** Brief plus per-section page in a database.
- **Figma:** Library refresh plus per-section design files.
- **GitHub:** Per-section feature branches, branch protection, CI gates per section.

---

## 7. Microsite or product launch (3 to 5 weeks)

Fixed launch date. Plan backward from the launch.

### Phase decomposition

| Phase | Duration | Output |
|---|---|---|
| Brief | 3 to 5 days | Launch brief, microsite scope |
| Production | 2 to 3 weeks | Copy, design, build, integrations |
| QA | 3 to 5 days | Cross-flow QA |
| Launch | 2 to 3 days | Coordinated launch sequence |

### Gates

Launch brief approval, copy approval, design approval, QA verification, launch readiness.

### Lock points

Launch brief locks at end of Brief. Copy locks at copy approval. Design locks at design approval. The launch date is the hardest lock; if QA fails, the launch slips rather than launching with bugs.

### Tool-stack implementation

- **Jira / Linear:** 1 Epic, multiple Stories per surface (microsite, supporting pages, integrations).
- **Notion:** Launch brief plus dependency table (assets, integrations, third parties).
- **Figma:** Microsite design file referencing brand library.
- **GitHub:** Microsite feature branch plus per-surface sub-branches; branch protection plus pre-launch CI gate.

---

## How to use this file

Pick the cadence whose project type matches yours. Follow the phase decomposition for your team size (use the team-size-modulation reference for adjustments). Implement in your tool stack using the platform-implementation reference for per-platform setup. Configure the QA verification gate using the automation-and-qa-tooling reference. The pieces compose; this file is the cadence skeleton.

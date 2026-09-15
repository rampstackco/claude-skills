# Automation and QA tooling

The QA verification gate, MCP vs CLI tradeoffs at the strategic level, session memory and momentum patterns, code-to-ticket linkage, evidence trails, and failure routing. This file pairs with platform-implementation.md (which covers per-platform specifics) but stays at strategic-pattern level.

---

## Section 1: The QA verification gate

The single most important pattern in this reference file. Tasks only move from "QA" to "Done" after automated verification passes. This makes Done a measurable gate, not a self-reported one.

The orchestration plan specifies, per project type:

- **Which automated tests must pass.** Defined in writing as part of the orchestration plan output. Different project types have different test suites.
  - **Web project.** Playwright critical-flow tests covering signup, checkout, contact form, navigation, and any other paths that move money or capture data. Visual regression on key pages (homepage, pricing, top-traffic landing pages). Console error count not exceeding baseline (specify baseline as 0 errors at hero load and during critical flows). Accessibility floor (WCAG AA contrast, keyboard navigation reaching all interactive elements, screen reader landmarks present and labeled). Performance budgets (Lighthouse mobile and desktop scores at or above project target, Core Web Vitals at or above project target).
  - **Microsite or landing page.** Subset of the above scoped to the page; performance budgets often tighter.
  - **Campaign.** Cross-deliverable consistency check (do all assets reference the same brand identity? do all touchpoints use the locked voice?) plus per-deliverable QA.
  - **Identity refresh.** Visual regression on the design library plus an audit of downstream files using deprecated components.

- **Which MCPs run them.**
  - **Playwright MCP** for browser-driven user-flow tests. The agent invokes the test suite, captures pass/fail per test, and attaches results to the ticket.
  - **Claude in Chrome / Chrome MCP** for human-readable QA flows with screenshot or GIF evidence trails. Useful when the test isn't a deterministic pass/fail (e.g., "does the checkout flow feel right?" requires a human-readable record). Chrome MCP captures the agent's walkthrough as a GIF or screenshot sequence.
  - **Windows MCP** for desktop applications. Covers Windows-specific testing scenarios when the project is desktop-app-shaped.
  - **Mobile testing MCPs** (Detox-based, Appium variants) for mobile apps when applicable.

- **What gets verified in a typical web QA pass.**
  - Critical user-flow tests (signup, checkout, contact form submission, search if applicable).
  - Visual regression on key pages (typically 5-10 pages flagged as critical).
  - Console error count not exceeding baseline.
  - Accessibility floor (WCAG AA contrast, keyboard navigation, screen reader landmarks).
  - Performance budgets (Lighthouse, Core Web Vitals).

- **Where the evidence attaches.**
  - Linked to the ticket as a comment with screenshot or GIF.
  - Optionally stored in a `.evidence/` folder in the repo (engineering projects) or a designated cloud bucket (S3, GCS).

- **What happens on failure.**
  - Status moves to Blocked (not back to In Progress).
  - The blocker reason is documented in the ticket comment.
  - If the failure surfaced something unrelated to the current task, an adjacent observation gets filed in the project triage queue.
  - The human is paged via the configured channel.
  - The agent does NOT keep retrying autonomously; it documents the state and waits.

---

## Section 2: MCP vs CLI tradeoffs at the strategic level

The platform-implementation reference covers per-platform specifics. This section is the strategic frame for choosing between MCP and CLI as the orchestration's primary interface.

### MCP excels at

- Small reads and writes (single ticket update, single comment posting, single page edit).
- Real-time data (current status of a project, current PRs awaiting review).
- API-shaped operations that map cleanly to JSON-in / JSON-out.
- Agent-friendly contracts (structured tool calls with typed responses).
- Navigation queries ("show me all open tickets in this project", "find the PR that touches this file").
- Status reads (what's the current gate state, what's locked).

### CLI excels at

- Bulk content updates (large Confluence pages, multi-page Notion exports, repo-wide search-and-replace).
- File-tree-aware operations (operating on multiple files in a repo, generating a directory of artifacts).
- Git-like workflows (the gh CLI's strengths around branches, PRs, releases).
- Lower token cost on heavy operations. MCP roundtrips become expensive at scale; CLI runs locally with no token cost per operation.
- Scripted automation (CI workflows, deploy pipelines, scheduled jobs).

### Decision pattern

- **For setup and orchestration.** Prefer MCP. PM-friendly, declarative, easy to inspect. The agent can explain what it did via tool-call traces.
- **For bulk operations.** Prefer CLI. More efficient, lower token cost, better formatting preservation.
- **For QA verification.** Playwright CLI when the same test runs repeatedly (CI integration, pre-commit hooks). Playwright MCP when verification is ad-hoc and needs to interact with surrounding context (the agent reading a Linear ticket, then running specific tests against the deployed staging site).

### Hybrid pattern

Most production setups use both. MCP for the orchestration plan's setup operations and ongoing navigation; CLI for ongoing bulk work, CI integration, and operations the MCP can't handle efficiently. The orchestration plan specifies which interface fires when.

---

## Section 3: Session memory and momentum

The agent-starts-from-zero problem. Each new Claude Code session re-reads files, re-discovers decisions, re-learns the same gotchas. MCP gives the task list; it doesn't give working momentum.

Patterns to bridge the gap:

### Project state file

Committed alongside code. Typical paths: `CLAUDE.md`, `AGENTS.md`, `.agent/state.md`. Contents:

- **Last completed task** with brief outcome notes ("RAMP-123: homepage hero rewrite. Shipped in PR #456. Worth noting: the existing copy was longer than the new copy, so the design has extra whitespace below the hero now. May need design follow-up.").
- **Current task in progress** with current status ("RAMP-124: pricing page CTA test. In Progress. Blocking on getting the test variant ID from Mira.").
- **Open decisions awaiting human input** ("Should we use the new monogram on the favicon, or keep the existing letterform-as-symbol? Pending design lead review.").
- **Known gotchas the agent should avoid re-discovering** ("The CMS export step takes 8 minutes. Don't kick it off until you're ready to wait. The export contains stale image references; replace with current image URLs from the asset library before publishing.").
- **Convention reminders specific to the project** ("Branch names use uppercase ticket prefix: feat/RAMP-123-slug. PR descriptions include 'Closes RAMP-123'. Squash merge only.").

### Per-task observation trail

After completing each task, the agent records observations:

- **What was unexpected** ("The CMS API returned a 429 on the first attempt; had to wait 60 seconds before retry succeeded.").
- **What broke before it worked** ("Initial regex for the slug pattern matched too broadly; tightened to require dash separators.").
- **What workaround was found** ("The token export script doesn't handle nested groups in Figma; flattened the groups manually before export.").
- **What pattern might generalize** ("All API endpoints return null when the resource doesn't exist, not 404. Worth refactoring the error handling to assume null rather than 404.").

### Trail-as-next-task generation

When N observations accumulate (typically 5 to 10), hand them back as the brief for the next iteration: "here are 10 observations from this week, turn them into improvements." Keeps the agent's capability pointed at code quality and process refinement, not just task completion.

The orchestrator skill's output bakes these mechanisms into the plan: specifies which state file to use, what content goes in it, when observations get reviewed by the human (typically weekly grooming), how the observation trail informs next-cycle planning.

---

## Section 4: Code-to-ticket linkage

Standard but worth specifying so the orchestration plan can call out exactly which conventions the team uses.

- **Branch naming.** `{type}/{ticket-id}-{slug}`. Type is one of feat / fix / chore / docs / refactor. Examples: `feat/RAMP-123-homepage-hero-rewrite`, `fix/LIN-456-contact-form-validation`. Ticket prefix matches the platform.
- **PR descriptions.** Include the ticket reference. Closes RAMP-123 for full work; Refs RAMP-123 for partial work. Many platforms auto-link the ticket when this format is used.
- **Commit messages.** Include the ref where relevant. Squash-merge workflows preserve the ref in the squash commit, which means the merged commit on main has the ticket trail.
- **CODEOWNERS.** When set up, PR review routing happens automatically and the orchestration plan's review-by assignments align with platform-native routing.

The orchestration plan specifies the convention per platform combination (Jira+GitHub uses RAMP-123 prefix style; Linear+GitHub uses LIN-456 or the team's chosen prefix). Without that specification, branch names drift across team members and the auto-linking breaks.

---

## Section 5: Evidence trails and recording

Some pattern, some practical advice.

### Recording tools

- **Claude in Chrome auto-records GIFs** of QA flows. Useful for evidence attached to tickets. Limitations: GIF format is large and not video-quality; for longer flows, prefer MP4 or WebP if the recording tool supports it.
- **Screenshot evidence** is sufficient for most ticket-level QA artifacts. Tools like Playwright auto-capture on test failure; Chrome MCP can take ad-hoc screenshots during human-readable QA.
- **Loom or similar** for human-narrated walkthroughs when the audience needs context (client review of the staging site, stakeholder review of a complex flow).

### Where evidence lives

Three options, each with tradeoffs:

- **Attached directly to the ticket as a comment.** Most discoverable but bloats the ticket. Best for evidence that pairs tightly with a specific ticket.
- **In a designated cloud bucket** (S3, GCS) with a link in the ticket. Ticket stays clean, evidence has a stable URL. Best for projects with high evidence volume.
- **In a `.evidence/` folder in the repo.** Works for engineering-heavy projects but cumbersome for design or copy work. Pairs well with the project state file pattern; evidence and state co-locate.

### Retention

Most projects don't need permanent evidence retention beyond the ticket. Specify a retention policy in the orchestration plan:

- 30 days for QA evidence (passing tests don't need long retention).
- 90 days for bug-related evidence (bug reproduction often resurfaces within 90 days).
- Indefinite for design final approvals (the audit trail matters for years).

---

## Section 6: Failure routing

When automated verification fails OR an agent hits something it cannot autonomously resolve, the failure follows a defined routing.

1. **Status moves to Blocked.** Not back to In Progress, not to Waiting. Blocked is a first-class status that means "human action required to unblock".
2. **The blocker reason is documented** in the ticket comment with specifics: which test failed, which file was the locus, which assertion didn't pass, what the agent already tried.
3. **If the failure surfaced something unrelated to the current task,** an adjacent observation gets filed in the project triage queue.
4. **The human is paged via the configured channel.**
   - Slack (preferred for in-team work, fastest response).
   - Email (for cross-team or external-stakeholder blockers).
   - Linear or Jira mention (for in-tool routing when the team prefers a single channel).
5. **The agent does NOT continue retrying.** It documents the state and waits. Retrying is the path that turns a single failure into a context-burning loop.

This routing is itself part of the orchestration plan output: the skill specifies which channels are configured, who's on the escalation tree, and what response time is expected per blocker severity (typically: P0 blockers paged immediately; P1 paged within a working hour; P2 surfaced at next standup; P3 added to the triage queue without a page).

The discipline of Blocked-as-first-class-status is what makes agent participation safe at scale. Without it, agents either burn context retrying or silently abandon work; with it, the agent has a clear "I'm stuck" signal that keeps the work visible to the human team.

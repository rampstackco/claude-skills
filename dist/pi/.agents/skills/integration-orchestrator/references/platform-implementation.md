# Platform implementation

How the orchestration plan implements in each platform. Per platform: workflow representation (how phases, gates, lock points, and handoffs map), MCP integration notes (what AI agents can do via the platform's MCP), and CLI alternatives (where the CLI is the better tool than MCP).

For setup screenshots and additional team patterns, consult each platform's official documentation alongside this file.

---

## Jira / Atlassian

### Workflow representation

- **Phase representation.** Each phase becomes an Epic. Stories or Tasks live within the Epic. Custom fields tag the Phase explicitly.
- **Gate representation.** Workflow status. The 5-status taxonomy (Todo / In Progress / Waiting / Blocked / Done) maps to Jira's workflow statuses, with workflow validators or transitions enforcing gate rules. A custom "Gate Status" field tracks gate state separately from issue status.
- **Lock-point representation.** Custom field "Locked" (boolean) on the parent artifact (Epic for phase locks, Story for per-page locks). Locked issues display a visible label so reviewers know not to make untracked changes.
- **Handoff representation.** Issue link types ("Blocks", "Is blocked by", "Relates to"). Linked Confluence page for the artifact (brief, direction, voice guide, copy doc).
- **Concrete setup snippet.** Issue type scheme: Epic, Story, Task, Subtask, Bug. Custom fields: Phase (single-select with phase names), Locked (checkbox), Approver (user picker), Gate Status (single-select with the 8 standard gates). Workflow scheme: 5-status taxonomy with validators preventing premature transitions.

### MCP integration notes

- **Availability.** Official remote MCP server, launched 2025.
- **References.** [Atlassian's Remote MCP Server announcement](https://www.atlassian.com/blog/announcements/remote-mcp-server) and [github.com/atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server).
- **Capabilities.** Jira issue CRUD, status transitions, comment posting, JQL queries, Confluence page operations (read, write, update). Authentication via OAuth or API token.
- **What the orchestrator skill can populate via MCP.** Initial epic structure from the orchestration plan (one epic per phase). Initial issue tree (stories per work item). Custom field values from the orchestration plan (Phase, Approver, Gate Status). Comments documenting handoffs and gate transitions. Confluence pages for the brief, direction artifact, voice guide, and orchestration plan itself.
- **Practical limits.** Workflow scheme creation typically requires admin-level UI setup; MCP is better at populating against an existing scheme than at configuring the scheme from scratch. Heavy Confluence content edits lose Atlassian Document Format (ADF) details through MCP roundtrips when the content is rich (tables, callouts, complex code blocks). For simple page content, MCP roundtrips work; for heavily-formatted content, edit in the UI or use the CLI.

### CLI alternatives and when to use them

- **Atlassian official CLI (acli)** plus community alternatives (jira-cli, etc.).
- **When CLI is the better choice.**
  - Bulk operations across many tickets (200+ issues). MCP roundtrips become token-expensive at scale; CLI is more efficient.
  - Heavy Confluence content edits where ADF formatting matters. CLI tools that parse and write ADF directly preserve formatting better than MCP roundtrips.
  - Scripted reporting (export issues to CSV, generate burndown reports, run JQL across multiple projects).
  - CI integration (running JQL in a CI step to validate that all blockers are resolved before deploy).
- **Pattern note.** Some teams mirror Jira and Confluence content as local markdown files in a `.atlassian/` folder, syncing periodically via CLI. This pattern trades simplicity for power. Document it as one viable approach for engineering-heavy teams; PMs will rarely need it.

---

## Linear

### Workflow representation

- **Phase representation.** Each phase becomes a Project. Cycles (Linear's time-boxed sprints) sit within the project for week-by-week granularity.
- **Gate representation.** Project status workflow plus issue status workflow. Linear's status workflow customizes to the 5-status taxonomy. Labels mark gate state per issue (e.g., "gate:identity-approved", "gate:qa-pending").
- **Lock-point representation.** Labels (e.g., "locked:identity-tokens", "locked:voice"). Locked issues stay visible in their project but cannot be reopened without an explicit label removal.
- **Handoff representation.** Project relationships (predecessor / successor projects), issue dependencies, and Linear's automatic mention parsing for cross-references.
- **Concrete setup snippet.** Project template per project type (new brand build, rebrand, etc.) with phases pre-populated as projects, cycles configured, label taxonomy defined. Status workflow customized to include Blocked as a first-class status (Linear ships with Backlog, Todo, In Progress, Done, Cancelled by default; add Waiting and Blocked).

### MCP integration notes

- **Availability.** Official, well-supported.
- **Reference.** [linear.app/docs/mcp](https://linear.app/docs/mcp).
- **Capabilities.** Issues, projects, cycles, teams, labels, comments, attachments. Full CRUD on most entities; webhooks for event-driven workflows.
- **What the orchestrator skill can populate via MCP.** Project setup with cycles. Label taxonomy from the orchestration plan. Initial issue population per phase. Project description and milestones. Status workflow customization. Initial assignee and reviewer assignments per the orchestration plan's review-by routing.
- **Coverage note.** Linear's MCP coverage is the most complete of the 5 platforms. For teams running a Linear-based stack with AI agents, this MCP is the recommended starting point. The agent can do almost everything programmatically.

### CLI alternatives and when to use them

- **CLI status.** No widely-adopted Linear CLI. The MCP coverage is sufficient that CLI is rarely needed.
- **API direct calls** remain an option for scripted setup if MCP isn't available in the runtime context.
- **When the API is the better choice.** Bulk import scripts when migrating from another platform. Scheduled reports run from CI. Webhook handlers for event-driven external integrations.

---

## Notion

### Workflow representation

- **Phase representation.** Brief database with one row per project. Related databases for direction docs, identity specs, voice guides, copy decks. Each related database has its own rows; relation properties tie everything to the canonical brief.
- **Gate representation.** Status property on each artifact row. Phase view filters the database by status to surface what's open vs locked.
- **Lock-point representation.** A "Locked" checkbox or status property on each artifact row. Filtered views surface locked vs unlocked artifacts.
- **Handoff representation.** Relation properties between databases. The brief row relates to the direction row, which relates to the identity spec row, which relates to the voice guide row, etc.
- **Concrete setup snippet.** Brief database schema: Title, Status, Phase, Locked, Approver, Owner, Notes. Related databases: Direction, Identity, Voice, Copy, Design, QA Evidence. Relation properties tie each related row back to the brief. Dashboard view per phase.

### MCP integration notes

- **Availability.** Official.
- **Reference.** [developers.notion.com/guides/mcp/overview](https://developers.notion.com/guides/mcp/overview).
- **Capabilities.** Database queries, page CRUD, property updates, block-level reads, search.
- **What the orchestrator skill can populate via MCP.** Brief-as-database-row schema creation (with the property set from the orchestration plan). Relation property setup between briefs and project artifacts. Initial brief content population from the orchestration plan. Dashboard view configuration where the view config supports it (with caveats; some view configurations remain UI-only).
- **Practical limits.** Workspace-level permissions and team membership remain UI-driven; MCP is most useful AFTER initial workspace setup. Some view types (calendar views, certain board views with custom grouping) cannot be created via MCP and must be set up in the UI.

### CLI alternatives and when to use them

- **Community CLIs.** notion-cli and similar tools exist but are less mature than the MCP.
- **When the CLI is the better choice.** Exporting databases for backup. Bulk content migration from another tool. Scripted database schema changes (adding properties across hundreds of rows).
- **For most teams.** The MCP is sufficient. CLI tools become useful only for specialized operations the MCP can't handle.

---

## Figma

### Workflow representation

- **Phase representation.** Library file with frame folders per phase: Discovery moodboards, Direction tokens, Identity components, Production frames. Frame-level review status surfaces in the Figma comments and frame metadata.
- **Gate representation.** Frame status (Ready for review / In review / Approved). Components versioned in the library; outdated components marked as deprecated rather than deleted (downstream files still reference them).
- **Lock-point representation.** Library publish state. Once a library version is published, dependent files reference that version. Token changes ship as a new library version, which downstream files explicitly opt into.
- **Handoff representation.** Frame URL plus exported assets. Engineering handoff uses Dev Mode for token export and component spec.
- **Concrete setup snippet.** Library file structure: top-level pages for "Tokens", "Components", "Patterns", "Page templates", "Working files". Within each, frame folders per phase. Frame-level review status set via Figma's standard comment-and-status workflow. Library publish discipline: identity tokens publish at the identity gate; the library version is the lock point.

### MCP integration notes

- **Availability.** Figma Dev Mode MCP exists but is dev-mode-focused (component inspection, code generation, design token export).
- **Reference.** Figma's [Dev Mode documentation](https://www.figma.com/dev-mode/).
- **Capabilities (Dev Mode MCP).** Component property reads. Design token export (color, typography, spacing). Frame inspection (layer tree, properties, constraints). Component variant queries.
- **What the orchestrator skill can populate via MCP.** Limited. Library structure recommendations and frame organization remain primarily manual setup. The MCP is more useful for downstream developer handoff than upstream design ops.
- **Practical limits.** Design library creation, frame organization, library-level permissions, and team membership are UI-driven. Treat the orchestrator skill's Figma recommendations as documentation for the design lead, not as automation targets.

### CLI alternatives and when to use them

- **Figma API.** Can be invoked via custom scripts for token export, asset download, and metadata queries. No first-party CLI for design ops.
- **When the API is the better choice.** Token export scripts that run in CI to update a design system repository. Asset download automation for engineering handoffs. Metadata reporting (audit how many frames are in review status across the library).
- **For most cases.** The design lead implements Figma orchestration manually following the skill's recommendations. Automation is layered in only when the project is large enough to warrant the engineering investment.

---

## GitHub

### Workflow representation

- **Phase representation.** Issues for non-engineering tracking (when GitHub is the canonical platform; otherwise Jira/Linear lead). Branches per feature with naming convention `{type}/{ticket}-{slug}`. PRs for design and engineering review.
- **Gate representation.** Branch protection on `main`. PR review requirements. CODEOWNERS for review routing. GitHub Actions for CI gates (lint, test, build, deploy preview).
- **Lock-point representation.** Branch state. Once code is merged to main, it's locked unless a follow-up PR amends it. Tags mark release lock points.
- **Handoff representation.** PR description references the originating ticket. PR review by CODEOWNERS routes to the right reviewer. PR merge triggers ticket auto-transition (configured per platform combination).
- **Concrete setup snippet.** Branch protection: require PR reviews before merge, require status checks (CI), require linear history (rebase or squash, no merge commits). CODEOWNERS file routes PRs to the relevant team. PR template requires ticket reference, summary, test plan, screenshots/GIFs for UI changes. GitHub Actions workflow runs CI gates on every PR.

### MCP integration notes

- **Availability.** Official.
- **Reference.** [github.com/github/github-mcp-server](https://github.com/github/github-mcp-server).
- **Capabilities.** PR ops (create, comment, review, merge). Issue ops (create, comment, close, label). File content (read, write). Branch protection (read; configuration is mostly UI/API-driven). Repository search. Code search. Workflow runs (read).
- **What the orchestrator skill can populate via MCP.** PR template files. Issue templates. CONTRIBUTING.md and review-protocol docs. Initial issue tree from the orchestration plan when GitHub is the canonical work tracker. CODEOWNERS file. GitHub Actions workflow files committed to `.github/workflows/`.
- **Practical limits.** Branch protection rulesets are typically configured via GitHub UI or repository settings API (not MCP); the orchestrator skill's branch protection recommendations remain documentation rather than automation. Repository creation, team membership, and organization-level settings are UI-driven.

### CLI alternatives and when to use them

- **gh CLI.** The dominant tool for GitHub operations. Officially maintained, broadly adopted.
- **When to prefer gh CLI over MCP.**
  - Bulk PR operations (merging 20 dependabot PRs in a single sweep).
  - Scripted workflows (a deploy script that creates a release, tags, and updates a changelog).
  - Repository setup automation (create a new repo, push initial commits, set up labels and branch protection).
  - When token cost matters on heavy operations. The CLI is more efficient than MCP roundtrips for repetitive tasks.
- **Hybrid pattern.** Most production setups use both. MCP for navigation and orchestration ("show me open PRs assigned to me", "comment on PR #123 with this summary"); gh CLI for transactional and bulk operations ("create a PR from this branch with these reviewers", "merge these 10 dependabot PRs"). The two tools complement each other.

---

## Cross-platform patterns

### Code-to-ticket linkage

The standard convention for linking PRs and commits back to tickets:

- **Branch naming.** `{type}/{ticket}-{slug}`. Type is one of feat / fix / chore / docs / refactor. Examples: `feat/RAMP-123-homepage-hero-rewrite`, `fix/LIN-456-contact-form-validation`. Ticket prefix matches the platform (RAMP for the team's main project in Jira, LIN for Linear, etc.).
- **PR descriptions.** Include the ticket reference. Closes RAMP-123 for full work; Refs RAMP-123 for partial work. Many platforms auto-link the ticket when this format is used.
- **Commit messages.** Include the ref where relevant. Squash-merge workflows preserve the ref in the squash commit, which means the merged commit on main has the ticket trail.

### Status synchronization

When a PR merges, the linked ticket auto-transitions. Configure via the linked platform's automation:

- **Jira automation.** "When PR merged, transition issue to Done" (with QA verification gate enforced upstream so this is safe).
- **Linear's auto-transition.** Linear-GitHub integration auto-moves issues based on PR state.
- **GitHub Actions.** A workflow that runs on PR merge and posts a comment to the linked Linear/Jira issue. Useful when the platform's native integration doesn't cover the team's exact transition rules.

### Multi-platform stacks

Common combinations:

- **Linear + GitHub.** Most common for tech teams. Linear's MCP is mature; GitHub's MCP is mature. The two integrate well via Linear's GitHub integration plus PR/branch naming conventions.
- **Jira + GitHub.** Most common for enterprise. Atlassian remote MCP plus GitHub MCP cover the orchestration; workflow setup is more involved than Linear because Jira's workflow flexibility means more setup decisions.
- **Notion + Linear + GitHub.** PM-led with engineering sub-tracking. Notion holds the brief and creative artifacts; Linear holds the engineering work; GitHub holds the code. Notion-Linear linking is via relation property pointing to the Linear issue URL; Linear-GitHub linking is via Linear's native integration.
- **Notion + Figma + GitHub.** Creative-led with engineering handoff. Notion holds the brief; Figma holds the design; GitHub holds the code. This combination has the lightest engineering tooling and works for design-led projects with simple production paths.

The orchestration plan specifies the canonical platform for each work type and the linkage convention between platforms. Without that specification, work scatters across platforms and links break.

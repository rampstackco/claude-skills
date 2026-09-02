# Example orchestration

A complete worked example showing all sections of the orchestration plan populated for a representative scenario. The PM should be able to read this Monday morning and start setting up tools Tuesday.

## Scenario

A 4-person team is doing a rebrand for a 15-year-old hospitality brand. The existing brand has a loyal customer base and recognizable identity assets, but the visual register has aged poorly and the digital surfaces haven't been updated since 2019.

- **Team.** PM (Mira), design lead (Karim), copy lead (Jess), senior engineer (Dax).
- **Timeline.** 6 weeks.
- **Tool stack.** Jira (existing, the team's main work tracker) + Figma + GitHub. Notion is not used by this team. Slack for communication. Loom for client review walkthroughs.
- **AI agent participation.** Claude Code participates in production phase tasks (component library updates, page builds). Claude in Chrome runs QA gates on the staging deployment. Agents have access to the Atlassian MCP and GitHub MCP. Agents move tickets between Todo, In Progress, Waiting, and Blocked but do NOT move to Done; Done requires human verification.
- **Client.** Hospitality brand owner is non-technical. Reviews happen via Loom-recorded walkthroughs scheduled at end of each phase.

---

## 1. Project orchestration plan

### Phased timeline

- **Week 1 (Audit).** Existing brand assessment. Audience already known; the audit assesses what to keep, drop, refresh. Output: audit findings document.
- **Week 2 (Direction).** Refreshed creative direction brief. Tone, aesthetic, relationship, sensory positions confirmed. Output: direction artifact.
- **Weeks 3-4 (Identity).** Refreshed logo lockup, color tokens, typography selections, imagery direction. Output: locked identity tokens published to Figma library, identity spec document.
- **Weeks 5-6 (Production).** Voice guide refresh, copy update for top 8 pages, design final per page, engineering implementation, QA verification, launch.

### Calendar boundaries

Week 1: Mon-Fri Audit, Friday phase review with brand owner via Loom walkthrough.
Week 2: Mon-Fri Direction, Friday phase review.
Weeks 3-4: Mon-Fri Identity, mid-Week 4 voice approval gate, Friday Week 4 identity approval gate plus Loom walkthrough.
Weeks 5-6: Mon-Tue Week 5 copy approval per page, Wed-Fri Week 5 design final per page (rolling), Mon-Wed Week 6 engineering implementation (rolling), Thu Week 6 QA verification, Fri Week 6 launch.

---

## 2. Per-phase gate specs

### Audit approval gate (end of Week 1)

- **Trigger.** All Audit tasks transitioned to Done. Audit findings document complete.
- **Approver.** Brand owner (via Loom walkthrough plus email signoff). Mira reviews internally first.
- **Required to pass.** Audit findings document complete (existing assets categorized as keep / drop / refresh, gaps identified). Brand owner signed off in writing.
- **Blocks until passed.** Direction phase work.

### Direction approval gate (end of Week 2)

- **Trigger.** Tone, aesthetic, relationship, sensory positions selected. References curated. Rejection list documented.
- **Approver.** Brand owner plus Karim (design lead).
- **Required to pass.** All four axis positions confirmed in writing. Reference brand list documented. Rejection list signed off.
- **Blocks until passed.** Identity phase production work.

### Voice approval gate (mid Week 4)

- **Trigger.** Refreshed voice guide drafted by Jess against locked direction.
- **Approver.** Brand owner plus Jess (copy lead).
- **Required to pass.** Voice guide complete (attributes, tone shifts, vocabulary, paired examples). At least 3 paired examples per major content type.
- **Blocks until passed.** Copy production for shipping pages.

### Identity approval gate (end of Week 4)

- **Trigger.** Refreshed logo, color tokens, typography, imagery direction documented and rendered.
- **Approver.** Brand owner plus Karim.
- **Required to pass.** Logo lockup variants reviewed. Selected variants documented. Color tokens specified as hex codes. Typography selections specified as named typefaces with weights. Imagery direction documented.
- **Blocks until passed.** Design production at scale.

### Copy approval gate (per page, Week 5)

- **Trigger.** Per-page copy drafted against locked voice guide.
- **Approver.** Brand owner (via Loom walkthrough for top 3 pages; email approval for the other 5) plus Jess.
- **Required to pass.** Copy matches voice guide. Calls-to-action consistent with success criteria.
- **Blocks until passed.** Design final for that page.

### Design approval gate (per page, Week 5-6)

- **Trigger.** Design final rendered against locked copy and locked identity tokens.
- **Approver.** Karim plus Mira.
- **Required to pass.** Design references locked identity tokens. Copy reflected exactly as approved. Responsive states designed. Empty/loading/error states accounted for.
- **Blocks until passed.** Engineering of that page.

### QA verification gate (Thu Week 6)

- **Trigger.** Engineering signaled complete; ticket transitioned to QA status.
- **Approver.** Automated test suite (Playwright via MCP) plus Claude in Chrome walkthrough; human review on test failure.
- **Required to pass.** Playwright critical-flow suite green. Console error count at 0 for hero load and during critical flows. Accessibility floor maintained (WCAG AA contrast, keyboard navigation, screen reader landmarks). Lighthouse mobile score at or above 85, desktop at or above 95. Visual regression on top 8 pages within tolerance.
- **Blocks until passed.** Status transition to Done. Launch readiness for the affected page.

### Launch readiness gate (Fri Week 6)

- **Trigger.** All 8 affected pages have passed QA verification.
- **Approver.** Mira (project owner) plus Dax (launch coordinator).
- **Required to pass.** Deployment checklist complete. Rollback plan documented. On-call coverage assigned for the launch window. Brand owner notified.

---

## 3. Lock-point map

- **Audit findings lock at end of Week 1.** Existing-asset decisions cannot be revisited without change request triggering re-review of Direction work.
- **Direction locks at end of Week 2.** Axis positions cannot be revisited without change request triggering re-review of Identity, Voice, and Copy work.
- **Identity tokens lock at end of Week 4.** Color tokens, typography selections, logo lockup committed to Figma library v2.0. Downstream design and engineering work references the locked library version.
- **Voice rules lock mid Week 4.** Voice guide v2.0 committed to canonical Confluence page. Downstream copy production references the locked voice guide.
- **Per-page copy locks at copy approval gate (Week 5).** Each page's copy locks individually as it passes its approval gate; design final for that page can begin.
- **Per-page design locks at design approval gate (Week 5-6).** Each page's design locks individually; engineering for that page can begin.
- **Code merges to main (Week 5-6, rolling).** Branch protection prevents direct pushes; PRs merge after CODEOWNERS review and CI gates pass.

---

## 4. Handoff specs

- **Audit to Direction (Friday Week 1).** Audit findings document URL, summary of gaps and opportunities. Filed in Jira as a Confluence page link in the Direction phase Epic description.
- **Direction to Identity (Friday Week 2).** Direction artifact URL, axis positions documented, reference brand list, rejection list. Filed in Jira as Confluence page links in the Identity phase Epic description.
- **Direction to Voice (Friday Week 2, parallel to Direction-to-Identity).** Same artifacts; Voice phase work begins in parallel with Identity.
- **Identity plus Voice to Copy (Mid-Week 5).** Locked identity tokens (Figma library v2.0 URL), locked voice guide (Confluence URL), per-page scope (Jira tickets). Filed in Jira as Story descriptions per page.
- **Identity plus Copy to Design (Per page, Week 5).** Locked copy (Confluence URL with "approved" marker), locked identity tokens (Figma library v2.0 URL). Filed in Jira as the design-phase Story description per page.
- **Design to Engineering (Per page, Week 5-6).** Final design (Figma frame URL), exported asset library (cloud bucket URL), responsive notes (Figma annotations), motion specifications. Filed in Jira as the engineering-phase Story description per page.
- **Engineering to QA (Per page, Week 6).** Verified deployed-to-staging surface, QA evidence (Playwright run results URL, accessibility audit URL), deployment checklist URL.

### Adjacent observation routing

The team's triage queue is a Jira project labeled "Project triage". Filed observations route there without an assignee. Mira triages every Monday and Thursday at standup. Observation content includes: what was observed, why it might matter, link to the work that was happening when noticed, suggested triage priority. The agent uses the Atlassian MCP to file observations.

---

## 5. Tool-stack implementation

### Jira

Issue type scheme:
- **Epic:** one per phase (Audit, Direction, Identity, Production-Voice, Production-Copy, Production-Design, Production-Engineering, Production-QA, Launch).
- **Story:** one per work item within a phase.
- **Task:** subtasks under stories.
- **Bug:** for issues filed during QA.

Custom fields:
- Phase (single-select with the 8 phase names).
- Locked (checkbox).
- Approver (user picker).
- Gate Status (single-select with the 8 standard gates).

Workflow scheme: 5-status taxonomy (Todo / In Progress / Waiting / Blocked / Done) with workflow validators preventing premature transitions to Done without QA verification.

Confluence space:
- Brief page (rebrand brief).
- Direction page (creative direction artifact).
- Audit findings page.
- Identity spec page (logo, color, typography, imagery).
- Voice guide page.
- Copy doc per page (top 8 pages).
- Orchestration plan page (this document, committed to the project space).

MCP setup:
- Atlassian MCP configured with OAuth credentials (admin one-time setup).
- Initial Epic creation: 8 epics, one per phase, populated by the agent on Day 1.
- Initial Story creation per phase: agent populates from the orchestration plan.

### Figma

Library file structure:
- "Tokens" page: color, typography, spacing, motion.
- "Components" page: identity components (logo, badges, branded UI elements).
- "Patterns" page: page-level patterns (hero variants, card patterns, footer).
- "Page templates" page: top 8 page templates for the rebrand.
- "Working files" page: per-page design working files.

Library publish discipline:
- v1.0 published at start of Week 3 (existing identity, used as baseline).
- v2.0 published at end of Week 4 (refreshed identity, locks at identity gate).
- Per-page working files reference v2.0 starting Week 5.

### GitHub

Repository: existing repo for the brand's website.

Branch protection on main:
- Require PR reviews (1 reviewer minimum).
- Require status checks (lint, type-check, build, accessibility audit, Playwright run).
- Require linear history (squash merges only).

CODEOWNERS:
- Frontend code: Dax.
- Design tokens: Karim.
- Copy markdown: Jess.

PR template:
- Ticket reference (Closes RAMP-XXX or Refs RAMP-XXX).
- Summary.
- Test plan.
- Screenshots/GIFs for UI changes.
- QA evidence URL.

GitHub MCP setup:
- GitHub MCP configured with the repo's PAT.
- Initial PR template committed via MCP.
- CODEOWNERS file committed via MCP.

---

## 6. Automation and QA verification

### Playwright test suite spec

Critical flows to test:
- Homepage hero loads and renders.
- Reservation flow (the brand's primary conversion path) end-to-end through booking confirmation.
- Contact form submission (validation, submission, success state).
- Newsletter signup.
- Top-traffic landing pages render without console errors.

Visual regression on top 8 pages:
- Homepage, About, Reservations, Locations, Menu, Press, Contact, Loyalty.

Accessibility audit per page using axe-core or equivalent:
- WCAG AA contrast.
- Keyboard navigation reaching all interactive elements.
- Screen reader landmarks present and labeled.

### Chrome MCP walkthrough scenarios

For Loom-recorded brand owner reviews and ad-hoc human-readable QA:
- Reservation flow walkthrough with screenshots at each step.
- Brand consistency walkthrough (top 8 pages, evaluating typography and color consistency).
- Mobile responsive walkthrough (the brand's audience is heavily mobile).

### Evidence trail policy

- QA evidence (test results, screenshots, GIFs) attached to each ticket as comments.
- 90-day retention for engineering-related evidence.
- Indefinite retention for design final approvals (committed to Confluence with the design spec page).

### Failure routing

- Slack channel #project-rebrand-launch is the team's coordination channel. Blockers page Mira via Slack mention.
- P0 blockers (broken reservation flow): page Dax immediately via direct Slack mention.
- P1 blockers (broken page render): surface at next standup.
- P2-P3 blockers: file as adjacent observation in the triage queue.

---

## 7. Risk register

Cadence-specific risks and mitigations.

### Risk 1: Brand owner availability for Loom reviews

The brand owner is busy and may delay phase reviews, slipping the timeline. Mitigation: Mira schedules Loom reviews 1 week in advance with calendar holds. Backup reviewer for direction approval gate is the head of marketing on the brand owner's team (Mira identified this person at project kickoff).

### Risk 2: Identity refresh expectations vs reality

The brand owner may expect a more dramatic refresh than the audit recommends, OR may reject the refresh as too dramatic. Mitigation: Karim shares 3 directional moodboards at end of Week 1 to align expectations BEFORE Direction phase locks in. The moodboards are not the final identity; they're directional samples to confirm the team and the brand owner are pointing in the same direction.

### Risk 3: Engineering surface area

The website has 8 pages but also a custom CMS, a reservation integration, and an email pipeline. The 6-week timeline assumes only the page surface gets touched. Mitigation: Mira confirmed at project kickoff that CMS, reservations, and email pipeline are out of scope. Documented in the brief. If the brand owner requests adding any of these mid-flight, formal change request triggers timeline review.

### Risk 4: Agent coordination overhead

Claude Code participates in production tasks; Claude in Chrome runs QA gates. The agents access the Atlassian and GitHub MCPs. Risk: agent action and human action collide on the same ticket; human commits something the agent had also drafted. Mitigation: agents are not assigned tickets; they take tickets from the "Available for agent" queue (a Jira label). Humans take tickets from the "Available for human" queue. Mira moves tickets between queues at standup.

### Risk 5: QA verification baseline drift

Console error baseline is set at start of project. If a third-party script (analytics, heatmap, customer support chat) lands during the project and adds console errors, the baseline shifts. Mitigation: console error baseline is reset weekly during standup. Any new errors that appear get triaged immediately as either an accepted change to baseline (third-party expected) or a regression that needs fixing.

---

## How to use this example

This example is the format the orchestration plan output takes. Real outputs differ in specifics (different team, different timeline, different stack, different risks) but the structure is the same. The PM reads through, sets up the tools to match, and starts running the plan Tuesday.

The discipline that makes this work: every section is specific. Generic plans fail. "QA gate must pass" is not a plan; "Playwright critical flows pass, console errors at baseline 0, accessibility floor WCAG AA, Lighthouse mobile at or above 85, visual regression on top 8 pages within tolerance" is a plan.

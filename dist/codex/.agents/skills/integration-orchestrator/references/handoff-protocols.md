# Handoff protocols

A handoff is the moment work transfers between phases or skills. Without explicit handoff specs, the receiving phase opens a half-dozen Slack threads to find what they need. With them, the work moves cleanly because the receiving phase knows exactly what artifacts to expect, what's locked, and what's still open.

This file covers the 7 standard handoffs plus an 8th cross-cutting handoff: the adjacent-observation routing.

---

## 1. Discovery to Brief

The first handoff. Discovery findings transfer to brief drafting.

- **What's transferred.** Audience research notes (interview summaries, persona documents, audience-side observations). Positioning notes (competitive landscape, differentiation hypotheses). Reference materials gathered during discovery (brands, articles, examples that surfaced).
- **What's locked.** Nothing yet. Everything is still open.
- **What stays open.** All of it. Discovery is input, not decision.
- **Common breakdown.** Discovery findings get summarized too aggressively; the brief drafter loses the nuance. Mitigation: hand off the full notes plus a synthesis, not just the synthesis.
- **Artifact specification.** Discovery findings live in a Notion database, a Google Doc, or a folder of markdown files. The handoff includes a link plus a one-paragraph synthesis.
- **Platform support.** Notion: relation property from brief row to discovery findings. Jira: linked issue. Linear: project relationship.

---

## 2. Brief to Identity

After brief approval. The identity work begins against the locked brief.

- **What's transferred.** Approved brief (audience, positioning, deliverables, constraints). Direction artifact (axis positions). Reference brand list. Rejection list.
- **What's locked.** Brief is locked. Direction is locked. Audience and positioning cannot be revisited without change request.
- **What stays open.** Everything inside the identity scope: logo system, color, typography, imagery direction, motion. The identity team picks within the constraints the brief and direction set.
- **Common breakdown.** The identity team interprets the rejection list loosely. A "no laurel mark" rejection becomes "well, our laurel is different". Mitigation: rejection-list adherence is a gate criterion at identity approval.
- **Artifact specification.** Brief lives in its canonical location (Notion brief row, Confluence page, or repo file). Direction artifact is a sibling document. Both URLs go in the identity-phase Epic or Project description.
- **Platform support.** Jira: Epic description with links. Linear: Project description with attached docs. Notion: relation properties.

---

## 3. Brief to Voice

In parallel with Brief-to-Identity. Voice work begins against the locked brief and direction.

- **What's transferred.** Approved brief. Direction artifact (specifically the tone-axis position). Reference voice samples (other brands the team likes for their voice).
- **What's locked.** Brief, direction.
- **What stays open.** Voice attributes, tone-shift rules, vocabulary choices, grammar rules, paired examples.
- **Common breakdown.** Voice gets started without referencing the locked tone-axis position; the writer drafts in their natural voice rather than the project's. Mitigation: voice production opens with a tone-axis check ("the brief says Provocative; here is what Provocative implies for vocabulary, sentence shape, and rejection list").
- **Artifact specification.** Tone-axis position from direction artifact. Reference voice samples as a Notion subpage or a markdown file with quoted samples.
- **Platform support.** Same as Brief-to-Identity.

---

## 4. Identity plus Voice to Copy

After identity approval and voice approval. Copy production begins.

- **What's transferred.** Identity tokens (typography selections, color tokens, spacing). Voice guide (attributes, tone shifts, vocabulary, paired examples). Page or deliverable scope (which pages, which sections, what each section needs).
- **What's locked.** Brief, direction, identity tokens, voice rules.
- **What stays open.** Per-page copy choices within the locked voice. Calls-to-action language. Section ordering decisions where the design has not yet been finalized.
- **Common breakdown.** Copy is drafted for length without the typography in mind, and lands in design as either too long or too short for the rendered hero. Mitigation: copy production references the typography selection from the start; the writer drafts knowing which weight and size the copy will live in.
- **Artifact specification.** Identity tokens published in Figma library or in a tokens markdown file. Voice guide as a Notion page or markdown file. Page scope as a Jira/Linear ticket per page.
- **Platform support.** Figma library is the canonical token source. Jira/Linear ticket per page or section.

---

## 5. Identity plus Copy to Design

After copy approval per page. Design final begins for that page.

- **What's transferred.** Locked copy (final approved text). Identity tokens (typography, color, spacing). Voice guide (for microcopy and any error or empty states the design generates).
- **What's locked.** Brief, direction, identity, voice, copy for the affected page.
- **What stays open.** Design layout decisions, responsive breakpoint behavior, motion design, empty/loading/error states.
- **Common breakdown.** Design starts before copy locks. Length, rhythm, and hierarchy get designed against placeholder text; when copy lands, the design has to be reworked. Mitigation: copy locks per page before design final starts. If parallel work is needed, design produces a wireframe with placeholder copy AND a flag noting "real copy pending; layout subject to revision".
- **Artifact specification.** Locked copy in the canonical copy doc with an explicit "approved" marker. Identity tokens in Figma library. Page scope from copy-phase ticket.
- **Platform support.** Figma frame per page, linked to ticket in Jira/Linear.

---

## 6. Design to Engineering

After design approval per page. Engineering builds the page.

- **What's transferred.** Final design (Figma file URL). Tokens (referenced from Figma library). Asset library (images, icons, illustrations exported and named per convention). Component specifications (any new components designed). Responsive behavior notes. Motion specifications (entry, exit, hover, loading states).
- **What's locked.** Brief, direction, identity, voice, copy, design final.
- **What stays open.** Implementation choices (state management, framework patterns, accessibility implementation, performance optimization). Component naming if new components.
- **Common breakdown.** Asset exports happen ad-hoc as engineering needs them, leading to inconsistent file names, missing variants, and back-and-forth Slack messages. Mitigation: design phase exports a complete asset library (using the team's naming convention) before handoff. Engineering pulls from the library, does not request new exports during build unless missing.
- **Artifact specification.** Figma URL, exported asset folder (cloud bucket or repo path), responsive notes as Figma annotations or a sibling markdown doc.
- **Platform support.** Figma URL in the engineering ticket. Asset folder URL or path in the ticket. PR template references the design ticket.

---

## 7. Engineering to Launch

After QA verification per surface. The surface goes to launch.

- **What's transferred.** Verified surface (deployed to staging, tested). QA evidence (Playwright run results, accessibility audit results, performance audit results, console error counts). Deployment checklist for this surface. Rollback plan.
- **What's locked.** Everything: brief, direction, identity, voice, copy, design, code merged to main, QA evidence.
- **What stays open.** Launch coordination (which surface launches first, monitoring during launch window, on-call coverage).
- **Common breakdown.** Launch happens before all surfaces have passed QA verification. Result: one surface launches with bugs, recoverable with rollback if monitoring catches it. Mitigation: launch readiness gate requires ALL surfaces to have passed QA verification, not just the most-prominent surface.
- **Artifact specification.** QA evidence linked to ticket (screenshots, GIFs, test result logs). Deployment checklist as a runbook document. Rollback plan as a sibling runbook document.
- **Platform support.** GitHub PR with QA artifact attachments or evidence URL. Linear or Jira ticket with the runbook URL.

---

## 8. Adjacent observation handoff (cross-cutting)

The handoff that fires when an agent or person, while working on Task X, notices something about Task Y or Surface Z that is not the current task but is contextually adjacent.

### Examples

- Working on copy for the homepage hero, the writer notices the footer copy is inconsistent with the new voice. Filing the footer inconsistency as an observation, not stopping the homepage work.
- Running QA on the pricing page, an agent notices the contact form on the about page has a console error. Filing the contact form error as an observation, not pausing the pricing-page QA.
- Updating the Figma design library, the designer notices a deprecated component is still being used in the dashboard mockups. Filing a usage-cleanup observation, not modifying the dashboard mockup.
- Reviewing a PR, an engineer notices a typo in a docstring in an unrelated file. Filing a typo observation, not blocking the PR review on it.

### Why this handoff matters

Without it, the team has two bad options. Option one: stop the current work and address the observation, derailing focus. Option two: ignore it, lose the context, never come back to it. The adjacent-observation handoff lets the current work proceed while preserving the finding for triage.

### Routing

The observation gets filed in a project triage queue, NOT directly assigned to anyone. The triage queue is reviewed on a regular cadence (typically daily standup or weekly grooming). The PM or tech lead triages the observation: discard if it's not relevant, file as a normal ticket if it is, attach to an existing ticket if it's a fragment of larger work.

### Content of the observation

Each filed observation includes:

- **What was observed.** A specific factual statement (the footer says "Get in Touch" while the new voice would say "Reach out").
- **Why it might matter.** A brief rationale (voice consistency, user-facing inconsistency, latent bug).
- **Where it was noticed.** A link to the work that was happening when the observation surfaced (the PR, the Figma frame, the Notion page).
- **Suggested triage priority.** The reporter's gut call (low / medium / high). The triager makes the actual call; the suggestion is just signal.

### Platform support

- **Jira.** A separate "triage" project or a labeled queue inside the main project. Observations get filed without an assignee; the triager assigns at triage time.
- **Linear.** A "Triage" inbox is built into Linear and works exactly for this purpose.
- **Notion.** A triage database; the assignee field stays empty until triage.
- **GitHub.** Observations filed as issues without an assignee; CODEOWNERS may auto-route the issue to the relevant team for triage.

The orchestration plan specifies which platform's triage queue is the canonical one for the project (typically the same platform as the main work) and the triage cadence (daily standup or weekly grooming). Without those specifics, observations either pile up untriaged or scatter across channels and get lost.

---

## How handoffs compose with gates

A gate closes a phase. A handoff opens the next phase's work against the gate's locked output. The two patterns reinforce each other: gates make sure nothing premature ships; handoffs make sure the receiving work has what it needs to start.

A failed gate triggers a handoff backward (rework the prior phase). A failed handoff (artifact missing, scope unclear) is itself often the symptom of a gate that didn't enforce its pass criteria. When a handoff goes wrong, audit the prior gate's criteria.

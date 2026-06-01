# Gate definitions

The 8 standard gates. Each gate includes its trigger, approver, pass criteria, what's blocked until passing, what's already locked from prior gates, and the change-request protocol if the gate is failed or reopened later.

A gate is the moment a phase transition gets approved. Gates work when their pass criteria are measurable. "Approved" is too vague; "client signed the artifact in writing or in a recorded review" is measurable. The orchestration plan specifies measurable criteria per gate.

---

## 1. Brief approval gate

Closes the Discovery phase (or Audit phase, on rebrand projects) and opens Direction.

- **Trigger.** All Discovery tasks transition to Done. The brief artifact is drafted.
- **Approver.** Project owner (typically the client or the founder). For internal work, the senior stakeholder.
- **Required to pass.** The brief artifact is complete (audience, positioning, deliverables, constraints, success criteria all populated). Approver signed in writing OR a recorded review session captured agreement. The brief artifact is committed to its canonical location (Notion brief database row, Confluence page, or repo file).
- **Blocks until passed.** Direction phase work, identity phase work, voice phase work, copy work.
- **Already locked.** Nothing yet; this is the first gate.
- **Change-request protocol.** If the brief is reopened after this gate, the project re-enters Discovery briefly to assess what changed, then re-runs Direction starting from the updated brief. Identity, voice, copy, and design work that depends on the changed brief sections gets re-reviewed.

---

## 2. Direction approval gate

Closes Direction phase and opens Identity.

- **Trigger.** Axis positions selected (tone, aesthetic, relationship, sensory). References curated. Rejection list documented.
- **Approver.** Project owner plus the design lead.
- **Required to pass.** All four axis positions confirmed in writing. Reference brands documented with one-line rationale each. Rejection list signed off (what the brief explicitly says no to).
- **Blocks until passed.** Identity phase production work. Voice production work. Any copy production.
- **Already locked.** The brief.
- **Change-request protocol.** If a direction axis is changed after this gate, identity work and voice work that depend on the changed axis get re-reviewed. Tone changes ripple to voice; aesthetic changes ripple to identity; relationship changes ripple to copy register; sensory changes ripple to motion and rhythm decisions.

---

## 3. Identity approval gate

Closes Identity phase. Opens production at full volume.

- **Trigger.** Logo system, color tokens, typography selections, imagery direction documented and rendered.
- **Approver.** Project owner plus design lead.
- **Required to pass.** Logo lockup variants reviewed (typically 6 to 12). Selected variants documented with rationale. Color tokens specified as hex codes. Typography selections specified as named typefaces with weights. Imagery direction documented (style, palette, treatment).
- **Blocks until passed.** Design production at scale (component library, page designs). Engineering work that depends on design tokens.
- **Already locked.** Brief, direction.
- **Change-request protocol.** If identity tokens change after this gate, design files that reference the tokens get re-rendered. Engineering work that consumed the old tokens gets reviewed. Voice work is typically unaffected unless typography selection changes the implied tone register.

---

## 4. Voice approval gate

Closes voice production. Opens copy production at scale.

- **Trigger.** Voice guide drafted. Tone-shift table populated. Vocabulary list compiled. Paired examples written.
- **Approver.** Project owner plus copy lead.
- **Required to pass.** Voice guide complete (attributes, tone shifts, vocabulary, grammar, paired examples). At least 3 paired examples per major content type (hero copy, body, microcopy). Voice signed off in writing.
- **Blocks until passed.** Copy production for shipping pages.
- **Already locked.** Brief, direction, identity (or identity in progress; voice can lock alongside identity if both phases overlap).
- **Change-request protocol.** If voice rules change after this gate, all copy that has been drafted against the old rules gets re-reviewed. The copy rework varies by scope: a vocabulary substitution is light; a tone-shift table change can mean rewriting from scratch.

---

## 5. Copy approval gate

Per-page or per-deliverable. Closes copy production for that page or deliverable.

- **Trigger.** Copy drafted against the locked voice guide. Internal review complete.
- **Approver.** Project owner plus copy lead. For per-page copy, the page owner if different.
- **Required to pass.** Copy matches the voice guide (verifiable by running the voice-guide checklist). All sections complete. Microcopy populated. Calls-to-action consistent with the brief's success criteria.
- **Blocks until passed.** Design final for that page or deliverable. Engineering of the copy-dependent surface.
- **Already locked.** Brief, direction, identity, voice.
- **Change-request protocol.** Per-page copy changes after this gate trigger re-review of the design final for that page (because design length, hierarchy, and rhythm depend on copy length). Engineering work for that page may need to be revisited if the copy change affects layout.

---

## 6. Design approval gate

Per-page or per-deliverable. Closes design production for that page or deliverable.

- **Trigger.** Design final rendered against locked copy and locked identity tokens.
- **Approver.** Design lead plus project owner.
- **Required to pass.** Design references the locked identity tokens (no off-token color, type, or spacing values). Copy is reflected exactly as approved (no copy edits hidden in the design). Responsive states designed. Empty states, loading states, error states accounted for.
- **Blocks until passed.** Engineering of the design-dependent surface.
- **Already locked.** Brief, direction, identity, voice, copy.
- **Change-request protocol.** Design changes after this gate trigger engineering re-review for the affected surface. The change-request protocol routes through the design lead to assess scope (token-level changes are light; component or layout changes are heavy).

---

## 7. QA verification gate

Per-surface. Closes engineering and verification, opens launch readiness for that surface.

- **Trigger.** Ticket transitions to "QA" status (developer signaled engineering complete).
- **Approver.** Automated test suite, with human review on test failure or ambiguous result.
- **Required to pass.** Defined Playwright critical-flow test suite green. Console error count at or below baseline (specify the baseline per project; for a typical web app, 0 errors at hero load, 0 errors during critical flows). Accessibility floor maintained: WCAG AA contrast ratios on all text, keyboard navigation reaching all interactive elements, screen reader landmarks present and labeled. Performance budgets met (Lighthouse mobile score at or above project target, Core Web Vitals at or above project target). Visual regression on key pages within tolerance.
- **Blocks until passed.** Status transition to Done. Launch readiness for the affected surface.
- **Already locked.** Code merged to main, design tokens, copy, identity, voice, direction, brief.
- **Change-request protocol.** Failure routes the ticket to Blocked status (not back to In Progress). The blocker reason is documented in the ticket comment. If the failure surfaced something unrelated to the ticket's scope (e.g., a regression in a sibling page), an adjacent observation is filed in the project triage queue. The human is paged via the configured channel. The agent does NOT continue retrying autonomously.

---

## 8. Launch readiness gate

Closes the project (or the launch phase of a multi-phase project).

- **Trigger.** All affected surfaces have passed the QA verification gate.
- **Approver.** Project owner plus the launch coordinator (typically the PM or the senior engineer on rotation).
- **Required to pass.** Deployment checklist complete (environment variables set, secrets rotated, third-party integrations live, monitoring active, alerting configured). Rollback plan documented (which command, who runs it, where logs go). Launch communications drafted (internal: who knows the launch is happening; external: any customer-facing announcement). On-call coverage assigned for the launch window.
- **Blocks until passed.** The actual production deploy.
- **Already locked.** Everything: brief, direction, identity, voice, copy, design, code, QA evidence.
- **Change-request protocol.** Launch readiness failure typically delays the launch rather than reopening upstream gates. If the failure is severe (a critical bug found in pre-launch QA), the affected surface returns to In Progress for fix, then re-runs through Engineering and QA verification before launch can proceed.

---

## How gates compose

Gates are not isolated. Each gate locks artifacts that downstream gates assume are stable. A QA verification failure that traces to a copy bug means the copy approval gate produced bad output, which traces back to either a voice rule that wasn't applied or a brief that wasn't reflected. The gate chain is the audit trail.

When a gate is reopened, the change-request protocol cascades downstream. The orchestration plan specifies the protocol per gate so the team knows in advance what re-review work a change triggers. The cost of a change is visible at the moment it's requested, not discovered after the fact.

The QA verification gate is the gate that does the most work for the team. It is the gate that prevents "Done" from being self-reported. Configure it carefully; trust it once configured.

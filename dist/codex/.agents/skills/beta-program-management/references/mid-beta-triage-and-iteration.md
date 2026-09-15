# Mid-beta triage and iteration

Triage cadence. Iteration discipline (what to fix during the beta, what to defer). Communication with participants.

Betas where the team responds to feedback during the beta produce stronger signal than betas where the team waits for the end. Mid-beta triage turns a static validation into an iterative one.

---

## The triage cadence

How the team reviews feedback during the beta.

**Weekly triage (1-2 hours).**

- Review feedback across all channels for the week.
- Categorize each piece: critical bug, friction issue, feature request, positive signal, edge case.
- Tag for action: fix this week, fix later in the beta, defer to post-GA, no action needed (one-off).
- Identify any critical issues warranting immediate response.

**Bi-weekly pattern review (1-2 hours).**

- Look at patterns across the past 2-4 weeks.
- Identify converging signal: which patterns are strengthening, which are not surfacing in volume?
- Surface decisions: what to address in the remaining beta period.

**As-needed escalation.**

- Critical issues (data loss, security, broken core flows) get same-day response regardless of cadence.
- The triage cadence does not delay critical-issue response.

---

## Categorization

Each piece of feedback gets categorized.

**Categories.**

- **Critical bug.** Crashes, data loss, broken core flows, security issues. Must be fixed before GA.
- **Friction issue.** Workflows that are confusing, slow, or sub-optimal but functional. Fix during beta where feasible; document otherwise.
- **Feature request.** Capability the participant wants that is outside beta scope. Capture for post-GA roadmap; do not add during beta.
- **Positive signal.** What is working well; what users find valuable. Surfaces what to preserve in GA and what to highlight in marketing.
- **Edge case.** Unusual configurations or contexts. Note for post-GA monitoring; address only if affecting many participants.
- **One-off.** Single observation without pattern. Note briefly; do not action.

**Why categorization matters.**

- Different categories have different action paths. Treating all feedback the same overwhelms triage.
- The categorization is the basis for the iteration decisions.

---

## What to fix during the beta

The team should fix some things during the beta and defer others.

**Fix during the beta.**

- Critical bugs that prevent participants from using the feature. The beta cannot validate the feature if participants cannot use it.
- Friction issues that are clearly addressable and significantly affect participant experience. Fixing them produces stronger end-of-beta signal.
- Issues that, if unfixed, will surface again post-GA at higher cost.
- Issues that participants are about to escalate publicly (if NDA-relevant) or that damage trust if left.

**Defer to post-GA.**

- Feature requests outside beta scope.
- Friction issues that affect a small subset of users in ways the team can document.
- Polish work that does not block the GA decision.
- Edge cases that do not affect mainline usage.

**The "what changes the GA decision" test.** If fixing this issue affects whether the team can ship to GA, fix it. If it does not affect the GA decision, capture it for post-GA roadmap.

---

## The iteration discipline

Mid-beta iteration adds value but has constraints.

**The discipline.**

- Iterate on the feature, not the beta scope. Adding features to the beta mid-way confuses participants and dilutes signal.
- Fix critical and high-impact friction; capture rather than fix lower-impact issues.
- Communicate iteration to participants: when they see a fix or change, they know it came from their feedback.

**The "do not redesign mid-beta" rule.**

- Significant feature changes mid-beta produce two betas: the pre-change beta and the post-change beta. Neither is fully validated.
- If significant changes are needed, end the current beta, redesign, and start a new beta. Do not blend them.

**The "no creep" discipline.**

- Mid-beta is not the time to add capabilities outside the beta's original scope.
- Feature requests get captured for post-GA, not added to the beta.
- The beta's signal depends on consistency; scope creep undermines the validation.

---

## Communication with participants

Mid-beta communication keeps participants engaged.

**The cadence.**

- Weekly or bi-weekly updates to participants.
- Format: short email or in-product notification.
- Content: what was heard, what is being addressed, what is being deferred, what to expect next week.

**Strong update content.**

- "We heard your feedback about the configuration friction in step 3. We pushed a fix this week; please let us know if it is improved."
- "Several of you reported the dashboard load time is slow at scale. We are investigating; we expect a fix in the next 1-2 weeks."
- "We are seeing strong positive signal on the new export functionality. We will expand the format options in the next iteration."
- "Several of you requested integrations beyond the beta scope. We have captured these for post-GA roadmap."

**Why communication matters.**

- Participants who see their feedback acted on engage more substantively.
- Participants who feel ignored decay.
- Communication signals to participants that the team is listening.

**Common communication failures.**

- Silence between welcome and end of beta. Participants feel ignored.
- Generic updates that do not reference specific feedback. Feels performative.
- Over-communication. Daily updates are too much; participants tune out.
- Updates that promise more than the team will deliver. Erodes trust when promises are not kept.

---

## The mid-beta health check

A specific mid-beta milestone.

**The milestone.** Roughly the midpoint of the beta. The team takes stock of where the beta is.

**The questions.**

- Is the feedback volume what was expected? If not, what is causing the difference?
- Are critical issues surfacing or has the team caught them all in the first part of the beta?
- Are behavioral patterns emerging? What do they suggest for the GA experience?
- Are participants engaged? Are some segments dropping off?
- Is the trajectory toward graduation criteria? Where are gaps?

**The output.**

- Adjustments to the beta operations: more triage, more communication, additional cohort recruitment if needed.
- Surfaced concerns about graduation: are the criteria reachable in the remaining beta time?
- Surfaced wins: what is going well that the team can build on for GA.

---

## Mid-beta participant churn

Some participants will drop off during the beta.

**Why participants churn.**

- The feature did not match their use case (they expected something different).
- They lost interest or got busy.
- They hit critical friction early and gave up.
- They felt ignored after providing feedback.

**The response.**

- Investigate churn. A subset of churn is normal; high churn is signal.
- For participants who churned because of friction: address the friction; possibly re-engage them.
- For participants who churned because of misfit: the cohort may have been miscalibrated; learn for future betas.
- For participants who felt ignored: tighten the communication discipline; thank them for prior feedback even if they have stopped engaging.

**Replacement recruitment.**

- For betas that need a specific cohort size for signal, replace churned participants if possible.
- Late-recruited replacements have less time in the beta; their feedback covers less of the beta period.
- Sometimes accepting churn and a smaller-than-planned cohort is the right call.

---

## Triage anti-patterns

Common ways triage decays.

**Triage skipping.** No formal triage cadence; feedback accumulates without categorization or action.

**Triage as logging.** Feedback gets categorized but never actioned. The categorization is documentation theater.

**Triage by loudest voice.** Loudest participants get attention; quieter ones with similar feedback do not. Skews the synthesis.

**Triage by easiness.** Easy fixes get prioritized regardless of impact. Important harder fixes get deferred indefinitely.

**Triage without communication.** Internal triage happens but participants are not told. They feel ignored.

**Triage that absorbs feature requests.** Participants request features outside scope; the team adds them mid-beta; scope creeps; signal dilutes.

---

## Common iteration failures

**No iteration during the beta.** Feedback is collected; the team waits for end of beta; opportunities to address issues during the beta are missed.

**Excessive iteration.** Significant feature changes mid-beta. The beta becomes two different betas; neither validates the GA experience cleanly.

**Iteration without communication.** The team fixes issues; participants do not know; engagement decays.

**Iteration on participant requests outside scope.** Scope creep; the beta validates a different feature than the original.

**No closing the loop.** Iterations happen; participants are not told their feedback drove the change; the connection between feedback and improvement is invisible.

---

## Methodology-level choices that stay in the public skill

The triage cadence. The categorization scheme. What to fix during the beta vs defer. The iteration discipline. The "do not redesign mid-beta" rule. Communication with participants. The mid-beta health check. Mid-beta churn handling. Common failures.

## Implementation choices that stay internal

Specific triage tools and trackers. Specific communication templates. Specific health-check formats. The team's own conventions for what counts as critical vs friction. These vary by team and tooling.

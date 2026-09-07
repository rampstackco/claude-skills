# Internal alignment checklist

Stakeholders, brief structure, distribution timing. The launch brief is the single document that aligns everyone before customer comms go out.

The principle. Internal alignment fails silently. The team does not know they are misaligned until a customer asks sales a question that sales cannot answer, or a customer escalates an issue support did not know existed. The launch brief catches misalignment before customers do.

---

## Stakeholders by org type

### Small startup (under 50 employees)

- Engineering lead. Capacity for fixes, support escalation handling.
- Sales lead (if B2B). Pipeline impact, deal coaching.
- Customer success / support lead. Often the same person at this size.
- Marketing or content lead (if exists). Comms execution.
- Executive sponsor. Usually CEO at this size.

The brief is shorter at this size; the meeting is faster; but the discipline still matters. The "small team did not need a launch brief" assumption is a frequent source of small-launch failures.

### Mid-size (50 to 500 employees)

- Engineering leadership.
- Sales leadership and at least one regional sales lead.
- Customer success leadership.
- Marketing leadership.
- Support leadership.
- Executive sponsor (VP-level for most launches; C-level for Tier 1).

The brief is longer. The launch meeting includes a Q&A. Decision log captures the questions and answers; the log is part of the brief.

### Enterprise (500+ employees)

- Engineering leadership.
- Sales leadership across regions and segments.
- Customer success leadership.
- Marketing leadership including PMM (product marketing manager).
- Support leadership.
- Legal, security, and compliance (for features touching pricing, data, or regulated workflows).
- Executive sponsor (C-level for Tier 1).

At this size, the launch brief is a formal document with sections owned by different functions. PMM often co-owns the brief with the PM.

---

## The launch brief

A single document distributed two to four weeks before Tier 1 launch, one week before Tier 2 launch.

### Section 1: one-page summary

Top of the brief. The PM writes it. The reader should be able to answer "what is launching, when, who is it for, why now" after one minute.

### Section 2: positioning

The positioning canvas (from the positioning-canvas reference) embedded directly. Target user, problem, current alternative, user-visible promise, proof points, anti-positioning.

### Section 3: launch calendar

Every channel and every date. In-app banner activation, email send, blog post publish, social post times, sales briefing, support training, customer success outreach windows. Owners named for each.

### Section 4: what each function needs to do differently

The most important section for the readers. Each function gets a paragraph.

- **Sales.** Battlecard link. Demo recording link. Top objections and answers. Deals to revisit. Training session date.
- **Customer success.** Top accounts to brief. Talking points for the briefing. Escalation contact during launch week.
- **Support.** Training session date. FAQ link. Escalation path. Ticket tagging convention.
- **Marketing.** Channel list, dates, message variants by channel.
- **Engineering.** On-call coverage during launch. Rollback authority. Health-check dashboard link.

If a function does not have a paragraph, the launch was not designed with that function in mind; revisit before distributing.

### Section 5: FAQ

The questions that have already come up internally, with answers. The FAQ updates daily during the first week of distribution as new questions surface.

### Section 6: decision log

Choices already made. Includes the rationale for non-obvious decisions. Future questions ("why did we pick that rollout strategy?") get answered by reading the log instead of re-litigating the decision.

---

## Distribution timing

| Tier | Timing | Channel |
|---|---|---|
| Tier 1 | 2 to 4 weeks before launch | Email plus async meeting plus 1:1 follow-ups for sales and CS |
| Tier 2 | 1 week before launch | Email plus async meeting |
| Tier 3 | Day of launch or as part of a weekly release digest | Email or shared doc |

The pattern. Launch brief lands first. Sales briefing, support training, customer success outreach all happen after the brief lands and before the public comms fire.

---

## The pre-launch meeting

For Tier 1 launches, hold a 30-minute pre-launch meeting one week before launch.

Agenda.

1. PM walks through the positioning canvas and the calendar (10 minutes).
2. Each function lead confirms their readiness (10 minutes).
3. Open Q&A captured in the decision log (10 minutes).

The meeting is not for re-litigating the launch. It is for confirming readiness and catching last-minute gaps. If functions are not ready, the launch is delayed. The PM has authority to delay; the executive sponsor confirms.

---

## The launch-day standup

For Tier 1 launches, hold a brief launch-day standup at the start of launch day. Five to ten minutes.

Agenda.

1. Confirm rollout health check is green.
2. Confirm comms are gated on the health check (the social post will not auto-fire if the rollout is paused).
3. Confirm support is staffed for the launch window.
4. Confirm escalation contacts are reachable.
5. Open the post-launch monitoring channel.

The launch-day standup catches "the marketing person took the day off and the social post is set to auto-fire" the morning of launch instead of in the moment.

---

## Common internal alignment failures

- **Launching without sales knowing.** Sales finds out from a customer. Trust erodes for the next launch. Fix: launch brief plus sales-specific briefing one to two weeks before public comms.
- **Sales briefing is the launch brief.** Sales reads a 12-page document. Their actual takeaway is partial. Fix: separate one-pager for sales (the battlecard) plus the full brief for reference.
- **Support is trained the day of launch.** Support cannot internalize a new feature in one morning. Fix: train support one week before customer-facing launch.
- **Customer success outreach happens after public comms.** Top accounts hear about the feature from the email blast like everyone else. Fix: customer success briefs top accounts one to three days before public comms.
- **Executive sponsor is surprised on launch day.** The executive read the brief but did not internalize it; on launch day they see press coverage and ask the team questions that should have been answered in the brief. Fix: brief executives in person, not just via document.

---

## When the brief reveals misalignment

The brief is the artifact that surfaces misalignment. Common signals.

- The positioning canvas does not match how sales describes the customer profile. Misalignment between PM and sales on who the customer is.
- The launch calendar does not give sales enough time. Misalignment on what enablement requires.
- The FAQ has questions nobody can answer. Misalignment on what the feature actually does.

The pattern. Surface misalignment before launch; resolve before launch. The brief is the tool that forces the conversation. A team that drafts the brief carefully and finds it easy to write probably has no misalignment. A team that struggles to write the brief has misalignment that the brief is now revealing; resolve it before customer comms go out.

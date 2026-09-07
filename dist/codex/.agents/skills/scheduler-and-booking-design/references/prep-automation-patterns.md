# Prep automation patterns

CRM enrichment, calendar invite, Slack brief, account research.

The qualification data should reach the rep in a useful form before the call. Without prep automation, the data sits unused and the rep starts the call cold despite the data being captured.

---

## The data-reaches-rep principle

Prep automation closes the loop between qualification capture and rep readiness.

**The win.** Prospect books; qualification data populates the CRM record, appears in the calendar invite, and triggers a brief Slack message to the rep with synthesized prep notes. The rep arrives at the call already knowing the prospect's situation.

**The fail.** Qualification data captured; sits in a database; rep does not see it until they search for it. Most reps do not search; they start the call cold.

The discipline. Capture qualification AND deliver it to the rep where they will see it.

---

## Pattern A: CRM enrichment

Qualification data populates the CRM record.

**How it works.**

- Booking submission writes to CRM (Salesforce, HubSpot, etc.).
- Fields populate the lead/contact record.
- Rep sees the data when they review the lead.

**Strengths.**

- Single source of truth.
- Fits existing rep workflow (reps already check CRM).

**Weaknesses.**

- Reps may not check CRM before every call.
- CRM custom fields require setup.

**When to use.** Default; baseline for any prep automation.

---

## Pattern B: Calendar invite enrichment

Qualification data appears in the meeting invite description.

**How it works.**

- When the meeting is created, the invite description includes the qualification data.
- Rep sees it on their calendar; visible at-a-glance.

**Strengths.**

- Rep cannot miss it; calendar is the moment of action.
- Works regardless of CRM access.

**Weaknesses.**

- Calendar invite descriptions can be long; reps may not read fully.
- Updates after booking do not appear in the invite.

**When to use.** Strong complement to CRM enrichment.

---

## Pattern C: Slack or email brief

Pre-call brief sent to the rep with synthesized prospect info.

**How it works.**

- Booking triggers a Slack message or email to the rep.
- Brief includes qualification data plus context (account history, company info, prior interactions).
- Often delivered hours or a day before the call.

**Strengths.**

- Active delivery; rep receives it without searching.
- Can include synthesized context (CRM history, news, prior touches).

**Weaknesses.**

- Slack noise can dilute brief; reps may scroll past.
- Email may sit unread.

**When to use.** When the team's workflow includes Slack or email-driven prep.

---

## Pattern D: Account research

Qualification data triggers automated research.

**How it works.**

- Booking triggers automated lookup (company size verification via Clearbit/ZoomInfo, recent news search, social media check).
- Research results appended to CRM or prep brief.

**Strengths.**

- Rep gets richer context than qualification alone provides.
- Catches data prospects did not provide.

**Weaknesses.**

- Research tools cost.
- Can miss for small companies or international.

**When to use.** Enterprise sales motion; high-value calls warrant research investment.

---

## Pattern E: Hybrid

Combining patterns. Most production teams use multiple.

**Common combination.**

- CRM enrichment as baseline.
- Calendar invite enrichment for at-a-glance visibility.
- Slack brief 24 hours before the call for richer prep.
- Account research for high-fit leads.

The hybrid produces multiple touchpoints; rep sees prep data wherever they happen to look first.

---

## What to include in prep automation

The fields that matter to the rep.

**Standard inclusions.**

- Prospect name and role.
- Company name and size.
- Use case or primary goal.
- Current solution.
- Timeline or urgency.
- Source (paid, organic, referral).

**Sometimes useful.**

- Company industry and recent news.
- Prior interactions with the brand.
- LinkedIn profile link.
- Account history (existing customer, prior trial).

**Avoid in prep.**

- Free-text fields the prospect filled with noise.
- Marketing data not relevant to the call (UTM details, lead source granularity).
- Personal data not needed for the call.

---

## Prep timing

When the brief reaches the rep.

**At-booking.** Brief delivered immediately after booking. Rep can prepare any time.

**Day-before.** Brief delivered 24 hours before. Forces prep into the rep's workflow.

**Hour-before.** Brief delivered 1 hour before. Last-minute prep; useful for back-to-back calls.

**The combined approach.** Most teams use at-booking (CRM record) plus day-before (Slack) plus calendar visibility throughout.

---

## Prep brief copy

What the brief says.

**Strong brief copy.**

- "Sarah Lee, Director of Marketing at [Company], 200-500 employees, evaluating analytics tools to replace [current solution] within 60 days."

What works. Specific; structured; gives rep enough to prepare.

**Weak brief copy.**

- "New booking from Sarah Lee."

What fails. No context; rep starts cold despite the data being captured upstream.

The discipline. Brief should be specific enough that the rep arrives ready.

---

## Prep automation testing

Verify the loop works.

**Test cases.**

- Booking happens; CRM record created; data populates.
- Booking happens; calendar invite shows the qualification data.
- Booking happens; Slack brief arrives at the right time.
- Edge case: prospect updates booking; prep updates accordingly.

**Production monitoring.** If reps consistently arrive at calls cold, prep automation is broken somewhere.

---

## Privacy and consent

Prep automation involves handling user data.

**The principle.** Data captured at booking flows to internal systems for prep. The prospect has implicitly consented to internal use through the booking.

**Limits.**

- Data should not flow to systems unrelated to the booking purpose.
- Account research should respect privacy norms.
- GDPR and other regulations apply.

---

## Common prep automation failures

**No automation.** Data captured; reps do not see it.

**CRM enrichment without rep CRM use.** Data is in CRM; reps do not check CRM before calls.

**Slack brief lost in noise.** Prep brief among 50 other Slack messages; rep misses.

**Calendar invite truncated.** Invite description too long; reps see only opening.

**Stale account research.** Research data from months ago.

**Brief copy generic.** Brief contains data but not synthesized context.

**Updates after booking not propagated.** Prospect updates info; prep stays old.

**No testing.** Prep loop broken; nobody noticed.

---

## Methodology-level choices that stay in the public skill

The data-reaches-rep principle. Patterns A through E (CRM, calendar, Slack, research, hybrid). What to include in prep. Prep timing. Prep brief copy discipline. Prep automation testing. Privacy and consent. Common failures.

## Implementation choices that stay internal

Specific prep configurations for specific teams. Specific Slack templates and CRM custom fields. Specific research tooling. The team's privacy review processes. These vary by team.

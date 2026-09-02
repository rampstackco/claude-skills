# Sales enablement template

Battlecard, demo script, deal coaching, training session structure. For B2B; skip for B2C and PLG.

The principle. Sales reps cannot pitch a feature they were briefed on yesterday. Enablement is the structured way to give sales the language and the mechanics they need to talk about the feature accurately and quickly.

---

## When to skip this section

For B2C products and PLG products without a sales motion, this section does not apply. The user is the buyer; there is no rep in the middle. Skip ahead to the support readiness checklist.

For B2B products, this section is non-negotiable for Tier 1 launches and most Tier 2 launches.

---

## The battlecard

One page. Sales can read it in two minutes and pitch the feature in five.

### Section 1: positioning summary

Two to three sentences. The user-visible promise plus the target customer profile plus the differentiator vs the status quo. Pulled directly from the positioning canvas.

### Section 2: target customer profile

The specifics sales needs to qualify. Industry, company size, role of the buyer, role of the user (often different), use case, current pain.

### Section 3: top objections and answers

Three to five expected objections with the answer for each. The answers are written, not improvised; reps should be able to quote them back.

Example.

| Objection | Answer |
|---|---|
| "We already have a routing solution that works fine." | "Most solutions are keyword-based. Ours uses ML trained on the customer's actual routing decisions, so it adapts to their specific team structure. Customers report 95 percent accuracy vs 60 to 70 percent on keyword-based systems." |
| "How is this different from what [Competitor] just shipped?" | "Both products do automated routing. The difference: ours retrains weekly on the customer's data; theirs uses a fixed model. Customers with non-standard team structures see materially better routing on our system." |
| "What if the model gets it wrong?" | "Below the configurable confidence threshold, the ticket falls back to manual routing. Manager corrections feed back into the model, so accuracy improves over time." |

### Section 4: proof points

The same proof points from the positioning canvas. Three to five concrete capabilities or outcomes.

### Section 5: deal coaching

Specific guidance on how this affects deals.

- **Deals to revisit.** Customers in the pipeline who were blocked by the gap this feature now closes. Names where appropriate.
- **Deals it complicates.** Customers on the existing pricing or feature set who may need migration support. Names where appropriate.
- **Common pricing questions.** What customers ask about cost; the answers reps should give.

### Section 6: where to learn more

Links to the demo recording, the full launch brief, the FAQ, the support documentation, and the PM contact for sales questions.

---

## The demo script

A repeatable demo the rep can run with a customer.

### Structure

**Open (1 minute).** State the customer's pain in their language. Reference what they told the rep in discovery (use a generic placeholder if the rep is in a first-call demo).

**Show the problem (2 minutes).** Demonstrate the status quo workflow that the feature replaces. The rep walks through the manual process, naming the friction points.

**Show the feature (5 minutes).** Walk through the feature solving the same workflow. Highlight the proof points. Pause at the moments where the customer would feel the difference.

**Show the safety net (2 minutes).** Walk through the failure mode. What happens when the feature does not work perfectly. The customer needs to trust the safety net before they trust the feature.

**Close (1 minute).** Summarize the value. Ask the customer what they think. Surface objections.

**Total.** 11 minutes. Demos longer than 15 minutes lose attention; demos shorter than 7 minutes feel rushed.

### The recorded demo

For reps who join after the launch or who want a refresher, a recorded version of the demo. Same structure. Annotated with timestamps. Stored where reps can find it (sales enablement platform, shared drive, internal wiki).

The recorded demo is not a substitute for the live demo with a customer. It is reference material for the rep.

---

## Deal coaching guide

Beyond the battlecard's deal-coaching section, a longer-form guide for the top sales scenarios.

### Scenario 1: deal blocked by missing capability

The rep has a customer in the pipeline who was blocked by a feature gap that this launch closes. Coaching.

- Confirm the gap was the actual blocker via discovery questions before pitching the new feature.
- Reference the customer's specific pain in the demo.
- If the deal stalled with a competitor, address the competitor head-on with the differentiator section of the battlecard.
- Time the outreach. Reach out one to three days after public launch comms; the customer will already be aware of the announcement.

### Scenario 2: existing customer expansion

The rep has an existing customer using a smaller plan; this launch could justify expansion. Coaching.

- The customer success team should brief the customer first if the customer is in a top-account tier.
- The rep follows up with an upgrade conversation tied to the specific value the customer gets from the new feature.
- Pricing change documentation if applicable; reps should not improvise pricing.

### Scenario 3: defensive against churn

The rep has a customer at risk of churning to a competitor whose product had the feature this launch adds. Coaching.

- The customer success team should flag the at-risk customer; the rep delivers the briefing in coordination.
- Acknowledge the gap that existed; explain the timeline of the launch; show the feature.
- Offer migration support if the customer was already starting to evaluate the competitor.

### Scenario 4: net-new pipeline

The rep is targeting net-new prospects for whom the launch is a relevant capability. Coaching.

- Lead with the launch as the recent product update; reference the blog post or release.
- Tie the feature to the buyer's expected pain.
- The launch announcement is the conversation starter; the demo is the conversion.

---

## The training session

Live, 30 minutes, with Q&A. Recorded for reps who cannot attend.

### Structure

**0 to 5 minutes.** PM walks through the positioning canvas. Target user, problem, promise, proof points, anti-positioning.

**5 to 15 minutes.** PM (or sales-engineering partner) demos the feature using the demo script. Reps see what the rep version of the demo looks like.

**15 to 25 minutes.** Q&A. Reps ask the questions they expect customers to ask. The answers feed back into the FAQ.

**25 to 30 minutes.** Coaching on top deal scenarios. Brief discussion of which named accounts in the pipeline are affected.

### After the session

- Recording posted to the sales enablement platform.
- Q&A captured in the launch brief's FAQ section.
- Battlecard finalized with any new objections that surfaced.
- Demo script updated with any clarifications from the live demo.

---

## What to skip

Do not.

- Hand sales a 12-page document and call it enablement.
- Train sales the morning of public launch.
- Skip the recorded demo because "we can do it live."
- Assume sales will read the launch brief before the customer call.

The discipline. Sales enablement is short, opinionated, and rehearsed. Reps internalize it once and pitch the feature naturally for the rest of the launch period.

---

## The "shadow launch" failure

The pattern.

- Feature ships.
- Sales hears about it from product team Slack.
- No battlecard.
- No demo recording.
- Sales reps either ignore the feature in customer conversations (because they cannot pitch it) or misrepresent it (because they are improvising).
- Customers churn or escalate when the feature does not match what they were told.

The cost. Engineering investment is captured at zero or negative value. The next product team launch is met with sales skepticism.

The fix. Sales enablement is mandatory for B2B Tier 1 and Tier 2 launches. The battlecard takes a half day to write. The training session takes 30 minutes. The recorded demo takes an hour. The investment is small relative to the engineering investment behind the feature.

# Support readiness checklist

Training, FAQ, escalation paths, monitoring access. The pattern of training support before customer-facing launch comms.

The principle. Support is the first to encounter the failure modes of a new feature. They need the same context as sales but oriented toward post-purchase questions and incident resolution.

---

## The four deliverables

### 1. Training

Live or recorded, with Q&A.

The same content as the sales training, adapted for support workflows. Differences.

- Sales pitches the feature; support solves problems with it. The training emphasizes how to diagnose customer issues, not how to position the feature.
- Sales sees the happy path; support sees the failure modes. The training includes the FAQ of expected support tickets and the escalation paths for unexpected ones.
- Sales has a 30-minute training; support often has 60 minutes because the breadth of expected questions is larger.

Schedule. Support training one week before customer-facing launch comms. Recorded for reps who cannot attend live.

### 2. FAQ document

The questions that support expects customers to ask, with the answers.

Categories.

- **What does the feature do.** The basic explanation. Same content as the user-visible promise plus a short "how it works" paragraph.
- **How do I turn it on.** Configuration steps. Permissions required. Plan tier required.
- **What are the limits.** Rate limits, size limits, supported regions, supported plans.
- **What if it does not work.** Troubleshooting steps. When to escalate.
- **How do I turn it off.** For users who tried it and want to revert. Often forgotten until the first customer asks.
- **Pricing or billing questions.** If the feature affects billing, support needs the answer.

The FAQ updates daily during the first week of launch as new questions surface. Support reps add questions they encountered to the FAQ; the PM reviews and approves daily.

### 3. Escalation path

When support cannot answer a question or solve an issue, who do they escalate to and how fast.

The escalation contract.

- **Tier 1 (in-product issue).** Support resolves with the customer using the FAQ and product knowledge. Target response: under 1 hour during business hours.
- **Tier 2 (product question support cannot answer).** Escalate to the PM. Target response from PM: same day during business hours.
- **Tier 3 (product is broken for the customer).** Escalate to engineering on-call. Target response from engineering: under 2 hours regardless of hours during launch week.

For Tier 1 launches, the on-call rotation should include a launch-week PM contact in addition to the regular engineering on-call.

### 4. Monitoring access

Support reps should be able to verify whether a customer's issue is feature-specific.

The minimum.

- A dashboard showing feature health (overall error rate, feature-specific error rate, rollout percentage).
- A way to look up whether a specific customer is in the rollout cohort. (For flag-gated rollouts; some customers will not have access to the feature on launch day, and support needs to be able to confirm that.)
- A way to look up the customer's recent feature usage (or the lack thereof).

Without monitoring access, support reps escalate every feature-related ticket to engineering or the PM. The escalation queue gets noisy; real Tier 3 issues get drowned in Tier 2 questions.

---

## The training-before-comms rule

The discipline. Support training happens before customer-facing comms launch.

The reason. Customers will start asking support about the feature within minutes of the public announcement. Support needs to be ready before customers ask, not while customers are asking.

The pattern.

- Day T minus 7: support training delivered. FAQ published internally. Escalation paths confirmed.
- Day T minus 1: support team huddle. Last-minute questions. FAQ refresh.
- Day T (launch day): support staffed for elevated volume. PM and engineering on-call paths confirmed open.

The "training day-of" failure. Support is trained the morning of public launch. By the afternoon, they have already encountered three customer questions they cannot answer well. The support team's confidence with the feature degrades; customers feel the rep does not know the product. Trust loss.

---

## The "support is overwhelmed" failure

The setup. The launch generates more support volume than the team expected. The feature is novel; customers ask many basic questions; the FAQ does not anticipate the actual questions; support reps escalate everything to the PM.

The signs.

- Support ticket queue length doubles or triples on launch day vs the prior week.
- Tickets tagged with the feature exceed the support team's capacity for new conversations.
- The PM's Slack is full of support questions that should have FAQ answers.

The fix.

- Pre-launch: estimate support volume. Look at ticket volume from prior comparable launches; double the estimate.
- Pre-launch: staff support for the launch window. Pull in cross-functional help if needed.
- Pre-launch: write the FAQ deeper than feels necessary. Most launches have 20 to 30 expected questions; document them all in advance.
- Launch day: PM is available for FAQ updates throughout the day. New questions get answers within an hour and propagate to support.

---

## What support needs that sales does not

Two specific differences.

**Failure modes documentation.** Support needs to know what happens when the feature breaks. The error messages users see, the recovery flows, the limitations. Sales does not need this depth; support requires it.

**Customer-facing language for limits.** Sales pitches the feature and addresses the limits at the negotiation stage. Support encounters the limits the moment a customer hits them. Support reps need pre-written language for "the feature supports up to X; for higher volumes, contact your account manager."

Without these two, support is improvising at the moment of customer pain. Improvisation produces inconsistent answers across reps; customers compare notes and lose trust.

---

## The post-launch FAQ refresh cycle

For two to four weeks post-launch, the FAQ refreshes daily.

- Support reps log new questions they encountered, with the answers they gave.
- PM reviews daily, approves or corrects answers, adds them to the canonical FAQ.
- Support team gets a daily summary of new FAQ entries.

After two to four weeks, the FAQ stabilizes. The refresh moves to weekly, then monthly.

The cost of the daily refresh is small. The benefit is that support builds confidence with the feature in the first month, instead of struggling for the first quarter.

---

## When support flags an issue larger than a question

Sometimes the support volume on a feature reveals a real problem with the feature, not just a need for better FAQ.

Signs.

- Many customers ask the same question, and the answer is "the feature does not do that." The customers expected something the feature does not deliver. Positioning was misaligned.
- Many customers report the same bug. The bug is real and affects a meaningful share of users.
- Support tickets cluster on a specific cohort (e.g., users on a specific plan, in a specific region). The feature does not work correctly for that cohort.

The pattern. Support is the early-warning system for launch quality. The PM should review the support ticket digest daily during the first week and at least weekly thereafter. If the support volume reveals a feature problem, the launch may need to pause for a fix before further rollout.

The discipline of treating support as a quality signal is the cheapest way to catch launch problems before they show up in revenue or churn metrics.

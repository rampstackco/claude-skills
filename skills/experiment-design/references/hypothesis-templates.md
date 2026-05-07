# Hypothesis templates

Concrete formats for writing hypotheses that pass the cause-effect-magnitude-mechanism test from [SKILL.md](../SKILL.md). Each template names the right shape, shows two or three worked examples in different domains, and calls out the most common mistakes specific to that template type.

The unifying format across all templates: replace [bracketed slots] with concrete project-specific values. If a slot reads as a vague phrase after replacement, the hypothesis is not specific enough.

---

## Template 1: Conversion rate change

**Format.** Replacing [current treatment] with [new treatment] will increase [conversion event] by [magnitude] (current [baseline rate], target [target rate]) by [mechanism].

**Worked example, e-commerce.** Replacing the multi-step shipping selector with an inline shipping summary on the cart page will increase cart-to-purchase conversion by 6 percent (currently 14.2 percent, target 15.1 percent) by reducing the cognitive load at the moment users are deciding whether to complete checkout.

**Worked example, SaaS.** Replacing the three-tier pricing comparison with a single recommended tier on the pricing page will increase signup-to-paid conversion by 8 percent (currently 12 percent, target 13 percent) by reducing decision friction for users who already know they want to subscribe.

**Worked example, marketplace.** Replacing the "browse all categories" landing page with a personalized recommendation grid will increase landing-to-listing-click conversion by 12 percent (currently 18 percent, target 20.2 percent) by surfacing relevant inventory before users have to specify intent.

**Common mistakes specific to this template.**
- Naming the metric as "conversions" without specifying the conversion event. "Conversion" alone is ambiguous; cart-to-purchase, signup-to-paid, and landing-to-listing-click are different metrics with different baselines and different relevant timescales.
- Stating relative lift without absolute. "10 percent lift" sounds bigger than "1 percent absolute lift on a 10 percent baseline" but is the same thing; state both so the reader knows what is being claimed.
- Skipping the mechanism. "Will increase conversion by 8 percent" is a target, not a hypothesis. The why is what makes it falsifiable.

---

## Template 2: Engagement metric change (DAU, sessions, time-on-task)

**Format.** Adding [new feature or affordance] will increase [engagement metric] by [magnitude] (current [baseline], target [target]) by [mechanism].

**Worked example, content product.** Adding a "save for later" button to article cards will increase weekly active users by 5 percent (currently 1.2 million, target 1.26 million) by giving users a reason to return to articles they have started reading.

**Worked example, productivity tool.** Adding inline comments on document blocks will increase sessions per week per active team by 15 percent (currently 4.2, target 4.8) by enabling asynchronous collaboration that previously required separate communication channels.

**Common mistakes specific to this template.**
- Engagement metrics are not always good. A feature that increases sessions but decreases task completion is making the product worse, not better. Pair engagement primary metrics with task-completion guardrails.
- "Time on task" is ambiguous. More time can mean engagement or confusion. Specify whether longer or shorter is the desired direction and why.
- Treating engagement lift as a leading indicator without evidence that it is. Increased DAU does not always lead to increased revenue; sometimes it lags it, sometimes it has no relationship.

---

## Template 3: Revenue metric change (ARPU, AOV, RPU)

**Format.** Implementing [new pricing or merchandising change] will increase [revenue metric] by [magnitude] (current [baseline], target [target]) by [mechanism].

**Worked example, subscription product.** Adding an annual prepay option at 10 percent discount will increase average revenue per user by 4 percent (currently $87, target $90.50) by shifting price-sensitive users from monthly to annual billing, which has lower churn.

**Worked example, e-commerce.** Adding a "frequently bought together" bundle on product detail pages will increase average order value by 8 percent (currently $42, target $45.40) by surfacing relevant add-on items at the moment of purchase decision.

**Common mistakes specific to this template.**
- Revenue is a ratio metric (revenue divided by users or orders). Naive variance estimators understate the variance and overstate confidence. Confirm your platform uses the delta method or an equivalent ratio-aware estimator.
- ARPU lifts can come from selection effects: if the treatment moves the lowest-revenue users away (they churn), ARPU goes up without anyone making more money. Pair ARPU primary metrics with retention guardrails.
- Revenue lifts can be driven by a small number of high-value users. Confidence intervals are wide. Run longer than you think you need to.

---

## Template 4: Retention metric change

**Format.** Changing [interaction or feature] will increase [retention metric] by [magnitude] (current [baseline], target [target]) by [mechanism].

**Worked example, mobile app.** Changing the day-3 push notification copy from generic to personalized recommendations will increase day-7 retention by 3 percent (currently 38 percent, target 39.1 percent) by reminding users of specific value they can return to.

**Worked example, SaaS onboarding.** Replacing the static onboarding checklist with a guided in-product tour will increase day-30 active retention by 5 percent (currently 22 percent, target 23.1 percent) by getting more users to the activation event during their first session.

**Common mistakes specific to this template.**
- Retention takes time to measure. A test of day-30 retention requires at least 30 days of treatment exposure plus the test duration. Plan accordingly.
- Day-N retention is a moving definition. Day-7 active means different things in different products; specify the activity that defines "active" before running.
- Retention lifts often shrink over time. A treatment that improves day-7 retention may have no effect on day-90 retention. Decide which timescale matters for the business and measure that, not just the convenient short one.

---

## Template 5: Funnel-step abandonment reduction

**Format.** Modifying [specific funnel step] will reduce abandonment at that step by [magnitude] (current [baseline rate], target [target rate]) by [mechanism].

**Worked example, signup funnel.** Removing the phone number field from the signup form will reduce signup-form abandonment by 20 percent (currently 35 percent, target 28 percent) by removing a high-friction field that is not required for account creation.

**Worked example, checkout funnel.** Adding guest checkout above the account creation prompt will reduce account-creation-step abandonment by 25 percent (currently 18 percent, target 13.5 percent) by giving purchase-intent users a path that does not require account creation.

**Common mistakes specific to this template.**
- Reducing abandonment at one step often shifts abandonment to the next step. The right metric is downstream conversion, not just step-level abandonment. Pair step-level primary metrics with full-funnel guardrails.
- Signup abandonment can be measured noisily; users who abandon the form may return later. Define the conversion window (5 minutes, 24 hours, 7 days) before testing.
- Reducing friction is not always good. A signup form that is too short produces low-quality signups: trial users who never return, fake accounts, support load. Pair friction-reduction tests with downstream-quality guardrails.

---

## Anti-templates: hypotheses that should be rejected

Examples of hypotheses that fail the format and should be rewritten before launching:

- "We think the new pricing page will increase conversions." Missing magnitude, mechanism, and a specific conversion event. Rewrite using Template 1.
- "Users will love the redesign." Missing everything. Not testable. Pick a metric.
- "The new flow is faster, so more people will complete it." Missing baseline, target, and a defined "complete" event. The mechanism (faster) is plausible but not specific.
- "We want to see if dark mode improves engagement." Vague metric (engagement), no magnitude, and dark mode is binary not a multivariate. Pick a specific engagement metric and pre-register the segments where dark mode users are likely to differ from light-mode users (mobile evening sessions, for example).

If your draft hypothesis sounds like one of the anti-templates, rewrite it using one of the five templates above before running the test.

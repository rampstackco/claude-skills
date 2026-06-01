# Funnel design templates

Common funnel shapes with anchor events, time windows, and drop-off interpretation guidance.

The principle. Every funnel measures progression through a sequence. The shape of the funnel must match the shape of the user behavior; mismatch produces conversion rates that are uninterpretable.

---

## Activation funnel

Signup to first value. The most important funnel for product-led growth.

### Standard shape

| Step | Event | Notes |
|---|---|---|
| 1 | `user_signed_up` | The anchor. High intent. |
| 2 | `onboarding_started` | The user begins the guided onboarding. |
| 3 | `onboarding_completed` | The user finishes onboarding. Note: this is not activation. |
| 4 | `first_value_action_completed` | The user does the action that delivers product value. THIS is activation. |
| 5 | `aha_moment_reached` | Optional. The threshold beyond which retention curves stabilize. |

### Time window

7 to 14 days from signup. Longer windows include users who activated after a long delay; shorter windows undercount slow adopters.

### Anchor selection

`user_signed_up` is the standard anchor. Avoid `landing_page_viewed` (too noisy) and `email_collected` (too low-intent).

### Drop-off interpretation

- 70%+ drop between signup and onboarding_started: the post-signup experience is the problem. Often a friction issue (email verification, account setup steps).
- 30%+ drop between onboarding_completed and first_value_action_completed: onboarding is teaching the wrong thing. Users complete the tour but do not understand the product.
- High drop at first_value_action_completed: the value action is too hard or too far from the user's natural path. Move it earlier in the experience.

---

## Conversion funnel

Trial to paid. The most important funnel for SaaS subscription businesses.

### Standard shape

| Step | Event | Notes |
|---|---|---|
| 1 | `trial_started` | The anchor. High intent and ready to evaluate. |
| 2 | `aha_moment_reached` | The user experiences product value. Critical predictor of conversion. |
| 3 | `paywall_viewed` | The user sees the upgrade prompt. |
| 4 | `checkout_started` | The user begins the payment flow. |
| 5 | `subscription_purchased` | The conversion. |

### Time window

The trial length plus a 7-day grace period. A 14-day trial uses a 21-day funnel window. Shorter windows undercount last-day conversions.

### Anchor selection

`trial_started` is the standard anchor. Funnels that start at signup (rather than trial start) include users who never engaged with the trial; the conversion rate looks lower than it actually is for engaged users.

### Drop-off interpretation

- High drop between aha_moment_reached and paywall_viewed: users got value but the paywall did not appear (timing issue) or did not feel relevant. Audit the paywall trigger logic.
- High drop between paywall_viewed and checkout_started: pricing or feature gating is the friction. Often a positioning issue rather than a UX issue.
- High drop between checkout_started and subscription_purchased: payment flow friction. UX audit the checkout pages; check failed-payment rates.

---

## Engagement funnel

Visit to action. Useful for understanding session-level conversion.

### Standard shape

| Step | Event | Notes |
|---|---|---|
| 1 | `feature_x_landing_page_viewed` | The anchor. Specific intent (feature page, not homepage). |
| 2 | `feature_x_used` | The user performs the core action. |
| 3 | `feature_x_completed_workflow` | The user finishes the workflow. |
| 4 | `content_y_shared` or similar high-intent action | Optional. Strongest engagement signal. |

### Time window

Single session, typically 30 to 60 minutes from the first event.

### Anchor selection

A feature-specific landing or entry point. Avoid `homepage_viewed` (too broad) and `session_started` (auto-firing, not intent).

### Drop-off interpretation

- High drop from landing to use: the page promises something the feature does not deliver, or the activation friction is too high.
- High drop from use to workflow completion: the workflow has too many steps, or a specific step has UX issues.

---

## Feature adoption funnel

Awareness to repeat use. Tracks how a feature spreads through the user base.

### Standard shape

| Step | Event | Notes |
|---|---|---|
| 1 | `feature_x_announced_to_user` | The anchor. The user saw a notification, prompt, or in-app message about feature X. |
| 2 | `feature_x_first_used` | The user tried feature X for the first time. |
| 3 | `feature_x_used_in_week_2` | The user used feature X again in a different week. |
| 4 | `feature_x_used_in_week_4` | Sustained adoption. |

### Time window

4 weeks from announcement.

### Anchor selection

The announcement event is the right anchor for measuring rollout effectiveness. For organic discovery (no announcement), use `feature_x_first_used` as the anchor and measure the feature's reach as a denominator.

### Drop-off interpretation

- High drop from announcement to first use: the announcement was missed, the announcement was unclear, or the feature was not relevant to the audience. Audit by user segment.
- High drop from first use to repeat use in week 2: the feature did not deliver value on first use. Either the use case was wrong (user tried it for the wrong thing) or the value-prop is weak.
- Adoption stalls at 5% of the user base: the feature is for a niche; this may be expected. Compare against the projected target audience size.

---

## Common funnel design mistakes

### Mistake 1: vanity-event anchor

Using `homepage_viewed` or `session_started` as the anchor. The denominator is huge; the conversion rate is tiny; the funnel says nothing about user behavior.

Fix. Anchor on a high-intent action: signup, trial_started, feature-specific page view.

### Mistake 2: too long

Ten or more steps. The end-to-end conversion rate is near zero; the funnel is hard to interpret; small numerator changes look like dramatic shifts.

Fix. Break into 2 or 3 shorter funnels. An activation funnel plus a conversion funnel beats one 10-step funnel.

### Mistake 3: auto-firing events as steps

Including `session_started`, `app_opened`, or any event that fires automatically. The denominator is the entire user base; the meaning of conversion rates is muddled.

Fix. Use only intentional, semantic events as funnel steps.

### Mistake 4: same event in multiple positions

Using `feature_used` at step 2 and step 5. The platform double-counts; the analyst gets confused.

Fix. Distinguish via different events (`feature_first_used` vs `feature_used_in_week_2`) or via a property filter.

### Mistake 5: mixed time windows

The funnel definition allows step 2 within 7 days but step 4 within 30 days. The math becomes interpretable only by the analyst who built it; everyone else gets it wrong.

Fix. One time window for the entire funnel. Document it explicitly.

### Mistake 6: forgetting the cohort

Running the funnel against "all users ever" rather than a specific acquisition cohort. The cohort matters; January users behave differently from November users.

Fix. Always specify the cohort. "Users who signed up in March, evaluated against the activation funnel within 14 days."

---

## Comparing funnels across cohorts

The strongest analytical use of funnels is comparing how the funnel performs across cohorts.

- This month's signup cohort vs last month's: is the funnel stable, or are recent users dropping more?
- Paid acquisition cohort vs organic: are paid users converting at the same rate, or are paid users worse-quality?
- Mobile vs web: is the experience parity issue real?

Always compare cohorts at matched ages. A 30-day-old cohort vs a 60-day-old cohort has different conversion rates by definition.

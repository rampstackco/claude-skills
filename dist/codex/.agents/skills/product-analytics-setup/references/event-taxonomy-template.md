# Event taxonomy template

A canonical event spec for typical SaaS. Six event categories with the events that belong in each, when they fire, who fires them (client or server), required properties, and common pitfalls.

The principle. Thirty to fifty events covers most SaaS products. Below twenty is under-instrumented; above one hundred is usually UI noise. The categories below are the durable shape; the specific event names map to your product.

---

## Account events

Account-level lifecycle. Server-side firing typical because billing is server-side.

| Event | Fires when | Required properties | Notes |
|---|---|---|---|
| `account_created` | A new account (workspace, organization) is provisioned. | `account_id`, `plan_tier`, `seat_count` | Distinct from `user_signed_up` (a user can join an existing account). |
| `account_upgraded` | The account moves to a higher plan tier. | `account_id`, `from_tier`, `to_tier`, `change_reason` | Fires server-side from the billing webhook. |
| `account_downgraded` | The account moves to a lower plan tier. | `account_id`, `from_tier`, `to_tier`, `change_reason` | Same source as upgrade. |
| `account_canceled` | The account cancels and stops renewing. | `account_id`, `cancellation_reason`, `final_term_end_at` | Cancellation reason is critical; capture it from the cancellation flow. |
| `seat_added` | A new seat is provisioned on the account. | `account_id`, `seat_count_after`, `added_by_user_id` | Useful for net-revenue-retention analysis. |
| `seat_removed` | A seat is released from the account. | `account_id`, `seat_count_after`, `removed_by_user_id`, `removal_reason` | |

Common pitfall. Firing account events client-side from the admin UI. The admin's browser may not be open during the cancellation; server-side from the billing webhook is the right source.

---

## User events

User-level lifecycle.

| Event | Fires when | Required properties | Notes |
|---|---|---|---|
| `user_signed_up` | A user creates an account or joins an existing account. | `user_id`, `account_id`, `signup_source`, `referrer_source` | Distinct from `account_created`; one account, many users. |
| `user_invited` | An existing user invites a new user. | `inviter_user_id`, `invited_email`, `account_id`, `invitation_role` | The invitation event; `user_signed_up` fires later when the invite is accepted. |
| `user_role_changed` | A user's role within the account changes. | `user_id`, `account_id`, `from_role`, `to_role`, `changed_by_user_id` | |
| `user_logged_in` | A user authenticates after a logged-out state. | `user_id`, `auth_method`, `device_type` | Different from session start. Logged-in across multiple sessions. |
| `user_logged_out` | A user explicitly signs out. | `user_id`, `logout_reason` | Often missed; explicit signout vs session timeout. |
| `user_deactivated` | A user's account is deactivated. | `user_id`, `account_id`, `deactivation_reason` | Soft delete pattern. |

---

## Activation events

The first-value moment. Critical for activation analysis.

| Event | Fires when | Required properties | Notes |
|---|---|---|---|
| `onboarding_step_completed` | The user completes a step in the onboarding flow. | `user_id`, `step_name`, `step_number`, `time_in_step_s` | Step name is canonical; do not change it without versioning. |
| `onboarding_completed` | The user finishes all onboarding steps. | `user_id`, `total_time_s`, `steps_completed_count` | Distinct from activation; onboarding completion does not equal activation. |
| `first_value_action_completed` | The user does the thing that delivers product value for the first time. | `user_id`, `action_name`, `time_since_signup_s` | Define this carefully per product. For Slack, first message sent. For Figma, first frame created. |
| `aha_moment_reached` | The user crosses the activation threshold. | `user_id`, `threshold_metric`, `threshold_value` | Tied to the activation definition (e.g., "5 messages in week 1"). |

---

## Engagement events

Recurring product use. The bulk of event volume.

| Event | Fires when | Required properties | Notes |
|---|---|---|---|
| `feature_x_used` | The user invokes feature X. Replace x with the actual feature name. | `user_id`, `feature_name`, `entry_point` | Granularity guidance: one event per feature, not one event per button. |
| `content_y_created` | The user creates a new asset (document, project, message, etc.). | `user_id`, `content_type`, `content_id`, `creation_source` | |
| `content_y_edited` | The user modifies an existing asset. | `user_id`, `content_type`, `content_id`, `edit_type` | High volume; consider sampling if storage is a concern. |
| `content_y_shared` | The user shares an asset externally. | `user_id`, `content_type`, `content_id`, `share_method`, `recipient_count` | Sharing is often the strongest engagement signal. |
| `search_executed` | The user runs an in-product search. | `user_id`, `query_length`, `result_count`, `clicked_result_position` | Capture click-through rates. |

---

## Conversion events

Money moves. Server-side firing required.

| Event | Fires when | Required properties | Notes |
|---|---|---|---|
| `trial_started` | The user starts a free trial. | `user_id`, `account_id`, `trial_plan`, `trial_length_days` | Server-side from the billing system. |
| `trial_converted` | The trial converts to paid. | `user_id`, `account_id`, `from_plan`, `to_plan`, `mrr_added` | Server-side. The MRR property feeds revenue analysis. |
| `trial_expired_no_conversion` | The trial ends without converting. | `user_id`, `account_id`, `trial_plan`, `usage_during_trial` | Useful for win-back campaigns. |
| `subscription_purchased` | A subscription begins (any path). | `user_id`, `account_id`, `plan_tier`, `mrr_added`, `purchase_source` | Includes trial conversions and direct purchases. |
| `subscription_renewed` | A subscription renews for the next term. | `account_id`, `plan_tier`, `mrr_at_renewal` | |
| `payment_failed` | A payment attempt fails. | `account_id`, `failure_reason`, `attempt_number` | Critical for involuntary churn analysis. |

---

## Retention events

Repeat behavior markers. Useful for retention curve construction.

| Event | Fires when | Required properties | Notes |
|---|---|---|---|
| `weekly_active_marker` | The user fires any qualifying event in a given week. | `user_id`, `week_of_year`, `qualifying_event_count` | Some teams compute this in the warehouse rather than fire it as an event; either pattern works. |
| `returned_after_n_days` | The user returns after N days of inactivity. | `user_id`, `inactive_days_count`, `last_active_at` | Useful for resurrection-flow analytics. |

---

## Property requirements across all events

Every event payload should include:

- `user_id` (or `anonymous_id` for pre-auth events)
- `account_id` (where applicable; for B2B SaaS especially)
- `timestamp` (ISO 8601, server-stamped)
- `device_type` and `platform` (mobile, web, desktop)
- `app_version` (for change-tracking)
- `session_id` (for path analysis)

Some platforms inject these automatically. Verify; do not assume.

---

## Common pitfalls in event taxonomy

- **Tracking page views as the primary engagement signal.** Page views are noise. Track semantic events (created, edited, shared) instead.
- **Treating onboarding completion as activation.** Many users complete onboarding without ever returning. Define activation as a recurring-value action, not as flow completion.
- **Inconsistent fire timing across the funnel.** Some events fire client-side, some server-side. Reconcile by picking one source per event and documenting it.
- **Adding new events without checking existing ones.** Six months in, the event list has three versions of "subscription started." Audit before adding.

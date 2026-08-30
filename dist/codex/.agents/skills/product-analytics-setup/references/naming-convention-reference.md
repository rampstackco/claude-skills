# Naming convention reference

A complete style guide. Pick one convention; enforce it via CI lint.

---

## The canonical conventions

**snake_case** for events and properties. `user_signed_up`, `cart_value`, `trial_day`.

**Past tense, action-oriented** for events. `checkout_completed`, not `complete_checkout` or `completing_checkout`.

**Object-action format** for events. Noun then verb. `video_played`, `form_submitted`, `email_opened`.

**Boolean prefix** for boolean properties. `is_`, `has_`, `can_`. `is_admin`, `has_trial`, `can_invite`.

**Counting suffix** for count properties. `_count` or `_total`. `seat_count`, `total_purchases`, `signup_count`.

**Money in smallest unit** with currency named. `price_cents` not `price` (and currency on `currency` property).

**Timestamp suffix** for date-time properties. `_at` for absolute timestamps. `created_at`, `last_active_at`. `_s` or `_ms` for durations. `time_since_signup_s`.

**Period suffix** for relative-time properties. `_days`, `_weeks`. `inactive_days_count`, `trial_length_days`.

---

## Do and don't

| Don't | Do | Why |
|---|---|---|
| `Sign Up Completed` | `signup_completed` | snake_case, no spaces. URL-safe. |
| `userSignedUp` | `user_signed_up` | snake_case wins by default; consistent across the platform. |
| `signup` (event) | `user_signed_up` | Past tense, object-action. Reads as "this happened." |
| `complete_checkout` | `checkout_completed` | Past tense for events. |
| `completing_checkout` | `checkout_completed` | Past tense, not progressive. |
| `Sign Up` | `signup` or `signed_up` | Pick one form for the same concept. Document it. |
| `price: "$19.99"` | `price_cents: 1999` plus `currency: "USD"` | Money in smallest unit. Currency separate. |
| `quantity: "5"` | `quantity: 5` | Numbers as numbers, not strings. |
| `is_premium: "yes"` | `is_premium: true` | Booleans as booleans. |
| `viewed: 1` | `is_viewed: true` | If it is yes/no, it is boolean, not 0/1. |
| `created: "5/5/2026"` | `created_at: "2026-05-05T14:30:00Z"` | ISO 8601, always. UTC. |
| `tags: "a,b,c"` | `tag_list: ["a", "b", "c"]` | Arrays for bounded lists, not delimiter-strings. |
| `signup_source` (one event) plus `source` (another event) | `signup_source` plus `referral_source` | Disambiguate when the same name means different things. |
| `User Signed Up` (event), `signupCompleted` (event), `SIGN_UP` (event) | `user_signed_up` (event), `signup_completed` (event) | Pick one casing, stick to it. |
| `mailchimp_email_opened` | `email_opened` plus `provider: "mailchimp"` property | Brand-neutral event names; vendor as a property. |
| `feature_x_clicked` | `feature_x_used` | Track usage, not button clicks. UI events are noise. |

---

## Boolean property prefixes

The prefix should make the property read as a yes-or-no question.

- `is_admin` reads as "is admin?" Yes or no.
- `has_trial` reads as "has trial?" Yes or no.
- `can_invite` reads as "can invite?" Yes or no.
- `should_notify` reads as "should notify?" Yes or no.

What NOT to do.

- `admin: true`. Reads as "admin is true." Awkward in queries.
- `premium: 1`. Reads as a count, not a yes-or-no.
- `trial: "yes"`. String, not boolean.

---

## Time, date, and duration suffixes

| Suffix | Meaning | Example |
|---|---|---|
| `_at` | Absolute timestamp (ISO 8601 UTC) | `created_at`, `last_active_at`, `event_timestamp` |
| `_s` | Duration in seconds | `time_in_step_s`, `session_duration_s` |
| `_ms` | Duration in milliseconds | `response_time_ms` |
| `_days` | Duration in days (integer) | `inactive_days_count`, `trial_length_days` |
| `_weeks` | Duration in weeks (integer) | `weeks_since_signup` |
| `_months` | Duration in months (integer) | `months_active` |

Mixing units across the schema produces bugs. Pick one unit per concept and document it.

---

## Money

Two rules.

1. **Smallest unit, integer.** `price_cents`, `mrr_cents`, `total_revenue_cents`. Float arithmetic on money produces rounding errors.
2. **Currency named separately.** `currency: "USD"`. Do not assume USD; international users break the assumption.

When the smallest unit varies (yen has no decimals; bitcoin has 8), pick a precision and document it. The integer math discipline still applies.

---

## Identifiers

Three identifier patterns.

- **Stable IDs** are immutable. `user_id`, `account_id`, `product_id`. Use UUIDs or a system-generated identifier.
- **Human-readable names** are mutable. `product_name`, `account_name`. Useful for reporting; never use as a join key.
- **Display IDs** are user-visible. `invoice_number`, `order_number`. Often distinct from the database primary key.

Always include a stable ID in event payloads. Optionally include the human-readable name for reporting convenience.

---

## What NOT to encode in event names

Three categories of detail belong on properties, not in event names.

1. **State or status.** Not `user_active`, `user_inactive`. Use `user_signed_in` (event) plus `status` (user property).
2. **Variant or treatment.** Not `signup_variant_a`. Use `user_signed_up` (event) plus `experiment_variant` (property).
3. **Source or channel.** Not `signup_from_facebook`. Use `user_signed_up` (event) plus `acquisition_channel: "facebook"` (property).

The principle. Event names answer "what happened?" Properties answer "with what context?"

---

## Enforcement

A naming convention without enforcement decays. Two patterns.

**CI lint.** A schema definition (TypeScript interface, JSON Schema) plus a CI step that rejects events whose payload does not match. The lint catches new violations before they hit production.

**Code review checklist.** PRs that add or modify events include a snippet showing the event name, properties, and types. The reviewer compares against the naming convention reference and the existing taxonomy.

Without enforcement, the convention becomes documentation that nobody reads. With enforcement, it becomes a constraint that the codebase respects.

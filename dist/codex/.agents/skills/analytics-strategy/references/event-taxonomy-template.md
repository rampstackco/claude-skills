# Event Taxonomy Template

Starter event catalogs for common product types. Adapt to specific products. The patterns generalize.

---

## Universal events (most products need these)

### Lifecycle events

| Event | When fired | Common properties |
|---|---|---|
| `user_signed_up` | New account created | signup_method, source, referrer, plan |
| `user_logged_in` | Successful login | login_method |
| `user_logged_out` | Session ended | session_duration |
| `user_deleted_account` | Account deletion | reason (if collected) |

### Product/feature engagement

| Event | When fired | Common properties |
|---|---|---|
| `feature_used` | Specific feature interaction | feature_name, feature_version |
| `setting_changed` | User changes a setting | setting_name, old_value, new_value |
| `notification_clicked` | User clicks a notification | notification_type, notification_id |

### Errors

| Event | When fired | Common properties |
|---|---|---|
| `error_occurred` | Anywhere an error is shown to user | error_type, error_message, page, action_attempted |
| `form_validation_failed` | Form submit blocked by validation | form_name, fields_with_errors |

### Communication

| Event | When fired | Common properties |
|---|---|---|
| `email_received` | Email delivered (server-side, via ESP webhook) | email_type, campaign_id |
| `email_opened` | Email opened (via tracking pixel) | email_type, campaign_id |
| `email_clicked` | Link in email clicked | email_type, campaign_id, link_text |
| `email_unsubscribed` | User unsubscribes | email_type |

---

## SaaS / B2B product events

```
Acquisition
├── user_signed_up
├── trial_started
└── trial_extended

Activation (the "aha" moment)
├── workspace_created
├── teammate_invited
├── first_project_created
├── first_integration_connected
└── first_value_action  (product-specific - the moment user gets value)

Engagement
├── session_started
├── project_opened
├── workflow_completed
└── feature_X_used  (one per key feature)

Conversion
├── plan_upgraded
├── seats_added
├── invoice_paid
└── annual_plan_purchased

Retention
├── returned_after_inactivity
├── reactivated_from_email
└── usage_milestone_hit  (e.g., crossed 100 actions)

Risk signals
├── support_ticket_opened
├── billing_failure_occurred
├── trial_expiring_soon  (calculated, server-side)
└── churn_risk_threshold_hit  (calculated)
```

### Properties to capture across all events

```
user_id        Persistent across sessions
session_id     New per session
account_id     For multi-user accounts
plan           Current plan tier
days_since_signup  
device_type
browser
os
geo_country
geo_region
referrer
utm_source / utm_medium / utm_campaign / utm_term / utm_content
```

---

## Ecommerce events

```
Discovery
├── page_viewed
├── search_performed
├── search_results_viewed
├── filter_applied
└── product_listing_viewed

Consideration
├── product_viewed
├── product_image_zoomed
├── size_selected
├── color_selected
├── reviews_read
└── product_shared

Cart
├── product_added_to_cart
├── product_removed_from_cart
├── cart_viewed
├── cart_quantity_changed
└── cart_abandoned  (calculated, server-side)

Checkout
├── checkout_started
├── shipping_info_entered
├── billing_info_entered
├── promo_code_applied
├── promo_code_failed
├── checkout_step_viewed  (with step_name)
└── purchase_completed

Post-purchase
├── order_shipped
├── order_delivered
├── product_returned
├── review_submitted
└── reorder_initiated
```

### Ecommerce-specific properties

```
For purchase_completed:
  order_id
  total_value
  currency
  shipping_method
  payment_method
  discount_applied
  items: [
    { product_id, product_name, category, brand, variant, quantity, unit_price }
  ]

For product_viewed:
  product_id
  product_name
  category
  brand
  price
  in_stock
  position  (when viewed in a list)
```

---

## Content site / publisher events

```
Reading
├── page_viewed
├── article_started  (when article body enters viewport)
├── article_25_percent_scrolled
├── article_50_percent_scrolled
├── article_75_percent_scrolled
├── article_100_percent_scrolled  (read to end)
└── article_time_spent  (calculated on page exit)

Engagement
├── newsletter_signup_shown
├── newsletter_signup_completed
├── comment_posted
├── article_shared
├── article_bookmarked
└── related_article_clicked

Subscription (if metered/paywalled)
├── paywall_hit
├── paywall_dismissed
├── subscribe_started
├── subscribe_completed
├── article_unlocked  (free, registered, paid)
```

### Content-specific properties

```
For article events:
  article_id
  article_title
  category
  author
  published_date
  word_count
  paywall_status  (free, registered_only, paid_only)
  is_premium
```

---

## Marketplace events

Marketplaces have two-sided tracking: buyers and sellers/providers.

```
Buyer side
├── search_performed
├── listing_viewed
├── inquiry_sent
├── booking_started
├── booking_completed
├── review_left
└── repeat_booking_made

Seller/provider side
├── listing_created
├── listing_published
├── listing_edited
├── inquiry_received
├── inquiry_responded
├── booking_received
├── booking_completed
├── payout_received
└── review_received
```

### Marketplace-specific properties

```
For listing_viewed:
  listing_id
  category
  price
  location
  seller_id
  position_in_search

For booking_completed:
  booking_id
  listing_id
  seller_id
  buyer_id
  total_value
  fee_amount
```

---

## Mobile app events

```
App lifecycle
├── app_installed  (server-side or attribution platform)
├── app_first_opened
├── app_opened  (every launch)
├── app_backgrounded
├── app_foregrounded
└── app_uninstalled  (often inferred, hard to track directly)

Engagement
├── push_notification_received
├── push_notification_opened
├── deep_link_opened
└── share_extension_used

Permissions
├── permission_requested  (push, location, camera, etc.)
├── permission_granted
└── permission_denied
```

### Mobile-specific properties

```
app_version
app_build
device_model
os_version
network_type  (wifi, cellular)
push_token
notification_permission_status
```

---

## Forms and surveys

```
Form lifecycle
├── form_viewed
├── form_started  (first field interaction)
├── form_field_focused
├── form_field_completed
├── form_field_validation_failed
├── form_submitted
└── form_abandoned  (left page without submit)
```

### Properties

```
form_name
form_id
fields_total
fields_completed
fields_with_errors
time_spent_seconds
```

---

## Naming convention rules

### Verb_noun, past tense, snake_case

✓ `user_signed_up`
✓ `product_added_to_cart`
✓ `article_50_percent_scrolled`
✗ `signupCompleted`
✗ `addProduct`
✗ `Article 50% Scrolled`

### Properties: camelCase or snake_case (pick one and stay)

snake_case is more common in SQL contexts (data warehouses).
camelCase is more common in JavaScript/TypeScript contexts.
The choice matters less than consistency.

✓ `user_id`, `signup_method`, `email_type` (consistent snake_case)
✓ `userId`, `signupMethod`, `emailType` (consistent camelCase)
✗ `userId`, `signup_method`, `EmailType` (mixed)

### Property values: standardize where possible

Don't allow free-text where an enum should exist.

✓ `signup_method: "email" | "google" | "github" | "sso"`
✗ `signup_method: "email", "Email", "EMAIL", "via email", "with email address"`

### Reserved properties

Most analytics tools have built-in properties. Don't override them.

Common reserved names:
- `id`, `userId` (or system equivalent)
- `event`, `event_name`
- `timestamp`, `time`
- `session_id`
- `anonymous_id`
- `properties`, `traits`

---

## What NOT to track

- **PII in event properties.** Email, phone, full name, address. Privacy issue and tooling issue.
- **Every click.** Track meaningful clicks. Hover events. Mouse movements. Generic interactions are noise.
- **Server-side state churn.** Background jobs, cron runs, internal events. These belong in monitoring, not product analytics.
- **Anything you cannot define in one sentence.** If you can't describe what the event represents, you won't be able to use it.

---

## Privacy and consent

Common compliance patterns:

- **Consent before tracking.** Cookie banner, opt-in flow.
- **Honor Do Not Track.** Browsers signal preferences.
- **Right to deletion.** User can request all their data deleted (GDPR, CCPA).
- **Right to export.** User can request their data in machine-readable format.
- **No cross-site tracking without consent.** Some jurisdictions require explicit opt-in.
- **Data residency.** EU user data may need to stay in EU.

Standard compliance approaches:

- Server-side tagging when available (more reliable, more controllable)
- Consent management platform (CMP) for cookie consent
- Clear privacy policy that lists what you collect
- A pseudonymous user ID separate from PII

Compliance specifics vary by jurisdiction. Consult counsel for high-stakes decisions.

---

## Governance and review

Patterns that work:

- New events require an RFC or short proposal
- Event catalog reviewed quarterly
- Deprecated events flagged and removed after a grace period
- Tracking plan version-controlled (in Git)
- Implementation tested in staging before production
- Monitoring on event volume (sudden drops = tracking break)

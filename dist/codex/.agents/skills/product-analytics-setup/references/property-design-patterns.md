# Property design patterns

Event-level vs user-level properties, with type discipline and a worked example.

The principle. Event-level properties describe a specific event. User-level properties describe a user across all events. Mixing them up creates payload bloat, schema drift, and reporting confusion.

---

## Event-level vs user-level

**Event-level properties** belong on the event payload. They describe the specific event, snapshot at the moment it fires.

- `cart_value` on `checkout_completed`
- `item_count` on `checkout_completed`
- `payment_method` on `checkout_completed`
- `discount_code` on `checkout_completed`
- `referrer_source` on `user_signed_up`

**User-level properties** belong on the user profile. They describe the user over time. Set them once; the analytics tool joins them onto every event the user fires.

- `subscription_tier`
- `acquisition_channel`
- `lifetime_value`
- `account_role`
- `is_admin`
- `last_active_at`

The trap. Putting user-level properties on every event payload. Three problems.

1. **Payload bloat.** Every event carries the same `subscription_tier` value. Multiplied across millions of events, the storage and bandwidth cost is real.
2. **Schema drift when the value changes.** A user upgrades mid-session. Some events have `subscription_tier: free`; later events have `subscription_tier: pro`. Reporting becomes ambiguous about which value to use.
3. **Reporting confusion.** Analyst writes "WHERE subscription_tier = 'pro'" thinking they are filtering users. The query actually filters events, returning a different cohort.

The fix. Set user-level properties on the user profile via the platform's identify/track-user API. Let the analytics tool perform the join.

---

## Type discipline

Property types matter. The analytics tool will accept any value, but the reporting breaks when types are inconsistent.

**Strings** for enumerable values.

- `status`, `tier`, `channel`, `region`, `category`
- Bounded sets. Document the allowed values in the schema.
- Wrong: storing numbers as strings. `quantity: "5"` breaks every numeric aggregation.

**Numbers** for actual numbers.

- `count`, `value`, `duration_s`, `score`
- Cents (or smallest unit) for money. Never floats. `price_cents: 1999`, not `price: 19.99`.
- Wrong: `trial_day: "day 7"`. Use `trial_day: 7`.

**Booleans** for actual booleans.

- `is_admin`, `has_trial`, `is_new_user`
- Two values: `true` and `false`. Nothing else. Not "yes"/"no", not 1/0, not strings.
- Prefix discipline: `is_`, `has_`, `can_`. Reading the property name should suggest a yes/no question.

**Timestamps** in ISO 8601, always.

- `created_at`, `last_active_at`, `event_timestamp`
- Format: `2026-05-05T14:30:00Z` (UTC, with the Z suffix).
- Wrong: Unix timestamps as strings, locale-specific formats, or any other variant. ISO 8601 across the entire schema.
- Suffix discipline: `_at` for timestamps, `_s` or `_ms` for durations.

**Arrays** rarely.

- An array property usually means you should split into multiple events with one item per event.
- Example: instead of `cart.items: [item_a, item_b, item_c]` on `checkout_completed`, fire one `item_purchased` event per item plus one `checkout_completed` event with the item count.
- Exception: small bounded arrays where the use case is clear (e.g., `tag_list: ["urgent", "billing"]`).

---

## Worked example: product_viewed event

A `product_viewed` event fires when a user views a product detail page in an e-commerce app.

### Wrong design

```json
{
  "event": "Product Viewed",
  "user_id": "u_12345",
  "product": "Premium Hoodie",
  "price": "$49.99",
  "category": "Apparel",
  "user_subscription_tier": "Premium",
  "user_lifetime_purchases": 8,
  "user_acquisition_source": "Meta",
  "is_premium_user": "true",
  "viewed_at": "5/5/2026 2:30 PM",
  "tags": "summer, hoodie, sale"
}
```

Problems.

- Event name uses spaces and mixed case. `Product Viewed` should be `product_viewed`.
- `price` is a money string with currency symbol. Should be `price_cents: 4999`.
- User-level properties on the event: `user_subscription_tier`, `user_lifetime_purchases`, `user_acquisition_source`, `is_premium_user`. These belong on the user profile.
- `is_premium_user` is a string `"true"`, not a boolean.
- `viewed_at` is a locale-specific date format. Should be ISO 8601: `2026-05-05T14:30:00Z`.
- `tags` is a comma-delimited string. Should be an array of strings, or split into separate events.
- `product` is the human-readable name; lacks the stable identifier. Should include `product_id`.

### Right design

User profile (set via `identify`):

```json
{
  "user_id": "u_12345",
  "subscription_tier": "premium",
  "lifetime_purchase_count": 8,
  "acquisition_channel": "meta",
  "is_premium": true,
  "last_active_at": "2026-05-05T14:30:00Z"
}
```

Event payload (`product_viewed`):

```json
{
  "event": "product_viewed",
  "user_id": "u_12345",
  "product_id": "p_premium_hoodie_v2",
  "product_name": "Premium Hoodie",
  "price_cents": 4999,
  "currency": "USD",
  "category": "apparel",
  "tag_list": ["summer", "hoodie", "sale"],
  "viewed_at": "2026-05-05T14:30:00Z"
}
```

Differences.

- Event name is `snake_case`.
- Money in cents with currency named.
- User-level properties live on the user profile, not the event. The analytics tool joins them.
- Boolean is an actual boolean.
- Timestamp is ISO 8601 UTC.
- Tags are a bounded array (acceptable here because the use case is faceted filtering).
- Stable identifier (`product_id`) included alongside the human-readable name.

---

## When to put a property on every event

A small set of properties should appear on every event regardless of category.

- `app_version` and `platform` (web, ios, android, desktop)
- `device_type` and `device_id`
- `session_id`
- `experiment_assignments` if the user is in active experiments

These are technically event-level (they describe the context of the event) but they are required across every event for path analysis and segmentation.

---

## Common property design mistakes

- **Property names that are also event names.** `signup` as a property and `signup` as an event creates queries that depend on context. Disambiguate.
- **Free-text properties for things that should be enums.** "Where did you hear about us?" with free-text answers produces 47 unique values that map to 5 actual channels. Force the enum at collection time.
- **Storing PII in properties.** Email addresses, full names, phone numbers should not be in event properties. Use a hashed identifier and look up PII separately.
- **Reusing property names across events with different meanings.** `source` on `user_signed_up` means acquisition source. `source` on `email_opened` means email campaign source. Same name, different meaning, breaks queries.

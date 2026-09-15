# Schema versioning patterns

Schema changes are inevitable. The discipline is distinguishing safe changes from breaking ones, then versioning the breaking ones.

---

## Additive vs breaking changes

**Additive changes** are safe. They preserve existing dashboards and queries.

- New event. `feature_y_used` ships alongside existing events. Old dashboards continue to work.
- New property on an existing event. `checkout_completed` gains a `discount_code` property. Old dashboards ignore it; new dashboards can use it.
- New value in an enum. The `acquisition_channel` enum gains `"tiktok"`. Old dashboards may filter incorrectly if they hard-code values; usually low-risk.

**Breaking changes** require migration.

- Renamed event. `signup_complete` becomes `user_signed_up`. Every dashboard, query, and saved cohort referencing the old name breaks.
- Removed property. `cart_value_cents` is removed because it was redundant with `total_value_cents`. Queries referencing the removed property fail.
- Changed property type. `price` was a string; now it is a number. Existing queries cast or compare differently.
- Narrowed enum. `acquisition_channel` previously had `"organic"` and `"paid"`; the new schema removes `"organic"` and replaces it with `"organic_search"` and `"organic_social"`. Old queries break.
- Changed semantics. The same event name now fires under different conditions. The dashboard reading "weekly active users" silently gets a different number.

The rule. If old code or old queries continue to work after the change, it is additive. Otherwise, it is breaking.

---

## The `_v2` suffix pattern

Versioning in the event name makes the change visible at every layer.

```
checkout_completed   <- v1, fires alongside v2 during transition
checkout_completed_v2 <- new semantics, new schema
```

The transition.

1. **Phase 1: ship v2 alongside v1.** Both events fire. Dashboards continue to read v1. New queries can use v2.
2. **Phase 2: migrate dashboards.** Update every saved query, dashboard tile, and downstream consumer to read v2. Document each migration.
3. **Phase 3: deprecate v1.** Stop firing v1. Mark it deprecated in the schema. Remove from event tracking instrumentation.
4. **Phase 4: cleanup.** Six months after deprecation, remove v1 from any historical reference documentation. Existing v1 data in the warehouse stays for historical analysis but is not used in current dashboards.

Typical transition window. 90 days from v2 ship to v1 deprecation. Longer if the team is small or the dashboard inventory is large.

---

## The data contract idea

The canonical schema lives in code, not in the analytics tool.

### TypeScript interface

```typescript
// schema/events.ts

export interface CheckoutCompletedEvent {
  event: "checkout_completed";
  user_id: string;
  account_id: string;
  cart_value_cents: number;
  currency: string;
  item_count: number;
  payment_method: "card" | "paypal" | "apple_pay" | "google_pay";
  discount_code?: string;
  event_timestamp: string;  // ISO 8601 UTC
}

export interface UserSignedUpEvent {
  event: "user_signed_up";
  user_id: string;
  account_id: string;
  signup_source: "homepage" | "pricing_page" | "blog" | "invite" | "other";
  referrer_source: string | null;
  event_timestamp: string;
}

export type AnalyticsEvent =
  | CheckoutCompletedEvent
  | UserSignedUpEvent;
  // ... etc.
```

The interface is the contract. TypeScript catches type mismatches at compile time. The CI pipeline runs the type check.

### JSON Schema

For non-TypeScript projects, JSON Schema serves the same role.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "checkout_completed",
  "type": "object",
  "required": ["event", "user_id", "account_id", "cart_value_cents", "currency", "item_count", "payment_method", "event_timestamp"],
  "properties": {
    "event": { "const": "checkout_completed" },
    "user_id": { "type": "string" },
    "account_id": { "type": "string" },
    "cart_value_cents": { "type": "integer", "minimum": 0 },
    "currency": { "type": "string", "pattern": "^[A-Z]{3}$" },
    "item_count": { "type": "integer", "minimum": 1 },
    "payment_method": { "enum": ["card", "paypal", "apple_pay", "google_pay"] },
    "discount_code": { "type": "string" },
    "event_timestamp": { "type": "string", "format": "date-time" }
  }
}
```

A CI step validates events against the schema before they ship.

---

## CI lint patterns

Three lint rules catch most schema drift.

1. **Type validation.** Every event payload validates against its declared type. Failed validations fail the build.
2. **Naming convention check.** Event names match snake_case. Property names match snake_case. Boolean properties have `is_`, `has_`, or `can_` prefix.
3. **Forbidden-event check.** Removed or deprecated events do not appear in the codebase. The deploy that adds a deprecated event back fails.

Implementation. A pre-commit hook plus a GitHub Actions workflow plus a runtime sampling check (random 1% of events validated against the schema in production; failures alert).

---

## Migration patterns for breaking changes

Three common migration patterns.

### Pattern 1: rename

The event name changes. The semantics are the same.

1. Ship v2 with the new name; old name continues to fire.
2. Migrate dashboards, queries, saved cohorts.
3. Deprecate v1.

### Pattern 2: split

One event splits into two or more events with narrower meanings.

1. Ship the new events; the old event continues to fire alongside.
2. Update tracking code to fire the appropriate new event instead of the old one.
3. Migrate dashboards.
4. Deprecate the old event.

Example. `subscription_changed` splits into `subscription_upgraded` and `subscription_downgraded`. Both new events provide more analytical power than the old single event.

### Pattern 3: merge

Two events merge into one event with a discriminating property.

1. Ship the new event with the discriminating property.
2. Update tracking code to fire the new event with the appropriate property value.
3. Migrate dashboards (often: queries that filtered on event name now filter on property value).
4. Deprecate the old events.

Example. `signup_via_facebook` and `signup_via_google` merge into `user_signed_up` with `auth_method: "facebook" | "google"`.

---

## Common schema versioning mistakes

- **Renaming events without versioning.** The dashboards break overnight; the team blames the analytics tool.
- **Skipping the transition period.** v2 ships and v1 stops firing the same day. Historical analysis of v1 data is fine, but in-flight queries break.
- **Versioning everything pre-emptively.** `event_v3_v2` is overkill. Version when semantics change, not at every iteration.
- **Letting the analytics tool be the schema source of truth.** The tool's "events you have ever fired" list is a graveyard, not a contract. Maintain the schema in code; export to the tool.
- **No CI enforcement.** The discipline becomes an etiquette that decays as the team grows. Enforcement is the only thing that scales.

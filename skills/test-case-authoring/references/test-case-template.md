# Test Case Template

A test case is specific enough that two people running it get the same result, and so is a coding agent. If a field is truly empty, write "none" so the reader knows it was considered.

---

## Template

```
ID: [TC-01]
TITLE: [what is being checked, in a few words]
TRACES TO: [AC-1, or RISK: name of the risk]
CLASS: [happy path / boundary and edge / negative and error / regression / accessibility smoke / performance smoke]

PRECONDITION
- Account and role: [e.g., manager on the fixture account "Test Store"]
- Data state: [e.g., cart with 3 items, no promo applied]
- Flags: [flag name and state, or none]

TEST DATA
- [field]: [exact value]
- [field]: [exact value]

STEPS
1. [One action]
2. [One action]
3. [One action]

EXPECTED RESULT
[Observable outcome: a value, a message (quoted), a state, a status code, an event with properties.]

ENVIRONMENT: [local / staging / production-like; browser or device if relevant]
LEVEL: [unit / integration / end-to-end / manual]
AUTOMATION STATUS: [automated (test name) / to automate / manual by design: reason]

EVIDENCE TO ATTACH
[Runner summary line / screenshot of X / log line containing Y / recorded run]
```

---

## Writing the title

| Weak | Strong |
|---|---|
| Test login | Login rejects an expired reset link with a named error |
| Check cart | Cart total updates when a promo code is removed |
| Edge case | Search returns results for a query of exactly 1 character |

---

## Writing test data

Name the value. If the value matters for the result, it belongs in the case.

| Weak | Strong |
|---|---|
| A valid email | `jordan@example.test` |
| A long name | A 120-character name: `Aaaa...` (120 characters) |
| A past date | `2025-02-28` |
| Some items | 3 items: SKU-101 x1, SKU-204 x2 |

Use test domains and fixture accounts. Never use real customer data.

---

## Writing the expected result

The expected result is the pass/fail line. It has to be observable from outside the code, or from a test assertion.

| Not observable | Observable |
|---|---|
| Works correctly | The total shows `$42.00` |
| Error is handled | An inline message reads "That link has expired. Request a new one." |
| Data is saved | A `GET /orders/123` returns `status: paid` |
| Event fires | `checkout_completed` fires once with `order_id` and `total` |
| Fast enough | First result renders within 1 second with 10,000 records loaded |

---

## Choosing the level

Lowest level that observes the expected result.

| The result is... | Level |
|---|---|
| A return value or state inside one module | Unit |
| Data passing between two parts (API and database, service and queue) | Integration |
| Only visible through the full user path | End-to-end |
| A judgment call (layout, tone, screen reader experience) | Manual, with the reason |

---

## Writing the evidence line

Name the artifact and what it must show.

- "Runner summary showing `cart_total_after_promo_removed` passed"
- "Screenshot of the error banner with the message text readable"
- "Log line containing `webhook processed status=200` for the test order"
- "Recording of keyboard-only navigation through the form"

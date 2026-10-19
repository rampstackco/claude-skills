# Bug Template

A bug ticket does two jobs. It proves the defect exists, and it defines the test that proves the defect is gone. If either half is missing, the ticket is not ready.

Copy the template, replace every bracketed field, and write "none" where a field is truly empty.

---

## Template

```
TITLE: [area] [symptom] when [trigger]

TYPE: Bug
OWNER: [one name, or unassigned]
PARENT: [story or epic link, or none]
LABELS: [component, platform, customer-reported, etc.]
CAPITALIZATION STAGE: [post-implementation, by default for a shipped feature; override with a note]

ENVIRONMENT
- Build or version: [e.g., web 4.12.0, iOS 4.12.1 (build 812)]
- Browser or device: [e.g., Safari 17 on macOS, mid-tier Android phone]
- Account type: [e.g., free trial, admin, multi-workspace]
- Data state: [e.g., cart with 3 items, one promo code applied]

REPRO STEPS
1. [One action]
2. [One action]
3. [One action]
4. [Observe the result]

Reproduces: [every time / N of M attempts / once]

OBSERVED
[What happens. Quote error text exactly. Attach a screenshot or recording.]

EXPECTED
[What should happen. Cite the spec, the acceptance criterion, or the prior behavior.]

CURRENT TEST RESULT
[Name of the failing test and its output, or "no test covers this path."]

SEVERITY: [S1 critical / S2 major / S3 minor / S4 cosmetic]
PRIORITY: [P0 now / P1 this sprint / P2 this quarter / P3 backlog]
Reason for priority: [one line]

REGRESSION RISK
[What else uses this code path. What a fix could break.]

QA NOTES
- [Edge case to check beyond the repro]
- [Edge case to check beyond the repro]

FIX VERIFICATION METHOD
[The specific test that proves the fix. A named automated test to add or update, or numbered manual steps.]

EXPECTED TEST RESULT AFTER FIX
[What passing looks like, in observable terms.]

ATTACHMENTS
- [Screenshot or recording of the observed behavior]
- [Console or server log excerpt]
```

---

## Severity scale

| Level | Meaning | Example |
|---|---|---|
| S1 critical | Data loss, security exposure, or a core flow fully blocked for many users | Payments fail for every card type |
| S2 major | Core flow degraded, or blocked for a segment, with no workaround | Export fails for workspaces over 1,000 rows |
| S3 minor | Non-core flow broken, or a workaround exists | Sorting by date ignores time zone |
| S4 cosmetic | Visual or copy defect, no functional impact | Button label truncated on narrow screens |

## Priority scale

| Level | Meaning |
|---|---|
| P0 | Drop current work. Fix now. |
| P1 | Fix in the current sprint. |
| P2 | Fix this quarter. Schedule it. |
| P3 | Backlog. Revisit in refinement. |

Set severity from the defect. Set priority from severity plus reach, revenue, timing, and cost of delay. They often match. When they do not, the gap is the useful information.

---

## Writing the title

The pattern `[area] [symptom] when [trigger]` makes bugs searchable and deduplicable.

| Weak | Strong |
|---|---|
| Checkout broken | Checkout: total shows $0.00 when a promo code is removed |
| Login issue | Login: "session expired" loop when signing in from an email link on iOS |
| Report wrong | Reports: weekly totals double-count when a shift spans midnight |

---

## Writing repro steps

- Start from a known state: logged out, fresh account, or a named fixture.
- One action per step.
- Include the data you typed. "Enter a promo code" is weaker than "Enter SPRING10."
- End with the observation step.
- If it reproduces only sometimes, say how often and what you varied.

If you cannot write repro steps, the ticket is a spike: "Find the repro for [symptom]," timeboxed.

---

## Writing the fix verification

The verification is the contract between the reporter, the fixer, and QA. It must be specific enough that two people would agree on pass or fail.

- Weak: "Confirm it works."
- Strong: "Add a test that removes a promo code from a 3-item cart and asserts the total equals the sum of line items. Test fails on the current build and passes after the fix."

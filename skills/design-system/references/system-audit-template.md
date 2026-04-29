# Design System Audit Template

A template for auditing an existing design system. Use this to take stock of what exists, what is missing, what is duplicated, and what is silently broken.

The output is an honest report, not a grade. The goal is a backlog the team can act on.

---

## When to use this template

- Before a major redesign or rebrand (knowing the starting state shapes the plan).
- When the system feels heavy or inconsistent and no one can articulate why.
- When a new owner takes over and needs ground truth.
- Quarterly, as a regular health check.

---

## Audit scope

Decide upfront what is in and out of scope. A full audit covers all four layers (tokens, primitives, patterns, templates) plus governance and adoption. A focused audit covers one or two.

| Layer / area | In scope | Out of scope |
|---|---|---|
| Tokens | | |
| Primitives | | |
| Patterns | | |
| Templates | | |
| Documentation | | |
| Governance | | |
| Adoption | | |

---

## Layer 1: Tokens

### Inventory

List every token category in the system. For each, count, source of truth, and platforms supported.

| Category | Count | Source of truth | Platforms supported |
|---|---|---|---|
| Color | | | |
| Typography (font, size, weight, line-height) | | | |
| Spacing | | | |
| Radius | | | |
| Shadow | | | |
| Motion (duration, easing) | | | |
| Z-index | | | |
| Breakpoints | | | |
| Other | | | |

### Findings

- [ ] Are tokens named by role (`color-text-primary`) or by value (`gray-900`)? Role-based scales better.
- [ ] Is there a single source of truth (one file, one tool) or multiple sources that drift?
- [ ] Are tokens versioned? How are breaking token changes communicated?
- [ ] Are there duplicate tokens (`color-blue-primary` and `color-action`)? List them.
- [ ] Are there orphan tokens (defined but unused)? List them.
- [ ] Are dark mode / theme variants modeled at the token layer or elsewhere?

### Token risks

- **Hardcoded values in code:** grep the codebase for raw hex, raw px values, raw font sizes. Note where tokens were skipped.
- **Token sprawl:** more than 20 named colors, more than 8 spacing values, or more than 6 font sizes is usually a smell.
- **Naming inconsistency:** `color-text` vs `text-color` vs `textColor` across categories.

---

## Layer 2: Primitives

### Inventory

List every primitive component the system ships. For each, status and consumer count.

| Primitive | Status (Production / Beta / Deprecated) | Consumers (rough count) | Notes |
|---|---|---|---|
| Button | | | |
| Input | | | |
| Checkbox | | | |
| Radio | | | |
| Select | | | |
| Textarea | | | |
| Badge | | | |
| Avatar | | | |
| Icon | | | |
| Link | | | |
| (etc.) | | | |

### Findings

- [ ] Are primitives accessible (keyboard, screen reader, focus management)? List failures.
- [ ] Are all primitives token-driven, or do some hardcode values?
- [ ] Are there duplicate primitives that do almost the same thing (`Button` and `IconButton` and `LinkButton`)? Could they consolidate?
- [ ] Are primitives documented (props, states, variants, accessibility)?
- [ ] Are there one-off primitives in product code that should be promoted to the system?

---

## Layer 3: Patterns

Patterns are composed components solving a specific UI problem.

### Inventory

| Pattern | Status | Used by (rough page or feature count) | Notes |
|---|---|---|---|
| Form layout | | | |
| Modal dialog | | | |
| Toast / notification | | | |
| Navigation (top, side) | | | |
| Empty state | | | |
| Pagination | | | |
| Data table | | | |
| Card | | | |
| (etc.) | | | |

### Findings

- [ ] Are patterns built from primitives, or do they reach around the primitives layer?
- [ ] Do multiple patterns solve the same problem with different APIs?
- [ ] Are patterns flexible enough for real product needs, or are teams forking them?

---

## Layer 4: Templates

Templates are full screens or flows. Optional layer.

### Inventory

| Template | Status | Used by | Notes |
|---|---|---|---|
| Marketing landing | | | |
| App shell | | | |
| Settings page | | | |
| Onboarding flow | | | |
| Empty product state | | | |
| (etc.) | | | |

### Findings

- [ ] Do templates exist at all? Many systems skip this layer.
- [ ] Are templates a starting scaffold or a rigid spec?
- [ ] Are template layouts responsive, or do teams reimplement responsive behavior each time?

---

## Documentation

### Inventory

- **Documentation site:** [URL or "none"]
- **Last meaningful update:** [Date]
- **Component coverage:** [What % of shipped components are documented?]
- **Code examples for every component:** [Yes / partial / no]
- **Accessibility notes for every interactive component:** [Yes / partial / no]
- **Migration / changelog:** [Yes / no]

### Findings

- [ ] Is the documentation in sync with the shipped code, or has it drifted?
- [ ] Can a new engineer onboard from the docs alone, or do they need tribal knowledge?
- [ ] Is there a "do / do not" pattern with examples for each component?
- [ ] Are deprecated components clearly marked, with a migration path?

---

## Governance

- **Ownership model:** [Dedicated team / federated / single owner / unowned]
- **Contribution process:** [Documented / informal / nonexistent]
- **Review cadence:** [How often do owners look at incoming requests, bugs, drift?]
- **Decision log:** [Where are major design system decisions recorded? Or are they not?]
- **Communication channel:** [Slack channel / mailing list / standing meeting / none]

### Findings

- [ ] Who decides when a new component enters the system?
- [ ] Who decides when a component is deprecated?
- [ ] Who handles requests from product teams? What is the SLA?
- [ ] What happens when a product team needs something the system does not provide?

---

## Adoption

### Measurement

| Measure | Today | Target |
|---|---|---|
| % of UI built with system components | | |
| % of new features using system | | |
| Number of one-off components in product code | | |
| Number of token overrides in product code | | |
| Number of open issues against the system | | |

### Findings

- [ ] Where is adoption strongest? Why?
- [ ] Where is adoption weakest? Why? (Often: missing components, too rigid, undocumented, or onboarding gap.)
- [ ] Are there teams actively forking or working around the system?

---

## Risk register

List the top 5 risks the audit surfaced. For each: severity (high / medium / low), affected area, and a one-line recommendation.

| # | Risk | Severity | Affected area | Recommendation |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

---

## Backlog

Translate findings into a prioritized backlog. Keep items concrete and assignable.

### Critical (block adoption or accessibility)

- [ ] [Item, owner, target date]
- [ ] [Item, owner, target date]

### High (consistent friction or duplication)

- [ ] [Item, owner, target date]
- [ ] [Item, owner, target date]

### Medium (improvement, not blocking)

- [ ] [Item, owner, target date]
- [ ] [Item, owner, target date]

### Low (polish)

- [ ] [Item, owner, target date]

---

## Audit summary

Three sentences. What is the overall state, what is the single most important thing to fix, and what should the team start now.

> [State summary]
> [Most important fix]
> [Start now]

---

## Sign-off

Audit conducted by: [Name(s), date]
Reviewed with: [Stakeholders]
Next audit scheduled: [Date]

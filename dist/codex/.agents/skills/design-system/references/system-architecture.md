# System Architecture

How the four layers of a design system relate, and how to decide where new things belong.

---

## The four layers, top to bottom

```
┌──────────────────────────────────────────────────────────────┐
│ TEMPLATES (full screens, complete flows)                     │
│ Optional layer. Use when the same screen pattern recurs.     │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ PATTERNS (composed components solving a UI problem)          │
│ Examples: form layouts, modal dialogs, navigation, tables    │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ PRIMITIVES (smallest reusable elements)                      │
│ Examples: button, input, checkbox, badge, icon, link         │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ TOKENS (atomic named values)                                 │
│ Examples: color-text-primary, space-md, radius-card          │
└──────────────────────────────────────────────────────────────┘
```

Higher layers consume lower layers. A primitive uses tokens. A pattern composes primitives (and tokens). A template assembles patterns.

A token never references a primitive. A primitive never references a pattern. The dependency direction is one-way.

---

## When to add at each layer

### Add a token when:
- A value appears in 3+ places
- The value has a clear semantic purpose
- Changing the value should propagate everywhere it appears

**Example:** "Card border radius" - if 12 components use 12px corner radius, that's a token.

**Counter-example:** A one-off radius for a single decorative element. Hard-code it.

### Add a primitive when:
- The same combination of HTML/JSX/View elements recurs in 3+ places
- The element has an internal state machine (open/closed, default/hover/disabled)
- Centralized accessibility logic helps consumers

**Example:** Button. Recurs everywhere. Has states. Accessibility (focus, keyboard, ARIA) is non-trivial.

**Counter-example:** A specific marketing hero block that only appears on the homepage. Not a primitive. Build it inline.

### Add a pattern when:
- Multiple teams keep building the same composition
- The composition involves non-obvious decisions (z-index, focus management, scroll behavior, animation)
- A central pattern reduces accessibility risk

**Example:** Modal dialog. Hard to get right (focus trap, escape, scroll lock). Pattern centralizes the hard parts.

**Counter-example:** A specific dashboard layout used only on the analytics page. Not a pattern. Build it inline as a screen.

### Add a template when:
- A full screen recurs across products or sections
- New product features want a starting point that already follows system rules

**Example:** Settings page layout (left nav, content area, save bar). If the team builds 5 settings sections, the template saves time.

**Counter-example:** A unique landing page. Not a template.

---

## Decision tree: where does this belong?

```
Is it a value? ────── Yes ────── Token
                  │
                  └── No
                  
Is it a single element? ── Yes ── Primitive
                       │
                       └── No
                       
Is it composed of primitives? ─ Yes ─ Pattern
                            │
                            └── No
                            
Is it a full screen? ──────── Yes ── Template
```

---

## Token tiering

Most systems benefit from at least two tiers. Three is the maximum without diminishing returns.

### Tier 1: Primitives

Raw values, no semantic meaning attached.

```
color-blue-50   = #EFF6FF
color-blue-100  = #DBEAFE
color-blue-500  = #3B82F6
color-blue-900  = #1E3A8A

space-1  = 4px
space-2  = 8px
space-4  = 16px
space-8  = 32px

radius-sm  = 4px
radius-md  = 8px
radius-lg  = 12px
```

### Tier 2: Semantic

Purpose-named, mapped to primitives.

```
color-text-primary    = color-gray-900
color-text-secondary  = color-gray-600
color-text-link       = color-blue-700
color-bg-surface      = color-white
color-bg-elevated     = color-white
color-border-default  = color-gray-200

space-stack-tight  = space-2
space-stack-default = space-4
space-stack-loose  = space-6
```

### Tier 3 (optional): Component-specific

Component-tied, mapped to semantic tokens.

```
button-padding-x         = space-stack-default
button-padding-y         = space-stack-tight
button-radius            = radius-md
button-bg-primary        = color-bg-action-primary
```

**Rule of thumb:** Stop at Tier 2 unless the system is large enough to justify Tier 3 maintenance. Tier 3 adds clarity but multiplies token count.

---

## Naming conventions

Pick one and stay. The most common patterns:

### Pattern A: Hierarchical with hyphens
```
color-text-primary
color-text-secondary
color-bg-surface
space-stack-md
```

### Pattern B: Object/dot notation (often in JSON or JS)
```
color.text.primary
color.bg.surface
space.stack.md
```

### Pattern C: Flat with prefix
```
text-color-primary
bg-color-surface
stack-space-md
```

Hierarchical-with-hyphens (Pattern A) is the most common for CSS variable contexts. Pick once, document, never deviate.

---

## Naming for the semantic layer

Names should describe purpose, not appearance. "Color is what it is, name is what it does."

**Good:**
- `color-text-primary` (what role does it play?)
- `color-bg-action-destructive` (what action is this for?)
- `space-stack-section` (where does it apply?)

**Bad:**
- `color-blue-medium` (semantic name should not encode the value; that's the primitive layer's job)
- `color-pretty-blue` (subjective, not purpose)
- `color-button-text` (OK at component layer; too specific for semantic layer)

---

## Versioning

Use semantic versioning: `major.minor.patch`.

- **Patch:** Bug fixes, no API changes. Bump for any defect fix.
- **Minor:** Additive changes. New tokens, new components, non-breaking API additions.
- **Major:** Breaking changes. Removed tokens, renamed APIs, behavioral changes consumers must adapt to.

For breaking changes, provide:

1. Deprecation warning in the previous minor version
2. Migration guide
3. Codemod or scripted migration path where possible
4. A timeline for sunset (typically 1 to 2 quarters)

---

## Anti-patterns

### Color sprawl
- 200 named colors instead of a tight palette of 30 to 50.
- Symptom: every designer adds the color they need.
- Fix: enforce primitive layer review before new colors land.

### Spacing chaos
- 17 different spacing values, half of them within 2px of each other.
- Symptom: each design uses unconstrained spacing.
- Fix: a defined scale. New spacing values require a real reason.

### Naming inconsistency
- `colorPrimary`, `color-primary`, `primary-color`, `primaryColor` all in the same system.
- Symptom: tokens added by different people without convention.
- Fix: pick one convention, document, automate validation.

### Tokens without consumers
- 200 tokens defined, 50 actually used.
- Symptom: aspirational tokens added "for the future."
- Fix: only add tokens with current or near-future consumers.

### Components without docs
- 30 components in the library, 5 have docs.
- Symptom: docs treated as separate work, deprioritized.
- Fix: docs blocking the merge of new components.

### Patterns over-built
- A "DataTable" pattern with 47 props supporting every imaginable variation.
- Symptom: Trying to anticipate every use.
- Fix: ship narrow first. Expand based on real demand. Hard to remove options once shipped; easy to add.

---

## Dependency directions

A healthy system has these dependency rules:

- Tokens depend on nothing.
- Primitives depend on tokens.
- Patterns depend on primitives and tokens.
- Templates depend on patterns, primitives, and tokens.
- Application code depends on any layer.

Violations to flag:

- A token referencing another token at a different tier (sometimes OK, often a smell).
- A primitive referencing a pattern. Wrong direction.
- A pattern not using primitives, building from raw HTML. Bypasses the system.
- Application code defining its own colors instead of using tokens. Bypasses the system.

---

## How to introduce a system to an existing codebase

If the codebase has no system today:

1. **Audit.** Inventory existing UI. Find duplicates and inconsistencies.
2. **Tokens first.** Establish the token foundation. Migrate hard-coded values gradually.
3. **Primitives second.** Replace ad-hoc components with system primitives. Highest-impact ones first (button, input, modal).
4. **Patterns third.** Once primitives are established, codify patterns.
5. **Migrate over multiple quarters.** Rip-and-replace fails. Coexistence with gradual migration succeeds.

Plan for the system to take 2 to 4 quarters to fully replace ad-hoc UI in a medium-sized product. Plan for it to never be "done" - it evolves with the product.

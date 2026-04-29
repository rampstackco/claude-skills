---
name: design-system
description: "Build or audit a design system including component library, design tokens, naming conventions, contribution model, and documentation. Use this skill whenever the user wants to build a design system, audit an existing system, define design tokens at the system level, structure a component library, or set up design system governance. Triggers on design system, component library, design tokens, atomic design, atoms, molecules, organisms, design system documentation, Storybook, Figma library, system governance, design contribution model. Also triggers when teams are inconsistent across products and a system is the answer."
---

# Design System

Build, evolve, or audit a design system. Stack-agnostic in principle. Implementation is stack-specific (Figma, Storybook, code library, etc.) but the structure and governance principles transfer.

This skill is for building the system. For applying a system to specific pages or components, use `design-standards`. For brand visual identity, use `brand-identity`.

---

## When to use

- Building a design system from scratch
- Auditing an existing system for gaps or fragmentation
- Defining design tokens at the system level
- Structuring a component library
- Establishing contribution and governance models
- Migrating from ad-hoc components to a documented system

## When NOT to use

- Designing a single page or component (use `design-standards`)
- Brand identity work (use `brand-identity`)
- Component-level frontend implementation (use `frontend-component-build`)
- Pure design documentation for marketing (use `brand-style-guide`)

---

## Required inputs

- The brand identity (tokens, voice, imagery direction)
- The product surfaces the system needs to support (web, mobile, marketing, app, internal tools)
- The team and its working tools (Figma, code framework, doc platform)
- Existing components, even if undocumented
- Constraints (accessibility requirements, performance targets, browser support)

If brand identity is undefined, run `brand-identity` first.

---

## The framework: 5 layers

A complete design system has five layers, stacked. Each layer feeds the layer above.

### 1. Foundations (tokens)

The atomic decisions. Color, type, spacing, radius, shadow, motion, breakpoints.

**Why this layer matters:**
- Tokens are the source of truth for everything above
- Token changes propagate everywhere automatically
- Without tokens, the system has no foundation

**Output:**
- A documented token set (see `design-standards/references/design-tokens-template.md`)
- Token implementation in code (CSS variables, JS objects, Style Dictionary, etc.)
- Token implementation in Figma (variables and styles)
- A primer doc explaining what tokens to use when

**Common patterns:**
- Two-tier tokens: base tokens (raw values) + semantic tokens (named uses). Example: `color-blue-600` (base) + `color-text-link` (semantic). Components reference semantic tokens. Theme changes update semantic tokens, not base.

### 2. Elements (atoms)

The smallest functional building blocks. Buttons, inputs, labels, badges, icons, links, dividers.

**Per element, document:**
- Visual variants (primary, secondary, ghost, etc.)
- Size variants (small, medium, large)
- States (default, hover, focus, active, disabled, error, loading)
- Anatomy (the parts that make up the element)
- Spacing and proportions
- Accessibility (keyboard support, screen reader behavior, ARIA)
- Code usage (props, examples)

**Output:**
- Element library in Figma
- Element components in code
- Per-element documentation

### 3. Components (molecules + organisms)

Combinations of elements that form recognizable UI patterns. Cards, alerts, modals, navigation, forms, data tables, headers, footers.

**Per component:**
- Composition (which elements it uses)
- Variants and configurations
- Use cases (when to reach for this vs. an alternative)
- Layout behavior (responsive, contained, full-bleed)
- Anti-patterns (when NOT to use it)

**Output:**
- Component library
- Per-component documentation with usage guidance

### 4. Patterns (templates)

Larger structures that combine components. Sign-in flow, settings page, dashboard layout, marketing page sections.

**Per pattern:**
- The structure and components used
- The user journey it supports
- Layout grid and spacing
- Responsive behavior
- Variants (e.g., "with sidebar," "fullscreen," "modal")

**Output:**
- Pattern library or page templates
- Documentation showing complete examples

### 5. Documentation and governance

How the system gets used, contributed to, and maintained.

**Documentation includes:**
- Getting started guide for new team members
- How to use vs. how to extend
- Contribution model
- Versioning policy
- Migration paths when breaking changes happen
- Decision log for major system choices

**Governance includes:**
- Who owns the system (a team or rotation)
- How new components get proposed and approved
- How conflicts get resolved
- How the system evolves vs. stays stable
- Cadence of review and updates

---

## Workflow

### For a new design system

1. **Inventory the existing UI.** Screenshot every component, button, form, modal across the product. The list of distinct UI patterns is your starting scope.
2. **Identify the duplicates.** Same component built 5 different ways across the product. These are your high-value consolidation targets.
3. **Define foundations.** Token set, with both base and semantic layers. Document each.
4. **Audit elements.** From the inventory, identify the actual elements (buttons, inputs, etc.) and reduce variants to a managed set.
5. **Build the element library.** Figma + code. Document each element.
6. **Identify priority components.** The 10 to 15 components that appear most often. Build those first.
7. **Document patterns.** Page-level templates that show the system in use.
8. **Establish governance.** Owner, contribution model, review cadence.
9. **Roll out.** Migrate existing surfaces to the system progressively.

### For an existing design system audit

1. **Inventory what exists.** What's documented, what's in Figma, what's in code, what's actually used in production.
2. **Map gaps.** Where the system is incomplete. Where teams build outside the system because the system can't serve their need.
3. **Map fragmentation.** Where the system has divergent implementations (Figma vs. code, web vs. mobile, multiple teams).
4. **Identify decay.** Components that have drifted from the documented standard.
5. **Prioritize fixes.** Foundation gaps first. High-use component drift second. Rarely-used component cleanup last.
6. **Plan rollout.** Major changes need migration paths.

---

## Failure patterns

- **Building the system before the brand is set.** Tokens depend on brand. Set brand first.
- **Atoms-up extreme.** Spending 6 months on tokens and elements before producing components anyone uses. Ship components people need; refine tokens iteratively.
- **One-person system.** A system without governance fails as soon as the original designer leaves. Establish ownership early.
- **Stale documentation.** A system with code that's diverged from the docs is worse than no system. Synchronize or kill the docs.
- **Versioning everything.** Treating every component as needing a major version. Most components evolve in place. Reserve versioning for breaking changes.
- **Adopting "atomic design" dogmatically.** Atoms / molecules / organisms is a useful mental model, not a rigid taxonomy. Don't argue about whether something is a molecule or an organism.
- **Building in a vacuum.** A system designed without input from the teams using it gets ignored. Co-design with consumers.
- **No deprecation path.** Old components linger in code forever because no one knows it's safe to remove them. Document deprecation explicitly.
- **Token explosion.** Defining 200 color tokens for a brand with 10 colors. Discipline. Most products need fewer tokens than they have.

---

## Output format

A design system has multiple deliverables. Typically:

- **Documentation site** (Notion, dedicated site, GitHub Pages, Storybook addon, etc.)
- **Figma library** (or equivalent design tool)
- **Code library** (npm package, monorepo workspace, copy-paste components)
- **Decision log** (system-level decisions and the reasoning)
- **Roadmap and changelog**

For a design system audit, output is a markdown report at `design-system-audit.md`:

1. Inventory of what exists (foundations, elements, components, patterns)
2. Gap analysis
3. Fragmentation analysis
4. Drift analysis
5. Prioritized remediation plan
6. Governance recommendations

---

## Reference files

- `references/system-architecture.md` - The four-layer model (tokens, primitives, patterns, templates) and how to decide where new work belongs.
- `references/system-audit-template.md` - Template for auditing an existing design system.
- `references/governance-playbook.md` - Contribution model, ownership, and decision process for an active system.

# Design System Governance Playbook

A design system without governance decays. This playbook covers the operating model: who owns it, how changes happen, and how the system stays alive.

---

## Ownership models

Three common models. Pick based on team size and maturity.

### Model 1: Dedicated team

A standing team owns the system full-time. 2 to 5 people typically: a lead designer, a lead engineer, and supporting roles.

**Strengths:**
- Highest velocity for system improvements
- Clear ownership, fast decisions
- Can take on big system-level initiatives

**Weaknesses:**
- Expensive
- Risk of disconnection from product teams
- Risk of building what the team finds interesting vs. what consumers need

**When to use:** Organizations with 10+ designers and 50+ engineers, where system inconsistency is a real cost.

### Model 2: Federated / contribution model

System is maintained by multiple teams contributing changes. A small core team (or one lead) reviews contributions and maintains the foundation.

**Strengths:**
- Distributed effort
- Component owners are the people closest to the use case
- Prevents the "system team builds for itself" problem

**Weaknesses:**
- Coordination overhead
- Inconsistent velocity
- Requires strong contribution norms or quality drifts

**When to use:** Mid-sized teams (5 to 15 designers, 20 to 100 engineers), where multiple teams need a shared system but no single team can dedicate full-time effort.

### Model 3: Single owner / part-time

One person owns the system as part of their broader role. Common in startups and small teams.

**Strengths:**
- No coordination cost
- Decisions happen instantly
- Cheap

**Weaknesses:**
- System decays when owner is busy
- Bus factor of one
- Hard to scale

**When to use:** Early-stage teams. Plan to migrate to Model 1 or 2 as the team grows.

---

## Contribution model

How new components, variants, or changes get added to the system.

### Stages

1. **Proposal.** A team that needs a new component or variant proposes it. Proposal includes: the use case, examples in the wild, why existing components don't suffice.

2. **Triage.** System owner(s) decide:
   - **Accept:** add to the system. Assign owner.
   - **Adapt existing:** existing component should grow to cover this use case.
   - **Defer:** valid request but not prioritized now.
   - **Reject:** doesn't fit the system. Solve in a one-off way.

3. **Design.** Component is designed in the system's style. Includes all states, variants, and accessibility requirements.

4. **Review.** System owner reviews against system standards. Iterate.

5. **Build.** Component is built in code (and Figma if not built there first).

6. **Document.** Usage doc, API doc, examples, anti-patterns.

7. **Release.** Versioned release. Changelog entry. Announcement to consumers.

### Proposal template

```markdown
# Component Proposal: [Name]

## Use case
[What we're building. The user problem this UI element solves.]

## Examples in the wild
[3 to 5 places where teams have built ad-hoc versions of this. Screenshots.]

## Why existing components don't fit
[Specific reasons existing components are insufficient.]

## Proposed component
[Sketch or description of the proposed component, variants, states.]

## Owner
[Who will design, build, and maintain this component.]

## Timeline
[When this is needed. Hard deadlines vs. nice-to-have.]
```

---

## Decision-making

### Type 1: Reversible decisions

Most component-level decisions. Made by the component owner with light input from the system team.

Examples: a new variant, a tweak to a state, an additional prop on an existing component.

Process: lightweight. Propose in the team channel, get one or two reactions, ship.

### Type 2: One-way doors

Decisions that affect the foundation or ripple across many components.

Examples: changing a base token, deprecating a component, changing the naming convention.

Process: written proposal, formal review, broader stakeholder input, documented decision in the decision log.

### Decision log

Every Type 2 decision gets logged:

```markdown
# DSDR-001: [Decision title]

**Date:** YYYY-MM-DD
**Status:** [Proposed / Approved / Rejected / Implemented]
**Author:** [Name]

## Context
[What situation led to this decision.]

## Options considered
1. [Option] - pros, cons
2. [Option] - pros, cons
3. [Option] - pros, cons

## Decision
[What was decided.]

## Reasoning
[Why this option won.]

## Consequences
[What changes as a result. What new constraints exist.]

## Revisit when
[Trigger condition that would warrant reopening this decision.]
```

This log becomes the institutional memory. Future system owners can understand why things are the way they are.

---

## Versioning

### Semantic versioning

For systems shipped as code packages, semver works well:

- **Major (1.0.0 → 2.0.0):** breaking changes. API changes. Visual changes that consumers must adapt to.
- **Minor (1.0.0 → 1.1.0):** new components or variants. Backward-compatible.
- **Patch (1.0.0 → 1.0.1):** bug fixes. Backward-compatible.

### Release cadence

Three patterns:

- **Continuous:** ship as ready. Best for teams that can absorb frequent updates.
- **Periodic:** weekly or biweekly batched releases. Best for systems with many consumers.
- **Major releases:** quarterly major versions, with weekly patches between. Best for systems with breaking changes that need migration time.

### Communication

For each release:
- Changelog entry (what changed, why)
- Migration guide for breaking changes
- Internal announcement (Slack, email, internal newsletter)
- Demo or office hours for major changes

---

## Deprecation

Components get retired. Manage retirement explicitly.

### Deprecation stages

1. **Warning.** Component is marked deprecated. Documentation gains a deprecation notice. Build emits a console warning.

2. **Migration period.** Defined window (typically 1 to 2 quarters) for consumers to migrate. Migration guide published.

3. **Removal.** Component removed. Code deleted. Documentation archived (not deleted, for historical reference).

### Deprecation notice template

```markdown
> ⚠️ Deprecated: [Component] is deprecated as of [version].
> Replacement: [link to replacement component]
> Removal: scheduled for [version / date]
> Migration guide: [link]
```

---

## Quality bar

Every component or change must meet the bar before merging.

### Functional
- [ ] Works at the documented breakpoints
- [ ] All variants and states implemented
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Touch targets at least 44px
- [ ] Color contrast passes AA

### Documentation
- [ ] Usage doc (when to use, when not to)
- [ ] API doc (props, types, defaults)
- [ ] Examples (basic, advanced, edge cases)
- [ ] Anti-patterns (what to avoid)

### Consistency
- [ ] Uses tokens (no hardcoded values)
- [ ] Follows naming conventions
- [ ] Visual style matches the system
- [ ] Behavior matches similar components

### Test
- [ ] Unit tests for component logic
- [ ] Visual regression test
- [ ] Accessibility test

---

## Metrics

Track the health of the system.

### Adoption

- Percentage of product UI built from system components vs. one-offs
- Per-team adoption rate
- Component usage frequency

### Velocity

- Time from proposal to release
- Number of accepted contributions per month
- Open proposals in queue

### Quality

- Open bugs against system components
- Accessibility issues count
- Drift incidents (components used in unsupported ways)

### Consumer satisfaction

- Internal survey: how useful is the system?
- What's missing? What blocks adoption?

Run satisfaction survey at least annually. Use results to guide system priorities.

---

## Sustaining the system

A design system is a living thing. Without maintenance, it dies.

### Weekly
- Triage incoming proposals
- Review consumer questions and feedback
- Address bugs

### Monthly
- Release notes for any changes
- Office hours for consumer teams
- Component audit (one or two components reviewed in depth)

### Quarterly
- Roadmap review
- Foundation review (token health, naming consistency)
- Adoption metrics review

### Annually
- Strategic review (is the system serving its purpose?)
- Consumer satisfaction survey
- Major version planning

The system is never finished. It evolves with the product, the team, and the brand.

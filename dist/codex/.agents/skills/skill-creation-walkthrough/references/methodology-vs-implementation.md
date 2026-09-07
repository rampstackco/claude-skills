# Methodology vs implementation

What belongs in a public skill, what stays internal, and the user-outcome reasons the discipline matters.

A public skill is methodology, not implementation. Skills teach the framework, the decision criteria, the taxonomies, the anti-patterns. They do not teach the specific page architecture, type definitions, image generation script structure, or stack-specific patterns that any one team uses to ship polished delivery.

This is not gatekeeping. It is user-aligned. Methodology produces work that is distinctive to each team's stack and judgment. Cookie-cutter implementation produces homogenized output that looks identical across users. Stack-agnosticism makes the catalog actually portable. Implementation specificity makes it useless to teams on different stacks.

---

## What belongs in a public skill (methodology layer)

- Conceptual frameworks (architectures, registers, taxonomies, classifications)
- Decision criteria (when to choose X versus Y, with the tradeoffs surfaced)
- Anti-patterns and common failure modes
- The shape of artifacts the skill produces, described in generic terms (a markdown brief with these sections; a JSON object with these fields; a design spec with these decisions documented), not as type signatures bound to a specific framework
- Voice and style guidance for the work
- Workflow descriptions at the methodology level (the sequence of decisions and handoffs, not the platform commands)
- General principles applicable across stacks
- Worked examples with fictional or anonymized actors that demonstrate the framework concretely without prescribing a specific tooling stack

The 12-consideration framework pattern (or 5-pillar, 4-axis, etc.) lives here. Frameworks are durable; they survive stack migrations and team transitions because they teach judgment, not code.

---

## What does not belong in a public skill (implementation layer)

- Specific Next.js, React, Vue, Svelte, or other framework-specific page architectures
- TypeScript or other type definitions optimized for a specific application's data shapes
- Component patterns with stack-specific code (JSX, template syntax, framework directives)
- Image generation script structures matching a specific implementation
- Application-context CSS-rendered mockup component code
- Theme integration patterns tied to specific design tokens (brand-color names, spacing scales, font tokens that exist only in one team's design system)
- Tailwind class strings or other utility-CSS specifics that prescribe one stack's idioms
- Schema markup component shapes that match one team's component library
- Vercel, Netlify, or specific deployment patterns

If a section of a skill cannot be applied by a reader on a different stack, it does not belong in the public skill. It belongs in an internal playbook, a productized client deliverable, or a stack-specific reference implementation maintained separately.

---

## Why the line matters

Three principles, each user-outcome framed.

### 1. Methodology produces distinctive work

A skill that teaches "five logo architectures" leaves the user to choose, design, and execute the architecture that fits their brand. A skill that teaches "render this Next.js component with these Tailwind classes" produces work that looks identical across every user who runs the skill. Cookie-cutter implementation homogenizes; methodology requires the user to engage with why, which produces work distinctive to each team's context.

The user outcome that matters: did the skill help the user produce work that is theirs, or did it produce work that signals "I ran a skill"?

### 2. Stack-agnosticism is real value

A skill that mandates a specific Next.js component is useless to teams on Astro, vanilla HTML, Figma-only workflows, WordPress, Shopify, or anywhere off the prescribed stack. Methodology applies across all of them.

The catalog gets used by people writing in plain markdown, working in Notion, building on a static site generator, running in WordPress, or shipping in something that did not exist when the skill was written. Methodology survives all of those. Stack-coupled implementation does not.

### 3. The catalog compounds because skills are durable

Skills last across stack changes, framework migrations, and team transitions because they teach judgment, not code. A skill that hardcodes the framework du jour decays as the framework changes. A skill that teaches the framework-agnostic principle the framework was implementing keeps working when teams migrate to the next framework.

Implementation-leaking skills decay as their implementations become outdated. Methodology-pure skills compound across years.

---

## The audit pattern

The catalog is audited periodically for methodology versus implementation drift. The first formal audit (May 2026) reviewed 18 flagship skills against the criteria in this reference and found zero implementation-leakage findings; the discipline had been held by instinct from the catalog's earliest skills onward. Future audits will land as the catalog grows past current size.

Findings shape the discipline. Recently shipped skills tend to carry the discipline more cleanly than the earliest ones, which reflects the maturation any catalog goes through. The principle is not "perfection from day one"; it is "audit, learn, codify, hold the line going forward."

---

## How to apply this when authoring new skills

A short checklist for skill authors:

1. **Before writing, identify the methodology versus implementation boundary explicitly.** What part of this skill teaches a framework that applies across stacks? What part teaches your specific stack's implementation? The framework part goes in the public skill; the implementation part stays internal.
2. **When tempted to include specific code, ask: is this teaching the framework, or is this teaching my stack?** If it teaches the framework using your stack as one illustration, keep it; if it teaches your stack using the framework as scaffolding, move it.
3. **When referring to tooling, prefer general categories** ("a feature flag platform," "a data warehouse," "a CMS with structured content models") over specific products. Name specific products when the category needs concretization, and name multiple alternatives so readers see the category rather than locking into one vendor.
4. **Cross-references to specific tools or services should be sparse.** Each cross-reference should earn its inclusion through methodology relevance, not marketing value. If a cross-reference exists primarily to drive traffic, it is not earning its keep in a methodology skill.
5. **Run the audit checklist before merge.** Any specific code? Any type signatures matching your application? Any framework-specific patterns? If yes, move to internal playbook.

---

## What stays internal

Implementation specifics live somewhere; they just do not live in the public skill. Common locations:

- Internal playbooks in private repositories
- Internal documentation in team wikis or knowledge bases
- Productized client deliverables produced by combining methodology plus playbook plus judgment
- Stack-specific reference implementations maintained as separate properties
- Onboarding materials for team members joining the implementation work

The principle: anyone reading the public skill should be able to produce quality methodology-driven work on their own stack. Teams that want polished productized delivery in a specific stack do that work themselves, build their own internal playbooks, or engage practitioners who specialize in that delivery. The public skill is the upstream input; the implementation is the downstream work, owned by whoever is doing it.

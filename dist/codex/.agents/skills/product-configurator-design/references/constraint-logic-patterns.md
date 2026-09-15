# Constraint logic patterns

Hard, soft, implication, capacity constraints. Communication patterns.

Constraints prevent invalid configurations. Done well, they protect users from errors and surface why; done poorly, they feel arbitrary or fail to prevent invalid configurations.

---

## The protect-and-explain principle

Constraints should prevent invalid configurations and explain why when they engage.

**The win.** User selects Option A. System recognizes A is incompatible with currently-selected Option B. Inline message: "Option A and Option B are incompatible. Choose A or B." User adjusts; understands.

**The fail.** User builds configuration. Submits. Backend rejects. User confused; no path forward.

The discipline. Constraints engage at choice-time; explain why; offer paths.

---

## Pattern A: Hard constraints

Combinations that cannot exist.

**How it works.**

- Two options incompatible; configurator prevents both selected.
- User selects A; B becomes unavailable (greyed; with explanation).
- Or vice versa.

**Strengths.** Prevents invalid configurations.

**Weaknesses.** Can frustrate users who do not understand the constraint.

**When to use.** Genuinely incompatible options.

---

## Pattern B: Soft constraints

Combinations that are unusual but possible.

**How it works.**

- User selects unusual combination.
- System warns: "This combination is unusual. Most teams choose [alternative]."
- User can proceed.

**Strengths.** Respects user agency; provides guidance.

**Weaknesses.** Some users will ignore warning; downstream issues.

**When to use.** Combinations that work but are uncommon.

---

## Pattern C: Implication constraints

When choosing one option requires another.

**How it works.**

- User selects A.
- System auto-selects required B (or surfaces it for selection).
- Explains: "Selecting A requires B because [reason]."

**Strengths.** Prevents missing-dependency errors.

**Weaknesses.** Implication chains can grow complex.

**When to use.** When dependencies are clear and predictable.

---

## Pattern D: Capacity constraints

Configuration exceeds product or fulfillment capacity.

**How it works.**

- User configures heavily; reaches capacity ceiling.
- System caps; explains: "Max [X] supported per configuration."
- Offers contact for custom.

**Strengths.** Prevents impossible configurations.

**Weaknesses.** Can frustrate enterprise audiences; offer contact for custom.

**When to use.** Hard product limits.

---

## Pattern E: Combinatorial constraints

When multiple choices interact in complex ways.

**How it works.**

- Configurator evaluates the full configuration after each change.
- Constraints engage based on combinations, not individual options.
- Surface conflicts as they emerge.

**Strengths.** Handles complex products.

**Weaknesses.** Maintenance complexity.

**When to use.** Products with genuine combinatorial constraints.

---

## Constraint communication

How constraints surface.

**Inline.** Message next to the constrained choice.

**Modal.** Full-screen explanation for major constraints.

**Toast.** Brief notification for minor.

**The discipline.** Match intensity to constraint importance.

---

## Constraint copy

What the message says.

**Strong copy.** "Option A and Option B are incompatible because [specific reason]. Choose A or B."

**Weak copy.** "Invalid configuration."

The discipline. Specific; explanatory; offers paths.

---

## Constraint maintenance

Constraints decay.

**What decays.**

- Constraints from old product variants.
- Constraints inherited from deprecated options.
- New options not yet constrained.

**Maintenance cadence.** Quarterly review with product changes.

---

## Common constraint failures

**Over-constrained.** Too many constraints; user feels boxed in.

**Under-constrained.** User builds invalid configuration; fails downstream.

**Constraint without explanation.** User confused by arbitrary blocking.

**Stale constraints.** Inherited from old product.

**Constraint surface inappropriate.** Modal for minor; toast for major.

**No path offered.** Constraint blocks; user has no alternative.

---

## Methodology-level choices that stay in the public skill

The protect-and-explain principle. Patterns A through E. Constraint communication. Constraint copy. Maintenance. Common failures.

## Implementation choices that stay internal

Specific constraints for specific configurators. Specific copy. Specific tooling. These vary by team.

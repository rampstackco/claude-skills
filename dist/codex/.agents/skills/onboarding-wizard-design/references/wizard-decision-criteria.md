# Wizard decision criteria

When wizards earn the build vs when contextual help suffices. The conditions that warrant the wizard format, and the funnels where a wizard adds friction without lift.

A wizard is meaningful work. Step architecture, ah-ha moment design, progressive disclosure, skip mechanics, drop-off instrumentation, ongoing maintenance. The wizard earns this investment only when specific conditions are present.

---

## When wizards earn the build

Five conditions that, when present, make a wizard a strong investment.

**The product has meaningful setup before value emerges.** Connect a data source, invite a teammate, configure a workspace, choose a use case. Without setup, the product is empty; the wizard makes setup tractable. Products that work immediately on signup do not need this.

**The ah-ha moment requires multiple actions in sequence.** Single-action ah-ah moments (paste a URL, see a result) often work better with contextual prompts. Multi-action ah-ha moments benefit from a guided sequence.

**The audience expects guided onboarding.** B2B SaaS with technical setup, enterprise software, configurable products often work well with wizards. Some audiences (frictionless consumer tools) reject wizard friction regardless of product complexity.

**The team can maintain the wizard.** Wizards decay as the product evolves; deprecated features still in flow break the experience. Without maintenance commitment, the wizard becomes a liability.

**The success metric is defined.** Not just completion rate; activation rate (post-wizard product engagement) and time-to-value. Without the success metric, evaluation is impossible.

When all five are present, the wizard is a strong investment. When two or fewer are present, contextual prompts often serve better.

---

## When wizards do NOT earn the build

Funnels where the wizard adds friction without lift.

**The product reaches value immediately.** Single-input tools, simple consumer products, frictionless utilities. A wizard adds steps where the user could already see value.

**Contextual help would suffice.** Tooltips, in-feature hints, progressive in-product education sometimes serve better than upfront wizards. The user explores naturally; help surfaces when needed.

**The audience expects no friction.** Some audiences abandon at any wizard. Consumer-facing high-volume products, embedded tools, prosumer utilities. Meet the audience where they are.

**The team cannot maintain the wizard.** Stale wizards point to deprecated features; users hit broken steps. Without maintenance capacity, no wizard is better than a stale one.

**The setup work is genuinely better in-product.** Some setup is better done after the user understands the product. Wizards that try to set up something the user does not yet understand produce poor configuration.

The honest assessment matters more than the default. "Should we have an onboarding wizard" is not the question. "Is the wizard the right tool for this product and audience" is.

---

## The opportunity-cost frame

A wizard is significant work. Account for it.

**The build cost.** Step architecture, copy, design, instrumentation, integration with the product, maintenance scaffolding. A meaningful wizard often takes 40-150 engineering hours plus design and copy.

**The maintenance cost.** Quarterly review minimum; product changes trigger wizard updates. 4-12 hours per active wizard per quarter.

**The opportunity cost.** What else could the team have built? Direct in-product improvements, contextual help, documentation, a simpler activation funnel. The wizard's success has to clear the bar of those alternatives.

The decision frame. The wizard earns investment when it produces more activation lift than the alternatives, accounting for build plus maintenance.

---

## The ah-ha-moment precondition

Without an identifiable ah-ha moment, the wizard has nothing to engineer toward.

The check. Can the team articulate the single visible moment when the user feels "oh, this is what the product does for me"?

If yes, the wizard can be designed to converge on that moment. If no, the team has not yet defined what activation means; the wizard cannot be designed coherently until that is settled.

**Defining the ah-ha moment is upstream of wizard design.** Sometimes the right move is to spend time identifying the ah-ha moment first (often through customer research) before scoping the wizard. The wizard built without a defined ah-ha moment is the wizard that produces high completion and low activation.

---

## The decision worked example

A B2B SaaS analytics platform considering an onboarding wizard.

**Conditions check.**

- Meaningful setup before value: yes. Connect at least one data source.
- Ah-ha moment multi-action: yes. Connect data, run first query, see useful result.
- Audience expects guided onboarding: yes. Data analysts and data leaders generally accept guided setup.
- Maintenance commitment: yes. Activation team owns the wizard.
- Success metric defined: yes. Activation = ran at least one query within 7 days of signup.

**Decision.** Build the wizard. The conditions warrant it.

**Step architecture.** Welcome (skippable) → connect first data source → confirm connection → guided first query → see result (ah-ha moment) → invite teammates (deferable) → in-product home.

**Maintenance commitment.** Activation team reviews quarterly; product changes trigger wizard updates.

The decision was not "should we have a wizard" but "given these conditions, this is the wizard to build."

---

## The decision worked example: when to choose differently

A consumer note-taking app considering an onboarding wizard.

**Conditions check.**

- Meaningful setup: no. The user can start typing immediately.
- Ah-ha moment multi-action: no. The ah-ha moment is "I can save a note and find it later," reachable without setup.
- Audience expects guided onboarding: no. Consumer note-taking audiences resist friction.
- Maintenance commitment: yes (capacity exists).
- Success metric: defined (returned within 7 days).

**Decision.** Do not build a wizard. Contextual prompts (sample notes, brief tooltip on first save, short empty-state prompts) serve better.

The decision was "is this wizard right for this product" and the answer was no even though the team had capacity.

---

## When to retire a wizard

Wizards can become wrong even after being right initially.

**Retire when:**

- Activation rate has dropped below baseline for two consecutive quarters and refinements have not moved it.
- The product has changed enough that the wizard guides users toward deprecated paths.
- Customer research shows users skipping the wizard and activating fine without it.
- A redesigned in-product activation flow makes the wizard unnecessary.
- The team can no longer maintain the wizard.

The retiring discipline frees capacity. Stale wizards are worse than no wizards.

---

## Methodology-level choices that stay in the public skill

The five conditions that warrant a wizard. The five conditions that argue against. The opportunity-cost frame. The ah-ha-moment precondition. Decision worked examples (yes and no). The retire decision.

## Implementation choices that stay internal

Specific wizard scope decisions for specific products. The team's capacity benchmarks. Specific tooling for wizard implementation and instrumentation. Specific success-metric baselines. These vary by team and product.

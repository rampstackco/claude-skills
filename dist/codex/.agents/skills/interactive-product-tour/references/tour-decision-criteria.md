# Tour decision criteria

When tours earn the build vs when documentation suffices.

A tour system is meaningful work. Trigger logic, tour architecture, contextual placement, completion tracking, ongoing maintenance. Tours earn this investment only when specific conditions are present.

---

## When tours earn the build

Five conditions that, when present, make tours a strong investment.

**The product has features users genuinely miss.** Specific functionality buried in menus, advanced workflows requiring sequence, integrations users do not know exist. Without prompting, users do not find these features.

**The audience benefits from in-context guidance more than documentation.** Tours teach in the place the user will use the feature; docs require context-switching. Some audiences prefer the immediacy of in-context help.

**The team can maintain tours.** Tour content decays as the product evolves. Without maintenance commitment, tours point to deprecated UI; users hit broken steps.

**The success metric is defined.** Feature adoption per tour-covered feature, time-to-value for specific capabilities, reduction in support tickets. Without the metric, evaluation is impossible.

**The product changes at a sustainable pace.** Tours can keep up. Products that change weekly may have tour-maintenance burden exceeding tour value.

When all five are present, tours are a strong investment. When two or fewer are present, documentation often serves better.

---

## When tours do NOT earn the build

Funnels where tours add complexity without value.

**The product's feature set is small enough that documentation suffices.** A few tooltips on key features may be all that is needed. Building a full tour infrastructure is overkill.

**The audience prefers self-directed discovery.** Some audiences resent in-product guidance. Developer tools, professional creative tools, specialist software often have audiences who want to explore on their own.

**The team cannot maintain tours.** Stale tours are worse than no tours. Without commitment, tours decay into liability.

**The product changes too frequently.** A product churning weekly may have tours that go stale within days of being shipped. The maintenance cost exceeds the tour benefit.

**The audience is small enough that direct outreach is more efficient.** Onboarding calls, customer success engagement, and direct help may serve a small audience better than tour infrastructure.

The honest assessment matters. Tours are sometimes the wrong tool even when the team has capacity to build them.

---

## Documentation vs tours: the comparison

Both teach features; they differ in delivery.

**Documentation strengths.**

- Stable; changes don't require tour updates.
- Searchable; users find what they need.
- Comprehensive; can cover edge cases.
- Accessible from outside the product (sharing, linking).

**Documentation weaknesses.**

- Requires context-switching from product to docs.
- Users may not know to consult docs.
- Static; cannot react to user state.

**Tour strengths.**

- In-context; help where the user will use the feature.
- Dynamic; can react to user state and behavior.
- Non-disruptive when designed well.

**Tour weaknesses.**

- Maintenance burden.
- Can become tooltip-spam if undisciplined.
- Less comprehensive than docs.

**The combined approach.** Most production teams use both. Tours for the moments where in-context guidance matters; docs for depth and reference.

---

## The opportunity-cost frame

Tour systems are significant work.

**The build cost.** Trigger logic infrastructure, tour authoring, instrumentation, integration with the product, design and copy. A meaningful tour system often takes 60-200 engineering hours plus design and copy per major tour.

**The maintenance cost.** Quarterly review minimum; product changes trigger tour updates. 4-12 hours per active tour per quarter.

**The opportunity cost.** What else could the team have built? Direct in-product improvements, better empty states, contextual prompts that do not require tour infrastructure. The tour system has to clear the bar of those alternatives.

The decision frame. Tours earn investment when they produce more adoption lift than the alternatives.

---

## Decision worked example

A B2B SaaS analytics platform considering an in-product tour system.

**Conditions check.**

- Features users miss: yes. Advanced analysis modes, custom dashboard creation, integration setup all underused.
- In-context guidance benefits: yes. Users explore in-product; pulling them to docs breaks flow.
- Maintenance commitment: yes. Customer success team owns tours.
- Success metric defined: yes. Feature adoption per tour-covered feature within 30 days of first encounter.
- Product change pace: moderate. Major features ship monthly; minor changes weekly. Tour updates fit the cadence.

**Decision.** Build the tour system. The conditions warrant it.

**Architecture.** Library of micro-tours, each tied to a specific feature. Triggered contextually when users first encounter the feature.

**Maintenance commitment.** CS team reviews quarterly; major product changes trigger tour updates as part of the change.

The decision was deliberate, not default.

---

## Decision worked example: when to choose differently

A developer-tool company considering in-product tours.

**Conditions check.**

- Features users miss: somewhat. Some advanced features underused, but the audience tends to find them through docs.
- In-context guidance benefits: weak. Developers strongly prefer docs and prefer not to be interrupted.
- Maintenance commitment: yes (capacity exists).
- Success metric: defined.
- Product change pace: moderate.

**Decision.** Do not build a full tour system. Invest in better docs, smarter empty states, and a few high-value contextual hints. The audience's preference for self-directed discovery argues against tour infrastructure.

The decision was right-sized to the audience.

---

## When to retire a tour system

Tour systems can become wrong over time.

**Retire when:**

- Feature adoption (the tour's success metric) has declined consistently and refinements have not moved it.
- Users globally disable tours via settings.
- The product changes have outpaced maintenance; tours are stale.
- A redesigned product surface (better empty states, better contextual prompts) makes tours redundant.
- The team can no longer maintain tours.

The retire-or-redesign discipline frees capacity.

---

## Methodology-level choices that stay in the public skill

The five conditions that warrant tours. The five conditions that argue against. Documentation vs tours comparison. The opportunity-cost frame. Decision worked examples (yes and no). The retire decision.

## Implementation choices that stay internal

Specific tour decisions for specific products. The team's capacity benchmarks. Specific tooling. Specific success-metric baselines. These vary by team and product.

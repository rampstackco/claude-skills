# Configurator anti-patterns

The patterns that look like configurators but degrade conversion. Easy to ship; the cost shows up in completion rates, downstream conversion, and brand trust.

---

## The infinite-options configurator

The pattern. Every parameter exposed at full granularity.

The signal. Decision paralysis; high abandonment.

The cure. Smart defaults; meaningful constraints; escape hatches into deeper customization.

---

## The canned-bundles-only configurator

The pattern. Three pre-built bundles labeled "Custom."

The signal. Audience expecting customization feels deceived.

The cure. Real configuration logic; or honest bundle framing.

---

## The blank-canvas configurator

The pattern. Configurator opens empty; user must build from scratch.

The signal. First-step abandonment.

The cure. Default-heavy. Open with sensible default.

---

## The hidden-pricing configurator

The pattern. Price not visible until checkout.

The signal. Users abandon at checkout when total surprises.

The cure. Real-time pricing throughout.

---

## The under-constrained configurator

The pattern. User can build invalid configurations that fail downstream.

The signal. Sales gets calls about failed orders.

The cure. Constraint logic. Detail in `references/constraint-logic-patterns.md`.

---

## The over-constrained configurator

The pattern. Too many constraints; user feels boxed in.

The signal. User abandons; sales gets calls for "custom" configurations.

The cure. Reduce constraints to genuine requirements; offer custom path for edge cases.

---

## The unclear-constraint configurator

The pattern. Constraint engages without explanation.

The signal. Users confused; bounce rate climbs.

The cure. Constraint communication. Why constraint engaged; what user can do.

---

## The lose-state-on-error configurator

The pattern. Validation engages; configuration resets.

The signal. Users abandon at first error.

The cure. Preserve state; errors local.

---

## The mobile-broken configurator

The pattern. Configurator works on desktop; breaks on mobile.

The signal. Mobile completion much lower than desktop.

The cure. Mobile-first design.

---

## The lost-on-cart configurator

The pattern. Cart shows generic SKU; configuration not visible.

The signal. Users edit; configurator restarts; abandonment.

The cure. Cart presentation preserves configuration.

---

## The price-drift configurator

The pattern. Configurator shows one price; cart shows another.

The signal. Users feel deceived.

The cure. Single source of truth for pricing.

---

## The save-mechanism-broken configurator

The pattern. User saves; recovery link broken; configuration lost.

The signal. Users complain; abandonment increases on long configurations.

The cure. Test save mechanism end-to-end.

---

## The validation-strict configurator

The pattern. Validation rejects valid edge-case inputs.

The signal. Users with valid inputs cannot proceed.

The cure. Audit validation; allow international, plus-aliased, non-Latin inputs.

---

## The unmaintained configurator

The pattern. Product changed; configurator did not.

The signal. Configurator references deprecated options; pricing wrong.

The cure. Quarterly maintenance; product changes trigger configurator updates.

---

## The aggressive-pricing-anchoring configurator

The pattern. Strikethrough prices that were never charged; "$X for a limited time" perpetually.

The signal. Sophisticated audiences notice; trust collapses.

The cure. Honest anchoring; real discounts only.

---

## The orphan-configuration configurator

The pattern. Configurations save; user returns; configuration valid but pricing changed silently.

The signal. Users surprised at price difference.

The cure. Honest about price changes on resume.

---

## How to detect anti-patterns

Audit cadence. Quarterly review.

**Audit questions per configurator.**

- Is default sensible (anti-pattern check: blank-canvas)?
- Are constraints calibrated (anti-pattern check: over-constrained, under-constrained, unclear)?
- Is pricing visible and consistent (anti-pattern check: hidden-pricing, price-drift)?
- Does state preserve on error (anti-pattern check: lose-state-on-error)?
- Does mobile work (anti-pattern check: mobile-broken)?
- Does cart preserve configuration (anti-pattern check: lost-on-cart)?
- Is validation calibrated (anti-pattern check: validation-strict)?
- Is configurator current (anti-pattern check: unmaintained)?
- Are saved configurations honest about price changes (anti-pattern check: orphan-configuration)?

**The retire decision.** Configurators failing multiple checks warrant redesign or retirement.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing. Cures matched. Audit cadence and questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped and lessons learned. Specific portfolio audit results. The team's audit calendar. These vary by team.

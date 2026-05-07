# Configurator-to-cart handoff

Handoff that preserves configuration; cart visibility; edit-from-cart.

When the user commits, the handoff to cart determines whether the commitment sticks. Done well, handoff preserves the configuration; done poorly, the cart shows generic SKUs and the user feels their custom build was lost.

---

## The preserve-the-build principle

The configuration becomes the cart item. The cart shows the configuration. Editing returns to the configurator with state preserved.

**The win.** User finishes configuration; clicks add to cart; cart shows the custom configuration with breakdown and price; user can edit, returning to configurator with all choices preserved.

**The fail.** User finishes; clicks add to cart; cart shows "Custom Product - $X" with no detail. User cannot tell if their build is reflected.

The discipline. Handoff loop closed.

---

## Cart presentation

How the configuration appears in cart.

**Configuration summary.** Key choices listed (not all; not none).

**Price breakdown.** Subtotal matches configurator's price.

**Edit link.** Clear path back to configurator with state preserved.

**Visual.** If configurator shows visual configuration, cart shows it too (or summary image).

---

## Edit-from-cart

When user wants to change.

**Pattern.** Cart includes "Edit configuration" link.

**Behavior.**

- Click; return to configurator.
- All choices loaded.
- Adjust; commit; cart updates.

**The lose-state-on-edit failure.** User clicks edit; configurator restarts; previous choices lost.

The cure. State preserved through the handoff loop.

---

## Multi-item handoff

When the user configures multiple items.

**Pattern.** Each configuration becomes a separate cart item with its own summary.

**Edit each independently.** User can edit one without affecting others.

---

## B2B configurator-to-quote

When the configurator generates a quote rather than direct cart.

**Pattern.** Configuration generates a quote; quote can be shared, approved, then converted to order.

**Strengths.** B2B workflows often require approval.

**The discipline.** Quote includes everything the configuration includes; conversion to order preserves.

---

## Handoff to checkout

After cart, checkout.

**The principle.** Configuration details flow through checkout. Confirmation email reflects the configuration.

**The drop-config-at-checkout failure.** Configuration disappears at checkout; user cannot verify.

The cure. Configuration visible throughout the funnel.

---

## Configuration ID

The technical bridge.

**Pattern.** Each configuration gets an ID. Cart, checkout, fulfillment all reference the ID.

**Strengths.** Stable reference.

**Weaknesses.** Requires backend infrastructure.

---

## Pricing consistency

Prices match across configurator, cart, checkout.

**The principle.** No price drift between stages.

**The drift failure.** Configurator shows $X; cart shows $Y; user feels deceived.

**Causes.** Caching, currency conversion, tax estimation, discount expiration.

**The cure.** Single source of truth for pricing; all stages query.

---

## Save-and-share-to-cart

When users return from saved configurations.

**Pattern.** Saved configuration link opens configurator with state; user can add to cart from there.

**The discipline.** Save mechanism integrates with cart workflow.

---

## Mobile cart handoff

On mobile, the handoff transition matters.

**Considerations.**

- Cart visible without horizontal scroll.
- Edit returns work on mobile.
- Configuration summary readable.

---

## Common handoff failures

**Cart shows generic SKU.** User cannot verify configuration.

**Edit restarts configurator.** Previous choices lost.

**Pricing drifts between stages.** User confused.

**Configuration disappears at checkout.** Cannot verify.

**Multi-item handoff broken.** Configurations conflict in cart.

**B2B quote misses details.** Quote does not match configuration.

**Confirmation email lacks configuration.** User cannot verify post-purchase.

---

## Methodology-level choices that stay in the public skill

The preserve-the-build principle. Cart presentation. Edit-from-cart. Multi-item handoff. B2B configurator-to-quote. Handoff to checkout. Configuration ID. Pricing consistency. Save-and-share-to-cart. Mobile considerations. Common failures.

## Implementation choices that stay internal

Specific cart implementations for specific configurators. Specific configuration-ID systems. Specific backend integrations. These vary by team.

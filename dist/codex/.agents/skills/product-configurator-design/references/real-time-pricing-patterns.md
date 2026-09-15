# Real-time pricing patterns

Price updates with choices. Breakdown and impact display.

Pricing that responds to choices. Done well, users see cost impact immediately; done poorly, price-shock at checkout drives abandonment.

---

## The no-surprises principle

Price visible throughout the configuration. No surprises at checkout.

**The win.** Total price visible at top of configurator. Updates as user adjusts. Per-choice impact visible ("Adds $X"). Breakdown available.

**The fail.** Price hidden until checkout. User configures heavily. Sees price; abandons.

The discipline. Price visible; breakdown available; surprises eliminated.

---

## Total price display

How the total appears.

**Prominent placement.** Top or top-right of configurator.

**Real-time updates.** Updates immediately as user changes choices.

**Currency and locale.** Match the user's locale.

**Period.** Per-month, per-year, one-time. Match the product's pricing model.

---

## Per-choice impact

Showing what each option costs.

**Inline impact.** "+$X/month" next to the option.

**Strikethrough for upgrades.** Old price strikethrough; new price highlighted.

**Free options labeled.** "Free" or "Included" explicit.

The discipline. User can see the cost of each choice without computing.

---

## Pricing breakdown

How the total breaks down.

**Expandable breakdown.** "How is this priced" toggle reveals detail.

**Categorized breakdown.** Base + add-ons + fees.

**Subscription vs one-time.** Recurring vs one-time costs distinguished.

The discipline. Breakdown available on demand; not forced.

---

## Annual vs monthly

Subscription periods.

**Toggle visible.** User can switch between annual and monthly.

**Discount disclosed.** "Save X% with annual billing."

**Both totals shown.** Annual total and monthly equivalent.

---

## Hidden cost surfacing

Costs that often hide.

**Setup fees.** Disclosed at configuration; not at checkout.

**Implementation costs.** If applicable, visible.

**Per-user vs flat.** Mode disclosed.

**Overage pricing.** What happens beyond capacity, disclosed.

The hidden-cost trap. Costs surfaced only at checkout; user feels deceived.

---

## Tax and shipping

Where applicable.

**Tax estimate.** Approximate tax visible if jurisdiction can be inferred.

**Shipping estimate.** Approximate shipping visible if applicable.

**Final calculation at checkout.** Estimate at configurator; final at checkout.

The discipline. Estimates clearly labeled; final disclosed.

---

## Price comparison anchoring

Showing alternative configurations.

**Comparison anchoring.** "If you upgrade to X, the price increases to Y."

**Bundle anchoring.** "Equivalent bundle is Z."

**Use carefully.** Anchoring can manipulate; honesty matters.

---

## Pricing maintenance

Pricing decays.

**What decays.**

- Pricing levels from old pricing models.
- Currency conversions stale.
- Discount terms expired.

**Maintenance cadence.** When pricing changes, configurator pricing updates as part of the change.

---

## Common pricing failures

**Hidden pricing.** Total not visible until checkout.

**Per-choice impact hidden.** User does not know what each choice costs.

**Surprise fees.** Setup, implementation costs hidden until checkout.

**Stale pricing.** Reflects old prices.

**Tax surprise.** Tax not estimated; user surprised at checkout.

**Currency wrong.** Local user sees wrong currency.

**No annual-vs-monthly toggle.** User locked into one period.

**False discount anchoring.** Strikethrough prices that were never charged.

---

## Methodology-level choices that stay in the public skill

The no-surprises principle. Total price display. Per-choice impact. Pricing breakdown. Annual vs monthly. Hidden cost surfacing. Tax and shipping. Price comparison anchoring. Pricing maintenance. Common failures.

## Implementation choices that stay internal

Specific pricing displays for specific configurators. Specific currency and tax logic. Specific tooling. These vary by team.

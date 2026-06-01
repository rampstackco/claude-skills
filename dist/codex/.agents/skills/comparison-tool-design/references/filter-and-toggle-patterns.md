# Filter and toggle patterns

What users can adjust, what should stay fixed. The filter-fatigue trap.

Filters and toggles let users adapt the comparison to their context. Done well, filters help users match the tool to their situation; done poorly, filters become customization theater that adds complexity without value.

---

## The help-don't-customize principle

Filters earn placement when they help users match the comparison to their context. Filters for the sake of customization options add complexity without lift.

**The win.** Tool offers 3 filters: audience size, use case, must-have integrations. Each filter materially adapts the recommendation. Users find their context quickly.

**The fail.** Tool offers 15 filters across multiple dimensions. Decision paralysis at the filter step; users abandon before reaching the comparison.

The discipline. Filters that help; not filters for theater.

---

## Filterable elements

What users can adjust.

**Options to compare.** User adds or removes options.

**Axes to show.** User filters to relevant dimensions.

**Audience or use case.** User signals their context; tool adapts.

**Pricing model preference.** User selects monthly vs annual; per-seat vs flat.

**Region or geography.** User selects where they operate; tool adapts to applicable options.

---

## Fixed elements

What should not be filterable.

**Methodology disclosure.** Always visible.

**Recommendation reasoning.** Always findable.

**Source citations.** Always linkable.

**Honest framing.** Tool is honest about its biases regardless of filter state.

---

## Filter UI patterns

How filters appear.

**Pattern A: Top-of-page filters.**

How it works. Filter row at top; user adjusts; comparison below updates.

Strengths. Visible; familiar.

Weaknesses. Takes screen space; mobile-challenging.

**Pattern B: Sidebar filters.**

How it works. Filter panel on the side; comparison main area.

Strengths. Persistent; works on desktop.

Weaknesses. Mobile-broken; takes space.

**Pattern C: Inline filters.**

How it works. Filters appear within the comparison (per-axis filtering, per-option toggling).

Strengths. Contextual.

Weaknesses. Visual complexity.

**Pattern D: Wizard-style.**

How it works. Tool asks 2-3 filter questions; then shows comparison.

Strengths. Less overwhelming.

Weaknesses. Adds friction upfront.

The choice depends on filter complexity and audience preferences.

---

## Filter count

How many filters earn placement.

**3-5 filters.** Sweet spot. Each filter helps; cumulative friction manageable.

**6-8 filters.** Acceptable for complex tools; require strong UX.

**10+ filters.** Almost always too many. Decision paralysis at filter step.

**1-2 filters.** Often too few; tool feels rigid.

---

## Filter defaults

What filters are pre-set.

**Honest defaults.** Reflect typical audience.

**Audience-detected defaults.** Inferred from referral or context.

**No defaults (user must select).** Adds friction but ensures intentionality.

The default discipline. Defaults reflect audience importance; not brand strength.

---

## Filter combinations

When filters interact.

**Independent filters.** Each filter changes one dimension; combinations multiply.

**Conditional filters.** Some filters appear only after others are set.

**Smart filters.** Tool suggests filters based on earlier selections.

The discipline. Combinations should produce meaningful comparisons; not empty cells.

---

## The filter-fatigue trap

Too many filters; user paralyzed.

**The pattern.** Tool offers 12 filters. User feels they need to set them all to get meaningful comparison. User leaves before completing.

**The signal.** Drop-off at the filter step; users do not reach the comparison.

**The cost.** Comparison tool's main value (the comparison) is invisible.

**The cure.** Reduce filter count. Default-heavy. Optional filters behind a "more options" toggle.

---

## The under-filtered trap

Tool too rigid; user cannot match context.

**The pattern.** Tool shows one fixed comparison; no way to adapt.

**The signal.** Users complain the tool does not fit them; specific segments convert poorly.

**The cost.** Tool serves only the audience the default fits.

**The cure.** Add filters where audience genuinely splits.

---

## Filter mobile design

Filters on mobile have specific considerations.

**Mobile-specific patterns.**

- Filters in a collapsible drawer rather than always-visible panel.
- Reduced filter count on mobile (defer non-critical filters).
- Touch-friendly toggles.

**Mobile-broken patterns.**

- Sidebar filters cramping the comparison.
- Top-of-page filters that scroll off and require scrolling back.
- Filter modals that take over the screen.

The mobile discipline. Filters work on mobile or do not exist there.

---

## Filter analytics

Track filter use.

**Metrics.**

- Per-filter use rate.
- Filter abandonment (started filtering; left without completing).
- Filter combinations that produce no results.

**Diagnostic uses.**

- Filter rarely used: it may not earn placement.
- Filter abandonment high: too many filters or bad defaults.
- No-result combinations: filter logic may have gaps.

---

## Common filter failures

**Too many filters.** Filter fatigue.

**Too few filters.** Tool too rigid.

**Filters with no value.** Filters that do not change anything meaningful.

**Filters that produce empty results.** Combinations show no options.

**Mobile-broken filters.** Filters work on desktop, fail mobile.

**Filter UX inconsistent.** Mix of patterns; users confused.

**Default filters bias-flattering.** Defaults make brand look better than reality.

**No filter analytics.** Cannot tell which filters earn their place.

---

## Methodology-level choices that stay in the public skill

The help-don't-customize principle. Filterable vs fixed elements. Filter UI patterns A through D. Filter count. Filter defaults. Filter combinations. The filter-fatigue and under-filtered traps. Filter mobile design. Filter analytics. Common failures.

## Implementation choices that stay internal

Specific filters for specific tools. Specific filter UI implementations. Specific defaults. The team's mobile testing benchmarks. These vary by team.

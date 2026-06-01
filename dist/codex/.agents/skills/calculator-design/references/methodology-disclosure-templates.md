# Methodology disclosure templates

Templates for assumption lists, methodology pages, source citations, formula explanations. Patterns for disclosing calculation logic in ways the audience can use to defend the result.

A methodology disclosure is not a marketing document. It is a technical document that lets the audience interrogate the calculator. The templates here cover the patterns that hold up to interrogation.

---

## Methodology page template

A standalone page that explains the calculator's calculations in detail.

**Structure.**

```
# How the [calculator name] is calculated

## What this calculator does
[2-3 sentences describing the calculation in plain language]

## The formulas
[Plain-text formulas with each variable defined]

## Assumptions
[Plain-language list of what the calculator assumes]

## Sources
[Citations for any external benchmarks or data]

## Worked example
[A specific scenario with input values and resulting calculation]

## Caveats
[What the calculator does not account for; when to seek additional analysis]

## Updates
[Date of last methodology review; how often the calculator is updated]
```

---

## Assumption list template

A plain-language list of assumptions, formatted for scan-ability.

**Structure.**

```
## What this calculator assumes

- [Assumption 1: stated plainly]
- [Assumption 2: stated plainly]
- [Assumption 3: stated plainly]

## What this calculator does NOT account for

- [Excluded factor 1]
- [Excluded factor 2]

If your situation differs significantly from these assumptions, the result is an estimate; consider [additional resource] for more precise analysis.
```

**Example assumption list for a SaaS pricing calculator.**

```
## What this calculator assumes

- Your team will use the platform daily across business hours.
- Implementation takes 4-6 weeks for teams in the 50-200 employee range.
- The recommended plan is based on typical usage patterns from our customer base.
- Productivity gains compound through year 1 and stabilize in year 2.

## What this calculator does NOT account for

- Custom integrations or enterprise SSO requirements.
- Volume discounts available for annual contracts above $50K.
- Migration cost from your current platform.

If your situation involves enterprise SSO, custom integrations, or migration costs, talk to our team for a tailored estimate.
```

---

## Source citation template

How to cite external benchmarks or data.

**Inline citation pattern.**

```
Industry Average: 14 percent (Source: [Industry Benchmark Report 2025], page 23)
```

**Footnote pattern.**

```
Industry Average: 14 percent [^1]

[^1]: Industry Benchmark Report 2025. Available at [URL]. Accessed [Date].
```

**Multi-source pattern.**

```
The conversion-rate benchmark we use combines:
- Industry Benchmark Report 2025 (Source A)
- Our customer cohort data (n=200, 2024-2025)
- Public conversion-rate studies from [Source C]

The composite benchmark is 14 percent.
```

**Internal-source pattern.**

```
Source: [Brand]'s customer cohort data, n=200, 2024-2025. The cohort represents customers in the 50-500 employee range across SaaS, e-commerce, and B2B services.
```

---

## Formula explanation template

How to display formulas in ways the audience can verify.

**Plain-text formula pattern.**

```
Annual savings = (current annual cost) - (estimated new annual cost) + first-year implementation savings

Where:
  current annual cost = current monthly cost x 12
  estimated new annual cost = recommended plan price x 12
  first-year implementation savings = $500 if migrating from a manual process, otherwise $0
```

**Step-by-step calculation pattern.**

```
1. Calculate current annual cost: $3,000 / month x 12 = $36,000
2. Calculate estimated new annual cost: $2,000 / month x 12 = $24,000
3. Calculate cost reduction: $36,000 - $24,000 = $12,000
4. Add first-year implementation savings: $12,000 + $2,200 = $14,200

Annual savings: $14,200
```

**Conditional logic pattern.**

```
The recommended plan is determined by:

If team size is 1-10: Starter plan ($X / month)
If team size is 11-50: Growth plan ($Y / month)
If team size is 51-200: Business plan ($Z / month)
If team size is 201+: Enterprise (contact for pricing)

Plan recommendations may shift based on use case (e.g., teams with heavy data needs may benefit from a higher tier even at a lower seat count).
```

---

## Worked-example template

A concrete scenario the audience can read end-to-end.

**Structure.**

```
## Worked example: [scenario description]

Inputs:
- [Input 1]: [value]
- [Input 2]: [value]
- [Input 3]: [value]

Calculation:
[Step-by-step formula application]

Result:
[Final output with units]

Interpretation:
[1-2 sentences explaining what the result means and how the audience would use it]
```

**Example for a SaaS pricing calculator.**

```
## Worked example: 75-person B2B SaaS team

Inputs:
- Team size: 75
- Use case: Customer support
- Current solution: Manual spreadsheets

Calculation:
- Recommended plan: Business ($45 / user / month)
- Monthly cost: 75 users x $45 = $3,375
- Annual cost: $3,375 x 12 = $40,500
- Estimated time savings: 8 hours / week / agent x 75 agents x $40 / hour x 50 weeks = $1.2M
- Net annual value: $1.2M - $40,500 = $1.16M

Result:
- Recommended plan: Business
- Monthly investment: $3,375
- Estimated annual time-savings value: $1.2M
- Net annual value: $1.16M

Interpretation:
A 75-person customer-support team migrating from manual spreadsheets to the Business plan would invest $40,500 annually and save approximately $1.16M in time-equivalent value. The largest contributor is hours saved per agent per week.
```

---

## Caveats template

What the calculator does not do, stated honestly.

**Structure.**

```
## What this calculator does not account for

- [Excluded factor 1]: why it is excluded and what to do if it matters
- [Excluded factor 2]: why it is excluded and what to do if it matters

For situations involving [specific complex case], the calculator's estimate may not apply; consider [additional resource or contact] for more precise analysis.
```

**Why caveats matter.** Caveats signal the calculator's honesty. The audience that knows the caveats can use the result with appropriate confidence; the audience that does not know the caveats may apply the result to a situation it does not fit.

**Common caveats to include.**

- The calculator does not account for taxes, regulations, or jurisdiction-specific factors.
- The calculator does not account for one-time setup or migration costs.
- The calculator's benchmarks reflect the typical case; outliers may differ significantly.
- The calculator's projections are estimates, not guarantees.

---

## Update-history template

How to track methodology changes over time.

**Structure.**

```
## Updates

This calculator's methodology was last reviewed on [date].

Recent updates:
- [Date]: Updated industry-benchmark source from [old] to [new].
- [Date]: Adjusted productivity-gains assumption based on cohort data through [year].
- [Date]: Added consideration for [new factor].

Major version history:
- v1.0 ([date]): Initial release.
- v1.1 ([date]): Added [feature].
- v2.0 ([date]): Refactored methodology to include [new dimension].
```

**Why update history matters.** Audiences who relied on previous outputs can see what changed. The transparency about updates signals that the calculator is maintained, not abandoned.

---

## Methodology integration patterns

How to integrate the methodology disclosure into the calculator UI.

**Pattern A: Inline disclosure.** The methodology appears alongside the result. Best for short calculations where the formula is digestible.

**Pattern B: Expandable section.** "How this is calculated" expandable below the result. The user opens it if they want depth.

**Pattern C: Linked methodology page.** A "How this is calculated" link to a separate page. Best for complex calculations.

**Pattern D: Hover-revealed detail.** Each result component has a tooltip explaining how it was derived. Useful for multi-component results.

**Pattern E: Methodology-in-PDF.** The free result shows the headline; the gated PDF contains full methodology. Works when the PDF is genuine value-add.

---

## Audience-specific methodology depth

Calibrate methodology depth to the audience's analytical sophistication.

**Highly analytical audiences (engineers, finance, data scientists).** Detailed formulas, source citations, version history. The audience expects depth and rewards transparency.

**Moderately analytical audiences (PMs, marketers, operations).** Plain-language formulas, key assumptions, summary citations. The audience wants to verify but does not need every variable.

**Less analytical audiences (executives, generalists).** Plain-language summary of the methodology, key assumptions, "talk to us if you want depth" option. The audience trusts based on the summary; depth is available if needed.

The discipline. Match the methodology depth to the audience that uses the calculator. Too thin loses analytical audiences; too dense loses generalist audiences.

---

## Common methodology disclosure failures

**No methodology shown.** Result without explanation; audience cannot verify or defend.

**Methodology hidden behind email.** Lead-trap pattern applied to methodology; audience that wants to verify must opt in first.

**Methodology in marketing language.** "Our proprietary algorithm draws on industry-leading data" is not methodology; it is brand copy.

**Methodology that hides the assumptions.** Formulas shown; assumptions not stated; audience cannot tell what the calculator assumes about their situation.

**Methodology that hides the sources.** Industry averages cited without attribution.

**Methodology that does not match the calculation.** Stated methodology and actual implementation drift apart over time.

**Methodology with no update history.** Calculator changes silently; audience that relied on previous outputs cannot see what changed.

---

## Methodology-level choices that stay in the public skill

The methodology page template. The assumption list template. The source citation patterns. Formula explanation patterns. Worked-example template. Caveats template. Update-history template. Methodology integration patterns. Audience-specific methodology depth. Common disclosure failures.

## Implementation choices that stay internal

Specific methodology pages for specific calculators. Specific source-citation conventions and benchmark relationships. Specific formula-display tooling and styling. Specific worked-example libraries. The team's methodology update calendars and version control. These vary by team.

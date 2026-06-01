# Result presentation patterns

Specific, contextualized, actionable. Headline number, breakdown, visualization, scenario comparison. The result is the calculator's product; bad presentation wastes the calculation work.

A calculator that runs the right math and presents the result poorly fails as completely as a calculator that runs the wrong math. Result presentation is half the user experience. Get it wrong and the audience does not know what to do with the number they computed.

---

## The presentation principle

The result should be specific, contextualized, and actionable.

**Specific.** A number with units. "Estimated annual savings: $14,200." Not "Significant savings." Not "Up to 60 percent off." Precision matters; the audience uses the result in their actual decision.

**Contextualized.** Compare to a baseline the user can understand. "Based on your inputs, you would save $14,200 annually compared to your current configuration." Without the baseline, the number is just a number; with the baseline, it becomes meaningful.

**Actionable.** What does the user do with this number? "Use this estimate to make the case to your CFO" or "Save this scenario to compare against alternative configurations" or "Get a PDF report you can share." The next step bridges from result to action.

A result that hits all three is one the audience can use in their actual decision. A result that misses any of the three leaves the audience with an unanswered "so what."

---

## The headline number

The single most important output, large and prominent.

**The pattern.** One number, one label, large type, central placement. The audience sees the headline number first.

**Example headline outputs.**

- "Estimated annual savings: $14,200"
- "Recommended plan: Growth (37 users, 3 admins)"
- "Time to payback: 8 months"
- "Estimated monthly cost: $2,400"

**The discipline.**

- One headline number, not five. Multiple competing headlines fragment the user's attention.
- Number with units. "$14,200" beats "14200." "8 months" beats "8."
- Honest framing. "Estimated" or "Projected" is honest; "Guaranteed" is overstatement.
- Visual hierarchy. The headline is the largest text on the result screen.

**Headline number antipatterns.**

- "Up to $50,000" (range with no specific value).
- "Significant savings" (no number).
- "X% improvement" (no base).
- Multiple competing numbers (user does not know which to focus on).

---

## The breakdown

Sub-results that explain how the headline number was calculated.

**The pattern.** Below the headline, show the components that make up the result.

**Example breakdown for an ROI calculator.**

```
Annual savings: $14,200

  Cost reduction: $9,200
    Current cost: $36,000
    New cost: $26,800

  Productivity gains: $4,000
    Hours saved per week: 8
    Hourly cost: $50
    Weeks per year: 50

  Implementation savings: $1,000 (first year only)
```

**Why the breakdown matters.**

- It makes the headline number defensible. The user can cite the components.
- It helps the user understand how their inputs influenced the result. Adjusting inputs becomes meaningful.
- It surfaces the assumptions implicitly. The user sees what the calculator weighted.

**Breakdown display options.**

- Stacked text (as above).
- Expandable section (compact by default; user opens for detail).
- Visual breakdown (stacked bar chart, pie chart for components).

---

## Visualization

Charts and graphics that help the user see the relationship.

**When visualization helps.**

- Comparing the result against a baseline ("current vs new").
- Showing components contributing to a total ("savings breakdown").
- Showing change over time ("month-by-month savings projection").
- Showing thresholds ("you fall in the 'mid-market' band based on your inputs").

**When visualization hurts.**

- When the data does not warrant a chart (a single number does not need a pie chart).
- When the chart obscures rather than clarifies (3D pie charts, gratuitous animation).
- When the chart cannot be interpreted on mobile.

**Visualization patterns.**

- **Bar comparison.** Current state vs new state. Easy to read; instant relative comparison.
- **Stacked bar (component breakdown).** Total height = headline; segments = components.
- **Line chart (time series).** Monthly cost projection over 12-24 months.
- **Threshold indicator.** Position the user's result on a scale ("you are at the 73rd percentile").

**Visualization quality discipline.**

- Charts should be readable at the size displayed.
- Labels should be present and legible.
- Color should reinforce, not decorate (different colors for different components, not random palette).
- Mobile rendering should preserve readability; charts that work on desktop and break on mobile fail half the audience.

---

## Scenario comparison

Useful when the calculator is illustrating a delta between two states.

**The pattern.** Show the user's current state and the projected state side-by-side, with the delta highlighted.

**Example: SaaS migration calculator.**

```
                Current     New        Change
Annual cost     $36,000    $24,000    -$12,000
Hours/week     12 hrs/wk  4 hrs/wk    -8 hrs/wk
Errors/month    14         3           -11
```

**Why scenario comparison works.**

- The delta is the value proposition; showing both states makes the delta concrete.
- The user can see what they are giving up (if anything) alongside what they are gaining.
- The comparison format is familiar from spreadsheets and decision tools.

**When scenario comparison applies.** Calculators that compare a current state to a proposed state (migrations, refinances, configurations). Less applicable to calculators that produce a single recommendation without an explicit baseline.

---

## Result-presentation antipatterns

Patterns that waste the calculation.

**Buried result.** The result requires scrolling past 5 paragraphs of marketing. The user came for the result; serve it first.

**Vague output.** "Significant" or "Up to" framing without specific values. The audience cannot use vague results in real decisions.

**Result followed by 5 paragraphs of marketing.** The result is what the user came for; the brand pitch belongs after, not before.

**Result that requires re-entering inputs to view.** Persist inputs and results within the session. Forcing re-entry is a friction the user did not consent to.

**False precision.** "$14,237.42" when the inputs justify only "$14,000 (estimated)." Precision the math does not support erodes trust.

**Multiple competing headlines.** Five "important" numbers; the user does not know what to focus on.

**Disconnected result and breakdown.** The headline number does not obviously add up from the breakdown components. The user does the mental math, finds the gap, loses trust.

**Result without a next step.** The user gets the number, then what? Without a next step, the calculator does not bridge to action.

---

## Mobile result presentation

The result should work on mobile.

**Mobile-specific considerations.**

- Headline number readable without zoom.
- Breakdown components stack vertically rather than spread horizontally.
- Visualizations sized for mobile screens; complex multi-axis charts often do not translate.
- Scroll position lands on the result, not the inputs.

**Common mobile failures.**

- Headline number tiny on mobile because it was sized for desktop.
- Breakdown table requires horizontal scroll.
- Charts illegible at mobile size.
- Result hidden below the fold; user does not know it loaded.

---

## Result-to-action transitions

The result should lead naturally to a next step.

**Patterns.**

- **CTA below the result.** "Get a PDF of this analysis" or "Save this scenario" or "Talk to our team about implementing this."
- **Multiple CTAs ranked.** Primary action prominent; secondary action visible but smaller; tertiary action available but not pushy.
- **Email-capture in context.** When the gated tier (PDF, save) is offered, the form appears in context with the result, not in a popup that breaks flow.

**The discipline.**

- The next step should match the audience's likely intent. After a savings calculator, "talk to sales" may be premature; "get a PDF I can share" may match.
- Multiple CTAs should not compete; rank them by likely user intent.
- The next step should be honest. Promising "instant analysis from a specialist" and delivering "we will email you in 5 days" breaks trust.

---

## Result update behavior

When the user adjusts inputs, the result updates.

**Real-time updates.** As the user changes a slider, the result recalculates. Useful for exploration; the audience sees the relationship between inputs and result.

**On-submit updates.** The user adjusts inputs, hits Calculate, sees the new result. Useful for calculators with many inputs where real-time updates would be distracting.

**Hybrid.** Real-time for sliders and toggles; on-submit for full input changes. Common middle ground.

**The choice.** Depends on calculator complexity and the value of input exploration. Calculators that benefit from "what if" exploration favor real-time; calculators that produce a definitive recommendation favor on-submit.

---

## Result-context for share-ability

When users share the result with stakeholders, the result has to be self-contained.

**The principle.** The shared result (PDF, email, screenshot, link) should be interpretable by someone who did not run the calculator.

**What share-able results need.**

- The headline number and what it represents.
- The breakdown so the recipient can verify the math.
- The methodology so the recipient can interrogate the assumptions.
- The inputs so the recipient knows what scenario was modeled.
- Brand attribution so the recipient knows the source.

**The non-shareable result.** "Your savings: $14,200" with no inputs, no methodology, no breakdown. The recipient cannot use this; they ignore it or come back to ask follow-up questions that should not have been necessary.

The shareable result extends the calculator's reach. The audience that shares is bringing the brand into a conversation; make the result strong enough to carry that weight.

---

## Methodology-level choices that stay in the public skill

The presentation principle (specific, contextualized, actionable). Headline number discipline. Breakdown patterns. Visualization patterns and discipline. Scenario comparison. Result-presentation antipatterns. Mobile result presentation. Result-to-action transitions. Result update behavior. Share-ability discipline.

## Implementation choices that stay internal

Specific result-page layouts for specific calculators. Specific visualization libraries and styling. Specific PDF templates for share-able results. Specific brand-voice copy for next-step CTAs. The team's mobile testing benchmarks. These vary by team and calculator.

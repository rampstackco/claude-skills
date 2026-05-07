# Input design patterns

Input necessity, default discipline, input types, progressive disclosure. The friction the audience does not need.

The calculator's inputs are the audience's first interaction with the tool. Bad input design loses users before the calculation runs. Good input design respects the user's time and produces inputs that genuinely affect the math.

---

## The necessity principle

Each input should be necessary for the calculation. Inputs that do not affect the output meaningfully should not be asked for.

**The test.** For each input, ask: does removing this input change the result by a meaningful amount? If no, the input is not necessary; remove it.

**The interrogation-form failure.** Calculators that ask 18 inputs but only use 5 in the math are signaling that the form is collecting sales-qualification data. The audience can tell. Conversion drops; trust drops.

**The honest input set.** Most calculators need 4-10 inputs. Tools asking 15+ inputs almost always have non-essential fields that should move to a separate (later, optional) interaction.

**The exception: meaningful customization.** When inputs do affect the result and the audience values the customization, more inputs are warranted. A pricing calculator that customizes to industry, team size, use case, and feature needs may need 8-12 inputs because each input affects the output.

The discipline. Audit the input set against the actual math. Remove fields that do not affect the result.

---

## Default discipline

Defaults reduce cognitive load. Bad defaults bias the result.

**Honest defaults.** Set defaults to honest, sourced values. "Average company size: 50" if 50 is the median across the audience. "Typical conversion rate: 14 percent" if 14 percent is a defensible benchmark.

**Sourced defaults.** When defaults come from external benchmarks, source them. A footnote or tooltip explaining the default's origin earns trust.

**Adjustable defaults.** The user should be able to override the default with their actual value. Defaults that look hardcoded reduce trust; defaults the user can edit signal that the calculator respects the user's situation.

**Bias-flattering defaults.** Defaults set to flatter the brand's outputs (high savings, low costs) destroy credibility when the user notices. The audience that catches the bias remembers it.

**Default decay.** Defaults need updating as benchmarks shift. A default set in 2022 that has not been touched is stale; the audience that knows the current benchmark sees the gap.

---

## Input types

Choose the right input control for each variable.

**Numeric input.** Free-form number entry. Use for variables that are user-specific and where exact values matter (revenue, customer count, monthly cost). Often warrants a tooltip explaining what the number represents.

**Slider.** Visual range control. Use for percentage estimates and ranges where exact values are not knowable (conversion rate, growth rate, retention). Sliders communicate the range and reduce cognitive load on choosing a precise number.

**Dropdown.** Select from predefined categories. Use for variables that are categorical (industry, region, company size band). Dropdowns prevent invalid inputs and group similar audiences.

**Toggle.** Binary on/off. Use for feature inclusion/exclusion or scenario switching (with implementation / without implementation).

**Stepper.** Increment/decrement controls. Use for small whole-number variables (number of users, number of locations) where the range is bounded.

**Free text.** Open-ended text input. Use sparingly. Free text adds friction and rarely affects calculation; if the calculator needs free text to function, the calculation may be the wrong format.

The choice depends on the variable's nature. The wrong control type adds friction; the right control type makes the input feel natural.

---

## Progressive disclosure

Show only the inputs the user is currently working through.

**The pattern.** The calculator presents 2-4 inputs at a time. The user completes those, the next set appears. Each step builds on the previous.

**When progressive disclosure helps.** When the calculator has 8+ inputs, when input groups are conceptually distinct (company info, then current state, then desired state), or when later inputs depend on earlier choices.

**When progressive disclosure hurts.** When the calculator has 4-6 inputs that the user could complete in 30 seconds, hiding any of them adds friction. Single-page calculators are fine for short input sets.

**Progress indicators.** When the calculator is multi-step, show progress ("Step 2 of 4") so the user knows the time commitment.

**Back navigation.** The user should be able to go back and adjust earlier inputs without losing later ones.

---

## Input grouping and visual flow

Group related inputs visually. The user processes related inputs as a unit.

**Logical groups.**

- Company info (name, size, industry).
- Current state (current cost, current process, current tools).
- Desired state (target outcome, target timeline).
- Configuration choices (tier, options, add-ons).

**Visual cues.**

- Section headers for each group.
- Spacing between groups.
- Consistent input styles within a group.

**Avoid.**

- Mixing unrelated inputs in one section.
- Inconsistent label patterns across the form.
- Required-vs-optional ambiguity (mark required inputs explicitly).

---

## Tooltips and explanations

Inputs that are not self-explanatory need explanation. Inputs that are self-explanatory do not need it.

**When tooltips help.** When the input requires context the user may not have ("Customer Acquisition Cost: the marketing and sales spend per new customer"), when the input has a specific definition that varies by interpretation, or when the default needs sourcing ("Industry average from [source]").

**When tooltips hurt.** When the input is obvious (no tooltip needed for "Number of users"), when the tooltip is marketing rather than explanation, or when the tooltip overwhelms the form visually.

**Tooltip placement.** Inline (right next to the field label) or hover-triggered. Hover-triggered keeps the form clean for users who do not need explanation.

**Tooltip discipline.** Each tooltip should answer one question. Multiple paragraphs in a tooltip signal that the input itself needs redesign.

---

## Validation and error handling

Inputs need validation. Errors need helpful messages.

**Inline validation.** Validate as the user types or after they leave the field. Catch errors at the point of input, not at submission.

**Helpful error messages.** "Number must be greater than 0" beats "Invalid input." "Try a value between 1 and 1000" beats "Out of range."

**Avoid friction.** Validation that rejects too aggressively (rejecting all special characters when only a few cause problems) frustrates users. Error messages that scold ("You must enter...") signal a hostile form.

**Required vs optional.** Mark required inputs explicitly. Optional inputs should be obvious (and rare; if it is not used, why ask).

---

## Mobile input design

Many calculator users are on mobile. The input experience has to work there.

**Mobile-specific considerations.**

- Touch-friendly input sizes (minimum 44x44 pixel touch targets).
- Numeric keyboards for numeric inputs (use input type="number" or appropriate inputmode).
- Sliders sized for thumb interaction.
- Dropdowns that work with native mobile selection.
- Sufficient spacing between inputs to prevent accidental taps.

**Mobile testing.** Test the calculator on actual mobile devices, not just browser dev tools. Real-device behavior often differs.

**Mobile-broken calculator failure.** Calculator works on desktop, breaks on mobile. The mobile audience either bounces or has a worse experience. This failure is common; mobile testing prevents it.

---

## Input examples and worked patterns

**Pattern: company info input set.**

- Company size (dropdown: 1-10, 11-50, 51-200, 201-500, 501-2000, 2000+)
- Industry (dropdown of 8-12 categories)
- Current annual revenue (numeric, optional, with tooltip explaining how it affects calculation)

3 inputs, 30 seconds to complete, all affect the calculation.

**Pattern: current state input set.**

- Current monthly cost (numeric, with tooltip)
- Current team size on the relevant function (numeric)
- Current process (dropdown: manual, partially automated, fully automated)

3 inputs, sets the baseline for the calculation.

**Pattern: desired state input set.**

- Target outcome (dropdown: cost reduction, time savings, revenue lift, all of the above)
- Target timeline (slider: 3 months to 24 months)

2 inputs, sets the goal for the calculation.

Total: 8 inputs across 3 logical groups. Each input affects the math. Defaults reduce friction. Progressive disclosure presents groups one at a time.

---

## Input decay

Inputs need maintenance.

**What decays.**

- Defaults based on benchmarks that have shifted.
- Tooltips referencing tools or terms that have changed.
- Dropdown options that are no longer accurate (industry categories, product tiers).
- Sources cited in tooltips that no longer exist or have moved.

**Maintenance cadence.** Quarterly review of every active calculator's inputs. Update defaults, refresh tooltips, prune stale options.

**The decay-trust connection.** Stale defaults erode trust. The audience notices when "Industry Average: 14 percent (2022)" appears in a 2026 tool.

---

## Common input failures

**Too many inputs.** 15+ inputs signal interrogation rather than calculation. Audit for non-essential fields.

**Bias-flattering defaults.** Defaults that produce favorable outputs for the brand. Audiences notice; trust drops.

**Hardcoded defaults that cannot be changed.** The audience cannot adjust to their actual situation. The calculator feels generic.

**Wrong input type for the variable.** Free text where dropdown would be better; dropdown where slider would be better. Adds friction.

**Missing tooltips on non-obvious inputs.** The audience does not know what the input means; they guess; the result is meaningless.

**Mobile-broken inputs.** Sliders impossible to grab on mobile; dropdowns that overflow; numeric keyboards not triggered.

**Stale defaults.** Benchmarks from years ago; tooltips referencing deprecated tools; dropdown options that no longer match reality.

---

## Methodology-level choices that stay in the public skill

The necessity principle. Default discipline. Input type guidance. Progressive disclosure. Input grouping and visual flow. Tooltip discipline. Validation and error handling. Mobile input design. Input decay and maintenance.

## Implementation choices that stay internal

Specific input sets for specific calculators. Specific default values from the team's data sources. Specific tooltip copy in brand voice. Specific input components and styling. The team's mobile testing benchmarks. These vary by team and calculator.

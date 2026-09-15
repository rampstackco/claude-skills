# From pattern to product implication

The bridge from observation to decision. Implications are where synthesis adds value beyond transcription.

A pattern without an implication is a finding. A finding describes the world; an implication proposes action. Synthesis stops at findings; actionable synthesis reaches implications.

---

## Implications are the writer's analytical work, not what the user said

**The principle.** Users describe their experience; PMs interpret what experience implies for the product.

**Why this matters.** A common synthesis failure is presenting implications as if they came from users. "Users want X" treated as an implication. But users do not always know what would actually solve their problem; they describe symptoms, not solutions.

**Worked example.** A pattern: "Users abandon configuration step 3 because credit card details are not accessible during signup."

- What users said: "I had to stop and find my credit card."
- What users want (per their own description): "Make signup not require credit card details."
- What the implication actually is (PM analytical work): defer the credit-card-requiring step to after first success state, OR remove the credit card requirement at signup, OR allow signup without credit card and request it before paid features.

The implication options surface from analytical interpretation, not from user prescription. Users said the symptom; the PM proposes the system response.

**The discipline.** Frame implications as the team's analytical position grounded in the pattern, not as user requests. "The pattern implies X" rather than "Users want X."

---

## Each pattern can have multiple implications

**The principle.** Synthesis surfaces options; the prioritization decision picks one.

**Worked example.** A pattern: "Free users hit the upgrade prompt before experiencing paid value."

Possible implications:

- Delay the upgrade prompt until after the user has experienced the value-realization moment.
- Show the upgrade prompt earlier but reframe it as exploratory rather than transactional.
- Add a value-realization moment earlier in the free experience to align with the existing prompt timing.
- Remove the upgrade prompt entirely; let users discover paid features through usage.

Each implication is a different product response. The synthesis presents the options; the team's prioritization debate picks one (or sequences several).

**Why multi-implication matters.** Single-implication synthesis presents the synthesizer's preferred solution as if it were the only solution. Multi-implication synthesis surfaces options the team can debate.

**The presentation.** Per pattern, surface 2-4 candidate implications. Acknowledge tradeoffs between them. Recommend if the data supports a recommendation; otherwise present the options for prioritization.

---

## Implications should be falsifiable

**The principle.** A vague implication cannot be acted on or debated. A specific implication can.

**Vague implications.**

- "We should improve onboarding."
- "Pricing should be reconsidered."
- "Mobile experience needs attention."

These are too vague to drive decisions. The team agrees to "improve onboarding" without committing to any specific change.

**Falsifiable implications.**

- "Defer configuration step 3 to after first success state."
- "Add a value-realization moment within the first 90 seconds of signup."
- "Make the homepage hero copy lead with B2B use cases."

These commit specific positions. The team can debate them, scope them, kill them, prioritize them.

**The test.** For each implication, ask: could the team disagree with this and explain why? If the implication is vague enough that disagreement is impossible, the implication is too vague to be useful.

---

## Implications should acknowledge cost

**The principle.** Patterns suggest solutions; solutions cost product capacity. Synthesis that ignores cost produces wishlists.

**The pattern that fails.** Synthesis recommends 30 product changes without acknowledging that delivering them all is impossible. The team takes one or two; the rest sit. The synthesis produced no actionable input because the team had no help prioritizing.

**The pattern that works.** Each implication includes an estimated cost dimension and a recommendation about whether the cost is justified.

- "Defer configuration step 3 (medium engineering cost; high expected impact on signup conversion)."
- "Pre-populate step 3 with sensible defaults (low engineering cost; medium expected impact)."
- "Remove credit card requirement entirely (high cost across systems; uncertain impact)."

The cost annotations help the team prioritize without re-doing the synthesis work.

**The discipline.** PMs doing synthesis usually have enough context to estimate cost roughly. If they do not, they can pair with engineering to estimate. Cost-blind synthesis is incomplete.

---

## Some patterns imply not-acting

**The principle.** Sometimes the pattern reveals friction the team should not address.

**When not-acting is honest.**

- The friction affects too few users to justify the engineering cost.
- The friction reveals segment misfit; the affected users are not the team's target.
- Addressing the friction would compromise other priorities or product positioning.
- The friction is real but the proposed solutions are worse than the problem.

**Worked example.** A pattern: "Enterprise users want admin controls that small-team users do not need."

Implications:

- Build the admin controls (high cost, expands target market).
- Build the admin controls only for the enterprise tier (medium cost, segment-specific).
- Do not build (acknowledges enterprise as not the target segment).

If the team is committed to small-team users as the target market, the not-act implication is honest; building enterprise admin controls would dilute focus.

**The naming discipline.** When the synthesis recommends not-acting, name it explicitly. "The pattern is real but the recommended response is to not address it because [reason]." Buried not-act implications get overlooked; the team adds the unaddressed friction to the next quarter's roadmap because nobody surfaced the not-act case.

---

## Implications that bridge to specific decisions

**The principle.** The strongest implications point to a specific decision the team is making.

**Implication-to-decision mapping.**

- Implication: "Defer configuration step 3."
  - Decision input: should the Q2 roadmap include the onboarding redesign? (Yes, with this approach.)
- Implication: "Add B2B-leading homepage hero."
  - Decision input: should the homepage redesign be prioritized this quarter? (Yes, with positioning shift.)
- Implication: "Do not address enterprise admin controls."
  - Decision input: should enterprise tier be in this year's roadmap? (No; small-team focus continues.)

**Why decision-mapping matters.** Implications floating free of decisions produce a list the team must connect to its prioritization work themselves. Implications mapped to decisions produce direct input.

---

## Implication strength and confidence

**The principle.** Not all implications are equally well-supported.

**Strong implications.**

- Pattern is supported by multiple research types (interviews + tickets + survey).
- Implication has a clear analytical bridge from the pattern.
- Cost is reasonable relative to expected impact.
- Decision input is clear.

**Weaker implications.**

- Pattern is supported by limited evidence (3 interviews; thin volume).
- Implication is one of several plausible options without clear analytical bridge.
- Cost is uncertain.
- Decision input is hedged.

**The discipline.** Synthesis labels implications by strength. Strong ones get presented as recommendations; weaker ones as options for further investigation. The team can prioritize confidently when it knows which implications carry weight.

---

## Common pattern-to-implication failures

**Implications that restate the pattern.** "The pattern shows X. The implication is X." No analytical bridge; no value added.

**Wishlist implications.** Synthesis recommends 30 changes; the team cannot prioritize; one or two ship; the rest sit.

**Implications buried in narrative.** The synthesis discusses the pattern at length; the implication is one sentence at the end. Readers miss it.

**No cost acknowledgment.** Implications presented as if all are equal cost; team has to do the cost analysis itself.

**Skipping the not-act implication.** Synthesis recommends action on every pattern; some patterns warrant not-acting; the synthesis fails to surface this honestly.

**Implications that prescribe specific designs.** Implications should propose product responses, not detailed designs. Detailed designs are for spec writing; implications are the upstream input.

---

## The implication-quality audit

A short framework for auditing implications.

1. Is each implication an analytical proposition, not a user request?
2. Are multiple candidate implications surfaced where appropriate?
3. Is each implication specific enough to be falsifiable?
4. Does each implication acknowledge cost?
5. Where the data supports not-acting, is that surfaced honestly?
6. Does each implication map to a specific decision?
7. Is implication strength labeled?

Synthesis that passes this audit converts research into decisions. Synthesis that fails it produces findings that look like decisions but do not drive them.

---

## Methodology-level choices that stay in the public skill

The implication-as-analytical-work principle. Multi-implication patterns. Falsifiability. Cost acknowledgment. The not-act implication. Decision mapping. Implication strength. Common failures. The audit.

## Implementation choices that stay internal

Specific document templates that surface implications. Specific cost-estimation conventions. Specific cross-functional review patterns for cost validation. The team's own conventions for implication-strength labeling. These vary by team.

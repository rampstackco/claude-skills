# Conditional logic patterns

Show/hide fields, skip steps, adapt language. Strengths, risks, simplicity preference.

Conditional logic responds to earlier answers and removes irrelevant fields. Done well, it makes the form feel adaptive and intelligent. Done poorly, it adds maintenance complexity without improving the user experience.

---

## The relevance principle

Show only fields that are relevant to the user's situation. Skip fields that do not apply.

**The principle's win.** A user who answered "no, I do not have a CRM today" should not be asked "what CRM do you use today" three steps later. The conditional logic removes the friction.

**The principle's risk.** Conditional logic adds maintenance complexity. Each branch has to be tested. Each branch can break. The simplicity preference: add conditional logic only when it produces real value.

---

## Pattern A: Show or hide fields based on previous answers

The most common conditional logic pattern.

**How it works.**

- A field appears or disappears based on the answer to an earlier question.
- "If user selected 'enterprise,' show enterprise-specific fields."
- "If user selected 'has current solution,' show 'current solution name' field."

**Example.**

Question: "Do you currently use a CRM?"
- Yes → show field "Which CRM do you use today?"
- No → hide that field; show "What is your current process for managing customer data?"

The form adapts to the user's situation in real time.

**Strengths.**

- Removes irrelevant fields.
- Makes the form feel intelligent.
- Reduces drop-off because users do not abandon over fields that did not apply.

**Weaknesses.**

- Each branch needs testing.
- Late additions to the form can break conditional logic in unexpected ways.

**When to use.** When showing all fields would be confusing or when irrelevant fields cause significant drop-off.

---

## Pattern B: Skip entire steps

Conditional logic at the step level.

**How it works.**

- Based on early answers, an entire step is skipped or included.
- "If user does not have a current CRM, skip the 'CRM details' step entirely."
- "If user is in healthcare, include the 'compliance requirements' step."

**Strengths.**

- Removes whole sections of irrelevant content.
- Form length adapts to the user.

**Weaknesses.**

- Progress indicators must adapt or honestly disclose variability.
- The user may notice the form's variability and feel confused.

**When to use.** When entire categories of fields are irrelevant to some users (e.g., enterprise-only fields for non-enterprise users).

---

## Pattern C: Adapt the language

Conditional logic that changes terminology based on user context.

**How it works.**

- The form's wording adapts to the user's industry, role, or context.
- "If user is in healthcare, use 'patient' terminology in subsequent fields."
- "If user is technical, use technical terms; if non-technical, use plain language."

**Strengths.**

- Form feels personalized.
- Reduces cognitive load on the user (they see terminology that matches their context).

**Weaknesses.**

- Significantly more copy to maintain.
- Risk of inconsistent or awkward language.

**When to use.** When the audience spans contexts where terminology genuinely differs (B2C vs B2B, technical vs non-technical, regulated vs unregulated industries).

---

## Pattern D: Adapt the destination

Conditional logic that affects what happens after submission.

**How it works.**

- Based on answers, the form routes to different teams or triggers different follow-ups.
- "If user selected 'integration question,' route to the integration team after submission."
- "If user selected 'enterprise,' trigger an enterprise-sales follow-up sequence."

**Strengths.**

- The user gets matched to the right team or sequence.
- Sales and support efficiency improve.

**Weaknesses.**

- Routing complexity grows; failure modes (wrong team, missed routing) increase.
- The user does not see the routing logic; mistakes are invisible to the user but visible in downstream impact.

**When to use.** When the form serves multiple downstream paths and the routing materially affects the user's experience.

---

## Pattern E: Branching forms

Different paths through the form for different users.

**How it works.**

- Based on early answers, the user takes a different path entirely.
- "If user selects 'individual,' show the individual flow; if 'team,' show the team flow."

**Strengths.**

- Highly tailored experience.
- Each user only sees fields relevant to them.

**Weaknesses.**

- Significantly more complex to build and test.
- Hard to compare paths because users took different forms.
- Maintenance is hard.

**When to use.** When the audience genuinely splits into distinct groups that need fundamentally different forms. Use sparingly.

---

## The simplicity preference

Add conditional logic only when it produces real value.

**The discipline.** For each piece of conditional logic, ask:
- Does this remove genuine friction?
- Is the maintenance cost justified by the friction removed?
- Could a simpler approach (single-page with sectioned design) achieve the same goal?

**The over-conditional form.** A form with 25 conditional rules across 8 fields. Each rule individually justifiable; cumulatively, the form is fragile and hard to maintain.

**The cure.** Audit conditional logic periodically. Remove rules that do not justify their maintenance overhead.

---

## Conditional logic and progress indicators

The interaction matters.

**The challenge.** A form with conditional steps may have variable total step count. The progress indicator must accommodate.

**Approaches.**

- **Variable indicator.** "Step 2 of 5-7" or "Step 2 (about halfway)." Communicates the variability.
- **Range indicator.** "Step 2 of about 5." Approximate but honest.
- **Dynamic indicator.** Updates as the user's answers determine the path. Risk of feeling unstable.
- **Step-list indicator.** Shows all possible steps; current step highlighted. Variability visible upfront.

The discipline. Choose an approach that does not lie about progress.

---

## Conditional logic testing

Test every branch of conditional logic.

**The challenge.** A form with 5 conditional rules has 32 possible paths through the form. Testing all paths is infeasible at scale; testing critical paths is the discipline.

**Critical paths.**

- The most common path (most frequent user type).
- Each conditional rule's branch (one path that triggers it, one that does not).
- Edge cases (combinations that could produce unexpected behavior).

**Testing methods.**

- **Manual testing.** Walk through critical paths.
- **Automated testing.** Programmatic tests for each branch.
- **User testing.** Watch users complete the form; surface confusion or paths that break.

**Production monitoring.** Track which paths users take. Sudden shifts may indicate logic issues.

---

## Conditional logic and analytics

Track which conditional branches trigger.

**Why.** Understanding which branches are common informs maintenance priorities. A branch nobody triggers may not be worth maintaining; a branch everyone triggers may not need to be conditional.

**The metric.** Per-branch trigger rate. Per-branch conversion rate.

**The discipline.** Periodically review the data. Retire conditional rules that do not pay off.

---

## Conditional logic and form maintenance

Conditional logic decays.

**What decays.**

- Rules that point to fields that have been renamed or removed.
- Rules that produce paths now unused as the audience shifts.
- Rules whose triggering questions have been reworded.

**Maintenance cadence.** Quarterly audit alongside the broader form audit.

**The drift indicator.** Bug reports about specific paths failing; analytics showing unexpected branching behavior; testing surfaces broken rules.

---

## Common conditional logic failures

**Hidden complexity.** Many rules silently affecting many fields; the form's behavior is hard to reason about.

**Unintended interactions.** Two rules that work individually but conflict when combined.

**Stale rules.** Rules that point to fields no longer in the form.

**Dead branches.** Conditional paths nobody triggers; maintenance overhead with no payoff.

**Indicator-rule mismatch.** Progress indicator that does not handle conditional step count.

**Untested edge cases.** Unusual answer combinations that produce broken paths.

**Rule-driven layout shifts.** Fields appearing and disappearing causing visual jumpiness.

**Over-conditional forms.** 25+ rules across the form; the maintenance burden exceeds the friction-reduction value.

---

## When NOT to use conditional logic

Some situations work better without conditional logic.

**Short forms.** Adding conditional logic to a 5-field form rarely justifies the complexity.

**Forms with stable audiences.** When everyone takes roughly the same path, conditional logic adds variability without value.

**Forms in early stages.** A new form benefits from simplicity before adding complexity. Launch simple; add conditional logic when data shows where it would help.

**Forms with high maintenance constraints.** Teams that cannot maintain complex forms should default to simpler designs.

---

## Methodology-level choices that stay in the public skill

The relevance principle. Patterns A through E with strengths, weaknesses, and when-to-use guidance. The simplicity preference. Conditional logic and progress indicators. Conditional logic testing. Conditional logic and analytics. Maintenance considerations. Common failures. When NOT to use conditional logic.

## Implementation choices that stay internal

Specific conditional rules for specific forms. Specific tooling for rule implementation and testing. The team's audit calendars and rule-retirement processes. These vary by team.

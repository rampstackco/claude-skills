# Step architecture patterns

What belongs on each step. Identity, context, need, detail, confirmation. Sequencing principles.

The architecture is the structure that makes steps coherent. Bad architecture produces progress-theater (decorative steps); good architecture produces genuinely-staged forms (each step is a coherent unit of work).

---

## The coherence principle

Each step should represent a coherent unit of work from the user's perspective.

**The test.** Can the user describe what they just did at the end of the step in one sentence?

- Coherent: "I told you the basics about my company."
- Atomized: "I typed my company name in a field."

Coherent answers signal genuinely-staged. Atomized answers signal progress-theater.

The discipline. Each step should bundle related fields into a single cognitive unit. The user processes the step as a whole, not as 5 isolated fields.

---

## Common step patterns

Patterns that recur across acquisition, onboarding, and intake forms.

**Identity step.** Who the user is.

- Fields: name, email, role.
- Friction level: low.
- Position: opens the form.
- The user provides minimal commitment; the form earns the right to ask for more.

**Context step.** What the user's situation is.

- Fields: company size, industry, current setup, current tools.
- Friction level: medium.
- Position: after Identity, before Need.
- The user shares context that lets the form (or the receiving team) understand them.

**Need step.** What the user is trying to accomplish.

- Fields: goal, challenge, timeline, urgency.
- Friction level: medium-to-high.
- Position: middle of the form.
- The user articulates intent. This step often includes the highest-value fields for the receiving team.

**Detail step.** Specifics needed to act on the user's request.

- Fields: budget, specific requirements, constraints, integrations.
- Friction level: high.
- Position: late in the form.
- The user shares specifics. By this point, commitment is built; the user is more willing to share.

**Confirmation step.** Review and submit.

- Fields: review summary, submission action, optional final fields (preferences, follow-up).
- Friction level: low.
- Position: last.
- The user reviews what they provided and submits.

---

## Sequencing principles

The order of steps matters as much as the steps themselves.

**Principle 1: Low-friction first.** The opening step should be easy to complete. The user invests their first 30-60 seconds in something simple; commitment compounds.

**Principle 2: Commitment compounds.** Each step builds on the previous. The user who completed step 2 is more invested than they were before step 1; later steps can ask for more.

**Principle 3: High-friction at the end.** The most demanding fields (budget, specific requirements, sensitive info) belong later. By that point, the user has invested enough to push through.

**Principle 4: Confirmation explicit.** A final review-and-submit step lets the user verify their inputs. Reduces submission anxiety.

**Anti-pattern: high-friction first.** Asking for budget in step 1 depresses completion. The user has not yet committed; the high-friction question feels premature.

**Anti-pattern: commitment-resetting.** A late step that requires the user to make decisions they thought they had already made. The user feels their earlier work was wasted.

---

## Step coherence test

For each step, ask: can this step be described in one sentence as a unit of work?

**Coherent step examples.**

- "Step 1: tell us who you are." (Identity)
- "Step 2: tell us about your company." (Context)
- "Step 3: tell us what you are trying to accomplish." (Need)
- "Step 4: tell us the specifics so we can help." (Detail)
- "Step 5: review and submit." (Confirmation)

Each step has a coherent description. The user can predict what is coming and feel they accomplished something at the end of each step.

**Incoherent step examples (progress-theater).**

- "Step 1: name and email."
- "Step 2: phone and company."
- "Step 3: role and industry."

Each step is two fields. The fields are unrelated. The grouping is arbitrary. The user wonders why this is multi-step.

---

## Field count per step

How many fields per step is too many or too few.

**Too few.** 1-2 fields per step often signals over-staging. The user wonders why this needed its own step.

**Right range.** 3-7 fields per step. Enough to represent a coherent unit of work; few enough to complete in 30-60 seconds.

**Too many.** 10+ fields per step starts to recreate the kitchen-sink-single-page problem within a step. Audit for non-essential fields.

**The variance.** Some steps may have more fields than others; that is fine if each step's fields cohere. The Detail step often has more fields than the Identity step because it captures more specific information.

---

## Step length variability

Steps do not have to be the same length.

**The pattern.** Identity step: 3 fields. Context step: 5 fields. Need step: 4 fields. Detail step: 7 fields. Confirmation step: 1 action.

The variability is fine because each step represents a coherent unit. The user does not expect equal length; they expect coherence.

**The progress indicator implication.** A step counter ("Step 2 of 5") may not reflect time-to-complete accurately when steps vary. A progress bar based on percentage of fields complete reflects the variability better.

---

## Conditional step inclusion

Some forms include or exclude steps based on earlier answers.

**The pattern.** "If user has a current CRM, include the 'CRM details' step. If not, skip it."

**Strengths.**

- Removes irrelevant fields entirely.
- Makes the form feel adaptive.

**Risks.**

- Progress indicators must accommodate the variability honestly.
- The user may notice the variability and feel confused.

**The discipline.** Use conditional steps when the variability genuinely benefits the user; communicate the dynamic nature in the progress indicator if it shifts.

---

## Step transitions

How the user moves from one step to the next.

**The forward transition.** A clear "Next" or "Continue" button. Validation runs before the transition.

**The backward transition.** A "Back" or "Previous" button. The user can return to earlier steps without losing later inputs.

**The skip transition.** Some forms allow skipping optional steps. Use sparingly; skipping creates inconsistent paths.

**Transition friction.** Each transition should feel snappy. Loading delays at transitions break the flow.

**Transition cues.** Brief visual confirmation that the step changed (slide animation, fade transition). Helps the user understand the navigation.

---

## Step naming

Each step should have a clear name visible to the user.

**Strong step names.**

- "Tell us about you."
- "About your company."
- "What you are looking for."
- "The details."
- "Review and submit."

**Weak step names.**

- "Step 1," "Step 2," "Step 3." (Numbers without names; user does not know what each represents.)
- "Personal Info," "Company Info," "Other Info." (Generic; does not signal what the step is about.)
- "Contact," "Business," "Submission." (Truncated; does not warm the user.)

**The voice match.** Step names should match the brand voice. Casual brands use casual names; serious brands use serious names.

---

## Step architecture for specific use cases

How the architecture varies by form purpose.

**Lead-capture form (5-8 fields).**

- Identity (name, email)
- Context (company, role)
- Need (use case, urgency)

3 steps; the form moves quickly.

**Demo-request form (10-15 fields).**

- Identity (name, work email, role)
- Company (name, size, industry)
- Current state (current solution, key pain points)
- Buying intent (timeline, budget range)
- Confirmation

5 steps; meaningful staging.

**Application form (20+ fields with documents).**

- Identity
- Eligibility (qualifying questions)
- Personal details
- Financial details
- Document upload
- Review
- Submit

7+ steps; long form benefits significantly from staging.

**Onboarding wizard (configuration-driven).**

- Welcome
- Account setup
- Use-case selection
- Preferences
- Connect-your-tools
- Confirmation

6 steps; each step represents a coherent setup unit.

---

## Step architecture audit

Periodically audit the step architecture.

**The audit.**

- Read each step's name. Does it represent a coherent unit?
- Read each step's fields. Do they cohere?
- Check field count per step. Within the 3-7 range?
- Check conversion per step. Are some steps disproportionately drop-off-heavy?

**The drift.** Steps decay as the form evolves. New fields get added to the wrong step; steps become incoherent; field counts drift.

**The cure.** Quarterly audit. Re-group fields into the right steps; remove non-essential fields; restructure if the original architecture no longer fits.

---

## Common architecture failures

**Arbitrary chunking.** Steps that group fields by visual length rather than coherence.

**Atomized steps.** Each step has 1-2 fields; the user wonders why it is multi-step.

**Field-count overload.** Some steps have 15+ fields; recreates the kitchen-sink problem within a step.

**High-friction-first.** Budget or sensitive question in step 1; user is not committed enough to push through.

**Commitment-resetting steps.** Late steps that require the user to make decisions they thought were already made.

**Generic step names.** "Step 1, Step 2" without descriptive names; user cannot predict the form.

**No confirmation step.** Form ends at the data-collection step; user is not given the chance to review.

---

## Methodology-level choices that stay in the public skill

The coherence principle. Common step patterns. Sequencing principles. The step-coherence test. Field count per step. Step length variability. Conditional step inclusion. Step transitions. Step naming. Step architecture for specific use cases. Step-architecture audit. Common failures.

## Implementation choices that stay internal

Specific step architectures for specific forms. Specific step naming in brand voice. Specific tooling for step transitions and validation. The team's audit calendars. These vary by team and form.

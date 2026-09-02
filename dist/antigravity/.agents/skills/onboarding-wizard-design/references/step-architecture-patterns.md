# Step architecture patterns

What belongs in each step. Sequence logic. The step coherence test.

The architecture is the structure that makes wizards work. Bad architecture produces decorative steps that do not move the user closer to value; good architecture converges on the ah-ha moment with discipline.

---

## The convergence principle

Each step should move the user one step closer to value. Steps that do not should be cut.

**The test.** For each step, ask: did this step move the user toward the ah-ha moment? If no, cut it or defer it to in-product help.

**The discipline.** Wizards accumulate steps over time as teams add "while we have them" requests (collect more data, surface more features, etc.). The discipline is to resist accumulation; the wizard's job is convergence, not feature pride.

---

## Common step patterns

Patterns that recur across product onboarding wizards.

**Welcome and orientation.**

- Purpose: set expectations for what the wizard will do.
- Skippable: usually yes, low cost.
- When to include: when the wizard's purpose is not obvious from context.
- When to skip: when the wizard's purpose is obvious; welcome adds friction without value.

**Identity and account context.**

- Purpose: capture who the user is, what brought them here.
- Required fields: minimal. Name and role are often enough.
- When to include: when subsequent steps adapt to identity.
- When to skip: when subsequent steps do not adapt; identity capture is just data collection.

**Critical setup step.**

- Purpose: the one thing the product cannot work without.
- Examples: connect data source, invite first teammate, set primary use case.
- This is often where wizards justify their existence. Without this step, the user lands in an empty product.

**First-action step.**

- Purpose: get the user to take a meaningful action that produces visible result.
- The ah-ha moment lives here or right after.
- Should be guided enough that success is likely; honest enough that the success is real.

**Configuration deferral.**

- Purpose: surface things that can be set up later but are commonly needed.
- Lets the user defer with a clear path back.
- Reduces wizard length without losing coverage.

**Confirmation and next steps.**

- Purpose: recap what was set up; surface what to do next; route to in-product home.
- Closes the wizard cleanly.
- Often skipped in design but useful for orientation.

---

## Step sequencing principles

The order matters as much as the steps themselves.

**Principle 1: Earn the patience.** Open with low-friction steps; the user invests; deeper setup follows. Critical setup demanding effort works better at step 2-3 than step 1.

**Principle 2: Ah-ha moment by step 3-5.** If the wizard runs longer than 5 steps before any visible value, drop-off climbs sharply.

**Principle 3: Deferable last.** Steps that can be deferred should sit late in the wizard, where skip is least costly.

**Principle 4: Confirmation explicit.** Close the wizard with a clear "you are done; here is what's next" step. Without it, users feel dropped.

---

## Step coherence test

For each step, can it be described in one sentence as a unit of work that contributes to the ah-ha moment?

**Coherent steps.**

- Step 1: tell us about your role so we can tailor what comes next.
- Step 2: connect your data source so we can show you something useful.
- Step 3: run your first query and see a result.
- Step 4: save the result so you can return to it.
- Step 5: optionally invite a teammate; otherwise, you are ready.

Each step has clear purpose tied to value.

**Incoherent steps.**

- Step 1: name and email (already collected at signup; redundant).
- Step 2: tour of features (does not move toward action).
- Step 3: branding preferences (irrelevant to ah-ha moment).
- Step 4: marketing opt-in (data collection, not value).

Steps without clear purpose should be cut or deferred.

---

## Step count discipline

How many steps is too many.

**Sweet spot.** Most effective wizards run 3-7 steps. The user can predict completion time; the convergence is tight.

**Too few.** 1-2 steps usually means the wizard format is overkill; contextual prompts often serve better.

**Too many.** 10+ steps signals tutorial-overload. Drop-off climbs sharply; users skip when they can.

**The deferable test.** For wizards exceeding 7 steps, audit each step. Which can be deferred to in-product? Often half can.

---

## Field count per step

Within each step, how many fields.

**3-5 fields per step.** Sweet spot. Coherent unit; completable in 30-60 seconds.

**1-2 fields per step.** Often signals over-staging. The user wonders why the field needed its own step.

**6+ fields per step.** Recreates the kitchen-sink problem within a step. Audit; usually some fields can be cut or deferred.

---

## Branching and conditional steps

When wizards adapt based on earlier answers.

**The pattern.** First step asks about role or use case; subsequent steps adapt.

**Strengths.** The wizard feels relevant; users see only what applies to them.

**Weaknesses.** Maintenance complexity; testing across paths.

**The discipline.** Branch only when the variability genuinely benefits the user. Decorative branching adds cost without lift.

---

## Step transitions

How the user moves between steps.

**Forward transitions.** Clear "Next" or "Continue" CTA. Validation runs before the transition. Snappy; no loading delays.

**Back transitions.** "Back" or "Previous" available. Returning to earlier steps preserves answers.

**Skip transitions.** Skip available but honest about consequences. Skip lands the user in a partially-set-up state with clear callouts to complete deferred setup.

**Loading state.** When the wizard's step requires backend work (connecting data source, processing input), show progress. Silent loading kills momentum.

---

## Step examples by product type

How architecture varies by product.

**B2B SaaS analytics.**

- Welcome → role/use case → connect data source → first query → first saved view → invite team (deferable) → in-product home.

7 steps; meaningful staging; ah-ha at step 5.

**Project management tool.**

- Welcome → workspace setup → first project → first task → invite team → in-product home.

6 steps; ah-ha around step 4.

**Marketing automation.**

- Welcome → connect site → connect data source → first audience → first campaign → in-product home.

6 steps; ah-ha at first audience visualization.

**Consumer note-taking.**

- Probably no wizard. Empty-state prompts and contextual hints serve better.

The patterns vary. The discipline (each step earns its place; ah-ha moment by step 3-5) holds.

---

## Step architecture maintenance

Steps decay. Product changes mean wizard updates.

**Maintenance triggers.**

- Product feature added that the wizard should reference.
- Product feature deprecated that the wizard still references.
- Setup process changed; wizard steps no longer match.
- Audience composition shifted; old role-branching no longer fits.

**Maintenance cadence.** Quarterly review minimum; product changes trigger updates as part of the change.

---

## Common architecture failures

**Decorative steps.** Steps that do not move toward value.

**Tutorial steps.** Steps explaining features the user has not asked about.

**Front-loaded effort.** High-friction step first; users abandon at step 1.

**Late ah-ha moment.** Wizard runs 10 steps before visible value.

**Mandatory steps that should be deferable.** Forces friction users would have accepted later.

**No confirmation step.** User finishes the wizard, lands somewhere unclear.

**Step transitions sluggish.** Loading delays kill momentum.

---

## Methodology-level choices that stay in the public skill

The convergence principle. Common step patterns. Sequencing principles. The step coherence test. Step count discipline. Field count per step. Branching considerations. Step transitions. Step examples by product type. Maintenance discipline. Common failures.

## Implementation choices that stay internal

Specific step architectures for specific products. Specific copy and tone. Specific tooling. Specific testing protocols. The team's audit calendar. These vary by team and product.

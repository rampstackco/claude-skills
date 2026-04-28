---
name: pm-spec-writing
description: "Translate ideas, feature requests, or vague concepts into specific, actionable dev briefs. Use this skill whenever the user has an idea they want to build, a feature to spec out, a bug to file, a project to scope, or needs to convert a half-formed idea into a clear implementation brief. Triggers on I want to add, we should build, can we make, what is the plan for, how do we implement, dev brief, feature spec, PRD, user story, acceptance criteria, scope this, prioritize. Also triggers when the user has a list of things they want to build and needs help converting them into well-formed tasks."
---

# PM Spec Writing

Take an idea (often vague) and turn it into a specification a developer or AI agent can actually build from. Stack-agnostic. Works for new features, bug fixes, content changes, or infrastructure work.

---

## When to use

- Translating an idea into a buildable feature spec
- Writing a PRD or product requirement document
- Filing a bug report that someone else can act on
- Scoping a project before kickoff
- Prioritizing a backlog of feature requests
- Writing acceptance criteria for an existing feature
- Breaking a large initiative into shippable increments

## When NOT to use

- Quarterly or annual planning across multiple initiatives (use `roadmap-planning`)
- Code review or debugging existing code (use `code-review-web`)
- Design decisions for a feature already specced (use `design-standards`)
- User research to validate an idea (use `ux-research`)

---

## Required inputs

- The idea, request, or problem being addressed
- The audience or user affected
- Any existing constraints (stack, deadlines, dependencies)
- The success metric (how will you know it worked?)

If the idea is vague, the workflow's first step is clarification. Do not write specs around vagueness.

---

## The framework: 4 phases

Every PM workflow follows the same arc. The phases are universal even if the specific outputs vary.

### Phase 1: Clarify the idea

Before any spec, answer four questions. If any answer is "I don't know," go back to the user.

1. **What user problem does this solve?** Not "what does it do." The problem comes first; the feature is the proposed solution.
2. **Who specifically benefits?** Be precise. "Users" is not specific. "First-time visitors who don't convert" is.
3. **What is the success metric?** How will you know it worked? Pick one primary metric.
4. **Why now?** What changed that makes this the right time to build it? If "nothing changed," it might not be the right time.

### Phase 2: Scope by impact and effort

Plot every candidate idea on the impact/effort grid:

```
HIGH IMPACT / LOW EFFORT       Ship immediately
  Examples: copy fixes, contrast fixes, meta tags,
            broken links, missing alt text, redirects

HIGH IMPACT / HIGH EFFORT      Plan and batch
  Examples: new page type, new feature, schema overhaul,
            major redesign, new integration

LOW IMPACT / LOW EFFORT        Nice-to-have batch
  Examples: tooltip improvements, minor copy polish,
            cosmetic UX touches

LOW IMPACT / HIGH EFFORT       Skip or defer indefinitely
  Examples: rebuilding what already works, exotic
            edge case features, premature optimization
```

This is not a perfect framework. Some "low impact" things are mandatory (compliance, accessibility, security). Note exceptions.

### Phase 3: Write the spec

Three formats based on the type of work.

#### Format A: Feature spec (for new features)

```
TITLE: [Specific, action-oriented]

PROBLEM
[1-2 sentences. The user problem and current state.]

USERS
[Who specifically benefits. Be precise about the user segment.]

PROPOSAL
[1 paragraph. The proposed solution. Stay at the conceptual level.]

USER STORIES
- As a [user type], I want to [action], so that [outcome]
- As a [user type], I want to [action], so that [outcome]

ACCEPTANCE CRITERIA
- Given [context], when [action], then [expected outcome]
- Given [context], when [action], then [expected outcome]

OUT OF SCOPE
[What this spec explicitly does NOT cover. Important for scope control.]

DEPENDENCIES
[Other systems, APIs, designs, content needed before this can ship.]

SUCCESS METRIC
[The one primary metric that tells us this worked. With current baseline if known.]

ESTIMATED EFFORT
[Small (hours) / Medium (1-3 days) / Large (1-2 weeks) / XL (sprints)]

PRIORITY
[P0 launch blocker / P1 next sprint / P2 within quarter / P3 backlog]
```

#### Format B: Dev brief (for handing to a developer or AI agent)

For tactical, ready-to-build work. Lighter than a full spec.

```
CONTEXT: [1-2 sentences explaining why this matters]

TASK: [Specific files, exact changes needed]

CONSTRAINTS: [What must NOT change, what to preserve]

VERIFY: [Exact steps to confirm the work is done correctly]
```

The verify section is the most-skipped and most-important. Without it, "done" means whatever the implementer thinks done means.

#### Format C: Bug report

```
URL or context: [Where it happens]

Symptom: [What the user sees or experiences]

Expected: [What should happen instead]

Steps to reproduce:
1. [Specific step]
2. [Specific step]
3. [Specific step]

Hypothesis: [Likely root cause if known]

Files to investigate: [Likely files involved if known]

Priority:
  P0 - blocking critical user flow, ship immediately
  P1 - degrades UX significantly, fix this sprint
  P2 - minor issue, fix when convenient
  P3 - nice-to-have improvement

Browser/device: [If reproducibility might be browser-specific]
```

### Phase 4: Sequence and ship

Specs without sequencing become dust on a shelf.

For a single feature: identify the smallest shippable increment. What is the smallest version that delivers user value? Ship that first. Then iterate.

For a backlog: order by dependencies first, then by priority, then by impact/effort. The order matters more than the priority labels.

---

## Workflow

1. **Clarify.** If the idea is vague, ask the four phase-1 questions before proceeding.
2. **Scope.** Plot the work on the impact/effort grid.
3. **Pick the right format.** Feature spec for new features, dev brief for tactical work, bug report for defects.
4. **Write the spec.** Use the template format. Fill in every section. Empty sections are flags.
5. **Define done.** Verify steps must be unambiguous. "Test it" is not a verify step.
6. **Get buy-in.** Walk through the spec with whoever will build it before they start.
7. **Sequence.** Identify the smallest shippable increment.

---

## Failure patterns

- **Specs that describe solutions before problems.** Always start with the user problem. The solution is downstream.
- **Specs without a success metric.** Without a metric, you cannot tell if the feature worked.
- **Acceptance criteria that are not testable.** "User experience is improved" is not testable. "User completes signup in under 60 seconds" is.
- **Specs that include the "how" instead of the "what."** Implementation details belong in the dev brief, not the spec. The spec is the desired outcome.
- **No "out of scope" section.** Without explicit boundaries, scope creeps.
- **Bug reports without reproduction steps.** Cannot be acted on. Always include steps.
- **Verify steps that are vague.** "Make sure it works." Useless. Must be specific actions with observable outcomes.
- **Skipping the smallest-shippable-increment exercise.** Leads to 6-month projects that should have been 2-week experiments.

---

## Output format

Output is one of three formats based on work type, all in markdown:

- `spec-[feature-name].md` for feature specs
- `brief-[task-name].md` for dev briefs
- `bug-[summary].md` for bug reports

For larger initiatives, group related specs in a folder:
```
specs/
  initiative-name/
    spec-feature-1.md
    spec-feature-2.md
    brief-task-1.md
    README.md   (overview and sequencing)
```

---

## Reference files

- `references/feature-spec-template.md` - Full feature spec template.
- `references/dev-brief-template.md` - Compact dev brief template for tactical work.
- `references/prioritization-frameworks.md` - Beyond impact/effort: RICE, weighted scoring, MoSCoW.

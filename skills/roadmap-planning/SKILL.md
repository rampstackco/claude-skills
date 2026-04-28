---
name: roadmap-planning
description: "Build a multi-quarter roadmap from a backlog of ideas, requests, and ongoing initiatives. Use this skill when planning the next quarter, sequencing dependent work, balancing build vs improve vs maintain, or making the case for what NOT to do. Triggers on roadmap, quarterly planning, what should we build next, sequencing, prioritization, OKR planning, capacity planning, what's on the roadmap, plan the year, what to ship next quarter. Also triggers when stakeholders are pulling in different directions and the team needs a defensible plan."
---

# Roadmap Planning

Take a pile of ideas, requests, and ongoing work. Produce a defensible plan for what to ship, when, and why. The output is a roadmap document plus the prioritization work that made it credible.

---

## When to use

- Planning the next quarter or the next year
- Sequencing work where some items depend on others
- Balancing new builds, improvements, and maintenance
- Saying no (or "not yet") to specific requests with a defensible reason
- Aligning a team around a single shared plan
- Communicating the plan to stakeholders outside the team
- Replanning after a strategy shift, a missed quarter, or new constraints

## When NOT to use

- Specifying a single feature for development (use `pm-spec-writing`)
- Validating whether the idea is worth building (use `ux-research`)
- Designing the feature itself (use `design-standards`)
- Writing the launch plan for a single initiative (use `launch-runbook`)
- Reviewing what shipped vs what was promised (use `after-action-report`)

---

## Required inputs

- The team's strategy or top-level goals (1 to 5 OKRs, themes, or pillars)
- The backlog: every candidate item, with at least a one-sentence description
- The team's capacity (people × time)
- Known constraints (deadlines, dependencies, hiring, budget)
- The planning horizon (a quarter, two quarters, a year)

If the strategy is missing, the roadmap will be a list of features, not a plan. Push back and get the strategy first. A roadmap without strategy is just a queue.

---

## The framework: 5 layers

Roadmaps fail at five different layers. A roadmap is only as good as its weakest one.

### Layer 1: Themes (the WHY)

Top-level groupings tied to strategy. Every theme answers: "If we do nothing else this period, this is the outcome we want."

Good themes are:
- Outcome-shaped, not feature-shaped ("Reduce time-to-first-value" beats "Build onboarding")
- Limited (3 to 5 max)
- Defensible (you can explain why this and not something else)
- Measurable (each maps to one or two metrics)

Bad themes look like a junk drawer: "Improvements," "Tech debt," "Misc." If it can't be defended in one sentence, it isn't a theme.

### Layer 2: Initiatives (the WHAT)

Multi-week or multi-month efforts that ladder up to a theme. Each initiative is bigger than a feature but smaller than a theme. Initiatives have:

- A clear outcome (the metric or result it should produce)
- A rough size (S / M / L / XL)
- A confidence rating (how sure are we this is the right initiative?)
- A dependency map (what has to happen first)

Initiatives are where stakeholders push hard. Resist the urge to commit to dates here. Commit to outcomes and rough sizes.

### Layer 3: Sequencing (the WHEN)

The order things happen. Sequencing is constrained by:

- **Dependencies** (X must finish before Y can start)
- **Capacity** (the team can do N things at once)
- **Calendar reality** (Q4 has fewer working days, certain teams have hiring gaps)
- **Strategic windows** (some launches need to land before a season, conference, or competitive moment)

Build the sequence after the prioritization. Putting things in time-order before deciding what matters produces a plan optimized for calendar fit, not impact.

### Layer 4: Capacity reality (the HOW MUCH)

Most roadmaps fail here. The plan looks good on paper but assumes 100% of every person's time on roadmap work. Real capacity is much lower.

Default capacity assumptions:

- Engineers: 60-70% of time on roadmap initiatives. The rest is meetings, reviews, on-call, support, interviews, debugging, ramp-up.
- Designers: 50-60%. Same reasons plus more cross-team support.
- PMs: 40-50%. The rest is planning, comms, stakeholder management, async writing.
- New hires: assume 50% of full capacity for the first quarter, 75% for the second, 100% from Q3 on.
- On-call rotations, leave, holidays: subtract before sizing.

If the math says the plan needs 100% of the team, the plan is wrong. Cut.

### Layer 5: Trade-off communication (the WHY NOT)

Every roadmap has a "Not now" list as important as the "Doing" list. The "Not now" is what makes the plan defensible.

Include:
- The top requests you considered and rejected
- The reason for each rejection (not the right time, not the right size, conflicts with theme, lower expected impact)
- The condition that would make it move into "Doing" (a metric, a date, a finished prerequisite)

Stakeholders pushing for cut items can argue against the rejection criteria, not the omission. That's a productive argument.

---

## Workflow

### Step 1: Anchor the strategy

Before touching the backlog, write down 3 to 5 themes. If the team's OKRs or strategy doc gives you these, copy them. If not, draft them and validate with the people who own strategy.

If the strategy is missing or vague, stop. Producing a roadmap against an unclear strategy is worse than producing nothing. Surface the gap.

### Step 2: Catalog the backlog

Every candidate gets:
- Name (one phrase)
- Theme it ladders up to (or "no theme" - flag for later)
- Source (request, OKR, retro, customer feedback, leadership ask, technical need)
- Rough size (S / M / L / XL)
- Owner or proposed owner
- Status (idea, validated, scoped, ready)

Items with "no theme" are warning flags. Either the theme list is incomplete, or the item should be cut.

### Step 3: Prioritize within each theme

Inside each theme, rank the initiatives. Use one prioritization framework consistently. Common ones:

- **RICE** (Reach × Impact × Confidence ÷ Effort): good for feature-heavy roadmaps
- **MoSCoW** (Must / Should / Could / Won't): good for fixed-deadline projects
- **Kano** (Threshold / Performance / Excitement): good for product investment decisions
- **Cost of delay**: good when timing matters more than effort
- **Strategic alignment + impact**: good for executive-facing roadmaps

The framework matters less than the consistency. Pick one. Use it the same way for every initiative. Document the math.

See `references/prioritization-frameworks.md` for the full breakdown.

### Step 4: Build the dependency map

For every "Doing" initiative, list what must happen first:
- Other initiatives
- Hiring
- External dependencies (vendor delivery, partner readiness)
- Research or validation work
- Infrastructure or platform readiness

Visualize as a graph or a Gantt-style sequence. Items with no dependencies can start immediately. Items with multiple unmet dependencies are warning flags.

### Step 5: Lay out the sequence

Now place initiatives in time. Use the dependency map. Use the capacity math. Match initiatives to people who can actually do them.

Default cadence: month-by-month for one quarter, quarter-by-quarter beyond that. Weekly is too granular for most roadmaps. Half-year buckets are too vague to commit to.

### Step 6: Validate with the team

Before sharing externally, validate with the people doing the work:
- Are the size estimates realistic?
- Are the dependencies correctly mapped?
- Are the capacity assumptions accurate?
- Is anyone overcommitted?

If the team says the plan is impossible, the plan is impossible. Adjust. Going to leadership with a plan the team disagrees with is how trust gets broken.

### Step 7: Write the "Not now" list

For every "Doing" item, name what got cut to make room. Document why. Document the trigger that would move it to "Doing" later.

### Step 8: Communicate

Different audiences need different views:

- **Team:** detailed sequence, owners, dependencies, sizes
- **Cross-functional partners:** themes, initiatives, rough timing, what they need to provide
- **Leadership:** themes, expected outcomes, key initiatives, top trade-offs
- **Public or customer-facing:** themes, no specific dates, "what to expect"

The same roadmap should produce all four. If it can't, the roadmap is incomplete.

---

## Failure patterns

**A list of features instead of a plan.** Themes are missing. The roadmap is a backlog with months attached. Fix: start over from strategy.

**Date-driven thinking.** "What can we ship by end of Q2?" instead of "What is the most important thing to do in Q2?" Dates are constraints, not goals.

**Capacity fantasy.** The plan adds up to 100% of every person's time. No room for support, interrupts, planning, or unknown unknowns. Roadmap dies in week three.

**Stakeholder pressure overrides strategy.** A loud customer or executive request gets prioritized because they pushed hard, not because it ladders up. The "Not now" list saves you here.

**Missing dependencies.** Initiative B depends on initiative A, but A is scheduled later. Or A depends on a hire that hasn't happened. The plan looks fine until execution starts.

**Too far out.** Specific commitments six months out create promises the team can't keep. Use ranges or themes for far horizons, specifics for near horizons.

**One framework for every level.** RICE for the whole roadmap including platform work, infra, and exploration. RICE is great for features, weak for foundational work. Use different lenses for different initiative types.

**No "Not now."** Stakeholders rediscover their cut requests every two weeks because there's no record of why they were cut. Document once, point to it forever.

---

## Output format

The roadmap document includes:

- **Strategy summary** (1 page or section): themes, why these themes, how they ladder to top-level goals
- **The plan** (the visual): a quarter-by-quarter or month-by-month view, color-coded by theme
- **Initiative briefs** (one per initiative): outcome, size, owner, dependencies, success metric
- **Capacity model**: who is doing what, with utilization math
- **Trade-offs and "Not now"**: top items considered and rejected, with reasons
- **Risks and assumptions**: what could derail the plan
- **Update cadence**: when the roadmap will be revisited (monthly is typical)

The roadmap is a living document. Plan to revisit it monthly. Replan it formally each quarter. Do not treat it as a contract.

---

## Reference files

- `references/prioritization-frameworks.md` - Detailed breakdown of RICE, MoSCoW, Kano, Cost of Delay, and Strategic Alignment frameworks. When to use each, how to apply them, common mistakes.

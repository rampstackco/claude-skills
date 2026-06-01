---
name: jtbd-framing
description: "The Jobs-to-be-Done framework as applied product methodology. Job statements, struggling moments, hire and fire criteria, the difference between feature-thinking and job-thinking. Honest about where JTBD adds clarity (discovery, prioritization, positioning) and where it becomes performative ritual (job-statement workshops that do not drive decisions, persona-theater disguised as JTBD). Triggers on jobs-to-be-done, JTBD, job statements, struggling moments, hire criteria, fire criteria, switch triggers, functional emotional social jobs, outcome-driven innovation. Also triggers when a team is over-relying on feature-request lists or persona archetypes that do not drive product decisions, when a positioning conversation needs the framing JTBD provides, or when discovery is producing outputs that do not connect to product strategy."
category: product
catalog_summary: "Jobs-to-be-Done framework. Job statements, struggling moments, hire/fire criteria, the difference between feature-thinking and job-thinking. Honest about where JTBD earns its keep and where it becomes performative"
display_order: 11
---

# Jobs-to-be-Done Framing

A senior product leader's playbook for the Jobs-to-be-Done framework as applied methodology. Job statements, struggling moments, hire and fire criteria, the difference between feature-thinking and job-thinking. Honest about where JTBD adds clarity and where it becomes performative ritual.

JTBD has become one of the more cited and less practiced frameworks in product. Teams cite it in strategy docs, run job-statement workshops, produce wall-sized artifacts, and continue building from feature requests and persona archetypes the next quarter. The methodology gets the credit; the practice gets skipped.

This skill is JTBD as applied product methodology. The framework's actual contribution: surfacing what users are trying to ACCOMPLISH (the job) rather than treating users as preference-aggregators (feature requests) or demographic archetypes (persona theater). When the framing is grounded in struggling moments and hire/fire criteria, it produces decisions; when it stops at the job-statement worksheet, it produces ritual.

This skill is honest about both modes. JTBD genuinely earns its keep in discovery, prioritization, and positioning when applied with rigor. It becomes ceremony when teams treat job statements as deliverables rather than as analytical tools.

The voice is the senior product leader who has used JTBD well and watched plenty of teams use it badly. Concrete, opinionated about what the framework actually contributes, willing to call out where it gets oversold.

When to use this skill: applying JTBD to a discovery cycle, replacing persona-driven prioritization with job-driven prioritization, reframing positioning around what users hire the product to do, or auditing whether existing JTBD work in the org is driving decisions.

---

## What this skill is for

This skill spans JTBD as a framing technique within product work. The PM-skill distinction:

- `discovery-research-synthesis` is broader synthesis discipline; JTBD is one framing technique within it.
- **`jtbd-framing` (this skill)** is the specific JTBD methodology, its strengths, and its failure modes.
- `pm-spec-writing` is downstream: specs reference jobs as input.
- `creative-direction` is positioning territory; JTBD informs positioning but does not replace creative direction.
- `roadmap-planning` is downstream: roadmap can be organized around jobs rather than features.

The audience: senior PMs, product directors, product strategists, agencies running discovery and positioning work, in-house teams considering or already using JTBD.

What is not in scope: other product strategy frameworks (Wardley mapping, North Star, OKRs); the broader synthesis discipline (`discovery-research-synthesis` covers it); the demographic-persona work that sometimes gets confused with JTBD.

---

## Feature-request-list vs persona-theater vs job-framing

The keystone framing.

**Feature-request-list.** "Users want X, Y, Z." Treats users as preference-aggregators. The product team builds the most-requested features. Output: a product that satisfies stated preferences but misses what users were actually trying to accomplish. Users do not always know what would solve their problem; they describe symptoms, not solutions. Feature-list-driven products often improve incrementally without becoming meaningfully better.

**Persona-theater.** Demographic personas with cute names. "Marketing Manager Maria, 35, urban, Pinterest user, drinks oat milk lattes." Decorative, not decision-driving. Persona characteristics rarely correlate with what the user needs from the product; demographic detail substitutes for behavioral insight. Personas in the wild often live as wall posters that nobody references in actual prioritization debates.

**Job-framing.** Users hire products to do jobs. The job is what the user is trying to accomplish, not who the user is or what features they request. The framing surfaces struggling moments (when do users feel pulled toward an alternative); hire criteria (what makes them adopt a product); fire criteria (what makes them switch away). Output: product decisions grounded in user motivation rather than user description.

The litmus test. Take a product decision the team is debating. Can JTBD ground the decision? "Should we build feature X?" Reframed: "What job would feature X help users do? What job is currently done badly that this addresses?" If the JTBD framing produces clearer arguments on both sides, the framing is earning its keep. If the JTBD framing just adds vocabulary without resolving the debate, the framing is ritual.

---

## The job statement structure

The canonical structure: "When [situation], I want to [motivation], so I can [outcome]."

**Situation.** The context, trigger, or moment when the job becomes active. Not a demographic; a moment.

- "When my team is rolling out a new feature and I need to communicate it to customers..."
- "When I am preparing the quarterly board deck..."
- "When I get a customer escalation outside of business hours..."

**Motivation.** What the user is trying to do in that situation.

- "...I want to write a clear announcement that explains what changed and why it matters..."
- "...I want to assemble revenue and engagement data into a coherent narrative..."
- "...I want to triage and respond without disrupting my evening too much..."

**Outcome.** What success looks like; what the user is trying to achieve by doing the job.

- "...so I can ship the rollout without flooding support with confusion."
- "...so I can answer the board's likely questions before they ask them."
- "...so I can address the customer's concern while still being present at home."

The structure forces specificity at all three levels. Vague situations, vague motivations, or vague outcomes produce job statements that drive nothing.

Detail in [`references/job-statement-structure-patterns.md`](references/job-statement-structure-patterns.md).

---

## Identifying struggling moments

Jobs become visible at struggling moments: when the user's current solution is failing them, when the alternative tools they have feel inadequate, when they would actively prefer a different way of doing the job.

**The signal.** Users describe friction in their current approach. They describe workarounds. They describe wishing they had something better. They describe specific moments when the current approach broke down.

**The methodology.** Discovery interviews surface struggling moments through specific prompts: "Walk me through the last time you did X." "What was hardest about that?" "What would you have done differently if you could?" Specific recent moments produce richer data than abstracted descriptions of "how I usually do this."

**The pattern recognition.** Across many users, struggling moments cluster. The same kinds of friction recur. The clusters reveal the jobs that are not currently being done well in the market.

**The pitfall.** Teams that interview without grounding in specific moments produce abstracted job descriptions that cannot drive decisions. "Users want to be more productive" is not a struggling moment; "I lost an hour on Tuesday assembling the board metrics from three different dashboards because none of them had the slice I needed" is.

Detail in [`references/identifying-struggling-moments.md`](references/identifying-struggling-moments.md).

---

## Hire and fire criteria

Why users adopt a product (hire), why they switch away (fire). The two questions ground the framework in real decisions users make.

**Hire criteria.**

- The struggling moment the user is trying to solve.
- The alternatives they considered or tried first.
- What made the chosen product the answer (vs the alternatives).
- The expected job output: what the user expected to accomplish with the product.

**Fire criteria.**

- The struggling moment that recurred even with the chosen product.
- The alternative that started looking better.
- What tipped the user from "considering switching" to "switching."
- The job output that the chosen product failed to deliver consistently.

**Why hire/fire matters.**

- Hire criteria reveal what the product needs to be excellent at to win adoption.
- Fire criteria reveal what the product needs to maintain to retain users.
- The two are often different: features that win adoption are not always the features that prevent churn.

**The methodology.** Customer interviews surface hire/fire through specific prompts: "What were you doing before you adopted X?" "What made you switch?" "If you switched away from X tomorrow, what would the trigger be?" Recent switch decisions are particularly rich; users remember the specific moment.

Detail in [`references/hire-and-fire-criteria.md`](references/hire-and-fire-criteria.md).

---

## Functional, emotional, and social dimensions of jobs

Jobs have three dimensions. Strong JTBD work surfaces all three; weak work treats jobs as functional only.

**Functional dimension.** What the user is mechanically trying to accomplish.

- "Assemble the quarterly board deck."
- "Track team OKR progress."
- "Onboard a new engineer to the codebase."

**Emotional dimension.** How the user feels (or wants to feel) doing the job.

- "Confident that the deck represents the team's actual progress, not a polished version."
- "In control of the OKR check-in cadence, not behind on it."
- "Helpful to the new engineer without becoming their full-time guide."

**Social dimension.** How the user wants to be perceived doing the job.

- "Seen by the board as a competent leader who knows the numbers."
- "Seen by direct reports as someone who follows through on commitments."
- "Seen by the new engineer as a senior who invested in their onboarding."

**Why three dimensions matter.**

- Products that win on functional alone often lose to alternatives that also serve emotional and social.
- Some product decisions hinge on emotional dimensions ("the user wants to feel in control"); functional analysis alone misses these.
- Social dimensions inform positioning more than functional descriptions do.

**The discipline.** For each job statement, ask the three dimensions explicitly. Most early job statements are functional-only; the addition of emotional and social often reveals what the product actually needs to address.

Detail in [`references/functional-emotional-social-dimensions.md`](references/functional-emotional-social-dimensions.md).

---

## Where JTBD adds clarity vs where it becomes ritual

The honest framing.

**Where JTBD genuinely earns its keep.**

- **Discovery.** When research is grounded in struggling moments and hire/fire decisions, JTBD surfaces the user motivation that feature-list discovery misses. Discovery interviews structured around jobs produce richer data than ones structured around feature preferences.
- **Prioritization.** When the team is debating which work to prioritize, jobs ground the debate in what users are trying to accomplish. "Does this work help users do an important job better?" cuts through the politics of feature-request prioritization.
- **Positioning.** When marketing or sales is articulating what the product does, jobs frame the product as a way of accomplishing something the customer cares about, rather than as a feature list.

**Where JTBD becomes ritual.**

- **Job-statement workshops as deliverables.** The team runs a workshop, produces a wall of job statements, and never references the artifacts in subsequent decisions. The workshop became the deliverable; the analytical work did not happen.
- **Job statements substituted for personas without analytical rigor.** "We have JTBD now" but the team treats job statements as named characters (Job Bob, Job Alice) instead of as analytical tools.
- **Mandatory JTBD for every product question.** Every meeting starts with "what's the job?" Even when the question does not benefit from the framing. The methodology becomes a tax rather than a tool.
- **JTBD as compliance.** The org adopts JTBD because a leadership book or conference talk endorsed it; teams produce JTBD artifacts to show they are using the framework; nobody actually uses the framework to decide.

**The honest signal.** If the team can show how a recent product decision was different because of JTBD analysis, the framework is earning its keep. If the team uses JTBD vocabulary but cannot trace decisions to JTBD analysis, the framework is ritual.

---

## Applying JTBD to discovery, prioritization, positioning

The three modes where JTBD genuinely contributes.

**Discovery.** Structure interviews around recent struggling moments, hire decisions, and fire decisions. Gather job statements after the interviews from the data, not before. Cluster jobs across users. Name jobs from the clusters. Pair with `discovery-research-synthesis` for the broader synthesis discipline.

Detail in [`references/applying-jtbd-to-discovery.md`](references/applying-jtbd-to-discovery.md).

**Prioritization.** When evaluating roadmap candidates, frame each candidate by the job(s) it addresses. Ask: which jobs is the product currently doing badly? Which candidates address those jobs vs adjacent or unrelated work? Pair with `roadmap-planning` for the broader prioritization discipline.

Detail in [`references/applying-jtbd-to-prioritization.md`](references/applying-jtbd-to-prioritization.md).

**Positioning.** When articulating what the product is for, lead with the job rather than the features. "Help product teams synthesize discovery research into decisions" is a job framing; "AI-powered research synthesis with collaboration tools" is a feature framing. Pair with `creative-direction` and `brand-discovery` for the broader positioning work.

Detail in [`references/applying-jtbd-to-positioning.md`](references/applying-jtbd-to-positioning.md).

---

## Common failure modes

Rapid-fire. Diagnoses in [`references/common-jtbd-failures.md`](references/common-jtbd-failures.md).

- "We did the JTBD workshop but nothing changed in our roadmap." Job-statement workshop as deliverable; no analytical work after the workshop.
- "Our job statements all sound the same." Generic job statements; not grounded in specific struggling moments. Re-ground in interview data.
- "Our jobs read like feature requests." "When I am using product X, I want feature Y" is not a job; the job is what the user was trying to accomplish, independent of the product.
- "We have personas and jobs and they contradict each other." Personas are demographic; jobs are situational. They do not have to align; if they conflict, jobs usually carry more decision weight.
- "JTBD says we should build everything." Without prioritization across jobs, JTBD identifies many opportunities and does not pick. Pair with prioritization discipline.
- "We dropped JTBD because it became theater." Common; the recovery is JTBD as analytical tool, not JTBD as ritual. Use the framework where it earns its keep; do not force it everywhere.
- "Our job statements are functional only." Add emotional and social dimensions; many product decisions hinge on the latter two.
- "We cannot agree on the job." Often signals different segments with different jobs. Surface the segment differences.
- "Our marketing copy uses JTBD vocabulary but our product does not." Positioning-product gap; the marketing claim is not load-bearing in product decisions.

---

## The framework: 12 considerations for JTBD framing

When applying JTBD or auditing JTBD work, walk these 12 considerations.

1. **Job-framing, not feature-list or persona-theater.** Users hire products to accomplish jobs.
2. **Job statement structure: situation, motivation, outcome.** Specific at all three levels.
3. **Struggling moments ground the jobs.** Specific recent moments, not abstractions.
4. **Hire criteria identified.** What makes users adopt the product over alternatives.
5. **Fire criteria identified.** What makes users switch away (or would).
6. **Functional, emotional, social dimensions surfaced.** All three; not functional only.
7. **Jobs derived from data, not workshop output.** Job statements emerge from interview data, not from whiteboard sessions.
8. **JTBD applied where it earns its keep.** Discovery, prioritization, positioning. Not as ritual.
9. **Segment differences in jobs surfaced.** When the same product is hired for different jobs by different segments.
10. **Decisions traceable to JTBD analysis.** Each major decision can be explained through the job framing.
11. **JTBD vocabulary not substituted for analytical work.** Vocabulary without analysis is ritual.
12. **Honest assessment of where JTBD does not help.** Some questions do not benefit from the framing; force-fitting produces ritual.

The output of the framework is product decisions grounded in user motivation rather than user description, with the framing applied where it adds clarity and held back where it would become ritual.

---

## Reference files

- [`references/job-statement-structure-patterns.md`](references/job-statement-structure-patterns.md) - The situation/motivation/outcome structure with worked examples. Common structural failures (vague situations, motivation as feature request, outcome as feature output).
- [`references/identifying-struggling-moments.md`](references/identifying-struggling-moments.md) - Discovery prompts that surface struggling moments. Pattern recognition across users. The specific-moment vs abstraction distinction.
- [`references/hire-and-fire-criteria.md`](references/hire-and-fire-criteria.md) - Methodology for surfacing hire and fire criteria. Why the two are often different. Recent-switch interview discipline.
- [`references/functional-emotional-social-dimensions.md`](references/functional-emotional-social-dimensions.md) - Three dimensions per job. Why functional-only fails. Worked examples per dimension. Positioning implications of social dimension.
- [`references/applying-jtbd-to-discovery.md`](references/applying-jtbd-to-discovery.md) - Discovery interview structure around jobs. Job clustering. Naming jobs from data. Pair with discovery-research-synthesis.
- [`references/applying-jtbd-to-prioritization.md`](references/applying-jtbd-to-prioritization.md) - Prioritizing roadmap candidates by jobs. Identifying which jobs are done badly. Pair with roadmap-planning.
- [`references/applying-jtbd-to-positioning.md`](references/applying-jtbd-to-positioning.md) - Job-led positioning vs feature-led positioning. Lead with what the product helps users accomplish. Pair with creative-direction.
- [`references/common-jtbd-failures.md`](references/common-jtbd-failures.md) - 9+ failure patterns with diagnoses and cures. The cross-cutting pattern: JTBD as ritual vs JTBD as analytical tool.

---

## Closing: jobs over features

The Jobs-to-be-Done framework is one of the most useful product methodologies available when applied with rigor, and one of the most performative when applied as ritual. The difference is in whether the framework drives decisions or decorates documentation.

Jobs over features is a real shift in product thinking. Feature-list discovery treats users as preference-aggregators; persona archetypes treat users as demographic categories; job-framing treats users as people trying to accomplish things, where the product is one tool they hire (or fire) for the job.

The teams that benefit from JTBD are the ones that take the analytical work seriously: grounding jobs in struggling moments, identifying hire and fire criteria, surfacing functional-emotional-social dimensions, deriving jobs from data, and applying the framing where it earns its keep. The teams that adopt JTBD vocabulary without the analytical work produce ritual.

When in doubt about whether a JTBD application is real or ritual, ask: can a recent product decision be traced to the JTBD analysis, or did the JTBD work happen in parallel with decisions that were made on other grounds? If the former, JTBD is doing its work. If the latter, the framework is decoration.

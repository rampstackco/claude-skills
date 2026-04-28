---
name: journey-mapping
description: "Build customer journey maps and service blueprints that visualize the end-to-end user experience including touchpoints, emotions, friction, and underlying systems. Use this skill whenever the user wants to map a customer journey, build a service blueprint, identify friction across an experience, align teams on the user experience, or visualize touchpoints and pain points. Triggers on customer journey, journey map, service blueprint, user journey, experience map, touchpoint analysis, friction map, journey audit, end-to-end experience, customer experience map. Also triggers when the team has departmental views of users but no shared map of what the experience actually feels like."
---

# Journey Mapping

Build journey maps and service blueprints that surface friction, align teams, and identify opportunities. Stack-agnostic. Tool-agnostic.

This skill is for mapping the experience. For testing specific touchpoints, use `usability-testing`. For broader generative research, use `ux-research`. For analyzing conversion, use `cro-optimization`.

---

## When to use

- Departments have different mental models of the customer experience
- Customer experience feels disjointed across touchpoints
- Specific friction or drop-off points need diagnosis
- Strategic planning needs a shared view of the user
- Service design (front-stage and back-stage) needs alignment
- New product or feature needs to be designed in context of broader experience

## When NOT to use

- Testing a single touchpoint or page (use `usability-testing`)
- Generative research before journey mapping (use `ux-research`)
- Operational process mapping that doesn't involve users
- Funnel optimization (use `cro-optimization`)

---

## Required inputs

- Identified user persona or segment to map (one map per segment)
- Existing research and data about that segment
- Cross-functional access (you cannot map back-stage without ops/support/engineering input)
- Time and stakeholder commitment (a real journey map is a project, not an afternoon)

---

## The framework: 3 deliverables

### 1. Customer journey map

The user-facing view of the experience.

**Structure (rows / lanes):**

- **Phase.** The major stages in the journey (e.g., Awareness, Consideration, Onboarding, Activation, Retention, Advocacy). Phases vary by product type.
- **Steps.** Specific things the user does within each phase.
- **Touchpoints.** Where the user interacts with the product, brand, or service (web, app, email, support, social, in-person).
- **Goals.** What the user is trying to accomplish at this step.
- **Thoughts.** What's going through their mind.
- **Emotions.** The emotional state (often visualized on a curve).
- **Pain points.** Where things go wrong, friction, frustration.
- **Opportunities.** Where the experience could improve.

**Format:**

Typically a horizontal timeline with vertical lanes for each row. Phases across the top, touchpoints, thoughts, emotions, etc. underneath.

### 2. Service blueprint

The back-stage view that supports the customer-facing experience.

**Adds these layers below the journey map:**

- **Front-stage actions.** What employees do that the user sees (sales calls, support chats, in-store interactions).
- **Back-stage actions.** What happens behind the scenes (order fulfillment, data processing, internal handoffs).
- **Supporting processes.** Systems, vendors, infrastructure (CRM, payment processors, fulfillment partners).
- **Lines of visibility.** The line between front-stage (visible to user) and back-stage (invisible).

The service blueprint shows where customer-facing problems originate in back-stage failures (e.g., the user's "shipping is slow" experience traces to a vendor handoff issue).

### 3. Synthesized opportunity map

Output of the mapping work.

**Captures:**

- **Top friction points.** Where the experience consistently fails users.
- **Untapped opportunities.** Moments where the experience could surprise and delight.
- **Disconnects.** Where front-stage and back-stage are misaligned.
- **Strategic gaps.** Where competitors have something the brand lacks (or vice versa).
- **Quick wins.** Low-effort, high-impact improvements.
- **Strategic bets.** Higher-effort transformations.

This is the deliverable that produces decisions. The journey map and service blueprint are inputs; the opportunity map is the output that drives action.

---

## Common phases by product type

### Most products

```
Awareness → Consideration → Decision → Onboarding → Active use → Renewal/Repurchase → Advocacy
```

### SaaS

```
Trigger → Discovery → Evaluation → Trial → Onboarding → Activation → Habit → Expansion → Renewal → Advocacy
```

### Ecommerce

```
Need recognition → Discovery → Research → Decision → Purchase → Wait/Anticipation → Receive → Use → Reorder/Recommend
```

### Service

```
Awareness → Inquiry → Quote → Decision → Service delivery → Resolution → Follow-up → Repeat business
```

### Healthcare / high-stakes purchases

```
Trigger → Research → Provider selection → Appointment → Treatment → Recovery → Follow-up → Long-term outcome
```

Phases are not mandatory. Start with the user's actual experience and let the phases emerge from the steps.

---

## How to gather the inputs

A good journey map combines multiple sources of truth.

### From users

- **In-depth interviews.** Walk users through their actual experience. Ask for specifics from a recent occurrence.
- **Diary studies.** Users log their experience over the duration of the journey.
- **Surveys.** Quantitative signal at scale; less depth.

### From the business

- **Internal interviews.** Sales, support, success, ops. They see the experience from different angles than product or design.
- **Operational data.** Funnel data, support ticket categories, NPS responses, churn reasons.
- **System inventory.** What touchpoints exist, what tools support them, what data flows where.

### Cross-validate

- The user's experience as they describe it
- The data the business has about their behavior
- The internal team's perception of the experience

These three views often disagree. The disagreements are themselves findings.

---

## Workflow

1. **Define scope.** One persona, one journey, one timeframe. Trying to map all users in one map produces a mess.
2. **Gather inputs.** User interviews, internal interviews, operational data. Plan 2 to 4 weeks for inputs.
3. **Draft the journey.** Phases, steps, touchpoints. Get to a working draft fast; iterate.
4. **Add the layers.** Goals, thoughts, emotions, pain points.
5. **Build the service blueprint.** Front-stage, back-stage, supporting processes.
6. **Identify opportunities.** Use the friction points and disconnects.
7. **Validate with users.** Does this match their actual experience? Refine.
8. **Workshop with stakeholders.** Walk teams through the map. Ensure shared understanding.
9. **Translate to action.** Specific projects, owners, timelines.
10. **Maintain.** A journey map is a living document. Revisit annually or after major changes.

---

## Failure patterns

- **Mapping without research.** A journey map built from internal assumptions reflects assumptions, not users.
- **One map for all users.** The mid-market buyer and enterprise buyer have different journeys. Don't merge.
- **No back-stage layer.** The map shows symptoms, not causes.
- **Beautiful map, no action.** Investment in production value at the expense of decisions.
- **Map as artifact, not tool.** Filed in Figma, never re-opened.
- **Ignoring emotional layer.** The "what" without the "how it feels" misses the point of journey mapping.
- **Vague pain points.** "Frustrating onboarding" - what specifically? When? Why?
- **Quick wins identified, never executed.** Same as research findings that don't ship.
- **Annual exercise without followup.** Year-old journey map describes year-old user.

---

## Output format

Default outputs:

1. **Journey map** (visual, typically Figma / FigJam / Miro, plus a markdown narrative version)
2. **Service blueprint** (visual, typically same tool)
3. **Opportunity map** (markdown, prioritized list)

Markdown narrative version of journey map:

```markdown
# [Persona] journey map

## Phase 1: [Phase name]

### Step: [Step name]
- **Touchpoint:** [Where this happens]
- **Goal:** [What the user wants here]
- **Thoughts:** [What they're thinking]
- **Emotion:** [State on the emotional curve]
- **Pain points:** [Friction]
- **Opportunities:** [Improvement potential]

### Step: [Step name]
[Same structure]

## Phase 2: [Phase name]
[Repeat]

## Service blueprint additions

### Phase 1
- **Front-stage actions:** [What employees do user-visibly]
- **Back-stage actions:** [What happens behind the scenes]
- **Supporting processes:** [Systems involved]

[Repeat per phase]

## Opportunity map

### Critical friction
1. [Specific issue, with evidence]
2. [Specific issue, with evidence]

### Quick wins
1. [Specific opportunity, with effort/impact]

### Strategic bets
1. [Specific opportunity, with effort/impact]

### Cross-team disconnects
1. [Specific disconnect, with implication]
```

---

## Reference files

- `references/journey-map-template.md` - Fillable journey map and service blueprint template.

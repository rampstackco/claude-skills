# Objective design patterns

Outcome-vs-output distinction. Strong vs weak objective characteristics. Worked examples across domains. The few-objectives discipline.

Objectives are the outcome statements that name what the team is trying to achieve in the quarter. Most OKR failure begins at the objective level: outputs disguised as outcomes, vague aspirations, or too many objectives diluting focus. Getting the objective right is upstream of everything else.

---

## Outcome vs output

The most consequential distinction.

**Output objectives.** Describe work the team plans to do.

- "Ship the activation redesign."
- "Migrate to the new auth service."
- "Run 12 customer interviews."

**Outcome objectives.** Describe results the team is trying to achieve.

- "Improve activation for new sign-ups so more reach value-realization in week one."
- "Establish auth foundations that support enterprise compliance review."
- "Build a research-grounded picture of how mid-market customers actually use the product."

**Why the distinction matters.** Outputs can be shipped without producing outcomes. The activation redesign ships; activation rate stays the same. The auth migration completes; compliance review still fails. The interviews happen; the team cannot point to decisions that changed.

**The output-as-outcome failure.** Output objectives shift the team's incentives toward shipping rather than achieving. The team optimizes for the work; the work gets done; the underlying goal goes unachieved.

**The cure.** Each output objective gets rewritten to name the outcome the output is meant to produce. If the team cannot name the outcome, the output's value is unclear and may not warrant quarterly priority.

---

## Strong objective characteristics

**Outcome-focused.** Names the result, not the work.

**Specific to the quarter.** Vague aspirations ("be more user-focused") do not focus quarterly work. The objective should be specific enough that the team knows when they have moved it forward.

**Inspiring without being fantasy.** The team should feel pulled toward the objective. Fantasy demoralizes; sandbag bores. Stretch motivates.

**Few in number.** 2-4 objectives per team per quarter. More dilutes focus; the team works on too many things and excels at none.

**Connected to strategy.** Objectives ladder up to company-level priorities or to the team's strategic mandate. Disconnected objectives produce work that does not contribute to the org's direction.

**Within team influence.** The team can affect the outcome through their work. Objectives entirely dependent on external factors are not the team's to commit to.

---

## Weak objective characteristics

**Output-disguised-as-outcome.** "Ship the redesign" is the work; the outcome should be the result the redesign produces.

**Too vague.** "Improve user experience" is too broad to focus a quarter's work. What aspect of UX, in what part of the product, for which users?

**Too tactical.** "Refactor the auth service" is a tactical decision the team makes within larger initiatives, not a quarterly objective.

**Too many.** 8 objectives produces no focus. Each objective gets less attention; trade-offs become impossible because everything is priority.

**Disconnected from strategy.** Objectives that do not ladder to company priorities or team mandate produce work that does not contribute.

**Outside team influence.** "Total revenue grows 30%" may not be the product team's to commit to if revenue depends on sales execution, market conditions, and product work combined.

---

## Worked objective examples by domain

### B2B SaaS product team

- "Improve activation for new sign-ups so that more reach the value-realization moment within their first week."
- "Make the support experience deflect predictable issues so the team can focus on harder cases."
- "Establish enterprise-readiness foundations so we can serve the segment we are targeting next year."

### Consumer mobile app team

- "Increase retention through the first month so users build habit before the typical churn window."
- "Improve performance and reliability so the experience matches the brand's reputation."

### Internal platform team

- "Reduce the time it takes engineering teams to ship a new service from days to under a day."
- "Eliminate the top three reasons engineering teams escalate to platform support."

### Marketing-product team

- "Convert more product trial users to paid by removing friction in the upgrade path."
- "Position the product clearly enough that prospects evaluating against alternatives understand the differentiation."

Each objective is outcome-focused, specific to the quarter, and within the team's ability to influence. The work that produces these outcomes is multiple roadmap items; the OKR is the result, not the work.

---

## The few-objectives discipline

Most teams should have 2-4 objectives per quarter. The discipline produces focus.

**Why fewer is better.**

- Each objective gets serious attention. The team thinks about it weekly, makes trade-offs against it, surfaces blockers.
- Trade-offs are possible. With 3 objectives, the team can decide that work on objective A takes priority over work on objective C this week. With 12 objectives, all work claims priority.
- The team can credibly commit. 3 objectives are credible; 12 are not.

**Why more feels tempting.**

- Multiple stakeholders want their priorities reflected. Adding objectives feels like accommodating; capping objectives feels like saying no.
- The team sees many things they could pursue. Picking 3 means deferring others.
- Past quarters' OKRs sometimes accumulate; teams forget to retire objectives that no longer fit.

**The discipline.**

- Cap objectives. 4 is the upper bound for most teams.
- Surface what is being deferred. The objectives that did not make the cut get named explicitly; the team's choice to defer is transparent.
- Retire objectives quarter-over-quarter. Objectives are quarterly; they do not carry over by default.

---

## Objectives across an org

When the org has multiple teams, objectives should compose without overlap or contradiction.

**Cross-team coordination.**

- Objectives that depend on multiple teams should name the dependencies explicitly. The product team's objective may depend on engineering hiring; the engineering team's objective may depend on product prioritization.
- Objectives that conflict across teams need resolution before the quarter starts. Teams pulling in opposite directions waste capacity.

**Team mandate alignment.**

- Each team's objectives should fit the team's mandate. Product team objectives are product outcomes; engineering team objectives are engineering outcomes; design team objectives are design outcomes.
- Cross-functional outcomes (e.g., "improve activation") require multiple teams to commit. The lead team owns the OKR; the supporting teams commit dependencies in their own OKRs.

---

## Objective writing process

How objectives get drafted.

**Draft sources.**

- Strategy work that named the priorities for the quarter or year.
- Discovery synthesis that identified user-job priorities.
- Roadmap-planning work that surfaced major initiatives.
- Performance review that identified gaps from the prior quarter.

**Draft method.**

- Start from the outcome the team is trying to produce.
- Surface multiple draft phrasings.
- Test each: is this an outcome or an output? Is it specific enough? Is it within team influence?
- Iterate to a 2-4 objective set that the team can commit to and that ladders to strategy.

**Stakeholder review.**

- Draft objectives circulate to stakeholders before commit. Surfaces dependencies and conflicts.
- Stakeholder feedback informs revisions; the team owns the final commit.

**The commitment.** Objectives published and visible to the org. The team is on the hook for them.

---

## Objective revision through the quarter

Objectives generally hold for the quarter. See `mid-quarter-recalibration.md` for when revision is appropriate.

**The default.** Objectives stay; tactics adapt to keep moving toward them.

**The exception.** Strategic shift, major external disruption, or invalidating information warrants revision. Rare.

---

## Common objective design failures

**Output objectives.** "Ship X" instead of "Achieve outcome Y through X." Cure: name the outcome.

**Vague objectives.** "Improve experience" without specifying what or where. Cure: specificity.

**Too many objectives.** 8+ per team per quarter. Cure: cap at 4.

**Tactical objectives.** Specific implementation decisions framed as objectives. Cure: tactical decisions belong in roadmap items, not OKRs.

**Strategic-disconnect.** Objectives that do not ladder to company or team priorities. Cure: explicit ladder before commit.

**Out-of-influence.** Objectives entirely dependent on factors the team does not control. Cure: rewrite to focus on what the team can affect.

---

## Methodology-level choices that stay in the public skill

The outcome-vs-output distinction. Strong and weak objective characteristics. Worked examples across domains. The few-objectives discipline. Cross-team coordination. The drafting and review process. Common failures.

## Implementation choices that stay internal

Specific OKR-tracking tools the team uses. Specific document templates for objectives. Specific stakeholder-review formats. The team's own conventions for objective wording within the principles. These vary by team and tooling.

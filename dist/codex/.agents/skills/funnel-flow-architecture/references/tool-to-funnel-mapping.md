# Tool-to-funnel mapping

Which tools serve which entry points and segments. Each tool in the growth toolkit has a place in the funnel architecture; the mapping makes the place explicit.

Without explicit mapping, tools end up serving everyone (and serving no one well) or getting deployed where they do not fit. With explicit mapping, each tool serves the segments where it adds the most value.

---

## The mapping principle

Each tool serves specific segments at specific stages from specific entry points. The mapping is documented, not implicit.

**The win.** A team's calculator is mapped to consideration-stage SMB and mid-market visitors arriving via organic content. The calculator's design (inputs, defaults, methodology) reflects this segment. Other segments do not see the calculator featured prominently; they see tools matched to their segment.

**The fail.** A team's calculator is featured on every page for every visitor. The calculator's design is generic to serve everyone. SMB visitors see enterprise inputs; enterprise visitors see SMB defaults. The calculator serves nobody well.

The discipline. Each tool has a defined place. The architecture documents which segments and stages and entry points the tool serves.

---

## Common tool-to-funnel mappings

How each growth tool typically maps.

**Lead magnet.** Often serves awareness-to-consideration transition.

- Audience: awareness-stage visitors who would benefit from a focused resource.
- Entry points: blog posts, content discovery, paid ads on educational topics.
- Position in funnel: captures email; routes to nurture sequence that bridges to consideration.
- Detail in `lead-magnet-design`.

**Calculator.** Often serves consideration stage.

- Audience: visitors evaluating options who need to defend a specific decision.
- Entry points: pricing pages, comparison content, paid ads on solution-evaluation.
- Position in funnel: provides defensible numeric output; routes to demo or trial CTA.
- Detail in `calculator-design`.

**Quiz.** Variable depending on design.

- Awareness quizzes: content marketing, brand-building. Captures email; routes to broad nurture sequence.
- Consideration quizzes: product matching, fit assessment. Captures email; routes to product-specific sequence.
- Decision quizzes: plan selection, configuration. Captures email and routes to specific sales motion or signup.
- Detail in `quiz-and-assessment-design`.

**Multi-step form.** Often serves decision or qualification stage.

- Audience: visitors with high intent who need to provide structured information.
- Entry points: demo CTAs, talk-to-sales pages, application flows.
- Position in funnel: captures qualified intent; routes to sales or to next-stage automation.
- Detail in `multi-step-form-design`.

**Chatbot.** Cross-cutting; can serve any stage with intent recognition routing.

- Audience: any visitor who has questions the bot can handle.
- Entry points: any page where conversation might add value.
- Position in funnel: handles in-conversation routing; escalates to humans for complex cases.
- Detail in `chatbot-flow-design`.

---

## Mapping examples by audience segment

How tools map for specific segments.

**Solo founder, awareness stage.**

- Lead magnet: practical template they can use today.
- Quiz (optional): "what stage of growth are you in" with matched recommendations.
- Chatbot: yes, for FAQ; lightweight routing.
- Calculator, multi-step form: probably not at this stage.

**SMB team, consideration stage.**

- Calculator: ROI estimate matched to SMB context.
- Lead magnet: comparison guide or worked example.
- Multi-step form: demo request capture.
- Chatbot: yes, for product-specific questions.
- Quiz (optional): plan recommendation.

**Mid-market team, consideration-to-decision.**

- Calculator: ROI estimate with mid-market context.
- Multi-step form: demo request with qualification.
- Chatbot: yes, with escalation to sales for complex questions.
- Lead magnet (optional): white paper or case study.
- Quiz: probably not (mid-market buyers often skip quizzes).

**Enterprise, decision stage.**

- Multi-step form: enterprise demo request with detailed qualification.
- Chatbot: lightweight; escalation-heavy.
- Custom calculator: with enterprise-specific inputs and ROI factors.
- Lead magnet, quiz: usually not (enterprise buyers expect direct human attention).

The mapping is segment-aware. Tools that fit one segment may not fit another.

---

## Mapping examples by stage

How tools map for specific stages.

**Awareness stage.**

- Lead magnets prominent. Quizzes can serve. Calculators less common (consideration is when calculators earn their value). Chatbots support.
- Goal: capture awareness-stage email; route to nurture sequence.

**Consideration stage.**

- Calculators central. Quizzes useful for product matching. Lead magnets can deepen value. Chatbots support specific questions.
- Goal: convert consideration into qualified intent; route to demo or trial.

**Decision stage.**

- Multi-step forms central (demo requests, qualified intent capture). Calculators support specific decisions. Chatbots route to sales.
- Goal: convert decision-stage intent into commitment.

**Customer stage.**

- Onboarding flows (which can use multi-step forms). Chatbots for support. Lead magnets and quizzes less central; replaced by in-product education.
- Goal: deepen customer success; expand and retain.

---

## Mapping discipline

How to make the mapping rigorous.

**Discipline 1: Document the mapping.** Write down which tools serve which segments and stages. The document is the architecture's reference.

**Discipline 2: Match tool design to mapping.** A tool serving SMB should have SMB-relevant inputs and defaults; a tool serving enterprise should reflect enterprise context.

**Discipline 3: Promote tools where they fit.** Show calculators on consideration-stage pages; show lead magnets on awareness-stage pages. Generic tool placement on every page dilutes their value.

**Discipline 4: Retire tools that do not fit.** A tool that does not have a mapping is decorative. Either find its place or retire it.

**Discipline 5: Audit the mapping quarterly.** Mappings decay as audience composition shifts. Quarterly review catches drift.

---

## Multi-tool segments

Some segments use multiple tools across their journey.

**The pattern.** A consideration-stage SMB visitor uses a lead magnet (awareness arrival), a calculator (consideration depth), then a multi-step demo form (decision intent). Three tools across the journey.

**Architecture implications.**

- Each tool serves a specific moment in the visitor's journey.
- Cross-tool data flow lets each tool benefit from earlier interactions.
- Tools should not duplicate each other's value.

**The discipline.** Tools complement, not duplicate. Each tool earns its place in the segment's journey.

---

## Tool overlap and choice

When multiple tools could serve the same segment-and-stage cell.

**The pattern.** A team has both a calculator and a quiz that could serve consideration-stage SMB.

**The decision.** Choose the tool that serves the segment best, or use both with clear differentiation.

- Calculator: when the consideration involves a specific calculation (ROI, savings, sizing).
- Quiz: when the consideration involves categorization or product matching.
- Both: when the segment benefits from both, with clear positioning of when each helps.

The discipline. Avoid having multiple tools competing for the same segment without clear differentiation. Audiences pick the most prominent; the others underperform.

---

## Tool gaps

When the mapping reveals gaps.

**The pattern.** The architecture documents which tools serve which segments. Some cells in the matrix have no tool; the audience there has no relevant tool to engage with.

**The decision.** Either build a tool to fill the gap, or accept that some cells use generic content rather than tools.

- Build when the segment is high-value and the tool would meaningfully improve conversion.
- Accept when the segment is small or the tool would not earn its build cost.

The architecture surfaces gaps; the team decides what to do about them.

---

## Tool-mapping audit

Periodically audit which tools serve which segments and how well.

**The audit.**

- For each tool: which segments does it currently serve? Which segments does it actually attract?
- For each cell in the matrix: which tools are mapped to it? Are they performing?
- Are any tools serving segments outside their intended mapping (drift)?

**The drift indicators.** Tool conversion drops; tool's audience composition changes; tool gets traffic from segments it was not designed for.

---

## Common mapping failures

**No mapping.** Tools deployed without explicit segment-and-stage assignment.

**Mismatched mapping.** Tool serving segments it was not designed for; tool's design does not fit the audience.

**Decorative mapping.** Mapping documented but not enforced; tool appears everywhere regardless of mapping.

**Stale mapping.** Mapping designed once; not updated as tools or audiences evolved.

**Tool overlap without differentiation.** Multiple tools competing for the same segment; audience splits; none performs well.

**Mapping gaps unaddressed.** Cells in the matrix have no tool support; the architecture has holes.

---

## Methodology-level choices that stay in the public skill

The mapping principle. Common tool-to-funnel mappings (5 tools). Mapping examples by audience segment (4 examples). Mapping examples by stage (4 examples). Mapping discipline (5 disciplines). Multi-tool segments. Tool overlap and choice. Tool gaps. Tool-mapping audit. Common failures.

## Implementation choices that stay internal

Specific tool-to-segment mappings for specific programs. Specific tool placement decisions on specific pages. The team's audit calendars. These vary by team and program.

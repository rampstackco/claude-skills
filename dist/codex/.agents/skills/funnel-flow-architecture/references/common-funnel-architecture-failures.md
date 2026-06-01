# Common funnel architecture failures

9+ failure patterns with diagnoses and cures. The patterns that surface as "the funnel is not converting" or "tools work individually but conversion is flat" or "we cannot tell where the funnel is broken."

---

## "Tools work individually; conversion is flat."

**The diagnosis.** Silo-funnels pattern. Tools as orphans; no architecture connects them.

**The cure.** Add cross-tool data flow; map tools to specific segments; design transitions between tools. Detail in `references/cross-tool-data-flow-patterns.md` and `references/tool-to-funnel-mapping.md`.

---

## "Every audience gets the same nurture sequence."

**The diagnosis.** Kitchen-sink-funnels pattern. One sequence for everyone.

**The cure.** Segment-and-stage sequences. Different cells in the matrix get different sequences. Detail in `references/nurture-sequence-architecture.md`.

---

## "We have 12 tools and no clear architecture."

**The diagnosis.** Tool-driven architecture. Tools accumulated without explicit segment mapping.

**The cure.** Build the matrix; map each tool to specific cells; retire tools that do not have a mapping or that compete with better-mapped alternatives.

---

## "Specific segments convert at half the rate of others."

**The diagnosis.** Architecture for those segments may be broken. Or the segments may not be served by the current tools and sequences.

**The cure.** Audit those segments' funnel paths. Are tools mapped to them? Are sequences designed for them? If not, build for those segments. If yes, refine the existing path.

---

## "We cannot tell which tools or sequences are driving conversion."

**The diagnosis.** Architecture-level metrics not tracked. Cannot attribute outcomes to architecture choices.

**The cure.** Instrument cross-tool conversion, sequence-to-tool conversion, segment-level downstream conversion, funnel-stage progression. Detail in `references/funnel-measurement-patterns.md`.

---

## "We redesign every quarter; nothing improves."

**The diagnosis.** Continuous-redesign trap. Each redesign resets learning; nothing compounds.

**The cure.** Establish "no major redesign for X months" discipline. Refine continuously; redesign deliberately and rarely. Detail in `references/funnel-iteration-discipline.md`.

---

## "The funnel was great at launch; now conversion has dropped 40 percent."

**The diagnosis.** Frozen-architecture trap. Designed once; never iterated; decay accumulated.

**The cure.** Quarterly audit. Refinement cadence. Detail in `references/funnel-iteration-discipline.md`.

---

## "Specific transitions in the funnel have high drop-off."

**The diagnosis.** Hand-off-broken pattern. Tools work but the bridges between them break.

**The cure.** Audit transitions. Add cross-tool data flow so context travels. Promote downstream tools at upstream tools' exits. Detail in `references/cross-tool-data-flow-patterns.md`.

---

## "Our chatbot, calculator, and quiz all serve consideration-stage audiences."

**The diagnosis.** Tool overlap without differentiation. Three tools competing for the same audience.

**The cure.** Differentiate the tools' purposes. Calculator for ROI questions; quiz for product matching; chatbot for FAQ. Or consolidate to fewer tools with clearer roles.

---

## "Sales says quiz-sourced leads, calculator-sourced leads, and lead-magnet-sourced leads are different qualities."

**The diagnosis.** Tools may be attracting different segments; the architecture's segmentation is working but the tools are not all matched to high-quality segments.

**The cure.** Investigate which tools attract which segments. Optimize tool placement and design for the segments the brand serves best; deprioritize tools that attract low-quality segments.

---

## "We added a new tool last quarter; it does not seem to help conversion."

**The diagnosis.** Orphan-tool pattern. Tool added without architecture mapping.

**The cure.** Map the new tool to specific segments. Decide where it fits in the matrix. Promote it where it fits; remove it from places it does not.

---

## "Our funnel has 8 stages; visitors only complete 2."

**The diagnosis.** Funnel may be over-architected. Too many steps; audience cannot or will not progress through them all.

**The cure.** Simplify the funnel. Combine stages; remove unnecessary tools; align the funnel length to the audience's likely journey.

---

## "Cross-tool tracking is broken; we cannot tell who used what."

**The diagnosis.** Identity threading or event tracking issue. Architecture's measurement infrastructure is broken.

**The cure.** Audit identity threading. Verify event tracking. Fix the infrastructure before further iteration. Detail in `references/cross-tool-data-flow-patterns.md`.

---

## "Audiences arriving from paid traffic and organic traffic perform completely differently."

**The diagnosis.** Either entry-point routing is not differentiating, or the funnel paths are not serving paid and organic audiences differently.

**The cure.** Different routing for different entry points. Specific landing pages and sequences for paid vs organic. Detail in `references/entry-point-architecture-patterns.md`.

---

## "The team built personas; the funnel does not reflect them."

**The diagnosis.** Segments defined but not implemented in the funnel architecture. Decorative segmentation.

**The cure.** Map personas to funnel cells. Build paths for the cells. The personas should drive the architecture, not sit in a deck.

---

## "Our sequence-to-trial conversion is high; trial-to-paid is low."

**The diagnosis.** Architecture handles funnel up to trial well; the trial-to-paid stage may need its own architecture (or may be a product issue rather than funnel issue).

**The cure.** Treat trial-to-paid as its own funnel-stage progression. Build paths for trial users; nurture toward paid conversion.

---

## "We have 15 lead magnets; 3 produce most of the leads."

**The diagnosis.** Magnet portfolio not maintained. Most magnets are dead but still on the site.

**The cure.** Audit and retire dead magnets. Free capacity for the strong ones. Detail in `lead-magnet-design`.

---

## "We built a fancy architecture; the team cannot maintain it."

**The diagnosis.** Over-architecture. Architecture exceeds team capacity.

**The cure.** Simplify. Match architecture complexity to team capacity. Expand only when capacity grows.

---

## "Funnel-sourced leads are different from sales-sourced leads."

**The diagnosis.** Likely fine. Funnel and direct sales serve different segments and stages. Both can be valuable.

**The action.** Track them separately. Optimize each for its specific path.

---

## The pattern across failures

Most funnel architecture failures fall into one of three patterns.

**Pattern 1: Tools without architecture.** Silo, kitchen-sink, tool-driven, orphan-tool. The fix is to add explicit architecture (matrix, mapping, data flow).

**Pattern 2: Architecture without measurement.** Metric-blind, vanity-metric, broken tracking. The fix is to instrument architecture-level metrics.

**Pattern 3: Architecture without maintenance.** Frozen, decayed, unmaintained. The fix is iteration discipline (refine continuously, redesign rarely).

The metric pattern: funnel architecture failures often look fine on tool-level metrics. The signal is in cross-tool conversion, segment-level outcomes, and funnel-stage progression. Programs that track only tool metrics keep shipping the same architectural patterns.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (tools-without-architecture, architecture-without-measurement, architecture-without-maintenance). The principle that tool-level metrics alone are insufficient.

## Implementation choices that stay internal

Specific failure cases the team has encountered and the lessons learned. Specific architecture-level dashboards. Specific cures the team applies. The team's audit and redesign processes. These vary by team.

# Architecture anti-patterns

The patterns that look like funnel architecture but degrade conversion. Anti-patterns are easy to ship; the cost shows up in downstream conversion, lead quality, and brand reputation over time.

---

## The silo-funnels pattern

The pattern. Tools as orphans. No coordinated flow.

The signal. Each tool's metrics look fine individually; cross-tool metrics non-existent or near-zero. Downstream conversion does not match the sum of tool conversions.

The cost. Each tool's investment does not compound. The audience that interacts with one tool is not connected to any next step. The team has tools but no architecture.

The cure. Add cross-tool data flow and explicit funnel architecture. Detail in `references/cross-tool-data-flow-patterns.md` and the broader skill.

---

## The kitchen-sink-funnels pattern

The pattern. One funnel for everyone. Same nurture sequence regardless of audience or entry point.

The signal. Conversion rates regress to mediocre on every segment. No segment is well-served.

The cost. The funnel optimizes for the average; downstream conversion is uniformly low.

The cure. Segment-and-stage architecture. Different paths for different cells in the matrix. Detail in `references/audience-and-stage-segmentation.md` and `references/nurture-sequence-architecture.md`.

---

## The over-segmented funnel

The pattern. So many segments that maintenance is impossible. 60 cells in the matrix; 60 distinct paths; nobody can keep up.

The signal. Specific paths get little attention; maintenance backlog grows; specific cells are theoretical with no real visitors.

The cost. The architecture exists on paper but not in execution. Tools and sequences for theoretical cells cost effort without producing value.

The cure. Reduce to 9-15 cells. Start with the minimum viable matrix; expand only when data justifies. Detail in `references/audience-and-stage-segmentation.md`.

---

## The unmaintained-funnel

The pattern. Architecture designed once, never reviewed. Decay accumulates.

The signal. Conversion declines slowly; tools age; sequences go stale; segments shift; the architecture does not respond.

The cost. The architecture's value erodes. Audiences move on; the brand falls behind.

The cure. Quarterly audit. Refinement cadence. Detail in `references/funnel-iteration-discipline.md`.

---

## The tool-driven-architecture

The pattern. Architecture organized around tools rather than around audience-and-stage. Each tool gets its own funnel regardless of whether that serves the audience.

The signal. The site has many tool-specific landing pages; users navigate to tools rather than tools serving users; the architecture is organized for the team, not the audience.

The cost. Audiences cannot find what they need; tools cannibalize each other; the architecture cannot scale because each tool is its own funnel.

The cure. Reorganize around audience-and-stage. The matrix drives the architecture; tools serve the matrix.

---

## The metric-blind-architecture

The pattern. Architecture without measurement. Cannot diagnose where it works and where it does not.

The signal. Decisions made on intuition; no data to validate; iteration is guesswork.

The cost. The architecture cannot improve through measurement; refinement is random; redesign happens reactively.

The cure. Architecture-level metrics. Cross-tool conversion, sequence-to-tool conversion, segment-level downstream conversion, funnel-stage progression. Detail in `references/funnel-measurement-patterns.md`.

---

## The single-tool-funnel

The pattern. Architecture that depends on one tool. Just the calculator. Just the chatbot. No resilience if that tool underperforms.

The signal. The tool's quarterly performance dictates overall funnel performance. A bad month for the tool is a bad month for the funnel.

The cost. The architecture is fragile. Tool failures cascade; redesigns of the central tool are high-risk.

The cure. Portfolio approach. Multiple tools serving different segments. The architecture's resilience comes from diversification.

---

## The hand-off-broken-funnel

The pattern. Tools work individually but the transitions between them break.

The signal. Each tool's metrics look fine; cross-tool conversion is low. The architecture's transitions are silently failing.

The cost. The audience experiences the funnel as disconnected. Downstream conversion suffers because the bridges between tools are broken.

The cure. Audit transitions. Cross-tool data flow. Sequence-tool integration. Detail in `references/cross-tool-data-flow-patterns.md`.

---

## The continuous-redesign funnel

The pattern. Architecture redesigned every quarter. Each iteration starts over.

The signal. Conversion does not improve over time. Each redesign resets the learning. Tools never reach maturity.

The cost. Investment dilutes across redesigns. Compounding does not happen.

The cure. Refine continuously; redesign infrequently and deliberately. Detail in `references/funnel-iteration-discipline.md` (continuous-redesign trap).

---

## The frozen-architecture funnel

The pattern. Architecture designed once; never iterated; treated as finished.

The signal. Conversion declines slowly; tools and sequences feel dated; segments no longer match the audience.

The cost. The architecture's value erodes; the brand becomes uncompetitive.

The cure. Set refinement cadences. Quarterly audits. Detail in `references/funnel-iteration-discipline.md` (frozen-architecture trap).

---

## The vanity-metric architecture

The pattern. Architecture measured by surface metrics (tool engagement, total visitors, email signups) without measuring downstream outcomes.

The signal. Metrics report looks healthy; business outcomes do not match.

The cost. The team optimizes for the wrong metrics; the architecture appears successful while underperforming on what matters.

The cure. Measure downstream conversion. Per-segment downstream conversion. Architecture-level metrics rather than tool-level activity.

---

## The over-personalized funnel

The pattern. Architecture designed for personalization the team cannot actually deliver. Many entry points; many sequences; many tools; team capacity exceeded.

The signal. Personalization in design; generic in execution. Specific paths exist on paper; default to generic in practice.

The cost. The team built complexity that does not get used. Maintenance burden without payoff.

The cure. Match architecture complexity to team capacity. Start simple; add personalization where it produces meaningful lift; do not personalize for its own sake.

---

## The under-personalized funnel

The pattern. Architecture treats every visitor the same when meaningful personalization would lift conversion.

The signal. Specific segments underperform; the audience's actual differences are not reflected in the funnel.

The cost. Conversion stays at the average; no segment exceeds.

The cure. Add personalization where data shows it would help. Start with segment-level differentiation; refine over time.

---

## The orphan-tool architecture

The pattern. Tools added to the funnel without explicit segment-and-stage assignment. Each new tool exists; no architecture says where it fits.

The signal. The funnel's tool count grows; the architecture's clarity does not.

The cost. Tools compete for the same audience; users see overlapping options; conversion fragments.

The cure. Each tool earns its place. Architecture documents which segments and stages the tool serves. New tools are added with explicit mapping.

---

## How to detect anti-patterns in a portfolio

Audit cadence. Quarterly review of the architecture, looking specifically for these anti-patterns.

**Audit questions.**

- Do the tools work together (anti-pattern check: silo, hand-off-broken)?
- Is there segment-and-stage architecture (anti-pattern check: kitchen-sink, tool-driven)?
- Is the matrix maintainable (anti-pattern check: over-segmented, over-personalized)?
- Are tools mapped to specific segments (anti-pattern check: orphan-tool, single-tool, under-personalized)?
- Are architecture-level metrics tracked (anti-pattern check: metric-blind, vanity-metric)?
- Is there iteration discipline (anti-pattern check: continuous-redesign, frozen-architecture, unmaintained)?

**The retire decision.** Anti-pattern architectures often warrant redesign. Patching anti-patterns rarely produces a good architecture.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing for each. Cures matched to anti-patterns. The audit cadence and audit questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped historically and the lessons learned. Specific portfolio audit results. Specific redesign decisions. The team's audit calendar and reviewer list. These vary by team.

# Cascading OKRs decisions

When to cascade strictly vs loosely. The middle path. Cascading anti-patterns. The honest disclosure about cascading difficulty.

Cascading is one of the most contested OKR practices. Conference talks describe clean ladders from company to team to individual; in practice, strict cascading produces over-constrained team OKRs, while loose cascading produces team work disconnected from company priorities. The middle path is harder than the talks suggest.

---

## The trade-off

Cascading exists on a spectrum.

**Strict cascading.**

- Company sets OKRs.
- Each function (product, engineering, sales) cascades to function-level OKRs.
- Each team cascades to team OKRs.
- Each individual cascades to personal OKRs.
- All ladders trace cleanly upward.

**Loose cascading.**

- Company sets OKRs.
- Teams set their own OKRs informed by company priorities but with autonomy on scope and contribution.
- Teams may set OKRs not directly tied to company OKRs (technical debt, team-specific work).
- Individual OKRs often skipped.

**The trade-off.**

- Strict produces alignment but over-constrains. Teams set OKRs they think leadership wants rather than OKRs they can credibly commit to.
- Loose produces autonomy but risks misalignment. Team work optimizes locally without contributing to org goals.

---

## When to cascade strictly

**Early-stage companies aligning around small priorities.** When the company has 2-3 critical priorities and everyone needs to focus on them, strict cascading enforces the focus.

**Times of strategic shift.** When the company is changing direction (new market, new segment, new product line), strict cascading helps the org turn together.

**Crisis or focus periods.** When the company faces a specific challenge requiring all hands, strict cascading ensures everyone is rowing the same direction.

**Common to these cases:** strategic clarity is high, alignment is more valuable than autonomy, and the org has fewer concurrent priorities to balance.

---

## When to cascade loosely

**Mature organizations with established mandates.** Teams have clear scope; their OKRs naturally fit company priorities through team mandate; strict cascading adds overhead without value.

**Cross-functional teams where strict cascading would over-constrain.** Teams that span functions cannot cleanly ladder to a single function-level OKR; loose cascading lets them pursue cross-functional outcomes.

**High-trust environments.** Teams trusted to set their own OKRs and credibly commit to them; the org accepts the autonomy in exchange for the engagement and creativity it produces.

**Common to these cases:** team mandates are clear, autonomy is more valuable than tight alignment, and the org tolerates some local optimization in exchange for team engagement.

---

## The middle path

Most healthy OKR cultures sit between strict and loose.

**The pattern.**

- Company sets 3-5 OKRs at the start of the quarter.
- Teams set OKRs that explicitly identify which company OKRs they ladder up to (when applicable).
- Teams have autonomy on how to contribute (which key results, which initiatives, what scope).
- Some team OKRs are team-specific (technical debt, infrastructure, experimentation foundations) without direct company ladders. Surface these explicitly.
- Individual OKRs are usually skipped; commitment is at the team level.

**The "explicit ladder when applicable" rule.** Each team OKR either:

- Explicitly identifies the company OKR it ladders to.
- Explicitly identifies that it is team-specific without a company ladder.

Both are honest; the failure mode is implicit ambiguity where the team is not sure whether their OKR connects to anything.

---

## Worked example: middle path

Company OKRs for Q3:

1. Improve net new ARR through enterprise segment growth.
2. Improve activation for self-serve sign-ups.
3. Reduce infrastructure costs through architecture optimization.

Product team OKRs:

- "Improve activation for new sign-ups" (ladders to company OKR 2).
- "Establish enterprise-readiness foundations" (ladders to company OKR 1).
- "Reduce technical debt in the activation funnel" (team-specific; does not ladder directly).

Engineering team OKRs:

- "Ship onboarding redesign by week 6" (ladders to company OKR 2 via product team OKR).
- "Migrate to new search architecture" (ladders to company OKR 3).
- "Strengthen test coverage in critical paths" (team-specific).

Sales team OKRs:

- "Close 8 enterprise deals in Q3" (ladders to company OKR 1).
- "Improve discovery-call to demo conversion from 24% to 35%" (ladders to company OKR 1).
- "Build the design partner program" (team-specific).

The pattern. Most team OKRs ladder up; some are team-specific. Each ladder is explicit. Teams have autonomy on how they contribute (which KRs, which initiatives).

---

## Cascading anti-patterns

**Strict cascading enforced top-down without team input.** Team OKRs become wishlist receivers from leadership; commitment is shallow because the team did not author what they are committing to.

**Loose cascading without explicit ladders.** Team OKRs are set without any visible connection to company priorities. Some team work happens to align; some does not. Leadership cannot tell what is contributing to company OKRs.

**Cascade theater.** OKR documents include ladders that look connected but do not actually drive anything. The team's work shows up the same regardless of which company OKR they "ladder to."

**Over-cascading.** Every team OKR is required to ladder to a company OKR. Teams contort their work to fit. Team-specific work (technical debt, infrastructure) gets dressed up as ladder work or gets de-prioritized despite being important.

**Personal OKRs as default.** Individual OKRs cascaded down. Most OKR cultures find this produces overhead without proportional value; commitment at team level is usually sufficient.

---

## Cascading and team mandate

Teams whose OKRs do not naturally ladder to company priorities often have a team-mandate problem.

**The signal.** A team consistently sets OKRs that are team-specific. None of their work ladders to company priorities.

**The interpretation.**

- Possibly the team's mandate does not match the company's current priorities. Either the mandate should change (broader scope, different focus) or the team's work is not strategically critical (consider deprioritizing or restructuring).
- Possibly the team's work is foundational and supports many company priorities indirectly (platform teams, infrastructure teams). Their OKRs may legitimately be team-specific.

**The audit.** Annually, review whether team mandates match company strategy. Teams whose mandates have drifted from strategy benefit from explicit redirection.

---

## Cascading frequency

The cascading work happens at OKR-setting time (start of quarter) and is generally locked for the quarter.

**Quarterly cascading.** Most common. Company OKRs set; teams cascade; quarter executes.

**Mid-quarter cascade revision.** Rare. Strategic shift mid-quarter may warrant rewriting team OKRs. See `mid-quarter-recalibration.md`.

**The honest frequency.** Most orgs over-cascade in the first few quarters of OKR adoption (treating cascading as a thing to perfect) and learn to relax it. Some orgs never relax and produce increasingly performative cascading. Recognize the pattern; loosen when it stops adding value.

---

## Cascading and individual goals

Individual goals are usually a separate practice from OKRs.

**Common patterns.**

- Team OKRs commit at team level; individual contributors work toward team OKRs without separate personal OKRs.
- Individual goals (career development, skill-building, role expectations) live in performance management, separate from OKRs.
- Some orgs do cascade to individual OKRs; most find this produces overhead without value and stop after a few cycles.

**The discipline.** Be intentional about whether to cascade to individuals. The default should be "no, commit at team level"; individual cascading should be justified rather than assumed.

---

## Common cascading failures

**Top-down enforced cascading.** Teams receive OKRs from leadership; commitment is shallow.

**Implicit cascading.** Team OKRs do not explicitly identify their ladders; alignment is ambiguous.

**Over-cascading.** Every team OKR forced to ladder to company; team-specific work dressed up artificially.

**Cascade theater.** Ladders documented but not driving anything.

**Personal-OKR overhead.** Individual cascading without proportional value.

**Mandate-strategy drift.** Teams with mandates disconnected from current strategy producing OKRs that ladder to nothing.

---

## Methodology-level choices that stay in the public skill

The cascading trade-off. When to cascade strictly and loosely. The middle path with explicit ladders. Worked example. Cascading anti-patterns. Team mandate considerations. Cascading frequency. Individual goals separation. Common failures.

## Implementation choices that stay internal

Specific OKR-tracking tools that visualize ladders. Specific cascade-review meeting formats. Specific role-based templates. The team's own conventions for surfacing team-specific OKRs. These vary by org and tooling.

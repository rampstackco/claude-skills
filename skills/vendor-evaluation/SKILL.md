---
name: vendor-evaluation
description: "Evaluate, select, and contract with vendors and SaaS tools. Use this skill when comparing alternatives, running an RFP, scoring vendors against criteria, negotiating contracts, planning a switch, or assessing a vendor's risk. Triggers on vendor evaluation, RFP, vendor selection, build vs buy, SaaS evaluation, vendor scorecard, vendor comparison, contract negotiation, vendor switch, procurement. Also triggers when a renewal is coming up or when a tool isn't meeting expectations."
---

# Vendor Evaluation

Pick the right tool or service, negotiate fair terms, and avoid the lock-in traps. Stack-agnostic. Applies to SaaS, infrastructure providers, agencies, and any external dependency.

---

## When to use

- Selecting a tool or vendor for a new need
- Evaluating alternatives to a current vendor
- Build vs buy analysis
- Renewal coming up: should we stay or switch?
- Running a formal RFP or RFI
- Comparing finalists in a vendor selection
- Negotiating a contract
- Assessing vendor risk (financial, security, dependency)

## When NOT to use

- General cost reduction (use `cost-optimization`)
- Specific contract legal terms (those go to legal)
- Performance issues with an existing vendor (try fixing before switching)
- Hiring an agency for a one-off project (lighter framework needed)

---

## Required inputs

- The need (what problem are you solving, what would success look like)
- Constraints (budget, timeline, integration requirements)
- Stakeholders (users, IT, security, finance, legal)
- Existing context (what's already used, what's been tried)
- Compliance requirements

---

## The framework: 5 phases

A structured vendor evaluation. Skip phases at your peril.

### Phase 1: Define the need

Before looking at vendors, define what you actually need.

- What problem are you solving?
- What's the user / use case?
- What does "success" look like in 6 months? In 2 years?
- What's the budget (range, not just ceiling)?
- What's the timeline?
- Are there must-have integrations or constraints?

The temptation: skip this and start demoing. Vendors are happy to show off; you end up choosing what looks shiny rather than what fits.

### Phase 2: Build vs buy

Before evaluating vendors, decide whether you should build instead.

**Build when:**
- It's core to the business (differentiating)
- The need is so specific no vendor matches
- The economics work at your scale
- You have the team to maintain it
- Vendor lock-in would be unacceptable

**Buy when:**
- It's table stakes (not differentiating)
- The need is well-served by existing products
- The economics favor it
- The team should focus elsewhere
- The vendor's specialization beats your generalism

Most teams over-build. The rule of thumb: buy unless there's a strong reason to build. Then question even that strong reason.

### Phase 3: Generate the shortlist

Cast a wider net than feels comfortable, then narrow.

Sources:
- Internal team's existing knowledge
- Industry analyst reports (Gartner, Forrester, etc.)
- Peer recommendations (other companies similar to yours)
- Reviews (G2, Capterra; with caveats about review quality)
- Adjacent vendors you already use (often have the feature you need)
- Open-source alternatives

Cast wide first. Aim for 5-8 candidates. Then narrow to 2-4 finalists for deep evaluation.

### Phase 4: Score the finalists

Use a scorecard. Without one, you'll be swayed by demo theatrics or who has the friendliest sales rep.

Scorecard dimensions (weight by your situation):

**Functional fit (40%):** Does it do what you need? Edge cases handled? UX quality. Workflow fit.

**Technical fit (15%):** Integration with your stack. API quality and completeness. Data export and portability. Performance at your scale. Self-hosted, hybrid, or SaaS-only.

**Operational fit (10%):** Onboarding effort. Training and adoption. Documentation quality. Support quality (test by submitting a ticket). SLAs.

**Security and compliance (10%):** SOC 2, ISO 27001, HIPAA, etc., as applicable. Data residency. Encryption at rest and in transit. Access controls and audit logs. Penetration test results (ask). Subprocessors.

**Vendor health (10%):** Years in business. Funding and runway (or revenue if private). Customer base size and similar customers. Public references. Roadmap visibility.

**Cost (10%):** License or subscription cost. Implementation and onboarding cost. Training cost. Integration cost. Opportunity cost (in-house resource time). Switching cost (in case of failure).

**Lock-in risk (5%):** Data export quality. Standard formats vs proprietary. Migration paths to alternatives. Open standards alignment. Contract escape clauses.

Score each finalist 1-5 on each dimension. Multiply by weight. Sum.

The score isn't gospel. It surfaces the tradeoffs.

### Phase 5: Negotiate

Most enterprise contracts are negotiable. Most aren't negotiated.

**What's negotiable:**
- Price (multi-year, volume, prepayment, end-of-quarter timing)
- Terms (payment schedule, renewal terms)
- Success commitments (training, onboarding, support)
- SLAs (uptime, response time, credits)
- Termination clauses (auto-renewal, notice period, data export)
- Liability caps and indemnity (legal will care about these)
- Subprocessors and data handling (security/legal cares)

**Common negotiation moves:**
- Multi-year discount (3-year for a 15-30% discount is common)
- Volume tiers (commit to higher usage for a per-unit discount)
- Annual prepayment for a discount
- Free or discounted onboarding
- Pilot pricing (trial period at reduced rate)
- "Most favored customer" clauses (if your size warrants)

**What to avoid:**
- Multi-year lock with no escape clause for material breach
- Auto-renewal with short notice window (under 60 days; want longer)
- "All right, no further negotiation" stance from the start
- Signing without legal review

---

## Workflow

### Step 1: Define the need

Write a one-page brief: what we need, why, success criteria, constraints, stakeholders.

### Step 2: Build vs buy

Honestly answer the build/buy question. Document the rationale.

### Step 3: Generate shortlist

Wider net first, narrowed via desk research:
- Read summaries
- Skim reviews
- Look at customer logos
- Skim docs
- Skim API specs

Eliminate obvious misfits. Land on 2-4 finalists.

### Step 4: Run demos and trials

For each finalist:
- Demo with the use case (don't take their default demo; bring yours)
- Trial period if possible
- Reference calls with similar customers
- Pilot with real data if feasible

Don't be charmed by the polished demo. Try it with your real workflow.

### Step 5: Run security and compliance review

Critical for any vendor handling sensitive data:
- Request SOC 2 / ISO 27001 reports
- Review their security questionnaire (most have one ready)
- Verify data handling matches your requirements
- Identify subprocessors

This can take weeks for enterprise vendors. Start early.

### Step 6: Score

Apply the scorecard. Do this collaboratively with stakeholders.

The scoring conversation matters more than the final number. It surfaces disagreement (one person scored UX 5, another scored 2: why?).

### Step 7: Negotiate

With the apparent winner:
- Open negotiation by asking for terms (not just price)
- Be willing to walk
- Run negotiations with #2 in parallel where appropriate (gives you leverage)

### Step 8: Plan the rollout

Contract signing is the start, not the end. Plan:
- Onboarding owner
- Training plan
- Migration plan if replacing an incumbent
- Success criteria at 30, 90, 180 days
- Renewal calendar

### Step 9: Document

Record:
- The decision and the rationale
- Alternatives considered
- Scorecard results
- Negotiated terms
- Renewal date and notice deadlines
- Owner of the relationship

This is gold for the next renewal or the next similar evaluation.

---

## Failure patterns

**Skipping the needs definition.** Demoing first. Buying what's shiny. Realizing 6 months in that the actual need wasn't met.

**Single-source decisions.** Talking to one vendor; deciding. No comparison. Probably overpaying or under-fitting.

**Charisma-driven decisions.** Buying based on the sales rep's likability. The product is what you'll use for years; the rep won't be there.

**Reference calls that the vendor curated.** Of course their references love them. Find references the vendor didn't suggest.

**Glossing over security.** Security review skipped because of timeline pressure. Then a breach. Slow down or accept the risk explicitly.

**Demos that don't match the use case.** Their default demo, not yours. Always do a use-case demo.

**Trial that doesn't simulate real usage.** A trial with synthetic data tells you the product works in synthetic conditions. Use real (or close to real) data.

**Negotiating only on price.** Terms, SLAs, and exit clauses matter more for long-term satisfaction than 5% price.

**Auto-renewal without notice tracking.** Renewal happens; rate goes up 15%. No one was watching. Track renewals; review with notice.

**Lock-in without exit plan.** Tightly integrating into a vendor's proprietary surface. When you want to leave, you can't. Plan exit at the start.

**Multi-year contract for an unproven vendor.** Save the multi-year for vendors you trust. New vendor: shorter term, evaluate after.

**No internal champion.** Tool selected; no one drives adoption. Tool sits unused. Identify the champion before signing.

**Negotiating after a verbal commitment.** "Yes, we want to buy" means they have less reason to negotiate. Keep options open until terms are settled.

**Ignoring red flags in security review.** Vendor's security responses are evasive or incomplete. Treat as a no.

**Comparing apples to oranges.** Vendors price differently (per user, per usage, flat). Build a comparable cost model at your scale.

---

## Output format

A vendor evaluation document includes:

- **Need brief:** problem, success criteria, constraints
- **Build vs buy decision:** with rationale
- **Shortlist:** 2-4 finalists with brief description
- **Scorecard:** filled out per finalist
- **Demo and trial notes:** what was learned
- **Security and compliance summary:** findings per finalist
- **Reference call notes:** what customers said
- **Recommendation:** which vendor, with rationale
- **Negotiated terms:** what was agreed
- **Rollout plan:** onboarding, training, migration
- **Renewal calendar:** with notice deadline

---

## Reference files

- `references/evaluation-rubric.md` - Scoring template with weighted dimensions, 1-5 scale criteria for each dimension, and a worked vendor-comparison example.

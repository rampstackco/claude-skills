# Routing patterns

By size, use case, geography, language, account ownership. Unrouted-lead default.

The specific routing rules that translate qualification answers into rep assignments. Done well, routing matches lead to rep cleanly; done poorly, leads bounce around or land on wrong reps.

---

## Routing-by-company-size

The most common routing axis.

**Pattern.**

- 1-50 employees: SDR or self-serve.
- 51-500 employees: AE.
- 501-2000 employees: senior AE.
- 2000+ employees: enterprise AE.

**Why it works.** Different sizes have different sales motions; rep tier should match.

**Failure modes.**

- Size bands set years ago; team scaled; bands no longer right.
- Size data missing or stale.
- Solo founders with backed companies appear "small" but warrant senior treatment.

---

## Routing-by-use-case

Different specialists for different product use cases.

**Pattern.**

- Use case A: rep with A specialty.
- Use case B: rep with B specialty.
- General use case: any AE.

**Why it works.** Specialists arrive with deeper context; conversion higher.

**Failure modes.**

- Specialist becomes bottleneck.
- New use cases without assigned specialist.
- Use case overlap; multiple specialists could fit.

---

## Routing-by-geography

Different reps for different regions or time zones.

**Pattern.**

- Americas: US-based AEs.
- EMEA: European AEs.
- APAC: APAC AEs.

**Why it works.** Time zone alignment; cultural fit; language fit.

**Failure modes.**

- Insufficient coverage in some regions.
- Cross-region accounts confuse routing.
- Geography data missing or wrong.

---

## Routing-by-language

Native-language reps for non-English-primary leads.

**Pattern.**

- English-primary: US/UK AEs.
- Spanish-primary: Spanish-speaking AEs.
- Etc.

**Why it works.** Native-language conversation produces better calls.

**Failure modes.**

- Incomplete language coverage.
- Multi-language leads bounce.
- Language inferred wrong from email or location.

---

## Routing-by-account-ownership

If the lead's company is already in pipeline or a customer, route to the owning AE.

**Pattern.**

- Detect domain match against CRM.
- If match, route to AE who owns the account.
- If no match, default routing.

**Why it works.** Account owner has context; avoids confusion.

**Failure modes.**

- Domain detection misses subsidiaries or aliases.
- Account ownership stale (former AE).
- New lead from existing account but for unrelated use case.

---

## Routing-by-source

Different reps for different lead sources (paid, organic, partner, referral).

**Pattern.**

- Partner-sourced leads: partner-channel AE.
- Paid-sourced leads: marketing-aligned AEs.
- Organic-sourced: general AEs.

**Why it works.** Different sources signal different commitment; specialists handle differently.

**Failure modes.**

- Source data missing or attribution wrong.
- Paid traffic includes high-fit leads who would have come organically.

---

## Routing-by-tier

Combining size, use case, and other signals into a tier score.

**Pattern.**

- Lead score 80-100: senior AE.
- Lead score 50-79: AE.
- Lead score 0-49: SDR or async.

**Why it works.** Single score combines multiple signals.

**Failure modes.**

- Score model out of date.
- Score thresholds wrong for current capacity.
- Score data incomplete; defaults dominate.

---

## The unrouted-lead default

Some leads do not fit obvious routing.

**Patterns for default.**

- **Round-robin among all available reps.** Simple.
- **Catchall AE.** One rep gets all unrouted leads.
- **Async or self-serve.** Lead goes to a self-serve resource if no obvious rep.

**The discipline.** Default rule should be explicit. Unrouted leads should not silently fail or bounce.

---

## Routing transparency

Prospect-side vs rep-side visibility.

**Prospect-side.** Generally, prospects do not see routing logic. They see a calendar with available times.

**Rep-side.** Reps should see why they were assigned (lead score, fit signals). Helps with prep.

**Anti-pattern.** Routing happens silently; rep does not know what made this lead route to them.

---

## Routing changes and team transitions

When the team changes, routing must follow.

**Common transitions.**

- Rep leaves; their accounts and routing reassign.
- New rep hires; routing weights adjust.
- Tier restructure (rep promoted from SDR to AE).
- Specialty changes.

**The maintenance discipline.** Routing rules update as team changes. Stale routing can route leads to absent reps.

---

## Routing analytics

Track routing effectiveness.

**Metrics.**

- Per-rep booking volume.
- Per-rep conversion (booking-to-sale).
- Per-route conversion (route x → sale rate).
- Routing override rate (manual reassignments).

**Diagnostic uses.**

- Per-rep volume uneven without reason: routing logic skewing.
- Per-route conversion uneven: routing matching wrong.
- High override rate: routing logic not capturing real fit.

---

## Common routing failures

**Routing data missing.** Qualification did not capture; routing defaults dominate.

**Stale routing rules.** Team changed; rules did not.

**Stale rep weights.** Performance scores from quarters ago.

**Account-ownership detection wrong.** Subsidiary leads route to unfit AE.

**Specialty routing without specialty data.** Specialty-based routing requires tagging; tags miss.

**Default rule unclear.** Unrouted leads silently fail.

**Routing override frequent.** Reps reassign manually; routing logic does not match reality.

**Round-robin for tiered team.** High-fit leads land on junior reps.

---

## Methodology-level choices that stay in the public skill

Routing patterns by size, use case, geography, language, account ownership, source, tier. The unrouted-lead default. Routing transparency. Team transitions. Routing analytics. Common failures.

## Implementation choices that stay internal

Specific routing rules for specific teams. Specific size bands and tier thresholds. Specific tooling. The team's audit calendar. These vary by team.

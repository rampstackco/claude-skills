# Availability logic patterns

Round-robin, weighted, fit-based, hybrid. Match-to-rep discipline.

How the scheduler decides which rep gets which booking. Done well, availability logic distributes load while matching high-fit leads to senior reps; done poorly, leads land on the wrong reps and conversion suffers.

---

## The match-to-rep principle

The qualification fields feed routing logic. Routing fails if qualification does not capture routing-relevant data.

**The win.** A high-fit enterprise lead (large company, urgent timeline) sees availability for senior AEs. Low-fit lead (small team, exploring) sees availability for SDRs. Each lead gets the right call.

**The fail.** Same scheduler with pure round-robin. Enterprise lead lands on an SDR; SDR is unprepared; conversion drops.

The discipline. Routing is not separate from qualification; the two are coupled.

---

## Pattern A: Pure round-robin

Bookings cycle through available reps in order.

**How it works.**

- Available reps in the queue.
- Each booking goes to the next rep.
- Cycle continues.

**Strengths.**

- Even distribution.
- Simple logic.
- Easy to explain to the team.

**Weaknesses.**

- Does not match high-fit leads to senior reps.
- Does not load-balance based on capacity.
- Does not account for rep specialization.

**When to use.** Small teams; reps are interchangeable; volume is low.

---

## Pattern B: Weighted round-robin

Bookings cycle but weighted by rep performance, capacity, or specialty.

**How it works.**

- Each rep has a weight (performance score, capacity, etc.).
- Distribution skews toward higher-weighted reps.
- Still distributes; just unevenly.

**Strengths.**

- Higher-performing reps get more bookings.
- Capacity differences accommodated.

**Weaknesses.**

- Lower-performing reps get fewer learning opportunities.
- Weighting must be maintained.

**When to use.** Teams with significant rep performance differences; teams where capacity differs.

---

## Pattern C: Fit-based routing

High-fit leads route to senior reps; lower-fit leads route to SDRs or async resources.

**How it works.**

- Qualification fields determine fit score.
- High-fit leads see availability for senior reps only.
- Lower-fit leads see availability for SDRs.

**Strengths.**

- Senior reps focus on high-value conversations.
- SDRs handle qualification and nurture.
- Resource allocation matches lead value.

**Weaknesses.**

- Requires clear fit signals from qualification.
- May produce uneven workload (senior reps light, SDRs heavy).

**When to use.** Teams with multi-tier sales motion; clear fit signals captured.

---

## Pattern D: Specialty-based routing

Bookings route to reps with specific expertise.

**How it works.**

- Qualification captures use case or industry.
- Bookings route to the rep with matching specialty.

**Strengths.**

- Rep is genuinely prepared for the specific conversation.
- Higher conversion when specialty matches.

**Weaknesses.**

- Specialist reps can become bottlenecks.
- Requires per-rep specialty tagging.

**When to use.** Products with multiple distinct use cases or verticals.

---

## Pattern E: Account-ownership routing (B2B)

If the lead's company is already in pipeline or a customer, route to the owning AE.

**How it works.**

- Qualification or domain matching detects existing-account leads.
- Bookings route to the AE who owns the account.
- Override default routing.

**Strengths.**

- Account owner has context.
- Avoids confusion of multiple reps on the same account.

**Weaknesses.**

- Requires CRM integration to detect ownership.
- Account ownership must be current.

**When to use.** B2B teams with account-ownership models.

---

## Pattern F: Hybrid

Combining patterns. Most production teams use hybrid.

**Common combinations.**

- Account-ownership routing first (existing accounts to AEs).
- Then fit-based routing (high-fit new leads to senior AEs).
- Then specialty-based routing within tier.
- Then round-robin within remaining pool.

**Strengths.**

- Handles common cases.
- Routes lead to best-matched rep.

**Weaknesses.**

- More complex to maintain.
- More edge cases to handle.

**When to use.** Mature production teams with multi-tier sales motion.

---

## Calendar integration

How availability connects to actual calendars.

**Direct calendar integration.** Scheduler reads rep calendars; shows actual availability.

Strengths. No double-booking; reflects reality.

Weaknesses. Requires calendar permissions; integration brittle.

**Office hours definition.** Reps define availability windows; scheduler shows those.

Strengths. Simpler integration; no calendar permissions needed.

Weaknesses. Manual maintenance; reps may forget to update.

**Hybrid.** Scheduler uses office hours plus calendar busy/free for fine-grain.

Strengths. Resilient to integration issues.

Weaknesses. More complex.

---

## Buffer time

Time between meetings.

**Why it matters.** Back-to-back meetings produce rushed reps and late starts. Buffer protects rep effectiveness.

**Common buffers.** 10-15 minutes between meetings.

**The discipline.** Buffer should be in the calendar logic, not optional.

---

## Capacity caps

How many meetings per day per rep.

**Why caps matter.** Reps booked solid produce poor calls; quality drops; conversion suffers.

**Common caps.** 3-5 demos per day per rep typical for B2B SaaS.

**The discipline.** Caps respect rep effectiveness, not just calendar availability.

---

## Time zone handling

The scheduler shows availability in the prospect's time zone.

**The principle.** Display in prospect's time zone; reps see in their own.

**Common patterns.**

- Auto-detect from browser; show prospect that detection.
- Allow manual override.
- Display rep's time zone for clarity ("PT" badge).

**Anti-pattern.** Showing all times in rep's time zone; prospect has to convert mentally.

---

## Out-of-office and holiday handling

Real life intervenes.

**Patterns.**

- Calendar integration handles vacation as busy time.
- Manual office-hours updates handle planned absences.
- Holiday calendars block company-wide closures.

**The discipline.** Out-of-office should be respected automatically; otherwise no-shows happen.

---

## Common availability failures

**Pure round-robin for tiered teams.** High-fit leads land on junior reps.

**No capacity caps.** Reps overbooked; quality drops.

**No buffer.** Meetings run late; reps are stressed.

**Time zone confusion.** Prospect sees rep's time zone; bookings happen at wrong times.

**Stale rep weights.** Weighted round-robin uses last-quarter performance; recent changes ignored.

**Specialty routing without specialty data.** Specialty-based routing requires per-rep tagging; missing tags route incorrectly.

**Account-ownership not detected.** Existing-account lead bounces around between reps.

**Calendar integration broken.** Double-bookings happen; trust degrades.

---

## Methodology-level choices that stay in the public skill

The match-to-rep principle. Patterns A through F (round-robin, weighted, fit-based, specialty, account-ownership, hybrid). Calendar integration. Buffer time. Capacity caps. Time zone handling. Out-of-office and holiday handling. Common failures.

## Implementation choices that stay internal

Specific routing logic for specific teams. Specific weights and caps. Specific tooling. The team's audit calendar. These vary by team.

# Audit cadence patterns

Quarterly audit vs continuous monitoring vs hybrid. Tradeoffs, integration patterns, and alert-threshold design.

The audit cadence determines how quickly decay signals turn into refresh decisions. Programs that audit annually catch decay 9-12 months late; programs that monitor continuously without an audit layer catch sharp decay early but miss the slow-drift and content-drift signals that need human review. The hybrid pattern is the standard for mature programs.

---

## The quarterly audit

A formal review of the content library every 90 days.

**The mechanics.**

- The team blocks 1-3 days per quarter for the audit.
- Pull data: traffic per URL over the last 90 and 180 days, rankings on target keywords, last-modified dates, target-keyword SERP samples.
- Run each piece through the five-signal checklist (see `refresh-signals-checklist.md`).
- Assign each piece a disposition: refresh (with depth), merge, delete, monitor, no action.
- Output a refresh queue prioritized by the prioritization matrix.

**Strengths.**

- Predictable. The team knows when audit work happens and can plan around it.
- Auditable. Each quarter's decisions are documented; patterns over multiple quarters become visible.
- Comprehensive. The signal types that need human judgment (content drift, SERP intent shift) get reviewed; continuous monitoring cannot detect these without human eyes.
- Capacity-aware. Audit work happens at known times; new production schedules can flex around it.

**Weaknesses.**

- 90-day delay in detecting sharp decay. A piece that lost 40% traffic in week 2 of the quarter is in decay for 75 days before the audit catches it.
- Heavy lift. Auditing 200-2,000 pieces in 1-3 days requires structured tooling; teams without tooling burn out.
- Focus on the audit moment can crowd out continuous attention. "We will catch it next quarter" becomes the answer to issues that warrant immediate response.

---

## Continuous monitoring

Automated detection of traffic and ranking shifts with alerts when thresholds are crossed.

**The mechanics.**

- Define thresholds for sharp decay: e.g., traffic drop of 25%+ in 14 days, ranking drop of 5+ positions in 14 days.
- Automated monitoring runs daily or weekly, comparing current data to baseline.
- Alerts route to the editorial owner of the affected piece (or to a refresh queue triage owner if pieces do not have individual owners).
- Triage decides whether the alert warrants immediate refresh, addition to the next quarterly audit's queue, or dismissal as noise.

**Strengths.**

- Catches sharp decay early. Algorithm-update fallout, technical regressions, and dramatic SERP intent shifts get attention within days, not 75-90 days.
- Allows fast response. A piece that lost 50% traffic on a specific date can be investigated while the cause is fresh.
- Reduces audit-day exhaustion. Sharp signals are handled in real time; the quarterly audit focuses on the slower signals.

**Weaknesses.**

- Requires monitoring infrastructure. Teams need rank tracking, traffic monitoring, and alerting that can route to specific URL owners.
- Alert fatigue if thresholds are too tight. Daily alerts on minor fluctuations train the team to ignore the alerts; thresholds need calibration.
- Misses slow decay. Pieces declining 5-8% per quarter never cross thresholds; they accumulate decay invisibly. The quarterly audit is what catches these.
- Misses non-traffic signals. Continuous monitoring on traffic and rankings cannot detect content drift or factual staleness.

---

## The hybrid pattern

Most strong refresh programs run both. The quarterly audit catches slow decay, content drift, and pieces that are stable but no longer match the brand's current positioning. Continuous monitoring catches sharp decay and algorithm-update fallout.

**Integration shape.**

- Continuous monitoring runs daily or weekly with a small set of well-calibrated thresholds.
- Quarterly audit runs the full signal checklist on the whole library.
- Pieces that triggered continuous-monitoring alerts during the quarter get fast-track disposition; the quarterly audit reviews the rest.
- The continuous-monitoring log feeds into the quarterly audit so the team can see whether thresholds are calibrated correctly (too many false alerts, too few real ones).

**Capacity split.** A typical hybrid pattern might allocate 5-10% of editorial capacity to continuous-monitoring response (a few hours per week) and a concentrated 1-3 days per quarter to the audit. The split scales with library size and decay rates.

---

## Alert-threshold design

Calibrating continuous-monitoring thresholds is its own discipline.

**Threshold goals.**

- High precision: when the threshold is crossed, the alert is usually a real signal, not noise.
- Reasonable recall: catches the sharp-decay events that matter; does not need to catch every minor fluctuation (the audit catches those).
- Sustainable cadence: alerts arrive at a frequency the team can triage without fatigue.

**Threshold patterns that work.**

- Traffic: 25%+ drop in 14 days, sustained over 21 days. The sustainment requirement filters volatility.
- Ranking: 5+ position drop on a tracked keyword, sustained over 14 days. Single-day drops are noise; sustained drops are signal.
- Indexing: any unexpected change in indexed status (200 to non-200 status, sudden noindex tag, sudden disappearance from index). These are usually technical regressions and warrant immediate attention.
- Schema validation: schema breaking or warnings appearing on a piece that previously validated cleanly. Often indicates a CMS update or template change.

**Threshold patterns that fail.**

- 10% traffic drop alerts produce far too many false positives; teams stop reading the alerts.
- Single-day rank drop alerts produce noise; SERP volatility within a few positions is normal.
- Aggregate-traffic alerts on whole categories rather than per-URL alerts hide which specific pieces are decaying.

**Threshold tuning.** Run alerts in shadow mode for 4-6 weeks before committing. Track whether alerts correspond to real signals on review. Adjust thresholds based on the precision-recall observed.

---

## When to audit more frequently

Some programs warrant more than quarterly audits.

**Programs in active rebuild.** Content libraries undergoing structural redesign or hub reorganization benefit from monthly audits during the rebuild phase. The signal volume is higher and the decisions need faster cycle time.

**Post-algorithm-update period.** In the 30-90 days after a major algorithm update, signal volume spikes. Some teams run a special audit at the 30-day post-update mark in addition to the regular quarterly cadence.

**Programs with rapid topic evolution.** Topics that move quickly (AI tools, evolving regulatory environments, tactical playbooks in fast-moving fields) may benefit from monthly factual-staleness checks even when traffic and ranking signals are stable.

---

## When to audit less frequently

Some programs can run on lighter cadence.

**Small libraries (under 50 pieces) with stable performance.** Bi-annual audits may be sufficient if continuous monitoring is in place and the library has shown stable decay rates over multiple cycles.

**Libraries dominated by evergreen pieces.** When the topical mix is heavily evergreen (foundational concepts that move slowly), quarterly audits may produce limited signal volume. Combine with continuous monitoring; reduce audit frequency.

The discipline. Cadence should match decay rate, not be fixed by convention. Programs that decay quickly need faster cadence; programs that decay slowly can run longer audit cycles.

---

## Audit anti-patterns

**Annual audit as the only cadence.** Catches decay 9-12 months late; the library is in significant erosion before the audit runs.

**Continuous monitoring without quarterly audit.** Catches sharp decay; misses slow decay, content drift, and SERP intent shifts that need human review.

**Audit happening but no follow-through.** The team runs the audit, produces a queue, then loses momentum on actually executing the refreshes. The audit becomes a documentation exercise rather than a refresh-driving exercise.

**Audit without prioritization.** The output is a list of every piece showing any signal, with no value-weighted prioritization. The team does the cheapest refreshes first regardless of value, leaving high-value-decaying pieces in the backlog.

**Audit without depth assignment.** Pieces are tagged "refresh" without specifying depth. Refresh execution defaults to whatever depth the team has time for, which is often light edit even when substantial revision is needed.

---

## Audit governance

Who runs the audit, who approves dispositions, how the queue routes to execution.

**Single audit owner.** A specific person runs the audit each quarter, accountable for signal quality and disposition recommendations.

**Disposition review.** Refresh, merge, and delete dispositions are reviewed by a content lead or director. Delete dispositions in particular need approval because they are irreversible (pieces deleted and not redirected can lose authority that did not need to be lost).

**Queue routing.** The refresh queue routes to specific editorial owners based on capacity, expertise, and the depth of work required. Light edits route to anyone with capacity; full rewrites route to the writer or editor best matched to the topic.

**Audit log.** Each quarter's audit, dispositions, and outcomes are logged. The log feeds the next quarter's review (which dispositions actually shipped, which produced recovery, which patterns are emerging).

---

## Methodology-level choices that stay in the public skill

The quarterly audit mechanics, continuous monitoring mechanics, hybrid pattern, alert-threshold design principles, audit-cadence variations, audit governance shape, and the anti-patterns.

## Implementation choices that stay internal

Specific monitoring tools the team uses (rank trackers, analytics platforms, alerting systems). Specific threshold values calibrated to the team's data. Specific dashboards and reporting templates. Specific ticketing or queue systems for refresh routing. Specific automation scripts that pull data into audit-ready formats. The team's own audit-day rituals and tooling. These vary by team, tooling, and library size.

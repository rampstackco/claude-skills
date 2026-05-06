# Effectiveness measurement

Per-refresh tracking, 30/90-day recovery measurement, pattern detection, the refresh-that-did-not-work review. The discipline that prevents refresh-theater and turns the refresh program into a learning system.

Refresh effectiveness measurement is the difference between a program that learns and a program that runs. Programs without measurement run the same patterns indefinitely, including the patterns that do not work; programs with measurement see which refreshes produce recovery, which do not, and what the patterns reveal about depth, signal interpretation, and disposition decisions.

---

## Per-refresh tracking

Each refresh is logged with the data needed to evaluate it.

**The minimum log.**

- **URL.** The refreshed piece.
- **Date shipped.** When the refresh published.
- **Signals that triggered the refresh.** Which of the five signal categories were active; signal severity.
- **Disposition.** Refresh, merge, delete (with target URLs for merge).
- **Depth.** Light edit, substantial revision, full rewrite, structural redesign.
- **Owner.** Who shipped the refresh.
- **Capacity spent.** Hours of editorial time invested.
- **Predicted outcome.** What the team expected the refresh to produce (recovery within X% in Y days, or qualitative expectation).
- **Actual outcome at 30 days.** Traffic, ranking, engagement metrics post-refresh vs pre-refresh.
- **Actual outcome at 90 days.** Same metrics extended to 90 days.
- **Notes.** Qualitative observations on what happened, surprising patterns, questions raised.

**Why the minimum log.** Each field is load-bearing for pattern detection. Without signals, you cannot tell whether decay-driven refreshes recover differently from drift-driven refreshes. Without depth, you cannot tell whether full rewrites outperform substantial revisions. Without capacity, you cannot evaluate ROI.

**The log as program memory.** Across years, the log becomes the program's accumulated learning. A team that has logged 200 refreshes can answer questions like "what is the typical recovery curve for substantial-revision refreshes on traffic-decayed pieces?" with data; a team without the log answers the same question with anecdote.

---

## 30-day recovery measurement

The first measurement window post-refresh.

**What the 30-day window shows.**

- **Schema and indexing recognition.** Search engines have crawled the updated piece and registered the modified date.
- **Initial ranking response.** Some ranking shifts happen within days as the search engine re-evaluates; others take longer.
- **Audience engagement spike.** Re-promotion produces traffic from newsletter, social, and syndication. The 30-day window captures the immediate engagement.
- **Quick wins or regressions.** If the refresh broke something (regressions in indexing, schema, or ranking), the 30-day window catches it.

**What the 30-day window does not show.**

- **Sustained recovery.** Initial spikes from re-promotion fade; the 30-day window cannot distinguish sustained recovery from re-promotion afterglow.
- **Algorithm-update response.** If an algorithm update happens after the refresh, the 30-day measurement may be confounded.
- **Long-tail keyword recovery.** Some long-tail rankings move slowly; the 30-day window may show only head-term response.

**The 30-day pattern.** Most refreshes that will produce sustained recovery show some signal at 30 days: ranking improvement, traffic uptick, engagement spike. Refreshes that show no signal at 30 days are not necessarily failures, but they warrant attention; the 90-day measurement will resolve the question.

---

## 90-day recovery measurement

The longer-window measurement that confirms or refutes the 30-day signal.

**What the 90-day window shows.**

- **Sustained recovery.** Initial spikes have faded; what remains is the refresh's durable contribution.
- **Algorithm-update integration.** Most algorithm updates have been digested; the 90-day data reflects the new state.
- **Long-tail keyword response.** Slower-moving rankings have settled.
- **Engagement-based metrics.** Time on page, return visits, scroll depth post-refresh vs pre-refresh.

**The 90-day pattern.**

- **Strong recovery.** Traffic and rankings are above pre-refresh baseline by 20%+. The refresh worked.
- **Modest recovery.** Traffic and rankings are 5-20% above pre-refresh baseline. The refresh helped but did not produce dramatic improvement.
- **No recovery.** Traffic and rankings are within 5% of pre-refresh baseline. The refresh was not effective.
- **Regression.** Traffic or rankings are below pre-refresh baseline. The refresh damaged the piece.

The 90-day measurement is the primary effectiveness measurement. The 30-day is the early-warning; the 90-day is the verdict.

---

## Pattern detection across refreshes

Individual refresh measurements are noisy. Patterns across refreshes are signal.

**Patterns the log reveals.**

- **Depth-effectiveness.** Are full rewrites producing better recovery than substantial revisions on similar signals? If yes, the team should consider deeper depth on similar future cases.
- **Signal-effectiveness.** Are traffic-decay refreshes recovering more reliably than content-drift refreshes? If yes, the program may benefit from prioritizing traffic-decay queue and being more selective about content-drift refresh.
- **Disposition-effectiveness.** Are pieces in the high-value-decaying quadrant recovering when refreshed, or are they continuing to decay? If continuing decay, the disposition may be wrong (merge or delete may have been better) or the underlying cause is structural (the topic is dying; competitors too strong).
- **Owner-effectiveness.** Are some owners producing better recovery than others on similar refreshes? Possibly skill differential, possibly capacity issues, possibly random variation that needs more data.
- **Topic-effectiveness.** Are refreshes on some topics recovering reliably while others do not? Some topics may be in structural decline; the program may need to reduce investment in those topics rather than increase refresh effort.

**Pattern detection cadence.** Quarterly review of accumulated refresh data. Year-over-year reviews on multi-year programs. The patterns inform program-level decisions about allocation, prioritization, and disposition defaults.

---

## The refresh-that-did-not-work review

Refreshes that did not produce recovery are the program's most valuable learning data.

**The review questions.**

- **Was the depth wrong?** Did the refresh need more depth than was applied? Light edit when substantial revision was needed produces no recovery on substantial-decay signals.
- **Was the disposition wrong?** Should the piece have been merged or deleted instead of refreshed? Refreshing a piece that should have been merged produces ongoing decay because the underlying authority-splitting was not addressed.
- **Was the signal interpretation wrong?** Did the team read decay as content-drift when it was actually competitor-displacement? Refresh on the wrong cause does not produce recovery.
- **Is the topic in structural decline?** Some topics decline structurally; refresh cannot recover what the topic itself has lost. The right disposition may be to reduce investment in the topic and reallocate capacity.
- **Did re-promotion happen?** Refresh-without-re-promotion underperforms; some "did not work" cases are actually "did not get re-promoted."

**The review output.** Each non-recovery refresh produces either: a re-disposition (try merge or delete), a depth re-attempt (next quarter try the deeper depth), or an acknowledgment that the topic is in decline and the program should reduce investment.

**The review's program impact.** Without the review, non-recovery refreshes accumulate as silent program failures. With the review, the patterns surface and the program adjusts.

---

## Effectiveness metrics by refresh purpose

Different refresh purposes warrant different primary metrics.

**Traffic-decay refreshes.** Primary metric: post-refresh traffic recovery vs pre-refresh baseline at 90 days. Secondary: ranking position recovery on target keywords.

**Ranking-drop refreshes.** Primary metric: ranking position recovery on target keywords at 90 days. Secondary: traffic recovery (rankings without traffic recovery suggest CTR issues that ranking alone does not capture).

**Factual-staleness refreshes.** Primary metric: less straightforward; the refresh's purpose is correctness, not recovery. Track that the staleness was caught before reader-detected errors compound. Secondary: any traffic recovery is bonus.

**SERP-intent-shift refreshes.** Primary metric: ranking on target keywords (rankings reflect format-fit). Secondary: engagement metrics (the refresh changed format; does the new format engage better?).

**Content-drift refreshes.** Primary metric: engagement metrics (time on page, return visits, conversions). Secondary: voice consistency review (qualitative; the refresh purpose was alignment with current brand positioning).

The metric should match the purpose. Programs that measure every refresh by traffic recovery miss the value of refreshes whose purpose was correctness or alignment rather than recovery.

---

## Common measurement failures

**No measurement at all.** Refreshes ship; outcomes are not tracked; the program runs without learning. Each refresh is a fresh prediction with no accumulated evidence.

**Measurement at the wrong window.** Measuring at 7 days captures only re-promotion afterglow; measuring at 6 months conflates many other variables. 30 and 90 days are the workable windows.

**Single-metric measurement.** Measuring only traffic ignores ranking, engagement, and conversion metrics. Different refresh purposes warrant different metrics.

**Measurement without context.** Comparing post-refresh metrics to pre-refresh metrics without accounting for seasonality, algorithm updates, or competitor activity produces noisy attribution.

**No pattern detection.** Per-refresh measurement happens but never gets aggregated into pattern review; the program does not learn across refreshes.

**No non-recovery review.** Successful refreshes get celebrated; failed refreshes get forgotten. The asymmetry hides the program's most valuable learning.

---

## Methodology-level choices that stay in the public skill

The minimum per-refresh log fields, the 30-day and 90-day measurement windows, the pattern-detection cadence, the refresh-that-did-not-work review, the metric-by-purpose mapping, the common measurement failures.

## Implementation choices that stay internal

Specific analytics dashboards that pull refresh metrics. Specific log structure in the team's project-management or content system. Specific seasonality models the team uses to baseline. Specific competitor-activity tracking that contextualizes attribution. Specific reviewer workflow for non-recovery refreshes. The team's own pattern-detection rituals. These vary by team, tooling, and analytics setup.

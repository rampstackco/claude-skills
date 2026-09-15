# Refresh signals checklist

Five signal categories that trigger refresh consideration, with detection patterns and the audit shape that surfaces signals across the library.

Pieces that show no signals do not need refresh. Pieces that show one or two signals warrant attention. Pieces that show three or more signals are typically in active decay and should be high in the prioritization queue. The signal taxonomy below is what distinguishes triaged refresh from calendar refresh.

---

## Signal 1: Traffic decay

Organic traffic to the piece is trending down over a 90+ day window beyond seasonal baseline.

**Detection patterns.**

- Pull traffic data per URL over rolling 90-day windows.
- Compare current 90 days to prior 90 days, accounting for known seasonality.
- A drop of more than 15-20% beyond seasonality on a piece that previously had stable traffic is a real signal.
- A drop of more than 40% in a 30-day window is a sharp signal warranting urgent review.

**What the signal usually means.**

- **Slow decay (5-10% over a year):** content drift. The piece is gradually losing relevance as the topic evolves or the brand's voice shifts.
- **Moderate decay (15-30% in a quarter):** ranking position drift, or SERP intent shifting, or competitor publication.
- **Sharp decay (40%+ in a month):** algorithm update, indexing issue, dramatic SERP intent shift, or technical regression on the URL.

**Diagnostic next steps.** When traffic decay is detected, check ranking positions for the piece's target keywords (signal 2 may also be active), check for technical issues (indexability, page speed, broken redirects), and check the SERP for intent shift (signal 4).

**Anti-patterns in detection.**

- Comparing month-over-month rather than 90-day windows over-attributes seasonal noise to decay.
- Ignoring known seasonality (holiday traffic, B2B dropping in late December) produces false positives.
- Looking only at total traffic instead of organic specifically blurs the signal with referral or paid changes.

---

## Signal 2: Ranking drops

The piece is losing position on its target keywords.

**Detection patterns.**

- Track each piece's primary 3-10 target keywords with rank tracking.
- Drops from page 1 to page 2-3 are particularly consequential because click-through rates fall sharply at the page-1-to-page-2 boundary.
- Drops within page 1 (position 3 to position 7) reduce clicks but are less existential.
- Persistent drops over 30+ days are real shifts; week-over-week volatility within a few positions is normal.

**What the signal usually means.**

- A piece that was at position 3 and is now at position 8 has been displaced by stronger competing pieces. The displacement is informative; review what is now ranking and what those pieces have that this piece does not.
- A piece that was at position 5 and is now at position 35 has likely been algorithm-affected, indexing-affected, or technically regressed. Investigate before refresh; refreshing a piece with an indexing issue does not solve the indexing issue.
- Drops on long-tail keywords with simultaneous gains on broader head terms can indicate the piece's focus has broadened beneficially. Not always a refresh signal.

**Diagnostic next steps.** Pull the SERP for each target keyword. Examine what is ranking. Identify whether the new rankings are stronger pieces (refresh signal: improve the piece) or different SERP intent (signal 4: SERP intent shift, possibly different format needed).

**Anti-patterns in detection.**

- Treating any rank movement as a refresh signal produces refresh-on-noise; require persistence over 30+ days.
- Tracking only branded keywords misses the meaningful organic ranking signal.
- Ignoring keyword cannibalization (multiple pieces competing for same keyword) treats split rankings as a refresh signal when the actual disposition is merge.

---

## Signal 3: Factual staleness

The piece contains statistics, references, examples, or claims that are dated.

**Detection patterns.**

- Annual review of statistics in the piece. Any stat older than 3 years on a fast-moving topic is a candidate for staleness flagging.
- Reference checks for defunct products, platforms, services, or companies named in the piece.
- Example checks for examples that have aged poorly (a 2019 case study of a company that has since gone bankrupt or changed direction).
- Framing checks for claims that no longer match current reality ("AI is starting to influence search" in 2026 is anachronistic).

**What the signal usually means.**

- Factual staleness alone is often a light-edit signal: update the stats, replace dead links, swap dated examples. The piece's structure may be sound.
- Factual staleness combined with traffic decay or ranking drops is a stronger signal that the piece's broader framing has aged, not just the surface details.
- Factual staleness on a flagship piece is more urgent than on a low-traffic piece because flagship pieces are read by more people who notice the staleness.

**Diagnostic next steps.** List the specific stale facts, references, and examples. Estimate the light-edit time required to refresh them. If the structural framing is also stale, the depth required is substantial revision rather than light edit.

**Anti-patterns in detection.**

- Treating every old stat as stale when the stat may still be current (some stats genuinely have not changed in 3 years) produces unnecessary refresh.
- Ignoring framing-level staleness while updating individual stats produces pieces that are technically current in stats but feel old in voice.

---

## Signal 4: SERP intent shift

The dominant SERP format for the target keyword has changed.

**Detection patterns.**

- Pull the current SERP for each target keyword. What format is dominating? Articles? Listicles? Videos? Product comparisons? AI overviews?
- Compare to the piece's format. If the piece is an article and the SERP wants product comparisons, intent has shifted.
- Watch for new SERP features that did not exist when the piece was written: AI overviews, generative answers, knowledge panels, featured-snippet shifts.

**What the signal usually means.**

- The piece may still rank but increasingly for the wrong reasons. Click-through rates fall as the SERP signals the piece is not the dominant intent match.
- The piece may need format restructuring (full rewrite or substantial revision rather than light edit) to fit the new dominant intent.
- Sometimes the right disposition is to write a NEW piece in the new dominant format and either consolidate the old piece into it or keep the old piece for the residual intent it still serves.

**Diagnostic next steps.** Read the top-ranking pieces for the target keyword. What format are they? What questions do they answer that the piece does not? Decide whether refresh in the new format will recover the position, or whether a new piece in the new format is the better disposition.

**Anti-patterns in detection.**

- Ignoring AI-overview presence on the SERP. AI overviews change click-through rates substantially and may indicate the piece needs restructuring for AI search citation.
- Assuming SERP intent is stable. Some keywords have stable intent for years; others shift quarterly. The audit should be active.

---

## Signal 5: Content drift

The piece's positioning no longer matches the brand's current positioning.

**Detection patterns.**

- The piece's voice reads as the brand-of-three-years-ago. Vocabulary, tone, level of conviction.
- The piece's POV on the topic has not kept up with how the brand now thinks. The brand has sharpened a position the piece treats with old hedging.
- The piece's framing fits the audience the brand had then, not the audience the brand has now.
- The piece's calls-to-action, internal linking, and product references reflect older brand offerings that have since changed.

**What the signal usually means.**

- Content drift is internal signal. Readers may not consciously notice, but the team will, and over time the library's voice incoherence weakens the brand.
- Content drift is often paired with the team's discomfort about which pieces in the library represent the brand best when sharing externally.
- Content drift is rarely the sole driver of a refresh decision (because traffic and rankings may be fine), but it determines depth: a content-drift refresh is usually substantial revision or full rewrite, not light edit.

**Diagnostic next steps.** Identify which sections drift hardest from current positioning. If drift is concentrated in introduction, closing, and CTAs, substantial revision can address it. If drift is throughout, full rewrite is the cleaner disposition.

**Anti-patterns in detection.**

- Treating every voice evolution as drift triggers calendar refresh of pieces that are still serving readers.
- Ignoring drift because the piece is performing in search produces a library that performs but no longer represents the brand.

---

## The library audit

Running the signal taxonomy across the whole library.

**Audit shape.**

- Pull a per-URL data set: traffic over time, rankings, last-modified date, target keywords, business-value tag (high/medium/low).
- For each URL, run the five signal checks. Mark each signal as present or absent.
- Pieces with zero signals: stable; no action.
- Pieces with one or two signals: candidate queue; review individually for disposition.
- Pieces with three or more signals: active-decay queue; high priority for disposition decision.

**Output.** A spreadsheet or database of pieces with their signals and the resulting disposition (refresh, merge, delete, monitor). The output feeds the prioritization matrix and the refresh queue.

**Cadence.** Full audit quarterly. Continuous monitoring for traffic-decay and ranking-drop signals; manual signal checks (factual staleness, SERP intent shift, content drift) at quarterly cadence.

---

## Methodology-level choices that stay in the public skill

The five signal categories with detection patterns and what each signal means; the audit shape across the library; the cadence; the anti-patterns in detection. The signal-to-disposition mapping that informs prioritization.

## Implementation choices that stay internal

Specific data pulls from the team's analytics platform. Specific rank-tracking thresholds. Specific automation that runs continuous monitoring. Specific reviewer dashboards that surface signals. Specific seasonality models the team uses to baseline traffic. The team's own tags for business-value classification. These vary by team, tooling, and analytics setup.

# Platform reporting quirks

Per-platform reporting behaviors that affect how to read the numbers. The platforms do not agree on what counts as a conversion or how to credit it; reading their dashboards as truth is the most expensive error in paid media analytics.

---

## Google Ads

**Default attribution model.** Data-driven attribution (DDA) is the default. DDA distributes credit across multiple touchpoints based on machine learning. Single-touch attribution (last-click) is available but no longer the default.

**Conversion windows.** Default 30-day click attribution and 1-day view-through. Both adjustable. The 30-day click window is wider than what GA4 reports by default; this produces the typical 1.3 to 1.5x conversion overcount versus GA4 for the "Google Ads" channel.

**Modeled conversions.** Google models conversions for users with consent restrictions or cross-device gaps. Modeled volume can be material in iOS-heavy traffic. Modeled is an estimate; do not treat with the precision you would treat directly observed conversions.

**Performance Max black box.** PMax does not expose keyword-level, placement-level, or audience-level performance directly. The platform manages allocation across Search, Shopping, Display, YouTube, Discover, and Gmail. Levers you have: budget, asset groups (creative quality), audience signals (Customer Match seeds), and exclusions (account-level negatives).

**Branded search cannibalization in PMax.** PMax includes Search by default. It will harvest branded queries you would have ranked for organically. Add account-level negative keywords for branded queries to prevent paid cannibalization.

**Lost Impression Share metrics.** Search exposes "Lost IS (rank)" and "Lost IS (budget)" to indicate why your ad did not show. Lost IS rising is the leading indicator that competition increased or budget became constrained.

**Search-term reports.** The list of actual queries that triggered your ad, vs your keyword targeting. Underused. Audit monthly to find irrelevant queries (negative keyword candidates) and high-performing queries you might want to add as exact-match keywords.

---

## Meta (Facebook and Instagram)

**Default attribution.** 7-day click and 1-day view-through. Adjustable to 7-day click only or 1-day click only.

**iOS 14.5+ impact.** App Tracking Transparency (ATT) reduced Meta's ability to track iOS conversions. Meta filled the gap with modeled conversions (statistically estimated) and Conversions API (CAPI, server-side event tracking). Both help, neither fully restores pre-ATT visibility.

**Conversions API necessity.** CAPI sends server-side events directly from your backend to Meta, bypassing the browser-pixel restrictions. Setting up CAPI is one of the highest-impact technical investments for a Meta-heavy account. Without CAPI, the platform's optimization signal degrades significantly on iOS-heavy audiences.

**View-through attribution overcount.** View-through counts impressions even when the user did not click. Often half the reported conversions on Meta are view-through. Useful as awareness signal; misleading for performance optimization.

**Modeled conversions in iOS reports.** Meta reports modeled conversions inline with directly observed ones unless you filter explicitly. Use the breakdown view to disaggregate by attribution type (1-day click, 7-day click, 1-day view, modeled).

**Frequency reporting at the ad set level.** Meta exposes frequency in the Ads Manager. Use it as the primary fatigue signal; CTR decay is downstream of frequency rising.

**Negative feedback rate.** Meta exposes "negative feedback rate" as a customizable column. Above 1.5% is the alarm; the algorithm penalizes high-feedback creatives by reducing reach.

---

## LinkedIn

**Default attribution.** 30-day click and 7-day view-through.

**Why the longer windows.** B2B buying cycles are longer than B2C. The 30-day-click window matches the typical B2B consideration cycle. Comparing LinkedIn's reported numbers against Meta's 7-day-click numbers without normalizing is comparing different definitions.

**Cross-device gaps.** LinkedIn reporting tends to under-credit cross-device journeys (work computer click, personal phone visit). Pair LinkedIn paid reports with self-reported attribution surveys when the offer is high-consideration B2B.

**Lead Gen Forms reporting.** Form submissions count as conversions regardless of downstream lead qualification. Filter at CRM ingestion before treating LinkedIn-reported lead counts as the truth. Many leads are accidental or low-quality.

**Demographic insights.** LinkedIn's demographic reporting (industry, job seniority, company size, function) is unique to the platform. Use it for audience refinement; the data is not available cleanly on other platforms.

**Cost insights.** LinkedIn's CPM tends to be 3 to 10x higher than B2C platforms because of the audience precision premium. The justification is B2B LTV; lower-LTV offers cannot make LinkedIn math work.

---

## TikTok

**Default attribution.** 7-day click and 1-day view-through, similar to Meta.

**Video-completion-based attribution.** TikTok counts conversions even when the user did not click but watched the full video. This is unique among the platforms covered here. The signal is real for awareness; it inflates direct-response numbers.

**iOS impact, less mature modeling.** TikTok faces similar ATT-driven tracking gaps as Meta. The modeling is less mature, which means iOS-heavy audiences see more under-reporting on TikTok than on Meta.

**Spark Ads attribution overlap.** Spark Ads boost organic posts. Engagement on the boosted version shows up in both organic and paid surfaces. Be careful not to double-count when reconciling against organic engagement reports.

**Spark Ads vs paid creative differential.** Spark Ads consistently outperform pure paid creative on TikTok because they retain organic engagement signals. A team comparing CPMs of Spark vs paid will see Spark consistently lower; the difference is real, not a reporting artifact.

**Trend-based volatility.** TikTok performance is more sensitive to trending sounds and formats than other platforms. Reporting comparisons across long time periods are less reliable because the platform itself shifted.

---

## Programmatic and Display

**Viewability gates.** Programmatic display sells impressions, but only "viewable" impressions count toward billed performance. The Media Rating Council (MRC) standard is 50% of pixels in view for 1 second (display) or 2 seconds (video). Below this threshold, the impression should not be billed.

**Fraud filters.** Programmatic exposes fraud-detection metrics. Without fraud filtering, 10 to 30% of programmatic impressions are bot or fraudulent traffic. Use vendors like DoubleVerify or IAS for filtering.

**Attribution decay.** Programmatic display's incremental rate is usually 5 to 20%. Most clicks come from users who would have converted from other channels anyway. Treat programmatic as awareness; do not optimize for direct response unless the incrementality test confirms it.

---

## Cross-platform interference

A specific quirk worth a dedicated callout.

**The mechanism.** Two platforms claim the same conversion. A user sees a Meta ad, then later searches for the brand on Google, clicks a brand keyword, and converts. Meta claims the conversion (view-through). Google Ads claims the conversion (last-click on the brand search). The same revenue event shows up twice in the platform totals.

**The detection.** Sum-of-platforms exceeds total conversions in the warehouse. If platform-reported sum is 1.5 to 3x the warehouse total, you have heavy cross-platform double-counting.

**The defense.** Warehouse as canonical for board reporting. Platform reports for in-flight tuning of the platform's own levers. MMM at scale to estimate true cross-channel contribution.

---

## Reporting differences in numbers

A typical mid-stage account has the following attribution gap pattern across platforms.

- Google Ads reports: 1.3 to 1.5x what GA4 reports for the "Google Ads" channel.
- Meta reports: 1.5 to 2.5x what GA4 reports for the "Facebook" channel (more on iOS-heavy audiences).
- LinkedIn reports: roughly equal to GA4 for click-based conversions.
- TikTok reports: 1.5 to 3.0x what GA4 reports (high view-through component).

If you sum all platforms' reported conversions and compare to actual revenue, the sum is typically 2 to 4x actual. The "extra" conversions are attribution overlap, view-through credit, and platform self-attribution.

The discipline. Trust the warehouse number for incrementality decisions. Use platform numbers for in-flight tuning. Do not optimize one platform's CAC against another platform's CAC; you are comparing different definitions of the same word.

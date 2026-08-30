# Ads platform comparison

Per-platform reporting quirks, attribution differences, and the single-source-of-truth pattern.

The platforms do not agree on what counts as a conversion or how long a click should attribute. Reading the platform's reported numbers as truth is the most expensive mistake in paid media.

---

## Google Ads

**Default attribution model.** Data-driven attribution (DDA) is the default. DDA distributes credit across multiple touchpoints based on the platform's machine learning. Single touch attribution (last-click) is available but no longer the default.

**Conversion windows.** Default 30-day click attribution and 1-day view-through. Both adjustable. The 30-day click window is wider than what GA reports by default, which produces the typical 1.3 to 1.5x conversion overcount versus GA.

**Quirks to know.**
- DDA gives partial credit to keywords that touched the path even if the user did not click. The reported conversion volume under DDA is higher than under last-click.
- Smart Bidding optimizes against the DDA-reported conversions, not GA-reported. Optimizing for one number while measuring against another produces drift.
- View-through attribution on Display and Video is opt-in; default is off.

**Reading the numbers.** Compare Google Ads conversions against GA's "Google Ads" channel rather than against total GA conversions. The gap between the two is the attribution-model gap; treat with awareness.

---

## Meta (Facebook + Instagram)

**Default attribution.** 7-day click and 1-day view-through. Adjustable to 7-day click only or 1-day click only.

**Conversion windows.** 7-day click is the standard. Wider windows are more generous to Meta; narrower windows are more conservative.

**iOS 14.5+ impact.** App Tracking Transparency (ATT) reduced Meta's ability to track iOS conversions. Meta filled the gap with modeled conversions (statistically estimated based on aggregated behavior) and Conversions API (server-side event tracking). Both help, neither fully restores pre-ATT visibility.

**Quirks to know.**
- View-through attribution counts impressions even if the user did not click. Often half the reported conversions are view-through. Treat with skepticism for direct response.
- Modeled conversions are a meaningful share of iOS-reported conversions in 2025-2026. They are statistically estimated, not directly observed; do not trust them with the precision you would trust click-based conversions.
- Conversions API (CAPI) sends server-side events that complement pixel events. Setting up CAPI is one of the highest-impact technical investments for a Meta-heavy account.

**Reading the numbers.** Disaggregate by attribution window in the Ads Manager (1-day click, 7-day click, 1-day view, 7-day view). The 1-day click number is the most conservative and the closest to incremental.

---

## LinkedIn

**Default attribution.** 30-day click and 7-day view-through.

**Conversion windows.** Longer than B2C platforms because B2B buying cycles are longer. The 30-day click window matches the typical B2B consideration cycle for many categories.

**Quirks to know.**
- LinkedIn's reporting tends to under-credit cross-device journeys (work computer click, personal phone visit). Pair with self-reported attribution surveys for B2B.
- Lead Gen Forms count form submissions as conversions; downstream lead qualification is on you to track.
- Demographic insights (job title, seniority, company size, industry) are unique to LinkedIn and uniquely valuable for B2B audience refinement.

**Reading the numbers.** Lead Gen conversions are easy to overcount because form friction is low; some leads are accidental. Filter at CRM ingestion before treating LinkedIn-reported lead counts as the truth.

---

## TikTok

**Default attribution.** 7-day click and 1-day view-through (similar to Meta).

**Conversion windows.** Adjustable. TikTok also supports a "video view" event that is unique to the platform.

**Quirks to know.**
- Video-completion-based attribution: TikTok counts conversions even when the user did not click but watched the full video. This is real signal for awareness; it inflates direct-response numbers.
- iOS impact similar to Meta but less mature in the modeling.
- Spark Ads attribution is shared between paid and organic. The same view that drove a conversion shows up in both surfaces; be careful not to double-count when reconciling.

**Reading the numbers.** Click-based conversions are the most reliable. Video-view-based conversions are real signal but should be reported separately.

---

## Cross-platform interference

Two platforms claiming the same conversion is the single most common attribution mistake.

**The classic case.** A user sees a Meta ad, then later searches for the brand on Google, clicks a brand keyword, and converts. Meta claims the conversion (view-through). Google Ads claims the conversion (last-click on the brand search). GA might attribute it to organic if the brand search was not paid. Three different views of one conversion.

**The defense.** A single source of truth in your warehouse or analytics platform. Multi-touch attribution at the warehouse level distributes credit fairly. Marketing-mix modeling (MMM) at the budget-allocation level cuts through the platform-self-attribution bias.

---

## Single-source-of-truth pattern

Three layers, each serving a different decision.

**Layer 1: platform metrics.** Use for in-flight optimization only. Ad set-level CAC, creative-level CTR, audience-level frequency. The platform's view of its own performance is fine for optimizing the platform's own levers.

**Layer 2: warehouse multi-touch attribution.** Use for cross-platform comparison. Each conversion gets attributed across all platforms that touched the path. Common patterns: last-click, first-click, linear, position-based, time-decay, data-driven. Pick one and standardize across the team.

**Layer 3: marketing-mix modeling (MMM).** Use for budget allocation across channels. MMM treats spend as an input and revenue as an output, modeling the contribution of each channel net of the others. The strongest defense against platform-self-attribution bias.

The cadence. Layer 1 in real time. Layer 2 weekly. Layer 3 quarterly.

---

## What the numbers mean in practice

A typical mid-stage account has the following attribution gap pattern:

- Google Ads reports: 1.3 to 1.5x what GA reports for "Google Ads" channel.
- Meta reports: 1.5 to 2.5x what GA reports for "Facebook" channel (more on iOS-heavy audiences).
- LinkedIn reports: roughly equal to GA for click-based conversions.
- TikTok reports: 1.5 to 3.0x what GA reports (high view-through component).

If you sum all platforms' reported conversions and compare to actual revenue, the sum is typically 2 to 4x actual. The "extra" conversions are attribution overlap, view-through credit, and platform-self-attribution.

The discipline. Trust the warehouse number for incrementality decisions. Use platform numbers for in-flight tuning. Do not optimize one platform's CAC against another platform's CAC; you are comparing different definitions of the same word.

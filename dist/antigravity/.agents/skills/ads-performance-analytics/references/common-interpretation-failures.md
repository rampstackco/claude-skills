# Common interpretation failures

Twelve failure patterns that recur in paid media reporting work. For each: name, symptom, root cause, fix, prevention.

---

## 1. ROAS dropped 20% week-over-week, kill the campaign

**Symptom.** Weekly ROAS chart shows a drop. Team wants to pause the campaign.

**Root cause.** Could be noise. Day-of-week, holiday timing, conversion-window lag, exogenous variance. A 20% drop in a metric that varies 10 to 15% naturally is below the signal threshold.

**Fix.** Pre-commit a test window before acting on weekly variance. For most campaigns, two consecutive weeks of decline below the threshold is the signal. Single-week swings are usually noise.

**Prevention.** Establish baseline variance for each campaign before declaring "improvement" or "decline." Without the baseline, every weekly chart looks alarming.

---

## 2. Meta says 500 conversions, my warehouse says 200, who is right

**Symptom.** Platform-reported numbers do not match warehouse numbers. The team picks the more flattering one.

**Root cause.** Both are wrong; warehouse is closer to truth. Meta self-attributes (claims credit for conversions other channels also touched). View-through and modeled conversions inflate Meta's count.

**Fix.** Reconcile, do not pick a winner. Report the warehouse number as canonical for board metrics. Use Meta's number only for in-flight optimization within Meta.

**Prevention.** Make the reconciliation cadence explicit. Weekly check, monthly deep dive, quarterly attribution review. The team that runs the reconciliation never has to "pick a winner."

---

## 3. Turned off Google PMax, conversions did not drop

**Symptom.** Paused PMax. Total account conversions held steady.

**Root cause.** PMax was harvesting branded search conversions you would have gotten free from organic. The platform was claiming credit for traffic that was not incremental.

**Fix.** Audit branded queries inside PMax. Add account-level negative keywords for branded queries. Restart PMax with branded excluded; the incremental contribution from non-branded inventory is the real value.

**Prevention.** At PMax setup, exclude branded queries from the start. Audit PMax's spend distribution monthly to catch the cannibalization pattern early.

---

## 4. New campaign hit 5x ROAS in week 1

**Symptom.** A fresh campaign's first-week ROAS is 5x. Team wants to scale immediately.

**Root cause.** Likely retargeting hot leads or running on a small audience of warm prospects who would have converted anyway. The first week is unrepresentative.

**Fix.** Check the audience composition. If retargeting or warm-list, the 5x is not the steady-state. Wait two to four weeks before scaling.

**Prevention.** Define the success metric and the test window before launch. Do not let a strong first week change the plan; pre-commit to the four-week measurement.

---

## 5. A/B tested and one creative wins by 12%

**Symptom.** Two creatives tested. One wins by 12%. Team wants to ship the winner.

**Root cause.** 12% is within margin of platform noise for a typical creative test. Variants compete with each other inside the platform's optimization; the platform's own decisions confound the test.

**Fix.** Re-run the test with more volume, or accept that the difference is within noise and pick based on production cost or refresh ease.

**Prevention.** Set the minimum detectable effect (MDE) before testing. A 12% threshold requires a specific volume; if you cannot reach it, the test cannot detect that effect cleanly.

---

## 6. LTV calculation says this channel is profitable

**Symptom.** A team's LTV-CAC analysis shows a channel as profitable. Spend is increased.

**Root cause.** The "LTV" in the calculation may be a 60-day cumulative revenue projected forward, not actual lifetime value. Recent cohorts have not aged enough to confirm the LTV.

**Fix.** Confirm the cohort age. If projecting forward, document the assumption and stress-test (what happens if actual LTV is 80% of projected).

**Prevention.** Always pair LTV calculations with cohort age. A 30-day cohort has 30-day revenue, not LTV. Naming clearly prevents the substitution error.

---

## 7. High frequency is fine because conversions are still happening

**Symptom.** Frequency at 6 to 8 per week. Conversions on the platform are stable. Team concludes fatigue is not an issue.

**Root cause.** Fatigue masked by conversions that would have happened anyway from organic, retargeting overlap, or recurring customers. The platform is taking credit for traffic the high frequency did not actually drive.

**Fix.** Run an incrementality test on the high-frequency campaign. The likely finding is that incremental rate dropped substantially even as raw conversions held.

**Prevention.** Watch frequency as a leading indicator. Above 4 to 5 per week is the alarm regardless of conversion levels. Refresh creative.

---

## 8. Last-click attribution shows Meta at 60% credit

**Symptom.** Last-click view of paid media shows Meta dominant. Team allocates budget accordingly.

**Root cause.** Last-click bias. Meta may also be the closer because users who searched for the brand on Google clicked through, then later saw a Meta retargeting ad and converted. Last-click credits Meta; the conversion would have happened anyway.

**Fix.** Read the same data under first-click and a multi-touch model. The picture changes. Allocate based on a balanced view, not the last-click view alone.

**Prevention.** Always compare attribution under at least two models for budget decisions. The single-model view is reliable for in-flight only.

---

## 9. Scaled spend 5x, conversions only doubled

**Symptom.** Budget went from $20K to $100K per month. Conversions went from 800 to 1,600.

**Root cause.** Saturation. The channel found its ceiling; the marginal CAC at the new spend level is much higher than the average CAC the team was reporting.

**Fix.** Calculate the marginal CAC, not just average CAC. The marginal CAC at the higher spend tier tells you whether more spend will produce more conversions or just spend more for the same conversions.

**Prevention.** Project the saturation curve before scaling. If a 1.5x spend increase produced a 1.2x conversion increase, expect the next 1.5x to produce 1.0x or less.

---

## 10. Brand campaigns underperform on direct ROAS

**Symptom.** A brand campaign reports 0.8x ROAS. Team wants to cut it.

**Root cause.** Brand campaigns affect downstream channel efficiency, not direct conversion. The direct ROAS is the wrong measurement for brand impact.

**Fix.** Measure brand against brand-search lift, organic traffic growth, or direct-traffic growth. The brand campaign's effect shows up in cheaper performance acquisition over the next 60 to 90 days.

**Prevention.** At brand campaign setup, define the success metric explicitly (brand search lift target, organic traffic target, awareness lift). Do not let direct ROAS become the unintended grading metric.

---

## 11. ROAS held steady but profit dropped

**Symptom.** Channel-level ROAS at 3x, stable. Profit on the same channel dropped 20% over the quarter.

**Root cause.** The mix shifted toward lower-margin products. ROAS is a revenue metric; it does not see margin. The channel attracted bargain hunters at lower margin, holding ROAS but cutting profit.

**Fix.** Track contribution-margin ROAS, not gross-revenue ROAS. The contribution-margin view catches the mix shift the gross view hides.

**Prevention.** Build margin-aware reporting from the start. Most teams default to gross revenue; the move to contribution margin pays for itself within a quarter.

---

## 12. Agency reported a 4x ROAS month

**Symptom.** External agency claims a 4x ROAS for the month. Team accepts the number.

**Root cause.** Whose number? Platform-reported, warehouse-attributed, or model-adjusted? Agencies often report the most generous number (their incentive). Without specifying the attribution methodology, the 4x ROAS is unreadable.

**Fix.** Demand the attribution methodology in every agency report. Reconcile against the warehouse before presenting to leadership.

**Prevention.** Build attribution-methodology specification into the agency contract. Reports must include the model, the window, and the source of conversion data. The contract that does not specify produces reports that cannot be evaluated.

---

## The pattern across all twelve

Most paid media interpretation failures share one root cause: optimizing one number without checking what the optimization did to the system. Scale ROAS at the cost of LTV. Pause an underperformer at the cost of total volume. Trust platform-reported attribution at the cost of incremental truth.

The fix at the meta level. Decide on the success metric (warehouse-attributed CAC, LTV-CAC ratio, contribution-margin ROAS) and the guardrails (volume, frequency, customer-cohort quality, brand metrics) before reading any dashboard. Pull back the moment a guardrail breaks, even if the success metric still looks fine. The dashboard is a tool, not the truth; the warehouse plus quarterly incrementality testing is closer to truth.

# Dashboard vs experiment reconciliation

The scenario: the BI dashboard shows revenue grew 8% last week, the experiment platform shows the treatment lifted revenue 2%, and an executive asks how both can be true. This reference covers the common reasons numbers disagree, the blended-attribution trap, and how to communicate the difference.

---

## Why numbers disagree (in order of frequency)

**Different denominators.** The dashboard is computed across all users (or all sessions, or all transactions). The experiment is computed across enrolled users only. If 30% of users are enrolled in the experiment, the experiment lift applies to roughly 30% of the metric base; the dashboard sees the entire base. A 2% lift on the enrolled 30% looks like roughly 0.6% on the dashboard, even if everything is working perfectly.

**Different time windows.** The dashboard shows rolling seven days; the experiment shows fixed start to end. Comparing a moving window to a fixed window is comparing two different summaries of overlapping but distinct data.

**External effects.** Marketing campaigns, seasonality, news cycles, competitor moves, weather. The experiment correctly excludes these by random assignment (treatment and control see the same external effects, so they cancel in the lift estimate). The dashboard reflects them in full. The dashboard moving up has nothing to do with the experiment moving up.

**Selection effects in enrollment.** Who is enrolled matters. New users only? Logged-in only? Users who passed a feature flag check? Each filter changes the population the experiment lift applies to, and changes how that population's behavior compares to the dashboard total.

**Different metric definitions.** "Revenue" might be gross in the dashboard and net of refunds in the experiment. "Conversions" might count differently across systems (does a re-purchase count? a subscription renewal? a free trial activation?). Definitional drift between systems is common and almost always under-investigated.

**Pipeline lag.** The dashboard is real-time or near-real-time. The experiment is computed on a daily batch with attribution windows that delay the metric by hours or days. Comparing a real-time number to a batched-and-attributed number is comparing two different versions of the truth.

**Different attribution models.** First-touch vs last-touch vs multi-touch attribution can produce wildly different "revenue" numbers from the same underlying events. The dashboard and the experiment might use different models without anyone realizing.

---

## The blended attribution trap

The most common reconciliation failure: take the experiment lift and multiply by the total user base for company-wide impact.

**The wrong calculation.** Experiment shows +2% revenue per user. Total active users: 5 million. "The feature drove $X million in incremental revenue."

**Why it is wrong, twice over.**

- The lift only applies to enrolled users, not the total base. If 30% of users are enrolled, the in-test impact is roughly 30% of what the multiplication suggests.
- Even within enrolled users, the lift was measured during the test conditions. Long-term and at full scale, the effect can be smaller (novelty fade, interference effects, market saturation) or sometimes larger (network effects that compound, learning effects).

**The right framing.** "During the four-week test, enrolled users (about 30% of the active base) showed a 2% revenue-per-user lift relative to control. Extrapolating to a full launch requires assumptions about how the effect translates at scale; the simple multiplication ignores those assumptions."

The right framing is longer. Stakeholders sometimes push back on the precision. The precision is the point: the simple version is wrong, and shipping based on the simple version produces forecasts that do not materialize.

---

## How to communicate to non-statistical stakeholders

The temptation is to translate the experiment result into a single number that sounds like the dashboard. The translation is usually wrong because the two numbers are answering different questions.

**Better framings:**

- "The experiment is asking 'does this change move the metric for users who see it?' The dashboard is asking 'how is the metric trending overall?' Both can move independently and both can be true at the same time."
- "The experiment lift applies to enrolled users, in test conditions, during the test window. Translating to a launch forecast requires assumptions about scale, novelty, and interference."
- "If we ship to everyone, we expect the dashboard to move by roughly [X percent of the lift], plus or minus [a wide range], because of [specific assumptions]."

**Worse framings to avoid:**

- "The feature drove $X million in revenue this week." (Conflates the experiment lift with the dashboard movement.)
- "We hit our target." (When the target was set against the dashboard but the result is from the experiment.)
- "The lift was bigger in production than in the test." (Usually a sign of confounding, not vindication.)

---

## When to dig into discrepancies vs accept them

**Dig in when:**

- The experiment shows a big effect and the dashboard shows nothing. The experiment is making a claim that the launch did not deliver. Either the experiment was wrong (selection effect, pipeline bug, confounder) or the launch is being measured wrong.
- The experiment shows nothing and the dashboard shows a big effect. The experiment is missing a real movement. Either the test was underpowered, the wrong population was enrolled, or the dashboard movement is from external factors.
- The directions disagree (experiment positive, dashboard negative). Almost always indicates a definitional drift or pipeline issue that needs investigation.

**Accept the discrepancy when:**

- The magnitudes are different but the directions agree. Usually a denominator or selection issue; document the explanation and move on.
- The dashboard is volatile and the experiment is stable. The dashboard reflects external noise the experiment correctly excludes.
- The dashboard is stable and the experiment showed a small effect. The launch effect is too small to detect in the dashboard's noise.

---

## A reconciliation checklist for the moment of confusion

When a stakeholder asks "why do these numbers not match?", run through this:

1. **Same metric definition?** Confirm the experiment and dashboard are computing the metric the same way. Check the definitional doc for both. Ask the data team if there is no doc.
2. **Same denominator?** Confirm the experiment population and the dashboard population. Often they differ.
3. **Same time window?** Confirm the experiment window and the dashboard window are aligned (or explain why they are not).
4. **Any external events?** List campaigns, launches, outages, holidays during the test window. The dashboard reflects them; the experiment cancels them.
5. **Any pipeline lag?** Confirm both numbers are using the same attribution and the same data freshness.
6. **Any selection effects?** Who got enrolled and how? If enrollment was non-random (by feature flag check, by cohort), the experiment population is not representative of the dashboard population.

If all six check out and the numbers still disagree by a meaningful amount, escalate to data engineering. There is probably a pipeline bug in one of the two systems.

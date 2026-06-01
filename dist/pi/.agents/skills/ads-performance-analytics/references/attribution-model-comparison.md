# Attribution model comparison

For each major attribution model: definition, fit, bias direction, and a worked example showing how the same activity gets different attribution.

The principle. No model is right. They are all approximations. The discipline is to pick one as the primary view, read the others as sanity checks, and report against the warehouse rather than against any single platform's view.

---

## The models

### Last-click

**Definition.** Full credit to the last clickable touchpoint before conversion.

**When it fits.** Early-stage measurement where simplicity matters more than precision. Final-stage decisions where the closer matters more than the opener.

**When it does not fit.** Awareness-channel evaluation. Brands with multi-touch sales cycles. Anything upper-funnel.

**Bias direction.** Undercredits awareness channels (display, video, top-of-funnel social). Overcredits closing channels (branded search, retargeting).

### First-click

**Definition.** Full credit to the first touchpoint in the conversion path.

**When it fits.** Awareness-channel evaluation. Comparing top-of-funnel sources.

**When it does not fit.** Closing-channel evaluation. Performance optimization at the bid level.

**Bias direction.** Mirror image of last-click. Undercredits closing; overcredits opening.

### Linear

**Definition.** Equal credit across every touchpoint in the conversion path.

**When it fits.** Board-deck reporting where avoiding "Google gets 70% so we cut Meta" politics matters more than precision. Defensible-by-default.

**When it does not fit.** Decisions where the marginal contribution of each channel matters. Linear treats first-click and last-click the same; reality usually does not.

**Bias direction.** Diffuses credit. Channels that touched the path always get something; channels that drove the conversion do not get more.

### Time-decay

**Definition.** More credit to recent touchpoints. Older touchpoints get progressively less.

**When it fits.** When the intuition is that recent ads are more influential. Reasonable for short-cycle B2C.

**When it does not fit.** Long sales cycles where the first touchpoint may have been months before the close. Decay underweights the opener.

**Bias direction.** Skews toward the closer. Slightly less aggressive than last-click.

### U-shaped (position-based)

**Definition.** 40% credit to first touch. 40% credit to last touch. 20% distributed across middle touches.

**When it fits.** When you want to honor both opener and closer roles without flattening to linear. Reasonable default for most B2C.

**When it does not fit.** Single-touch paths (awards 80% to a single touchpoint, which is over-attributing). Long paths where the middle touchpoints matter as much as the ends.

**Bias direction.** Balances the last-click and first-click views into one number.

### Data-driven attribution (DDA, Google)

**Definition.** Machine-learning model that distributes credit based on observed conversion paths. Compares paths that did and did not convert; assigns credit to touchpoints that correlate with conversion.

**When it fits.** Mature accounts with sufficient conversion volume (Google requires 600+ conversions per month for DDA). Cross-channel optimization.

**When it does not fit.** Sub-scale accounts. Accounts that need explainability for regulators or boards. The black-box nature is hard to audit.

**Bias direction.** Best in class for digital channels where the data is clean. Still suffers from platform self-attribution bias because Google's DDA only sees Google touchpoints.

### Marketing mix modeling (MMM)

**Definition.** Regression-based, top-down. Models the relationship between spend across channels and revenue over time. Typically requires 2 to 3 years of data.

**When it fits.** Mature accounts with cross-channel spend at scale. Brands where offline channels (TV, OOH, podcast) contribute. Anywhere platform self-attribution bias is a real concern.

**When it does not fit.** Early-stage accounts without enough historical data. Fast-changing channel mixes where the historical data does not represent current reality.

**Bias direction.** The strongest defense against platform self-attribution because MMM does not rely on platform-reported conversions. Limitations are statistical: confidence intervals are wide; granularity is low (channel-level, not campaign-level).

---

## The same path under each model

A worked example. A B2C SaaS user converts after this path:

1. Sees a YouTube awareness ad (impression, not click).
2. Clicks a Meta retargeting ad three days later.
3. Searches for the brand on Google. Clicks a paid branded search ad.
4. Returns directly the next day. Converts.

Attribution by model.

| Model | YouTube | Meta | Branded Search | Direct |
|---|---|---|---|---|
| Last-click | 0% | 0% | 0% (depending on direct vs paid) | 100% |
| First-click | 0% (impressions excluded) | 100% | 0% | 0% |
| Linear | 0% | 33% | 33% | 33% |
| Time-decay | 0% | 15% | 35% | 50% |
| U-shaped | 0% | 40% | 20% | 40% |
| Google DDA | (only sees Google touchpoints) | (only sees Meta touchpoints if Conversions API integration) | varies | varies |
| MMM | partial credit (spend in YouTube correlates with conversions) | partial credit | partial credit | (organic, not modeled) |

The takeaway. Same path. Five different attribution stories. None is right. Each tells you something different.

---

## Decision matrix by business stage

| Stage | Primary model | Secondary check | Why |
|---|---|---|---|
| Pre-PMF | Last-click + warehouse-attributed CAC | None; insufficient volume for sophisticated models | Sophisticated attribution needs volume you do not have |
| Series A or early growth | Last-click + GA4 data-driven | First-click as sanity check on awareness | Volume insufficient for MMM; DDA requires more conversions than most early-stage accounts have |
| Mid-stage (10K+ conversions per month) | Google DDA + GA4 path data | Last-click for channel decisions; first-click for awareness | DDA gets reliable here; cross-validate with simple models |
| Mature (100K+ conversions per month, 2+ years data) | MMM as canonical | Last-click for in-flight; DDA for cross-channel | MMM is the strongest defense against self-attribution at scale |
| Multi-channel including offline | MMM mandatory | DDA for digital | MMM is the only model that captures offline contribution |

The progression. As volume grows and channel mix expands, the model that fits changes. Locking in last-click forever is fine if the business stays simple; the moment offline or upper-funnel channels matter, the model has to advance.

---

## How to communicate which model produced which number

Three rules for honest reporting.

1. **Always label the model.** "Meta drove 800 conversions" is unreadable. "Meta drove 800 conversions on last-click attribution with a 7-day-click window" is honest.
2. **Report the same number under at least two models when stakes are high.** Board decks should show the conservative view (last-click) and the generous view (linear or DDA). The range tells stakeholders what they are not learning.
3. **Reconcile against the warehouse before reporting in dollars.** Dollar figures attached to platform-reported conversions inherit all the platform's attribution biases. Warehouse-attributed dollars are the only dollars that have been independently verified.

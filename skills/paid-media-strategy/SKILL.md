---
name: paid-media-strategy
description: "A discipline for running paid media that does not light money on fire. Hypothesis writing for paid spend, channel selection, budget allocation, audience targeting, bid strategy, campaign types, what NOT to spend on, attribution reality, and the failure modes that produce expensive lessons. Triggers on paid media strategy, ad budget allocation, channel selection, paid media plan, audit my Google Ads, audit my Meta Ads, scale paid media, kill underperforming campaign, paid media hypothesis, ad spend strategy, attribution reality, performance marketing strategy. Also triggers when a team is asking how to scale paid media, or whether to add a new channel, or how to reallocate spend across channels."
category: marketing
catalog_summary: "Hypothesis to spend: channel selection, budget allocation, audience targeting, bid strategy, attribution reality, and the failure modes that burn agency-scale budgets"
display_order: 1
---

# Paid Media Strategy

A senior performance marketer's playbook for running paid media that produces real outcomes.

The default state of paid media is wasted spend. Most accounts have campaigns running because they always have, audiences targeting because the rep suggested it, bid strategies on auto because manual is hard, creative not refreshed because there is no system. The cost compounds. A 20% efficiency gain on a $500K-per-year account is $100K back to the business. A 50% gain on a $5M-per-year account is $2.5M.

This skill is the discipline that produces those gains. It assumes you have a paid media platform (Google Ads, Meta, LinkedIn, TikTok, or aggregators like Synter) connected. It assumes you have working analytics and conversion tracking. The hard part is the strategic discipline behind the spend, and that is what is here.

When to use this skill: any time you are designing a paid media plan, evaluating whether to scale or kill a campaign, allocating budget across channels, or auditing an existing account.

---

## What this skill is for

This skill spans paid media strategy and operations. It does not cover ad creative production (use `ads-creative-development`), result interpretation in depth (use `ads-performance-analytics`), or platform-specific MCP tooling (consult each ad platform's official documentation for current MCP setup, auth, and example prompts).

The audience is a performance marketer (in-house or agency), a growth lead allocating spend across channels, or a founder making early paid budget decisions. The voice is tactical. There is no "evaluate every option yourself with no opinion." Paid media decisions have shape, and a senior practitioner can map a situation to a defensible plan in an afternoon.

---

## Hypothesis discipline for paid spend

Most paid media failures start with a vague reason for spending. A real spend hypothesis has five parts: audience, offer, channel, outcome metric, and magnitude. Missing any of them and the campaign cannot be evaluated honestly.

A bad reason: "We need to scale Google Ads spend." No audience, no outcome metric, no magnitude. Nothing is falsifiable.

A good hypothesis: "Top-of-funnel SaaS prospects searching for project management tools convert from a free-trial CTA at 3.2% CAC under $80. Increasing Search budget from $40K to $80K per month should hold CAC under $80 and add roughly 500 trial signups based on Q3 search volume."

That hypothesis names the audience (top-of-funnel SaaS prospects on PM-tool keywords), the offer (free trial), the channel (Google Search), the outcome metric (CAC, trial signups), and the magnitude (500 signups, CAC under $80). It is falsifiable: if CAC blows past $80 or signups come in below 250, the hypothesis is wrong and you pull back.

Pre-commit the falsification rule. Decide before scale: at what CAC do we hold? At what CAC do we pull back? At what trial-signup count do we kill? Without pre-commit, every result becomes a debate. With pre-commit, the decision is mechanical.

Primary metric is the one you are optimizing for (CAC, ROAS, CPL). Guardrails are the metrics you do not want to break (LTV, retention, brand search lift). Scaling the primary metric while breaking a guardrail is a Pyrrhic win.

---

## Channel selection: when to use which platform

Pick the channel where intent matches your offer. Run the wrong channel and your CAC reads as a channel problem when it is actually a fit problem.

**Google Search.** High-intent demand capture. Best when you have a real product people search for and the query volume justifies the floor. Worst when category awareness is low and no one is searching. Predictable, expensive at scale, the highest floor of any channel.

**Google Performance Max.** Automated multi-channel within the Google ecosystem. Best when you have a strong product feed (e-commerce) or want to lean into Google's automation. Worst when you need control over placements; PMax is a black box and disagreements with the algorithm cost money.

**Meta (Facebook plus Instagram).** Broad-targeting demand creation. Best for visual products, lifestyle brands, B2C scale, and direct response with strong creative. Worst when targeting is too narrow (audiences saturate fast) or when the offer is high-consideration B2B.

**TikTok.** Discovery-mode advertising. Best for native-feeling video creative, younger audiences, and brand awareness. Worst for direct response with high consideration cycles. Spark Ads (boosting organic posts) outperform pure paid creative.

**LinkedIn.** B2B targeting precision. Best for high-LTV B2B with clear job-title targeting. Worst for low-AOV products; the floor is too high to be efficient.

**Reddit, Pinterest, Snapchat, X.** Niche or supplementary. Best as scale-out channels after primary channels are working. Worst as starting points; spreading thin across niches before you have proven any channel is the most common waste pattern.

**YouTube (Google).** Video at scale. Best for awareness or for B2C consideration. Underrated for B2B SaaS in some categories where the buyer-research path includes long-form video.

The decision rule. Start with the channel where intent matches your offer. Search for high-intent demand capture. Meta or TikTok for demand creation. LinkedIn for B2B precision. Do not run all of them at once until you have proven any of them. Detail in [`references/channel-decision-matrix.md`](references/channel-decision-matrix.md).

---

## Budget allocation: brand vs performance, baseline vs test

Four splits operate at the same time. Get them all right and the budget compounds.

**Brand vs performance.** Brand keeps the demand pipeline filled (long term); performance captures it (short term). 70-30 to 80-20 performance-heavy is typical for most B2C. Brand-heavy splits fit high-consideration B2B where the buying cycle is months long and pipeline visibility matters more than week-over-week conversions.

**Baseline vs test.** 70 to 80% of budget to channels, campaigns, and audiences that are working. 20 to 30% to systematic testing of new channels, new audiences, new creative. Without test budget, you stagnate. Without baseline budget, you have nothing to scale.

**Primary vs secondary channel.** One channel does the heavy lifting (60 to 70% of budget). Others scale supplementally. Resist the equal-split temptation; spreading across channels before any one is proven is the most expensive way to learn nothing.

**Daily vs lifetime budgets.** Daily for ongoing campaigns where you want a stable spend floor. Lifetime for finite tests where the platform should pace itself across the test window. Lifetime budgets prevent runaway spend during testing.

Budget pacing matters too. Front-load some weeks to test creative aggressively. Back-load others to capture seasonality (holiday, end-of-quarter, category-specific moments). Do not run flat; flat budgets miss the demand peaks.

Detail and templates in [`references/budget-allocation-templates.md`](references/budget-allocation-templates.md).

---

## Audience targeting: prospecting vs retargeting vs exclusion

Three audience types. Treat them as separate strategies.

**Prospecting.** New people who have not heard of you. Lookalike audiences (Meta), in-market audiences (Google), interest stacks, lookalikes seeded from high-LTV customers. Largest budget share for growth-mode brands; this is where new demand comes from.

**Retargeting.** People who engaged but did not convert. Smaller audience size, higher CTR, lower CAC. Do not bid too aggressively or you train the platform to charge a premium for users who would have converted anyway.

**Exclusion.** Current customers and recent converters kept out of prospecting and retargeting. Saves spend, keeps frequency low, prevents creative fatigue from people who are already paying you.

Common mistakes. Prospecting too narrow (not enough audience for the platform to optimize). Retargeting too aggressive (cannibalizing organic conversions). No exclusions (paying to advertise to your own paying customers). Lookalikes off the wrong source (use top-LTV customers, not all customers).

Detail in [`references/audience-segmentation-patterns.md`](references/audience-segmentation-patterns.md).

---

## Bid strategy: when each fits

Bid strategy depends on data state. New campaigns need a different strategy than mature ones. Switching too often resets the learning phase and wastes the data you just gathered.

**Manual CPC or CPM.** Full control, slow to scale. Useful for diagnostics and very early campaigns where you do not trust the platform's machine learning yet.

**Maximize Conversions.** Platform optimizes for volume within budget; the platform decides CPC. Use when you want as many conversions as possible regardless of cost. Good early-stage strategy while you gather data.

**Target CPA (tCPA).** Set a max CPA, platform delivers within. Use when CPA is the constraint and you have at least 30 conversions in the recent window for the platform to optimize against.

**Target ROAS (tROAS).** Set a min ROAS, platform delivers above. Use when revenue per conversion varies and you care about value, not count.

**Maximum Conversion Value.** Like maximize conversions but optimizes for total revenue, not count. Use when high-value conversions are the goal and you have the conversion-value data wired in.

**Enhanced CPC.** Manual CPC with platform adjustments. Hybrid; rarely the right answer because it muddies the signal.

The progression for new campaigns: start manual or maximize conversions to gather data, switch to tCPA or tROAS once you have 30+ conversions, revisit periodically.

Common mistakes. Using tCPA before you have 30+ conversions (no data to optimize against). Setting tROAS too aggressively (platform throttles delivery). Switching strategies too often (each change resets the learning phase). Detail in [`references/bid-strategy-reference.md`](references/bid-strategy-reference.md).

---

## Campaign types

For each major platform, the campaign types and when to use them.

**Google Ads.** Search, Shopping, Performance Max, Display, Video (YouTube), Demand Gen, Discovery, App. Search for direct demand capture. PMax for catalog-driven e-commerce. Display for retargeting. Video for awareness or consideration.

**Meta.** Sales, Leads, Engagement, Awareness, Traffic, App Promotion. Sales for direct response. Awareness for brand at scale. Leads for B2B with native lead forms.

**LinkedIn.** Sponsored Content, Message Ads, Conversation Ads, Lead Gen Forms. Format types: Single Image, Carousel, Video. Lead Gen Forms convert hardest because they pre-fill from LinkedIn profile data. Message Ads have stigma in many B2B segments; use carefully.

**TikTok.** In-Feed, TopView, Spark Ads, Branded Hashtag Challenge. Spark Ads (boost organic posts) outperform pure paid creative because they retain organic-feel signal. Use Spark when you have organic posts performing.

Detail per platform in [`references/campaign-type-reference.md`](references/campaign-type-reference.md).

---

## What NOT to spend on

Direct list. Audit any account against these and you will usually find easy savings.

- **Branded keywords beyond defensive.** When ranking number one organically, branded paid clicks cannibalize free traffic. Some defensive spend is fine to block competitor bidding. Aggressive bidding on your own brand is waste.
- **Display network without targeting.** Broad display drives garbage traffic. Use only for retargeting unless you have specific contextual targeting.
- **Geographic markets you do not serve.** Sounds obvious, fails 30% of accounts. Audit geo targeting quarterly.
- **Hours you cannot service.** For service businesses (legal, B2B, medical). Pause off-hours unless lead form clearly converts asynchronously.
- **Devices that do not convert.** If mobile converts at 1% and desktop at 5% with the same CPC, bid down mobile aggressively.
- **Audiences who never convert.** Pull last 90 days of converters, build exclusion lists for everyone else who repeatedly clicks but never converts.
- **Creative that is tired.** Frequency above 4 with declining CTR means refresh. Refusing to refresh because "it still works ok" is incremental loss.

The pattern across these is the same. Default settings or accumulated cruft generate spend without producing outcomes. Audit, exclude, and reclaim.

---

## Creative testing: within campaign vs across campaign

Two modes. Different learning rates, different overhead.

Within-campaign testing rotates 4 to 6 ad variations and lets the platform optimize delivery to top performers. Lower test risk because all variations live inside one campaign with one budget. Slower learning because the platform's optimization muddies the signal of which variation actually wins.

Across-campaign testing runs entire campaign concepts (audience plus offer plus creative) against each other. Higher learning rate because each campaign has its own audience and budget. Higher setup overhead and harder to keep apples-to-apples.

Cadence. Refresh top creative every 30 to 60 days at scale. Weekly for high-frequency campaigns. Keep the top one or two evergreen winners running and rotate others.

The "winning creative is the floor" principle. Do not kill winners to test new ideas. Test alongside. The downside of running the proven winner is small; the downside of killing it for an unproven concept is large.

---

## Frequency capping

Ad fatigue is real. Same audience seeing the same creative eight times in a week tunes it out, or worse, develops negative associations.

Typical caps. Three to four impressions per user per week for Awareness campaigns. Six to eight per week for Direct Response. Lower for B2B (one to two per week per LinkedIn target). Platform defaults are usually too high; set explicit caps.

Rotation as alternative. If you have enough creative variants, rotate often enough that no individual creative hits fatigue threshold. Rotation plus capping is the strongest pattern for high-spend, long-running campaigns.

---

## Attribution mismatch: platform-reported vs actual

The trap. Platform-reported conversions are inflated by view-through attribution, generous click attribution windows, and platform self-attribution bias.

**Last-click in GA vs platform-reported.** Google Ads typically reports 1.3 to 1.5x the conversions GA reports. The gap comes from multi-touch attribution differences and view-through that GA does not credit.

**iOS 14.5+ impact.** Meta and other platforms underreport iOS conversions because of App Tracking Transparency. Modeled conversions try to fill the gap; they are imperfect. Treat iOS-heavy reporting with extra skepticism.

**View-through attribution.** Counted by Meta and Google for users who saw but did not click. Often half the reported "conversions" are view-through. Useful for awareness; misleading for performance optimization.

**Cross-platform interference.** Meta retargeting captures users who would have converted from Google Search anyway. Both platforms claim the conversion. You pay for the same conversion twice.

The discipline. Single source of truth in your warehouse or analytics platform. Report against that for incrementality decisions. Use platform metrics for in-flight optimization only. The deeper interpretation work belongs in `ads-performance-analytics` (forthcoming); this skill names the trap so you do not optimize against the wrong number.

Per-platform reporting quirks in [`references/ads-platform-comparison.md`](references/ads-platform-comparison.md).

---

## Common failures

Twelve patterns recur across paid media work. The short version. Detail in [`references/common-failures.md`](references/common-failures.md).

- "We are scaling but CAC went up." Saturation on the primary audience. Expand the audience or diversify the channel mix.
- "Conversions look fine in the platform, terrible in revenue." Attribution mismatch plus customer quality, not just count. The platform is selecting low-LTV converters because they are easier to find.
- "We A/B tested and one wins, but only by 5%." Within margin of platform noise. Not a real signal.
- "We turned off the underperforming campaign and conversions dropped overall." View-through or assist conversions you were not counting. Test with hold-out, not flat off.
- "Frequency hit 8 last week." Refresh creative. Do not blame the audience.
- "We are trying to scale Meta to $100K per day from $20K per day." That is not scaling, that is a 5x jump. Expect efficiency drop; phase the increase.
- "We tried LinkedIn for our B2C product." Wrong channel for the offer. Not a LinkedIn problem.
- "tROAS will not deliver." You set it too aggressive. Loosen the target or switch strategy.
- "We saw a click-through bump after the Super Bowl ad." That is brand effect on existing demand, not paid attribution. Read it as a brand signal.
- "Search Impression Share dropped." Either competition increased or budget is constrained. Check both before tuning bids.
- "PMax is hard to optimize." Yes. Treat PMax as a tested channel with constrained levers, not a place to fine-tune at the keyword level.
- "Lookalike performance dropped after we expanded to 5%." Wider lookalikes are looser; the floor is lower. Tighten back to 1 to 2% if CAC is the constraint.

---

## The framework: 11 considerations for sustainable paid media

When designing or auditing paid media, walk these 11 considerations. Skipping any of them is how teams burn budget at scale.

1. **Hypothesis.** Audience, offer, channel, outcome metric, magnitude. Pre-commit the falsification rule.
2. **Channel fit.** Intent matches offer. Search for capture, Meta and TikTok for creation, LinkedIn for B2B precision.
3. **Budget shape.** Brand vs performance, baseline vs test, primary vs secondary channel, daily vs lifetime.
4. **Audience strategy.** Prospecting, retargeting, exclusion. Treated as separate strategies.
5. **Bid strategy.** Manual, max conversions, tCPA, tROAS, max conversion value. Matched to data state.
6. **Campaign type.** Right type for the platform and the goal.
7. **What not to spend on.** Branded beyond defensive, untargeted display, wrong geos, off-hours, low-converting devices, never-convert audiences, tired creative.
8. **Creative testing.** Within campaign and across campaign, plus refresh cadence.
9. **Frequency capping.** Explicit caps and creative rotation.
10. **Attribution reality.** Single source of truth, platform metrics for in-flight only.
11. **Decision rule.** Pre-committed scale up, hold, or pull back at known thresholds.

The output of the framework is one of three answers. Scale (the hypothesis is confirmed at the magnitude needed to justify more spend). Hold (results are at the falsification line; gather more data before committing). Kill (the hypothesis is wrong or the campaign is no longer pulling its weight).

---

## Reference files

- [`references/channel-decision-matrix.md`](references/channel-decision-matrix.md) - Context-to-channel matrix with worked examples for the most common business contexts.
- [`references/budget-allocation-templates.md`](references/budget-allocation-templates.md) - Typical splits and pacing patterns: growth-mode, steady-state, brand-heavy, performance-heavy.
- [`references/audience-segmentation-patterns.md`](references/audience-segmentation-patterns.md) - Prospecting, retargeting, exclusion templates plus cross-platform reconciliation.
- [`references/bid-strategy-reference.md`](references/bid-strategy-reference.md) - Each strategy's fit, common mistakes, and migration paths as data accumulates.
- [`references/campaign-type-reference.md`](references/campaign-type-reference.md) - Per-platform campaign type guide with pitfalls.
- [`references/ads-platform-comparison.md`](references/ads-platform-comparison.md) - Platform reporting quirks, attribution differences, and the single-source-of-truth pattern.
- [`references/common-failures.md`](references/common-failures.md) - Twelve failure patterns with symptom, root cause, fix, and prevention.

---

## Closing: when in doubt, kill the campaign

Most paid media decisions reduce to scale, hold, or kill. When the analysis is genuinely ambiguous, default to kill.

The cost of a campaign that is not clearly working is real money flowing out the door every day. The cost of killing a marginal campaign is mostly just the inconvenience of restarting it later. Asymmetric risk. Default to kill.

The follow-on rule is symmetric. When the hypothesis is clearly confirmed at the magnitude that matters, scale aggressively. The cost of slow-rolling a working campaign is opportunity cost; competitors compound on the same demand pool. Default to scale once the data justifies it.

Marginal results are the trap. They invite more analysis, more meetings, more "let us give it another two weeks." Two weeks of marginal CAC is two weeks of lost money. Pre-commit the decision rule and execute it.

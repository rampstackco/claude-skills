# Audience segmentation patterns

Three audience types treated as separate strategies: prospecting, retargeting, exclusion. Plus cross-platform reconciliation patterns and the most common anti-patterns.

---

## Prospecting

New people who have not engaged with your brand. The largest budget share for growth-mode brands.

**Lookalike audiences (Meta, TikTok).** Seed from a high-quality source (top 10% LTV customers, paying customers from the last 90 days, repeat purchasers) and ask the platform for similar users. 1 to 2% lookalikes are tightest and convert best at lower volumes; 5 to 10% lookalikes are looser and scale to volume but convert at lower rates. Start narrow, expand only if the floor holds.

**In-market audiences (Google).** Google's behavioral signals identify users actively researching a category. Pair with category-relevant keywords for capture, or use as broad targeting on Display, Video, and PMax.

**Interest stacks (Meta).** Stack multiple interest groups within an ad set. The stack approach lets the algorithm find the overlap. Single interests are usually too narrow; flat lists of 30 interests are too broad. Aim for 5 to 10 related interests.

**Custom intent or affinity (Google).** Build audiences from URL lists or keyword lists. Useful for niche categories where in-market is not a clean fit.

**Account lists (LinkedIn).** Upload a target account list and target by company. Pair with job-title or seniority filters to narrow further. The strongest pattern for ABM-style B2B paid.

The prospecting principle. Start with one well-defined audience that matches your hypothesis. Prove CAC. Then expand. Running five prospecting audiences in parallel before any one is proven is the most expensive way to learn nothing.

---

## Retargeting

People who engaged but did not convert. Smaller audience size, higher CTR, lower CAC if executed correctly.

**Window splits.** Different windows have different conversion intents. Run three retargeting tiers with different creative.

| Window | Audience intent | Creative |
|---|---|---|
| 0 to 7 days | Hot. Recent visitors. | Direct conversion offer. Reinforce value prop. |
| 8 to 30 days | Warm. Considered but did not convert. | Address objections. Social proof. Comparison content. |
| 31 to 90 days | Cool. Long consideration cycle or churned interest. | Reactivate with new offers, new content, or value updates. |

**Cart abandoner specific.** If e-commerce, cart abandonment is its own retargeting tier. Window: 0 to 7 days. Creative: cart contents reminder, often with a small incentive (free shipping, 10% off). CTR and CAC are usually the strongest of any retargeting segment.

**Page-specific retargeting.** Visitors to high-intent pages (pricing, demo request, product detail) are warmer than homepage visitors. Run page-specific retargeting at higher bids.

The retargeting trap. Bidding too aggressively trains the platform to charge a premium for users who would have converted anyway. Cap retargeting CPM and CPC; the high CTR and conversion rate produce strong results without aggressive bids.

---

## Exclusion

The audiences you do not want paying for clicks from. Saves spend and keeps frequency low.

**Current customers.** Users with active subscriptions, recent purchases, or active accounts. Exclude from prospecting and most retargeting. Exception: lapsed-cart-from-paying-customer retargeting, which can lift add-to-cart-to-purchase rates.

**Recent converters.** Users who converted in the last 30 to 90 days. Exclude from prospecting. The platform will keep showing them ads otherwise, which produces frequency fatigue and zero new revenue.

**Failed-conversion audiences.** Users who clicked repeatedly across a 60 to 90 day window without converting. Build an exclusion list from this segment. They have signaled they are not converting from paid; stop paying to show them ads.

**Employee lists.** Upload employee email lists and exclude from all paid traffic. Employees clicking on company ads inflate spend and pollute attribution.

**Cross-platform exclusion.** When running both Meta and Google, exclude Meta retargeting from Google retargeting (and vice versa). Two platforms hitting the same user with the same offer produces frequency fatigue and double-billing.

---

## Cross-platform audience reconciliation

When running multiple platforms, audience definitions should align so attribution comparisons are meaningful.

**The seed list problem.** If Meta sees a customer file and Google sees a different customer file, the lookalike sources differ. Reconcile by uploading the same customer list to both, segmented identically (top 10% LTV, last 90 days, etc.).

**The retargeting overlap problem.** A user who visited the site appears in both Meta retargeting and Google retargeting. Both platforms claim the conversion. Reconcile by running one retargeting platform at a time, or by setting platform-specific retargeting budgets that match the actual incremental contribution.

**The exclusion problem.** A user who converts on Meta should be excluded from Google paid prospecting (and vice versa). Without cross-platform exclusion, you pay to advertise the same offer to the same user twice. Pipe conversions to a unified audience layer (CDP, warehouse, or audience-sync tool like Synter or Hightouch) and push exclusions back to each platform.

---

## Anti-patterns

Common mistakes that recur across accounts.

**Prospecting too narrow.** Audience size below the platform's optimization minimum (Meta: roughly 1M users; Google: roughly 100K). The platform cannot optimize against signal that thin. Expand the audience until it has at least 1 to 5 million reachable users (Meta) or in-market scale (Google).

**Retargeting too aggressive.** Bidding above the value of the incremental conversion. Half the retargeting "conversions" would have happened anyway from organic; if you bid for them at full attribution, you overpay.

**No exclusions.** The most common audit finding. Current customers, recent converters, and employees all clicking on paid ads.

**Lookalike from the wrong source.** Building a 5% lookalike from "all customers" (including low-LTV churners). The platform returns users similar to the average, not similar to your best. Always seed from top-LTV or paid-and-retained customers.

**Too many ad sets per campaign.** Splitting one campaign into 10 ad sets fractures the data the platform needs to optimize. Consolidate into 2 to 4 ad sets per campaign with audience size sufficient for each to learn.

**Audience overlap across ad sets.** Two ad sets in the same campaign targeting similar users compete with each other and inflate CPC. Audit overlap with the platform's overlap tool; consolidate ad sets that overlap above 30%.

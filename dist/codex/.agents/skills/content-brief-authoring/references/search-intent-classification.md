# Search intent classification

Four-intent framework, dominant SERP format check, override patterns when intent and format mismatch.

---

## The four standard intents

**Informational.** The reader wants to learn. Queries: "what is CUPED," "how does feature flagging work," "experimentation analytics explained." SERP usually shows articles, guides, explainers, sometimes videos. Conversion is downstream (the reader signs up for the newsletter or returns to the site weeks later); ranking is the immediate goal.

**Navigational.** The reader wants a specific brand, product, or page. Queries: "Statsig pricing," "LaunchDarkly login," "PostHog docs." SERP usually shows the brand site at #1 and a sitelinks block. Ranking against navigational intent is mostly impossible unless you are the brand. The exception: the reader-bypass pattern where adjacent brands rank for "competitor X login" by writing comparison content; play this carefully because it can read as bait.

**Commercial.** The reader is researching a purchase. Queries: "best feature flag tools," "Statsig vs LaunchDarkly," "Optimizely review." SERP usually shows comparisons, reviews, "best X" listicles, sometimes detailed guides. The reader is in active evaluation; this is the highest-conversion intent for B2B SaaS content.

**Transactional.** The reader is ready to buy. Queries: "Statsig signup," "buy LaunchDarkly," "PostHog free trial." SERP usually shows product pages, pricing pages, signup flows. Editorial content does not rank here; brand-owned commercial pages do.

---

## The dominant SERP format check

After classifying intent, scan the SERP top 10 and tag the dominant format.

- **Article.** Long-form prose, single-author voice. Common for informational intent.
- **Listicle.** "10 best X," "7 ways to Y." Common for commercial-investigation intent.
- **Comparison.** Side-by-side X vs Y, table-heavy, decision frameworks. Common for high-funnel commercial intent.
- **Video.** YouTube embeds dominate the top of SERP. Common for how-to and tutorial queries.
- **Tool.** Calculator, generator, interactive tool. Common for "X calculator" or "X generator" queries.
- **Hybrid.** SERP shows a mix; usually tells you the keyword is contested or the intent is split.

The dominant format tells you the shape of the piece, which is more decisive than the intent label. An informational keyword whose SERP is mostly listicles wants a listicle, not a long-form article.

---

## The override pattern

When intent and format mismatch, the format wins.

**Case 1.** The intent feels informational ("how to design an A/B test") but the SERP shows mostly listicles ("7 steps to designing an A/B test"). Write the listicle. The SERP is the source of truth, not your priors about what the intent "should" look like.

**Case 2.** The intent feels commercial ("best feature flag tools") but the SERP shows mostly long-form articles that mention many tools without ranking them. Write the long-form article. Listicle format would feel out of place against the SERP.

**Case 3.** The SERP is genuinely split: half listicles, half long-form articles. Either format can rank. Pick based on the brand's voice and the piece's role in the cluster.

The reason. Rankings come from matching the SERP's accepted shape; deviating costs ranking. Google's ranking algorithm is partly trained on what users click and stay on, which is selected from existing top-ranking content. Existing top-ranking content sets the shape; new content has to match the shape to compete.

---

## The AEO and GEO consideration

AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Mode) tend to favor pieces that match SERP intent format because the intent classification was trained on the SERP corpus.

A piece that mismatches the SERP format faces two problems: it is harder to rank in traditional search, and it is less likely to be cited by AI engines. The mismatch is a double cost.

The exception: thought leadership that deliberately diverges. A piece arguing "the listicle format is misleading for this category; here is why" can rank by drawing traffic on the controversy and earning citations on the contrarian thesis. This is rare and risky; do not default to it.

---

## Brief field: how to populate intent + format

The brief field reads like this:

> **Search intent + SERP format**
> Intent: commercial-investigation
> Dominant SERP format: long-form article + comparison table hybrid (top 5 are articles with embedded comparison tables; positions 6 to 10 are pure listicles)
> Format choice for this piece: long-form article with one comparison table at the midpoint
> SERP intent override: none (format choice matches dominant)

The "format choice" line is decisive. The writer reads this line first and shapes the piece around it.

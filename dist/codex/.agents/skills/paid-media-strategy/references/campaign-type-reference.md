# Campaign type reference

Per-platform campaign type guide. For each campaign type: what it is, when it fits, common pitfalls.

---

## Google Ads

### Search

**What it is.** Text ads on Google search results pages, triggered by keyword auctions.

**When to use.** Direct demand capture. Users searching for category, product, or competitor terms.

**Pitfalls.** Branded over-spend (cannibalizing free traffic). Broad match on weak keywords (drives garbage clicks). Missing negative keyword lists (paying for irrelevant search terms). Audit search-term reports monthly and add negatives.

### Shopping

**What it is.** Product listing ads driven by your Google Merchant Center feed.

**When to use.** E-commerce with a structured catalog. Comparison-shopping intent.

**Pitfalls.** Bad feed quality (missing GTINs, weak titles, wrong categories). The feed is the bottleneck; clean it before scaling spend.

### Performance Max (PMax)

**What it is.** Automated multi-channel campaign that runs across Search, Shopping, Display, YouTube, Discover, and Gmail. The platform decides placement.

**When to use.** E-commerce with a strong feed. When you want Google's automation to do the placement work. As a complement to Search, not a replacement.

**Pitfalls.** Black box optimization makes manual tuning hard. Cannibalizes branded Search traffic; exclude branded queries via account-level negatives. Asset group quality drives results; weak creative produces weak results regardless of platform automation.

### Display

**What it is.** Banner and image ads on the Google Display Network (millions of partner sites).

**When to use.** Retargeting (small audiences, defined intent). Specific contextual targeting where you trust the placement list.

**Pitfalls.** Display without targeting drives garbage traffic. Default placements include low-quality sites that hurt brand. Use only for retargeting unless you have explicit placement controls.

### Video (YouTube)

**What it is.** Video ads on YouTube. Various formats (skippable, non-skippable, bumper, in-feed).

**When to use.** Awareness at scale. B2C consideration. Underrated for B2B SaaS in some categories where buyer research includes long-form video.

**Pitfalls.** Direct-response on Video rarely works as well as Meta video. Use for awareness or as an upper-funnel layer. Skippable ads with strong first-5-seconds work; non-skippable annoys.

### Demand Gen

**What it is.** Successor to Discovery ads. Visual ads across Discover, Gmail, YouTube Shorts, and YouTube in-feed.

**When to use.** Visual-first products targeting users in discovery mode (not search mode).

**Pitfalls.** Newer campaign type with less optimization history; results are more volatile than Search or Shopping. Treat as a tested channel.

### Discovery

**What it is.** Visual ads across Google's discovery surfaces. Being merged with Demand Gen.

**When to use.** Largely deprecated in favor of Demand Gen. Migrate existing Discovery campaigns.

### App

**What it is.** Universal App Campaigns for app installs and engagement.

**When to use.** App promotion. Mostly automated; you provide creative and budget.

**Pitfalls.** Hard to optimize beyond budget and creative inputs. Track post-install events (subscription, retention) not just installs.

---

## Meta (Facebook + Instagram)

### Sales

**What it is.** Campaigns optimized for conversions. The default for direct response.

**When to use.** E-commerce, subscriptions, lead capture with measurable conversion events.

**Pitfalls.** Wrong conversion event optimization (optimizing for "Add to Cart" when "Purchase" is what matters). Inadequate pixel setup (the conversion data feeding the algorithm is incomplete).

### Leads

**What it is.** Campaigns with native lead forms inside Facebook or Instagram.

**When to use.** B2B with mid-funnel offers (whitepaper, demo request, newsletter signup). Native forms have lower friction than off-platform forms.

**Pitfalls.** Lead quality is lower than off-platform forms (less friction, more accidental submissions). Build a CRM enrichment step to filter low-quality leads before passing to sales.

### Engagement

**What it is.** Optimizes for likes, comments, shares, page follows.

**When to use.** Building an organic audience. Almost never as a primary objective for performance work.

**Pitfalls.** Engagement does not predict conversion. Vanity metrics if used as a primary objective for revenue work.

### Awareness

**What it is.** Optimizes for reach and frequency. Brand-style budget.

**When to use.** Brand at scale. New product launches. Competitor-conquest moments.

**Pitfalls.** No conversion signal feeding the algorithm. Cannot evaluate against CAC. Use as a brand layer, not a performance layer.

### Traffic

**What it is.** Optimizes for clicks (link clicks or landing page views).

**When to use.** Driving traffic to long-form content, blog posts, awareness pages where the user journey is multi-touch.

**Pitfalls.** Click-optimized traffic does not predict conversion. The platform finds users likely to click, not users likely to convert. Only use for top-funnel content distribution.

### App Promotion

**What it is.** App install campaigns within Meta.

**When to use.** App promotion specifically. Compare against Google App Campaigns.

**Pitfalls.** iOS 14.5+ tracking restrictions impact attribution; modeled conversions fill the gap imperfectly.

---

## LinkedIn

### Sponsored Content

**What it is.** Sponsored posts in the LinkedIn feed.

**When to use.** B2B awareness and consideration. Native to the LinkedIn experience.

**Pitfalls.** High floor (CPM 5 to 10x consumer platforms). Justify with B2B LTV; otherwise unprofitable.

### Message Ads

**What it is.** Direct messages delivered via LinkedIn InMail.

**When to use.** High-intent B2B nudges where the message reads as a personal note.

**Pitfalls.** Stigma in many segments. Treated as spam if the message reads generic. Personalize aggressively or skip.

### Conversation Ads

**What it is.** Multi-step interactive messages with branching CTAs.

**When to use.** Mid-funnel B2B where multiple value propositions need to be tested in one experience.

**Pitfalls.** Setup complexity. Many teams underuse the branching capability and run them as glorified Message Ads.

### Lead Gen Forms

**What it is.** Native lead forms pre-filled from LinkedIn profile data.

**When to use.** Highest converting LinkedIn objective. Use whenever the offer is a lead capture (demo, whitepaper, content offer).

**Pitfalls.** Lead quality varies by form length. Shorter forms get more leads; longer forms filter to higher quality. Iterate.

### Format types

Single image, carousel, video. Carousel often outperforms single image for product or feature explainers. Video performs best when shot LinkedIn-native with first-3-seconds hook and captions on by default.

---

## TikTok

### In-Feed

**What it is.** Standard ads in the For You Page feed.

**When to use.** Default TikTok format. Most direct-response and awareness work runs here.

**Pitfalls.** Polished ad creative is rejected by the algorithm; native-feeling content wins. Iterate creative weekly to avoid fatigue.

### TopView

**What it is.** Premium first-impression placement when users open the app.

**When to use.** Brand moments at scale. Product launches.

**Pitfalls.** Expensive. Only justify with measurable brand lift or product launch impact.

### Spark Ads

**What it is.** Boost an existing organic post as an ad. Retains organic engagement and signal.

**When to use.** Whenever you have organic posts performing. Spark Ads outperform pure paid creative because they retain the organic-feel signal.

**Pitfalls.** Requires organic content to exist. If the brand has no organic presence, build one first.

### Branded Hashtag Challenge

**What it is.** Sponsored hashtag with branded content prompts.

**When to use.** Major brand campaigns where user-generated participation matters.

**Pitfalls.** Expensive. Hard to measure direct response. Best for brands with cultural-moment ambitions, not direct response.

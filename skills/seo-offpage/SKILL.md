---
name: seo-offpage
description: "Plan and execute off-page SEO including link building, digital PR, brand mentions, citation building, and external authority signals. Use this skill whenever the user wants to build backlinks, plan a digital PR campaign, list local citations, run guest post outreach, develop linkable assets, recover lost links, or audit a backlink profile for risk. Triggers on link building, backlinks, digital PR, brand mentions, citation building, guest post, outreach, linkable asset, broken link building, HARO, podcast outreach, off-page SEO, anchor text, link velocity, toxic backlinks, disavow. Also triggers when the user is trying to grow domain authority or earn coverage."
---

# Off-Page SEO

Build the external signals that earn rankings: backlinks, brand mentions, citations, and trusted sources pointing back to the site. Stack-agnostic.

---

## When to use

- Planning a link-building strategy
- Running digital PR or earned-media campaigns
- Building citations for a local business
- Developing linkable assets (research, tools, calculators)
- Recovering lost backlinks after a migration or audit
- Auditing a backlink profile for spam or toxicity
- Pitching guest posts, podcast appearances, or expert quotes

## When NOT to use

- On-site optimization (use `seo-onpage` or `seo-technical`)
- Keyword research and content planning (use `seo-keyword`)
- Competitor backlink research alone (start with `seo-competitor`, then return here for outreach planning)
- Paid link buying (this skill does not endorse or facilitate that)

---

## Required inputs

- The site or brand getting the links
- The audience and category
- A backlink tool (Ahrefs, Semrush, Moz, Majestic, or similar) for prospecting and monitoring
- A target outcome (rank for X, build authority in Y, recover from Z)

---

## The framework: 4 strategies

Off-page work splits into four strategy types. Most programs blend them. Pick the mix that fits your phase.

### 1. Earned media
Links and mentions you earn through coverage, journalism, or contribution.

- Digital PR (data-driven studies, original research, surveys)
- Expert quotes (HARO, journalist platforms, expert request services)
- Podcast appearances (relevant shows in your category)
- Speaking engagements and conference content
- Newsworthy product launches or company milestones

**Strength:** Highest authority, hardest to replicate.
**Cost:** Time-intensive, often requires PR or content budget.
**Volume:** Low to medium per quarter.

### 2. Owned assets
Linkable assets on your own site that attract links passively over time.

- Original research and reports
- Free tools, calculators, and generators
- Comprehensive guides (the kind that become "the X resource for Y")
- Visualizations and interactive content
- Templates and frameworks
- Industry data trackers (regularly updated benchmarks)

**Strength:** Compounds over time. Each link points at an evergreen asset.
**Cost:** Upfront content investment.
**Volume:** Slow to start, accelerates as the asset earns mentions.

### 3. Partnerships and relationships
Links earned through real business relationships.

- Customer case studies (where they link back)
- Partner programs and integrations
- Co-marketing campaigns
- Industry association memberships
- Speaker and expert contributor relationships
- Affiliate and referral programs

**Strength:** Trustworthy, contextually relevant.
**Cost:** Time to develop relationships.
**Volume:** Medium and consistent.

### 4. Citations and listings
Local and category-specific listings that establish entity legitimacy.

- Google Business Profile (for local businesses)
- Bing Places, Apple Maps Connect
- Industry directories (review-quality only, skip spam directories)
- Niche association directories
- Wikipedia entry (where the brand qualifies for notability)
- Wikidata entry
- Trade publications and category indexes

**Strength:** Foundational for local and entity SEO.
**Cost:** Low to medium, mostly setup time.
**Volume:** One-time foundation, occasional refresh.

---

## Workflow

1. **Audit the current profile.**
   - Total referring domains
   - Domain rating trend
   - Top referring pages by traffic value
   - Anchor text distribution (over-optimized exact-match anchors are a risk)
   - Toxic links (spam directories, link farms, irrelevant categories)
   - Lost links (referring domains that disappeared)

2. **Define the goal.** "Rank top 3 for X by Q4" requires a different tactic mix than "build category authority."

3. **Pick the strategy mix.** Allocate effort across the 4 strategies. A new site typically goes 70/20/10/0 (assets/citations/partnerships/earned) for the first year. An established site can lean more toward earned media.

4. **Build the prospecting list.**
   - For earned media: relevant journalists, podcast hosts, publication beats
   - For owned assets: identify what assets to build based on what gets linked in your category
   - For partnerships: list 50 to 100 potential partner sites
   - For citations: standard list per category, plus niche directories

5. **Outreach.** Personalized, value-first. Generic templated pitches damage the brand more than they help.

6. **Track and measure.**
   - Referring domains gained per month
   - Domain rating trend
   - Anchor text mix (avoid over-optimization)
   - Pages on the site attracting links
   - Lost link recovery rate

7. **Audit and disavow.** Quarterly review for toxic links. Disavow only when there is real evidence of harm (manual penalty notice, sudden drop after spam attack). Most sites should not need to disavow.

---

## Failure patterns

- **Volume over quality.** 100 directory submissions help less than 5 editorial links from category-relevant sites.
- **Buying links.** Risk of manual penalties is real. Cost-adjusted, the ROI rarely works out.
- **Over-optimized anchor text.** If 40 percent of your inbound anchors are "best running shoes," it looks engineered. Aim for natural distribution: brand, naked URL, generic, partial-match, exact-match (in roughly that order of frequency).
- **Generic outreach templates.** "Dear [first name], I love your blog about [topic]" gets archived in seconds. Personalize or do not send.
- **Ignoring lost links.** A 5 percent monthly loss in referring domains compounds. Build a recovery workflow.
- **Treating disavow as a routine cleanup tool.** Disavow is for confirmed spam attacks or penalty recovery, not preemptive hygiene.
- **Working off-page before the site is worth linking to.** A poorly-designed, thin-content site will not convert outreach. Fix on-site first.

---

## Output format

Default output is a markdown plan at `offpage-strategy.md` plus tracking spreadsheets for prospects and outreach.

Structure:
1. Current backlink profile summary
2. Goal and target metrics
3. Strategy mix (allocation across the 4 types)
4. Q1, Q2, Q3, Q4 tactical plan
5. Prospecting lists (in spreadsheets)
6. Outreach templates (personalized, never generic)
7. Tracking and measurement plan

---

## Reference files

- `references/outreach-templates.md` - Templates for guest posting, expert quotes, broken-link outreach, podcast pitches.
- `references/linkable-assets-guide.md` - Categories of linkable assets with examples and effort estimates.

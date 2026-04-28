---
name: seo-competitor
description: "Run a competitive SEO analysis comparing the user's site to chosen competitors across SERP overlap, content depth, backlink profiles, technical posture, and brand presence. Use this skill whenever the user wants to analyze competitors, find content gaps, identify backlink opportunities, understand why competitors outrank them, or benchmark against the rest of their category. Triggers on competitor analysis, competitive analysis, SERP analysis, content gap, backlink gap, why is X ranking, who is winning the SERP, beat my competitor, benchmark, market positioning. Also triggers when planning a content strategy and the question 'what are competitors doing' is implicit."
---

# SEO Competitor Analysis

Compare a site to its competitors and find the gaps worth closing. Stack-agnostic. Tool-friendly but tool-optional.

---

## When to use

- Identifying which competitors to study
- Finding content gaps (topics they cover, you do not)
- Finding backlink gaps (sites linking to them, not you)
- Understanding why a specific competitor outranks the user
- Benchmarking authority, technical posture, and content depth

## When NOT to use

- Single-page optimization (use `seo-onpage`)
- Initial keyword research with no competitors yet identified (use `seo-keyword` first to find them)
- Auditing one's own existing content (use `seo-content-audit`)

---

## Required inputs

- The user's site
- 3 to 5 named competitors (or the topic area, if competitors are not yet identified)
- Access to a keyword tool, a backlink tool, and any crawler

If competitors are unknown, start by listing the top 10 ranking domains for the user's top 10 priority keywords. Pick the 3 to 5 that appear most often.

---

## The framework: 5 angles

Competitor analysis covers five angles. Run all five for a full picture, or pick two or three for a focused investigation.

### 1. SERP overlap
Where do you and the competitor compete head-to-head?

- For each priority keyword, who ranks in the top 10?
- For each top-10 ranking, what page type wins (article, product, comparison, video)?
- Are there SERP features (featured snippet, AI overview, video, image pack) one party holds and the other does not?
- Which queries do competitors rank for that the user does not? (the content gap)

### 2. Content depth
What does their winning content look like?

- Word count and structure of their top-ranking pages
- Information types they include (data tables, original research, video, calculators, downloadable assets)
- Update frequency on key pages (last modified date, change history)
- Internal linking patterns (do their winning pages link to commercial pages?)
- Topical breadth (how many related topics do they cover?)

### 3. Backlink profile
Where does their authority come from?

- Total referring domains
- Domain rating (or equivalent authority metric)
- Top 50 referring pages by traffic value
- Backlink types (editorial, directory, partner, paid, spam)
- Link velocity (gaining or losing referring domains over time)
- Pages on their site attracting the most links (these are their "linkable assets")

### 4. Technical posture
How clean is their technical foundation?

- Core Web Vitals (LCP, INP, CLS)
- Mobile usability
- Schema implementation (which types, on which page types)
- Site architecture and internal linking density
- Crawl efficiency (are they wasting crawl budget?)
- HTTPS, security headers
- llms.txt and AI search readiness

### 5. Brand and entity strength
How well-known are they outside organic search?

- Branded search volume (how many people search their name?)
- Entity recognition in knowledge graph (do they have a Wikipedia page, knowledge panel, structured data feeding entity status?)
- Mention frequency in their topic area (PR coverage, podcast appearances, citations)
- Social signals (followers, engagement, share rates)
- Reviews and reputation

---

## Workflow

1. **Confirm the competitors.** Either named, or derive from SERP overlap on top 10 priority keywords.
2. **Pick the angles.** Run all 5 for a full audit, or 2 to 3 for a focused dive.
3. **Pull the data.** Keyword tool exports, backlink tool exports, manual SERP inspection, technical crawl.
4. **Score each angle.** Where does the user lead? Where do they trail?
5. **Identify gaps.** Specific content gaps, specific backlink gaps, specific technical gaps.
6. **Prioritize.** Which gaps are highest leverage to close? (Big traffic potential, achievable effort, strategic fit.)
7. **Write the report.** Use the template in `references/competitive-audit-template.md`.

---

## Failure patterns

- **Picking the wrong competitors.** A site that outranks you on one keyword but operates a different business is not a competitor. Pick by SERP overlap and audience overlap, not by who you think you compete with.
- **Treating "more content" as the takeaway.** They are not winning because they have 500 articles. They are winning because of specific content + links + UX. Find the actual lever.
- **Copying their pages verbatim.** Diminishing returns. Beat them by being more useful, not by paraphrasing them.
- **Ignoring brand strength.** A weaker site with a stronger brand wins on branded queries you cannot touch with content alone.
- **Static analysis.** Re-run the analysis at least annually. Competitor strategies shift.

---

## Output format

Default output is a markdown report at `competitive-analysis.md` plus accompanying spreadsheets for the keyword and backlink data.

Structure:
1. Executive summary (3 to 5 critical findings)
2. Competitor profiles (one per competitor, brief)
3. SERP overlap analysis
4. Content gap analysis
5. Backlink gap analysis
6. Technical comparison
7. Brand and entity comparison
8. Prioritized gap-closing roadmap

---

## Reference files

- `references/competitive-audit-template.md` - Fillable competitive audit template.
- `references/content-gap-method.md` - Detailed methodology for finding content gaps with example.

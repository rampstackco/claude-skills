# Content Gap Method

A detailed methodology for finding content gaps between your site and competitors. The output is a prioritized list of topics or queries the competition ranks for and you do not, ranked by opportunity.

This is the methodology. For the orchestrated version that runs against the Ahrefs MCP, use `seo-content-gap-audit`.

---

## What a content gap is (and is not)

A content gap is a query or topic where:

- One or more competitors rank in the top 10
- You do not rank in the top 100 (or rank weakly)
- The query is plausibly something your audience cares about
- You could credibly produce content that addresses it

A content gap is not:

- Every keyword a competitor ranks for. Many of those will not match your audience.
- Branded queries for the competitor. You will never rank for "[CompetitorName] login" and should not try.
- Queries with unwinnable SERPs (dominated by Reddit, video, or marketplace listings) unless you have an unusual asset.

---

## Step 1: define the competitor set

Three categories of competitors. Include all three.

### Direct competitors

Same product, same audience. Found in your "industry," your sales process, your churn data.

### Search competitors

Whoever ranks for the queries you care about. Often surprising. Often includes industry publications, aggregators, and adjacent SaaS tools you do not consider competition commercially.

To find search competitors:

1. Pull your top 20 priority queries.
2. Note the top 10 ranking domains for each.
3. Aggregate. Domains that appear 5+ times are search competitors, even if they are not direct.

### Aspirational competitors

Brands that own the topic-area you want to own. Often larger or older. Useful for surfacing topics, less useful for direct comparison.

Build a final set of 5-10 competitors. More than that gets noisy.

---

## Step 2: pull keyword data

For each competitor, pull the queries they rank for in the top 10 (or top 20 for completeness).

Filter out:

- Branded queries containing the competitor name
- Queries with monthly volume below your relevance threshold (commonly 50-100, lower for niche industries)
- Queries with no clear commercial or informational intent (typos, location-specific irrelevant queries, etc.)
- Queries with parent topic that does not apply to your business

Tools: Ahrefs Site Explorer (Organic keywords), Semrush Organic Research, or DataForSEO equivalents.

---

## Step 3: build the gap matrix

Cross-reference all competitors against your site.

| Query | Competitor 1 position | Competitor 2 position | Competitor 3 position | Your position | Monthly volume | Difficulty |
|---|---|---|---|---|---|---|
| query a | 3 | 7 | - | 45 | 1,200 | 32 |
| query b | 5 | 4 | 8 | not ranking | 800 | 28 |
| query c | 1 | - | 5 | 12 | 500 | 41 |

Three categories emerge:

- **Pure gaps:** competitors rank, you do not. Highest opportunity. Filter for queries where 2+ competitors rank.
- **Weak coverage:** you rank but poorly (positions 11-50). Often the fastest wins.
- **Saturated topics:** you and 1+ competitors all rank well. Defensive territory; opportunity to leapfrog.

Focus the next steps on Pure gaps and Weak coverage.

---

## Step 4: cluster by topic

Raw query lists are unmanageable. Cluster by topic so you can plan content, not chase individual keywords.

### Method

Group queries that share intent and can be answered by the same piece of content.

- "best crm for startups," "top crm small business," "crm software comparison" - one cluster, one comparison piece.
- "how to choose a crm," "crm buying guide" - same cluster.
- "what is a crm," "crm definition" - separate cluster (top-of-funnel, glossary or pillar lead-in).

A cluster is one piece of content (or a closely-related set: pillar + spokes).

### Output

| Cluster | Sample queries | Total monthly volume | Avg difficulty | Recommended format | Lead competitor |
|---|---|---|---|---|---|
| | | | | | |
| | | | | | |

---

## Step 5: assess each cluster

For each cluster, answer:

### Audience fit

Does this cluster match your audience? If you sell to enterprise but the cluster is dominated by SMB intent ("free crm for solopreneurs"), score it low.

### SERP analysis

Open the SERP for the highest-volume query in the cluster. Note:

- **Result types:** organic blue links, video, AI overview, featured snippet, local pack, shopping. Some SERPs leave little real estate for new entrants.
- **Result formats:** what kind of pages rank? Blog posts, comparison pages, product pages, free tools, video?
- **Domain mix:** dominated by big publishers (HubSpot, Forbes), niche players, Reddit, or peer companies?
- **SERP volatility:** has the top 10 been stable, or churning?

### Effort estimate

How long would it take to produce content competitive with what is ranking? Be honest. Some clusters need a 4,000-word definitive guide with original research. Others need a 1,200-word how-to.

### Scoring

Combine into a simple opportunity score per cluster. Example:

```
Opportunity = (Volume × Audience Fit × SERP Winnability) / Effort
```

Where:

- **Volume:** total monthly volume across cluster
- **Audience Fit:** 1 (poor), 2 (decent), 3 (perfect match)
- **SERP Winnability:** 1 (saturated, big domains), 2 (mixed), 3 (gettable)
- **Effort:** hours of writing, research, asset creation

This is not a precise formula. Use it to rank clusters, then sanity-check the top of the list against editorial judgment.

---

## Step 6: produce the gap report

A typical output deliverable:

### Section 1: executive summary

- Top 10 clusters ranked by opportunity score
- Estimated total monthly traffic potential if you captured the average competitor position
- Estimated effort (in hours or pieces of content) to address the top 10

### Section 2: cluster details

For each top cluster:

- Cluster name and theme
- Sample queries with volume and difficulty
- SERP analysis snapshot
- Lead competitor's content URL with a one-line note on what makes it strong
- Recommended content format and length
- Recommended hook or angle
- Estimated effort
- Why we should rank: the unique asset, perspective, or data we can bring

### Section 3: clusters to skip

Clusters that surfaced but should not be pursued, with the reason. (Audience mismatch, SERP unwinnable, etc.) Documenting skips prevents re-litigation.

### Section 4: next steps

- Hand-off to `content-strategy` for editorial planning
- Production sequencing (which cluster ships first)
- Measurement: how will you track whether the gap is closing

---

## Worked example

**Site:** B2B project management tool, 50-person company, target audience is engineering leads at series-B SaaS startups.

**Competitors (5):**
1. Linear (direct, peer)
2. Jira (direct, incumbent)
3. Notion (adjacent, encroaching)
4. Asana (direct, larger)
5. Height (direct, peer)

### Gap matrix excerpt

| Cluster | Sample queries | Volume | Difficulty | Lead competitor | Audience fit | SERP winnable | Effort | Opportunity |
|---|---|---|---|---|---|---|---|---|
| "linear vs jira" | 5,400 | 38 | linear.app | High | Mixed | Med | High |
| "engineering project management" | 2,100 | 42 | linear.app | High | Big domains | Med | High |
| "agile sprint planning" | 14,000 | 55 | atlassian.com | Med | Saturated by Atlassian | High | Low |
| "github issue templates" | 3,200 | 28 | github.com | High | Owned by github.com | Med | Skip |

### Recommendations

- **Pursue:** "linear vs jira" cluster (5 related comparison queries, 7,200 combined monthly volume, mid-effort, audience-perfect). Format: comparison page anchored by an internal POV piece.
- **Pursue:** "engineering project management" cluster (broader topic, 4 related queries, requires a pillar piece + 3 spokes). Format: pillar guide + spokes.
- **Skip:** "agile sprint planning." Atlassian owns this with deep, mature content; effort to compete is too high vs opportunity.
- **Skip:** "github issue templates." github.com itself ranks #1; even strong content will not displace.

### Next steps

- Hand the two pursued clusters to content-strategy for editorial sequencing.
- Track positions weekly for the cluster's primary queries.
- Re-run the gap analysis quarterly to spot new gaps as competitors publish.

---

## When to re-run

- **Quarterly** as a routine.
- **After a major competitor launch** (new product page, big content push, redesign).
- **After a search algorithm update** (especially core updates that reshuffle SERPs).
- **When entering a new audience segment** (segment-specific competitors emerge).

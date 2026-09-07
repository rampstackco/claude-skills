# Opportunity scoring rubric

A scoring framework for ranking keyword gap opportunities. The score combines five normalized inputs into a single 0-100 ranking. Use it to convert a long gap list into a prioritized roadmap.

---

## The 5 inputs

### 1. Search volume (weight: 20%)

Monthly search volume in the target market.

Normalize on a log scale because volume is heavily skewed:

| Volume range | Normalized score (0-100) |
| --- | --- |
| 0-100 | 20 |
| 100-500 | 40 |
| 500-2,000 | 60 |
| 2,000-10,000 | 80 |
| 10,000+ | 100 |

Use Ahrefs Keywords Explorer for the volume figure. Confirm the country setting matches the target market.

### 2. Business relevance (weight: 30%)

How close is this keyword to a revenue or conversion topic?

Score on intent stage:

| Stage | Normalized score | Examples |
| --- | --- | --- |
| Direct purchase intent | 100 | "buy [product] online", "[product] price" |
| Comparison and evaluation | 80 | "best [product] for [use case]", "[product A] vs [product B]" |
| Problem-aware research | 60 | "how to [solve problem]", "what is [problem]" |
| Top-of-funnel education | 40 | "[broad topic] guide", "[topic] meaning" |
| Tangentially related | 20 | Adjacent topic with weak conversion path |
| Off-topic | 0 | Drop |

Adjust based on business model. SaaS values evaluation-stage highly. Ecommerce values direct purchase highly. Media values volume across all stages.

### 3. Difficulty (weight: 15%)

How hard is it to rank in the top 10? Use Ahrefs Keyword Difficulty as the starting input, but verify against the actual SERP.

Invert the score. Lower difficulty equals higher opportunity:

| KD score | Inverted normalized score |
| --- | --- |
| 0-10 | 100 |
| 11-30 | 80 |
| 31-50 | 60 |
| 51-70 | 40 |
| 71-100 | 20 |

Override KD if the SERP visibly contradicts it. A KD-15 SERP dominated by Forbes, Reddit, and Wikipedia is harder than a KD-40 SERP of niche bloggers.

### 4. Intent match (weight: 20%)

Can the target produce content that matches the dominant SERP intent?

Look at the top 10 results and classify what they are:

| SERP type | Match score for an article | Match score for a tool | Match score for a product page |
| --- | --- | --- | --- |
| Articles dominate | 100 | 20 | 0 |
| Tools or calculators dominate | 20 | 100 | 0 |
| Product pages dominate | 0 | 0 | 100 |
| Marketplaces dominate | 20 | 40 | 60 |
| Video dominates | 40 | 60 | 0 |
| Mixed (no dominant type) | 60 | 60 | 60 |

If the target cannot produce the matching content type, drop the keyword regardless of other scores.

### 5. Position potential (weight: 15%)

Realistic top 3 reach within 6 months given current site authority.

Estimate based on:

- Current ranking position (if any)
- Domain Rating relative to the SERP
- Content depth required
- Topical authority in this space

| Current position | DR vs SERP avg | Position potential score |
| --- | --- | --- |
| Top 3 already | Any | Skip (defend, do not gap-target) |
| Position 4-10 | At or above | 100 |
| Position 11-20 | At or above | 80 |
| Position 11-20 | Below | 60 |
| Position 21+ | At or above | 50 |
| Not ranking | Above SERP avg | 60 |
| Not ranking | At SERP avg | 40 |
| Not ranking | Below SERP avg | 20 |

---

## The formula

```
score = (volume_normalized * 0.20)
      + (relevance_score * 0.30)
      + (difficulty_inverted * 0.15)
      + (intent_match * 0.20)
      + (position_potential * 0.15)
```

Score ranges 0-100. Apply the action banding:

| Score | Action | Typical timeline |
| --- | --- | --- |
| 80-100 | Top priority. Plan content this quarter. | 0-90 days |
| 60-79 | Strong priority. Plan within 6 months. | 90-180 days |
| 40-59 | Watch list. Revisit on landscape shift. | Quarterly review |
| Below 40 | Park or drop. | Annual review |

---

## Worked example 1: high-priority gap

Keyword: "[mid-funnel evaluation phrase]"

| Input | Raw | Normalized |
| --- | --- | --- |
| Volume | 1,800/month | 60 |
| Relevance | Comparison stage | 80 |
| Difficulty | KD 25, SERP confirms accessible | 80 |
| Intent | Articles dominate, target produces articles | 100 |
| Position | Currently position 14, DR above SERP avg | 80 |

```
score = (60 * 0.20) + (80 * 0.30) + (80 * 0.15) + (100 * 0.20) + (80 * 0.15)
      = 12 + 24 + 12 + 20 + 12
      = 80
```

Band: top priority. Plan this quarter.

---

## Worked example 2: borderline opportunity

Keyword: "[broader top-of-funnel phrase]"

| Input | Raw | Normalized |
| --- | --- | --- |
| Volume | 9,500/month | 80 |
| Relevance | Top-of-funnel education | 40 |
| Difficulty | KD 55 with Forbes in top 3 | 30 (override) |
| Intent | Mixed SERP, target produces articles | 60 |
| Position | Not ranking, DR below SERP avg | 20 |

```
score = (80 * 0.20) + (40 * 0.30) + (30 * 0.15) + (60 * 0.20) + (20 * 0.15)
      = 16 + 12 + 4.5 + 12 + 3
      = 47.5
```

Band: watch list. Revisit if domain authority grows or if priority shifts.

---

## Worked example 3: drop

Keyword: "[high-volume but off-topic phrase]"

| Input | Raw | Normalized |
| --- | --- | --- |
| Volume | 22,000/month | 100 |
| Relevance | Tangentially related | 20 |
| Difficulty | KD 65 | 30 |
| Intent | Marketplaces dominate, target produces articles | 20 |
| Position | Not ranking, DR well below SERP avg | 20 |

```
score = (100 * 0.20) + (20 * 0.30) + (30 * 0.15) + (20 * 0.20) + (20 * 0.15)
      = 20 + 6 + 4.5 + 4 + 3
      = 37.5
```

Band: drop. High volume is not enough.

---

## Adjusting weights for goal

Default weights work for general opportunity audits. For specific goals:

### Quick wins focus

- Volume: 15%
- Relevance: 25%
- Difficulty: 25%
- Intent: 20%
- Position: 15%

### Strategic territory focus

- Volume: 25%
- Relevance: 35%
- Difficulty: 10%
- Intent: 20%
- Position: 10%

### Defensive (protect rankings)

Reuse the formula but apply to "shared territory" cell. Position potential weights higher.

---

## Clustering after scoring

After scoring individual keywords, cluster them. Targeting clusters beats targeting one-off keywords.

Cluster rules:

- Same dominant intent
- Overlapping SERP results (top 5 results match for 60%+ of the cluster)
- Naturally addressable by one piece of content

Apply the highest score in the cluster as the cluster's score for prioritization.

---

## Common mistakes when scoring

- **Trusting volume estimates blindly.** Ahrefs estimates have wide confidence intervals at low volumes. A "50/month" keyword may be 5 or 200.
- **Treating KD as ground truth.** Always look at the SERP. KD is a heuristic, not a verdict.
- **Scoring before intent matching.** A keyword with mismatched intent scores high on paper but cannot rank for the target. Filter intent first.
- **One-time scoring.** Re-score quarterly. SERPs evolve. Competitor moves change difficulty.
- **No business filter.** A high score on a topic with zero conversion path is not an opportunity. Add a sanity check on relevance.
- **Optimizing for the formula, not the goal.** The score informs the call. The goal makes the call.

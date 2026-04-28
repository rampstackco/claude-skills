---
name: seo-keyword-gap-audit
description: "Find keywords competitors rank for that the target property does not, and prioritize them by opportunity. Uses Ahrefs MCP for keyword and competitor data. Use this skill when planning content investment, identifying quick wins, building a content calendar against a competitor set, or scoping a market entry. Triggers on keyword gap, content gap, competitor keywords, opportunity keywords, what should we target, where are competitors winning, keyword opportunity. Also triggers when planning content for a new market or after losing organic share to a specific competitor."
---

# SEO Keyword Gap Audit

Find keyword opportunities by comparing the target property's organic footprint against a competitor set, using Ahrefs MCP data. Stack-agnostic. Produces a prioritized list of keywords to target with new or improved content.

---

## When to use

- Planning content investment for the next quarter
- Identifying quick-win keywords for fast organic gains
- Scoping market entry into a new vertical
- Refreshing a stale content strategy
- Diagnosing why a competitor is gaining organic share
- Pre-acquisition due diligence on growth ceiling

## When NOT to use

- Pure keyword discovery without a competitor frame (use `seo-keyword`)
- Single-page optimization (use `seo-onpage`)
- Content audit on existing pages (use `seo-content-audit`)
- Topic and pillar planning (use `content-strategy`)

---

## Required inputs

- Target property
- Competitor set (3-5 properties with overlapping intent and audience)
- Target market and language
- Business priorities (which segments matter most)
- Existing content inventory (URLs and primary topics)
- Confirmation Ahrefs MCP is connected

---

## The framework: the gap matrix

A keyword can fall into one of four cells based on whether the target ranks and whether competitors rank.

|  | Target ranks | Target does not rank |
| --- | --- | --- |
| **Competitors rank** | Shared territory (defend and grow) | Pure gap (the opportunity) |
| **Competitors do not rank** | Unique territory (asset to protect) | Untouched (validate before investing) |

The audit focuses primarily on the "pure gap" cell. The other cells get secondary treatment.

### Pure gap (top focus)

Keywords where one or more competitors rank in the top 10 and the target does not rank at all or ranks past page 3. These are the primary opportunities.

### Shared territory

Keywords where both target and competitors rank. Useful for defending position and finding pages to push from page 2 to page 1.

### Unique territory

Keywords where the target ranks and no competitor does. These are differentiators. Audit to confirm they are actually valuable (not just irrelevant terms).

### Untouched

Keywords no one in the set ranks for. Could be opportunity or could be irrelevant. Validate intent before investing.

---

## Opportunity scoring

Not every gap keyword is worth pursuing. Score each candidate.

### Scoring dimensions

| Dimension | What it measures | Weight |
| --- | --- | --- |
| Search volume | Estimated monthly searches in target market | 20% |
| Business relevance | How close to a money topic for the target | 30% |
| Difficulty | How hard to rank (Ahrefs KD or proxy) | 15% |
| Intent match | Whether target can satisfy the dominant intent | 20% |
| Position potential | Realistic top 3 reach within 6 months | 15% |

Weights adjust based on goal. For quick wins, weight position potential and difficulty higher. For strategic territory, weight business relevance and volume higher.

### Opportunity score formula

```
score = (volume_normalized * 0.2)
      + (relevance_score * 0.3)
      + (difficulty_inverted * 0.15)
      + (intent_match * 0.2)
      + (position_potential * 0.15)
```

Where each input is normalized to 0-100. The result is a 0-100 score.

### Banding for action

| Score | Action |
| --- | --- |
| 80-100 | Top priority. Plan content this quarter. |
| 60-79 | Strong priority. Plan within 6 months. |
| 40-59 | Watch list. Revisit if competitive landscape shifts. |
| Below 40 | Park or drop. |

---

## Workflow

1. **Define the competitor set.** 3-5 properties. Confirm they share intent and audience.
2. **Pull keyword data.** For each property: organic keywords, top pages, traffic estimates.
3. **Build the gap matrix.** Label each keyword with which property ranks where.
4. **Filter to the pure gap cell.** Strip out the other cells for now.
5. **Validate intent.** For each keyword, confirm the SERP intent matches what the target can produce.
6. **Score by opportunity.** Use the formula. See `references/opportunity-scoring-rubric.md`.
7. **Cluster.** Group related keywords into topics. One topic, one piece of content.
8. **Map to existing content.** Some gap keywords are addressable by updating an existing page rather than creating new.
9. **Sequence.** Build the prioritized list with action (create / update / merge / new pillar).
10. **Hand off.** Output feeds `content-strategy` and `seo-onpage`.

---

## Failure patterns

- **Wrong competitor set.** Choosing competitors by brand recognition rather than SERP overlap produces gap lists that are not actually competitive. Pick competitors that fight you in the SERPs.
- **Volume worship.** High-volume gap keywords are often unrealistic. A 50-volume keyword you can rank for beats a 5,000-volume keyword you cannot.
- **Ignoring intent.** A gap keyword where the SERP is dominated by tools or marketplaces is not addressable by an article. Match content type to intent.
- **Skipping clustering.** Targeting individual keywords instead of topics produces thin content that loses to topical hubs.
- **Over-relying on Ahrefs KD.** Difficulty scores are heuristics. Look at the actual SERP. If it is dominated by Forbes and Wikipedia, KD is misleadingly low.
- **No business filter.** A high-volume gap with zero buyer intent is a vanity opportunity. Filter for relevance.
- **One-shot audits.** Gap closes and reopens as competitors publish. Rerun on a cadence.
- **Forgetting unique territory.** Defending what you uniquely rank for can be more valuable than chasing gaps. Audit both directions.
- **Single-language audits in multi-market sites.** Run separate gap audits per market. Patterns differ.

---

## Output format

A keyword gap audit document with:

1. **Executive summary.** Top 3 themes and top 10 priority keywords.
2. **Competitor set.** Who, why selected, SERP overlap evidence.
3. **The gap matrix.** Counts and patterns across the four cells.
4. **Pure gap analysis.** The opportunity list, scored and banded.
5. **Topic clusters.** Groups of related keywords mapped to content concepts.
6. **Action map.** Create / update / merge decisions per cluster.
7. **Quick wins.** Top 5-10 highest-confidence opportunities.
8. **Strategic plays.** High-impact, longer-horizon investments.
9. **Methodology.** Data sources, scoring weights, caveats.

Length: 6-15 pages plus an attached opportunity spreadsheet.

---

## Reference files

- `references/opportunity-scoring-rubric.md` - Scoring rubric with normalization rules, formula, and worked examples.

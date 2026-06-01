# Cluster piece anatomy

Focused-question framing. Pillar callout placement. Lateral linking judgment.

---

## The shape of a cluster piece

A cluster piece is not a mini-pillar. Different shape, different work.

### Hero (first 100 to 150 words)

Focused on one specific question or task. The hero does not introduce the broader topic; the pillar does that. The hero introduces the cluster piece's specific facet.

- **Title.** Includes the cluster's primary keyword. Often question-form ("What is a feature flag kill switch?") or task-form ("How to design a feature flag kill switch").
- **Subhead.** One sentence promising the specific answer.

### Pillar callout (within first 200 words)

The bottom-up link to the pillar. Required.

**Pattern.** "This piece covers feature flag kill switches in depth. For the broader context on rollout strategies that include kill switches as one safety mechanism, see our guide to [feature flag rollout strategies](/feature-flag-rollout/)."

**Why required.** The pillar callout is the structural signal that this cluster belongs to the hub. Without it, the piece reads as a standalone article and the hub does not compound.

**Why early.** Crawlers and AI engines weight links higher when they appear near the top of the page. The first 200 words is the citation-prime real estate; the pillar callout there has more impact than the same callout in the closing.

### Focused body (the bulk of the cluster)

Answers the specific question with depth. Does not expand into adjacent facets.

**The discipline.** When the writer notices an interesting tangent into an adjacent facet, they note it as a candidate for another cluster piece and stay on topic. The cluster piece does one thing well; expansion belongs in a different piece.

**Section structure.** 4 to 6 H2 sections covering the cluster's question from different angles. Each H2 has a featured-snippet-bait answer paragraph (40 to 60 words) followed by 200 to 400 words of development.

### Lateral callouts (selective)

When the cluster's body naturally references a sibling cluster, link to it.

**Pattern.** A cluster on percentage rollouts naturally references kill switches in the section on "what happens when the rollout shows problems." A 1-sentence aside with a contextual link to the kill switches cluster.

**Frequency.** 0 to 3 lateral links per cluster piece. Some clusters need none; some clusters at the topic's center connect to several siblings.

**Anti-pattern.** Forced lateral linking. If the connection is not natural to the body's flow, the link is decorative and dilutes anchor signal.

### Closing

Two equally valid closing patterns.

**Pattern A: link back to pillar.** "Kill switches are one part of a complete rollout strategy. Continue reading our [feature flag rollout strategies guide](/feature-flag-rollout/) for the rest of the patterns."

**Pattern B: link to next cluster in a journey.** "If you have your kill switches designed and want to think about progressive rollouts, read our [percentage rollout guide](/feature-flag-rollout/percentage-rollouts/) next."

The choice. Pattern A is the safe default; it reinforces the pillar and works for most cluster pieces. Pattern B is appropriate when the cluster has a clear "next step" in a reader journey (foundational concept → next concept).

---

## Length calibration

800 to 2,000 words is the typical cluster range. Calibrate to:

- **The SERP for the cluster's specific keyword.** Top 10 word counts tell you the band.
- **The cluster's place in the hub.** Foundational clusters (definitions, intros) often run shorter; advanced clusters (deep how-tos, comparisons) often run longer.

**The 2,500-word cluster trap.** A cluster piece longer than 2,500 words is probably a mini-pillar. Two diagnostic questions:

1. Does it cover 2+ distinct facets? If yes, split into two cluster pieces.
2. Does it have 8+ H2 sections? If yes, it is structurally a pillar; either promote it (with cluster support) or trim.

**The 600-word cluster trap.** A cluster piece shorter than 800 words is often too thin to rank for its target keyword. Either:

- Expand to 1,000+ words with deeper coverage of the question.
- Merge with a sibling cluster if the topic does not have enough depth.
- Demote to a non-hub blog post if the piece is just a brief observation.

---

## Featured snippet bait at H2 level

Cluster pieces benefit from featured-snippet-bait answer paragraphs at every H2, not just at the top.

**Pattern.**

> ## What is a feature flag kill switch?
>
> A feature flag kill switch is a one-toggle mechanism that disables a feature instantly across all users. It exists as the final safety net when a rollout shows critical problems and per-user gradual rollback is too slow.

The 40 to 60 word answer paragraph is self-contained and citation-ready. AI engines extract these paragraphs as the canonical answers.

**Frequency.** Every H2 should have a snippet-bait paragraph. The pattern repeats throughout the piece; it is a structural discipline.

---

## Schema markup for clusters

Cluster pieces typically use Article schema (or HowTo if the cluster is a step-by-step guide). FAQPage schema applies if the cluster has a real FAQ section.

BreadcrumbList schema is required for cluster pieces; it tells crawlers the cluster is part of the hub.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Feature flag rollout", "item": "https://example.com/feature-flag-rollout/" },
    { "@type": "ListItem", "position": 3, "name": "Kill switches" }
  ]
}
```

---

## When the cluster piece is also useful as a standalone

Some cluster pieces will rank for queries unrelated to the pillar's topic. A cluster on "kill switches" might also rank for queries about software safety patterns generally.

The decision: keep the cluster piece in the hub even when it ranks for non-hub queries. The pillar callout costs nothing for the standalone-query reader; the hub-traffic reader benefits from the link. Both audiences are served.

The exception: when the cluster piece's standalone ranking dominates and the pillar context is misleading to the standalone-query reader, consider splitting into two pieces. Rare; usually the pillar callout works fine for both audiences.

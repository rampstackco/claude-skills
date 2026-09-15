# Pillar page anatomy

Section-by-section anatomy. TL;DR placement and length. FAQ schema. Internal-link callout placement. Schema markup choices. Length calibration.

---

## Section-by-section structure

A pillar page does specific work across a recognizable set of sections.

### Hero (first 200 words)

Defines the topic, signals scope, establishes authority quickly.

- **Title.** Includes the primary keyword. Reads as comprehensive ("The complete guide to feature flag rollout strategies").
- **Subhead.** One sentence promising specific value to a specific audience.
- **Author / publish / update line.** Author name with link to bio (E-E-A-T signal); last-updated date (freshness signal).

### TL;DR or executive summary (150 to 250 words)

The most important section for AI citation. AI engines extract this verbatim and use it as the canonical answer when users ask the topic question.

**What goes in.** A self-contained summary of the pillar's argument. Read alone, it answers the topic. Read in context, it sets up the comprehensive body.

**What does not go in.** Marketing fluff. Throat-clearing meta-commentary that announces what the page is about to do instead of doing it. Cut it.

**Format.** Either a single dense paragraph (150 to 250 words) or 5 to 7 bullet points. Both work; bullets often extract more cleanly to AI engines.

### Table of contents

Auto-generated from H2 and H3 structure. Anchors to each section. Helps readers scan; helps crawlers see structure.

### Comprehensive body (the bulk of the pillar)

12 to 20 H2 sections covering the topic's major facets. The body is a guided tour with depth links, not a comprehensive treatment of every facet.

**Per H2 section.**

- **Featured snippet bait.** A 40 to 60 word answer paragraph immediately following the H2 question. AI engines often quote this as the citation.
- **Body of the section.** 200 to 600 words developing the answer with examples, formulas, edge cases.
- **Cluster link callout.** When the section maps to a cluster piece, link to the cluster contextually within the body. "For the full pattern including [specific facet], see our [cluster piece guide]."

### Use cases or examples

Anchor the abstract topic to concrete instances. 3 to 5 worked examples. Each example named, scoped, and referenced in the body.

### Common mistakes / FAQ

Structured Q&A. Each Q is a real question; each A is a 40 to 80 word answer.

**Pair with FAQPage schema.** Mark the Q&A section with FAQPage structured data. AI engines (Perplexity especially) cite FAQPage content heavily.

**Anti-pattern.** "Frequently asked questions" that nobody actually asks. The FAQ should source from real customer questions, sales-call transcripts, support tickets. Fabricated FAQs are obvious to readers and to AI engines.

### Closing or next steps

Directs the reader into the cluster. "If you are starting fresh, read [intro cluster piece]. If you have rollouts running and need to harden them, read [advanced cluster piece]."

The closing is also where the second bottom-up pillar reinforcement lands for cluster pieces; for the pillar itself, the closing names the next-best clusters by reader intent.

---

## TL;DR placement and length

Place immediately after the hero, before the table of contents. The reader sees TL;DR within the first scroll. AI engines scrape from the top of the page; TL;DR placed early gets prioritized.

**150 words minimum.** Below 150, the TL;DR is too thin to serve as a citation candidate.

**250 words maximum.** Above 250, the TL;DR loses its punch and starts duplicating the body.

**Self-contained.** A reader who reads only the TL;DR should walk away with the topic's core. No throat-clearing or hedging; the TL;DR IS the answer.

---

## FAQ schema

The FAQ section gets FAQPage schema. The format:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a feature flag kill switch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A feature flag kill switch is a one-toggle mechanism that disables a feature instantly across all users. It exists as the final safety net when a rollout shows critical problems and per-user gradual rollback is too slow. Kill switches are configured at deploy time and remain available throughout the feature's lifecycle."
      }
    }
  ]
}
```

**Common mistake.** FAQPage schema on questions that are not real FAQs. Schema markup that misrepresents page content can trigger manual penalties; mark only genuine FAQ sections.

---

## Internal-link callout placement

The pillar links to cluster pieces from within the body, not from a "related reading" footer.

**Pattern.** Inside the H2 section that maps to a cluster, place one contextual link to the cluster piece. Position the link at the moment in the section where the reader's curiosity peaks: typically after the section has set up the question and before the answer goes deep.

**Example.** In the H2 "What is a kill switch?" section, after the 40 to 60 word answer paragraph, link to the cluster piece on kill switches with the phrase "For the full pattern including code-level implementations, see our [kill switch design guide]."

**Frequency.** One link per cluster from the pillar. Two if the cluster maps to two distinct sections of the pillar. Avoid more than two; the second link is the reinforcement, not a third or fourth.

---

## Schema markup choices

The pillar's primary schema depends on intent.

**Article schema.** Default for most pillars. Marks the page as long-form editorial content.

**HowTo schema.** When the pillar is a step-by-step guide ("how to launch a feature flag rollout"). HowTo gives Google more structured data to render in SERPs.

**FAQPage schema.** Always pair with the FAQ section, not the pillar overall.

**BreadcrumbList schema.** Always include for hub navigation context.

**Author schema.** Embed Person schema for the author with credentials, bio link, and same-as references to LinkedIn or X. E-E-A-T signal.

---

## Length calibration

3,000 to 5,000 words is the typical pillar range. Calibrate to the SERP, not to a quota.

**SERP top 10 average word count tells you the band.** Pull the top 10; tag word counts; aim for the top 3 average. If the top 3 average 4,200 words, your pillar should target 4,000 to 4,500.

**The depth-vs-length tradeoff.** Pillar quality is comprehensiveness AND depth, not just length. A 6,000-word pillar that covers 3 facets in massive depth is worse than a 4,000-word pillar that covers 12 facets at appropriate depth. Length without breadth is not a pillar; it is a long article.

**The cluster offload.** Each cluster piece reduces the depth required in the pillar's corresponding section. If kill switches has its own cluster piece, the pillar's kill-switches section can be 300 words pointing to the cluster, not 1,200 words duplicating the cluster. The cluster offload is what keeps the pillar at the right length.

---

## Updates and freshness signals

The pillar's "last updated" date is a freshness signal. Update it whenever you make material changes (statistics refreshed, new section added, cluster expanded). Do not update it for cosmetic edits; spurious freshness signals are noticed by ranking systems.

The annual pillar refresh (see `content-refresh-patterns.md`) is the discipline that produces honest freshness signals.

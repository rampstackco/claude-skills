# Pillar vs cluster vs orphan decision

The decision tree, worked examples, and the "everything is a pillar" anti-pattern.

---

## The decision tree

When a new piece is being planned, walk these questions in order.

**Question 1.** Does this topic have 8 to 15 distinct facets that could each be a separate piece?

- Yes: this might be a pillar. Continue to question 2.
- No: this is not a pillar. Continue to question 4 to test cluster fit.

**Question 2.** Is the topic competitive enough to require comprehensive coverage to rank?

- Yes (top 10 SERP shows long-form pillars from authoritative sources): pillar candidate confirmed. Continue to question 3.
- No (top 10 SERP shows short articles or tools): the topic does not need a pillar. A cluster piece probably suffices.

**Question 3.** Is the team committed to maintaining this pillar for 3 to 5 years (annual refresh, cluster expansion, ownership)?

- Yes: ship as pillar. Plan the cluster.
- No: do not start. A pillar without maintenance is worse than no pillar; it ranks for a year, then decays.

**Question 4.** Is there an existing pillar this piece could connect to as a cluster?

- Yes: ship as cluster. Specify the pillar callout and the bottom-up link in the brief.
- No: continue to question 5.

**Question 5.** Is this piece intentionally standalone (release note, customer story, one-off campaign, executive announcement)?

- Yes: ship as standalone. Standalone-by-design is fine.
- No: this is an accidental orphan. Either build the pillar first, or postpone the piece until a pillar exists, or rescope the piece to fit an existing pillar's cluster.

---

## Worked examples

### Example 1: "Feature flag rollout strategies"

A B2B SaaS team is planning a piece on feature flag rollout strategies.

- 8 to 15 facets? Yes: percentage rollout, ring deployment, canary, blue-green, kill switches, automatic rollbacks, rollout per cohort, rollout by geography, rollout by plan tier, etc. ✓
- Competitive SERP? Top 10 are long-form articles from LaunchDarkly, Statsig, Optimizely. Pillar candidate confirmed. ✓
- 3 to 5 year commitment? The team plans to expand the cluster as new patterns emerge. ✓

Decision: pillar. Plan 10 to 12 cluster pieces around it.

### Example 2: "How to set up a Statsig experiment"

The same team is planning a how-to on Statsig experiment setup.

- 8 to 15 facets? No. The topic is one task with maybe 5 sub-steps. ✗
- Existing pillar to connect to? Yes: the team has an "experimentation" pillar.

Decision: cluster. Pillar callout to "experimentation" pillar; link up in first 200 words and closing.

### Example 3: "Q3 2026 product release notes"

The marketing team is planning a quarterly release-notes post.

- 8 to 15 facets? No. ✗
- Existing pillar to connect to? Not a topical fit; release notes are a different content type.
- Standalone-by-design? Yes; release notes serve customers tracking the product, not topical authority.

Decision: standalone. Do not force into a hub; serve the customer tracking purpose.

### Example 4: "What is a feature flag?"

A piece on the basic definition.

- 8 to 15 facets? No. The topic is one definition. ✗
- Existing pillar to connect to? Yes: the "feature flag rollout strategies" pillar from example 1 needs a "what is a feature flag" cluster piece for the foundational facet.

Decision: cluster under the feature flag rollout pillar. The pillar gets the cluster it needs; the piece gets the topical context it needs.

---

## The "everything is a pillar" anti-pattern

The symptom. Every 3,000-word piece on the team's site is called a pillar. The marketing team uses the word loosely; the SEO team uses it strictly; nobody agrees on what makes a pillar.

The diagnosis. Length is being treated as the pillar criterion. Length does not make a pillar. The architectural role does. A 3,000-word piece with no cluster supporting it is a long article, not a pillar. A 1,500-word piece with 12 cluster pieces linking up to it is closer to a pillar than the 3,000-word standalone, even though the word counts are reversed.

The fix. Use the word "pillar" precisely. Pillar is a piece that anchors a hub. If there is no hub, there is no pillar. Long articles that are not anchoring hubs are just long articles, and that is fine; they do not need to be promoted to "pillar" to justify the investment.

The diagnostic question. "What pieces link up to this pillar?" If the answer is "none yet" or "we are planning to add some," the pillar is not yet a pillar. It is a planned pillar that becomes a real pillar when the cluster ships.

---

## When the decision is hard

**The "almost a cluster" case.** A piece is 1,800 words, covers a specific facet of an existing pillar, and would link up to the pillar. Sounds like a cluster. But the piece also stands alone for non-hub queries. Decision: ship as cluster. The pillar callout is cheap; the topical compounding is real. The "standalone-by-design" exception is for pieces that have a different purpose (release notes, customer stories), not for pieces that happen to be readable alone.

**The "almost a pillar" case.** A piece is 3,500 words, covers a topic with 6 facets (not 8 to 15), and the SERP for the topic is moderately competitive. Decision: ship as a long cluster piece under a broader pillar, or postpone until the topic surfaces more facets. Forcing 3,500 words into a 6-facet topic creates the "pillar with 12 sections of 'what is X'" failure mode.

**The "we already have 5 standalone pieces on this topic" case.** No pillar exists; 5 orphans cover related facets. Decision: build the pillar, then refactor the 5 orphans into clusters by adding pillar callouts and bottom-up links. The hub is being created from existing content rather than from scratch; this is faster than starting over and works well when the orphans are already decent.

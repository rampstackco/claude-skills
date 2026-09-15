# Internal linking architecture

Top-down, bottom-up, lateral linking patterns. Anchor text discipline. The linking inventory pattern. Quarterly link audit checklist.

---

## The three link directions

A hub's link graph has three directions; all three need discipline.

### Top-down: pillar to cluster

The pillar links out to each cluster piece via contextual anchors woven into the pillar's body. The reader is reading the section on, for example, "kill switches"; that section includes a contextual link to the cluster piece on kill switches.

**Pattern.** "Most rollouts include a kill switch as a final safety net. For the full pattern including code-level implementations, see [our guide on kill switch design](/feature-flag-rollout/kill-switches/)."

**Anti-pattern.** A "Related reading" footer at the bottom of the pillar listing 12 cluster links. Footer links pass less topical signal and read as decorative; contextual body links read as load-bearing.

**Frequency.** One link per cluster from within the pillar. Two links to the same cluster from the pillar is fine if the cluster covers two distinct sections; three links to the same cluster suggests the pillar should reference the cluster more selectively.

### Bottom-up: cluster to pillar

Every cluster piece links up to the pillar at least twice. First in the introduction (within the first 200 words); second in the closing.

**Pattern in introduction.** "This piece covers kill switches in feature flag rollouts. For the broader context on rollout strategies, see our guide to [feature flag rollout strategies](/feature-flag-rollout/)."

**Pattern in closing.** "Kill switches are one part of a complete rollout strategy. Continue reading our [feature flag rollout strategies guide](/feature-flag-rollout/) for the rest of the patterns, or jump to [percentage rollouts](/feature-flag-rollout/percentage-rollouts/)."

**Why two.** First link tells crawlers and readers the topical context immediately. Second link captures readers who got value from the cluster piece and want to dig deeper into the hub.

### Lateral: cluster to cluster

Selective. When one cluster piece naturally references another, link with descriptive anchor text. Do not force lateral links.

**Pattern.** A cluster on "percentage rollouts" naturally references "kill switches" when discussing what to do if the rollout shows problems. The lateral link is contextual; the reader is at a moment where the related cluster is actually useful.

**Anti-pattern.** Every cluster piece links to every other cluster piece. The link graph becomes complete-graph-shaped; anchor text relevance dilutes; PageRank flow is undirected and weaker.

**Frequency.** 1 to 3 lateral links per cluster piece is typical. Some clusters need zero lateral links; some clusters that sit at the center of a topic naturally connect to 5 sibling clusters.

---

## Anchor text discipline

Anchor text is the signal that tells search engines what the linked-to page is about. The discipline:

**Vary the anchor text.** Do not link to the pillar with the exact same phrase every time. Use the pillar's primary keyword, secondary keywords, and natural-language phrases that describe the linked page.

**Descriptive natural-language anchors.** "See our guide to feature flag rollout strategies" beats "click here to read more." The anchor text should make sense if it is the only thing the reader reads.

**No over-optimization.** Do not stuff every link with exact-match keywords. Anchor text that varies naturally is what a real authority cluster looks like; uniform exact-match anchors signal manipulation to ranking systems.

**Brand-mention anchors.** Sometimes the right anchor is the brand name or product name when linking to a product page. "RampStack's experimentation skill" is a brand anchor; "experimentation skills documentation" is a descriptive anchor. Mix both.

**Common dead anchors.** "Click here," "this article," "read more," "more info." All dead. They pass minimal topical signal and waste the link's potential.

---

## The linking inventory pattern

Maintain an inventory of every link in the hub. The format depends on the team's tooling.

**Spreadsheet.** Columns: source page slug, target page slug, anchor text, link section (intro / body / closing / sidebar), link direction (top-down / bottom-up / lateral / external).

**Notion database.** Same columns as relations, queryable per page or per direction.

**dbt model with content metadata.** For warehouse-native content tracking; the link graph becomes a queryable table that compounds with other content metrics (rank, citation count, conversion).

**CMS audit fields.** Some CMSs (Contentful, Sanity, custom WordPress) allow per-page metadata fields. Track outbound links per piece; aggregate at the hub level.

The inventory enables the quarterly audit; without it, the audit becomes a manual scan that misses things.

---

## Quarterly link audit checklist

Run every 90 days. Catches the failures that compound silently.

1. **Broken outbound links.** Crawl every cluster piece for 404s on outbound links. Common cause: cluster piece was renamed or moved without redirect.
2. **Missing bottom-up links.** Every cluster should link to the pillar in intro and closing. Audit checks both.
3. **Missing top-down links.** Pillar should link to every cluster from within the body. Audit checks each cluster has at least one body link from the pillar.
4. **Anchor text drift.** Same anchor text used by 5+ links to the same target reads as over-optimized. Vary by editing 2 to 3 of them.
5. **Dead anchors.** "Click here" or "read more" anchors that crept in during writing. Replace with descriptive anchors.
6. **Lateral over-linking.** Cluster pieces linking to 5+ siblings reads as complete-graph noise. Trim to 2 to 3 most-relevant siblings.
7. **Orphan clusters.** Cluster piece that no other piece links to (besides the pillar). The pillar's top-down link is required; ideally 1 to 2 sibling lateral links also exist.
8. **Stale references.** Cluster pieces that reference statistics, products, or pages that no longer exist. Update the references; refresh the piece if the underlying topic shifted.
9. **New cluster integration.** When a new cluster piece ships, audit confirms it received its top-down link from the pillar AND its bottom-up plus lateral links. New clusters often miss the inbound updates that would prevent orphan status.
10. **Anchor diversity.** Pull the inventory; group anchor texts by target page. If 8 of 10 links to a page use the same anchor, edit 3 to 5 to vary.

The audit takes 1 to 3 hours per hub. The cost is real but smaller than the cost of letting the link graph decay.

---

## When the link graph is too dense

Some teams over-link. Every cluster piece has 8 outbound contextual links plus 5 lateral plus 3 external. The reader is bombarded; the anchor text relevance dilutes.

**Heuristic.** A cluster piece with more than 6 outbound internal links per 1,000 words is over-linked. Trim to the 4 to 6 highest-relevance links.

The trim improves both reader experience and PageRank concentration. Each remaining link gets more weight; the link graph becomes more legible to crawlers.

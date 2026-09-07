# Content refresh patterns

Annual pillar refresh checklist. Triggered cluster refresh signals. Cluster expansion patterns. Cluster pruning criteria. Hub lifecycle (5 to 7 year horizon).

---

## Why refresh matters

Hubs decay. Statistics go stale; SERPs shift; new facets emerge; existing pieces drift from current best practice. A hub that ranks at year 1 often falls to position 12 by year 3 if nobody refreshes it.

The discipline is built into the architecture: refresh is not an afterthought; it is a budgeted activity.

---

## Annual pillar refresh checklist

Run every 12 months on each pillar. Allocate 1 to 2 weeks of editorial time per pillar.

### Step 1: re-validate the SERP

Pull the current SERP top 10 for the pillar's primary keyword. Compare to the last refresh's top 10.

- Are new competitors in the top 10? What are they covering that you are not?
- Have existing competitors updated their pillars? What new sections did they add?
- Has the SERP intent shifted (e.g., from informational to commercial-investigation)?

### Step 2: update statistics

Find every numeric claim in the pillar. Verify each is still accurate; replace stale numbers with current ones; cite the new source.

**Common stale numbers.** Industry statistics that were "as of 2023" and now are 2 years old. Pricing references that have shifted. Tool capabilities that have evolved.

### Step 3: add new sections for emerged facets

Did the topic surface new facets in the last 12 months? Add H2 sections covering them. Each new section should be 300 to 500 words; if it grows beyond 700, promote it to a new cluster piece and reduce the pillar section to a callout.

### Step 4: prune sections that no longer matter

Did old sections become irrelevant? Maybe a tool you covered shut down; maybe a method you described was deprecated. Cut or significantly trim those sections. Pillar bloat from un-pruned content is the most common pillar-decay symptom.

### Step 5: refresh internal-link callouts to clusters

The cluster has likely grown since last refresh. Add callouts to any new cluster pieces that did not exist before. Verify all existing callouts still link to live cluster URLs.

### Step 6: update the TL;DR

The TL;DR captures the pillar's argument as of the refresh date. Revise to reflect any structural changes: new facets, removed sections, shifted POV.

### Step 7: bump the last-updated date

Set the publish-modified date to the refresh completion date. The freshness signal matters; do not skip it.

### Step 8: re-submit to search engines

Submit the updated pillar URL to Google Search Console for re-crawl. Some teams also ping AI engine indexing endpoints (Perplexity, Bing for Copilot) where available.

---

## Triggered cluster refresh signals

Clusters do not need annual refresh; they need triggered refresh when specific signals appear.

### Trigger 1: keyword performance drops

The cluster's primary keyword falls 5+ positions in 30 days. The drop is the signal; pull the SERP, identify what is now ranking ahead, and update the cluster to compete.

### Trigger 2: new sub-topic emerges

Within the cluster's facet, a new sub-topic appeared (new tool launched, new technique published, new regulation issued). Update the cluster to reference the new sub-topic.

### Trigger 3: cluster's links go stale

The quarterly link audit (see `internal-linking-architecture.md`) finds broken outbound links from the cluster. Update the cluster with new links.

### Trigger 4: AI citation drops

The cluster was being cited by AI engines and the citation count drops. Check whether content drifted, whether new entities should be added, whether the answer paragraphs need tightening. AI citation drops are slower-moving than ranking drops; act on month-over-month trends, not week-over-week.

### Trigger 5: customer feedback surfaces a gap

A sales rep, support agent, or customer success manager flags that the cluster does not cover a question customers actually ask. Add the section.

---

## Cluster expansion patterns

A hub at year 1 might have 8 clusters. Year 3 could have 18. Expansion happens deliberately, not opportunistically.

### When to expand

- A new facet emerges and customer questions confirm demand.
- Competitor analysis shows a facet your hub does not cover.
- Keyword research surfaces new long-tail variations with traffic.
- AI citation patterns show queries your hub does not address.

### When not to expand

- Tempting facet but no customer demand. Adds maintenance burden without driving traffic.
- Facet already covered by another piece on the site outside the hub. Either move that piece into the hub or update its links.
- Facet is too narrow (sub-100 monthly searches with no commercial signal). Add as a section to an existing cluster, not as its own cluster.

### Expansion cap

Max 20 clusters per pillar. Above that, the hub becomes unmanageable. If the topic genuinely supports 25+ facets, split into two pillars under a parent topic (rare; valid for very broad topics).

---

## Cluster pruning criteria

Some clusters should die. Pruning is hygiene, not failure.

### Prune when

- Cluster has not ranked in top 30 after 12 months despite refresh attempts.
- Cluster's keyword has gone to zero search volume.
- Cluster duplicates another cluster (consolidate).
- Cluster covers a tool, technique, or topic that no longer exists.

### How to prune

- 301 redirect the URL to the most-relevant remaining cluster, or to the pillar.
- Remove links from the pillar and other clusters to the pruned URL.
- Update the linking inventory.

### What not to do

- Do not delete the URL without redirecting; 404s waste any acquired authority.
- Do not redirect to the homepage; redirect to the most topically-relevant alternative.

---

## Hub lifecycle (5 to 7 year horizon)

Hubs themselves have lifespans. After 5 to 7 years, the topic landscape often shifts enough that wholesale restructuring becomes appropriate.

### Signs the hub needs restructuring (vs annual refresh)

- The pillar's primary keyword has shifted intent (the SERP is now showing a different content type).
- Competitors have rebuilt their hubs around a different angle that better matches current reader needs.
- The cluster has grown unwieldy (25+ pieces) and the topical organization no longer makes sense.
- AI citation patterns suggest readers are asking questions the original hub structure cannot answer.

### Restructuring approach

- Treat the restructuring as a new hub launch. Plan the new pillar and cluster shape first.
- 301 redirect old pillar and cluster URLs to new equivalents where possible.
- Archive content that does not fit the new structure rather than force-fitting.
- Communicate the change in a release-note-style post linked from both old and new URLs during the transition.

The 5-to-7 year cycle is empirical. Some hubs last longer (foundational topics like "what is SEO"); some need restructuring sooner (fast-moving topics like "AI search"). Ownership tracks the lifecycle; the durable hub owner is the one who decides when to restructure.

---

## Maintenance ownership

The pillar owner is named and durable. Common patterns:

- **Single editor.** One person owns the hub for a 12-month commitment. Renewed annually.
- **Editor + SEO partner.** Editor owns content; SEO partner owns rankings and link audits.
- **Cross-functional team.** Editor, SEO, product marketing rotate quarterly reviews. Works for large teams; falls apart in small teams (rotation diffuses ownership).

The "set and forget" failure mode happens when ownership dissolves. The team that launched the hub disbanded, was reorganized, or moved on; nobody picks up maintenance. Six quarters later, the hub has decayed and recovery costs more than the original launch.

The fix. Assign a durable owner before the hub launches. Renew the assignment annually. Track the owner's continued ownership in the hub's planning doc; surface in quarterly reviews.

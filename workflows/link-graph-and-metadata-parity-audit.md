# Link Graph and Metadata Parity Audit

```
name:            Link Graph and Metadata Parity Audit
slug:            link-graph-and-metadata-parity-audit
tier:            forward-deployed (operations)
role:            fdm
status:          template
score:           45 (demand 5, pain 3, differentiation 3, usability 5, connectors 5)
intent:          audit a site's link graph and per-route share metadata: find orphans and
                 dead ends, and hold every route to unique, self-referencing metadata
when to use:     a site large enough that routes get orphaned or inherit the homepage's
                 metadata by default; a periodic structural pass
when not to use: per-deploy verification of the routes a change touched (Post-Deploy Live
                 Verification); whether a claim is true (Corpus Integrity and Correction)
```

## Connectors

```
connectors:
  - capability:  crawl.read
    access:      read
  - capability:  repo.change
    access:      write-held      # only in Phase 4, and only as held changes
```

Read-only until Phase 4; fixes land held, a human merges. Nothing in the audit acts on production.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills` then `/plugin install rampstack-skills@rampstack`
- The production site, crawlable, and the route registry or sitemap to reconcile the crawl against.
- The templates behind the routes, for fixes that belong at the template rather than the page.
- The list of money or conversion surfaces the graph is expected to feed.

## If a prerequisite is unmet

Any phase can find a required input, tool, access, or data source unavailable or unverifiable. When that happens, the sanctioned output is a report-blocked statement: what the phase required, what was actually verified or obtained, and where the run stops or continues degraded.

- A report-blocked statement satisfies the phase's done-when. Partial completion counts as completion when it is stated as partial.
- Fabricating, estimating, or interpolating a required number to satisfy a done-when is never sanctioned.
- A phase handed a report-blocked upstream treats it as its own unmet prerequisite and reports blocked in turn, rather than running on an input that does not exist.

## Phases

### Phase 1: Build the link graph · lane: convergent (Tholo)

Skills: seo-technical, seo-site-health-audit
Capability class: linkgraph.build (substitute equivalents if off-catalog)
Input: the live site (crawl.read) and the route registry or sitemap
Run:

    Invoke seo-technical and seo-site-health-audit against a crawl of the live
    site, reconciled with the route registry or sitemap. Build the directed link
    graph: every route a node, every internal link an edge, with each route's
    templates and its share metadata (title, description, canonical, OG, Twitter)
    attached. Reconcile crawl against registry so that routes which exist but are
    unlinked, and links that point at routes which do not exist, are both visible.
    Produce the graph; judge nothing yet.

Output artifact: the link graph (routes, edges, per-route metadata) reconciled against the route registry
Done when: every registry route is a node and every internal link is an edge, with crawl-versus-registry discrepancies marked, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: crawling the preview. A staging crawl maps a link graph no user traverses, and the orphan on production is the page staging linked fine.

### Phase 2: Orphan and dead-end detection · lane: gate (Basano)

Skills: seo-site-health-audit
Capability class: linkgraph.orphan-detect (substitute equivalents if off-catalog)
Input: the link graph
Run:

    Invoke seo-site-health-audit against the graph and flag two classes, fixing
    nothing. Orphans: routes with zero inbound internal links, reachable only by
    direct URL. Dead ends toward outcomes: routes with zero outbound links to the
    money or conversion surfaces they should feed. Weight each by the route's
    value (traffic or commercial intent) so the ranking holds business harm above
    raw count. Report each with its graph evidence: the node, its inbound and
    outbound degree, and the path that is missing.

Output artifact: the orphan-and-dead-end report (each flagged route, its degrees, the missing path, its weight)
Done when: every route with zero inbound, or zero outbound to an outcome surface, is flagged with evidence, including the clean high-value routes confirmed reachable, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: counting orphans without weighting them. A thousand orphaned tag pages and one orphaned money page are not the same finding, and an unweighted list buries the one that pays.

### Phase 3: Metadata parity per route · lane: gate (Basano)

Skills: seo-onpage, seo-technical
Capability class: metadata.parity (substitute equivalents if off-catalog)
Input: the link graph's per-route metadata
Run:

    Invoke seo-onpage and seo-technical against every route's metadata. Check:
    title and description are unique per route, not the homepage's defaults; OG
    and Twitter tags are per-route, not the site-wide fallback; the canonical is
    self-referencing; and no title template is doubling its suffix (the
    "Page | Site | Site" class). Verdict per route per check, with the rendered
    metadata as evidence. Report only.

Output artifact: the metadata-parity report (verdict per route per check, rendered metadata attached)
Done when: every route carries a verdict for uniqueness, per-route OG and Twitter, self-canonical, and suffix dedup, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: checking presence, not uniqueness. Every page carrying the homepage's OG image passes a presence check and fails a reader who sees the same card for forty different links.

### Phase 4: Triage and held fixes · lane: divergent (Krine) then convergent (Tholo)

Skills: seo-onpage, seo-technical
Capability class: metadata.correct (write-held)
Input: the orphan-and-dead-end report and the metadata-parity report
Run:

    Invoke seo-onpage and seo-technical to rank the findings by value-weighted
    harm and present the plan for a human to approve (the divergent stop). On
    approval, use those skills to fix at the TEMPLATE, not the page: a doubled
    suffix or a fallback-OG defect is one
    template change that clears every route it governs, and a per-page patch
    plants the next drift. Orphans are fixed by adding the missing inbound links
    at their source. Everything lands held: a draft change, never a direct push.

Output artifact: a ranked plan, then held fixes at the template level, each tied to its finding
Done when (public gate): a human has approved the plan, and every approved fix is a held change with nothing published
Operated-layer note: in an operated deployment the ranking and the human's approval or reordering land as an agreement-log row (see AGREEMENT-LOG.md)
Fails look like: fixing template symptoms per page. Retyping the right title on forty routes leaves the template that mis-set them in place, and the forty-first route ships wrong next week.

## Failure modes

- Presence-not-uniqueness checking (Phase 3's failure): every page sharing the homepage OG passes a presence check.
- Crawling the preview (Phase 1's failure): a link graph no user traverses.
- Per-page template fixes (Phase 4's failure): treating a template defect one route at a time.
- Unweighted orphan lists: a money page and a tag page counted the same.
- Registry-crawl blindness: trusting one source, so a route that exists but is unlinked, or a link to a route that does not exist, never surfaces.

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property; a full-graph pass on rampstack.co is schedulable as written in the near term. Status flips to validated when that run record links here.

## Boundaries

- Corpus Integrity and Correction owns whether a claim is true; this workflow owns whether the structure around it (links, canonicals, share metadata) is sound.
- Post-Deploy Live Verification owns the per-deploy check of the routes a change touched; this is the periodic full-graph pass across every route.
- Content Pipeline with Prove Gates checks a single draft's metadata and links at publish (its Phase 3); this audits the whole graph after the fact.

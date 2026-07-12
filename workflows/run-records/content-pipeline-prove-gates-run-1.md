# Content Pipeline with Prove Gates: run record 1, draw length

This is the validation run record for the "Content Pipeline with Prove Gates" workflow, executed as written on this property (an outdoor-sports content site). One piece moves through the pipeline: the draw-length how-to. Phases 1 to 5 run as written; Phase 6 accrues on cadence and is out of scope for this record. Each phase below is one artifact.

## Phase 1: Rank the backlog from demand (already complete, cited here)

- Go item: "how to measure draw length", the first how-to piece.
- Ranking evidence: demand overturned a rangefinder-first assumption. Draw length at roughly 1,200 monthly US searches outranked the how-to candidates it competed with (arrow spine about 1,000; sights about 450; rangefinder how-tos about 10). Write order follows demand; the rangefinder spokes ride as support for the priority money guide rather than leading.
- Difficulty and intent: the property relaunched ranking for nothing, so attainable difficulty (low across this map) was weighted over raw volume; the full ranking method, per-cluster demand numbers, and their capture citations are in docs/research/keyword-content-map.md. The SERP shows calculator intent and no strong article competitor, so the piece supports the existing draw-length calculator tool and the beginner-bow money guide.
- Recorded sequencing decision: draw length first. It is the fit number the beginner path leans on and the piece that feeds the arrows and bows guides, so it earns the front of the queue.
- NeuronWriter brief: briefs/how-to-measure-draw-length-2026-07-08.md (keyword "how to measure draw length", roughly 684-word target, twelve advisory terms, the reader questions, and the competitor set). Coverage against those terms is advisory and never a merge gate.
- The ranking was not re-run for this record; this phase cites the completed selection and stops.

## Phase 2: Produce the held draft (write-held)

- Held draft: PR #33 (draft), branch feat/content-draw-length. Nothing published, scheduled, or merged.
- Piece: content/articles/how-to-measure-draw-length.mdx. HowTo schema variant; four real-step H2s that read into the HowTo JSON-LD as steps; the AMO-standard definition and the arrow-length relation as H3 explainers; every factual claim carries its source or derivation inline; internal links to the draw-length calculator, the beginner compound bow guide, and the hunting arrows guide. Body length 680 words, inside the brief's 650 to 800 target.
- Written against: briefs/how-to-measure-draw-length-2026-07-08.md.

## Phase 3: Pre-publish gate (report only, nothing fixed inside the gate)

Prove report, verdict per check. The validator is the content-contract check that runs at build time plus the type and lint passes; the rendered audit is the built page inspected on a local production build.

| Check | Verdict | Evidence |
|---|---|---|
| Content contract (frontmatter, schema, no picks) | PASS | build compiled; required article fields present (title, standfirst, excerpt, author, date); schema is "howto"; no picks apparatus on an article |
| Types and lint | PASS | tsc noEmit clean; eslint reports no errors |
| Every factual claim has a source or derivation inline | PASS | the wingspan-over-2.5 formula is named as the archery wingspan method; the nock-to-grip-pivot plus 1.75 inch definition is attributed to the AMO and ATA standard; the typical 26 to 31 inch range and the 28 to 29 inch adult-male average are stated as derivations from that method and from where stock bows center their adjustment; the half-inch confirmation tolerance matches the calculator's own stated basis. No unsourced statistic appears. |
| Style and phrase rules (STANDARDS: CLAUDE.md and docs/brand/voice.md) | PASS | zero em or en dashes; zero banned phrases; no "not just" construction (grep of the file) |
| Title, meta description, structured data present and consistent | PASS | rendered title is the piece title suffixed with the site name; the meta description is the standfirst; the HowTo JSON-LD is present with four HowToSteps matching the four H2 steps in order, alongside a BreadcrumbList filed under the Articles hub; the canonical is self-referencing |
| Every internal link resolves against the route list | PASS | /tools/draw-length-calculator, /guides/best-compound-bow-for-beginners, /guides/best-hunting-arrows, and /how-we-test each return 200 on the built site, as does the article's own route |

Gate verdict: all checks pass, no waiver required. Nothing was fixed inside the gate; the draft was authored to the standard in Phase 2.

## Phase 4: Human review and merge

- Reviewer: Andy Dunn, the mergedBy on PR #33
- Verdict: merge (human-verdict vocabulary: merge / reject / revise / waive)
- What changed (proposal to merge): Merged untouched. No revisions between the proposed held draft and the merge; no proposal-to-merge diff. The article content committed once (6389a70); the only later commits on the branch were run-record docs (692cb7e, 110c73e), not content edits.
- Merged at: 2026-07-10T01:41:15Z (UTC), squash-merge, merge commit f4395716 onto main

## Phase 5: Post-publish live audit (post-merge, on the human's go)

Run the live audit against the production URL https://bowhuntamerica.com/articles/how-to-measure-draw-length after merge and deploy. Verify per check against the live render, not a preview, staging domain, or cached copy: the rendered content matches what was approved at merge; the canonical is self-referencing; title, meta description, social-share metadata, and the HowTo structured data are present on the live render and match the approved values; every internal link on the live page resolves; and the render is current, confirmed against a value known to have changed at publish. Record the verdict per check and the deployment id.

- Deployment id: current prerender of the article route; render ETag 52f1e233b9f8c2d1b3c977959aa29d8e, OpenGraph image asset fingerprint e531b1656856773d (content-derived, host-agnostic).
- Live-audit verdict per check:

| Check | Verdict | Evidence |
|---|---|---|
| Rendered content matches what was approved at merge | PASS | the wingspan method, the AMO and ATA definition, the half-inch confirmation tolerance, the typical 26 to 31 inch range and the 28 to 29 inch adult-male average, and the nock-to-grip references all render on the live page, matching the Phase 2 draft |
| Canonical is self-referencing | PASS | the rendered canonical points to the article's own URL, https://bowhuntamerica.com/articles/how-to-measure-draw-length |
| Title, meta description, social-share metadata, and structured data present and consistent | PASS | rendered title is the piece title suffixed with the site name; the meta description is the standfirst; OpenGraph title, description, and image and the Twitter summary_large_image card, title, and description are present; the HowTo JSON-LD carries four HowToSteps matching the four H2 steps, alongside a BreadcrumbList; the values match the approved article |
| Every internal link on the live page resolves | PASS | all fourteen internal links on the live render return 200, including /tools/draw-length-calculator, /guides/best-compound-bow-for-beginners, /guides/best-hunting-arrows, /how-we-test, and the article's own route |
| Render is current (a value known to have changed at publish) | PASS | the article route serves the full new content that did not exist pre-publish; the page carries the current build's index, follow directive rather than the pre-launch noindex; the render is a current prerender (the ETag and OpenGraph asset fingerprint above) |

Auto-appearance checks:

| Check | Verdict | Evidence |
|---|---|---|
| The articles hub lists the piece | PASS | /articles renders the draw-length article's link and title |
| The homepage latest row carries it | PASS | the homepage links /articles/how-to-measure-draw-length in its latest row |
| The start-here draw-length link resolves | PASS | the homepage start-here strip's draw-length entry links /tools/draw-length-calculator, which returns 200 |

A finding surfaced during this phase, recorded plainly. The audit's external fetch vantage returned a stale pre-launch render of the homepage, an indexing-directive mismatch included, while the article routes served the current build. The failure-class discrimination ran on that signal: production was confirmed healthy from direct vantages, the browser source and a cookie-less fetch from a clean path, both of which return the current build with index, follow, the Articles and Tools nav, and the draw-length piece in the latest row. The stale copies were attributed to an intermediary fetch cache on an external fetch path rather than to a production regression, so the audit exercised the vantage-and-staleness branch of its decision table on a real signal and closed with the production-healthy conclusion and its evidence.

## Phase 6: Outcomes and the refresh trigger (not part of this record)

Outcomes accrue on a cadence and decay flags re-enter the Phase 1 ranking. Out of scope for this run record.

---

Run status: Phases 1 to 5 are complete. The pre-publish gate passed with no waiver, the draft merged unchanged with no proposal-to-merge diff, and the post-publish live audit passes against the production URL with every check green and the three auto-appearance checks confirmed. This is the completed validation record for the Content Pipeline with Prove Gates workflow: the run record that links from the workflow file to flip its status from template to validated. Phase 6 accrues on cadence and is out of scope for this record.

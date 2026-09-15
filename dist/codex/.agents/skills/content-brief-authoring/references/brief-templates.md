# Brief templates by content type

Six templates. The 12 fields are constant; the weight of each field shifts based on the content type. Each template names the fields that lean heavier and the fields that lean lighter for that type.

---

## Pillar piece

Comprehensive coverage of a topic, 3,000+ words, anchors a topic cluster. The piece other content links up to.

**Heavier fields:** heading structure (the outline is the spine), entity coverage (a pillar that misses entities loses credibility), internal linking (links to and from the supporting cluster pieces), word count (calibrated to top SERPs, often long).

**Lighter fields:** anti-patterns (the writer assigned to a pillar usually knows the topic), tone reference (default brand voice; tone shifts are rare for pillars).

**Brief shape:** 2 pages. The H2 outline takes ~40% of the brief because pillar structure is decisive. Entity list is long (15 to 25 entities). Internal-link section names every cluster piece that should link in or out.

**Worked example.** Target keyword: "experimentation analytics dashboards." Cluster: experimentation methodology. Intent: commercial-investigation. SERP format: long-form articles plus comparison tables. Word count target: 2,800 to 3,400. Outline: H2 #1 "what an experimentation dashboard does," H2 #2 "platform-native vs warehouse-native," H2 #3 "the metrics that earn their keep," H2 #4 "build vs buy," H2 #5 "common dashboards that ship trusted results." Entities: lift, p-value, MDE, CUPED, sequential testing, Statsig, PostHog, Optimizely, dbt, Mixpanel, Snowflake. Internal links: 5 supporting pieces queued.

---

## Supporting / cluster piece

Narrower topic, 1,000 to 2,000 words, links up to the pillar. One question, one answer.

**Heavier fields:** target keyword (specific long-tail), search intent (cluster pieces have to match SERP precisely), JTBD (one specific reader problem), internal linking (must link up to pillar with anchor text matching the pillar's target).

**Lighter fields:** entity coverage (smaller scope, fewer entities required), thought-leadership POV (cluster pieces serve the cluster, not the writer's opinion).

**Brief shape:** 1 page. JTBD in one sentence. H2 outline is 3 to 5 sections. Entity list is short (5 to 10). The "links up to pillar" specification is mandatory; an orphan cluster piece is a wasted slot.

**Worked example.** Target keyword: "CUPED variance reduction." Pillar: experimentation analytics dashboards. Intent: informational. JTBD: data analyst wants to apply CUPED in a dbt model and needs the formula plus the gotchas. Outline: H2 "what CUPED does," H2 "the formula," H2 "implementing in dbt," H2 "common pitfalls." Internal link up to pillar with anchor "experimentation analytics dashboards."

---

## Comparison piece (X vs Y)

Commercial intent, structured comparison, decision framework. The reader wants help choosing.

**Heavier fields:** anti-patterns (snark and trash-talk are the failure mode), heading structure (table-style comparison plus "when X wins" / "when Y wins" sections), success criteria (commercial intent piece; the metric is signups or sales-qualified leads, not traffic alone).

**Lighter fields:** word count flex (top-ranking comparison pieces vary widely; SERP-calibrate).

**Brief shape:** 1 to 2 pages. The comparison criteria are listed in the brief, not invented by the writer. If the brand is one of X or Y, the brief specifies honest positioning: what the brand wins on, what the competitor wins on. The brief explicitly forbids "X is the worst, Y is the best" framing.

**Worked example.** Target keyword: "Statsig vs PostHog." Intent: commercial. SERP format: comparison tables plus prose. Comparison criteria: pricing model, MAU thresholds, MCP support, custom-metric depth, frontend visual editor, mobile SDK. "When Statsig wins": teams with strong custom-metric needs, teams that already pay for Snowflake. "When PostHog wins": product analytics-led teams, teams that want session replay alongside experimentation. Anti-pattern explicitly listed: do not write "PostHog is the clear winner" or "Statsig is overpriced." Honest comparison or do not write the piece.

---

## Listicle

Informational or commercial intent, scannable, ranked or unranked list. "10 best X" or "7 ways to Y."

**Heavier fields:** selection criteria (why are these 10 the chosen ones; the writer needs to defend the list), ordering rationale (why is item #1 first; explicit ranking criteria), depth-per-item (how many words per item; even depth is the discipline).

**Lighter fields:** narrative arc (listicles have minimal narrative; the list itself is the structure).

**Brief shape:** 1 page. The selection criteria are listed in the brief. The order is suggested in the brief, with note that the writer can reorder if the research warrants. Depth-per-item is specified (e.g., 150 words each for 10 items, plus 200-word intro and 150-word conclusion = ~1,850 words).

**Worked example.** Target keyword: "best feature flag tools 2026." Intent: commercial. Selection criteria: official MCP support, free tier exists, hosting model. The 10 items pre-listed in the brief: LaunchDarkly, Statsig, PostHog, GrowthBook, Optimizely, VWO FME, Split.io, Kameleoon, Flagsmith, Unleash. Depth: 150 words per tool covering pricing, MCP status, when this tool wins.

---

## How-to guide

Informational intent, step-by-step, screenshots, prerequisites, troubleshooting. The reader wants to do something specific.

**Heavier fields:** step granularity (each step is one action, not three), prerequisites (what the reader needs before starting), troubleshooting section (common failure modes the reader will hit).

**Lighter fields:** thought-leadership POV (how-to guides serve the task, not the writer's perspective on it).

**Brief shape:** 1 to 2 pages. The brief lists the steps in outline form so the writer can spot missing prerequisites or merged steps before drafting. The screenshot list is queued (which screens, in what state). Troubleshooting bullets are listed; the writer expands each into a paragraph.

**Worked example.** Target keyword: "how to set up a Statsig experiment." Prerequisites: Statsig account, SDK installed, exposure events instrumented. Steps: H2 "create the experiment in the console," H2 "define the assignment unit," H2 "configure the metrics," H2 "set the duration and MDE," H2 "launch and monitor." Troubleshooting: SRM check failure, exposure events not firing, metric definition mismatch.

---

## Thought leadership / opinion

Commercial or branding intent, distinctive POV, signal of expertise. The piece exists to differentiate the brand voice in the category.

**Heavier fields:** thesis (one sentence; the whole piece defends it), anticipated counter-arguments (what would a smart skeptic say; the piece must address them), tone reference (often a sharper voice than default; the brief specifies the shift).

**Lighter fields:** SERP entity coverage (thought leadership often deliberately diverges from SERP consensus; entity coverage is a softer requirement).

**Brief shape:** 1 page. The thesis is one sentence at the top. The supporting arguments are listed (3 to 5). The anticipated counter-arguments are listed with notes on how the piece responds to each. The brief explicitly names the writer or contributor; thought leadership has authorship, not anonymous editorial.

**Worked example.** Thesis: "warehouse-native experimentation is the right default for any team running 50+ experiments per quarter." Supporting arguments: cost crossover at scale, custom metric flexibility, audit trail, data-team integration. Counter-arguments to address: setup cost, time-to-first-experiment, missing UI tooling. Tone shift: sharper, more declarative than default brand voice. Author: named senior data leader.

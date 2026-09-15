# Synthesis sequence walkthrough

The six-stage synthesis sequence with worked example. Stage outputs, common skip-failures, time investment per stage.

The sequence is non-negotiable. Teams that skip stages produce findings that look like synthesis but are not: untagged transcripts, unclustered tags, unnamed patterns, patterns without implications, implications without decisions. Each stage builds on the previous; skipping any stage breaks the chain.

---

## The six stages

1. **Transcribe and prepare.** Convert artifacts into a synthesizable format.
2. **Tag at the artifact level.** First-pass descriptive tagging.
3. **Cluster across artifacts.** Group tags into themes.
4. **Name patterns.** Each cluster becomes a named pattern.
5. **Infer product implications.** What does each pattern imply.
6. **Name the so-what.** The decision input.

---

## Stage 1: Transcribe and prepare

**The work.** Convert artifacts into a format you can read, mark up, and search.

**Outputs.**

- Interview transcripts, time-stamped, speaker-labeled.
- Support ticket dataset, exported to a workable format with relevant fields (subject, body, resolution, tags, dates).
- Sales call summaries or transcripts.
- Survey data with open-ended responses extracted into a reviewable format.

**Time investment.** Often underestimated. A 60-minute interview takes 60-90 minutes to transcribe (with AI tools) plus 30-60 minutes to clean. Eight interviews: 12-20 hours of prep before tagging starts.

**Common skip-failures.**

- Skipping transcription on the assumption that the recordings are sufficient. Reality: tagging from audio is impractical at any meaningful batch size.
- Cleaning to the point of distortion (removing the messy parts that contain signal).
- Skipping speaker labels (collapsed dialog loses critical context).

**The unglamorous-but-essential principle.** Teams that skip prep work never reach the later stages because the artifacts are not workable. The investment in prep pays back across every later stage.

---

## Stage 2: Tag at the artifact level

**The work.** Read each transcript or ticket and tag it with topics, problems, quotes, and observations.

**Outputs.**

- Tagged artifacts (transcripts, tickets, etc.) with descriptive tags inline.
- A tag list (often 80-150 tags per batch by the end of this stage).
- Quote pulls (specific sentences worth referencing later).

**Approach.**

- First-pass tagging is descriptive: what did this person say, what problem did they hit, what were they trying to do.
- Allow tag proliferation. Do not force consolidation in this stage; that is for clustering.
- Tag dissent and contradictions explicitly. "User reports liking the onboarding" alongside other users reporting friction is signal; tag it.
- Mark quotes worth pulling. Synthesis output includes evidence; the evidence comes from quotes selected during tagging.

**Time investment.** Per artifact: 30-90 minutes for an interview transcript, 1-3 minutes per support ticket, 15-30 minutes per sales call. A typical batch (12 interviews + 200 tickets + 20 sales calls) might run 25-40 hours of focused tagging work.

**Common skip-failures.**

- Pre-designing the tag taxonomy and forcing artifacts into it.
- Tagging from memory after reading the transcript rather than during reading.
- Premature consolidation (collapsing tags during this stage instead of later).
- Skipping the contradictions (only tagging the dominant pattern).

**The artifact-level discipline.** Each tag is grounded in a specific moment in a specific artifact. Tags floating free of evidence are a stage-2 failure that compounds in later stages.

---

## Stage 3: Cluster across artifacts

**The work.** Group tags into themes that surface the patterns the data reveals.

**Outputs.**

- A cluster list (often 6-15 clusters from the 80-150 tags).
- Per-cluster tag membership.
- Per-cluster artifact source list (which artifacts contributed to this cluster).

**Approach.**

- Cluster on the underlying observation, not on tag overlap. Two tags that co-occur may not be the same pattern.
- Iterate: first-pass clustering will reveal that some tags belong in multiple clusters; some clusters are too broad; some need to split.
- Use the artifact-source list to test cluster strength. A cluster with 8 supporting artifacts is stronger than one with 2.
- Track the dissent: which clusters have countervailing evidence the synthesis must address.

**Time investment.** 4-8 hours of clustering work for a batch this size. Often done collaboratively with another reviewer to surface alternative groupings.

**Common skip-failures.**

- Clustering on assumed categories rather than emergent themes.
- Stopping at first-pass clustering without iterating.
- Ignoring artifact-source counts (clusters with thin support get weighted equally with strong ones).
- Forcing every tag into a cluster (some tags are noise; that is fine).

---

## Stage 4: Name patterns

**The work.** Each cluster becomes a named pattern that captures what the underlying observation actually is.

**Outputs.**

- A pattern list (typically 4-8 patterns from a strong synthesis).
- Per-pattern name, evidence summary, and source-artifact list.

**Approach.**

- Pattern name is specific enough that a reader can guess the implication.
- Pattern names commit a position: name what the data shows, not a category the data sits in.
- Avoid truisms: pattern names that read as something everyone could have said before the research are not patterns.
- Limit pattern count: 4-8 strong patterns serve synthesis better than 15 weak ones.

**Time investment.** 2-4 hours of pattern-naming work. Often the highest-impact stage; investment in good pattern names pays off in implications and decisions.

**Common skip-failures.**

- Pattern names that are category labels (Onboarding, Pricing, Support).
- Pattern names that are truisms (Users want fast performance).
- Hedge-stacked pattern names (Users sometimes seem to occasionally maybe).
- Too many patterns (under-clustering manifests as pattern bloat).

See `pattern-naming-patterns.md` for detail.

---

## Stage 5: Infer product implications

**The work.** For each pattern, name what this implies for the product.

**Outputs.**

- Per-pattern implication list (often 1-3 implications per pattern).
- Per-implication: specific, falsifiable, cost-acknowledged.

**Approach.**

- Each pattern can have multiple implications. Surface the options; do not pre-prioritize.
- Implications are the writer's analytical work, not what users said. Users describe experience; PMs interpret what experience implies.
- Make implications falsifiable. "We should improve onboarding" is not an implication; "Move the third configuration step to after first success state" is.
- Acknowledge cost. Implications that ignore implementation cost produce wishlists.
- Some patterns imply not-acting. Naming the not-act implication is honest synthesis.

**Time investment.** 3-6 hours of implication work.

**Common skip-failures.**

- Vague implications that cannot be acted on or debated.
- Wishlist implications that do not acknowledge cost.
- Skipping the not-act implication when it would be honest.
- Implications that are restatements of the pattern (no analytical bridge).

See `from-pattern-to-product-implication.md` for detail.

---

## Stage 6: Name the so-what

**The work.** For each implication, the specific decision it informs.

**Outputs.**

- Per-implication so-what statement tied to a real decision.
- An overall recommendation section: what should change as a result of this synthesis.

**Approach.**

- Map each implication to a decision the team is making (or should make).
- Be specific: "Should the Q2 roadmap include the onboarding redesign?" rather than "Onboarding should be considered."
- Surface the synthesis's overall recommendation: where to invest, where to deprioritize, where to gather more data before deciding.
- Acknowledge the decisions the synthesis cannot resolve: data gaps, contested patterns, decisions outside the synthesis's scope.

**Time investment.** 2-4 hours of so-what work.

**Common skip-failures.**

- So-whats that are too abstract to drive decisions.
- Skipping the overall recommendation section (each pattern stands alone; the synthesis does not aggregate).
- Buried data gaps (the synthesis presents conclusions where the data did not support them).

---

## Worked example

A discovery cycle with 12 customer interviews + 250 support tickets + a sales call audit, focused on a possible onboarding redesign.

**Stage 1 (prep).** 18 hours. Interview transcripts cleaned; ticket dataset extracted; sales call transcripts pulled.

**Stage 2 (tagging).** 32 hours. 110 tags emerged across the artifacts. Quote pulls captured.

**Stage 3 (clustering).** 6 hours. Clusters emerged: configuration-step friction, value-state delay, onboarding length, mobile-context onboarding, role-based mismatch, support-deflectable confusion. Six clusters with varying artifact support.

**Stage 4 (pattern naming).** 3 hours. Six patterns named, including:

- "Users abandon configuration step 3 because it requires data they do not have on hand at signup time."
- "Free users reach the success state at half the rate of paid users because the configuration burden is the same but the value reveal is gated."
- "New users on mobile cannot complete onboarding without switching to desktop because two configuration screens are not mobile-functional."

**Stage 5 (implications).** 4 hours. Per-pattern implications. Example for the configuration-step pattern:

- Implication: defer configuration step 3 to after first success state, with a "complete your setup" prompt later.
- Cost: medium engineering investment; affects existing flows for users who completed step 3 historically.
- Alternative implication: pre-populate step 3 with sensible defaults from step 2 data where possible.
- Not-act implication: keep the current flow but improve docs (probably insufficient given the friction severity).

**Stage 6 (so-what).** 3 hours. Decision input: yes, prioritize onboarding redesign in Q2; staged-onboarding approach; mobile parity is a sub-track within the redesign; configuration-step deferral is the headline change.

**Total synthesis time.** 66 hours over the six stages. Roughly 1.5-2 weeks of focused synthesis work for one PM.

---

## Time-investment patterns

Synthesis sequences that go shorter than this are usually skipping stages. Sequences that go longer are usually over-investing in tagging or under-deciding in implications. The 60-80 hour range for a substantial discovery synthesis is typical.

Programs that have not budgeted synthesis time often discover it after research ships and the synthesis stalls. The discipline is budgeting synthesis at the start of the discovery cycle, not as an afterthought.

---

## Methodology-level choices that stay in the public skill

The six-stage sequence with stage outputs and time investments. The worked example. The non-negotiability of the sequence. Common skip-failures per stage.

## Implementation choices that stay internal

Specific transcription tools. Specific tagging tools (spreadsheet, dedicated qualitative analysis software, AI-assisted tagging). Specific clustering visualization. Specific document templates per output. Specific time-tracking conventions for synthesis budgeting. These vary by team and tooling.

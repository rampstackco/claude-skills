# Tagging and clustering discipline

The middle stages of the synthesis sequence have specific failure modes. Tagging and clustering done badly produces bad patterns; tagging and clustering done well produces patterns that drive decisions.

The discipline is in five principles that apply across both stages.

---

## Principle 1: Tag at the artifact level first; do not pre-design the taxonomy

**The pattern.** Tags emerge from the artifacts. The researcher reads each transcript and tags what is actually there.

**The anti-pattern.** Researchers arrive at tagging with a pre-built taxonomy: "we will tag for usability, performance, pricing, support." Artifacts get forced into the categories. Patterns the taxonomy did not anticipate get missed.

**Why pre-built taxonomies fail.**

- The taxonomy reflects what the team already thinks; tagging confirms what the team already thinks; synthesis does not reveal anything new.
- Artifacts that do not fit the taxonomy categories get skipped or shoehorned in.
- Tags that emerge in the data but were not in the taxonomy do not get captured.

**The exception.** Some categorical metadata is fine to apply consistently (user segment, source channel, recency). The semantic tagging that drives synthesis should still emerge from the data.

**The recovery.** Mid-tagging, if the team realizes the pre-built taxonomy is constraining, it can be discarded and tagging restarted with descriptive tags emerging from artifacts. Better to restart than to publish synthesis grounded in a constraining taxonomy.

---

## Principle 2: Allow tag proliferation; collapse later

**The pattern.** First-pass tagging produces 80-150 tags across a batch. That is correct. Premature consolidation loses distinctions that turn out to matter.

**The anti-pattern.** Researchers consolidating tags during the tagging stage. "We had four onboarding tags; let me merge them into one." The merge happens before the researcher has seen whether the four tags actually represent different patterns.

**Why proliferation matters.**

- Some distinctions only become visible after seeing many artifacts. Two tags that seem similar at artifact 3 may turn out to be different patterns by artifact 12.
- Granular tags can always be collapsed in the clustering stage; collapsed tags cannot be unmerged once the tagging is done.
- Proliferation supports the discovery posture; consolidation supports the confirmation posture.

**The volume calibration.** A batch of 12 interviews + 250 tickets + 20 sales calls might end with 80-150 tags. Fewer than that often signals premature consolidation; more than that may signal undisciplined tagging.

---

## Principle 3: Cluster on patterns, not on tag overlap

**The pattern.** Two tags that co-occur in many artifacts may or may not be the same pattern. Cluster on the underlying observation, not on statistical co-occurrence.

**The anti-pattern.** Tools that auto-cluster by co-occurrence. They produce statistical groupings that do not always match the patterns the researcher needs.

**Why pattern-clustering matters.**

- "Slow onboarding" and "configuration friction" might co-occur because both are common; that does not mean they are the same pattern. They might be the same (configuration is what makes onboarding feel slow) or different (there is friction in configuration AND there is a perception of length independent of configuration).
- The researcher's interpretation of the artifact-level tags is what surfaces the pattern; tools can suggest groupings but cannot determine them.

**The work.** For each candidate cluster, ask: are the underlying observations the same, or do they share a tag because the tag was loose? If the latter, split the cluster.

---

## Principle 4: Name the cluster after clustering, not before

**The pattern.** The cluster name comes from the data after the clustering work is done.

**The anti-pattern.** Researchers arriving with named clusters and slotting data into them. The clusters become hypothesis-confirmation rather than discovery.

**Why post-cluster naming matters.**

- Pre-named clusters bias the clustering: tags get assigned to clusters they fit linguistically rather than substantively.
- Post-cluster naming reveals patterns the team did not anticipate (the highest-value patterns).
- The naming itself is part of the synthesis work; rushing the naming compresses the analytical work into a label without thought.

**The discipline.** First-pass clustering produces unnamed clusters. The researcher then names each cluster based on what the underlying observations actually show. Names emerge after the clustering, not before.

---

## Principle 5: Tag dissent and contradictions explicitly

**The pattern.** Some users will contradict the dominant pattern. Those contradictions are signal: either there is a sub-segment with different needs, or the pattern is weaker than the volume suggests.

**The anti-pattern.** Tagging only the dominant pattern; ignoring the contradictions; or tagging contradictions but not following them through to clustering and synthesis.

**Why dissent matters.**

- Contradictions reveal sub-segments. "Most users find configuration confusing; experienced users find it efficient" might mean the pattern is segment-specific, not universal.
- Contradictions reveal pattern strength. A pattern with no countervailing evidence is suspicious; a pattern with some dissent that the synthesis can explain is stronger.
- Synthesis that ignores dissent reads as researcher confirmation bias.

**The discipline.** Each major pattern in synthesis has a "but consider" section: contradictions in the data, segment differences, edge cases. The synthesis is more honest with these sections; readers trust patterns that engage their counterevidence.

---

## Tagging tactics that work

A short list of tactics that improve tagging quality.

**Read the artifact end-to-end before tagging.** Tagging while reading on first pass produces fragmentary tags. Reading first, then tagging on a second pass, produces tags grounded in the artifact's full context.

**Tag specific moments, not summaries.** "User struggles" is a summary. "User abandons configuration step 3 because credit card details are not accessible during signup" is a specific moment. Specific moments support stronger pattern naming later.

**Pull quotes during tagging.** Synthesis output includes evidence; the evidence comes from quotes selected during tagging. Marking quote-worthy moments during tagging prevents re-reading later.

**Tag motivation alongside behavior.** "User clicked X" is behavior; "User clicked X because they thought it would Y" is motivation. Motivation tags surface what users were trying to accomplish, which informs implications more than behavior alone.

**Tag emotional valence sparingly.** "User was frustrated" is fine; tagging every artifact for emotional state produces noise.

---

## Clustering tactics that work

**Iterate clustering at least twice.** First-pass clustering is rough; second-pass clustering refines; third-pass clustering catches what the first two missed.

**Use artifact-source counts.** A cluster supported by 8 artifacts is stronger than one supported by 2. The source count does not determine pattern importance, but it informs synthesis weighting.

**Test cluster boundaries.** Take a tag from one cluster and ask: could this fit in another cluster instead? If yes, the cluster boundaries are unclear; refine.

**Surface the leftovers.** Tags that do not fit any cluster are signal. They might be noise (one-off observations not generalizing). They might be edge-case patterns worth naming separately. They might point to a cluster the researcher missed.

**Cluster collaboratively where possible.** A second reviewer surfaces alternative groupings the first reviewer did not see. Two reviewers usually produces better clustering than one.

---

## Common tagging-and-clustering failures

**Tagging by memory, not by reading.** Researchers reading transcripts and then tagging from recall. Loses specifics; produces general tags that cluster poorly.

**Tag exhaustion.** Researchers running through too many artifacts in one session, tag quality decaying as fatigue sets in. Reduce session length; pace the tagging across days.

**Confirming the team's prior hypothesis.** Researchers entering tagging with a hypothesis the research is meant to confirm. Tags get assigned to support the hypothesis; counterevidence gets minimized.

**Cluster collapsing to fit a target count.** Researchers feeling they should have N clusters and forcing the data to that count. Either over-collapsing (losing distinctions) or under-collapsing (preserving noise as signal).

**Skipping the dissent.** Tagging only the dominant pattern; clustering only the supporting tags. Synthesis publishes patterns without their counterevidence; reviewers later catch the gap.

---

## Methodology-level choices that stay in the public skill

The five principles (tag at artifact level, allow proliferation, cluster on patterns, name after clustering, tag dissent). The tagging tactics. The clustering tactics. The common failures.

## Implementation choices that stay internal

Specific tagging tools (spreadsheet, dedicated qualitative analysis software, AI-assisted tagging). Specific clustering visualization. Specific session-length conventions for tagging. Specific reviewer pairings. The team's own conventions for tag-count thresholds. These vary by team and tooling.

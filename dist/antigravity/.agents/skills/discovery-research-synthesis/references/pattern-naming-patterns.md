# Pattern naming patterns

Pattern naming is the work that distinguishes synthesis from documentation. A pattern named badly disappears into the synthesis; a pattern named well becomes the framing the team references for months.

The naming is not formatting. It is analytical work that surfaces what the data actually shows. Most synthesis underperforms because the pattern names did not do this work.

---

## A pattern name is not a category label

**The principle.** Categories describe topics; patterns describe specific observations the data reveals.

**Examples.**

- Category: "Onboarding."
- Pattern: "Users abandon configuration step 3 because it requires data they do not have on hand at signup time."

- Category: "Pricing."
- Pattern: "Free users hit the upgrade prompt before they have experienced the paid value, producing churn instead of conversion."

- Category: "Mobile."
- Pattern: "New users on mobile cannot complete onboarding without switching to desktop because two configuration screens are not mobile-functional."

**Why categories fail as pattern names.** Categories are containers. The synthesis with category-named patterns is a list of containers, not a list of observations. Readers cannot tell what the data showed; only what topic it concerned.

**The test.** Does the pattern name commit a position about what the data reveals, or does it merely name a topic the data covered? Position-committing names are patterns; topic-naming labels are categories.

---

## The name should make the implication legible

**The principle.** A reader who sees only the pattern name should be able to guess the product implication.

**Examples that pass the test.**

- "Users abandon configuration step 3 because credit card details are not accessible during signup."
  - Implication a reader can guess: defer configuration step 3 to after first success state, or remove credit card requirement at signup.
- "Sales prospects assume the product is for B2C because the homepage hero shows consumer use cases."
  - Implication a reader can guess: revise homepage positioning to lead with B2B use cases.

**Examples that fail the test.**

- "Onboarding has issues."
- "Users have feedback about pricing."
- "There is mobile-related friction."

**Why implication-legibility matters.** Synthesis exists to drive decisions. Pattern names that obscure implications force readers to do the analytical work themselves; many readers will not, and the synthesis fails to inform decisions.

---

## Avoid category bloat

**The principle.** Strong synthesis has 4-8 named patterns. Synthesis with 30 patterns is usually under-clustered: many of those are variations on a smaller number of underlying patterns.

**Diagnosis of bloat.**

- Look at the pattern list. Are some patterns sub-cases of others? If yes, the under-cluster is producing inflation.
- Are there patterns that always co-occur with other patterns? If yes, they may be the same pattern viewed from different angles.
- Are there patterns supported by 1-2 artifacts only? If yes, they may be noise being elevated to pattern status.

**The cure.** Re-cluster. Take the 30-pattern list back to clustering and look for the 4-8 underlying patterns the data actually supports.

**Why bloat fails.** Synthesis with 30 patterns produces no decision direction: the team cannot prioritize 30 things. Synthesis with 4-8 patterns surfaces what to focus on.

---

## Avoid naming the obvious

**The principle.** A pattern is a specific observation that the product team did not already know. Pattern names that read as truisms ("users want fast performance") are not patterns.

**The truism trap.**

- "Users want better performance."
- "Users find some aspects confusing."
- "Pricing is a consideration in the decision."
- "Mobile usage is increasing."

These are descriptive of the universe; they do not describe what the research revealed.

**The cure.** For each pattern name, ask: would this name have been just as accurate without the research? If yes, the pattern is a truism. The research must have surfaced something more specific; rewrite the name to capture it.

**The "what the team did not know" test.** Strong pattern names commit a position the team would not have made before the research. Weak pattern names commit positions the team already held.

---

## Name with conviction

**The principle.** Hedged pattern names ("users sometimes seem to maybe struggle with...") signal a researcher who did not commit to what the data showed. Patterns named with conviction are more useful even if they overstate slightly.

**Hedging vs precision.**

- Hedged: "Some users may experience occasional difficulty in some configuration steps."
- Precise: "Users abandon configuration step 3 in 40% of signup attempts."

The precise name is also commitment-bearing: it claims a specific behavior at a specific frequency. If the data does not support 40%, the name is wrong; the researcher should restate. The hedged name avoids being wrong by avoiding being specific.

**Why conviction matters.** Synthesis that hedges every pattern reads as a researcher avoiding accountability. Readers cannot debate hedged patterns; they cannot prioritize them; they cannot act on them. Conviction-named patterns invite challenge, which strengthens synthesis.

**The discipline.** Name as if the data fully supports the position. If it does not, name a smaller position the data does support. Do not pad an under-supported position with hedging.

---

## Pattern naming structures that work

Several structures recur across strong synthesis.

**The behavioral observation: "Users [do specific action] because [specific cause]."**

Example: "Users abandon configuration step 3 because credit card details are not accessible during signup."

This structure forces specificity in both behavior and cause.

**The contradiction: "Users [say X] but [do Y]."**

Example: "Users in interviews report wanting more configuration options, but in support tickets request defaults that match their actual usage."

This structure surfaces the gap between stated preference and revealed preference.

**The segment difference: "[Segment A] [does X], while [Segment B] [does Y]."**

Example: "Free users hit the upgrade prompt before experiencing paid value, while paid users encounter it after the value-realization moment."

This structure surfaces sub-segment patterns the research revealed.

**The mismatch: "[Team's framing] does not match [user's framing]."**

Example: "Marketing positions the product as B2C-friendly; sales prospects evaluating for B2B use assume the product is consumer-only based on the homepage."

This structure surfaces positioning gaps.

**The frequency-specific: "[Specific behavior happens at frequency X across segment Y]."**

Example: "30% of new users hit the configuration friction within 5 minutes of signup; the friction correlates with day-7 churn."

This structure pairs qualitative observation with quantitative validation.

---

## The pattern-name editing pass

Strong synthesis runs a final editing pass focused only on pattern names.

**For each pattern name, the editing questions.**

1. Is this a category or a pattern?
2. Can a reader guess the implication from the name alone?
3. Is this a truism or a specific observation?
4. Does the name commit a position with conviction?
5. Does the name match what the data actually shows (no overstatement)?
6. Could this be split into multiple patterns or merged with another?

**The editing investment.** 1-2 hours of focused name-editing on a 4-8 pattern set. The investment pays off in synthesis usability.

---

## Common pattern-naming failures

**Categories disguised as patterns.** "Onboarding patterns" as a section heading; nothing in the section actually names a pattern.

**Patterns that hedge into nothing.** "Users may sometimes experience difficulty"; the name commits no position.

**Truism patterns.** "Users want fast performance"; the name describes the universe, not the data.

**Vague specificity.** "Configuration step 3 is problematic"; specific enough to seem like a pattern, vague enough to not be one.

**Pattern bloat.** 30 named patterns; the synthesis loses focus and produces no priorities.

**Patterns named without evidence ties.** Synthesis where readers cannot trace each pattern to specific artifacts and quotes. Patterns become assertions rather than observations.

---

## Methodology-level choices that stay in the public skill

The category-vs-pattern distinction. The implication-legibility test. The avoid-bloat principle. The avoid-truism principle. The conviction principle. The pattern-name structures that work. The editing pass. Common naming failures.

## Implementation choices that stay internal

Specific document templates that surface pattern names prominently. Specific reviewer rubrics for editing pattern names. Specific A/B testing of pattern name variants for clarity. The team's own conventions for pattern count within the bands. These vary by team.

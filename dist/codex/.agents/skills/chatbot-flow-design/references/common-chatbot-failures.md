# Common chatbot failures

10+ failure patterns with diagnoses and cures. The patterns that surface as "the bot is hallucinating" or "users complain the bot is unhelpful" or "we cannot tell what the bot is doing."

---

## "Bot makes up answers about pricing."

**The diagnosis.** Hallucinating-bot pattern. No grounding to pricing source-of-truth.

**The cure.** Add knowledge-base grounding for pricing. The bot retrieves from the pricing page or pricing knowledge base; answers reflect the source. Detail in `references/knowledge-base-grounding-patterns.md`.

---

## "Users say the bot is rigid and unhelpful."

**The diagnosis.** Scripted-bot pattern. Intents do not cover real questions; bot fails when users phrase things unexpectedly.

**The cure.** Move from rigid trees to LLM-powered intent recognition. Define more flexible intents. Add fallback that handles unexpected phrasings. Detail in `references/intent-architecture-patterns.md`.

---

## "Sales is angry that the bot is qualifying leads wrong."

**The diagnosis.** Intent recognition or routing logic broken. The bot is recognizing leads as one type when they should be another.

**The cure.** Audit the qualification flow. Verify intent recognition with realistic test cases. Tighten routing logic. Add human review for edge cases.

---

## "Support tickets increase after chatbot launch."

**The diagnosis.** Bot is producing wrong answers that send users to support after the fact. Worse than no bot.

**The cure.** Audit grounding and resolution. Identify the intents producing bad answers. Either improve grounding or escalate those intents to humans. Detail in `references/knowledge-base-grounding-patterns.md` and `references/escalation-to-human-patterns.md`.

---

## "Users abandon mid-conversation."

**The diagnosis.** Bot loops or fallback patterns are inadequate. Users get stuck without resolution path.

**The cure.** Review fallback patterns. Limit clarification rounds. Add multi-layered fallback ending in human escalation. Detail in `references/fallback-pattern-design.md`.

---

## "We cannot tell what the bot is actually doing."

**The diagnosis.** Analytics missing. Without instrumentation, quality is invisible.

**The cure.** Instrument per-intent recognition, resolution, fallback, and escalation rates before any further changes. Detail in `references/conversation-analytics-patterns.md`.

---

## "Bot was great at launch; quality has degraded."

**The diagnosis.** Maintenance lapse. Knowledge base or intent set out of date.

**The cure.** Quarterly maintenance review. Update knowledge base; refine intents; verify grounding. Set the maintenance trigger so updates happen alongside product changes.

---

## "Bot escalates to humans for everything."

**The diagnosis.** Escalation logic too permissive, or the bot's intent handling is so weak that everything ends up at humans.

**The cure.** Audit which intents escalate most. If the bot can handle them with better grounding, fix that. If the bot truly cannot handle them, reconsider whether they should be in scope.

---

## "Bot tries to handle everything itself."

**The diagnosis.** Escalation logic too restrictive. Bot stays with conversations it should not.

**The cure.** Add escalation triggers. User-initiated, out-of-scope, repeated fallback, sentiment-driven, high-stakes. Detail in `references/escalation-to-human-patterns.md`.

---

## "Users complain the bot does not know what they asked five minutes ago."

**The diagnosis.** Conversation context not preserved across turns. Bot treats each message as standalone.

**The cure.** Implement conversation state management. Bot remembers earlier turns within the same conversation; later responses build on that context. Detail in `references/branching-and-conditional-logic.md` (conversation state management section).

---

## "Bot gives different answers to the same question."

**The diagnosis.** Either grounding is inconsistent (different retrievals for similar queries), or the LLM generation has variability that produces different answers.

**The cure.** Review grounding pipeline. Verify retrieval consistency. Tune generation parameters for consistency. Audit specific cases.

---

## "We tried the bot in our pricing page; conversion went down."

**The diagnosis.** Bot may be adding friction to a flow that worked. Some pages benefit from chatbots; some do not.

**The cure.** A/B test bot presence vs absence on the affected pages. The data informs whether the bot is the right tool there.

---

## "Bot ignores the user when sentiment is negative."

**The diagnosis.** No sentiment-driven escalation. Bot continues handling conversations where the user is frustrated.

**The cure.** Add sentiment-driven escalation. Recognize frustration signals; escalate to human. Detail in `references/escalation-to-human-patterns.md`.

---

## "Sales team finds qualification bot data unreliable."

**The diagnosis.** Bot's qualification logic does not match sales-team criteria, or recognition is misclassifying leads.

**The cure.** Align bot qualification with sales criteria. Audit recognition with sales feedback. Update intents and routing.

---

## "We added a chatbot; our overall site conversion dropped."

**The diagnosis.** Bot may be displacing higher-converting paths (direct CTAs, contact forms). Bot is the wrong tool for this audience or page.

**The cure.** A/B test bot presence vs absence at the funnel level. If the bot reduces conversion, reconsider its placement or scope.

---

## "Bot answers correctly but conversation never closes."

**The diagnosis.** No clear conversation-end pattern. Bot keeps offering more help; user does not know when to stop.

**The cure.** Add explicit conversation closing. "Anything else I can help with?" "If not, [next step option]." Detail in fallback patterns.

---

## "We migrated platforms; the bot quality dropped."

**The diagnosis.** Platform migration may have broken intent recognition, knowledge base integration, or escalation routing.

**The cure.** Test the migrated bot end-to-end before declaring it ready. Critical paths first. Roll back if quality dropped significantly.

---

## "Mobile conversations end with no resolution."

**The diagnosis.** Mobile UI may be breaking; or the bot's responses may be too long for mobile screens.

**The cure.** Mobile UI testing. Audit response lengths. Mobile-specific UI adjustments.

---

## "We cannot tell which intents need work."

**The diagnosis.** Analytics aggregated rather than per-intent. The intent-level signal is hidden.

**The cure.** Per-intent analytics. Recognition rate, resolution rate, escalation rate, hallucination rate per intent. Detail in `references/conversation-analytics-patterns.md`.

---

## "Bot's voice does not sound like our brand."

**The diagnosis.** Bot is using generic LLM voice; brand voice was not specifically tuned.

**The cure.** Brand voice document including bot examples. Tune bot prompts and response patterns to match. Detail in `references/intent-architecture-patterns.md` (intent and brand voice section).

---

## The pattern across failures

Most chatbot failures fall into one of three patterns.

**Pattern 1: The bot does not have proper architecture.** Hallucinating, scripted, no grounding, no fallback discipline. The fix is structural.

**Pattern 2: The bot does not match the audience or context.** Bot in wrong context, wrong voice, wrong scope for audience. The fix is matching the bot to where it serves.

**Pattern 3: The bot decays.** Knowledge base stale, intent set frozen, no maintenance. The fix is maintenance discipline.

The metric pattern: chatbot failures often look fine on conversation count alone. The signal is in resolution rate per intent, hallucination rate, escalation quality, downstream conversion. Programs that track only conversation counts keep shipping the same patterns.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (architecture, audience-context match, decay). The principle that conversation count alone is insufficient as a success metric.

## Implementation choices that stay internal

Specific failure cases the team has encountered and the lessons learned. Specific multi-metric dashboards the team uses. Specific cures the team applies. The team's audit and retirement processes. These vary by team.

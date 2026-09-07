# Intent architecture patterns

Defining what the bot can and cannot handle. Named intents, hierarchies, boundaries, coverage.

The intent architecture is the bot's scope definition. Bad architecture produces bots that try to handle everything (and hallucinate) or bots that handle so little they fail audience expectations. Good architecture defines explicit scope and routes the rest to fallback.

---

## The named-intent principle

The bot has a defined set of intents it can handle. Each intent has a name, a scope, and a conversation pattern.

**The win.** A user asks "what does the Pro plan include?" The bot recognizes this as the "pricing question" intent. The conversation pattern for that intent retrieves from the pricing knowledge base, generates a response, and offers follow-up.

**The fail (no named intents).** The bot tries to handle every question with the same generic flow. Some questions get good answers; some get hallucinated answers; the bot cannot reason about its own scope.

The discipline. Define the intents explicitly. The bot's behavior at each intent is intentional; behavior outside the intents is fallback.

---

## Common intent patterns

Patterns that recur across marketing-site and support chatbots.

**Pricing question.** "How much does the Pro plan cost?" "What is included in the Enterprise tier?" "Do you offer discounts for nonprofits?"

Conversation pattern: retrieve from pricing knowledge base, present the relevant tier or comparison, offer follow-up (talk to sales, see comparison, view full pricing page).

**Feature comparison.** "What is the difference between A and B?" "Does feature X include Y?"

Conversation pattern: retrieve from feature documentation, present comparison or specific feature details, offer follow-up.

**Integration question.** "Do you integrate with Salesforce?" "How does the API work?"

Conversation pattern: retrieve from integration catalog or API docs, present specific integration or API details, offer follow-up.

**Support escalation.** "I need help with my account." "Something is broken."

Conversation pattern: capture the issue context, escalate to human support with the captured context.

**Demo request.** "Can I see a demo?" "I want to talk to sales."

Conversation pattern: qualify the request (capture company size, use case, timeline), route to sales with the qualified context.

**Account access.** "I forgot my password." "How do I access my account?"

Conversation pattern: route to account-recovery flow or self-serve help.

**General question.** "Tell me more about [topic]." "What can you help with?"

Conversation pattern: present overview of bot capabilities; ask what specifically the user wants.

---

## Intent hierarchy

Top-level categories with sub-intents.

**The pattern.** "Pricing question" includes sub-intents for "tier comparison," "discount inquiry," "billing question," "annual vs monthly."

**Strengths.**

- Hierarchy mirrors how audiences think.
- Each sub-intent can have specific knowledge-base grounding and conversation pattern.
- Easier to maintain than flat intent set.

**Weaknesses.**

- More complex to build.
- Risk of over-decomposition (sub-intents that nobody triggers).

**When to use.** When the bot's scope is broad enough that a flat intent set becomes unwieldy. Most production chatbots benefit from hierarchy.

---

## Intent boundaries

Each intent has clear scope. Out-of-scope topics route to fallback.

**The principle.** The intent definition specifies what the intent covers and what it does not.

**Example: "Pricing question" intent.**

In scope: tier prices, plan inclusions, discount inquiries, billing-cycle questions.

Out of scope: sales-specific negotiations (escalate to sales), custom pricing requests (escalate to sales), historical pricing (out-of-scope, fallback).

**The boundary discipline.** Without clear boundaries, the bot tries to handle topics it should not. Boundaries are part of the intent definition.

---

## Intent coverage

The bot's intents should cover 70-90 percent of expected conversations.

**The principle.** Trying to cover 100 percent often produces bloated intent sets the bot cannot handle reliably. Aiming for 70-90 percent leaves room for honest fallback on the remaining edge cases.

**Coverage measurement.**

- After launch, sample conversations and classify them by intent.
- The percentage classified into named intents is coverage.
- The percentage falling to fallback is the gap.

**Coverage targets by use case.**

- Marketing-site Q&A: 80-90 percent coverage achievable.
- Support: 60-80 percent coverage typical; support questions are more varied.
- Sales qualification: 70-85 percent coverage; depending on audience.

**The over-coverage trap.** Pursuing 100 percent coverage often means adding intents that fire rarely. The maintenance overhead is significant; the value is low. Honest fallback for rare cases is often better than rarely-triggered intents.

---

## Intent design discipline

Designing each intent.

**Step 1: Name the intent.** Specific name that reflects the conversation pattern.

**Step 2: Scope the intent.** What topics in, what topics out.

**Step 3: Identify the knowledge base.** What knowledge sources the intent grounds in.

**Step 4: Design the conversation pattern.** Opening response, possible follow-ups, success state, escalation conditions.

**Step 5: Define the success criterion.** What does success look like for this intent? User got the answer? User clicked through to a relevant page? User completed a follow-up action?

**Step 6: Define escalation triggers.** When does this intent escalate to a human?

The discipline. Each intent is designed deliberately. Generic conversation patterns produce generic results.

---

## Intent recognition

How the bot determines which intent the user is in.

**LLM-based intent recognition.** The LLM classifies the user's message into one of the named intents. Common in modern chatbots.

**Rule-based intent recognition.** Keywords or patterns trigger intent assignment. Older approach; brittle but predictable.

**Hybrid.** LLM as primary; rules for high-confidence overrides. Common middle ground.

**The recognition challenge.** Users phrase the same intent in many ways. "How much?" "What does it cost?" "Is there a free tier?" all map to "pricing question." The intent recognition has to handle the variety.

**Recognition failure modes.**

- Misclassification (intent A treated as intent B).
- Over-classification (too many intents recognized; conversation gets confusing).
- Under-classification (intents go unrecognized; conversations fall to fallback).

The discipline. Test intent recognition with realistic user messages. Tune until the classification matches user intent reliably.

---

## Intent maintenance

Intents drift. Audiences shift; products evolve; conversation patterns change.

**Maintenance signals.**

- Specific intents see declining resolution rates.
- New conversation patterns emerge that no intent covers.
- Sub-intents become more or less common over time.

**Maintenance cadence.** Quarterly review of intent performance. Add new intents when new patterns emerge consistently; retire intents that fire rarely.

**The intent-maintenance audit.**

- For each intent: trigger rate, resolution rate, escalation rate.
- Identify intents that are over-triggering (capture too much) or under-triggering (rarely fire).
- Identify gaps (conversations that should have an intent but do not).

---

## Intent and brand voice

Each intent's conversation pattern should sound like the brand.

**The principle.** The bot's voice in each intent matches the brand voice. Consistent across intents; consistent with the brand's other surfaces.

**Brand-voice failures.**

- Different intents speaking in different voices.
- Bot voice that does not match the brand's other surfaces.
- Generic LLM voice (no brand personality).

**The cure.** Voice guidance specific to the bot. Brand voice document that includes bot-specific examples. Test conversations to verify voice consistency.

---

## Intent-architecture worked example

A B2B SaaS chatbot for a project management tool.

**Top-level intents.**

1. Pricing question (sub-intents: tier comparison, discount inquiry, billing question, annual vs monthly)
2. Feature inquiry (sub-intents: specific feature, comparison to competitor, roadmap question)
3. Integration question (sub-intents: specific integration, API question, custom integration)
4. Demo request (sub-intents: standard demo, enterprise demo, technical deep-dive)
5. Support escalation (sub-intents: bug report, account issue, billing problem, general help)
6. Account access (sub-intents: password reset, account login, organization-level access)
7. General overview (sub-intent: introductory tour)

**Coverage estimate.** 80-85 percent of expected conversations.

**Fallback for the remaining 15-20 percent.** Multi-layered fallback (clarification, suggested intents, resource handoff, human escalation).

The architecture is explicit. Each intent has scope, knowledge-base grounding, conversation pattern, and escalation triggers.

---

## Common intent failures

**Too few intents.** Bot tries to handle everything with generic flow; hallucinates or stays generic.

**Too many intents.** Intents that rarely fire; maintenance overhead with no value.

**Overlapping intents.** Two intents claiming the same conversations; recognition becomes ambiguous.

**Unclear intent boundaries.** Bot handles topics out of scope; quality drops.

**Intent recognition unreliable.** Misclassification rate high; users get wrong responses.

**No intent maintenance.** Intent set frozen at launch; audiences evolve away from it.

**Brand voice inconsistent.** Each intent speaks differently; bot feels disjointed.

---

## Methodology-level choices that stay in the public skill

The named-intent principle. Common intent patterns. Intent hierarchy. Intent boundaries. Intent coverage. Intent design discipline. Intent recognition approaches. Intent maintenance. Intent and brand voice. Worked example. Common failures.

## Implementation choices that stay internal

Specific intent sets for specific bots. Specific conversation patterns and copy. Specific recognition implementations. Specific knowledge-base mappings per intent. The team's audit calendars. These vary by team.

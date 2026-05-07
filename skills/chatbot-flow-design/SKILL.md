---
name: chatbot-flow-design
description: "Designing conversational flows for website chatbots and AI agents. Intent recognition architecture, branching logic, fallback handling, escalation to human, conversation analytics. Honest about scripted-bot (rigid trees, fail edge cases), hallucinating-bot (LLM without structure, makes things up), and structured-guided-conversation (LLM-powered with intent architecture and fallback discipline) patterns. Distinguishes chatbot DESIGN (this skill) from chatbot IMPLEMENTATION (engineering and platform work). Triggers on chatbot, conversational AI, AI agent, chat widget, intent design, conversational flow, bot escalation, LLM grounding. Also triggers when a chatbot is hallucinating, when a scripted bot is failing edge cases, or when a chatbot is being scoped for the first time."
category: growth-tooling
catalog_summary: "Designing conversational flows for chatbots and AI agents on websites. Distinguishes scripted-bot (rigid trees, fail edge cases) from hallucinating-bot (LLM without structure, makes things up) from structured-guided-conversation (LLM-powered with intent architecture and fallback discipline)"
display_order: 5
---

# Chatbot Flow Design

A senior growth practitioner's playbook for designing conversational flows for website chatbots and AI agents. Intent recognition architecture, branching logic, fallback handling, escalation to human, conversation analytics. The discipline of building a bot that knows what it knows and routes appropriately when it does not.

Most chatbots on the web fail in one of two ways. Scripted bots break the moment a user phrases something the script did not anticipate; the user gets pushed through a decision tree that does not fit their situation. LLM-powered bots without structure hallucinate; they confidently answer questions about pricing, policy, or capabilities and frequently make up answers, creating support burden and trust damage.

The chatbots that work do something different. They have an intent architecture that defines what the bot can and cannot handle. They ground their responses in a knowledge base so they do not invent facts. They have explicit fallback paths for unclear or out-of-scope intents. They escalate to humans cleanly when the bot's job is done. The audience trusts the bot because the bot is honest about its scope.

The voice is the senior growth practitioner who has watched chatbots become trusted brand surfaces and watched them become liability risks. Practical, opinionated about the architecture that distinguishes the two outcomes, willing to call out when a chatbot is the wrong investment or when an existing chatbot needs to be redesigned rather than tuned.

When to use this skill: scoping a chatbot for the first time, auditing a chatbot that hallucinates or fails edge cases, designing the intent architecture and fallback patterns, or deciding when to escalate to humans.

---

## What this skill covers

This skill spans chatbot design as conversational flow architecture, not chatbot implementation. The growth-tooling distinctions:

- `ai-content-collaboration` covers AI in content workflows. This skill covers AI in customer-facing conversations.
- `integration-orchestrator` covers cross-team coordination for chatbot deployment. This skill is the conversational design itself.
- `pm-spec-writing` covers the spec for engineers building the bot. This skill is about WHAT the conversation should be; pm-spec-writing is about communicating it.
- `discovery-research-synthesis` covers customer research that informs intent architecture. Input to this skill, not part of it.
- **`chatbot-flow-design` (this skill)** is intent architecture, knowledge-base grounding, fallback patterns, and escalation discipline.

The audience: growth marketers and product marketers shipping chatbot growth tooling, in-house teams designing conversational flows for marketing or support contexts, agencies running chatbot work for clients.

Out of scope: AI in content workflows (covered by `ai-content-collaboration`); the engineering implementation of chatbots (handed off via `pm-spec-writing`); platform-specific bot configurations (those stay implementation-side); voice agents and IVR flows (different methodology though related principles apply).

---

## The chatbot decision: when chatbots earn deployment

Before designing the chatbot, decide whether a chatbot is the right tool.

**Chatbots earn deployment when:**

- The audience asks the same questions repeatedly. FAQ-style support, product capability questions, qualification routing. The bot handles the volume; humans handle the exceptions.
- The audience is on the site at hours when humans cannot respond. Coverage gap that the bot fills meaningfully.
- The bot can ground its answers in real knowledge (documentation, product specs, pricing pages). Without grounding, the bot's answers are at best generic and at worst fabricated.
- The team can maintain the bot. Chatbots decay; intents drift; knowledge bases need updating. Without maintenance commitment, the bot becomes stale liability.

**Chatbots do NOT earn deployment when:**

- The audience expects human conversation. Sales conversations, complex troubleshooting, sensitive topics often warrant human-first.
- The team cannot ground the bot in real knowledge. A bot without grounding either hallucinates or stays so generic it adds no value.
- The bot would replace working human channels. Replacing a high-quality sales chat with a low-quality bot degrades the experience.
- The audience is small enough that direct human conversation is more efficient.
- The team cannot maintain the bot. Stale bots produce wrong answers.

The decision is not "should we have a chatbot"; it is "is the chatbot the right tool for this specific audience and conversation."

Detail in [`references/chatbot-decision-criteria.md`](references/chatbot-decision-criteria.md).

---

## Scripted-bot vs hallucinating-bot vs structured-guided-conversation

The keystone framing.

**Scripted-bot.** Rigid decision tree. "Press 1 for X, 2 for Y." Fails the moment a user phrases something the script did not anticipate. The chatbot equivalent of an automated phone tree. Cost: the user's actual question goes unanswered; the bot pushes the user through paths that do not fit; the audience leaves with a worse experience than no bot.

**Hallucinating-bot.** LLM-powered with no structure. Will confidently answer questions about pricing, policy, capabilities, and frequently make up answers. Liability risk; trust-eroding; support burden when wrong answers reach customers. Cost: the bot's confident wrong answers damage the brand more than no bot would; the team learns about the hallucinations through customer complaints.

**Structured-guided-conversation.** LLM-powered with intent architecture, knowledge-base grounding, defined fallback paths, and explicit escalation to humans. The bot knows what it knows, knows what it does not, and routes appropriately. Cost: the design effort upfront is significant; the maintenance is real; the audience trusts the bot because the bot is honest about its scope.

The litmus test. Ask the bot a question outside its intended scope. Does it confidently make up an answer (hallucinating), refuse rigidly (scripted), or honestly route the user to a human or alternative resource (structured-guided)? The third response is the goal.

---

## Intent architecture

Defining what the bot can and cannot handle.

**The principle.** The bot has a defined set of intents it can handle. Each intent maps to a conversation pattern (questions to ask, knowledge to ground in, response to provide). Anything outside the intent set falls to fallback.

**Intent design patterns.**

- **Named intents.** "Pricing question," "feature comparison," "integration question," "support escalation," "demo request." Each intent is explicit.
- **Intent hierarchy.** Top-level categories with sub-intents. "Pricing question" includes sub-intents for "tier comparison," "discount inquiry," "billing question."
- **Intent boundaries.** Each intent has clear scope. Out-of-scope topics route to fallback.

**Intent coverage.** The bot's intents should cover 70-90 percent of expected conversations. The remaining percentage falls to fallback. Trying to cover 100 percent often produces bloated intent sets that the bot cannot handle reliably.

**Intent maintenance.** Intents drift as products evolve, audiences shift, and conversations change. Periodic review surfaces which intents are useful and which need refining.

Detail in [`references/intent-architecture-patterns.md`](references/intent-architecture-patterns.md).

---

## Knowledge-base grounding

The bot's responses must come from real knowledge, not made-up confidence.

**The principle.** The bot's response generation should reference a structured knowledge base (documentation, product specs, pricing pages, support articles). The bot does not invent answers; it retrieves and presents.

**Grounding patterns.**

- **Retrieval-augmented generation (RAG).** The bot searches a knowledge base for relevant content before generating a response. The response is grounded in retrieved content.
- **Source-of-truth design.** The knowledge base is the canonical source. When the bot answers, the underlying source is identified.
- **Citation discipline.** The bot can cite the source ("based on our pricing page, ..."). Audiences benefit from knowing where the answer came from.
- **Knowledge-base maintenance.** The knowledge base is maintained as the product evolves; the bot's answers stay current.

**The hallucinating-bot failure.** No grounding. The LLM generates confident-sounding answers from nothing. The team discovers wrong answers through customer complaints.

**The structured-guided win.** Grounded answers. The bot's responses match the source-of-truth. Customer-facing accuracy is maintained.

Detail in [`references/knowledge-base-grounding-patterns.md`](references/knowledge-base-grounding-patterns.md).

---

## Branching and conditional logic

How the bot adapts the conversation based on user input.

**The principle.** The bot's conversation can branch based on user inputs (intent recognized, prior answers, user attributes). Branching makes the conversation feel adaptive.

**Branching patterns.**

- **Intent-driven branching.** Different intents lead to different conversation flows.
- **Context-driven branching.** "Are you asking about plan A or plan B?" routes to plan-specific information.
- **User-attribute branching.** Logged-in users may see different responses than anonymous users; enterprise visitors may see different responses than SMB.
- **Multi-turn branching.** The conversation deepens over turns; later turns build on earlier context.

**Branching discipline.** Each branch should add value. Decorative branching (asking for confirmation when none is needed) adds friction.

**Branching limits.** Bots that branch too deeply lose users. 3-5 turns is often the practical limit before the user wants resolution.

Detail in [`references/branching-and-conditional-logic.md`](references/branching-and-conditional-logic.md).

---

## Fallback patterns

What happens when intent is unclear or out-of-scope.

**The principle.** Every conversation has fallback paths. The bot has rehearsed responses for "I do not know," "I am not sure I can help with that," "Let me connect you with a human."

**Fallback patterns.**

- **Clarifying question.** "Can you tell me more about what you are looking for?" Asks the user to refine; sometimes recovers.
- **Suggested intents.** "I can help with X, Y, or Z. Were you asking about one of those?" Surfaces what the bot can do.
- **Resource handoff.** "I cannot answer that, but here is our [documentation page] that covers it."
- **Human escalation.** "Let me connect you with a human who can help."

**Fallback discipline.** Multiple fallback layers. First, try clarification. If unclear after one round, suggest alternatives or escalate. Do not loop the user through 5 clarification attempts.

**The fallback-as-honesty principle.** A bot that admits it does not know earns more trust than a bot that fakes confidence. Audiences forgive limitations they were told about; audiences punish wrong answers they were given confidently.

Detail in [`references/fallback-pattern-design.md`](references/fallback-pattern-design.md).

---

## Escalation to human

When, how, with what context handoff.

**The principle.** Some conversations need a human. The bot escalates when its scope is exceeded, when the user requests it, or when the conversation pattern indicates the user is frustrated.

**Escalation triggers.**

- **User-initiated.** "Talk to a human." The bot escalates immediately.
- **Out-of-scope intent.** The bot recognizes the user's intent is outside its scope; escalates with the intent context.
- **Repeated fallback.** After 2-3 unclear exchanges, the bot escalates rather than loop.
- **Sentiment-driven.** The user's sentiment indicates frustration; the bot escalates rather than persist.
- **High-stakes topic.** Sensitive topics (cancellations, complaints, security) escalate by default.

**Escalation context handoff.** When escalating, the bot passes the conversation history and recognized intent to the human. The human does not start from scratch; they pick up where the bot left off.

**The escalation-quality test.** Does the human pick up the context smoothly, or do they have to ask the user to repeat everything? The latter signals broken handoff.

Detail in [`references/escalation-to-human-patterns.md`](references/escalation-to-human-patterns.md).

---

## Conversation analytics

Measuring what the bot is and is not doing well.

**The principle.** Track the bot's performance per intent, per fallback, per escalation. The data informs maintenance and design improvements.

**Conversation metrics.**

- **Intent recognition rate.** What percentage of conversations are correctly classified into intents?
- **Resolution rate per intent.** What percentage of conversations starting with intent X resolve successfully (user gets the answer they needed)?
- **Fallback rate.** What percentage of conversations hit fallback? High fallback rates signal intent gaps.
- **Escalation rate per intent.** What percentage of conversations within each intent escalate? High escalation may signal the intent should not be bot-handled.
- **User satisfaction.** Post-conversation surveys when feasible. Useful but limited; many users do not respond.

**Diagnostic uses.**

- High fallback rate: intents missing or unclear; expand or refine intent set.
- Low resolution rate per intent: knowledge base inadequate; improve grounding.
- High escalation rate per intent: the intent may not be appropriate for bot handling.
- High repeat-fallback within conversations: clarifying questions not landing; redesign clarification.

Detail in [`references/conversation-analytics-patterns.md`](references/conversation-analytics-patterns.md).

---

## Common failure modes

Rapid-fire. Diagnoses in [`references/common-chatbot-failures.md`](references/common-chatbot-failures.md).

- "Bot makes up answers about pricing." Hallucinating-bot pattern; no grounding to pricing source-of-truth.
- "Users say the bot is rigid and unhelpful." Scripted-bot pattern; intents do not cover real questions.
- "Sales is angry that the bot is qualifying leads wrong." Intent recognition or routing logic broken; audit qualification flow.
- "Support tickets increase after chatbot launch." Bot is producing wrong answers that send users to support; audit grounding and resolution.
- "Users abandon mid-conversation." Bot loops or fallback patterns are inadequate.
- "We cannot tell what the bot is actually doing." Analytics missing; instrument before further changes.
- "Bot was great at launch; quality has degraded." Maintenance lapse; knowledge base or intent set out of date.
- "Bot escalates to humans for everything." Escalation logic too permissive; bot should handle more.
- "Bot tries to handle everything itself." Escalation logic too restrictive; bot should escalate more.
- "Users complain the bot does not know what they asked five minutes ago." Conversation context not preserved across turns.

---

## The framework: 12 considerations for chatbot flow design

When designing or auditing a chatbot, walk these 12 considerations.

1. **The chatbot decision.** Is a chatbot the right tool for this audience and conversation, or would a different channel serve?
2. **Structured-guided-conversation, not scripted or hallucinating.** Intent architecture; knowledge-base grounding; fallback discipline.
3. **Intent architecture sound.** Named intents with clear scope; coverage targets 70-90 percent of expected conversations.
4. **Knowledge-base grounded.** Responses retrieved from source-of-truth; the bot does not invent answers.
5. **Branching adds value.** Each branch serves a real need; depth limited to 3-5 turns.
6. **Fallback patterns multi-layered.** Clarification, suggested intents, resource handoff, human escalation.
7. **Escalation triggers defined.** User-initiated, out-of-scope, repeated fallback, sentiment-driven, high-stakes.
8. **Escalation context handoff clean.** Humans pick up where the bot left off.
9. **Analytics instrumented.** Per-intent recognition, resolution, fallback, escalation rates.
10. **Maintenance cadence defined.** Knowledge base refreshed; intent set audited; bot quality verified.
11. **Brand voice consistent.** The bot sounds like the brand it represents.
12. **Audience-fit honest.** The bot serves the audience it can actually help; out-of-fit audiences get escalated quickly.

The output of the framework is a chatbot that knows what it knows, grounds its answers in real knowledge, escalates appropriately, and earns trust by being honest about its scope.

---

## Reference files

- [`references/chatbot-decision-criteria.md`](references/chatbot-decision-criteria.md) - When chatbots earn deployment and when they do not. The conditions that warrant the build.
- [`references/intent-architecture-patterns.md`](references/intent-architecture-patterns.md) - Defining what the bot can and cannot handle. Named intents, hierarchies, boundaries, coverage.
- [`references/knowledge-base-grounding-patterns.md`](references/knowledge-base-grounding-patterns.md) - Retrieval-augmented generation, source-of-truth design, citation discipline, knowledge-base maintenance.
- [`references/branching-and-conditional-logic.md`](references/branching-and-conditional-logic.md) - How the bot adapts the conversation. Intent-driven, context-driven, user-attribute, multi-turn branching.
- [`references/fallback-pattern-design.md`](references/fallback-pattern-design.md) - What happens when intent is unclear or out-of-scope. Multi-layered fallback patterns.
- [`references/escalation-to-human-patterns.md`](references/escalation-to-human-patterns.md) - When, how, with what context. Escalation triggers and handoff quality.
- [`references/conversation-analytics-patterns.md`](references/conversation-analytics-patterns.md) - Per-intent metrics. Diagnostic uses. The data that informs maintenance.
- [`references/chatbot-anti-patterns.md`](references/chatbot-anti-patterns.md) - The patterns that look like chatbots but degrade trust.
- [`references/common-chatbot-failures.md`](references/common-chatbot-failures.md) - 10+ failure patterns with diagnoses and cures.

---

## Closing: chatbots earn deployment when they know what they don't know

The chatbots that work as compounding assets are the ones the audience trusts. Not because they answer every question. Not because they are infinitely capable. Because they are honest about their scope, ground their answers in real knowledge, and escalate to humans when the bot's job is done.

That is the bar. Below the bar are scripted-bots (rigid trees that fail edge cases) and hallucinating-bots (LLMs without structure that make things up). Above the bar are structured-guided-conversations where the bot's intent architecture, knowledge-base grounding, fallback discipline, and escalation patterns combine into a tool the audience can rely on.

The discipline is in the design choices. The intents that define what the bot can do. The knowledge-base grounding that prevents hallucination. The fallback patterns that handle the unknown gracefully. The escalation logic that knows when to step aside. The analytics that surface what is working and what is not. The maintenance discipline that keeps the bot in sync with the brand it represents.

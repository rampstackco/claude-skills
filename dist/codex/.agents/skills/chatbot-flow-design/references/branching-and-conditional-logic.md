# Branching and conditional logic

How the bot adapts the conversation. Intent-driven, context-driven, user-attribute, multi-turn branching.

The bot's conversation can branch based on user inputs. Branching makes the conversation feel adaptive; over-branching makes it feel labyrinthine.

---

## The adaptive principle

The bot adapts the conversation to the user's situation. Branching is the mechanism.

**The win.** A user asks about pricing; the bot recognizes the user is on the enterprise track (from earlier inputs or context); the response includes enterprise-specific information rather than starter-tier information.

**The fail (no branching).** Every user gets the same response regardless of context. The pricing question gets a generic answer that helps no one specifically.

**The fail (over-branching).** The conversation branches at every turn; the user feels stuck in a labyrinth; resolution recedes.

The discipline. Branch when branching adds value. Avoid branching when it adds friction.

---

## Pattern A: Intent-driven branching

Different intents lead to different conversation flows.

**How it works.**

- The bot recognizes the user's intent.
- The conversation flow for that intent kicks in.
- Each intent has its own scripted or templated response pattern.

**Example.**

User: "How much does the Pro plan cost?"
Bot recognizes "pricing question" intent.
Bot routes to pricing-conversation flow:
- Retrieves pricing.
- Presents Pro plan pricing.
- Offers follow-up: "Would you like to compare with other tiers, or talk to sales for a custom quote?"

**Strengths.**

- Each intent gets a dedicated, optimized flow.
- Easy to maintain (changes to one intent do not affect others).

**Weaknesses.**

- Requires intent recognition to work reliably.
- Cross-intent topics may not fit any single flow.

**When to use.** Default for most chatbots. Intent-driven branching is the foundation.

---

## Pattern B: Context-driven branching

Branching within an intent based on context.

**How it works.**

- Within an intent's flow, the bot asks clarifying questions or branches based on context.
- "Are you asking about plan A or plan B?" routes the rest of the conversation to plan-specific information.

**Example.**

User: "How does the API work?"
Bot recognizes "integration question" intent.
Within the integration flow, the bot asks: "Are you looking at REST or GraphQL?"
User: "REST."
Bot routes to REST-specific information.

**Strengths.**

- Within-intent precision.
- The user feels heard; the response addresses their specific situation.

**Weaknesses.**

- Each clarifying question adds a turn; can frustrate users who want quick answers.

**The discipline.** Use context-driven branching only when the context genuinely affects the response. Decorative clarifications add friction.

---

## Pattern C: User-attribute branching

Branching based on user attributes (logged-in status, role, segment).

**How it works.**

- The bot accesses user attributes (often from a CRM or session data).
- Responses adapt to those attributes.
- "Logged-in users may see different responses than anonymous users; enterprise visitors may see different responses than SMB."

**Example.**

User: "Tell me about your pricing."
Bot detects the user is from a domain associated with an enterprise account.
Bot routes to enterprise-specific pricing conversation: "For teams of 200+, we offer a custom Enterprise plan. Here are the typical components..."

**Strengths.**

- Highly personalized.
- The right information for the right audience.

**Weaknesses.**

- Requires attribute infrastructure (CRM integration, session data).
- Privacy considerations (the bot is using data the user may not have explicitly shared).
- Risk of getting attributes wrong (a freelancer with a corporate domain treated as enterprise).

**When to use.** When the attribute infrastructure exists and the personalization genuinely improves the experience.

---

## Pattern D: Multi-turn branching

The conversation deepens over turns. Later turns build on earlier context.

**How it works.**

- The bot maintains conversation state across turns.
- Each turn's response considers what was said in previous turns.
- The conversation can pivot, deepen, or refocus based on the cumulative context.

**Example.**

Turn 1.
User: "I am evaluating CRMs."
Bot: "What size is your team?"
User: "We have 25 sales reps."

Turn 2.
Bot: "For a team of 25, our Growth plan often fits. Are you looking at any specific features?"
User: "We need integration with HubSpot."

Turn 3.
Bot: "Our HubSpot integration supports two-way sync, lead routing, and custom fields. Would you like to see a demo focused on this integration?"

The conversation deepens. Each turn builds on the previous.

**Strengths.**

- Conversation feels natural.
- Bot can handle complex inquiries that require multiple inputs.

**Weaknesses.**

- Conversation state management is complex.
- Long conversations risk losing context.
- Users may want resolution faster than multi-turn allows.

**The discipline.** Limit multi-turn conversations to 3-5 turns before either resolving, escalating, or offering a summary handoff. Beyond that, users abandon.

---

## Branching depth limits

Bots that branch too deeply lose users.

**The 3-5 turn principle.** Most users want resolution within 3-5 turns. Beyond that, the bot's value declines.

**When 3-5 turns is enough.** Most marketing-site Q&A, simple support, qualification.

**When more turns are needed.** Complex troubleshooting, detailed product configuration. In these cases, the bot should consider escalating to a human or offering a richer interface (form, video walkthrough).

**Branching as turn-cost.** Each branch adds a turn. Branches that do not resolve within the turn budget should be reconsidered.

---

## Branching design patterns

How to structure branches.

**Linear branching.** A then B then C. Simple; fits intent-driven patterns.

**Tree branching.** A leads to B or C; each leads to further options. Common; fits context-driven and user-attribute patterns.

**Loop-back branching.** Conversation can return to earlier turns. Useful when users want to compare options.

**Open-ended branching.** Conversation can take multiple paths from any point. Most flexible; hardest to maintain.

The choice depends on conversation complexity. Most chatbots benefit from tree branching with limited depth.

---

## Branching and brand voice

The bot's voice should stay consistent across branches.

**The principle.** Branching changes the conversation's content; the brand voice stays consistent.

**Voice failures across branches.**

- One intent's flow is formal; another is casual. Inconsistent.
- Bot voice shifts based on user attributes in ways that feel performative.
- Branches that adopt different personas confuse the user.

The discipline. Voice consistent; content adaptive.

---

## Conversation state management

What the bot remembers across turns.

**Within-conversation state.**

- Recognized intent and sub-intent.
- Captured user inputs (company size, role, specific interests).
- Conversation history.
- Pending follow-up actions.

**Across-conversation state.** When the user returns later (in the same session or a new session), what does the bot remember?

- Logged-in users: bot may remember previous conversations.
- Anonymous users: bot typically starts fresh; some implementations use cookies for limited memory.
- Privacy considerations: cross-session memory should be transparent and opt-in where appropriate.

The discipline. State management should serve the user. State that improves the experience is good; state that surprises or feels invasive is bad.

---

## Branching testing

Test the bot across branching paths.

**The challenge.** A bot with multiple branching points has many paths through any given conversation. Testing all paths is infeasible; testing critical paths is the discipline.

**Critical paths.**

- The most common conversation patterns (most-frequent intents).
- Each major branch point (one path that takes each branch).
- Edge cases (unusual user inputs that could break branching).

**Testing methods.**

- Manual testing of critical paths.
- Automated testing where feasible.
- Sampling production conversations to verify branching behavior.

---

## Common branching failures

**Decorative branching.** Clarifying questions that do not change the response; user feels stuck.

**Branching without resolution.** Conversation branches but never resolves; user gives up.

**Branching depth too deep.** 8+ turns without resolution; user abandons.

**Inconsistent voice across branches.** Different intents speak differently.

**State loss across turns.** Bot forgets earlier context; conversation feels disjointed.

**Privacy-violating attribute branching.** Bot uses attributes the user did not consent to share.

**Untested edge-case branches.** Specific paths break in production.

---

## Methodology-level choices that stay in the public skill

The adaptive principle. Patterns A through D with strengths, weaknesses, and when-to-use guidance. Branching depth limits. Branching design patterns. Branching and brand voice. Conversation state management. Branching testing. Common failures.

## Implementation choices that stay internal

Specific branching designs for specific bots. Specific state management implementations. Specific tooling for branching and testing. The team's testing protocols. These vary by team.

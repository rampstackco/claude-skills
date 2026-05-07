# Escalation to human patterns

When, how, with what context. Escalation triggers and handoff quality.

Some conversations need a human. The bot escalates when its scope is exceeded, when the user requests it, or when the conversation pattern indicates the user is frustrated. Escalation done well preserves the conversation's momentum; escalation done poorly resets the user.

---

## The escalation principle

Escalation is part of the bot's job. A bot that knows when to step aside earns more trust than a bot that tries to handle everything.

**The win.** The bot recognizes its scope is exceeded; escalates with the conversation context; the human picks up where the bot left off.

**The fail (no escalation).** The bot tries to handle everything; produces wrong answers; the user has to start over with a human eventually.

**The fail (broken escalation).** The bot escalates but the human starts from scratch; the user has to repeat everything.

The discipline. Escalation triggers defined; context handoff clean.

---

## Escalation triggers

When the bot escalates.

**User-initiated.** "Talk to a human." "I need to speak with someone." "Get me a person."

The bot escalates immediately. Do not try to handle the request first; the user has been explicit.

**Out-of-scope intent.** The bot recognizes the user's intent is outside its scope.

The bot escalates with the intent context. "Looks like you have a [intent type] question; let me connect you with the team."

**Repeated fallback.** After 2-3 unclear exchanges, the bot escalates rather than loop.

The bot acknowledges: "I am having trouble understanding your question; let me get a human who can help."

**Sentiment-driven.** The user's sentiment indicates frustration.

The bot recognizes frustration signals (negative phrasing, repeated complaints, exclamation patterns) and escalates.

**High-stakes topic.** Sensitive topics escalate by default.

Account security, cancellations, complaints, signs of distress. The bot does not try to handle these; immediate escalation.

**Complexity-driven.** The user's question requires deep customization or analysis the bot cannot provide.

The bot acknowledges: "This needs a more detailed look; let me connect you with our team."

---

## The context handoff

When escalating, the bot passes context to the human.

**What to pass.**

- The conversation history (full transcript).
- The recognized intent (what the bot thought the user wanted).
- The user's situation (any captured attributes: company, role, source).
- The reason for escalation (user-initiated, out-of-scope, sentiment, etc.).
- Any pending follow-up actions.

**The handoff format.**

- Visible to the human in their tool of choice (CRM, support ticket system, chat panel).
- Structured so the human can scan it quickly.
- Accurate (the recognized intent matches what the user actually said).

**The handoff failure.** The human picks up the conversation but does not see the context; they ask the user to repeat everything; the user feels the escalation was for nothing.

The discipline. Test the handoff. The human should pick up the context smoothly. The user should feel the escalation moved them forward, not backward.

---

## Escalation user experience

What the user sees during escalation.

**The pattern.**

- Bot acknowledges the escalation: "Let me connect you with someone who can help."
- Bot provides expectation: "Someone from our team will be with you in [timeframe]."
- If the wait will be long, bot offers alternatives: "If you do not want to wait, you can [book a call / email us / submit a ticket]."
- Conversation transitions to human cleanly when the human joins.

**The escalation-as-transition principle.** The user should feel the conversation continued, not started over. The transition from bot to human is part of the experience.

---

## Escalation and human availability

What happens when no human is available.

**During business hours.** The bot escalates; a human picks up within the expected response time.

**Off-hours.** The bot acknowledges: "Our team is available [hours]. I can take your information and have someone respond when they are back."

**During high-volume.** The bot acknowledges the wait: "We are seeing high volume right now; expected wait is about [time]."

**The honest framing.** The bot communicates availability honestly. Pretending humans are available when they are not creates frustrated users.

**Asynchronous escalation.** When the user is willing, async escalation (email, ticket) is often better than waiting in chat. The bot can offer this option proactively.

---

## Escalation routing

Which human gets the conversation.

**Routing patterns.**

- **Single team.** All escalations go to one team (often support). Simple but may not match all conversation types.
- **Intent-based routing.** Different intents route to different teams (sales escalations to sales; support to support).
- **Tier-based routing.** Different user tiers route to different teams (enterprise to enterprise account managers; SMB to general support).
- **Context-based routing.** Routing combines intent, tier, and other attributes.

**Routing failures.**

- Wrong team gets the escalation; they have to re-route; user waits longer.
- Routing logic stale; teams have changed but the bot has not.
- Round-robin without consideration of expertise; users get inconsistent quality.

**Routing maintenance.** Quarterly review of routing logic alongside team structure changes.

---

## Escalation measurement

Track escalation rate and quality.

**Metrics.**

- **Escalation rate.** What percentage of conversations escalate?
- **Escalation rate per intent.** Some intents may escalate more often than others.
- **Time-to-human-pickup.** How quickly does the human respond after escalation?
- **Resolution after escalation.** What percentage of escalated conversations resolve?
- **User satisfaction post-escalation.** When measurable.

**Diagnostic uses.**

- High escalation rate per intent: that intent may not be appropriate for bot handling.
- Long time-to-human: staffing or routing issues.
- Low resolution after escalation: handoff quality may be poor or the team may not have the resources.

The data informs both bot maintenance and human team capacity planning.

---

## Bot-to-human transition design

The moment the human joins the conversation.

**Pattern A: Visible transition.** The user sees a message: "Hi, I am [name] from the team. I see you were asking about [topic]; how can I help?"

The transition is explicit; the user knows they are now with a human.

**Pattern B: Continuous transition.** The conversation continues without explicit handoff; the bot's voice fades; the human's voice picks up.

Less common; can confuse users about who they are talking to.

**Pattern C: Bot stays available.** The bot remains in the conversation alongside the human; can be called on for specific information retrieval while the human leads.

Useful for complex conversations; rare in simple chatbot deployments.

**Pattern A is the default.** Explicit transitions reduce confusion.

---

## Escalation back to bot

Sometimes the conversation can return to the bot after a human handoff.

**When this works.** The human resolves the immediate issue; the user has a follow-up question that is bot-handlable; the bot can pick back up.

**When this fails.** The user expected human attention; returning to the bot feels like demotion.

**The discipline.** Bot-after-human transitions need user consent. "Is there anything else? I can connect you with our chatbot for quick questions, or keep you with me." Let the user choose.

---

## Common escalation failures

**No escalation logic.** Bot tries to handle everything; produces wrong answers; users escalate to support after the fact (worse than escalating upfront).

**Escalation without context handoff.** Human starts from scratch; user repeats everything.

**Escalation to unavailable humans.** Bot creates expectation that is not met; user waits indefinitely or abandons.

**Wrong-team routing.** Escalation goes to a team that cannot help; rerouting adds friction.

**Sensitive topics not escalated.** Bot tries to handle account security, cancellations, complaints; makes things worse.

**Escalation triggers too restrictive.** Bot rarely escalates; users get stuck.

**Escalation triggers too permissive.** Bot escalates everything; the bot is not really doing its job.

**No escalation user experience.** Transition to human is jarring; user is confused about whether they are still with the bot.

---

## Methodology-level choices that stay in the public skill

The escalation principle. Escalation triggers (6 patterns). Context handoff discipline. Escalation user experience. Escalation and human availability. Escalation routing. Escalation measurement. Bot-to-human transition design (3 patterns). Escalation back to bot. Common failures.

## Implementation choices that stay internal

Specific escalation routing for specific teams. Specific handoff formats and integration with CRM or support tools. Specific brand-voice transition copy. The team's staffing and SLA decisions. These vary by team.

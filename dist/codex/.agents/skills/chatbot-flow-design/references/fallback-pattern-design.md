# Fallback pattern design

What happens when intent is unclear or out-of-scope. Multi-layered fallback patterns.

Every conversation has fallback paths. The bot has rehearsed responses for "I do not know," "I am not sure I can help with that," "Let me connect you with a human." Done well, fallback earns trust through honesty; done poorly, fallback frustrates users into abandonment.

---

## The honesty principle

A bot that admits it does not know earns more trust than a bot that fakes confidence. Audiences forgive limitations they were told about; audiences punish wrong answers given confidently.

**The win.** A user asks about a topic outside the bot's scope. The bot says "I cannot help with that, but [here is the right resource or human contact]." The user gets routed to value; the brand earns trust.

**The fail (faked confidence).** The bot generates an answer from training data because it has no scope discipline. The answer is wrong; the user finds out later; the brand earns "lying bot" reputation.

**The fail (rigid refusal).** The bot says "I cannot help with that" and offers no alternative. The user has nowhere to go.

The discipline. Honest about limits; helpful about alternatives.

---

## Multi-layered fallback

Multiple fallback patterns, sequenced.

**Layer 1: Clarifying question.** "Can you tell me more about what you are looking for?"

When to use: when the user's intent is unclear and clarification might resolve.

When it fails: when the user has already been clear; clarification feels patronizing.

The discipline: ask clarification once, not repeatedly.

**Layer 2: Suggested intents.** "I can help with X, Y, or Z. Were you asking about one of those?"

When to use: when clarification did not work, or when the user asked something the bot can almost handle.

When it fails: when the suggestions do not match what the user wanted.

The discipline: suggest the bot's actual capabilities, not generic options.

**Layer 3: Resource handoff.** "I cannot answer that, but here is our [documentation page] that covers it."

When to use: when the bot cannot help but a self-serve resource exists.

When it fails: when the resource is not actually relevant.

The discipline: route to genuinely relevant resources; do not deflect to generic help.

**Layer 4: Human escalation.** "Let me connect you with a human who can help."

When to use: when self-serve will not work or the user has expressed frustration.

When it fails: when no human is available; the escalation creates an expectation that does not get met.

The discipline: escalate to humans only when humans are available; otherwise communicate the wait.

---

## Layer sequencing

The order matters.

**Standard sequence.**

1. Recognize intent. If recognized, handle.
2. If not recognized, try clarification (Layer 1).
3. If clarification fails, suggest intents (Layer 2).
4. If suggestions fail, offer resources (Layer 3).
5. If resources do not match, escalate (Layer 4).

**Sequence variations.**

- High-stakes topics may skip to Layer 4 immediately.
- User-initiated escalation ("talk to a human") goes to Layer 4 immediately.
- Frustrated sentiment may trigger Layer 4 sooner.

---

## Anti-pattern: fallback loop

Multiple clarification attempts that go nowhere.

**The pattern.** Bot does not understand; asks for clarification; user clarifies; bot still does not understand; asks again; loop.

**The signal.** Users abandon mid-conversation after 2-3 unsuccessful clarification attempts.

**The cost.** The user feels stuck. The brand earns "frustrating bot" reputation.

**The cure.** Limit clarification to one round. After that, escalate or offer alternatives. The bot's job is to resolve or hand off, not to keep asking the same question.

---

## Anti-pattern: rigid refusal

Bot says "I cannot help" and offers no path forward.

**The pattern.** User asks something out of scope; bot says "I cannot help with that"; conversation ends.

**The signal.** Users complain that the bot is unhelpful; abandonment.

**The cost.** The bot fails the user without offering recovery.

**The cure.** Always offer an alternative. Resource handoff or human escalation. The bot's "I cannot help" should be followed immediately by "but here is what might."

---

## Fallback copy discipline

What the fallback messages say.

**Helpful fallback copy.**

- "I am not sure I caught that. Are you asking about [option 1] or [option 2]?"
- "I can answer questions about pricing, integrations, or features. Was your question about one of those?"
- "I cannot answer that specifically. Our team can help; would you like me to connect you?"

**Unhelpful fallback copy.**

- "I do not understand."
- "Please rephrase."
- "Sorry, I cannot help with that."

**The voice discipline.** Fallback copy should sound like the brand. Apologetic but not groveling; honest but not curt; helpful but not desperate.

---

## Fallback for sensitive topics

Some topics warrant immediate escalation regardless of bot capability.

**Sensitive triggers.**

- Account security ("my account was hacked," "I think I was charged wrong").
- Cancellation ("I want to cancel my subscription").
- Complaints ("I want to speak to a manager").
- Crises (any indication of user distress).

**The pattern.** The bot recognizes the sensitive topic and escalates immediately rather than attempting to handle.

**Why this matters.** Sensitive topics need human empathy. A bot trying to handle them often makes things worse. Immediate escalation protects the user and the brand.

---

## Fallback during human unavailability

What happens when the user wants a human but no human is available.

**The honest options.**

- "Our team is available [hours]. Can I take a message they can respond to when they are back?"
- "We are not available right now. You can [submit a ticket / book a call / email us]."
- "I can help with [list of topics]; for [out-of-scope topic], please reach out to [channel] directly."

**The dishonest option.**

- Pretending a human is available when they are not. The user waits, gets frustrated, abandons.

The discipline. Communicate availability honestly. Set the expectation upfront if humans cannot respond immediately.

---

## Fallback measurement

Track fallback rate as a key metric.

**The metric.** What percentage of conversations hit fallback at any point?

**Diagnostic uses.**

- High fallback rate (above 25-30 percent): intents are missing or recognition is poor.
- Specific fallback layers triggered disproportionately: that layer needs design review.
- Fallback escalation rate (what percentage of fallbacks lead to human escalation): high rates may signal the bot is doing less than it should; low rates may signal users abandoning rather than escalating.

**The fallback-as-signal principle.** Fallback is not failure; it is the bot honestly recognizing limits. The signal is in the fallback patterns and what they reveal about intent gaps.

---

## Fallback maintenance

Fallback decays.

**What decays.**

- Suggested intents that no longer reflect the bot's actual capabilities.
- Resource links that have moved or broken.
- Escalation routing that no longer matches the team structure.

**Maintenance cadence.** Quarterly review of fallback messages, suggested intents, resource links, and escalation routing.

**The drift indicator.** User feedback about unhelpful fallback responses; broken links in the fallback flow; escalations going to wrong teams.

---

## Fallback and brand voice

Fallback responses are an opportunity for brand voice.

**The principle.** Fallback is when the bot is most likely to lose the user. Brand voice in fallback can recover the moment.

**Voice in fallback.**

- Acknowledge the limitation honestly.
- Maintain warmth (do not become cold or robotic when failing to help).
- Offer the path forward with the same voice as the rest of the conversation.

**The voice failure.** Fallback messages that sound generic; bot loses voice exactly when voice matters most.

---

## Fallback testing

Test the fallback flow as carefully as the success flow.

**Test cases.**

- User asks something clearly out of scope.
- User asks something on the edge of scope.
- User asks something within scope but phrased unusually.
- User explicitly asks for a human.
- User shows frustration in their messages.
- User asks during off-hours.

**The testing discipline.** Each fallback layer should be tested with realistic triggers.

---

## Common fallback failures

**No fallback patterns.** Bot has no rehearsed responses for unknown intents; generates whatever the LLM produces.

**Single-layer fallback.** Only "I do not understand" without alternatives.

**Fallback loops.** Bot keeps asking clarification; user gets stuck.

**Rigid refusal.** Bot says "I cannot help" without offering paths.

**Generic fallback copy.** Fallback messages do not match brand voice.

**Stale resource links.** Resource handoff points to broken URLs.

**Wrong escalation routing.** Bot escalates to teams that are not appropriate.

**Hidden human availability.** Bot does not communicate when humans are or are not available.

**Sensitive topics not escalated.** Bot tries to handle topics that need human empathy.

---

## Methodology-level choices that stay in the public skill

The honesty principle. Multi-layered fallback (4 layers with when to use). Layer sequencing. Anti-patterns (fallback loop, rigid refusal). Fallback copy discipline. Fallback for sensitive topics. Fallback during human unavailability. Fallback measurement. Fallback maintenance. Fallback and brand voice. Fallback testing. Common failures.

## Implementation choices that stay internal

Specific fallback messages for specific bots. Specific suggested intents and resource links. Specific escalation routing logic. The team's brand-voice fallback templates. These vary by team.

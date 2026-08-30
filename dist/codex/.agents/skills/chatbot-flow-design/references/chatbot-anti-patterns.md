# Chatbot anti-patterns

The patterns that look like chatbots but degrade trust. Anti-patterns are easy to ship; the cost shows up in lead quality, downstream conversion, and brand reputation over time.

---

## The scripted-bot

The pattern. Rigid decision tree. "Press 1 for X, 2 for Y." Fails the moment a user phrases something the script did not anticipate.

The signal. Users complain the bot is rigid; bot fails any conversation that does not match the predefined paths.

The cost. The user's actual question goes unanswered. The bot pushes the user through paths that do not fit. Audience leaves with a worse experience than no bot.

The cure. Move from rigid trees to LLM-powered intent recognition with grounded responses. Detail in `references/intent-architecture-patterns.md` and `references/knowledge-base-grounding-patterns.md`.

---

## The hallucinating-bot

The pattern. LLM-powered with no structure. Confidently answers questions about pricing, policy, capabilities, and frequently makes up answers.

The signal. Customer complaints about wrong information from the bot; sales or support hearing audiences cite incorrect bot answers.

The cost. Liability risk. Trust damage. Support burden when wrong answers reach customers.

The cure. Add intent architecture and knowledge-base grounding. The bot retrieves from sources-of-truth rather than generating from training data.

---

## The bot-that-tries-to-handle-everything

The pattern. Bot scope is "anything the user asks." No defined intents; no fallback discipline.

The signal. High hallucination rate; high resolution-rate variability across topics; users get inconsistent experiences.

The cost. The bot is unreliable. Some conversations work; many do not. Users cannot predict what they will get.

The cure. Define explicit intent scope. Honest fallback for everything outside scope. Detail in `references/intent-architecture-patterns.md`.

---

## The bot-that-handles-nothing

The pattern. Bot's intent set is so narrow that most conversations fall to fallback or escalation.

The signal. High fallback rate; high escalation rate; bot adds little value over a contact form.

The cost. The build cost was significant; the value delivered is small.

The cure. Expand the intent set to cover the conversations the audience actually has. Detail in `references/intent-architecture-patterns.md` (intent coverage section).

---

## The bot-that-loops

The pattern. Bot does not understand; asks for clarification; user clarifies; bot still does not understand; asks again.

The signal. Users abandon mid-conversation after 2-3 unsuccessful clarification attempts.

The cost. The user feels stuck. The brand earns "frustrating bot" reputation.

The cure. Limit clarification to one round. After that, escalate or offer alternatives. Detail in `references/fallback-pattern-design.md` (fallback loop section).

---

## The bot-that-refuses-rigidly

The pattern. Bot says "I cannot help with that" without offering paths forward.

The signal. Users complain that the bot is unhelpful; abandonment.

The cost. The bot fails the user without offering recovery.

The cure. Always offer alternatives. Resource handoff or human escalation. The bot's "I cannot help" should be followed by "but here is what might."

---

## The bot-with-no-escalation

The pattern. Bot tries to handle everything itself; rarely escalates; users get stuck with bot for conversations needing humans.

The signal. Specific intents have high abandonment; users complaining they could not reach a human; sensitive topics handled poorly by the bot.

The cost. The user's frustration compounds. The brand earns "you cannot reach a human" reputation.

The cure. Define escalation triggers. User-initiated, out-of-scope, repeated fallback, sentiment-driven, high-stakes. Detail in `references/escalation-to-human-patterns.md`.

---

## The bot-that-escalates-everything

The pattern. Bot escalates almost every conversation; the bot is not really doing its job.

The signal. Escalation rate near 100 percent; bot adds friction without value.

The cost. The bot is decorative. The team built a chatbot when they needed staffing.

The cure. Either expand the bot's intent handling capability or reconsider whether the chatbot is the right tool. Sometimes the answer is to invest in human chat instead.

---

## The bot-with-broken-handoff

The pattern. Bot escalates; human picks up; the human starts from scratch because the context was not passed.

The signal. Users complain about repeating themselves; humans report not knowing what the bot was discussing.

The cost. The escalation experience is broken. Users feel the bot was wasted effort.

The cure. Test the handoff. Ensure the human sees the conversation history and recognized intent. Detail in `references/escalation-to-human-patterns.md` (context handoff section).

---

## The bot-with-stale-knowledge

The pattern. Knowledge base not updated; bot answers reflect outdated reality.

The signal. Bot answers contradict current product; users notice; sales hears about wrong information.

The cost. Trust damage. Each wrong answer is a moment the brand lost credibility.

The cure. Knowledge-base maintenance discipline. Quarterly review at minimum. Detail in `references/knowledge-base-grounding-patterns.md`.

---

## The bot-with-no-citation

The pattern. Bot generates answers without citing sources. Users cannot verify.

The signal. Hallucination goes undetected because there is no verification path; users with deeper questions abandon because they cannot follow up.

The cost. Trust does not compound. Each answer is taken on faith; some are wrong.

The cure. Citation discipline. Bot cites sources; users can verify. Detail in `references/knowledge-base-grounding-patterns.md` (citation discipline section).

---

## The bot-with-inconsistent-voice

The pattern. Different intents speak in different voices. Bot voice does not match brand voice elsewhere.

The signal. Users report the bot feels disjointed; brand voice is fragmented.

The cost. Brand consistency suffers. The bot is a brand surface that is undermining the brand.

The cure. Brand voice document including bot examples. Test conversations across intents. Detail in `references/intent-architecture-patterns.md` (intent and brand voice section).

---

## The bot-with-no-analytics

The pattern. Bot launched without per-intent tracking. Quality is invisible.

The signal. Cannot diagnose issues; cannot track decay; remediation is guesswork.

The cost. Quality decays unnoticed. Maintenance happens only when customers complain (too late).

The cure. Instrument before launch. Per-intent recognition, resolution, fallback, escalation rates. Detail in `references/conversation-analytics-patterns.md`.

---

## The bot-that-pretends-to-be-human

The pattern. Bot does not disclose it is a bot; users think they are talking to a human.

The signal. Users feel deceived when they realize; complaints about hidden automation; trust collapse.

The cost. Trust damage that can be hard to recover. Brand earns "deceptive" descriptors.

The cure. Disclose that the user is talking to a bot. Modern AI chatbots can be disclosed openly without losing engagement; users often appreciate the honesty.

---

## The bot-with-mobile-broken-UI

The pattern. Bot works on desktop; UI breaks on mobile. Conversation cramped; input field hidden; responses overflow.

The signal. Mobile conversation completion is significantly lower than desktop.

The cost. Mobile audience underserved. Mobile is often the majority of traffic.

The cure. Mobile-first chatbot UI design. Test on actual devices.

---

## The bot-without-availability-disclosure

The pattern. Bot escalates to humans without communicating that humans may not be available.

The signal. Users wait indefinitely for a human; abandonment after escalation; frustration.

The cost. Escalation creates expectation that is not met. Worse than no escalation.

The cure. Communicate availability honestly. "Our team is available [hours]." Or offer async alternatives. Detail in `references/escalation-to-human-patterns.md`.

---

## How to detect anti-patterns in a portfolio

Audit cadence. Quarterly review of every active bot, looking specifically for these anti-patterns.

**Audit questions per bot.**

- Does the bot have explicit intents (anti-pattern check: bot-that-tries-to-handle-everything, hallucinating-bot)?
- Are responses grounded in source-of-truth (anti-pattern check: hallucinating-bot, bot-with-no-citation)?
- Does fallback have multiple layers including escalation (anti-pattern check: bot-with-no-escalation, bot-that-loops)?
- Does escalation pass context (anti-pattern check: bot-with-broken-handoff)?
- Is the knowledge base maintained (anti-pattern check: bot-with-stale-knowledge)?
- Is brand voice consistent across intents (anti-pattern check: bot-with-inconsistent-voice)?
- Are analytics in place (anti-pattern check: bot-with-no-analytics)?
- Does the bot disclose its nature and human availability (anti-pattern check: bot-that-pretends-to-be-human, bot-without-availability-disclosure)?

**The retire decision.** Anti-pattern bots often warrant retirement or significant redesign. Patching anti-patterns rarely produces a good bot.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing for each. Cures matched to anti-patterns. The audit cadence and audit questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped historically and the lessons learned. Specific portfolio audit results. Specific retirement and redesign decisions. The team's audit calendar and reviewer list. These vary by team.

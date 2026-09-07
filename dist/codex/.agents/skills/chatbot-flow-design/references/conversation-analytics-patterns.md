# Conversation analytics patterns

Per-intent metrics. Diagnostic uses. The data that informs maintenance.

Conversation analytics is the bot's diagnostic system. Without analytics, maintenance is guesswork; intent gaps go unnoticed; hallucination patterns persist; the bot's quality decays without anyone seeing the decay.

---

## The instrumentation principle

Track the bot's performance per intent, per fallback, per escalation. The data informs every maintenance decision.

**The minimum tracking.**

- Conversation start (a user opens the bot).
- Intent recognition (which intent the bot classified).
- Conversation outcome (resolved, fallback, escalation, abandoned).
- Per-turn data (each user message, each bot response).

**The derived metrics.**

- Intent recognition rate.
- Resolution rate per intent.
- Fallback rate.
- Escalation rate per intent.
- Abandonment rate.

Without instrumentation, none of this data exists. Set up tracking before launch.

---

## Intent recognition rate

What percentage of conversations are correctly classified.

**The metric.** Of conversations where the user expressed intent, what percentage did the bot recognize correctly?

**Measurement methods.**

- **Sample auditing.** Periodically sample conversations and verify intent classification manually.
- **User feedback signals.** Conversations where users complain or escalate often correlate with misrecognized intent.
- **Conversation outcome correlation.** Conversations resolved successfully often had correct intent recognition.

**Diagnostic uses.**

- Low recognition rate: intent set may not cover real conversations; recognition logic may be brittle.
- Specific intents misrecognized: those intents may be poorly defined or overlap with others.

**Target ranges.** 80-90 percent recognition is achievable for well-designed chatbots. Below 70 percent suggests significant intent or recognition issues.

---

## Resolution rate per intent

What percentage of conversations starting with intent X resolve successfully.

**Resolution definition.** The user got the answer they needed and the conversation ended successfully (no escalation, no abandonment, no follow-up indicating frustration).

**Measurement methods.**

- **Conversation completion plus user signal.** User explicitly says "thanks" or rates the conversation positively.
- **No follow-up issues.** User does not return with the same question or escalate later.
- **Direct survey.** Post-conversation survey asking if the user got what they needed.

**Diagnostic uses.**

- Low resolution per intent: the bot's grounding or response pattern for that intent is weak.
- Some intents have higher resolution than others: variation may signal intent design quality differences.

**Target ranges.** 70-85 percent resolution per intent is reasonable. Lower for complex intents; higher for simple intents.

---

## Fallback rate

What percentage of conversations hit fallback at any point.

**The metric.** Conversations where the bot's intent recognition failed or the bot's response did not address the user's need, requiring fallback.

**Diagnostic uses.**

- High fallback rate (above 25-30 percent): intent set may be missing common conversations.
- Specific fallback layers triggered disproportionately: that layer needs review.
- Fallback rate trending up: audience evolving away from current intent set.

**Per-layer breakdown.** Track which fallback layers (clarification, suggested intents, resource handoff, human escalation) trigger most. Each tells a different story.

---

## Escalation rate per intent

What percentage of conversations within each intent escalate to humans.

**The metric.** Of conversations classified as intent X, what percentage ended with human escalation?

**Diagnostic uses.**

- High escalation rate per intent: the intent may not be appropriate for bot handling; consider removing from bot scope.
- Low escalation rate per intent: bot may be over-handling; some conversations may benefit from earlier escalation.
- Specific intents with rising escalation: maintenance lapse or audience evolution.

**The 100-percent-escalation intent.** An intent where the bot always escalates is not a bot intent; it should be a "tell me about [topic]; we will get back to you" intent or removed entirely.

---

## Abandonment rate

What percentage of conversations end without resolution or escalation (the user just leaves).

**The metric.** Conversations where the user stops responding without indicating resolution.

**Diagnostic uses.**

- High abandonment: bot is failing to satisfy users; review fallback patterns and conversation flows.
- Abandonment concentrated at specific turn or intent: that point in the flow is breaking.
- Mid-conversation abandonment vs first-turn abandonment: different diagnostic implications.

---

## User satisfaction

When measurable, satisfaction is the highest-value metric.

**Measurement methods.**

- **Post-conversation rating.** "How was that conversation?" with 1-5 stars or thumbs up/down.
- **Post-conversation survey.** Brief survey after the conversation ends.
- **Sentiment analysis.** Programmatic analysis of conversation sentiment.

**Diagnostic uses.**

- Low satisfaction: bot is failing the user even when conversations technically complete.
- Satisfaction-resolution mismatch: bot resolves but users are unhappy; quality of resolution is poor.

**Limitations.**

- Many users do not respond to satisfaction surveys.
- Satisfaction can be biased (frustrated users more likely to respond than satisfied ones).
- Sentiment analysis can miss nuance.

The metric is valuable but not the only signal.

---

## Conversation length distribution

How many turns the average conversation takes.

**The metric.** Distribution of conversation turn count.

**Diagnostic uses.**

- Long average length: bot may be over-clarifying; conversations should resolve faster.
- Bimodal distribution (very short or very long): some conversations resolve quickly; others get stuck.
- Increasing trend: bot quality may be declining; users having to work harder.

**Target ranges.** 2-5 turns for typical resolution. Longer for complex intents; shorter for simple ones.

---

## Response time

How quickly the bot responds.

**The metric.** Time between user message and bot response.

**Diagnostic uses.**

- Slow response: user perceives the bot as sluggish; abandonment may climb.
- Variable response time: inconsistent experience; users unsure what to expect.

**Target ranges.** Under 2 seconds for most responses. Longer responses (when retrieving or generating) should show typing indicators.

---

## Hallucination tracking

Specifically tracking when the bot generates wrong answers.

**Detection methods.**

- Sample auditing of bot responses against source-of-truth.
- User reports ("the bot said X; that is not right").
- Citation verification (programmatic check that cited sources contain the cited content).

**Diagnostic uses.**

- Specific intents with hallucination rate: those intents need grounding review.
- Specific topics within intents: knowledge base may have gaps.
- Hallucination trend: if rate is rising, model or grounding may be drifting.

**The honesty discipline.** Track hallucination explicitly. Teams that hide hallucination from themselves ship worse bots.

---

## Conversation funnel

Track conversations as a funnel from start to resolution.

**The funnel.**

- Conversation started.
- Intent recognized.
- First response delivered.
- User continued.
- Resolution achieved (or escalation, or abandonment).

**Diagnostic uses.** Drop-off at each stage points to specific issues.

- Drop-off after intent recognition: bot's first response is not engaging or is wrong.
- Drop-off mid-conversation: branching or follow-ups are not landing.
- Drop-off near resolution: closing or call-to-action is weak.

---

## Per-segment analytics

Different audience segments may experience the bot differently.

**Segments.**

- New visitors vs returning.
- Logged-in vs anonymous.
- Mobile vs desktop.
- Source of arrival (paid, organic, referral).

**Diagnostic uses.**

- Segments with worse outcomes signal segment-specific issues.
- Sometimes the right answer is segment-specific bot behavior.

---

## Analytics review cadence

How often to look at the data.

**Weekly review.** For high-volume bots or recently launched bots. Catches regressions and informs rapid iteration.

**Monthly review.** For stable bots. Tracks trends and surfaces gradual decay.

**Quarterly review.** For all active bots as part of the broader bot audit.

**Triggered review.** When intent set changes, when knowledge base updates, when team escalation patterns shift. Ad-hoc reviews catch specific issues.

---

## Common analytics failures

**No instrumentation.** Bot launched without per-intent tracking; quality is invisible.

**Vanity metrics.** Tracking conversation count without tracking outcome quality.

**Aggregate-only tracking.** Conversation rate tracked but not per-intent; remediation requires guesswork.

**Instrumentation drift.** Tracking implemented at launch; intent renames or schema changes broke the tracking.

**Confounded data.** Multiple changes deployed simultaneously; cannot attribute changes to any one update.

**No segment-level data.** Aggregate hides segment-specific issues.

**No hallucination tracking.** Bot wrongness goes unnoticed until customers complain.

---

## Methodology-level choices that stay in the public skill

The instrumentation principle. Intent recognition rate. Resolution rate per intent. Fallback rate. Escalation rate per intent. Abandonment rate. User satisfaction. Conversation length distribution. Response time. Hallucination tracking. Conversation funnel. Per-segment analytics. Analytics review cadence. Common failures.

## Implementation choices that stay internal

Specific dashboards for specific bots. Specific tooling for analytics implementation. Specific target ranges for the team's audience. The team's audit calendars. These vary by team.

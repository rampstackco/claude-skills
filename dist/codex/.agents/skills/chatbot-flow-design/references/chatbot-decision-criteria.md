# Chatbot decision criteria

When chatbots earn deployment and when they do not. The conditions that warrant the build, and the funnels where a chatbot adds friction without lift.

A chatbot is a meaningful build. Intent architecture, knowledge-base grounding, fallback patterns, escalation logic, ongoing maintenance. The chatbot earns this investment only when specific conditions are present.

---

## When chatbots earn deployment

Five conditions that, when present, make a chatbot a strong investment.

**The audience asks the same questions repeatedly.** FAQ-style support, product capability questions, qualification routing. The bot handles the volume; humans handle the exceptions. Without recurring question patterns, the bot has nothing to handle reliably.

**The audience is on the site at hours when humans cannot respond.** Coverage gap that the bot fills meaningfully. Off-hours visitors get something instead of nothing.

**The bot can ground its answers in real knowledge.** Documentation, product specs, pricing pages, support articles. Without grounding, the bot's answers are at best generic and at worst fabricated.

**The team can maintain the bot.** Intents drift; knowledge bases need updating; conversation patterns shift. Without maintenance commitment, the bot becomes stale liability.

**The success metric is defined.** Resolution rate, fallback rate, escalation rate, user satisfaction, downstream conversion. Without the success metric defined, evaluation is impossible.

When all five are present, the chatbot is a strong investment. When two or fewer are present, a different channel (human chat, structured FAQ, contact form) often serves better.

---

## When chatbots do NOT earn deployment

Funnels where the chatbot is the wrong tool.

**The audience expects human conversation.** Sales conversations, complex troubleshooting, sensitive topics often warrant human-first. A chatbot in these contexts may be perceived as an obstacle to the human conversation the audience wants.

**The team cannot ground the bot in real knowledge.** A bot without grounding either hallucinates (confident wrong answers) or stays so generic it adds no value (vague responses to specific questions).

**The bot would replace working human channels.** Replacing a high-quality sales chat with a low-quality bot degrades the experience. The bot might be cheaper to operate but more expensive in lost conversions.

**The audience is small enough that direct human conversation is more efficient.** Niche audiences with low conversation volume often work better with human-first channels; the chatbot's overhead is not justified.

**The team cannot maintain the bot.** Stale bots produce wrong answers. Without quarterly maintenance commitment, the bot becomes a liability over time.

**The conversation pattern is too varied to model.** Some audiences ask wildly different questions; the intent architecture cannot meaningfully cover the conversation space; the bot mostly fallbacks anyway.

The honest assessment matters more than the default. "Should we have a chatbot" is not the question. "Is the chatbot the right tool for this audience and conversation pattern" is.

---

## The opportunity-cost frame

A chatbot is significant work. Account for the cost honestly.

**The build cost.** Intent architecture, knowledge-base preparation, RAG pipeline, fallback design, escalation logic, conversation UI, brand-voice tuning, mobile responsiveness, analytics instrumentation. A meaningful chatbot often takes 80-300 engineering hours plus design and content for the knowledge base.

**The maintenance cost.** Knowledge base updates, intent refinement, hallucination detection, conversation analytics review. Quarterly maintenance often runs 8-20 hours per active bot.

**The escalation infrastructure cost.** Human handoff requires staffing or routing infrastructure. The bot does not eliminate the need for humans; it changes when humans are involved.

**The opportunity cost.** What else could the team have built? A better support documentation site, a self-serve help center, a different growth-tooling investment. The chatbot's success has to clear the bar of those alternatives.

The decision frame. The chatbot earns investment when it produces more value than the alternatives, accounting for build plus maintenance plus escalation infrastructure.

---

## The grounding precondition

Without knowledge-base grounding, the chatbot is the wrong tool.

**The check.** Does the team have or can the team build a knowledge base that covers the conversation patterns the bot will handle?

If yes, the chatbot can be grounded. The bot's responses retrieve from the knowledge base; hallucination risk is contained.

If no (the team's knowledge is in people's heads, not documented), the chatbot will hallucinate or stay generic. The bot is the wrong tool until the knowledge base exists.

**Building the knowledge base.** Sometimes the right move is to build the knowledge base first (which itself is valuable as documentation) before deploying the bot. The knowledge base serves users directly even before the bot accesses it.

---

## The decision worked example

A B2B SaaS company considering a chatbot for the marketing site.

**Conditions check.**

- Recurring questions: yes. Visitors ask about pricing, integrations, security, and demo requests recurringly.
- Off-hours coverage gap: yes. The team handles US business hours; international visitors get nothing in their evening hours.
- Knowledge-base grounding possible: yes. Pricing, integrations, security details all documented; FAQ exists; product specs are detailed.
- Maintenance commitment: yes. Marketing operations has capacity for quarterly bot review.
- Success metric defined: yes. Resolution rate per intent, escalation rate, downstream conversion to demo within 14 days.

**Decision.** Build the chatbot. The conditions warrant it.

**Intent architecture.** 7 named intents: pricing, integrations, security, demo request, support escalation, integration troubleshooting, account access.

**Knowledge-base grounding.** RAG pipeline pulling from docs, pricing page, security page, integration catalog.

**Fallback strategy.** Clarification on first unclear; suggested intents on second unclear; escalation to human on third or sentiment-driven.

**Escalation handoff.** Bot passes conversation history and recognized intent to the human; the human picks up where the bot left off.

The decision was not "should we have a chatbot" but "given these conditions, this is the chatbot to build."

---

## The decision worked example: when to choose differently

The same company considering a chatbot for sales conversations.

**Conditions check.**

- Recurring questions: partially. Sales conversations vary widely; while some patterns recur, the conversation often needs nuance.
- Off-hours coverage: not relevant; sales conversations work async via demo bookings already.
- Knowledge-base grounding possible: yes for product info; less so for personalized recommendations.
- Maintenance commitment: yes.
- Success metric: hard to define. Sales conversion is the goal; the bot's contribution is hard to attribute.

**Decision.** Do not build a sales-focused chatbot. The audience expects human sales conversation; the bot would add friction. Use the bot for marketing-site Q&A and demo qualification; route demo requests to human sales.

The decision was "is this chatbot right for this conversation" and the answer was "for some conversations yes, for others no." The bot's scope was constrained accordingly.

---

## The audience-fit precondition

The chatbot's audience must be willing to interact with chatbots.

**Audiences that engage with chatbots well.**

- Self-service-oriented users who want quick answers without human contact.
- Off-hours visitors who would otherwise get nothing.
- Users with specific factual questions (pricing, hours, policies).

**Audiences that resist chatbots.**

- Users who explicitly want to talk to a human (often signaled in the conversation opening).
- Sales-focused enterprise buyers expecting white-glove human attention.
- Users in distress (frustration, urgency) who need empathy not automation.

**The discipline.** The chatbot should serve the audiences who engage well and escalate the audiences who do not. Trying to serve everyone with the bot fails both groups.

---

## When to retire a chatbot

Chatbots can be wrong even after being right initially.

**Retire when:**

- Resolution rate has dropped below an acceptable threshold consistently.
- Escalation rate climbs as intents fail to keep pace with audience evolution.
- The knowledge base maintenance burden exceeds the bot's value.
- A redesigned support model (better docs, expanded human team, different tooling) makes the bot unnecessary.
- The team can no longer commit to maintenance.

The retiring discipline is part of the program. Stale bots produce wrong answers; honest retirement protects the brand.

---

## Methodology-level choices that stay in the public skill

The conditions that warrant chatbot deployment. The conditions that argue against. The opportunity-cost frame. The grounding precondition. The audience-fit precondition. Decision worked examples (yes and no). The retire decision.

## Implementation choices that stay internal

Specific chatbot scope decisions for specific audiences. The team's capacity benchmarks. Specific tooling for chatbot platforms, RAG pipelines, and analytics. Specific success-metric baselines. These vary by team.

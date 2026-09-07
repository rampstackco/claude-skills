# Knowledge-base grounding patterns

Retrieval-augmented generation, source-of-truth design, citation discipline, knowledge-base maintenance. The bot's responses must come from real knowledge, not made-up confidence.

Without grounding, the bot hallucinates. With grounding, the bot retrieves and presents. The difference is the gap between hallucinating-bot and structured-guided-conversation.

---

## The grounding principle

The bot's response generation should reference a structured knowledge base. The bot does not invent answers; it retrieves and presents.

**The win.** A user asks "what is included in the Pro plan?" The bot retrieves the current pricing page, extracts the Pro plan inclusions, and presents them. The answer matches the source-of-truth.

**The fail (hallucinating).** A user asks the same question. The bot has no grounding; the LLM generates a response from training data or pattern-matching. The response sounds confident but may be wrong (outdated, fabricated, partially correct).

The discipline. Every response that could be wrong if invented must be grounded.

---

## Pattern A: Retrieval-augmented generation (RAG)

The bot searches a knowledge base for relevant content before generating a response.

**How it works.**

- The user's message is converted to a query.
- The query searches the knowledge base (often via vector embedding similarity).
- Relevant content chunks are retrieved.
- The LLM generates a response grounded in the retrieved content.

**Strengths.**

- Responses reflect current knowledge base content.
- Bot answers questions about specific topics it has been trained on.
- Easier to update than retraining a model; updating the knowledge base updates the bot.

**Weaknesses.**

- Retrieval quality depends on knowledge-base structure and embedding quality.
- Bot may still hallucinate if retrieval returns nothing or if generation strays from retrieved content.
- Latency increases (retrieval + generation).

**When to use.** Default pattern for grounded chatbots. Most production bots use some form of RAG.

---

## Pattern B: Source-of-truth design

Defining the knowledge base as the canonical source.

**The principle.** The knowledge base is the canonical source for the bot's responses. When the source-of-truth changes, the bot's answers change.

**Source-of-truth examples.**

- Pricing page = source for pricing answers.
- Documentation = source for feature and integration answers.
- Support knowledge base = source for support answers.
- Security and compliance docs = source for security answers.

**Source-of-truth discipline.**

- Each topic has a single source-of-truth.
- The bot retrieves from that source.
- When the source updates, the bot's answers update automatically (depending on the RAG pipeline).

**The fragmented-source failure.** Multiple sources for the same topic produce inconsistent answers. The bot might cite one source; the user might rely on another. Confusion.

The cure. Single source-of-truth per topic. If multiple documents cover the same topic, designate one as canonical and reference the others.

---

## Pattern C: Citation discipline

The bot can cite the source of its answer.

**The principle.** Audiences benefit from knowing where the answer came from. Citation builds trust and lets the user verify.

**Citation patterns.**

- **Inline citation.** "Based on our pricing page, the Pro plan is $X per user per month."
- **Source link.** "You can see the full plan comparison [here]."
- **Source attribution at end.** "Source: [document name or link]"

**Why citation matters.**

- Trust-building. Users can verify the answer.
- Hallucination protection. If the bot cannot cite, the answer may be fabricated.
- User self-service. Users with deeper questions can follow the link.

**Citation failures.**

- Bot generates an answer without citation; the user cannot verify.
- Bot cites a source that does not actually contain the answer (citation hallucination).
- Bot cites a moved or deleted source; the link breaks.

The discipline. Citations must point to real sources that contain the cited content.

---

## Pattern D: Boundary disclosure

The bot tells the user when it is operating outside its grounding.

**The principle.** When the bot's response is not grounded (the question is outside the knowledge base), the bot says so explicitly.

**Disclosure patterns.**

- "I do not have information on that specific topic; would you like me to connect you with our team?"
- "Our pricing details are on the [pricing page]; the specific scenario you are asking about may need a custom quote from sales."
- "I can answer questions about our integrations; for product roadmap, you may want to contact our team."

**The disclosure-as-honesty principle.** A bot that admits limitations earns more trust than a bot that fakes confidence on out-of-scope questions.

---

## Knowledge-base structure

How the knowledge base is organized affects retrieval quality.

**Chunking.** Knowledge base content is broken into chunks for retrieval. Chunk size affects retrieval precision and context.

- **Too small chunks.** Retrieval returns isolated facts without context. The bot may miss surrounding nuance.
- **Too large chunks.** Retrieval returns too much; relevant content is buried; generation may stray.
- **Right chunks.** Topically coherent units (a pricing tier description, a feature explanation, a support article section).

**Metadata.** Each chunk has metadata (source document, section, last-updated date, topic tags). Metadata supports filtering and citation.

**Embeddings.** Chunks are embedded for similarity search. Embedding quality affects retrieval relevance.

**Index updates.** When the source-of-truth changes, the index must update. Stale index produces stale answers.

---

## Knowledge-base scope

What goes into the knowledge base.

**In scope.**

- Pricing and plan details.
- Feature and capability documentation.
- Integration catalog and API documentation.
- Support FAQs.
- Security and compliance information.
- Company overview, team, contact information.

**Out of scope.**

- Confidential information (internal-only docs, sensitive data).
- Information that changes too rapidly to keep current (real-time inventory, live availability).
- Information that requires personalization the bot cannot do (account-specific data).

**Boundary discipline.** Sensitive or personalization-required topics should not be in the bot's knowledge base. The bot should escalate or route to authenticated channels for those.

---

## Knowledge-base maintenance

The knowledge base decays. Maintenance is part of the bot's lifecycle.

**What decays.**

- Pricing changes that did not propagate to the knowledge base.
- Features added or removed without docs being updated.
- Integration partners changing names or capabilities.
- Support articles that became outdated.

**Maintenance cadence.**

- Monthly review of high-traffic content (pricing, features).
- Quarterly review of broader knowledge base.
- Triggered review when the product or pricing changes (the change includes a knowledge-base update task).

**Maintenance ownership.** Someone owns the knowledge base. Without owner, it decays.

**Decay indicators.**

- Bot answers that contradict current product reality.
- User complaints about wrong information from the bot.
- Sales or support hearing audiences cite outdated bot information.

---

## Hallucination detection

Even with grounding, bots can hallucinate. Detection is part of the discipline.

**Detection methods.**

- **Sample auditing.** Periodically sample bot conversations and verify the responses against source-of-truth.
- **User feedback signals.** "This response was not helpful" feedback often correlates with hallucination.
- **Citation verification.** Programmatic checks that cited sources actually contain the cited content.
- **Anomaly detection.** Conversations where the bot's response diverges significantly from retrieved content.

**Remediation.**

- Hallucinated content reported promptly.
- Knowledge base or grounding logic updated to prevent recurrence.
- Specific intent or topic may need re-design.

**The honesty discipline.** Acknowledge hallucination when it happens. The team that hides hallucination from itself ships worse bots over time.

---

## Knowledge-base and brand voice

The knowledge base content informs the bot's voice.

**The principle.** Source documents written in brand voice produce bot responses in brand voice. Source documents written generically produce generic bot responses.

**The discipline.** When preparing source documents for the knowledge base, write in the brand voice. The bot will reflect what it retrieves.

**Brand-voice editing.** Some teams edit retrieved content for the bot's response. This adds brand voice but risks drifting from the source-of-truth. Trade-off worth considering.

---

## Multi-source grounding

When the bot needs to combine information from multiple sources.

**The pattern.** The bot retrieves from multiple sources and synthesizes a response.

**Strengths.**

- Bot can answer questions that span topics.
- Richer responses possible.

**Weaknesses.**

- Synthesis can introduce hallucination.
- Citation becomes more complex (multiple sources).
- Quality control harder.

**The discipline.** Use multi-source grounding sparingly. When used, ensure the synthesis is grounded in retrieved content, not generated from training data.

---

## Common grounding failures

**No grounding.** Bot generates from training data; hallucinations are routine.

**Stale grounding.** Knowledge base not updated; bot answers reflect outdated reality.

**Fragmented grounding.** Multiple sources for same topic; bot answers are inconsistent.

**Citation hallucination.** Bot cites sources that do not contain the cited content.

**Generic content in knowledge base.** Source documents are not in brand voice; bot responses are generic.

**Out-of-scope grounding.** Bot retrieves from sources that should not be in scope (confidential, personalized).

**Boundary blur.** Bot answers questions outside its grounding without disclosure.

---

## Methodology-level choices that stay in the public skill

The grounding principle. Patterns A through D (RAG, source-of-truth, citation, boundary disclosure). Knowledge-base structure. Knowledge-base scope. Knowledge-base maintenance. Hallucination detection. Knowledge-base and brand voice. Multi-source grounding. Common grounding failures.

## Implementation choices that stay internal

Specific knowledge bases for specific bots. Specific RAG pipelines and embedding choices. Specific chunking and indexing approaches. Specific tooling for hallucination detection. The team's maintenance calendars. These vary by team.

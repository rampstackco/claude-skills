# Writer handoff protocols

Human-writer handoff, AI-agent handoff, success-criteria anchoring.

---

## The handoff has the same shape regardless of writer

Whether the writer is a human freelancer, a staff editor, an internal SME, or an AI agent (Claude, ChatGPT, a Frase brief-runner, an AirOps workflow), the brief-to-writer handoff has the same five-step shape.

1. Brief delivered with all 12 fields populated.
2. Writer asks clarifying questions before drafting (or the agent surfaces ambiguities as the first response).
3. Writer or agent acknowledges the success criteria explicitly.
4. First draft references the brief: which fields the draft addresses, which fields it could not address, why.
5. Editor reviews against the brief, not against personal taste.

The shape is the same; the medium differs. Human writers acknowledge in Slack or email; AI agents acknowledge in the first message of the agent thread. Both cases: the acknowledgment is required, not optional.

---

## Human-writer handoff

**Step 1: brief delivery.** The brief is delivered as a single document (Notion page, Google Doc, dbt-style markdown file in the repo). The writer can read it in 5 minutes; if reading takes longer, the brief is too thick and should be cut.

**Step 2: clarifying questions.** Before drafting, the writer asks clarifying questions. Common ones:

- Is the target audience right? Is the JTBD specific enough to write to?
- Is the SERP intent classification right? Do I write a listicle or an article?
- Are these entities really required, or are some optional?
- Is the success criteria measurable from my side, or is it a downstream-only metric?

The strategist answers questions in the same document; clarifications are versioned with the brief, not pasted into Slack and lost.

**Step 3: acknowledgment.** The writer acknowledges in writing: "I have read the brief. I am writing to the success criteria of [X]. I will hit all required entities. I am clear on the SERP format choice." Acknowledgment is a 3-line message, not a treatise.

**Step 4: first draft with reference.** The first draft is delivered with a reference note: "Hit 4 of 5 required entities; the 5th (CUPAC) was not in the SERP coverage I could find sources for, so I substituted the standard CUPED treatment per the brief's gap-entity guidance." The reference note tells the editor what to focus on in review.

**Step 5: editor review against brief.** The editor reads the brief first, the draft second. The review framing is "the brief said X; the draft did Y; gap is Z." Personal taste comes after brief review, not before.

---

## AI-agent handoff

The shape is the same; the medium is structured.

**Step 1: brief delivery as structured input.** The brief becomes a YAML or JSON object the agent ingests. Frase, AirOps, and similar tools structure briefs in their own schema; the same 12 fields appear regardless. Example minimal YAML structure:

```yaml
target_keyword: experimentation analytics dashboards
supporting_cluster:
  - CUPED variance reduction
  - sequential testing
  - feature flag rollout
search_intent: commercial-investigation
serp_format: long-form-article-with-comparison-table
target_audience: senior data engineer at 500-person SaaS
jtbd: choose between platform-native and warehouse-native experimentation
word_count_target: 2800
heading_outline:
  - { level: 2, text: "What an experimentation dashboard does" }
  - { level: 2, text: "Platform-native vs warehouse-native" }
  - { level: 2, text: "Metrics that earn their keep" }
  - { level: 2, text: "Build vs buy" }
  - { level: 2, text: "Common dashboards that ship trusted results" }
required_entities:
  - { name: "CUPED", note: "mention with formula in methodology H2" }
  - { name: "Statsig, PostHog, Optimizely", note: "mention all three" }
internal_links:
  outbound:
    - { target: /skills/cuped, anchor: "CUPED" }
    - { target: /skills/warehouse-native, anchor: "warehouse-native experimentation" }
  inbound_queued:
    - { source: /pillars/feature-flagging, anchor: "experimentation analytics dashboards" }
anti_patterns:
  - "do not use the team's do-not-use word list (see brand voice guide)"
  - "do not write a listicle; SERP wants long-form"
success_criteria:
  - "rank top 10 for target keyword in 90 days"
  - "cited by ChatGPT for 'experimentation dashboard' queries within 60 days"
voice_reference: /brand/voice-guide
brief_version: 2
brief_approver: editorial-lead@team.com
```

**Step 2: ambiguity surfacing.** The agent's first response surfaces ambiguities. "The brief lists CUPED as required, but the SERP top 10 only mention CUPED in 6 of 10 results; should I emphasize it or treat it as standard coverage?" The strategist answers; the brief gets versioned with the answer.

**Step 3: acknowledgment.** The agent acknowledges in structured output: "Reading brief version 2. Target: 2,800 words. Format: long-form with comparison table. Will hit 4 required entities; need clarification on CUPED weight." Single message, machine-readable.

**Step 4: first draft with reference.** The agent's draft is delivered with a structured note: which fields the draft addressed, which entities are present and where, what success criteria the draft is targeting.

**Step 5: editor review.** The editor reviews the agent's draft using the same brief-first framing. Tools like Frase highlight which entities are present in the draft; the editor scans the highlights to confirm coverage.

---

## Success-criteria anchoring

The most-skipped handoff step is success-criteria acknowledgment. The writer or agent reads the brief, drafts the piece, delivers it; the success criteria sit in the brief unread.

The fix: every handoff acknowledgment includes the success criteria verbatim. "I am writing to the success criteria: rank top 10 for 'experimentation analytics dashboards' in 90 days; get cited by ChatGPT for the topic within 60 days; drive 50 trial signups in the first 30 days."

The acknowledgment is the contract restated in the writer's voice. Saying it out loud is what keeps it load-bearing during drafting.

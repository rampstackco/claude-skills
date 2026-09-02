# Team training and calibration

Documented policy, calibration sessions, voice library, quality benchmarks, onboarding.

Inconsistent AI usage across a team produces inconsistent output. The discipline below makes AI usage explicit, calibrated, and documented at the team level so the program ships consistent work regardless of which writer is assigned which piece.

---

## Documented AI policy

The starting point. Every team running AI-assisted content has a policy document, even if currently informal.

**What the policy specifies.**

- **Approved uses.** AI in research synthesis, AI in copy edit suggestions, AI in transcription, AI in alternative phrasings. The team uses these without per-piece approval.
- **Conditional uses.** AI in first-draft generation, AI in outline generation, AI in long-form drafting. Approved per content type (e.g., approved for cluster pieces, requires editor approval for pillar pieces).
- **Prohibited uses.** AI as the sole author of bylined expert content, AI for fact verification (the AI is what gets fact-checked, not what does fact-checking), AI for ethical decisions, AI for final approval.
- **Tool standards.** Either "the team uses [specific tool] for [specific task]" or "the team selects from this list of tools per task type." Documented either way.
- **Disclosure requirements.** By content type, per the disclosure framework.
- **Voice library reference.** Where the team's voice anchor texts and prompt templates live.

**The discipline.** The policy is a document, not an oral tradition. Writers, editors, and contributors know where to find it; it is referenced in onboarding; it is updated quarterly.

---

## Calibration sessions

The discipline. Quarterly editor sessions where editors review the same AI-assisted pieces and surface differences in their judgment.

**Session structure.**

1. Three editors independently review the same 3 to 5 recently-published pieces.
2. Each editor writes a one-paragraph assessment per piece: voice, brief adherence, AI tells, fact accuracy, overall quality.
3. The team reads all assessments together.
4. Differences in interpretation surface; the team reconciles to a shared standard.
5. The session output is an addendum to the policy doc capturing the calibration consensus.

**Why this matters.** Without calibration, individual editors apply individual taste. Some editors flag AI-tells aggressively; others ship the same piece without flagging. The inconsistency confuses writers and produces drift in published quality.

**Cadence.** Quarterly minimum. More frequent during onboarding waves or after policy updates.

---

## Voice library

The team's collection of canonical brand-voice samples used as anchor text in AI prompts.

**What goes in the library.**

- 2 to 3 paragraphs of canonical brand voice per content type (blog, whitepaper, help doc, marketing copy, thought leadership)
- 2 to 3 paragraphs per writer voice (where the brand has multiple distinct contributor voices)
- 5 to 10 examples of AI-generated content that the team rewrote successfully (showing the before-and-after as a calibration aid)
- The vocabulary list: preferred terms, forbidden terms, term-specific usage rules

**Update cadence.** Monthly during program build; quarterly once stable.

**Why this matters.** The voice library is the operational expression of brand voice. Without a library, every AI prompt reinvents the voice context; the team produces inconsistent output. With a library, the prompt is templated and the voice context stays consistent.

---

## Quality benchmarks

The team's documented examples of "AI-assisted but on-voice" pieces.

**What the benchmarks show.**

- 5 to 10 published pieces where AI assistance was substantial but the output reads as on-voice
- For each benchmark: the pattern used (which workflow pattern), the editing intensity, the time profile, the quality outcome
- The benchmarks are calibration aids: writers and editors look at them when calibrating their own AI-assisted work

**Why this matters.** "On-voice AI-assisted content" is an abstraction. Concrete examples make it tangible. New writers calibrate to the benchmarks; experienced writers reference them when their work feels off.

**Anti-pattern.** Benchmarks that are aspirational rather than achieved. The benchmark library should be real published work, not "what we wish we shipped." Aspirational benchmarks set unrealistic expectations.

---

## Tool standardization vs intentional pluralism

Two valid models for AI tool selection at the team level.

### Standardization

The team uses one tool consistently for each task type. Drafting on tool A, editing on tool B, transcription on tool C. New writers learn the standard tools; the prompt templates and voice library are tool-specific.

**When this fits.** Smaller teams. Predictable content types. Time-budget for tool learning is limited. Consistency matters more than per-task optimization.

### Intentional pluralism

The team documents which tools fit which tasks; writers select per-task. Tool A for tasks of type X, tool B for tasks of type Y, contributors choose between them as appropriate.

**When this fits.** Larger teams. Diverse content types. Writers have time to learn multiple tools. Per-task optimization matters more than absolute consistency.

The discipline either way. The choice is documented; tool selection is not arbitrary or per-writer.

---

## Forbidden patterns list

The patterns the team explicitly does not use AI for, even when AI could technically do them.

**Common forbidden patterns.**

- AI fabricating quotes (always; this is fabrication)
- AI generating content that names specific real people (consent and verification issues)
- AI as the sole author of bylined opinion (ethics)
- AI for content involving regulated topics where the team lacks AI-policy guidance (medical advice, legal advice, financial advice)
- AI for content the team would be ashamed to publish under their byline (slop test)

**Why this matters.** The forbidden list is shorter than the approved list but more important. The forbidden list is what keeps the program out of ethics violations and trust failures.

---

## Onboarding

New writers learn the AI policy and calibration in their first 2 weeks.

**Onboarding components.**

- **Policy read.** The new writer reads the AI policy doc.
- **Voice library walkthrough.** The new writer reviews the voice samples and prompt templates.
- **Calibration session participation.** The new writer participates in the next calibration session as observer.
- **Shadow assignment.** The new writer's first piece is reviewed jointly with an experienced editor; the editor narrates the calibration in real-time.
- **Quality benchmark walkthrough.** The new writer reviews the quality benchmarks and identifies what makes each "on-voice."

**Why this matters.** New writers without onboarding develop their own AI patterns. The program drifts as new writers join. Onboarding makes the team's discipline transferable.

---

## When team calibration breaks

Symptoms.

- Different writers produce wildly different AI-assisted output (calibration overdue)
- Editors disagree on whether a piece is "AI-flavored" (calibration session needed)
- The AI policy doc is 6 months stale and references tools the team no longer uses (policy update overdue)
- New writers are using AI in ways that experienced writers do not (onboarding gap)
- Voice library has not been updated since the program launched (library refresh overdue)

The fix. Quarterly calibration sessions, quarterly policy review, quarterly voice library updates, structured onboarding for every new writer. The cadences are calendar-anchored; skipping them is the failure mode.

---

## Methodology-level choices that stay in the public skill

The documented-policy structure, the calibration session methodology, the voice library practice, the quality-benchmark library, the standardization-vs-pluralism choice, the forbidden-patterns discipline, the onboarding components, the calibration-breakdown signals.

## Implementation choices that stay internal

The specific format of the policy doc (Notion page, Markdown file, internal wiki). The specific tooling that hosts the voice library (database, Notion, Git repo of sample text). The specific calibration session cadence and team composition. The specific onboarding tracking system. The specific tool selections the team has standardized on. These vary by team and tooling.

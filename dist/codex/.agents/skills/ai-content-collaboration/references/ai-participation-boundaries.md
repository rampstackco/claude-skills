# AI participation boundaries

Where AI legitimately helps, where humans must own. The boundary list and the "human-in-the-loop is not ownership" distinction.

The boundary list below is the operational expression of the keystone framing: humans own the content, AI accelerates the work. The list is not exhaustive; the principle is: AI does work the human directs and verifies, AI does not make decisions about what publishes, who is quoted, what is true, or what voice the brand uses.

---

## Where AI legitimately participates

### Research synthesis

AI condenses long-form sources (papers, interviews, prior reports, internal docs) into a research brief. The writer reads the brief, follows up on the citations the brief surfaced, and verifies anything that will become a load-bearing claim in the piece.

The acceleration: hours of reading become minutes of reviewing. The retained ownership: the writer judges what is worth using, where the source is questionable, what additional research is needed.

### Outline generation against a brief

AI proposes an H2 / H3 structure based on the content brief and SERP analysis. The editor approves the outline, restructures it, or rejects it.

The acceleration: the writer starts from a structure that fits the brief instead of from a blank page. The retained ownership: the editor decides whether the structure fits the audience and the publication.

### First-draft generation

AI produces a draft against an explicit brief. The human edits substantially.

The acceleration: a 1,500-word draft in minutes that the human revises rather than composing from scratch. The retained ownership: the human chooses what to keep, what to rewrite, what to cut, what to add. A draft that ships unchanged is not collaboration; it is rubber-stamping.

### Alternative phrasings

AI offers 3 versions of a sentence, paragraph, or headline. The human picks one or rewrites.

The acceleration: faster surfacing of options the writer might not have considered. The retained ownership: the writer chooses the option that fits the voice and the context.

### Copy edit suggestions

AI catches typos, awkward phrasings, repetition, weak connections between paragraphs.

The acceleration: faster than a manual copy edit pass. The retained ownership: the editor decides which suggestions to accept; some of what AI flags as awkward is actually deliberate stylistic choice.

### Summary and abstraction

AI condenses long pieces into TL;DR summaries, executive summaries, or social media captions.

The acceleration: faster TL;DR generation; useful for content systems that produce summaries at scale. The retained ownership: the human verifies the summary captures what matters and does not flatten the piece's distinctive points.

### Transcription

AI transcribes interview audio. The human verifies the transcription against the audio for accuracy, especially on names, technical terms, and quoted positions.

The acceleration: hours of transcription become minutes of verification. The retained ownership: the human is responsible for what gets attributed; transcription errors that misquote sources are the human's accountability to catch.

### Translation drafts

AI produces a translation draft. A native speaker reviews and corrects.

The acceleration: a translation starting point in seconds. The retained ownership: the native speaker is the source of truth on idiomatic correctness, cultural context, and brand-voice translation.

### Quality-control automation at scale

AI flags pages in a programmatic SEO set that need human review (per `editorial-qa`'s sampling discipline).

The acceleration: automated check on every page; manual review focused on the flagged subset. The retained ownership: the editor decides what counts as a fail; the AI flags candidates, the human judges.

### Idea generation

AI proposes 30 angles on a topic; the human picks 3.

The acceleration: faster brainstorm. The retained ownership: the human chooses which angles fit the brand and the audience.

---

## Where humans must own

### Editorial judgment

What to publish, what to kill, what is worth saying. AI cannot decide whether a piece is good enough to ship. The judgment requires audience knowledge, brand context, and quality standards the AI does not have.

### Voice

Brand voice, distinctive POV, the way THIS publication sounds different from the next one. AI default voice is generic by construction; voice is a human contribution that the AI can mimic if shown samples but cannot originate.

### Fact verification

Every claim, every statistic, every quote, every named person. AI hallucinates plausible-but-fake claims; humans verify against authoritative sources. Fact verification is a halt-condition gate; pieces with unverified claims do not ship.

### Ethical decisions

What is appropriate to publish, what is harmful, what crosses lines, what disclosure is required. Ethics requires context, audience awareness, and accountability that the AI does not carry.

### Reader empathy

What the reader actually needs from this piece, not what the algorithm scores well. The reader's situation, knowledge, and emotional context shape the piece's job; the AI cannot model the specific reader the way a writer who has spent time with the audience can.

### Quote attribution

Real people who actually said the thing, with consent where relevant. AI hallucinates quotes; humans verify against the source.

### Tone calibration on hard topics

Grief, illness, sensitive history, contested politics. AI defaults to anodyne; humans calibrate to context. A piece on bereavement should not read as if a chatbot wrote it.

### Narrative arc

How the piece unfolds, where the reader's attention goes, what the climax is, what the resolution is. AI produces shapes; humans choose them.

### Final approval

The human who signs off is accountable for what shipped. Accountability cannot be delegated to AI; the byline and the editorial chain stop at humans.

---

## "Human in the loop" is not ownership

The phrase "human in the loop" appears in many AI workflows. It is necessary but insufficient.

A human briefly reviewing AI-generated content before publish is not ownership; it is rubber-stamping. The piece's substance, voice, and judgment are still AI-produced; the human's role is signature only.

Ownership requires the human to have made the actual decisions the piece embodies. Specifically: the human chose the angle, the human verified the facts, the human enforced the voice, the human made the editorial judgment calls that distinguish this piece from the AI's default output.

The test. Could the human defend every claim, every position, and every word in the piece? If yes, the human owns it. If no, the human is rubber-stamping.

---

## Methodology-level choices that stay in the public skill

The list of where AI legitimately participates, the list of where humans must own, the "human-in-the-loop versus ownership" distinction, the verification-and-defense litmus test.

## Implementation choices that stay internal

The specific AI tools the team uses for each participation category (research synthesis tool, drafting tool, copy edit tool, transcription tool, translation tool, QC automation tool). The specific prompts the team has developed for each task category. The specific tracking system that records which AI participated in which piece. The specific review workflows that gate publish. These vary by team and stack.

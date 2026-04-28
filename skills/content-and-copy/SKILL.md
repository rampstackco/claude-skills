---
name: content-and-copy
description: "Write or edit website copy, blog content, and editorial pieces with attention to voice, structure, and goal. Use this skill whenever the user wants to write an article, draft website copy, edit existing content for clarity or voice, write a blog post, or produce general editorial content. Triggers on write a blog post, draft an article, write copy for, edit this, rewrite this, write content, write a guide, draft a how-to, write web copy. Also triggers when content has been outlined and now needs to be written, or when existing content needs voice or clarity edits."
---

# Content and Copy

Write or edit content that serves a specific reader and goal. Stack-agnostic. This skill is for general content production. Specialized skills exist for landing pages (`landing-page-copy`) and email (`email-sequences`).

---

## When to use

- Writing a blog post or article
- Drafting website copy (homepage sections, about, services)
- Editing existing content for voice or clarity
- Writing how-to guides, listicles, or explainers
- Producing knowledge base or help center articles
- Adapting brand voice to a specific piece

## When NOT to use

- Landing pages with conversion goals (use `landing-page-copy`)
- Email campaigns or sequences (use `email-sequences`)
- Brand voice definition (use `brand-voice`)
- SEO keyword research (use `seo-keyword`)
- Content strategy and planning (use `content-strategy`)

---

## Required inputs

- The piece to be written or edited
- The target reader (specific audience segment)
- The goal of the piece (inform, convert, rank, retain, entertain)
- The brand voice (or willingness to define it)
- Length target and any structural constraints

If brand voice is undefined, run `brand-voice` first or use a working voice and document it as you go.

---

## The framework: 5 dimensions

Strong content is strong on all five. Weakness on any one drags the rest down.

### 1. Hook

The opening earns the read. Most readers decide whether to continue within 3 to 5 seconds.

**Strong hooks do one of:**

- **Promise specific value.** "By the end, you'll know exactly which X to pick for your situation."
- **Surface a tension.** "Most advice on X is wrong. Here's why."
- **Open a loop.** A question or scenario the rest of the piece resolves.
- **State a contrarian point.** Provided you can defend it.
- **Show, don't summarize.** A specific moment or scenario the reader recognizes.

**Weak hooks:**

- Throat-clearing ("In today's fast-paced world...")
- Dictionary-definition openers ("X is a type of Y that...")
- Stating the obvious ("Many people struggle with X.")
- Vague promises ("This article will explore X.")

### 2. Structure

The reader follows the flow without effort.

**Common structures:**

- **Problem → Solution → Proof.** Most non-fiction.
- **List + reasoning.** Listicles with substance, not filler.
- **How-to (numbered steps).** Procedural content.
- **Compare → Contrast → Recommend.** Comparison and review content.
- **Story → Lesson.** Narrative non-fiction.
- **Question → Answer → Implication.** Explainers and analysis.

Pick a structure. Stick to it. Most weak content fails because the writer drifted between structures.

### 3. Voice

The piece sounds like the brand.

- Voice attributes consistent throughout (per `brand-voice` definition)
- Tone shifts appropriately for context (a serious topic gets a serious tone, even from a playful brand)
- Vocabulary preferences honored
- Grammar and style standards followed (contractions, em dashes, sentence length)
- Reads aloud like the brand would actually talk

**Test:** Read a paragraph aloud. Does it sound like the brand? If it sounds like AI, generic marketing, or someone else's voice, edit until it doesn't.

### 4. Substance

The piece earns its length. Every paragraph adds something.

**Substance comes from:**

- **Specifics.** "Roughly 40 percent" beats "many." Names, numbers, examples, data.
- **Original perspective.** Your take, not a summary of everyone else's.
- **Actionable detail.** What the reader does with this information.
- **Honest tradeoffs.** What's NOT true, what doesn't work, what's overhyped.
- **Real examples.** Specific scenarios, real customers, real failures.

**Lack of substance shows up as:**

- Padding ("It's important to note that...")
- Restating the same point in three different paragraphs
- Generalities that anyone in the category could write
- Word counts hit by stretching, not depth

### 5. Closing

The piece ends with intention.

**Strong closings:**

- **Resolve the loop opened in the hook.**
- **Issue a specific next action.** What does the reader do now?
- **Land a memorable line.** Something quotable.
- **Return to the opening.** Echo or invert the first line.

**Weak closings:**

- Summary that restates the article
- "Hope this helps!" or equivalent
- A wall of CTAs from unrelated programs
- Trailing off with no clear ending

---

## Workflow

### For new pieces

1. **Confirm the brief.** Reader, goal, length, voice. If the brief is vague, do not write yet.
2. **Outline.** Structure first. Headlines and section purposes only. Skip prose until the structure is sound.
3. **Open with the hook.** Write the opening before anything else. If the hook isn't working, the rest won't either.
4. **Draft for substance.** First draft is about getting the substance down. Voice comes in editing.
5. **Edit for voice.** Read aloud. Tighten sentences. Cut padding. Apply brand voice.
6. **Edit for clarity.** Each paragraph: does it earn its place? Each sentence: is the meaning unambiguous?
7. **Pre-publish checks.** Headers in order, no skipped levels, internal links present, image alt text written, SEO basics applied (title, meta, slug).

### For editing existing content

1. **Read the whole piece first.** Do not edit on first read. Understand it before changing it.
2. **Identify what's working.** Note the strong sections so you don't damage them.
3. **Identify what's broken.** Voice mismatches, weak structure, vague claims, padding.
4. **Edit by priority.** Structure first (move sections, cut sections). Then substance (strengthen claims). Then voice. Then sentence-level polish.
5. **Read aloud.** Catch awkward phrasing the eye misses.

---

## Failure patterns

- **Writing without a brief.** Without reader, goal, and voice defined, the piece drifts.
- **Burying the lead.** The most important thing is in paragraph 8 because the writer "got there."
- **Padding to hit word count.** Length should serve the reader, not the production schedule.
- **Generic voice.** Sounds like every other article in the category. Brand voice neutralized.
- **Weak transitions.** Sections feel disconnected. Reader has to do the work the writer should have done.
- **No closing.** The piece runs out instead of ending.
- **Edit by adding.** Fixing weak content by piling on more words. Strong editing usually cuts.
- **Ignoring the headers.** Headers carry navigation weight. Bad headers fail readers who scan.

---

## Output format

Default output is a markdown document at `[content-slug].md` ready to import into the CMS.

Structure:
```markdown
# [H1: matches the title or tightly paraphrases]

[Hook paragraph. Earns the read in 3 to 5 seconds.]

[Body content with H2 sections, H3 subsections where useful.]

## [H2 section heading - descriptive, not clever]

[Section content.]

### [H3 if needed]

[Subsection content.]

## [H2 section heading]

[Section content.]

## [Closing section]

[Closing that resolves and points to next action.]
```

Front-matter for SEO and CMS:
```yaml
---
title: [SEO title, 50 to 60 chars]
description: [Meta description, 120 to 160 chars]
slug: [url-slug]
author: [author]
date: [YYYY-MM-DD]
last_updated: [YYYY-MM-DD]
tags: [tag1, tag2]
category: [category]
---
```

---

## Reference files

- `references/content-brief-template.md` - The brief that should exist before any content is written.
- `references/content-edit-checklist.md` - Pre-publish editing checklist.

---
name: skill-creation-walkthrough
description: Step-by-step guide for creating your own Claude Skills, from deciding whether a skill is the right tool to writing the SKILL.md file, structuring reference material, and making it trigger reliably. Use when you want to package a workflow, framework, or repeated task into a reusable Skill, when an existing skill is not triggering or not loading the right context, when you are auditing a skill that is underperforming, or when you want to publish a skill for others. Also triggers when someone asks "how do I make a skill" or "what makes a good skill". Useful for individuals, teams, and anyone publishing skills publicly.
---

A walkthrough for designing, writing, and maintaining your own Claude Skills. Covers when a skill is the right shape for your problem, how to write a description that actually triggers, how to structure SKILL.md and references, and how to test and iterate.

## When to use

- You catch yourself writing the same prompt or instructions repeatedly.
- You want to package a workflow or framework for reuse.
- An existing skill of yours is not triggering when it should.
- You are publishing skills for others to use.
- You want to teach Claude a domain-specific way of working.
- You are reviewing a skill someone wrote and need a quality bar.

## When NOT to use

- For one-off prompts (just write the prompt).
- For information that should live in system context, not progressive disclosure.
- For changing Claude's general behavior across all conversations (use Claude.ai settings or system prompts, not skills).
- For replacing tool calls (skills are instructions, not tools).

## Required inputs

- The task or workflow you want to encode.
- The audience: who will trigger this skill, in what kind of conversation.
- Existing artifacts: prompts you have used, docs you have written, examples of good output.

## What a skill actually is

A Skill is a folder with a `SKILL.md` file. The SKILL.md has YAML frontmatter (name and description) and a body with instructions. It can also include reference files, scripts, or templates that get loaded when needed.

The key property: **progressive disclosure**. Claude does not read every skill on every turn. The skill description lives in the system prompt. The SKILL.md body and references load only when the skill is triggered. This is what lets a user have hundreds of skills without polluting context.

What this means for you:

- The **description** is everything for triggering. Get it right or the skill never loads.
- The **SKILL.md body** is for the workflow itself.
- The **references** are for content that does not need to be in every invocation: long checklists, templates, examples, deep reference material.

## The 6-phase walkthrough

### Phase 1: Decide if a skill is the right shape

Not everything should be a skill. Run this test:

| Sign it should be a skill | Sign it should not be |
| --- | --- |
| You repeat the same workflow 5+ times. | You used it once. |
| The output benefits from a consistent structure. | Each output is bespoke. |
| The task has a clear trigger (a question shape, a file type, a domain). | The task is part of every conversation already. |
| The instructions exceed 200 words. | A one-line system instruction would do. |
| Templates or reference material would help. | Pure prose is enough. |
| Other people might benefit from the same workflow. | Only relevant to your single project. |

If most of your answers are in the left column, build a skill. Otherwise, use a saved prompt or a system instruction.

### Phase 2: Define the trigger

Before writing anything, ask: when should this skill load?

Be concrete. Write down the exact phrases or situations that should trigger it. Examples:

- "When the user asks for a creative brief, kickoff doc, or project brief."
- "When the user uploads a CSV and wants tabular analysis."
- "When the user asks 'how do I rank for X', 'should I add schema', or anything SEO-related."
- "When the user mentions they want to pick a vendor or compare tools."

The trigger is your description's job. If you cannot articulate the trigger crisply, the skill will not load reliably.

### Phase 3: Write the description

This is the most important sentence (or two) in your skill. The description is what Claude sees in the system prompt to decide whether to load the skill.

Good descriptions have 4 parts:

1. **What it does** (one sentence, action-oriented).
2. **When to use it** (the trigger phrases or situations).
3. **Edge cases** with "Also triggers when..." (catches less obvious situations).
4. **Useful for...** (audience or use cases, helps disambiguation).

Bad description:

> "Helps with SEO."

Why it fails: vague, no trigger phrases, will not fire when the user actually needs it.

Good description:

> "Audit on-page SEO of a single URL or a small set of pages. Use when the user asks for a page audit, wants to optimize titles and meta descriptions, asks 'why is this page not ranking', or shares a URL and asks what is wrong with it. Also triggers when the user mentions Core Web Vitals, internal linking, or schema markup. Useful for both individual page reviews and small-batch audits."

Why it works: specific actions, multiple trigger phrases, edge cases, audience clarity.

### Phase 4: Structure the SKILL.md body

A consistent structure makes skills readable, maintainable, and AI-friendly. The pattern below works for most skills:

```
---
name: [your-skill-name]
description: [your description]
---

[One-sentence purpose statement]

## When to use
[Bulleted list of trigger situations]

## When NOT to use
[Bulleted list, ideally redirecting to sibling skills]

## Required inputs
[What Claude needs from the user to run this skill]

## The framework
[The durable IP: the model, the steps, the dimensions, the layers]

## Workflow
[Numbered steps Claude follows]

## Failure patterns
[Common mistakes to avoid or push back on]

## Output format
[What the deliverable looks like]

## Reference files
[List of files in the references/ folder with descriptions]
```

Not every skill needs every section. Some skills are pure how-to and skip "framework". Some skills are heavy on examples and add an "Examples" section. Use the structure as a starting point, adapt as needed.

### Phase 5: Add references for what does not belong in SKILL.md

References are the second tier of progressive disclosure. They load when Claude reads them, not by default.

Use references for:

- Long checklists (a 100-item audit checklist).
- Templates with worked examples.
- Detailed playbooks for specific scenarios.
- Reference material like spec links, glossaries, decision tables.
- Anything over 100 lines that not every invocation needs.

Each reference should be standalone. A reader (or Claude) should be able to use it without reading the SKILL.md first, given the context the skill provides.

Naming patterns that work:

- `references/[noun]-template.md` for templates.
- `references/[noun]-checklist.md` for checklists.
- `references/[noun]-playbook.md` for end-to-end runbooks.
- `references/example-[scenario].md` for worked examples.

Reference your reference files from the SKILL.md "Reference files" section with a one-line description of each.

### Phase 6: Test and iterate

Skills do not work the first time. Plan to iterate.

Testing checklist:

- [ ] Trigger test: in a fresh conversation, write the trigger phrase. Does the skill load? If not, the description is too narrow or wrong.
- [ ] Edge case test: write something that should trigger via the "Also triggers when..." clause. Does it fire?
- [ ] False positive test: write something close but not actually relevant. Does the skill avoid loading? If it always loads, your description is too broad.
- [ ] Output test: run the skill on a real task. Is the output what you expected?
- [ ] Length test: is the SKILL.md staying under 250 lines? Are references under 400 lines? If not, split or trim.

After testing, common fixes:

- Skill not triggering → broaden the description, add explicit phrases, add "Also triggers when..."
- Skill triggering too often → narrow the description, add "Do not trigger when...", be more specific about audience.
- Output is generic → add a clearer framework or workflow with more specifics.
- Reference is overwhelming → split into multiple references, keep each focused.

## Anatomy of the description: a deeper look

The description is hard to get right. Here is the formula in detail.

### Sentence 1: What it does

Lead with the verb. Be specific.

- Good: "Audit on-page SEO."
- Bad: "Help with SEO things."

### Sentence 2: When to use it

State the primary triggers. Use phrases users would actually say.

- Good: "Use when the user asks for a page audit, wants to optimize titles and meta descriptions, or asks 'why is this page not ranking'."
- Bad: "Use for SEO improvements."

### Sentence 3: "Also triggers when..."

Catch the secondary triggers and edge cases.

- Good: "Also triggers when the user mentions Core Web Vitals, internal linking, or schema markup."
- Bad: (omitted)

### Sentence 4: Useful for...

Explain audience or scope to help with disambiguation.

- Good: "Useful for both individual page reviews and small-batch audits."
- Bad: (omitted)

If your skill description is one sentence, it is probably not specific enough.

## Worked example: building a skill from scratch

Imagine you keep writing technical post-mortem documents and want to skill-ify it.

**Step 1: Decide it's a skill.** You write 5+ post-mortems a year, output benefits from consistency, others on the team would use it. Yes, build a skill.

**Step 2: Trigger.** "When the user wants to write a post-mortem, retrospective, or after-action report. When an incident has happened and we are reviewing what went wrong."

**Step 3: Description.**

> "Write a structured post-mortem after an incident, outage, or significant project failure. Use when the user mentions post-mortem, retrospective, after-action report, RCA, or asks 'why did this go wrong' after an incident. Also triggers when the user wants to capture lessons learned from a launch, project miss, or incident debrief. Useful for technical incidents, project retros, and team learning reviews."

**Step 4: SKILL.md body.** Use the standard structure. Required inputs (timeline, impact, contributors). The framework (Five Whys, contributing factors, action items). Workflow (gather facts, draft, review, distribute). Failure patterns (blame, vague action items, no follow-up).

**Step 5: References.** A `post-mortem-template.md` with the document structure and a `facilitator-checklist.md` for running the post-mortem meeting.

**Step 6: Test.** Trigger on "we had an outage yesterday, can you help me write the post-mortem?" Should fire. Trigger on "what is a post-mortem?" Should probably also fire. Trigger on "let's review the quarter". Should not fire (this is a different kind of retro).

You iterate until the triggers fire correctly, then ship.

## Failure patterns

- **Description too narrow.** The skill never fires because your description requires exact phrases the user does not say.
- **Description too broad.** The skill fires constantly, including for unrelated tasks.
- **No trigger phrases.** The description describes what the skill does but not when to load it. Triggering is unreliable.
- **SKILL.md too long.** A 1,000-line SKILL.md defeats the purpose of progressive disclosure. Split into references.
- **References that duplicate SKILL.md.** If a reference repeats what the body says, prune one.
- **No "When NOT to use".** Skills that overlap with sibling skills get loaded ambiguously. Cross-reference siblings explicitly.
- **No examples.** A framework without a worked example is hard to apply. Include at least one in the reference material.
- **Optimizing for one example.** A skill written around your single use case fails at adjacent ones. Generalize.
- **No iteration.** Shipping a skill once and never revisiting it. Skills decay. Audit yearly.
- **Branding or product-specific assumptions in a public skill.** Skills meant to be general should not hardcode your stack.

## Output format

When using this skill to create another skill, deliver:

1. **Trigger analysis**: a short list of phrases and situations that should fire the skill.
2. **Description draft**: the 2-4 sentence description for the YAML frontmatter.
3. **SKILL.md body**: the full body of the skill, following the standard structure.
4. **Reference plan**: a list of reference files to create with one-line descriptions.
5. **First reference file**: at least one reference written end to end as a starting point.
6. **Test plan**: 3-5 test prompts that should trigger the skill, plus 2-3 that should not.

## Reference files

- `references/skill-template.md`: A blank SKILL.md template with annotated section guidance, ready to copy and fill in.
- `references/description-cookbook.md`: A library of description patterns with worked examples for common skill types (audits, templates, frameworks, walkthroughs).

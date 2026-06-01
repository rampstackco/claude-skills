# Skill template

A blank SKILL.md template with annotated guidance. Copy this, fill it in, and you have a skill that fits the pattern.

## How to use this template

1. Copy the YAML and structure below into a new file at `your-skill-name/SKILL.md`.
2. Replace the placeholder text in `[brackets]`.
3. Delete sections you do not need (most skills do not need every section).
4. Read the annotations to understand what each section is doing.
5. Test the skill on a real task. Iterate.

## The template

```
---
name: [your-skill-name]
description: [2-4 sentences. What the skill does. When to use it. "Also triggers when..." for edge cases. "Useful for..." for audience clarity.]
---

[One-sentence purpose statement. What this skill exists to do.]

## When to use

- [Trigger situation 1]
- [Trigger situation 2]
- [Trigger situation 3]
- [Trigger situation 4]

## When NOT to use

- [Situation that looks similar but should use a different skill]
- [Situation that is out of scope for this skill]
- [Sibling skill cross-reference: "For X, use the [other-skill] skill."]

## Required inputs

- [Information Claude needs from the user before it can do good work]
- [Or context Claude needs to gather]
- [Or files, links, or examples needed]

## The framework

[The durable IP. The model, dimensions, layers, principles that make this skill different from a freeform response. This is where the skill earns its keep.]

[Format options: numbered list of layers, table of dimensions, hierarchy of concepts. Pick what fits the content.]

## Workflow

1. [First step Claude takes]
2. [Second step]
3. [Third step]
4. [...]
5. [Final step or output]

## Failure patterns

- **[Common mistake]**: [Why it happens, how to avoid].
- **[Common mistake]**: [Why it happens, how to avoid].
- **[Common mistake]**: [Why it happens, how to avoid].

## Output format

Deliverables from this skill:

1. **[Artifact 1]**: [What it is].
2. **[Artifact 2]**: [What it is].
3. **[Artifact 3]**: [What it is].

[Optional: notes on format, length, or delivery mechanism.]

## Reference files

- `references/[name].md`: [One-line description of what is in this reference].
- `references/[name].md`: [One-line description].
```

## Annotations: what each section is for

### YAML frontmatter

The `name` should match the folder name and use lowercase hyphens. The `description` is the most important field in the entire skill. It is what Claude sees in the system prompt to decide whether to load the skill body. Be specific about triggers.

### Purpose statement (one sentence)

This is the elevator pitch. A reader should know what the skill does after this one sentence. If you cannot summarize it in a sentence, the skill may be doing too much.

### When to use

Be concrete. List the actual situations where the skill should fire. These map to the trigger phrases in the description but in more detail.

### When NOT to use

Just as important as "when to use". This is where you redirect to sibling skills and prevent overlap. Without this section, related skills compete and Claude makes ambiguous choices.

### Required inputs

What does Claude need before it can do good work with this skill? Sometimes this is information ("the URL to audit"). Sometimes it is context ("the user's audience"). Listing it explicitly helps Claude ask the right question if it is missing.

### The framework

This is the durable IP. The thing that makes your skill better than a generic LLM response on the topic. A model, a set of dimensions, a hierarchy, a checklist of layers.

If you cannot articulate the framework, the skill may be more about output structure than methodology. That is fine. Skip this section.

### Workflow

The numbered steps Claude follows when running the skill. Should be repeatable across different invocations. If the steps differ wildly per use case, you may need multiple skills or a more abstract framework.

### Failure patterns

What goes wrong in practice. This section is what makes a skill feel earned. It signals "we have done this many times and these are the mistakes". Specific failure patterns are more useful than abstract ones.

### Output format

What the deliverable looks like. Not "good output" - actually structured and named. This is what Claude produces at the end.

### Reference files

The list of `references/` files with brief descriptions. Each reference should be standalone and useful even if read out of order.

## Sizing guidance

| Component | Target | Hard limit |
| --- | --- | --- |
| Description | 2-4 sentences | 1 paragraph |
| SKILL.md total | Under 250 lines | 500 lines |
| Single reference file | Under 400 lines | 800 lines |
| Number of references | 1-3 | 5 |

If you are over the targets, split or trim. Skills get heavier and more brittle as they grow.

## Naming conventions

- Skill folder: `lowercase-hyphenated`
- SKILL.md: always exactly `SKILL.md` (case-sensitive)
- References: `references/[name].md`
- Templates: `[noun]-template.md`
- Checklists: `[noun]-checklist.md`
- Playbooks: `[noun]-playbook.md`
- Examples: `example-[scenario].md`

## Common adaptations

Not every skill needs the standard structure. Examples of valid adaptations:

- **Pure how-to skill**: skip the "framework" section, lead with workflow.
- **Pure template skill**: skip framework and workflow, focus on the structure of the output.
- **Audit skill**: heavy on the framework (the dimensions to score), lighter on workflow.
- **Walkthrough skill**: numbered phases as the spine, no separate framework section.
- **Decision skill**: heavy on options and tradeoffs, lighter on workflow.

The structure exists to make sure you cover the right ground. If a section does not earn its place, drop it. But know what you are dropping and why.

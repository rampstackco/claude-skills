# Doc Types Guide

The four categories of documentation, what each is for, and a template for each. Based on the Diátaxis framework (well-known in technical writing).

The categories aren't interchangeable. Mixing them is the most common failure in documentation: a "tutorial" that's actually reference, a "how-to" that's secretly explanation, a "reference" that meanders into tutorial territory.

---

## The four types

| Type | Purpose | Reader needs | Style |
|---|---|---|---|
| Reference | Look up facts | "What is the value of X?" | Comprehensive, terse |
| How-to | Solve a specific problem | "How do I do Y?" | Step-by-step, focused |
| Explanation | Understand the why | "Why does Z work this way?" | Discursive, narrative |
| Tutorial | Learn from zero | "How do I get started?" | Hands-on, sequenced |

A useful diagram of how they relate:

```
                Practical (action)
                       |
    HOW-TO  ───────────|─────────── REFERENCE
                       |
                       |  
                Theoretical (understanding)  
                       |
   TUTORIAL ───────────|─────────── EXPLANATION
                       |
              Study (acquiring skill)         Work (applying skill)
```

- Tutorial and how-to are practical (the reader is doing something)
- Reference and explanation are theoretical (the reader is understanding something)
- Tutorial and explanation are study-oriented (acquiring skill or understanding)
- How-to and reference are work-oriented (applying skill)

---

## Reference

### What it is

The complete catalog of facts about something. Looked up when needed.

### Examples

- API reference (every endpoint, every parameter, every response)
- Configuration options (every flag, every default, every effect)
- Glossary (every term, definition)
- Error code catalog
- Component library docs

### What makes it good

- Comprehensive (covers everything)
- Accurate (verified against the actual system)
- Consistently structured (each entry follows the same pattern)
- Searchable (people find what they need quickly)
- Stable links (entries don't move or disappear without redirects)

### What makes it bad

- Editorializing ("This is the best way...")
- Tutorials interleaved (reader looking up a fact gets a wall of explanation)
- Inconsistent depth (some entries thorough, others sparse)
- Out of date (single most common reference failure)

### Template

```
# [Function / Endpoint / Setting / Term]

**Type:** [function / endpoint / configuration / etc.]
**Since:** [version introduced]
**Status:** [stable / beta / deprecated]

## Description

[1-2 sentences. What this is.]

## [Parameters / Inputs / Properties]

| Name | Type | Default | Description |
|---|---|---|---|
| [name] | [type] | [default] | [description] |

## [Returns / Output]

[Description of return value or output.]

## Examples

[Minimum useful example.]

## Notes

- [Edge case]
- [Gotcha]
- [Related: link to related reference]
```

---

## How-to

### What it is

A guide to accomplishing a specific task. The reader has a problem; the how-to gives the solution.

### Examples

- "How to deploy to production"
- "How to reset a forgotten password"
- "How to add a new locale"
- "How to migrate data from system A to system B"

### What makes it good

- Goal-oriented (solves a specific problem)
- Sequential (steps in order)
- Tested (someone other than the author followed it)
- Includes prerequisites
- Includes troubleshooting for known issues
- Realistic (uses real values, not placeholders that confuse)

### What makes it bad

- Mixed with explanation (the reader wants to act, not understand the design)
- Too generic (steps don't apply cleanly to the actual situation)
- Out of date (commands no longer work)
- Missing prerequisites (reader gets stuck on step 2 because of an unstated dependency)
- Too many branches ("If X then..., else if Y then..."; usually means it should be split into multiple how-tos)

### Template

```
# How to [Specific Task]

## Goal

[1 sentence: what the reader will accomplish.]

## Before you start

- [Prerequisite 1]
- [Prerequisite 2]
- [Prerequisite 3]

## Steps

### 1. [First step]

[Action description]

```
[Command or example]
```

[Expected outcome of this step]

### 2. [Second step]

[Action description]

```
[Command or example]
```

[Expected outcome of this step]

### 3. [Third step]

[...]

## Verify

[How to confirm the task succeeded.]

## Troubleshooting

**Problem: [Common issue]**

[Cause and resolution.]

**Problem: [Common issue]**

[Cause and resolution.]

## See also

- [Related how-to]
- [Related reference]
```

---

## Explanation

### What it is

The why. Discursive. Helps the reader understand the design, the rationale, the tradeoffs.

### Examples

- Architecture documents
- Design rationale
- Decision records (ADRs)
- "Why we don't support feature X"
- Strategy documents
- Conceptual overviews

### What makes it good

- Captures the why (not just the what)
- Honest about tradeoffs (every design choice has a cost)
- Includes alternatives considered
- Time-stamped (so readers know when this was true)
- Connects to other concepts

### What makes it bad

- Lecture-y (reader feels talked down to)
- Ahistorical (no context of why decisions were made)
- Marketing voice (everything is "great" and "exciting")
- Buried in how-to (reader is trying to do something; explanation slows them down)

### Template (ADR specifically)

```
# ADR-NNN: [Title of decision]

**Status:** [Proposed / Accepted / Deprecated / Superseded by ADR-MMM]
**Date:** [YYYY-MM-DD]
**Deciders:** [Who was involved]

## Context

[What's the situation? What's the problem? What forces are at play?]

[Include enough context that a reader new to this can understand. Don't assume the present-day context will be obvious in the future.]

## Decision

[What was decided. State it clearly.]

## Alternatives considered

### Alternative A: [Name]

[Description, why not chosen.]

### Alternative B: [Name]

[Description, why not chosen.]

## Consequences

### Positive

- [What's better as a result]
- [What's better as a result]

### Negative

- [What's worse or constrained as a result]
- [What's worse or constrained as a result]

### Neutral / mixed

- [Tradeoffs that aren't clearly good or bad]

## Notes

[Anything else relevant. Links to discussion threads, prototypes, related decisions.]
```

### Template (general explanation doc)

```
# [Topic]

## What this is

[2-3 sentences orienting the reader.]

## Background

[The context. What was true before. Why this came up.]

## How it works

[The substance. Walk through the design, the model, the structure. Use diagrams.]

## Why this approach

[The rationale. What we considered. What we chose and why.]

## Tradeoffs

[Honest accounting of what's good and bad about this approach.]

## See also

[Related explanation, related decisions, related reference.]
```

---

## Tutorial

### What it is

Learning by doing. The reader starts with no knowledge of the topic and finishes capable of using it.

### Examples

- "Getting started with our SDK"
- "Your first deployment"
- Onboarding pathways for new team members
- "Building your first integration"

### What makes it good

- Sequenced from simple to complex
- Hands-on (the reader does things, not just reads)
- Concrete (real values, real commands, real outcomes)
- Has clear completion criteria
- Builds on a single thread (one project, one example)
- Acknowledges where the reader is (beginner)

### What makes it bad

- Reference dressed up as tutorial (no thread, no completion)
- Skips steps "for brevity" (reader gets stuck)
- Uses placeholders like `<your-value-here>` without making them concrete
- Assumes prior knowledge that wasn't stated as prerequisite
- Branches early ("if you want X, do this; if Y, do this") instead of staying focused

### Template

```
# Getting started with [Thing]

## What you'll build

[1-2 sentences describing the end state. Maybe a screenshot or example output.]

## Time required

[Realistic estimate, e.g. "30-45 minutes"]

## Before you start

- [Prerequisite, with how to check]
- [Prerequisite, with how to check]
- [Prerequisite, with how to check]

## Step 1: [First milestone]

[Plain-English description of what we're doing in this step.]

[Concrete instructions:]

```
[Specific command]
```

[What you should see:]

```
[Expected output]
```

If something different happens, see [Troubleshooting section].

## Step 2: [Second milestone]

[Same pattern.]

## Step 3: [Third milestone]

[Same pattern.]

[...]

## What you've built

[Recap. The reader should feel: I get it now.]

## Where to go next

- [Next tutorial]
- [Reference for what you just used]
- [How-to for related task]

## Troubleshooting

**[Specific problem someone might hit]**

[Cause and resolution.]
```

---

## How to use this in practice

### When writing new docs

Identify which type before starting. Don't mix.

If a doc has tutorial sections AND reference sections AND explanation sections, it's three docs. Split.

### When auditing existing docs

For each existing doc, ask: which type is this trying to be?

If it's mixed, split. The split is usually: keep the dominant type in the original, link to the other types.

### When linking between types

The four types reinforce each other:
- Tutorials link to reference for the things they introduce
- How-tos link to reference for the commands they use
- Reference links to explanation for the why
- Explanation links to how-to for "to do this, see..."

A connected web of all four serves the reader well.

### When choosing the type for a need

| Reader is asking | Type |
|---|---|
| "What does X mean?" | Reference |
| "What's the syntax for X?" | Reference |
| "How do I do Y?" | How-to |
| "How do I solve [specific problem]?" | How-to |
| "Why does Z work this way?" | Explanation |
| "What did we decide about W?" | Explanation (ADR) |
| "I'm new; where do I start?" | Tutorial |

If the answer is "all of the above," the reader actually needs multiple docs, not one mega-doc.

---

## Anti-patterns to recognize

- **The "everything" doc:** tries to be all four types. Reads like all four poorly.
- **The "guide" doc:** vague title, vague purpose. Often a how-to that lost focus.
- **The "manual" doc:** monolithic. Unmaintainable. Split.
- **The "wiki page that became sacred:** historical accumulation. Past usefulness. Audit and split or archive.

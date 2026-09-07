# Description cookbook

The skill description is the single most important sentence (or paragraph) in your skill. It is what Claude sees in the system prompt to decide whether to load the rest of the skill. If the description is wrong, the skill never fires when it should, or fires when it should not.

This cookbook gives you description patterns for common skill types, each with a worked example.

## The 4-part formula

A reliable description has 4 parts:

1. **Action**: what the skill does (verb-led, specific).
2. **Primary triggers**: when to use it (the obvious cases).
3. **Edge cases**: secondary triggers introduced with "Also triggers when...".
4. **Audience or scope**: who this serves, introduced with "Useful for...".

Not every skill needs all four parts. Most benefit from at least three.

## Pattern 1: The audit skill

For skills that evaluate something against a rubric.

### Template

```
[Verb] [the thing] for [purpose]. Use when the user asks for [a concrete request], wants to [common task], or asks "[likely user phrasing]". Also triggers when the user mentions [related concepts] or shares [input that implies the audit]. Useful for [scope: one-off vs ongoing, individual vs batch].
```

### Worked example

```
Audit on-page SEO of a single URL or a small set of pages. Use when the user asks for a page audit, wants to optimize titles and meta descriptions, or asks "why is this page not ranking". Also triggers when the user mentions Core Web Vitals, internal linking, or schema markup. Useful for both individual page reviews and small-batch audits.
```

Why this works:

- "Audit" is a clear verb.
- The "on a single URL or a small set of pages" sets scope, which prevents this from competing with bulk audit skills.
- Three primary triggers in different phrasings.
- "Also triggers when..." catches secondary signals.
- "Useful for..." narrows the use case.

## Pattern 2: The template or generator skill

For skills that produce a structured artifact.

### Template

```
Generate [the artifact] following [methodology or structure]. Use when the user asks to write [artifact name], needs [related deliverable], or describes [the work this artifact captures]. Also triggers when the user has [precondition] and is preparing to [downstream action]. Useful for [audience or use case].
```

### Worked example

```
Generate a creative brief that aligns stakeholders before a project starts. Use when the user asks to write a brief, kickoff doc, or project brief, or describes a project that has a goal but no shared context document. Also triggers when the user is starting design or development work without an agreed scope. Useful for individual project briefs and recurring brief templates.
```

Why this works:

- "Generate" is the verb.
- "That aligns stakeholders before a project starts" tells Claude the context.
- Multiple ways the user might phrase the request.
- The "also triggers" catches the upstream signal (no shared context yet).

## Pattern 3: The framework or methodology skill

For skills that teach or apply a way of thinking.

### Template

```
Apply [framework name or shape] to [the problem]. Use when the user is [the situation], asks "[likely question]", or needs to think through [the kind of decision]. Also triggers when [secondary condition]. Useful for [scope].
```

### Worked example

```
Apply the Diataxis framework to documentation problems: separate tutorials, how-to guides, references, and explanations. Use when the user is reorganizing docs, asks "where should I put this", or has docs that try to do too much at once. Also triggers when the user is starting a fresh docs site and needs a content structure. Useful for both internal and external documentation.
```

Why this works:

- Names the framework explicitly.
- Concrete trigger phrases.
- "Has docs that try to do too much at once" is a specific symptom that maps to this framework.

## Pattern 4: The walkthrough or playbook skill

For skills that take the user through a multi-step process.

### Template

```
Walk through [the process] step by step. Use when the user is [the situation], asks how to [the goal], or needs a structured approach to [complex task]. Also triggers when [edge case]. Useful for [first-time vs repeat use, individuals vs teams].
```

### Worked example

```
Walk through a domain migration step by step, including DNS, redirects, content mapping, and post-launch validation. Use when the user is moving content between platforms, changing domains, or restructuring URLs at scale. Also triggers when the user mentions hreflang updates, sitemap regeneration, or 301 redirect maps. Useful for both small migrations (a few hundred URLs) and large ones (tens of thousands).
```

Why this works:

- "Step by step" sets expectation.
- Names the components ("DNS, redirects, content mapping, and post-launch validation") so users with one of these in mind still trigger correctly.
- Scale guidance in "useful for" helps with disambiguation.

## Pattern 5: The decision or evaluation skill

For skills that help the user pick between options.

### Template

```
Compare [option type] and recommend [outcome]. Use when the user is choosing between [options], asks "[option A] vs [option B]", or needs to decide [the question]. Also triggers when [renewal/replacement/scaling situation]. Useful for [scope].
```

### Worked example

```
Compare vendors and recommend a pick for a specific job. Use when the user is choosing between SaaS tools, asks "X vs Y", or needs to evaluate options before signing a contract. Also triggers when an existing vendor is up for renewal or being replaced. Useful for both small SaaS decisions and large infrastructure choices.
```

Why this works:

- "Compare and recommend" frames the action.
- Multiple trigger phrasings.
- "Also triggers when..." catches the renewal/replacement situation that often forces a decision.

## Pattern 6: The diagnostic or troubleshooting skill

For skills that help find what is wrong.

### Template

```
Diagnose [the problem class] and propose fixes. Use when the user reports [symptom], asks "why is [thing] [bad state]", or shares [evidence of the problem]. Also triggers when [related signal]. Useful for [scope of diagnosis].
```

### Worked example

```
Diagnose slow page performance and propose specific fixes. Use when the user reports slow load times, asks "why is my site slow", or shares a Core Web Vitals report. Also triggers when the user mentions Lighthouse scores, LCP, INP, or CLS issues. Useful for both individual page diagnosis and site-wide performance reviews.
```

Why this works:

- "Diagnose and propose fixes" is the action.
- Catches the user's likely phrasing ("why is my site slow").
- Catches technical phrasings (Core Web Vitals report, Lighthouse, specific metric names).

## Pattern 7: The strategy or planning skill

For skills that produce a plan or strategy.

### Template

```
Design [the plan or strategy] for [outcome]. Use when the user is [the situation], asks for a [plan / strategy / roadmap], or needs to align [stakeholders or work] around [the goal]. Also triggers when [precondition or constraint]. Useful for [scope].
```

### Worked example

```
Design a content strategy that supports a specific business goal. Use when the user is starting a content program, asks for an editorial plan, or needs to align content production with marketing or SEO objectives. Also triggers when the user mentions topical authority, content calendar, or pillar pages. Useful for both new programs and reboots of stalled ones.
```

Why this works:

- "Design a content strategy that supports a specific business goal" sets the action and the constraint.
- Catches both fresh starts and reboots in "useful for".

## Anti-patterns: descriptions that fail

### "Helps with X"

Too vague. No triggers. Will fire constantly or never.

### "When the user wants help with technical SEO and on-page SEO and off-page SEO"

Too broad. Should be split into multiple skills or narrowed.

### "Use when the user mentions XYZ"

Too narrow. Real users will not always use the exact phrase.

### "Comprehensive guide to [topic]"

Marketing copy, not a trigger. Does not tell Claude when to load.

### "[no description, just a name]"

The skill never loads except by accident.

## How to test a description

Before publishing:

1. Write down 5 prompts that should trigger the skill.
2. Write down 3 prompts that should not.
3. In a fresh conversation with the skill installed, try each prompt.
4. Check whether the skill loaded.
5. Adjust the description until trigger and non-trigger prompts behave correctly.

If a should-trigger prompt does not fire, broaden the description: add the phrasing the user used, add an "also triggers" clause.

If a should-not-trigger prompt fires, narrow the description: add scope boundaries, name the sibling skill the user actually wants, or add a "Do not trigger when..." clause if needed (most skill descriptions do not need this, but it is available).

## Final tip: match the user's vocabulary

Users do not say "perform an SEO audit". They say "can you check my page" or "is my site optimized". Your description should anticipate the user's vocabulary, not yours.

If your description is full of expert jargon and the user is a beginner, the skill will not fire. Use the words your audience actually says. Use jargon as a backup, not the lead.

# Skill Authoring Guide

This doc locks in the structure every skill in this repo follows. If you contribute a skill, it follows this pattern. If you fork the repo, this is the pattern to replicate.

Uniformity is the point. A reader should be able to pick up any skill and know where to look for the trigger description, the framework, the workflow, and the references. No surprises.

---

## File structure

```
skills/
  skill-name/
    SKILL.md              (required)
    references/           (recommended)
      template.md         (a fillable template the user can copy)
      checklist.md        (a runbook or checklist for the work)
      example.md          (one or two worked examples)
      [domain-deep-dive.md]  (optional: deeper reference content)
```

Skill folder names are lowercase, hyphenated, verb-noun or category-noun. `seo-onpage`, `brand-voice`, `code-review-web`. No org branding in skill names.

---

## SKILL.md structure

Every SKILL.md follows this exact section order. If a section does not apply, omit it cleanly. Do not invent new top-level sections.

The eight required headers are: `## When to use`, `## When NOT to use`, `## Required inputs`, `## The framework`, `## Workflow`, `## Failure patterns`, `## Output format`, `## Reference files`. Each header MUST start with the canonical text and MAY append a colon-suffix descriptive label (e.g., `## The framework: 5 phases`, `## The framework: brief structure`, `## Workflow for an active incident`). Do not rename the canonical word itself (no `## The brief structure` in place of `## The framework`).

**Optional `## Deep dive: [topic]` sections.** Teaching skills (skills whose primary job is to instruct the reader on a craft, not to produce a deliverable) MAY add `## Deep dive: [topic]` sections after `## Workflow` and before `## Failure patterns` for pedagogical depth that does not fit inside the canonical sections. The `Deep dive:` prefix is the only sanctioned non-canonical section pattern. Use it sparingly: most skills should not need any deep dives, and a skill with more than two is a signal the content should split into reference files. This is not a license for arbitrary section drift; the canonical eight still carry the load.

```markdown
---
name: skill-name
description: "A pushy, trigger-rich description. Two to four sentences. See description rules below."
---

# Skill Name

[One sentence purpose statement. What this skill does in plain language.]

---

## When to use

- [Bullet 1]
- [Bullet 2]
- [Bullet 3]

## When NOT to use

- [Bullet 1, with redirect to the right skill]
- [Bullet 2]

---

## Required inputs

[List of things the skill needs before producing output. If it can elicit them, say so.]

---

## The framework

[The core methodology. Could be sections, dimensions, layers, or steps. This is the durable IP of the skill.]

---

## Workflow

1. [Step 1]
2. [Step 2]
3. [Step 3]
...

---

## Failure patterns

[Patterns that signal the work is going wrong. What to push back on.]

---

## Output format

[What the deliverable looks like, where it goes, naming conventions.]

---

## Reference files

- `references/file.md` - [What it is and when to read it]
- `references/file.md` - [What it is and when to read it]
```

---

## Description rules

The description is the most important part of the skill. It is the only thing Claude reads on every turn. Good descriptions trigger reliably. Bad descriptions either over-trigger (annoying) or under-trigger (useless).

**Format:** 2 to 4 sentences, in quotes in the YAML frontmatter.

**Sentence 1:** What the skill does and the artifact it produces.

**Sentence 2:** Explicit "use this skill whenever the user..." with verbs and contexts.

**Sentence 3 (optional):** A list of trigger phrases ("Triggers on X, Y, Z"). Be generous. Cover synonyms, common typos, and casual phrasings.

**Sentence 4 (optional):** Edge case triggers. "Also triggers when the user [implicit case], even if they do not say [explicit term]."

**Be pushy.** Claude tends to under-trigger skills. The description should err toward triggering when relevant rather than waiting for a perfect match.

**Bad description:**
> "A skill for SEO audits."

**Good description:**
> "Run a comprehensive on-page SEO audit covering title tags, meta descriptions, header structure, content quality, internal links, image optimization, and URL hygiene. Use this skill whenever the user asks to optimize a page, audit on-page SEO, fix titles or meta tags, review headers, check internal linking, or improve a single URL's search performance. Triggers on on-page SEO, page audit, title tag, meta description, H1, header structure, internal links, image alt, URL slug, page optimization. Also triggers for any single-page review where ranking or click-through is the goal."

---

## Length rules

- **SKILL.md**: aim for under 250 lines. Hard cap at 500.
- **Reference files**: aim for under 400 lines. If longer, add a table of contents at the top.
- **Whole skill folder**: a reader should be able to scan everything in 15 minutes.

If a skill is bursting past these limits, that is a signal it should split into two skills.

---

## Voice and style rules

- **Punchy short sentences.** Default to declarative. Earn every long sentence.
- **No em dashes.** Use commas, parens, periods, or colons. (See `creative-brief/references/voice-and-tone-guide.md` for the full voice argument; we picked a side for this repo.)
- **Direct address.** Talk to the reader as "you." Talk about the user as "the user."
- **No hype words.** Skip "leverage," "synergy," "best-in-class," "cutting-edge," "revolutionary." If a sentence works without them, they were padding.
- **Concrete examples beat abstract advice.** If you write a principle, follow it with one specific example.

---

## Future-proofing rules

These skills are meant to age well. Five years from now, "your favorite framework" will be different. The principles will be the same.

**Do reference:**
- W3C and WHATWG specs (HTML, CSS, ARIA, HTTP)
- Schema.org vocabulary
- WCAG accessibility levels
- MDN Web Docs (for browser APIs)
- Nielsen Norman Group (for UX principles)
- Stable concepts: semantic HTML, progressive enhancement, REST, content security, signal-to-noise

**Do NOT reference:**
- Specific framework versions ("React 18", "Next.js 14") - say "your component framework" or give the principle
- Specific algorithm updates by name (they get superseded)
- Specific tool versions or pricing tiers (they change)
- This year's trending technique (it might not trend next year)
- Vendor-specific marketing terms

When you must name a tool, name 2 to 3 alternatives or write "your X tool of choice." This protects the reader who uses something you didn't think of.

---

## Stack-agnostic rules

Every skill must work for someone on Next.js, WordPress, Shopify, Webflow, plain HTML, or whatever comes next.

- **Default to principle.** "Set the canonical tag to the production URL" works everywhere. "Use the `metadata` export in app/layout.tsx" only works in Next.js App Router.
- **Stack-specific patterns go in reference files**, not SKILL.md. Name them clearly: `references/nextjs-patterns.md`, `references/wordpress-patterns.md`.
- **In SKILL.md, point at the reference**: "If using Next.js, see `references/nextjs-patterns.md` for the App Router and Pages Router equivalents."

---

## Reference files

Every skill should ship with at least one reference file. The strongest skills have three: a template, a checklist, and an example.

**Templates** are fillable. Copy and use. Markdown structure with bracketed fields the user replaces.

**Checklists** are runnable. Items the user (or Claude) verifies one by one before declaring the work done.

**Examples** are filled-in versions of the template, applied to a fictional but realistic case. Show what "good" looks like.

Reference files use the same voice and length rules as SKILL.md.

---

## Naming conventions

| Type | Pattern | Example |
|---|---|---|
| Skill folder | lowercase-hyphenated | `seo-onpage` |
| SKILL.md | exactly `SKILL.md` | `SKILL.md` |
| Template | `[noun]-template.md` | `audit-template.md` |
| Checklist | `[noun]-checklist.md` | `prelaunch-checklist.md` |
| Example | `example-[scenario].md` | `example-saas-brief.md` |
| Stack guide | `[stack]-patterns.md` | `nextjs-patterns.md` |
| Domain reference | `[topic]-guide.md` or `[topic]-reference.md` | `voice-and-tone-guide.md` |

---

## Triggering checklist

Before publishing a skill, run this check:

- [ ] Does the description name the artifact produced?
- [ ] Does the description list at least 5 trigger phrases?
- [ ] Does it cover at least one implicit trigger ("even if they do not say...")?
- [ ] Does the SKILL.md have a "When NOT to use" section that points at sibling skills?
- [ ] Is the framework section the durable IP, or is it filler?
- [ ] Does the workflow have numbered steps a reader can follow?
- [ ] Does the failure-patterns section call out specific bad inputs to push back on?
- [ ] Are reference files actually referenced from SKILL.md with guidance on when to read them?
- [ ] Does it work without any specific tool or framework named?
- [ ] Has someone (you) used it on a real project at least once before publishing?

If all 10 boxes check, ship it. If they don't, rewrite.

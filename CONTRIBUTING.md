# Contributing to Brand Build Skills for Claude

Thank you for considering a contribution. This library is opinionated by design: every skill follows the same structure, the same voice, and the same authoring conventions. That uniformity is what makes the skills compose cleanly. Contributions that respect those conventions are welcome.

If you have not read [SKILL_AUTHORING.md](SKILL_AUTHORING.md), start there. It is the source of truth for the skill structure and the bar for shipping.

---

## What we accept

- **New skills** that fill a real gap in the lifecycle and follow the uniform structure
- **Reference file improvements** to existing skills (better templates, deeper checklists, worked examples)
- **Bug fixes** in cross-references, broken internal links, typos, or stale information
- **Clarifications** to existing skills that improve trigger reliability or output quality

## What we will likely decline

- Stack-specific skills that hard-code one framework (Next.js-only, WordPress-only). The library is stack-agnostic by policy.
- Skills that duplicate an existing skill in scope. Check the catalog first.
- Skills that depend on a specific commercial tool, with the single exception of the SEO audit suite which depends on the Ahrefs MCP. New tool-bound skills need a strong justification.
- Marketing or promotional content disguised as a skill.

---

## Quick contribution steps

1. **Open an issue first** for any new skill or major change. This prevents wasted effort.
2. **Fork the repo.**
3. **Create a feature branch.** Name it descriptively: `add-skill-form-strategy`, `fix-broken-link-in-seo-keyword`, etc.
4. **Follow the uniform structure** documented in [SKILL_AUTHORING.md](SKILL_AUTHORING.md).
5. **Run the contributor checklist** below.
6. **Submit a PR** with a clear title, description, and link to the originating issue.

---

## Skill structure (the short version)

```
your-skill-name/
  SKILL.md
  references/
    template.md
    checklist.md
    example.md
```

Your `SKILL.md` must include this section order, in this exact order:

1. YAML frontmatter (`name`, `description`)
2. One-paragraph purpose statement
3. `## When to use`
4. `## When NOT to use`
5. `## Required inputs`
6. `## The framework`
7. `## Workflow`
8. `## Failure patterns`
9. `## Output format`
10. `## Reference files`

The full spec, with examples and rationale, lives in [SKILL_AUTHORING.md](SKILL_AUTHORING.md). The fastest path to writing a compliant skill is to use the [`skill-creation-walkthrough`](skills/skill-creation-walkthrough/SKILL.md) skill itself.

---

## Voice and style

The library has a specific voice. Match it.

- **Punchy short sentences.** Avoid run-ons.
- **No em dashes.** Use periods, colons, parentheses, or commas.
- **No first-person.** Neutral instructional voice.
- **Concrete examples beat abstract advice.** Failure patterns should name the mistake specifically, not generically.
- **Stack-agnostic.** Never hard-code framework versions in SKILL.md. Move stack-specific patterns to reference files if absolutely needed.
- **No emojis** unless the skill is explicitly about content where they fit (and even then, sparingly).
- **No private brand or company references.** Skills are public, so they should be generic.

---

## Contributor checklist

Before opening a PR, verify all of the following:

- [ ] Skill folder name is `lowercase-hyphenated`
- [ ] `SKILL.md` exists with valid YAML frontmatter
- [ ] `name` in frontmatter matches the folder name exactly
- [ ] `description` is 2-4 sentences with explicit triggers and an "Also triggers when..." line
- [ ] All 10 sections are present in the documented order
- [ ] At least one reference file exists in `references/`
- [ ] Reference files in the SKILL.md "Reference files" section match the actual files
- [ ] No em dashes anywhere (search files for U+2014)
- [ ] No vendor-specific framework references in the SKILL.md body
- [ ] No version-specific references (e.g., "Tailwind 4", "Next.js 15") in the SKILL.md body
- [ ] No private brand, personal handle, or proprietary domain references
- [ ] Cross-references to sibling skills name skills that actually exist
- [ ] `SKILL.md` is under 250 lines (hard cap 500)
- [ ] Each reference file is under 400 lines
- [ ] You have read at least one existing skill in a similar category and matched its style
- [ ] You added an entry to the catalog in `README.md` if your contribution is a new skill
- [ ] If you added a new skill, you ran a quick local search for trigger collisions with existing skills

---

## Pull request guidelines

- **One concept per PR.** Do not bundle a new skill, three bug fixes, and a refactor. Split them.
- **Clear PR title.** Format: `Add: [skill-name]`, `Fix: [short description]`, `Improve: [skill-name] reference file`.
- **Description includes:**
  - Link to the originating issue
  - What the contribution adds or changes
  - Why it earns its place (especially for new skills)
  - Any decisions you made that future maintainers should know about
- **Be patient.** This is a maintained library. Reviews take time.
- **Be open to feedback.** The reviewer's goal is uniformity and quality, not gatekeeping.

---

## Reviewing process

1. A maintainer reviews the PR for structural compliance, voice match, and substance.
2. Comments may be left for clarification or required changes.
3. Once approved, the PR is merged.
4. The catalog count in README.md and the skill folder structure are kept consistent.

---

## Code of conduct

Be respectful. Be constructive. Disagree on substance, not personality. Bad-faith contributions, harassment, or self-promotional spam will be closed without comment.

---

## Questions

Open a [GitHub Discussion](https://github.com/rampstackco/claude-skills/discussions) for general questions or proposals. Use [Issues](https://github.com/rampstackco/claude-skills/issues) for bugs and concrete change requests.

Thank you for contributing. The library gets better with every well-shaped addition.

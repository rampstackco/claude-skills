---
name: brand-style-guide
description: "Build or audit a comprehensive brand style guide that documents the full brand system including story, logo system, color, typography, imagery, voice, applications, and dos/don'ts. Use this skill whenever the user wants to create brand guidelines, document an existing brand, build a brand book, audit an existing style guide for completeness, or produce the artifact that other teams will reference for years. Triggers on style guide, brand guidelines, brand book, brand standards, brand manual, style sheet, brand documentation, brand reference. Also triggers when the brand identity is finished and needs to be documented for handoff to designers, developers, vendors, or future team members."
---

# Brand Style Guide

Document the brand system so other people can use it without ambiguity. This is the artifact that lives longest. Designers, developers, agencies, and vendors will reference it for years. Build it like a reference manual, not a presentation.

This skill assumes the brand identity is designed (run `brand-identity` first if not). The output of this skill is the canonical reference document.

---

## When to use

- Creating brand guidelines for a finished identity
- Documenting an existing brand that has no formal guide
- Auditing an existing style guide for gaps or inconsistencies
- Building a brand book to hand to vendors, partners, or new team members
- Updating a guide after a major brand evolution

## When NOT to use

- The brand identity is not yet designed (use `brand-identity`)
- Brand voice work specifically (use `brand-voice` for the voice doc, then integrate)
- Building UI components (use `design-standards` or `design-system`)

---

## Required inputs

- Finished brand identity (logo, colors, typography, imagery direction, motion principles)
- Brand voice and tone documentation (or sufficient inputs to write a voice section)
- Application examples that show the brand in real contexts
- Decisions on what is mandatory vs flexible vs forbidden

---

## The framework: 8 sections

A complete style guide has eight sections. Most guides skip 2 or 3 of them and create downstream confusion. Build all 8 from the start.

### 1. Story
The narrative behind the brand. Why it exists, what it stands for, what it rejects.

- Origin / founding story
- Mission and vision
- Values (3 to 5, with what each means in practice)
- Positioning statement
- Audience (with the level of specificity from the brief)
- What we are not (the things we explicitly reject)

### 2. Logo system
Every variant of every mark, with rules.

- Primary logo (with construction grid showing relationships)
- Wordmark
- Symbol / glyph
- Lockup variations (horizontal, stacked, etc.)
- Monogram (if part of system)
- Clear space rules (minimum spacing around logo)
- Minimum sizes (smallest acceptable size for print and digital)
- Acceptable color treatments (full color, single color, knock-out, reverse)
- Forbidden treatments (stretching, rotating, recoloring, drop shadows, gradients - whatever is forbidden)
- File formats and where to find them

### 3. Color
The full color system with rules.

- Primary palette (signature colors)
- Secondary palette
- Neutrals scale
- Semantic colors (success, warning, error, info)
- Light mode and dark mode variants
- Per color: hex, RGB, HSL, CMYK, Pantone (if print-relevant)
- Contrast ratios documented
- Allowed pairings
- Forbidden pairings
- Usage hierarchy (primary first, secondary supporting, neutrals dominant)

### 4. Typography
The full type system.

- Display typeface (with sample sizes)
- Body typeface (with sample sizes)
- Monospace (if applicable)
- Type scale (specific sizes used)
- Weight and style usage (which weights for which contexts)
- Line height ratios
- Letter spacing standards
- Web fallback stacks
- Open-source alternatives for licensing-restricted contexts
- Forbidden treatments (all caps overuse, fake italics, etc.)

### 5. Imagery and illustration
What pictures look like in this brand.

- Photography direction with example library
- Illustration style with example library
- Iconography system with the full icon set (or rules for adding to it)
- Forbidden imagery (stock photo cliches, specific things never to show)
- Photo treatment rules (color treatment, crops, composition)

### 6. Voice and tone
How the brand sounds. (Pulled from `brand-voice` work if done separately.)

- Voice attributes (3 to 5 adjectives with "we are X, not Y" framing)
- Tone shifts by context (onboarding, error, marketing, support, legal)
- Vocabulary preferences (words we use, words we avoid)
- Grammar and style rules
- Examples (good and bad copy side by side)

### 7. Applications
The brand applied to real contexts.

- Web (homepage, product pages, blog template)
- Email (template, signature, transactional)
- Social (post templates, profile imagery, story formats)
- Print (business cards, letterhead, print ads)
- Packaging (if applicable)
- Signage (if applicable)
- Internal documents (slides, reports, proposals)
- Each with examples showing what good looks like

### 8. Dos and don'ts
The boundaries, illustrated.

- Logo dos and don'ts (visual examples of correct and incorrect use)
- Color dos and don'ts (combinations to use, combinations to avoid)
- Type dos and don'ts (treatments to use, treatments to avoid)
- Composition dos and don'ts (layout patterns that work, ones that do not)
- Voice dos and don'ts (phrases that fit, phrases that do not)

The dos and don'ts section is what people actually reference in practice. Make it the easiest section to scan.

---

## Workflow

1. **Inventory the inputs.** What identity work is finished? What voice work is finished? What is missing?
2. **Confirm the format.** Is this a PDF, a web page, a Notion doc, a printed book, or all of the above? Different formats have different production requirements.
3. **Section by section, draft.** Use the template in `references/style-guide-template.md`.
4. **Stress-test with real examples.** For every rule, find a real application example. Rules without examples get ignored.
5. **Get review from the people who will use it.** Designers, developers, marketers. They will surface gaps.
6. **Version control.** Style guides evolve. Date the doc. Note what changed in each version.
7. **Publish in the format the team will actually open.** A 200-page PDF that lives on a shared drive is dead weight. A web page or Figma file with a clear URL gets used.

---

## Failure patterns

- **Skipping the "what we are not" sections.** Without rejection rules, anything becomes acceptable.
- **Document with no examples.** Rules without visual examples are abstract and ignored.
- **Document with only examples.** Examples without rules cannot be applied to new situations.
- **Static PDF that no one opens.** Ship the guide in the format the team uses daily (web page, Figma, Notion, etc.).
- **No version history.** When the brand evolves, no one knows which rules changed or when.
- **Aspirational rules.** Rules the brand does not actually follow get treated as suggestions. Document what is actually true, not what is wished.
- **Treating "dos and don'ts" as filler.** This section is what people use most. Invest in it.

---

## Output format

Default output is a multi-section markdown document or a structured set of files, plus a presentation-ready version (web page, PDF, or Figma) for sharing with stakeholders.

Recommended structure:

```
brand/
  style-guide.md          (the canonical document)
  story.md                (or as a section)
  logo/
    construction.md
    files/                (SVG, PNG, etc.)
  colors.md
  typography.md
  imagery/
    photography.md
    illustration.md
    icons/
      icons.md
      files/
  voice.md
  applications/
    web.md
    email.md
    social.md
    print.md
  dos-and-donts.md
```

For consumer-facing presentation, build a web page version that imports from these source files. The source files are canonical. The presentation is a view of them.

---

## Reference files

- `references/style-guide-template.md` - Fillable section-by-section template.
- `references/maintenance-playbook.md` - How to keep the guide current after launch.

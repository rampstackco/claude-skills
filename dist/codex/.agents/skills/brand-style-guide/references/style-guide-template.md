# [Brand Name] Style Guide

**Version:** [X.Y]
**Last updated:** [YYYY-MM-DD]
**Maintained by:** [Team or person]
**Format:** This document is canonical. Other formats (PDF, web page, Figma) are views of this document.

---

## How to use this guide

[1 to 2 paragraphs explaining what the guide is for, who it serves, and where to go with questions.]

**Quick links:**
- [Logo files](#logo-files)
- [Color values](#color-values)
- [Typography](#typography)
- [Voice cheat sheet](#voice)
- [Dos and don'ts](#dos-and-donts)

---

## 1. Story

### Origin
[1 to 3 paragraphs. Why this brand exists. The problem it solves. The moment it began.]

### Mission
[One sentence. What we are trying to do in the world.]

### Vision
[One sentence. The future we are pulling toward.]

### Values

We hold [N] values.

**[Value 1]**
[What it means in practice. 2 to 3 sentences. Include a behavioral example.]

**[Value 2]**
[Same structure.]

**[Value 3]**
[Same structure.]

### Positioning

[The positioning statement. One paragraph. What we offer, to whom, and what makes us different.]

### Audience

**Primary:** [Who, with specificity]

**Secondary:** [Who, briefly]

**Anti-personas:** [Who we are not for]

### What we are not

- [Thing we explicitly reject]
- [Thing we explicitly reject]
- [Thing we explicitly reject]

---

## 2. Logo system

### Primary logo

[Image of primary logo]

[Description: what it is, what it represents, when to use it.]

### Wordmark

[Image of wordmark]

[Description and usage.]

### Symbol / glyph

[Image of glyph]

[Description and usage.]

### Lockup variations

[Images of horizontal, stacked, square variants.]

### Construction

[Image showing construction grid, proportions, key relationships.]

### Clear space

[Image showing minimum clear space around the logo.]

The logo requires minimum clear space equal to [X] on all sides.

### Minimum sizes

| Format | Minimum size |
|---|---|
| Digital primary | [Xpx] wide |
| Print primary | [Xmm] wide |
| Favicon | [Xpx] |
| Mobile | [Xpx] |

### Color treatments

**Allowed:**
- Full color on white
- Full color on light backgrounds (with [contrast rule])
- Single color on light backgrounds
- White (knockout) on dark backgrounds
- Single color black

**Forbidden:**
- [Specific forbidden treatment with example image]
- [Specific forbidden treatment with example image]

### Logo files

| File | Use case | Path |
|---|---|---|
| logo-primary.svg | Web primary | /brand/logo/primary.svg |
| logo-wordmark.svg | Tight horizontal | /brand/logo/wordmark.svg |
| logo-symbol.svg | App icon, favicon | /brand/logo/symbol.svg |
| logo-monogram.svg | Tiny contexts | /brand/logo/monogram.svg |
| [more files] | | |

---

## 3. Color

### Primary palette

| Name | Hex | RGB | Use |
|---|---|---|---|
| [Name] | #XXXXXX | (R,G,B) | [Use case] |
| [Name] | #XXXXXX | (R,G,B) | [Use case] |

### Secondary palette

[Same table structure]

### Neutrals

[Same table structure]

### Semantic colors

| Name | Hex | Use |
|---|---|---|
| Success | #XXXXXX | Positive states, confirmations |
| Warning | #XXXXXX | Caution, attention needed |
| Error | #XXXXXX | Errors, destructive actions |
| Info | #XXXXXX | Neutral information |

### Dark mode variants

| Color | Light mode | Dark mode |
|---|---|---|
| Brand primary | #XXXXXX | #XXXXXX |
| Body text | #XXXXXX | #XXXXXX |
| Surface | #FFFFFF | #XXXXXX |

### Contrast ratios

[For each meaningful pairing, document the ratio and pass/fail.]

| Pairing | Ratio | WCAG |
|---|---|---|
| Brand primary on white | X.X:1 | Pass AA / Pass AAA |
| Body text on white | X.X:1 | Pass AA |

### Allowed pairings

[List or visual showing which colors work together.]

### Forbidden pairings

[List or visual showing combinations not to use.]

---

## 4. Typography

### Display typeface

**[Typeface name]**

[Sample at large size]

Used for: [Headlines, hero copy, brand moments]

Weights used: [list]

### Body typeface

**[Typeface name]**

[Sample at body size]

Used for: [Long-form reading, paragraphs]

Weights used: [list]

### Monospace (if applicable)

**[Typeface name]**

Used for: [Code, technical data]

### Type scale

| Step | Size | Weight | Line height | Letter spacing | Use |
|---|---|---|---|---|---|
| Display 1 | 64 | 700 | 1.0 | -0.02em | Hero headlines |
| Display 2 | 48 | 700 | 1.05 | -0.01em | Section headers |
| H1 | 36 | 700 | 1.1 | 0 | Page titles |
| H2 | 28 | 600 | 1.2 | 0 | Section titles |
| H3 | 22 | 600 | 1.3 | 0 | Sub-sections |
| Body Large | 18 | 400 | 1.5 | 0 | Lead paragraphs |
| Body | 16 | 400 | 1.6 | 0 | Default body |
| Small | 14 | 400 | 1.5 | 0 | Captions, metadata |
| Caption | 12 | 400 | 1.4 | 0.01em | Footnotes, labels |

### Web fallback stack

```
font-family: '[Brand display]', '[OS fallback 1]', '[OS fallback 2]', sans-serif;
```

### Open-source alternatives

For contexts where the licensed brand fonts are impractical (third-party tools, embeds), use:

- Display alternative: [Open-source typeface name]
- Body alternative: [Open-source typeface name]

### Forbidden treatments

- [No fake italics]
- [No fake bold]
- [No all-caps body text]
- [Other forbidden treatments]

---

## 5. Imagery and illustration

### Photography

**Subject matter:** [What we photograph]

**Style:** [Composition, lighting, color treatment]

**What we reject:** [Stock photo aesthetics, specific cliches]

**Examples:**
[Include 4 to 6 example images]

### Illustration

**Style:** [Description]

**Color use:** [Rules]

**Examples:**
[Include 4 to 6 example illustrations]

### Iconography

**Style:** [Filled / outline / mixed]

**Grid:** [Base grid size]

**Stroke weight:** [Specification]

**Set:**
[Include the icon set or rules for adding new icons]

---

## 6. Voice and tone

### Voice attributes

We sound: [adjective], [adjective], [adjective], [adjective], [adjective].

We do not sound: [opposite], [opposite], [opposite], [opposite], [opposite].

| We are | We are NOT |
|---|---|
| [Adjective] | [What it could tip into] |
| [Adjective] | [What it could tip into] |
| [Adjective] | [What it could tip into] |

### Tone shifts

| Context | Tone |
|---|---|
| Onboarding | [Description] |
| Error states | [Description] |
| Success states | [Description] |
| Marketing | [Description] |
| Support | [Description] |
| Legal | [Description] |

### Vocabulary preferences

**Use:** [Words and phrases that fit]

**Avoid:** [Words and phrases that do not fit]

### Sample copy

**Bad (off-voice):**
> [Example]

**Good (on-voice):**
> [Example]

---

## 7. Applications

### Web

[Show 2 to 3 example layouts: homepage, product page, blog template]

### Email

[Show template, signature, transactional examples]

### Social

[Show post templates, profile imagery, story formats]

### Print (if applicable)

[Show business cards, letterhead, print examples]

### Packaging (if applicable)

[Show packaging examples]

### Internal documents

[Show slide template, report template, proposal template]

---

## 8. Dos and don'ts

### Logo

| Do | Don't |
|---|---|
| [Visual example with caption] | [Visual example with caption] |
| | |

### Color

| Do | Don't |
|---|---|
| [Visual example] | [Visual example] |
| | |

### Type

| Do | Don't |
|---|---|
| [Visual example] | [Visual example] |
| | |

### Composition

| Do | Don't |
|---|---|
| [Visual example] | [Visual example] |
| | |

### Voice

| Do | Don't |
|---|---|
| "[Example phrase]" | "[Example phrase]" |
| | |

---

## Version history

| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial publication |

---

## Contact

Questions or requests for clarification: [contact info]

To suggest changes: [process]

---
name: brand-voice
description: "Develop or document a complete brand voice and tone system covering voice attributes, tone shifts by context, vocabulary preferences, grammar rules, and copy examples. Use this skill whenever the user wants to define how a brand sounds, write a voice and tone document, audit existing copy for voice consistency, train a team or AI assistant on brand voice, or refine the personality of brand writing. Triggers on brand voice, voice and tone, tone of voice, writing voice, brand personality, copy voice, voice document, voice guidelines, how should we write, voice training, voice audit. Also triggers when the user has copy that 'feels off' and the underlying issue is voice, even if not stated explicitly."
---

# Brand Voice

Define how a brand sounds in writing. Document it in a way that anyone (writer, designer, founder, AI assistant) can apply it consistently.

This skill produces a standalone voice document that can either live in the brand style guide or feed into it.

---

## When to use

- Defining brand voice for the first time
- Auditing existing copy for voice consistency
- Training a team, freelancer, or AI assistant on the brand voice
- Refining a voice that exists but is inconsistent across applications
- Adapting voice when a brand evolves (new audience, new positioning)

## When NOT to use

- Writing specific copy (use `content-and-copy`)
- Brand visual identity work (use `brand-identity`)
- Documenting a complete brand system (use `brand-style-guide`, which incorporates voice)
- Initial brand exploration (use `brand-ideation`)

---

## Required inputs

- The brand and its positioning
- The audience and what they need to hear
- 5 to 10 examples of existing brand writing (if any)
- 3 to 5 reference brands whose voice resonates with where this brand should go
- Any voice attributes already specified in the brief

---

## The framework: 4 layers

Voice has four layers, stacked. Each layer constrains the one below it.

### Layer 1: Voice attributes

The constants. The personality traits that define how the brand sounds across every context.

Pick 3 to 5 attributes. Pair each with what it is NOT (the failure mode if overdone).

Common attribute pairings (NOT a menu - generate your own):

- Confident, not arrogant
- Direct, not blunt
- Warm, not saccharine
- Witty, not sarcastic
- Smart, not academic
- Honest, not harsh
- Playful, not silly
- Practical, not boring
- Bold, not loud
- Curious, not unfocused

The "not" half is what saves writers from overshooting. "Confident" alone produces swagger. "Confident, not arrogant" tells writers where the line is.

### Layer 2: Tone shifts

Voice is constant. Tone adapts to context.

Map the major contexts the brand writes in. For each, document how voice expresses differently.

Common contexts:

| Context | Tone shift |
|---|---|
| Onboarding | Warmer, more enthusiastic, slightly slower pace |
| Hero / marketing | Confident, signature voice fully on |
| Product copy / UX | Direct, helpful, brief |
| Error messages | Calm, matter-of-fact, no apology theater |
| Success states | Brief celebration, redirect to next action |
| Empty states | Helpful, slightly playful, suggest action |
| 404 / not found | Self-aware, light, points the way home |
| Account deletion / cancellation | Quiet, respectful, no jokes |
| Pricing | Direct, transparent, confidence-inspiring |
| Legal / TOS | Plain language version sits next to the legal version |
| Support / help center | Patient, thorough, no condescension |
| Crisis communication | Calm, factual, accountable |
| Product announcements | Excited but not breathless |
| Email subject lines | Specific, never click-bait |

Voice stays consistent across all of these. Tone is what shifts.

### Layer 3: Vocabulary and grammar

The granular dial settings.

**Vocabulary preferences:**

- Words and phrases the brand uses
- Words and phrases the brand avoids
- Words the brand has redefined (if any) - e.g., a SaaS product calling its features "huddles" instead of "meetings"
- Industry jargon: keep it (signals expertise) or strip it (signals approachability)
- Sentence-opening preferences (some brands lean on imperatives, some on questions, some on statements)

**Grammar and style:**

- Contractions (use them = casual, avoid them = formal)
- Sentence length default (short = punchy, medium = considered, long = literary)
- Punctuation marks favored or avoided (em dash is famously polarizing)
- Pronouns ("we" / "you" / "I")
- Capitalization style (title case, sentence case, all-lowercase deliberate)
- Number formatting (spell out under ten, or always digits)
- Oxford comma (use or skip)
- Active vs passive voice (most brands prefer active)

### Layer 4: Examples and patterns

Voice is taught through examples, not rules. Build a library.

For each major content type, show:

- Bad example (off-voice)
- Good example (on-voice)
- Brief note on what changed

Common content types to cover:

- Headline
- Subheadline
- Hero CTA
- Feature description
- Testimonial intro
- Email subject line
- Email opening
- Push notification
- Error message
- Success message
- About page paragraph
- Social post
- Sales page paragraph

Aim for 15 to 25 paired examples. This is the most-used part of the voice doc in practice.

---

## Workflow

1. **Audit existing copy** if it exists. Identify what is on-brand, what is off, what patterns recur.
2. **Layer 1: Voice attributes.** Generate 5 to 8 candidates with "we are X, not Y" framing. Pick 3 to 5.
3. **Layer 2: Tone shifts.** List 8 to 15 contexts the brand writes in. Note the tone shift for each.
4. **Layer 3: Vocabulary and grammar.** Define preferences. Skip default rules unless they actually distinguish the brand.
5. **Layer 4: Examples.** Build the paired-example library. 15 to 25 minimum.
6. **Stress-test.** Pick a fresh writing brief and apply the voice doc. Does it produce on-voice copy? If not, the doc is incomplete.
7. **Document.** Use the template in `references/voice-document-template.md`.
8. **Distribute.** Voice docs only work if they get used. Make the doc easy to reference inline (link to it from CMS templates, brief templates, AI assistant prompts).

---

## Failure patterns

- **Generic attributes ("friendly, professional, approachable").** Every brand says this. Means nothing. Pick attributes that genuinely distinguish.
- **No "we are NOT" pairings.** Without the rejection, attributes drift toward extremes.
- **Voice doc with no examples.** Rules without examples cannot be applied.
- **Examples that are obviously bad and obviously good.** Real voice work shows nuanced shifts, not cartoonish before/after.
- **Skipping tone shifts.** Treating voice as one-size-fits-all leads to a brand that sounds wrong in error states or legal contexts.
- **Documenting aspirational voice.** If the brand does not actually sound this way today and has no plan to shift, the doc is fiction.
- **Voice without distribution.** A perfect doc that no one references is worth nothing.

---

## Output format

Default output is a markdown document at `voice.md` in the brand folder. Sections:

1. Voice attributes (with we-are-not pairings)
2. Tone shifts by context
3. Vocabulary preferences
4. Grammar and style rules
5. Paired examples library (the most-used section)
6. Anti-patterns (specific phrases or constructions to avoid)
7. References (the brands and writers we are inspired by)

This doc can stand alone or feed into `brand-style-guide`.

---

## Reference files

- `references/voice-document-template.md` - Fillable template.
- `references/voice-frameworks.md` - Detailed walkthrough of the Nielsen Norman 4 dimensions, Jung archetypes, and the "we are X not Y" approach.

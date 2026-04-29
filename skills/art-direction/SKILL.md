---
name: art-direction
description: "Direct visual and creative work for campaigns, photography, illustration, video, and branded experiences. Use this skill whenever the user wants to brief a photographer, direct illustrators, plan a creative campaign, develop visual concepts, write a creative direction document, or evaluate creative work for fit. Triggers on art direction, creative direction, photo brief, photography brief, illustration brief, campaign concept, creative concept, visual direction, mood board, look and feel, visual treatment, video direction. Also triggers when the user has approved brand identity but needs to extend it into specific creative deliverables."
---

# Art Direction

Direct creative work that extends the brand into specific deliverables. Photography, illustration, video, motion, campaigns, environmental design.

This skill assumes brand identity is approved (`brand-identity` complete). Art direction is about applying and extending it, not defining it.

---

## When to use

- Briefing photographers, illustrators, videographers
- Developing campaign creative concepts
- Directing in-house creative teams
- Writing creative direction documents for vendors
- Evaluating creative deliverables for brand fit
- Adapting brand visual identity to a new format or context

## When NOT to use

- Defining brand visual identity from scratch (use `brand-identity`)
- Day-to-day component design (use `design-standards`)
- Writing copy for creative work (use `content-and-copy` or `landing-page-copy`)
- Building a design system (use `design-system`)

---

## Required inputs

- The deliverable (photo shoot, illustration set, video, campaign)
- The brand identity (visual system, voice, imagery direction)
- The audience for this specific work
- The goal (brand awareness, conversion, education, emotional connection)
- Budget and timeline
- Distribution context (where it will be seen)

---

## The framework: 5 layers

A creative brief covers five layers. Each must be clear before the brief leaves your hands.

### 1. The story

What this creative work is fundamentally about.

- **The premise.** The core idea in one sentence.
- **The emotional through-line.** What the audience feels.
- **The role of the brand.** How the brand shows up in the story.
- **The takeaway.** What the audience walks away with.

A weak premise produces work that's pretty but says nothing. Spend time here.

### 2. The look

The visual treatment.

**For photography:**
- Subject and composition (close-up, environmental, candid, posed)
- Lighting (natural, studio, dramatic, soft)
- Color palette (true color, treated, monochrome)
- Locations (specific or general direction)
- Wardrobe and props
- Mood references (3 to 5 reference images)

**For illustration:**
- Style (flat, dimensional, hand-drawn, geometric, abstract)
- Color use (full palette, restricted, brand-only)
- Line treatment
- Composition style
- Detail level
- Reference artists or works (with explicit "we want like X but NOT like Y")

**For video / motion:**
- Pacing (slow, medium, fast cuts)
- Camera movement (static, handheld, sweeping)
- Color grading
- Transitions and effects
- Audio direction (music, voiceover, ambient)
- Reference work (3 to 5 examples)

### 3. The execution

Production-level direction.

**Specifications:**
- Deliverable formats and sizes (web hero, social square, print full-page)
- Required shots or frames
- Optional shots if budget allows
- Wardrobe and prop list (for live action)
- Color and asset specs (RGB, CMYK, hex codes for matching)

**Constraints:**
- Things to avoid (specific cliches, forbidden treatments, regulatory)
- Brand-system requirements (logo placement, color use, type rules)

### 4. The variants

How this creative scales across distribution.

Most creative needs to live in multiple places. Plan the variants up front.

**Common variant set for a campaign:**
- Hero web image (16:9 or wider)
- Mobile web hero (4:5 or 1:1)
- Social square (1:1)
- Social vertical (9:16)
- Email banner (3:1 typical)
- Display ad sizes (300x250, 728x90, etc.)
- Print sizes if applicable

For each variant, note: how the composition adapts, what gets cropped or repositioned, what assets are required.

### 5. The standards

The quality bar.

**Technical:**
- Resolution and format requirements
- Color profile
- File naming conventions
- Delivery format (raw + edited, layered files, exported variants)

**Creative:**
- What "approved" looks like (specific examples of acceptable work)
- What "not approved" looks like (specific examples to avoid)
- Number of revision rounds budgeted

---

## Workflow

### For briefing external creative

1. **Confirm the inputs.** Brand identity locked. Audience and goal clear. Budget and timeline known.
2. **Develop the concept.** Premise, emotional through-line, takeaway.
3. **Build the look.** Mood references. Specific direction on style elements.
4. **Write the spec.** Production-level direction. Variants. Constraints.
5. **Brief the vendor.** In writing. Walk through it live. Allow questions.
6. **Review milestones.** Treatment review, halfway review, final review. Don't skip the early reviews; corrections compound.
7. **Approve and document.** What was produced, what's licensed for what use.

### For directing in-house creative

1. **Same brief, lighter format.** In-house direction can be more iterative. Still document the brief.
2. **Co-create.** In-house teams know the brand. Use their judgment. Don't over-direct.
3. **Establish review rhythm.** Daily check-ins for fast work, weekly for longer projects.

### For evaluating existing creative

1. **Score against the brief.** Did the work hit the brief? Where did it deviate?
2. **Score against the brand.** Does this look like the brand? Could this be confused with a competitor?
3. **Score against the goal.** Will this drive the intended outcome?
4. **Identify fixes.** What can be improved? What's a deal-breaker vs. acceptable?

---

## Failure patterns

- **"Modern, clean, minimal" briefs.** Means nothing. Force specificity. Use specific reference brands, named artists, or visual examples.
- **No "what to avoid" direction.** Vendors interpret broadly. Tell them what's out of bounds explicitly.
- **Reference imagery that's actually competitor work.** You'll get something that looks like the competitor. Never use direct competitors as references.
- **Skipping early reviews.** Every revision late in the process is 5x more expensive than catching issues at treatment stage.
- **Too many cooks.** 6 stakeholders all giving creative feedback produces incoherent work. Concentrate creative authority.
- **Ignoring distribution.** Creative that doesn't work in the actual contexts where it will live is failed creative.
- **No variant planning.** Discovering at delivery that you need a square crop and the photographer composed for 16:9 only.
- **Approving creative that's "fine."** Fine is the enemy of distinctive. If it doesn't move you, it won't move the audience.

---

## Output format

Default output is a creative brief at `creative-brief-[project].md`.

Structure:
1. The story (premise, through-line, role of brand, takeaway)
2. The look (visual treatment with references)
3. The execution (specs, variants, constraints)
4. The standards (quality bar, examples of acceptable and unacceptable)
5. The logistics (timeline, milestones, budget, deliverables)

Plus a separate moodboard or visual reference doc with images.

---

## Reference files

- `references/creative-brief-template.md` - Generic art direction brief template covering any production type (photo, illustration, video, animation, mixed).
- `references/photo-shoot-brief.md` - Detailed brief template for photography commissions.
- `references/illustration-brief.md` - Brief template for illustration commissions.

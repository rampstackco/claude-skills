---
name: content-strategy
description: "Develop a content strategy covering editorial positioning, content pillars, formats, calendar, governance, and topical authority planning. Use this skill whenever the user wants to plan a content program, define content pillars, build an editorial calendar, structure topic clusters, set up content governance, or align content production with broader brand and SEO goals. Triggers on content strategy, content plan, editorial strategy, content pillars, content calendar, editorial calendar, topical authority, topic clusters, content governance, content roadmap, content production. Also triggers when the user is about to start producing content without a strategic plan."
---

# Content Strategy

Plan what content to produce, why, when, and how. Stack-agnostic. Works for blogs, knowledge bases, marketing sites, newsletters, and product content surfaces.

This skill is the strategic layer. Tactical execution sits in `content-and-copy`, `landing-page-copy`, and `email-sequences`. SEO-driven content planning sits in `seo-keyword`. This skill stitches those together into a coherent program.

---

## When to use

- Planning a new content program or relaunching an existing one
- Defining editorial positioning and content pillars
- Building an editorial calendar
- Structuring topic clusters and content hubs
- Establishing content governance (review, approval, lifecycle)
- Aligning content with broader brand and revenue goals

## When NOT to use

- Writing specific content pieces (use `content-and-copy`)
- Writing landing pages or sales copy (use `landing-page-copy`)
- Writing email sequences (use `email-sequences`)
- Pure keyword research (use `seo-keyword`, then return here for strategic planning)
- Auditing existing content for keep/update/delete decisions (use `seo-content-audit`)

---

## Required inputs

- Brand positioning and audience (from `brand-discovery` or `creative-brief`)
- Business goals the content needs to serve (traffic, leads, brand authority, retention)
- Existing content inventory (if any)
- Keyword research output (from `seo-keyword`) if SEO-driven
- Production capacity (writers, budget, cadence)

If brand positioning is unclear, run `brand-discovery` first. If audience is undefined, do that work before strategy.

---

## The framework: 5 layers

A content strategy has five layers. Skip layers and the program drifts.

### 1. Editorial positioning

What this content program stands for. The "why we write" statement.

**Components:**
- **Mission.** Why this content exists. One sentence.
- **Audience.** Who it serves. Specific.
- **Promise.** What readers get from us they cannot get elsewhere.
- **Distinction.** What makes this content different from the 50 other publications in the same space.

**Example structure:**

> We help [audience] [achieve outcome] by publishing [content type] that [unique angle], unlike [common alternatives] that [common shortcoming].

A strong editorial positioning forces choices. If you cannot complete the sentence, the positioning is too vague.

### 2. Content pillars

The 3 to 5 themes the program owns. Every piece of content belongs to a pillar.

**Per pillar, define:**
- **Theme.** One sentence describing the topic territory.
- **Why we own it.** Audience need + brand authority + competitive opportunity.
- **Sub-topics.** 5 to 15 sub-topics that fit under the pillar.
- **Cornerstone content.** The 1 to 2 pieces that anchor the pillar (long-form, comprehensive, link-worthy).
- **Supporting content.** Articles, videos, tools, comparisons that reinforce and link to the cornerstone.

**Pillar selection criteria:**
- Audience cares about it (research-backed, not assumed)
- Brand has credibility or can earn it
- Topical authority is achievable (you can plausibly become a top-3 source)
- Connects to revenue (directly or indirectly)
- Distinguishes you from competitors

3 to 5 pillars is the sweet spot. Fewer than 3 risks brittleness. More than 5 dilutes focus.

### 3. Content formats and types

The shapes the content takes.

**Format dimensions:**

- **Length.** Short (under 500 words), medium (500 to 1500), long (1500 to 3000), epic (3000+)
- **Depth.** Surface (overview) vs. deep (comprehensive)
- **Type.** Article, guide, comparison, listicle, case study, interview, data study, tool, video, podcast, newsletter, social
- **Originality.** Aggregation (summarizing existing knowledge) vs. original research (new data or insight)
- **Evergreen vs. timely.** Lasting value vs. moment-driven

**Format selection criteria:**

- Match the audience's preferred consumption (do they read, watch, listen?)
- Match the topic (some topics demand depth; others demand brevity)
- Match production capacity
- Match distribution channels (LinkedIn favors short; YouTube favors video; SEO favors long evergreen)

A content program typically has 3 to 5 formats it returns to consistently. More than that fragments production and brand recognition.

### 4. Editorial calendar

When content publishes.

**Cadence options:**

- **High frequency** (3+ pieces per week): builds momentum, requires significant production capacity
- **Medium frequency** (1 to 2 per week): sustainable for most teams, builds steady audience
- **Low frequency** (1 to 4 per month): each piece must be high-impact; longer production cycles
- **Burst-then-pause** (10 pieces in a month, then 3 months off): launches and campaigns

**Calendar structure:**

- **Pillar rotation.** If you have 4 pillars and publish weekly, each pillar gets one piece per month.
- **Content type mix.** Within a month, blend types (e.g., 2 articles + 1 case study + 1 video).
- **Timely opportunities.** Reserve flex slots for newsjacking, seasonal content, launches.
- **Updates and refreshes.** Plan time for updating existing high-performing content.

**Common failure:** publishing whatever happens to get written. Without a calendar, the program drifts toward the topics easiest to write, not the ones the audience needs most.

### 5. Governance and lifecycle

How content gets made, reviewed, published, measured, and retired.

**Production workflow:**

```
Idea → Brief → Outline → Draft → Edit → Review → Publish → Measure → Update or Retire
```

**Per stage, define:**

- Who owns it
- What inputs they need
- What outputs they produce
- What the quality bar is
- How long it should take

**Roles:**

- **Editorial lead.** Owns positioning, calendar, quality bar.
- **Writers.** Produce drafts. May be in-house, freelance, or AI-assisted.
- **Subject matter experts.** Provide expertise, review for accuracy.
- **Editors.** Polish, ensure voice consistency, fact-check.
- **SEO lead.** Keyword optimization, internal linking, schema.
- **Publishers.** Ship the content (CMS, scheduling, distribution).

**Lifecycle decisions:**

- **Update cadence.** Top-performing evergreen content reviewed every 6 to 12 months.
- **Retire criteria.** Content that no longer serves the audience or hurts the site (use `seo-content-audit`).
- **Republishing.** Updated content republished as fresh, not buried as an update.

---

## Workflow

1. **Confirm inputs.** Brand positioning, audience, business goals, capacity. If any are missing, surface that first.
2. **Draft editorial positioning.** Mission, audience, promise, distinction. Stress-test the positioning by trying to complete the "We help X" sentence.
3. **Define content pillars.** 3 to 5. Each with a theme, justification, sub-topics, and planned cornerstone content.
4. **Choose formats.** 3 to 5 formats the program returns to consistently.
5. **Build the calendar.** Cadence, pillar rotation, format mix, flex slots.
6. **Set up governance.** Roles, workflow, quality bar, lifecycle rules.
7. **Document.** Use the template in `references/content-strategy-template.md`.
8. **Operationalize.** Set up the editorial calendar in whatever tool the team uses (CMS, Notion, Airtable, etc.).

---

## Failure patterns

- **Strategy without capacity.** A 3-piece-per-week plan with one part-time writer fails. Match strategy to actual production capacity.
- **Pillars chosen for SEO alone.** Pillars must serve the audience and the brand, not just keyword opportunity. SEO is a downstream filter, not the strategy itself.
- **Too many pillars.** 7 pillars dilute the brand. The audience cannot remember what you stand for.
- **Calendar without governance.** Content gets produced but quality drifts. Without a quality bar, the program loses authority.
- **No update plan.** Top-performing content goes stale. Competitors with fresher versions overtake.
- **Vanity metrics.** Pageviews and follower counts without conversion tracking. Define what success looks like in business terms.
- **Strategy that lives in a doc.** A strategy document that doesn't translate to the editorial calendar and the production workflow is decoration. Operationalize or it doesn't exist.

---

## Output format

Default output is a strategy document at `content-strategy.md` plus an editorial calendar in whatever tool the team uses.

Strategy document structure:
1. Editorial positioning
2. Content pillars (3 to 5, each detailed)
3. Formats
4. Calendar (cadence and structure, not the specific items)
5. Governance (roles, workflow, lifecycle)
6. Measurement plan (metrics, review cadence)
7. Production capacity and budget

Editorial calendar (separate, ongoing):
- One row per planned content piece
- Columns for: title, pillar, format, target keyword (if SEO-driven), publish date, owner, status

---

## Reference files

- `references/content-strategy-template.md` - Strategy document template.
- `references/editorial-calendar-template.md` - Spreadsheet column definitions and calendar structure.

---
name: brand-discovery
description: "Run upstream brand discovery covering audience research, competitive landscape, category dynamics, problem space, and positioning territory exploration. Use this skill at the very start of a brand or website project when the user needs to understand who they're for, who they compete with, what the audience actually needs, and where the brand could plausibly stand. Triggers on brand discovery, audience research, market research, competitive scan, category research, customer research, who is this for, who are we, positioning research, intake, kickoff. Also triggers when a creative brief is requested but the upstream inputs (audience, competitors, problem space) are not yet clear."
---

# Brand Discovery

Upstream of every brief, identity, and content plan. Discovery answers four questions: who the brand is for, what they need, who else is competing for that need, and where the brand could plausibly stand that competitors do not.

---

## When to use

- The very first phase of a new brand or website project
- Understanding an audience before any creative work begins
- Mapping competitors and category dynamics
- Surfacing the problem space the brand will operate in
- Generating positioning territories before brief or ideation
- When a creative brief was requested but the inputs are missing

## When NOT to use

- The audience and category are already well-understood (jump to `creative-brief` or `brand-ideation`)
- Validating a specific design or feature with users (use `usability-testing`)
- Mapping the customer journey of an existing audience (use `journey-mapping`)
- Generating brand names or visual directions (use `brand-ideation`)

---

## Required inputs

- The product, service, or organization being branded
- Whatever is already known about the audience and category (often very little)
- Access to existing materials (sales calls, support tickets, reviews, analytics)
- Any constraints (parent brand, regulatory, geographic)
- A timeline (a 1-week discovery looks different than a 6-week one)

---

## The framework: 4 dimensions

Discovery covers four dimensions. Each has its own sources, methods, and outputs.

### 1. Audience

Who specifically does this serve?

**Layers to surface:**

- **Demographic:** Age range, geography, language, life stage, income (only if relevant; do not over-collect demographics)
- **Psychographic:** Values, motivations, beliefs, fears
- **Behavioral:** What they currently do to address the problem, what tools they use, where they spend time online and offline
- **Jobs-to-be-done:** The functional, emotional, and social jobs they hire a brand to perform

**Sources:**

- Existing customer interviews (5 to 8 ideal)
- Sales call recordings or transcripts
- Support ticket themes
- Review and forum analysis (Reddit, Trustpilot, App Store, niche communities)
- First-party analytics (search console queries, on-site search, top pages)
- Social listening (what they post about the category)

**Output:** 1 to 3 named audience segments, each with a one-page profile.

### 2. Competitors

Who else competes for the same audience and need?

**Three layers of competitor:**

- **Direct:** Solves the same problem the same way (e.g., another SaaS in the category)
- **Indirect:** Solves the same problem a different way (e.g., a spreadsheet replacing a SaaS tool)
- **Status quo:** Doing nothing, doing it manually, or living with the problem

The third is most often forgotten and most often the actual competitor.

**Per competitor, document:**

- Who they target (audience overlap with you)
- How they position (what they claim to be)
- What they actually deliver (often different from positioning)
- Pricing model and structure
- Strengths and weaknesses from the audience's perspective
- Recent moves (launches, pivots, hires, departures)

**Sources:**

- Their own website and marketing
- Reviews of their product or service
- Their content and SEO presence (use `seo-competitor` for the search angle)
- Social proof and customer voices

**Output:** Competitor matrix (3 to 8 competitors deep), plus a one-line "what makes them dangerous" for each.

### 3. Category and problem space

What is the broader context this brand operates in?

**Map:**

- **The problem.** What is the actual user problem? Not the surface symptom, the underlying job to be done.
- **The category.** How is the category structured? Is it new, mature, fragmenting, consolidating?
- **The conventions.** What does every brand in the category do the same way? (These are the conventions you can break.)
- **The shifts.** What is changing in the category? Technology, regulation, audience behavior, distribution.
- **The moats.** What protects incumbents? Brand, distribution, network effects, switching costs?
- **The vocabulary.** What language does the category use? What is jargon, what is meaningful, what is empty?

**Sources:**

- Industry reports and analyst coverage
- Trade publications and conferences
- Adjacent category observations
- Customer language vs. category language (the gap is informative)

**Output:** A category map and a list of conventions to consider breaking (or keeping deliberately).

### 4. Positioning territory

Given the audience, competitors, and category, where could this brand plausibly stand?

This is not yet "the positioning." Discovery surfaces possible territories. `brand-ideation` narrows them and commits.

**Generate territories from:**

- Underserved audience segments (audiences others ignore)
- Underserved jobs (jobs the category does not do well)
- Category convention violations (what would happen if you broke the rules everyone follows)
- Honest brand truths (what is genuinely true about this brand that competitors cannot also claim)
- Category shifts (where the puck is going)

**Per territory, document:**

- The statement (one sentence)
- Why it could work (proof point)
- Who would resonate (the audience for this territory)
- Who is competing in this territory (often, no one good)
- Risk (what makes it fragile)

**Output:** 3 to 5 distinct territories. Not yet committed. Inputs to `brand-ideation`.

---

## Workflow

1. **Define the discovery scope.** 1 week for a startup pre-launch. 4 to 6 weeks for a major rebrand. Set expectations.
2. **Audit existing inputs.** Sales calls, support tickets, reviews, analytics, internal docs. Often more is known than people think.
3. **Audience research.** 5 to 8 interviews if possible. Plus secondary research from review and forum analysis.
4. **Competitor mapping.** 3 to 8 competitors deep, including indirect and status-quo competitors.
5. **Category mapping.** Conventions, shifts, vocabulary, moats.
6. **Territory generation.** 3 to 5 plausible positioning territories.
7. **Write the discovery report.** Use the template in `references/discovery-report-template.md`.
8. **Hand off to next phase.** Discovery feeds into `creative-brief`, `brand-ideation`, or `content-strategy` depending on where the project goes next.

---

## Failure patterns

- **Skipping discovery to "save time."** Every shortcut here costs 10x downstream when the brand fails to land.
- **Audience research that confirms what you already believe.** If your audience research validates every assumption, you did not actually research. Look for surprises.
- **Demographic-heavy audience profiles.** "Women aged 25 to 45" is not insight. Behavior, beliefs, and jobs-to-be-done are.
- **Listing every competitor as if equal.** Most competitors do not matter. Pick the 3 that are genuinely dangerous.
- **Forgetting status-quo as competition.** The biggest competitor is usually "doing nothing" or "doing it manually."
- **Outputting territories without rejection criteria.** A territory without a "what this rejects" is not a territory.
- **Treating discovery as a one-time event.** Categories shift. Audiences evolve. Re-run discovery at least every 3 years.

---

## Output format

Default output is a discovery report at `discovery-report.md` plus appendices.

Structure:
1. Executive summary (5 to 10 bullets)
2. Audience (1 to 3 named segments with profiles)
3. Competitors (matrix and per-competitor analysis)
4. Category and problem space
5. Positioning territories (3 to 5 candidates)
6. Implications and recommendations
7. Open questions that require further research

Appendices:
- Interview notes (sanitized)
- Competitor research data
- Source list

---

## Reference files

- `references/discovery-report-template.md` - Full discovery report template.
- `references/interview-guide.md` - Audience interview guide with question prompts.

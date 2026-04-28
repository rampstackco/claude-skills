---
name: ux-research
description: "Plan and execute user research including research planning, recruiting, interview design, qualitative synthesis, and translating findings into product decisions. Use this skill whenever the user wants to plan user research, design interviews, recruit participants, conduct discovery, run formative research, or synthesize qualitative findings. Triggers on user research, UX research, user interviews, discovery research, generative research, formative research, qualitative research, user insights, research synthesis, recruitment, interview guide, jobs to be done. Also triggers when product decisions are being made without user input and the user wants to fix that."
---

# UX Research

Plan and execute user research that produces decisions, not just decks. Stack-agnostic. Tool-agnostic.

This skill is for generative and discovery research. For testing existing designs, use `usability-testing`. For mapping the full customer experience, use `journey-mapping`.

---

## When to use

- Starting a new product or major feature without sufficient user understanding
- Diagnosing why something isn't working without clear data signals
- Generating new opportunity hypotheses
- Validating a strategic direction before significant investment
- Building empathy across a team that's drifted from users
- Translating "we should talk to users" intent into a real plan

## When NOT to use

- Testing a specific design or prototype (use `usability-testing`)
- Mapping the full journey of an existing experience (use `journey-mapping`)
- Quantitative measurement (use `analytics-strategy`)
- Conversion testing (use `cro-optimization`)

---

## Required inputs

- The research question(s) - what you need to answer
- Stakeholder buy-in (who needs the findings, what decisions hinge on them)
- Access to users (current customers, prospects, lapsed users, target segments)
- Timeline and budget
- Any prior research to build on

---

## The framework: 6 phases

### 1. Frame the question

Bad questions produce bad research. Spend disproportionate time on framing.

**Good research questions:**
- Specific (not "How do users feel about our product?")
- Open-ended (not "Do users like feature X?")
- Decision-relevant (the answer changes what gets built)
- Researchable (can be answered through user contact, not just analysis)

**Examples:**

| Weak question | Better question |
|---|---|
| "Do users like our onboarding?" | "Where in onboarding do new users feel uncertain about whether to continue?" |
| "What features should we build?" | "What unmet needs do current users have when [specific job]?" |
| "Why is conversion low?" | "What's the user mental model when they reach the pricing page, and where does it diverge from our intent?" |

### 2. Choose the method

The method follows the question.

**Generative methods (what's true?):**

- **In-depth interviews.** 60 minutes, 5 to 15 participants. Best for understanding context, motivation, mental models.
- **Contextual inquiry.** Observe users in their environment doing their work. Best for workflow understanding.
- **Diary studies.** Participants log their experience over days/weeks. Best for behaviors that don't manifest in a single session.
- **Field research.** Spend time where users live/work. Best for cultural and contextual understanding.
- **Surveys (qualitative-heavy).** When you need broad signal with open-ended responses.

**Validation methods (is this hypothesis right?):**

- **Concept testing.** Show a description, mockup, or prototype. Get reactions.
- **Card sorts.** Validate information architecture.
- **Tree tests.** Validate findability without visual design influence.

(For testing usability of working designs, see `usability-testing`.)

### 3. Recruit

The recruit makes or breaks the research.

**Recruit criteria:**

- Match the audience the research targets (not "anyone willing")
- Mix of behaviors (active users, lapsed users, never-users)
- Mix of demographics where relevant
- Excludes friends, family, employees (biased)
- Excludes professional research participants if possible (different population)

**Recruit channels:**

- In-product recruiting (intercept current users)
- Email outreach to user segments
- Recruiting platforms (UserInterviews, Respondent, etc.)
- Customer support team referrals
- Field intercept for in-person

**Incentive:** Pay participants. Standard rates: $50 to $150 for 60 minutes, more for executives or specialized professions.

**Recruit volume:** Plan for 20 to 30 percent no-show. Recruit 7 to schedule 5.

### 4. Conduct

The interview or session itself.

**Pre-interview:**

- Send confirmation 24 hours and 1 hour before
- Test recording setup (audio quality is non-negotiable)
- Prepare interview guide (see template)
- Have a notetaker if possible (frees the interviewer to focus)

**During the interview:**

- Record video and audio (with consent)
- Open with rapport-building, not the research questions
- Use open-ended questions ("Tell me about the last time...")
- Use silence (let participants fill it; don't rush to the next question)
- Ask "why" but not too many times in a row (becomes interrogation)
- Ask for specifics and examples ("Can you walk me through what you did?")
- Probe contradictions gently ("Earlier you said X, now you're saying Y; help me understand")
- Watch for moments of emotion (often signal something important)
- Don't sell or convince - this is listening, not pitching

**Anti-patterns:**

- Leading questions ("Don't you find this confusing?")
- Hypothetical questions ("Would you use a feature that...?") - poor predictor of behavior
- Multiple questions at once
- Interrupting
- Filling silence
- Interviewing your hypothesis (only asking questions that confirm what you already think)

### 5. Synthesize

Notes don't become insights automatically.

**The synthesis process:**

1. **Capture observations.** From recordings, notes, transcripts. Each observation is a single data point: a quote, a behavior, an emotion, a moment.
2. **Affinity mapping.** Cluster observations into themes. Physical sticky notes or digital equivalents.
3. **Find patterns.** Themes that appear across multiple participants are signal. One-off observations are interesting but weaker.
4. **Identify insights.** An insight is more than a theme. It's a non-obvious finding that explains a why or implies a so what.
5. **Test the insight against the data.** If the insight only fits some interviews, it's a hypothesis, not an insight.
6. **Distinguish signal from noise.** A belief that 1 of 8 participants holds may be noise. A belief 6 of 8 hold is signal.

**Heuristics for strong insights:**

- They surprise the team (insights you already knew aren't insights)
- They explain a "why" the team has been guessing about
- They imply specific actions (so what?)
- They hold up across multiple data points
- They can be stated in one or two sentences

### 6. Communicate

Findings die in slide decks. Plan distribution.

**Outputs that work:**

- **Top-line insights document.** 5 to 10 insights, clearly stated, with supporting quotes.
- **Highlight reels.** Edited 5 to 10 minute video of key participant moments. More persuasive than any document.
- **In-room workshops.** Walk stakeholders through the synthesis themselves. They internalize when they participate.
- **Per-stakeholder briefs.** Different audiences need different framings. CEO wants strategic implications. Designers want pain points. Engineers want use cases.

**Outputs that fail:**

- 80-slide decks that get skimmed
- Reports that no one reads past the executive summary
- Verbose narrative summaries
- Insights that sit in a doc no one re-opens

---

## Workflow

1. **Frame the research question.** With stakeholders. Multiple iterations.
2. **Pick the method.** Match to the question.
3. **Plan logistics.** Timeline, budget, recruit, tools, team.
4. **Recruit.** Start early. Slow recruits delay everything.
5. **Pilot.** Run 1 to 2 sessions before the main batch. Refine the guide.
6. **Conduct.** Stay disciplined to the guide while staying open to surprises.
7. **Synthesize.** Don't wait until all sessions are done; start mid-way.
8. **Communicate.** Multiple formats. Multiple audiences.
9. **Track impact.** Did decisions change because of the research? If not, the research failed regardless of quality.

---

## Failure patterns

- **Research without a decision.** Findings have no home. Effort wasted.
- **Vague research questions.** Bad questions produce uninterpretable answers.
- **Recruiting "anyone willing."** Sample doesn't match audience.
- **Over-recruiting professional participants.** Pattern-matched answers, not real users.
- **Leading questions in the guide.** Findings reflect the researcher, not the user.
- **Skipping synthesis.** Notes alone aren't insights.
- **Insights that confirm the team's existing beliefs.** Suspect those especially.
- **Findings that never ship.** Research findings that don't change product decisions are decoration.
- **Single research project for years of decisions.** Research has a shelf life. Refresh.
- **Research as one-time project.** Continuous discovery beats episodic research.

---

## Output format

Default outputs:

1. **Research plan** (before research starts) - `research-plan-[topic].md`
2. **Interview guide** - `interview-guide-[topic].md`
3. **Findings doc** (after synthesis) - `research-findings-[topic].md`
4. **Highlight reel** (video, separately produced)

Findings document structure:

```markdown
# [Topic] research findings

## Question we set out to answer
[Specific question]

## Method
[Approach, sample size, dates]

## Top insights
1. [Insight, stated in one sentence]
   - Supporting evidence: [Quotes, behaviors]
   - Implication: [What this means for product/strategy]
2. [Insight 2]
   ...

## Themes (less prominent than top insights, still worth noting)
[List]

## Outliers worth investigating
[Single-participant observations that may be signal in disguise]

## Recommended next steps
[Specific actions]
```

---

## Reference files

- `references/interview-guide-template.md` - Structured interview guide template with example openings, probes, and closes.

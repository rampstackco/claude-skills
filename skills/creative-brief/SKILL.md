---
name: creative-brief
description: "Create or refine a creative brief that bridges discovery and execution. Use this skill whenever the user is starting a new project, kicking off a website, beginning a brand build or redesign, briefing a designer or developer or AI agent, or trying to align a team before building. Triggers on creative brief, design brief, brand brief, project kickoff, kicking off, briefing the team, project intake, design direction, brief the designer, brief the dev, where do we start, how do we start, write a brief, project overview, scope this project, align on direction. Also triggers when the user has a vague idea and needs to make it concrete enough to hand off, even if they do not say 'brief' explicitly."
---

# Creative Brief

Bridges discovery and execution. Translates "we want a website" into a brief a designer, developer, or AI agent can actually run with.

---

## When to use

- Starting a new project (website, app, brand, campaign)
- Kicking off a redesign or rebrand
- Handing work to a designer, developer, or AI agent
- Aligning a team that has drifted off course
- Turning a vague idea into something buildable

## When NOT to use

- The user is asking a one-off design question (use `design-standards`)
- The user wants a PRD or dev ticket (use `pm-spec-writing`)
- The user is doing initial research and has not decided what they are building (use `brand-discovery` first)
- The user just wants you to write copy (use `content-and-copy`)

---

## Required inputs

A brief needs answers to ten questions. Before writing, confirm you have answers (or can elicit them) for:

1. What is the project?
2. Why does it exist? What problem does it solve?
3. Who is the audience?
4. What do you want them to do, feel, or know?
5. What is the personality? How does it sound?
6. What is the visual direction? How does it look?
7. What is in scope? What is out?
8. What are the constraints (time, budget, technical, brand)?
9. What does success look like?
10. Who approves?

If you have fewer than five of these, run a quick intake first. See "Eliciting missing info" below.

---

## The brief structure

Output a markdown brief with these ten sections. Keep each section tight. A good brief is two pages, not ten.

### 1. Snapshot
One paragraph answering: what, who, why, when. The kind of thing you would say at a kickoff in thirty seconds.

### 2. Audience
Primary audience first. Include who they are, what they are trying to do, what is blocking them today, and where you reach them. Add secondary audiences only if they materially change the work.

### 3. Objectives
What success looks like. Pair every objective with a measurable signal.

> Objective: drive trial signups.
> Signal: 3 percent conversion from homepage to signup within 30 days of launch.

### 4. Key message
The one thing you want a visitor to walk away knowing. If they see only the homepage hero and bounce, what should they remember? One sentence.

### 5. Voice and tone
Pick three to five adjectives. Pair each with what you are NOT (e.g. "confident, not arrogant"). See `references/voice-and-tone-guide.md` for frameworks and worked examples.

### 6. Visual direction
Mood, palette, type, and imagery direction. Three to five reference URLs are worth more than 500 words. Note what you like AND what you would reject.

### 7. Scope and deliverables
A bulleted list of what is being made. Be specific. "Homepage" is not a deliverable. "Homepage with hero, three feature blocks, testimonial carousel, and contact CTA" is.

### 8. Constraints
Time. Budget. Technical (existing stack, required integrations, hosting). Brand (logo, colors, fonts that must be used). Legal (compliance, accessibility level required).

### 9. Inspiration and competitors
Three to five sites or brands you want to feel like, three to five you want to feel different from. Note WHY for each.

### 10. Approval
Who signs off. What artifact triggers sign-off (a Figma file, a staging URL, a PDF). What happens if there is no sign-off by a deadline.

---

## Eliciting missing info

If the user comes with a partial answer (e.g., "I want a website for my coffee shop"), do not just write a generic brief. Ask. Use these prompts.

**For audience**
- Who is the single most likely person to land on this site? Walk me through their day.
- If you could pick one type of customer to fill your inbox, who?
- Who do you NOT want to attract?

**For objectives**
- Pretend it is six months after launch. What number tells you it worked?
- What is the one action you most want a visitor to take?

**For voice**
- Pick three brands or people whose tone you would want to borrow.
- If your site were a person at a dinner party, what would they sound like?

**For visuals**
- Show me three sites you love. What do you love about them?
- Show me one site you hate. Why?

**For scope**
- If you only got one page, which one?
- What would you cut if the budget were halved?

Do not ask all of these. Pick the ones that fill the actual gaps.

---

## Workflow

1. **Read the conversation.** Pull every fact already given. Do not ask questions you can answer from context.
2. **Identify gaps.** Which of the ten required inputs are missing or thin?
3. **Run intake.** Ask three to five targeted questions to fill the gaps. Group related questions to keep the conversation tight.
4. **Draft the brief.** Use `references/creative-brief-template.md` as the structure. Keep it under 1500 words.
5. **Stress-test.** Before delivering, check the brief against the failure patterns below. If any apply, revise before showing the user.
6. **Deliver.** Save as `creative-brief.md` in the project root. Offer to make it a Word doc or PDF if the user wants something to share with stakeholders.

---

## What kills a brief

When the user's input matches one of these patterns, push back before writing.

- **"We want to be the [giant brand] of [our niche]."** Ask what specifically about that brand they want to borrow. Probably one or two things, not the whole thing.
- **Audience as "men and women 18-65."** This is not an audience. Ask for the single most valuable customer type and start there.
- **"Increase awareness" with no metric.** Awareness of what, by whom, measured how? Push for a number.
- **"Modern, clean, minimalist."** These words are meaningless. Ask for three specific URLs they think look right.
- **Twenty pages of context, no clear ask.** Ask: "If a designer reads only one paragraph, what should it be?" Then make that the snapshot.

---

## Output format

Default output is a markdown file at `creative-brief.md` in the project root. Structure follows the template exactly.

If the project is large, split: keep the main brief under 1500 words and put detail in linked appendices (`audience-research.md`, `brand-guidelines.md`, etc.). Briefs that try to be everything end up read by no one.

---

## Reference files

- `references/creative-brief-template.md` - Fillable template. Copy and use as the starting point.
- `references/voice-and-tone-guide.md` - Voice frameworks, brand archetypes, and worked patterns.
- `references/example-brief.md` - A worked example for a fictional B2B SaaS, showing what a "good" filled brief looks like.

Read the template before drafting. Read the voice guide if the user has not already specified a voice. Read the example if you are unsure how filled-out a section should be.

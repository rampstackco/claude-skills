# Feedback collection patterns

Structured surveys, async forms, interviews, in-product widgets, beta-aware support. Channels that work and fail. Channel mix discipline.

The feedback collection design is what determines whether the beta produces signal or noise. Structured channels capture usable data; ad-hoc venting channels produce volume that does not synthesize.

---

## Structured surveys

Surveys at defined points in the beta.

**The structure.**

- 5-15 questions per survey.
- Mix of structured questions (Likert scale, multiple choice) and 1-2 open-ended questions.
- Tied to specific learning goals: each question has a reason for being there.
- Sent at defined points: end of week 1, mid-beta, end of beta.

**Strong survey questions.**

- "On a scale of 1-7, how likely are you to use this feature daily?" (closed-ended; quantitative signal)
- "What's the most useful thing you've done with this feature so far?" (open-ended; surfaces use cases)
- "What was confusing or frustrating in your first week?" (open-ended; surfaces friction)
- "Compared to how you did this task before, is this feature better, worse, or about the same?" (specific comparison)

**Weak survey questions.**

- "Do you like the feature?" (binary; not actionable)
- "What features would you like next?" (out of beta scope; produces wishlist)
- "How can we improve?" (too open-ended; produces unfocused responses)

**Why structured surveys work.**

- Quantitative signal aggregates. Mid-beta NPS or satisfaction trend lines surface signal.
- Open-ended questions tied to specific topics produce focused qualitative data.
- Participants understand what is being asked; response rates are higher than for vague open-ended surveys.

---

## Async feedback forms

Forms participants fill when they encounter specific issues.

**The structure.**

- Always-available link or in-product entry point.
- Form fields prompt for specific information: use case, severity, expected vs actual behavior, screenshots if applicable.
- Auto-routes to the team's tracking system (issue tracker, feedback aggregation tool).

**Strong form fields.**

- "What were you trying to do?" (use case context)
- "What did you expect to happen?" (mental model)
- "What actually happened?" (observed behavior)
- "How blocking is this?" (severity)
- "Steps to reproduce" (when applicable)

**Why async forms work.**

- Captures issues at the moment they happen.
- Structured fields produce consistent data across submissions.
- Synthesis is easier when each submission has the same information shape.

---

## Structured interviews

30-60 minute interviews with a subset of participants.

**The structure.**

- 5-15 interviews per beta, depending on cohort size.
- Mid-beta or near end of beta.
- Discussion guide tied to the team's learning goals.
- Recorded with permission; transcribed for synthesis.

**Strong interview prompts.**

- "Walk me through the last time you used this feature. What were you trying to do?"
- "What was the most useful thing about it? What was the most frustrating?"
- "How did you decide to use this instead of [alternative]?"
- "Looking back, what do you wish was different?"

**Why structured interviews work.**

- Depth that surveys cannot capture.
- Specific moments and decisions surface in conversation that participants would not write into surveys.
- The qualitative data complements the quantitative survey data.

**Cross-reference `discovery-research-synthesis`** for the broader interview discipline. Beta interviews are validation-stage; the interviewing methodology is similar.

---

## In-product feedback widgets

Feedback collection contextualized to the moment.

**The structure.**

- Trigger: button or prompt within the beta feature.
- Captures: what the user was doing (page or context), brief feedback text, optional rating.
- Routes to the team's tracking system.

**Strong in-product widget design.**

- Triggered after specific moments (completing the feature's primary action, abandoning a flow).
- Brief: 1-3 fields max.
- Optional severity or sentiment rating.
- Captures the page or context automatically.

**Why in-product widgets work.**

- Capture friction at the moment, not weeks later.
- Context is preserved automatically.
- Low friction encourages submissions.

---

## Beta-aware support tickets

Support tickets routed to a beta-aware support team.

**The structure.**

- Beta participants flagged in the support system.
- Tickets from beta participants get special handling: tagged "beta," routed to support reps trained on the feature, given priority response.
- Common beta issues documented for the support team in advance.

**Strong beta-support practices.**

- Faster response than standard tickets (the participant is doing the team a favor).
- Support reps escalate beta issues to product team where the issue affects beta program decisions.
- Patterns across tickets surface to the beta program manager.

**Why beta-aware support works.**

- Surfaces issues participants encounter "in the wild," not just the issues they choose to flag through formal channels.
- Captures the support burden of the feature, which informs GA support readiness.

---

## Channels that fail

Common feedback channels that produce noise rather than signal.

**Beta-only Slack channels for venting.**

- Participants vent in real time.
- Mixes critical signal with casual chat.
- Nobody synthesizes.
- High-engagement participants drown out quieter ones.
- Cure: structured channels instead, or use Slack for community building rather than feedback collection.

**"Reply to this email with feedback."**

- Returns long unstructured emails.
- Synthesis is hard; useful patterns get lost.
- Cure: structured forms or surveys.

**End-of-beta survey only.**

- Catches only what participants remember at the end.
- In-the-moment friction is forgotten.
- Cure: surveys at multiple points; in-product widgets for moment-of capture.

**"Tell us anything."**

- Unfocused open-ended prompts produce unfocused responses.
- Participants do not know what is wanted; many do not respond.
- Cure: specific prompts tied to what the team needs to learn.

---

## Channel mix discipline

Most structured betas use 3-5 channels. Each surfaces different signal.

**Typical channel mix.**

- 1 structured survey at end of week 1 (quantitative + first-impression qualitative).
- 1 structured survey at mid-beta (quantitative trend + behavior signal).
- Always-available async feedback form (specific issues as they arise).
- 5-10 structured interviews near end of beta (qualitative depth).
- In-product feedback widget (in-the-moment friction).
- Beta-aware support routing (issues participants choose to escalate).

**The synthesis.** The team synthesizes across channels. Patterns that appear in multiple channels are stronger; signals from a single channel are weaker.

**Channel mix calibration.**

- Smaller cohorts (5-50): more interviews, less aggregation.
- Larger cohorts (100-500): more surveys and aggregation, fewer interviews.
- Largest cohorts (500+): heavy aggregation, sampling for interviews.

---

## Feedback synthesis cadence

How feedback gets reviewed during the beta.

**Weekly synthesis.**

- 1-2 hours weekly during the beta.
- Review feedback across all channels for the week.
- Categorize: critical bug, friction, feature request, positive signal, edge case.
- Surface patterns: what recurring feedback are we seeing?

**Bi-weekly pattern review.**

- 1-2 hours bi-weekly.
- Look at patterns across the past 2-4 weeks.
- Identify converging signal: which patterns are strengthening?
- Decide: what to fix during the beta vs what to defer to post-GA roadmap.

**End-of-beta synthesis.**

- Substantial work: 1-2 weeks of synthesis depending on cohort size.
- Apply discovery-research-synthesis discipline (see that skill).
- Output: beta synthesis document with patterns, implications, and graduation recommendation.

---

## Feedback signal quality

Not all feedback is equally valuable.

**High-signal feedback.**

- Specific moments of friction with reproducible context.
- Patterns across multiple participants.
- Behavioral data showing what users actually do (vs what they say).
- Comparison to alternatives (what users tried before, why they switched).

**Lower-signal feedback.**

- One-off complaints with no pattern.
- Hypothetical preferences ("it would be nice if...").
- Wishlist features unrelated to the beta scope.
- Venting without specific context.

**The discipline.** Synthesis weights higher-signal feedback. Lower-signal feedback gets noted but does not drive decisions.

---

## Feedback volume management

Managing the flow of feedback as the beta runs.

**Volume signals.**

- Critical issues surface fast: most appear in the first 2 weeks.
- Friction issues surface continuously through the beta.
- Behavioral signal accumulates; visible by mid-beta.

**Volume management.**

- The team's synthesis capacity bounds usable volume. Beyond that capacity, additional feedback produces less actionable signal.
- For larger cohorts, aggregate channels (surveys, in-product widgets) scale better than direct channels (Slack, email).

**Burnout risk.**

- Beta program managers reading 100+ feedback items per week burn out.
- Triage is the discipline: not all feedback gets equal attention.
- Critical and pattern feedback gets full attention; one-off venting gets noted briefly.

---

## Common feedback collection failures

**Single-channel reliance.** Only one feedback channel; misses signal that other channels would have caught.

**Channels not tied to learning goals.** Feedback collected without clear purpose; synthesis cannot tell what to do with it.

**Noisy channels (Slack venting).** High volume, low signal-to-noise ratio.

**End-of-beta only.** Misses in-the-moment friction; relies on participant memory.

**Vague prompts.** Open-ended questions without focus; produces unfocused responses.

**No mid-beta synthesis.** Feedback collected but not reviewed until end; opportunities to address issues during the beta missed.

**Feedback channels that conflict.** Multiple Slack channels for the same purpose; participants confused about where to post.

**No closing the loop.** Participants give feedback; team never tells them what was heard or changed; engagement decays.

---

## Methodology-level choices that stay in the public skill

Channels that work (structured surveys, async forms, interviews, in-product widgets, beta-aware support). Channels that fail. Channel mix discipline. Feedback synthesis cadence. Signal quality discipline. Volume management. Common failures.

## Implementation choices that stay internal

Specific survey tools and templates. Specific feedback form integrations. Specific in-product widget implementations. Specific support ticketing systems. The team's own conventions for channel selection. These vary by team and tooling.

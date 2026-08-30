# Identifying struggling moments

Jobs become visible at struggling moments: when the user's current solution is failing them, when alternatives feel inadequate, when they would prefer a different way of doing the job.

The struggling moment is the JTBD methodology's most direct contribution to discovery research. Most discovery interviews surface preferences and feature requests; well-structured JTBD interviews surface struggling moments, which produce richer data and clearer jobs.

---

## What a struggling moment is

A specific moment in time when:

- The user encountered friction in trying to accomplish something.
- The current approach failed them or felt inadequate.
- They considered or wished for an alternative.
- They built a workaround or accepted suboptimal output.

**Strong struggling-moment examples.**

- "Last Tuesday I lost an hour assembling the board metrics from three different dashboards because none of them had the slice I needed. I ended up exporting CSVs and combining them manually, and then second-guessing whether I had pulled the right data."
- "When the customer escalation came in at 9pm, I was at dinner and tried to triage from my phone, but the support tool's mobile experience was unusable. I had to go back to my laptop and the whole evening was disrupted."
- "Last quarter I spent the whole onboarding week pair-programming with the new engineer because our docs assumed knowledge they did not have, and I could not point them anywhere that would work without me there."

Each example names a specific time, a specific friction, and the workaround or impact.

**Weak struggling-moment examples.**

- "I wish dashboards were better." (general; not a moment)
- "It would be nice if the support tool was more mobile-friendly." (preference; not a friction-in-context)
- "Onboarding new engineers takes a lot of time." (abstracted; no specific moment)

---

## Discovery prompts that surface struggling moments

Specific prompts produce specific data.

**Prompts that work.**

- "Walk me through the last time you did [task]. What was hardest about it?"
- "What was the most recent time you wished you had a better way of doing [task]?"
- "When was the last time [task] went badly? What happened?"
- "Describe the last time you considered switching from [current tool] to something else. What triggered that?"
- "What's something you do that takes longer than it should? When was the last time it cost you?"

The prompts share two characteristics: they ground in recent specific moments, and they invite the user to describe friction without pre-judging it.

**Prompts that fail.**

- "What features would you like to see?" (produces feature requests, not jobs)
- "How do you usually do [task]?" (produces abstracted descriptions, not moments)
- "Are you satisfied with [tool]?" (produces preferences, not behaviors)
- "What would your dream solution look like?" (produces fiction, not data)

---

## The recency bias as a feature

JTBD interviewing exploits recency. Recent moments are remembered with specifics; older moments get smoothed into abstractions.

**The methodology.** Ask about the last time, the most recent occurrence, the situation that happened this week. Users can recall details from recent moments that they cannot recall from older ones. The details are where the job lives.

**The trade-off.** Recent moments may not represent the dominant pattern; the most recent occurrence may be an outlier. The mitigation is interview volume: 8-15 interviews each grounded in recent moments produce a pattern; one interview grounded in one moment is one data point.

---

## Pattern recognition across users

Across many users, struggling moments cluster. The same kinds of friction recur. The clusters reveal the jobs that are not currently being done well.

**The clustering work.**

- Across interviews, struggling moments get tagged with what the user was trying to accomplish, what failed, what alternative they wished for.
- Tags cluster: multiple users describe the same kind of friction in similar contexts.
- Each cluster suggests a job: the underlying thing users were trying to do that the cluster's friction was blocking.

**Worked example.** Across 12 interviews with PM users:

- Multiple users describe assembling data from multiple dashboards before quarterly business reviews.
- Multiple describe building Excel exports because their dashboard tool does not produce the right slice.
- Multiple describe second-guessing whether the data they assembled is correct.
- Multiple describe the time pressure and disruption these workarounds create.

The cluster suggests a job: "When preparing for quarterly business reviews, I want to assemble cross-source data into a coherent narrative I can defend, so I can answer the board's questions confidently without spending the night before reconciling spreadsheets."

The job emerges from the moments; the moments came from the prompts.

---

## Distinguishing struggling moments from venting

Not every friction users describe is a struggling moment for product purposes.

**Struggling moments.**

- Specific friction that interferes with the user accomplishing something they care about.
- The friction is reproducible (other users encounter similar friction in similar contexts).
- The friction has a workaround or alternative the user has tried.

**Venting that is not a struggling moment.**

- General complaint without specific friction context ("everything is too slow").
- Preference for cosmetic differences ("I do not like the color").
- One-off issues with no pattern across users.

**The discipline.** Tag specific friction; do not over-weight venting. The struggling moments that drive product decisions are the ones with reproducible context across users.

---

## The "what would you have done differently" question

A specific prompt that surfaces both struggling moments and the implicit alternative.

**The prompt.** "If you could have done [task] any way you wanted, how would you have done it?"

**What it surfaces.**

- The user's mental model of the ideal approach.
- The gap between current tools and the user's mental model.
- Sometimes the alternative tools the user has used or considered.

**What it does not surface.**

- Always-correct product solutions. Users often describe alternatives that would not actually work; the value is in understanding their mental model, not adopting their proposed solution.

**The interpretation.** The user's described "would have done differently" is informative about the gap, not prescriptive about the fix. Synthesis interprets the gap and proposes product responses; users do not directly produce the responses.

---

## When users do not have struggling moments

Sometimes the interview reveals that the user is not struggling with the area the team is researching. They have a workable approach; they would not change it; the friction the team thought existed does not exist for this user.

**The honest interpretation.** The team's hypothesis about a job that needs better tooling may be wrong, or this user may not be in the target segment for the job, or the job may be done well enough by existing solutions that there is no struggle.

**The discipline.** Surface this finding rather than discounting it. "Some users are not struggling here" is data; ignoring it because it does not match the team's hypothesis is confirmation bias.

---

## Struggling moments by product type

Different product domains surface different kinds of struggling moments.

**Tools that fit into existing workflows.** Struggling moments are workflow disruptions: the moment the existing tool failed and the user had to switch to a workaround.

**Tools that change workflows.** Struggling moments are transition points: the moment the user realized the old workflow was unsustainable and considered changing it.

**Consumer products.** Struggling moments are often emotional: the moment the user felt frustrated, blocked, or in conflict with their own goals.

**B2B platforms.** Struggling moments often involve coordination: the moment the user could not align with a colleague, customer, or vendor because the tooling did not support the coordination.

The discipline. Tailor interview prompts to the kind of struggling moment most likely in the product domain; do not assume one prompt works for all domains.

---

## Common struggling-moment failures

**Eliciting preferences instead of moments.** "What features do you wish existed?" produces preferences. Reframe: "What's the last task that took longer than it should have?"

**Abstracting moments to patterns prematurely.** Users describing "what I usually do" instead of specific recent moments. Bring them back to the last specific time.

**Ignoring countervailing data.** Users who do not struggle in the researched area. Their data is signal; do not discard it.

**Treating venting as struggling moments.** General complaint without specific context does not produce jobs.

**Over-relying on the "wish" question.** Users describe ideal alternatives that do not necessarily reflect what would work; treat as gap-revealing data, not as product specs.

---

## Methodology-level choices that stay in the public skill

What a struggling moment is and is not. Discovery prompts that work and fail. The recency bias as a feature. Pattern recognition across users. Distinguishing struggling moments from venting. The "what would you have done differently" question. When users do not struggle. Domain-specific struggling moment patterns. Common failures.

## Implementation choices that stay internal

Specific interview templates and discussion guides. Specific recording and tagging conventions. Specific recruitment criteria for who the team interviews. The team's own conventions for interview length and structure. These vary by team and research practice.

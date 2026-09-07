# Applying JTBD to discovery

How JTBD shapes discovery interview structure, job clustering, and naming jobs from data. Pairs with `discovery-research-synthesis` for the broader synthesis discipline.

JTBD's strongest contribution to discovery is structural: interviews grounded in struggling moments and hire/fire decisions produce richer data than interviews that ask about feature preferences or use cases.

---

## Structuring discovery interviews around jobs

The JTBD discovery interview structure differs from feature-elicitation interviews.

**Feature-elicitation interview pattern.**

- "What problems are you trying to solve?"
- "What features would help?"
- "What is your ideal product?"

This structure produces user-prescribed solutions: feature requests, ideal-product fictions, and abstracted preferences. The data is hard to act on because users do not always know what would actually help.

**JTBD interview pattern.**

- "Walk me through the last time you did [task]. What happened? What was hardest?"
- "What were you doing before you adopted [current solution]? What made you switch?"
- "Tell me about a recent time when [task] went badly. What was different about that time?"
- "If you switched away from [current solution] tomorrow, what would the trigger be?"

This structure grounds the data in specific moments and real decisions. Users describe their experience; the PM doing synthesis interprets what the experience implies.

---

## Interview prompts that work

**Recent specific moments.**

- "Walk me through the most recent time you did [task]."
- "What was the last week when [task] cost you more time than usual?"
- "When was the last time [task] surprised you in a bad way?"

**Hire decision prompts.**

- "Tell me about the moment you decided to start using [product]."
- "What were you doing before? What made you switch?"
- "What alternatives did you consider? What ruled them out?"

**Fire decision prompts (for users who switched).**

- "Tell me about the moment you decided to switch away from [product]."
- "What was the alternative starting to look better? What tipped you?"
- "Looking back, why didn't you switch sooner?"

**Workaround prompts.**

- "What's something you do that takes longer than it should?"
- "What workarounds have you built?"
- "When was the last time you accepted a worse outcome because the better path was too painful?"

---

## Interview prompts that fail

**Hypothetical prompts.**

- "What would your ideal product look like?" (produces fiction)
- "If you had a magic wand, what would you change?" (produces wishlist)
- "What features would you like?" (produces feature lists)

**Abstracted prompts.**

- "How do you usually do [task]?" (produces averaged descriptions)
- "What's your typical experience?" (loses the specifics)
- "What kind of user are you?" (produces self-categorization)

**Leading prompts.**

- "Don't you find [feature] frustrating?" (confirms the team's hypothesis)
- "Wouldn't it be great if [feature]?" (produces agreement, not data)

---

## The interview length and depth

JTBD interviews benefit from depth. Surface answers come quickly; deeper jobs surface in the second half of an interview.

**Typical structure.**

- Minutes 0-15: warm-up, general context, what the user does and how their work fits together.
- Minutes 15-45: the recent specific moments, walk-throughs, struggling moments. The richest data emerges here.
- Minutes 45-60: hire and fire decisions, alternatives considered, switch decisions.
- Minutes 60-75 (when warranted): emotional and social dimensions, how the user wants to be perceived doing the work.
- Minutes 75-90: closing prompts, what the user wishes was different, what they would have done differently.

**The depth payoff.** Users open up after 30-40 minutes. The struggling moments they describe in the second half are usually richer than the first-half answers. Cutting interviews short at 45 minutes loses the depth.

**The 90-minute upper bound.** Beyond 90 minutes, fatigue degrades data quality. Schedule for 90; complete in 60-75; leave room for the depth without forcing it.

---

## Job clustering from interview data

After interviews, jobs emerge through clustering (per the synthesis sequence in `discovery-research-synthesis`).

**The clustering work.**

- Tag struggling moments and hire/fire decisions across interviews.
- Cluster moments that share underlying jobs (the user was trying to accomplish the same thing).
- Each cluster becomes a candidate job.
- Name the job from the cluster, not from a pre-built list.

**Common clustering patterns.**

- Multiple users described the same kind of friction in similar contexts. The cluster becomes one job.
- Multiple users described different surface-level frictions but the same underlying motivation and outcome. The cluster reveals a job that surfaces differently across users.
- One user's described moment is unique. May be an edge case, may be a job worth surfacing as smaller-segment.

---

## Naming jobs from data

Jobs are named from the cluster, not from a pre-built taxonomy.

**The naming process.**

- Read the cluster's contributing moments.
- Identify the situation, motivation, and outcome that recurred.
- Write the job statement: "When [situation], I want to [motivation], so I can [outcome]."
- Test the statement against the source moments: does it capture what users were trying to accomplish?

**The iteration discipline.** First-pass job statements are usually too narrow or too broad; refine through iteration.

**Worked example.** A cluster of moments around quarterly board prep:

- Multiple users described assembling data from multiple sources.
- Multiple described uncertainty about whether they had the right slice.
- Multiple described the time pressure and the disruption to other work.
- Multiple described wanting to walk into the board with confidence.

First-pass job statement: "When preparing the board deck, I want to assemble data from multiple sources, so I can present numbers correctly."

Second-pass refinement: "When preparing for quarterly business reviews, I want to assemble cross-source data into a coherent narrative I can defend, so I can answer the board's questions confidently without spending the night before reconciling spreadsheets."

The second pass captures the situation more specifically (quarterly business reviews, not just any board deck), the motivation more specifically (coherent narrative I can defend, not just data assembly), and the outcome more specifically (answer questions confidently without grinding the night before, not just present numbers correctly).

---

## How many jobs emerge from typical discovery

Strong discovery cycles often surface 3-8 jobs across the research batch.

**Smaller numbers (1-2 jobs).** May indicate the discovery scope was narrow (only one user task investigated) or the synthesis under-clustered.

**Mid numbers (3-8 jobs).** Typical for substantive discovery cycles. Jobs cover the major user motivations the research surfaced.

**Larger numbers (10+ jobs).** May indicate over-clustering (each cluster is small and the overall synthesis is fragmented) or genuine breadth (the research investigated multiple distinct user contexts).

The discipline. Job count should reflect the underlying patterns the data reveals, not a target number. Force-fitting to 7 jobs because "that feels right" produces synthesis that does not match the data.

---

## Pairing JTBD discovery with quantitative validation

Qualitative job patterns often warrant quantitative validation.

**The pattern.**

- Job statement claims a specific frequency or severity ("users hit this friction in 40% of attempts").
- Quantitative data validates: analytics shows configuration step abandonment rate; survey data confirms the segment proportion; product instrumentation captures the in-the-moment frequency.
- If validation confirms: the job statement is strongly supported.
- If validation contradicts: revise the job statement to reflect the data.

**Pair with `experiment-design`** for rigorous validation methodology and `product-analytics-setup` for the instrumentation that makes validation possible.

---

## When JTBD discovery does not fit

Some discovery does not benefit from JTBD framing.

**Greenfield categories.** When the product is a category-defining product, users may not have struggling moments because the alternative is not having the capability at all. JTBD framing is useful but may need to be supplemented with broader product strategy.

**Highly novel use cases.** When users have not yet developed mental models for the use case (e.g., new technology categories), struggling moments may not exist because the activity itself does not exist. Discovery may need to focus on adjacent activities and what users would do if the new capability existed.

**Pure positioning research.** When the discovery is about how to position an existing product, hire and fire criteria interviews are useful, but emotional and social dimensions of positioning matter as much as the JTBD-framed jobs.

**The discipline.** JTBD is a tool, not a mandate. When the discovery question fits the framework, use it. When it does not fit cleanly, supplement with other discovery techniques.

---

## Common JTBD-discovery failures

**Eliciting feature lists instead of jobs.** Interview prompts ask "what features do you want" rather than "what are you trying to accomplish." Restructure prompts.

**Pre-built job taxonomy.** Researchers arriving with named jobs and slotting interview data into them. Jobs should emerge from data; pre-built taxonomies confirm what the team already thinks.

**Skipping struggling moments.** Interviews capture preferences and use-cases without grounding in specific friction events. Add struggling-moment prompts.

**Skipping hire/fire decisions.** Interviews ask about current usage but not about adoption or switch decisions. Add hire and fire prompts.

**Job statements written from intuition rather than data.** Researchers writing jobs based on what they think users are trying to do, without grounding in interview clusters.

**Force-fitting all data to JTBD.** Some interview data does not fit the JTBD framing cleanly; the team forces it in anyway. Better: surface what JTBD captures and supplement with other framings for the rest.

---

## Methodology-level choices that stay in the public skill

The interview structure that grounds in jobs. Prompts that work and fail. Interview length and depth. Job clustering from interview data. Naming jobs from data. Typical job counts. Pairing with quantitative validation. When JTBD discovery does not fit. Common failures.

## Implementation choices that stay internal

Specific interview templates. Specific recording and tagging tools. Specific synthesis tooling for job clustering. Specific recruitment criteria. The team's own conventions for interview cadence and batch sizing. These vary by team.

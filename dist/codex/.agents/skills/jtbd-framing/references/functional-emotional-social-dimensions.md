# Functional, emotional, and social dimensions of jobs

Jobs have three dimensions. Strong JTBD work surfaces all three; weak work treats jobs as functional only. The omission of emotional and social dimensions is one of the most common JTBD failure modes.

---

## The three dimensions

### Functional

What the user is mechanically trying to accomplish.

**Worked examples.**

- "Assemble the quarterly board deck."
- "Track team OKR progress."
- "Onboard a new engineer to the codebase."
- "Prepare a customer-facing announcement for a feature launch."
- "Reconcile vendor payments at month-end."

**Characteristics.**

- Describable in task language.
- Often the easiest dimension to surface in interviews.
- Often the dimension product teams default to.

---

### Emotional

How the user feels (or wants to feel) doing the job.

**Worked examples.**

- "Confident that the deck represents the team's actual progress, not a polished version."
- "In control of the OKR check-in cadence, not behind on it."
- "Helpful to the new engineer without becoming their full-time guide."
- "Comfortable that the announcement will not surprise anyone in a way that lands badly."
- "Confident that the reconciliation is correct without spending the whole week verifying."

**Characteristics.**

- Describes the user's internal experience.
- Often surfaces through how users describe what went well or badly.
- Distinguishes products that feel good to use from products that work mechanically but feel exhausting.

---

### Social

How the user wants to be perceived doing the job.

**Worked examples.**

- "Seen by the board as a competent leader who knows the numbers."
- "Seen by direct reports as someone who follows through on commitments."
- "Seen by the new engineer as a senior who invested in their onboarding."
- "Seen by customers as transparent and proactive, not evasive."
- "Seen by audit as someone whose work the team can trust without re-checking."

**Characteristics.**

- Describes how the user wants others to perceive their work.
- Often the most overlooked dimension.
- Drives positioning more than the other two dimensions.

---

## Why three dimensions matter

Products that win on functional alone often lose to alternatives that also serve emotional and social.

**Worked example.** Two analytics tools serving the same functional job.

- Tool A: technically thorough, full-featured, hard to learn, intimidating-feeling. Functional excellence; weak emotional dimension.
- Tool B: focused on the specific job, faster to confidence, feels manageable. Slightly less functional power; stronger emotional dimension.

For users who could complete the job with either, Tool B often wins. The emotional dimension (feeling in control, confidence) tipped the decision even though Tool A's functional dimension was technically stronger.

**Worked example, social dimension.** A board reporting tool serving CFOs.

- Tool A: produces correct numbers; layout is utilitarian.
- Tool B: produces the same numbers; layout signals "this CFO knows their numbers" through design.

The social dimension (how the CFO is perceived presenting from this tool) tips many decisions. Tool B is hired in part because it makes the CFO look good in front of the board.

---

## Surfacing emotional and social dimensions in interviews

Emotional and social dimensions often surface only when the interview prompts for them.

**Functional prompts.** "Walk me through the task. What did you do?"

**Emotional prompts.** "How did you feel doing this? What was the most stressful part? When did you feel relieved?"

**Social prompts.** "Who else was watching this work? How did you want to come across to them? What did you do specifically because of how it would look?"

**The interview discipline.** Surface all three dimensions; do not assume the functional dimension is the whole job. Many users will not volunteer emotional or social dimensions; the prompts surface them.

---

## When functional alone is sufficient

Some jobs are dominantly functional and the emotional/social dimensions are minor.

**Worked example.** A backup utility that runs in the background. The functional dimension (data is backed up correctly) is the whole job; the user does not have an emotional relationship with the tool and is not perceived doing it.

**The discipline.** Some products are appropriately functional-only. The team's job is to recognize when the dimensions matter and when they do not. Force-fitting emotional and social dimensions onto purely functional jobs produces false signal.

---

## Functional-only failure mode

The most common JTBD failure: surfacing only the functional dimension.

**The pattern.** Job statements describe what the user is mechanically doing; the team prioritizes functional features; the product wins on functional excellence and loses on emotional and social.

**The cure.** Re-interview a subset of users with emotional and social prompts. Add the dimensions to existing jobs. Re-evaluate strategy considering all three dimensions.

**The signal.** Products that are technically excellent but lose to "lesser" alternatives often have an emotional or social dimension the strategy missed. Investigate.

---

## Emotional dimension and product feel

The emotional dimension shows up in product feel: the way using the product makes users feel.

**Examples of emotional dimensions in product design.**

- A complex configuration interface vs a guided wizard. Both can be functionally equivalent; the wizard often serves the emotional dimension of "feeling in control rather than overwhelmed."
- An error message that explains and offers recovery vs one that just reports the failure. Both can be technically accurate; the explaining one serves the emotional dimension of "feeling supported rather than stuck."
- A success state that celebrates the milestone vs one that proceeds silently. Both can be functionally complete; the celebrating one serves the emotional dimension of "feeling progress rather than grinding."

**The discipline.** Product designers often instinctively address emotional dimensions; the JTBD work makes this explicit and prioritizable. Emotional dimension can be a deliberate strategy choice rather than a designer's intuition.

---

## Social dimension and positioning

The social dimension informs positioning more than the other dimensions.

**Examples of social dimensions in positioning.**

- "Used by senior engineers at companies that ship reliable software." (positions the user as a senior engineer at a reliable company.)
- "The board reporting tool CFOs at high-growth startups trust." (positions the CFO as someone who works for a high-growth startup.)
- "Built for product teams that ship every week." (positions the product manager as part of a high-velocity team.)

**Why social dimension is positioning-relevant.**

- Users want to be perceived as belonging to the kind of teams the positioning describes.
- Positioning that names the social dimension creates affinity; positioning that names only functional features competes on feature comparison.
- The social dimension is durable; functional dimensions can be matched, social dimensions are harder to copy.

**The discipline.** Positioning work should explicitly identify the social dimension of the jobs the product serves. Positioning that ignores social dimension misses one of the strongest tools available.

---

## Worked synthesis combining all three dimensions

A job statement enriched with all three dimensions:

**Job:** "When my team is rolling out a new feature and I need to communicate it to customers, I want to write a clear announcement that explains what changed and why it matters, so I can ship the rollout without flooding support with confusion."

**Functional dimension:** Write the announcement, distribute it to customers, prepare support for incoming questions.

**Emotional dimension:** Confident that the announcement will land well, not anxious that it will trigger a wave of confused tickets, in control of the rollout rather than reactive to its fallout.

**Social dimension:** Seen by the team as someone who handles rollouts smoothly, seen by customers as a brand that communicates clearly about changes, seen by support team as someone whose announcements reduce their workload rather than create it.

**Product implications.** A tool that helps with this job needs to:

- Functionally: support drafting, distribution, and support-team coordination.
- Emotionally: provide confidence-inducing review (preview tools, sentiment checks, changelog patterns).
- Socially: produce announcements that carry the brand voice the user wants associated with their rollouts.

The three-dimensional analysis surfaces product needs the functional analysis alone would miss.

---

## Common dimension-related failures

**Functional-only synthesis.** Job statements describe mechanical tasks; strategy prioritizes functional features; product loses on feel.

**Decorative emotional dimension.** Adding "feels good" without specifying which emotional state the product should support. The dimension exists on paper but does not drive design decisions.

**Missing social dimension.** Strategy and positioning work that ignores how users want to be perceived. Positioning ends up generic; product fails to create affinity.

**Force-fitting all three to every job.** Some jobs are functional-dominant. Adding emotional and social dimensions where they do not matter produces noise.

**Treating dimensions as separate jobs.** Functional, emotional, and social dimensions are aspects of the same job, not separate jobs. Treating them separately produces fragmented strategy.

---

## Methodology-level choices that stay in the public skill

The three dimensions and their characteristics. Worked examples per dimension. Interview prompts per dimension. The functional-only failure mode. Emotional dimension and product feel. Social dimension and positioning. Worked three-dimensional synthesis. Common failures.

## Implementation choices that stay internal

Specific interview prompt templates per dimension. Specific synthesis templates that capture all three. Specific design-review patterns that check for emotional dimension. Specific positioning frameworks that lead with social dimension. These vary by team and design practice.

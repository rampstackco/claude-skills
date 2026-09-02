# Positioning canvas

The one-page positioning template. Worked examples for B2B SaaS, B2C, and developer features. The vague-target-user failure mode.

The principle. Positioning is the foundation of the launch. Without it, comms drift, sales improvise, and customers come away with a different understanding of the feature than the team intended. Filled out before any comms drafting; reviewed by sales, support, and an executive sponsor before launch.

---

## The canvas

One page. Six sections. Filled out by the PM with input from sales, customer success, and design.

### 1. Target user

**Segment.** What kind of company or individual.

**Role.** What is their job title or function.

**Jobs-to-be-done.** What is the user trying to accomplish in their work or life that this feature serves.

**Specificity test.** Could a sales rep describe the customer profile in one sentence? Could marketing target ads at this segment? If no to either, the target user is too vague.

### 2. Problem it solves

**The current pain.** In the user's words. What is hard, slow, error-prone, or impossible today.

**The cost of the pain.** Time, money, errors, missed opportunities. Quantified where possible.

**Specificity test.** Is the problem stated in concrete terms or in abstract language? "Productivity is low" is abstract. "The customer support manager spends 3 hours per day triaging tickets that an automated system could route" is concrete.

### 3. Current alternative

**What users do today without this.** The status quo, the workaround, the competing product, the manual process, the spreadsheet.

The status quo is the real competition. A feature that is better than nothing but worse than the user's existing workaround does not get adopted.

### 4. User-visible promise

**One sentence.** The promise the user will hear when they encounter the feature.

**Specificity test.** Can sales repeat it without changing words? Can support repeat it without paraphrasing? If no, it is too long or too abstract.

### 5. Proof points

**Three to five specific capabilities or outcomes.** Concrete, not adjectives.

Examples of bad proof points: "fast," "easy," "secure," "intelligent." These are claims, not proof.

Examples of good proof points: "exports a 200-page report in under 5 seconds," "supports 14 languages including right-to-left," "SOC 2 Type II audited by Deloitte 2025."

### 6. Anti-positioning

**What this is NOT.** What it does not try to do.

Anti-positioning prevents over-promising. If the feature does not handle enterprise scale, say so. If it does not work offline, say so. If it does not replace the customer's existing tool, say so.

The anti-positioning protects the team from sales reps who hear about the feature and embellish. It protects support from customers who expected something the feature does not do.

---

## Worked example 1: B2B SaaS feature

A B2B project management tool ships a new automated routing feature.

| Section | Content |
|---|---|
| Target user | Customer support managers at SaaS companies with 10 to 100 support reps. JTBD: triage incoming tickets and route them to the right team without reading every ticket. |
| Problem it solves | Current manual triage takes 2 to 3 hours of a support manager's day. Tickets sit in the queue waiting for routing while customers grow impatient. The cost is 10+ hours per week of manager time plus 30 to 60 minute response delays on simple tickets. |
| Current alternative | Manual triage by a senior support rep, or basic keyword routing rules in their existing helpdesk that produce 30 to 40% misroutes. |
| User-visible promise | "Route incoming tickets to the right team in under 30 seconds with 95% accuracy." |
| Proof points | (1) ML model trained on 90 days of historical ticket routing decisions. (2) Accuracy benchmarks: 95% routing accuracy at launch, retraining weekly. (3) Override and feedback flow lets support managers correct routes; corrections feed back into the model. (4) Audit log of every routing decision for compliance. (5) Configurable confidence threshold; below the threshold, the ticket falls back to manual routing. |
| Anti-positioning | This is not a full ticket-resolution AI. It does not draft replies, identify duplicate tickets, or detect sentiment. It only routes. |

The anti-positioning protects the team from sales reps who would otherwise pitch this as "AI customer support."

---

## Worked example 2: B2C feature

A consumer note-taking app ships AI-generated summaries.

| Section | Content |
|---|---|
| Target user | Students and knowledge workers who maintain long-form notes. Specifically users with 50+ notes longer than 500 words. JTBD: quickly recall the key points of a note without re-reading it. |
| Problem it solves | Long notes get written then forgotten. The user cannot recall what is in them without scrolling and re-reading. Cost: hours per week of search-and-rediscover, plus the worse cost of acting on stale information. |
| Current alternative | Manual TLDRs the user writes themselves (rare). Highlighted text within the note (common but unreliable). Re-reading the full note (default; expensive). |
| User-visible promise | "See a summary of any note in two seconds." |
| Proof points | (1) Summaries appear at the top of every note over 500 words. (2) Summary regenerates when the note is meaningfully edited. (3) Click any summary point to jump to its source paragraph in the note. (4) Generates in under 2 seconds for notes up to 5,000 words. |
| Anti-positioning | This is not a research assistant; it does not pull in outside context or related notes. It summarizes the note in front of you, nothing more. |

---

## Worked example 3: developer feature

A developer tools company ships a new CLI command.

| Section | Content |
|---|---|
| Target user | Backend engineers using the platform's CLI for deploys. Specifically engineers who run more than 5 deploys per week. JTBD: deploy faster and roll back when something breaks. |
| Problem it solves | Rollbacks today require digging through deploy history, finding the prior version, and running a deploy command with the version pinned. Takes 2 to 5 minutes; under incident pressure, the time matters. |
| Current alternative | Manual deploy command with version pin. Some teams script this; most do it from memory under pressure. |
| User-visible promise | "Roll back to the last known good deploy with one command." |
| Proof points | (1) Single command: `acme deploy rollback`. (2) Defaults to the most recent successful deploy that is older than the current. (3) Confirmation prompt shows what will be rolled back; passes through to the existing deploy flow. (4) Logged as a rollback in deploy history (not as a fresh deploy) for clean audit trail. |
| Anti-positioning | This does not auto-detect bad deploys. The engineer still decides when to roll back. |

---

## The vague-target-user failure mode

The most common positioning failure. The PM writes "It is for PMs" or "It is for engineers" or "It is for marketers."

Why it fails. Different PMs, engineers, and marketers have different jobs. A B2B PM at a 50-person startup has a different job from a B2C PM at a 5,000-person company. A backend engineer has a different job from a frontend engineer. The vague target prevents sales from filtering, prevents marketing from targeting ads, prevents support from anticipating questions.

The fix. Specificity layers.

- Industry or company type. (B2B SaaS at 50 to 500 customers.)
- Role and function. (Customer support manager, not just "support.")
- Jobs-to-be-done. (Triage incoming tickets, not "improve productivity.")

Three layers of specificity move the target from useless to actionable. If you cannot fill in all three, the team has not yet decided who the feature is for.

---

## Reviewing the canvas

Before launch, review the positioning canvas with three audiences.

1. **Sales review.** Can sales pitch this in 30 seconds? Does the language match how customers ask about the problem?
2. **Support review.** Can support answer the obvious questions (what does it cost, how do I turn it on, what are the limits) using only the canvas?
3. **Executive review.** Does the positioning fit the company narrative? Will it confuse customers who are mid-purchase on a different feature?

If any of the three review groups push back, fix the canvas before launch comms drafting begins. Drafting comms on top of weak positioning produces comms that look fine in isolation but contradict each other across channels.

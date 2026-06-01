# Task Script Patterns

Patterns for writing usability test tasks that produce real findings rather than scripted compliance. Includes good and bad examples by common product type.

---

## Universal task framing rules

### Rule 1: State the user goal, not the system action

| Bad (system action) | Good (user goal) |
|---|---|
| "Click the search button at the top." | "Find a place to stay in Lisbon for a weekend." |
| "Open the settings menu and change your password." | "You think someone else might know your password. Update it." |
| "Add this product to your cart." | "You want to buy this jacket. Walk me through purchasing it." |

The system-action version reveals the path. Findings tell you whether the participant could follow instructions, not whether they could use the product.

### Rule 2: Provide motivating context

| Bare task | Better with context |
|---|---|
| "Find a hotel in Paris." | "You're planning a 3-day trip to Paris next month for your anniversary. Find a hotel that fits." |
| "Sign up for an account." | "You decided this looks promising and want to try it. Get started." |

Context shapes how participants approach the task. Without it, they make their own assumptions, often differently from each other.

### Rule 3: Avoid product terminology

| Bad (uses our terms) | Good (uses user's terms) |
|---|---|
| "Create a workspace." | "Set this up so your team can collaborate." |
| "Find an experience." | "Find an activity to do this Saturday." |

If the participant doesn't already know the product's terminology, using it in the task gives them the answer.

### Rule 4: Don't reveal the path

| Bad (path revealed) | Good (open) |
|---|---|
| "Use the filters to narrow the results to under $100." | "Find something within your budget of $100." |
| "Click on the FAQ section to find the return policy." | "Find out if you can return this if it doesn't fit." |

If the path is in the task, you're not testing whether the participant can find the path.

### Rule 5: Make it specific

| Bad (vague) | Good (specific) |
|---|---|
| "Try out the product." | "Find out if this product would work for tracking your team's meetings." |
| "Look around." | "Walk me through how you'd evaluate whether this is right for you." |

Vague tasks produce vague findings. Specific tasks produce actionable findings.

---

## Common pre-test framing

Use a script for the opening so it's consistent across sessions.

### Standard opener

> "Thanks again for joining. As I mentioned, we're testing a [website / app / prototype]. The point is to learn from your experience, not to test you. There are no right or wrong ways to do anything. If you get confused or stuck, that's information for us, not a problem with you.
>
> A few things to know:
> 1. I'll ask you to do some tasks. As you go, please think out loud. Tell me what you're looking at, what you're thinking, what you expect to happen, what's confusing.
> 2. I won't be able to help much during the tasks. The whole point is to see how you'd use this without help. After each task, we'll talk about what was easy and what wasn't.
> 3. We're recording this session for our own notes. The recording stays internal. Sound good?
>
> Any questions before we start?"

### Pre-task framing

> "OK, here's the first task. Take your time, think out loud, and there's no rush.
>
> [Read the task aloud, slowly. Send it in chat if remote so they can refer back.]
>
> Go ahead and start whenever you're ready."

### Mid-task probes (use sparingly)

When participant is silent for a while:
> "What are you thinking?"

When participant pauses on something:
> "What's going through your mind right now?"

When participant takes an unexpected action:
> "What did you expect to happen there?"

### When participant gets truly stuck

Wait at least 30 seconds before intervening. Real frustration is signal.

> "Take a moment. What would you typically do at a point like this?"

Or:

> "Is there anything you'd want to do that you're not seeing a way to do?"

If they're still stuck after another 30 seconds, you can offer a hint: "What might happen if you scrolled?" But this is a last resort. The struggle is the data.

### Post-task probes

> "On a scale of 1 to 5, how easy or hard was that?"

> "What was hardest?"

> "What was easiest?"

> "If you could change one thing about how that worked, what would it be?"

### Closing

> "Thanks for working through these tasks. Two last questions:
>
> Overall, what's your impression?
>
> If you imagine using this regularly, what would make it work for you? What might keep you from using it?
>
> Anything else you want to mention before we wrap?"

---

## Task patterns by product type

### Ecommerce

#### Browse and discovery

> "You're looking for a gift for a friend who loves cooking. They've been getting into making bread. You have a budget of about $75. Find something that might work."

[Tests: navigation, search, filtering, product browsing]

#### Specific product purchase

> "You've decided to buy [specific product]. Walk me through purchasing it. Stop just before you'd actually enter your payment info."

[Tests: cart flow, checkout flow, friction points]

#### Comparison

> "You're trying to decide between two of these products. Use the site to figure out which one is better for your needs."

[Tests: comparison features, product pages, decision support]

#### Returns

> "You bought something from this store last month. It doesn't fit. Find out how to return it."

[Tests: help center, account flows, post-purchase support]

---

### SaaS / B2B

#### Self-service evaluation

> "You're a [role] at a 30-person company. Your team needs better [tool category]. Use this site to figure out if this is the right fit, and if so, what plan to pick."

[Tests: positioning, value prop, pricing, evaluation flow]

#### Onboarding (post-signup)

> "You just signed up for an account. Walk me through what you'd do next. Try to get to the point where the product would be useful for you."

[Tests: onboarding, time-to-value, activation friction]

#### First key task

> "You're new to this product. Try to [specific key action: create your first project, set up an integration, invite a teammate]. Think out loud as you go."

[Tests: feature discovery, task completion]

#### Existing-user task

> "You're an experienced user of this product. You need to [specific advanced task]. Show me how you'd do that."

[Tests: depth of features, expert workflows]

---

### Marketplaces

#### Buyer side: discovery

> "You need someone to [service]. Find a few options that look good to you."

[Tests: search, filters, listing pages]

#### Buyer side: deciding

> "You've narrowed it down to a few options. Pick the one you'd actually book and walk me through what you'd do next."

[Tests: details pages, social proof, booking flow]

#### Seller side: setup

> "You [run a business / offer a service]. You're considering listing it here. Use this site to figure out how to get started."

[Tests: onboarding, value prop for the supply side]

#### Seller side: ongoing

> "You're an existing seller. You want to [check on inquiries / update your availability / respond to a review]. Show me how you'd do that."

[Tests: account management, dashboard]

---

### Content / publisher

#### Reading flow

> "Read [specific article / topic that interests you]. As you go, tell me what's working or not working about the experience."

[Tests: readability, page experience, ads, related content]

#### Discovery

> "Spend a few minutes exploring this site. Find articles that interest you. Tell me how you decide what to click."

[Tests: navigation, recommendations, browse paths]

#### Subscribe

> "You've decided you want to read more from this publication. Sign up for whatever you think makes sense."

[Tests: paywall flow, subscription page, account setup]

---

### Mobile app

#### Initial impression

> "You just downloaded this app. Open it and start using it. Tell me what you do, what you expect."

[Tests: app onboarding, initial value]

#### Specific feature

> "You want to [specific feature use]. Show me how you'd do that."

[Tests: feature discovery, mobile-specific patterns]

#### Push / notification flow

> "Your phone just buzzed with a notification from this app. Show me what you'd do."

[Tests: notification design, deep links, post-notification flow]

---

## Task script common pitfalls

### Pitfall 1: Multiple tasks in one

> "Sign up, create a project, and invite a teammate."

This is three tasks. Run as three separate tasks so you can score and analyze each.

### Pitfall 2: Tasks that aren't realistic

> "Imagine you're an enterprise CFO evaluating procurement tools."

If the participant is not a CFO, they're roleplaying. Findings tell you about roleplay, not real CFO behavior. Recruit real CFOs or pick a different task.

### Pitfall 3: Tasks the participant has already done

> "Sign up for an account."
>
> Participant: "I already have one."

Either log them out for the test, or change the task to first-time-user-feeling tasks.

### Pitfall 4: Tasks tied to specific data the participant doesn't have

> "Update your billing address."
>
> Participant: "I don't have an account on this site."

Provide a test account with realistic data, or pick tasks that work for first-time users.

### Pitfall 5: Asking about future behavior as a task

> "Tell me what you'd pay for this."

Hypothetical questions are weak signal. Test actual behavior (do they get to the pricing page? where do they hesitate?) and ask post-task what they'd be willing to pay if useful.

---

## Severity scoring rubric

Use after testing to score each issue.

| Severity | Definition | Example |
|---|---|---|
| Critical | Most users cannot complete the task. Hard blocker. | "5 of 6 participants gave up trying to find pricing." |
| Major | Most users complete the task, but with significant struggle. | "4 of 6 participants needed multiple tries to find the search." |
| Minor | Some users hit friction. Most complete the task fine. | "2 of 6 participants paused on the form, but all completed." |
| Cosmetic | Polish issue. No effect on task completion. | "Multiple participants noted a typo." |

Critical and Major issues block ship. Minor issues prioritize on cost/benefit. Cosmetic gets fixed in normal iteration.

---

## Reporting tips

- Lead with the **most surprising** finding, not the easiest fix
- Include **at least one quote per major finding** (specifics persuade)
- Include **video clips for critical findings** (no document beats seeing it)
- For each finding, include both **the issue** and **the recommended fix**
- Sort by **severity**, not by section of the product
- Make it **scannable**. Stakeholders skim.

---
name: team-onboarding-playbook
description: Design a structured onboarding experience that gets new team members productive in 30, 60, and 90 days. Use when a new hire is joining, when contractors or agency partners need to ramp up, when an existing team is restructuring and members are switching focus, or when current onboarding feels chaotic and slow. Also triggers when one person owns all the tribal knowledge and you need to capture it, when you keep losing people in their first 90 days, or when a new project has many fresh members joining at once. Useful for engineering, design, product, marketing, and operations roles.
---

A repeatable framework for building an onboarding playbook that ramps new team members predictably without burning out the people training them.

## When to use

- A new hire is joining and you do not have a written onboarding plan.
- An existing onboarding process is informal and inconsistent.
- A team is growing fast and onboarding is the bottleneck.
- A contractor or agency partner needs to ramp up quickly.
- A team member is leaving and their knowledge needs capturing.
- Onboarding currently takes too long and you want to reduce it.

## When NOT to use

- For ongoing performance management (different problem).
- For training on a specific technology (use targeted docs and tutorials).
- For documentation strategy in general (use `documentation-strategy`).
- For role definition or hiring (different upstream problem).

## Required inputs

- The role: what the person will do, what success looks like at 90 days.
- Existing artifacts: docs, runbooks, codebases, design files.
- The team: who will mentor, who will pair, who answers what kind of question.
- Tools and access: what accounts and systems the new person needs.
- Time budget: how much time team members can invest in onboarding.

## The framework

A good onboarding plan operates on 4 layers. Build all four.

### Layer 1: Belonging (Day 1 to Week 1)

The first week is mostly about belonging, not productivity. Get this right and everything else accelerates.

- Welcome message before they start.
- Workspace and accounts ready before day 1. No "we will get to that".
- A buddy or onboarding partner assigned (someone other than the manager).
- Day 1 schedule that is not 8 hours of meetings, but is also not zero meetings.
- Introductions to the people they will work with regularly.
- A first-week rhythm: daily check-in with manager or buddy.

### Layer 2: Context (Week 1 to Week 4)

The next phase is context. The new person needs to understand the system before they can change it.

- The product or business: what we do, who we serve, why we exist.
- The team: who owns what, how decisions get made.
- The technical or operational landscape: the architecture diagram, the main tools, the key files.
- The recent past: major decisions, recent launches, current priorities.
- Active projects: what is in flight and how it fits.

A reading list is part of this. Keep it short. Annotated. Curated.

### Layer 3: Contribution (Week 2 to Week 6)

By week 2 or 3, the new person should be making real contributions. Not because they are fully ramped, but because contribution is how ramping happens.

- A first task that is small, scoped, and shippable in week 2.
- Pairing or shadowing on a real piece of work in week 3.
- Independent ownership of a small project by week 4 or 5.
- Code review, design critique, or equivalent peer feedback from the start.

The first task matters. Pick something that touches the main systems but cannot break anything important. Something that ships gives confidence and visibility.

### Layer 4: Mastery (Month 2 to Month 3)

By the end of 90 days, the new person should be a full member of the team.

- Owning a project end to end.
- On-call or on-rotation if the team has one.
- Contributing to roadmap discussions, not just executing them.
- Mentoring or supporting the next new hire.

90 days is a checkpoint, not a finish line. Document what worked and what was missing for the next person.

## The 30/60/90 plan

Every onboarding plan should have explicit milestones at 30, 60, and 90 days.

### 30 days

- Workspace, tools, and access fully set up.
- Has met every team member.
- Understands the product, the team, and the recent context.
- Has shipped or contributed to at least one real piece of work.
- Has a clear picture of their first major project or area.

### 60 days

- Owns a project or area independently.
- Knows where to find answers without asking every time.
- Has formed working relationships beyond the immediate team.
- Has made at least one meaningful improvement to a process, doc, or codebase.

### 90 days

- Fully productive in the role.
- Participating in roadmap and planning discussions.
- Capable of training the next new hire on parts of the system.
- Comfortable raising concerns and pushing back.

If someone is significantly behind these markers at the 30/60/90 checkpoints, address it directly. Either the plan is wrong, the support is wrong, or the role fit is wrong. Hoping it resolves itself does not work.

## The role-specific overlay

The framework above applies to every role. The specifics differ.

### Engineering

- Day 1: dev environment running, first commit (a docs fix or trivial change).
- Week 1: read the architecture doc, read the main service code paths.
- Week 2: ship a small bug fix or refactor.
- Week 4: own a feature or component.
- Month 2: on-call shadow, then on-call.

### Design

- Day 1: design tools set up, design system access, brand guidelines reviewed.
- Week 1: studio crit and design review participation.
- Week 2: own a small surface (a setting page, an empty state).
- Week 4: lead a design review for a feature in flight.
- Month 2: own a feature design end to end.

### Product

- Day 1: read the strategy doc, the roadmap, and the latest 3 PRDs.
- Week 1: shadow customer calls, attend support sync, join standup of all relevant teams.
- Week 2: write a discovery doc or competitive analysis.
- Week 4: own a feature spec.
- Month 2: own a roadmap area.

### Marketing or content

- Day 1: brand voice doc, recent campaigns, top performing content.
- Week 1: customer research artifacts and persona docs.
- Week 2: ship a small piece of content (a social post, a blog edit).
- Week 4: own a content piece end to end.
- Month 2: own a campaign or channel.

Adapt to your role and stack. The shape stays the same.

## Workflow

1. Start the playbook before the new person arrives. Do not write it on day 1.
2. Pre-stage accounts, hardware, and access. This is the most common day-1 failure point.
3. Assign a buddy. Tell the buddy what is expected of them.
4. Send the welcome message and the day-1 schedule before they start.
5. Run the first week with a focus on belonging and context, not output.
6. Check in daily for the first week, weekly for the first month.
7. Run formal 30/60/90 check-ins with explicit milestones.
8. After 90 days, do a retrospective: what worked, what was missing.
9. Update the playbook based on the retrospective. Onboarding is a living doc.

## Failure patterns

- **No plan.** Day 1 with no schedule, no laptop, no accounts. Sets a tone.
- **Drinking from a firehose.** 8 hours of meetings on day 1. People remember nothing.
- **No real work for too long.** Three weeks of "reading docs" is demoralizing. Ship something small early.
- **All buddy, no manager.** Buddies are great but cannot evaluate or advocate. Manager is still on the hook.
- **Tribal knowledge as gating.** "Just ask Sara if you have questions" works until Sara is on vacation. Document the answers Sara keeps giving.
- **No 30/60/90 milestones.** Onboarding "ends" when someone seems busy. That is not a milestone.
- **Generic plan for every role.** Engineering and marketing have different first-week needs. Use the role overlay.
- **No retrospective.** The same gaps catch every new hire because nobody updated the playbook.
- **Buddy with no time.** Assigning a buddy who is also drowning is a recipe for poor onboarding and burnout. Protect their time.
- **Skipping the customer or product context.** Engineers who do not know who the customer is build the wrong things. Marketers who do not know how the product works write thin copy.

## Output format

Deliverables:

1. **Pre-day-1 checklist**: accounts, hardware, access, buddy assignment, welcome message.
2. **Day-1 schedule**: meeting list, intros, first deliverable.
3. **First-week reading list**: 5-10 curated, annotated docs.
4. **30/60/90 milestones**: the explicit checkpoints for this role.
5. **Buddy guide**: what is expected of the onboarding partner.
6. **Manager check-in cadence**: scheduled 1:1s and milestone reviews.
7. **Retrospective template**: to fill out at 90 days for next-time improvement.

## Reference files

- `references/onboarding-checklist.md`: A day-by-day, week-by-week checklist for the first 30 days, with role-specific variants and a 30/60/90 review template.

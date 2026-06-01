# Dev Brief Template

A dev brief is the lightweight version of a spec. Used for tactical work that does not need a full PRD: bug fixes, copy changes, small feature additions, infrastructure tweaks.

The brief is structured to be handed directly to a developer or AI agent. They should be able to act on it without follow-up questions.

---

## Template

```
TASK: [One-sentence summary of what to do]

CONTEXT
[1 to 2 sentences. Why this matters. What problem it solves.]

WHAT TO DO
[Specific changes. List the exact files (if known), the exact behavior to change, the exact copy to update. Be unambiguous.]

CONSTRAINTS
[What must NOT change. What to preserve. What's out of bounds.]

VERIFY
[Exact steps to confirm the work is done correctly. Each step should produce an observable outcome that proves the change worked.]

DEPENDENCIES
[Anything that must be done first, or that this depends on.]

PRIORITY
[P0 / P1 / P2 / P3 with one-line reason]

ESTIMATED TIME
[Minutes or hours - not days. If it would take days, write a feature spec instead.]
```

---

## Example: Bug fix brief

```
TASK: Fix the broken submit button on the contact form

CONTEXT
Users reported that the contact form submit button does not respond on mobile Safari.
This is blocking lead capture from a major traffic source.

WHAT TO DO
- Investigate components/forms/ContactForm.tsx
- Check the onClick handler and form submission logic
- The issue is likely related to a recent change to the button onClick handler;
  check git log for the most recent commit touching this component
- Fix so submit fires on tap as well as click

CONSTRAINTS
- Do not change any other forms in the codebase
- Do not modify the form validation logic
- Preserve the existing visual design of the button

VERIFY
1. Open contact form on mobile Safari (or device-mode in browser)
2. Fill required fields with valid data
3. Tap submit button
4. Confirm form submits and success message displays
5. Repeat on Chrome and Firefox to ensure no regression
6. Check browser console for errors after submit

DEPENDENCIES
None. Self-contained fix.

PRIORITY
P1 - blocking lead capture from primary traffic source

ESTIMATED TIME
30 to 60 minutes
```

---

## Example: Copy change brief

```
TASK: Update homepage hero copy to match new positioning

CONTEXT
The marketing team has finalized the new positioning statement.
The current hero copy is from the previous brand iteration and needs updating.

WHAT TO DO
File: pages/index.tsx (or app/page.tsx in App Router)

Change the hero H1 from:
  "The all-in-one platform for modern teams"
To:
  "Move work forward without moving the meeting"

Change the hero subheadline from:
  "Streamline your workflow with our innovative collaboration suite"
To:
  "Async-first project management for distributed teams that ship."

Change the primary CTA button text from:
  "Get started"
To:
  "Start free trial"

CONSTRAINTS
- Do not change the hero image
- Do not change the secondary CTA
- Preserve all existing styling and component structure

VERIFY
1. Reload the homepage in a browser
2. Confirm new H1, subheadline, and CTA text display correctly
3. Confirm visual layout is unchanged (no new layout shifts)
4. Confirm responsive behavior on 375px viewport
5. Run a Lighthouse pass to confirm no performance regression

DEPENDENCIES
None.

PRIORITY
P1 - aligned with brand launch on [date]

ESTIMATED TIME
15 to 30 minutes
```

---

## Example: Small feature brief

```
TASK: Add an estimated reading time to blog post pages

CONTEXT
Users have asked for an indication of how long a post takes to read.
Improves perceived value and helps users decide whether to start reading.

WHAT TO DO
- Calculate reading time as word count / 200 words per minute, rounded up
- Display below the post title, alongside the publish date
- Format: "5 min read" (with the minute count appropriate to length)
- Apply to all blog post pages (single post template)

Suggested implementation:
- Compute server-side from the post body content
- Add to the post component's metadata section
- Style consistently with the existing publish date

CONSTRAINTS
- Must work for posts of any length (test 1 minute to 30+ minute posts)
- Must not affect SEO (e.g., no JS-rendering for crawlers)
- Must not regress page load performance

VERIFY
1. Open 3 different blog posts of varying length
2. Confirm reading time displays correctly for each
3. Verify the calculation is right (count words manually for a short post)
4. Check the rendered HTML to confirm the value is server-rendered, not JS
5. Confirm visual styling matches the publish date treatment
6. Run Lighthouse to confirm no performance regression

DEPENDENCIES
None.

PRIORITY
P2 - nice user enhancement, no urgency

ESTIMATED TIME
1 to 2 hours including QA
```

---

## What makes a good brief

**Context** answers "why am I doing this?" Without it, the implementer cannot make good judgment calls.

**What to do** is specific. Names files when known. Quotes exact copy when copy is changing. Describes desired behavior unambiguously.

**Constraints** prevent scope creep. Especially for AI agents who tend to "improve" things outside the task.

**Verify** is the most-skipped section and the most important. Each verify step must be:
- Observable (you can see whether it passed or failed)
- Specific (no "make sure it works")
- Sufficient (if all verify steps pass, the work is genuinely done)

**Dependencies** prevent the implementer from starting work that's blocked.

**Priority** sets expectations on order.

**Estimated time** sets expectations on effort. Briefs are for work measured in minutes to a few hours. Days-long work should be a feature spec.

---

## When NOT to use a dev brief

If the work has any of the following, write a feature spec instead:

- Multiple stakeholders need to weigh in
- The user-facing behavior needs design review
- The change affects multiple parts of the system
- The estimate exceeds 1 day of work
- The success metric is non-obvious
- The work cannot be verified by a few specific steps

A dev brief is for "do this exact thing." A feature spec is for "build this product capability."

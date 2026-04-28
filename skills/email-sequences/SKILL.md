---
name: email-sequences
description: "Design and write email campaigns and sequences including onboarding flows, lifecycle campaigns, transactional emails, newsletters, and broadcast sends. Use this skill whenever the user wants to write email copy, plan an email sequence, design an onboarding drip, or set up lifecycle email campaigns. Triggers on email sequence, drip campaign, onboarding email, lifecycle email, welcome email, transactional email, newsletter, email broadcast, nurture sequence, abandoned cart, re-engagement, win-back. Also triggers when planning email automation flows or writing email subject lines for campaigns."
---

# Email Sequences

Plan and write email campaigns. Sequences (multi-message flows triggered by events) and broadcasts (one-off sends). Stack-agnostic. Works with any email service provider.

---

## When to use

- Writing welcome and onboarding email sequences
- Planning lifecycle campaigns (activation, retention, win-back)
- Writing transactional emails (receipts, password resets, notifications)
- Newsletter design and writing
- Abandoned-cart or re-engagement flows
- Drafting email subject lines and preview text for any send

## When NOT to use

- Landing pages and conversion pages (use `landing-page-copy`)
- Long-form articles (use `content-and-copy`)
- Brand voice work (use `brand-voice`)
- Analytics setup for email (use `analytics-strategy`)

---

## Required inputs

- The audience (segment or list)
- The trigger or context (signup, purchase, abandonment, time-based, manual)
- The goal of the email or sequence
- Brand voice
- Any technical constraints (provider, deliverability requirements)

If the audience is undefined, define it before writing. Generic emails to "everyone" perform worse than targeted ones.

---

## The framework: 6 sequence types

Most email programs run a handful of standard sequence patterns. Each has its own goals, structure, and pitfalls.

### 1. Welcome / onboarding

Triggered by signup. Goal: get the user to first value.

**Typical structure (5 emails over 14 days):**

- **Email 1 (immediate):** Welcome. Confirm they're in. State what happens next. Single CTA: the next obvious action.
- **Email 2 (day 1 or 2):** First-value step. Help them get to a quick win or core action.
- **Email 3 (day 4 or 5):** Education. Show them something they probably haven't discovered yet.
- **Email 4 (day 8):** Social proof. Customer story or use case relevant to their segment.
- **Email 5 (day 14):** Outcome reminder. Where they could be in 30/60/90 days. Soft commercial cue.

**Common failure:** Front-loading product features. Users don't care about features yet; they care about getting to value.

### 2. Lifecycle / activation

Time- or behavior-triggered. Goal: move users from signup to engaged user.

**Patterns:**
- Sent when a user completes a milestone (first project, first invite, first export)
- Or sent when a user has NOT completed a milestone after N days
- Each email targets a specific next step

**Best practice:** Trigger on behavior, not just time. A user who has done 3 onboarding steps doesn't need an email telling them to get started.

### 3. Retention / engagement

Ongoing. Goal: keep active users engaged.

**Patterns:**
- Newsletter (weekly or monthly)
- Product updates
- Tips and tutorials
- Customer-only content (community, behind-the-scenes)

**Cadence rule:** Frequency that earns the read, not frequency that fills the calendar. Weekly newsletter that is genuinely useful beats daily newsletter that gets archived.

### 4. Re-engagement / win-back

Triggered by inactivity. Goal: pull a lapsed user back.

**Typical structure (3 emails):**

- **Email 1:** "We miss you" framing or value reminder. What's new since they were last active.
- **Email 2:** Specific incentive (discount, feature unlock, content offer).
- **Email 3:** "Last call" or list-cleaning email. "We'll stop emailing you unless you click this."

**Best practice:** Honor the unsubscribe. Aggressive win-back damages deliverability. A clean list of engaged subscribers beats a large list of inactive ones.

### 5. Transactional

Triggered by actions: receipts, password resets, notifications, order confirmations, shipping updates.

**Best practices:**
- Confirm the action that triggered the email at the top
- Include all relevant detail without padding
- Use plain language ("Your order shipped" not "Your shipment notification")
- One primary CTA (track package, view receipt, view account)
- Subject line states the action ("Your receipt for order #12345")

**Highest open rates** of any email type. Use sparingly for marketing nudges; over-marketing transactional emails damages trust.

### 6. Broadcast

One-off sends. Announcements, launches, news, time-sensitive campaigns.

**Best practices:**
- Subject line earns the open
- Single clear message per send
- Specific audience targeting (do not blast the entire list for narrow announcements)
- Clear CTA in the first screen-height
- Mobile-optimized (most opens are mobile)

---

## The 5 components of every email

Regardless of sequence type, every email has the same components.

### 1. Subject line

The deciding factor for whether the email gets opened.

**Patterns:**
- **Specific** ("Your week 1 progress: 3 of 5 steps done")
- **Curiosity** ("The mistake most teams make in week 2")
- **Direct** ("Your invoice #12345")
- **Personal** ("Quick question, [name]")
- **Urgency** ("Last day for the team plan discount") - use sparingly

**Avoid:**
- ALL CAPS
- Excessive punctuation (!!!)
- Click-bait that doesn't deliver
- Generic ("Newsletter #23")

**Length:** 30 to 50 characters. Mobile clients truncate longer.

### 2. Preview text (preheader)

The line that appears below or beside the subject in most email clients.

**Best practice:**
- Treat as the subject's wingman
- Add what the subject line couldn't fit
- Avoid wasting it on "View this email in browser"
- 50 to 90 characters

### 3. Opening

The first line of the email body. The reader is deciding whether to keep reading.

**Strong openings:**
- Reference the trigger ("You signed up yesterday for...")
- Get to the point ("Here's what changed this week...")
- Personal ("Saw your team just hit milestone X. Nice work.")

**Weak openings:**
- "I hope this email finds you well."
- "Welcome to our amazing platform."
- Long throat-clearing before the actual content

### 4. Body

The substance.

**Length guide:**
- Welcome and transactional: under 100 words
- Lifecycle and activation: 100 to 250 words
- Newsletter: 200 to 800 words depending on format
- Sales sequences: 250 to 500 words

**Structure:**
- One core message per email (avoid "while we have you...")
- Short paragraphs (2 to 3 lines)
- Bullets or lists when content is enumerable
- Mobile-first formatting

### 5. CTA

The action the email is asking for.

**Best practices:**
- One primary CTA per email (multiple CTAs split attention)
- Button or clearly-styled link, not buried in prose
- Action verb + specific outcome ("See your dashboard" not "Click here")
- Above the fold AND repeated at the end of longer emails
- Plain text link as a fallback for users who block buttons

---

## Workflow

### For a new sequence

1. **Define the trigger.** What event starts this sequence? (Signup, purchase, abandonment, manual.)
2. **Define the goal.** What does success look like at the end of the sequence?
3. **Map the journey.** What does the recipient need to know, do, or feel between trigger and goal?
4. **Outline emails.** One purpose per email. Sequence them across appropriate timing.
5. **Draft email 1.** Subject, preview, opening, body, CTA.
6. **Draft remaining emails.** Each builds on the previous.
7. **Test the sequence.** Send to yourself. Read on mobile. Time the gaps.
8. **Set up triggers.** Configure in the email service provider.
9. **Measure.** Open rate, click rate, completion rate per email. Sequence completion rate.

### For a single broadcast

1. **Define the audience.** Specific segment, not the whole list.
2. **Define the goal.** One thing this email accomplishes.
3. **Draft subject + preview.** Generate 5 to 10 variations.
4. **Draft body.** Single message, clear CTA.
5. **Test on mobile.** Most opens are mobile.
6. **Schedule.** Day and time matched to audience behavior.
7. **Measure.** Open rate, click rate, downstream conversions.

---

## Failure patterns

- **Sending to "everyone."** Generic broadcasts to the full list have lower engagement than targeted segments.
- **Too many CTAs in one email.** Splits attention. Pick one.
- **Subject line clickbait that doesn't deliver.** Crashes the trust the email program is trying to build.
- **Sequences that ignore behavior.** Sending day-3 onboarding email to a user who already activated wastes the touch.
- **Mobile-broken layouts.** 60 to 70 percent of opens are on mobile. Test there first.
- **Long pre-text.** Burying the message under "I hope this email finds you well" wastes the read.
- **Aggressive win-back.** Emailing dormant users 5 times damages deliverability and brand trust.
- **No measurement.** Without tracking opens, clicks, and downstream conversion, you can't iterate.
- **Ignoring deliverability.** Sender reputation, authentication (SPF, DKIM, DMARC), list hygiene. Skip these and emails go to spam regardless of how good the content is.

---

## Output format

Default output is a markdown document per email or sequence:

```markdown
# Sequence: [Name]

**Trigger:** [What starts this sequence]
**Goal:** [Outcome at completion]
**Audience:** [Specific segment]
**Length:** [N emails over X days]

## Email 1 - [Subject working title]

**Send:** [Trigger / Day N]
**Subject:** [text]
**Preview:** [text]

[Body]

**Primary CTA:** [text]
**CTA URL:** [destination]

---

## Email 2 - [Subject working title]

[Same structure]

---

[etc.]
```

For a single broadcast, just one email block.

---

## Reference files

- `references/subject-line-patterns.md` - Subject line patterns with examples for each sequence type.
- `references/email-templates.md` - Skeleton templates for the 6 sequence types.

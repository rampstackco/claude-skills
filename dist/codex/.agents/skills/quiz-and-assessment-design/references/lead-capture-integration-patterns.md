# Lead capture integration patterns

When and where to ask for the email. Pattern choices and tradeoffs. The decision that affects both conversion and lead quality.

The lead-capture integration is where the quiz earns its email. Done well, the audience opts in for personalized value; done poorly, the quiz becomes a lead-trap that the audience resents.

---

## The capture-honest principle

Capture the email in exchange for personalized result delivery, not in exchange for seeing the result at all.

**The honest pattern.** The taker completes the quiz; the result is shown; an offer is made for additional value (PDF, follow-up sequence, saved scenario) that requires the email.

**The dishonest pattern.** The taker completes the quiz; the result is calculated but hidden; the email is required to reveal it. This is the lead-trap pattern (described in `calculator-design`'s email-capture-decision-tree but applies equally to quizzes).

---

## Pattern A: Email after questions, before result

The taker completes the quiz; before the result is shown, an email gate appears.

**How it works.**

- The taker answers all questions.
- A form appears: "Enter your email to see your personalized result."
- The taker enters email; the result is shown.

**Strengths.**

- Highest conversion to email opt-in.
- Common pattern; audiences are familiar.

**Weaknesses.**

- Lead-trap pattern. The audience that recognizes the manipulation feels resentment.
- Lead quality is lower; some takers enter throwaway emails.
- Downstream conversion suffers because some leads are unqualified or actively annoyed.

**When to use.** When the quiz is genuinely entertainment-driven and the audience expects the format (consumer brands sometimes work here). For B2B and considered purchases, this pattern often degrades trust.

---

## Pattern B: Email after result, for personalized delivery

The result is shown; an offer is made for personalized PDF or follow-up.

**How it works.**

- The taker answers all questions.
- The result is shown immediately, including segment description and matched recommendation.
- Below or alongside the result, an offer: "Want this as a PDF you can share?" or "Want a personalized 5-day sequence with deeper resources for your segment?"
- The taker who wants the additional value enters email.

**Strengths.**

- Honest. The audience gets what they came for.
- Lead quality is higher; takers who opt in are signaling real interest.
- Trust is preserved; audience that does not opt in still leaves with positive brand association.

**Weaknesses.**

- Lower conversion rate to email than Pattern A.
- Requires designing additional value (PDF, sequence) that justifies the email.

**When to use.** Default pattern for B2B and considered purchases. The honest exchange compounds trust over time.

---

## Pattern C: Email integrated with optional features

The result is shown; multiple optional opt-ins are offered.

**How it works.**

- The taker answers all questions.
- The result is shown.
- Multiple opt-in options appear, each with distinct value: "Save this scenario for later," "Get notified when new content for your segment is available," "Download a personalized resource."
- The taker chooses which (if any) to opt into.

**Strengths.**

- Most flexibility for the audience.
- Allows different audience segments to engage at different levels.
- Lead quality is high because each opt-in is for specific value.

**Weaknesses.**

- More complex to design and implement.
- Multiple options can dilute conversion ("paradox of choice").
- Requires the brand to actually deliver on each opt-in.

**When to use.** When the quiz has multiple legitimate value-add follow-ups and the audience benefits from choice.

---

## Pattern D: Progressive opt-in across the quiz

Email is captured early but only used after the quiz completes.

**How it works.**

- The quiz starts with optional email entry ("get a personalized PDF report when you finish").
- Takers can enter email upfront or skip.
- The quiz proceeds; the result is shown for everyone.
- Takers who entered email get the PDF; others see the result and an opt-in offer.

**Strengths.**

- Captures highly committed takers early.
- Does not gate the result.
- Provides a soft opt-in path for less-committed takers.

**Weaknesses.**

- Asking for email upfront can depress quiz starts.
- Two-path design (email-given vs not-given) adds complexity.

**When to use.** When the audience benefits from setting expectations upfront and when the brand can deliver value differently to opted-in vs walk-up takers.

---

## The value-add at lead capture

What the user gets for their email matters as much as when the email is asked.

**Strong value-adds.**

- A personalized PDF report matched to the segment.
- A follow-up email series that deepens the segment-matched content.
- A curated resource list specific to the result.
- Notifications about new resources, products, or events relevant to the segment.

**Weak value-adds.**

- Just sending the same result by email (no value-add over what is on screen).
- A generic newsletter signup (not personalized to the result).
- A "join our community" offer with no clear value.

**The discipline.** The value-add should be substantively better than what the audience saw on screen. If it is not, the email gate is not justified.

---

## Conversion vs lead quality

The patterns trade off these two metrics.

**Conversion-optimized.** Pattern A captures the most emails but produces lower lead quality. Suitable when the goal is volume or when the audience is highly aligned (every taker is a target lead).

**Quality-optimized.** Pattern B and C capture fewer emails but produce higher lead quality. Suitable when the goal is downstream conversion or when the audience is mixed (only some takers are target leads).

**The choice.** Depends on what the program optimizes for. Brands optimizing for downstream revenue often choose Pattern B or C. Brands optimizing for list growth may default to Pattern A.

**The trap.** Optimizing for conversion at the expense of lead quality is short-term thinking. The conversion metric looks fine; the downstream metrics suffer; the program quietly underperforms.

---

## The "no email needed" alternative

Some quizzes do not capture email at all.

**When this works.** When the quiz's purpose is brand-building, SEO, or audience-engagement rather than lead-capture. The quiz's existence and shareability are the value; the email is incidental.

**The pattern.** The taker takes the quiz; the result is shown; share buttons are prominent; no email gate.

**Why it can work.** Some brands earn more from a widely-shared quiz than from a gated quiz that captures fewer emails. The brand association is the value.

**When it fails.** When the program needs leads and the no-gate design produces nothing for the funnel.

---

## Lead-capture form design

The form itself matters.

**Field count.** Email only is the strong default. Each additional field reduces conversion.

**Field justification.** If additional fields are required (name for personalization, company for B2B sales context), justify them inline. "We use your name to personalize your follow-up" is honest; uncontextualized fields feel like sales-form padding.

**Form placement.** Inline with the result is honest; popup that interrupts the result viewing is hostile.

**CTA copy.** "Get my personalized PDF" beats "Submit." Specific value statement beats generic action.

**Loading state.** After submission, show progress and confirm receipt. "Sending your PDF now... check your inbox in 2 minutes."

---

## Post-capture experience

What happens after the email is captured.

**Immediate delivery.** The promised PDF, sequence, or resource arrives within minutes. Delays break trust.

**Confirmation message.** On the result page or in the email, confirm what was sent and what to expect next.

**Sequence integration.** If a follow-up sequence was offered, the first email arrives within 24 hours. The sequence delivers the promised cadence.

**Opt-out clarity.** Easy unsubscribe from the start. Audiences that find unsubscribe friction lose trust permanently.

---

## Capture-pattern testing

Test pattern choice with real metrics.

**Test design.** A/B test Pattern A vs Pattern B with the same quiz. Measure both conversion to email and downstream conversion (trial signup, demo request, purchase).

**The metric that matters.** Downstream conversion per visitor, not conversion to email. A pattern that captures fewer emails but produces more downstream conversion is the better pattern.

**Test duration.** Long enough to capture downstream signal (often 30-60 days minimum, depending on consideration cycle).

---

## Common capture failures

**Lead-trap pattern.** Result hidden behind email; downstream conversion drops; trust degrades.

**Email gate without value.** Email required for the same content; gate is not justified; conversion drops.

**Too many fields.** Form asks for name, company, role, phone in addition to email; conversion plummets.

**Generic CTA copy.** "Submit" rather than "Get my personalized PDF"; conversion suffers.

**Popup that interrupts.** Result loads; popup appears; user's flow breaks.

**Slow delivery.** PDF arrives 30 minutes later; trust drops.

**No confirmation.** User submits, sees no acknowledgment, wonders if it worked.

**Hard unsubscribe.** Multi-step or hidden unsubscribe; trust degrades.

---

## Methodology-level choices that stay in the public skill

The capture-honest principle. Pattern A through D with strengths, weaknesses, and when-to-use guidance. The value-add at lead capture. The conversion-vs-quality tradeoff. The no-email-needed alternative. Lead-capture form design. Post-capture experience. Capture-pattern testing. Common failures.

## Implementation choices that stay internal

Specific capture pattern choices for specific quizzes. Specific PDF templates and sequence designs. Specific form copy and CTAs in brand voice. The team's downstream-conversion benchmarks. These vary by team.

# Qualification field design

Strong and weak qualification fields. The five-field rule.

The fields decide the booking flow's friction and the call's quality. Done well, qualification produces context for the call without scaring off prospects; done poorly, it produces interrogation-gate dynamics.

---

## The earns-its-place principle

Each qualification field should serve one of two purposes: route the booking to the right rep, or give the rep enough context to skip the qualification phase of the call. Fields serving neither purpose are friction.

**The win.** Four fields: company size, role, primary use case, timeline. Each routes or preps. Conversion is high; rep prep is concrete.

**The fail.** Twelve fields including industry code, employee count range, marketing source, lead-source detail, gender. Most do not affect routing or prep; conversion drops 70 percent.

The discipline. Audit each field. Cut fields that do not earn placement.

---

## Strong qualification fields

Patterns that earn placement.

**Company size or team size.**

Why it works. Routes to the right rep tier (SMB vs mid-market vs enterprise); enables segment tracking; concrete signal of fit.

Format. Dropdown with bands ("1-10," "11-50," "51-200," "201-1000," "1000+").

**Use case or primary goal.**

Why it works. Lets the rep prepare for the conversation that matches.

Format. Dropdown with 5-7 use cases; or short open text if use cases are not enumerable.

**Current solution or stack.**

Why it works. Tells the rep where the prospect is starting; informs migration vs greenfield framing.

Format. Dropdown of common alternatives plus "other" with text field.

**Timeline or urgency.**

Why it works. Routes to active-pipeline vs nurture; signals urgency to the rep.

Format. Dropdown ("Within 30 days," "1-3 months," "3-6 months," "Just exploring").

**Role or job function.**

Why it works. Lets the rep tailor framing; routes to specialist reps if role-aligned.

Format. Dropdown of common roles; "Other" field for unusual cases.

---

## Weak qualification fields

Patterns that fail.

**Phone number.**

Why it fails. Often unnecessary if email and meeting time are captured. Reps can request phone in the call. Phone field adds friction without value for the booking itself.

When to include. If the call is by phone (not video), phone is necessary.

**Generic comments box.**

Why it fails. Free-text rarely informs prep. Most prospects skip; some over-share; few provide useful context.

When to include. Sparingly; if structured fields cannot capture the necessary context.

**Marketing data not used in the call.**

Why it fails. Industry codes, lead-source detail, etc. add friction without affecting the call's quality.

When to include. Capture later (post-meeting follow-up form, CRM enrichment) rather than at the booking.

**Demographic data unrelated to the call.**

Why it fails. Gender, age, etc. rarely inform a B2B sales conversation.

When to include. Almost never. Only if regulatory or product-specific reasons require.

---

## The five-field rule

Most production schedulers work well with 3-5 qualification fields.

**Why 3-5.**

- 3 fields is the minimum for useful qualification.
- 5 fields is the threshold beyond which drop-off climbs.
- Production data across many SaaS products supports this range.

**Exceptions.**

- Some enterprise sales contexts warrant 5-7 fields because the audience expects qualification.
- Some highly specialized products warrant fewer fields (1-2) because conversion volume matters more.

**The over-five trap.** Each additional field beyond 5 reduces conversion meaningfully. The marginal value of field 6 rarely justifies the conversion cost.

---

## Field ordering

Within the form, the order matters.

**Open with low-friction.** Identity fields (name, email) first. Familiar; easy.

**Build to value.** Use-case or goal fields next. The prospect engages with what the call will be about.

**Save commitment for later.** Timeline or budget fields late. The prospect has invested; harder ask is acceptable.

**End with optional.** Comments or "anything else?" at the end if included. The prospect can leave or skip.

---

## Field formats

How each field captures input.

**Dropdowns.** Best for categorical fields. Constrains responses; easy to route on.

**Text fields.** For free-form fields (name, email, sometimes use case).

**Sliders.** Rarely useful in qualification.

**Yes/No toggles.** For binary qualifying questions (e.g., "Do you currently use a CRM?").

**Conditional fields.** Some fields appear based on earlier answers. Use sparingly; complexity adds maintenance.

---

## Field validation

What to validate.

**Email format.** Standard validation; respect plus-aliases and international domains.

**Required vs optional.** Mark explicitly.

**Length and character.** Don't reject international names or non-Latin characters.

**The validation-strict failure.** Validation that rejects valid inputs (international phone formats, plus-sign emails) loses real prospects.

---

## Inferred vs asked fields

What to ask vs what to infer.

**Ask sparingly.** Each field is friction.

**Infer when possible.**

- Lead source: from URL parameters or referrer.
- Company info: from email domain.
- Geography: from IP or browser.
- Timezone: from browser.

**The discipline.** If the system can infer a value reliably, do not ask.

---

## Field-level analytics

Track per-field drop-off.

**Per-field completion rate.** Where in the form do prospects abandon?

**Diagnostic uses.**

- Specific field with high abandonment: friction at that field.
- Field rarely completed even by survivors: often signals the field can be cut.
- Specific segment abandons specific fields: segment-specific friction.

The data informs which fields earn their place over time.

---

## Field maintenance

Fields decay.

**What decays.**

- Dropdowns with options that no longer match audience.
- Fields the rep team stopped using for prep.
- Fields whose routing logic changed without update.

**Maintenance cadence.** Quarterly review of each field. Are reps using the data? Is routing connecting field-to-tier?

---

## Common field failures

**Too many fields.** Drop-off at the form.

**Fields not used.** Captured but reps do not prep with them.

**Wrong field types.** Free text where dropdown would route better.

**Validation too strict.** Loses valid prospects.

**No analytics.** Cannot tell which fields are working.

**Stale field options.** Dropdowns no longer match audience.

**Fields asked that could be inferred.** Friction without need.

---

## Methodology-level choices that stay in the public skill

The earns-its-place principle. Strong qualification fields (5 patterns). Weak qualification fields (4 patterns). The five-field rule. Field ordering. Field formats. Field validation. Inferred vs asked. Field-level analytics. Field maintenance. Common failures.

## Implementation choices that stay internal

Specific fields for specific schedulers. Specific dropdown options. Specific tooling for inference. The team's audit calendar. These vary by team and product.

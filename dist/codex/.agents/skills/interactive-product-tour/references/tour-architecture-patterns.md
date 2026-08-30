# Tour architecture patterns

Single tour vs branched vs library of micro-tours. The architecture that fits how users actually explore.

The architecture is how help is organized at the system level. Bad architecture produces canned tours that nobody finishes; good architecture matches how users actually explore.

---

## The exploration-fit principle

The architecture should match how users actually move through the product. Linear architecture fits linear products; library architecture fits exploration.

**The win.** A library of focused micro-tours, each tied to a specific feature, triggered contextually as users encounter features. Each tour is small (2-4 steps); each fires only at relevant moments. Users feel helped without feeling herded.

**The fail.** A single linear tour covering 25 features in sequence. Users who care about feature 17 get nothing relevant in the first 16 steps; they skip everything; help fails.

The discipline. Match architecture to exploration patterns; do not impose linearity on non-linear products.

---

## Pattern A: Single tour

One linear tour covering the product.

**How it works.**

- Tour starts at first-login or via a "Take the tour" prompt.
- Steps cover features in a defined order.
- User completes or skips entirely.

**Strengths.**

- Simple to design and maintain.
- Predictable for users.

**Weaknesses.**

- Linear; rarely fits how users explore.
- Can become tutorial-overload if comprehensive.
- One-and-done; rarely re-shown.

**When to use.** Very simple products with linear flows. Rarely the right answer for production tour systems.

---

## Pattern B: Branched tour

Tour adapts based on user choices or path.

**How it works.**

- User selects role/use case at start.
- Subsequent steps adapt based on the selection.
- Different users effectively complete different tours.

**Strengths.**

- More relevant than single tour.
- Personalized.

**Weaknesses.**

- Complex to build and maintain.
- Hard to instrument cleanly.
- Still linear in execution.

**When to use.** When the audience splits into 2-3 clear segments with different exploration paths. Use sparingly.

---

## Pattern C: Library of micro-tours

Dozens of small focused tours, each tied to a specific feature or workflow. Triggered contextually.

**How it works.**

- Many small tours (2-4 steps each).
- Each tour is tied to a specific feature, workflow, or moment.
- Trigger logic decides when each fires.
- Users see only the tours relevant to their current exploration.

**Strengths.**

- Matches how users actually explore.
- Each micro-tour is small enough to complete.
- Re-trigger logic can re-surface as features become relevant.
- Most flexible.

**Weaknesses.**

- Most maintenance.
- Trigger logic complexity.
- Requires per-tour completion tracking.

**When to use.** Default for production tour systems. Most modern products benefit from this approach.

---

## Pattern D: Hybrid

Combining patterns. Often a brief opening tour plus a library of micro-tours for ongoing help.

**How it works.**

- First-login: brief 3-4 step orientation tour (single).
- Ongoing: library of micro-tours triggered contextually.

**Strengths.**

- Orientation for new users + ongoing help for everyone.
- Combines the simplicity of single tour for the moment of arrival with the flexibility of library for the ongoing relationship.

**Weaknesses.**

- Two systems to maintain.

**When to use.** When new users genuinely benefit from an opening orientation AND ongoing contextual help is also valuable.

---

## Architecture choice criteria

Which pattern fits which product.

**Use single tour when:**

- Product is genuinely linear.
- Audience expects guided sequence.
- Maintenance capacity is limited.

**Use branched tour when:**

- Audience splits into 2-3 distinct segments.
- Each segment has a different linear path.

**Use library of micro-tours when:**

- Product has many features users explore non-linearly.
- Audience is segmented in many ways.
- Maintenance capacity supports many tours.

**Use hybrid when:**

- New-user orientation matters AND ongoing help also matters.

The simplest architecture that fits the product is usually the best choice.

---

## Micro-tour discipline

Each micro-tour should be small.

**Size guideline.** 2-4 steps per micro-tour.

**Why small.**

- Completable in under a minute.
- Easy to maintain.
- Targeted to a specific feature or moment.
- Less likely to be skipped.

**Anti-pattern.** Micro-tours that grow into 8-10 steps lose their micro nature; they become single tours that happen to be triggered contextually. Re-scope.

---

## Tour tagging and organization

When you have a library, organize it.

**Tagging axes.**

- Feature (which feature the tour covers).
- Workflow (which user workflow the tour fits in).
- User type (new, power, returning).
- Plan (free, paid, enterprise).

**Why tagging matters.**

- Trigger logic can use tags to decide which tour fires.
- Maintenance can find tours by feature when the feature changes.
- Audit can identify orphan tours not tied to current features.

---

## Tour deprecation

When features change, tours need to retire or update.

**Retire when:**

- Feature was deprecated; tour points to nothing.
- Feature changed enough that tour content is wrong; redesign instead of patch.

**Update when:**

- Feature changed in details but tour structure still applies.

**The deprecation hygiene.** Quarterly audit of tours against current product. Tours pointing to deprecated features get retired; tours that still apply but need refresh get updated.

---

## Common architecture failures

**Single tour for non-linear product.** Users skip; help fails.

**Branched tour with too many branches.** Maintenance burden; quality degrades per branch.

**Library without tagging.** Tours accumulate; nobody can find them; some are stale.

**Mega-tours.** Micro-tours that grew to 10+ steps; lose their micro nature.

**Orphan tours.** Tours pointing to features that no longer exist; not retired.

**Inconsistent micro-tour quality.** Some tours polished, others slapdash; users notice.

---

## Methodology-level choices that stay in the public skill

The exploration-fit principle. Patterns A through D. Architecture choice criteria. Micro-tour discipline. Tour tagging and organization. Tour deprecation. Common failures.

## Implementation choices that stay internal

Specific architectures for specific products. Specific tooling for tour authoring and management. The team's tagging conventions. Specific quarterly audit calendars. These vary by team and product.

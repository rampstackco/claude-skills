# Progressive disclosure patterns

Default-heavy, required-now-optional-later, expand-on-demand, branching patterns. How to surface only what is needed at each step.

The principle. Show only the inputs, options, and information the user needs to complete the current step. Defer everything else to in-product help or later configuration.

Wizards that try to show everything become tutorial-overload. Wizards that defer everything become skip-friendly-empty. Progressive disclosure is the discipline that surfaces what matters when it matters.

---

## Pattern A: Default-heavy

Each step has smart defaults; the user can accept or override.

**How it works.**

- Inputs come pre-filled with sensible defaults.
- The user reviews; accepts most; overrides where their context differs.
- Most users move through quickly; advanced users find the override controls.

**Strengths.**

- Reduces cognitive load.
- Faster completion.
- Users without strong preferences proceed; users with strong preferences customize.

**Weaknesses.**

- Defaults must be honest. Bias-flattering defaults erode trust.
- Defaults need maintenance as the product evolves.

**When to use.** Default for most wizards. Smart defaults reduce friction without removing customization.

---

## Pattern B: Required-now, optional-later

Required fields surface in the wizard; optional configuration surfaces in-product after activation.

**How it works.**

- Each step has only required fields.
- Optional configuration appears as in-product prompts after the wizard.
- The wizard stays focused on minimum-viable activation.

**Strengths.**

- Shortest possible wizard.
- Optional configuration happens when the user has product context.
- Activation rate improves; configuration completeness rises.

**Weaknesses.**

- Requires in-product prompt infrastructure for the deferred configuration.
- Some users may never return to complete deferred setup.

**When to use.** When the wizard has accumulated optional fields that bloat completion time. The strongest pattern for trimming bloated wizards.

---

## Pattern C: Expand-on-demand

Sections collapsed by default; the user expands if interested.

**How it works.**

- Step shows the minimal interface.
- An "advanced options" or "more details" toggle expands additional fields.
- Most users skip; advanced users explore.

**Strengths.**

- Surfaces depth without forcing it.
- Power users get what they need.

**Weaknesses.**

- Risk of hiding important fields the user does not realize they need.
- Adds visual complexity to the step.

**When to use.** When some users genuinely need depth that most do not. Use sparingly; default-heavy plus required-now-optional-later usually serves better.

---

## Pattern D: Branching

Different users see different steps based on earlier answers.

**How it works.**

- Step 1 asks about role, use case, or context.
- Subsequent steps adapt based on the answer.
- Different users effectively complete different wizards.

**Strengths.**

- Each user sees only steps that apply to them.
- Wizard feels personalized.

**Weaknesses.**

- Significant maintenance complexity.
- Testing burden grows (more paths).
- Analytics must accommodate variable paths.

**When to use.** When the audience genuinely splits into segments with materially different needs. 2-3 branches max; more becomes unmaintainable.

---

## Pattern E: Hybrid

Combining patterns. Default-heavy plus required-now-optional-later plus a single branch for major audience split.

**Strengths.**

- Reduces friction at multiple levels.
- Different users benefit from different mechanisms.

**Weaknesses.**

- Design and maintenance complexity.

**When to use.** When the wizard's audience and content warrant the combination. Most production wizards land in some hybrid configuration.

---

## What to surface vs defer

The decision per field.

**Surface in the wizard.**

- Fields without which the product cannot work for the user.
- Fields that affect the ah-ha moment.
- Fields that branch downstream steps.
- Fields that personalize the immediate experience.

**Defer to in-product.**

- Fields that affect long-term configuration but not immediate value.
- Fields that benefit from product context (the user understands what they are configuring).
- Fields that are commonly skipped anyway; surface them at moments of relevance.

**The deferable test.** For each wizard field, ask: would the user be better served setting this up after seeing the product, with relevant context? If yes, defer.

---

## Default discipline

Defaults are powerful. They must be honest.

**Honest defaults.**

- Defaults reflect the typical case for the audience.
- Defaults are sourced (from cohort data, common practice, or team judgment).
- Defaults can be overridden visibly.

**Bias-flattering defaults.**

- Defaults set to produce favorable signup metrics (cheap plan pre-selected, opt-in checked) without disclosure.
- Defaults that misrepresent the user's real choice.
- Defaults that change over time without user notice.

The discipline. Defaults reduce friction; they should not extract data or commitment the user did not consent to.

---

## Information density per step

How much to show.

**Minimal density.** Just the required fields plus a sentence of context. Shortest, fastest.

**Moderate density.** Required fields plus brief explanation plus optional toggle. Balanced.

**Heavy density.** Multiple sections, expandables, detailed help text. Most cognitive load.

The right density depends on the audience and the step's complexity. Default to minimal; add density only when the step's complexity warrants it.

---

## Help text discipline

When to include explanatory text.

**Strong help patterns.**

- Inline tooltip on non-obvious fields.
- One-sentence explanation per step ("we use this to tailor your dashboard").
- Examples for fields where the format is ambiguous.

**Weak help patterns.**

- Long help text on every field.
- Help text that is marketing rather than explanation.
- Help text that explains things the user already knows.

The discipline. Help text earns its inclusion when it reduces friction. Help text for the sake of completeness adds clutter.

---

## Mobile considerations

Progressive disclosure on mobile.

**Mobile-first defaults.** Default values matter more on mobile because typing is harder.

**Single question per screen.** Mobile screens are small; multi-field steps cramp.

**Touch-friendly toggles.** Expand/collapse must be touch-targetable.

**Minimal help text.** Mobile users skim; long help text is dismissed.

---

## Common progressive disclosure failures

**No defaults.** Every field blank; the user does work the wizard could have done.

**Bias-flattering defaults.** Defaults extract commitment the user did not consent to.

**Over-disclosed.** Every field surfaced; tutorial-overload.

**Under-disclosed.** Important fields hidden; the user finishes the wizard with a misconfigured product.

**Branching without need.** Branches that do not produce materially different paths add complexity without benefit.

**Help text bloat.** Every field has a paragraph of explanation; cognitive load climbs.

---

## Methodology-level choices that stay in the public skill

The five patterns (default-heavy, required-now-optional-later, expand-on-demand, branching, hybrid). Strengths, weaknesses, when-to-use guidance. What to surface vs defer. Default discipline. Information density. Help text discipline. Mobile considerations. Common failures.

## Implementation choices that stay internal

Specific defaults for specific wizards. Specific help copy in brand voice. Specific tooling for progressive disclosure. The team's audit calendar. These vary by team and product.

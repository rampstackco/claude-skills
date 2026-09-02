# Overview

The case for the skill, the references model, and the trademark posture.

---

## The problem this skill exists for

Portfolios of brand work drift toward house style. The first demo establishes a default; the second demo borrows it; the third has the same skeleton with a different name. Without a deliberate intervention at brief time, every new build leans on the same palette, the same micro-label tracking, the same hero gradient, the same voice register. The output is competent and sibling.

This pattern is observable in any portfolio that has shipped more than two builds. The symptoms show up at the imagery stage, when a stone-and-amber palette that worked for one shape suddenly reads as the brand's signature across three shapes that should not share a signature. The fix is upstream: pick the position before the build starts, and verify it stays distinct as the build renders.

This skill is the deliberate creative direction at brief time.

---

## The hybrid references model

Two parts:

### The curated bank

Files under `reference-bank/`, one per archetype-and-vertical combination. Each file holds three to six live reference URLs that exemplify the position, each with a one-line why and optional palette or type observations. The bank ships with three seed combinations and grows as new combinations are built against.

The bank is the institutional memory of the portfolio. A new build for an archetype-and-vertical combination that has been done before loads the existing references and adapts. A new build for a sparse combination supplies new references during discovery and commits them back as part of its build PR.

### Per-build discovery

When the bank is sparse for a chosen combination, the build's first pass searches the live web for three to six exemplars. Curation rules are in [`reference-bank/README.md`](reference-bank/README.md). The discovered references serve the current build and seed the bank for future builds in the same combination.

This is not a static reference list. The bank is supposed to drift over time as the portfolio grows; the discipline is that the bank reflects what was actually used in real builds.

---

## The two-direction divergence check

The skill runs divergence twice: once on input, once on output.

### Input-side divergence

Before any references are pulled, the skill loads the shipped-demos signatures file (a project artifact, not part of this skill; see [`04-shipped-demos-signatures-example.md`](04-shipped-demos-signatures-example.md) for the illustrative format). Candidate archetypes are checked against the signatures. If a candidate would land sibling to a shipped demo, it is discarded and the rejection is recorded.

The rejection record is itself useful output: it documents what the build was deliberately NOT.

### Output-side divergence

After the brief is rendered, the skill computes the brief's own signature (archetype, dominant hue family, voice register, primary structural pattern) and compares against the shipped signatures one more time. This catches adaptations that drifted back toward sibling territory during step 4 (the adapt step).

The check produces one of three outcomes: `passed`, `warn-with-reasons`, or `block-with-reasons`. A `block` result means the brief cannot ship in its current form and needs adaptation before the next attempt.

---

## Why two directions

Input-side alone catches the obvious overlaps: picking an archetype that another demo already uses with the same palette family. Output-side catches the subtle drift: an archetype was picked clean of any sibling demo, but during adaptation the palette quietly converged on the recurring house family.

The recurring stone-and-amber family is the worked example of this drift. The first build picked it intentionally; the second build adopted it because it was in the air; the third build adopted it because it felt like the brand. Without an output-side check, the brief itself becomes the carrier of the drift.

---

## Trademark and attribution

This skill follows the `brand-archetype-system` convention. Archetypes are named for aesthetic families ("Premium DTC Maker," "Heritage Local Service") not for brands. Live reference sites are cited as exemplars using nominative attribution language:

- "exemplified by [URL]"
- "characteristic of [URLs]"
- "in the register of [URL]"

This is descriptive and nominative fair use. A reference that pivots its identity does not invalidate the archetype it once exemplified, but it should be removed from the bank when the URL no longer shows what it was cited for.

---

## What this skill is not

- **Not a logo designer.** The brief includes a logo direction note ("type-led wordmark with a saddle-tan rule," "graphic mark in the dawn palette") but does not produce the mark itself.
- **Not an identity system.** The brief is the input to `brand-identity`, which produces the system.
- **Not a finished design.** The brief describes tokens; it does not lay them out into a finished page.
- **Not a positioning exercise.** The business spec is assumed to have positioning already. If positioning is open, run `brand-ideation` first.
- **Not a taste machine.** A user with no taste who runs this still produces incoherent work; the brief just makes the incoherence consistent. Taste is upstream of this skill.

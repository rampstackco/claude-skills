# Rules candidates (v2 option, not applied)

Antigravity supports always-on **Rules** in addition to on-demand **Skills**.
A Rule is injected into every turn, so it must be short and high-signal; a Skill
is loaded only when its description matches the task. This port ships all 102
entries as Skills. Nothing here is converted. This file documents three skills
that a project owner might later choose to promote to always-on Rules, and
sketches what each Rule would contain.

Why not convert now:

- Promotion changes runtime semantics (always-on injection vs on-demand load).
  That is a product call for the catalog owner, not a mechanical port step.
- Rules cost context on every turn, so a Rule must be a tight distillation, not
  the full multi-section skill. Each candidate below is a large, detailed skill;
  a faithful Rule is a hand-authored summary of its non-negotiables, which is
  authoring work, not a transform.
- Keeping every entry as a Skill keeps the port reversible and lossless.

A sensible v2 pattern is **keep the Skill, add a thin companion Rule**: the Rule
states the always-on floor and points at the Skill for the full procedure.

---

## 1. `design-standards`

**Why a plausible Rule.** It defines the production design floor (tokens,
contrast, hierarchy, spacing, mobile rules, pre-ship checklist) that should hold
for *every* page or component, not only when someone says "design". An always-on
Rule would keep contrast and spacing discipline in force even on unrelated edits
that happen to touch UI.

**Sketch of the Rule file** (`.agents/rules/design-standards.md`, always-on):

- One paragraph: any UI you build or change must meet the baseline; for the full
  framework load the `design-standards` skill.
- The hard floor only: WCAG AA contrast minimums, use design tokens not magic
  numbers, respect the type and spacing scale, mobile-first breakpoints, no
  ship without the pre-ship checklist.
- Pointer: "Full standards, templates, and the 6-standard framework are in the
  `design-standards` skill."

**Caveat.** The full skill is long and example-heavy; only the non-negotiable
floor belongs in an always-on Rule, or it will dominate every turn's context.

---

## 2. `security-baseline`

**Why a plausible Rule.** It is the pre-launch and periodic security floor
(HTTPS/TLS, security headers, CSP, HSTS, secrets management, basic vuln scan).
These are guardrails you want honored whenever infra, headers, or secrets are
touched, even if the task was not framed as "security".

**Sketch of the Rule file** (`.agents/rules/security-baseline.md`, always-on):

- One paragraph: never weaken the security floor; when configuring hosting,
  headers, env vars, or third-party scripts, hold the baseline and load the
  `security-baseline` skill for the full procedure.
- The hard floor only: HTTPS everywhere with HSTS, a restrictive CSP, the core
  security headers, no secrets in code or client bundles, review third-party
  scripts before adding them.
- Pointer: "Full checklist, header values, and audit cadence are in the
  `security-baseline` skill."

**Caveat.** Specific header values and compliance detail should stay in the
skill; the Rule carries only the do-not-cross lines.

---

## 3. `vertical-site-conventions`

**Why a plausible Rule.** It encodes a house standard: a build should read as a
credible member of its vertical, not as a generic SaaS landing page. A team that
ships many vertical sites might want that bar asserted on every build, so work
does not drift to off-vertical by default.

**Sketch of the Rule file** (`.agents/rules/vertical-site-conventions.md`,
always-on):

- One paragraph: when composing pages or a site, build to the conventions of its
  vertical (density, merchandising, navigation), not a generic layout; confirm
  the site shape first and load the `vertical-site-conventions` skill for the
  per-shape conventions.
- The hard floor only: identify the site shape from the controlled list before
  composing; do not ship a layout that reads off-vertical; prefer an experience
  bar from `competitor-experience-audit` when one exists.
- Pointer: "Per-shape conventions and the seven dimensions are in the
  `vertical-site-conventions` skill."

**Caveat.** This is the most procedural of the three and the least obviously
always-on; it is a candidate only for teams whose work is predominantly
vertical site builds. For a general catalog it is probably best left as a Skill.

---

## Recommendation

If the owner wants any always-on enforcement, the lowest-risk move is the
companion-Rule pattern for `design-standards` and `security-baseline` (the two
clearest always-on floors), each a short Rule that points back at its Skill.
`vertical-site-conventions` is more situational; leave it as a Skill unless the
project is vertical-build heavy. None of this is done here; it is a v2 option.

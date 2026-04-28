# Mapping: Existing Skills → Public v1

This document records the historical porting decisions for the initial public skill set (v1). It exists so contributors can see why a skill looks the way it does.

> **Note**: This is a historical document covering the initial v1 port. The current catalog has expanded substantially (see `README.md` for the current count and full list). The mapping below covers only the original v1 ports and net-new writes.

---

## Summary

The starting position: 5 user-scoped skills. The public v1: 11 skills. Five of the public skills are generic ports of existing ones. Six were net-new and written from scratch. Subsequent versions added many more skills covering the full lifecycle.

| Existing skill | Maps to | Action |
|---|---|---|
| `design-framework` | `design-standards` | Port + genericize |
| `pm-framework` | `pm-spec-writing` | Port + genericize |
| `seo-review` | `seo-foundations` | Port + lighten |
| `dev-code-review` | `code-review-web` | Port + abstract |
| `qa-testing` | `qa-testing` | Port + lighten |

| New skill | Source | Action |
|---|---|---|
| `brand-discovery` | New | Write from scratch |
| `creative-brief` | New | Write from scratch (prototype done) |
| `information-architecture` | New | Write from scratch |
| `content-and-copy` | New | Write from scratch |
| `launch-runbook` | New | Write from scratch |
| `after-action-report` | New | Write from scratch |

---

## Port decisions, skill by skill

### `design-framework` → `design-standards`

**Keep:**
- WCAG AA contrast ratios and the contrast checker JS
- The pre-ship checklist (mostly)
- Section pattern philosophy (hero, card grid, data row, CTA banner)

**Genericize or remove:**
- Tailwind class libraries → reference patterns conceptually, give one Tailwind example as a reference file, give equivalent vanilla CSS
- `#E47200 not #FF9900` Amazon orange rule → genericize as "verify brand color contrast against actual backgrounds"
- The specific hex tokens (`#1A1D23`, etc.) → replace with role-based tokens that the user fills in
- Affiliate-specific markup (`rel="nofollow sponsored"`) → keep but make optional

**Add:**
- Stack-agnostic component patterns (React + vanilla HTML side by side in a reference file)
- Type scale guidance independent of Tailwind classes
- Spacing system explanation (8px grid as the default reference)

**Risk:** stripping the Tailwind classes makes it less immediately useful for your own projects. Mitigation: ship a `references/tailwind-patterns.md` reference file that contains the existing Tailwind library, so you don't lose anything.

---

### `pm-framework` → `pm-spec-writing`

**Keep:**
- The IDEA → SPEC → BRIEF → SHIP loop
- The dev brief structure (CONTEXT / TASK / CONSTRAINTS / VERIFY)
- Impact vs effort quadrant
- Feature planning templates (new page, content entry, bug report)
- Decision log structure

**Genericize or remove:**
- Multi-agent orchestration section → split out. This is a power-user pattern that doesn't belong in a generic public skill. Consider a separate `ai-agent-orchestration` skill later.
- Sprint rhythm → keep but loosen the SEO-revenue-affiliate framing
- Launch checklist → move to the new `launch-runbook` skill (this is its proper home)

**Add:**
- User story format (As a / I want / So that) for teams that prefer it
- Acceptance criteria patterns
- A worked example from idea to ticket

**Risk:** removing the launch checklist creates churn. Mitigation: it lives in `launch-runbook` now, where it belongs, and `pm-spec-writing` references it.

---

### `seo-review` → `seo-foundations`

**Keep:**
- Technical SEO checklist (canonical, sitemap, robots.txt, schema)
- On-page patterns
- E-E-A-T signals
- AEO and GEO sections
- Schema markup patterns

**Genericize or remove:**
- Any references to specific affiliate networks
- Project-specific examples from your own portfolio
- Stack-specific implementation (Next.js metadata API, etc.) → move to a `references/stack-implementations.md` file

**Add:**
- Pre-launch SEO checklist as a separate quick-reference file
- llms.txt guidance (since this is becoming standard)

---

### `dev-code-review` → `code-review-web`

**Keep:**
- Bug-finding mindset
- Security review patterns
- Performance review patterns

**Genericize or remove:**
- Next.js/Supabase-specific failure modes → move to a `references/stack-quirks.md` file with Next.js, WordPress, and vanilla sections
- TypeScript-specific patterns → keep but mark as optional
- ISR-specific guidance → reference file

**Add:**
- A general code review checklist that works for any web stack
- Accessibility review section (was implicit, make explicit)

**Risk:** loses some of its punch when stripped of stack opinions. Mitigation: the reference files preserve the depth, and the trigger description still hooks the same review intent.

---

### `qa-testing` → `qa-testing` (same name)

**Keep:**
- Functional QA flow
- Accessibility checks
- Performance checks
- Cross-browser checks

**Genericize or remove:**
- Any Vercel/Supabase-specific deploy verification → reference file
- WordPress-specific patterns (you have a section on these) → reference file

**Add:**
- A QA report template (markdown) so the output is consistent
- Pre-launch vs post-deploy QA distinction (different scopes)

---

## What does NOT get ported

A few patterns from your existing skills are intentionally not in the public set:

- **Multi-agent orchestration** - too specific to your workflow. Could be a separate skill later.
- **`/go/[slug]` affiliate redirects** - too specific to your monetization model. Mention briefly in `seo-foundations` as one valid pattern, not as the standard.
- **`llms.txt` on all sites** - keep as a recommendation in `seo-foundations` but not a non-negotiable.
- **Personal style preferences** (em dash prohibition, hashtag-in-comments, specific monetization patterns). These live in your private skills, not the public set.

---

## v1 ship plan

Suggested order to write the remaining skills:

1. **Done:** `creative-brief` (prototype, sets the pattern)
2. **Port next** (lowest risk, you already have the content): `design-standards`, `pm-spec-writing`, `qa-testing`
3. **Port after that:** `seo-foundations`, `code-review-web`
4. **Write new:** `brand-discovery` (precedes `creative-brief`, so write next)
5. **Write new:** `information-architecture`, `content-and-copy`
6. **Write new last:** `launch-runbook`, `after-action-report`

This order means the most-used skills land first, so you can dogfood them on a real project before the rest are written.

---

## Open questions to revisit

- Do `brand-discovery` and `creative-brief` stay separate or merge? Default: separate. Different triggers, different outputs.
- Should `code-review-web` split into `code-review-frontend` and `code-review-backend`? Default: no for v1. Revisit if the skill gets too long.
- Should there be a `accessibility` skill, or does it stay distributed across `design-standards`, `qa-testing`, and `code-review-web`? Default: distributed. Accessibility is a quality dimension, not a phase.
- License: MIT. Confirm this is what you want before publishing.

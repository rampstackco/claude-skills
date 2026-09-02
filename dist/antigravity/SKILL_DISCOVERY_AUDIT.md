# Skill discovery audit (heuristic)

> HEURISTIC, NOT A RUNTIME TEST. Antigravity selects skills by matching
> the live task against each skill `description` with its own (unknown to
> us) matcher. This report approximates that with crude token-overlap
> scoring and static lint. Every result here is a smoke signal only; the
> authoritative check is the owner running the skills live in Antigravity.

Skills audited: **102**. Method: lowercase, strip punctuation,
drop short/stop words, then count distinct prompt tokens that appear in a
skill's description-plus-name token bag. Top 3 by score is the proxy for
"would Antigravity surface this skill for this prompt".

## Fixture prompts vs expected skill

| Prompt | Expected skill | Rank | In top 3? | Top 3 (skill:score) |
| --- | --- | --- | --- | --- |
| write a creative brief to kick off a new website project | `creative-brief` | #1 | yes | creative-brief:7, brand-discovery:4, art-direction:3 |
| optimize the on-page SEO of my landing page: title tags, headers, internal links | `seo-onpage` | #1 | yes | seo-onpage:7, programmatic-seo:4, seo-technical:4 |
| pick a brand archetype and build a brand personality system | `brand-archetype-system` | #2 | yes | creative-brief-selector:4, brand-archetype-system:3, brand-identity:3 |
| run a WCAG accessibility audit and give me a remediation plan | `accessibility-audit` | #1 | yes | accessibility-audit:5, qa-testing:3, seo-offpage:3 |
| review my web app code for security bugs before merging this PR | `code-review-web` | #1 | yes | code-review-web:7, security-baseline:5, qa-testing:3 |
| set up feature flags for a gradual rollout with targeting rules | `feature-flagging` | #1 | yes | feature-flagging:5, feature-launch-playbook:3, analytics-strategy:1 |
| design a multi step onboarding wizard for new users | `onboarding-wizard-design` | #2 | yes | multi-step-form-design:5, onboarding-wizard-design:5, comparison-tool-design:3 |
| improve my Core Web Vitals and reduce page load time | `performance-optimization` | #1 | yes | performance-optimization:6, seo-technical:4, multi-step-form-design:3 |

Summary: expected skill in top 3 for **8/8** prompts; ranked #1 for **6/8**.

## Low-confidence prompts

Prompts where the expected skill was not the single top match. Not
necessarily a defect: token overlap is blunt and several skills share
vocabulary. Listed so the owner can spot-check these in Antigravity.

- "pick a brand archetype and build a brand personality system" -> expected `brand-archetype-system` at #2. Top match was `creative-brief-selector` (score 4).
- "design a multi step onboarding wizard for new users" -> expected `onboarding-wizard-design` at #2. Top match was `multi-step-form-design` (score 5).

## Flagged descriptions (static lint)

- Under ~40 chars: none
- Missing an explicit use cue (no "use this/when/to/for" or "trigger"): `experiment-design`, `experimentation-analytics`, `feature-flagging`
- Identical full descriptions: none
- Identical first sentence: none

Note: a missing explicit "use" cue is not automatically a problem if the
description is otherwise specific and keyword-rich, but cue phrasing tends
to help description-matching engines. Flagged for owner review only.

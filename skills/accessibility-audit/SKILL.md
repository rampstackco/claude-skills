---
name: accessibility-audit
description: "Run a comprehensive WCAG accessibility audit covering perceivable, operable, understandable, and robust principles. Use this skill whenever the user wants to audit accessibility, review WCAG compliance, fix accessibility issues, prepare for accessibility certification, address an accessibility lawsuit risk, or systematically improve a site's accessibility. Triggers on accessibility audit, WCAG audit, a11y audit, accessibility compliance, ADA compliance, screen reader test, keyboard navigation, accessibility report, fix accessibility, axe scan. Also triggers when accessibility issues have been reported and need systematic remediation."
---

# Accessibility Audit

Run a thorough accessibility audit and produce a remediation plan. Stack-agnostic. Anchored to WCAG 2.1 AA, with notes on AAA where relevant.

This skill goes deeper than the accessibility checks in `qa-testing` and `design-standards`. Use this when accessibility itself is the goal.

---

## When to use

- Pre-launch accessibility verification
- Compliance preparation (ADA, EN 301 549, AODA, Section 508)
- Remediation after an audit finding or complaint
- Annual or quarterly accessibility health check
- Onboarding accessibility into a team that hasn't prioritized it before

## When NOT to use

- General QA after deploys (use `qa-testing`)
- Component-level accessibility implementation (use `frontend-component-build`)
- Color contrast for design tokens (use `design-standards` or `brand-identity`)

---

## Required inputs

- The site or product under audit
- The scope (full site, specific section, specific user flow)
- The target standard (WCAG 2.1 AA is most common)
- Any specific concerns or known issues
- Tools available (automated scanners, screen readers, manual testing)

---

## The framework: WCAG's 4 principles

WCAG organizes accessibility around four principles. The audit covers each in depth.

### 1. Perceivable

Information and UI must be presentable in ways users can perceive.

**Audit checks:**

- **Text alternatives.** All non-decorative images have descriptive `alt` text. Decorative images use `alt=""`. Complex images (charts, infographics) have long descriptions.
- **Time-based media.** Videos have captions. Pre-recorded audio has transcripts. Live audio has live captions where required.
- **Adaptable.** Content structure is conveyed through markup (semantic HTML), not just visual styling. Reading order makes sense when CSS is disabled.
- **Distinguishable.** Color is not the sole means of conveying information. Text contrast meets AA (4.5:1 normal, 3:1 large). UI element contrast meets 3:1. Audio can be paused, stopped, or muted.

### 2. Operable

UI components and navigation must be operable.

**Audit checks:**

- **Keyboard accessible.** All functionality available via keyboard alone. No keyboard traps. Focus visible.
- **Enough time.** Time limits can be adjusted, paused, or extended. Auto-updating content can be paused.
- **Seizures and physical reactions.** No content that flashes more than 3 times per second.
- **Navigable.** Skip links present. Pages have descriptive titles. Focus order is logical. Link purpose clear from text or context. Multiple ways to find pages (sitemap, search, navigation). Headings and labels are descriptive.
- **Input modalities.** Pointer gestures have keyboard alternatives. Pointer cancellation supported (mouse-up, not mouse-down for activation). Labels match accessible names. Motion-triggered functionality has alternatives.

### 3. Understandable

Information and operation must be understandable.

**Audit checks:**

- **Readable.** Page language declared (`<html lang="...">`). Unusual words and abbreviations have definitions or expansions. Reading level appropriate to audience.
- **Predictable.** Focus does not change context unexpectedly. Input does not change context unexpectedly. Navigation is consistent across pages. Components that look similar behave similarly.
- **Input assistance.** Errors are identified clearly. Labels and instructions are provided for input. Error suggestions are given where possible. For pages handling legal commitments or financial transactions, errors can be reviewed and corrected before submission.

### 4. Robust

Content must be robust enough to work with current and future user agents.

**Audit checks:**

- **Compatible.** Markup is valid. Name, role, and value of UI components are programmatically determinable. Status messages can be programmatically determined and announced.

---

## Audit methodology

### Stage 1: Automated scan

Run automated scanners across the priority pages. These catch 30 to 50 percent of issues but miss the rest.

**Tools:**
- axe DevTools (browser extension)
- Lighthouse (Chrome DevTools accessibility audit)
- WAVE (browser extension)
- Pa11y (CLI for batch scanning)

**Output:** A list of automated findings, by page.

### Stage 2: Manual keyboard testing

Unplug the mouse. Navigate the priority user flows using only keyboard.

**Test:**
- Tab and Shift+Tab move through interactive elements in logical order
- Enter activates buttons and links
- Space activates buttons (and toggles checkboxes)
- Arrow keys navigate within composite widgets (tabs, menus, listboxes)
- Escape dismisses modals, popovers, menus
- Focus is always visible
- Focus returns to a sensible place after modals or popovers close
- No keyboard trap (focus can always leave)

**Document:** Any flow where keyboard navigation breaks down.

### Stage 3: Screen reader testing

Test with at least one real screen reader. Each combination has quirks.

**Common combinations:**
- VoiceOver + Safari (macOS / iOS)
- NVDA + Firefox or Chrome (Windows)
- JAWS + Chrome (Windows; commercial but common in enterprise)
- TalkBack + Chrome (Android)

**Test:**
- Page structure announced correctly (headings, landmarks)
- Form labels read with their inputs
- Errors announced when they appear
- Status changes announced (loading, success, error)
- Modal context announced when opened
- Images have meaningful alt text (or are correctly identified as decorative)

### Stage 4: Visual testing

Verify the visual aspects of accessibility.

**Test:**
- Color contrast for all text/background pairs (use a contrast checker)
- UI element contrast (3:1 for icons, borders, focus rings)
- Color-blindness simulation (deuteranopia at minimum)
- Zoom to 200% - content remains usable, no horizontal scroll
- Reflow at 320px viewport
- Text spacing applied (line height, letter spacing) - no content cut off
- Motion can be reduced (`prefers-reduced-motion` honored)

### Stage 5: Cognitive accessibility

Often overlooked. Critical for inclusive products.

**Test:**
- Reading level appropriate
- Instructions clear
- Error messages explain how to fix the error, not just that one occurred
- Forms allow correction before submission
- Time limits avoidable or extendable
- Important content not dependent on memory of prior pages

---

## Workflow

1. **Define scope.** Full site? Specific flows? Specific page templates?
2. **Run automated scans.** Document findings per page.
3. **Manual keyboard pass.** Test all priority flows.
4. **Screen reader pass.** Test with at least one combination.
5. **Visual checks.** Contrast, zoom, color blindness, motion.
6. **Cognitive checks.** Reading level, error handling, time limits.
7. **Score against WCAG.** Per success criterion (level A, AA, AAA).
8. **Prioritize findings.** Critical (blocks users), Important (degrades experience), Minor (polish).
9. **Write the report.** Use the template in `references/audit-report-template.md`.
10. **Build a remediation plan.** Sequenced fixes with effort and impact estimates.

---

## Severity classification

For prioritization:

**Critical (P0):**
- Blocks an entire user flow for an assistive-tech user
- Renders a key page completely inaccessible
- Examples: form with no labels, modal without focus management, primary CTA not keyboard-accessible

**Important (P1):**
- Significantly degrades the experience for assistive-tech users
- Examples: missing alt text on key images, low-contrast body text, error messages that don't announce

**Minor (P2):**
- Affects edge cases or specific assistive technology combinations
- Examples: minor focus order issues, missing decorative alt attributes, edge case keyboard handling

**Polish (P3):**
- Above-AA improvements that benefit accessibility but aren't compliance-blocking
- Examples: AAA contrast targets, additional reduced-motion variants, language attributes on inline foreign words

---

## Failure patterns

- **Automated scan only.** Catches 30 to 50 percent of issues. The remaining 50 to 70 percent are in keyboard, screen reader, and cognitive testing.
- **Testing only on the home page.** The home page is usually the most accessible. Bugs hide in deeper flows.
- **Treating accessibility as a one-time project.** Accessibility erodes with every deploy. Bake it into the development cycle.
- **Fixing without root cause.** Patching individual issues without understanding why they happened means new ones keep appearing.
- **Ignoring screen reader testing.** Hard to do well, easy to skip. Single biggest source of "we thought we were accessible" surprises.
- **Confusing AA and AAA.** AAA is rarely the right target. AA is the practical baseline for most products.
- **Treating accessibility as a designer or developer responsibility alone.** Content, product, QA, and leadership all need to participate.
- **Assuming compliance equals accessibility.** WCAG conformance is a floor, not a ceiling. Real users may still struggle.

---

## Output format

Default output is a comprehensive audit report at `accessibility-audit.md`.

Structure:
1. Executive summary
2. Methodology (tools used, pages tested, screen readers used)
3. Findings by WCAG principle
4. Critical findings (P0) with specific URLs and fixes
5. Important findings (P1)
6. Minor findings (P2)
7. Polish (P3)
8. Remediation roadmap (sequenced and prioritized)
9. Appendices (full automated scan results, keyboard navigation notes, screen reader notes)

Plus a remediation tracking spreadsheet with one row per finding.

---

## Reference files

- `references/audit-report-template.md` - Full audit report template.
- `references/wcag-quick-reference.md` - Condensed WCAG 2.1 AA criteria with audit checks.

# Accessibility Audit Report Template

A fillable accessibility audit template. Customize the level (AA, AAA, EN 301 549) and scope (page, component, site) per project.

---

## Audit metadata

**Audited:** [URL or component name]
**Date:** [YYYY-MM-DD]
**Auditor:** [Name]
**Compliance target:** [WCAG 2.1 AA / WCAG 2.1 AAA / EN 301 549]
**Scope:** [What was and was not tested]
**Methodology:** [Tools used, manual tests performed]

---

## Executive summary

[2 to 3 paragraph overview. The state of accessibility, the most important issues, the recommended path forward.]

**Issue counts:**

| Severity | Count |
|---|---|
| Critical | |
| Major | |
| Minor | |
| **Total** | |

**Top 3 priorities:**

1. [Priority]
2. [Priority]
3. [Priority]

---

## Tools and methods used

**Automated:**
- [ ] axe DevTools
- [ ] Lighthouse accessibility audit
- [ ] WAVE
- [ ] Pa11y (or other CI tool)

**Manual:**
- [ ] Keyboard-only navigation
- [ ] Screen reader: [NVDA / JAWS / VoiceOver / TalkBack]
- [ ] 200% zoom
- [ ] Mobile reflow at 320px width
- [ ] Color blindness simulation
- [ ] Windows High Contrast (or browser equivalent)
- [ ] Reduced motion preference

---

## Critical findings

Findings that block usage for some users. Must be fixed before sign-off.

### Critical 1: [Issue name]

- **WCAG criterion:** [e.g., 2.1.1 Keyboard]
- **Severity:** Critical
- **Affected users:** [Keyboard / screen reader / low vision / etc.]
- **Reproduction steps:**
  1. [Step]
  2. [Step]
  3. [Step]
- **Expected:** [What should happen]
- **Actual:** [What does happen]
- **Recommended fix:** [Specific solution]
- **Estimated effort:** [Hours / days]
- **Owner:** [Team or person]

### Critical 2: [Issue name]

[Same structure]

---

## Major findings

Findings that significantly degrade experience. Should be fixed before broad launch.

### Major 1: [Issue name]

[Same structure as critical]

### Major 2: [Issue name]

[Same structure]

---

## Minor findings

Findings that add friction without blocking. Tracked and addressed in normal iteration.

### Minor 1: [Issue name]

[Brief structure]

- **WCAG criterion:**
- **Issue:**
- **Recommended fix:**

---

## WCAG 2.1 AA scorecard

For full audits, score each criterion. For partial audits, score only those in scope.

### 1. Perceivable

| Criterion | Pass / Fail / N/A | Notes |
|---|---|---|
| 1.1.1 Non-text content | | |
| 1.2.1 Audio-only and video-only | | |
| 1.2.2 Captions (prerecorded) | | |
| 1.2.3 Audio description or media alternative | | |
| 1.2.4 Captions (live) | | |
| 1.2.5 Audio description (prerecorded) | | |
| 1.3.1 Info and relationships | | |
| 1.3.2 Meaningful sequence | | |
| 1.3.3 Sensory characteristics | | |
| 1.3.4 Orientation | | |
| 1.3.5 Identify input purpose | | |
| 1.4.1 Use of color | | |
| 1.4.2 Audio control | | |
| 1.4.3 Contrast (minimum) | | |
| 1.4.4 Resize text | | |
| 1.4.5 Images of text | | |
| 1.4.10 Reflow | | |
| 1.4.11 Non-text contrast | | |
| 1.4.12 Text spacing | | |
| 1.4.13 Content on hover or focus | | |

### 2. Operable

| Criterion | Pass / Fail / N/A | Notes |
|---|---|---|
| 2.1.1 Keyboard | | |
| 2.1.2 No keyboard trap | | |
| 2.1.4 Character key shortcuts | | |
| 2.2.1 Timing adjustable | | |
| 2.2.2 Pause, stop, hide | | |
| 2.3.1 Three flashes or below threshold | | |
| 2.4.1 Bypass blocks | | |
| 2.4.2 Page titled | | |
| 2.4.3 Focus order | | |
| 2.4.4 Link purpose (in context) | | |
| 2.4.5 Multiple ways | | |
| 2.4.6 Headings and labels | | |
| 2.4.7 Focus visible | | |
| 2.5.1 Pointer gestures | | |
| 2.5.2 Pointer cancellation | | |
| 2.5.3 Label in name | | |
| 2.5.4 Motion actuation | | |

### 3. Understandable

| Criterion | Pass / Fail / N/A | Notes |
|---|---|---|
| 3.1.1 Language of page | | |
| 3.1.2 Language of parts | | |
| 3.2.1 On focus | | |
| 3.2.2 On input | | |
| 3.2.3 Consistent navigation | | |
| 3.2.4 Consistent identification | | |
| 3.3.1 Error identification | | |
| 3.3.2 Labels or instructions | | |
| 3.3.3 Error suggestion | | |
| 3.3.4 Error prevention (legal, financial, data) | | |

### 4. Robust

| Criterion | Pass / Fail / N/A | Notes |
|---|---|---|
| 4.1.1 Parsing | | |
| 4.1.2 Name, role, value | | |
| 4.1.3 Status messages | | |

---

## Remediation roadmap

Sequenced by severity and dependency.

### Phase 1: Critical fixes (target: [date])

- [ ] [Critical 1]
- [ ] [Critical 2]

### Phase 2: Major fixes (target: [date])

- [ ] [Major 1]
- [ ] [Major 2]

### Phase 3: Minor fixes (target: [date])

- [ ] [Minor 1]
- [ ] [Minor 2]

### Phase 4: Process improvements

- [ ] Add automated a11y checks to CI
- [ ] Establish a11y review in PR process
- [ ] Train design and engineering teams on common failures
- [ ] Set up regular re-audit schedule

---

## Re-audit schedule

- **Verify critical fixes:** [Date, typically 1 to 2 weeks post-remediation]
- **Verify major fixes:** [Date, typically 4 weeks]
- **Full re-audit:** [Date, typically 6 to 12 months]
- **Trigger-based re-audit:** Significant design system updates, major feature launches

---

## Sign-off

Critical fixes verified by: [Name and date]
Major fixes verified by: [Name and date]
Final approval: [Name and date]

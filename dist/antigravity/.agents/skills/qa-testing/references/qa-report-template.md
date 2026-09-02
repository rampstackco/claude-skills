# QA Report: [Page or Site URL]

**Date:** [YYYY-MM-DD]
**Tier:** [Smoke / Standard / Full]
**Tester:** [Name]
**Browser(s):** [List]
**Device(s):** [Desktop, mobile device, viewport width]

---

## Summary

**Overall:** [Pass / Pass with minor issues / Fail]

[1 to 3 sentences. The headline finding. What works, what's broken, what to do.]

**Critical issues found:** [N]
**Important issues found:** [N]
**Minor issues found:** [N]

---

## Smoke check

| Check | Pass | Notes |
|---|---|---|
| Title tag present and 30-60 chars | ☐ | |
| Canonical = production URL | ☐ | |
| Exactly one H1 | ☐ | |
| Zero missing image alts | ☐ | |
| Zero broken images | ☐ | |
| Schema present and valid | ☐ | |

---

## Standard audit (if applicable)

### Meta tags
| Field | Value | Pass |
|---|---|---|
| Title | | ☐ |
| Title length | | ☐ |
| Meta description | | ☐ |
| Meta description length | | ☐ |
| og:image | | ☐ |
| og:title | | ☐ |
| twitter:card | | ☐ |

### Structure
| Check | Result | Pass |
|---|---|---|
| H1 text | | ☐ |
| H2 count | | ☐ |
| Skipped heading levels | | ☐ |
| Page language declared | | ☐ |
| Favicon present | | ☐ |

### Images
| Check | Count |
|---|---|
| Total images | |
| Broken images | |
| Missing alt text | |

### Links
| Check | Count |
|---|---|
| External links | |
| External missing `noopener` | |

### Schema
[List schema types found and any validation issues]

---

## Full release matrix (if applicable)

### Accessibility
- [ ] Lighthouse Accessibility score above 90 (actual: __)
- [ ] No skipped heading levels
- [ ] All form fields have labels
- [ ] Skip link present
- [ ] Page operable by keyboard alone
- [ ] Focus indicators visible

### Performance
- [ ] Lighthouse Performance score above 80 (actual: __)
- [ ] LCP under 2.5s (actual: __)
- [ ] CLS under 0.1 (actual: __)
- [ ] INP under 200ms (actual: __)

### Mobile responsiveness
- [ ] 375px viewport: layout intact, no horizontal scroll
- [ ] 768px viewport: layout adapts cleanly
- [ ] 1024px viewport: desktop variant works
- [ ] 1440px viewport: max-width holds, no awkward stretch
- [ ] Tap targets minimum 44px

### Cross-browser
- [ ] Chrome: tested
- [ ] Safari: tested
- [ ] Firefox: tested
- [ ] Edge: tested (if relevant audience)
- [ ] Mobile Safari: tested
- [ ] Mobile Chrome: tested

### Forms
- [ ] All forms submit successfully
- [ ] Validation works as expected
- [ ] Error states display clearly
- [ ] Success states display clearly

### Links
- [ ] No broken internal links (sample of 20 tested)
- [ ] No broken external links (sample of 10 tested)

### Site infrastructure
- [ ] Sitemap returns 200 and lists canonical URLs
- [ ] robots.txt correct (allows production, blocks staging)
- [ ] HTTPS on all resources, no mixed content
- [ ] HSTS header present
- [ ] X-Frame-Options header present
- [ ] X-Content-Type-Options header present

### 404 handling
- [ ] 404 pages return HTTP 404 (not 200)
- [ ] 404 page provides helpful navigation

### Schema
- [ ] All schema validates in Rich Results Test
- [ ] Required properties filled
- [ ] No mixed signals (canonical vs sitemap vs internal links)

### Analytics
- [ ] Page view fires correctly
- [ ] Key events fire on user actions
- [ ] No PII in event parameters

### Cache behavior
- [ ] Cache headers appropriate for page type
- [ ] No stale content displayed
- [ ] Cache invalidation works after content updates

---

## Critical issues

[Things that block ship.]

### 1. [Issue title]
- **Where:** [URL or component]
- **What:** [What's broken]
- **Impact:** [Who is affected]
- **Fix:** [Specific remediation]

### 2. [Issue title]
[Same structure]

---

## Important issues

[Things that should be fixed but might not block ship.]

### 1. [Issue title]
- **Where:**
- **What:**
- **Impact:**
- **Fix:**

---

## Minor issues

[Polish items.]

- [Issue]
- [Issue]
- [Issue]

---

## Recommendations

[Suggestions beyond fixing the identified issues.]

- [Recommendation]
- [Recommendation]

---

## Sign-off

- [ ] All critical issues resolved
- [ ] Important issues resolved or have known-issue tickets
- [ ] Minor issues acknowledged

**Approved for ship:** [Yes / No / Conditional]
**Approved by:** [Name]
**Date:** [YYYY-MM-DD]

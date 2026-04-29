---
name: performance-optimization
description: "Diagnose and fix web performance issues including Core Web Vitals (LCP, INP, CLS), bundle size, asset optimization, render performance, and runtime efficiency. Use this skill whenever the user wants to improve page speed, fix Core Web Vitals, optimize assets, reduce bundle size, debug slow renders, or systematically improve a site's performance. Triggers on performance, page speed, Core Web Vitals, LCP, INP, CLS, FID, TTFB, bundle size, code splitting, image optimization, lazy loading, render blocking, slow page, performance audit, Lighthouse score. Also triggers when traffic or conversion is dropping due to perceived slowness."
---

# Performance Optimization

Diagnose web performance issues and produce a remediation plan. Stack-agnostic. Anchored to Core Web Vitals and standard browser performance patterns.

This skill goes deeper than the performance checks in `qa-testing` and `seo-technical`. Use this when performance itself is the goal.

---

## When to use

- Fixing Core Web Vitals (LCP, INP, CLS)
- Diagnosing slow page loads
- Reducing JavaScript bundle size
- Optimizing images, fonts, and other assets
- Fixing layout shift, render-blocking resources, jank
- Pre-launch performance verification
- Annual performance health check

## When NOT to use

- General QA after deploys (use `qa-testing`)
- Technical SEO including indexing and crawling (use `seo-technical`)
- Code review for general bugs (use `code-review-web`)

---

## Required inputs

- The site or page under audit
- Specific performance complaints if any
- Target metrics (Core Web Vitals thresholds, Lighthouse score, custom)
- Browser dev tools access
- Performance monitoring data if available (Real User Monitoring, lab data)

---

## The framework: Core Web Vitals

Three metrics carry most of the weight for both user experience and SEO:

### LCP (Largest Contentful Paint)

**What it measures:** Time until the largest visible content element finishes rendering.

**Targets:**
- Good: under 2.5 seconds
- Needs improvement: 2.5 to 4.0 seconds
- Poor: over 4.0 seconds

**Common causes of poor LCP:**
- Slow server response time (TTFB over 800ms)
- Render-blocking JavaScript or CSS
- Large unoptimized images for the LCP element
- Late-loading fonts that delay text render
- Client-side rendering of the LCP element

**Common fixes:**
- Server-render the LCP element (no client-side render)
- Optimize the LCP image (right format, right size, preloaded)
- Reduce render-blocking resources (defer non-critical CSS and JS)
- Use modern image formats (WebP, AVIF)
- Specify image dimensions to skip layout pass

### INP (Interaction to Next Paint)

**What it measures:** Responsiveness to user interactions. Replaces FID as the standard interactivity metric.

**Targets:**
- Good: under 200ms
- Needs improvement: 200 to 500ms
- Poor: over 500ms

**Common causes of poor INP:**
- Long-running JavaScript blocking the main thread
- Heavy event handlers
- Excessive React/framework re-renders
- Synchronous operations in event handlers
- Large DOM with expensive layouts

**Common fixes:**
- Break long tasks into chunks (`scheduler.yield()` or `setTimeout`)
- Memoize expensive computations
- Debounce or throttle high-frequency event handlers (scroll, mousemove, input)
- Avoid synchronous storage or DOM operations in handlers
- Reduce DOM size (under 1500 elements ideal)
- Use CSS over JS for animations where possible

### CLS (Cumulative Layout Shift)

**What it measures:** How much the page jumps around as it loads. Unexpected layout shifts hurt usability.

**Targets:**
- Good: under 0.1
- Needs improvement: 0.1 to 0.25
- Poor: over 0.25

**Common causes of poor CLS:**
- Images without explicit dimensions
- Ads, embeds, iframes that load late
- Dynamically injected content above existing content
- Web fonts causing FOIT/FOUT (flash of invisible/unstyled text)
- CSS that depends on JS-loaded data

**Common fixes:**
- Always specify `width` and `height` (or `aspect-ratio`) on images and videos
- Reserve space for ads and embeds before they load
- Use `font-display: optional` or `font-display: swap` thoughtfully
- Avoid injecting content above the fold after initial render
- Preload critical fonts

---

## Beyond Core Web Vitals

### Time to First Byte (TTFB)

The server response time. Bad TTFB makes everything else worse.

**Targets:** under 800ms ideal.

**Common causes:**
- Slow database queries on the request path
- N+1 query patterns
- Missing caching
- Server geographic distance from users (no CDN)
- Cold starts on serverless

**Fixes:**
- Cache database queries
- Use a CDN for static and cacheable dynamic content
- Optimize critical-path queries
- Pre-render where possible (SSG, ISR)
- Edge functions for low-latency dynamic content

### Bundle size

JavaScript shipped to the browser.

**Targets:**
- Initial JS under 170KB compressed for typical pages
- Lazy-loaded chunks under 100KB compressed each

**Common causes of bloat:**
- Importing entire libraries when only one function is used
- Bundling polyfills for modern browsers
- Including dev-only code in production
- Duplicate dependencies (multiple versions of the same library)
- Large client-side state (Redux store snapshots, etc.)

**Fixes:**
- Tree-shake imports (`import { fn } from 'lib'` not `import lib from 'lib'`)
- Code-split per route
- Lazy-load below-the-fold components
- Audit dependencies; replace heavy ones (e.g., moment.js → date-fns or native Intl)
- Build-time bundle analyzer to spot bloat
- Dynamic imports for rarely-used features

### Image optimization

Images are typically 60 to 80 percent of page weight.

**Best practices:**
- Modern formats: WebP everywhere supported, AVIF where supported
- Responsive images: `srcset` for different viewport sizes
- Lazy loading: `loading="lazy"` for below-the-fold
- Explicit dimensions: prevents CLS
- Right size: don't ship 4000px images for 800px display
- LCP image: preload, never lazy-load

### Font loading

Web fonts often delay text render and cause CLS.

**Best practices:**
- Self-host fonts (avoid third-party blocking)
- Preload critical fonts (`<link rel="preload" as="font">`)
- Use `font-display: swap` for non-critical fonts
- Subset fonts to remove unused glyphs
- Use variable fonts where possible
- Provide system-font fallback that visually matches

### Third-party scripts

Third parties (analytics, ads, chat widgets) often dominate performance budgets.

**Audit each:**
- Is it required?
- Can it load after page interaction (defer)?
- Can it run from a worker (off main thread)?
- Is the third party itself fast?
- Are there lighter-weight alternatives?

A common pattern: 50 percent of performance issues come from third-party scripts.

---

## Workflow

1. **Establish a baseline.** Lighthouse scan, WebPageTest run, or Real User Monitoring data. Capture current Core Web Vitals.
2. **Identify the worst offender.** LCP, INP, or CLS - which is failing? Focus there first.
3. **Diagnose specifically.** Browser dev tools (Performance tab, Network tab, Coverage tab). Identify the actual cause of the metric failure.
4. **Plan fixes.** Per identified issue, plan a specific change. Estimate impact and effort.
5. **Implement.** One fix at a time where possible. Easier to measure impact.
6. **Re-measure.** After each major fix, re-run Lighthouse and check Real User Monitoring.
7. **Iterate.** Performance is rarely solved in one pass. Plan for ongoing monitoring and fixes.

---

## Tools

**Lab tools** (run on demand):
- Lighthouse (built into Chrome DevTools)
- PageSpeed Insights (online)
- WebPageTest (online, more configurable)
- Browser Performance tab (deep flame graph analysis)

**Field tools** (real user data):
- Chrome User Experience Report (CrUX) - public data for any site
- Real User Monitoring (RUM) - your own users (DataDog, New Relic, custom, etc.)
- Search Console Core Web Vitals report

Lab tools are useful for diagnosis. Field tools are the source of truth for what users actually experience.

---

## Failure patterns

- **Optimizing without measuring.** Performance theater without baseline metrics. Always measure first.
- **Optimizing the wrong metric.** A great Lighthouse score with bad real-user metrics means your test conditions don't match users.
- **Over-optimizing.** Spending weeks shaving 10ms off TTFB while CLS is 0.4. Fix the worst offender first.
- **Lighthouse-driven optimization only.** Lighthouse runs in idealized conditions. Always check field data.
- **Single-page optimization.** Performance regressions creep in across the codebase. Build performance budgets and CI checks.
- **Treating every byte as equal.** A render-blocking 100KB script is worse than a deferred 500KB script.
- **Bundle size obsession.** Bundle size matters, but execution time matters more. A small bundle that takes 5 seconds to parse is worse than a larger bundle that runs fast.
- **Ignoring third parties.** "It's the analytics tag, not us." Third parties run on your domain in your users' eyes. Own them.

---

## Output format

Default output is a performance report at `performance-audit.md`.

Structure:
1. Executive summary
2. Methodology (tools, conditions, sample pages)
3. Current state (Core Web Vitals, Lighthouse scores, RUM data)
4. Critical issues (Core Web Vitals failures)
5. Important issues (sub-optimal but not failing)
6. Polish (further-than-required wins)
7. Remediation roadmap (sequenced)
8. Performance budget recommendations
9. Monitoring plan

For complex audits, include:
- Per-page Lighthouse exports
- Bundle analysis output
- Network waterfall screenshots
- Specific code snippets to change

---

## Reference files

- `references/audit-template.md` - Full performance audit report template.
- `references/optimization-checklist.md` - Quick-reference checklist of common optimizations by priority.
- `references/optimization-playbook.md` - Symptom-to-fix playbook for the common Core Web Vitals problems (LCP, INP, CLS).

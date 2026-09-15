# Optimization Playbook

A step-by-step playbook for common performance problems. Pick the symptom, follow the steps.

---

## Symptom: LCP failing (>2.5s)

The largest content element on the page takes too long to paint.

### Step 1: Identify the LCP element

In Chrome DevTools Performance panel:
1. Record a page load
2. Find the LCP marker
3. Note which element is the LCP (usually a hero image or large heading)

### Step 2: Optimize that specific element

**If LCP element is an image:**
- Use modern format (WebP, AVIF)
- Serve appropriately sized version (don't ship a 4000px image to a 800px container)
- Preload it: `<link rel="preload" as="image" href="hero.webp" fetchpriority="high">`
- Avoid lazy-loading the LCP image (use eager loading)
- Use `fetchpriority="high"` on the image element

**If LCP element is text/heading:**
- Ensure web fonts don't block rendering (`font-display: swap`)
- Inline critical CSS for the heading section
- Preconnect to font origin: `<link rel="preconnect" href="https://fonts.example.com">`

**If LCP is loading slowly because the page is slow overall:**
- See "Symptom: TTFB slow" below
- Reduce render-blocking resources
- Reduce total payload before LCP element

### Step 3: Measure

Re-test in Lighthouse and DevTools. Verify LCP under 2.5s on a slow connection (Slow 4G simulation in DevTools).

---

## Symptom: INP failing (>200ms)

Interactions feel sluggish. The page takes too long to respond to user input.

### Step 1: Find the slow interactions

In Chrome DevTools Performance panel:
1. Record while clicking, typing, or interacting
2. Look for long tasks (orange bars >50ms) following input events
3. Identify the function calls that take the longest

### Step 2: Reduce the work

**For event handlers:**
- Move heavy work out of the synchronous path
- Use `setTimeout` or `requestIdleCallback` to yield to the main thread
- Debounce or throttle frequent events (scroll, mouse move, resize)

**For component re-renders (React, Vue, etc.):**
- Memoize expensive computations
- Avoid creating new objects/arrays/functions in render that get passed as props
- Use virtualization for large lists (react-window, virtua, or framework equivalent)
- Profile to find which components re-render and why

**For startup hydration (SSR/SSG frameworks):**
- Defer hydration of non-critical components
- Use island architecture or partial hydration where supported
- Code-split aggressively below-the-fold

### Step 3: Verify

INP should be under 200ms at the 75th percentile of real user data.

---

## Symptom: CLS failing (>0.1)

Content jumps around as the page loads.

### Step 1: Identify the shifts

In Chrome DevTools:
1. Open Performance Insights or Performance panel
2. Look for "Layout Shifts" markers
3. Click each to see what shifted

### Step 2: Reserve space for dynamic content

**Common offenders and fixes:**

- **Images without dimensions.** Add `width` and `height` attributes (or `aspect-ratio` CSS).
- **Late-loading ads or embeds.** Reserve a fixed-size container.
- **Web fonts swapping.** Use `font-display: optional` or size-adjust descriptors.
- **Skeleton loaders that don't match final size.** Match dimensions exactly.
- **Animations triggering layout.** Animate only `transform` and `opacity`.
- **Insertion of content above existing content.** Reserve space or insert below.

### Step 3: Verify

Run Lighthouse. Real-user CLS at 75th percentile should be under 0.1.

---

## Symptom: TTFB slow (>800ms)

Server takes too long to respond.

### Step 1: Check the server response

Use WebPageTest or `curl -w "@curl-format.txt" -s -o /dev/null https://example.com` to measure just TTFB.

### Step 2: Identify the bottleneck

**Common causes:**

- **No caching at the edge.** Add a CDN. Set Cache-Control headers correctly.
- **Slow database queries.** Run EXPLAIN on slow queries. Add indexes. Eliminate N+1 patterns.
- **Slow third-party API calls in the render path.** Defer to client or precompute.
- **Heavy server-side rendering.** Profile the SSR work. Memoize what's repeated.
- **Cold starts (serverless).** Provisioned concurrency or warming pings.

### Step 3: Verify

TTFB under 600ms at the 75th percentile is the target. Under 200ms is excellent.

---

## Symptom: Bundle size too large

JavaScript payload bloating the page.

### Step 1: Audit the bundle

Run a bundle analyzer (Webpack Bundle Analyzer, source-map-explorer, etc.). Sort by size.

### Step 2: Identify the offenders

**Common bloat sources:**

- **Unused dependencies.** Tree-shaking missing or broken.
- **Whole-library imports.** `import { debounce } from 'lodash'` pulls all lodash. Use `import debounce from 'lodash/debounce'`.
- **Polyfills shipped to modern browsers.** Use differential serving.
- **Source maps in production bundle.** Should be separate files, not inline.
- **Moment.js, Lodash, jQuery.** Often replaceable with smaller alternatives or native APIs.
- **Multiple versions of the same library.** Check `npm ls [library]`. Dedupe.

### Step 3: Reduce

- Replace heavy libraries with lighter alternatives (date-fns or dayjs instead of moment, native fetch instead of axios)
- Code-split routes
- Code-split heavy components (modals, charts, editors)
- Use dynamic imports for below-the-fold features

### Step 4: Set a budget

In your build config or CI, fail builds that exceed the budget.

---

## Symptom: Image-heavy page loads slowly

### Step 1: Audit images

- Count images on the page
- Note current sizes and formats
- Note which are above-the-fold (eagerly loaded) vs below (should be lazy)

### Step 2: Optimize each

**Format:**
- Photos: WebP or AVIF (with JPEG fallback)
- Graphics: SVG or PNG (with WebP fallback)
- Animations: video (MP4/WebM) instead of GIF for size

**Sizing:**
- Generate multiple sizes via `srcset`
- Use `sizes` attribute to tell the browser the rendered size

```html
<img
  src="hero-800.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1600.webp 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  width="1600"
  height="900"
  alt="Description"
  loading="eager"
  fetchpriority="high"
/>
```

For below-the-fold:
- `loading="lazy"`
- Without `fetchpriority`

**Compression:**
- Use a build-time image pipeline (sharp, imagemin) to compress automatically
- Quality 75-85 is usually invisible to users while halving file size

---

## Symptom: Web fonts blocking text

### Step 1: Audit font loading

In DevTools Network tab, filter by font. Note:
- File size
- When they load relative to first paint
- Whether text is invisible or fallback during load

### Step 2: Optimize

- **Use `font-display: swap`** to show fallback text immediately
- **Subset fonts** to only the characters needed (Latin only is much smaller than full Unicode)
- **Self-host critical fonts** instead of CDN where possible
- **Preload critical fonts:**
  ```html
  <link rel="preload" href="/fonts/regular.woff2" as="font" type="font/woff2" crossorigin>
  ```
- **Use `size-adjust`, `ascent-override`, `descent-override`** in `@font-face` to match metrics with fallback fonts (reduces CLS)

---

## Symptom: Third-party scripts dragging performance

### Step 1: Inventory third-parties

In DevTools Network tab, list all third-party domains. For each:
- Size
- Blocking or non-blocking?
- Necessary?

### Step 2: Decide on each

For every third-party script, ask: does the business value justify the performance cost?

**Common offenders:**
- Heavy analytics (audit if all pixels are necessary; consider server-side tagging)
- Customer support chat widgets (load on user intent, not on page load)
- A/B testing tools (defer non-critical experiments)
- Multiple ad networks (consolidate)
- Tag managers loading hundreds of tags

**Fixes:**
- Remove unused tags
- Defer non-critical scripts (`async` or `defer`)
- Self-host where licensing allows (avoids extra DNS lookup)
- Load chat widgets on user interaction, not on page load
- Consolidate analytics where possible

### Step 3: Set a third-party budget

Number of third-party domains, total third-party JS payload. Block-add for new third-parties without explicit performance review.

---

## Performance budget template

Set hard limits in your CI to prevent regression:

```yaml
budget:
  - resourceSizes:
      - resourceType: total
        budget: 500   # kilobytes
      - resourceType: script
        budget: 200
      - resourceType: image
        budget: 200
      - resourceType: stylesheet
        budget: 50
      - resourceType: font
        budget: 100
      - resourceType: third-party
        budget: 100
  - timings:
      - metric: largest-contentful-paint
        budget: 2500  # milliseconds
      - metric: cumulative-layout-shift
        budget: 0.1
      - metric: total-blocking-time
        budget: 200
```

Tools like Lighthouse CI, Calibre, or SpeedCurve can enforce these budgets in CI.

---

## When to call it done

A page is "performance optimized" when:

1. Real-user Core Web Vitals at 75th percentile pass thresholds
2. Lighthouse performance score >90 on representative pages
3. Performance budgets enforced in CI
4. Periodic re-audit scheduled (quarterly minimum)

Performance is not a one-time project. New code adds weight. New features add complexity. Plan for ongoing maintenance.

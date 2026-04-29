# Performance Optimization Checklist

Quick-reference checklist of common performance optimizations, ordered by typical impact-per-effort. Use it as a triage list, not a script. Skip what does not apply.

For symptom-to-fix walkthroughs, see `optimization-playbook.md`. For a structured audit report, see `audit-template.md`.

---

## P0: blocks Core Web Vitals at the 75th percentile

These optimizations almost always pay back. If a site is failing CWV, start here.

### Images

- [ ] LCP image is preloaded with `<link rel="preload" as="image" fetchpriority="high">`
- [ ] LCP image is NOT lazy-loaded
- [ ] Images use modern formats (WebP, AVIF) with fallback
- [ ] Images use responsive `srcset` with appropriately sized variants
- [ ] All `<img>` and `<video>` tags have explicit `width` and `height` (or `aspect-ratio` CSS)
- [ ] Below-the-fold images use `loading="lazy"`
- [ ] Decorative images use `decoding="async"`

### Fonts

- [ ] Web fonts use `font-display: swap` (or `optional` for layout stability)
- [ ] Font files are woff2 and subsetted to actual glyphs used
- [ ] Critical font files are preloaded
- [ ] Preconnect to font origin if hosted off-domain

### JavaScript on the critical path

- [ ] No render-blocking scripts in `<head>` (use `defer` or `async` or move to `<body>` end)
- [ ] Heavy third-party scripts (chat widgets, A/B test tools, analytics) are deferred until interaction or after load
- [ ] Bundle size budget enforced per route
- [ ] Code split per route or feature
- [ ] Unused JavaScript removed (Coverage tab in DevTools)

### Layout stability

- [ ] No content insertion above the fold after initial render (banners, ads, popups)
- [ ] Skeleton states or placeholders prevent layout shift on async content
- [ ] Avoid `@font-face` with no fallback chain
- [ ] Avoid web fonts that change metrics significantly between fallback and loaded state (use `size-adjust` and `ascent-override`)

---

## P1: significant gains, moderate effort

### Server and network

- [ ] HTTP/2 or HTTP/3 enabled
- [ ] Brotli compression enabled (or gzip if Brotli unavailable)
- [ ] Cache headers correct for static assets: long `max-age` and `immutable` for hashed files
- [ ] CDN in front of origin for static assets (and dynamic where applicable)
- [ ] Origin response time (TTFB) under 800ms at p75
- [ ] DNS prefetch and preconnect for critical third-party origins

### Rendering strategy

- [ ] Above-the-fold content is server-rendered (or static) where possible
- [ ] Critical CSS inlined for above-the-fold
- [ ] Non-critical CSS loaded asynchronously
- [ ] Partial / progressive hydration considered for heavy SPA pages

### Resource loading

- [ ] `<link rel="preload">` used for critical assets only (overuse hurts)
- [ ] `<link rel="modulepreload">` used for ESM critical chunks
- [ ] Resource hints (`prefetch`, `prerender`) used for likely next pages on key flows

### Long tasks

- [ ] Main-thread tasks over 50ms identified and broken up (`scheduler.yield()`, `requestIdleCallback`, web workers)
- [ ] Hydration cost measured for SSR sites; large components hydrated lazily

---

## P2: smaller gains, useful in aggregate

### Images and media

- [ ] Hero video uses `preload="none"` or poster image until interaction
- [ ] Animated GIFs replaced with looped video (smaller, smoother)
- [ ] SVGs optimized (SVGO) and inlined where small
- [ ] Image delivery service (Cloudinary, ImgIX, native CDN image transform) used for on-the-fly resizing

### Third-party scripts

- [ ] Each third-party script audited: necessary, budgeted, and optimized
- [ ] Tag manager rules audited; remove unfired or duplicate tags
- [ ] Self-host third parties where licensing allows and origin caching helps

### CSS

- [ ] Unused CSS removed
- [ ] CSS specificity audited; avoid expensive selectors (deeply nested, universal)
- [ ] `will-change` and `transform`/`opacity` animations preferred over animating layout properties

### JavaScript

- [ ] Tree shaking confirmed working (check final bundle for dead code)
- [ ] Polyfills served only to browsers that need them (differential serving, `module/nomodule` pattern)
- [ ] Date / time / number formatting uses `Intl` instead of large libraries
- [ ] Heavy utility libraries replaced with smaller alternatives or native code where reasonable

---

## P3: polish

- [ ] Service worker caches critical assets for repeat visits
- [ ] Speculation Rules API used for likely next-page prerender
- [ ] HTTP early hints (103) used for critical preloads
- [ ] Server timing headers exposed for diagnostic visibility
- [ ] Real user monitoring (RUM) feeds CWV dashboard

---

## Anti-patterns to remove

These appear often, hurt always, and warrant a same-day fix.

- [ ] Lazy-loaded LCP image
- [ ] Render-blocking analytics or tag manager in `<head>` without `async`
- [ ] Multiple competing fonts (more than 2 families or more than 4 weights)
- [ ] CSS-in-JS that ships runtime style generation to the client without static extraction
- [ ] Hero image larger than its rendered size by more than 2x
- [ ] Synchronous third-party scripts above any user-visible content
- [ ] Layout-shifting cookie banner or consent modal
- [ ] Background images that are CSS-loaded above the fold (preload friendlier as `<img>`)

---

## How to use this checklist

1. Run a Lighthouse + CrUX read of the 3-5 most important pages.
2. Walk this checklist top to bottom for each page. Mark passes, gaps, and not-applicable.
3. Triage gaps into the audit report (`audit-template.md`) under Now / Next / Later.
4. Re-test after each fix lands. Performance is a moving average, not a snapshot.

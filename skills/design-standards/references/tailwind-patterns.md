# Tailwind Component Patterns

Optional reference. Tailwind-specific component patterns for projects on that stack. The principles in `SKILL.md` are stack-agnostic; this file translates them into Tailwind utilities.

If you are not using Tailwind, skip this file. The patterns translate to any utility framework or CSS approach with minor changes.

---

## Page wrapper

The standard container pattern:

```jsx
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* page content */}
</main>
```

Token equivalents:
- `max-w-7xl` = page max width (1280px)
- `mx-auto` = horizontal centering
- `px-4 sm:px-6 lg:px-8` = responsive horizontal padding

For wider designs, swap `max-w-7xl` for `max-w-[1440px]`.

---

## Section spacing

```jsx
{/* Large section (heroes, major content) */}
<section className="py-20 md:py-28">

{/* Medium section (most content) */}
<section className="py-12 md:py-16">

{/* Small section (compact content) */}
<section className="py-8 md:py-12">
```

Always include the mobile-first variant. Mobile sections use shorter padding to preserve viewport efficiency.

---

## Dark hero

```jsx
<section className="bg-gray-900 py-20 md:py-28">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Breadcrumb - text-gray-300 minimum on dark for AA */}
    <nav className="text-sm text-gray-300 mb-6" aria-label="Breadcrumb">
      <a href="/" className="hover:text-white transition-colors">Home</a>
      <span className="mx-2" aria-hidden="true">/</span>
      <span className="text-white">Current Page</span>
    </nav>

    {/* Eyebrow */}
    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
      Section Label
    </p>

    {/* H1 - exactly one per page */}
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
      Main <span className="text-blue-400">Headline</span>
    </h1>

    {/* Supporting */}
    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      Supporting description that gives context.
    </p>
  </div>
</section>
```

Contrast notes:
- White on `bg-gray-900` = 17.4:1 PASS
- `text-gray-300` on `bg-gray-900` = 11.2:1 PASS AA
- `text-gray-400` on `bg-gray-900` = 7.6:1 PASS AA (still readable)
- `text-gray-500` on `bg-gray-900` = 5.5:1 PASS AA borderline; prefer 300 or 400 for body on dark

---

## Feature card grid

```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    {/* Icon container - rounded-xl, NOT rounded-full unless avatar */}
    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="font-semibold text-gray-900 mb-2">Card Title</h3>
    <p className="text-sm text-gray-600">Card description that explains the feature.</p>
  </div>
  {/* repeat */}
</div>
```

Conventions:
- `rounded-2xl` for cards (consistent radius across all cards on the site)
- `rounded-xl` for icon containers (not `rounded-full` unless it's an avatar)
- `text-gray-600` is the muted-text floor on white (passes AA at 7.6:1)

---

## Data row (key-value display)

```jsx
<div className="flex justify-between items-center rounded-xl bg-gray-50 px-4 py-3 text-sm">
  <span className="text-gray-600 font-medium">Label</span>
  <span className="font-semibold text-gray-900">Value</span>
</div>
```

Stack rows in a `space-y-2` container for vertically grouped data.

---

## Inline CTA banner

```jsx
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
  <div>
    <p className="font-semibold text-gray-900">CTA Headline</p>
    <p className="text-sm text-gray-600 mt-0.5">Supporting context</p>
  </div>
  <a
    href="#"
    className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap"
  >
    Action Text
  </a>
</div>
```

The `flex-col sm:flex-row` pattern stacks on mobile, sits side-by-side on tablet+. Standard across all banner-style CTAs.

---

## Author byline

```jsx
<div className="flex items-center gap-3">
  {/* Brand/author avatar - rounded-lg matches favicon shape */}
  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
    {authorInitial}
  </div>
  <div className="min-w-0">
    <a
      href={`/author/${slug}`}
      className="text-sm font-medium text-gray-900 hover:text-blue-700 transition-colors block truncate"
    >
      {authorName}
    </a>
    <p className="text-xs text-gray-600 truncate">{authorRole}</p>
  </div>
</div>
```

Convention: brand and author identifiers use `rounded-lg`, not `rounded-full`. Reserve `rounded-full` for actual person photographs (people-photo avatars).

---

## Buttons

```jsx
{/* Primary - pill shape, brand color */}
<a className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors">
  Primary Action
</a>

{/* Secondary - outline */}
<a className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold transition-colors">
  Secondary Action
</a>

{/* Ghost - text only */}
<a className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
  Ghost Action
</a>

{/* Disabled state */}
<button
  disabled
  className="px-6 py-3 rounded-full bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
>
  Disabled
</button>
```

Pick pill (`rounded-full`) or rounded-rect (`rounded-lg`) for buttons. Use one consistently across the entire site.

---

## Form inputs

```jsx
{/* Input with label */}
<div className="space-y-1.5">
  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
    Email address
  </label>
  <input
    id="email"
    type="email"
    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
    placeholder="you@example.com"
  />
  <p className="text-xs text-gray-600">We'll never share your email.</p>
</div>

{/* Error state */}
<div className="space-y-1.5">
  <label className="block text-sm font-medium text-gray-900">
    Email address
  </label>
  <input
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    className="w-full rounded-lg border border-red-500 px-3.5 py-2.5 text-base shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-600/20 focus:outline-none"
  />
  <p id="email-error" className="text-xs text-red-600">
    Please enter a valid email address.
  </p>
</div>
```

Notes:
- Always use `text-base` (16px) on inputs to prevent iOS zoom on focus
- `py-2.5` gives ~44px height with text, hitting the touch target minimum
- Error states need text, not just color (color blindness consideration)

---

## Mobile sticky bar

```jsx
<>
  {/* Page wrapper needs bottom padding to compensate for the bar */}
  <main className="pb-20 md:pb-0">
    {/* page content */}
  </main>

  {/* Sticky bar - mobile only */}
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 md:hidden z-30">
    <a
      href="#"
      className="block w-full text-center px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
    >
      Mobile CTA
    </a>
  </div>
</>
```

The `pb-20 md:pb-0` on the wrapper is critical. Without it, the sticky bar covers the bottom of the page content.

---

## Common Tailwind contrast values

Quick reference for which gray text colors pass AA on white:

| Class | Hex | Contrast on white | AA pass |
|---|---|---|---|
| `text-gray-300` | #D1D5DB | 1.6:1 | FAIL (decorative only) |
| `text-gray-400` | #9CA3AF | 2.85:1 | FAIL |
| `text-gray-500` | #6B7280 | 4.6:1 | PASS (borderline; prefer 600) |
| `text-gray-600` | #4B5563 | 7.6:1 | PASS |
| `text-gray-700` | #374151 | 10.3:1 | PASS |
| `text-gray-800` | #1F2937 | 14.6:1 | PASS |
| `text-gray-900` | #111827 | 16.9:1 | PASS |

Use `text-gray-600` as the floor for body text on white. Anything lighter requires verification against the specific background.

For dark backgrounds:

| Class | Hex | Contrast on `bg-gray-900` | AA pass |
|---|---|---|---|
| `text-white` | #FFFFFF | 17.4:1 | PASS |
| `text-gray-300` | #D1D5DB | 11.2:1 | PASS |
| `text-gray-400` | #9CA3AF | 7.6:1 | PASS |
| `text-gray-500` | #6B7280 | 5.5:1 | PASS borderline |
| `text-gray-600` | #4B5563 | 3.8:1 | FAIL for body |

Use `text-gray-300` as the floor for body text on `bg-gray-900`. Reserve lighter grays for headlines and primary content.

# Design Tokens Template

Tokens are the source of truth for color, spacing, typography, and other design decisions. Define them once at the start of the project. Reference them everywhere.

This template is stack-agnostic. Adapt the syntax to your project: CSS custom properties, Tailwind config, design system JSON, Style Dictionary, Figma variables - the values stay the same.

---

## Color tokens

### Primary (brand)

```
brand/primary       #XXXXXX   /* signature brand color */
brand/primary-hover #XXXXXX   /* 15-25% darker, for hover states */
brand/primary-text  #XXXXXX   /* darker variant if primary fails AA on white */
```

### Background

```
bg/surface          #FFFFFF   /* default page background */
bg/surface-alt      #F9FAFB   /* alternating section background */
bg/hero             #1A1D23   /* dark section for heroes, footers */
bg/footer           #111827   /* footer specifically */
```

### Text scale

Document each with the contrast ratio against the background it sits on.

```
text/heading        #111827   /* heading on white = 16.9:1 */
text/body           #374151   /* body on white = 10.3:1 */
text/muted          #4B5563   /* muted on white = 7.6:1 PASS AA */
text/subtle         #6B7280   /* subtle on white = 5.1:1 PASS AA */
text/on-dark        #FFFFFF   /* white on hero bg = 15.8:1 */
text/on-dark-muted  #D1D5DB   /* on hero bg = 11.4:1 */
```

Avoid going lighter than the muted/subtle colors above on white. Lighter grays fail AA.

### Semantic

```
semantic/success    #059669   /* on white = 4.5:1 PASS AA */
semantic/warning    #D97706   /* on white = 4.5:1 PASS AA */
semantic/error      #DC2626   /* on white = 4.7:1 PASS AA */
semantic/info       #2563EB   /* on white = 5.6:1 PASS AA */
```

For each semantic color, also define a tinted background and a darker text variant for badges and alert blocks.

### Border and divider

```
border/default      #E5E7EB   /* default borders, subtle dividers */
border/strong       #D1D5DB   /* form fields, interactive borders */
border/focus        #2563EB   /* focus rings */
```

---

## Spacing tokens

A consistent scale prevents arbitrary values.

```
space/0     0
space/1     4px
space/2     8px
space/3     12px
space/4     16px
space/5     20px
space/6     24px
space/8     32px
space/10    40px
space/12    48px
space/16    64px
space/20    80px
space/24    96px
space/32    128px
```

### Layout-specific spacing

```
layout/page-max-width     1280px (or 1440px for spacious designs)
layout/page-padding-x     16px mobile / 24px tablet / 32px desktop
layout/section-py-large   80px desktop / 64px mobile
layout/section-py-medium  48px desktop / 32px mobile
layout/section-py-small   32px desktop / 24px mobile
layout/card-padding       24px to 32px
layout/grid-gap           24px to 32px
```

---

## Typography tokens

### Font families

```
font/display    "[Display typeface]", system-ui, sans-serif
font/body       "[Body typeface]", system-ui, sans-serif
font/mono       "[Mono typeface]", ui-monospace, monospace
```

### Type scale

| Token | Size | Weight | Line height | Letter spacing | Use |
|---|---|---|---|---|---|
| type/display-1 | 64px | 700 | 1.0 | -0.02em | Hero headlines |
| type/display-2 | 48px | 700 | 1.05 | -0.01em | Section heroes |
| type/h1 | 36px | 700 | 1.1 | 0 | Page titles |
| type/h2 | 28px | 600 | 1.2 | 0 | Section titles |
| type/h3 | 22px | 600 | 1.3 | 0 | Sub-sections |
| type/h4 | 18px | 600 | 1.4 | 0 | Component titles |
| type/body-large | 18px | 400 | 1.5 | 0 | Lead paragraphs |
| type/body | 16px | 400 | 1.6 | 0 | Default body |
| type/body-small | 14px | 400 | 1.5 | 0 | Captions, metadata |
| type/caption | 12px | 400 | 1.4 | 0.01em | Footnotes, labels |
| type/eyebrow | 12px | 600 | 1.4 | 0.08em | Uppercase eyebrows |

### Mobile adjustments

Mobile typography is typically 1 to 2 steps smaller for display sizes:

```
display-1: 64px desktop → 40px mobile
display-2: 48px desktop → 32px mobile
h1:        36px desktop → 28px mobile
```

Body sizes stay the same on mobile; never go below 14px.

---

## Radius tokens

```
radius/none       0
radius/sm         4px    /* small badges, tags */
radius/md         8px    /* default for inputs */
radius/lg         12px   /* buttons, alerts */
radius/xl         16px   /* cards (small) */
radius/2xl        20px   /* cards (default) */
radius/3xl        24px   /* cards (prominent), modals */
radius/full       9999px /* pill buttons, fully rounded */
```

### Conventions for shapes

```
buttons (default):       radius/full (pill) OR radius/lg (rounded rect)
buttons (form/utility):  radius/md
inputs:                  radius/md or radius/lg
cards:                   radius/2xl
icon containers:         radius/xl (NOT radius/full unless avatar)
avatars (people):        radius/full
brand avatars/logos:     radius/lg (matches favicon convention)
modals:                  radius/3xl (top corners on mobile sheets)
```

Pick the conventions, document them, and stick to them. Inconsistent radius is one of the most common visual drift patterns.

---

## Shadow tokens

```
shadow/none      none
shadow/sm        0 1px 2px rgba(0,0,0,0.05)
shadow/md        0 4px 6px rgba(0,0,0,0.08)
shadow/lg        0 10px 15px rgba(0,0,0,0.10)
shadow/xl        0 20px 25px rgba(0,0,0,0.10)
shadow/2xl       0 25px 50px rgba(0,0,0,0.15)
```

### Shadow conventions

```
default cards:       shadow/sm
hover state cards:   shadow/md
elevated content:    shadow/lg
modals/dropdowns:    shadow/xl
```

---

## Z-index tokens

A documented z-index scale prevents the "9999 wars."

```
z/below       -1
z/base        0
z/raised      10    /* sticky elements, fixed nav */
z/dropdown    20    /* popovers, dropdowns */
z/overlay     30    /* page-level overlays, scrims */
z/modal       40    /* modals, dialogs */
z/toast       50    /* toasts, top-of-everything notifications */
```

---

## Motion tokens

```
motion/duration-fast    100ms   /* hover state, simple feedback */
motion/duration-base    200ms   /* most UI transitions */
motion/duration-slow    300ms   /* enter/exit animations */
motion/duration-slower  500ms+  /* dramatic brand moments */

motion/ease-default    cubic-bezier(0.4, 0, 0.2, 1)
motion/ease-in         cubic-bezier(0.4, 0, 1, 1)
motion/ease-out        cubic-bezier(0, 0, 0.2, 1)
motion/ease-bounce     cubic-bezier(0.68, -0.55, 0.27, 1.55)
```

Always provide `prefers-reduced-motion` alternatives that disable or shorten animations for users who request it.

---

## Breakpoints

```
breakpoint/sm    640px
breakpoint/md    768px
breakpoint/lg    1024px
breakpoint/xl    1280px
breakpoint/2xl   1536px
```

Test the design at viewport widths matching each breakpoint, and at 375px (smaller phone), 390px (default iPhone), and 1440px (default laptop).

---

## How to use this template

1. **Copy** the structure into your project.
2. **Fill in values** per the brand identity.
3. **Verify contrast** for every text/background combination using a contrast checker.
4. **Document edge cases** (e.g., the darker brand variant for text contexts).
5. **Reference everywhere.** No hardcoded values in components.
6. **Update once.** When tokens change, the whole product reflects the change.

The token file is canonical. Anything in the codebase using a hardcoded value instead of a token is technical debt waiting to surface.

# Contrast and Accessibility for Brand Identity

A brand color choice that fails accessibility is a design defect. Every product, page, button, and label using that color inherits the failure.

This reference walks through the math, the standards, and the practical implications.

---

## The standards

**WCAG 2.1 AA** is the minimum bar for most professional brand work.

| Element | Required contrast ratio |
|---|---|
| Normal body text | 4.5:1 |
| Large text (18pt regular or 14pt bold) | 3:1 |
| UI components and graphical elements | 3:1 |

**WCAG 2.1 AAA** is stricter. Required for some accessibility-focused products, optional but admirable for most.

| Element | Required contrast ratio |
|---|---|
| Normal body text | 7:1 |
| Large text | 4.5:1 |

---

## The math

Contrast ratio is calculated as:

```
(L1 + 0.05) / (L2 + 0.05)
```

Where L1 is the relative luminance of the lighter color and L2 of the darker. Relative luminance comes from a weighted formula on RGB values that accounts for human perception (green contributes more than blue).

**Quick contrast checker (run in browser console):**

```javascript
function contrast(bg, fg) {
  function lum(hex) {
    return [hex.slice(1,3), hex.slice(3,5), hex.slice(5,7)]
      .map(h => parseInt(h, 16) / 255)
      .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
      .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
  }
  const [l1, l2] = [lum(bg), lum(fg)];
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2) + ':1';
}

// Example
contrast('#FFFFFF', '#4B5563'); // returns '6.40:1'
```

---

## Common brand color failures

These are color choices that look great in a logo but fail WCAG when used for text or UI:

| Pairing | Ratio | Status |
|---|---|---|
| Light gray (#9CA3AF) on white | 2.85:1 | Fails AA |
| Bright yellow on white | 1.07:1 | Fails AAA, AA, and basic legibility |
| Bright orange (#FF9900) on white | 2.14:1 | Fails AA |
| Sky blue (#3B82F6) on white | 4.57:1 | Passes AA for normal text |
| Most "vibrant" brand reds on white | 3-4.5:1 | Borderline; check exact values |
| White text on bright orange | 2.14:1 | Fails AA |

When in doubt, darken the brand color for text contexts. Keep the original hue for non-text brand expressions (logos, large graphics, decorative elements).

---

## The "darker variant" strategy

For brand colors that fail AA contrast, define a darker variant for use in text and UI.

```
Brand orange (signature):    #FF9900   (used in logos, illustrations, large graphics)
Brand orange (text/UI):      #B86600   (passes AA against white)
```

Both are "the brand color." The signature version is what people associate with the brand. The text variant is what enables accessible UI without abandoning the identity.

This is standard practice. Most major brands have both versions, even if only the signature version is publicized.

---

## Color blindness considerations

Around 8 percent of men and 0.5 percent of women have some form of color vision deficiency. The most common is red-green (deuteranopia and protanopia).

**Tests to run:**

- **Red-green confusion.** Greens and reds at similar luminance look the same to deuteranopes. If your success/error indicators rely on red-green distinction, add an icon or text label.
- **Tritan simulation.** Less common but worth checking. Blues and yellows.
- **Greyscale conversion.** Convert your palette to grayscale. If two brand colors look identical in greyscale, they will be hard to distinguish for people with severe color blindness.

**Tools:** Stark plugin (Figma), Coblis (online simulator), Chrome DevTools rendering tab.

**Practical rule:** Critical UI signals must communicate through more than just color. Use icons, labels, position, or shape as redundant signals.

---

## Typography contrast

Type contrast is not just about color. It includes:

- **Color contrast** (per the standards above)
- **Weight contrast** (light text on a busy background fails even at high color contrast)
- **Size contrast** (very small text needs higher color contrast)

**Practical rules:**

- Body text: minimum 14px on web, ideally 16px. Below 14px is uncomfortable for most readers regardless of contrast.
- Body text on photographs or busy backgrounds: add a scrim, increase the type weight, or move the text.
- Light-weight fonts (Thin, Extra Light) for body text: avoid. They fail visual contrast even at passing color contrast.

---

## Dark mode considerations

Most brand colors that work on white do not work on dark backgrounds.

**Common failure:**
- Brand color = dark navy. On white: 12:1 contrast (excellent). On near-black: 1.4:1 (terrible).

**Solutions:**

- Define light-mode AND dark-mode variants of every functional color in the system.
- Brand colors typically need to be lightened or desaturated in dark mode.
- Test the entire palette against both light and dark surfaces.

```
Brand navy:
  Light mode (on white):   #0F2A4A   (12:1 contrast)
  Dark mode (on #111):     #6B9FE8   (5.2:1 contrast against #111)
```

Both are "the brand color." Both express the identity. They just live in different lighting conditions.

---

## Icons and graphical elements

WCAG requires 3:1 for UI components and graphical elements. This includes:

- Icons used to convey meaning
- Form field borders
- Focus indicators
- Chart elements that distinguish data series
- Toggle and switch states

**Common failure:**
- Light gray icon (#D1D5DB) on white background: 1.4:1. Invisible to users with low vision.
- Form field borders at #E5E7EB: 1.3:1. Borderline visible.

**Fix:**
- Icons that convey meaning: minimum #6B7280 on white (3.9:1).
- Form field borders: minimum #9CA3AF on white (3.0:1) for default state. Stronger for focus.

---

## Practical checklist for brand color decisions

Before locking a brand color:

- [ ] Tested against white at WCAG AA for body text (4.5:1)
- [ ] Tested against white at WCAG AA for large text (3:1)
- [ ] Tested against the brand's dark surface color (for dark mode)
- [ ] Tested for color blindness (deuteranopia simulation)
- [ ] A "darker variant" defined for text contexts if signature color fails AA
- [ ] White text on the brand color tested for 4.5:1 (for buttons and CTAs)
- [ ] All semantic colors (success, warning, error) pass AA on white and dark
- [ ] Neutrals scale tested across the full range

If any check fails, document the failure and provide an alternative variant for the failing context. Do not just hope it will be fine in practice. It will not be fine.

---

## Resources

- WebAIM Contrast Checker (free, browser-based)
- Stark plugin for Figma
- Chrome DevTools accessibility panel
- Coblis color blindness simulator
- WCAG 2.1 specification at w3.org

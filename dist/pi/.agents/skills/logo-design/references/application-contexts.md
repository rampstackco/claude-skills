# Application contexts

A logo is not a single drawing. It is a system of marks that must work in every context the brand touches. Most logo failure happens because a designer optimized for one context (typically the web header at 200px wide) and never tested the others. This file expands the application contexts in [SKILL.md](../SKILL.md) with specific constraint specs, common failure modes, and mitigation patterns. Use it as the working checklist for every variant before declaring a candidate ready for review.

The discipline is to design for the smallest, harshest application FIRST, then scale up. Most brand systems do the opposite: they design at the marketing scale and discover at production time that the mark cannot survive its smaller, harsher applications.

---

## 16px favicon

The most aggressive small-size test. The mark renders inside a 16x16 pixel grid (some browsers go to 32x32, but 16x16 is the historical baseline and still the test that reveals construction problems first).

### Constraints

- 16x16 pixels means roughly 4 to 6 distinguishable visual elements maximum
- No fine detail; lines under 2px disappear
- No gradients (gradients render as muddy color washes at this scale)
- No more than 3 to 4 colors before the rendering algorithm dithers
- Symbol or letterform must read at thumbnail scale, not as a logo

### Failure modes

- Lockups (wordmark plus symbol) almost always fail; the wordmark becomes illegible
- Fine letterform details (custom serifs, decorative crossbars) disappear
- Multi-color symbols dither into pixel noise
- Symbols with internal cutouts or fine negative space lose the cutout at 16px
- Geometric reductions with multiple primitives blur together

### Mitigation patterns

- Ship a dedicated 16x16 favicon-grade asset, not a downscaled version of the lockup
- Use a single element from the lockup (the symbol alone, the letterform-as-symbol, or the monogram) at favicon scale
- Test the favicon on actual browser tabs (Chrome, Safari, Firefox) at the operating system level; the rendering differs from a Photoshop preview
- If the favicon-grade asset cannot be derived from the lockup, the lockup itself is over-detailed; redesign the lockup so a clean 16x16 fallback exists

---

## 28px app icon

iOS, Android, and PWA app icons. Slightly more headroom than favicon (28x28 to 60x60 depending on rendering context) but still demanding strong silhouette.

### Constraints

- 28x28 to 60x60 pixels (varies by OS rendering context: notification badge, home screen, settings menu)
- Must work inside rounded-square or circle masks (iOS), rounded-square (Android)
- 4 to 8 distinguishable visual elements maximum
- Background color matters: app icons have visible bounds, so the mark either fills the icon background or sits inside a colored field
- No fine detail; lines under 3px disappear at the smallest rendering scales

### Failure modes

- Lockups fail at this scale almost as often as at favicon scale
- Symbols with thin strokes lose definition
- Multi-color symbols clash with the icon background fill
- Marks that depend on negative-space cutouts lose those cutouts
- Marks designed for a square ratio fail when rendered inside a circle mask

### Mitigation patterns

- Design the app icon as a separate asset, not a downscaled lockup
- Use the symbol or monogram, not the wordmark
- Pick a strong fill color that supports the symbol (not a generic white background)
- Test the app icon at every required size (29, 40, 60, 76, 80, 87, 120, 152, 167, 180, 1024 for iOS) and at every mask shape (rounded-square iOS, circle for some Android launchers)
- Ship a "monochrome" or "tinted" variant for iOS dark mode and tinted home screen modes (a single-color silhouette of the app icon)

---

## 1.5 inch embroidery patch

Tactile reproduction at small scale. Embroidered patches for hats, jackets, polos, and merchandise. The most demanding physical reproduction context.

### Constraints

- 1.5 inch diameter is the common patch size (some go to 2 or 2.5 inches)
- Color count: 4 to 6 maximum (each thread color is a separate setup cost)
- Minimum stroke weight: roughly 1mm (depends on the embroidery machine and thread weight)
- No gradients, no photographic elements, no fine textures
- Letterforms below 2mm tall do not embroider cleanly
- Sharp inside corners and acute angles fail under the needle path

### Failure modes

- Marks with more than 6 colors require expensive multi-step embroidery or get simplified by the embroiderer in ways the brand owner did not approve
- Fine letterforms (Garamond at small sizes, Helvetica Light) become muddy or fall apart
- Gradient marks fail entirely; the embroiderer either drops the gradient (changes the brand) or refuses the job
- Symbols with thin internal lines lose those lines under the thread weight
- Marks designed for screen do not anticipate the chunky construction embroidery requires

### Mitigation patterns

- Design an embroidery-grade variant of the mark from the start: simplified silhouette, chunky stroke weights, 4 colors maximum
- Test the variant against an actual embroidery sample (not a screen preview) before committing
- Pick a typeface for the wordmark that survives embroidery (slab serifs, heavy sans-serifs, custom thick letterforms work; thin sans-serifs and Garamond do not)
- For brands that anticipate substantial merchandise (apparel brands, hospitality brands, sports teams), build the embroidery-grade variant into the primary system, not as an afterthought

---

## Single-color reproduction

The mark must render in a single color, on any background, for any reproduction medium that does not support color. Etching, foil stamp, single-color print (offset or letterpress), faxed documents (still happens for legal and financial), engraving, screen printing limited to a single color.

### Constraints

- Pure black on white, pure white on black, or single ink color
- No gradients (must collapse to flat color)
- No color-dependent meaning (a symbol that means one thing in red and another in blue fails)
- No subtle color contrasts (a symbol with two shades of gray loses information when reduced to one color)

### Failure modes

- Color-dependent marks (the brand identity is the color, not the form) cannot be reproduced
- Gradients become muddy in single-color etching or foil
- Multiple-color symbols collapse to a single shape that does not read as the original
- Marks that rely on color-coded brand meaning (red = action, blue = trust) lose meaning
- Embossed or debossed reproductions test the construction grid; thin lines fail under embossment

### Mitigation patterns

- Test the design as a pure black-on-white silhouette early; if it does not read in monochrome, color is doing too much work
- Build a dedicated single-color version of the mark with stroke weights and proportions adjusted for monochrome reproduction
- Make sure the single-color version reads as the brand without color
- Pick application contexts that match the single-color variant (foil stamp on letterhead, engraved signage, etched glass, leather embossing, single-color print)

---

## Reverse on dark

The mark on a dark background. The brand's web header in dark mode. The signage at night. The product photography on a black field. The letterhead variant for black envelopes. Many marks fail when reversed because the negative space and stroke balance shift.

### Constraints

- Light strokes on dark background; the form is what is visible, not what is empty
- Gradient marks particularly struggle (the gradient direction may need to invert)
- Color contrast must remain readable (a brand color that works on white may disappear on black)
- Negative-space marks (where the brand identity is the empty space, like FedEx's hidden arrow) require careful inversion handling

### Failure modes

- Marks designed for light backgrounds invert into something that looks like a different mark
- Color contrast fails (yellow on black is fine; pale yellow on black is illegible)
- Thin strokes optimized for white-on-black render too heavy when inverted to black-on-white
- Symbols with internal cutouts work in one direction but not the other
- Brand color decisions made for one direction read wrong in the other

### Mitigation patterns

- Test every mark on dark backgrounds early in the process, not at production time
- Build dedicated reverse-on-dark variants where stroke weights or proportions are adjusted
- For marks that must work on both light and dark, design the construction grid so it is direction-neutral (Apple's apple, Nike's swoosh)
- For marks that cannot be neutral, ship two variants: light-on-dark and dark-on-light, with construction tuned for each

---

## Large-format signage

The mark at building scale. Storefront signage, lobby walls, conference signage, billboard, vehicle wrap. The opposite end of the scale spectrum from favicon.

### Constraints

- Sharp vector with no rasterization; print resolution must support 12+ feet output
- Construction grid integrity matters at every scale (proportional adjustments that work at 1 inch may not work at 12 feet)
- Thin strokes that survive at marketing scale may look anemic at signage scale
- Color reproduction differs (a brand color that prints clean on paper may print different on backlit acrylic, vinyl, or painted aluminum)
- Distance reading: the mark must read at street scale (50 to 200 feet)

### Failure modes

- Wordmarks with thin strokes look anemic at 12 feet
- Fine letterform details that read at marketing scale disappear at signage scale
- Color decisions based on screen rendering do not match the actual material (vinyl, paint, acrylic, illuminated channels)
- Lockups designed for desktop scale crowd or stretch when forced into signage's typical aspect ratios

### Mitigation patterns

- Test the mark at 8 to 12 feet wide as a printed mock-up before committing
- Build signage-grade variants where stroke weights are adjusted for distance reading
- Specify Pantone colors (not RGB or hex) for signage color reproduction
- For illuminated signage (channel letters, backlit acrylic), test the mark with the illumination direction the actual sign will use (front-lit, halo-lit, edge-lit each render differently)

---

## Motion lockup

The mark in animation. Brand entry sequences in video, app launches, motion identity. The mark is no longer static; it moves, scales, fades, transforms.

### Constraints

- The mark must have a natural entry and exit animation
- The construction must support stage-by-stage reveal (wordmarks reveal letter-by-letter; symbols rotate, scale, or assemble from parts)
- Frame rate: 30 to 60 fps for web, 24 fps for film
- Total animation duration: typically 1 to 3 seconds for brand entry; 0.5 to 1 second for app launch
- Easing curves must feel intentional, not generic

### Failure modes

- Marks with arbitrary construction have no natural animation; they snap into place rather than assembling
- Wordmarks animated with random letter entrance look generic; the entrance must follow the letterform construction
- Symbols animated with rotation or scale alone read as obvious; the animation should reveal something about the symbol's construction
- Animation duration too long becomes annoying; too short and the mark does not register

### Mitigation patterns

- Design the mark with animation in mind: the construction should suggest its own assembly
- Specify the motion direction: how does the mark enter, hold, and exit?
- Build a 1-second motion identity that works for app launch, video brand entry, and social media
- Test the motion at the actual deployment surface (app launch screen, social video, in-product brand entry)

---

## Social profile picture (square)

The mark in a square crop, usually inside a circle mask (Twitter, Instagram, LinkedIn, most social platforms). Lockups need a stacked alternate or symbol-only fallback. Symbol-only marks work natively.

### Constraints

- Square aspect ratio (often 400x400 to 800x800 pixels for social profile)
- Often rendered inside a circle mask, so the corners of the square are cropped
- Small enough size that fine detail disappears
- Must read in the user's notification feed at thumbnail scale (60-80 pixels)
- Color contrast against various background colors (light and dark mode platforms)

### Failure modes

- Horizontal lockups crop badly inside square; the wordmark loses its left and right edges
- Marks not designed for circle masking lose corners and read as cropped
- Detail that survives at 200x200 disappears at the 60-80 pixel notification feed scale
- Color choices that work on white backgrounds clash with the platform's darker UI

### Mitigation patterns

- Design a stacked alternate (symbol above wordmark, centered) for square contexts
- Use the symbol-only or monogram fallback for the social profile
- Test the mark inside a circle mask, not just inside a square
- Verify the mark reads at notification feed scale (60-80px), not just at the profile picture display scale (200-400px)

---

## Apparel embroidery

Thread on fabric, smaller scale than patch embroidery. Polo shirts, hats, beanies, t-shirts, aprons. The mark is embroidered directly into the fabric, often without a patch backing.

### Constraints

- Color count: 4 to 6 maximum (each thread color is a setup cost)
- Minimum stroke weight: 1.5mm to 2mm (heavier than patch embroidery because the fabric is the substrate)
- No gradients, no fine detail, no photographic elements
- Letterforms below 2.5mm tall do not embroider cleanly
- Fabric texture affects the read (cotton vs polyester vs wool render differently)
- The mark must survive washing (thread that bleeds or unravels on first wash is a quality failure)

### Failure modes

- Fine wordmark letterforms become muddy or fall apart
- Multi-color marks become expensive or get simplified without approval
- Marks with thin strokes do not survive washing cycles
- Marks not designed for fabric look pasted-on rather than embroidered

### Mitigation patterns

- Design a dedicated apparel-embroidery variant with chunky stroke weights and minimal color
- Specify thread colors (Madeira, Robison-Anton, or other professional embroidery thread brands) rather than CMYK or hex
- Test the variant on the actual fabric weight and color before committing
- Pick the variant of the mark that survives apparel embroidery (the symbol alone, the monogram, the simplified lockup)

---

## Foil stamp on paper or leather

Single-color metallic stamping. Business cards, letterhead, bound books, leather portfolios, signet rings, wax-seal-style stamps. The mark is impressed into the substrate with metallic foil.

### Constraints

- Single color (gold, silver, copper, black foil, etc.); no gradients
- Substantial line weight required (1mm+ minimum for gold or silver foil)
- No fine letterforms; thin serifs disappear under the foil impression
- The substrate matters (matte vs glossy paper, leather vs vellum); each renders differently
- The mark must read in metallic, not as a flat color

### Failure modes

- Thin letterforms disappear or look uneven under the foil
- Marks that depend on color contrast lose meaning in single-color metallic
- Heavy fills require more foil and may bleed at the edges
- Marks designed for screen rendering do not translate to the tactile, reflective surface of foil

### Mitigation patterns

- Design a foil-stamp variant with chunky stroke weights
- Specify foil color (PMS gold, silver, copper) and finish (matte vs glossy foil)
- Test the variant against the actual substrate (the brand's letterhead paper, the brand's leather portfolio cover) before committing
- Treat foil-stamp applications as a hierarchy decision: which mark goes here, given the constraints?

---

## The discipline, restated

Every variant under consideration must pass the application context test before it is a contender. The working checklist:

1. **16px favicon.** Does the mark survive at smallest scale?
2. **28px app icon.** Does the mark work inside rounded-square or circle masks?
3. **1.5 inch embroidery patch.** Can the mark be embroidered with 4-6 colors and chunky strokes?
4. **Single-color reproduction.** Does the mark read in pure black on white?
5. **Reverse on dark.** Does the mark hold up inverted on a dark background?
6. **Large-format signage.** Does the mark survive scaling to 12 feet?
7. **Motion lockup.** Does the mark have a natural entry and exit animation?
8. **Social profile picture.** Does the mark work inside a circle mask at 80px?
9. **Apparel embroidery.** Does the mark survive thread on fabric?
10. **Foil stamp.** Does the mark survive single-color metallic impression?

If a candidate fails three or more of these, it is not a primary mark. It might still serve as a secondary or display lockup, but it is not carrying the brand. The brand needs a fallback hierarchy: primary lockup, secondary monogram or symbol-only, tertiary letterform-as-symbol or simplified mark for the harshest applications.

The hierarchy is the system. The system is what makes the brand readable across every context the audience encounters.

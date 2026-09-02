# Logo client package

The package format clients expect when handing logo work back. The discipline here is doing the boring work upfront so the client never has to ask for "the SVG version" or "a small one for favicons" or "white-on-dark for the slide deck."

## When this applies

- Final delivery of logo work to a client (internal or external)
- Mid-project handoff where another team needs to start building against the mark
- Brand-refresh deliverables where existing applications need to update

## When this does NOT apply

- Concept presentation. Concept stage is for direction-setting, not delivery. Concept decks include 2-3 mark variations with rationale, not a full package.
- Style-guide level brand systems. The client package is the deliverable for the mark itself; a brand-style-guide is a separate concern covering color, type, voice, photography, motion. See the brand-style-guide skill.
- Individual application-specific exports. If the client needs a 2400x1260 LinkedIn cover image with the mark composed against a photo, that is a one-off design request, not a package update.

## The package format

### File formats (the matrix)

Every variant ships in formats that cover the contexts the client will actually use:

| Format | Use case | Notes |
|---|---|---|
| SVG | Web, scalable applications, modern email clients | Primary delivery format. Vector. |
| AI or EPS | Editable source for designers | Source file. Layered if the mark has multiple components. |
| PDF | Print, vector applications, archival | Vector. Embedded fonts or outlined. |
| PNG (transparent) | Web, slide decks, raster contexts where background is unknown | Multiple sizes: 64, 128, 256, 512, 1024, 2048. |
| JPG | Email signatures, contexts where transparency is not supported | Solid background; usually white. Single size, 1024px wide. |
| ICO | Favicon | Multi-resolution: 16x16, 32x32, 48x48 packed into one file. |
| Apple touch icon (PNG) | iOS home-screen bookmarks | Single size, 180x180. |

The asymmetry matters. Vector formats (SVG, AI, PDF) are the source of truth; raster formats (PNG, JPG, ICO) are derived from the vector source at delivery time. Never deliver only raster; clients eventually need to scale up and they cannot.

### Variant matrix

The client gets every meaningful combination of the variant axes:

**Color treatment:**
- Primary (full color, the canonical mark)
- Reverse (white on dark, for dark backgrounds)
- Mono black (single black, for grayscale or low-fidelity contexts)
- Mono white (single white, for full-bleed dark photography)
- Mono brand (single color in the brand color, for one-color print)

**Composition (where the mark has multiple lockups):**
- Primary lockup (the canonical composition, usually horizontal)
- Stacked (vertical, for narrow contexts like favicons or app tiles)
- Symbol-only (when the wordmark is unavailable or unnecessary, like profile avatars)
- With tagline (where a tagline is part of the mark system)
- Without tagline

The client gets every relevant combination. A simple wordmark might have 5 variants total (primary across 5 color treatments). A complex lockup with tagline plus symbol variants might have 30+. Either way: the matrix is exhaustive within the system, not arbitrary.

### Folder structure

Organized so the client can find what they need without thinking:

```
{brand-name}-logo-package/
├── 01-primary/
│   ├── primary-color.svg
│   ├── primary-color.ai
│   ├── primary-color.pdf
│   ├── primary-color-2048.png
│   ├── primary-color-1024.png
│   ├── primary-color-512.png
│   ├── primary-color-256.png
│   ├── primary-color-128.png
│   ├── primary-color-64.png
│   └── primary-color.jpg
├── 02-reverse/
│   └── (same format set, white-on-dark)
├── 03-mono/
│   ├── mono-black/ (full set)
│   ├── mono-white/ (full set)
│   └── mono-brand/ (full set)
├── 04-stacked/
│   └── (same format set, vertical lockup)
├── 05-symbol/
│   └── (symbol-only variants if applicable)
├── 06-favicon/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── favicon-16.png
│   ├── favicon-32.png
│   └── favicon-48.png
├── 07-applications/
│   ├── business-card-mockup.pdf
│   ├── letterhead-mockup.pdf
│   ├── email-signature.png
│   └── social-avatar.png
├── 08-documentation/
│   ├── usage-guide.pdf
│   ├── brand-colors.pdf
│   └── license.pdf
└── README.md
```

Numbered prefixes ensure the client opens folders in the order that matches how they will use them. Documentation last because nobody reads it first; applications second-to-last because they are reference, not deliverable.

### File naming convention

Inside each folder, files follow this pattern:

```
{variant}-{color}-{size or context}.{ext}
```

Examples:
- `primary-color.svg`
- `primary-color-2048.png`
- `reverse-white.svg`
- `mono-black-1024.png`
- `stacked-color.pdf`
- `symbol-color.svg`

Consistent naming means the client can guess a filename before looking.

## The documentation layer

Inside `08-documentation/`:

### usage-guide.pdf

Covers:
- **Clear space**: minimum padding around the mark, expressed as a multiple of a recurring element (often the x-height of the wordmark or the diameter of the symbol)
- **Minimum size**: smallest legible application, with explicit size for digital (px) and print (mm or in)
- **Do's**: contexts where the mark works
- **Don'ts**: stretching, recoloring outside the variant set, rotating, applying effects (drop shadow, gradient, embossed), placing on busy photography without sufficient contrast, replacing the typography in a wordmark
- **Co-branding rules**: how the mark composes with partner marks, including spacing and order

A usage guide that just lists the variants is documentation theater. The do's-and-don'ts section is what protects the mark in the wild.

### brand-colors.pdf

Color values for every meaningful representation:
- Hex (web)
- RGB (digital)
- CMYK (print)
- Pantone (spot color print)
- HSL (where the brand has a programmatic color system)

If the mark uses gradients, document the gradient stops and direction explicitly. Gradients vary in unpredictable ways across rendering engines; precise documentation is the only protection.

### license.pdf

Covers:
- Who owns the mark (usually the client)
- Who the designer is (for attribution, if required)
- Usage terms (typically: client has full and exclusive use; designer retains the right to display in portfolios)
- Modification rights (typically: client cannot modify without designer consent during a defined warranty period; after that, all rights to modify pass to the client)
- Successor terms (what happens if the client sells the brand or merges with another company)

License documentation is the part most independent designers skip and most agencies overformat. The middle path is a 1-page document that names the parties, defines usage, and is signed.

## Delivery mechanisms

Three patterns, in increasing formality:

**ZIP archive over email.** Smallest projects. The client gets a single `.zip`, downloads, expands, drops into their workspace. Works for packages under ~50 MB. Watch out for email size limits.

**Cloud storage link.** Most common pattern. Drive, Dropbox, Box, OneDrive. Client gets a link, downloads at leisure, can re-share within their organization. Set link to view-only with download enabled. Set an expiration date if warranty terms are time-bound.

**Brand portal.** Largest projects. Paid tools like Frontify, Brandfolder, Brandkit. The portal becomes the canonical source of truth; the client gets logins for stakeholders. Worth the cost when there are 10+ internal stakeholders downloading assets ad hoc, or when the brand system has dozens of marks (parent plus sub-brands).

Match the mechanism to the client's actual workflow, not their stated preference. Clients will say they want a brand portal, then download the ZIP and never log in to the portal again.

## Failure patterns

**Delivering only raster.** PNG-only or JPG-only packages mean the client cannot scale up cleanly. Always include vector. If the work was done in raster (rare for logo work, but it happens), trace to vector before delivery.

**Delivering only the primary variant.** A primary-mark-only package fails the moment the client needs to put the mark on a dark background or print it in one color. The variant matrix is the deliverable, not an optional extra.

**Delivering source files without a license document.** Clients who paid for the work expect to own it. Source files (AI/EPS) without an explicit license create ambiguity that surfaces during acquisitions or partnerships. Always include the license PDF.

**Variant naming drift across the package.** `Primary_Logo_Color.svg` in one folder and `primary-color.svg` in another means the client's tooling (CMS, design system) will not recognize the assets consistently. Pick a convention; apply it everywhere.

**Skipping the favicon.** Almost every client will host a website. The website needs a favicon. Adding the favicon variant adds one folder; omitting it means the client comes back asking for it.

**Embedding fonts in the SVG without confirming licensing.** SVG with embedded font glyphs is fine when the font is open-source. When the font is licensed (e.g., a Monotype or Adobe Fonts file), embedding the glyphs may violate the license. Outline the font in the SVG before delivery; the visual remains identical, and the licensing risk disappears.

## What "done" looks like

The client opens the ZIP (or the cloud link), sees a numbered folder structure, opens `01-primary/primary-color.svg`, and ships the mark to production within 5 minutes.

If the client emails back asking "do you have a white version?" or "is there an SVG?" or "can you send the favicon?", the package was incomplete.

---
name: media-asset-management
description: "Plan and run a media pipeline for images, video, and downloadable assets. Use this skill when designing image storage and delivery, choosing formats (WebP, AVIF), setting up responsive images, picking a video host, organizing a brand asset library, or auditing a slow image pipeline. Triggers on image pipeline, asset library, DAM, image optimization, WebP, AVIF, responsive images, video hosting, image CDN, asset workflow, media management. Also triggers when images are slow, broken, or scattered across systems."
---

# Media Asset Management

Design how images, video, and downloadable files get stored, processed, organized, and served. Stack-agnostic. The principles apply whether you're running a custom pipeline or using a hosted service.

---

## When to use

- Designing or redesigning the image and media pipeline
- Choosing a media CDN or image service
- Setting up responsive image delivery
- Planning a digital asset management (DAM) system
- Auditing media performance issues
- Picking video hosting and embedding strategy
- Setting up workflows for designers and writers to upload assets
- Migrating media from one platform to another

## When NOT to use

- Performance optimization beyond media (use `performance-optimization`)
- Brand identity or photography direction (use `brand-identity`, `art-direction`)
- Content production strategy (use `content-strategy`)
- Single-image optimization (covered in `performance-optimization`)

---

## Required inputs

- Current media inventory: where assets live, in what formats
- Volume: how many assets, how much storage, how much traffic
- Sources: who creates and uploads media (designers, writers, automated tools)
- Platforms: where media is consumed (web, email, app, partners)
- Performance baseline: current image sizes, load times
- Budget reality: hosted services have monthly costs

---

## The framework: 4 stages

The media pipeline has four stages. Each has its own decisions.

### Stage 1: Source

Where assets enter the system.

**Sources:**
- Designers (Figma exports, Photoshop, Illustrator)
- Photographers (RAW or JPEG from camera)
- Stock photo libraries
- AI-generated images
- User-generated content (uploads)
- Automated systems (e.g., screenshots, generated thumbnails)

**At source, decide:**
- File formats accepted (RAW, TIFF, PSD, AI vs delivered formats)
- Naming conventions
- Required metadata (alt text, captions, credits, rights)
- Maximum source resolution (high enough to derive any size; not so high it's wasteful)
- Where source files live (separate from delivered assets)

**Anti-pattern:** sources and delivered assets in the same place. Hard to find masters. Hard to regenerate. Hard to audit usage.

### Stage 2: Process

Transforming source files into delivery formats.

**Processing decisions:**
- Resize to standard sizes (e.g., a fixed set of widths: 320, 640, 960, 1280, 1920, 2560)
- Compress (lossy or lossless, with quality targets)
- Convert formats (JPEG, WebP, AVIF for raster; SVG for vector)
- Generate thumbnails and previews
- Strip metadata (EXIF, GPS) unless intentionally retained
- Color profile management (sRGB for web)

**Process options:**
- **Build-time:** Static assets processed during deploy. Predictable, fast at runtime, hard to vary.
- **On-demand:** A service generates the right format/size when requested. Flexible, requires a processing layer.
- **Hybrid:** Static processed sizes plus on-demand for edge cases.

For sites with many image variants and ongoing change, on-demand wins. For tightly controlled marketing sites, build-time can be simpler.

### Stage 3: Deliver

Getting assets to users efficiently.

**Delivery decisions:**
- CDN: required for any non-trivial volume. Edge caching, global distribution.
- Format negotiation: serve AVIF to browsers that support it, WebP otherwise, JPEG as fallback. Use the `<picture>` element or content negotiation.
- Responsive images: `srcset` and `sizes` attributes so browsers pick the right size for the viewport.
- Lazy loading: `loading="lazy"` for below-the-fold images.
- Async decoding: `decoding="async"` for non-critical images.
- Width and height attributes: always set, prevents layout shift.

**Modern HTML pattern:**

```html
<img 
  src="/image-1280.jpg" 
  srcset="/image-640.jpg 640w, /image-960.jpg 960w, /image-1280.jpg 1280w, /image-1920.jpg 1920w" 
  sizes="(max-width: 768px) 100vw, 50vw"
  width="1280"
  height="720"
  loading="lazy"
  decoding="async"
  alt="Descriptive alt text">
```

Or for format negotiation:

```html
<picture>
  <source type="image/avif" srcset="/image.avif">
  <source type="image/webp" srcset="/image.webp">
  <img src="/image.jpg" alt="Descriptive alt text" width="1280" height="720">
</picture>
```

### Stage 4: Manage

Keeping the system organized and useful over time.

**Management decisions:**
- Asset library or DAM (digital asset management): centralized place for the team to find assets
- Tagging and search
- Version control (designers updating an asset, old version still in use)
- Rights and licensing tracking
- Audit and cleanup (what's not used anymore?)
- Permissions (who can upload, edit, delete)

A simple shared folder works at low scale. A real DAM is necessary above a few thousand assets or with multiple teams.

---

## Format reference

For typical web use:

| Format | Use for | Avoid for |
|---|---|---|
| AVIF | Photographs, complex images. Best compression. | Browser support edge cases (rare in 2026, ubiquitous now) |
| WebP | Photographs, illustrations. Good compression. Wide support. | Print, archival |
| JPEG | Photographs (fallback). Universal support. | Sharp-edged graphics, transparent backgrounds |
| PNG | Sharp-edged graphics, transparent backgrounds, screenshots. Lossless. | Photographs (file size) |
| SVG | Logos, icons, simple illustrations. Scalable. | Photographs, complex art |
| GIF | Effectively obsolete. Use video formats for animation. | Anything modern |
| MP4 (H.264) | Video, universal support. | Static content |
| WebM (VP9 / AV1) | Video, better compression. | Older browsers |

For most sites: serve AVIF/WebP for modern browsers, JPEG/PNG fallback. SVG for vector. MP4 for video.

---

## Workflow

### Step 1: Inventory

What assets exist? Where? In what state?

- Image count and total storage
- Average sizes (KB) per format
- Image-related performance metrics
- Number of pages with broken or missing images
- Source files vs delivered files

### Step 2: Audit performance

For a sample of pages:
- Image weight per page (target: under 500KB total for marketing pages)
- Number of image requests
- Are responsive images used?
- Are modern formats served?
- Is there layout shift from missing dimensions?

Tools: Lighthouse, WebPageTest, your CDN's analytics.

### Step 3: Pick the pipeline

Three reasonable patterns:

**Pattern A: Static, build-time**
- Assets in repo or storage bucket
- Build process generates sizes and formats
- Served via CDN
- Good for: static sites, low asset churn, tight performance control

**Pattern B: Image CDN with on-demand**
- Source uploads to a bucket or service
- An image CDN (Cloudinary, imgix, Cloudflare Images, Bunny, etc.) processes on-demand via URL parameters
- Good for: mid-to-large sites, frequent asset changes, multiple variants

**Pattern C: Headless CMS with built-in image API**
- CMS holds source assets
- CMS provides image API for resizing, format conversion
- Good for: content-heavy sites, non-technical content uploaders, when CMS is already chosen

The patterns aren't mutually exclusive. Big sites often use Pattern A for design assets, Pattern B for content images.

### Step 4: Define standards

Document:
- Naming conventions
- Required metadata (alt text, attribution)
- Maximum source dimensions
- Minimum source dimensions per use case
- Approved formats
- File size targets

Make these enforceable through tooling where possible (CI checks on file sizes, alt text required by CMS).

### Step 5: Set up workflows

For each source type:

| Source | Workflow |
|---|---|
| Designer | Export from Figma, drop into bucket, automated processing handles the rest |
| Writer | Upload through CMS, CMS prompts for alt text |
| Photographer | RAW into source bucket, designer or automation creates web variants |
| User upload | Pass through the image service, automatic moderation if applicable |

Document who does what. Workflows that aren't documented break.

### Step 6: Build the asset library

For all but the smallest sites:
- Centralized DAM or shared library
- Tag taxonomy (subject, style, brand, campaign, etc.)
- Search across tags and metadata
- Documented rights for each asset (stock license, custom commission, work-for-hire, etc.)
- Sunset workflow (rights expire, asset retires)

### Step 7: Monitor and audit

- Performance metrics on image-heavy pages
- Storage costs
- CDN costs
- Broken image alerts (404 on referenced media)
- Unused asset cleanup (storage costs accumulate)

### Step 8: Document the pipeline

A pipeline document covers:
- Diagram of source → process → deliver → manage
- Tools used at each stage
- Standards and naming conventions
- Workflows for common cases
- Escalation when something breaks

---

## Failure patterns

**Source files in the delivery bucket.** 50MB RAW files served to users. Fix: separate sources from delivered.

**Single image format for every browser.** JPEG-only when AVIF could be 30-50% smaller. Use format negotiation.

**Missing width and height attributes.** Causes layout shift, hurts CLS metric. Set always.

**Lazy loading hero images.** Above-the-fold images shouldn't be lazy-loaded. Lazy below the fold.

**Eager loading everything.** All images load on page load. Use `loading="lazy"` for below-fold.

**No responsive images.** Mobile gets the desktop image. Wasteful, slow. Use `srcset` and `sizes`.

**One source resolution.** Source is the delivery resolution. Can't generate retina or larger. Source should be 2-3x the largest delivered size.

**Stripping all metadata.** Removes alt text, removes attribution. Strip GPS and personal EXIF; keep semantic metadata.

**Random naming.** `IMG_4823.jpg`, `Screenshot 2024-03-15.png`. Hard to find later. Use a naming convention.

**No alt text.** Accessibility failure, SEO failure. Make alt text required at upload.

**Storage growing unbounded.** Old, unused assets pile up. Quarterly cleanup or automated lifecycle policies.

**One person knows the pipeline.** When they're out, no one can fix issues or onboard new sources. Document.

---

## Output format

A media pipeline document includes:

- **Inventory:** current asset count, formats, storage
- **Pipeline diagram:** source → process → deliver → manage with tools at each stage
- **Format and size standards:** what gets generated, when
- **Naming and metadata conventions:** with examples
- **Workflows by source type:** designer, writer, photographer, user
- **Performance baseline and targets:** weight per page, format adoption, etc.
- **Asset library:** tool, taxonomy, search, rights tracking
- **Monitoring:** performance, costs, broken assets
- **Roadmap:** improvements over the next 1-2 quarters

---

## Reference files

- `references/responsive-image-patterns.md`: Copy-paste HTML patterns for common responsive image scenarios (hero, content, art-directed, format negotiation), with explanations.

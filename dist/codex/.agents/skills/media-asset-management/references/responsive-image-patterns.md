# Responsive Image Patterns

Copy-paste HTML patterns for common image scenarios. Each pattern is annotated with what it does and when to use it.

The principles work across stacks. The HTML is the same whether you're in Next.js, WordPress, Webflow, or vanilla HTML.

---

## Pattern 1: Simple responsive image

The default for most content images. Same image at different sizes.

```html
<img 
  src="/img/photo-1280.jpg" 
  srcset="
    /img/photo-640.jpg 640w,
    /img/photo-960.jpg 960w,
    /img/photo-1280.jpg 1280w,
    /img/photo-1920.jpg 1920w
  " 
  sizes="(max-width: 768px) 100vw, 50vw"
  width="1280"
  height="720"
  loading="lazy"
  decoding="async"
  alt="Descriptive alt text">
```

**What's happening:**
- `src`: fallback for browsers that don't support srcset (rare today, still good practice)
- `srcset`: list of available sizes with their widths
- `sizes`: tells the browser how wide the image will display at different viewport widths
- `width`/`height`: prevents layout shift; the browser reserves space before the image loads
- `loading="lazy"`: delays loading until near the viewport
- `decoding="async"`: doesn't block rendering on this image
- `alt`: accessibility and SEO

**When to use:** Most content images, blog post bodies, article illustrations.

---

## Pattern 2: Hero image (above the fold)

The hero image needs special handling because it's critical to first paint.

```html
<img 
  src="/img/hero-1920.jpg" 
  srcset="
    /img/hero-640.jpg 640w,
    /img/hero-960.jpg 960w,
    /img/hero-1280.jpg 1280w,
    /img/hero-1920.jpg 1920w,
    /img/hero-2560.jpg 2560w
  " 
  sizes="100vw"
  width="1920"
  height="1080"
  fetchpriority="high"
  decoding="async"
  alt="Descriptive alt text">
```

**Differences from Pattern 1:**
- No `loading="lazy"` (hero must load immediately)
- `fetchpriority="high"` (hint to load this first)
- Larger size options for full-width displays
- `sizes="100vw"` (image takes full viewport width)

Optionally preload the hero in the document head:

```html
<link 
  rel="preload" 
  as="image" 
  href="/img/hero-1280.jpg" 
  imagesrcset="/img/hero-640.jpg 640w, /img/hero-960.jpg 960w, /img/hero-1280.jpg 1280w, /img/hero-1920.jpg 1920w, /img/hero-2560.jpg 2560w" 
  imagesizes="100vw">
```

This tells the browser to start the request before HTML parsing reaches the `<img>`.

**When to use:** The single hero or banner at the top of a page. Don't preload more than one image; it competes with critical resources.

---

## Pattern 3: Format negotiation

Serve modern formats to browsers that support them, fall back to JPEG.

```html
<picture>
  <source 
    type="image/avif"
    srcset="
      /img/photo-640.avif 640w,
      /img/photo-960.avif 960w,
      /img/photo-1280.avif 1280w
    "
    sizes="(max-width: 768px) 100vw, 50vw">
  <source 
    type="image/webp"
    srcset="
      /img/photo-640.webp 640w,
      /img/photo-960.webp 960w,
      /img/photo-1280.webp 1280w
    "
    sizes="(max-width: 768px) 100vw, 50vw">
  <img 
    src="/img/photo-1280.jpg"
    srcset="
      /img/photo-640.jpg 640w,
      /img/photo-960.jpg 960w,
      /img/photo-1280.jpg 1280w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
    width="1280"
    height="720"
    loading="lazy"
    decoding="async"
    alt="Descriptive alt text">
</picture>
```

**What's happening:**
- The browser tries each `<source>` in order
- The first one with a supported `type` is used
- The `<img>` is the fallback if no `<source>` matches
- The `<img>` also provides the alt text and dimensions for all formats

**When to use:** Whenever your pipeline can produce multiple formats. AVIF is now well-supported; WebP is universal. JPEG is the safe fallback.

**Easier alternative:** A modern image CDN can do format negotiation server-side based on the `Accept` header. The HTML stays as Pattern 1; the CDN serves the right format. Often the better approach.

---

## Pattern 4: Art direction (different crops at different breakpoints)

Sometimes you want a different image (not just a different size) on mobile vs desktop.

```html
<picture>
  <source 
    media="(max-width: 768px)"
    srcset="
      /img/portrait-640.jpg 640w,
      /img/portrait-960.jpg 960w
    "
    sizes="100vw">
  <source 
    media="(min-width: 769px)"
    srcset="
      /img/landscape-1280.jpg 1280w,
      /img/landscape-1920.jpg 1920w
    "
    sizes="100vw">
  <img 
    src="/img/landscape-1280.jpg"
    width="1920"
    height="1080"
    loading="lazy"
    decoding="async"
    alt="Descriptive alt text">
</picture>
```

**What's happening:**
- On screens 768px wide or less, use the portrait crop
- On larger screens, use the landscape crop
- Different aspect ratios per device

**When to use:** Marketing pages where the image composition matters at each breakpoint. Often for hero images of people or products.

**Caution:** Set explicit dimensions to match each crop, or be careful about layout shift between crops. CSS aspect-ratio can help.

---

## Pattern 5: Background images

For decorative backgrounds set in CSS, use `image-set()` for responsive selection:

```css
.hero {
  background-image: image-set(
    url('/img/hero-1280.jpg') 1x,
    url('/img/hero-2560.jpg') 2x
  );
}
```

For format negotiation in CSS:

```css
.hero {
  background-image: image-set(
    url('/img/hero.avif') type('image/avif'),
    url('/img/hero.webp') type('image/webp'),
    url('/img/hero.jpg') type('image/jpeg')
  );
}
```

**Note:** Background images are decorative. If the image carries meaning, it should be an `<img>` with alt text, not a CSS background.

---

## Pattern 6: SVG (vectors)

For logos, icons, simple illustrations:

```html
<img 
  src="/img/logo.svg" 
  width="200" 
  height="40" 
  alt="Brand name">
```

Or inline for icons (better for theming with CSS):

```html
<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
  <path d="..."/>
</svg>
```

**Notes:**
- SVG is resolution-independent. No `srcset` needed.
- For decorative icons, use `aria-hidden="true"`. For meaningful icons, provide a label.
- Inline SVG can be styled with CSS. Linked SVG cannot.

---

## Pattern 7: Lazy-loaded video

Treat video like a heavy image:

```html
<video 
  width="1280"
  height="720"
  poster="/img/video-poster.jpg"
  preload="metadata"
  controls>
  <source src="/video/clip.webm" type="video/webm">
  <source src="/video/clip.mp4" type="video/mp4">
  <track kind="captions" src="/video/clip-captions.vtt" srclang="en" label="English">
  Your browser does not support the video tag.
</video>
```

**Notes:**
- `poster`: image shown before play, sized to match video
- `preload="metadata"`: only loads enough to know duration, not the whole file
- `<track>`: captions for accessibility (always include for non-decorative video)
- Multiple `<source>`: browser picks the first supported format

**For autoplay video** (decorative, no audio):

```html
<video 
  autoplay 
  muted 
  loop 
  playsinline
  poster="/img/poster.jpg"
  preload="auto">
  <source src="/video/loop.mp4" type="video/mp4">
</video>
```

`muted` and `playsinline` are required for autoplay on most browsers. Be cautious about autoplay; many users disable it or find it annoying.

---

## Pattern 8: User-uploaded images

For images uploaded by users (avatars, content), set defensive defaults:

```html
<img 
  src="/uploads/avatar-medium.jpg"
  width="200"
  height="200"
  loading="lazy"
  decoding="async"
  alt="" 
  onerror="this.style.display='none'">
```

**Notes:**
- Process uploads through a moderation step before serving (especially for public sites)
- Generate consistent sizes (small, medium, large)
- Strip EXIF (GPS, etc.) for privacy
- Have a fallback (default avatar, broken image hidden)
- alt text from user-provided context where possible

---

## Pattern 9: Image with caption

Use `<figure>` for semantically grouped image and caption.

```html
<figure>
  <img 
    src="/img/photo-1280.jpg"
    srcset="/img/photo-640.jpg 640w, /img/photo-960.jpg 960w, /img/photo-1280.jpg 1280w"
    sizes="(max-width: 768px) 100vw, 50vw"
    width="1280"
    height="720"
    loading="lazy"
    decoding="async"
    alt="Descriptive alt text">
  <figcaption>Caption visible to all users.</figcaption>
</figure>
```

**Notes:**
- alt text describes the image for users who can't see it
- caption provides context for everyone
- They serve different purposes; both are useful when there's a caption

---

## Anti-patterns

**Lazy-loading the hero image.** Above-the-fold images should load immediately.

**Missing width and height.** Causes layout shift. Always set.

**Same image, different file extensions.** `image.jpg` and `image.JPG` for the same content. Pick one convention.

**Tracking pixels masquerading as images.** Use proper analytics, not 1x1 GIFs.

**Decorative images with descriptive alt text.** A decorative pattern with `alt="ornamental swirl background"` is noise for screen readers. Use `alt=""` for purely decorative.

**Decorative images with no alt attribute at all.** Screen readers may announce the filename. Use `alt=""` (empty, not missing).

**Inline base64 images for non-trivial sizes.** Bloats HTML. Use a URL.

**Forgetting captions in non-English contexts.** Captions and alt text need translation just like any other content.

---

## Alt text guidelines

- **Decorative:** `alt=""` (empty)
- **Functional (e.g., a search button icon):** describes the action: `alt="Search"`
- **Informative:** describes the content the user is missing: `alt="Hand holding a coffee cup at a wooden desk"`
- **Complex (charts, infographics):** brief alt + a fuller description in nearby text or `aria-describedby`

Alt text should:
- Convey what the image conveys, not what it depicts
- Be concise (typically under 125 characters)
- Not start with "Image of" or "Picture of" (screen readers say that already)
- Include important text that's part of the image

---

## Tooling notes

Most modern frameworks have an `<Image>` component that wraps these patterns. Examples include Next.js Image, Astro Image, Nuxt Image. They handle:

- Format negotiation automatically
- Responsive sizes
- Lazy loading defaults
- Width/height enforcement

If you're using a framework with such a component, prefer it over hand-rolling the HTML. The framework version usually includes optimizations the hand-rolled version misses.

If you're not using a framework, the patterns here are the right baseline.

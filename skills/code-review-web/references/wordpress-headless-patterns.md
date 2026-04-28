# WordPress Headless Patterns

Stack-specific patterns for WordPress as a headless CMS, integrated with a separate frontend (Next.js, Astro, Eleventy, custom, etc.).

The principles in SKILL.md apply universally. This file covers the WordPress-specific patterns that recur in headless setups.

---

## Architecture

A headless WordPress setup typically looks like:

```
cms.yourdomain.com  → WordPress backend (admin, REST API, media)
yourdomain.com      → Frontend (renders content fetched from CMS API)
```

WordPress serves the data and admin. The frontend serves the user-facing site. The two are decoupled.

This separation matters for several patterns below.

---

## Always use a CMS subdomain

**Pattern:** All API calls go to a dedicated subdomain.

```
WP_API_URL=https://cms.yourdomain.com/wp-json
```

**Anti-pattern:** API calls to the main domain.

```
WP_API_URL=https://yourdomain.com/wp-json    # this will break after DNS cutover
```

**Why:** When the main domain points to the frontend (post-DNS cutover), API calls to the main domain hit the frontend instead of WordPress. The frontend has no `/wp-json` route, so calls fail.

The CMS subdomain remains a stable, dedicated endpoint regardless of where the main domain points.

---

## Site URL configuration in WordPress

After moving to a subdomain, WordPress needs to know its real URL. Otherwise the admin redirects to the main domain.

In `wp-config.php`:

```php
define("WP_HOME", "https://cms.yourdomain.com");
define("WP_SITEURL", "https://cms.yourdomain.com");
```

**Symptom if missing:** Logging into `cms.yourdomain.com/wp-admin` redirects to `yourdomain.com/wp-admin`, which hits the frontend (no admin), returning a 403 or 404.

---

## Media URL handling

WordPress generates media URLs based on the configured site URL. When fetched through the API, they will reference the CMS subdomain. The frontend needs to handle these correctly.

### Pattern 1: Reference media at the CMS subdomain (simplest)

The frontend renders images directly from the CMS subdomain:

```html
<img src="https://cms.yourdomain.com/wp-content/uploads/photo.jpg" alt="..." />
```

**Pros:** Simple. No URL rewriting.
**Cons:** Browser makes requests to a different origin. Need to allow that origin in image optimizer config.

### Pattern 2: Rewrite media URLs to the frontend domain

Strip the CMS prefix and serve media via the frontend's image optimizer:

```typescript
// Convert CMS media URL to a pattern the frontend image optimizer accepts
function rewriteMediaUrl(url: string): string {
  return url.replace("https://cms.yourdomain.com", "");
}
```

Configure the frontend image optimizer to allow the CMS subdomain as a remote source.

### Anti-pattern: Hardcoded media URLs in content

If editors paste full URLs into the content (`<img src="https://cms.yourdomain.com/...">`), changing the CMS subdomain later breaks every reference. Use relative paths or template-rendered URLs instead.

---

## Permalinks and post URLs

WordPress posts have a `link` field in the API response that returns the WordPress-rendered URL (e.g., `https://cms.yourdomain.com/post-slug/`). This is wrong for the public-facing site.

**Anti-pattern:** Using the `link` field directly.

```typescript
// Wrong - shows the CMS URL
<a href={post.link}>{post.title}</a>
```

**Pattern:** Construct the public URL from the slug.

```typescript
// Right - build the URL the frontend serves
<a href={`/blog/${post.slug}`}>{post.title}</a>
```

---

## Caching and revalidation

The frontend caches API responses. When content changes in WordPress, the cache must be invalidated.

### Pattern 1: Time-based revalidation

Cache responses for a fixed period. Simple but content can be stale up to that period.

```typescript
const res = await fetch(`${WP_API_URL}/wp/v2/posts`, {
  next: { revalidate: 3600 }, // 1 hour
});
```

### Pattern 2: On-demand revalidation via webhook

WordPress fires a webhook on save. The webhook calls a frontend endpoint that invalidates the cache.

WordPress side (mu-plugin or theme function):

```php
add_action('save_post', function ($post_id) {
  $post = get_post($post_id);
  if ($post->post_status !== 'publish') return;
  
  wp_remote_post('https://yourdomain.com/api/revalidate', [
    'body' => json_encode([
      'secret' => REVALIDATE_SECRET,
      'path' => '/blog/' . $post->post_name,
    ]),
    'headers' => ['Content-Type' => 'application/json'],
  ]);
});
```

Frontend side: an endpoint that invalidates the cache for the given path.

### Pattern 3: Tag-based invalidation

Tag fetches with semantic identifiers, then invalidate by tag when relevant content changes.

```typescript
const posts = await fetch(`${WP_API_URL}/wp/v2/posts`, {
  next: { tags: ["posts"] },
});

// Later, invalidate
revalidateTag("posts");
```

---

## Authentication for the API

For private content or write operations, the API requires authentication.

### Application passwords (built into WordPress)

WordPress supports application passwords for API authentication. Generate one in the admin under user profile.

```typescript
const auth = btoa(`${username}:${appPassword}`);

const res = await fetch(`${WP_API_URL}/wp/v2/posts`, {
  headers: {
    Authorization: `Basic ${auth}`,
  },
});
```

**Anti-pattern:** Hardcoding credentials in client-side code. Application passwords go in server-only environment variables.

### JWT (via plugin)

JWT plugins offer a more standard auth flow but add a plugin dependency.

---

## Common bugs and fixes

### "API returns 403 from server-side fetch"

**Cause 1:** A bot mitigation service (Cloudflare's "Attack Challenge Mode" or similar) is challenging the server-to-server request.

**Fix:** Disable bot mitigation challenges for the CMS API path, or whitelist the frontend's server IPs.

**Cause 2:** The API requires authentication and the request is unauthenticated.

**Fix:** Add an `Authorization` header with application password or JWT.

### "Posts list is paginated and we're only getting 10"

**Cause:** WordPress default per-page is 10.

**Fix:** Use `per_page` parameter and handle pagination:

```typescript
const res = await fetch(`${WP_API_URL}/wp/v2/posts?per_page=100`);
const total = parseInt(res.headers.get('x-wp-total') ?? '0');
const totalPages = parseInt(res.headers.get('x-wp-totalpages') ?? '0');
```

For very large content sets, paginate explicitly rather than fetching all at once.

### "Custom fields are missing from the API response"

**Cause:** Advanced Custom Fields (ACF) or custom post meta is not exposed by default.

**Fix:** Use the ACF to REST API plugin, or register custom fields with `register_rest_field`:

```php
add_action('rest_api_init', function () {
  register_rest_field('post', 'custom_field_name', [
    'get_callback' => function ($post) {
      return get_post_meta($post['id'], 'custom_field_name', true);
    },
  ]);
});
```

### "Featured image is missing from the API response"

**Cause:** The API returns the image ID, not the full media object.

**Fix:** Use `_embed=true` to inline media:

```typescript
const res = await fetch(`${WP_API_URL}/wp/v2/posts?_embed=true`);
// Now post._embedded["wp:featuredmedia"][0] has the full image data
```

### "Slug-only URLs return wrong content after rename"

**Cause:** WordPress slug changes don't redirect the old slug. Frontend caches lock to the old slug.

**Fix:**
1. WordPress: install a redirection plugin or maintain a redirects table
2. Frontend: handle 404s on slug routes by falling back to a search-by-title

---

## Code review checklist for headless WordPress

- [ ] All API calls use the CMS subdomain (no main domain references)
- [ ] WP_HOME and WP_SITEURL set in wp-config.php
- [ ] Media URLs handled correctly (either CMS-direct or rewritten)
- [ ] Post URLs constructed from slug, not the WordPress `link` field
- [ ] Cache invalidation strategy in place (time-based, webhook, or tag)
- [ ] Authentication credentials in server-only env vars
- [ ] API responses include needed embedded data (`_embed=true` where relevant)
- [ ] Pagination handled for large post lists
- [ ] Error handling for API failures (CMS down should not crash the frontend)
- [ ] Custom fields exposed via REST API where needed

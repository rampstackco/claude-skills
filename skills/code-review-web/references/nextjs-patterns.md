# Next.js Patterns

Stack-specific patterns and anti-patterns for Next.js projects. Covers App Router and Pages Router. Stack-agnostic principles live in SKILL.md.

---

## App Router specific

### Server vs client components

**Default to server components.** Reach for `"use client"` only when interactivity, browser APIs, or React state hooks are required.

```typescript
// Server component (default) - runs on server, no hydration cost
// app/page.tsx
export default async function Page() {
  const data = await fetchData();
  return <Article data={data} />;
}

// Client component - hydrates in browser
// app/components/InteractiveButton.tsx
"use client";
export default function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Anti-pattern:** Marking parent components as `"use client"` when only a leaf component needs it. This pulls everything below into the client bundle.

### ISR and revalidation

Pick the right rendering strategy per route:

```typescript
// Static (default) - rendered at build, served from CDN
export default async function Page() { ... }

// ISR (revalidate periodically) - rendered at build, regenerated on schedule
export const revalidate = 3600; // 1 hour

// Dynamic (rendered on every request) - never cached
export const dynamic = "force-dynamic";

// Common combination: dynamic with cache hint for downstream
export const dynamic = "force-dynamic";
export const revalidate = 3600;
```

### Build timeout failures

Common error:
```
Failed to build /route after 3 attempts because it took more than 60 seconds
```

**Cause:** A static route that queries a database or external API at build time, and the call exceeds the build timeout.

**Fix:** Add `dynamic = "force-dynamic"` to defer rendering to request time:

```typescript
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  try {
    const data = await dbQuery();
    return generateResponse(data);
  } catch (e) {
    console.error("Route error:", e);
    return new Response("", { status: 200 }); // empty but valid
  }
}
```

### TypeScript errors in scripts directory

If you have a `scripts/` folder with one-off scripts, exclude it from the build:

```json
// tsconfig.json
{
  "exclude": ["node_modules", "scripts"]
}
```

### Canonical URL configuration

The canonical domain must come from a server-only environment variable. Never expose with `NEXT_PUBLIC_` prefix.

```typescript
// next.config.ts
const config = {
  env: {
    SITE_URL: process.env.SITE_URL ?? "https://yourdomain.com",
  },
};
export default config;
```

```typescript
// Where the canonical is set
const url = process.env.SITE_URL; // server-only, never exposed to browser
```

**Anti-pattern:** Using `NEXT_PUBLIC_SITE_URL`. Vercel preview deploys will pick up the preview URL and pollute production canonicals.

---

## Pages Router specific

### getStaticProps timeouts

Same fundamental issue as App Router build timeouts. Solution is `getServerSideProps` for routes that need fresh data:

```typescript
// pages/dynamic-page.tsx
export async function getServerSideProps(context) {
  const data = await dbQuery();
  return { props: { data } };
}
```

Or ISR:

```typescript
export async function getStaticProps() {
  const data = await dbQuery();
  return {
    props: { data },
    revalidate: 3600,
  };
}
```

---

## Common patterns across both routers

### API routes / route handlers

**Authentication on mutations:**

```typescript
// app/api/protected/route.ts (App Router)
export async function POST(req: Request) {
  const secret = req.headers.get("authorization");
  if (secret !== `Bearer ${process.env.API_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  // ... handle the request
}
```

**Revalidation endpoint protection:**

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = url.searchParams.get("path") ?? "/";
  revalidatePath(path);
  
  return Response.json({ revalidated: true, path });
}
```

### Image optimization

Use the framework's built-in image component for proper optimization:

```typescript
import Image from "next/image";

<Image
  src="/photo.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy" // explicit even though lazy is default for below-fold
/>
```

For external image domains, configure `next.config.ts`:

```typescript
const config = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.yourdomain.com" },
    ],
  },
};
```

### Environment variables

Three categories. Be explicit about which is which.

```
Server-only secrets (never prefix with NEXT_PUBLIC_):
  DATABASE_URL
  API_SECRET
  STRIPE_SECRET_KEY
  REVALIDATE_SECRET
  SITE_URL  (use server-only even for canonical, despite being a "public" value)

Client-safe variables (NEXT_PUBLIC_ prefix exposes to browser):
  NEXT_PUBLIC_GA_ID
  NEXT_PUBLIC_DEFAULT_LANGUAGE
  NEXT_PUBLIC_FEATURE_FLAGS

Build-time only:
  ANALYZE_BUNDLE
  NODE_ENV (set automatically)
```

**Red flags during review:**
- Any secret with `NEXT_PUBLIC_` prefix
- Canonical or site URL set to a preview/staging URL in production
- Service role keys exposed to the browser

---

## Common bugs and fixes

### Page renders partially after deploy

**Symptom:** Hero loads but content below is missing or stale.

**Cause:** Stale ISR cache from before the deploy.

**Fix:** Force revalidation:

```bash
curl -X POST "https://yourdomain.com/api/revalidate?path=/&secret=$REVALIDATE_SECRET"
```

If the issue persists, check server logs for rendering errors during regeneration.

### CMS API redirects to main domain after DNS cutover

**Symptom:** API calls to the CMS return 302 redirects or 403 errors.

**Cause:** API URL points at the main domain, which now serves the Next.js app instead of the CMS.

**Fix:** Use a dedicated CMS subdomain:

```
WP_API_URL=https://cms.yourdomain.com/wp-json    # correct
WP_API_URL=https://yourdomain.com/wp-json        # loops back to Next.js
```

### Images return 502 after domain change

**Cause:** Image optimizer fetching from a domain that no longer hosts the source images.

**Fix:** Update `images.remotePatterns` in `next.config.ts` to match the new image origin. Rewrite media URLs in data fetches to point at the correct origin.

### Client component re-renders excessively

**Cause:** Inline object or function as prop. New reference on every render triggers re-render in the child.

**Fix:** Memoize:

```typescript
// Before (creates new object each render)
<Child config={{ foo: "bar" }} />

// After
const config = useMemo(() => ({ foo: "bar" }), []);
<Child config={config} />
```

---

## Performance patterns

### Avoid request waterfalls

```typescript
// Bad: sequential fetches
const user = await getUser();
const posts = await getPostsByUser(user.id);
const comments = await getCommentsForPosts(posts.map(p => p.id));

// Good: parallel where possible
const user = await getUser();
const [posts, settings] = await Promise.all([
  getPostsByUser(user.id),
  getSettingsForUser(user.id),
]);
```

### Database query patterns

```typescript
// Bad: N+1
for (const post of posts) {
  const author = await db.user.findUnique({ where: { id: post.authorId } });
}

// Good: batch fetch with relation
const posts = await db.post.findMany({
  include: { author: true },
});

// Always limit large scans
const data = await db.post.findMany({
  where: { ... },
  take: 100,
});
```

### Streaming with Suspense

For App Router, stream slow content to improve perceived performance:

```typescript
// app/page.tsx
import { Suspense } from "react";
import FastContent from "./FastContent";
import SlowContent from "./SlowContent";

export default function Page() {
  return (
    <>
      <FastContent />
      <Suspense fallback={<Loading />}>
        <SlowContent />
      </Suspense>
    </>
  );
}
```

---

## Code review checklist for Next.js

- [ ] Server components default; `"use client"` only where needed
- [ ] ISR routes have appropriate `revalidate` value
- [ ] Database-querying routes have `force-dynamic` if they can timeout at build
- [ ] Canonical/site URL uses server-only env var
- [ ] No secrets in `NEXT_PUBLIC_` variables
- [ ] API routes have auth checks on mutations
- [ ] Revalidation endpoint protected with secret
- [ ] Images use the `Image` component, with explicit width/height
- [ ] External image domains in `images.remotePatterns`
- [ ] Scripts directory excluded from tsconfig if causing type errors
- [ ] Suspense boundaries for slow content where streaming helps

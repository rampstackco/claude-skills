# Security Headers Checklist

Copy-paste reference for HTTP response headers that improve security. Organized by tier of importance.

Test current headers with: securityheaders.com or observatory.mozilla.org.

---

## Tier 1: Set on every site, no excuse

These are simple to deploy, low risk of breaking things, and material security improvements.

### Strict-Transport-Security (HSTS)

Forces browsers to use HTTPS for all future requests to this domain.

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

- `max-age`: lifetime in seconds (31536000 = 1 year, recommended for stable HTTPS deployments)
- `includeSubDomains`: applies to all subdomains. Only enable when every subdomain serves HTTPS reliably.
- `preload`: optional. Enables inclusion in browser preload lists. Once enabled, removal takes weeks. Only add when committed.

**Common mistake:** Setting `includeSubDomains` before all subdomains are HTTPS-ready. Internal staging or admin subdomains break.

---

### X-Content-Type-Options

Prevents browsers from MIME-sniffing the content type, which can lead to confusion attacks.

```
X-Content-Type-Options: nosniff
```

No nuance. Set it everywhere.

---

### X-Frame-Options

Prevents your site from being framed by other sites (clickjacking defense).

```
X-Frame-Options: DENY
```

Use `SAMEORIGIN` instead if your own site uses iframes of itself.

`X-Frame-Options` is largely superseded by CSP's `frame-ancestors`, but setting both is fine for backward compatibility with older browsers.

---

### Referrer-Policy

Controls how much information is sent in the Referer header on outbound links and resource loads.

```
Referrer-Policy: strict-origin-when-cross-origin
```

This sends full URL on same-origin requests, only the origin on cross-origin HTTPS-to-HTTPS, and nothing on HTTPS-to-HTTP downgrades.

For privacy-sensitive sites:

```
Referrer-Policy: no-referrer
```

---

## Tier 2: Material security improvements, requires planning

These add real protection but may require code changes or rollout planning.

### Content-Security-Policy

The most powerful header. Prevents most XSS attacks even when input handling has bugs.

**Strict CSP (recommended for new sites):**

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-{random}' 'strict-dynamic';
  style-src 'self' 'nonce-{random}';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
```

**Notes:**
- `nonce-{random}` is replaced per request with a fresh random token, included on legitimate inline scripts.
- `'strict-dynamic'` allows scripts loaded by trusted scripts (recursive trust). Most modern apps need this.
- `frame-ancestors 'none'` is the modern equivalent of `X-Frame-Options: DENY` and is more flexible.
- `object-src 'none'` blocks Flash and similar (still useful even though Flash is dead).
- `base-uri 'self'` prevents base tag hijacking.

**Allowlist CSP (if you can't do strict):**

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  ...
```

This is weaker than strict CSP. Plan to migrate to strict.

**Roll out via Report-Only first:**

```
Content-Security-Policy-Report-Only: ...; report-uri /csp-violation-report
```

Watch reports, tune, then switch to enforcing.

---

### Permissions-Policy

Controls which browser features (camera, microphone, geolocation, etc.) can be used.

Conservative default:

```
Permissions-Policy: 
  accelerometer=(),
  camera=(),
  geolocation=(),
  gyroscope=(),
  magnetometer=(),
  microphone=(),
  payment=(),
  usb=(),
  interest-cohort=()
```

This denies all listed features by default. Allow specific ones if needed:

```
Permissions-Policy: camera=(self), geolocation=(self "https://maps.example.com")
```

`interest-cohort=()` opts the site out of FLoC and similar third-party tracking.

---

## Tier 3: Newer, useful in specific contexts

These provide additional isolation and protection. Some require more careful integration.

### Cross-Origin-Opener-Policy (COOP)

Isolates your site's window from cross-origin windows. Defends against cross-origin attacks like Spectre.

```
Cross-Origin-Opener-Policy: same-origin
```

May break some popup-based OAuth flows. Test carefully.

---

### Cross-Origin-Embedder-Policy (COEP)

Required for `SharedArrayBuffer` and high-resolution timers. Restricts what can be loaded.

```
Cross-Origin-Embedder-Policy: require-corp
```

Means every cross-origin resource you load must explicitly opt in via `Cross-Origin-Resource-Policy: cross-origin`.

Often impractical for sites with many third-party resources. Use `credentialless` as a softer option:

```
Cross-Origin-Embedder-Policy: credentialless
```

---

### Cross-Origin-Resource-Policy (CORP)

For your own resources (images, scripts, styles), declares who can include them.

```
Cross-Origin-Resource-Policy: same-origin
```

For resources you want others to be able to embed (a public CDN, a sharing widget):

```
Cross-Origin-Resource-Policy: cross-origin
```

---

### Reporting-Endpoints

Modern way to specify where violation reports go (replaces the older `report-uri`).

```
Reporting-Endpoints: csp-endpoint="https://example.com/csp", default="https://example.com/reports"
Content-Security-Policy: ...; report-to csp-endpoint
```

---

## Headers to remove or set carefully

### Server

The `Server` header reveals what server software is running.

```
Server: nginx/1.18.0
```

Reveals software and version. Helps attackers target known vulnerabilities. Set to a generic value or remove:

```
Server: web
```

(Or remove entirely if your stack allows.)

---

### X-Powered-By

Reveals the framework or language.

```
X-Powered-By: Express
X-Powered-By: PHP/8.0
```

Same issue as `Server`. Remove.

---

### X-AspNet-Version, X-AspNetMvc-Version

Same. Remove.

---

## What to skip

These are deprecated, not useful, or actively harmful:

- **`X-XSS-Protection`**: deprecated. Modern browsers ignore it. Use CSP instead.
- **`Public-Key-Pins`** (HPKP): removed from browsers. Don't bother.
- **`Expect-CT`**: deprecated. Certificate Transparency is enforced automatically.
- **`Feature-Policy`**: replaced by `Permissions-Policy`. Use the latter.

---

## Quick reference table

| Header | Tier | Default value |
|---|---|---|
| `Strict-Transport-Security` | 1 | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | 1 | `nosniff` |
| `X-Frame-Options` | 1 | `DENY` (or `SAMEORIGIN`) |
| `Referrer-Policy` | 1 | `strict-origin-when-cross-origin` |
| `Content-Security-Policy` | 2 | Site-specific (see strict CSP example) |
| `Permissions-Policy` | 2 | Site-specific (deny by default) |
| `Cross-Origin-Opener-Policy` | 3 | `same-origin` |
| `Cross-Origin-Embedder-Policy` | 3 | `require-corp` or `credentialless` |
| `Cross-Origin-Resource-Policy` | 3 | `same-origin` (resources), `cross-origin` (public) |
| `Server` | Remove | Set generic or remove |
| `X-Powered-By` | Remove | Remove |

---

## Verification

After deploying, verify:

```bash
curl -I https://example.com
```

Look for the headers in the response.

Test grade: securityheaders.com gives a letter grade. Aim for A or A+.

---

## Setting headers by stack

Where you set these depends on the stack. Common locations:

- **Reverse proxy (Nginx, Caddy, HAProxy):** in the proxy config
- **CDN (Cloudflare, Fastly, Akamai):** in the CDN's response header rules
- **Application (Express, Django, Rails, etc.):** middleware or filter
- **Hosting platform (Vercel, Netlify, Cloudflare Pages):** platform-specific config file (e.g., `vercel.json`, `_headers`)

Setting at the edge (CDN or proxy) is preferred when possible: applies to every response without depending on application code.

For dynamic values (like the CSP nonce), the header has to be set per-request from the application.

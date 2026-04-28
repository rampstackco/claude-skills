---
name: code-review-web
description: "Review web application code for bugs, security issues, performance problems, and stack-specific anti-patterns. Use this skill whenever the user wants to review code, debug a production issue, investigate a build failure, audit security, or check a PR before merging. Triggers on code review, review my code, debug, build error, broken, not working, why is X failing, check this code, security check, PR review, audit code, refactor. Also triggers when investigating 4xx or 5xx errors, deploy failures, environment variable issues, and CMS integration problems."
---

# Code Review for Web

Review and debug web application code with a focus on the patterns that actually break production. Stack-agnostic principles in SKILL.md. Stack-specific patterns in references.

---

## When to use

- Reviewing a pull request before merging
- Debugging a production issue
- Investigating a build failure
- Auditing security or performance of existing code
- Investigating environment variable or configuration issues
- Triaging a "the site is broken" report

## When NOT to use

- Writing a new feature spec (use `pm-spec-writing`)
- Pre-launch QA against the running site (use `qa-testing`)
- Performance deep-dive on Core Web Vitals (use `performance-optimization`)
- Deep accessibility compliance review (use `accessibility-audit`)

---

## Required inputs

- The code, PR, error message, or symptom under review
- Access to logs (build logs, function logs, server logs) if debugging
- The stack (framework, hosting, database) - even at high level

If just a symptom is provided ("the site is broken"), the workflow's first step is gathering enough context to investigate.

---

## The framework: 5 review dimensions

Every code review covers five dimensions. Pick the depth based on the situation.

### 1. Correctness

Does the code do what it claims to do?

- Logic matches the intent stated in the spec or PR description
- Edge cases handled (empty states, error states, network failures)
- Off-by-one errors, null/undefined handling, async race conditions
- Tests exist for the change, or there's a reason they don't
- The change does not break existing functionality (regression risk)

### 2. Security

Does the code expose anything sensitive or open an attack surface?

- **Secrets handling.** No secrets, API keys, or service-role credentials in client-side code or version control
- **Auth checks.** Every mutation endpoint validates the caller before acting
- **Input validation.** User input sanitized before use in queries, file paths, or HTML
- **External requests.** Outbound URLs validated; no SSRF on user-controlled inputs
- **CSRF protection.** State-changing requests require a token or same-origin policy
- **Rate limiting.** Public-facing mutation endpoints have rate limits
- **HTTPS-only.** No HTTP in production code paths
- **Cookies.** Session cookies have `Secure`, `HttpOnly`, `SameSite` attributes set
- **Environment variables.** Server-only secrets are not prefixed with anything that exposes them to the client bundle

### 3. Performance

Will this code scale and stay fast?

- **Database queries.** No N+1 patterns. Joins or batch fetches preferred over loops with queries.
- **Pagination.** Large result sets paginated, never loaded entirely.
- **Caching.** Appropriate cache strategy for the data freshness needs.
- **Bundle size.** Client-side dependencies justified. Tree-shaking working.
- **Image handling.** Modern formats, lazy loading, explicit dimensions.
- **Background work.** Slow operations moved off the request path.
- **Cold start sensitivity.** Cold paths optimized if frequently triggered.

### 4. Reliability

What happens when this fails?

- **Error handling.** Caught and handled, not swallowed. Errors logged with context.
- **Retries.** Network calls have retry logic for transient failures.
- **Timeouts.** External calls have explicit timeouts (no infinite waits).
- **Graceful degradation.** Failure of non-critical paths does not crash the page.
- **Idempotency.** Mutations that might be retried are safe to retry.
- **Logging.** Enough context in logs to diagnose without reproducing.

### 5. Maintainability

Will the next person (or future you) understand this in six months?

- **Naming.** Functions and variables named for what they do, not how.
- **Comments.** Explain why, not what. The code says what.
- **Complexity.** Functions do one thing. If a function takes 200 lines, it's doing too much.
- **Duplication.** Same logic in multiple places gets extracted.
- **Dependencies.** New dependencies justified. Each one is a maintenance burden.
- **Magic values.** No literal `60000` in code. Use named constants.

---

## Common bug patterns (stack-agnostic)

Patterns that recur across stacks and are worth checking on every review.

### Build and deploy

- **Build-time data fetches that timeout.** Routes that query a database during static generation can fail at scale. Mark them as runtime-rendered if the data must be fresh.
- **Environment variables not propagating.** A var that works locally but breaks in production usually means it was not added to the production environment.
- **Mismatched env between preview and production.** Deploys that work in preview but break on the production domain often have stack-specific URLs hardcoded.

### URL and domain issues

- **Canonical pointing at staging or preview URL.** Caused by client-exposed environment variables that pick up the wrong domain. Canonical domain should come from a server-only environment variable.
- **API URL pointing at the main domain that loops back.** After a DNS cutover, the main domain may now serve a different application. APIs should live on dedicated subdomains.
- **HTTPS upgrade issues.** Mixed content (HTTP resources loaded into HTTPS pages) breaks browsers' security model.

### Cache invalidation

- **Stale content after deploy.** Either the cache was not invalidated, or the invalidation requires a manual trigger that did not run.
- **CDN serving old asset under same filename.** Always use a new filename or cache-bust query string when replacing assets.
- **Cache headers too aggressive.** Long max-age on resources that change frequently leads to users seeing stale content for hours or days.

### Database and data

- **N+1 queries.** Loop with a query inside the loop. Replace with batch fetch or join.
- **Missing limits on table scans.** Forgetting `LIMIT` on queries that hit large tables.
- **Connection pool exhaustion.** Too many concurrent connections, often from build-time fetches in parallel routes.
- **Schema migration without backfill.** Adding a NOT NULL column without populating it for existing rows.

### Image handling

- **Image not loading after upload.** CDN cached the previous filename. Use new filenames for replacements.
- **Layout shift from images.** Missing width/height attributes. Always specify both.
- **Slow LCP from large images.** Hero images not optimized for size or format.

### External integrations

- **Bot mitigation blocking server-to-server calls.** CDN or firewall is challenging legitimate automated traffic. Whitelist server IPs or disable challenges for API endpoints.
- **API rate limit triggered in production.** Worked locally where traffic was tiny. Add backoff and rate limiting awareness.

### Security

- **Unprotected revalidation or admin endpoints.** Always require a secret token.
- **PII in URLs.** Visible in server logs, browser history, referrer headers.
- **Secrets exposed in client bundle.** Anything that gets sent to the browser is public.

---

## Workflow

1. **Gather context.** What stack? What's broken or under review? Logs available?
2. **Pick the depth.** Quick scan for a small PR. Full review for a major change. Deep dive for a production incident.
3. **Run through the 5 dimensions.** Note issues by severity (blocker, important, minor).
4. **Check stack-specific patterns.** Reference the appropriate stack guide.
5. **For incidents:** identify the smallest hypothesis-driven fix. Reproduce locally if possible.
6. **Write the review.** Use the template in `references/review-template.md` for formal reviews.

---

## Failure patterns

- **"Looks good to me" on a 500-line PR.** If the review takes 5 minutes on a large PR, the review didn't happen.
- **Reviewing without running the code.** Some bugs only surface at runtime. Pull the branch and run it.
- **Over-indexing on style.** Bikeshedding on formatting while missing logic bugs.
- **Skipping security review on "internal" features.** Internal becomes external faster than expected.
- **Treating warnings as decoration.** Build warnings often become production errors after a dependency update.
- **Debugging without reading the full error message.** First line of the stack trace is often not the actual cause. Read all of it.

---

## Debugging workflow

When a production issue is reported:

1. **Read the full error message.** Including the stack trace.
2. **Check hosting build and function logs.** The exact failing line is usually here.
3. **Identify the last working version.** `git log --oneline` and check recent commits.
4. **Reproduce locally.** Confirms it's a code issue and not an environment issue.
5. **Check environment variables.** Especially after deploys or DNS changes.
6. **Check cache state.** Force a cache invalidation before concluding it's a code bug.
7. **Make the minimal fix.** Big refactors during incidents create more incidents.
8. **Verify in production.** Check the actual fix worked, not just that the deploy succeeded.
9. **Document.** What was the root cause? What would have prevented it? File the learnings.

---

## Output format

For PR reviews: comments inline on the PR, plus a summary if needed.

For formal code reviews: a markdown document at `code-review-[date].md` with:
1. Scope (what was reviewed)
2. Summary (overall assessment)
3. Critical issues (blockers)
4. Important issues
5. Minor issues
6. Suggestions for follow-up

For incidents: a postmortem document. See `after-action-report` for that format.

---

## Reference files

- `references/review-template.md` - Markdown template for formal code reviews.
- `references/nextjs-patterns.md` - Stack-specific patterns for Next.js (App Router, ISR, Server Components, common bugs).
- `references/wordpress-headless-patterns.md` - Stack-specific patterns for headless WordPress integrations.

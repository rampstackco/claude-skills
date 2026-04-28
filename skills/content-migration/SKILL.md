---
name: content-migration
description: "Move content between platforms, domains, or URL structures while preserving SEO equity, user bookmarks, and integrations. Use this skill when planning a CMS migration, replatforming, consolidating sites, changing URL structures, or merging content from multiple sources. Triggers on content migration, replatform, CMS migration, domain migration, URL restructure, redirect map, site merge, content consolidation, migration plan, post-migration drop. Also triggers when planning a launch that involves moving existing content."
---

# Content Migration

Move content from one platform, domain, or URL structure to another without breaking SEO, user bookmarks, or downstream integrations. Stack-agnostic.

---

## When to use

- Migrating from one CMS to another (e.g., WordPress to a headless setup)
- Consolidating multiple sites into one
- Splitting one site into multiple
- Changing URL structures
- Domain migration (one brand to another, mergers, rebrands)
- Migrating from a custom build to a platform (or vice versa)
- Content audit-driven cleanup as part of a larger move

## When NOT to use

- A net-new site with no existing content (no migration needed)
- Single-page edits or content updates within an existing site (use `content-and-copy`)
- Performance or technical SEO improvements without URL changes (use `seo-technical`)
- Routine content audits (use `seo-content-audit`)

---

## Required inputs

- The source: current platform, current URL structure, current content inventory
- The destination: target platform, target URL structure, target capabilities
- The reason for migration (drives priority of what to preserve)
- Constraints (timeline, budget, downtime tolerance)
- Stakeholders (SEO, content, dev, comms, support)

---

## The framework: 6 phases

Every content migration follows the same arc. Skipping a phase is how migrations go badly.

### Phase 1: Inventory

You can't migrate what you don't know. Build a complete map of what exists.

For each piece of content:
- URL
- Title
- Content type (article, landing page, product, doc, etc.)
- Status (live, draft, archived, scheduled)
- Last modified
- Author or owner
- Traffic (last 12 months)
- Backlinks (top external referrers)
- Internal links pointing to it
- Embedded assets (images, video, downloads)

Pull from: CMS export, XML sitemap, server logs, analytics, search console, backlink tool.

The inventory is a spreadsheet. It's the source of truth for the rest of the migration.

### Phase 2: Audit and decide

For each piece of content, decide:

- **Keep:** migrate as-is
- **Update:** migrate with edits (refresh, expand, fix)
- **Merge:** combine with another piece, redirect both old URLs to the new
- **Redirect:** don't migrate; redirect to a related page
- **Delete:** don't migrate, no redirect (use sparingly; only for clearly low-value pages)

This is `seo-content-audit` work. The migration is the time to do it; not the time to skip it.

For each "Update" or "Merge," document the specific changes.

### Phase 3: Map URLs

The URL map is the most important migration artifact.

| Old URL | New URL | Status code | Reason |
|---|---|---|---|
| /old/path | /new/path | 301 | Direct equivalent |
| /old/page-1, /old/page-2 | /new/merged | 301 | Merged content |
| /old/deprecated | /related/replacement | 301 | Closest replacement |
| /old/junk | (none) | 410 | Intentionally gone |

Rules:
- 301 (permanent redirect) for content that has a new home
- 410 (gone) for intentionally deleted content
- Avoid 404 (not found) where 410 is more accurate
- Never redirect everything to the homepage; specific is always better
- Map every URL with traffic or backlinks; lower-priority URLs can be patterned

For domain migrations, use a 1:1 path mapping by default (`old.com/page` → `new.com/page`) with specific overrides where structure changes.

### Phase 4: Build and stage

Build the destination. Don't skip a staging environment.

- Set up the new platform with the new content
- Implement the URL map (most platforms support a redirect file or rule)
- Verify a representative sample of redirects work
- Test critical user flows (signup, purchase, contact)
- Validate analytics, monitoring, and integrations
- Test from search engine perspective: robots.txt, sitemap, canonicals

If possible, get the destination crawled by Google before the cutover, so it's already indexed when redirects flip.

### Phase 5: Cut over

The actual switch. Plan it like a launch (and use `launch-runbook` alongside this skill).

Pre-cutover:
- Comms to stakeholders (date, expected impact)
- Comms to users if downtime expected
- Support team prepped for likely questions
- Lower DNS TTL the day before (1-3 days for safety)
- Backup of source platform (in case rollback is needed)

Cutover:
- Redirect rules go live
- DNS changes go live
- New sitemap submitted to search engines
- Old sitemap removed or updated
- Internal links audited and updated to point to new URLs (where possible)
- Status page or banner if user-visible disruption

Immediately post-cutover:
- Smoke test top 50 pages from the inventory
- Verify redirects are 301 (not 302)
- Verify search console for errors
- Watch real-time traffic for unexpected drops
- Watch error logs for missing assets, broken integrations

### Phase 6: Monitor and recover

The migration isn't done at cutover. The next 30-90 days reveal problems.

Watch:
- **Traffic:** expect a temporary drop (10-30% is common); should recover in 4-8 weeks. A persistent drop beyond that is a problem.
- **Indexing:** new URLs should be crawled and indexed. Check coverage in search console.
- **Rankings:** track top keywords. A position drop is normal; a position cliff is a sign of a redirect or canonical problem.
- **Backlinks:** check that linked-from-elsewhere pages still resolve to the right destination.
- **404s:** any URL getting 404s that should have been redirected? Add to the map.
- **User reports:** support tickets, social media. Are users finding their old links?

Common 30-day fixes:
- Add missed redirects from 404 patterns
- Update internal links you missed
- Re-submit sitemap if indexing stalls
- Investigate and fix any crawl errors

---

## Workflow

### Step 1: Set the scope

What's in scope? What's out? Write it down. Migrations expand if not bounded.

### Step 2: Build the inventory

Pull every URL, traffic, backlinks, internal links. The spreadsheet is the artifact.

### Step 3: Decide per piece

Keep, update, merge, redirect, delete. Document decisions.

### Step 4: Map URLs

The complete redirect map. Reviewed by SEO and content stakeholders.

### Step 5: Build the destination

In a staging environment. Real content (or representative content). Real redirects.

### Step 6: Test

- Sample of redirects (top 20 by traffic, top 20 by backlinks, edge cases)
- Critical flows (signup, checkout, contact)
- Analytics and monitoring
- Search-engine perspective (robots.txt, sitemap, canonicals)

### Step 7: Cut over

Following the cutover checklist. Have rollback ready.

### Step 8: Monitor

Daily for the first week. Weekly for the first month. Monthly through 90 days.

### Step 9: Document the result

What worked. What didn't. Lessons. (See `after-action-report`.)

---

## Failure patterns

**No URL inventory.** Migration team thinks they have everything. They don't. Old PDFs, archived posts, marketing landing pages with backlinks. Build the inventory.

**302 redirects instead of 301.** 302 is temporary. SEO equity doesn't reliably pass. Use 301 unless you have a specific reason.

**Redirecting everything to the homepage.** "We'll let users find their way." They won't. They'll bounce. Map specifically.

**Long redirect chains.** /a → /b → /c → /d. Each hop loses a little equity and adds latency. Collapse to /a → /d.

**Forgetting non-HTML URLs.** PDFs, images, downloads. They have URLs too. They have backlinks too. Include in the map.

**Forgetting query strings.** `/page?id=123` is a different URL than `/page`. Patterns or specific maps for query string variants.

**Ignoring trailing slashes.** `/page` and `/page/` are different to most servers. Pick one canonical form. Redirect the other.

**No staging.** The first time the migration runs is in production. Things break. Stage and test.

**Stage that's too different from production.** Different DNS, different CDN, different platform. Tests pass on staging, fail on production. Stage as close to prod as feasible.

**Leaving the source live.** Two sites serving the same content. Duplicate content, split equity, user confusion. Take down the source after confirming the destination is solid.

**Leaving the source domain unrenewed.** Domain expires, redirects break, traffic dies. Renew the source domain for a long time, even if you're not using it.

**Big-bang migration with no rollback plan.** Something goes wrong. Now what? Plan rollback before cutover.

**Cutover during a busy period.** End of quarter, holiday season, big campaign. Bad timing. Pick a quiet period.

**No comms.** Users find their bookmarks broken with no warning. Some won't come back. Communicate.

**Migration as a one-time event.** It's not done at cutover. Monitor for 30-90 days. Fix what surfaces.

**Treating migration as just a dev project.** SEO, content, support, comms all need to be involved. Cross-functional from day one.

---

## Output format

A migration plan document includes:

- **Scope:** what's in, what's out
- **Inventory:** the URL spreadsheet
- **Audit decisions:** keep, update, merge, redirect, delete
- **URL map:** old to new, with status codes
- **Architecture:** new platform setup, redirect implementation
- **Cutover plan:** the runbook for switch day
- **Rollback plan:** if it goes wrong
- **Monitoring plan:** what's watched, for how long
- **Comms plan:** internal and external
- **Owners and timeline:** who does what when

---

## Reference files

- `references/migration-runbook.md`: Step-by-step runbook for cutover day, including pre-flight checks, the actual switch, immediate verification, and the first 24 hours of monitoring.

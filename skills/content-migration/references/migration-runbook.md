# Migration Cutover Runbook

A step-by-step runbook for the day of a content migration cutover. Pair this with `launch-runbook` for general launch protocol.

The runbook is read by tense people watching the clock. Optimize for clarity.

---

## Roles

Assign these before the day:

| Role | Responsibility | Person |
|---|---|---|
| Migration lead | Calls the cutover, makes go/no-go decisions | |
| Tech lead | Executes DNS and redirect changes | |
| QA lead | Runs verification scripts and manual checks | |
| SEO lead | Monitors search and indexing | |
| Comms lead | Sends notifications, updates status page | |
| Support lead | Watches tickets, escalates user reports | |
| Backup decision maker | Authorizes rollback if needed | |

---

## T-7 days: prep

- [ ] Inventory verified complete
- [ ] URL map signed off by SEO and content
- [ ] Destination tested in staging
- [ ] Sample of 50 redirects verified
- [ ] Rollback plan documented and rehearsed
- [ ] Cutover date and window communicated to all stakeholders
- [ ] Support team briefed on common questions
- [ ] DNS TTL lowered to 300 seconds (5 minutes)
- [ ] Monitoring dashboards built and tested
- [ ] Search console verified for both old and new domains (if domain change)

---

## T-1 day

- [ ] Final inventory pull (any new content added since the freeze?)
- [ ] Final URL map review
- [ ] Backup of source platform (full, restorable)
- [ ] Test rollback procedure in staging
- [ ] Confirm everyone on the team is available during the window
- [ ] Status page draft prepared
- [ ] Internal comms draft prepared
- [ ] Customer comms draft prepared (if applicable)

---

## T-2 hours

- [ ] All stakeholders in the cutover channel (chat or call)
- [ ] Status: source platform writeable lock (no new content during cutover)
- [ ] Final smoke test on staging
- [ ] Final confirmation: GO or NO-GO

NO-GO triggers:
- Critical bug found in destination
- Key person unavailable
- Source data integrity issue
- External factors (e.g., source platform outage)

If NO-GO, reschedule. Don't push through.

---

## T-0: cutover

Time-box each step. If a step takes 2x its expected duration, pause and assess.

### Step 1: Final source backup

Time: 5-15 minutes depending on volume.

```
[Specific backup commands or steps]
```

Verify backup integrity. Continue only on success.

### Step 2: Deploy destination to production

If the destination has been on staging only:

```
[Deploy commands]
```

Verify the destination is responding correctly on its production address (which may not yet have DNS pointed at it).

### Step 3: Deploy redirect rules

The redirect rules go on whatever the source platform uses to redirect (htaccess, edge worker, CDN rule, server config).

```
[Deploy redirect rules]
```

Test 5 redirects manually:

```bash
curl -I https://oldhost.com/path1
curl -I https://oldhost.com/path2
# Expected: 301 to https://newhost.com/path1
```

### Step 4: DNS cutover (if domain change)

Update DNS to point the new domain to the destination.

```
[DNS update steps]
```

Verify resolution from multiple regions:

```bash
dig +short newhost.com @8.8.8.8
dig +short newhost.com @1.1.1.1
```

DNS propagation usually completes within minutes (with the TTL lowered earlier). Some resolvers may lag.

### Step 5: Submit new sitemap

```
[Submit to search engines]
```

For Google: search console → sitemaps → submit.
For Bing: webmaster tools → sitemaps → submit.

### Step 6: Update internal references

If the source has links to itself (or hardcoded references), update the source to point at the new URLs (helps tools that haven't picked up the redirects yet).

If the source is being decommissioned entirely, this step is moot.

### Step 7: Update integrations

External integrations that reference URLs:
- Email templates with absolute URLs
- Social profiles with bio links
- Partner sites with deep links
- Marketing automation
- Analytics goals (URL-based goals may break)
- Saved CRM links

Update each. Document in the comms plan.

---

## T+15 minutes: smoke test

- [ ] Top 50 URLs from inventory each return correct status
- [ ] Redirects return 301 (not 302)
- [ ] Critical user flows work (signup, contact form, checkout if applicable)
- [ ] Search engines can crawl (robots.txt, sitemap)
- [ ] Analytics is firing on new pages
- [ ] Monitoring is showing the new endpoints

If any check fails: triage. Fix forward if simple; rollback if complex.

---

## T+1 hour: stakeholder check-in

- [ ] Status page updated
- [ ] Internal comms sent
- [ ] Customer comms sent (if applicable)
- [ ] Support has not seen unusual ticket volume
- [ ] Real-time analytics shows expected traffic patterns

---

## T+24 hours

- [ ] Search console shows crawls of new URLs
- [ ] Search console "Indexing" tab not showing major issues
- [ ] No spike in 404s or 5xx errors in logs
- [ ] Backlink-bearing pages confirmed to redirect correctly
- [ ] Monitoring dashboards normal
- [ ] No major customer reports

---

## Rollback decision criteria

Rollback if:
- Critical functionality broken on the destination
- Significant data corruption discovered
- Security issue introduced by the migration
- Search indexing catastrophically failing (rare; usually fixable forward)

Do NOT rollback for:
- Normal traffic dip (expected, recovers)
- Individual broken redirects (fix forward)
- Minor visual issues (fix forward)
- Slow pages (fix forward)

Rollback procedure:

### Step R1: Reverse DNS (if domain change)

```
[Revert DNS]
```

### Step R2: Disable redirect rules

Take redirects offline so source URLs serve source content again.

```
[Disable redirects]
```

### Step R3: Unlock source platform

Remove the writeable lock on the source.

### Step R4: Restore from backup if needed

If data corruption: restore. See `backup-and-disaster-recovery`.

### Step R5: Comms

- [ ] Status page updated (rolled back)
- [ ] Internal comms (rolled back, next steps)
- [ ] Customer comms if applicable (apology, next steps)

### Step R6: Schedule retrospective

Within 5 business days. See `after-action-report`.

---

## First-week monitoring

Daily checks:

| Metric | Target | Action if off |
|---|---|---|
| Top-10 page traffic | Within 80% of baseline | Investigate redirects, check indexing |
| Conversion rate | Within 90% of baseline | Investigate UX changes, check analytics implementation |
| 404 rate | Below 1% of requests | Add missing redirects |
| Crawl errors | Decreasing | Check robots.txt, sitemap, canonicals |
| Indexing rate | Increasing toward old volume | Submit URLs manually if stalled |
| Search rankings (top 20 keywords) | No cliff drops | Investigate canonicals, redirects, content parity |

---

## First-month monitoring

Weekly checks:

| Metric | Target |
|---|---|
| Total organic traffic | Recovering toward baseline (typically 4-8 weeks) |
| Indexed pages | At or above pre-migration count |
| Backlink-pointed-to pages | All resolving correctly |
| 410 vs 404 ratio | Pages that should be gone return 410, not 404 |

---

## After 90 days

- [ ] Full performance review vs pre-migration baselines
- [ ] Document what worked, what didn't (after-action report)
- [ ] Decommission source platform if not already done
- [ ] Renew source domain (long-term, even if not in use, to preserve redirects)
- [ ] Archive the migration documentation for future reference

---

## Common surprises

**Backlinks pointing to URLs not in inventory.** Old marketing pages, archived posts, removed-but-still-linked content. Add to the map after cutover.

**Trailing slash inconsistencies.** Server treats `/page` and `/page/` differently. One redirects, the other 404s. Fix with a normalizing redirect.

**Search engines slow to update.** Old URLs still appear in search for weeks. Normal. Don't redirect to homepage to "speed it up."

**Analytics goals broken.** URL-based goals don't match new URLs. Update the goals; backfill if possible.

**Hardcoded absolute URLs in email templates.** Old links in transactional emails. Update templates.

**Schema.org or canonical tags pointing wrong.** Crawlers follow canonical even after redirects. Verify canonical tags on the destination point to the destination.

**Sitemap caching.** Some platforms cache sitemaps aggressively. Force a refresh.

**robots.txt forgot the new sitemap.** Add the new sitemap to robots.txt.

---

## Post-cutover comms template

### Internal (to team)

Subject: Migration cutover complete

```
The migration to [new platform/URL/etc.] is complete as of [time].

Status:
- [N] redirects in place
- All critical flows verified
- Monitoring shows expected traffic patterns

We'll watch closely over the next 24 hours and the first week. Report any issues in [channel].

Next steps:
- [Specific monitoring action]
- [Specific follow-up]

Thanks to everyone who made this happen.
```

### External (to users, if applicable)

Subject: We've moved [or rebranded, or restructured]

```
Hi [name],

[Brief reason for the change.]

What this means for you:
- [Specific user-facing change 1]
- [Specific user-facing change 2]

Old links should redirect automatically. If you find a broken link, please let us know at [contact].

Thanks for your patience as we make this transition.
```

---

## Document the result

Within a week of cutover, write up:

- What was migrated
- What worked
- What broke and how it was fixed
- What we'd do differently
- Lessons for the next migration

This becomes input to `after-action-report` and to future migration playbooks.

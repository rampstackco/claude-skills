# Customer comms playbook

Channels, decision factors, calendar template, comms misfire failure mode.

The principle. Every channel has a different reach, latency, and cost. Pick the channels that match the feature's audience and tier; sequence them so the highest-touch channels fire first and the highest-reach channels fire last.

---

## Channel-by-channel

### In-app

**Reach.** Active users only. Highest engagement among the people who already use the product.

**Latency.** Real-time once the rollout reaches them.

**Right for.** Product-internal features. Tooltips, banners, modals. Discoverability prompts.

**Decision factors.** Are users active enough to encounter the in-app surface within the launch window? If your DAU is 10 percent of MAU, in-app reaches one in ten users in the first week.

**Anti-pattern.** Modal interrupting the user mid-task. Use banners, tooltips, or empty-state prompts that the user notices but does not have to dismiss.

### Email (transactional or campaign)

**Reach.** All users who opted in. Higher than in-app for inactive users.

**Latency.** Hours from send to read. Delays for users who batch-read email.

**Right for.** Material changes that affect existing workflows. Pricing changes. Breaking changes that need user awareness.

**Decision factors.** Is the change material enough to justify an email? If the user can discover the feature on their next visit, email may be unnecessary. If the change affects their billing or their workflow, email is the right channel.

**Anti-pattern.** Sending email for every release. Customers unsubscribe; the channel decays.

### Blog post

**Reach.** External traffic plus existing customers who read the blog. Best for SEO, lead gen, narrative.

**Latency.** Hours to days from publish to traffic peak.

**Right for.** Tier 1 launches with external story. Competitive positioning announcements. Major narrative shifts.

**Decision factors.** Is there a story worth telling beyond "we shipped a feature"? Blog posts about feature ships read as marketing churn; blog posts about category narrative shifts read as substantive.

### Release notes

**Reach.** Customers who actively check release notes. Discoverable later via search.

**Latency.** Real-time on publish; the long-tail value comes from search-engine and customer-search traffic over the following months.

**Right for.** Every Tier 2 and above. The canonical reference customers find later when they encounter the feature in the wild.

**Decision factors.** Always. Release notes are the cheapest comms channel; the cost of writing one is small; the long-tail value is real.

### Social (LinkedIn, X, Bluesky)

**Reach.** Beyond existing customers. Mostly other PMs, engineers, prospects.

**Latency.** Hours to days from post to engagement.

**Right for.** Launches with external narrative or competitive angle. Founder-led marketing.

**Decision factors.** Does the launch have a story that a non-customer would care about? If no, social is filler. If yes, social can drive net-new pipeline.

### Webinar or customer call

**Reach.** Limited to attendees, but high engagement per attendee.

**Latency.** Days to weeks from announcement to event.

**Right for.** Tier 1 launches with material customer impact. Enterprise customers who need depth.

**Decision factors.** Does the feature need explanation that a blog post or email cannot deliver? If yes, webinar. If the feature is self-evident, skip.

### Sales-led briefing

**Reach.** Top accounts only. Highest-touch channel.

**Latency.** Days from scheduling to delivery.

**Right for.** Launches affecting pricing, contracts, or strategic positioning. Top accounts hear about the feature from their account executive before they hear from any other channel.

**Decision factors.** Does the launch affect the top 10 to 20 accounts in a way that requires a personal conversation? If yes, sales-led briefing is non-negotiable.

---

## The comms calendar

A single document with all channels and dates. Distributed in the internal launch brief.

| Date | Channel | Owner | Status | Notes |
|---|---|---|---|---|
| T minus 14 days | Sales briefing scheduled | Sales lead | Pending | 30-min training |
| T minus 7 days | Support training delivered | Support lead | Pending | Live + recorded |
| T minus 3 days | CS outreach to top 20 accounts | CS lead | Pending | Email plus call |
| T minus 1 day | Sales briefing delivered | Sales lead | Pending | Q&A captured |
| T minus 1 day | Support FAQ published internally | Support lead | Pending | |
| T plus 0 (launch day, AM) | In-app banner activates | Eng | Auto on rollout | Gated on health |
| T plus 0 (launch day, AM) | Release notes publish | PM | Manual on health | |
| T plus 0 (launch day, PM) | Email send to all customers | Marketing | Manual on health | After 4-hr stability |
| T plus 1 day | Blog post publishes | Marketing | Manual on health | |
| T plus 1 day | Social posts | Marketing + founder | Manual on health | |
| T plus 7 days | Webinar (Tier 1 only) | PM + Marketing | Scheduled | |
| T plus 14 days | First post-launch checkpoint | PM | Recurring | Adoption review |

The calendar names every channel, every date, every owner. Gaps in the calendar signal channels that are not covered (intentionally or accidentally).

---

## Sequencing principles

**Highest-touch first.** Sales-led briefing for top accounts before public comms. The top customer hearing about a feature from their account manager before they hear from a blog post is a trust win; the inverse is a trust loss.

**Internal before external.** Sales training before sales is asked customer questions. Support training before customers ask support questions. Internal launch brief before any customer-facing channel fires.

**Health-check gates on auto-fire channels.** In-app banners, scheduled emails, scheduled blog posts should be gated on a rollout health check. Manual triggers preferred for any channel that would be embarrassing if the rollout is paused.

**Lower-reach to higher-reach.** Release notes and in-app first; email second; blog and social last. The lower-reach channels catch initial issues; the higher-reach channels amplify after stability.

---

## The comms misfire failure

The most common comms execution failure.

**The setup.** The blog post is scheduled to auto-publish at the announced launch time. The rollout starts at 9 AM. At 11 AM, an issue is detected and the rollout is paused at 25 percent. The blog post auto-publishes at noon as scheduled.

**The result.** Customers click through to the new feature page. 75 percent of them do not see the feature (the rollout has not reached them). They report bugs that are actually rollout-paused state. The launch story breaks.

**The fix.** Make external comms manually triggered, gated on a rollout health check. The comms timing in the calendar is the planned timing; the actual fire is conditional on the rollout passing the health check.

The pattern. Auto-fire is convenient but brittle. Manual triggers are slightly more work but catch issues that auto-fire cannot.

---

## Channel-mix rules of thumb by feature type

| Feature type | Recommended channel mix |
|---|---|
| New feature for active users (Tier 2) | In-app + release notes |
| Major feature launch (Tier 1, B2B) | All channels: in-app, email, blog, release notes, social, sales-led briefing for top accounts |
| Pricing change | Email + blog + sales-led briefing + executive comms; in-app for affected users |
| Breaking change | Email + in-app prominent banner + release notes + (B2B) sales-led briefing |
| Performance improvement | Release notes + (Tier 2) in-app + (Tier 1) blog post |
| New integration | Release notes + email + blog + co-marketing with the integration partner |
| Enterprise-only feature | Sales-led briefing + customer success outreach + release notes; skip blog and social |

The pattern. The channel mix is not "all channels" by default. It is the subset of channels that match the audience and the tier. Skipping the wrong channel hurts; firing on the wrong channel also hurts.

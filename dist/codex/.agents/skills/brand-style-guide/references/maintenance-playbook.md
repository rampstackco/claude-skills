# Brand Style Guide Maintenance Playbook

A style guide that does not get maintained becomes a museum piece within a year. This playbook covers who owns it, when it gets updated, and how change requests get handled.

---

## Why guides decay

The common failure modes:

- **No owner.** The guide was a project deliverable. The team disbanded. No one maintains it.
- **Drift.** Real work in market diverges from the guide. The guide stops reflecting reality.
- **Frozen in time.** The guide was right at launch. Markets, products, and audiences moved.
- **Locked away.** The guide lives in a tool nobody opens. Teams reinvent rather than reference.
- **Too rigid.** The guide bans variation that real work demands. Teams ignore it rather than challenge it.

The maintenance playbook addresses each of these.

---

## Ownership

### The owner

Every brand guide has one owner. Not a committee. The owner:

- Is named in the guide itself
- Has explicit authority to approve changes
- Has time allocated (typically 5-10% of one role) for guide upkeep
- Reports to a stakeholder who cares about brand consistency

If the role is vacant, the guide is at risk regardless of how good the content is.

### The guidance council (optional)

For larger organizations, a small council reviews proposed changes before the owner approves. Typically:

- Brand lead (chair)
- Design lead
- Marketing lead
- Engineering lead (if guide includes design tokens / dev assets)
- One product representative

The council meets quarterly to review the change queue.

---

## Change types and authority

Not every change needs the same review. Define tiers.

### Tier 1: clarifications (owner approves directly)

- Typo fixes
- Adding examples to existing rules
- Improving wording without changing meaning
- Adding missing assets that are already approved (new logo file format, etc.)

**Process:** owner ships within a week.

### Tier 2: extensions (owner consults, then approves)

- New use cases for existing elements
- New approved color combinations
- New typographic patterns within the existing scale
- New illustration or photography patterns within existing direction

**Process:** owner posts to a working channel for 5-day comment period, addresses feedback, ships.

### Tier 3: changes (council reviews, owner ships)

- Modifying or expanding the color palette
- Modifying the type scale
- Adding or removing approved photographic styles
- Updating logo construction or variants
- Voice tone adjustments

**Process:** RFC document, council review at quarterly meeting (or async if time-sensitive), then owner ships.

### Tier 4: shifts (executive approval required)

- Logo redesign
- Brand voice repositioning
- Color palette overhaul
- Naming or positioning changes

**Process:** full brand project. Treat as a separate engagement, not a maintenance ticket.

---

## Update cadence

Even without inbound change requests, schedule reviews.

| Cadence | What happens |
|---|---|
| Monthly | Owner sweeps the change queue, ships Tier 1 fixes, queues Tier 2 for the comment period. |
| Quarterly | Council reviews Tier 3 RFCs, takes a sample-based audit (see below), updates roadmap. |
| Annually | Full audit (see audit playbook), refresh of examples, prune of stale content, version bump. |
| As-needed | Tier 4 shifts driven by business strategy. |

---

## Change request process

Anyone in the organization can propose a change. The process:

1. **Submit** via the request channel (template below).
2. **Triage** by owner within 5 business days. Assigns tier.
3. **Comment / review** depending on tier.
4. **Decide.** Approve, decline (with reason), or revise.
5. **Ship.** Update the guide, update related assets, communicate.
6. **Communicate.** Announce in the brand channel. Note in the changelog.

### Request template

```
**What is the change?**
[One paragraph]

**Why is it needed?**
[Real use case that surfaced this]

**What is affected?**
[Pages, assets, components]

**Proposed solution**
[Specific change to the guide]

**Alternatives considered**
[Other ways to solve this]

**Requester**
[Name, team]
```

---

## Audit cadence

### Monthly: surface scan

Owner scans 5-10 randomly selected production touchpoints (web pages, ads, emails, social posts) and notes any guide violations or undocumented patterns. 30 minutes max.

The output is a row in a tracking sheet, not a deliverable. Used to surface drift trends.

### Quarterly: sample audit

Owner (or council) audits 20-30 production touchpoints across channels. Categorize each:

- Compliant
- Minor deviation (acceptable, document if recurring)
- Major deviation (followup required)
- Undocumented pattern (consider adding to guide)

Output: a one-page summary with action items.

### Annual: full audit

Use the audit template (typically a separate audit deliverable, not part of the guide itself). Full review across:

- Logo usage
- Color
- Typography
- Imagery
- Voice and copy
- Motion and interaction
- Adoption (which teams use the guide vs work around it)

Output: a backlog for the next year.

---

## Versioning

Use semantic versioning for the guide.

- **Major (1.0 → 2.0):** brand shift. Logo redesign, voice repositioning, palette overhaul.
- **Minor (1.1 → 1.2):** new sections, expanded color or type, new approved patterns.
- **Patch (1.1.1 → 1.1.2):** clarifications, typo fixes, new examples.

Each version has a changelog entry: what changed, who approved, when, and migration notes if any.

### Backward compatibility window

When a Tier 3 or Tier 4 change ships, set a deprecation window:

- **Tier 3:** 90 days. Old patterns acceptable in production, new patterns required for new work.
- **Tier 4:** 6-12 months depending on production cycle (print catalogs, manufactured goods, regulatory deliverables may need longer).

Document deprecated patterns with a clear "Replaced by [new pattern], deprecated as of [date], removal date [date]" note.

---

## Communication

When the guide changes, people need to know.

### Channels

- **Brand channel:** standing channel for all updates, requests, questions.
- **Changelog page in the guide:** running list of versioned changes.
- **Quarterly digest email:** roundup of the past quarter's changes, plus the audit summary.
- **Annual review post:** the year's biggest changes, the audit findings, the next year's priorities.

### When to push, when to publish

- **Push** (announce, require attention) for Tier 3 and Tier 4 changes.
- **Publish** (update the guide and the changelog, no broadcast) for Tier 1 and Tier 2.

---

## Adoption health metrics

The guide is healthy when teams use it. Track:

| Metric | Healthy | Warning | Failing |
|---|---|---|---|
| Average page views per month | Steady or growing | Declining | Near-zero |
| Change requests per quarter | 5-15 | <3 | 0 (or 50+) |
| Audit compliance score (Tier 3+) | >90% | 75-90% | <75% |
| Percent of new launches that referenced the guide pre-launch | >80% | 50-80% | <50% |
| Time to ship a clarification | <1 week | 1-4 weeks | >4 weeks |

If multiple metrics are failing simultaneously, the guide needs a refresh, not just maintenance.

---

## When to retire and rewrite

Sometimes maintenance is not enough. Signs the guide needs a rewrite:

- The brand has shifted enough that >30% of the guide no longer applies
- The audience or category has shifted enough that the brand position is dated
- A new owner cannot make sense of the structure
- The guide reads as if it was written for a different company
- Compliance has fallen below 60% across multiple audits

Rewriting is not a maintenance task. It is a separate brand project. The maintenance playbook ends when the rewrite begins.

---

## Sign-off

Maintenance plan accepted by:

- Brand owner: [Name, date]
- Council members: [Names, date]
- Executive sponsor: [Name, date]

Next quarterly review: [Date]

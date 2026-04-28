---
name: cost-optimization
description: "Audit and reduce infrastructure and tooling costs without sacrificing reliability or velocity. Use this skill when reviewing monthly cloud or SaaS spend, finding unused resources, rightsizing infrastructure, negotiating vendor contracts, deciding what to consolidate, or planning for budget cuts. Triggers on cost optimization, cloud spend, SaaS spend, rightsizing, unused resources, FinOps, infrastructure audit, vendor consolidation, budget cut, cost review. Also triggers when finance flags rising costs or when a contract renewal is up."
---

# Cost Optimization

Audit cloud, SaaS, and infrastructure spend. Cut what's not earning its keep. Rightsize what's oversized. Negotiate what's negotiable. Without breaking what works.

---

## When to use

- Quarterly or annual cost review
- Finance flags rising spend
- Vendor contract renewal coming up
- Budget cut required
- New leadership wants the numbers
- Migrating between providers (cost is part of the case)
- Audit before scaling significantly (catch waste before it scales)

## When NOT to use

- Active incident response (use `incident-response`)
- Performance issues that happen to involve infrastructure (use `performance-optimization`)
- Vendor evaluation for a new purchase (use `vendor-evaluation`)
- Personnel or org costs (out of scope for this skill)

---

## Required inputs

- Current cost (monthly, ideally for the last 12 months)
- Cost broken down by service or vendor
- Inventory of cloud resources (instances, databases, storage, etc.)
- Inventory of SaaS subscriptions
- Owners per cost line (who decided to spend this, who uses it)
- Constraints (compliance, performance, contract terms)

---

## The framework: 5 levers

Every cost optimization opportunity falls into one of these levers.

### Lever 1: Eliminate

Stop paying for things that aren't used.

- Idle resources (instances, databases, environments running but unused)
- Subscriptions where no one logs in
- Duplicate tools (multiple tools doing the same job)
- Old projects still incurring cost
- Test environments that should have been torn down
- Forgotten domains, backups, snapshots, logs

This is usually the largest opportunity in the first audit. Often 10-30% of spend.

### Lever 2: Rightsize

Pay for what you actually use, not what you provisioned for the worst case three years ago.

- Oversized instances (CPU and memory utilization low)
- Over-provisioned databases (storage and throughput far above usage)
- Over-purchased SaaS seats
- Premium plans where standard would suffice
- High-availability setups for non-critical systems

Rightsizing requires real usage data, not theoretical needs.

### Lever 3: Restructure

Use cheaper structures for the same workload.

- Reserved or committed-use pricing (1-3 year commitments at 30-70% discount)
- Spot or preemptible instances for fault-tolerant work
- Cold storage for data accessed rarely
- Tiered storage (hot/warm/cold) by access pattern
- CDN caching to reduce origin load
- Compression and deduplication
- Serverless for spiky workloads
- Reserved instances for steady workloads

The right structure depends on the access pattern. Mismatch costs money.

### Lever 4: Negotiate

Pay less for the same thing.

- Annual contracts at lower rates than monthly
- Volume discounts at higher tiers
- Multi-year commitments for predictable workloads
- Bundle deals (consolidating services with one vendor)
- Renewal negotiation (vendors expect you to ask)
- RFP / competitive bid (using alternatives as leverage)

Most enterprise vendors negotiate. Most SaaS vendors don't, except at higher tiers. Consumer-tier services usually don't.

### Lever 5: Reframe

Change the question.

- Build vs buy: maybe in-house is cheaper at scale
- Buy vs build: maybe outsourcing is cheaper at small scale
- Different architecture (e.g., monolith vs microservices) has different cost profiles
- Different audience (do all customers need the same tier?)
- Different stack (open source vs commercial)

Reframe is the longest-lead lever. Worth thinking about even if not actionable now.

---

## Workflow

### Step 1: Pull the spend data

Get monthly costs by service, vendor, and (where possible) team or project.

For cloud (AWS, GCP, Azure): the billing console and cost-explorer tools.
For SaaS: each vendor's billing portal, plus an SaaS-management tool if available.
For everything else: bank statements and accounting export.

12 months minimum. Trends matter as much as absolute numbers.

### Step 2: Categorize

Organize spend into categories:

- **Hosting / compute**
- **Storage**
- **Database**
- **Networking / CDN**
- **Monitoring / observability**
- **Email**
- **CMS / hosting platforms**
- **Analytics / marketing**
- **Productivity / collaboration**
- **Development tools**
- **Security / compliance**
- **Other**

The categories vary by business. The point is: similar costs grouped, easy to compare.

### Step 3: Identify the biggest line items

80/20 rule. Usually 20% of vendors account for 80% of spend.

Focus the audit on the top 80%. The long tail can be cleaned up but rarely yields big savings per item.

### Step 4: Apply the 5 levers

For each major line item, walk the levers:

| Lever | Question |
|---|---|
| Eliminate | Is it used? Could we stop using it? |
| Rightsize | Are we paying for capacity we don't use? |
| Restructure | Is there a cheaper pricing model or service tier? |
| Negotiate | When was the last renewal? Did we negotiate? |
| Reframe | Is this even the right approach? |

Document the opportunity, the effort, the risk, and the savings estimate.

### Step 5: Prioritize

Plot opportunities on a 2x2:
- Y axis: savings
- X axis: effort

Quadrants:
- High savings, low effort: do first
- High savings, high effort: plan
- Low savings, low effort: do as time allows
- Low savings, high effort: skip

Also consider risk:
- Eliminate something used by no one: low risk
- Rightsize a database: medium risk (test in staging first)
- Replace a critical dependency: high risk (plan carefully)

### Step 6: Execute the easy wins

For each easy-win opportunity:
- Document the change
- Get owner approval
- Make the change
- Monitor for unexpected impact
- Confirm cost reduction in next billing cycle

Easy wins typically include:
- Canceling unused subscriptions
- Tearing down idle resources
- Switching off dev environments outside business hours
- Moving cold data to cheaper storage tiers

### Step 7: Plan the larger work

For higher-effort opportunities:
- Spec the change (use `pm-framework` for the plan)
- Test in staging
- Roll out incrementally
- Validate cost impact

Examples:
- Migrating to reserved instances
- Consolidating monitoring vendors
- Migrating from one CMS to another with cost benefit

### Step 8: Set up ongoing visibility

Optimization isn't one-time. Costs creep back up.

- Monthly cost review (at least)
- Cost dashboard (current, trend, by category)
- Alerts on cost spikes (e.g., daily spend exceeds threshold)
- Tagging or labeling on cloud resources (cost by team or project)
- Quarterly deeper review

### Step 9: Negotiate at renewal

For vendor contracts up for renewal:
- Start the conversation 60-90 days before renewal
- Have alternatives identified (even if you don't switch)
- Ask for a multi-year discount
- Ask about volume tiers
- Ask if usage rightsizing is possible
- Be willing to walk (most vendors find a way to keep you)

Pre-pandemic, many vendors auto-renewed at increases. Post-pandemic, many are hungry for retention. Ask.

### Step 10: Document the policy

Going forward:
- New vendor evaluation requires cost justification
- Resource provisioning has approval thresholds
- Tagging and labeling are required for cloud resources
- Quarterly review is calendared
- Cost attribution is clear

Without policy, costs creep.

---

## Common opportunities by category

### Hosting and compute

- Reserved or committed-use pricing for predictable workloads (30-70% off)
- Spot or preemptible for fault-tolerant batch
- Auto-scaling for variable loads
- Right instance family (compute-optimized, memory-optimized, etc.)
- Dev/staging instances stopped outside business hours

### Storage

- Lifecycle policies to move old data to cheaper tiers
- Delete old logs, backups, snapshots
- Compression for archival
- Object versioning costs (every version is a stored object)

### Database

- Right size based on actual CPU/memory usage
- Reserved capacity for predictable workloads
- Read replicas for read-heavy workloads (cheaper than scaling primary)
- Drop unused indexes (indexes cost storage and write performance)
- Old data archived or deleted

### Networking and CDN

- CDN reduces origin egress costs (often the biggest cost category)
- Compression on the wire
- Image and video optimization
- Region-aware routing

### Monitoring and observability

- Sample logs (don't ingest 100% of high-volume sources)
- Retention policies (do you need 90 days or 30?)
- Consolidate tools where possible
- Free or open-source tooling for non-critical needs

### SaaS

- Audit logins per seat (inactive users on $X/seat = $X waste)
- Renegotiate at renewal
- Move to annual billing for the discount
- Consolidate overlapping tools

---

## Failure patterns

**Cost-cutting that breaks something.** Aggressive rightsizing without testing causes outages. The cost of an outage is usually larger than the savings.

**Optimization that takes more time than it saves.** A team spends a quarter saving $5K/year. Math doesn't work. Focus on opportunities where savings exceed effort.

**Renewal autopilot.** Annual renewals go through without review. Calendar them.

**No tagging.** Cloud spend grows; no one knows whose. Tag everything from day one.

**Free tier overruns.** "It's on the free tier." Then it's not, and bills surprise. Set alerts on free-tier services.

**No environment differentiation.** Production-grade staging "to match prod." Costs as much as prod. Often unnecessary.

**Untouched legacy.** "The old project still runs." Why? Often: nothing actually uses it. Audit and shut down.

**Premium tiers for non-premium needs.** Enterprise plan because someone wanted a feature that's been since added to lower tiers. Recheck.

**Vendor lock-in justifying cost.** "We can't switch." That's not a reason to overpay; it's a strategic problem to plan around.

**Optimizing the small stuff while ignoring the big stuff.** Saving $50/month on tools while $5K/month sits in oversized infrastructure. Top-down first.

**Penny-wise, pound-foolish.** Cutting a useful tool to save $20/month, then losing hours to manual work. Tools that pay for themselves shouldn't be cut.

**No reinvestment.** Every dollar saved goes to bottom line; nothing reinvested in upgrades or capacity. Saved costs and improved capability aren't either/or.

---

## Output format

A cost optimization document includes:

- **Current state:** total spend, by category, trended
- **Top line items:** the biggest costs
- **Opportunities:** by lever (eliminate / rightsize / restructure / negotiate / reframe)
- **Prioritized list:** with savings, effort, risk
- **Action plan:** owners, dates
- **Easy wins executed:** what's already done, results
- **Ongoing governance:** dashboard, review cadence, tagging, approval thresholds

---

## Reference files

- `references/cloud-audit-checklist.md`: A practical walkthrough for auditing a cloud account (compute, storage, database, network, monitoring) for waste and rightsizing opportunities.

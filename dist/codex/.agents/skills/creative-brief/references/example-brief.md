# Creative Brief: Plumb

**Date:** 2026-04-15
**Author:** Maria Chen, Founder
**Stakeholders:** Maria Chen (sign-off), Devon Park (engineering), Sasha Williams (design lead)
**Status:** Approved

---

## 1. Snapshot

Plumb is infrastructure observability built for small DevOps teams. We are launching a marketing site and product trial flow to support our public beta in Q3 2026. The site needs to convert technical buyers from a homepage visit to a trial signup, and clearly position us as the "right-sized" option against the heavy enterprise incumbents. Target launch: July 15, 2026.

**Quick facts**
- Project type: Marketing website + trial signup flow
- Launch target: July 15, 2026
- Budget tier: $25K design + dev, plus internal team time
- Stack constraints: Next.js + Vercel, with Supabase for the trial flow

---

## 2. Audience

**Primary audience**

Who: A staff or principal engineer at a 20 to 200 person startup, currently the unofficial owner of the team's monitoring stack. They got handed Datadog two years ago, the bill is now embarrassing, and they want a defensible alternative they can sell internally.

What they are trying to do: Cut the monitoring bill by at least 40 percent without taking on a tool that requires a dedicated SRE to operate.

What is blocking them today: Datadog is too expensive and too sprawling. Grafana is technically free but burns engineering time on maintenance. Both feel built for someone three sizes bigger.

Where you reach them: Hacker News, the changelog blog, lobste.rs, technical Twitter, dev-focused podcasts (Changelog, Software Engineering Daily), and search ("alternative to datadog", "self-hosted monitoring small team").

**Secondary audience**

Engineering managers and CTOs at the same companies, who sign the invoice. They land later in the journey but need the pricing page and the ROI math to be airtight.

**Anti-personas**

- Enterprise procurement teams. We do not want to attract Fortune 500 inbound. The product is not built for that scale and we do not want to spend cycles on RFPs.
- Hobbyists who want a free forever tier. We have a generous trial but no free tier. Bargain hunters churn.

---

## 3. Objectives

| Objective | Measurable signal | Timeframe |
|---|---|---|
| Drive trial signups from organic and content channels | 200 trial signups per month within 90 days of launch | By Oct 15, 2026 |
| Convert trials to paid | 12 percent trial-to-paid conversion | By end of Q4 2026 |
| Establish technical credibility | 50+ inbound mentions on HN, lobste.rs, or dev Twitter referencing the site or docs | By end of Q3 2026 |
| Reduce sales cycle for inbound | Pricing page transparent enough that 80 percent of inbound deals close without a sales call | Ongoing |

---

## 4. Key message

Plumb is observability that fits a 50-person engineering team, priced for a 50-person engineering team.

---

## 5. Voice and tone

**We sound:** Direct, technical, confident, dry-witted, practical.

**We do not sound:** Cute, hand-wavy, salesy, corporate, or condescending.

| We are | We are NOT |
|---|---|
| Direct | Blunt or rude |
| Technical | Inaccessible to a non-expert reader |
| Confident | Boastful |
| Dry-witted | Trying to be funny |
| Practical | Boring |

**Examples of our voice in the wild**

- Stripe docs, for the rhythm and the way they assume reader competence without showing off.
- Tailscale's blog, for the dry technical wit and willingness to admit tradeoffs.
- 37signals' product copy, for short sentences that earn their place.

---

## 6. Visual direction

**Mood:** Calm, confident, technical, slightly opinionated. A senior engineer's notebook, not a stadium.

**Palette direction:** Predominantly light with strong dark-mode parity. Single accent color (deep teal). Charts and diagrams in muted, accessible color ramps. No gradients, no glow effects.

**Type direction:** Geometric sans for display (Inter or similar), monospace for code and metrics (JetBrains Mono or similar). Generous line height. Comfortable for long-form reading.

**Imagery direction:** Real screenshots of the product, annotated. Architecture diagrams drawn in a consistent simple style. No stock photos. No abstract 3D illustrations. No people in headsets pointing at laptops.

**Reference sites we want to feel like**

- linear.app: For the calm density and how every pixel feels intentional.
- planetscale.com: For technical credibility without enterprise stuffiness.
- fly.io: For the dry voice and the unapologetic technical depth on the homepage.

**Reference sites we want to feel different from**

- datadoghq.com: Too dense, too many product lines, screams "we will sell you everything."
- newrelic.com: Too corporate, too gradient-heavy, feels like 2018.

---

## 7. Scope and deliverables

**In scope**

- Homepage with hero, three feature blocks, social proof, pricing teaser, footer CTA
- Pricing page with transparent tiers, calculator, and FAQ
- Product page with annotated screenshots and one short demo video
- About page (founder story, team, hiring CTA)
- Trial signup flow (3 steps: email + workspace name + first project setup)
- Docs index page that links into the existing docs site (separate property)
- Blog index and post template (engineering writing, changelog posts)
- 404 and other error pages

**Out of scope**

- Customer logos page (we do not have permissioned logos yet)
- Comparison pages (Datadog vs Plumb, etc.) - saved for Q4 once we have data
- Localization (English only at launch)
- Marketing automation integrations beyond a single newsletter capture

---

## 8. Constraints

**Timeline**

- Brief approved: April 15, 2026
- Wireframes: April 30
- High-fi design: May 20
- Dev complete: June 30
- QA and content load: July 1 to July 12
- Launch: July 15

**Budget**

- $25K total: $15K design, $10K dev contractor for trial flow integration. Internal team handles content, brand assets, deploy.

**Technical**

- Next.js App Router on Vercel
- Trial flow writes to Supabase (existing project)
- Plausible for analytics (no Google Analytics)
- All pages must score 95+ on Lighthouse performance and accessibility
- Mobile baseline: 375px

**Brand**

- Logo: existing wordmark + glyph (provided)
- Colors: deep teal (#0F4C5C), slate gray scale, white. Single accent only.
- Type: Inter for display, JetBrains Mono for code

**Legal and compliance**

- Accessibility: WCAG 2.1 AA
- Privacy: GDPR compliant. EU users get a banner. Data residency in US-East.
- No customer testimonials with full names without written consent

---

## 9. Inspiration and competitors

**Inspiration**

| Site / brand | What we love |
|---|---|
| linear.app | Density without clutter; type system; restraint |
| planetscale.com | How they explain technical concepts in the hero |
| fly.io | Voice, blog rhythm, code samples on the homepage |
| stripe.com/docs | The annotated examples pattern (we want to borrow this for the product page) |

**Competitors**

| Site / brand | How we differ |
|---|---|
| datadoghq.com | We are smaller, opinionated, and priced for teams under 200 |
| newrelic.com | We avoid enterprise sprawl. Single product, clear pricing |
| grafana.com | We are managed and easier to operate. We charge for the time savings |

---

## 10. Approval

**Sign-off owner:** Maria Chen

**Sign-off artifacts:**
- Wireframes: review by April 30, async approval in Figma
- High-fi design: review by May 20, in-person review meeting + 48-hour async window
- Pre-launch site (staging URL): review by July 10, all stakeholders sign off in writing

**Sign-off deadline:** Each stage above has a 48-hour async window after the review meeting. After 48 hours of no objection, the stage is approved and we proceed.

**If no sign-off by deadline:** Default to ship. Maria has final say on any post-launch revision.

---

## Appendix

- [Audience research notes](./audience-research.md)
- [Competitive teardown](./competitive-analysis.md)
- [Brand guidelines](./brand-guidelines.md)

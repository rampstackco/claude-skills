# Launch tier decision

Tier 1 / Tier 2 / Tier 3 decision framework. Worked examples. Anti-patterns on both sides.

The principle. Match launch effort to feature scope. Treating every release as Tier 1 produces comms fatigue; treating every release as Tier 3 produces unlaunched features.

---

## The tiers

### Tier 1: full launch

**Scope.** Net-new product, major feature reshaping the product narrative, pricing change, breaking change.

**Effort.** Full playbook. Positioning, all comms channels, sales enablement (B2B), customer success briefing, dedicated post-launch measurement, executive announcement. Two to four weeks of pre-launch work; four to eight weeks of post-launch monitoring.

**Examples.**

- A new product surface (Slack adds Canvas; Figma adds FigJam; Notion adds Sites).
- A pricing model change (per-seat to consumption; introducing a new tier).
- A foundational replatforming with user-visible impact (a new UI architecture, a new permissions model).
- A flagship competitive feature (the thing the sales team has been asking for, the thing the analyst report compared you on).

### Tier 2: focused launch

**Scope.** Meaningful improvement that materially affects user value or competitive positioning.

**Effort.** Subset of the playbook. In-app comms, blog post or detailed release note, support readiness, rollout strategy, post-launch measurement. One to two weeks of pre-launch work; two to four weeks of post-launch monitoring.

**Examples.**

- A new export format that customers have been requesting.
- A redesigned core flow (e.g., a new onboarding experience).
- An integration with a major third-party (Slack notifications, Salesforce sync).
- A meaningful performance improvement (page loads twice as fast on a flagship surface).

### Tier 3: release note

**Scope.** Incremental improvement, bug fix made positive, polish.

**Effort.** Minimal. Changelog entry, release note, light monitoring. Hours of pre-launch work; passive monitoring post-launch.

**Examples.**

- A new keyboard shortcut.
- A small UI polish (better empty states, refined typography).
- A minor configuration option (toggle to disable a non-default behavior).
- A bug fix that improves reliability for a small cohort.

---

## Decision framework

When unsure between two tiers, ask three questions.

1. **Will sales need to talk about this?** If yes, at least Tier 2. If sales is selling against this gap today, Tier 1.
2. **Will customers be confused if we do not tell them?** If yes, at least Tier 2.
3. **Will the metric this is meant to move show up in board reporting?** If yes, Tier 1. If yes but only at the team level, Tier 2.

If all three answers are no, the feature is Tier 3.

---

## Worked examples

### Example 1: a new export-to-PDF capability

A B2B SaaS product adds export-to-PDF to its reporting feature.

- Will sales talk about this? Yes; this has been a top sales objection.
- Will customers be confused without comms? No; the feature is discoverable in the existing UI.
- Will the metric move at board level? Probably not directly; might unblock some deals.

**Tier 2.** Sales enablement (battlecard plus a one-paragraph deal-coaching note). Blog post. Release note. In-app banner on the reporting page. Light monitoring.

### Example 2: a new pricing tier with consumption-based billing

A SaaS company adds a usage-based tier alongside its existing per-seat plans.

- Will sales talk about this? Yes; pricing changes always involve sales.
- Will customers be confused without comms? Yes; existing customers will wonder if they should switch.
- Will the metric move at board level? Yes; revenue mix and ARR composition are board-level.

**Tier 1.** Full positioning canvas. Internal launch brief 4 weeks ahead. Sales enablement including pricing change documentation. Email to existing customers explaining what is and is not changing for them. Blog post. Webinar for top accounts. Phased rollout starting with new customers, then existing customer opt-in.

### Example 3: a keyboard shortcut for a power-user action

A consumer app adds Cmd+K for quick navigation.

- Will sales talk about this? No; consumer product, no sales motion.
- Will customers be confused without comms? No; the feature is purely additive and discoverable.
- Will the metric move at board level? No; small UX improvement.

**Tier 3.** Changelog entry. Maybe a tweet from the product team. No further work.

### Example 4: an enterprise SSO integration

A B2B SaaS adds SAML SSO support.

- Will sales talk about this? Yes; SSO is a hard requirement for many enterprise deals.
- Will customers be confused without comms? Existing self-service customers no; enterprise prospects yes.
- Will the metric move at board level? Indirectly; SSO unblocks enterprise deals worth real ARR.

**Tier 1 if SSO unlocks the enterprise segment for the first time, otherwise Tier 2.** Sales enablement is the highest-impact piece (the deal-coaching note for previously SSO-blocked accounts). Customer success outreach to top enterprise prospects. Blog post focused on the security and IT audience. Quiet rollout for self-service customers (changelog only).

---

## Anti-pattern: everything is Tier 1

Symptom. Every release gets a blog post, an email, a sales briefing. Customers tune out the announcement firehose. Real Tier 1 launches lose signal in the noise. Sales reps stop reading the briefings because they assume every one is minor.

Fix. Be honest about which features are major. If you ship five "major" launches per quarter, three of them are Tier 2 or Tier 3 in disguise. The Tier 1 budget should be one to three per quarter for most companies.

---

## Anti-pattern: everything is Tier 3

Symptom. Features ship without comms. Sales does not know what is new. Customers are surprised when they discover a feature six months after launch. Metrics do not move because users do not know the feature exists.

Fix. Tier honestly. Most B2B SaaS releases are Tier 2; defaulting them to Tier 3 leaves value on the table. The minimum Tier 2 effort (release note plus in-app banner plus support FAQ) is small; the marginal value capture is large.

---

## How tier affects the rest of the playbook

| Section | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Positioning canvas | Required | Required | Skip |
| Internal launch brief | 2 to 4 weeks ahead | 1 week ahead | Skip |
| Customer comms | All channels | In-app + blog + release note | Release note |
| Sales enablement (B2B) | Full battlecard + demo + training | One-page note + Q&A | Skip |
| Support readiness | Full training | Brief + FAQ | FAQ if applicable |
| Rollout strategy | Phased or gradual | Gradual | Either |
| Monitoring | Full + rollback triggers | Standard + alerts | Passive |
| Post-launch measurement | 4 to 8 weeks | 2 to 4 weeks | Light |

The pattern. Tier 1 is the full playbook. Tier 2 is the playbook compressed. Tier 3 is the changelog plus passive monitoring. Each section's depth scales with tier.

# Platform comparison

A practical guide to choosing an experimentation platform. Each platform has a distinct profile (statistical defaults, primary audience, integration model, pricing shape). Picking well saves quarters of friction; picking badly creates ongoing pain.

This reference assumes the team is in the position of choosing or reconsidering. For platform-specific MCP commands, auth models, and example prompts, consult the chosen platform's official documentation.

---

## Statsig

**Profile.** Modern feature management plus experimentation platform. Built CUPED-first, holdouts as a first-class concept, warehouse-native with optional event ingestion. Fast-growing customer base including OpenAI, Notion, Brex, Whatnot.

**Strengths.** CUPED variance reduction is the default, not an opt-in. Strong holdout analysis with built-in long-term measurement. Mature MCP exposing full CRUD across experiments, gates, dynamic configs, layers, and segments. Setup guides for ChatGPT, Cursor, Claude Code, Codex.

**Best for.** Fast-growing companies that want one platform for both feature flags and experiments. Engineering-led teams comfortable with code-first configuration. Teams that need to run many concurrent experiments and care about variance reduction.

**Gotchas.** Pricing scales with events, which can compound for high-traffic products. The breadth of the MCP can crowd context windows on smaller models; scoping helps. Best-in-class statistical defaults are nice but require the team to actually understand them.

**MCP setup.** Statsig publishes setup guides for ChatGPT, Cursor, Claude Code, and Codex; consult the Statsig docs for the current MCP server URL and auth model.

---

## PostHog

**Profile.** Open-source product OS combining product analytics, experiments, feature flags, surveys, session replays, error tracking, and LLM analytics in one platform. Self-host or cloud. Customer base skews toward PLG products and developer tools.

**Strengths.** Combines analytics and experimentation in one platform, eliminating the metric-definition mismatch between systems. Full event-level data in the warehouse. 200+ MCP tools across the entire product, the largest surface of any vendor in this list.

**Best for.** Product-led growth products that benefit from full-funnel context across analytics, experiments, and session replays. Teams that want one platform for everything rather than a stack of specialized tools.

**Gotchas.** The breadth of the MCP requires scoping with `?features=` query parameters; without scoping, the agent gets 200+ tools and tool selection accuracy degrades on smaller models. Self-host adds operational complexity. Some experiment features lag behind specialized platforms.

**MCP setup.** PostHog's MCP scopes via `?features=` query parameters; without scoping, the agent gets 200+ tools and tool-selection accuracy degrades on smaller models. Consult the PostHog docs for current scoping syntax.

---

## GrowthBook

**Profile.** Open-source warehouse-native experimentation. Runs SQL on the team's existing data warehouse. Customer base skews data-mature: Dropbox, Khan Academy, Mistral. Claims the first open-source production MCP for experimentation.

**Strengths.** Data stays in the team's warehouse; no event ingestion to a vendor. Strong cost control because the math runs on infrastructure the team already pays for. 100 percent open source under MIT, with self-host or cloud options.

**Best for.** Data-mature teams that already own a warehouse (Snowflake, BigQuery, Redshift, ClickHouse, Postgres). Regulated industries where data residency matters. Teams that want full control over the statistical math.

**Gotchas.** More setup overhead than hosted platforms. Requires SQL fluency for advanced analyses. Smaller community than the bigger commercial vendors.

**MCP setup.** GrowthBook ships an open-source MCP for self-host or cloud; consult the GrowthBook docs for the current binary and auth model.

---

## Optimizely

**Profile.** Long-time enterprise leader in personalization and experimentation. Web Experimentation and Feature Experimentation as separate but linked products. Customer base skews enterprise marketing and e-commerce.

**Strengths.** Deep targeting, audience management, multivariate testing. Visual editor accessible to non-technical users (marketers can build variants without engineering). Mature personalization and recommendation engine. Hosted Remote MCP works in browser-based ChatGPT and Claude.ai with OAuth.

**Best for.** Marketing-led organizations where non-technical teams need to author variants. Enterprises with deep personalization needs. E-commerce sites with established A/B testing programs.

**Gotchas.** Expensive at the enterprise tier. Visual editor produces JS that ships at runtime, which can affect page performance. Less ergonomic for engineering-led teams that prefer code-first configuration.

**MCP setup.** Optimizely's hosted Remote MCP works in browser-based ChatGPT and Claude.ai with OAuth; consult Optimizely docs for the current server URL.

---

## Amplitude

**Profile.** Behavioral analytics platform with experiments and feature flags layered on top. Customer base skews product analytics teams that adopted Amplitude before adding experimentation.

**Strengths.** Deep cohort analysis and behavioral segmentation. Native ChatGPT connector. Hosted MCP available to all customers including the free tier. Integrates tightly with the analytics layer that PMs already use.

**Best for.** Teams that already use Amplitude for analytics and want to add experiments without introducing a new platform. Product analytics teams that need behavioral cohort segmentation as part of the experiment workflow.

**Gotchas.** Experiments are a secondary feature, not the platform's center of gravity. Variance reduction options are more limited than dedicated experimentation platforms. Beta status of the MCP means the API surface may evolve.

**MCP setup.** Amplitude's hosted MCP is available to all customers including the free tier and ships a native ChatGPT connector; consult the Amplitude docs for the current setup steps.

---

## Eppo

**Profile.** Warehouse-native experimentation platform with strong statistical defaults. Customer base skews data-team-led organizations: Twitch, DraftKings, Perplexity. Best-in-class statistical rigor.

**Strengths.** Best-in-class statistical defaults: variance reduction, sequential testing, contextual bandits, lifecycle experimentation. Warehouse-native means data stays in the team's stack. Strong explainability features for tracing reported lifts back to underlying SQL.

**Best for.** Data-team-led organizations where data scientists own the experimentation discipline. Companies with mature warehouses and strict statistical rigor requirements. Teams running contextual bandits or other advanced experiment designs.

**Gotchas.** No first-party MCP server as of May 2026. Programmatic access is REST API only; teams that want agentic workflows today need to build a custom MCP adapter or wait. Pricing reflects the data-science-focused product positioning.

**MCP setup.** No first-party MCP server as of mid-2026; teams that want agentic workflows today either build a custom MCP adapter on top of Eppo's REST API or wait for the official server. Consult Eppo's docs and roadmap for current status.

---

## Kameleoon

**Profile.** AI-driven personalization platform with a specialized MCP focused on the convert-and-promote workflow. The MCP pulls raw variation code from winning experiments and helps refactor it into production-ready React components.

**Strengths.** Sharp, narrow MCP (seven specialized tools) focused on a specific job: take a winning marketing-site variation and ship it as permanent product code. Hosted MCP via OAuth. Avoids the broad-CRUD complexity that crowds context windows on other platforms.

**Best for.** Teams that test on the marketing site and need to convert wins into permanent React components. Hybrid marketing-and-product setups where the experiment lives in JS/CSS and the win needs to ship as a product feature.

**Gotchas.** The narrow MCP scope is intentional but limits broader CRUD work. For everyday flag management, teams use the Kameleoon dashboard or REST API rather than the MCP.

**MCP setup.** Kameleoon's hosted MCP via OAuth ships a narrow seven-tool surface focused on the convert-and-promote workflow; consult Kameleoon's docs for the current server URL.

---

## Decision matrix

A short matrix for the first-pass platform decision. Tradeoffs are oversimplified; verify against the team's specific constraints.

| Situation | Pick |
|---|---|
| Pure SaaS, fast-growing, want one platform for flags + experiments | Statsig or PostHog |
| Open-source preference, warehouse-native | GrowthBook or Eppo |
| Enterprise, marketing-led, non-technical variant authoring | Optimizely |
| Already using Amplitude for analytics, want experiments without new platform | Amplitude |
| Convert marketing-site experiment wins into permanent product code | Kameleoon |
| Data-team-led, statistical rigor is non-negotiable, can wait for MCP | Eppo |
| Open-source AND warehouse-native AND need MCP today | GrowthBook |

Beyond these defaults, the right choice depends on the team's existing stack, the experimentation maturity, and the budget. The "best" platform for one team is wrong for another; pick based on the team's actual constraints, not the platform's marketing.

---

## Switching costs

Once a team has adopted a platform, switching is expensive. Existing experiments need to be re-run on the new platform. The metric definitions need to be reconciled. The team needs to retrain on a new tool. Plan accordingly:

- **Easy switches.** Visual A/B testing tools that ship JS at runtime (Optimizely Web, AB Tasty, VWO classic). Switching is mostly tag-replacement.
- **Medium switches.** Warehouse-native to warehouse-native (GrowthBook to Eppo, or vice versa). The data layer is shared; the configuration migrates.
- **Hard switches.** Anything to or from event-ingestion platforms (Statsig, Amplitude). The historical event data does not transfer cleanly; the team starts fresh on metric history.

If the team is choosing now and might need to switch later, lean toward warehouse-native options. Data ownership is the most expensive thing to switch.

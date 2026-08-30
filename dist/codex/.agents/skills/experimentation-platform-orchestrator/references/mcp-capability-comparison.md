# MCP capability comparison

Side-by-side capability matrix across the seven covered platforms. Current as of May 2026. MCP capability evolves quickly; verify before committing.

The matrix is organized by capability category. Read it as "if my workflow needs X, which platforms support it." If your workflow needs every capability across the board, the answer is Statsig, PostHog, or Optimizely (the most mature MCPs). If your workflow needs a specific subset, smaller MCPs may be a better fit.

---

## Capability matrix

| Capability | Statsig | PostHog | GrowthBook | Optimizely | Amplitude | Eppo | Kameleoon |
|---|---|---|---|---|---|---|---|
| Read feature flags | Yes | Yes | Yes | Yes | Yes | No (REST) | Yes |
| Create or update feature flags | Yes | Yes | Yes | Yes | Yes | No (REST) | Yes |
| Read experiments | Yes | Yes | Yes | Yes | Yes | No (REST) | Yes |
| Create or update experiments | Yes | Yes | Yes | Yes | Yes | No (REST) | Yes |
| Read experiment results | Yes | Yes | Yes | Yes | Yes | No (REST) | Yes |
| Query analytics or events | Yes | Yes (200+ tools) | Limited | Limited | Yes | No (REST) | No |
| Manage segments and audiences | Yes | Yes | Yes | Yes | Yes | No (REST) | Yes |
| Governance actions (permissions, audit) | Partial | Partial | No | Yes | Partial | No | No |
| Code generation (variant to component) | No | No | No | No | No | No | Yes |
| Hosting model | First-party (managed) | First-party + self-host | First-party + OSS self-host | Hosted Remote | Hosted | n/a (REST) | Hosted Remote |
| Auth method | API key | API key | API key | OAuth | API key | n/a | OAuth |
| Approximate tool count | ~30 | 200+ | ~25 | ~20 | ~15 | n/a | 7 |
| Recommended scoping | Default | `?features=` to scope | Default | Default | Default | n/a | Default |

---

## Notes per platform

### Statsig

The MCP is mature and covers the full Statsig surface (gates, dynamic configs, experiments, holdouts, layers). The tool count is moderate, which keeps the agent context window tight without sacrificing capability. Authentication is API-key based; provision a service account for agent workflows so the audit trail is clean.

Recommended for AI-forward teams that want full CRUD without context window concerns.

### PostHog

The MCP is the most expansive of any platform here. 200+ tools cover analytics, experiments, flags, surveys, replays, and more. The breadth comes with a cost: without scoping, the agent's context window fills with tool definitions before it can do useful work.

Use the `?features=` scoping parameter to load only the surfaces you need. For an experimentation-focused workflow, scope to flags, experiments, and analytics; skip replays, surveys, and error tracking unless they are part of the workflow.

Recommended for AI-forward teams that need broad coverage and are willing to invest in scoping discipline.

### GrowthBook

The MCP is the first open-source production MCP for experimentation. It covers the GrowthBook surface (experiments, flags, metrics, segments). Tool count is moderate. Self-host means you can run the MCP inside your network for data sovereignty.

Recommended for OSS-preferring teams and regulated industries that need the MCP inside their VPC.

### Optimizely

The hosted Remote MCP works in browser-based ChatGPT and Claude.ai. Authentication is OAuth, which integrates cleanly with enterprise SSO. Tool count is moderate. Coverage is solid on Web Experimentation and Feature Experimentation; Personalization features are accessed via the same surface.

Recommended for enterprise teams that need OAuth and SSO compatibility for compliance.

### Amplitude

The hosted MCP is available to all customers including the free tier. Tool count is smaller than Statsig or PostHog. Coverage is strongest on analytics queries (cohorts, funnels, retention) and adequate on experiments and flags.

Recommended for teams that primarily need analytics queries and use experiments as a supplementary capability.

### Eppo

No first-party MCP as of May 2026. REST API is the integration path. Workflows that depend on agent-driven experiment creation need a custom adapter or a wait until Eppo ships an MCP.

Track for a future MCP release. The platform has the underlying API; an MCP wrapper is a likely future development.

### Kameleoon

Hosted Remote MCP at `mcp.kameleoon.com/mcp` with OAuth and 7 specialized tools. The tool surface is purpose-built for the win-to-code workflow. The smallest MCP in this matrix and the most opinionated.

Recommended for teams running the marketing-site-to-product-code workflow. Layer with another MCP if your needs go beyond that scope.

---

## Choosing by workflow

**Agent-driven full experiment lifecycle (create, run, monitor, conclude).** Statsig, PostHog, GrowthBook, or Optimizely. All four support full CRUD via MCP.

**Agent-driven analytics queries plus light experiment work.** PostHog (with scoping) or Amplitude. Both have strong analytics MCP coverage.

**Agent-driven win-to-code conversion.** Kameleoon. The only platform with this workflow as a primary feature.

**Human-driven workflow where MCP is supplementary.** Any of the seven. Eppo via REST works for the supplementary case.

**Compliance-sensitive workflow (SSO, audit, data residency).** Optimizely (OAuth, hosted) or GrowthBook self-hosted (data residency, OSS auditable).

---

## Things to check before committing

1. **Tool count and scoping.** Verify the agent context window is comfortable with the platform's tool surface. PostHog without scoping fills the window fast.
2. **Auth model.** API key is faster to provision; OAuth is required for compliance-sensitive deployments.
3. **CRUD coverage.** Read-only MCPs limit your workflow. Verify create and update are supported for your target objects.
4. **Hosting model.** Hosted is faster to start; self-host is required for data sovereignty.
5. **Trajectory.** MCP capability evolves monthly. Check the platform's changelog before committing for a future-sensitive workflow.

# Connector capability classes

Workflows in this tier declare the data access they need as capability CLASSES, never vendors. Your MCP server or integration binds the class; the workflow stays valid when your stack changes.

Rules, in force across every workflow:
- Read-only is the default. The only write mode is write-held: the action creates a draft or a held change that a human promotes. Publishing, merging, and platform actions are never agent actions under template status.
- Every warehouse capability carries mandatory query bounds: a date range pushed down as a partition filter on every call. A call without bounds is rejected, not silently run.
- Credentials live in environment, never in workflow files, tool output, or error messages.

| Class | Access | What it serves | Binding today |
|---|---|---|---|
| warehouse.query | read | the metric warehouse all tracks read | managed warehouse MCP servers exist for the major warehouses; a thin domain layer encoding your query-correctness rules remains yours to build |
| search-performance.read | read | search console class data | the bulk export lands this in the warehouse natively; direct-API access is a thin layer to build |
| analytics.read | read | product/web analytics events | an official analytics MCP exists for the common stack; native warehouse export is the reference path |
| cms.draft | write-held | content pipeline drafts | your CMS's draft state via its API; no universal server, a small adapter |
| repo.change | write-held | code and config changes as held draft PRs | native to the code host |
| crawl.read | read | live-page fetches for verification gates | plain HTTPS; no server needed |
| experiment.read | read | experiment results and assignments | per-vendor adapter |
| revenue.read | read | commerce/affiliate revenue events, reconciled against the warehouse | per-platform adapter |

Deliberate absences: there is no index-submit class and no analytics-config-write class. Submitting sitemaps, requesting indexing, and changing analytics settings are state-changing human actions.

The agreement log has NO connector class, deliberately. It is operated substrate, not a connectable capability: the schema is public (AGREEMENT-LOG.md), the instance and its write path are not. Workflow files that touch it carry a public-gate versus operated-log split in their done-when conditions.

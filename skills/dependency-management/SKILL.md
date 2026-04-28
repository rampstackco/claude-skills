---
name: dependency-management
description: "Manage third-party libraries, runtimes, and SaaS dependencies. Use this skill when setting an update cadence, responding to security advisories, dealing with deprecated dependencies, evaluating new dependencies, auditing what's installed, or unblocking a dependency upgrade. Triggers on dependency, package update, security patch, lockfile, deprecated, breaking change, supply chain, dependency audit, npm audit, dependabot, renovate. Also triggers when a build breaks after an update or when an advisory is published for a used package."
---

# Dependency Management

Decide what to depend on, keep dependencies current, respond to advisories, and reduce supply chain risk. Stack-agnostic principles; specifics vary by package manager.

---

## When to use

- Setting up dependency hygiene for a new or existing project
- Responding to a security advisory
- Major version upgrade of a key dependency
- Adding a new dependency (evaluation, decision)
- Removing a dependency (cleanup)
- Audit of what's installed and what's actually used
- Setting an update cadence and policy
- Diagnosing a broken build after an update

## When NOT to use

- General code review (use `code-review-web`)
- Vulnerability scanning of infrastructure (use `security-baseline`)
- Pinning vendor or service contracts (use `vendor-evaluation`)
- Performance impact of dependencies (use `performance-optimization`)

---

## Required inputs

- Package manager and lockfile in use (npm, yarn, pnpm, pip, gem, composer, etc.)
- Current dependency list (production and dev)
- Current advisories (run audit; check service like Snyk, Dependabot)
- Update history (when were major dependencies last updated)
- Risk profile (production criticality, change tolerance)

---

## The framework: 4 categories of dependency

Every dependency falls into one of these. The category drives the policy.

### Category 1: Critical runtime

Code that runs in production and would break the system if it failed.

Examples: framework, database driver, payment SDK, authentication library.

Policy:
- **Update cadence:** monthly minor, quarterly major (with planning)
- **Security:** patch within 24-72 hours of advisory, 24h for critical
- **Pinning:** exact version pins or narrow ranges
- **Vetting:** thoroughly evaluated before adoption

### Category 2: Supporting runtime

Code that runs in production but is replaceable or non-critical.

Examples: utility libraries, formatting, non-core integrations.

Policy:
- **Update cadence:** monthly together with critical
- **Security:** patch within a week of advisory
- **Pinning:** narrow ranges acceptable (e.g., `^1.2.3`)
- **Vetting:** moderate evaluation; alternatives considered

### Category 3: Dev/build

Code that runs only during development or build, not in production.

Examples: bundlers, linters, test frameworks, type checkers.

Policy:
- **Update cadence:** quarterly
- **Security:** patch within a week (still matters; supply chain attacks target build tools)
- **Pinning:** ranges acceptable
- **Vetting:** lighter; broken dev tools surface fast

### Category 4: Optional/dev-only-personal

Tools individual developers use that aren't part of shared dev environment.

Not really managed at the project level. Mentioned for completeness.

---

## The framework: 5 risk dimensions

When evaluating a dependency, consider:

### Dimension 1: Maintenance health

- Last commit date (months ago is concerning)
- Open issue count and age
- Number of maintainers
- Sponsorship or commercial backing
- Roadmap visibility

A dependency abandoned a year ago is a liability waiting to surface.

### Dimension 2: Surface area

- Size of the package
- Number of transitive dependencies
- Footprint in the bundle (for client-side)
- Privileges required (file system, network, etc.)

A small dependency that pulls in 50 transitive packages has the surface area of all 50.

### Dimension 3: Replaceability

- How hard would it be to remove?
- Are there alternatives?
- Could the functionality be implemented in-house?
- Is the API standard or idiomatic?

A dependency you can't replace is leverage you've granted to its maintainer.

### Dimension 4: Trust

- Reputation of the maintainer or organization
- Code quality (skim the source)
- License (GPL, MIT, BSD, proprietary, none)
- History of security issues
- Supply chain practices (signed releases, 2FA on publishes)

### Dimension 5: Cost

- Time to evaluate, integrate, maintain
- Risk of breaking changes
- Lockfile entropy
- Potential security exposure
- Bundle size impact (for client-side)

Every dependency has a cost. Free packages aren't free.

---

## Workflow

### Step 1: Inventory

Run a dependency listing:

```bash
# npm/yarn/pnpm
npm ls --all --json

# pip
pip list

# gem  
bundle list
```

For each top-level dependency, categorize (critical / supporting / dev). For transitives, you generally don't manage individually unless one becomes a problem.

### Step 2: Audit

Run the security audit:

```bash
npm audit
yarn audit
pip-audit
bundle audit
```

For each finding:
- Severity (critical, high, medium, low)
- Package and version
- Fix available?
- Used directly or transitively?

### Step 3: Categorize and prioritize

| Severity | Direct dep | Indirect dep |
|---|---|---|
| Critical | Patch today | Patch this week (if a fix exists; track if not) |
| High | Patch this week | Patch this month |
| Medium | Patch this month | Track; patch with next round |
| Low | Track | Track |

Critical and high in production code are emergencies. Low and medium are scheduled work.

### Step 4: Test before merging fixes

Even patch-level updates can break things. For critical dependencies:
- Run the full test suite
- Smoke-test in staging
- Watch the monitoring after rollout

For supporting and dev:
- Run the test suite
- A failed test is OK to investigate; don't merge a known-broken update

### Step 5: Plan major version upgrades

Major versions break things. Plan rather than rush.

For each major upgrade:
- Read the changelog and migration guide
- Estimate the migration effort
- Schedule the work (don't do it under deadline pressure)
- Branch and test thoroughly
- Plan a staged rollout if it's a critical dependency

Don't sit on major versions indefinitely. The longer you wait, the more painful the upgrade.

### Step 6: Set the policy

Document:
- Update cadence (e.g., monthly review, quarterly upgrades)
- Security response SLA (e.g., critical within 24h)
- Approval for new dependencies (who signs off)
- Removal criteria (when do we drop a dependency)
- Pinning strategy (exact, narrow range, broad range)

The policy is what survives team turnover. Without it, dependency management becomes chaotic ad hoc work.

### Step 7: Automate

- **Renovate** or **Dependabot** for automatic update PRs
- CI runs audit on every PR
- Block merges on critical advisories (with override path for false positives)
- Notify on advisories for installed packages
- Lockfile diff in PR review

Automation reduces toil. Manual checking doesn't scale.

### Step 8: Audit usage periodically

Quarterly:
- Dependencies installed but not imported anywhere (run a tool like `depcheck`)
- Major versions behind (more than 1-2 majors behind = upgrade plan needed)
- Unmaintained packages (last commit over a year ago = consider replacing)
- License audit (anything that's changed terms?)

Remove what's not used. Replace what's unmaintained.

---

## New dependency evaluation

Before adding a new dependency, answer:

- [ ] What problem does this solve?
- [ ] Could we solve it without a dependency? (Often yes for small problems.)
- [ ] What alternatives exist?
- [ ] Is the package actively maintained?
- [ ] What's the install size and bundle impact?
- [ ] What are the transitive dependencies? (Worth a quick scan.)
- [ ] What's the license?
- [ ] What's the security history?
- [ ] How replaceable is it?

Default: don't add. Add only when the value clearly exceeds the cost. The cost includes ongoing maintenance, not just installation.

---

## Dependency removal

When removing a dependency:

- [ ] Identify all usages (search the codebase)
- [ ] Replace each usage (with native code, another dependency, or a no-op)
- [ ] Remove from package.json or equivalent
- [ ] Update lockfile (run install)
- [ ] Verify tests pass
- [ ] Verify build size went down (or stayed the same)
- [ ] Document the removal in the changelog

Removed dependencies sometimes leave config files, CI hooks, or imports behind. Search broadly.

---

## Failure patterns

**No update cadence.** Dependencies drift. When you finally upgrade, it's painful. Set a cadence.

**Audit disabled in CI.** "Too noisy." Tune the audit, don't disable it. Whitelist known false positives explicitly.

**Pinning everything to exact versions.** Stops automatic patches. Misses security fixes. Use narrow ranges with a lockfile.

**Unpinned floating versions.** `latest` in production. Builds aren't reproducible. Lockfile required.

**Adding dependencies without review.** "I just needed a quick utility." Now there are 50 unused dependencies. Require review for new dependencies.

**Ignoring transitive dependencies.** A direct dependency pulls in 50 indirect ones. Each is supply chain surface. Audit the tree, not just the top level.

**Patching with major version bumps.** "Updating to fix a bug" but the update is a major version. Now you have unrelated breaking changes too. Be deliberate about the version of the fix.

**Vendor-bundled libraries.** Some dependencies vendor copies of other dependencies. They're not visible to the audit. Periodically check.

**Build-time dependencies treated as zero-risk.** Build tools have access to your code and credentials. Supply chain attacks target them. Treat with appropriate care.

**Fork without rebase plan.** Forking a dependency to fix something. Then you own it. Plan how to rebase or merge upstream changes, or commit to maintaining the fork.

**No license audit.** Project ships with a GPL dependency in a commercial product. Compliance issue. Audit licenses on add and quarterly.

**Update PRs piling up.** Dependabot PRs go unmerged for months. Either tune to fewer PRs or commit time to merging them.

---

## Output format

A dependency policy document includes:

- **Inventory:** current dependencies by category
- **Audit status:** open advisories, severity, plan
- **Policies:** cadence, SLA, pinning, approval
- **Tooling:** what's automated (Renovate, Dependabot, audit in CI)
- **License audit:** any concerns
- **Quarterly review schedule:** when this gets revisited

---

## Reference files

- `references/upgrade-checklist.md`: Step-by-step checklist for performing a major version upgrade of a critical dependency, from changelog reading to staged rollout.

# Major Version Upgrade Checklist

Step-by-step checklist for upgrading a critical dependency to a new major version. The work is in the prep, not the install.

---

## Phase 1: Decide whether to upgrade

- [ ] Read the changelog from current version to target version
- [ ] Read the migration guide (most major libraries publish one)
- [ ] Skim issues filed against the new version (early adopters surface problems)
- [ ] Note any other dependencies that may need to upgrade in tandem
- [ ] Estimate effort (hours, days, weeks?)
- [ ] Estimate risk (low/medium/high)
- [ ] Estimate value (security fix, new features, ecosystem support, etc.)

Decision: GO, DEFER, or SKIP.

**GO triggers:**
- Security fix only available in new major
- Current version losing support
- New version unblocks a needed feature
- Effort and risk are manageable

**DEFER triggers:**
- New version released within last 30 days (let early adopters surface bugs)
- Conflicts with active development
- No urgent driver

**SKIP triggers:**
- Maintenance discontinued; replace the dependency instead
- Migration effort exceeds the value
- A different replacement is the better path

---

## Phase 2: Prepare

### Branch

- [ ] Create a feature branch named for the upgrade (e.g., `upgrade/library-v3`)
- [ ] Don't mix the upgrade with other work; isolate it

### Read the changelog carefully

- [ ] List every breaking change between current and target version
- [ ] Note deprecations that affect your code
- [ ] Note new patterns or APIs you'll use after the upgrade

For each breaking change:
- Where does this affect our code?
- What's the migration path?
- Is there a codemod available?

### Search for usages

- [ ] Grep for every API surface used (function names, import paths)
- [ ] Identify call sites that need attention
- [ ] Identify tests that may break

For complex libraries, this can be the longest step. Be thorough.

### Check the ecosystem

- [ ] Plugins or related packages that depend on the library: do they support the new version?
- [ ] TypeScript types: are they updated?
- [ ] Documentation and examples in the wild: have they caught up?

---

## Phase 3: Upgrade

### Install

- [ ] Update the version in package.json (or equivalent)
- [ ] Update related packages (plugins, types, etc.) to compatible versions
- [ ] Run install, generate fresh lockfile
- [ ] Verify the install completes without errors

```bash
# Example
npm install library@^3.0.0
```

### Initial build

- [ ] Run the build
- [ ] Note every error and warning
- [ ] Don't fix anything yet; just inventory

### Inventory the breakage

Categorize each error:
- **Type errors:** API signatures changed
- **Import errors:** module structure changed
- **Runtime errors:** behavior changed
- **Test failures:** assumed behavior changed
- **Lint warnings:** patterns deprecated

This list is your work plan.

---

## Phase 4: Migrate

### Apply codemods first

If the library publishes codemods:

```bash
npx codemod-name path/to/code
```

Codemods handle the mechanical parts (renamed APIs, restructured imports). They're not perfect, but they reduce toil.

- [ ] Run codemods
- [ ] Review the diff (codemods can over-apply or under-apply)
- [ ] Commit the codemod changes separately

### Fix manual issues

For each remaining issue:
- [ ] Identify the root cause (what changed in the new version?)
- [ ] Apply the fix per the migration guide
- [ ] Verify tests pass for that area
- [ ] Commit incrementally (small commits, easy to revert)

### Update tests

- [ ] Tests using deprecated patterns: update to new patterns
- [ ] Tests that fail because behavior is different: investigate. Is the new behavior correct?
- [ ] Add tests for any new behavior you depend on

### Update documentation

- [ ] README references to the old version
- [ ] Internal docs and runbooks
- [ ] Comments referencing the old behavior

---

## Phase 5: Verify

### Local

- [ ] All tests pass (unit, integration, E2E)
- [ ] Build succeeds without warnings (or with only acceptable warnings)
- [ ] Lint passes
- [ ] Type check passes (if typed)
- [ ] No console warnings in dev mode that weren't there before

### Visual

For UI-affecting libraries:
- [ ] Visual regression tests (Chromatic, Percy, or similar) clean
- [ ] Manual smoke test of key user flows
- [ ] Check on multiple browsers/devices

### Performance

- [ ] Bundle size: comparable or better
- [ ] Build time: comparable
- [ ] Runtime performance: comparable on key paths

If bundle size or performance regresses meaningfully, investigate before merging.

### Compatibility

- [ ] Browser compatibility (if relevant) maintained
- [ ] Node version compatibility (if relevant) maintained
- [ ] Other dependencies still work with the new version

---

## Phase 6: Stage

For critical dependencies, don't go straight to production.

- [ ] Deploy to a staging environment
- [ ] Run automated tests against staging
- [ ] Smoke-test critical flows manually
- [ ] Watch monitoring for new errors
- [ ] Watch performance metrics for regressions
- [ ] Let it bake for at least 24 hours (longer for critical systems)

---

## Phase 7: Roll out

Strategy depends on the dependency and the risk:

### Low risk: standard deploy

- [ ] Merge the PR
- [ ] Deploy to production
- [ ] Watch monitoring for the next few hours
- [ ] Be ready to rollback

### Medium risk: feature flag or canary

- [ ] Behind a feature flag if applicable
- [ ] Deploy with traffic splitting (1% to new, 99% to old, if infrastructure supports)
- [ ] Gradually increase traffic
- [ ] Watch metrics at each step

### High risk: parallel run

- [ ] Run old and new side by side
- [ ] Compare outputs
- [ ] Switch over only when confident

---

## Phase 8: Monitor

For at least one week post-rollout:

- [ ] Error rates (compare to pre-upgrade baseline)
- [ ] Performance metrics
- [ ] User-reported issues
- [ ] Any unexpected behavior

If issues appear:
- [ ] Triage by severity
- [ ] Fix forward (most common)
- [ ] Or rollback (if severe)
- [ ] Document the issues for the next upgrade

---

## Phase 9: Document

After the upgrade is stable:

- [ ] Note the upgrade in the changelog
- [ ] Document any non-obvious migrations for future reference
- [ ] Update internal docs that referenced the old version
- [ ] If the upgrade was painful, write a note for next time
- [ ] Thank anyone who helped (especially open-source maintainers if they helped)

---

## Common gotchas

**Bundle size grows unexpectedly.** New version pulls in additional code or dependencies. Check the bundle analysis.

**Tests that "passed but didn't actually run."** Test infrastructure breaks silently in some upgrades. Verify tests are running, not just exiting clean.

**TypeScript types don't match runtime.** Sometimes types are updated but runtime isn't (or vice versa). Test runtime behavior, not just types.

**Server-side rendering breaks.** New version uses browser-only APIs. Check SSR if applicable.

**Tree-shaking changes.** Bundle includes more or different code. Verify what's actually shipped.

**Peer dependency conflicts.** Library A wants version X, library B wants version Y. Resolve carefully; sometimes requires upgrading multiple in tandem.

**Breaking changes in transitive dependencies.** The upgrade pulls in a new major of a transitive. The transitive's breaking changes affect you indirectly.

**API changes that compile but behave differently.** Same function name, different default behavior. Read the changelog.

**Migration guide assumes specific framework or stack.** If you use the library in a non-standard way, the guide may not cover your case. Adapt.

---

## When to abort

It's OK to abort an upgrade. Better to abort than ship a broken version.

Abort triggers:
- Migration effort blowing past estimate by 5x+
- Discovering critical incompatibilities mid-migration
- Finding that the new version has bugs blocking your use case
- Realizing the dependency itself is the problem (consider replacement)

After aborting:
- Keep the branch around for reference
- Document what you learned
- Schedule a retry when conditions are better, or pivot to replacement

---

## Reference for next time

After every major upgrade, capture:
- Total effort (hours)
- Surprises encountered
- Things that worked well
- Things to do differently

This becomes input to estimating the next major upgrade. Major upgrades happen periodically; the team gets better at them with practice and notes.

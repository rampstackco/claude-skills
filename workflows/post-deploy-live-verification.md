# Post-Deploy Live Verification

```
name:            Post-Deploy Live Verification
slug:            post-deploy-live-verification
tier:            forward-deployed (operations)
role:            fde
status:          template
score:           53 (demand 5, pain 5, differentiation 4, usability 5, connectors 5)
intent:          merged-is-not-live as a procedure: prove that what production serves
                 is what was approved, on every route that matters, before the change
                 is called done
when to use:     after every merge that changes anything a user or crawler sees; as
                 the standing final step of any pipeline that ships
when not to use: pre-merge checking (that is CI Prove-Gate Wiring's territory);
                 content-claim truth (Corpus Integrity and Correction); a live
                 regression from an already-promoted lane (Incident Response and
                 Lane Demotion, which this workflow's failures feed)
gap note:        this workflow's core is the tier's largest DECLARED CATALOG GAP;
                 most phases are inline procedure with qa-testing and seo-technical
                 as the nearest anchors. It is written to be runnable anyway.
```

## Connectors

```
connectors:
  - capability:  crawl.read
    access:      read
  - capability:  repo.change
    access:      write-held     # only for fixes the verification surfaces
```

Verification is read-only. Fixes it surfaces land held; deploy-platform actions (promoting, purging, redeploying) are human actions on the platform, outside these connectors by design.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills` then `/plugin install rampstack-skills@rampstack`
- The production domain, and the list of routes the change touched plus the routes that share templates or data with them.
- A way to read which build produced a served page (a deployment id, build hash, or asset fingerprint in the rendered HTML; every modern host embeds one).
- The approved state: the merged content, metadata, and values the pages are supposed to show.

## If a prerequisite is unmet

Any phase can find a required input, tool, access, or data source unavailable or unverifiable. When that happens, the sanctioned output is a report-blocked statement: what the phase required, what was actually verified or obtained, and where the run stops or continues degraded.

- A report-blocked statement satisfies the phase's done-when. Partial completion counts as completion when it is stated as partial.
- Fabricating, estimating, or interpolating a required number to satisfy a done-when is never sanctioned.
- A phase handed a report-blocked upstream treats it as its own unmet prerequisite and reports blocked in turn, rather than running on an input that does not exist.

## Phases

### Phase 1: Capture the expected state · lane: convergent (Tholo)

Skills: qa-testing (nearest anchor; procedure inline)
Capability class: deploy.expected-state (declared catalog gap)
Input: the merged change; the route list
Run:

    From the merged change, record what production should now show, per
    route: the content values that changed, titles and meta descriptions,
    canonical URLs, structured data, and at least one DISCRIMINATOR VALUE
    per route: something this deploy changed that the previous build could
    not be showing (new copy, a new derived count, a version string). Add
    the blast-radius routes: pages sharing the template, layout, nav, or
    data source with the changed ones, because deploys regress neighbors.
    Record the newest deployment or build identifier the platform reports.

Output artifact: the expected-state sheet (route, expected values, discriminator value, expected build id)
Done when: every touched and blast-radius route has expected values and a discriminator, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: verifying only the changed route. The route you edited is the one you will look at anyway; the regression ships on the sibling route nobody listed

### Phase 2: Production fetch and identity check · lane: gate (Basano)

Skills: qa-testing, seo-technical (anchors; procedure inline)
Capability class: deploy.live-verify (declared catalog gap)
Input: the expected-state sheet
Run:

    Fetch each route's PRODUCTION URL: not a preview, not a staging domain,
    not localhost, and not a browser with a warm cache. For each route,
    record: the discriminator value present or absent; the build identifier
    the served page embeds; title, meta description, canonical, social-share
    metadata, and structured data against expected; and status codes on the
    route and its internal links. Fetch twice with a short gap; a CDN can
    serve different edges different builds, and one fetch is a sample, not
    a verdict. Report per route: VERIFIED (discriminator present, build id
    current, values match), STALE (old build id or missing discriminator),
    or WRONG (current build, unexpected values).

Output artifact: the live report (verdict, evidence, build id per route, both fetches)
Done when: every route on the sheet has a verdict from production fetches, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: trusting the deploy dashboard. The platform saying the deployment succeeded is a claim about the build, not about what a given route serves; tool-reported success is not verified state, and only the rendered production URL is ground truth

### Phase 3: Discriminate the failure class · lane: convergent (Tholo)

Skills: none; this is the decision table (procedure inline; the discriminator pattern generalizes production incidents on an unnamed property)
Capability class: deploy.failure-discriminate (declared catalog gap)
Input: the live report, when any route is STALE or WRONG
Run:

    Apply the decision table. ALL routes stale on the same old build id:
    the deploy never promoted; the fix is platform-side promotion, not code.
    SOME routes current and SOME stale: route-level cache or incremental
    render staleness; the stale HTML was generated under the old build and
    is being served past the new deploy; the fix is a targeted purge or
    revalidation of those routes, and if a purged route goes stale again,
    its background regeneration is failing and the platform's function logs
    for that route are the next read. Routes CURRENT but WRONG: the defect
    merged; the fix is code, as a held change. State which class the
    evidence supports and what evidence would distinguish it further if
    ambiguous.

Output artifact: the failure-class finding with its evidence
Done when: every non-verified route has a named failure class or a named ambiguity with the next check specified, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: purge-and-hope. Purging a cache without knowing whether the deploy promoted treats two different diseases with one drug; when it happens to work, nothing was learned, and when it does not, the next hour is spent purging harder

### Phase 4: Route the fix · lane: divergent (human)

Skills: none; the actions here are deliberately human
Input: the failure-class finding
Run: promotion, purge, revalidation, and redeploy are performed by a person
    on the platform (these are production state changes, and they stay
    human). Code defects land as held changes (repo.change) for normal
    review. The human records what action was taken and against which
    failure class.
Output artifact: the action taken, recorded against the finding
Done when: the action for every non-verified route is taken or explicitly deferred
Operated-layer note: in an operated deployment the finding and the action land as an agreement-log row; a promoted lane whose deploys repeatedly land STALE is exactly the post_merge_outcome signal Incident Response and Lane Demotion consumes
Fails look like: the verification performing the platform action itself. The read side of this workflow can be trusted precisely because it cannot touch what it measures

### Phase 5: Re-verify and close · lane: gate (Basano)

Skills: qa-testing (anchor; procedure inline)
Capability class: deploy.live-verify (declared catalog gap)
Input: the expected-state sheet; the actions taken
Run:

    Re-run Phase 2 on every route that was not VERIFIED, same discipline:
    production URL, discriminator, build id, two fetches. The change closes
    only when every route on the sheet reads VERIFIED. Record the closure
    with the final build id per route. If this workflow runs as a pipeline's
    standing final step (it should), the closure record is the pipeline's
    definition of done.

Output artifact: the closure record (all routes VERIFIED, final build ids, timestamps)
Done when: all routes VERIFIED on production, and the closure record exists, or a report-blocked statement per the prerequisite-unmet rule
Fails look like: closing at merge, or closing on the first good fetch after a purge. Done is a property of what production serves, held across both fetches, on every route on the sheet

## Failure modes

- Preview verification: any fetch that is not the production URL proves nothing about production.
- Single-fetch verdicts: CDN edges disagree; two fetches minimum, and disagreement between them is itself a finding.
- Dashboard trust: deploy success and served state are different facts (Phase 2's inline failure).
- Sibling blindness: verifying only the edited route (Phase 1's inline failure).
- Purge-and-hope (Phase 3's inline failure).
- Missing discriminator: without a value only the new build can show, a stale page that happens to look right passes; the discriminator is what makes VERIFIED falsifiable.
- Merge-time closure: the change is done when production says so, not when the repo does.

## Worked example

Pending. Populates when this workflow is executed as written on a showcase-designated property. The verification core generalizes real post-merge passes on rampstack.co (rendered-state checks, cross-link verification, build-identity reads across two merges in one day); the failure-class decision table additionally generalizes production incidents on an unnamed property, including a route serving a twelve-day-old render while its sibling served current data. Status flips to validated when a run record links here.

## Boundaries

- CI Prove-Gate Wiring owns pre-merge gates; this workflow begins where CI ends, because CI runs against the build and this runs against the world.
- Incident Response and Lane Demotion consumes this workflow's repeated failures on promoted lanes; a STALE that recurs is an incident, not a verification note.
- Content Pipeline Phase 5 and Corpus Integrity Phase 5 are this workflow's content-shaped instances; they share the declared gap and the doctrine.

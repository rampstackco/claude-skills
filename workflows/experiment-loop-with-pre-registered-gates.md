# Experiment Loop with Pre-Registered Gates

```
name:            Experiment Loop with Pre-Registered Gates
slug:            experiment-loop-with-pre-registered-gates
tier:            forward-deployed (operations)
role:            fdm
status:          template
score:           43 (demand 4, pain 4, differentiation 3, usability 4, connectors 5)
intent:          Basano on the test design: the stopping rule, MDE, and sample-size math
                 pre-registered before any variant ships, the SEO safety of variants gated,
                 and the verdict computed only against the pre-registered rule
when to use:     a mechanism hypothesis worth a controlled test on a property with enough
                 traffic to power it
when not to use: finding the hypothesis in the first place (Conversion-by-Source Diagnosis);
                 a defect fix rather than a test (the ordinary held-fix flow)
validation note: gated on adequate traffic on a designated property; it holds at template
                 until a designated property has the traffic and a mechanism to test
```

## Connectors

```
connectors:
  - capability:  experiment.read
    access:      read
  - capability:  analytics.read
    access:      read
  - capability:  crawl.read
    access:      read            # variant SEO-safety checks on the built variant
  - capability:  repo.change
    access:      write-held      # the variant and its config land as held changes
```

The variant and its config land held; a human allocates traffic and launches. Traffic allocation is never an agent action. The verdict is computed against the pre-registered rule and nothing else.

## Prerequisites

- Claude with the catalog installed: `/plugin marketplace add rampstackco/claude-skills`
- A hypothesis from Conversion-by-Source Diagnosis (mechanism, expected effect, segment), or an equivalent stated the same way.
- Enough traffic in the target segment to power a test; if the segment cannot reach the sample the math requires, the honest outcome is not to run.
- The experiment platform (experiment.read) and the analytics that will measure the primary metric.
- A person who allocates traffic and launches; the workflow never does.

## Phases

### Phase 1: Intake · lane: convergent (Tholo)

Skills: analytics-strategy
Capability class: experiment.intake (substitute equivalents if off-catalog)
Input: the hypothesis from Conversion-by-Source Diagnosis (mechanism, expected effect, segment)
Run:

    Invoke analytics-strategy to frame the incoming hypothesis as a testable spec:
    the mechanism it claims (what about the page or offer would move the metric,
    and why), the expected effect size, the primary metric it would move, and the
    exact segment. A hypothesis that arrives as an aspiration rather than a
    mechanism goes back to Conversion-by-Source Diagnosis; this workflow tests
    mechanisms, not hopes. Produce the framed spec.

Output artifact: the framed experiment spec (mechanism, expected effect size, primary metric, segment)
Done when: the hypothesis is framed as a mechanism with an expected effect size, a primary metric, and a segment, or returned to Conversion-by-Source Diagnosis as too vague to test
Fails look like: testing an aspiration. "Improve the CTA" names no mechanism and predicts no effect, so whatever the test does, nothing is learned; the spec has to say why the gap exists before a test can falsify it.

### Phase 2: Pre-registration · lane: gate (Basano)

Skills: experiment-design, experimentation-analytics
Capability class: experiment.pre-registration (substitute equivalents if off-catalog)
Input: the framed experiment spec; the segment's available traffic
Run:

    Invoke experiment-design and experimentation-analytics to pre-register the
    test BEFORE anything ships: the stopping rule, the minimum detectable effect,
    the sample-size math the MDE and the segment's traffic imply, the primary
    metric, and the window. Write them down and freeze them. If the segment cannot
    reach the required sample in a reasonable window, the pre-registration verdict
    is "insufficient n, do not run", which is a respectable and final outcome, not
    a delay. Report the pre-registration, or the not-run verdict, with the math.

Output artifact: the frozen pre-registration (stopping rule, MDE, sample size, primary metric, window), or the "insufficient n, do not run" verdict with its math
Done when: the test is pre-registered with all five fields frozen, or it is declared underpowered and not run, with the sample-size math shown either way
Fails look like: shipping first and pre-registering after. A stopping rule and a metric written once the variant is believed in are fitted to the hope, and the test becomes a search for a number that agrees with it.

### Phase 3: Variant SEO-safety gate · lane: gate (Basano)

Skills: seo-technical
Capability class: experiment.seo-safety (substitute equivalents if off-catalog)
Input: the built variant (crawl.read); the pre-registration
Run:

    Invoke seo-technical against the built variant. Check that the variant is safe
    to serve to search: no cloaking risk (the variant does not show crawlers and
    users materially different content in a way search treats as deceptive),
    canonical consistency across the variant and the control, and no layout-shift
    or core-vitals regression the variant introduces. Report a verdict per check
    with the evidence. Report only.

Output artifact: the SEO-safety report (cloaking, canonical consistency, layout-shift, each with a verdict)
Done when: the variant carries a verdict on cloaking risk, canonical consistency, and layout-shift, all clear or the risk flagged
Fails look like: an experiment that wins by getting deindexed. A variant that trims the content search ranked for can lift the on-page metric while the page quietly falls out of the results, and the test would call that a win.

### Phase 4: Launch as a held config change · lane: divergent (human)

Skills: none; the launch and the traffic allocation are deliberately human
Input: the pre-registration and the passing SEO-safety report
Run: the variant and its experiment config land as a HELD change (repo.change).
    A person allocates traffic and launches the test; traffic allocation is never
    an agent action, because it is a live change to what real users see. The human
    launches against the frozen pre-registration, allocating exactly the design
    the math called for, and records the launch.
Output artifact: the launched experiment, recorded against its pre-registration, with the variant and config as held changes a human merged
Done when: the experiment is launched by a human at the pre-registered allocation, with the config held and merged by a person
Fails look like: an agent turning traffic on. Allocating traffic is a production act on real users, and it stays with a person the same way merging and deploying do.

### Phase 5: The verdict · lane: gate (Basano)

Skills: experimentation-analytics
Capability class: experiment.verdict (substitute equivalents if off-catalog)
Input: the running experiment's results; the frozen pre-registration
Run:

    Invoke experimentation-analytics to compute the verdict ONLY against the
    pre-registered rule, at the pre-registered point. The stopping rule decides
    when the test ends; interim looks are not stopping decisions, and a result
    that looks significant early is not a verdict until the pre-registered point.
    The primary metric is the one pre-registered, not whichever moved. Report the
    verdict (win, loss, or inconclusive) against the pre-registered rule, with the
    numbers. Report only.

Output artifact: the verdict against the pre-registered rule (win, loss, or inconclusive) with the numbers at the pre-registered point
Done when: the verdict is computed at the pre-registered point against the pre-registered primary metric and stopping rule, with the numbers attached
Fails look like: peeking, then stopping on a good look. Checking the test daily and stopping the day it crosses significance turns noise into a false win, because the more often you look, the more often chance alone crosses the line.

### Phase 6: Closeout · lane: convergent (Tholo)

Skills: experimentation-analytics
Capability class: experiment.closeout (substitute equivalents if off-catalog)
Input: the verdict; the original hypothesis and its Conversion-by-Source finding
Run:

    Invoke experimentation-analytics to close the loop. Route the verdict and the
    hypothesis outcome back to Conversion-by-Source Diagnosis as calibration: a
    hypothesis that won, lost, or came back inconclusive updates that workflow's
    hit-rate, which is what makes its next ranking better. If a winning variant is
    to consolidate into the live page, it re-enters the SEO-safety check on the
    consolidated version before it ships through the ordinary held-fix flow; the
    experiment never publishes itself. Record the closeout.

Output artifact: the routed verdict and hypothesis outcome to Conversion-by-Source Diagnosis, and the consolidation path (with its SEO-safety re-check) recorded where a variant won
Done when (public gate): the verdict and hypothesis outcome are recorded and routed to Conversion-by-Source Diagnosis, and any winning variant is queued for the ordinary held-fix flow with an SEO-safety re-check, not published from here
Operated-layer note: in an operated deployment the pre-registration, the verdict, and their agreement land as an agreement-log row; the verdict-versus-pre-registration agreement is what calibrates this lane (AGREEMENT-LOG.md)
Fails look like: shipping the winner without re-checking the consolidated version. A variant proven safe in isolation can regress SEO once it is merged into the real page with the rest of the layout, and the win does not carry a waiver for that.

## Failure modes

- Peeking (Phase 5's failure): interim looks becoming stopping decisions, which manufactures false wins.
- Post-hoc metric switching: reporting whichever metric moved instead of the pre-registered primary.
- Retrofitted pre-registration (Phase 2's failure): registering the rule after the variant is believed in.
- Shipping the winner without the SEO-safety re-check on the consolidated version (Phase 6's failure).
- Underpowered tests run anyway: ignoring the "insufficient n, do not run" verdict and running a test that cannot detect the effect; not-rankable is a verdict here too.
- An agent allocating traffic (Phase 4's failure): a production act on real users that stays human.

## Worked example

Pending. Populates when this workflow is executed as written on a designated property with adequate traffic to power a test; it holds at template until a designated property has both the traffic and a mechanism hypothesis to run. Status flips to validated when a run record links here.

## Boundaries

- Conversion-by-Source Diagnosis supplies this workflow's intake (its ranked hypotheses) and consumes its verdicts as calibration; the two form the diagnose-then-test loop, and neither runs the other's step.
- Revenue Tracking Integrity underwrites the measurement this workflow trusts: a verdict computed over a money path that does not survive redirects or consent is a verdict over noise.
- Content Pipeline with Prove Gates owns the publish path; a winning variant consolidates through the ordinary held-fix flow with an SEO-safety re-check, and the experiment never self-selects into publishing.

# Analytics platform comparison

Profiles of seven major experimentation platforms covering what each exposes, what each hides, and the gotchas in each. For MCP setup, auth, and example prompts, consult each platform's official documentation.

The categorization below is for analytics surface area specifically. All seven platforms are competent at running experiments; the difference is what they expose on the result panel and how the math under the hood handles edge cases.

---

## Statsig

**Statistical defaults.** Among the most rigorous in the category. Always-valid p-values (sequential testing) by default. CUPED variance reduction available and easy to enable. Delta method for ratio metrics. Comprehensive HTE analysis with pre-registered and exploratory modes.

**What is exposed.** Per-variant metrics with CIs, lift point estimate, always-valid p-value, sample size, variance reduction technique applied, guardrail status, segment results for pre-registered segments, time series of the lift across the test window.

**What can be hidden by default.** Some advanced configuration is buried in the UI; defaults are sensible but worth confirming. The "topline metrics" view simplifies away the CI in some contexts.

**Gotchas.**

- Always-valid p-values are wider than fixed-horizon by design. Teams new to sequential testing sometimes interpret "less significant" as "weaker effect" rather than "peek-safe math."
- The auto-generated guardrail metrics catch some categories well (latency, error rate) and miss others (business-critical metrics specific to your product). Augment with custom guardrails.
- The "experiment hub" view groups results across multiple experiments and can mask single-experiment subtlety.

**Where it shines.** Mid-stage to late-stage product teams running many concurrent experiments where peek-safety and variance reduction matter. The default rigor saves teams from common mistakes without requiring statistical expertise.

---

## PostHog

**Statistical defaults.** Solid for the open-source experimentation category. Frequentist by default; Bayesian available. Variance reduction via "stats engine" configuration. Sequential testing in some experiment types.

**What is exposed.** Per-variant metrics, CIs, p-values, sample size, time series, segment results.

**What can be hidden.** The newer "stats engine" updates change defaults across versions; what you see depends on the deployment version. Older deployments may use less-rigorous defaults.

**Gotchas.**

- Self-hosted vs cloud can differ in stats engine version. Confirm the version when interpreting numbers.
- The "winner" badge can appear on results that are technically significant but practically tiny. Always read the CI.
- Bayesian and frequentist views can coexist for the same experiment; use one consistently per experiment.

**Where it shines.** Teams that want experimentation embedded in their analytics platform rather than separate. PostHog's strength is the integration of feature flags, experiments, session recording, and product analytics in one place.

---

## Optimizely

**Statistical defaults.** Enterprise-grade rigor. Stats Engine includes sequential testing, ratio-aware variance estimation, and configurable significance thresholds. Long track record in the category.

**What is exposed.** Comprehensive per-variant statistics, configurable significance thresholds, sequential testing labels, sample size, segment analysis with pre-registration.

**What can be hidden.** Configuration depth means defaults vary by account setup. Confirm with the platform admin which defaults are in play for your project.

**Gotchas.**

- The classic Optimizely product (Web Experimentation) and the newer products (Feature Experimentation, Personalization) have different stats engines. Know which product your team is on.
- Enterprise pricing can mean limited license seats; non-statistician PMs sometimes work from screenshots taken by analysts, which loses interactive panel context.
- The "lift" display can default to relative percent without the absolute number; both matter.

**Where it shines.** Larger organizations with established experimentation practices, regulated contexts where the rigorous track record matters, and teams that need extensive personalization alongside experimentation.

---

## GrowthBook

**Statistical defaults.** Open-source-first, warehouse-native. Explicit choice between Bayesian and frequentist. Sequential testing via mSPRT. CUPED supported.

**What is exposed.** Per-variant metrics with CIs, lift, significance, variance reduction, guardrails, segment results.

**What can be hidden.** Because GrowthBook runs on top of your data warehouse, the metric definitions live in your SQL; verify them when reading results. A subtle metric query change can shift results without anyone noticing.

**Gotchas.**

- Warehouse latency affects how fresh the result panel is. A daily batch is common; treat panel data as up to one day stale.
- Custom metrics defined in SQL can drift from dashboard definitions of the same metric. Reconcile carefully.
- The "experiment health checks" surface assignment imbalance and other quality issues; pay attention when they fire.

**Where it shines.** Engineering-led teams that want experimentation tied directly to the warehouse and version-controlled metric definitions. The open-source core means full transparency on the math.

---

## Eppo

**Statistical defaults.** Best-in-class statistical defaults among the platforms. Bayesian and frequentist supported, with Bayesian as the default for most use cases. Sequential CIs available. CUPED supported. Delta method for ratio metrics. Strong HTE analysis.

**What is exposed.** Per-variant metrics with credible intervals (Bayesian) or CIs (frequentist), probability of being best, posterior distributions, lift, guardrails, segments.

**What can be hidden.** The Bayesian default produces "probability variant B is best" rather than a p-value, which can confuse stakeholders trained on frequentist conventions. Switch to frequentist if your team's vocabulary is p-value-based; do not switch mid-experiment.

**Gotchas.**

- Bayesian probabilities and frequentist p-values answer different questions; do not translate one into the other naively.
- Eppo's "decision support" feature recommends actions based on the result; treat the recommendation as input, not as the decision.
- Warehouse-native like GrowthBook; same caveats about metric definition drift.

**Where it shines.** Data-team-led organizations that want statistical rigor as a default. Eppo's design philosophy is "make it hard to do the wrong thing"; the defaults reflect that.

---

## Amplitude (Experiment)

**Statistical defaults.** Behavioral analytics first, experimentation second. Frequentist defaults; sequential testing available. Variance reduction supported.

**What is exposed.** Per-variant metrics with CIs, p-values, sample size, segment analysis, guardrails. Tightly integrated with Amplitude's behavioral analytics surface.

**What can be hidden.** Some statistical configuration options are less prominent than in Statsig or Eppo; defaults are reasonable but worth confirming.

**Gotchas.**

- Strength is the integration with behavioral analytics, not the rigor of the experimentation engine. For teams that prioritize statistical sophistication, the engine is competent but not the strongest.
- Amplitude's "insights" auto-generate from event data; the same flexibility that makes them useful makes it easy to slice into noise.
- Experiment results can be viewed alongside cohort and funnel analyses; this is powerful and risky (post-hoc cohort definitions are noise mining).

**Where it shines.** Product teams already invested in Amplitude for behavioral analytics. The integration of experiment results with the broader product analytics is the differentiator.

---

## Kameleoon

**Statistical defaults.** Frequentist with Bayesian options. CUPED and sequential testing supported. Strong personalization and AI-driven optimization features.

**What is exposed.** Per-variant metrics with CIs, p-values, lift, segments, guardrails.

**What can be hidden.** The personalization and AI optimization features can take experiment results and apply them automatically; verify which of your "experiments" are actually fully randomized A/B tests vs personalization rollouts.

**Gotchas.**

- The boundary between experiment and personalization can blur. Personalization decisions made by an AI engine are not the same as ship decisions made from a randomized A/B test.
- Less common in the US than the European market; documentation and community resources are more limited than for Statsig, PostHog, or Optimizely.
- Some advanced statistical features require specific subscription tiers.

**Where it shines.** Teams running heavy personalization alongside experimentation, particularly in the European market. The personalization features are differentiated; the experimentation engine is competent.

---

## Quick comparison

| Platform | Sequential testing | CUPED | Delta method | Bayesian option | Strongest for |
|---|---|---|---|---|---|
| Statsig | Default | Yes | Yes | Yes | Multi-team experimentation rigor |
| PostHog | Some types | Configurable | Yes | Yes | Embedded analytics + experiments |
| Optimizely | Yes | Yes | Yes | No (frequentist Stats Engine) | Enterprise + personalization |
| GrowthBook | Yes (mSPRT) | Yes | Yes | Yes | Warehouse-native, open source |
| Eppo | Yes | Yes | Yes | Default | Statistical rigor by default |
| Amplitude | Yes | Yes | Yes | Yes | Behavioral analytics integration |
| Kameleoon | Yes | Yes | Yes | Yes | Personalization-heavy contexts |

The platform choice is rarely the bottleneck on getting experimentation right. All seven are competent. The bottleneck is the design discipline (covered in the `experiment-design` skill), the interpretation discipline (covered in this skill), and the operational discipline of the flag layer (covered in the `feature-flagging` skill). Pick the platform that fits the team's existing stack and skill mix; spend the effort on the disciplines.

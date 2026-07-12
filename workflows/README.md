# Forward-deployed workflows

Operating workflows for forward-deployed roles running the engines inside a real company's pipeline and data stack. The skills catalog covers building a site once; this tier covers operating a deployed content and growth pipeline continuously. Same authoring contract, extended with role, status, connectors, and autonomy.

New here? Start with GETTING-STARTED.md.

Install the catalog these workflows invoke:

```
/plugin marketplace add rampstackco/claude-skills
```

## Tracks

Three tracks run the pipeline, and a cross-track pair spans them:

- Forward-deployed engineer (FDE): stands the pipeline up and keeps its data and deploys honest.
- Forward-deployed marketer (FDM): runs the content and experimentation loop through prove gates.
- Forward-deployed analyst (FDA): owns the numbers, the attribution, and the diagnosis loops.
- Cross-track: Incident Response and Lane Demotion, and Autonomy Review. These operate over every track, one on the event of a regression and one on a periodic cadence.

## The status ladder

The ladder is this tier's spine. A workflow's status says what has actually happened to it, not how good the document reads.

- template: designed, not executed as written.
- validated: executed as written, by the engines, on a showcase-designated property, with a PUBLIC linked run record; manual runs the workflow merely describes do not count.
- hardened: validated plus failure modes documented from real incidents; explicitly the home of demotion and post_merge_outcome regression data, so hardened is earned by surviving events, not by prose.

Every shipped file below enters at template. Content Pipeline with Prove Gates is the first to flip: Run 1 executed it end to end on a designated property, so its status is validated with the run record linked, the evidence landing before the claim.

## The merge doctrine

Checks report and fail, engines propose and stop, a human merges; autonomy is earned per lane under the published doctrine, never asserted.

## The set

WORKFLOWS.lock is the canonical manifest and the source for any count. The table is the list. Shipped files link; the rest are defined here and publish in later waves.

| Workflow | Track | Status |
|---|---|---|
| [Post-Deploy Live Verification](post-deploy-live-verification.md) | FDE | template |
| [Data Surface Integrity](data-surface-integrity.md) | FDE | template |
| Migration with Verification | FDE | defined, publishing |
| [CI Prove-Gate Wiring](ci-prove-gate-wiring.md) | FDE | template |
| [Warehouse Data Plane Standup](warehouse-data-plane-standup.md) | FDE | template |
| [Content Pipeline with Prove Gates](content-pipeline-prove-gates.md) | FDM | validated |
| [Corpus Integrity and Correction](corpus-integrity-and-correction.md) | FDM | template |
| [Link Graph and Metadata Parity Audit](link-graph-and-metadata-parity-audit.md) | FDM | template |
| Regulated-Content Compliance Gate | FDM | defined, publishing |
| Experiment Loop with Pre-Registered Gates | FDM | defined, publishing |
| [Traffic-Drop Triage](traffic-drop-triage.md) | FDA | template |
| [Conversion-by-Source Diagnosis](conversion-by-source-diagnosis.md) | FDA | template |
| [Revenue Tracking Integrity](revenue-tracking-integrity.md) | FDA | template |
| [Incident Response and Lane Demotion](incident-response-and-lane-demotion.md) | cross | template |
| [Autonomy Review](autonomy-review.md) | cross | template |

## Roadmap: named, not launched

- AI-Surface Visibility Baseline (FDM): fails connector readiness honestly; ships when citation-measurement has real runs.
- Attribution and Outcome Reporting (FDA): fails honest usability at template status; ships when the agreement log has real cross-property rows and post_merge_outcome data.
- Forward-deployed product manager track (FDPM): named to hold the track; not launched, and carried with the same visible not-launched treatment so it cannot read as an empty shipped track.

## The docs in this tier

- CONNECTORS.md: the capability classes every workflow declares, the deliberate absences, and the operated-substrate boundary.
- AGREEMENT-LOG.md: the public schema for the agreement log the operated deployment writes, generalized from the canonical agreement-rate table.

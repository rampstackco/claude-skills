# Applying JTBD to prioritization

Prioritizing roadmap candidates by jobs. Identifying which jobs are done badly. The framing that cuts through feature-list politics.

JTBD's contribution to prioritization is grounding the debate in user motivation rather than feature requests or stakeholder volume. Pairs with `roadmap-planning` for the broader prioritization discipline.

---

## The job-led prioritization frame

Each roadmap candidate gets evaluated by the jobs it addresses.

**The questions.**

- Which jobs is the product currently doing badly?
- Which roadmap candidates address those jobs vs adjacent or unrelated work?
- Which jobs matter most to the product's strategy and user base?
- What is the cost of addressing each candidate vs the value of the job improvement?

**Why this frame works.**

- It grounds prioritization in what users are trying to accomplish, not in what features they happen to have requested.
- It cuts through stakeholder politics: a roadmap candidate's value is measured against jobs, not against who is requesting it.
- It makes "we should not build this" defensible: candidates that do not address a load-bearing job get deprioritized clearly.

**The compose-with-strategy discipline.** Job-led prioritization is downstream of strategy. The team needs to know which jobs matter for the product's market position; not all jobs are equally strategic. Pair with broader strategy work for the upstream framing.

---

## Identifying jobs the product does badly

The starting point for job-led prioritization.

**The methodology.**

- For each major job the product is meant to serve, evaluate how well it currently does the job.
- Use multiple inputs: user research (struggling moments, fire criteria), support data (where users hit friction), competitive analysis (where alternatives are stronger), in-product analytics (where users abandon).
- Score or rank jobs by how well they are currently served. Jobs done badly are candidates for prioritization investment.

**Worked example.** A team productivity SaaS evaluating four core jobs:

- Job A (creating tasks): well-served. Low priority for new investment.
- Job B (collaborating on tasks across teams): partially served. Some friction; alternatives are stronger; users describe workarounds.
- Job C (reporting on team progress): poorly served. High struggling-moment frequency; users export to spreadsheets; competitive products do this better.
- Job D (integrating with external tools): partially served. Friction at scale; mid-size customers describe pain.

The badly-served jobs (B, C, D) are candidates for prioritization. Job A is not a fertile area for new investment.

---

## Mapping roadmap candidates to jobs

Each roadmap candidate gets associated with the jobs it addresses.

**The mapping.**

- Roadmap candidate: "Build cross-team task assignment with permissions."
  - Job addressed: Job B (collaborating across teams).
  - Job impact: addresses the core friction users describe; closes the gap with stronger alternatives.

- Roadmap candidate: "Add custom report builder."
  - Job addressed: Job C (reporting on team progress).
  - Job impact: enables the reporting users currently export to spreadsheets to do.

- Roadmap candidate: "Build mobile app for task creation."
  - Job addressed: Job A (creating tasks) on mobile context.
  - Job impact: extends a well-served job to a context where it currently is not served. Useful but not addressing a struggling job.

- Roadmap candidate: "Redesign sidebar navigation."
  - Job addressed: unclear. Possibly across multiple jobs.
  - Job impact: hard to evaluate without clarification on which job this serves.

**The fourth example signals a problem.** Roadmap candidates that do not clearly address a specific job often get prioritized on internal preferences rather than user value. The job mapping forces clarity: what job does this candidate serve, and how badly is that job currently being done?

---

## The "no job, no priority" discipline

Roadmap candidates that do not clearly address a job tied to user motivation often should not be prioritized.

**The pattern.**

- Candidate: "Migrate to a new internal framework."
  - Job addressed: none directly; serves engineering velocity.
  - Disposition: may be valuable for engineering reasons; do not prioritize on user-job grounds. If the team values engineering velocity, prioritize it on that basis explicitly.

- Candidate: "Add dark mode."
  - Job addressed: weak (some users describe preference).
  - Disposition: low job-priority unless dark mode addresses an emotional dimension of jobs the team is also addressing.

- Candidate: "Improve admin permissions."
  - Job addressed: depends on which segment is asking. For enterprise: addresses fire criteria around compliance. For small teams: weak job impact.
  - Disposition: prioritize for the segment whose job it serves; do not generalize.

**The discipline.** Surface the job each candidate addresses (or does not). Candidates that do not serve jobs may still be valuable but should be prioritized on different grounds. The candidates the team can defend on jobs are the ones with the clearest user-value case.

---

## Prioritization across jobs

Different jobs have different strategic weights. The roadmap should reflect the strategy.

**The questions.**

- Which jobs are most load-bearing for the product's market position?
- Which jobs are most differentiated from competitors? (Where addressing the job better produces lasting advantage.)
- Which jobs serve the segments the strategy is targeting?
- Which jobs are growing in importance based on market trends?

**Worked example.** A team productivity SaaS in mid-market growth:

- Job B (cross-team collaboration): high strategic weight. Mid-market customers grow into multi-team workflows; the product needs to scale with them.
- Job C (reporting): high strategic weight. Mid-market customers need reporting that small-team customers did not require.
- Job D (integration): medium strategic weight. Important for retention; less differentiating than B and C.
- Job A (task creation): low strategic weight for new investment. Already served; not where competitors are winning.

The strategic weighting biases the roadmap: B and C get more capacity than D; D gets more than A.

---

## The "what job is this serving" review for in-flight work

Job-led prioritization applies to existing work, not just new candidates.

**The review.**

- Take in-flight roadmap items.
- For each, ask: what job is this serving? How well does the work address that job?
- Items that cannot articulate a clear job may be candidates for re-scoping or cancellation.

**The honest case.** Many roadmap programs accumulate work that started for reasons unrelated to user jobs (engineering preference, executive request, "we said we would"). The job review surfaces these and creates space to reconsider.

**The kindness.** The review is not aimed at blame; sometimes work was committed before the team had the JTBD framing. The cure is reconsidering, not punishing.

---

## Avoiding the JTBD-prioritization-religion failure

JTBD as prioritization framework can become rigid in ways that hurt the team.

**Patterns to avoid.**

- Mandatory job-mapping for every roadmap item, including small bug fixes. The framework becomes overhead for low-value items.
- Treating job-impact estimates as precise numbers. Job-impact is often qualitative; pretending precision misleads.
- Over-weighting JTBD to the exclusion of other prioritization inputs. Strategic, technical, and operational considerations matter alongside jobs.

**The discipline.** Use JTBD where it adds clarity to prioritization debates. Do not force the framework where it adds overhead without value.

---

## Worked prioritization example

A quarterly roadmap review at a team productivity SaaS.

**Available capacity.** 5 large initiatives.

**Candidates with job mapping.**

1. Cross-team task assignment with permissions (Job B; high impact; high strategic weight).
2. Custom report builder (Job C; high impact; high strategic weight).
3. Mobile app for task creation (Job A on mobile; medium impact; low strategic weight).
4. Sidebar redesign (no clear job; serves general usability).
5. Slack integration upgrade (Job D; medium impact; medium strategic weight).
6. Onboarding redesign (multiple jobs; high impact on hire criteria for new customers).
7. Admin role overhaul (Job D for enterprise; high impact for that segment; matches enterprise expansion strategy).
8. Migration to new search backend (technical; serves multiple jobs indirectly).

**Prioritization decision (5 of 8).**

- Cross-team task assignment (1): yes. Top job priority.
- Custom report builder (2): yes. Top job priority.
- Onboarding redesign (6): yes. High hire-criteria impact.
- Admin role overhaul (7): yes. Enterprise strategy alignment.
- Migration to new search backend (8): yes. Technical foundation; serves multiple jobs.

**Deferred.**

- Mobile app for task creation (3): Job A is well-served on desktop; mobile is convenient but not high-priority.
- Sidebar redesign (4): no clear job. Reconsider for next cycle if a specific job emerges.
- Slack integration upgrade (5): Job D is medium-priority; can wait a quarter.

**The defense.** The decisions can be explained on jobs and strategy. Stakeholders who pushed for items that did not make the cut can hear a clear rationale. The cut items can be reconsidered next quarter against jobs at that point.

---

## Common JTBD-prioritization failures

**Job-mapping all candidates without segmenting strategic weight.** Jobs treated as equal; the team picks based on impact estimates that obscure which jobs actually matter for strategy.

**No job assigned to many candidates.** The team treats job mapping as optional; non-mapped candidates get prioritized on volume of requests or stakeholder preference.

**Job-impact precision theater.** Numerical scores for job impact (Job B: 8/10) when the underlying assessment is qualitative. Decisions look quantitative but are not.

**Forcing all decisions through JTBD.** Some decisions (technical migrations, strategic bets) do not benefit from JTBD framing. Force-fitting produces bad decisions.

**JTBD as cover for predetermined prioritization.** The team ranks items by JTBD theater after deciding what to prioritize on other grounds. The framework becomes documentation rather than decision input.

---

## Methodology-level choices that stay in the public skill

The job-led prioritization frame. Identifying jobs done badly. Mapping candidates to jobs. The "no job, no priority" discipline. Strategic weighting across jobs. The in-flight work review. Avoiding JTBD-religion. Worked prioritization example. Common failures.

## Implementation choices that stay internal

Specific roadmap-tracking tools. Specific scoring rubrics for job impact. Specific stakeholder-review formats. Specific job-strategic-weight reviews. The team's own conventions for prioritization meetings. These vary by team and tooling.

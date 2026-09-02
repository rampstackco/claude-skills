# Categorization and tagging at scale

Taxonomy that emerges from data. Tooling at volume. Periodic taxonomy review.

How feedback gets organized when it arrives at high volume. The discipline that prevents the "we tagged everything but cannot find patterns" failure.

---

## The taxonomy dimensions

Each feedback item gets tagged across multiple dimensions.

**Feature area or product surface.** Where in the product the feedback applies. Examples: onboarding, dashboard, billing, integrations, mobile app.

**Issue type.** Bug, friction, feature request, positive signal, edge case.

**User segment.** Who is providing the feedback. Examples: free tier, pro tier, enterprise, trial, churned.

**Severity or urgency.** How blocking is the issue. Examples: critical (blocks core flow), high (significant friction), medium (workaround exists), low (minor).

**Source channel.** Where the feedback came from. Examples: support ticket, NPS comment, in-app widget, sales call, social mention, customer council.

**Date or time period.** When the feedback was submitted. Useful for drift detection.

Most programs use 3-6 of these dimensions. More dimensions produce richer queries; more dimensions also increase tagging burden.

---

## Tags emerge from data, not from a pre-built taxonomy

The same principle as discovery research synthesis (see `discovery-research-synthesis`).

**The pattern.** Tags emerge from feedback patterns. Initial tagging captures what users actually said; the taxonomy builds up from the data.

**The anti-pattern.** Pre-built taxonomies that force feedback into categories. Patterns the taxonomy did not anticipate get missed; categories that do not match the data get used anyway.

**Why emergent tagging matters.**

- Users describe issues in their own language; pre-built categories often miss the actual issues.
- New product features generate new categories; emergent tagging adapts.
- Issues evolve over time; emergent tagging captures the evolution.

**The transition.** Programs starting feedback aggregation often need a starting taxonomy to begin with. The starting taxonomy is provisional; it gets refined as feedback accumulates and patterns clarify.

---

## Multiple tags per feedback item

Most feedback items deserve multiple tags.

**The pattern.** A single feedback item often touches multiple feature areas, issue types, or context dimensions.

**Worked example.** Support ticket: "I'm an enterprise admin trying to set up SSO for the team and the configuration step keeps timing out."

Tags:

- Feature area: SSO configuration, admin settings.
- Issue type: bug (timeout) + friction (configuration is hard).
- User segment: enterprise.
- Severity: high (blocks core enterprise setup).
- Source channel: support ticket.

Multiple tags capture the feedback's full context. Single-tag forcing loses information.

---

## Tagging at volume

Programs receiving 500-2000+ feedback items per week need tooling support.

**Tooling approaches.**

- **Manual tagging.** Each item tagged by a human. Highest quality; lowest scale. Works for low-volume programs (under 100 items per week).
- **AI-assisted tagging.** AI suggests tags; humans review and adjust. Scales better; quality depends on the AI's training and the team's review discipline.
- **Automated tagging.** AI tags without human review. Scales highest; quality is lowest because no one validates.
- **Hybrid.** Manual tagging for high-priority items (enterprise feedback, critical issues), AI-assisted for the bulk.

**The recommended pattern for most programs.** AI-assisted tagging with human review on patterns. The AI handles bulk classification; humans review aggregate patterns and validate that the categorization is producing useful signal.

**The volume calibration.**

- Under 100 items/week: manual tagging is feasible and preferred.
- 100-500 items/week: AI-assisted with sample review.
- 500+ items/week: AI-assisted with pattern review; manual handling reserved for high-priority items.

---

## Tag quality vs tag granularity

Two competing pressures.

**Granularity helps.** More specific tags surface more specific patterns. "Onboarding configuration step 3 friction" is more useful than "onboarding friction."

**Granularity also harms.** More specific tags fragment data. If 10 different tags split what should be one pattern, the pattern is invisible.

**The middle path.**

- Start with moderate granularity.
- Refine over time. Tags that consistently co-occur may need to merge; tags that combine distinct patterns may need to split.
- Periodic taxonomy review (see below) catches granularity issues.

---

## Periodic taxonomy review

Quarterly or bi-annual review of the taxonomy.

**The questions.**

- Are there tags that consistently co-occur and could merge?
- Are there tags that contain multiple distinct patterns and should split?
- Are there new patterns that need new tags?
- Are there tags that no longer apply (deprecated features, resolved issues)?
- Is the taxonomy too granular (fragmenting patterns) or too coarse (hiding patterns)?

**The output.** A revised taxonomy. Old tags may get retired; new tags may get added; some tags may get renamed.

**The discipline.** Without periodic review, taxonomies decay. Old tags accumulate; new patterns get tagged into wrong categories; the taxonomy stops surfacing useful patterns.

**The frequency.** Quarterly works for most programs. Annual works for stable programs with low product change rate. Bi-annual works as a middle path.

---

## Tag conflicts and resolution

Sometimes feedback could be tagged in multiple ways.

**Resolution approaches.**

- **Multi-tagging.** When in doubt, apply multiple tags. Captures the ambiguity rather than forcing a choice.
- **Convention.** Document conventions for ambiguous cases. "Friction with the dashboard's filter functionality" gets tagged "dashboard" + "filtering" + "friction" rather than choosing.
- **Reviewer judgment.** Train reviewers (human or AI) on conventions. Ambiguous cases get reviewed for consistency.

**The cost of inconsistent tagging.** Patterns become invisible because the same kind of feedback gets tagged differently. The "we tagged everything but cannot find patterns" failure often traces to inconsistent tagging.

---

## Tag distribution as signal

The distribution of tags across feedback can be informative beyond individual tags.

**Examples.**

- Spike in volume on a specific tag: trending issue or feature area in flux.
- Decline in volume on a tag: issue resolved or users gave up reporting.
- Co-occurrence patterns: tags that consistently appear together suggest related issues.
- Segment-specific tag distributions: enterprise vs free-tier feedback patterns differ.

**The dashboard view.** Most feedback aggregation tooling supports tag-distribution dashboards. The dashboards surface patterns the team would not see in individual feedback items.

---

## Tagging discipline at the channel level

Different channels need different tagging conventions.

**Support tickets.** Often pre-tagged by the support system (issue type, product area). Augment with feedback-specific tags.

**NPS comments.** Lighter tagging. Often just sentiment + topic area. Open-ended comments are mined for patterns; not every comment needs comprehensive tagging.

**In-app feedback.** Auto-tagged by context (which page, which feature). Augment with issue-type and severity.

**Sales calls.** Often summarized rather than tagged at the moment level. Summaries get tagged.

**Social mentions.** Auto-classified by sentiment and topic; manual review for high-impact mentions.

**Customer council notes.** Manually tagged after each council session. Higher tagging investment because volume is low and signal is high.

---

## Cross-channel tag consistency

Tags should mean the same thing across channels.

**The risk.** "Onboarding friction" in support tickets means something slightly different than "onboarding friction" in NPS comments because the channels surface different aspects.

**The mitigation.**

- Document tag definitions explicitly. "Onboarding friction" includes X, Y, Z signals.
- Periodic cross-channel calibration. Review tagged samples from each channel to ensure consistency.
- Channel-specific sub-tags where appropriate. "Onboarding-friction-support" vs "Onboarding-friction-nps" if the distinction matters.

**The honest framing.** Cross-channel tag consistency is hard. Strong programs work toward it; perfect consistency is rare.

---

## Common tagging failures

**Pre-built taxonomy forced.** Patterns the taxonomy did not anticipate get missed.

**Single-tag forcing.** Multi-dimensional feedback gets reduced to one tag; information lost.

**Inconsistent tagging.** The same kind of feedback gets tagged differently across reviewers or time periods.

**Tag bloat.** Too granular; patterns fragment across many tags.

**Tag coarseness.** Too broad; distinct patterns hide within the same tag.

**No taxonomy review.** Tags decay over time without periodic review.

**Volume overwhelms tagging.** High-volume programs without tooling support; tagging falls behind; old feedback never gets tagged.

**Tag-without-purpose.** Tagging happens because it is supposed to; nobody uses the tags for synthesis.

---

## Methodology-level choices that stay in the public skill

The taxonomy dimensions. Emergent tagging. Multi-tag discipline. Tagging at volume (manual, AI-assisted, automated, hybrid). Tag quality vs granularity tradeoffs. Periodic taxonomy review. Tag conflict resolution. Tag distribution as signal. Channel-specific tagging. Cross-channel consistency. Common failures.

## Implementation choices that stay internal

Specific tagging tools and AI models. Specific tag definition documents. Specific reviewer training. Specific dashboard configurations. The team's own conventions for tagging within the principles. These vary by team.

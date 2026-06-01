# Entry-point architecture patterns

How visitors land vs how they're routed. Common entry points and their routing.

The funnel architecture maps entry points (where visitors arrive) to segments and paths (what they do next). Without entry-point architecture, every visitor goes through the same first experience regardless of where they came from.

---

## The entry-routing principle

Each entry point has expected segments and stages. The first action available at the entry point should match those expectations.

**The win.** A visitor arrives via an ad about "B2B SaaS pricing." The landing page serves consideration-stage pricing content. The first available action is a pricing calculator and a demo CTA. The entry point's routing matches the visitor's likely intent.

**The fail.** Same visitor arrives via the same ad. The landing page is the homepage. The visitor lands in awareness-stage content with no clear next step. The mismatch costs the conversion.

The discipline. Each entry point's first experience matches the visitor's likely segment and stage.

---

## Common entry points

The entry points most growth programs work with.

**Paid landing page.** Visitor arrives via paid ad (search, social, display). High intent; specific to the ad's promise.

Expected segment: usually narrow (the ad targeted specific audience).
Expected stage: usually consideration or decision (paid traffic is rarely awareness-stage).
Routing: landing page should serve the ad's specific promise; next-step action should match consideration or decision stage.

**Organic content page.** Visitor arrives via search or content discovery; awareness or research stage.

Expected segment: variable (organic search may surface multiple audience types).
Expected stage: usually awareness or early consideration (research-driven).
Routing: content should serve the search intent; secondary CTAs offer movement toward consideration.

**Direct or returning visitor.** Visitor arrives by typing URL or via bookmark; often returning.

Expected segment: variable (depends on prior interactions).
Expected stage: variable (could be any stage).
Routing: homepage should provide multiple entry paths to different segments and stages; navigation matters more than single CTA.

**Referral.** Visitor arrives via partner or word-of-mouth; warmer than paid.

Expected segment: variable (depends on referral source).
Expected stage: usually consideration or decision (referrals indicate active interest).
Routing: page should match the referral context; next-step action should reflect the warmth (free trial, demo, talk to sales often work).

**Social.** Visitor arrives via social post; awareness or interest.

Expected segment: variable (depends on social audience).
Expected stage: usually awareness (social discovery is rarely buying intent).
Routing: page should serve the social post's promise; soft CTAs (follow, subscribe, learn more) often work better than hard sells.

**Tool entry.** Visitor arrives via a calculator, quiz, or chatbot directly (often via shared link or specific tool URL).

Expected segment: matches the tool's audience.
Expected stage: usually consideration (the tool is a consideration-stage artifact).
Routing: tool should serve its specific value; next-step actions should connect tool output to broader funnel.

---

## Entry-point routing patterns

How to route each entry point.

**Pattern A: Direct match.** Entry point routes directly to a specific landing page and CTA. Simple; works when the entry point's segment and stage are well-defined.

**Pattern B: Routing layer.** Entry point routes to a routing page that asks 1-2 questions and then sends to the matched destination. Useful when the entry point's segment is variable.

**Pattern C: Personalized landing.** Entry point routes to a landing page that adapts based on visitor attributes (source, behavior, profile). Sophisticated; requires personalization infrastructure.

**Pattern D: Quiz-as-router.** Entry point routes to a quiz that segments and recommends. Detail in `quiz-and-assessment-design`.

The choice depends on entry-point variability and infrastructure. Most programs start with Pattern A and add complexity as data shows the need.

---

## Entry-point and segment matching

Each entry point likely surfaces specific segments.

**The discipline.** For each entry point, document the expected segments. The first experience should serve those segments.

**Worked example.**

- Entry point: paid ad targeting "data analytics for SaaS."
- Expected segments: data analysts and data leaders at SaaS companies.
- Expected stage: consideration.
- Routing: landing page on data analytics for SaaS; calculator showing ROI; CTA to demo.

The match is deliberate. Visitors arriving via this entry point get a first experience that fits their segment and stage.

---

## Entry-point and stage matching

The first experience should match the visitor's likely stage.

**Common mismatches.**

- Awareness-stage visitor lands on a hard-sell decision-stage page; bounces because not ready.
- Decision-stage visitor lands on awareness-stage content; bounces because oversold on what they already know.
- Consideration-stage visitor lands on either; serves the wrong intent.

**The cure.** Match the entry point's expected stage to the page's stage. Awareness pages serve awareness traffic; decision pages serve decision traffic.

---

## Multi-entry funnels

When the same visitor arrives via different entry points across visits.

**The pattern.** A visitor sees an ad on Tuesday (paid entry); reads a blog post on Wednesday (organic entry); types the URL on Thursday (direct entry). Each entry point may surface a different first experience.

**Architecture implications.**

- Personalization across visits requires identity threading.
- Nurture sequences may need to acknowledge prior visits.
- Cross-channel attribution becomes important.

**The discipline.** Architecture should accommodate multi-entry without confusion. The visitor's progression through the funnel respects their cumulative interactions, not just the latest entry.

---

## Entry-point measurement

Track per-entry-point performance.

**The metric.** Per entry point: visitors, segment composition, stage composition, conversion to next action.

**Diagnostic uses.**

- Entry points with low conversion: routing may be mismatched.
- Entry points with high conversion: investigate what is working; replicate to other entries.
- Entry points whose segment composition does not match expectations: the source may have shifted; review.

---

## Entry-point and audience-segment audit

Periodically audit entry-point routing.

**The audit.**

- For each entry point: what segments and stages are arriving?
- Does the first experience match those segments and stages?
- Is conversion at this entry point above or below baseline?

**The drift.** Entry points decay as ad targeting shifts, content rankings change, partners evolve. Quarterly audit catches the drift.

---

## Entry-point anti-patterns

**The single-funnel-for-every-entry.** All visitors go through the same first experience regardless of entry. Routing not matching segments or stages.

**The over-personalized-entry.** Entry routing so specific that maintenance is impossible; many entries route to landing pages that exist only for one entry source.

**The mismatched-entry.** Entry expects one segment; landing page serves a different one. Conversion suffers.

**The unmeasured-entry.** Per-entry data not tracked; routing decisions are guesswork.

**The orphan-entry.** Entry point exists; no landing page or routing defined; visitors land somewhere generic.

---

## Common entry-point failures

**One landing page for everyone.** Different entry points get the same first experience; routing not matching variability.

**Wrong stage routing.** Awareness traffic gets decision-stage CTAs; decision traffic gets awareness content.

**Personalization without infrastructure.** Architecture designed for personalization that the team cannot actually implement.

**Entry-point drift.** Entry sources shifted; routing not updated.

**Single-tool entry.** Only one tool serves an entry point; if the tool fails, the entry has no recovery.

**Entry-conversion attribution missing.** Cannot tell which entry points produce which downstream conversion.

---

## Methodology-level choices that stay in the public skill

The entry-routing principle. Common entry points (6 patterns). Entry-point routing patterns (4 patterns). Entry-point and segment matching. Entry-point and stage matching. Multi-entry funnels. Entry-point measurement. Audit cadence. Anti-patterns. Common failures.

## Implementation choices that stay internal

Specific entry points for specific programs. Specific routing logic per entry. Specific landing pages per entry. The team's audit calendars. These vary by team and program.

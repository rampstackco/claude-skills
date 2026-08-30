# Quiz anti-patterns

The patterns that look like quizzes but degrade trust. Anti-patterns are easy to ship; the cost shows up in lead quality, downstream conversion, and brand reputation over time.

---

## The clickbait-quiz

The pattern. Engagement-driven framing with no actionable segmentation. "What kind of marketer are you?" with 4 personality types and no recommendations.

The signal. Engagement metrics are high (shares, completions); downstream metrics are flat. The quiz is fun; it does not produce qualified leads or conversions.

The cost. The build cost is wasted on entertainment that does not compound business value. The brand earns "fun but not useful" association.

The cure. Add actionable segmentation. Each segment maps to a specific recommendation matched to that segment. Detail in `references/result-to-recommendation-mapping.md`.

---

## The vanity-result quiz

The pattern. Flattering descriptions for every segment. No honest characterization. No specific recommendations.

The signal. Takers enjoy the result; do not act on it; do not return. The quiz produces a moment of attention without a relationship.

The cost. The audience associates the brand with horoscope-style content. The quiz does not differentiate the brand from competitors offering similar entertainment.

The cure. Honest segmentation. Some segments are more flattering than others; honest descriptions produce respect; recommendations that match each segment specifically produce action.

---

## The forced-result quiz

The pattern. Every taker routes to the same recommendation regardless of answers. The segmentation is decorative; the recommendation was predetermined.

The signal. Sales team or product team notices that quiz-sourced leads all look the same; the segmentation is not differentiating.

The cost. The quiz misleads the audience. Takers who answered honestly believing they would get a matched recommendation get a generic one; trust degrades.

The cure. Real segmentation that produces real different recommendations per segment. If the brand only has one recommendation, do not use a quiz format; use a clear landing page.

---

## The interrogation-quiz

The pattern. 25 questions that feel like a survey rather than a quiz. The audience drops off mid-quiz.

The signal. High drop-off rate, especially at questions 8-15. Few takers reach the result.

The cost. The build effort produces a quiz few people complete. The audience that drops off remembers the brand as the source of the long form they abandoned.

The cure. Reduce question count. 5-12 questions is the working range. Audit questions for those that do not affect segmentation; remove them.

---

## The leading-question quiz

The pattern. Questions phrased to push the taker toward a specific result. "Don't you sometimes wish you had..." is leading.

The signal. The result distribution is biased; takers report that the result felt predetermined; analytical audiences notice the leading.

The cost. The audience that catches the leading loses trust. The result is artificially produced rather than reflecting the taker's actual situation.

The cure. Plain phrasing without bias. "How would you describe your experience with X?" beats "How much do you struggle with X?"

---

## The black-box quiz

The pattern. No explanation of how the result was determined. The taker gets a label with no insight into why.

The signal. Audience comments asking how the result was calculated; some takers question whether the result is real or random.

The cost. The quiz feels arbitrary. Even when the segmentation is real, the audience cannot verify; trust suffers.

The cure. Some transparency about the methodology. "Your result reflects your answers to questions 2, 4, and 6" or a brief explanation of what the segments represent.

---

## The no-recommendation quiz

The pattern. Result categories exist; no next step is offered. The quiz produces awareness of the segment without action.

The signal. Strong engagement; near-zero downstream conversion; the quiz captures a moment without converting it.

The cost. The brand has the audience's attention and does nothing with it. The quiz produces brand impression without business impact.

The cure. Every result page must include a specific next step. Detail in `references/result-to-recommendation-mapping.md`.

---

## The mismatched-recommendation quiz

The pattern. The recommendation does not match the segment. A taker classified as "enterprise" gets a "starter plan" recommendation, or vice versa.

The signal. Sales team feedback that quiz-sourced leads do not match the recommended product. Audience feedback that the recommendation felt wrong.

The cost. Trust damage. The taker who notices the mismatch feels misled; the brand earns "doesn't get me" reputation.

The cure. Audit the segment-to-recommendation mapping. Verify each segment's recommendation actually fits.

---

## The over-segmentation quiz

The pattern. 12+ segments produced from 5 questions. Most segments end up similar; segmentation is fake.

The signal. Segments that read the same; segments that get the same recommendation; segments that receive less than 3 percent of takers each.

The cost. Design and copy effort wasted on segments that do not really exist. The audience that lands in similar segments cannot tell them apart.

The cure. Reduce segment count to what the questions can actually distinguish. 4-7 segments from 5-7 questions; 6-8 segments from 8-10 questions.

---

## The under-segmentation quiz

The pattern. 2 segments that could have been a yes/no question. The quiz format is over-engineering.

The signal. The audience completes the quiz quickly; the result feels obvious; the quiz adds friction without adding value.

The cost. Build effort wasted on a quiz that did not need to be a quiz. The audience that recognizes the over-engineering questions the brand's judgment.

The cure. Either expand the segmentation to justify the format or replace the quiz with a simpler tool (yes/no qualifier, comparison table).

---

## The lead-trap quiz

The pattern. The result is calculated but hidden behind an email gate. The taker enters 8 fields, hits Calculate, sees "enter your email to see your result."

The signal. Email-form conversion is high; downstream conversion is low; audience that recognizes the pattern bounces immediately.

The cost. Lead quality suffers. The brand earns "lead-trap" reputation. Detail in `references/lead-capture-integration-patterns.md`.

The cure. Show the result freely; gate the additional value (PDF, follow-up sequence) instead.

---

## The cookie-cutter quiz

The pattern. The quiz looks and behaves like every other quiz from a template platform. Generic UI, generic question style, generic result format.

The signal. The quiz does not differentiate; the audience does not associate it specifically with the brand.

The cost. The quiz becomes commodity. The brand's investment does not compound credibility because the tool does not stand out.

The cure. Custom design that reflects the brand. Question phrasing in brand voice. Result presentation that feels distinct.

---

## The mobile-broken quiz

The pattern. Quiz works on desktop; breaks on mobile. Answer options that overflow; sliders impossible to grab; result hidden below the fold.

The signal. High mobile bounce rate; mobile completion drops below desktop.

The cost. The mobile audience either bounces or has a worse experience that misrepresents the brand. Mobile is often the majority of traffic.

The cure. Mobile-first design and testing. Detail in `references/question-architecture-patterns.md` (mobile section).

---

## The popup-interrupted quiz

The pattern. The result loads; the user starts reading; a popup appears asking for email or offering a different magnet.

The signal. Bounce rate spikes at the result moment; users complain about the interruption.

The cost. The quiz's user experience is hostile. The brand earns "annoying" reputation.

The cure. Offers in context with the result, not as popups that interrupt.

---

## The orphan-quiz

The pattern. The quiz exists; no follow-up sequence; no integration with the broader funnel. Takers complete; nothing happens.

The signal. Email captures sit on a list with no engagement; downstream conversion is near zero.

The cost. The lead-capture work was for nothing. The brand has emails but no relationship.

The cure. Design the post-quiz sequence as part of the quiz design (similar to the lead-magnet sequence discipline in `lead-magnet-design`).

---

## The everyone-quiz

The pattern. Quiz designed to appeal to "everyone." Generic segments; generic recommendations.

The signal. Conversion may be high; lead quality is low; downstream conversion is mixed because the audience is too broad to serve coherently.

The cost. List grows fast; sequence engagement underwhelms; offers convert poorly.

The cure. Narrow the audience the quiz serves. Specific quizzes for specific segments produce specific recommendations that convert.

---

## How to detect anti-patterns in a portfolio

Audit cadence. Quarterly review of every active quiz, looking specifically for these anti-patterns.

**Audit questions per quiz.**

- Does each segment have a specific, distinct recommendation (anti-pattern check: forced-result, mismatched-recommendation)?
- Is segment distribution balanced across takers (anti-pattern check: over-segmentation, under-segmentation)?
- Is drop-off concentrated at specific questions (anti-pattern check: interrogation, leading questions)?
- Does the result page include a clear next step (anti-pattern check: no-recommendation, vanity-result)?
- Is the result accessible without email gate (anti-pattern check: lead-trap)?
- Does the quiz feel branded or templated (anti-pattern check: cookie-cutter)?
- Does the quiz work on mobile (anti-pattern check: mobile-broken)?

**The retire decision.** Anti-pattern quizzes often warrant retirement. Maintaining them costs more than the diminishing returns they produce.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing for each. Cures matched to anti-patterns. The audit cadence and audit questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped historically and the lessons learned. Specific portfolio audit results. Specific retirement decisions and successor-quiz plans. The team's audit calendar and reviewer list. These vary by team.

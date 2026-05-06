# Synthesis review and validation

How synthesis gets pressure-tested before it drives decisions. Review and validation surface synthesis errors that the research team missed: fabricated patterns, projected interpretations, missing dissent, segment misreads.

The discipline is making review non-negotiable. Synthesis that ships without review carries unacknowledged blind spots; review compresses those blind spots before the synthesis becomes the team's working document.

---

## Internal review with research participants where possible

**The principle.** Show the synthesis to a subset of the research participants. Do they recognize themselves and their experiences in the patterns?

**Why participant review matters.**

- Participants are the only authoritative source on whether the synthesis represents their experience.
- Misrecognition signals fabrication: the synthesis projected interpretations the data did not support, or named patterns that did not match what participants actually said.
- Recognition validates the synthesis: participants endorse the patterns as accurate representations.

**The mechanics.**

- Send the synthesis (or relevant excerpts) to 3-5 research participants for review.
- Ask: "Do these patterns reflect your experience? Anything missing? Anything the synthesis got wrong?"
- Build participant recognition into the research design from the start (with consent for follow-up review).

**The exception.** Some research types (large-scale survey, anonymous in-app feedback) do not support participant review at the individual level. For those, validation depends on aggregate quantitative checks (the next section).

**The honest disclosure.** When participant review surfaces misrecognition, the synthesis revises rather than dismissing the feedback. Synthesis that dismisses participant pushback is reverting to confirmation bias.

---

## Adjacent-team review

**The principle.** Show the synthesis to product, engineering, support, sales. Do the patterns match what they observe in their domains?

**Why adjacent-team review matters.**

- Adjacent teams have ground-truth observations the research did not access. Support sees the friction users hit every day; sales hears prospect objections; engineering knows which problems are technically tractable.
- Adjacent teams catch synthesis errors that the research team missed: patterns that contradict what support handles daily, implications that ignore engineering constraints.
- Adjacent teams' alignment with synthesis affects whether the synthesis drives decisions: if support disagrees with the support-related patterns, the synthesis loses authority.

**The mechanics.**

- Share the synthesis with relevant adjacent-team leads for review.
- Hold a structured review session where adjacent teams can challenge, validate, or extend the patterns.
- Capture adjacent-team observations as inputs to synthesis revision.

**Common adjacent-team feedback patterns.**

- Support: "Your synthesis names X as a pattern, but support tickets show Y is also load-bearing and not in the synthesis."
- Sales: "Prospects do say what your synthesis claims, but the patterns you missed are the pricing-conversation friction."
- Engineering: "The implication you propose has a constraint the synthesis did not account for."

The synthesis revises in light of these inputs.

---

## Quantitative validation where possible

**The principle.** Patterns from qualitative synthesis can often be validated at scale through analytics, survey, or in-app data.

**The validation pattern.**

- Synthesis says: "Users abandon configuration step 3 because credit card details are not accessible at signup."
- Quantitative validation: pull analytics on configuration step 3 abandonment rate. Does the data confirm 40% abandonment that the pattern implies? Does abandonment correlate with the credit card requirement (versus other possible causes)?
- If the data confirms: the pattern is strongly supported.
- If the data does not confirm: the pattern needs revision; the qualitative signal may not generalize.

**Why validation matters.**

- Qualitative patterns can overstate frequency; small-sample interview signal does not always match large-sample reality.
- Quantitative validation grounds synthesis in scaled data without requiring the synthesis to be quantitative-only.
- Validation reveals which patterns are strong enough to act on and which need more investigation.

**See `experiment-design`** for rigorous A/B testing as quantitative validation. **See `product-analytics-setup`** for the instrumentation that makes validation possible.

**The honest disclosure.** When quantitative validation contradicts qualitative patterns, the synthesis adjusts. Patterns the analytics does not support get downgraded or removed. Synthesis that ignores quantitative pushback in favor of qualitative claims is unrigorous.

---

## The "challenge the synthesis" session

**The principle.** A specific session where adjacent teams try to find what the synthesis missed, overstated, or railroaded.

**The session structure.**

- Synthesis owner presents the patterns and implications (15-30 minutes).
- Adjacent-team participants challenge: "What patterns did the research miss? What implications overstate the data? What decisions is the synthesis trying to railroad?"
- Synthesis owner takes notes; does not defend; the session is for surfacing concerns, not for resolution in the moment.
- Synthesis owner revises based on the inputs over the following days; revised synthesis circulates back.

**Why this works.**

- Productive disagreement strengthens synthesis. The team that surfaces concerns is contributing to better synthesis, not undermining the research investment.
- The session creates space for honest pushback that quieter review formats sometimes suppress.
- The session signals that synthesis is open to challenge, which strengthens the team's trust in the synthesis once it ships.

**The anti-pattern.** Synthesis owners who treat the session as defense of the synthesis rather than as input to the synthesis. The owner pushes back on every challenge; adjacent teams disengage; synthesis ships unrevised.

**The discipline.** The synthesis owner's job in the session is to listen and capture, not to defend. Defense happens in the revision; pushback happens later, after considering the input.

---

## Iterate before publishing

**The principle.** Synthesis goes through revision based on the review loop. Synthesis that ships in first-draft state usually carries unacknowledged blind spots.

**The iteration cycle.**

- First draft from the synthesis owner.
- Participant review (where possible).
- Adjacent-team review (always).
- Challenge-the-synthesis session.
- Revision based on inputs.
- Final review by senior product leader for clarity and quality.
- Publication.

**Time investment.** The review-and-iteration loop adds 1-2 weeks to the synthesis timeline. That investment is small relative to the cost of publishing synthesis with blind spots that produce wrong decisions.

**Common iteration outputs.**

- Patterns split (the original pattern was actually two patterns adjacent teams distinguished).
- Patterns merged (the original separation was not load-bearing).
- Patterns revised (the framing did not match the data on closer review).
- Implications expanded (additional implications surfaced during review).
- Implications narrowed (some implications overstepped what the data supports).
- Decision input refined (the original was too vague to drive decisions).

---

## When the review loop reveals the synthesis cannot be saved

**The honest case.** Sometimes review surfaces synthesis problems too deep to fix in revision: patterns built on insufficient data, projections the data did not support, framing that adjacent teams flatly contradict.

**The response.**

- Stop. Do not publish synthesis with known significant problems.
- Re-examine: was the underlying research adequate? Was the synthesis sequence run completely? Were the patterns named with conviction or projected?
- Restart from where the breakdown happened. Often returns to clustering or pattern-naming.
- Sometimes returns to gathering more research. The honest case is acknowledging that the discovery cycle did not produce sufficient input for reliable synthesis.

**The cost calibration.** Restarting synthesis costs PM time. Publishing flawed synthesis costs the team's trust in research output, plus the wrong decisions the flawed synthesis drives. The latter is usually more expensive.

---

## What review does not do

**Review does not validate every synthesis.** Some synthesis fails review and should not ship; some passes with revision; some passes with minor adjustment. Review is the discipline that distinguishes the cases.

**Review does not eliminate disagreement.** Adjacent teams may continue to disagree even after review. The synthesis owner makes the final call after considering inputs. Disagreement preserved in the published synthesis is fine and honest; pretended consensus is not.

**Review does not slow shipping artificially.** A 1-2 week review loop on substantive synthesis is appropriate. Quick-turn synthesis (short audits, focused interview batches) can run a lighter review (asynchronous comments from 2-3 reviewers; adjacent-team check; ship).

---

## Common review-and-validation failures

**Skipping participant review.** Synthesis ships without participants ever seeing the patterns; participants would have caught misrecognitions; the synthesis carries projection.

**Skipping adjacent-team review.** The team most likely to know the data is wrong did not see the synthesis before publication.

**Defensive review sessions.** The synthesis owner argues against challenges instead of capturing them; the session produces defense rather than input.

**Quantitative validation skipped.** The qualitative patterns went unchallenged by available analytics data; the synthesis overstates patterns the data does not support.

**Iteration compressed to one round.** First draft + one review + ship. Most synthesis benefits from two rounds of revision: first round on substance, second round on presentation.

**Review feedback dismissed.** Adjacent teams raise concerns; synthesis owner notes them but does not revise. Synthesis ships as if the feedback did not happen.

---

## Methodology-level choices that stay in the public skill

The participant review pattern. The adjacent-team review pattern. Quantitative validation. The challenge-the-synthesis session. Iteration discipline. The cannot-be-saved escalation. What review does and does not do. Common review failures.

## Implementation choices that stay internal

Specific reviewer pairings and roles. Specific session formats and facilitation. Specific revision tracking. Specific publication conventions. Specific quantitative validation pipelines. The team's own conventions for review-loop length. These vary by team.

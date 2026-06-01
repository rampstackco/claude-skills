# Channel types and what each surfaces

Six common feedback channels with strengths, weaknesses, biases, and synthesis implications. Each channel surfaces different signal at different reliability; strong aggregation triangulates across channels.

---

## Channel 1: Support tickets

What users hit when things break or confuse them.

**What support surfaces.**

- Functional friction (where the product breaks down for users).
- Documentation gaps (questions users ask repeatedly).
- Feature requests that arrive in the form of complaints.
- Edge case failures.
- Confusion about intended behavior vs actual behavior.

**Strengths.**

- High volume; signal accumulates from many users.
- Grounded in specific user contexts (the user was trying to do something specific).
- Captures friction users actually encountered, not friction they speculated about.

**Weaknesses.**

- Bias toward users willing to contact support. Users who silently leave the product do not appear here.
- Bias toward fixable issues. Users who struggle but figure it out (or give up) without contacting support are invisible.
- Sentiment skew: users contact support when frustrated; positive experience is underrepresented.

**Synthesis implications.**

- Support volume on a feature area is a strong signal of friction; absence of volume is weak signal of satisfaction.
- Pattern-detection across tickets reveals systemic issues better than individual tickets.
- Combine with usage analytics: a feature with high support volume and low usage suggests broken value; high support volume and high usage suggests meaningful friction in something users still want.

---

## Channel 2: NPS surveys

Aggregate sentiment toward the product or specific features.

**What NPS surfaces.**

- Aggregate sentiment trend lines.
- Distribution between promoters, passives, and detractors.
- Open-ended comments (often the most useful part).
- Sentiment differences across segments.

**Strengths.**

- Quantitative signal that aggregates across many users.
- Trends over time reveal whether sentiment is improving or degrading.
- Open-ended comments provide qualitative depth.
- Industry-standard metric makes benchmarking possible.

**Weaknesses.**

- Response bias. Users with strong opinions (positive or negative) respond at higher rates than users in the middle.
- Cultural and segment biases in scoring (some segments score lower on average than others for cultural reasons).
- The 0-10 scale loses granularity; many decisions need more than promoter/passive/detractor categorization.
- Surveys on specific features can have small sample sizes that produce noisy signal.

**Synthesis implications.**

- NPS as a single number is less useful than NPS distribution and trend.
- Open-ended comments are often the highest-value section; mine them for patterns.
- Segment-specific NPS is more actionable than aggregate NPS.
- Single-quarter NPS shifts can be noise; multi-quarter trends are more reliable signal.

---

## Channel 3: In-app feedback

Friction at the moment users encounter it.

**What in-app feedback surfaces.**

- Contextual friction (the user was at a specific moment in the product when they submitted).
- Ratings or sentiment scoped to specific features or flows.
- Quick observations users would not bother to file as a ticket.

**Strengths.**

- Captures the moment. Friction is fresh; context is automatic (the system knows where the user was).
- Lower friction submission than support tickets; surfaces issues users would not formally report.
- Volume varies; some products see high in-app feedback, others minimal.

**Weaknesses.**

- Bias toward users who interact with the feedback widget. Some segments use it heavily; others rarely.
- Quality varies. Quick submissions are often shallow.
- Volume can overwhelm if the widget triggers too aggressively.

**Synthesis implications.**

- In-app feedback is best for detecting moment-specific friction.
- Pair with usage analytics: where users submit feedback in the product is informative.
- Filter by submission length and pattern; one-word submissions ("frustrating!") are weak signal compared to specific submissions ("I expected the export to include the filters I had applied; it did not").

---

## Channel 4: Sales calls

Pre-purchase prospect perspective.

**What sales calls surface.**

- Objections prospects raise (what makes the sale hard).
- Pricing-conversation patterns and price sensitivity by segment.
- Competitive mentions (which competitors are top-of-mind, what differentiation prospects ask about).
- The gap between marketing positioning and what sales actually leads with.
- Prospect vocabulary for describing their situation (often different from internal product language).

**Strengths.**

- Prospect view of the product before they have invested in it. Reveals what attracts and what blocks adoption.
- Competitive intelligence in the form of comparisons prospects make.
- Hire criteria signal (why prospects would choose the product).

**Weaknesses.**

- Bias toward prospects, not existing customers. Existing-customer experience differs.
- Sales-team interpretation can color how calls are tagged.
- Stage selection matters: early-stage discovery calls reveal different things than late-stage closing calls.

**Synthesis implications.**

- Sales call data informs positioning, pricing, and adoption-hire-criteria decisions.
- Combine with existing-customer feedback to understand the full lifecycle.
- Lost-deal analysis (specifically, calls with prospects who did not buy) is a separate research mode that surfaces what the product would need to win.

---

## Channel 5: Social mentions

Public commentary about the product.

**What social mentions surface.**

- Public sentiment in real time.
- Comparison to competitors (often more honest than survey responses).
- Use cases and use contexts the team did not anticipate.
- Reputation signals (how the product is perceived in the broader market).

**Strengths.**

- Real-time signal.
- Public visibility means the team can respond to issues that affect brand reputation.
- Captures users who post publicly but would not file feedback through formal channels.

**Weaknesses.**

- Bias toward users willing to post publicly. Often skews toward enthusiasts (positive) or angry (negative); middle-ground users are quiet.
- Volume can overwhelm; signal-to-noise ratio is low.
- Anonymous accounts complicate weighting (who is this person? are they a real customer?).
- Platform algorithms shape what is visible; the visible signal is not the full signal.

**Synthesis implications.**

- Social signal is one input, rarely a primary driver. Triangulate with other channels.
- Track reputational themes (what the product is known for in the broader market).
- Respond to specific issues that affect brand reputation; do not use social as the primary feedback prioritization channel.

---

## Channel 6: Customer councils

Curated panels of customers in structured forums.

**What customer councils surface.**

- Curated customer perspective on strategic questions.
- Deep discussion that reveals motivations and priorities.
- Cross-customer patterns (council members compare notes; the team sees what they share).
- Long-term relationship signal (council members commit time and engagement).

**Strengths.**

- High-quality feedback from selected customers.
- Structured forum makes discussion deeper than ad-hoc feedback.
- Council members often become advocates and references.

**Weaknesses.**

- Bias depends on selection. A council selected for size, role, or vocal customers will skew accordingly.
- Council members are often outliers (engaged, willing to commit time); their perspective may not represent broader users.
- Small sample size (usually 5-30 members); patterns from one council are weak signal.
- Cost: councils require curation, scheduling, and ongoing relationship management.

**Synthesis implications.**

- Council feedback is valuable but limited; do not treat as representative of the full user base.
- Use councils for strategic discussions, not for tactical prioritization.
- Council patterns can be a leading indicator of broader user patterns; validate with other channels.

---

## Channels not covered here

Some feedback channels are out of scope for this skill but worth naming.

**Beta participants.** Covered by `beta-program-management`. Beta feedback is bounded to the beta period; this skill covers ongoing streams.

**Discovery research interviews.** Covered by `discovery-research-synthesis`. One-off research projects, not always-on streams.

**App store reviews.** A specific channel for consumer products. Similar dynamics to social mentions: public, biased toward strong opinions, real-time but volume-heavy.

**Customer success quarterly business reviews.** Often produce structured customer feedback; can be treated as a council-like channel for top customers.

**Internal employee feedback.** Sometimes valuable (employees are users of internal tools, or use the product alongside customers); always biased toward internal context.

---

## Cross-channel triangulation

Patterns that appear across channels are stronger than patterns from a single channel.

**Worked example.** A feature area showing:

- Support tickets: increasing volume in this area.
- NPS comments: this area mentioned negatively in detractor comments.
- In-app feedback: friction submissions in this area.
- Sales calls: prospects asking about this area as a comparison point against competitors.

The cross-channel pattern is stronger than any single-channel signal. The feature area is a load-bearing issue across multiple lenses.

**Worked counter-example.** A loud single-channel signal:

- Social mentions: vocal complaints about a feature.
- Support tickets: minimal volume on the same feature.
- NPS: feature not flagged in detractor comments.
- Sales calls: feature not raised by prospects.

The cross-channel pattern shows the social signal is loud but not load-bearing. Loud-on-one-channel-only is often vocal-minority signal.

---

## Channel reliability calibration

Different channels have different reliability for different kinds of decisions.

**Functional friction decisions.** Support tickets and in-app feedback are most reliable. NPS is moderate. Social and sales are less reliable.

**Adoption hire-criteria decisions.** Sales calls are most reliable. Support tickets and in-app feedback are less reliable (existing-customer bias).

**Positioning decisions.** Sales calls and social mentions are most reliable (prospect/public perception). NPS and councils are moderate.

**Strategic prioritization.** Customer councils and NPS trends are useful inputs. Support tickets indicate friction but not strategic priority.

**Reputation decisions.** Social mentions are direct signal. Support and NPS are indirect.

The discipline. For each decision, identify which channels are most reliable. Weight accordingly.

---

## Methodology-level choices that stay in the public skill

The six channel types with strengths, weaknesses, biases, and synthesis implications. Channels not covered. Cross-channel triangulation. Channel reliability calibration for different decision types.

## Implementation choices that stay internal

Specific tooling per channel. Specific tagging schemas. Specific integration patterns across channels. The team's own conventions for channel coverage. These vary by team and tooling.

# Frequency vs intensity

The two dimensions of feedback signal. The four-quadrant matrix and prioritization implications.

Feedback signal varies along two dimensions: how often the same feedback recurs (frequency) and how strongly users feel about it (intensity). The combination produces a matrix that informs prioritization.

---

## The two dimensions

**Frequency.** How often the same feedback recurs across users.

- High-frequency feedback: many users describe the same issue. Suggests broad applicability.
- Low-frequency feedback: rare or unique observations. Suggests narrow applicability or edge cases.

**Intensity.** How strongly the user feels.

- High-intensity feedback: users describe the issue as severely disruptive ("I cannot use the product because of this"), or describe satisfaction as transformative ("This feature changed how my team works").
- Low-intensity feedback: minor friction ("Slightly annoying") or mild satisfaction ("It's fine").

The two dimensions are independent. High frequency does not imply high intensity; high intensity does not imply high frequency.

---

## The four-quadrant matrix

### Quadrant 1: High frequency, high intensity

**Top priority.** Many users hit this; it matters to them.

**Examples.**

- A bug that affects core flow for many users.
- A friction point users describe as "I almost canceled because of this."
- A feature gap that users repeatedly cite as a competitive disadvantage.

**The disposition.** Address quickly. The combination of broad impact and high stakes warrants priority investment.

### Quadrant 2: High frequency, low intensity

**Papercuts.** Many users hit this but it is minor.

**Examples.**

- A confusing button label that users figure out within seconds.
- A slight delay in a flow that users tolerate.
- A small visual inconsistency.

**The disposition.** Address in batches. Individual papercuts are minor; cumulatively they erode experience. Periodic "papercut sprints" address many at once.

**The risk of ignoring papercuts.** Papercuts compound. Users who tolerate one papercut leave when they accumulate. The cumulative experience is worse than the sum of individual papercuts.

### Quadrant 3: Low frequency, high intensity

**Affected users deeply impacted but few.** Often segment-specific.

**Examples.**

- A bug that affects users in a specific configuration that 5% of customers use, but for those users it is blocking.
- A feature gap that prevents enterprise customers from passing compliance review.
- An accessibility issue that excludes a specific user group entirely.

**The disposition.** Depends on segment importance and reversibility.

- If the affected segment is strategically important: high priority.
- If the affected segment is marginal: lower priority but documented.
- If the issue is a complete blocker for the affected users (cannot use the product at all): often warrants urgency regardless of segment size.

### Quadrant 4: Low frequency, low intensity

**Noise.** Capture; do not action individually.

**Examples.**

- One-off observations from users with unusual contexts.
- Minor preferences that one user mentions.
- Edge cases nobody else encounters.

**The disposition.** Note in the system. Do not invest action on individual items. Aggregate sometimes reveals patterns; the noise can become signal if patterns emerge.

---

## Frequency assessment

How to assess frequency.

**Quantitative signals.**

- Number of distinct users reporting the same issue across channels.
- Volume of feedback items in the relevant tag or category.
- Trend over time: is the frequency increasing or stable?

**Cautions.**

- Volume can reflect channel bias rather than actual frequency. A loud single user generating 50 tickets is not high-frequency feedback (50x).
- Channel coverage matters. If a feedback channel only reaches a subset of users, frequency in that channel does not reflect frequency across all users.

**The cross-channel triangulation.** Issues that show up across multiple channels are higher-frequency than issues that appear in one channel only.

---

## Intensity assessment

How to assess intensity.

**Verbal signals.**

- Strong language: "I cannot use this," "This is unacceptable," "I love this," "This changed my workflow."
- Specific impact descriptions: "I lost 3 hours," "This made my quarterly review possible," "I missed a deadline."
- Workaround intensity: heavy workarounds suggest high-intensity friction; light workarounds suggest low-intensity.

**Behavioral signals.**

- Churn correlation: users with feedback in a category churn at higher rates.
- Engagement correlation: users with positive feedback in a category engage more.
- Escalation patterns: users escalating to higher support tiers or to executive contacts signal high intensity.

**Cautions.**

- Some users naturally use stronger language than others.
- Cultural differences affect verbal intensity.
- Triangulate verbal and behavioral signals.

---

## The matrix in practice

Worked example: a feedback aggregation review for a product team's quarterly planning.

**Top-of-list items (high frequency, high intensity).**

- Onboarding configuration step 3 abandonment (broad signal across support, NPS comments, in-app feedback; users describe it as "I almost gave up").
- Mobile app stability issues (frequent mobile crashes; users describe them as blocking).
- Enterprise admin role limitations (consistent across enterprise sales calls and support tickets; described as compliance blockers).

**Papercut batch (high frequency, low intensity).**

- Inconsistent button labeling across the product.
- Slow page transitions in the dashboard.
- Filter resets when navigating between views.
- Date format inconsistencies.

**Strategic-decision items (low frequency, high intensity).**

- Specific accessibility issues affecting screen reader users.
- Compliance gaps for healthcare-segment customers (small segment but blocking for them).
- Bug affecting users in specific timezone configurations (5% of users, but blocking).

**Noise-watch (low frequency, low intensity).**

- Various individual feature requests with no aggregate pattern.
- Cosmetic preferences mentioned by single users.

The team's quarterly planning weights the four quadrants differently:

- Top-of-list: included in the next quarter's roadmap.
- Papercut batch: scheduled for a dedicated sprint.
- Strategic decisions: discussed at strategy review for prioritization.
- Noise-watch: captured but not actioned.

---

## When the matrix is misapplied

Common matrix misuses.

**Volume as proxy for frequency.** Loudest-voice users generate volume that does not reflect distinct-user frequency.

**Intensity assessed only verbally.** Some users complain loudly about minor issues; some users underreport severe ones. Triangulate verbal and behavioral signals.

**Quadrant 4 dismissed too quickly.** Some apparent noise is early-signal of patterns that will grow. Periodic review of low-frequency items catches emerging patterns.

**Quadrant 3 generalized to quadrant 1.** Strategic-segment issues weighted as if they affected all users. Or marginal-segment issues weighted as if they were strategic.

**Frequency-only or intensity-only prioritization.** Looking at one dimension misses the matrix.

---

## Frequency over time

Frequency dimensions can shift over time.

**Increasing frequency.** Issue is worsening, user base is growing, or reporting awareness is increasing. Investigate the cause.

**Decreasing frequency.** Issue is resolving, users are giving up reporting, or the user base shifted. The decreasing frequency may not mean problem solved.

**Stable frequency.** Issue is recurring at consistent rate. May indicate steady-state or chronic issue.

The drift detection (see `detecting-drift-in-feedback.md`) covers temporal changes in feedback signal.

---

## Intensity at scale

Intensity assessments at high feedback volume.

**The challenge.** Reading every piece of feedback to assess intensity is impractical at high volume.

**The approach.**

- Sample-based intensity assessment. Read a sample; characterize the intensity distribution.
- Behavioral signal as proxy. Churn rates, escalation patterns, support-tier escalations.
- AI-assisted intensity classification. AI flags high-intensity feedback for human review.

**The discipline.** Even at high volume, the team should be able to identify high-intensity feedback and weight it appropriately.

---

## Common frequency-intensity failures

**Loudest-voice as high-frequency.** A few loud users generate volume; the team mistakes volume for frequency.

**Intensity ignored.** Volume drives prioritization; intensity is not assessed; quadrant 1 and quadrant 2 get treated similarly.

**Frequency ignored.** A single emotional submission gets prioritized as if it were broad-pattern signal.

**Papercuts ignored as "low priority."** Cumulative papercut impact erodes experience; treating each papercut as too minor to address misses the cumulative effect.

**Strategic-segment issues underweighted.** Quadrant 3 treated as quadrant 4 because the affected segment is small.

**Noise treated as signal.** Quadrant 4 items that are genuinely one-off get actioned as if they were broad patterns.

---

## Methodology-level choices that stay in the public skill

The two dimensions (frequency and intensity). The four-quadrant matrix with worked dispositions. Frequency assessment. Intensity assessment. The matrix in practice. When the matrix is misapplied. Frequency over time. Intensity at scale. Common failures.

## Implementation choices that stay internal

Specific tooling for frequency tracking. Specific intensity classification (manual or AI-assisted). Specific dashboard views by quadrant. The team's own conventions for matrix application in prioritization. These vary by team.

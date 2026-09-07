# Save-and-share mechanics

Email-link, account, anonymous, shareable URL, embed.

Configurations users return to or send to others. Multi-decision purchases require deliberation; B2B configurations often need stakeholder review. Save-and-share supports these workflows.

---

## The deliberation-friendly principle

Configurators that serve real decision-making produce configurations users want to save and share.

**The win.** User configures complex purchase. Saves via email-link. Shares with stakeholders. Returns days later. Configuration intact; price unchanged; ready to buy.

**The fail.** User configures; cannot save; loses work between sessions; abandons.

The discipline. Save mechanisms support multi-session and multi-stakeholder workflows.

---

## Pattern A: Email-link save

User enters email; link emailed.

**How it works.**

- "Save and resume later" CTA.
- User enters email.
- Link emailed; user clicks to return.

**Strengths.** No account required; cross-device.

**Weaknesses.** Email deliverability; link expiration.

**When to use.** Default for non-authenticated configurators.

---

## Pattern B: Account-based save

Logged-in users save automatically.

**How it works.**

- User logs in.
- Configurations save to account.
- User returns; finds saved configurations.

**Strengths.** Multi-configuration management.

**Weaknesses.** Account creation friction.

**When to use.** When configurator is part of a logged-in product.

---

## Pattern C: Anonymous-session save

Browser-based persistence.

**How it works.**

- Configuration saved to browser local storage.
- User returns same browser; configuration restored.

**Strengths.** Lowest friction.

**Weaknesses.** Lost on browser change; limited persistence.

**When to use.** As supplement to other patterns.

---

## Pattern D: Shareable URL

Configuration encoded in URL.

**How it works.**

- Configurator encodes the configuration in URL parameters.
- User shares URL; recipient opens; sees same configuration.

**Strengths.** Easy sharing across channels.

**Weaknesses.** URL length; pricing may shift over time.

**When to use.** Shareable configurations; B2B stakeholder review.

---

## Pattern E: Embed code

Configuration embeddable on other sites.

**How it works.**

- Configurator generates embed code.
- User pastes into other sites or proposals.

**Strengths.** Used in B2B proposals.

**Weaknesses.** Cross-site complexity.

**When to use.** B2B sales contexts.

---

## Pattern F: Hybrid

Combining patterns. Common for production configurators.

**Common combination.** Email-link save + shareable URL + anonymous-session backup.

**Strengths.** Multiple paths.

**Weaknesses.** Complexity.

---

## Save trust communication

Users hesitate to save partial sensitive configurations.

**What to communicate.**

- What is saved.
- How long it persists.
- Who can access it.
- How to delete.

The discipline. Trust communication explicit; not buried in privacy policy.

---

## Resume experience

When user returns.

**The principle.** Resume should be uninterrupted.

**The pattern.**

- User clicks recovery link or logs in.
- Lands at the configuration; rest preserved.
- Continues without re-doing.

**Resume failures.**

- Configuration partially preserved; values lost.
- Pricing changed; user surprised.
- Constraint logic shifted; configuration now invalid.

The discipline. Resume preserves; communicate any changes (e.g., "Pricing has updated since you last visited").

---

## Pricing on resume

When prices change between save and resume.

**Honest pattern.** Show the saved configuration with original price; surface "Pricing has changed; updated price is X" with explanation.

**Dishonest pattern.** Silently update price; user does not notice.

The discipline. Honesty about price changes.

---

## Sharing privacy

Shared configurations may include sensitive info.

**Considerations.**

- What is in the URL/embed.
- Who can see it.
- How long links are valid.

The discipline. Sharing respects user privacy; sensitive details may need account-based sharing rather than URL.

---

## Save-and-share analytics

Track usage.

**Metrics.**

- Save rate.
- Resume rate per saved configuration.
- Share rate.
- Configurations completed via save-and-share path.

---

## Common save-and-share failures

**No save mechanism.** Users lose work; abandon.

**Save mechanism brittle.** Links expire; account access broken.

**Resume loses state.** User lands at start; loses work.

**Pricing surprise on resume.** Silent price update.

**Sharing exposes sensitive info.** Embedded URLs share more than intended.

**Save trust missing.** Users do not save because they distrust persistence.

---

## Methodology-level choices that stay in the public skill

The deliberation-friendly principle. Patterns A through F. Save trust communication. Resume experience. Pricing on resume. Sharing privacy. Analytics. Common failures.

## Implementation choices that stay internal

Specific save mechanisms for specific configurators. Specific tooling for URL encoding and embed generation. Privacy review processes. These vary by team.

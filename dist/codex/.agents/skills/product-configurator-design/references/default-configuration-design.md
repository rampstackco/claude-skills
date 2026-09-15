# Default-configuration design

The starting point. Default selection and presentation.

The configurator opens with a default configuration. Done well, the default makes the user feel guided rather than overwhelmed; done poorly, the user faces a blank canvas and abandons.

---

## The default-heavy principle

Configurators should open with a sensible default, not a blank canvas.

**The win.** User opens the configurator; sees a complete configuration with price; can adjust from there.

**The fail.** User opens the configurator; sees empty fields and 0 fields completed. Decision paralysis.

The discipline. Default-heavy; user adjusts from default; never builds from zero.

---

## Default selection

Which configuration is the default.

**Common-case default.** The configuration most audiences would choose. Reflects audience research.

**Inferred default.** Based on referrer, query, or stated preference.

**Audience-segment default.** Different defaults for different segments (small vs enterprise).

**The most-popular default.** Use what most users actually pick.

---

## Default presentation

How the default appears.

**Visible immediately.** User sees a complete configuration with price.

**Adjust controls obvious.** User knows what is changeable.

**Reset-to-default available.** Users who experiment can return to default.

**Summary-and-detail.** Default shown as summary with expandable detail.

---

## The blank-canvas trap

When configurators open empty.

**The pattern.** Empty fields; user must build from scratch.

**The signal.** High first-step abandonment.

**The cost.** Users abandon before reaching ah-ha moment of seeing a configuration.

**The cure.** Default-heavy. Open with a complete configuration.

---

## Default updating

Defaults decay.

**What decays.**

- Most-popular configuration shifts.
- Audience composition changes.
- Product changes invalidate defaults.

**Maintenance cadence.** Quarterly review.

---

## Default-by-segment

Different audiences may warrant different defaults.

**Pattern.** Detect or ask about audience; default adapts.

**Detection.** Referrer, query, stated input, or inferred from context.

The discipline. Audience-fit defaults serve better than one-size-fits-all.

---

## Common default failures

**Blank canvas.** No default; user paralyzes.

**Wrong default.** Most users adjust away; default does not match audience.

**Stale default.** Reflects old product or pricing.

**Default obscures customization.** User does not realize options exist.

**Default biased toward expensive.** Default flatters revenue, not user fit.

---

## Methodology-level choices that stay in the public skill

The default-heavy principle. Default selection. Default presentation. The blank-canvas trap. Default updating. Default-by-segment. Common failures.

## Implementation choices that stay internal

Specific defaults for specific configurators. Specific detection logic. Specific tooling. These vary by team.

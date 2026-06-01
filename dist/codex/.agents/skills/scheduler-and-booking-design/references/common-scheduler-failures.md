# Common scheduler failures

9+ failure patterns with diagnoses and cures.

---

## "Booking conversion is high; demo conversion to sale is low."

**The diagnosis.** Qualification too thin; cold demos do not convert.

**The cure.** Add 3-5 strategic qualification fields. Detail in `references/qualification-field-design.md`.

---

## "Booking conversion is low; demo conversion to sale is high."

**The diagnosis.** Interrogation-gate; qualification scares off would-be buyers.

**The cure.** Cut qualification to 3-5 fields. Defer non-essential questions to in-call.

---

## "Sales says many bookings come from wrong-fit leads."

**The diagnosis.** Routing logic not connecting qualification to rep tier.

**The cure.** Add fit-based routing. Detail in `references/routing-patterns.md`.

---

## "No-show rate is over 30 percent."

**The diagnosis.** Reminder sequence broken; or commitment friction at booking too low.

**The cure.** Audit reminder cadence. Strengthen pre-meeting communications. Detail in `references/reminder-sequence-patterns.md`.

---

## "Reps complain they get no context before calls."

**The diagnosis.** Prep automation broken; data captured but not delivered.

**The cure.** CRM enrichment, calendar invite enrichment, Slack brief. Detail in `references/prep-automation-patterns.md`.

---

## "Calendar integration breaks every few weeks."

**The diagnosis.** Brittle integration; or rep calendar permissions changing.

**The cure.** Monitor integration; fix permissions; have a manual fallback for downtime.

---

## "Mobile booking conversion is half of desktop."

**The diagnosis.** Mobile UX issue.

**The cure.** Mobile-first design and testing.

---

## "Booking link gets shared by reps; routing logic bypassed."

**The diagnosis.** Generic link in use alongside structured flow.

**The cure.** Disable generic links. Train reps; provide rep-specific structured links if needed.

---

## "Round-robin produces uneven workload."

**The diagnosis.** Reps with different capacity treated equally.

**The cure.** Weighted round-robin or capacity-aware routing.

---

## "Time zone errors cause no-shows."

**The diagnosis.** Time zone display unclear or auto-detection wrong.

**The cure.** Display time zone clearly at booking and in invites. Auto-detect prospect time zone; allow override.

---

## "Reps reschedule manually frequently."

**The diagnosis.** Routing produces wrong-fit bookings; reps fix manually.

**The cure.** Audit routing logic; fix the source of the wrong-fit bookings.

---

## "Conversion was strong; quality dropped after sales team change."

**The diagnosis.** New rep tier or specialization mix; routing not updated.

**The cure.** Routing rules updated as team changes. Quarterly review.

---

## "We added more qualification fields; conversion dropped."

**The diagnosis.** Crossed the five-field threshold.

**The cure.** Cut back. Five-field rule from `references/qualification-field-design.md`.

---

## "Some segments convert; others do not."

**The diagnosis.** Single scheduler treats all segments the same.

**The cure.** Per-segment qualification or routing. Different segments may need different schedulers.

---

## "Schedulers work for direct traffic; partner-sourced leads convert poorly."

**The diagnosis.** Partner-sourced leads have different fit profile; routing or qualification not adapted.

**The cure.** Source-based routing. Partner leads may need different rep tier or different prep.

---

## "We tried different reminder cadences; no-shows did not move."

**The diagnosis.** No-show may not be reminder-driven. Could be commitment friction at booking, time zone errors, or audience mismatch.

**The cure.** Test other variables. Audit booking commitment level, time zone clarity, audience-fit.

---

## "Sales says enterprise prospects skip the scheduler and email instead."

**The diagnosis.** Enterprise audiences sometimes want personal contact rather than self-serve booking.

**The cure.** Offer a "talk to sales" alternative for enterprise leads. Hybrid approach.

---

## "Conversion dropped after we updated the booking flow."

**The diagnosis.** Specific change introduced friction.

**The cure.** Compare metrics pre- and post-change. Roll back if necessary; isolate the issue.

---

## "Reschedule flow loses qualification data."

**The diagnosis.** Reschedule treated as new booking; data not preserved.

**The cure.** Reschedule preserves qualification. Detail in `references/reschedule-and-no-show-handling.md`.

---

## The pattern across failures

Most scheduler failures fall into one of three patterns.

**Pattern 1: Qualification miscalibrated.** Any-time-friction, interrogation-gate, or wrong fields. The fix is calibrating qualification to the team's needs.

**Pattern 2: Routing or prep miscalibrated.** Wrong-rep-tier, no-prep-automation, broken integrations. The fix is connecting qualification to rep workflow.

**Pattern 3: Communication miscalibrated.** Aggressive reminders, brittle no-show flows, missing reschedule paths. The fix is gentle, useful communication.

The metric pattern: scheduler failures often look fine on booking conversion alone. The signal is in demo-to-sale conversion, no-show rates, rep prep quality. Programs that track only booking rate keep shipping the same patterns.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (qualification, routing/prep, communication). The principle that booking rate alone is insufficient.

## Implementation choices that stay internal

Specific failure cases the team has encountered. Specific multi-metric dashboards. Specific cures. The team's audit and retirement processes. These vary by team.

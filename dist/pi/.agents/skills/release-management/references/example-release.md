# Example Release

Fictional product: **Wrenfield**, a room-booking web app for public library systems, with a public API that integrators use to show room availability on library websites. One delivery team of six engineers, a product manager, a QA engineer, and one coding-agent lane reviewed by the engineers.

All names, numbers, and dates below are fictional and internally consistent.

---

## The written release model

```
Model: release train, every second Tuesday. Cut at 14:00. Go/no-go Thursday 10:00.
Freeze: cut to go/no-go. Only fixes for S1 or S2 defects found in the candidate, plus
version and note edits. Exceptions approved by the release owner and logged.
Versions: web app on CalVer YYYY.MM.MICRO. Public API on SemVer, major exposed as /v3/.
Go/no-go threshold: zero S1, zero S2 without a workaround. Rollback exercised within 30 days.
Release owner: Rhea Lindqvist (engineering lead). Deputy: Tomas Abiodun.
Impact tags on every merged item: breaking, feature, fix, internal. Release-note line required.
```

Last release: web `2026.11.0`, API `3.5.0`.

---

## 1. The cut (Tuesday 2026-11-10)

Merged list pulled from the tracker for everything merged since the `2026.11.0` tag.

| Item | Change | Surface | Impact | Author |
|---|---|---|---|---|
| WRN-201 | Weekly repeat option for bookings | Web | feature | Human |
| WRN-205 | Optional `accessible_only` filter on the availability endpoint | API | feature | Human |
| WRN-208 | `capacity_note` field deprecated in favor of a `capacity` object; removal in 4.0.0, no earlier than 2027-05-01 | API | feature (deprecation) | Human |
| WRN-210 | Confirmation page showed regular branch hours on holidays | Web | fix | Human |
| WRN-212 | Calendar export dropped bookings past 500 rows | Web | fix | Agent lane |
| WRN-214 | Add `series_id` column to bookings (expand step for WRN-201) | Data | internal | Human |
| WRN-216 | Test runner configuration update | Build | internal | Agent lane |
| WRN-219 | Admin bulk-close rooms for a holiday, behind a release flag that stays off | Web | feature | Human |

Version derivation:

- Web: highest tag is feature. Next CalVer in November: `2026.11.1`.
- API: highest tag is feature (a new filter and a new deprecation, both minor). `3.5.0` to `3.6.0`.

Candidate `2026.11.1-rc.1` built. Freeze announced in the team channel with the rules above.

---

## 2. Evidence and the first go/no-go (Thursday 2026-11-12)

On Wednesday, QA ran the WRN-201 test plan on `rc.1` and filed WRN-223: weekly repeating bookings that cross the daylight saving change land one hour off after the change. Severity S2. No workaround a library patron could use.

```
# Go/no-go: Wrenfield web 2026.11.1 / API 3.6.0

Candidate: 2026.11.1-rc.1, build 4471
Decision owner: Rhea Lindqvist

| # | Criterion | Threshold | Evidence | Status |
|---|---|---|---|---|
| 1 | Tests pass on candidate | All suites green on rc.1 | Runner summary, build 4471 | passed |
| 2 | New work has test plans with results | Every story and fix | 6 of 6 plans attached | passed |
| 3 | Open S1 | 0 | Query: 0 | passed |
| 4 | Open S2 | 0 without workaround | WRN-223, no workaround | failed |
| 5 | Open S3/S4 | Listed and accepted | 2 S3, accepted | passed |
| 6 | Rollback verified | Within 30 days | Last exercised 2026-09-02 | not evidenced |
| 7 | Monitoring in place | Changed areas covered | Availability and booking panels; series_id query panel added Wednesday | passed |
| 8 | Rollout plan complete | Filled | Linked | passed |
| 9 | Release notes drafted | Checked against merged list | See section 6 below | passed |
| 10 | On-call named | Each stage | Tomas Abiodun, Ines Varga | passed |
| 11 | Freeze exceptions | Logged | 0 | passed |

Decision: NO-GO
Reason: WRN-223 is an S2 with no workaround in the headline feature of this release.
Rollback last exercised 72 days ago; not evidenced against the 30-day limit.
Fix: WRN-223 fix as a freeze exception; exercise rollback on the production deploy path.
Owner: Rhea Lindqvist (rollback), Femi Okafor (WRN-223)
Next candidate: 2026.11.1-rc.2, expected 2026-11-17
Next decision: Thursday 2026-11-19 10:00
Scope change: none
```

The release slips one week. Two follow-on rules from the model apply:

- **The next train keeps its date.** The cut for the following release stays on 2026-11-24. Work merged after 2026-11-10 waits for that train. It does not join the slipped release.
- **The freeze stays on for this candidate only.** The main line reopens for normal merges, which land in the next train.

During the week:

- WRN-223 fixed on a release branch from `rc.1`, reviewed, fix verification test added. Logged as freeze exception 1, approved by Rhea. Merged back to the main line the same day.
- Rollback exercised on 2026-11-16 during the Monday low-traffic window: redeploy of the `2026.11.0` artifact, 6 minutes to serving, verified by the version endpoint. Then redeployed forward.
- `rc.2` (build 4502) built 2026-11-17. Full suite rerun because WRN-223 touched shared date handling. The WRN-201 test plan rerun in full.

---

## 3. The second go/no-go (Thursday 2026-11-19)

All eleven criteria passed on `rc.2`. Row 4 shows zero open S2. Row 6 shows the 2026-11-16 exercise. Row 11 shows one logged exception.

Decision: GO. Decided by Rhea Lindqvist at 10:12.

---

## 4. Rollout, with a halt

```
## Stages
| Stage | Exposure | Dwell | Stop condition | Result |
|---|---|---|---|---|
| 1. Internal | Staff accounts and two test library systems | 2 hours | Any signal past stop; any S1/S2 | Passed 13:05 |
| 2. Canary | 10 percent of library systems | Through the evening peak (16:00 to 19:00) | Error rate > 0.5% for 10 min; availability p95 > 800 ms for 10 min | Halted 16:41 |
| 3. Everyone | 100 percent | Through post-release check | As above | Passed 2026-11-20 18:00 |

## Halt log
| Time | Stage | Signal | Value | Action | Decided by |
|---|---|---|---|---|---|
| 16:41 | Canary | Availability p95 | 1,350 ms for 12 min (normal 300 to 450) | Halt; roll canary back to 2026.11.0 | Tomas |
| 16:49 | Canary | Availability p95 | 410 ms | Rollback confirmed | Tomas |
```

Cause: the availability query now joins on `series_id`, and the column had no index. Internal test data was too small to show it. Error rate never moved and no bookings failed, so the latency stayed under the team's incident threshold and was handled as a rollout halt, not an incident. A follow-up item was filed for internal test data at production scale.

Fix: add the index in a new candidate. Creating an index is additive and safe to leave in place on rollback. `rc.3` (build 4510) built that evening. Evidence rechecked for the touched area: the availability test suite and a load check against a production-size copy of the bookings table. Rhea recorded a go for `rc.3` with the reason "only change is the index; touched-area evidence attached," without a new meeting, as the model allows for candidates within an already-approved release.

Friday 2026-11-20: internal stage passed at 10:30. Canary ran through the afternoon and the evening peak window with p95 at 380 ms. Full exposure at 18:00 on a Friday needs weekend on-call under the model. Tomas was on call through Sunday and named in the rollout plan, so the final stage went ahead. Post-release check on Monday 2026-11-23: signals steady, freeze lifted.

Shipped: web `2026.11.1`, API `3.6.0`, tagged from build 4510.

---

## 5. Changelog entry

```
## [2026.11.1] - 2026-11-20
API version 3.6.0.

### Added
- Bookings can repeat weekly, up to 26 weeks. (WRN-201)
- API: availability endpoint accepts an optional `accessible_only` filter. (WRN-205)

### Deprecated
- API: `capacity_note` is deprecated. Use the `capacity` object. Removal in API 4.0.0,
  no earlier than 2027-05-01. (WRN-208)

### Fixed
- Booking confirmations now show holiday hours for the branch. (WRN-210)
- Calendar exports include every booking; exports past 500 bookings were cut short. (WRN-212)
- Weekly bookings that cross a daylight saving change keep their local start time. (WRN-223)
```

WRN-214 and WRN-216 are internal and left out. WRN-219 is behind a flag that is off and left out until the flag turns on.

---

## 6. Release notes, and the agent-drafted draft

The agent lane drafted the notes from the merged list. Ines Varga, the QA engineer, checked every line against the list before the first go/no-go:

- The draft had "Room search is faster." No merged item made search faster. Removed.
- The draft left out WRN-210, because its release-note line said "holiday hours on confirmation" and the agent filed it as internal. Restored under Fixed.
- WRN-212 and WRN-216 were agent-authored. WRN-212 appears in the notes like any other fix. WRN-216 is internal.
- The agent's message for the WRN-212 change said "all export tests pass." The runner summary for that build was attached to the pull request, so it counted as evidence. On an earlier item with no attached output, the reviewer had asked for the summary before merging.

Published notes had three sections: library staff (weekly repeats, holiday hours, exports), library system admins (nothing beyond the staff section, so the section was dropped), and API integrators (the filter, the deprecation notice with its date, and the version). The internal note to support went out Wednesday 2026-11-18 with the two user-visible fixes and how to spot the daylight saving issue in older bookings.

---

## Why this cycle worked

- The model was written down, so the slip did not move the next train.
- The version came from the impact tags, so the deprecation made the API a minor without debate.
- The no-go named two criteria, a fix, an owner, and a date. Nobody argued about whether it was "really" an S2.
- "Not evidenced" on rollback was treated as failed. The exercise a week later is the rollback that worked during the halt.
- The stop condition was a number. The halt took eight minutes from signal to rollback, with no meeting.
- The agent-drafted notes were checked against the merged list, and one invented line and one dropped fix were caught.

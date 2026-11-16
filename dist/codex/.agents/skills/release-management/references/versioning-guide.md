# Versioning Guide

How to pick a version scheme, and how to derive the next version from the changes in a release. The version is a lookup from the impact tags, not a judgment call.

---

## 1. Pick the scheme per surface

A product can have more than one surface. Each surface gets one scheme.

| Surface | Others depend on its interface? | Scheme |
|---|---|---|
| Library, SDK, CLI, plugin API | Yes | Semantic Versioning |
| Public HTTP API, webhook payloads, file formats | Yes | Semantic Versioning (often only the major is exposed, as `/v3/`) |
| Web app, site, mobile app | No; users take whatever is current | Calendar Versioning |
| Internal platform on a release train | Usually no | Calendar Versioning |
| Internal service with internal callers | Yes, if other teams call it | Semantic Versioning for the contract |

Rule of thumb: if someone else's code or data breaks when you change it, use SemVer. If the only question anyone asks is "is this the latest?", use CalVer.

---

## 2. Semantic Versioning

The SemVer spec defines `MAJOR.MINOR.PATCH`. Read the spec itself for edge cases. The working rules:

| Bump | When | Examples |
|---|---|---|
| Major | Any change that can break a caller who followed the documented interface | Removed endpoint or field; renamed parameter; changed type; a default that changes behavior for existing callers; a new required field |
| Minor | New backward-compatible functionality, or a new deprecation | New endpoint; new optional field; new CLI flag; marking something deprecated |
| Patch | Backward-compatible bug fixes only | Wrong value corrected to match the docs; crash fixed; performance fix with no interface change |

**Pre-release identifiers** follow a hyphen: `4.0.0-rc.1`, `4.0.0-beta.2`. A pre-release sorts before its release: `4.0.0-rc.2` < `4.0.0`. Use them for candidates.

**Build metadata** follows a plus: `4.0.0+build.731`. It identifies the build and is ignored for ordering. Two artifacts that differ only in build metadata have the same precedence.

**Before 1.0.0**, the spec allows anything to change at any time. Many teams treat `0.MINOR` as major and `0.x.PATCH` as everything else. Say which in your release model. Ship `1.0.0` when outside callers start depending on you.

**A fix that changes documented behavior is a major.** If callers relied on the wrong behavior and the fix breaks them, the fix is breaking. Ship it as a major, or keep the old behavior behind an option and deprecate it.

---

## 3. Calendar Versioning

CalVer uses the release date in the version. Pick one format and write it down.

| Format | Example | Fits |
|---|---|---|
| `YYYY.MM.MICRO` | `2026.11.0`, `2026.11.1` | Monthly or more frequent releases; micro counts releases within the month |
| `YYYY.0W` | `2026.47` | Weekly trains; ISO week number |
| `YY.MM` | `26.11` | Monthly releases with no extra releases in a month |

Hotfixes under CalVer increment the micro: `2026.11.1` follows `2026.11.0`. Never reuse a version, even for a release that was withdrawn.

CalVer says nothing about compatibility. If a CalVer product also exposes an API, version the API separately with SemVer and list both in the release notes.

---

## 4. Derive the version

1. Pull the merged list since the last release tag.
2. Read each item's impact tag: breaking, feature, fix, or internal.
3. Take the highest tag present, per surface.
4. Apply the table.

| Highest tag on the surface | SemVer | CalVer |
|---|---|---|
| Breaking | Next major, minor and patch reset to 0 | Next date version; breaking change called out in Action needed |
| Feature (or a new deprecation) | Next minor, patch reset to 0 | Next date version |
| Fix | Next patch | Next date version |
| Internal only | No release needed for this surface, or next patch if you release anyway | Next date version if the train ships |

Untagged items block the derivation. Send them back to their authors. Do not guess.

---

## 5. Worked bumps

**Library at `2.7.3`.** Merged: two fixes, one new optional parameter. Highest tag: feature. Next: `2.8.0`.

**Library at `2.8.0`.** Merged: one fix, one internal refactor. Highest tag: fix. Next: `2.8.1`.

**Public API at `3.4.2`.** Merged: a new endpoint, and a fix that makes a field return `null` instead of an empty string as the docs always said. Integrators parse the empty string today. The fix breaks them, so its tag is breaking. Next: `4.0.0`. Alternative: keep the empty string, add an option for `null`, deprecate the old behavior in `3.5.0`, remove it in `4.0.0`.

**Public API at `3.5.0`.** Merged: a field marked deprecated, with a removal date. Highest tag: feature (a new deprecation is a minor). Next: `3.6.0`.

**Candidate for `3.6.0`.** First build `3.6.0-rc.1`. A fix lands in the freeze. Next build `3.6.0-rc.2`. Shipped as `3.6.0`, tagged with build metadata in the artifact store.

**Web app on `YYYY.MM.MICRO`, last release `2026.11.0`.** Next train on 2026-11-19 ships `2026.11.1`. A hotfix on 2026-11-21 ships `2026.11.2`. The first train in December ships `2026.12.0`.

**SDK at `0.9.4`, team treats `0.MINOR` as major.** Merged: a renamed method. Next: `0.10.0`. When the first outside customer integrates, the next release is `1.0.0`.

---

## 6. Common mistakes

- **Bumping major for marketing.** A big launch with no breaking change is a minor. Use the release notes for the story.
- **Hiding a breaking change in a minor** because a major "feels like too much." Callers find out in production.
- **Reusing a version** after a withdrawn release. Artifact caches and lockfiles now disagree about what that version is.
- **Two schemes on one surface.** Pick one and stay with it.
- **Choosing the version before the cut.** The version is derived from what merged, so it is known only at the cut.

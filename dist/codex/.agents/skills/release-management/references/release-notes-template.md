# Release Notes Template

Three blocks: the changelog entry (the durable record), reader-facing notes (one section per audience), and a deprecation notice. All three come from the same merged list. None is typed from memory.

For launch announcements, blog posts, and in-app campaigns around one headline feature, use `feature-launch-playbook`.

---

## 1. Changelog entry

Keep a Changelog conventions. Newest version at the top. An Unreleased section collects entries as work merges; at the cut, they move under the version.

```
## [Unreleased]

## [3.4.0] - 2026-11-19

### Added
- [What a user can now do, in one line.] ([work item ID])

### Changed
- [What behaves differently, and for whom.] ([ID])

### Deprecated
- [What will be removed, the replacement, and the removal date or version.] ([ID])

### Removed
- [What is gone. Link the earlier deprecation entry.] ([ID])

### Fixed
- [The symptom a user saw, now gone.] ([ID])

### Security
- [What was fixed, at the level of detail your disclosure policy allows.] ([ID])
```

Rules:

- Omit empty categories.
- One line per change, written as the effect on a user, not the code change. "Exports no longer drop rows past 10,000," not "fix off-by-one in paginator."
- Internal items (refactors, test changes, build changes) stay out unless they change behavior.
- Each line keeps its work item ID so the record can be audited against the tracker.

---

## 2. Reader-facing notes

Write one section per audience whose actions differ. Lead with what they need to do. Group by impact, not by team.

```
# [Product] [version] release notes
Released [YYYY-MM-DD]

## Action needed
[Anything a reader must do: update a setting, migrate an integration, re-authenticate.
Each item says who is affected, what to do, and by when. Write "No action needed" if so.]

## For [audience 1, e.g. everyone using the app]
### New
- **[Short name].** [What it does for the reader, in one or two sentences.] [Where to find it.]
### Improved
- **[Short name].** [What is better, in terms the reader notices.]
### Fixed
- [The symptom the reader saw, now gone.]

## For [audience 2, e.g. workspace admins]
[Same shape. Only what admins need beyond the section above.]

## For [audience 3, e.g. API and integration developers]
- Version: [API version] ([what kind of bump and why])
- [New endpoints or fields, with a link to the reference docs]
- [Behavior changes, with before and after]
- [Deprecations, linked to the notice below]

## Known issues
- [Issue, who it affects, workaround, expected fix.]
```

Checks before publishing:

- [ ] Every user-facing merged item has a line in at least one audience section
- [ ] Every line maps to a merged item; nothing is described that did not ship
- [ ] Items still behind a flag that is off are left out or marked "rolling out"
- [ ] Action-needed items name who, what, and when
- [ ] No internal jargon, ticket-only lines, or team names as headings
- [ ] Known issues match the open defects accepted at the go/no-go

---

## 3. Deprecation notice

Publish when the deprecation ships, not when the removal ships. Repeat it in each release until removal.

```
### Deprecation: [feature, endpoint, field, or setting]

What is changing: [The thing being deprecated, in plain words.]
Replacement: [What to use instead, with a link to how.]
Deprecated in: [version, date]
Removal: [version or date. A date, not "a future release."]
After removal: [What happens to a reader who has not moved: error, fallback, silent no-op.]
Who is affected: [How a reader can check: a setting, a log line, an API call pattern, a report.]
Questions: [Where to ask.]
```

Under SemVer, a deprecation ships in a minor release. The removal ships in the next major.

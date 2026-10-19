# Story Template

A story delivers one outcome a user can see or feel. It links to the spec rather than restating it, and it carries acceptance criteria that someone other than the author can check.

If no spec exists yet and the story is larger than a few days of work, write the spec first with `pm-spec-writing`.

---

## Template

```
TITLE: [user-facing outcome, in a few words]

TYPE: Story
OWNER: [one name, or unassigned]
PARENT EPIC: [link]
LABELS: [component, platform, segment]
CAPITALIZATION STAGE: [inherited from epic, or override with a note]
ESTIMATE: [points]

USER STORY
As a [specific user], I want [action], so that [outcome].

SPEC
[Link to the PRD or spec section. Do not paste it.]

ACCEPTANCE CRITERIA
- [ ] Given [context], when [action], then [observable outcome]
- [ ] Given [context], when [action], then [observable outcome]
- [ ] Given [context], when [action], then [observable outcome]

NON-GOALS
- [What this story does not do, even though someone might expect it]
- [What this story does not do]

DESIGNS
- [Wireframe or mockup link or screenshot, or none]

ANALYTICS EVENTS
| Event name | Trigger | Properties |
|---|---|---|
| [object_action] | [when it fires] | [property: type] |

FEATURE FLAG
[flag name, default state, rollout plan, or none]

QA NOTES
- [States to test: empty, error, loading, long content]
- [Platforms or roles to cover]
- [Regression areas]

DEFINITION OF DONE
- [ ] Every acceptance criterion checked by someone other than the author
- [ ] Analytics events verified firing with correct properties
- [ ] Flag default confirmed in each environment
```

---

## Writing acceptance criteria that can be checked

Each criterion should pass a simple test: could two people check it independently and agree?

| Not checkable | Checkable |
|---|---|
| Search is fast | Given a workspace with 10,000 records, when the user types 3 characters, then results render within 1 second |
| The form is user-friendly | Given an invalid email, when the user leaves the field, then an inline error names the problem |
| Works on mobile | Given a 375px wide viewport, when the user opens the page, then no content scrolls horizontally |

Cover the empty state, the error state, and the permission boundary. Those are the three most often forgotten.

---

## Writing non-goals

Non-goals stop scope creep in review. Write the ones a reasonable reviewer might assume are included.

- "Does not add bulk edit. Single-record edit only."
- "Does not change the email notification. That is a separate story."
- "Does not support the legacy mobile app."

---

## Naming analytics events

Use one convention across the product. A common one is `object_action` in snake case, past tense: `report_exported`, `invite_sent`. Define each property and its type. If the team runs a tracking plan, link the row instead of redefining it.

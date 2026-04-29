<!-- Thanks for opening a PR. Please fill in the sections below. -->

## What this PR does

<!-- One paragraph. What is the change and why? -->

## Type of change

<!-- Check the one that applies. -->

- [ ] New skill (adds a folder under `skills/`)
- [ ] Update to an existing skill (`SKILL.md` body or frontmatter)
- [ ] Update to a reference file
- [ ] Bug fix (broken link, typo, formatting violation, etc.)
- [ ] Documentation (README, CONTRIBUTING, SKILL_AUTHORING, MAPPING, CHANGELOG)
- [ ] Tooling or CI

## Linked issue

<!-- Link the issue this PR addresses. New skills should always have an issue first. -->

Closes #

---

## Contributor checklist

<!-- Confirm each item before requesting review. Some items only apply to certain change types. -->

### For all changes

- [ ] I have read [CONTRIBUTING.md](../blob/main/CONTRIBUTING.md)
- [ ] No em dashes anywhere in the changed files (search for `—`)
- [ ] No private brand, personal handle, or proprietary domain references
- [ ] Internal links resolve to real files
- [ ] Cross-references to sibling skills name skills that actually exist
- [ ] PR title follows the format: `Add: <name>` / `Fix: <description>` / `Improve: <skill> reference` / `Update: <doc>`

### If adding a new skill

- [ ] Skill folder name is `lowercase-hyphenated`
- [ ] `SKILL.md` exists with valid YAML frontmatter
- [ ] `name` in frontmatter matches the folder name exactly
- [ ] `description` is 2-4 sentences with explicit triggers and an "Also triggers when..." line
- [ ] All 10 sections are present in the documented order (When to use, When NOT to use, Required inputs, The framework, Workflow, Failure patterns, Output format, Reference files)
- [ ] At least one reference file exists in `references/`
- [ ] `Reference files` section in SKILL.md matches the actual files in `references/`
- [ ] No vendor-specific framework references in the SKILL.md body
- [ ] No version-specific references (e.g., "Tailwind 4", "Next.js 15") in the SKILL.md body
- [ ] `SKILL.md` is under 250 lines (hard cap 500)
- [ ] Each reference file is under 400 lines
- [ ] I added the new skill to the catalog table in `README.md`
- [ ] I added an entry to `CHANGELOG.md` under `[Unreleased]`
- [ ] I ran a quick check for trigger collisions with existing skills

### If modifying an existing skill

- [ ] Changes preserve the uniform section order
- [ ] If renaming files, all references in SKILL.md are updated
- [ ] If renaming the skill, all cross-references in other SKILL.md files are updated
- [ ] I added an entry to `CHANGELOG.md` under `[Unreleased]` if the change is user-visible

### If fixing a bug

- [ ] I described the bug in the linked issue or in this PR
- [ ] I verified the fix actually resolves the problem
- [ ] I checked for the same bug pattern elsewhere in the repo

---

## Notes for the reviewer

<!-- Anything that does not fit above. Trade-offs you considered. Things you are unsure about. -->

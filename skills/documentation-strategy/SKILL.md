---
name: documentation-strategy
description: "Design and run a documentation system for a team or product. Use this skill when planning what to document, choosing a documentation tool, organizing existing docs, fixing stale documentation, designing a maintenance cadence, or scoping technical writing work. Triggers on documentation, docs, tech writing, knowledge base, wiki, runbook, README, internal docs, doc audit, doc maintenance, stale docs, where do we document. Also triggers when the team is repeatedly answering the same questions or when onboarding takes too long."
---

# Documentation Strategy

Decide what gets documented, where, by whom, and how it stays fresh. Stack-agnostic. Applies to internal team docs, product docs, runbooks, READMEs, and knowledge bases.

---

## When to use

- Setting up documentation for a new team or product
- Auditing existing documentation
- Fixing stale or scattered docs
- Choosing a documentation tool or platform
- Defining what gets documented and what doesn't
- Establishing maintenance cadence
- Scoping technical writing work
- Designing onboarding documentation (use alongside `team-onboarding-playbook`)

## When NOT to use

- Writing the actual content of a single document (use `content-and-copy`)
- Customer-facing knowledge base copy (use `content-strategy`)
- Code comments and inline documentation (covered by `code-review-web`)
- One-off blog posts or articles (use `content-and-copy`)

---

## Required inputs

- The audience (internal, external, customer, dev, exec)
- Existing docs and their state (where, what shape, last updated)
- Team size and growth trajectory
- The kinds of work that produce documentation (engineering, product, ops, support)
- Tools currently in use

---

## The framework: 4 categories of documentation

Different categories of doc serve different purposes. Conflating them is how docs get bad.

### Category 1: Reference

What things are. Looked up when needed.

Examples: API reference, configuration options, glossary, architecture diagrams, contact lists, decision log entries.

Properties:
- Comprehensive
- Fact-checked, kept accurate
- Searchable
- Stable structure (links don't break)
- Version-aware where relevant

### Category 2: How-to

How to do specific tasks. Procedural.

Examples: "Deploy to staging," "Reset a password," "Onboard a new contractor," "Run the backup restore drill."

Properties:
- Step-by-step
- Tested by someone who didn't write it
- Includes the prerequisites
- Includes troubleshooting
- Versioned to the system it documents

### Category 3: Explanation

Why things are the way they are. Conceptual.

Examples: architecture rationale, design decision records (ADRs), strategy docs, vision documents.

Properties:
- Narrative
- Captures context (the why)
- Often historical (why we built it this way)
- Links to evidence

### Category 4: Tutorial

Learning-oriented. Walks someone from zero to capable.

Examples: "Getting started with our codebase," "Your first deploy," onboarding pathways.

Properties:
- Sequenced from simple to complex
- Hands-on
- Doesn't assume prior knowledge in scope
- Has clear completion criteria

(This four-way split is the Diátaxis framework, well-known in tech writing. Memorize it.)

---

## The framework: 5 tiers of doc

Different docs serve different audiences with different stakes.

### Tier 1: Customer-facing

Public docs, customer KBs, API references. High visibility, slow change.

Standards:
- Editorial review
- Version control
- Clear ownership
- High freshness bar
- Tied to release

### Tier 2: Cross-team / shared

Docs used across teams: shared APIs, common services, company-wide processes.

Standards:
- Cross-team ownership clear
- Update obligations on changes
- Mid-to-high freshness bar

### Tier 3: Team-internal

Docs for the team that owns them: how the team works, runbooks, decisions.

Standards:
- Team-owned, team-maintained
- Mid freshness bar
- Useful for the next person joining

### Tier 4: Personal scratchpad

Notes, drafts, work-in-progress. Not for others.

Standards:
- Low maintenance
- Don't link from official docs
- Promote to higher tier when valuable

### Tier 5: Auto-generated

Docs derived from code: API references generated from comments, schemas, etc.

Standards:
- Generation is automated, runs in CI
- Single source of truth (the code)
- Reviewed for usability, not freshness (that's automatic)

The tiering matters because the maintenance bar differs. Asking team-internal docs to meet customer-facing standards is wasteful and unsustainable.

---

## Workflow

### Step 1: Audit current state

- What docs exist?
- Where do they live? (often: scattered)
- Who owns each?
- How fresh are they?
- Are they actually used? (check page views or referrals if measurable)

The audit is often eye-opening. Most teams have more docs than they realize, in more places than they realize.

### Step 2: Categorize and tier

For each doc:
- Category (reference / how-to / explanation / tutorial)
- Tier (customer / shared / team / scratchpad / generated)

Some docs are mixed. Note the dominant category.

### Step 3: Identify gaps

What documentation does the team need that doesn't exist?

Common gaps:
- "How does X actually work?" no answer
- Onboarding for the role no one's onboarded recently
- Runbook for a system that's never broken (yet)
- Decision rationale for "why are we doing it this way"

Ask people what they wish were documented. They know.

### Step 4: Identify dead weight

Docs that are:
- Out of date and not getting updated
- Duplicated across places (one is canonical, others should redirect or be deleted)
- About things that no longer exist
- Drafts abandoned long ago

Delete or archive. Stale docs are worse than missing docs (people might trust them).

### Step 5: Pick the home(s)

Where docs live affects whether they're maintained.

Common locations:
- **Code repo (markdown):** for docs tightly coupled to code (READMEs, ADRs, runbooks for the service)
- **Wiki / Notion / Confluence:** for cross-team and team-internal
- **Docs site (Docusaurus, Mintlify, custom):** for customer-facing
- **Tickets / decision logs:** for ephemeral records

Don't aim for one home. Aim for a clear answer to "where does this kind of doc live?"

### Step 6: Establish ownership

Every doc has an owner. Without an owner, it goes stale.

Owner can be:
- A team
- A role (the on-call rotation, the PM, the EM)
- A person, with a backup

If an owner isn't obvious, the doc may not deserve to exist.

### Step 7: Establish maintenance cadence

Per tier:

| Tier | Review cadence |
|---|---|
| Customer-facing | Per release, plus quarterly |
| Cross-team | Quarterly |
| Team-internal | Quarterly |
| Personal scratchpad | None |
| Auto-generated | On every change |

Maintenance includes:
- Verify accuracy
- Update for changed systems
- Archive what's no longer relevant
- Address user feedback

### Step 8: Make doc updates part of work

Documentation isn't a separate project. It's part of the work that produces it.

- New feature: docs are part of the feature
- New process: doc is part of the rollout
- Decision made: ADR or decision-log entry filed
- Bug postmortem: runbook updated
- New hire: onboarding doc updated based on their experience

The team that ships features without docs has less than they think they have.

### Step 9: Make docs discoverable

Even great docs are useless if no one finds them.

- Search that actually works (most platforms; some better than others)
- Index pages for major topics
- Cross-links between related docs
- Search aliases for common alternative phrasings
- Pinning the most-used docs

### Step 10: Measure

What's measurable depends on the platform:
- Page views
- Search queries (and zero-result queries)
- "Was this helpful?" feedback
- Time on page
- Referral patterns

For internal docs, the qualitative measure is often more useful: are the same questions getting asked over and over? If yes, the docs aren't doing their job (either they don't exist, aren't found, or aren't clear).

---

## Specific patterns

### README per project

Every code repo has a README that answers:
- What is this?
- How do I run it?
- How do I contribute?
- Where do I find more info?

Five sentences each, often. Length isn't the goal. The READ-it-ME promise is.

### ADR (Architecture Decision Record)

Per significant decision:

```
# ADR-NNN: [Title]

Status: [Proposed / Accepted / Deprecated / Superseded]
Date: [Date]

## Context
[What's the situation? What forces are at play?]

## Decision
[What was decided?]

## Consequences
[What happens because of this decision? Both good and bad.]
```

ADRs accumulate. They become the explanation layer for "why are we doing it this way."

### Runbook

Per system:
- What it is
- How to access it
- Common operations (with commands)
- Common failure modes
- Restore from backup procedure
- Escalation contacts

See `incident-response` and `backup-and-disaster-recovery` for runbook standards.

### Onboarding pathway

Per role:
- Day 1
- Week 1
- Month 1
- 90 days

See `team-onboarding-playbook`.

### Decision log

Lightweight version of ADRs. Date, decision, decider, why. Keeps a record without ceremony.

### Glossary

Terms that have specific meaning in the team or product. Reduces confusion. Trains AI tools too (more on that later).

---

## Tooling

The tool is less important than the discipline. That said:

| Tool category | Examples | Best for |
|---|---|---|
| Wiki | Notion, Confluence, GitBook | Cross-team, internal |
| Markdown in code | GitHub, GitLab, Bitbucket | READMEs, ADRs, technical |
| Docs sites | Docusaurus, Mintlify, ReadMe | Customer-facing, public docs |
| Internal sites | MkDocs, custom | Team-specific patterns |

Considerations:
- Search quality (a poor search makes everything worse)
- Editor quality (people won't write in painful editors)
- Version control (can you see history?)
- Permissions (right people can read and write)
- API and integration (for automation)
- Cost at your scale

For small teams: a single wiki tool is plenty. For larger: tiered tools.

---

## AI-related notes

LLMs and AI assistants increasingly read documentation. Some considerations:

- Clear, consistent structure helps both humans and AI
- A glossary of terms helps both
- File-level metadata (front matter) helps tools
- Public docs may be read by AI crawlers; consider an `llms.txt` if relevant
- AI-generated drafts are a starting point, not a final answer; humans review

---

## Failure patterns

**Documentation as a "later" task.** Always written later. Later means never. Make docs part of the work.

**One mega-doc for everything.** Wiki page that's 8,000 words. No one reads it. Break by category and topic.

**Stale docs that nobody trusts.** "Probably out of date" is the thought that kills documentation. Either keep current or archive.

**Docs everyone agrees should exist but no one writes.** The team agrees onboarding docs would be valuable. Months pass. No one writes them. Make ownership specific.

**Wikis that are graveyards.** Lots of pages, no one trusts any of them. Audit, archive, restart with a slimmer set.

**Docs separated from code.** API docs in a wiki, code in a repo. They drift. Co-locate.

**Docs without examples.** Reference without examples is hard to use. Examples make it concrete.

**Examples that don't run.** Code examples that worked once, drifted. Test examples in CI where possible.

**Long-form when reference would do.** A 2,000-word doc explaining what a 30-row table would. Use the right form.

**Multiple sources of truth.** Same info in three places, all slightly different. Pick canonical, redirect others.

**Doc tools no one uses.** Adopted because of a feature; team doesn't actually use it. Pick tools the team will use.

**Doc style guide that's longer than the docs.** Process beats product. Guide should be short.

**No way to mark docs as deprecated.** Old docs sit alongside current ones with no indication. Add a "deprecated" or "archived" status.

**No analytics.** No idea what's being used or what's missing. Even basic page views inform priorities.

**Docs that read like specifications.** Dense, formal, hard to scan. Write for the reader.

---

## Output format

A documentation strategy document includes:

- **Audit:** what exists, where, in what state
- **Tiering and categorization:** the framework applied to existing docs
- **Gap list:** what should exist but doesn't
- **Tool decisions:** where each kind of doc lives
- **Ownership map:** who owns what
- **Maintenance cadence:** what's reviewed when
- **Style guide (brief):** consistency standards
- **Roadmap:** prioritized work to fill gaps and close out dead weight

---

## Reference files

- `references/doc-types-guide.md`: Detailed guide to the four doc types (reference, how-to, explanation, tutorial) with examples and templates for each.

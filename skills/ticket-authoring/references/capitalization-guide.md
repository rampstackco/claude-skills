# Capitalization Guide for PMs

**This is not accounting advice.** It explains the concepts a product manager needs to tag work items correctly. Your finance team and your auditors own the final determination of what is capitalized, when, and how. When this guide and your finance team disagree, your finance team wins.

---

## Why a PM needs to know this

Some companies treat part of the cost of building software as an asset instead of an expense. The asset is then amortized over the software's useful life. The cost in question is mostly people's time. Finance cannot see what people worked on. The tracker can.

So the PM's job is narrow and important: make sure every work item that carries hours also carries the right development stage, so finance can sum the hours by stage.

---

## The two standards

| Standard | Who uses it | Plain-language scope |
|---|---|---|
| ASC 350-40 (Internal-Use Software) | Companies reporting under US GAAP | Software built or bought for the company's own use, including the software behind a SaaS product the company hosts |
| IAS 38 (Intangible Assets) | Companies reporting under IFRS | Intangible assets in general, including internally developed software |

Software built to be sold or licensed to customers as a product they install falls under a different US GAAP topic (ASC 985-20). Ask finance which one applies to your product.

---

## The three stages (ASC 350-40)

### 1. Preliminary stage

The team is deciding what to build and whether to build it.

- Evaluating alternatives, vendors, and technologies
- Proving feasibility
- Defining requirements at a conceptual level
- Most spikes

**Hours: expensed.** Not capitalizable.

### 2. Application development stage

The project is approved, funded, and expected to be completed and used as intended. The team is building the chosen solution.

- Designing the chosen approach
- Writing code
- Installing and configuring
- Testing, including integration and parallel runs

**Hours: generally capitalizable.** Capitalization starts when the preliminary stage is complete and management commits to the project. It stops when the software is substantially complete and ready for its intended use.

### 3. Post-implementation (operation) stage

The software is in use.

- Training
- Routine maintenance and bug fixes
- Minor tweaks that do not add new functionality

**Hours: expensed.** Exception: a new upgrade or enhancement that adds functionality usually starts its own cycle and can be capitalized during its own application development stage.

---

## IAS 38 in one paragraph

IAS 38 splits work into a research phase and a development phase. Research costs are expensed. Development costs are capitalized only when the company can show all six criteria: technical feasibility, intention to complete, ability to use or sell the asset, how it will produce future economic benefits, adequate resources to finish, and the ability to measure the cost reliably. In tracker terms, the research phase maps closely to preliminary, and development maps to application development once finance confirms the criteria are met. Maintenance is expensed.

---

## A note on change

Standards get updated. In 2025 the FASB issued an update to ASC 350-40 (ASU 2025-06) that removes the stage-based language in favor of a threshold based on whether completion is probable, including whether significant development uncertainty remains. Companies adopt it on their own timeline. Ask finance which version your company applies and whether the tracker labels should change. The tagging discipline in this guide still holds: label the work item, inherit from the epic, override when the work differs.

---

## The tagging rule

**Stage is tagged at the work-item level.** Each ticket carries its own stage.

- **Inherited from the epic by default.** When the epic moves from preliminary to application development, its open children move with it.
- **Overridable per ticket.** When a ticket's work is different from the epic's stage, override it and write one line explaining why.

Why the ticket and not only the epic: one epic routinely contains all three stages at once.

| Ticket inside an application-development epic | Correct stage | Why |
|---|---|---|
| Story: build the export screen | Application development | Building the approved solution |
| Spike: compare two charting libraries | Preliminary | Evaluating alternatives |
| Bug: crash on an already-shipped screen | Post-implementation | Maintenance of software in use |
| Task: write the user training guide | Post-implementation (expensed) | Training is expensed |
| Task: migrate legacy records into the new schema | Ask finance | Data conversion is often expensed |

If the stage lives only on the epic, every one of those tickets gets the epic's stage, and finance capitalizes hours it should not.

---

## Tracker setup

- Add a single-select field: `Capitalization stage` with values `Preliminary`, `Application development`, `Post-implementation`, `Not capitalizable`.
- Default it from the parent epic. Most trackers support this with an automation rule.
- Add a short text field: `Stage override reason`. Required when the ticket's stage differs from the epic's.
- Record the date each epic changed stage. Finance needs it.
- Log hours only on tickets where the stage is capitalizable, if your finance policy allows. See `sprint-operations` for how hours and points coexist.

---

## Questions to bring to finance

1. Which standard do we report under, and which version of it?
2. What evidence marks the end of the preliminary stage for a project here? (An approval record, a funding decision, a signed charter.)
3. Do we capitalize hosted-software implementation costs the same way?
4. How do we treat data conversion and migration work?
5. Do we need hours logged per ticket, or is an allocation method acceptable?
6. Who reviews the stage tags each period, and when?

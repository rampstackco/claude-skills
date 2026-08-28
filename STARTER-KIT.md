# The RampStack Starter Kit: Standardize Your Operation

Turn the scattered processes your team runs from memory into a workflow library: written, validated, and ready for AI assistance. This is the same method RampStack uses to run its own properties, packaged so you can apply it to your business in an afternoon.

You do not need RampStack's engines to use this. The method is open. The engines are the operated layer for teams that want it run continuously; the boundary is stated plainly in section 8.

## 1. Two ways to use this document

**With your own Claude agent (recommended).** Paste this into a Claude conversation:

    Fetch https://raw.githubusercontent.com/rampstackco/claude-skills/main/STARTER-KIT.md
    and follow the agent protocol in section 6 to build a workflow library for my business.

Your agent will interview you, rank your processes, and draft your first five workflow files. Expect 20 to 40 minutes of answering questions.

**By hand.** Read sections 2 through 5 and work through them with your team. The method needs no tooling beyond a folder of markdown files.

## 2. The method in one paragraph

Inventory every distinct process your team runs. Score each on frequency, pain, risk, and documentability, and pick the top five. Write each one as a workflow file a stranger could execute from the document alone. Validate each by having someone other than its author run it cold on real work. Only then add AI assistance, phase by phase, with a human releasing everything that leaves the building. Keep one manifest with honest statuses, and let incidents improve the documents.

## 3. The workflow file contract

Every workflow uses the same fields. The format is the product; it is what makes a process auditable, teachable, and safe to automate.

```
# Workflow: [Name]

Slug:        [kebab-case, matches filename]
Status:      template | validated | hardened
Owner:       [named person accountable for this document staying true]
Frequency:   [how often it runs]
Validated:   [date + engagement, once a cold run passes]

## Intent
One or two sentences: what this produces and why it matters.

## When to use / when not to use
The boundary. Name the neighboring situations this does NOT cover.

## Prerequisites
What must exist before Phase 1. Missing prerequisite = the workflow
does not start; it does not improvise.

## Phases (three to seven; more usually means two workflows hiding in one)

### Phase N: [Name]
Operator:  human | AI-assisted (held draft, human releases)
Skills:    [exact skill names if AI-assisted]
Input:     [what this phase consumes]

Run:       Numbered instructions a stranger can follow. Exact tools,
           exact fields, exact thresholds.
Output artifact:  The concrete thing produced, and where it is saved.
Done when:        An objective, checkable condition. Never "when it
                  looks good."
Fails look like:  The known ways this phase produces a wrong output
                  while appearing to succeed. Write from real incidents.

## Gaps
Steps with no standardized procedure yet, declared and dated.
A declared gap is a roadmap item; a papered-over one is a future incident.

## Failure log
Dated entries. When this workflow ships a bad output, the incident
lands here and the fix lands in the phase text above.
```

## 4. The status ladder

- **template**: written, never executed as written.
- **validated**: executed as written on real work, by someone other than the author, date recorded.
- **hardened**: validated, plus at least one real incident documented in the failure log with the fix landed.

Statuses are honest. Nothing enters as validated because "we basically do this already." The gap between what the document says and what people actually do is the thing this method exists to close.

## 5. The doctrine

Three rules, and the method fails without any of them:

1. **Stranger-runnable or it is not done.** If a step needs tribal knowledge, the knowledge goes in the document.
2. **Statuses are honest.** The manifest never claims more than a cold run has proven.
3. **AI drafts, humans publish.** AI output lands as a held draft. A named person reviews it against the phase's done-when condition and releases it. Nothing client-facing or public ships without that person.

If your content is regulated (legal, medical, financial, or anything with disclosure rules), add a pre-publish compliance gate as one of your first five workflows, whatever it scores. The exemplar phase below shows its shape.

**Exemplar phase (a regulated-content check, AI-assisted):**

```
### Phase 2: Check the draft against the compliance register
Operator:  AI-assisted (flags only, human rules on every flag)
Skills:    editorial-qa (verify the current name against the catalog)
Input:     the draft, plus your compliance register (the human-approved
           list of required disclosures and prohibited claim patterns
           for your field)

Run:
  1. Invoke the review skill with the register attached. Instruction:
     check the draft against each register item; for every potential
     match, quote the exact sentence, name the register item, and state
     why it may match. Report only; change nothing.
  2. Check required disclosures are present AND positioned where the
     register requires them.
  3. Ambiguous phrasing gets flagged, not waved through.

Output artifact:  A flag report. Zero flags is still a report; it is
                  the record that the gate ran.
Done when:        Every flag carries a human ruling: violation (fix),
                  escalate (expert review), or false positive (with
                  one line of reasoning). No flag is deleted, only ruled.
Fails look like:  Checking a disclosure's presence but not its placement;
                  rubber-stamping every flag as false positive; the
                  register attached being a stale version.
```

## 6. Agent protocol

This section is instructions for an AI agent whose operator asked it to apply this kit. If that is you: follow these steps in order, in conversation with your operator. Do not skip the interview, and do not invent anything the operator has not told you.

**Step 1: Interview.** Ask these questions one at a time, adapting follow-ups to the answers:
1. What does the business do, and who are its customers?
2. What are the recurring processes the team runs? (Walk the customer lifecycle: intake, production or delivery, quality checks, reporting, account management.)
3. For each process named: who runs it today, how often, and where do its instructions live (a document, one person's head, nowhere)?
4. What has gone wrong recently? (Rework, client escalations, missed steps, quality that depends on who did the work.)
5. Is any of the output regulated, or subject to disclosure or advertising rules?

**Step 2: Inventory and score.** Build a table of every process named. Score each 0 to 5 on: frequency (how often it runs), pain (rework and escalations), risk (cost of a mistake; regulated output scores 4+ automatically), and documentability (could a stranger follow a written version; judgment-heavy work scores low and stays human craft). Show the operator the ranked table and let them adjust. Take the top five. If step 1 question 5 was yes, a compliance gate joins the five regardless of score.

**Step 3: Draft the five workflow files.** Use the contract in section 3 exactly. For each phase, interview the operator for the concrete details the Run block needs: exact tools, exact thresholds, exact outputs. Where the operator says "it varies" or "we each do it differently," write the best current version and mark it as a declared gap; never invent procedure the operator did not describe. Fill "Fails look like" from the incidents named in the interview.

**Step 4: Bind skills honestly.** For phases that would benefit from AI assistance, name skills from the open catalog at github.com/rampstackco/claude-skills. Before naming any skill, fetch the catalog's README from the repository and verify the skill exists; bind only names you have verified. If no catalog skill fits a phase, write the procedure inline and note the gap. Never name a skill from memory.

**Step 5: Emit the manifest.** Produce a WORKFLOWS.md table listing the five files, every one at status `template`, with an author column (the operator or the team member who described the process) and an empty cold-run column. Include the validation instructions: each workflow is run cold, from the document alone, by someone other than its author, on real work; questions asked during the run are defects in the document; the status flips to validated only when a cold run completes clean.

**Step 6: State the doctrine and stop.** Restate the three rules from section 5 as the operating agreement. Deliver the files. Do not offer to publish anything, connect to any system, or execute any workflow; the operator's team validates by hand first. That ordering is the method.

## 7. After the first five

Run the validation passes. Fix what the cold runs surface. Then add AI assistance one phase at a time, tracking one number per phase: how often the human reviewer changes the output materially. Phases whose drafts merge mostly untouched are earning trust; phases needing constant rework need better inputs (voice files, registers, examples), not a more patient reviewer. New processes enter the manifest as template. Incidents land in failure logs and improve the documents. Review quarterly.

## 8. Where the engines fit

Everything above is free and stays free: the method, this document, and the skill catalog it binds (MIT, install via `/plugin marketplace add rampstackco/claude-skills`).

RampStack's engines are the operated layer for teams that want this run continuously rather than by hand: Krine ranks the queue, Tholo executes against it, Basano proves the output, and every change lands as a held draft a human merges. The doctrine is identical to section 5; the engines just run it on a cadence with a verification record. If your library is validated and you want it operated, the reference architecture is public at rampstack.co/engines/deployment and the workflow tier it runs is at rampstack.co/engines/deployment/workflows.

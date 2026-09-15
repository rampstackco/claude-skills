# Extraction-Friendly Patterns

Content patterns that AI search experiences extract cleanly, with before-and-after examples. The goal is not to write for AI exclusively. The goal is to write so a human reader gets the answer fast and an AI extractor gets it fast too. The two overlap more than people think.

---

## The principle

AI extractors and skim-readers want the same thing: the answer first, the supporting context second. Content that buries the answer behind preamble loses both audiences.

Three structural moves do most of the work:

1. **Lead with the answer.** First sentence of the section answers the section's question.
2. **Use semantic structure.** Headings name the question. Lists separate items. Tables compare options. Code blocks contain code.
3. **Be self-contained.** Each section should make sense without depending on the section above.

Everything below is an application of these three moves.

---

## Pattern 1: question-led headings

Headings phrased as the question the user actually asks.

### Bad

> ## Onboarding optimization

### Better

> ## How long should employee onboarding take?

The question form does three jobs at once: it matches likely search queries, it tells the reader what they will learn, and it tells the AI extractor what answer follows.

---

## Pattern 2: answer-first paragraph

The first sentence answers the question. Subsequent sentences provide context, caveats, and depth.

### Bad

> ## How long should employee onboarding take?
>
> Onboarding has many definitions across organizations. Some companies define onboarding as the first day, some as the first week, and others as the entire ramp-up period. There is no industry consensus, and the question depends on many factors. With that said, most modern companies aim for a structured program lasting somewhere between 30 and 90 days.

### Better

> ## How long should employee onboarding take?
>
> Most structured onboarding programs run 30 to 90 days, with 90 being the most common. The exact length depends on role complexity, company size, and how much time managers can dedicate. The first week typically covers logistics and culture; the first month adds shadowing and small projects; the second and third months ramp the new hire into full ownership.

The "Better" version puts the extractable answer in the first sentence. The follow-up adds context without burying the lead.

---

## Pattern 3: definitions in inverse pyramid

Define the term in one sentence, then expand.

### Bad

> ## What is a service blueprint?
>
> A service blueprint is a versatile tool used by many designers and product teams. Originally developed in the 1980s by G. Lynn Shostack at Bankers Trust, it has since been adopted across industries from healthcare to retail. Service blueprints help teams visualize the relationships between people, processes, and physical evidence in a service experience.

### Better

> ## What is a service blueprint?
>
> A service blueprint is a diagram that maps every step of a service experience, both what the customer sees and what happens behind the scenes. It typically uses lanes for the customer journey, frontstage actions, backstage actions, and supporting systems. Originally developed by G. Lynn Shostack in the 1980s, it is now standard in service design, healthcare workflow design, and operations planning.

The first sentence is a complete, extractable definition. AI assistants quoting your page will quote this sentence. Search snippets will lift it.

---

## Pattern 4: numbered lists for sequenced steps

Sequenced procedures go in numbered lists. Not in prose.

### Bad

> To deploy with the CLI, first you'll want to run npm install. Once that completes, run npm run build to generate the production bundle, then npm run deploy to push to your environment. After that, verify the deployment by checking the status endpoint.

### Better

> ## How to deploy with the CLI
>
> 1. Install dependencies: `npm install`
> 2. Build the production bundle: `npm run build`
> 3. Deploy to your environment: `npm run deploy`
> 4. Verify the deployment by checking the status endpoint.

The numbered list extracts cleanly into "how-to" snippets, FAQ-style answers, and HowTo schema. The prose version forces the extractor (human or AI) to do the work of parsing the steps.

---

## Pattern 5: bullet lists for parallel items

Parallel items go in bullets. Especially "what is included" or "options" lists.

### Bad

> Our enterprise tier includes single sign-on, audit logs, advanced role-based access controls, dedicated support, and custom data retention policies.

### Better

> ## What is included in the enterprise tier
>
> - Single sign-on (SSO)
> - Audit logs
> - Advanced role-based access controls
> - Dedicated support
> - Custom data retention policies

The bullet form is extractable. An AI assistant asked "what does the enterprise tier include" can quote this list verbatim.

---

## Pattern 6: tables for comparisons

When comparing 2+ options across 2+ criteria, use a table. AI extractors handle tables well; prose comparisons get garbled.

### Bad

> The free plan supports up to 3 projects and 5 team members, with email support only. The pro plan extends this to 25 projects and 25 team members, adds priority support, and includes the API. The enterprise plan removes all limits, adds SSO, audit logs, and a dedicated success manager.

### Better

> | Feature | Free | Pro | Enterprise |
> |---|---|---|---|
> | Projects | 3 | 25 | Unlimited |
> | Team members | 5 | 25 | Unlimited |
> | Support | Email | Priority | Dedicated CSM |
> | API access | - | ✓ | ✓ |
> | SSO | - | - | ✓ |
> | Audit logs | - | - | ✓ |

---

## Pattern 7: explicit Q&A blocks

For pages where the user is asking a direct question (FAQs, help docs, glossaries), use explicit Q&A formatting.

### Pattern

> **Q: [The question phrased as the user would ask it]**
>
> A: [Direct answer in 1-3 sentences. Optional supporting paragraph after.]

This is what FAQ schema lifts directly. AI extractors recognize the pattern and treat it as a discrete answerable unit.

---

## Pattern 8: self-contained sections

Each section under an H2 should make sense if read in isolation. AI extractors often pull a single section as the answer to a query. If the section depends on context from earlier sections, the answer it surfaces will be incomplete or wrong.

### Bad

> ## Setup
>
> Use the same approach we discussed in the previous section, but with the production endpoint instead of staging.

### Better

> ## Setup for production
>
> Run the deploy command against the production endpoint:
>
> ```bash
> npm run deploy --target=production
> ```
>
> The production endpoint requires the `PROD_API_KEY` environment variable. See "Environment variables" for setup.

The "Better" version stands alone. A reader (or AI assistant) landing here from search gets a complete answer.

---

## Pattern 9: explicit data and units

State numbers, ranges, and units explicitly. Vague modifiers ("a lot," "fast," "some users") do not extract.

### Bad

> Our customers see a major improvement in conversion after switching.

### Better

> On average, our customers see a 23% lift in conversion within the first 30 days after switching, based on data from 412 customers measured between January and March 2025.

The "Better" version has extractable specifics: the metric, the magnitude, the time window, the sample size, and the date range. Trustworthy AI assistants prefer extracting specifics.

---

## Pattern 10: structured author and date metadata

For any content that depends on currency or expertise, expose the metadata visibly and in schema.

- **Author byline** with a real name and a credential or one-line bio.
- **Publish date** and **last updated date** in human-readable form.
- **Reviewer** if the content is reviewed by an SME.
- Article schema with `author`, `datePublished`, `dateModified`, and (where applicable) `reviewedBy`.

AI search uses author and date signals as part of trustworthiness scoring.

---

## Pattern 11: explicit topic boundaries

Tell the reader (and the extractor) what the page is and is not about.

### Pattern

> ## What this guide covers
>
> This guide covers backup strategies for Postgres databases on managed services (AWS RDS, GCP Cloud SQL, Supabase). It does not cover self-hosted Postgres tuning, backup of file storage, or disaster recovery testing.
>
> If you are self-hosting Postgres, see [other guide]. If you are designing DR drills, see [other guide].

This pattern protects against AI summaries that conflate your scope with adjacent topics.

---

## Pattern 12: predictable summary blocks

Sections like "Summary," "Key takeaways," "TL;DR" at the top or bottom of an article extract well. Keep them tight: 3-7 bullets, one short sentence each.

### Pattern

> ## Key takeaways
>
> - Aim for 30-90 day onboarding, with 90 being the most common.
> - First week: logistics and culture. First month: shadowing and small projects. Months 2-3: full ramp.
> - The single highest-impact factor is manager time, not program design.
> - Track time-to-productivity, not arbitrary onboarding completion.

A summary block doubles as the AI snippet, the social card excerpt, and the email digest line.

---

## What to avoid

These patterns hurt extraction:

- **Walls of text without headings.** The reader and the extractor both lose place.
- **Inline references that depend on prior sections.** "As mentioned above" is invisible to a snippet.
- **Vague modifiers in place of numbers.** "Many users," "several studies," "a long time."
- **Jargon without definition.** AI assistants will define it incorrectly if you do not.
- **Marketing fluff in lead sentences.** "Discover the powerful possibilities of..." extracts as gibberish.
- **PDFs and images for content that should be text.** Tables and key data trapped in images cannot be extracted.
- **Iframe-embedded content.** AI assistants do not consistently follow iframes.

---

## How to test

After writing a page, simulate extraction:

1. Read only the H1 and the first sentence under each H2. Does the page still make sense?
2. Read only the bullet lists, tables, and Q&A blocks. Do they answer the obvious questions?
3. Ask an LLM (in a fresh context) the questions your page answers. Does it pull useful, accurate snippets from your page?
4. Check Google's "People also ask" for your topic. Does your page answer those exact questions?

If a test fails, the structure needs more semantic markup, not more words.

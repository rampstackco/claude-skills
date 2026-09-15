# Fact accuracy and citation discipline

Verification methodology, hallucination detection, citation rules, source-age guidelines.

Fact accuracy is a halt-condition QA gate. Hallucinations from AI-assisted writing reach readers if the gate is skipped or rushed. The discipline below is what makes the gate work at production speed without becoming the bottleneck.

---

## What gets fact-checked

Every claim that could be wrong. The categories.

**Statistics.** Every number in the piece needs a source. "23% of feature flag rollouts include a kill switch" needs a source link to the survey, report, or dataset that produced the 23%. Without a source, the number is either removed or replaced with sourced equivalent.

**Quotes.** Every quote attributed to a real person needs verification: the person said it, the quote is verbatim or correctly paraphrased, the attribution is accurate, the person consents to attribution.

**Case studies.** Every example refers to a real company or scenario, OR is labeled clearly as hypothetical. "Acme Corp reduced churn by 40% using this method" needs verification that Acme exists, the method was used, the 40% is real. If the example is hypothetical, the piece labels it: "Imagine a SaaS company..."

**Dates and timelines.** Verified, not approximate. "Google launched feature X in March 2025" needs verification of the exact month and year.

**Named experts.** Real people who consented to being attributed. The piece should not attribute claims to "Ronny Kohavi" without verifying the attribution traces to actual published work or direct consent.

**Product claims.** Match actual product behavior. The product does what the piece says it does, in the way the piece says it does, today, in production. Future-tense roadmap items get clearly labeled as roadmap; marketing aspirations get cut.

---

## The verification methodology

For each claim in the piece, the editor follows one of three paths.

**Path 1: in-line citation present.** Click through the citation. Does the source exist? Does the source actually say the claimed thing? Is the source the original (not a citation-of-citation)?

**Path 2: claim has no citation but is a known fact.** Editor verifies via authoritative source (academic paper, primary government data, official company announcement). Add the citation; do not let the piece ship with uncited claims.

**Path 3: claim has no citation and is not a known fact.** Halt. Return to writer with the claim flagged. Either the writer adds verification, or the claim gets removed.

The discipline. No claim ships without verification. "I'm pretty sure I read this somewhere" is not verification.

---

## Hallucination detection

AI-assisted writing produces plausible-but-fake claims at scale. The patterns to recognize.

**Pattern 1: specific decimal places, named source, source does not exist.** "According to a 2024 Forrester report, 67.3% of B2B buyers prefer..." Sounds authoritative. The Forrester report does not exist, or exists but does not say that. The decimal place is the AI tell; AI assistants generate false precision to sound credible.

**Pattern 2: quotes attributed to real people the person did not say.** "As Marc Benioff said in his keynote..." Plausible because Benioff gives keynotes. The specific quote is fabricated. Verify quotes against the actual recording, transcript, or primary source.

**Pattern 3: case studies about companies that do not exist.** "Acme Innovations reduced their cycle time 40% using..." The company does not appear in any business directory; the case study is invented. Search the company name; if it does not surface in legitimate sources, the case study is fake.

**Pattern 4: citations to URLs that 404 or never existed.** Click every external link. 404s and dead links are signals; a piece with multiple dead links has multiple unverified claims.

**Pattern 5: "Studies show" claims with no actual study.** "Studies show that..." with no link, no journal, no year. Either the writer provides the study or the claim gets cut.

**Pattern 6: made-up product features.** "[Product] now supports automatic X" when the product does not. Verify against the product's current documentation, not against marketing copy that might be aspirational.

---

## Citation discipline

When citations are present, they need to be the right kind.

**Authoritative sources.**

- Academic papers (peer-reviewed journals)
- Industry reports from established research firms (Forrester, Gartner, McKinsey, IDC) when verified
- Primary government data (BLS, Census, SEC filings)
- Original company announcements (the company's own blog, press release, official documentation)
- First-party data the brand owns and has published

**Avoid citation laundering.**

Citing another content marketing page that itself cites a primary source is laundering. The chain of attribution gets murky; the claim's accuracy degrades through each hop. Cite the primary source directly.

**Date the source.**

Sources older than 3 years for fast-moving topics need refresh. "According to a 2018 Gartner report" is a yellow flag for content about a 2026 topic; the data might still be true but probably is not. Either find a more recent source or note the date and explain why the older source still applies.

---

## When the writer disputes the fact-check

Sometimes the editor flags a claim and the writer pushes back. "I read it in the original source; here's the link." Two outcomes.

**Outcome 1: writer's source verifies the claim.** Add the citation; ship the piece. The QA process worked.

**Outcome 2: writer's source does not verify the claim.** This is where the conversation gets uncomfortable. The writer thought they had a source; the source does not say what they thought. The fix is the same: cut the claim or find a verifying source. Do not ship the unverified claim because the writer is sure it is true.

---

## Fact-check log

Maintain a log of fact-check failures across pieces. Patterns surface over time.

**Log fields.** Piece, claim, failure type (hallucination / wrong citation / outdated source / unverifiable), writer (if naming patterns), resolution (cut / re-sourced / verified).

**Patterns the log surfaces.**

- One writer repeatedly produces hallucinations: writer needs feedback or different work
- One topic area produces frequent hallucinations: that topic needs more verification time built in
- AI-co-authored pieces fail at higher rates than human-authored: AI workflow needs additional guardrails

The log is process improvement input. Quarterly review; act on patterns.

---

## Methodology-level choices that stay in the public skill

The verification methodology, the 6 hallucination patterns, the citation discipline rules, the fact-check log methodology.

## Implementation choices that stay internal

The specific tooling for storing the fact-check log (spreadsheet, database, Notion). The specific automation (if any) for surfacing claims that need verification (named-entity extractors, statistic detectors). The specific verification workflow when the editor does not have the bandwidth to fact-check personally (assistant-powered verification, fact-checking service integration). These vary by team scale and tooling preferences.

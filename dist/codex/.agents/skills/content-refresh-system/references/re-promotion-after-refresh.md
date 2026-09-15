# Re-promotion after refresh

Schema markup, visible-date update, search-engine resubmission, audience re-share, internal linking refresh. The patterns that signal a refresh to search engines and audiences.

A refreshed piece that is not re-promoted often performs only marginally better than the original. The refresh's signal to search engines is the modified date; the refresh's value to the program is partly the audience re-engagement that re-promotion produces. Programs that ship refreshes silently leave value on the table.

---

## Signal to search engines

What the search engine needs to see to recognize the refresh.

**Modified-date in schema markup.** Schema.org Article (and related types) include a `dateModified` field. Update this when the refresh ships. Many CMS platforms update this automatically on save; verify the automation is working. Schemas with stale modified dates signal that the refresh is technical rather than substantive.

**Visible modified-date on the page.** The page should display "Updated [date]" or similar visible signal. Some templates show "Published [date]" without an updated date; these should be updated to surface the refresh date.

**Sitemap update.** The XML sitemap's `lastmod` field for the URL should reflect the refresh date. Most sitemap generators handle this automatically; verify after the refresh ships.

**Search Console URL inspection and resubmission.** For high-priority refreshes, use Search Console's URL inspection tool and request indexing. This signals the refresh to the index without waiting for the next crawl. Use sparingly; bulk resubmission of every refresh can throttle.

**Internal-link-graph signals.** When sister pieces add or update links to the refreshed piece, the additional internal-link signals reinforce that the URL is current and load-bearing. Refresh that updates internal linking from sister pieces sends stronger signals than refresh that does not.

---

## Substantive vs cosmetic modifications

Search engines distinguish between substantive content changes and cosmetic touch-ups.

**Substantive changes.** Body content edits, section additions or removals, lede or closing rewrites, factual updates, restructuring. The refresh has changed what the piece says.

**Cosmetic changes.** Date stamp updates without content changes. CSS or template changes. Whitespace edits. These do not constitute refresh; updating the modified date without substantive change is signaling a refresh that did not happen.

**Why the distinction matters.** Search engines that detect the modified-date signal as cosmetic rather than substantive can devalue the signal. Programs that bump modified dates without substantive change to chase the refresh signal are running a tactic that has been increasingly detected and discounted. The honest signal is a real refresh; the tactic of date-bumping without change is short-lived value at best.

**The audit.** Refreshes should produce diff'able content changes. If the refresh ships without diff'able changes, it is not a refresh.

---

## Signal to audiences

The other half of re-promotion: re-engaging the audiences who saw the original.

**Newsletter re-share.** For pieces that originally went to the newsletter, a refreshed piece deserves a re-share. The framing is "we updated this with [specific updates]," not "here is a piece you may have seen before." Specificity earns re-engagement; vague re-shares feel like filler.

**Social re-share.** For pieces that originally landed on social channels, the refresh is a social moment. New angle, new pull-quote, new visual, framing the refresh as the news the piece now carries.

**Syndication partner update.** For pieces syndicated to partner platforms, the refresh may warrant communication with syndication partners about the updated version. Some partners pull the latest content automatically; some do not. The refresh communication closes the loop.

**Email-list segmentation.** For programs with sophisticated email-list segmentation, refreshed pieces can be sent to segments that did not see the original or that engaged with the original and may benefit from the updated version.

**Re-share cadence discipline.** Not every refresh deserves the same re-share intensity. Light edits typically do not warrant social re-share; substantial revisions or full rewrites do. Calibrate re-share to depth.

---

## Internal linking refresh

Pieces that link to the refreshed piece may benefit from anchor-text updates.

**When anchor-text update fits.** The refreshed piece's positioning shifted, and the anchor text on sister pieces should now describe the piece differently. A piece that linked to the refreshed piece as "our guide to programmatic SEO" may now want to link as "our guide to programmatic SEO durability" if the refreshed piece's framing is now durability-focused.

**When sister pieces should now link to the refreshed piece.** Some refreshes add coverage of topics that sister pieces discuss. Pieces discussing those topics that did not previously link to the refreshed piece may now warrant new internal links.

**The internal-link-refresh pass.** Some programs run a quick pass after each substantial refresh: search the library for pieces mentioning the refreshed piece's topic, audit whether the existing anchor text and link presence are correct, update where warranted.

**The over-linking failure.** Refreshes that trigger 30 internal-link updates across the library can create maintenance overhead disproportionate to value. The internal-link refresh should be targeted, not exhaustive.

---

## URL preservation vs URL change

Most refreshes preserve the URL. Some warrant URL change.

**Preserve the URL when:**

- The refresh is light edit, substantial revision, or most full rewrites.
- The existing URL has authority worth preserving (rankings, backlinks, internal-link references).
- The URL slug fits the refreshed piece's framing reasonably well even if not perfectly.

**Change the URL when:**

- The refresh is a structural redesign and the URL slug no longer fits.
- The piece is being merged with a sibling and the consolidated piece needs a new URL.
- The original URL was a structural mistake (wrong category, awkward slug) that the refresh is correcting.

**The URL-change cost.** Even with 301 redirects, URL changes incur authority transfer cost; some authority does not survive the redirect. URL changes should be earned by structural rationale, not chosen for cosmetic reasons.

**The URL-preservation discipline.** Most refreshes should preserve URLs. The default disposition is preserve; URL change is the exception requiring rationale.

---

## The refresh that nobody told anyone about

The pattern when re-promotion is skipped.

**The symptom.** A refresh ships. Modified date updates. Schema validates. The piece sits in the library with the refresh complete on paper. Traffic recovers marginally if at all. The team concludes refresh does not work.

**The actual cause.** Re-promotion was skipped. The refresh signaled to the search engine but did not signal to audiences. New-piece-style audience engagement (newsletter, social, syndication) did not happen. The refresh produced search-engine recognition without the audience-engagement spike that often drives broader recovery.

**The cure.** Build re-promotion into the refresh workflow as a non-skippable step. The refresh is not "done" when the piece is published; the refresh is "done" when the re-promotion has been executed. Define re-promotion intensity per depth (light edit may need only modified-date and schema; substantial revision needs newsletter and social re-share; full rewrite needs full re-promotion treatment).

---

## Re-promotion checklist by depth

A short framework matching re-promotion to refresh depth.

**Light edit re-promotion.**

- Modified date in schema and visible.
- Sitemap lastmod.
- No audience re-share required for routine light edits.
- Internal-link audit only if specific anchor text changes warranted.

**Substantial revision re-promotion.**

- Modified date and visible date.
- Sitemap lastmod.
- Newsletter re-share with framing on what was updated.
- Social re-share to channels that originally promoted the piece.
- Internal-link audit on sister pieces with relevant topics.

**Full rewrite re-promotion.**

- All of the above.
- Search Console URL inspection and resubmission.
- Syndication partner update where applicable.
- Email-list segment send to engaged segments.
- Visual asset refresh for social and newsletter (new pull-quote graphics, new hero image if applicable).

**Structural redesign re-promotion.**

- All of the above.
- Coordination with the broader hub or category being redesigned (see `pillar-content-architecture`).
- Cross-piece internal-link audit across the affected hub or category.
- Possible launch communication if the redesign represents a major program milestone.

---

## Re-promotion failure modes

**Skipping re-promotion entirely.** The refresh produces marginal recovery; the team concludes refresh does not work; the program loses momentum.

**Bulk-resubmitting every refresh URL to Search Console.** Search Console's URL submission has implicit rate limits; bulk submission of low-value refreshes throttles the team's submission capacity for the cases that warrant it.

**Re-share without specificity.** "We refreshed this piece; here it is" lacks the specific framing that earns re-engagement. Specific framing ("we added the 2026 data and a new section on X") earns clicks; vague re-shares get ignored.

**Anchor-text updates that proliferate.** Internal-link refresh that touches every mention of the topic across the library is over-investment. Target specifically; touch sparingly.

**Modified-date bumping without content change.** The signal that gets discounted by search engines and signals to careful auditors that the team is gaming the metric rather than producing substantive refresh.

---

## Methodology-level choices that stay in the public skill

The signal-to-search-engine patterns, the substantive-vs-cosmetic distinction, the audience re-promotion patterns, the internal-link refresh discipline, the URL-preservation default, the re-promotion checklist by depth, the re-promotion failure modes.

## Implementation choices that stay internal

Specific schema markup automation in the team's CMS. Specific newsletter and social-publishing tooling and templates. Specific Search Console workflow conventions. Specific internal-link-audit automation. Specific syndication-partner communication channels. The team's own depth-to-re-promotion-intensity mappings. These vary by team, stack, and channel mix.

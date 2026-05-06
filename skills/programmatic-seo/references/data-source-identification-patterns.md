# Data source identification patterns

First-party, licensed, public, expert-curated, synthesized. Defensibility analysis for each pattern.

The data source IS the pSEO program. A weak data source produces a weak set regardless of template quality, internal linking, or QC discipline. A strong data source produces durable traffic that compounds across years.

---

## Pattern 1: first-party data

Data the team owns because the business produced it.

**Sources.** Customer transactions, content database, user-generated content, support ticket history, internal product analytics, sales call records, customer feedback databases.

**Defensibility.** Maximum. Nobody else has the data. A competitor would have to build the same business and accumulate the same usage history to replicate.

**Examples.** Glassdoor's employee reviews (built by getting employees to submit). Yelp's restaurant ratings (built by getting users to rate). TripAdvisor's traveler reviews (built by getting travelers to write). Reddit's discussion threads (built by getting users to post).

**Watchouts.** Privacy and terms-of-service compliance. User-generated content used for pSEO needs explicit consent in the original collection terms; retrofitting consent is not legal in most jurisdictions. PII in pSEO pages is a separate liability.

**The "moat compounds over time" effect.** First-party data sources get stronger as the business runs longer. A 10-year-old review database is more defensible than a 2-year-old one with the same volume because the time-series depth itself becomes valuable.

---

## Pattern 2: licensed datasets

Data acquired through commercial licensing.

**Sources.** Industry databases (real estate MLS, automotive VIN databases, sports statistics feeds), regulatory data (SEC filings, government statistics), third-party content licenses (medical content, legal precedent).

**Defensibility.** Medium to high. Defensibility depends on license exclusivity and integration depth. An exclusive license is a moat; a non-exclusive license that anyone can also buy is not.

**Examples.** Zillow's MLS partnerships (licensed feeds with depth integration). Sportradar customers building stats sites. Bloomberg Terminal customers building financial content. Real estate brokerages with regional MLS access.

**Watchouts.** License costs scale with usage; the unit economics need to work at scale. License terms typically restrict redistribution, which can complicate pSEO scaling (the data can power the pSEO pages but cannot be exported as a downloadable dataset).

---

## Pattern 3: aggregated public data

Data scraped, cleaned, enriched from public sources.

**Sources.** Open government data, public web pages, academic research, public APIs.

**Defensibility.** Low to medium. Anyone can scrape the same sources; the defensibility comes from the cleaning and enrichment work. If the cleaning is shallow, the defensibility is none.

**Examples.** Sites built on government statistics (census data, BLS data). Sites built on academic research summaries. Sites built on public company filings (EDGAR data plus enrichment).

**Watchouts.** Legality is jurisdictional and often gray. robots.txt compliance, terms-of-service review, copyright considerations, anti-circumvention rules in some jurisdictions. The legal review is mandatory, not optional, even when the data is "public."

**The "scraped Wikipedia plus AI rewrite" anti-pattern.** The lowest-effort form of this category. The data is not really enriched (AI rewrite of public encyclopedia entries adds no defensible value). The pSEO sets built on this pattern are the ones that get penalized first when algorithm updates run.

---

## Pattern 4: expert-curated content

Data produced by hired experts who populate the dataset by hand.

**Sources.** Expert-written reviews, expert-curated lists, professionally-tested products, professionally-evaluated services, professional translations.

**Defensibility.** High. The defensibility is in the curation cost. A competitor would have to hire and pay the same experts for the same time to replicate.

**Examples.** Wirecutter's product testing (experts test products in lab conditions). Consumer Reports' product reviews. Edmunds' car reviews. Specialty publications with paid expert contributors.

**Watchouts.** Slow to build. The set scales at the speed of expert capacity, not at the speed of automated generation. Budget reflects the headcount, not the engineering effort.

**The combination pattern.** Expert-curated content often combines with structured data (the expert reviews a car; the dataset captures the expert's score plus structured specifications) to produce pages with both narrative depth and queryable structure.

---

## Pattern 5: synthesized data

Data produced by combining multiple sources into a unique view.

**Sources.** Multi-source pipelines that produce derived analyses unavailable from any single source.

**Defensibility.** Medium to high. Defensibility comes from the synthesis logic and the ongoing pipeline maintenance.

**Examples.** "Neighborhoods times schools times prices" combining three datasets into a comparison view. "Companies times salaries times employee reviews" combining three sources into a candidate-decision view. Aggregator pages that show "best X for Y use case" combining multiple product databases with use-case classification.

**Watchouts.** The synthesis logic is the moat, not the underlying sources. Changes to source schemas break the pipelines. The pSEO program inherits the operational fragility of multi-source pipelines.

---

## The defensibility test

For each candidate data source, walk this question: would a competitor be able to replicate this source within 6 months at reasonable cost?

- **Yes, easily.** No moat. Pursue editorial content instead, or invest in expert curation to build a moat.
- **Yes, with effort.** Partial moat. The first-mover advantage matters; ship before competitors.
- **No, requires major investment.** Real moat. pSEO compounds.
- **No, requires assets the competitor cannot acquire.** Strongest moat. The pSEO program becomes a long-term competitive advantage.

---

## Combining patterns

The strongest pSEO programs combine multiple patterns.

- First-party data plus licensed data (Glassdoor: user reviews plus salary licenses)
- Licensed data plus expert curation (Wirecutter: licensed product databases plus expert testing)
- First-party data plus synthesized data (Yelp: user ratings synthesized with location data and external attributes)

Single-pattern programs are simpler to ship but easier to replicate. Multi-pattern programs are harder to build and harder to copy.

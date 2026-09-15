# Schema design patterns

Field count, computed fields, cross-record fields, update tags, schema-as-product. The data shape that drives the template.

The schema design here is the methodology layer: what shape the data takes, what fields earn their keep, what derivations add depth. Specific framework type signatures, ORM bindings, and database column choices are stack-specific implementation that varies by team.

---

## Field count signals depth

5 fields per record is thin. 15 to 20 is competent. 30+ is deep.

**Why field count matters.** Field count determines what the template can render at depth versus what falls back to filler. A record with 5 fields can produce a 200-word page; a record with 30 fields can produce a 1,500-word page that reads as substantive across multiple sections.

**The "thin schema" failure mode.** Teams design with 5 to 10 fields, ship, find pages reading as thin, then try to bolt on additional fields after the fact. Bolt-on fields rarely populate consistently across the existing dataset; the result is a half-thin set with a thin tail and a thicker head.

**The "too-many-fields" trap.** 50+ fields per record where most are sparsely populated. The schema looks deep on paper but most fields are empty for most records. The template either renders empty sections (looks broken) or hides them (back to thin pages). Better to design 25 fields with 90% population than 50 fields with 30% population.

---

## Required vs optional fields

Which fields must populate for a page to ship; templates need graceful degradation for optional gaps.

**Required field discipline.** Define a minimum field-count threshold below which a record does not get a public page. The threshold ships in the schema validation; pages that fail validation sit as drafts until their data populates.

**Optional field handling.** Each optional field has a render rule: if populated, render this section; if empty, hide this section or substitute a computed default. The render rules are part of the template, not afterthoughts.

**The discipline.** A page with 25 of 30 optional fields populated is fine. A page with 3 of 30 should not ship; it produces filler content that drags the entire set's quality signal down.

---

## Computed fields

Derived from source data. Computed fields are the pSEO equivalent of the writer adding analysis: the data does the analysis once, every page benefits.

**Common computed-field patterns.**

- **Aggregations.** "Average price per square foot" computed from listing data; "median rating" computed from review data.
- **Derived classifications.** "Price tier" computed from price percentiles; "freshness tier" computed from data age.
- **Comparisons.** "Price vs neighborhood average" computed from the record's price and the parent category's average; "rating vs category average."
- **Trends.** "Price trend over 12 months" computed from time-series source data; "review-volume trend" from review-date stamps.
- **Rankings.** "Top 10 percent by [field]" computed across the set; "ranked by [field] within [category]."

**Why computed fields earn their keep.** Each computed field adds a section to the template without requiring more source-data collection. The pipeline does the work; the template renders the result. This is how 15-field source data produces 30-field rendered pages.

---

## Cross-record fields

Fields that reference OTHER records in the set. Enable internal linking and comparison without manual curation.

**Common cross-record patterns.**

- **Most similar records.** "5 most similar neighborhoods" computed by attribute distance.
- **Parent and child references.** "Parent category" and "list of child records" computed from the hierarchy.
- **Sibling-comparison aggregates.** "Average price across sibling neighborhoods" computed across the parent's children.
- **Recommended-related.** "Users who viewed X also viewed Y" computed from analytics data (when first-party analytics is available).

**How they power linking.** The sibling-link slot in the template renders from the "most similar records" cross-record field. Without this field, sibling linking becomes manual curation at scale, which is infeasible.

---

## Update frequency tags

Which fields are static (geographic features, founding date) versus which need refresh tracking (current pricing, availability, current statistics).

**Tag categories.**

- **Static.** Set at record creation; rarely changes (geographic coordinates, neighborhood name, founding year).
- **Slow-changing.** Updates quarterly to annually (population statistics, business categories, attribute classifications).
- **Volatile.** Updates daily to weekly (current price, current availability, current rating, recent reviews).
- **Real-time.** Updates within minutes (live availability, dynamic pricing). Only relevant when the underlying data feed supports it.

**Why tagging matters.** Without tags, refresh becomes "audit everything every cycle," which does not scale. With tags, refresh becomes "refresh volatile fields daily, slow-changing fields quarterly, static fields never," which scales.

---

## Schema-as-product principle

The schema that drives pSEO IS the product surface. Treat it with the same rigor as a database schema for a customer-facing application.

**Schema versioning.** Major schema changes (renaming required fields, restructuring nested objects, changing field types) bump a version. Minor changes (adding optional fields, adding computed fields) do not. All schema changes are reviewed; breaking changes require migration plans.

**Schema documentation.** Every field has a description, a source (where the data comes from), an update tag, a population rate (what percentage of records have this field), and example values. Documentation lives alongside the schema; it is not a separate doc that drifts.

**Schema review.** Before adding fields or changing field types, the schema change goes through review with stakeholders who depend on the schema (template authors, QC reviewers, analytics consumers). Schema changes affect downstream rendering; review catches breakage before it ships.

**Schema testing.** Validation rules ship as automated tests. Required fields, type constraints, value-range constraints, cross-field consistency checks. The tests run on every record in the dataset on a cadence; failures surface in the QC queue.

---

## When the schema is wrong

The schema is wrong when:

- Required-field threshold produces too few publishable pages (relax the threshold or fix the data pipeline)
- Required-field threshold produces too many shallow pages (raise the threshold; let thin records sit as drafts)
- Optional fields are sparsely populated, dragging the average page quality down (drop them and refocus on dense fields)
- Computed fields are not actually used by the template (cut them; reduce schema bloat)
- Cross-record fields produce poor sibling matches (revise the similarity algorithm; the sibling-link section is doing real work for users)
- Update tags are wrong (refresh cadence is missing or over-shooting; recalibrate)

The schema is iterated, not designed once. The "schema-as-product" principle makes that iteration safe by enforcing review and migration discipline; without it, every schema change risks breaking the template.

---

## Methodology-level choices that stay in the public skill

Field-count thresholds, computed-field patterns, cross-record patterns, update-tag categories, the schema-as-product principle.

## Implementation choices that stay internal

The specific schema language (TypeScript type definitions, dbt YAML, Sanity schema config, Prisma schema, etc.). The specific ORM or query layer. The specific validation framework. The specific deployment pipeline for schema migrations. These vary by stack.

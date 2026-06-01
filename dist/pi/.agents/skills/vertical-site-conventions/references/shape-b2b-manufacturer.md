# Shape: b2b-manufacturer

Industrial manufacturers, robotics, machine tools, components, OEMs, industrial integrators. The reader arrives as a buying engineer, a procurement specialist, an operations leader, or an industrial integrator, wanting specs, applied examples with named metrics, certifications, and a short path to an engineer-not-a-sales-rep.

This file is a default set of composition conventions for the shape. When `competitor-experience-audit` has been run for the specific vertical (robotics, machine tools, semiconductor equipment, industrial sensors), the audit's experience bar overrides these defaults. Use these when no audit has been run, or as a sanity check on an audit's output.

---

## 1. Primary-task prominence

**Primary task:** see the products with specs visible, see the applied examples with named metrics, and request a demo or working session with an application engineer. The B2B-manufacturer conversion is a sales conversation, not a transactional add-to-cart; the page is a credibility document and a routing tool.

**Build conventions:**
- The demo / contact action is in the chrome on every page AND in the hero AND at the end of each product detail page. Three placements, one form.
- The form is short. Six fields at most (name, company, work email, role, product of interest, problem statement). Long forms signal funnel-thinking; the field's leaders treat the first call as a working session, not a qualification step.
- Specs are surfaced in HTML, not in a PDF gated behind a marketing form. PDF datasheets exist for downloading after the page has done its job, not as the only path to the spec.
- The site does not invent dollar figures for products that are quote-based. Quote-based products carry "request a quote" or "talk to engineering," not "$ X."

## 2. Layout register and density

**Register:** technical-considered. Denser than a SaaS marketing page; less dense than an ecommerce catalog. Photography is industrial: factory floor, product close-up on a clean concrete surface, single subject. Cinematic, restrained, not Instagram.

**Build conventions:**
- **Above the fold at a 1280x800 desktop viewport**, the page carries: a single-subject hero photograph of a product (or a representative product), a declarative one-line manifesto or capability statement, the demo CTA, AND a product-or-application strip. A B2B-manufacturer hero that leads with a marketing slogan and no product visible reads as a brochure, not equipment.
- The hero photograph is industrial, not lifestyle. Equipment on the factory floor or in studio; no humans in lab coats unless they are doing real work.
- Whitespace is engineered, not generous. The page is a working document. Editorial-airy layouts read as off-vertical; catalog-dense layouts read as wrong too. A considered mid-density grid is the convention.
- Route color, type, and aesthetic to `creative-direction` and `design-standards`. This shape's register can be cinematic-premium (anode-ev style: drivetrain-as-design), technical-considered (edge-devtools style: spec-as-page), institutional-professional (counsel-law style: certification-led), or rugged-utilitarian (forge-fitness style: equipment-as-tool); not flowery or expressive.

## 3. Product surface

**Conventions:**
- A product listing page carries each product line with a name, a tagline (one declarative sentence), three to six headline specs, a product image, and a link to the detail page.
- A product detail page carries: full spec table (payload, reach, repeatability, latency, IP rating, safety standards, integration interfaces), the blurb, **a primary product image plus at least one secondary image** (a different angle, a close detail of a critical sub-system, or an in-context-on-a-line shot), the certifications applicable to this product, the applications that use it, a demo CTA wired to this product, integration-interface section (OPC UA, EtherNet/IP, REST API, etc.).
- Specs are an HTML table, not an image of a table from a PDF. Crawlers and screen readers read it; copy-paste works.
- Product imagery is real, single-subject, industrial-product photography. Premium register matching the brand (factory-floor or studio backdrop, controlled lighting, the machine as the subject). Spec tables alone read as a brochure-with-numbers; a buyer needs to see the machine. Specs remain the spine of the page; imagery supports the specs, it does not replace them.
- Certifications are carried at the **product level** on the detail page, not buried on About. A buyer screening for "must be ISO 10218 certified" should see the certification on the product page in under three seconds.
- Quote-based pricing is named openly. "Quote-based"; "Talk to engineering"; "Configurations vary by integration." A blank price field signals "this is hidden from me" rather than "this is configured to your line."
- Product imagery is honest-demo where the build is a showcase: unbranded equipment, no fabricated competitor logos, no real-world manufacturer brand marks, no baked-in pricing or spec text in the image (specs live in HTML). Industrial-product image generation is prone to hallucinating brand badges and control-panel writing; the image-pipeline gate's brand-name and fabricated-logo checks are load-bearing here.

## 4. Applications surface (the case studies)

**Conventions:**
- An **applications page** with named industries and named metrics. Battery cell assembly, warehouse throughput, precision machining, automotive sub-assembly. Each application named with the cycle time, the throughput change, the payback period, the first-pass yield, the operator-hours saved.
- Genericized marketing prose ("a global leader in X partnered with us") is the field's miss; the convention is to name the metric even if the customer is anonymized. "Throughput up 38%. Scrap rate down 22%. Cycle time per module under nine seconds." Pattern-level facts are credible; vague success language is not.
- Each application links to or references the products it uses, so a reader who arrived via Products can cross-walk to Applications and back.
- For showcase or demo builds, the functional-vs-demo line: pattern-level facts are acceptable but should be labeled as such in the workup; the build should not imply a real anonymized customer when one does not exist.

## 5. Company, certifications, and engineering posture

**Conventions:**
- A Company page with founding year, headquarters, certifications, plain-language about the engineering posture. Not a brand story.
- Certifications baseline at the company level (ISO 9001, ISO 10218, UL, AS9100, IEC 61508, etc.) and at the product level on each detail page. Buyers screen for these; making them findable is a credibility move.
- Made-in-X is named openly if relevant (made in Pittsburgh, designed in Munich, assembled in Taiwan). Country of design and country of manufacture are different and both are surfaceable.
- Founding team, depth of bench, customer count, plant size are facts a buyer's committee asks for; the page should answer them without forcing a sales conversation first.
- The engineering posture (what the company believes about how to build equipment) is a real thing to name. "The factory is the test bench" or "every product runs on our own line before it ships" is the kind of plain claim that does the work brand-essay generic copy fails to do.

## 6. JSON-LD and structured data

**Conventions:**
- Organization schema at the layout level: name, description, url, logo, founding date, address.
- Product schema on each product detail page: name, description, category, brand, manufacturer, sku, identifier.
- Where pricing is quote-based, omit the price field rather than fake one. Structured-data validators flag missing price; the buyer reads quote-based as honest.
- BreadcrumbList on every page beneath the home.

## 7. Demo / contact flow

**Conventions:**
- The demo form is on-site, six fields, no third-party gating. Form mounts the same component everywhere.
- The form does not require a phone number to submit; phone is optional.
- The "what happens next" copy is honest. "An application engineer reaches out within one business day to schedule a working session" is the field's leader posture. "A representative will be in touch shortly" is the field's miss.
- Phone-as-fallback: a visible phone number for buyers who would rather call.
- For procurement-led conversations, a separate "Request a quote" path that asks for the line spec (units per year, integration constraints, certifications required) is conventional; for a single-build demo, the demo form covers both.

## 8. Trust and conversion signals

**Signals this shape carries:**
- Specs visible, in HTML, on every product page.
- Applications named with named metrics.
- Certifications surfaced at the product level.
- Plain company facts (founding, headquarters, plant size, deployment geography).
- Engineering-posture statement that names what the company believes.
- Optional but conventional: a named-publication pull-quote or analyst quote ("X named Volta to the top tier"). Logo walls are the field's miss; one named pull-quote is the convention.

For showcase or demo builds, the functional-vs-demo line: real where touchable (real form state, real validation, real interaction, real spec tables), honestly demo where it needs a backend (clearly labeled demo request modal, no fake CRM entry, no fake customer logos).

## 9. Recurring vertical conventions (the synthesis)

A credible B2B-manufacturer site, against the field of leaders, carries eleven conventions:

1. A single-subject industrial hero photograph above the fold at a 1280x800 desktop viewport, with a declarative one-line manifesto and the demo CTA.
2. **(Density-bearing)** Specs surfaced as an HTML table per product, not gated behind a PDF.
3. A product listing page with each product line, its tagline, three to six headline specs, and a product image visible per line.
4. A product detail page with full spec table, certifications at the product level, applied applications, and a demo CTA wired to the product.
5. **(Density-bearing)** An applications page with named industries and named metrics (cycle time, throughput change, payback period, first-pass yield); no genericized "global leader in X" prose.
6. A Company page with founding year, headquarters, certifications, and an engineering-posture statement that names what the company believes.
7. JSON-LD Organization at the layout level; Product schema on each product detail page (with the primary and secondary image URLs populated under image).
8. **(Density-bearing)** A demo / contact form that is on-site, six fields, no third-party gating; the demo flow lives within the site's visual contract.
9. Honest "what happens next" copy on the demo path; phone-as-fallback visible.
10. Where pricing is quote-based, no fake dollar figures; the page names the quote-based posture openly.
11. **(Density-bearing, new)** Real product imagery on the product surface. Each product detail page carries a primary product image plus at least one secondary (a different angle, a close detail of a critical sub-system, or an in-context-on-a-line shot). Product listing cards lead with a product image above the spec table, not specs alone. Premium / industrial / single-subject register, honest-demo where the build is a showcase (no fabricated brand marks or pricing baked into the imagery). Spec tables remain the spine of the page; imagery supports the specs, it does not replace them.

**Threshold and density-bearing items.** A build hitting 9 or more of these is at the experience bar for the shape; the wedge is what the build does beyond that. A build missing 3 or more is off-vertical and needs composition work, not a polish pass.

Conventions **2, 5, 8, and 11 are the density-bearing ones**, the items whose absence makes a checklist-passing build still read as a brochure, a lead-gen funnel, or a half-built equipment site instead of a credibility document. A build can miss a nice-to-have (the phone-as-fallback, for example) and still read as the vertical; missing any of the density-bearing four will make the build read off-vertical regardless of how many other conventions it hits. Treat the density-bearing items as non-skippable.

**Why convention 11 needed to be added separately.** The first b2b-manufacturer build (Volta Robotics) carried conventions 1 through 10 cleanly: spec tables in HTML, named-metric applications, six-field on-site demo form, certifications at the product level, JSON-LD Product schema. It passed the checklist and still read thin against a premium-industrial buyer's eye: one hero image, then spec-only product cards on the lineup and spec-only detail pages. A premium capital-equipment buyer expects to see the machine, multiple angles, in-context on a line. The model flagged it, the human confirmed it. A spec-led build can be checklist-correct and still register as a brochure-with-numbers rather than equipment. Convention 11 closes that gap: the product surface carries real product imagery as a chrome-level convention, not a polish extra; the spec table is the spine and the imagery is the evidence the spine describes a real machine.

---

## Common positioning wedges in this shape

From the gaps the audited fields tend to share:

- **Specs are the page.** Most competitors gate specs behind a marketing form for a PDF download. A build that surfaces the full spec table in HTML on every product page owns the "we are not afraid of comparison" position.
- **Named metrics on the applications page.** Most competitors write applications in genericized marketing prose. A build that names cycle time, throughput change, and payback period (even with the customer anonymized) owns the "we ship outcomes, not narratives" position.
- **Engineer-facing demo flow.** Most competitors route demo requests through marketing-gated long forms with MQL scoring. A build that runs a six-field on-site form and connects to an application engineer (not a sales rep) owns the "first call is a working session" position.
- **Certifications at the product level.** Most competitors mention certifications on About. A build that carries the applicable certifications on each product detail page owns the "we screen the way your committee does" position.
- **Engineering-posture statement.** Most competitors write a brand story. A build that names a plain engineering belief ("the factory is the test bench"; "every product runs on our own line before it ships") owns the "we mean what we say" position.

Pick one wedge per build. Two wedges dilute the positioning; zero wedges hits the bar without a reason to remember.

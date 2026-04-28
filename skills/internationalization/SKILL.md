---
name: internationalization
description: "Plan and run a multi-language or multi-region site. Use this skill when adding new locales, choosing URL structure for languages (subfolders vs subdomains vs ccTLDs), implementing hreflang, planning translation workflow, handling currency and date formats, designing for RTL languages, or auditing a stalled internationalization rollout. Triggers on internationalization, i18n, localization, l10n, hreflang, multi-language, translation workflow, RTL, locale, ccTLD, subfolder vs subdomain, language switcher. Also triggers when international audiences underperform or translations are stale."
---

# Internationalization

Add languages and regions in a way that works for users, search engines, and the team maintaining the content. Stack-agnostic.

---

## When to use

- Adding the first non-English (or non-default) language
- Adding additional locales to an existing internationalized site
- Choosing URL structure for languages
- Implementing hreflang tags
- Designing translation workflow
- Handling currency, date, time, and number formats
- Designing or fixing layout for RTL languages
- Auditing an internationalization rollout that's underperforming

## When NOT to use

- Single-language site (use other skills)
- Domain strategy that's not language-driven (use `domain-strategy`)
- Content strategy independent of locale (use `content-strategy`)
- Marketing copy production (use `content-and-copy`)

---

## Required inputs

- The locales in scope (language + region, e.g., `en-US`, `de-DE`, `fr-CA`)
- Business reason per locale (priority, audience size)
- Existing site architecture
- Translation resources (in-house, agency, AI-assisted, community)
- Content volume and update frequency

---

## The framework: 5 layers

Internationalization touches everything. Five layers, each with their own decisions.

### Layer 1: URL structure

How locales are reflected in URLs.

| Pattern | Example | When |
|---|---|---|
| ccTLD | example.de, example.fr | Strong country focus, distinct legal entities, willing to maintain separate domains |
| Subdomain | de.example.com, fr.example.com | Logical separation, willing to host separately, common for large sites |
| Subfolder | example.com/de/, example.com/fr/ | SEO equity unified, simplest to manage, default for most |
| URL parameter | example.com?lang=de | Avoid; weak SEO signal |

For most sites: subfolder is the default. Subdomain or ccTLD only when there's a specific reason (legal, infrastructure, or brand).

Within the chosen pattern, decide:
- Language only (`/de/`) or language plus region (`/de-de/`, `/de-at/`, `/de-ch/`)?
- Default locale: at the apex (`example.com`) or in a folder (`example.com/en/`)?

The default-locale-at-apex pattern is common but causes hreflang complexity (the apex needs an `x-default` and the canonical for the default language).

### Layer 2: Content structure

How content is organized across locales.

**Pattern A: Mirror.** Every page in every locale. The translation IS the page. Suitable for marketing sites with controlled content.

**Pattern B: Subset.** Some content in all locales, some only in select locales. Common for product pages (only available products), blog (some posts translated), or regulatory differences.

**Pattern C: Local.** Each locale has its own content largely independent of other locales. Common for media or community sites.

Most marketing sites are A. Most large sites end up at B by necessity. C is for sites with strong regional editorial.

The pattern affects:
- How content models are designed (does each piece have parent/translation relationships?)
- How translation is managed (workflow assumes the structure)
- How the team coordinates

### Layer 3: hreflang and canonicals

Telling search engines what's translated vs distinct.

**hreflang** specifies the language and optional region for each version.

```html
<link rel="alternate" hreflang="en-US" href="https://example.com/en-us/page">
<link rel="alternate" hreflang="en-GB" href="https://example.com/en-gb/page">
<link rel="alternate" hreflang="de-DE" href="https://example.com/de-de/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/en-us/page">
```

Rules:
- Every page lists every translated equivalent (including itself)
- Pages must reciprocate (page A says page B is its German version; page B says page A is its English version)
- `x-default` is the fallback for users in unspecified regions
- Each page has its own canonical pointing to itself (not to the default language)

hreflang can be in the HTML head, in HTTP headers, or in the XML sitemap. Sitemap is best for large sites; HTML head is fine for small.

**Canonicals:**
- Self-referential per page
- Don't canonical the German page to the English page (search engines won't index the German page)

### Layer 4: Translation workflow

How content gets translated, kept fresh, and quality-controlled.

**Sources of translation:**
- In-house translators (full-time staff)
- Translation agency (paid per word, professional)
- Community contributors (volunteer, variable quality, free)
- AI-assisted plus human review (cheap, fast, growing in quality)
- AI only (acceptable for some content, not for brand-critical)

**Workflow stages:**

1. **Source content authored** in the source language
2. **Translation requested** through a TMS (translation management system) or spreadsheet
3. **Translation produced** with translation memory (avoids retranslating reused phrases)
4. **Review** by a second translator or in-region staff
5. **Localization** beyond translation (currency, units, examples, cultural references)
6. **Publishing** in the destination locale
7. **Update propagation** when source content changes

The TMS pays off above ~10K words of total content. Below that, spreadsheets and disciplined naming are fine.

**Update propagation is the hardest part.** Source content changes. Translations go stale. Without a process, you end up with locales drifting from the source.

### Layer 5: Locale-aware UX

Beyond translation, the experience must adapt.

**Currency:** display in the local currency where applicable. EUR for European locales, JPY for Japanese, etc. Don't show USD to French users for a French-locale page.

**Numbers:** thousand separators and decimals differ. `1,000.50` in en-US is `1.000,50` in de-DE.

**Dates and times:** format and order vary. `MM/DD/YYYY` in en-US, `DD/MM/YYYY` in en-GB, `YYYY-MM-DD` (ISO) is universal but unfamiliar to many.

**Names and addresses:** field order and required components differ. Country-aware address forms.

**Phone numbers:** E.164 international format universally; display formatting per locale.

**Units:** metric vs imperial. Most of the world is metric; the US is imperial. Some products serve both.

**Right-to-left (RTL) languages:** Arabic, Hebrew, Persian, Urdu. Layout flips: navigation moves right, text aligns right, icons that imply direction may flip too. CSS logical properties (`margin-inline-start` instead of `margin-left`) make this manageable.

**Language switcher:** prominent but not intrusive. Show locale names in their own language ("Deutsch" not "German"). Persist the choice. Don't auto-redirect based on browser language without offering a way back.

**Cultural sensitivity:** colors, imagery, examples, references that don't translate. Avoid hand gestures in product imagery. Avoid country-specific references unless localized.

---

## Workflow

### Step 1: Decide which locales

Don't add languages just because you can. Each locale has ongoing maintenance cost.

- Audience research: where are visitors and prospects?
- Business priority: which markets are growth targets?
- Content readiness: do you have the resources to maintain it?
- Legal: do regulations require localization (GDPR, accessibility laws)?

### Step 2: Pick URL structure

Subfolder for most. Document the choice and rationale.

### Step 3: Pick content structure

Mirror, subset, or local. Be honest about what's sustainable.

### Step 4: Set up hreflang and canonicals

Implement before launching the second locale, even if it's just one extra page.

### Step 5: Set up translation workflow

Pick a TMS or spreadsheet system. Document the workflow. Designate translators and reviewers.

### Step 6: Localize beyond translation

For each locale:
- Currency, numbers, dates, units
- Locale-specific images if needed
- Address forms
- Customer service hours and contact

### Step 7: Implement language switcher

- Prominent in the header or footer
- Shows the current locale clearly
- Lists all available locales in their own language
- Persists the choice (cookie or local storage)
- Doesn't auto-redirect based on browser; suggests instead

### Step 8: Test

- Each locale renders correctly
- hreflang links are valid (use a checker)
- Canonicals are self-referential per page
- Currency and dates are correct
- RTL layout is correct (for RTL locales)
- Language switcher works and persists
- Search-engine perspective: each locale is crawlable and indexable

### Step 9: Launch and monitor

Per locale:
- Indexing rate
- Traffic from intended geographies
- Engagement metrics in the locale
- Translation freshness (when did source content change without translation update?)

### Step 10: Maintain

- Translation update cadence (when source changes, when translations follow)
- Quarterly review of locale performance
- Sunset locales that aren't viable (better than maintaining a dead locale poorly)

---

## Failure patterns

**Auto-redirect based on browser language.** User is in Germany, prefers English. Site forces German. Frustrating. Suggest, don't redirect.

**Single canonical to default language.** Search engines can't index the translations. Self-canonical per page.

**Reciprocal hreflang missing.** German page lists English as its translation, English page doesn't list German. Search engines treat the relationship as unconfirmed.

**hreflang language without region when region matters.** `hreflang="es"` is fine if there's one Spanish version. If you have es-ES (Spain) and es-MX (Mexico), use both with regions.

**Auto-translated content treated as final.** Machine translation is an acceptable starting point. Human review is necessary for any user-facing content.

**Currency baked into copy.** "$99/month" in body text breaks for European users. Use templated currency that adapts.

**Hardcoded date formats.** "January 5, 2024" in code. Doesn't adapt. Use a date formatting library that respects locale.

**Field labels left in source language.** Translated body, untranslated form labels. Inconsistent. Translate UI strings as part of localization.

**Untranslated error messages.** User submits a form, gets an error in English on a French page. Frustrating. Translate UI states.

**Untranslated emails.** Site is in French; transactional emails are English. Translate emails to match.

**Forgotten locales in CMS.** Editors forget to update one locale. Drift. Use a TMS or workflow that surfaces drift.

**Locale switcher that doesn't work mid-flow.** User is on the German checkout, switches to French, lands on French homepage. Try to land on the same page in the new locale.

**RTL layouts that don't actually flip.** Margin and padding hardcoded for LTR. Use CSS logical properties.

**Sunset language without redirect.** Discontinuing French; old French URLs 404. Redirect to the closest equivalent in another supported language.

---

## Output format

An internationalization plan includes:

- **Locale list:** with priority and audience rationale
- **URL structure:** chosen pattern and reason
- **Content structure:** mirror, subset, or local
- **hreflang plan:** how it's implemented
- **Translation workflow:** sources, stages, tools
- **Localization checklist:** beyond translation (currency, dates, etc.)
- **Language switcher design:** position, behavior, persistence
- **Test plan:** what's verified per locale
- **Maintenance plan:** update cadence, drift detection

---

## Reference files

- `references/locale-checklist.md`: Per-locale checklist of everything that needs to adapt beyond translation, organized by category (URL, content, UX, format, legal).

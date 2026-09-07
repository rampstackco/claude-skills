# Locale Checklist

A per-locale checklist of everything that needs to adapt beyond translation. Walk through this for each locale before launch, and revisit when adding new content.

---

## URL and structure

- [ ] Locale URL pattern chosen and consistent (subfolder, subdomain, or ccTLD)
- [ ] Locale code uses standard format (BCP 47: `en`, `en-US`, `de-DE`, `zh-Hant`)
- [ ] Default locale handling decided (apex vs folder)
- [ ] URL slugs translated where appropriate (e.g., `/products/` → `/produkte/` for German)
- [ ] Or URL slugs kept consistent across locales (acceptable for many sites; prioritizes consistency over native readability)

---

## Search engine signals

- [ ] hreflang tags present on every page, every locale
- [ ] hreflang reciprocity verified (page A links to B, B links to A)
- [ ] hreflang includes `x-default` pointing to the fallback
- [ ] Canonical tags self-reference (each locale page canonicals to itself)
- [ ] Sitemaps include all locales (one sitemap per locale or a combined sitemap)
- [ ] robots.txt allows all locale paths
- [ ] Schema.org `inLanguage` attribute on appropriate types

---

## Translation completeness

- [ ] Page content translated
- [ ] Page titles and meta descriptions translated
- [ ] Image alt text translated
- [ ] Form labels translated
- [ ] Form validation messages translated
- [ ] Error pages (404, 500) translated
- [ ] Success messages translated
- [ ] Email templates translated (transactional, marketing)
- [ ] PDF or downloadable assets translated (or alternate version provided)
- [ ] Help and FAQ content translated
- [ ] Legal pages translated (privacy, terms, cookies)

---

## Currency and money

- [ ] Currency displayed matches the locale (EUR for euro zone, GBP for UK, JPY for Japan, etc.)
- [ ] Currency symbol position correct ($1,000 vs 1.000 €)
- [ ] Decimal separator correct (1,000.50 vs 1.000,50 vs 1 000,50)
- [ ] Thousand separator correct (comma, period, space, or none)
- [ ] Pricing tables localized to native pricing (not direct conversion)
- [ ] Tax handling (inclusive vs exclusive) matches local convention

---

## Numbers and units

- [ ] Number format follows locale (1,234.56 vs 1.234,56)
- [ ] Negative numbers (-5 vs (5)) follow convention
- [ ] Percentages format correctly (5% vs 5 %)
- [ ] Measurement units match (km vs miles, kg vs lb, °C vs °F)
- [ ] Paper sizes if relevant (A4 vs Letter)

---

## Dates and times

- [ ] Date format matches (DD/MM/YYYY for most of Europe, MM/DD/YYYY for US, YYYY-MM-DD ISO)
- [ ] Day-of-week localization (Monday vs Lundi vs 月曜日)
- [ ] Month names localized
- [ ] First day of week (Monday in Europe, Sunday in US)
- [ ] Time format (12-hour with AM/PM vs 24-hour)
- [ ] Time zone display where relevant
- [ ] Relative time strings localized ("2 hours ago" → "il y a 2 heures")

---

## Names and addresses

- [ ] Name field structure matches (single name field for some cultures, given/family for others, family-first ordering for some Asian languages)
- [ ] Address form fields adapt to country
  - US: street, city, state, ZIP
  - UK: street, town, county, postcode
  - Germany: street, postal code, city
  - Japan: postal code, prefecture, city, ward, block, building
- [ ] Postal code validation per country
- [ ] State/region/prefecture/county field renamed appropriately
- [ ] Country dropdown ordered by region or alphabetical (avoid US-first if not US-centric audience)

---

## Phone numbers

- [ ] Country code defaulted appropriately
- [ ] E.164 format stored (+CCNNNNNNNNNN)
- [ ] Display format adapts to country
- [ ] Validation accepts international formats

---

## Imagery and media

- [ ] Images depict locally relevant people, places, products
- [ ] Avoided imagery that's offensive in the locale (gestures, symbols, color associations)
- [ ] Cultural references in screenshots/examples are appropriate
- [ ] Image text translated (text in images doesn't auto-translate)
- [ ] Video subtitles or dubbing in the locale language

---

## Layout and direction

- [ ] LTR/RTL handling correct for the script
- [ ] CSS logical properties used (`margin-inline-start` instead of `margin-left`)
- [ ] Icons that imply direction (arrows, chevrons) flip for RTL
- [ ] Numbers display LTR even within RTL text (per Unicode bidi algorithm)
- [ ] Tables and lists adjusted for direction

---

## Typography

- [ ] Fonts support the script (not all fonts cover Cyrillic, CJK, Arabic, etc.)
- [ ] Font sizes adjusted if needed (some scripts read smaller; CJK often needs slightly larger)
- [ ] Line height appropriate (CJK often needs more)
- [ ] Word breaking handled (no breaking in the middle of CJK characters; break opportunities for Thai)
- [ ] Quotation marks correct ("..." in English, „..." in German, «...» in French, 「...」 in Japanese)

---

## Search and sort

- [ ] Search handles diacritics ("café" matches "cafe" or doesn't, by design)
- [ ] Sort order respects locale (German sorts ä with a, Swedish sorts ä after z)
- [ ] Search results in the same locale as the user (don't show English results to French users)

---

## Forms and inputs

- [ ] Input methods supported (IMEs for CJK, etc.)
- [ ] Pasting from clipboard works with non-Latin characters
- [ ] Field validation accepts non-Latin characters where appropriate (names should accept any Unicode)
- [ ] Min/max length constraints work for the script (Japanese names are often shorter; Arabic/Hebrew names use different character counts)

---

## Legal and compliance

- [ ] Privacy policy adapted to local laws (GDPR for EU, LGPD for Brazil, CCPA for California, etc.)
- [ ] Cookie consent matches local requirements
- [ ] Terms of service in local language and acknowledging local law
- [ ] Required disclaimers present (consumer protection, financial services, healthcare, etc.)
- [ ] Tax handling per locale (display inclusive in EU, exclusive in US, etc.)
- [ ] Local payment methods supported where customer expectations require

---

## Customer support and contact

- [ ] Support hours displayed in local timezone
- [ ] Support contact options match (phone numbers, chat, email, varies by region)
- [ ] Office address (if shown) is appropriate for the locale
- [ ] Local language support team or clear "support in [language]" indication

---

## Marketing and SEO

- [ ] Keyword research done in the local language (not just translated keywords)
- [ ] Meta titles and descriptions are locally compelling, not just translated
- [ ] Open Graph tags adapted (translated, locale-appropriate images)
- [ ] Schema.org markup translated where text-based
- [ ] Local search engines considered (Baidu in China, Yandex in Russia)
- [ ] Backlink strategy adapted to local web (local directories, local press)

---

## Testing per locale

- [ ] Page renders correctly in all major browsers
- [ ] Page renders correctly on mobile
- [ ] All links work and stay within the locale (or correctly switch locale)
- [ ] Forms submit correctly
- [ ] Confirmation flows work end-to-end (form → email → next step)
- [ ] No untranslated strings (search HTML for source-language strings)
- [ ] No broken images
- [ ] No layout breakage from longer or shorter text (German is often longer than English; CJK often shorter; Arabic similar to English in length but different layout)
- [ ] Performance comparable to default locale

---

## Language switcher

- [ ] Switcher visible on every page
- [ ] Available locales shown in their own language
- [ ] Current locale clearly indicated
- [ ] Switcher preserves the current page (not just sends to homepage)
- [ ] Switcher persists user choice (cookie or local storage)
- [ ] Switcher doesn't auto-redirect on first visit (suggests, doesn't force)

---

## Maintenance

- [ ] Translation update workflow defined
- [ ] Drift detection in place (when source changes, translation needs update)
- [ ] Per-locale analytics set up
- [ ] Per-locale error monitoring
- [ ] Translation quality reviewed periodically
- [ ] Locale sunset criteria defined (when to retire a poorly-performing locale)

---

## Per-locale metrics to watch

| Metric | Target |
|---|---|
| Page completion rate | Comparable to default locale |
| Form completion rate | Comparable to default locale |
| Bounce rate | Comparable to default locale |
| Time on page | Comparable to default locale |
| Conversion rate | Comparable to default locale |
| Translation freshness | Source content updates reflected within X days |

A locale persistently underperforming on user metrics may have:
- Translation quality issues
- Cultural mismatches in copy or imagery
- Missing local payment or contact options
- Slow performance from far hosting
- Unmet user expectations (US e-commerce conventions used in markets that prefer different patterns)

Investigate before scaling investment.

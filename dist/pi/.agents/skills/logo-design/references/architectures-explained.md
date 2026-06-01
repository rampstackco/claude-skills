# Mark architectures explained

The architectural decision is the foundational one. Every other choice (typographic register, symbol approach, application context discipline) flows from it. This file expands the five architectures listed in [SKILL.md](../SKILL.md) with reference brands, fit and failure modes, and a working pattern for combining them in a primary-plus-fallback hierarchy.

---

## Wordmark only

The logo is the brand name set in a chosen typeface, possibly with custom letterform interventions. No standalone symbol. The wordmark IS the mark. Stripe, Google, Pinterest, FedEx, eBay, Coca-Cola, Visa.

The discipline is letter-by-letter. Kerning is not optional. Optical adjustments matter at every weight. A wordmark earns its place when the brand name is distinctive enough that the type alone carries identity. Stripe's wordmark uses a single-character optical adjustment on the lowercase "r" that makes the word read as a unit; without it, the word fragments visually. FedEx hides an arrow in the negative space between the "E" and the "x", a famous earned detail that the brand's audience finds and remembers. Google's wordmark redrew its own custom geometric sans (Product Sans) so the brand owns the wordmark's specific letterforms.

Wordmark-only works hardest at small sizes. The full wordmark fails at favicon scale almost universally. A wordmark-only brand still needs a fallback mark for 16px contexts, embroidery, and stacked square applications, even if that fallback never appears in the primary lockup hierarchy.

### When this fits

- The name is short (4 to 8 letters works best; 9 to 12 is the upper edge)
- The name has at least one distinguishing letter or letter combination
- The brand has high enough recognition that the wordmark alone signals identity
- The category rewards type-led restraint (editorial, financial, professional services)
- There is room and willingness to pay for custom letterform work

### When this fails

- The name is long (10+ letters) and the wordmark cannot fit common contexts
- The category demands instant visual recognition (consumer goods at shelf, app icons)
- The wordmark's letterforms are generic and the brand cannot afford custom drawing
- The brand has no fallback mark for square contexts, social profiles, embroidery
- The wordmark looks identical to many other brands' wordmarks in the same category

### Combining in a hierarchy

Wordmark-only as the primary requires a separate symbol-grade asset for square and small contexts. The most common production setup pairs a wordmark with a letterform-as-symbol fallback. Pinterest does this: the wordmark is the primary, the "P" inside a circle is the avatar mark. Stripe does this with a custom geometric "S" for the favicon. The fallback shares visual DNA with the wordmark (same weight class, same custom letterform language) so the system reads as one mark with two surfaces.

---

## Lockup (wordmark plus symbol)

A wordmark and a symbol locked into a fixed relationship. Slack, Airbnb, Asana, Spotify, MasterCard. This is the default architecture for most brands because it covers the widest range of application contexts with the fewest fallbacks.

Lockups have variants. Symbol-left-of-wordmark is most common (left-to-right reading languages naturally pull the eye to the symbol first, then the wordmark). Symbol-above-wordmark works when the symbol is tall and narrow or when the lockup must fit a vertically constrained space. Symbol-right-of-wordmark is rare and usually reserved for editorial or signature treatments. Each lockup also tends to have a stacked alternate (symbol above wordmark, centered) for square contexts and an isolated symbol-only fallback for the smallest applications.

The construction discipline is geometric. The symbol's optical weight should match the wordmark's stroke weight. The space between symbol and wordmark should be tied to the wordmark's x-height or cap height (e.g., the gap equals one x-height of the wordmark). Slack's lockup uses a tightly proportioned hash symbol whose stroke matches the wordmark's stroke at every weight, and the gap is sized to the wordmark's x-height. Without this geometric discipline, lockups fall apart at scale: stretched at large sizes, crowded at small ones.

### When this fits

- The brand needs a symbol-grade asset alongside the wordmark
- The wordmark alone is not distinctive enough at small sizes
- The category benefits from a symbol's ability to travel beyond text contexts (apps, signage, branded merchandise)
- The brand will deploy both the symbol and the lockup in different contexts
- The brand has the budget for two finished assets (symbol and wordmark) instead of one

### When this fails

- The lockup falls apart at small sizes because the symbol carries detail that disappears
- Symbol and wordmark visually compete (different weight class, different optical density)
- The lockup has no stacked alternate for square contexts
- The brand uses the lockup at favicon scale, where the symbol-only or letterform-as-symbol fallback should carry
- The symbol is too literal or too abstract for the wordmark's tonal register

### Combining in a hierarchy

The most common production hierarchy: lockup primary, symbol-only fallback for square and small contexts (social profile, app icon, favicon at 24-32px), letterform-as-symbol or monogram for embroidery and 16px favicon. Slack ships exactly this: the lockup for marketing surfaces, the hash symbol alone for app icons, a simplified hash for favicon and embroidery. The hierarchy is one identity expressed across three asset grades.

---

## Symbol only

The mark is a symbol with no accompanying wordmark in the primary asset. Apple, Twitter (the bird era and the X era), Target, Nike's swoosh, Mercedes-Benz, Mastercard's circles. This is the highest-recognition tier and is almost never available to new brands.

Symbol-only as the primary mark requires brand recognition the audience already holds. Apple did not start as symbol-only; the original Apple logo was a Newton-under-an-apple-tree illustration with the word "Apple Computer Co." beside it. The bitten apple symbol earned its standalone status across decades of advertising, product placement, and cultural ubiquity. New brands that try to launch as symbol-only typically fail to break through the recognition barrier and end up adding their wordmark back into the primary lockup.

The exception is brands launching with massive marketing budgets that can purchase recognition directly. Some legacy financial and luxury brands (Mercedes-Benz, Mastercard) achieved symbol-only status by spending decades and billions on awareness. New brands attempting the same path almost always fail.

### When this fits

- The brand has decades of recognition and the symbol carries the brand alone
- The brand is in a category where symbols travel further than wordmarks (sports apparel, automotive, luxury goods)
- The symbol is distinctive enough that no other brand uses anything similar
- The brand has secondary contexts (signage, packaging, apparel) where wordmark space is not available
- The brand can afford the multi-decade investment in recognition

### When this fails

- The brand is new and lacks the recognition required for symbol-only to read as the brand
- The symbol is generic (a hexagon, a triangle, a circle) and could belong to thousands of other brands
- The brand has not invested in recognition through advertising or distribution
- Symbol-only is chosen as the primary because the wordmark is too long, when the real solution is a different architecture entirely
- The category demands wordmark presence (B2B SaaS, professional services, anything where the brand name needs to register before the symbol does)

### Combining in a hierarchy

Symbol-only is rarely the only asset. Even Apple ships a wordmark for legal contexts, contractual documents, marketing surfaces where the wordmark adds clarity. The hierarchy for symbol-only-primary brands is: symbol primary, wordmark for legal and contextual surfaces, lockup for select marketing applications. The symbol carries; the wordmark plays a supporting role.

---

## Letterform-as-symbol

A single letter from the brand name (often the first) is treated as the symbol. The letter is custom-drawn or aggressively styled to read as both letter and visual element. Beats by Dre's "b", McDonald's "M", Underscore's "_", a custom "A" rendered as a mountain peak for a hypothetical Atlas Coffee.

The cleanest path to symbol when the full wordmark is too long for a tight lockup, when the name has a letter that lends itself to visual play, or when the brand wants the symbol and the wordmark to share construction. Beats's "b" inside a circle is the exact "b" weight and proportion as the rest of the wordmark; the symbol IS the same lettering language. McDonald's "M" reads as the golden arches and as the letter; both readings are simultaneous and reinforce each other.

The discipline is the silhouette test on the underlying letter. If the letterform is over-styled and the silhouette no longer reads as the letter, the symbol fails one direction of its job. If the letterform is under-styled and reads as just a typed letter, the symbol fails the other direction. The custom letterform must do double duty.

### When this fits

- The brand name's first letter is visually rich (M, A, B, S, D often work; I, L, J, T are harder)
- The brand wants the symbol and the wordmark to read as one identity
- The brand has the budget for custom letterform drawing
- The category rewards type-led brands over symbol-led brands
- The brand needs a small-size and embroidery-friendly fallback that derives from the wordmark

### When this fails

- The letterform reads as just a typed letter and adds nothing the wordmark wasn't already doing
- The styling overshoots and the letterform no longer reads as the letter
- The chosen letter is structurally weak (a thin stem, a complex curve, a confusing crossbar)
- The custom letterform fights the wordmark instead of complementing it
- The brand uses the letterform-as-symbol at sizes where it is illegible

### Combining in a hierarchy

A common setup: lockup primary, letterform-as-symbol for square contexts and embroidery, full wordmark for legal and large-format contexts. Beats does this. The letterform-as-symbol is the favicon, the app icon, the embroidered patch on Beats apparel. The wordmark in lockup is the marketing primary. The hierarchy makes one identity across asset grades.

---

## Monogram

Multiple letters combined as a symbol. The symbol is the initials, often with ligature treatment, tight kerning, geometric framing (ring, shield, diamond), or stacked composition. CN (Chanel), GG (Gucci), HBO, AC (a hypothetical Atlas Coffee monogram), VW (Volkswagen), YSL (Yves Saint Laurent).

Common in legal, financial, hospitality, fashion, and heritage brands where institutional gravity is the positioning. A monogram says "we have a long name" and "we own the initials of that name". It also says "we are old enough that abbreviating is acceptable", which is a positioning move.

Monograms come in three flavors. Pure ligature (the letters share strokes; CN and GG are ligatures). Stacked or geometrically framed (the letters sit inside a ring, shield, or diamond; HBO is framed; YSL is geometrically composed). Tight kerning with no framing (the letters are simply set together with optical adjustments; VW reads as initials without frame).

### When this fits

- The brand has a long name (3+ words, or a single word longer than 10 letters)
- The brand operates in a category where institutional gravity is positioning (legal, financial, hospitality, luxury, academic)
- The initials are visually rich enough to read as a unit (M and N, C and N, V and W work; I and J or O and U are harder)
- The brand has applications where the full wordmark cannot fit (embroidered apron, foil-stamped book, signet ring, wax seal)
- The brand wants positioning that signals tradition or heritage

### When this fails

- The initials clash visually (similar letterforms that fail to read as two distinct shapes)
- The category is allergic to monograms (consumer tech, modern startup tier, anything coded as anti-establishment)
- The monogram is over-framed (heavy ring, heavy shield, every ornamental flourish) until it reads as a fake-heritage logo template
- The monogram is under-styled and reads as just typed initials
- The brand uses the monogram alone in contexts where the audience does not yet recognize the initials

### Combining in a hierarchy

The classic hierarchy is: full wordmark for marketing primary, monogram for square contexts (social profile, embroidery, foil stamp, signet, wax seal), lockup with both wordmark and monogram for transitional surfaces (letterhead, business card, signage). Chanel, Gucci, and most luxury houses ship exactly this. The monogram is the most-applied mark on physical goods (apparel, hardware, bottles), the wordmark is the most-applied mark on digital and marketing surfaces, and the lockup is reserved for specific institutional surfaces.

---

## Putting it together: the three-asset working pattern

For most brands, the working asset hierarchy is three marks:

1. **Primary lockup** for marketing, web, packaging, signage. Wordmark plus symbol locked into a fixed relationship.
2. **Stacked or square alternate** for social profiles, app icons, square contexts. Same elements as the lockup but recomposed for square.
3. **Small-grade fallback** for favicon, embroidery, foil stamps. A single element (symbol-only, letterform-as-symbol, or monogram) that derives from the lockup.

All three must share visual DNA. Same letterform language, same construction grid, same optical weight class. A brand whose three marks read as three different brands has a system problem, not a logo problem. The discipline is to design the small-grade fallback FIRST, before the lockup, so the constraints of the smallest application drive the construction of the largest.

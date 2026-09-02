# Creative variation templates

The matrix-based production system. How to produce 20 to 50 ad variations from one core concept in a half-day session.

The principle. A creative is a hook plus a body plus a CTA in a format. Treat each as a variable. The matrix lets you ship dozens of variations from minimal authoring overhead, which is what the sequential testing waterfall requires.

---

## The decomposition

A single creative is composed of independent components.

| Component | Example | Authoring cost |
|---|---|---|
| Concept | Theme or message ("the project management tax") | High (the strategy work) |
| Hook | First 3 seconds, scroll-stop | Medium (per variant) |
| Body | The middle 5 to 10 seconds | Medium |
| CTA | The closing call to action | Low |
| Format | Vertical video, carousel, static, etc. | Medium (rendering) |

The math. 1 concept times 5 hooks times 4 bodies times 3 CTAs times 2 formats equals 120 theoretical variations. Most are not worth shipping; the matrix typically narrows to 20 to 40 the team will actually run. The point is that authoring 5 hooks plus 4 bodies plus 3 CTAs equals 12 components total, which compose into 60 hook-body-CTA combinations.

---

## Variation matrix template

A simple spreadsheet that drives the production session.

| Concept | Hook ID | Body ID | CTA ID | Format | Variant ID | Status |
|---|---|---|---|---|---|---|
| launch2026 | hook_a | body_a | cta_a | meta-reel | v001 | drafted |
| launch2026 | hook_b | body_a | cta_a | meta-reel | v002 | drafted |
| launch2026 | hook_c | body_a | cta_a | meta-reel | v003 | drafted |
| launch2026 | hook_a | body_b | cta_a | meta-reel | v004 | drafted |
| launch2026 | hook_a | body_a | cta_b | meta-reel | v005 | drafted |
| launch2026 | hook_a | body_a | cta_a | tiktok-vertical | v006 | drafted |
| launch2026 | hook_a | body_a | cta_a | static-1x1 | v007 | drafted |

The status column tracks the production pipeline: drafted, rendered, approved, shipped, paused, retired.

---

## Naming conventions

Every variation has a structured name so the analyst can join performance data back to creative components.

```
{concept}_{platform-format}_{hook}_{body}_{cta}_v{n}
```

Examples:

```
launch2026_meta-reel_hookA_bodyB_ctaC_v1
launch2026_tiktok-vertical_hookE_bodyA_ctaA_v3
launch2026_static-1x1_hookA_bodyA_ctaB_v2
```

The analyst pulls the report, splits the names on the underscore, joins to a master variant table, and reports performance by component. "Hook E is winning across body and CTA combinations on TikTok" becomes a query, not a manual review.

---

## Asset library structure

Organize files by concept, not by date.

```
concepts/
  launch2026/
    hooks/
      hookA-direct-callout.txt
      hookB-contrarian-claim.txt
      hookC-result-led.txt
      hookD-curiosity-gap.txt
      hookE-personal-story.txt
    bodies/
      bodyA-feature-list.txt
      bodyB-customer-story.txt
      bodyC-comparison.txt
      bodyD-process-walkthrough.txt
    ctas/
      ctaA-shop-now.txt
      ctaB-start-trial.txt
      ctaC-book-demo.txt
    visuals/
      hero-product-shot.png
      ugc-customer-1.mp4
      founder-camera.mp4
    rendered/
      meta-reel/
      tiktok-vertical/
      static-1x1/
```

Date-based organization rots fast. Concept-based organization composes; the team that runs three concepts a quarter has three folders, each with a clean inventory of components. Six months in, the library is searchable.

---

## Half-day production session worked example

The goal. Produce 40 variations of one core concept in 4 hours. The team: one creative strategist, one editor, one copywriter.

**Hour 1: matrix planning.** Strategist drafts 5 hooks, 4 bodies, 3 CTAs against the concept brief. Copywriter refines language. Output: 12 component scripts.

**Hour 2: visual asset prep.** Editor pulls the visual library (hero product shot, two UGC videos, two founder-to-camera takes). Copywriter writes captions per platform. Output: visual atoms ready to compose.

**Hour 3: rendering.** Editor renders the matrix using a video editor's template feature (or a tool like Pencil, Vidico Forge, or in-house automation). The hook component swaps in; the body component swaps in; the CTA component swaps in; the format renders per platform. Output: 30 rendered variations.

**Hour 4: review and final renders.** Team reviews the 30 outputs, kills the 5 to 10 that fail the smell test, renders the final 10 that need higher-quality cuts. Output: 20 to 25 production-ready variations.

The math. 12 component scripts plus a half day of editor time produces 20 to 25 variations. Without the matrix, the same 20 to 25 variations require 5 days of independent authoring per variation.

---

## When the matrix breaks down

Two situations where the matrix is the wrong shape.

**Concept-driven brand work.** Awareness creative often does not decompose cleanly. The 60-second YouTube spot is one creative, not a matrix. The hook, body, and CTA are integrated into the narrative. For brand work, drop the matrix and produce one strong piece.

**Highly format-specific creative.** A behind-the-scenes TikTok is not a hook plus body plus CTA; it is a single creator's continuous take. Forcing the matrix produces stilted ads that read as agency-produced. For format-native creative, accept that one format produces one creative; do not try to render the same content into static.

The rule. Use the matrix for performance creative where direct response is the goal. Drop the matrix for awareness, brand, or format-native creative where the integrity of the piece matters more than ship volume.

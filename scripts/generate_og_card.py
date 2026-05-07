#!/usr/bin/env python3
"""Generate the GitHub Social Preview card (``og-card.png``) for this repo.

Produces a 1280 by 640 PNG that GitHub displays when someone shares the
repo URL on Twitter, LinkedIn, Slack, etc. The output is committed to
the repo root; configuring GitHub's Social Preview is a separate manual
step (Settings to Social Preview to Upload).

Design intent:

- Brand-consistent palette matching rampstack.co (navy gradient base,
  gold accent dot, cyan decorative pattern, white display type).
- Distinctive enough that the card does not read as the default GitHub
  repo template; the dot grid on the right hints at catalog density
  without being chartjunk.
- Single-line ASCII text only so it renders identically across the
  fonts that ship with Pillow's bundled installations.

Counts shown on the card are pulled live from the catalog, so the card
stays in sync as the catalog grows. Re-run after meaningful changes
(skill count change, walkthrough or integration count change).

Run from the repo root::

    python scripts/generate_og_card.py
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = REPO_ROOT / "skills"
OUTPUT = REPO_ROOT / "og-card.png"

# Card dimensions: GitHub Social Preview recommended size.
WIDTH, HEIGHT = 1280, 640

# Brand palette. Hex values match rampstack.co (CSS custom properties
# in app/globals.css of the rampstackco-app repo).
BG_TOP = (15, 23, 42)           # slate-900-ish
BG_BOTTOM = (21, 32, 70)        # brand-navy
ACCENT = (255, 210, 125)        # warm gold
CYAN = (59, 180, 224)           # brand-cyan
INK = (248, 250, 252)           # near-white
MUTED = (203, 213, 225)         # slate-300

# Typography sizes. Tuned for 1280x640 against Arial which ships with
# Pillow on Windows; falls back to Arial-equivalent on other systems.
SIZE_EYEBROW = 26
SIZE_TITLE = 100
SIZE_SUBTITLE = 36
SIZE_FOOTER = 24


def find_font(weight_hints: list[str], size: int) -> ImageFont.ImageFont:
    """Return the first available TrueType font from a hint list.

    Hints are font filenames searched against the system font path. If
    none load, falls back to the PIL default bitmap font, which is
    coarse but never throws.
    """
    for name in weight_hints:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def gradient_background() -> Image.Image:
    """Vertical linear gradient from BG_TOP to BG_BOTTOM."""
    top = np.array(BG_TOP, dtype=np.float32)
    bottom = np.array(BG_BOTTOM, dtype=np.float32)
    t = np.linspace(0.0, 1.0, HEIGHT, dtype=np.float32)[:, None]
    rows = top * (1.0 - t) + bottom * t
    arr = np.tile(rows[:, None, :], (1, WIDTH, 1)).astype(np.uint8)
    return Image.fromarray(arr, mode="RGB")


def draw_dot_grid(canvas: Image.Image) -> None:
    """Subtle dot grid on the right portion of the card.

    Draws a 14-column by 7-row matrix of small cyan circles, with
    alpha-fading toward the left so the grid blends into the headline
    region rather than competing with it.
    """
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    cols, rows = 14, 7
    grid_x_start = 760   # leaves room for headline on the left
    grid_x_end = 1200
    grid_y_start = 80
    grid_y_end = 560
    radius = 5

    col_step = (grid_x_end - grid_x_start) / (cols - 1)
    row_step = (grid_y_end - grid_y_start) / (rows - 1)

    for c in range(cols):
        x = grid_x_start + int(round(c * col_step))
        # Fade from 30 alpha on the left edge of the grid up to 90 on the right.
        edge_t = c / (cols - 1)
        alpha = int(round(30 + edge_t * 60))
        for r in range(rows):
            y = grid_y_start + int(round(r * row_step))
            color = (CYAN[0], CYAN[1], CYAN[2], alpha)
            draw.ellipse(
                (x - radius, y - radius, x + radius, y + radius),
                fill=color,
            )

    canvas.alpha_composite(overlay)


def count_skills() -> int:
    """Walk skills/ and count folders that contain a SKILL.md.

    Avoids importing the README generator to keep this script
    self-contained; the heuristic matches the linter's catalog count.
    """
    if not SKILLS_DIR.exists():
        return 0
    return sum(
        1
        for child in SKILLS_DIR.iterdir()
        if child.is_dir() and (child / "SKILL.md").exists()
    )


def count_walkthroughs() -> int:
    """Read the rampstackco-app sibling repo for a live walkthrough count.

    Falls back to 0 if the sibling repo is not checked out next to this
    one, which keeps the script runnable in CI clones that only fetch
    claude-skills.
    """
    sibling = REPO_ROOT.parent.parent / "rampstackco-app" / "app" / "walkthroughs" / "_data" / "walkthroughs.ts"
    if not sibling.exists():
        return 0
    text = sibling.read_text(encoding="utf-8")
    # Each walkthrough entry begins with `    slug: "..."`. Match those
    # specifically rather than the generic `slug: ...` pattern that also
    # appears in type definitions.
    return len(re.findall(r"^    slug: \"[^\"]+\"", text, re.MULTILINE))


def count_audience_tracks() -> int:
    """Number of audience suite tiles on the rampstack.co homepage.

    Sourced from app/page.tsx in the sibling repo. Falls back to 6,
    which matches the count at the time this script was written.
    """
    sibling = REPO_ROOT.parent.parent / "rampstackco-app" / "app" / "page.tsx"
    if not sibling.exists():
        return 6
    text = sibling.read_text(encoding="utf-8")
    match = re.search(r"const SKILL_SUITES: SuiteCard\[\]\s*=\s*\[(.*?)\n\];", text, re.DOTALL)
    if not match:
        return 6
    return len(re.findall(r"^  \{$", match.group(1), re.MULTILINE))


def main() -> int:
    canvas = gradient_background().convert("RGBA")
    draw_dot_grid(canvas)
    draw = ImageDraw.Draw(canvas)

    # Type setting.
    font_eyebrow = find_font(["arialbd.ttf", "DejaVuSans-Bold.ttf"], SIZE_EYEBROW)
    font_title = find_font(["arialbd.ttf", "DejaVuSans-Bold.ttf"], SIZE_TITLE)
    font_subtitle = find_font(["arial.ttf", "DejaVuSans.ttf"], SIZE_SUBTITLE)
    font_footer = find_font(["arial.ttf", "DejaVuSans.ttf"], SIZE_FOOTER)

    skill_count = count_skills()
    walkthrough_count = count_walkthroughs()
    track_count = count_audience_tracks()

    eyebrow = "OPEN SOURCE  -  MIT LICENSED"
    title_line_1 = "Brand Build Skills"
    title_line_2 = "for Claude."
    subtitle = (
        f"{skill_count} skills  -  {walkthrough_count} walkthroughs  -  "
        f"{track_count} audience tracks"
    )
    footer_left = "github.com/rampstackco/claude-skills"
    footer_right = "rampstack.co"

    # Top-left accent dot + eyebrow.
    pad_x = 80
    eyebrow_y = 80
    dot_radius = 7
    draw.ellipse(
        (pad_x, eyebrow_y + 14, pad_x + dot_radius * 2, eyebrow_y + 14 + dot_radius * 2),
        fill=ACCENT,
    )
    # Tighten letter-tracking by drawing the eyebrow as one block; the
    # text method already kerns reasonably for caps + spacing.
    draw.text(
        (pad_x + dot_radius * 2 + 16, eyebrow_y),
        eyebrow,
        fill=MUTED,
        font=font_eyebrow,
    )

    # Headline. Two lines stacked so the display size stays comfortable
    # inside the 1280-wide canvas without crowding the dot grid.
    title_y = 180
    line_height = SIZE_TITLE + 12
    draw.text((pad_x, title_y), title_line_1, fill=INK, font=font_title)
    draw.text((pad_x, title_y + line_height), title_line_2, fill=INK, font=font_title)

    # Subtitle stat strip.
    subtitle_y = title_y + line_height * 2 + 30
    draw.text((pad_x, subtitle_y), subtitle, fill=MUTED, font=font_subtitle)

    # Footer row.
    footer_y = HEIGHT - 60
    draw.text((pad_x, footer_y), footer_left, fill=INK, font=font_footer)
    # Right-align the rampstack.co mark.
    bbox = draw.textbbox((0, 0), footer_right, font=font_footer)
    text_width = bbox[2] - bbox[0]
    draw.text(
        (WIDTH - pad_x - text_width, footer_y),
        footer_right,
        fill=INK,
        font=font_footer,
    )

    # Output.
    canvas.convert("RGB").save(OUTPUT, "PNG", optimize=True)
    print(
        f"Wrote {OUTPUT.relative_to(REPO_ROOT)} "
        f"({skill_count} skills, {walkthrough_count} walkthroughs, "
        f"{track_count} audience tracks)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

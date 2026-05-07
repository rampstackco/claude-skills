#!/usr/bin/env python3
"""Generate architecture images showing the catalog ecosystem.

Hub-and-spoke composition: skills count at the center, six category
nodes radiating out, integration names previewed at each node. Two
output variants:

    docs/architecture-wide.png   1200x630, README hero, OG sharing,
                                 rampstack-app /integrations hero.
    docs/architecture-square.png 1080x1080, social posts (LinkedIn, X).

Counts pull live from skills/ (skill folders containing SKILL.md) and
from scripts/integrations-mirror.json (a mirrored snapshot of the
integrations data layer in the rampstackco-app repo). Re-sync the
mirror when integrations are added in the app repo; re-run this
script after either count changes.

Visual register matches the OG card precedent (scripts/generate_og_card.py):
brand navy gradient base, faded cyan dot grid texture, gold accent
dots at category nodes, Arial fallback typography.

Run from the repo root::

    python scripts/generate_architecture_image.py
"""

from __future__ import annotations

import json
import math
import sys
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = REPO_ROOT / "skills"
MIRROR_PATH = REPO_ROOT / "scripts" / "integrations-mirror.json"
DOCS_DIR = REPO_ROOT / "docs"

WIDE = (1200, 630)
SQUARE = (1080, 1080)

# Brand palette. Bg gradient picks up where rampstack.co's homepage hero
# leaves off (brand-navy fading toward brand-blue). Gold accent and cyan
# dot grid match the OG card's visual register so the two images read as
# a coherent system when seen together.
BG_TOP = (21, 32, 70)            # #152046 brand-navy
BG_BOTTOM = (26, 63, 122)        # #1a3f7a brand-blue
ACCENT_GOLD = (212, 165, 116)    # #d4a574 muted gold
CYAN = (59, 180, 224)            # #3bb4e0 brand-cyan
INK = (248, 250, 252)            # near-white
SLATE_LIGHT = (203, 213, 225)    # slate-300 for sub-headings
SLATE_MUTED = (148, 163, 184)    # slate-400 for sample names

# Hub geometry. Tuned per variant in render_layout().
HUB_RING_WIDTH = 2

# Category compass-point ordering. Starts at 12 o'clock and goes
# clockwise so the diagram reads top-down, left-right when scanned.
CATEGORY_ANGLES_DEG = [-90, -30, 30, 90, 150, 210]


@dataclass(frozen=True)
class LayoutSpec:
    """Per-variant tunable dimensions."""

    width: int
    height: int
    radius_x: float
    radius_y: float
    hub_radius: int
    hub_title_size: int
    hub_sub_size: int
    hub_label_size: int
    node_label_size: int
    node_count_size: int
    node_sample_size: int
    node_dot_radius: int
    text_offset: int   # gap between node and first text line
    line_gap: int      # gap between stacked text lines
    header_y: int
    footer_y: int
    chrome_header_size: int
    chrome_footer_size: int


# Typography target: legibility at scaled-down README body width
# (around 800px effective). Fonts are deliberately oversized at native
# resolution so the labels remain readable when GitHub or a browser
# scales the embed down to body width.
WIDE_SPEC = LayoutSpec(
    width=1200,
    height=630,
    radius_x=380,
    radius_y=155,
    hub_radius=100,
    hub_title_size=48,
    hub_sub_size=24,
    hub_label_size=24,
    node_label_size=36,
    node_count_size=20,
    node_sample_size=18,
    node_dot_radius=10,
    text_offset=20,
    line_gap=6,
    header_y=28,
    footer_y=590,
    chrome_header_size=18,
    chrome_footer_size=20,
)


SQUARE_SPEC = LayoutSpec(
    width=1080,
    height=1080,
    radius_x=355,
    radius_y=325,
    hub_radius=130,
    hub_title_size=56,
    hub_sub_size=28,
    hub_label_size=28,
    node_label_size=42,
    node_count_size=24,
    node_sample_size=20,
    node_dot_radius=12,
    text_offset=30,
    line_gap=8,
    header_y=44,
    footer_y=1014,
    chrome_header_size=22,
    chrome_footer_size=24,
)


def find_font(weight_hints: list[str], size: int) -> ImageFont.ImageFont:
    """Return the first available TrueType font from a hint list.

    Hints are font filenames searched against the system font path.
    Falls back to PIL's bitmap default if none load. Same chain the
    OG card script uses for cross-platform consistency.
    """
    for name in weight_hints:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def font_bold(size: int) -> ImageFont.ImageFont:
    return find_font(["arialbd.ttf", "DejaVuSans-Bold.ttf"], size)


def font_regular(size: int) -> ImageFont.ImageFont:
    return find_font(["arial.ttf", "DejaVuSans.ttf"], size)


def gradient_background(width: int, height: int) -> Image.Image:
    """Vertical linear gradient from BG_TOP to BG_BOTTOM."""
    top = np.array(BG_TOP, dtype=np.float32)
    bottom = np.array(BG_BOTTOM, dtype=np.float32)
    t = np.linspace(0.0, 1.0, height, dtype=np.float32)[:, None]
    rows = top * (1.0 - t) + bottom * t
    arr = np.tile(rows[:, None, :], (1, width, 1)).astype(np.uint8)
    return Image.fromarray(arr, mode="RGB").convert("RGBA")


def draw_dot_grid(canvas: Image.Image) -> None:
    """Faded cyan dot grid texture across the full canvas.

    Spacing is tuned so the grid reads as background pattern rather
    than a competing layer. Alpha is uniformly low; no fade.
    """
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    spacing = 38
    radius = 2
    alpha = 28

    width, height = canvas.size
    for y in range(spacing, height, spacing):
        for x in range(spacing, width, spacing):
            draw.ellipse(
                (x - radius, y - radius, x + radius, y + radius),
                fill=(CYAN[0], CYAN[1], CYAN[2], alpha),
            )

    canvas.alpha_composite(overlay)


def count_skills() -> int:
    """Walk skills/ and count folders that contain a SKILL.md."""
    if not SKILLS_DIR.exists():
        return 0
    return sum(
        1
        for child in SKILLS_DIR.iterdir()
        if child.is_dir() and (child / "SKILL.md").exists()
    )


def load_mirror() -> dict:
    if not MIRROR_PATH.exists():
        raise SystemExit(
            f"ERROR: integrations mirror missing at {MIRROR_PATH}. "
            "Author the mirror file before running this script."
        )
    return json.loads(MIRROR_PATH.read_text(encoding="utf-8"))


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> int:
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0]


def render_hub(
    draw: ImageDraw.ImageDraw,
    spec: LayoutSpec,
    skill_count: int,
    integration_count: int,
) -> None:
    """Center hub: backing circle, gold ring, stacked title + subtitle."""
    cx, cy = spec.width // 2, spec.height // 2
    r = spec.hub_radius

    # Slightly darker hub fill to lift it from the gradient base.
    draw.ellipse(
        (cx - r, cy - r, cx + r, cy + r),
        fill=(15, 23, 50, 235),
        outline=ACCENT_GOLD,
        width=HUB_RING_WIDTH,
    )

    title_font = font_bold(spec.hub_title_size)
    sub_font = font_bold(spec.hub_sub_size)
    label_font = font_bold(spec.hub_label_size)

    title = f"{skill_count}"
    sub = "skills"
    label = f"{integration_count} integrations"

    # Title and unit on one line, label below.
    title_w = text_width(draw, title, title_font)
    sub_w = text_width(draw, sub, sub_font)

    gap = max(8, spec.hub_sub_size // 2)
    line1_w = title_w + gap + sub_w
    line1_x = cx - line1_w // 2

    # Vertically center the two lines as a block within the hub.
    block_h = spec.hub_title_size + spec.line_gap + spec.hub_label_size
    line1_y = cy - block_h // 2 - 4

    # Title baselines slightly higher than sub text; offset sub down.
    draw.text(
        (line1_x, line1_y),
        title,
        fill=INK,
        font=title_font,
    )
    sub_y = line1_y + spec.hub_title_size - spec.hub_sub_size - 4
    draw.text(
        (line1_x + title_w + gap, sub_y),
        sub,
        fill=SLATE_LIGHT,
        font=sub_font,
    )

    label_w = text_width(draw, label, label_font)
    label_y = line1_y + spec.hub_title_size + spec.line_gap
    draw.text(
        (cx - label_w // 2, label_y),
        label,
        fill=ACCENT_GOLD,
        font=label_font,
    )


def render_node(
    draw: ImageDraw.ImageDraw,
    spec: LayoutSpec,
    angle_deg: float,
    category: dict,
) -> None:
    """One category node: gold dot, label, count, sample integrations.

    Text stacks above or below the node based on the node's vertical
    position relative to the hub. Top half gets text above (samples
    furthest from node); bottom half gets text below (samples furthest
    from node, label nearest).
    """
    cx, cy = spec.width // 2, spec.height // 2
    angle_rad = math.radians(angle_deg)
    nx = cx + spec.radius_x * math.cos(angle_rad)
    ny = cy + spec.radius_y * math.sin(angle_rad)
    nx_i, ny_i = int(round(nx)), int(round(ny))

    # Connection line back to the hub. Drawn first so the dot covers
    # the line endpoint cleanly.
    draw.line(
        (cx, cy, nx_i, ny_i),
        fill=(CYAN[0], CYAN[1], CYAN[2], 90),
        width=2,
    )

    r = spec.node_dot_radius
    draw.ellipse(
        (nx_i - r, ny_i - r, nx_i + r, ny_i + r),
        fill=ACCENT_GOLD,
    )

    label_font = font_bold(spec.node_label_size)
    count_font = font_bold(spec.node_count_size)
    sample_font = font_bold(spec.node_sample_size)

    label = category["label"]
    count = f"{len(category['integrations'])} integrations"

    samples = category["integrations"][:3]
    extra = len(category["integrations"]) - 3
    if extra > 0:
        sample_text = ", ".join(samples) + f", +{extra} more"
    else:
        sample_text = ", ".join(samples)

    label_w = text_width(draw, label, label_font)
    count_w = text_width(draw, count, count_font)
    sample_w = text_width(draw, sample_text, sample_font)

    text_above = math.sin(angle_rad) < 0

    if text_above:
        # Text stacks upward from the node: label closest, then count,
        # then sample names. Walk the stack y-offsets accordingly.
        label_y = ny_i - spec.text_offset - spec.node_label_size
        count_y = label_y - spec.line_gap - spec.node_count_size
        sample_y = count_y - spec.line_gap - spec.node_sample_size
    else:
        label_y = ny_i + spec.text_offset
        count_y = label_y + spec.node_label_size + spec.line_gap
        sample_y = count_y + spec.node_count_size + spec.line_gap

    # Center each line on the node x-position.
    draw.text(
        (nx_i - label_w // 2, label_y),
        label,
        fill=INK,
        font=label_font,
    )
    draw.text(
        (nx_i - count_w // 2, count_y),
        count,
        fill=SLATE_LIGHT,
        font=count_font,
    )
    draw.text(
        (nx_i - sample_w // 2, sample_y),
        sample_text,
        fill=SLATE_MUTED,
        font=sample_font,
    )


def render_chrome(
    draw: ImageDraw.ImageDraw, spec: LayoutSpec
) -> None:
    """Top-left URL strip and bottom centered caption."""
    eyebrow_font = font_bold(spec.chrome_header_size)
    caption_font = font_regular(spec.chrome_footer_size)

    draw.text(
        (40, spec.header_y),
        "RAMPSTACK.CO  ·  INTEGRATIONS",
        fill=ACCENT_GOLD,
        font=eyebrow_font,
    )

    caption = "The skills compose with the tools your team already uses."
    cap_w = text_width(draw, caption, caption_font)
    draw.text(
        ((spec.width - cap_w) // 2, spec.footer_y),
        caption,
        fill=SLATE_LIGHT,
        font=caption_font,
    )


def render_layout(spec: LayoutSpec, skill_count: int, mirror: dict) -> Image.Image:
    canvas = gradient_background(spec.width, spec.height)
    draw_dot_grid(canvas)
    draw = ImageDraw.Draw(canvas)

    integration_count = sum(len(c["integrations"]) for c in mirror["categories"])

    categories = mirror["categories"]
    if len(categories) != len(CATEGORY_ANGLES_DEG):
        raise SystemExit(
            f"ERROR: layout expects {len(CATEGORY_ANGLES_DEG)} categories; "
            f"mirror has {len(categories)}. Update CATEGORY_ANGLES_DEG."
        )

    for angle_deg, category in zip(CATEGORY_ANGLES_DEG, categories):
        render_node(draw, spec, angle_deg, category)

    # Hub renders last so it sits on top of any line endpoints that
    # cross under the hub circle.
    render_hub(draw, spec, skill_count, integration_count)
    render_chrome(draw, spec)

    return canvas


def main() -> int:
    if not SKILLS_DIR.exists():
        print(f"ERROR: skills/ not found at {SKILLS_DIR}", file=sys.stderr)
        return 1

    skill_count = count_skills()
    mirror = load_mirror()
    integration_count = sum(len(c["integrations"]) for c in mirror["categories"])

    DOCS_DIR.mkdir(exist_ok=True)

    wide = render_layout(WIDE_SPEC, skill_count, mirror)
    wide_path = DOCS_DIR / "architecture-wide.png"
    wide.convert("RGB").save(wide_path, "PNG", optimize=True)
    print(f"Wrote {wide_path.relative_to(REPO_ROOT)} ({WIDE[0]}x{WIDE[1]})")

    square = render_layout(SQUARE_SPEC, skill_count, mirror)
    square_path = DOCS_DIR / "architecture-square.png"
    square.convert("RGB").save(square_path, "PNG", optimize=True)
    print(f"Wrote {square_path.relative_to(REPO_ROOT)} ({SQUARE[0]}x{SQUARE[1]})")

    print(
        f"Catalog state: {skill_count} skills, {integration_count} integrations "
        f"across {len(mirror['categories'])} categories."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""Generate Orango hero sequences: 250 PNG frames for desktop and mobile."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
TOTAL = 250


def lerp(a, b, t):
    return a + (b - a) * t


def ease_in_out(t):
    return t * t * (3 - 2 * t)


def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))


def phase(t, start, end):
    if t <= start:
        return 0.0
    if t >= end:
        return 1.0
    return ease_in_out((t - start) / (end - start))


def mix(c1, c2, t):
    t = clamp(t)
    n = min(len(c1), len(c2))
    return tuple(int(lerp(c1[i], c2[i], t)) for i in range(n))


def vertical_gradient(size, c_top, c_bot):
    w, h = size
    band = Image.new("RGB", (1, 2))
    band.putpixel((0, 0), c_top)
    band.putpixel((0, 1), c_bot)
    return band.resize((w, h), Image.Resampling.BILINEAR)


def draw_sphere(draw, cx, cy, r, fill, highlight=(255, 236, 210), shadow=(120, 42, 12)):
    if r < 2:
        return
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=mix(fill, shadow, 0.28))
    draw.ellipse(
        (cx - r * 0.92, cy - r * 0.92, cx + r * 0.88, cy + r * 0.96),
        fill=fill,
    )
    hx, hy, hr = cx - r * 0.28, cy - r * 0.32, r * 0.34
    draw.ellipse((hx - hr, hy - hr, hx + hr, hy + hr), fill=mix(fill, highlight, 0.55))
    hx, hy, hr = cx - r * 0.38, cy - r * 0.42, r * 0.12
    draw.ellipse((hx - hr, hy - hr, hx + hr, hy + hr), fill=highlight)


def draw_cup(draw, cx, cy, w, h, fill_t, juice, glass=(245, 236, 224)):
    x0, y0 = cx - w / 2, cy - h / 2
    x1, y1 = cx + w / 2, cy + h / 2
    draw.rounded_rectangle((x0, y0, x1, y1), radius=max(8, w * 0.12), fill=glass, outline=(210, 196, 178), width=2)
    inner = (x0 + 6, y0 + 8, x1 - 6, y1 - 6)
    draw.rounded_rectangle(inner, radius=max(6, w * 0.1), fill=(255, 252, 247))
    juice_h = (inner[3] - inner[1]) * clamp(fill_t)
    if juice_h > 2:
        jy0 = inner[3] - juice_h
        draw.rounded_rectangle((inner[0], jy0, inner[2], inner[3]), radius=max(4, w * 0.08), fill=juice)
        draw.ellipse((inner[0], jy0 - 6, inner[2], jy0 + 8), fill=mix(juice, (255, 180, 90), 0.35))


def draw_machine_frame(draw, box, t, chrome=(214, 204, 190)):
    x0, y0, x1, y1 = box
    draw.rounded_rectangle((x0, y0, x1, y1), radius=28, outline=chrome, width=3)
    draw.rounded_rectangle((x0 + 18, y0 + 16, x1 - 18, y0 + 54), radius=10, fill=(42, 36, 32))
    pulse = 0.5 + 0.5 * math.sin(t * math.pi * 6)
    r = 7
    cx, cy = x1 - 48, y0 + 35
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=mix((80, 70, 62), (238, 90, 36), pulse))


def make_backgrounds(size, mobile):
    w, h = size
    cream = (246, 240, 232)
    ink = (20, 17, 14)
    orange = (238, 90, 36)
    pulp = (255, 200, 154)

    if mobile:
        bg = vertical_gradient(size, (255, 252, 247), cream).convert("RGBA")
        glow_color = (*pulp, 55)
        cy = h * 0.42
    else:
        bg = vertical_gradient(size, (32, 26, 22), ink).convert("RGBA")
        glow_color = (*orange, 40)
        cy = h * 0.5

    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for i, scale in enumerate((0.9, 0.6, 0.35)):
        r = min(w, h) * scale
        a = glow_color[3] - i * 8
        gd.ellipse((w * 0.5 - r, cy - r, w * 0.5 + r, cy + r), fill=(*glow_color[:3], max(12, a)))
    return Image.alpha_composite(bg, glow)


def render_frame(w, h, index, mobile, bg):
    t = (index - 1) / (TOTAL - 1)
    orange = (238, 90, 36)
    deep = (196, 69, 18)
    pulp = (255, 200, 154)
    juice = (232, 109, 34)
    leaf = (62, 92, 58)

    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    mx, my = w * 0.12, h * 0.1
    box = (mx, my, w - mx, h - my * 0.85)
    cx = w * 0.5
    chamber_y = h * (0.38 if not mobile else 0.36)
    cup_y = h * (0.78 if not mobile else 0.76)
    cup_w, cup_h = w * (0.13 if not mobile else 0.22), h * (0.16 if not mobile else 0.14)

    win = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    wd = ImageDraw.Draw(win)
    if mobile:
        wd.rounded_rectangle(box, radius=36, fill=(255, 250, 244, 255), outline=(220, 208, 190, 255), width=3)
    else:
        wd.rounded_rectangle(box, radius=32, fill=(28, 24, 21, 255), outline=(196, 184, 168, 255), width=3)
    overlay = Image.alpha_composite(overlay, win)
    d = ImageDraw.Draw(overlay, "RGBA")
    draw_machine_frame(d, box, t)

    appear = phase(t, 0.0, 0.12)
    select = phase(t, 0.12, 0.28)
    drop = phase(t, 0.28, 0.42)
    squeeze = phase(t, 0.42, 0.58)
    pour = phase(t, 0.58, 0.78)
    seal = phase(t, 0.78, 0.9)
    hold = phase(t, 0.9, 1.0)

    r_main = min(w, h) * (0.11 if not mobile else 0.13)
    oranges = [
        (-0.22, -0.04, 0.82),
        (0.2, -0.08, 0.74),
        (-0.02, 0.1, 0.9),
        (0.28, 0.12, 0.7),
        (-0.3, 0.14, 0.68),
    ]

    for i, (ox, oy, sc) in enumerate(oranges):
        fade = appear * (0.55 + 0.45 * ((i + 1) / len(oranges)))
        rr = r_main * sc
        x = cx + ox * w * 0.38
        y = chamber_y + oy * h * 0.22
        if i == 2:
            x = lerp(x, cx, drop)
            y = lerp(y, chamber_y + h * 0.16, drop)
            rr = lerp(rr, r_main * 1.05, select)
            squash = 1 - squeeze * 0.72
            if squash < 0.28:
                continue
            col = mix(orange, pulp, squeeze * 0.45)
            draw_sphere(d, x, y, rr * squash, col)
            if fade > 0.2 and squash > 0.5:
                d.ellipse((x - 4, y - rr * squash - 10, x + 8, y - rr * squash + 4), fill=leaf)
        elif fade > 0.05:
            draw_sphere(d, x, y, rr, mix(orange, deep, 0.12))

    if squeeze > 0.15:
        burst = squeeze
        for k in range(14):
            ang = (k / 14) * math.pi - math.pi / 2 + 0.15
            dist = burst * min(w, h) * (0.08 + (k % 3) * 0.03)
            px = cx + math.cos(ang) * dist
            py = chamber_y + h * 0.16 + math.sin(ang) * dist * 0.7
            pr = 4 + (k % 4) * 3 * burst
            d.ellipse((px - pr, py - pr, px + pr, py + pr), fill=(*juice, int(200 * burst)))

    if pour > 0.02:
        sy0 = chamber_y + h * 0.18
        sy1 = cup_y - cup_h * 0.48
        for s in range(18):
            p = s / 17
            if p > pour:
                break
            yy = lerp(sy0, sy1, p)
            wobble = math.sin(p * 12 + t * 20) * 3 * pour
            rw = 5 + 4 * (1 - p) * pour
            d.ellipse((cx + wobble - rw, yy - rw, cx + wobble + rw, yy + rw), fill=(*juice, 230))

    cup_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    cd = ImageDraw.Draw(cup_layer)
    fill_t = clamp(pour * 1.15) * 0.92 + hold * 0.08
    draw_cup(cd, cx, cup_y, cup_w, cup_h, fill_t, juice)
    if seal > 0:
        lid_y = lerp(cup_y - cup_h * 0.7, cup_y - cup_h * 0.52, seal)
        cd.rounded_rectangle(
            (cx - cup_w * 0.58, lid_y - 6, cx + cup_w * 0.58, lid_y + 8),
            radius=6,
            fill=(236, 228, 216),
            outline=(200, 186, 168),
        )
        if seal > 0.6:
            cd.ellipse((cx - 8, lid_y - 4, cx + 8, lid_y + 12), fill=orange)
    overlay = Image.alpha_composite(overlay, cup_layer)

    if hold > 0:
        gd = ImageDraw.Draw(overlay)
        gr = min(w, h) * 0.16
        gd.ellipse((cx - gr, cup_y - gr, cx + gr, cup_y + gr), fill=(*orange, int(28 * hold)))

    return Image.alpha_composite(bg, overlay).convert("RGB")


def save_sequence(folder, size, mobile):
    dest = ROOT / "public" / folder
    dest.mkdir(parents=True, exist_ok=True)
    bg = make_backgrounds(size, mobile)
    print(f"Generating {TOTAL} frames -> {dest} ({size[0]}x{size[1]})", flush=True)
    for i in range(1, TOTAL + 1):
        img = render_frame(size[0], size[1], i, mobile, bg)
        img.save(dest / f"ezgif-frame-{i:03d}.png", "PNG", compress_level=1)
        if i == 1 or i % 25 == 0:
            print(f"  {folder} {i}/{TOTAL}", flush=True)


def main():
    save_sequence("desktop", (960, 540), mobile=False)
    save_sequence("mobile", (540, 960), mobile=True)
    print("Done.", flush=True)


if __name__ == "__main__":
    main()

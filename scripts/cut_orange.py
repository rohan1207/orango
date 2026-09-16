from PIL import Image
import os

src = r"C:\Users\rohan\.cursor\projects\c-Projects-organo-2\assets\c__Users_rohan_AppData_Roaming_Cursor_User_workspaceStorage_7deb7f740585927dcbd9e8103650e378_images_image-16f94a6e-e761-49d9-8067-93a6d2393fbb.png"
out = r"c:\Projects\organo-2\public\orange-half.png"

img = Image.open(src).convert("RGBA")
# Upscale slightly for sharper hero use
img = img.resize((img.width * 3, img.height * 3), Image.Resampling.LANCZOS)
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        mx = max(r, g, b)
        mn = min(r, g, b)
        sat = (mx - mn) / (mx + 1e-6)
        # Keep juicy orange / pith; drop near-white low-sat background
        is_orangeish = r > 150 and r >= g >= b - 15 and sat > 0.12
        is_pith = r > 200 and g > 185 and b > 160 and abs(r - g) < 45 and sat < 0.22 and mn > 150
        brightness = (r + g + b) / 3

        if brightness > 235 and sat < 0.08:
            pixels[x, y] = (r, g, b, 0)
        elif brightness > 220 and sat < 0.12 and not is_pith:
            # soft fringe
            t = (brightness - 220) / 35
            pixels[x, y] = (r, g, b, int(255 * max(0, 1 - t * 1.4)))
        elif not is_orangeish and not is_pith and brightness > 210:
            pixels[x, y] = (r, g, b, 0)

img.save(out, "PNG", optimize=True)
print("saved", out, img.size, os.path.getsize(out))

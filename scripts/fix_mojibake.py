from pathlib import Path

roots = [
    Path(r"c:\Projects\organo-2\components"),
    Path(r"c:\Projects\organo-2\lib"),
    Path(r"c:\Projects\organo-2\app"),
]

# Corrupted sequences (UTF-8 bytes mis-decoded as Latin-1/CP1252)
REPLACEMENTS = [
    ("caf\u00c3\u00a9s", "cafes"),
    ("caf\u00c3\u00a9", "cafe"),
    ("cafÃ©s", "cafes"),
    ("cafÃ©", "cafe"),
    # em/en dash mojibake variants
    ("â€”", " - "),
    ("â€“", " - "),
    ("â€\"", " - "),
    ("â€\u009d", " - "),
    ("â€™", "'"),
    ("â€˜", "'"),
    ("â€œ", '"'),
    ("â€", '"'),
]

changed = []
for root in roots:
    for path in root.rglob("*"):
        if path.suffix not in {".jsx", ".js", ".ts", ".tsx"}:
            continue
        text = path.read_text(encoding="utf-8", errors="surrogateescape")
        orig = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        # byte-level: fix E2 80 94 shown as three chars when file was latin1-roundtripped
        # Also catch leftover Ã©
        text = text.replace("Ã©", "e")
        if text != orig:
            path.write_text(text, encoding="utf-8", newline="\n")
            changed.append(path)

print(f"changed {len(changed)}")
for p in changed:
    print(p)

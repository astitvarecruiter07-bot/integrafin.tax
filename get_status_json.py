import json

lines = []
try:
    with open('d:/integrafin_web/status.txt', 'r', encoding='utf-16le') as f:
        lines = [line.strip() for line in f if line.strip()]
except Exception:
    with open('d:/integrafin_web/status.txt', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

with open('d:/integrafin_web/status.json', 'w') as f:
    json.dump(lines, f, indent=2)
print("Done")

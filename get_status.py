import sys

try:
    with open('d:/integrafin_web/status.txt', 'r', encoding='utf-16le') as f:
        content = f.read()
except UnicodeDecodeError:
    with open('d:/integrafin_web/status.txt', 'r', encoding='utf-8') as f:
        content = f.read()

print(content)

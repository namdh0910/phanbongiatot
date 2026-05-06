import re
import os

path = r'c:\Users\ktlds\.gemini\antigravity\scratch\phanbongiatot\src\app\san-pham\[slug]\page.tsx'
content = open(path, encoding='utf-8').read()
tags = re.findall(r'<div|</div', content)
stack = 0
for tag in tags:
    if tag == '<div':
        stack += 1
    else:
        stack -= 1
    print(stack, end=' ')
print('\nFinal stack:', stack)

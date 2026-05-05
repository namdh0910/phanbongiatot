import os

file_path = r'c:\Users\ktlds\.gemini\antigravity\scratch\phanbongiatot\src\app\globals.css'

with open(file_path, 'rb') as f:
    content = f.read()

# Find the last '}' in UTF-8
last_brace = content.rfind(b'}')

if last_brace != -1:
    new_content = content[:last_brace+1] + b'\n\n@media (max-width: 768px) {\n  body {\n    padding-bottom: 56px !important;\n  }\n}\n'
    with open(file_path, 'wb') as f:
        f.write(new_content)
    print("Fixed globals.css")
else:
    print("Could not find closing brace")

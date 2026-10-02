file_path = r'c:\Users\maite\Documents\aitonak\aitonak_boceto\src\app\compartidas\navbar\navbar.html'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(r"\'menu\'", "'menu'")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed backslashes!')

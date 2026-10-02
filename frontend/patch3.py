import re
file_path = r'c:\Users\maite\Documents\aitonak\aitonak_boceto\src\app\compartidas\navbar\navbar.html'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# For Montaña Segura (add queryParams scroll menu)
# First link: `/montana-segura`
text = re.sub(
    r'(routerLink="/montana-segura"\s*\n\s*\[routerLinkActiveOptions\]="\{\s*exact:\s*true\s*\}")',
    r'\1\n              [queryParams]="{ scroll: \'menu\' }"',
    text
)
# Second link: `/montana-segura/proyecto`
text = re.sub(
    r'(routerLink="/montana-segura/proyecto")',
    r'\1\n              [queryParams]="{ scroll: \'menu\' }"',
    text
)

# For Area Privada
text = re.sub(
    r'(routerLink="/area-privada")',
    r'\1\n              [queryParams]="{ scroll: \'menu\' }"',
    text
)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Success HTML query params!')

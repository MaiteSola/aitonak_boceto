const fs = require('fs');

// 1. Update translation.service.ts
let ts = fs.readFileSync('src/app/services/translation.service.ts', 'utf8');
ts = ts.replace(/'nav\.conocenos': 'Ezagutu gaitzazu'/, "'nav.conocenos': 'Nortzuk Gara'");
ts = ts.replace(/'conocenos\.title': 'Ezagutu gaitzazu'/, "'conocenos.title': 'Nortzuk Gara'");
fs.writeFileSync('src/app/services/translation.service.ts', ts, 'utf8');

// 2. Update navbar.html
let html = fs.readFileSync('src/app/compartidas/navbar/navbar.html', 'utf8');
const replacements = [
  ['>Rutas de la Semana<', `>{{ t('actividades.rutas_semana') }}<`],
  ['>Estadísticas 2025<', `>{{ t('actividades.estadisticas') }}<`],
  ['>Itinerarios Histórico-Artísticos<', `>{{ t('actividades.itinerarios') }}<`],
  ['>Otras actividades<', `>{{ t('actividades.otras') }}<`],
  ['>Blog, videos y fotos<', `>{{ t('actividades.blog') }}<`],
  ['>Federarse<', `>{{ t('actividades.federarse') }}<`],
];
for (const [search, replace] of replacements) {
    html = html.split(search).join(replace);
}
fs.writeFileSync('src/app/compartidas/navbar/navbar.html', html, 'utf8');

// 3. Fix RouterLink warning in actividades.ts
let actTs = fs.readFileSync('src/app/paginas/actividades/actividades.ts', 'utf8');
actTs = actTs.replace(/imports: \[CommonModule, Navbar, Footer, RouterLink\],/, 'imports: [CommonModule, Navbar, Footer],');
fs.writeFileSync('src/app/paginas/actividades/actividades.ts', actTs, 'utf8');

console.log('Fixed navigation dropdown and translations.');

const fs = require('fs');
let content = fs.readFileSync('src/app/services/translation.service.ts', 'utf8');

const esTranslations = {
  'login.title': 'Acceso Restringido',
  'login.subtitle': 'Por favor, identifícate para entrar.',
  'login.user': 'Usuario',
  'login.pass': 'Contraseña',
  'login.btn': 'Iniciar Sesión',
  'login.back': 'Volver al Inicio',
  'login.error': 'Credenciales incorrectas.',
  'area.title': 'Área',
  'area.privada': 'Privada',
  'area.subtitle': 'Accede a documentos internos, actas, reglamentos y toda la información reservada.',
  'area.nav_title': 'Navegación Documental',
  'area.access': 'Acceso Socios',
  'area.verified': 'Acceso Verificado',
  'area.not_available': 'Documento no disponible todavía',
  'act.title': 'Nuestras',
  'act.actividades': 'Actividades',
  'act.subtitle': 'Explora las estadísticas, revisa rutas y mantente al día.',
  'act.stats': 'Evolución y Estadísticas',
  'act.asistencias': 'Asistencias',
  'act.media_ruta': 'Media por Ruta',
  'act.ver_mas': 'Ver más',
  'act.blog': 'Últimas Noticias',
  'act.federarse': '¿Quieres federarte?',
  'conocenos.title': 'Conócenos',
  'conocenos.subtitle': 'Nuestra historia, cómo participar, y todo lo que hace especial a Aitona-Amonak.',
  'conocenos.quienes_somos': 'Quiénes somos',
  'conocenos.historia': 'Nuestra Historia',
  'conocenos.himno': 'Nuestro Himno',
  'conocenos.participar': 'Cómo Participar y Asociarse',
  'conocenos.obligaciones': 'Tus obligaciones',
  'conocenos.calendario': 'Calendario anual'
};

const euTranslations = {
  'login.title': 'Sarbide Mugatua',
  'login.subtitle': 'Mesedez, identifikatu sartzeko.',
  'login.user': 'Erabiltzailea',
  'login.pass': 'Pasahitza',
  'login.btn': 'Hasi Saioa',
  'login.back': 'Itzuli Hasierara',
  'login.error': 'Kredentzial okerrak.',
  'area.title': 'Eremu',
  'area.privada': 'Pribatua',
  'area.subtitle': 'Sartu barne-dokumentuetara, aktetara eta erreserbatutako informazio guztira.',
  'area.nav_title': 'Dokumentuen Nabigazioa',
  'area.access': 'Bazkideen Sarbidea',
  'area.verified': 'Sarbide Egiaztatua',
  'area.not_available': 'Dokumentua oraindik ez dago eskuragarri',
  'act.title': 'Gure',
  'act.actividades': 'Jarduerak',
  'act.subtitle': 'Arakatu estatistikak, berrikusi ibilbideak eta egon egunean.',
  'act.stats': 'Bilakaera eta Estatistikak',
  'act.asistencias': 'Asistentziak',
  'act.media_ruta': 'Batez bestekoa / Ibilbidea',
  'act.ver_mas': 'Ikusi gehiago',
  'act.blog': 'Azken Berriak',
  'act.federarse': 'Federatu nahi duzu?',
  'conocenos.title': 'Nortzuk gara',
  'conocenos.subtitle': 'Gure historia, nola parte hartu eta Aitona-Amonak berezi egiten duena.',
  'conocenos.quienes_somos': 'Nor gara',
  'conocenos.historia': 'Gure Historia',
  'conocenos.himno': 'Gure Ereserkia',
  'conocenos.participar': 'Nola Parte Hartu eta Bazkidetu',
  'conocenos.obligaciones': 'Zure betebeharrak',
  'conocenos.calendario': 'Urteko egutegia'
};

// Insert ES
let esString = '';
for (const key in esTranslations) {
  esString += `      '${key}': '${esTranslations[key]}',\n`;
}
content = content.replace(/(es: \{)([^}]*)(\},)/s, (match, p1, p2, p3) => {
  return p1 + p2 + esString + p3;
});

// Insert EU
let euString = '';
for (const key in euTranslations) {
  euString += `      '${key}': '${euTranslations[key]}',\n`;
}
content = content.replace(/(eu: \{)([^}]*)(\},)/s, (match, p1, p2, p3) => {
  return p1 + p2 + euString + p3;
});

fs.writeFileSync('src/app/services/translation.service.ts', content, 'utf8');
console.log('Translations injected successfully.');

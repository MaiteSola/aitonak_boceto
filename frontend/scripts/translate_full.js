const fs = require('fs');

function setupTranslations() {
  console.log("Starting full translation patch...");

  // 1. Prepare new UI Translations
  const keysEs = {
    'act.title_main': 'Actividades',
    'act.hero_desc': 'Descubre todo lo que hemos preparado para seguir activos descubriendo naturaleza y cultura.',
    'act.rutas_title': 'Rutas de la semana',
    'act.rutas_desc': 'Accede a la descripción de las rutas y a los distintos tracks, desde estos enlaces:',
    'act.info': 'Información',
    'act.actualizada': 'ACTUALIZADA',
    'act.proxima_jornada': 'de la próxima jornada',
    'act.tracks_en': 'Tracks en',
    'act.o_desde': 'o desde',
    'act.stats_title': 'Evolución y Estadísticas',
    'act.itinerarios_title': 'Itinerarios Histórico-Artísticos',
    'act.otras_title': 'Otras actividades',
    'act.blog_title': 'Últimas Noticias (Blog)',
    'act.federarse_title': '¿Quieres federarte?',
    'act.edades_title': 'Distribución por Edades',
    'act.resumen_year': 'Resumen del Año',
    'act.total_exc': 'Total Excursiones',
    'act.plazas_ofer': 'Plazas Ofertadas Totales',
    'act.media_asist': 'Media de Asistencia',
    
    'conocenos.club': 'Club de Montaña',
    'conocenos.fundado': 'fundado en noviembre de 1983, está formado por quienes hemos dejado atrás nuestra vida laboral: pensionistas, jubilados y jubiladas y sus cónyuges, a quienes nos une la pasión por la montaña y la naturaleza, siendo el fin de la asociación el logro del',
    'conocenos.envejecimiento': 'Envejecimiento Activo.',
    'conocenos.participar_title': 'Cómo Participar y Asociarse',
    'conocenos.participar_desc': 'La Asociación Club de Montaña Aitona-Amonak no es un club de personas jubiladas, aunque sí estamos en esa situación o somos pensionistas con más de 50 años de edad.',
    'conocenos.fines': 'Son fines de la asociación:',
    'conocenos.fines_1': 'Fomentar el amor y respeto por la naturaleza, así como la práctica del ejercicio físico.',
    'conocenos.historia_title': 'Nuestra Historia',
    'conocenos.himno_title': 'Nuestro Himno',
    'conocenos.aniversario_title': 'AITONAK · 25 Aniversario'
  };

  const keysEu = {
    'act.title_main': 'Jarduerak',
    'act.hero_desc': 'Ezagutu natura eta kultura deskubrituz aktibo jarraitzeko prestatu dugun guztia.',
    'act.rutas_title': 'Asteko ibilbideak',
    'act.rutas_desc': 'Sartu ibilbideen deskribapenera eta track ezberdinetara esteka hauetatik:',
    'act.info': 'Informazio',
    'act.actualizada': 'EGUNERATUA',
    'act.proxima_jornada': '(hurrengo jardunaldikoa)',
    'act.tracks_en': 'Track-ak ',
    'act.o_desde': 'edo hemendik',
    'act.stats_title': 'Bilakaera eta Estatistikak',
    'act.itinerarios_title': 'Ibilbide Historiko-Artistikoak',
    'act.otras_title': 'Beste jarduera batzuk',
    'act.blog_title': 'Azken Berriak (Bloga)',
    'act.federarse_title': 'Federatu nahi duzu?',
    'act.edades_title': 'Adinaren araberako banaketa',
    'act.resumen_year': 'Urteko laburpena',
    'act.total_exc': 'Txangoak guztira',
    'act.plazas_ofer': 'Eskaintzen diren Plazak Guztira',
    'act.media_asist': 'Batez besteko Asistentzia',
    
    'conocenos.club': 'Mendi Kluba',
    'conocenos.fundado': '1983ko azaroan sortua, lan-bizitza atzean utzi dugunok osatzen dugu: pentsiodunak, erretiratuak eta euren ezkontideak. Mendiarekiko eta naturarekiko pasioak elkartzen gaitu, eta elkartearen helburua osasuntsu mantentzea da:',
    'conocenos.envejecimiento': 'Zahartze Aktiboa.',
    'conocenos.participar_title': 'Nola Parte Hartu eta Bazkidetu',
    'conocenos.participar_desc': 'Aitona-Amonak Mendi Kluba Elkartea ez da soilik erretiratuen kluba, nahiz eta egoera horretan gauden edo 50 urtetik gorako pentsiodunak garen.',
    'conocenos.fines': 'Hauek dira elkartearen helburuak:',
    'conocenos.fines_1': 'Naturarekiko maitasuna eta errespetua sustatzea, baita ariketa fisikoa egitea ere.',
    'conocenos.historia_title': 'Gure Historia',
    'conocenos.himno_title': 'Gure Ereserkia',
    'conocenos.aniversario_title': 'AITONAK · 25. Urteurrena'
  };

  // 2. Inject in Translation Service
  let tsContent = fs.readFileSync('src/app/services/translation.service.ts', 'utf8');
  
  let esString = '';
  for (const k in keysEs) esString += `      '${k}': '${keysEs[k]}',\n`;
  tsContent = tsContent.replace(/(es: \{)([^}]*)(\},)/s, (match, p1, p2, p3) => p1 + p2 + esString + p3);

  let euString = '';
  for (const k in keysEu) euString += `      '${k}': '${keysEu[k]}',\n`;
  tsContent = tsContent.replace(/(eu: \{)([^}]*)(\},)/s, (match, p1, p2, p3) => p1 + p2 + euString + p3);

  fs.writeFileSync('src/app/services/translation.service.ts', tsContent, 'utf8');


  // 3. Update Actividades HTML
  let actHtml = fs.readFileSync('src/app/paginas/actividades/actividades.html', 'utf8');
  const actReplacements = [
    ['Actividades', `{{ t('act.title_main') }}`],
    ['Descubre todo lo que hemos preparado para seguir activos descubriendo naturaleza y cultura.', `{{ t('act.hero_desc') }}`],
    ['{{ item }}', `{{ t(item) }}`],
    ['>Rutas de la semana<', `>{{ t('act.rutas_title') }}<`],
    ['>Accede a la descripción de las rutas y a los distintos tracks, desde estos enlaces:<', `>{{ t('act.rutas_desc') }}<`],
    ['>Informacion', `>{{ t('act.info') }}`],
    ['ACTUALIZADA', `{{ t('act.actualizada') }}`],
    ['de la proxima jornada</span', `{{ t('act.proxima_jornada') }}</span`],
    ['>Tracks en', `>{{ t('act.tracks_en') }}`],
    ['o desde', `{{ t('act.o_desde') }}`],
    ['Evolución y Estadísticas', `{{ t('act.stats_title') }}`],
    ['Itinerarios Histórico-Artísticos', `{{ t('act.itinerarios_title') }}`],
    ['Otras actividades', `{{ t('act.otras_title') }}`],
    ['Últimas Noticias (Blog)', `{{ t('act.blog_title') }}`],
    ['¿Quieres federarte?', `{{ t('act.federarse_title') }}`],
    ['Distribución por Edades', `{{ t('act.edades_title') }}`],
    ['Resumen del Año', `{{ t('act.resumen_year') }}`],
    ['Total Excursiones', `{{ t('act.total_exc') }}`],
    ['Plazas Ofertadas Totales', `{{ t('act.plazas_ofer') }}`],
    ['Media de Asistencia', `{{ t('act.media_asist') }}`],
  ];
  for (const [s, r] of actReplacements) { actHtml = actHtml.split(s).join(r); }
  fs.writeFileSync('src/app/paginas/actividades/actividades.html', actHtml, 'utf8');

  // 4. Update Conocenos HTML
  let conHtml = fs.readFileSync('src/app/paginas/conocenos/conocenos.html', 'utf8');
  const conReplacements = [
    ['>Club de Montaña', `>{{ t('conocenos.club') }}`],
    ['fundado\\n                en noviembre de 1983, está formado por quienes hemos dejado atrás nuestra vida\\n                laboral: pensionistas, jubilados y jubiladas y sus cónyuges, a quienes nos une la\\n                pasión por la montaña y la naturaleza, siendo el fin de la asociación el logro del', `{{ t('conocenos.fundado') }}`],
    ['>Envejecimiento Activo.<', `>{{ t('conocenos.envejecimiento') }}<`],
    ['Cómo Participar y Asociarse', `{{ t('conocenos.participar_title') }}`],
    ['La Asociación Club de Montaña Aitona-Amonak no es un club de personas jubiladas,\\n                aunque sí estamos en esa situación o somos pensionistas con más de 50 años de edad.', `{{ t('conocenos.participar_desc') }}`],
    ['Son fines de la asociación:', `{{ t('conocenos.fines') }}`],
    ['Fomentar el amor y respeto por la naturaleza, así como la práctica del\\n                        ejercicio físico.', `{{ t('conocenos.fines_1') }}`],
    ['>Nuestra Historia<', `>{{ t('conocenos.historia_title') }}<`],
    ['>Nuestro Himno<', `>{{ t('conocenos.himno_title') }}<`],
    ['>AITONAK · 25 Aniversario<', `>{{ t('conocenos.aniversario_title') }}<`],
  ];
  // Deal with whitespace issues by using a smart replacement for "fundado..."
  // It's safer to just regex replace the "fundado..." text.
  conHtml = conHtml.replace(/fundado[\s\S]*?logro del/m, `{{ t('conocenos.fundado') }}`);
  conHtml = conHtml.replace(/La Asociación Club[\s\S]*?edad\./m, `{{ t('conocenos.participar_desc') }}`);
  conHtml = conHtml.replace(/Fomentar el amor[\s\S]*?ejercicio físico\./m, `{{ t('conocenos.fines_1') }}`);
  
  for (const [s, r] of conReplacements) { 
    if(!s.includes('\\n') && !s.includes('fundado') && !s.includes('La Asociación') && !s.includes('Fomentar el amor')) {
      conHtml = conHtml.split(s).join(r); 
    }
  }

  // Also replace some left overs in AreaPrivada exactly
  let areaHtml = fs.readFileSync('src/app/paginas/area-privada/area-privada.html', 'utf8');
  areaHtml = areaHtml.split('>Entorno de Socios<').join(`>{{ t('area.entorno') || 'Entorno de Socios' }}<`);
  fs.writeFileSync('src/app/paginas/area-privada/area-privada.html', areaHtml, 'utf8');

  console.log("Done patching.");
}

setupTranslations();

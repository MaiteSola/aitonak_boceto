const fs = require('fs');
let content = fs.readFileSync('src/app/paginas/actividades/actividades.html', 'utf8');

content = content.replace('@if (activeSection() > 5) {', '@if (activeSection() > 6) {');
content = content.replaceAll('<!-- SECCIÓN 5: FEDERARSE -->', '<!-- SECCIÓN 6: FEDERARSE -->');
content = content.replace('@if (activeSection() === 5) {', '@if (activeSection() === 6) {');

content = content.replaceAll('<!-- SECCIÓN 4: BLOG -->', '<!-- SECCIÓN 5: BLOG -->');
content = content.replace('@if (activeSection() === 4) {', '@if (activeSection() === 5) {');

content = content.replaceAll('<!-- SECCIÓN 3: OTRAS ACTIVIDADES -->', '<!-- SECCIÓN 4: OTRAS ACTIVIDADES -->');
content = content.replace('@if (activeSection() === 3) {', '@if (activeSection() === 4) {');

content = content.replace('@if (activeSection() === 2) {', '@if (activeSection() === 3) {');

const calendario = `        <!-- ======================= -->
        <!-- SECCIÓN 2: CALENDARIO -->
        <!-- ======================= -->
        @if (activeSection() === 2) {
          <div class="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h2 class="text-3xl font-black text-slate-800 mb-8 border-b border-slate-100 pb-4">
              CALENDARIO DE RUTAS AÑO 2026
            </h2>
            <div class="prose prose-slate max-w-none text-slate-600 mb-8">
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800">ENERO</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>14-ene:</strong> Balsa de Pulguer - Las Clavijas (437 m) – Cintruénigo.</li>
                <li><strong>21-ene:</strong> Guerendiain – Alaitz (1.170 m) - Carrascal (Mañanera)</li>
                <li><strong>28-ene:</strong> Carretera Ejea - La Bandera (512 m) – Fustiñana.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">FEBRERO</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>04-feb:</strong> Castejón - Coraza (441 m) – Tudela.</li>
                <li><strong>11-feb:</strong> Falces - Jenáriz (551 m) – Miranda de Arga.</li>
                <li><strong>19-feb:</strong> El Paso - Cornialto (505 m) - Carcastillo.</li>
                <li><strong>25-feb:</strong> Petilla - Castillo Roita (874 m) – Sos del Rey Católico.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">MARZO</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>04-mar:</strong> Gallipienzo - Txutxu Alto (930 m) – Ujué/Uxue .</li>
                <li><strong>11-mar:</strong> XXXVI JAVIERADA: Mº de Leire - Arangoiti (1.375 m) - Javier / Lumbier.</li>
                <li><strong>18-mar:</strong> Muniáin - Montejurra (1.045 m) – Estella/Lizarra.</li>
                <li><strong>25-mar:</strong> Etzegarate - Balankaleku (985 m) – Altsasu/Alsasua.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">ABRIL</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>01-abr:</strong> Orbaitzeta - Latxaga (1.206 m) – Auritz/Burguete.</li>
                <li><strong>08-abr:</strong> Baquedano - Nacedero Urederra – Camping de Urbasa.</li>
                <li><strong>15-abr:</strong> Orreaga/ Roncesvalles - Urkulu (1.423 m.) – Fábrica Orbaitzeta. (Bus a Garaioa).</li>
                <li><strong>22-abr:</strong> Piscinas de. Urdiain - Irumugeta (959 m) – Etxarri Aranatz.</li>
                <li><strong>29-abr:</strong> Andoain - Adarra (819 m.) – Urnieta.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">MAYO</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>06-may:</strong> Bera - Agiña (617 m) – Lesaka.</li>
                <li><strong>13-may:</strong> Pto. Belate - Saioa (1.418 m) – Lantz.</li>
                <li class="text-rose-600 font-semibold">(*) 20-may: Hotel Oroel - Oroel (1.770 m) - Jaca. <br><span class="text-sm font-normal text-slate-500">La Peña - San Román (1.157 m) – Riglos / Murillo de Gállego.<br>(Prevista en el calendario inicial y ANULADA por obras en la carretera).</span></li>
                <li class="text-rose-600 font-semibold">(*) 27-may: Zubieta - Mendaur (1.126 m) – Doneztebe/Santesteban.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">JUNIO</h3>
              <ul class="list-none pl-4 space-y-2">
                <li class="text-rose-600 font-semibold">(*) 03-jun: Estación Esquí Valdezcaray - San Lorenzo (2.262 m) – Ezcaray.</li>
                <li class="text-rose-600 font-semibold">(*) 10-jun: Escarrilla/Sallent - Pacino (1.950 m) – Escarrilla / Sallent de Gállego.</li>
                <li class="text-rose-600 font-semibold">(*) 17-jun: Esquí Abodi – Orhi (2.019 m) – Otsagabia / Eskaroze.</li>
                <li><strong>24-jun:</strong> XL FINALISTA. (A determinar por la Junta Directiva).</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">AGOSTO</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>26-ago:</strong> Pasaia – Monte Ulia – Donostia/San Sebastián.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">SEPTIEMBRE</h3>
              <ul class="list-none pl-4 space-y-2">
                <li class="text-rose-600 font-semibold">(*) 02-sep: Collado Argibela/Linza – Mesa de los Tres Reyes (2.448 m) – Isaba.</li>
                <li class="text-rose-600 font-semibold">(*) 09-sep: Oza - Ibón Acherito - Pic du Lac de la Churique (2.138 m) – Siresa.</li>
                <li class="text-rose-600 font-semibold">(*) 16-sep: Otzaurte - Aitzkorri (1.528 m) – Arantzazu.</li>
                <li><strong>23-sep:</strong> Areso (Polígono Eluseder) – Ulizar (868 m) – Tolosa.</li>
                <li><strong>30-sep:</strong> Areso - Mergelu (914 m) – Lekunberri.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">OCTUBRE</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>07-oct:</strong> Uitzi - Ireber  (1208 m) – Leitza.</li>
                <li><strong>14-oct:</strong> Oronoz - Legate (870 m) – Elizondo.</li>
                <li><strong>21-oct:</strong> Ollobarren - Sartzaleta (1.053m) – Larrión.</li>
                <li><strong>28-oct:</strong> Latasa/Eraso - Erga (1.080 m) – Irurtzun.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">NOVIEMBRE</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>04-nov:</strong> XLII DIA DEL CLUB: Subida a Ezkaba (San Cristóbal 892 m).</li>
                <li><strong>11-nov:</strong> Ostériz - Measkoitz (1.014 m) –Zubiri / Eugi.</li>
                <li><strong>18-nov:</strong> Oscáriz/Ozkariz - Ollaran (785 m) – Aoiz/Agoitz.</li>
                <li><strong>25-nov:</strong> Subiza - Bordatxar (1.002 m) – Puente la Reina/Gares.</li>
              </ul>
              <h3 class="text-xl font-bold bg-lime-100 px-4 py-2 rounded-lg text-lime-800 mt-6">DICIEMBRE</h3>
              <ul class="list-none pl-4 space-y-2">
                <li><strong>02-dic:</strong> Orkin - Arañotz (840 m) – Larraintzar (Mañanera).</li>
                <li><strong>09-dic:</strong> Barranco de las Limas/Ctra. NA-124 - Portal (463 m) – Arguedas.</li>
                <li><strong>16-dic:</strong> Elia - Lakarri (1.046 m) – Huarte/Uharte (Mañanera).</li>
                <li><strong>20-dic:</strong> MENDIGOIZALEEN EGUNA: Baraibar - San Miguel de Aralar (1.241 m).</li>
              </ul>
              <div class="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-xl">
                <p class="font-bold text-rose-700 m-0">(*) En las salidas marcadas en rojo se saldrá a las 8 de la mañana.</p>
              </div>
              <div class="mt-8 space-y-4 text-sm bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <ul class="space-y-4">
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>La Asociación Club de Montaña “AITONA-AMONAK” no se hace responsable de los accidentes que puedan ocurrir durante los recorridos.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>El horario de salida normal, tanto para las excursiones de todo el día como para las mañaneras, será a las 9 h. de la mañana.
                    <br>Los días: 20 y 27 de mayo, 3, 10 y 17 de junio, 2, 9 y 16 de septiembre, se adelantará la salida a las 8 de la mañana.
                    <br>El horario de regreso será a las 6 de la tarde.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>La Junta se reserva el derecho a cambiar recorridos, rutas, fechas y horarios por causas que, a su juicio, así lo aconsejen.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>Es conveniente anotar los teléfonos de los y las guías en el móvil: <br>
                    <strong>ALTA: <a href="tel:644020386" class="text-sky-600 hover:underline">644 020 386</a></strong>, &nbsp; 
                    <strong>MEDIA: <a href="tel:644628542" class="text-sky-600 hover:underline">644 628 542</a></strong>, &nbsp; 
                    <strong>BAJA: <a href="tel:644786101" class="text-sky-600 hover:underline">644 786 101</a></strong></span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <div>
                      <strong>Durante las rutas, en caso de accidente:</strong>
                      <ul class="list-disc pl-5 mt-2 space-y-1">
                        <li>De gravedad avisar al 112 y, en todos los casos, avisar al guía de grupo.</li>
                        <li>Asegurados de HELVETIA-AITONAK (póliza P6C3039):
                          <ul class="list-circle pl-5 mt-1 space-y-1 text-slate-500">
                            <li>Pedir el parte de accidente al responsable del autobús o acudir a la oficina a recogerlo.</li>
                            <li>Llamar a uno de estos teléfonos donde facilitarán el número de autorización para entregar en urgencias: <a href="tel:913349228" class="text-sky-600 hover:underline">913 349 228</a> / <a href="tel:902107120" class="text-sky-600 hover:underline">902 107 120</a></li>
                            <li>Acudir a la Clínica San Miguel, siempre por URGENCIAS.</li>
                          </ul>
                        </li>
                        <li>Federados de Montaña: Llamar al teléfono <a href="tel:696907374" class="text-sky-600 hover:underline">696 907 374</a> para dar parte.</li>
                      </ul>
                    </div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>El seguro de HELVETIA-AITONAK, o la modalidad B de la Federación de Montaña NO cubren los recorridos por Francia. En éstos es preciso un seguro más completo (modalidad C de la Federación de Montaña).</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>Las rutas y sus tracks están disponibles en la Web, el blog de Aitona-Amonak y en Wikiloc. Elige la ruta que mejor se adapte a tu estado físico. Conviene llevarlas en el GPS o en el móvil.<br>También debes especificar en el billete la ruta que vas a realizar.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>Hay que respetar los recorridos marcados y no quedarse sin compañía, además de avisar al guía si hay retraso.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>Sed puntuales, especialmente al regreso, ya que hasta que no estemos en nuestros asientos no podemos comprobar si falta alguien.<br>Si regresas por otros medios debes avisar antes al responsable del autobús.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>Al autobús no deben subirse los bastones y es obligatorio ponerse el cinturón de seguridad.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-lime-600 font-black">+</span> 
                    <span>No nos hacemos responsables de los objetos perdidos. Estos deberán recogerse en las oficinas de EDSA. (Pol. Ind. Comarca II-C, 28 Barbatáin - tfno: <a href="tel:948131933" class="text-sky-600 hover:underline">948 131 933</a>).<br>Es conveniente llevar algo en la mochila que te identifique.<br>También botiquín elemental personal.</span>
                  </li>
                </ul>
                
                <div class="mt-6 pt-6 border-t border-slate-200">
                  <h4 class="font-bold text-slate-700 mb-2">Horarios de oficina:</h4>
                  <p>Lunes y jueves de 10h. a 12h. Estafeta 47, 1º &nbsp;|&nbsp; Tfno. <a href="tel:948230342" class="text-sky-600 hover:underline">948 230 342</a></p>
                  <h4 class="font-bold text-slate-700 mb-2 mt-4">Correos y Contacto:</h4>
                  <ul class="space-y-1">
                    <li><strong>Secretaría/Presidencia:</strong> <a href="mailto:aitonak.presidencia@gmail.com" class="text-sky-600 hover:underline">aitonak.presidencia@gmail.com</a></li>
                    <li><strong>Oficina:</strong> <a href="mailto:aitonak83@gmail.com" class="text-sky-600 hover:underline">aitonak83@gmail.com</a></li>
                    <li><strong>Blog/fotos:</strong> <a href="mailto:aitonak18@gmail.com" class="text-sky-600 hover:underline">aitonak18@gmail.com</a></li>
                    <li><strong>Página web:</strong> <a href="https://aitonak.es" target="_blank" class="text-sky-600 hover:underline">https://aitonak.es</a></li>
                    <li><strong>Blog:</strong> <a href="https://aitonak.blog" target="_blank" class="text-sky-600 hover:underline">https://aitonak.blog</a></li>
                  </ul>
                </div>
              </div>
              <div class="mt-8 flex justify-center">
                <a href="assets/documentos/calendario2026.pdf" target="_blank" class="inline-flex items-center gap-3 bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 text-white font-bold px-6 py-4 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-1 group">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Descargar Folleto del Calendario 2026</span>
                </a>
              </div>
            </div>
          </div>
        }

        <!-- ======================= -->
        <!-- SECCIÓN 3: ITINERARIOS HISTÓRICO-ARTÍSTICOS -->
        <!-- ======================= -->
        @if (activeSection() === 3) {`;

content = content.replace('<!-- SECCIÓN 2: ITINERARIOS HISTÓRICO-ARTÍSTICOS -->\\r\\n        <!-- ======================= -->\\r\\n        @if (activeSection() === 3) {', calendario);

// Unix newlines fallback
if (!content.includes('CALENDARIO DE RUTAS AÑO 2026')) {
    content = content.replace('<!-- SECCIÓN 2: ITINERARIOS HISTÓRICO-ARTÍSTICOS -->\\n        <!-- ======================= -->\\n        @if (activeSection() === 3) {', calendario);
}

fs.writeFileSync('src/app/paginas/actividades/actividades.html', content);
console.log('Update finished! Checked for CALENDARIO:', content.includes('CALENDARIO DE RUTAS AÑO 2026'));

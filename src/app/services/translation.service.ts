import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  lang = signal<'es' | 'eu'>('es');

  translations: Record<string, Record<string, string>> = {
    es: {
      'nav.bienvenida': 'Bienvenida',
      'nav.conocenos': 'Conócenos',
      'nav.actividades': 'Actividades',
      'nav.participar': 'Cómo Participar',
      'nav.billetes': 'Billetes Bus',
      'nav.privada': 'Área Privada',
      'nav.conocenos.participar': 'Cómo Participar',
      'nav.conocenos.historia': 'Historia',
      'nav.conocenos.himno': 'Himno',
      'nav.conocenos.contacto': 'Contacto',
      'hero.bienvenida': 'Os damos la bienvenida a nuestra página web.',
      'hero.bienvenida_eu': 'Ongi etorri gure webgunera.',
      'links.conocenos': 'Conócenos en este enlace',
      'links.rutas_desc':
        'Accede a la descripción de las rutas y a los distintos tracks, desde estos enlaces:',
      'links.info_act': 'Información ACTUALIZADA de la próxima jornada',
      'links.tracks': 'Tracks GPX - KML o desde Wikiloc',
      'sponsors.titulo': 'PATROCINADORES',
      'hero.subtitulo': 'Club de Montaña de Mayores de Navarra',
      'hero.carrusel_text_1': 'Senderos que unen historias',
      'hero.carrusel_desc_1': 'Descubre las rutas y paisajes con nuestro grupo de montaña.',
      'hero.carrusel_text_2': 'Pasión por la naturaleza',
      'hero.carrusel_desc_2':
        'Organizamos salidas semanales adaptadas a todas las personas mayores.',
      'hero.carrusel_text_3': 'Compañerismo y salud',
      'hero.carrusel_desc_3': 'Caminamos juntos por sendas llenas de vida y aire puro.',
      'hero.carrusel_text_4': 'Explora Navarra con nosotros',
      'hero.carrusel_desc_4': 'Únete a nuestras excursiones y comparte momentos inolvidables.',
      'banner.es': 'Os damos la bienvenida a nuestra página web.',
      'banner.eu': 'Ongi etorri gure webgunera.',
      'footer.rights': 'Todos los derechos reservados.',
      'links.ver_mas': 'Ver más detalles de la excursión',
      'links.descargar_gpx': 'Descargar GPX',
      'links.descargar_klm': 'Descargar KML',
      'links.ir_wikiloc': 'Ver en Wikiloc',
    },
    eu: {
      'nav.bienvenida': 'Ongi etorri',
      'nav.conocenos': 'Ezagutu gaitzazu',
      'nav.actividades': 'Jarduerak',
      'nav.participar': 'Nola parte hartu',
      'nav.billetes': 'Autobus Sarrerak',
      'nav.privada': 'Eremu Pribatua',
      'nav.conocenos.participar': 'Nola parte hartu',
      'nav.conocenos.historia': 'Historia',
      'nav.conocenos.himno': 'Ereserkia',
      'nav.conocenos.contacto': 'Kontaktua',
      'hero.bienvenida': 'Ongi etorri gure webgunera.',
      'hero.bienvenida_eu': 'Ongi etorri gure webgunera.',
      'links.conocenos': 'Informazio gehiago esteka honetan',
      'links.rutas_desc':
        'Ibilbideen deskribapenera eta track ezberdinetara sartu esteka hauetatik:',
      'links.info_act': 'Hurrengo jardunaldiko informazio EGUNERATUA',
      'links.tracks': 'GPX - KML track-ak edo Wikiloc-etik',
      'sponsors.titulo': 'BABESLEAK',
      'hero.subtitulo': 'Nafarroako Nagusien Mendi Kluba',
      'hero.carrusel_text_1': 'Istorioak lotzen dituzten bideak',
      'hero.carrusel_desc_1': 'Ezagutu ibilbideak eta paisaiak gure mendi taldearekin.',
      'hero.carrusel_text_2': 'Naturarekiko grina',
      'hero.carrusel_desc_2':
        'Mendiko adineko guztiei egokitutako asteko irteerak antolatzen ditugu.',
      'hero.carrusel_text_3': 'Laguntasuna eta osasuna',
      'hero.carrusel_desc_3': 'Batera ibiltzen gara aire garbi eta bizitzaz beteriko bideetatik.',
      'hero.carrusel_text_4': 'Ezagutu Nafarroa gurekin',
      'hero.carrusel_desc_4': 'Bat egin gure irteerekin eta partekatu une ahaztezinak.',
      'banner.es': 'Os damos la bienvenida a nuestra página web.',
      'banner.eu': 'Ongi etorri gure webgunera.',
      'footer.rights': 'Eskubide guztiak erreserbatuta.',
      'links.ver_mas': 'Ikusi irteeraren xehetasun gehiago',
      'links.descargar_gpx': 'Deskargatu GPX',
      'links.descargar_klm': 'Deskargatu KML',
      'links.ir_wikiloc': 'Ikusi Wikiloc-en',
    },
  };

  t(key: string): string {
    return this.translations[this.lang()][key] || key;
  }

  setLang(l: 'es' | 'eu') {
    this.lang.set(l);
  }
}

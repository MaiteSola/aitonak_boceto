import { Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Slide {
  image: string;
  titleKey:
    | 'hero.carrusel_text_1'
    | 'hero.carrusel_text_2'
    | 'hero.carrusel_text_3'
    | 'hero.carrusel_text_4';
  descKey:
    | 'hero.carrusel_desc_1'
    | 'hero.carrusel_desc_2'
    | 'hero.carrusel_desc_3'
    | 'hero.carrusel_desc_4';
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  lang = signal<'es' | 'eu'>('es');
  mobileMenuOpen = signal<boolean>(false);
  activeSlide = signal<number>(0);
  private autoPlayInterval: any;

  slides: Slide[] = [
    {
      image: 'assets/imagenes/home_monte1.jpg',
      titleKey: 'hero.carrusel_text_1',
      descKey: 'hero.carrusel_desc_1',
    },
    {
      image: 'assets/imagenes/home_monte2.jpg',
      titleKey: 'hero.carrusel_text_2',
      descKey: 'hero.carrusel_desc_2',
    },
    {
      image: 'assets/imagenes/home_monte3.jpg',
      titleKey: 'hero.carrusel_text_3',
      descKey: 'hero.carrusel_desc_3',
    },
    {
      image: 'assets/imagenes/home_monte4.jpg',
      titleKey: 'hero.carrusel_text_4',
      descKey: 'hero.carrusel_desc_4',
    },
  ];

  translations = {
    es: {
      'nav.bienvenida': 'Bienvenida',
      'nav.conocenos': 'Conócenos',
      'nav.actividades': 'Actividades',
      'nav.participar': 'Cómo Participar',
      'nav.billetes': 'Billetes Bus',
      'nav.privada': 'Área Privada',
      'hero.bienvenida': 'Os damos la bienvenida a nuestra página web.',
      'hero.bienvenida_eu': 'Ongi etorri gure webgunera.',
      'links.conocenos': 'Conócenos en este enlace',
      'links.rutas_desc':
        'Accede a la descripción de las rutas y a los distintos tracks, desde estos enlaces:',
      'links.info_act': 'Información ACTUALIZADA de la próxima jornada',
      'links.tracks': 'Tracks GPX - KLM o desde Wikiloc',
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
      'links.descargar_klm': 'Descargar KLM',
      'links.ir_wikiloc': 'Ver en Wikiloc',
    },
    eu: {
      'nav.bienvenida': 'Ongi etorri',
      'nav.conocenos': 'Ezagutu gaitzazu',
      'nav.actividades': 'Jarduerak',
      'nav.participar': 'Nola parte hartu',
      'nav.billetes': 'Autobus Sarrerak',
      'nav.privada': 'Eremu Pribatua',
      'hero.bienvenida': 'Ongi etorri gure webgunera.',
      'hero.bienvenida_eu': 'Ongi etorri gure webgunera.',
      'links.conocenos': 'Informazio gehiago esteka honetan',
      'links.rutas_desc':
        'Ibilbideen deskribapenera eta track ezberdinetara sartu esteka hauetatik:',
      'links.info_act': 'Hurrengo jardunaldiko informazio EGUNERATUA',
      'links.tracks': 'GPX - KLM track-ak edo Wikiloc-etik',
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
      'links.descargar_klm': 'Deskargatu KLM',
      'links.ir_wikiloc': 'Ikusi Wikiloc-en',
    },
  };

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  t(key: keyof typeof this.translations.es): string {
    return this.translations[this.lang()][key] || key;
  }

  setLang(l: 'es' | 'eu') {
    this.lang.set(l);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((prev) => !prev);
  }

  nextSlide() {
    this.activeSlide.update((curr) => (curr + 1) % this.slides.length);
  }

  prevSlide() {
    this.activeSlide.update((curr) => (curr - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(idx: number) {
    this.activeSlide.set(idx);
    this.resetAutoPlay();
  }

  private startAutoPlay() {
    if (isPlatformBrowser(this.platformId)) {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  private stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

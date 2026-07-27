import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';

import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './actividades.html',
  styleUrl: './actividades.scss',
})
export class Actividades implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  ts = inject(TranslationService);

  menuItems = [
    'actividades.rutas_semana',
    'actividades.estadisticas',
    'actividades.itinerarios',
    'actividades.otras',
    'actividades.blog',
    'actividades.federarse',
  ];

  t(key: string): string {
    return this.ts.t(key);
  }

  activeSection = signal<number>(0);

  // --- Blog / WP API ---
  blogPosts = signal<any[]>([]);
  isLoadingBlog = signal<boolean>(true);
  blogError = signal<boolean>(false);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const sectionIndex = params['section'] ? parseInt(params['section'], 10) : 0;
      if (!isNaN(sectionIndex) && sectionIndex >= 0 && sectionIndex < this.menuItems.length) {
        this.activeSection.set(sectionIndex);
      }
      // scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.fetchBlogPosts();
  }

  fetchBlogPosts() {
    // LLamamos a la API REST nativa de WordPress
    this.http.get<any[]>('https://aitonak.blog/wp-json/wp/v2/posts?_embed&per_page=3').subscribe({
      next: (posts) => {
        const mappedPosts = posts.map((p) => {
          // Extraer imagen si existe
          let imageUrl = 'assets/imagenes/portada_5.jpg'; // fallback
          if (
            p._embedded &&
            p._embedded['wp:featuredmedia'] &&
            p._embedded['wp:featuredmedia'].length > 0
          ) {
            imageUrl = p._embedded['wp:featuredmedia'][0].source_url;
          }

          // Extraer categoria (la primera disponible)
          let categoryName = 'General';
          if (p._embedded && p._embedded['wp:term'] && p._embedded['wp:term'].length > 0) {
            // wp:term suele ser un array de arrays para cada taxonomía
            const categories = p._embedded['wp:term'][0];
            if (categories && categories.length > 0) categoryName = categories[0].name;
          }

          return {
            title: p.title.rendered,
            link: p.link,
            date: p.date,
            excerpt: p.excerpt.rendered,
            category: categoryName,
            image: imageUrl,
          };
        });
        this.blogPosts.set(mappedPosts);
        this.isLoadingBlog.set(false);
      },
      error: (err) => {
        console.error('Error cargando blog de WP:', err);
        this.blogError.set(true);
        this.isLoadingBlog.set(false);
      },
    });
  }

  setSection(index: number) {
    this.activeSection.set(index);
  }

  // --- Modal Estafeta ---
  showEstafetaModal = signal<boolean>(false);

  // --- Carousel Estadísticas ---
  currentStatIndex = signal<number>(0);
  statsSlides = [0, 1, 2, 3];

  selectedYear = signal<string>('2025');
  availableYears = ['2025', '2024', '2023', '2022', '2021', '2020', '2019'];

  statsData: Record<string, any> = {
    '2025': {
      asistencias: { alta: 2017, media: 2606, baja: 2559, aitatxis: 545, total: 7727 },
      mediaRuta: {
        alta: 47,
        media: 60,
        baja: 59,
        aitatxis: 12,
        split: {
          altaM: 7,
          altaH: 40,
          mediaM: 17,
          mediaH: 43,
          bajaM: 28,
          bajaH: 31,
          aitM: 7,
          aitH: 5,
        },
      },
      info: [
        {
          grupo: 'BAJA',
          dist: '9,4',
          tiempo: '3:01',
          desPos: '201',
          desNeg: '244',
          color: 'text-emerald-600',
          bg: 'bg-emerald-100/50',
        },
        {
          grupo: 'MEDIA',
          dist: '12,75',
          tiempo: '3:32',
          desPos: '460',
          desNeg: '534',
          color: 'text-sky-600',
          bg: 'bg-sky-100/50',
        },
        {
          grupo: 'ALTA',
          dist: '15,89',
          tiempo: '3:46',
          desPos: '691',
          desNeg: '743',
          color: 'text-red-600',
          bg: 'bg-red-100/50',
        },
      ],
      hasAge: true,
    },
    '2024': {
      asistencias: { alta: 1867, media: 2616, baja: 2356, aitatxis: 554, total: 7393 },
      mediaRuta: { alta: 43, media: 61, baja: 55, aitatxis: 13, split: null },
      info: [
        {
          grupo: 'BAJA',
          dist: '9,5',
          tiempo: "2h 58'",
          desPos: '197',
          desNeg: '310',
          color: 'text-emerald-600',
          bg: 'bg-emerald-100/50',
        },
        {
          grupo: 'MEDIA',
          dist: '12,4',
          tiempo: "3h 34'",
          desPos: '424',
          desNeg: '552',
          color: 'text-sky-600',
          bg: 'bg-sky-100/50',
        },
        {
          grupo: 'ALTA',
          dist: '15,2',
          tiempo: "3h 55'",
          desPos: '688',
          desNeg: '835',
          color: 'text-red-600',
          bg: 'bg-red-100/50',
        },
      ],
      hasAge: true,
    },
    '2023': {
      asistencias: { alta: 1864, media: 2871, baja: 2022, aitatxis: 395, total: 7152 },
      mediaRuta: { alta: 43, media: 67, baja: 47, aitatxis: 9, split: null },
      info: [
        {
          grupo: 'BAJA',
          dist: '9,1',
          tiempo: '2,38',
          desPos: '163',
          desNeg: '-273',
          color: 'text-emerald-600',
          bg: 'bg-emerald-100/50',
        },
        {
          grupo: 'MEDIA',
          dist: '13,3',
          tiempo: '3,44',
          desPos: '490',
          desNeg: '-600',
          color: 'text-sky-600',
          bg: 'bg-sky-100/50',
        },
        {
          grupo: 'ALTA',
          dist: '15,1',
          tiempo: '3,54',
          desPos: '733',
          desNeg: '-806',
          color: 'text-red-600',
          bg: 'bg-red-100/50',
        },
        {
          grupo: 'AITATXIS',
          dist: '3,7',
          tiempo: '1,36',
          desPos: '59',
          desNeg: '-52',
          color: 'text-yellow-600',
          bg: 'bg-yellow-100/50',
        },
      ],
      hasAge: false,
    },
    '2022': {
      asistencias: { alta: 1769, media: 2761, baja: 1684, aitatxis: 327, total: 6541 },
      mediaRuta: { alta: 42, media: 66, baja: 40, aitatxis: 7, split: null },
      info: [
        {
          grupo: 'BAJA',
          dist: '9,33',
          tiempo: '2,31',
          desPos: '220',
          desNeg: '-284',
          color: 'text-emerald-600',
          bg: 'bg-emerald-100/50',
        },
        {
          grupo: 'MEDIA',
          dist: '12,43',
          tiempo: '3,37',
          desPos: '483',
          desNeg: '-566',
          color: 'text-sky-600',
          bg: 'bg-sky-100/50',
        },
        {
          grupo: 'ALTA',
          dist: '16,2',
          tiempo: '3,49',
          desPos: '728',
          desNeg: '-798',
          color: 'text-red-600',
          bg: 'bg-red-100/50',
        },
        {
          grupo: 'AITATXIS',
          dist: '3,3',
          tiempo: '1,42',
          desPos: '64',
          desNeg: '-68',
          color: 'text-yellow-600',
          bg: 'bg-yellow-100/50',
        },
      ],
      hasAge: false,
    },
    '2021': {
      asistencias: { alta: 649, media: 1028, baja: 443, aitatxis: 32, total: 2152 },
      mediaRuta: { alta: 40, media: 60, baja: 27, aitatxis: 2, split: null },
      info: [
        {
          grupo: 'BAJA',
          dist: '9,8',
          tiempo: '2,7',
          desPos: '126',
          desNeg: '-152',
          color: 'text-emerald-600',
          bg: 'bg-emerald-100/50',
        },
        {
          grupo: 'MEDIA',
          dist: '12,0',
          tiempo: '3,3',
          desPos: '337',
          desNeg: '-402',
          color: 'text-sky-600',
          bg: 'bg-sky-100/50',
        },
        {
          grupo: 'ALTA',
          dist: '15,2',
          tiempo: '4,2',
          desPos: '562',
          desNeg: '-615',
          color: 'text-red-600',
          bg: 'bg-red-100/50',
        },
        {
          grupo: 'AITATXIS',
          dist: '2 a 6',
          tiempo: '2 a 3',
          desPos: '-',
          desNeg: '-',
          color: 'text-yellow-600',
          bg: 'bg-yellow-100/50',
        },
      ],
      hasAge: false,
    },
    '2020': {
      asistencias: { alta: 612, media: 612, baja: 666, aitatxis: 108, total: 1998 },
      mediaRuta: { alta: 68, media: 68, baja: 74, aitatxis: 12, split: null },
      info: [
        {
          grupo: 'BAJA',
          dist: '9,4',
          tiempo: '2,7',
          desPos: '156',
          desNeg: '-210',
          color: 'text-emerald-600',
          bg: 'bg-emerald-100/50',
        },
        {
          grupo: 'MEDIA',
          dist: '12,7',
          tiempo: '3,3',
          desPos: '288',
          desNeg: '-369',
          color: 'text-sky-600',
          bg: 'bg-sky-100/50',
        },
        {
          grupo: 'ALTA',
          dist: '15,2',
          tiempo: '4,2',
          desPos: '491',
          desNeg: '-534',
          color: 'text-red-600',
          bg: 'bg-red-100/50',
        },
        {
          grupo: 'AITATXIS',
          dist: '2 a 6',
          tiempo: '2 a 3',
          desPos: '-',
          desNeg: '-',
          color: 'text-yellow-600',
          bg: 'bg-yellow-100/50',
        },
      ],
      hasAge: false,
    },
    '2019': {
      asistencias: { alta: 2449, media: 2528, baja: 2800, aitatxis: 680, total: 8457 },
      mediaRuta: { alta: 58, media: 60, baja: 67, aitatxis: 19, split: null },
      info: [
        {
          grupo: 'BAJA',
          dist: '9,5',
          tiempo: '2,7',
          desPos: '254',
          desNeg: '-328',
          color: 'text-emerald-600',
          bg: 'bg-emerald-100/50',
        },
        {
          grupo: 'MEDIA',
          dist: '12,9',
          tiempo: '3,4',
          desPos: '446',
          desNeg: '-552',
          color: 'text-sky-600',
          bg: 'bg-sky-100/50',
        },
        {
          grupo: 'ALTA',
          dist: '16,1',
          tiempo: '3,9',
          desPos: '705',
          desNeg: '-845',
          color: 'text-red-600',
          bg: 'bg-red-100/50',
        },
        {
          grupo: 'AITATXIS',
          dist: '2 a 6',
          tiempo: '2,5 a 3',
          desPos: '-',
          desNeg: '-',
          color: 'text-yellow-600',
          bg: 'bg-yellow-100/50',
        },
      ],
      hasAge: false,
    },
  };

  nextStat() {
    this.currentStatIndex.update((i) => (i + 1) % this.statsSlides.length);
  }

  prevStat() {
    this.currentStatIndex.update((i) => (i === 0 ? this.statsSlides.length - 1 : i - 1));
  }

  setStat(index: number) {
    this.currentStatIndex.set(index);
  }

  changeYear(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedYear.set(select.value);
    this.currentStatIndex.set(0);
  }

  get currentData() {
    return this.statsData[this.selectedYear()];
  }

  get pieGradient() {
    const data = this.currentData.asistencias;
    const total = data.total;
    const altaPct = (data.alta / total) * 100;
    const mediaPct = (data.media / total) * 100;
    const bajaPct = (data.baja / total) * 100;

    const p1 = altaPct;
    const p2 = p1 + mediaPct;
    const p3 = p2 + bajaPct;

    return `conic-gradient(#ef4444 0% ${p1}%, #60a5fa ${p1}% ${p2}%, #4ade80 ${p2}% ${p3}%, #fde047 ${p3}% 100%)`;
  }
}

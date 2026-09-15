import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { TranslationService } from '../../services/translation.service';
import { HeroCarousel } from '../../compartidas/hero-carousel/hero-carousel';

@Component({
  selector: 'app-conocenos',
  imports: [Navbar, Footer, HeroCarousel],
  templateUrl: './conocenos.html',
  styleUrl: './conocenos.scss',
})
export class Conocenos {
  route = inject(ActivatedRoute);
  router = inject(Router);
  ts = inject(TranslationService);
  activeTab = signal<number>(0);
  isMobileMenuOpen = signal<boolean>(false);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const tb = params['tab'];
      if (tb !== undefined) {
        this.activeTab.set(parseInt(tb, 10));
        // Esperamos un instante a que se renderice el nuevo contenido del tab
        setTimeout(() => {
          const menuEl = document.getElementById('menu');
          if (menuEl) {
            // El navbar tiene h-16 sm:h-20 (~80px). Restamos ~84px para que
            // el contenedor de fondo blanco quede exactamente debajo del navbar (flush).
            const navHeight = 84;
            const y = menuEl.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      } else {
        // Carga inicial genérica: Nos quedamos arriba viendo el Hero
        this.activeTab.set(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  t(key: string): string {
    return this.ts.t(key);
  }

  tabs = [
    'conocenos.quienes_somos',
    'conocenos.participar',
    'conocenos.historia',
    'conocenos.himno',
  ];

  historyChapters = [
    'Índice',
    'Presentación.',
    '1. La Primera subida a San Cristóbal en 1983.',
    '2. Primeros pasos de montañeros mayores.',
    '3. Maestro, música en la calle.',
    '4. Montañismo y senderismo, fuente de salud y de vida.',
    '5. De Félix a Gabino... se hizo el camino.',
    '6. Dos cumbres humanas: Club de compañía y Voluntariado de Medio Ambiente.',
    '7. El dinero de los montañeros jubilados.',
    '8. Tres claves y un retrato para entender Aitonak.',
    '9. Semblanzas.',
    '10. Más Allá de la anécdota.',
    '11. Apéndices.',
    '12. 25 años para el recuerdo.',
  ];

  goToTab(index: number) {
    // En vez de hacer el scroll aquí, actualizamos la URL (queryParam)
    // Esto sincroniza el estado activo con el Navbar y dispara el scroll automáticamente.
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: index },
      queryParamsHandling: 'merge',
    });
  }

  toggleAudio(audio: HTMLAudioElement) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

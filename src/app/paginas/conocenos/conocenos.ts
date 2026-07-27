import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ts = inject(TranslationService);
  activeTab = signal<number>(0);
  isMobileMenuOpen = signal<boolean>(false);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const tb = params['tab'];
      if (tb !== undefined) {
        this.goToTab(parseInt(tb, 10));
      } else {
        this.goToTab(0);
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
    this.activeTab.set(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleAudio(audio: HTMLAudioElement) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

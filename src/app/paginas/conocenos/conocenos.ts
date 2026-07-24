import { Component, signal } from '@angular/core';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';

@Component({
  selector: 'app-conocenos',
  imports: [Navbar, Footer],
  templateUrl: './conocenos.html',
  styleUrl: './conocenos.scss',
})
export class Conocenos {
  activeTab = signal<number>(0);

  tabs = ['Cómo Participar', 'Historia', 'Himno', 'Contacto'];

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

  private touchStartX = 0;

  goToTab(index: number) {
    const clamped = Math.max(0, Math.min(this.tabs.length - 1, index));
    this.activeTab.set(clamped);
  }

  nextTab() {
    this.goToTab(this.activeTab() + 1);
  }

  prevTab() {
    this.goToTab(this.activeTab() - 1);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const delta = this.touchStartX - event.changedTouches[0].screenX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? this.nextTab() : this.prevTab();
    }
  }
}

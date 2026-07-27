import { Component, signal, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { HeroCarousel } from '../../compartidas/hero-carousel/hero-carousel';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, HeroCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  ts = inject(TranslationService);
  lang = this.ts.lang;
  mobileMenuOpen = signal<boolean>(false);

  t(key: string): string {
    return this.ts.t(key);
  }

  setLang(l: 'es' | 'eu') {
    this.ts.setLang(l);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((prev) => !prev);
  }
}

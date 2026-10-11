import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
import { CarouselService } from '../../services/carousel.service';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { HeroCarousel } from '../../compartidas/hero-carousel/hero-carousel';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, HeroCarousel, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  ts = inject(TranslationService);
  authService = inject(AuthService);
  carouselService = inject(CarouselService);

  lang = this.ts.lang;
  isAdmin = this.authService.isAdmin;
  mobileMenuOpen = signal<boolean>(false);

  openAdminModal() {
    this.carouselService.openAdminModal();
  }

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

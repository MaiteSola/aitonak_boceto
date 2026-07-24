import { Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';

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
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  ts = inject(TranslationService);

  lang = this.ts.lang;

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

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
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

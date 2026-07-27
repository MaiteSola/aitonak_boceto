import { Component, input, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  templateUrl: './hero-carousel.html',
})
export class HeroCarousel implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  // Inputs para personalizar el texto central
  title = input<string>('');
  subtitle = input<string>('');
  subtitleItalic = input<string>('');
  alignCenter = input<boolean>(true);

  // Custom height classes
  customHeightClass = input<string>('h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]');

  activeSlide = signal<number>(0);
  private autoPlayInterval: any;

  slides: string[] = [
    'assets/imagenes/home_monte1.jpg',
    'assets/imagenes/home_monte2.jpg',
    'assets/imagenes/home_monte3.jpg',
    'assets/imagenes/home_monte4.jpg',
    'assets/imagenes/abodi_1.jpg',
    'assets/imagenes/belagua_1.jpg',
    'assets/imagenes/foz.jpg',
    'assets/imagenes/lakartxela.jpg',
    'assets/imagenes/navarra_niebla.jpg',
    'assets/imagenes/ori_navarra.jpg',
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.activeSlide.update((curr) => (curr + 1) % this.slides.length);
  }

  prevSlide() {
    this.activeSlide.update((curr) => (curr - 1 + this.slides.length) % this.slides.length);
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
}

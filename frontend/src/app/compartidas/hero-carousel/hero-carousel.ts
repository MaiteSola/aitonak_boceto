import { Component, input, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarouselService } from '../../services/carousel.service';
import { AuthService } from '../../services/auth.service';
import { AdminCarouselModal } from './admin-carousel-modal/admin-carousel-modal';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [AdminCarouselModal],
  templateUrl: './hero-carousel.html',
})
export class HeroCarousel implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  carouselService = inject(CarouselService);
  authService = inject(AuthService);

  // Inputs para personalizar el texto central
  title = input<string>('');
  subtitle = input<string>('');
  subtitleItalic = input<string>('');
  alignCenter = input<boolean>(true);

  // Custom height classes
  customHeightClass = input<string>('h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]');

  activeSlide = signal<number>(0);
  private autoPlayInterval: any;

  // Reactivo desde CarouselService
  slides = this.carouselService.slides;
  isAdmin = this.authService.isAdmin;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    const total = this.slides().length;
    if (total > 0) {
      this.activeSlide.update((curr) => (curr + 1) % total);
    }
  }

  prevSlide() {
    const total = this.slides().length;
    if (total > 0) {
      this.activeSlide.update((curr) => (curr - 1 + total) % total);
    }
  }

  openAdminModal() {
    this.carouselService.openAdminModal();
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

import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CarouselPhoto {
  id: string;
  url: string;
  name: string;
  isDefault?: boolean;
  addedAt?: number;
  sizeText?: string;
}

export const DEDICATED_CAROUSEL_PHOTOS: CarouselPhoto[] = [
  {
    id: 'monte1',
    url: 'assets/imagenes/home_monte1.jpg',
    name: 'home_monte1.jpg',
    isDefault: true,
  },
  {
    id: 'monte2',
    url: 'assets/imagenes/home_monte2.jpg',
    name: 'home_monte2.jpg',
    isDefault: true,
  },
  {
    id: 'monte3',
    url: 'assets/imagenes/home_monte3.jpg',
    name: 'home_monte3.jpg',
    isDefault: true,
  },
  {
    id: 'monte4',
    url: 'assets/imagenes/home_monte4.jpg',
    name: 'home_monte4.jpg',
    isDefault: true,
  },
  {
    id: 'abodi',
    url: 'assets/imagenes/abodi_1.jpg',
    name: 'abodi_1.jpg',
    isDefault: true,
  },
  {
    id: 'belagua',
    url: 'assets/imagenes/belagua_1.jpg',
    name: 'belagua_1.jpg',
    isDefault: true,
  },
  {
    id: 'foz',
    url: 'assets/imagenes/foz.jpg',
    name: 'foz.jpg',
    isDefault: true,
  },
  {
    id: 'lakartxela',
    url: 'assets/imagenes/lakartxela.jpg',
    name: 'lakartxela.jpg',
    isDefault: true,
  },
  {
    id: 'navarra_niebla',
    url: 'assets/imagenes/navarra_niebla.jpg',
    name: 'navarra_niebla.jpg',
    isDefault: true,
  },
  {
    id: 'ori',
    url: 'assets/imagenes/ori_navarra.jpg',
    name: 'ori_navarra.jpg',
    isDefault: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'aitonak_admin_carousel_photos_v1';

  // Lista reactiva de fotos del carrusel
  photos = signal<CarouselPhoto[]>([]);

  // Array plano de URLs que consume directamente el carrusel
  slides = computed(() => this.photos().map((p) => p.url));

  // Signal para abrir/cerrar el pop-up de administración globalmente
  isAdminModalOpen = signal<boolean>(false);

  constructor() {
    this.initPhotos();
  }

  private initPhotos() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.photos.set(parsed);
            return;
          }
        }
      } catch (err) {
        console.warn('Error reading carousel photos from localStorage:', err);
      }
    }
    // Si no hay datos guardados, usamos los assets dedicados por defecto
    this.photos.set([...DEDICATED_CAROUSEL_PHOTOS]);
  }

  private persist() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.photos()));
      } catch (err) {
        console.warn('Error saving carousel photos to localStorage:', err);
      }
    }
  }

  openAdminModal() {
    this.isAdminModalOpen.set(true);
  }

  closeAdminModal() {
    this.isAdminModalOpen.set(false);
  }

  addPhoto(photo: CarouselPhoto) {
    this.photos.update((curr) => [photo, ...curr]);
    this.persist();
  }

  removePhoto(id: string) {
    this.photos.update((curr) => curr.filter((p) => p.id !== id));
    this.persist();
  }

  resetToDefaults() {
    this.photos.set([...DEDICATED_CAROUSEL_PHOTOS]);
    this.persist();
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
import { CarouselService } from '../../services/carousel.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  router = inject(Router);
  ts = inject(TranslationService);
  authService = inject(AuthService);
  carouselService = inject(CarouselService);
  lang = this.ts.lang;

  isAuthed = this.authService.isLoggedIn;
  isAdmin = this.authService.isAdmin;
  username = this.authService.username;

  mobileMenuOpen = signal<boolean>(false);
  conocenosSubmenuOpen = signal<boolean>(false);
  actividadesSubmenuOpen = signal<boolean>(false);
  montanaSeguraSubmenuOpen = signal<boolean>(false);
  perfilSubmenuOpen = signal<boolean>(false);

  t(key: string): string {
    return this.ts.t(key);
  }

  setLang(l: 'es' | 'eu') {
    this.ts.setLang(l);
  }

  closeAllSubmenus() {
    this.conocenosSubmenuOpen.set(false);
    this.actividadesSubmenuOpen.set(false);
    this.montanaSeguraSubmenuOpen.set(false);
    this.perfilSubmenuOpen.set(false);
  }

  toggleDesktopConocenos(e: Event) {
    e.stopPropagation();
    const current = this.conocenosSubmenuOpen();
    this.closeAllSubmenus();
    this.conocenosSubmenuOpen.set(!current);
  }

  toggleDesktopActividades(e: Event) {
    e.stopPropagation();
    const current = this.actividadesSubmenuOpen();
    this.closeAllSubmenus();
    this.actividadesSubmenuOpen.set(!current);
  }

  toggleDesktopMontana(e: Event) {
    e.stopPropagation();
    const current = this.montanaSeguraSubmenuOpen();
    this.closeAllSubmenus();
    this.montanaSeguraSubmenuOpen.set(!current);
  }

  toggleDesktopPerfil(e: Event) {
    e.stopPropagation();
    const current = this.perfilSubmenuOpen();
    this.closeAllSubmenus();
    this.perfilSubmenuOpen.set(!current);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((prev) => !prev);
  }

  toggleConocenosSubmenu(e: Event) {
    e.stopPropagation();
    this.conocenosSubmenuOpen.update((prev) => !prev);
  }

  toggleActividadesSubmenu(e: Event) {
    e.stopPropagation();
    this.actividadesSubmenuOpen.update((prev) => !prev);
  }

  openAdminCarousel(e?: Event) {
    if (e) e.preventDefault();
    this.carouselService.openAdminModal();
    this.closeAllSubmenus();
  }

  logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
    this.closeAllSubmenus();
  }
}

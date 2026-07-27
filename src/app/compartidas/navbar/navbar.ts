import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  router = inject(Router);
  ts = inject(TranslationService);
  authService = inject(AuthService);
  lang = this.ts.lang;

  isAuthed = this.authService.isLoggedIn;
  username = this.authService.username;

  mobileMenuOpen = signal<boolean>(false);
  conocenosSubmenuOpen = signal<boolean>(false);
  actividadesSubmenuOpen = signal<boolean>(false);

  t(key: string): string {
    return this.ts.t(key);
  }

  setLang(l: 'es' | 'eu') {
    this.ts.setLang(l);
  }

  goToConocenos(e: Event) {
    if (this.router.url.split('?')[0] === '/conocenos') {
      // Force reload by navigating to dummy route and back, preserving SPA feeling
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/conocenos']);
      });
    }
  }

  goToActividades(e: Event) {
    if (this.router.url.split('?')[0] === '/actividades') {
      // Force reload by navigating to dummy route and back, preserving SPA feeling
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/actividades']);
      });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((prev) => !prev);
  }

  toggleConocenosSubmenu(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.conocenosSubmenuOpen.update((prev) => !prev);
  }

  toggleActividadesSubmenu(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.actividadesSubmenuOpen.update((prev) => !prev);
  }

  logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
  }
}

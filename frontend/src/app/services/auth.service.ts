import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  // Estado global de autenticación usando un signal
  isLoggedIn = signal<boolean>(false);
  username = signal<string | null>(null);

  // Indica si el usuario autenticado tiene rol admin
  isAdmin = computed(() => {
    return this.isLoggedIn() && this.username()?.trim().toLowerCase() === 'admin';
  });

  constructor() {
    this.restoreSession();
  }

  private restoreSession() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const savedUser = localStorage.getItem('aitonak_auth_user');
        const wasLoggedOut = localStorage.getItem('aitonak_auth_logged_out');

        if (savedUser) {
          this.isLoggedIn.set(true);
          this.username.set(savedUser);
        } else if (wasLoggedOut !== 'true') {
          // Inicialización hardcodeada con el usuario admin como se solicita para el perfil admin
          this.login('admin');
        }
      } catch (err) {
        console.warn('Error accessing localStorage for auth:', err);
      }
    }
  }

  login(user: string) {
    this.isLoggedIn.set(true);
    this.username.set(user);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('aitonak_auth_user', user);
        localStorage.removeItem('aitonak_auth_logged_out');
      } catch (err) {
        console.warn('Error saving auth to localStorage:', err);
      }
    }
  }

  logout() {
    this.isLoggedIn.set(false);
    this.username.set(null);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem('aitonak_auth_user');
        localStorage.setItem('aitonak_auth_logged_out', 'true');
      } catch (err) {
        console.warn('Error clearing auth from localStorage:', err);
      }
    }
  }
}

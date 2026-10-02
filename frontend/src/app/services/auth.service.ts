import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Estado global de autenticación usando un signal
  isLoggedIn = signal<boolean>(false);
  username = signal<string | null>(null);

  login(user: string) {
    this.isLoggedIn.set(true);
    this.username.set(user);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.username.set(null);
  }
}

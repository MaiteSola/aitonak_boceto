import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { Login } from '../../compartidas/login/login';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { HeroCarousel } from '../../compartidas/hero-carousel/hero-carousel';

@Component({
  selector: 'app-venta-billetes',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, Footer, Login, HeroCarousel],
  templateUrl: './venta-billetes.html',
})
export class VentaBilletes {
  authService = inject(AuthService);
  ts = inject(TranslationService);

  isAuthed = this.authService.isLoggedIn;
  isLoginView = signal(!this.authService.isLoggedIn());

  t(key: string): string {
    return this.ts.t(key);
  }

  onLoginSuccess(username: string) {
    this.authService.login(username);
    this.isLoginView.set(false);
  }
}

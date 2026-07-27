import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { Login } from '../../compartidas/login/login';
import { AuthService } from '../../services/auth.service';
import { Estatutos } from './estatutos/estatutos';
import { Rri } from './rri/rri';
import { Normas } from './normas/normas';
import { Concurso } from './concurso/concurso';
import { TranslationService } from '../../services/translation.service';

export interface AreaItem {
  title: string;
  isProtected: boolean;
}

@Component({
  selector: 'app-area-privada',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, Login, Estatutos, Rri, Normas, Concurso],
  templateUrl: './area-privada.html',
  styleUrl: './area-privada.scss',
})
export class AreaPrivada implements OnInit {
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  ts = inject(TranslationService);

  t(key: string): string {
    return this.ts.t(key);
  }

  isSidebarOpen = signal(false);
  activeSection = signal(0);
  isLoginView = signal(false);

  // Exponer el estado de autenticación a la plantilla
  isAuthed = this.authService.isLoggedIn;

  menuItems: AreaItem[] = [
    { title: 'Estatutos', isProtected: false },
    { title: 'R.R.I.', isProtected: false },
    { title: 'Rutas Normas del Grupo', isProtected: false },
    { title: 'Reglas Concurso Fotográfico', isProtected: false },
    { title: 'Pólizas de Seguro', isProtected: true },
    { title: 'Junta Directiva Actual', isProtected: true },
    { title: 'Actas Junta Directiva', isProtected: true },
    { title: 'Asamblea General', isProtected: true },
    { title: 'Historia de Acuerdos', isProtected: true },
    { title: 'Historia de ACTAS', isProtected: true },
    { title: 'ENCUESTAS 2019', isProtected: true },
    { title: 'Archivo fotográfico 2026', isProtected: true },
    { title: 'BILLETES BUS', isProtected: true },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['section']) {
        const sectionId = parseInt(params['section'], 10);
        if (!isNaN(sectionId) && sectionId >= 0 && sectionId < this.menuItems.length) {
          this.activeSection.set(sectionId);
          if (this.menuItems[sectionId].isProtected && !this.isAuthed()) {
            // Esto asegura que se marca explícitamente para ver login
            this.isLoginView.set(true);
          }
        }
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  onLoginSuccess(username: string) {
    this.authService.login(username);
    this.isLoginView.set(false);

    // Si han entrado desde un apartado público (ej: botón de Acceso Socios general),
    // los llevamos a Pólizas. Si venían de intentar ver un apartado privado en concreto
    // (como Billetes de Bus), les dejamos en ese mismo.
    if (!this.menuItems[this.activeSection()].isProtected) {
      this.activeSection.set(4);
    }
  }

  selectSection(index: number) {
    this.activeSection.set(index);
    this.isLoginView.set(false);
    this.isSidebarOpen.set(false);
  }
}

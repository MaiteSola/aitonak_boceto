import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { Login } from '../../compartidas/login/login';
import { AuthService } from '../../services/auth.service';
import { Estatutos } from './estatutos/estatutos';
import { Rri } from './rri/rri';

export interface AreaItem {
  title: string;
  isProtected: boolean;
}

@Component({
  selector: 'app-area-privada',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, Login, Estatutos, Rri],
  templateUrl: './area-privada.html',
  styleUrl: './area-privada.scss',
})
export class AreaPrivada {
  authService = inject(AuthService);
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

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  onLoginSuccess(username: string) {
    this.authService.login(username);
    this.isLoginView.set(false);
    this.activeSection.set(4); // Mostrar el primer apartado privado
  }

  selectSection(index: number) {
    this.activeSection.set(index);
    this.isLoginView.set(false);
    this.isSidebarOpen.set(false);
  }
}

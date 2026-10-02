import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { HeroCarousel } from '../../compartidas/hero-carousel/hero-carousel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyecto-seguridad',
  standalone: true,
  imports: [Navbar, Footer, HeroCarousel],
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.scss',
})
export class ProyectoSeguridad implements OnInit {
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['scroll'] === 'menu') {
        setTimeout(() => {
          const menuEl = document.getElementById('menu');
          if (menuEl) {
            const navHeight = 84;
            const y = menuEl.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

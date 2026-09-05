import { Component } from '@angular/core';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { HeroCarousel } from '../../compartidas/hero-carousel/hero-carousel';

@Component({
  selector: 'app-proyecto-seguridad',
  standalone: true,
  imports: [Navbar, Footer, HeroCarousel],
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.scss',
})
export class ProyectoSeguridad {}

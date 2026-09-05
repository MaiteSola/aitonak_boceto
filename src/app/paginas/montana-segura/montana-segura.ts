import { Component } from '@angular/core';
import { Navbar } from '../../compartidas/navbar/navbar';
import { Footer } from '../../compartidas/footer/footer';
import { HeroCarousel } from '../../compartidas/hero-carousel/hero-carousel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-montana-segura',
  standalone: true,
  imports: [Navbar, Footer, HeroCarousel, RouterLink],
  templateUrl: './montana-segura.html',
  styleUrl: './montana-segura.scss',
})
export class MontanaSegura {}

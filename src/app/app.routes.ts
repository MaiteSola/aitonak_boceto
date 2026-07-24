import { Routes } from '@angular/router';
import { Home } from './paginas/home/home';
import { Conocenos } from './paginas/conocenos/conocenos';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'conocenos', component: Conocenos },
];

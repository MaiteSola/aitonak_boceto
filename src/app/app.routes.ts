import { Routes } from '@angular/router';
import { Home } from './paginas/home/home';
import { Conocenos } from './paginas/conocenos/conocenos';
import { Actividades } from './paginas/actividades/actividades';
import { AreaPrivada } from './paginas/area-privada/area-privada';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'conocenos', component: Conocenos },
  { path: 'actividades', component: Actividades },
  { path: 'area-privada', component: AreaPrivada },
];

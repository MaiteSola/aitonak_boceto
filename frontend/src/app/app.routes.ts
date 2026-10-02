import { Routes } from '@angular/router';
import { Home } from './paginas/home/home';
import { Conocenos } from './paginas/conocenos/conocenos';
import { Actividades } from './paginas/actividades/actividades';
import { AreaPrivada } from './paginas/area-privada/area-privada';
import { VentaBilletes } from './paginas/venta-billetes/venta-billetes';
import { MontanaSegura } from './paginas/montana-segura/montana-segura';
import { ProyectoSeguridad } from './paginas/montana-segura/proyecto';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'conocenos', component: Conocenos },
  { path: 'actividades', component: Actividades },
  { path: 'area-privada', component: AreaPrivada },
  { path: 'venta-billetes', component: VentaBilletes },
  { path: 'montana-segura', component: MontanaSegura },
  { path: 'montana-segura/proyecto', component: ProyectoSeguridad },
];

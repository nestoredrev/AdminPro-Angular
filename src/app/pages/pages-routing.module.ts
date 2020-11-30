import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { PagesComponent } from './pages/pages.component';


import { AuthGuard } from '../guards/auth.guard';





/**
 * LazyLoad cargar los modulos bajo demanda.
 * Es un patrón de diseño que consiste en retrasar la carga o inicialización de un objeto hasta el momento de su utilización.
 * Esto significa que obtiene los datos o procesa los objetos solamente cuando se necesitan, no antes.
 */


const ROUTES: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate:[ AuthGuard ],
    canLoad: [ AuthGuard ], // guard especifico para el LazyLoad 
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( ROUTES )
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }

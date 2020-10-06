import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const ROUTES: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate:[ AuthGuard ], 
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}  },
      { path: 'grafica1',  component: Grafica1Component, data: {titulo: 'Grafica 1'} },
      { path: 'progress',  component: ProgressComponent, data: {titulo: 'Progress'} },
      { path: 'account-settings',  component: AccountSettingsComponent, data: {titulo: 'Account Settings'} },
      { path: 'promesas',  component: PromesasComponent, data: {titulo: 'Promesas'} },
      { path: 'rxjs',  component: RxjsComponent, data: {titulo: 'RxJs'} },
      { path: 'perfil',  component: PerfilComponent, data: {titulo: 'Mi Perfil'} }
    ]
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

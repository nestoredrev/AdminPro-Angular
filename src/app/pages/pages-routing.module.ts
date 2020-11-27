import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PagesComponent } from './pages/pages.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';




// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';

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
      { path: 'perfil',  component: PerfilComponent, data: {titulo: 'Mi Perfil'} },

      //Mantenimientos
      { path: 'usuarios',  component: UsuariosComponent, data: {titulo: 'Manteniemiento de usuarios'} },
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitles'} },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mi medico'} },
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

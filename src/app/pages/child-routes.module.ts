import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

// Settings
import { PerfilComponent } from './perfil/perfil.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}  },
  { path: 'account-settings',  component: AccountSettingsComponent, data: {titulo: 'Account Settings'} },
  { path: 'buscar/:termino',  component: BusquedaComponent, data: {titulo: 'Busqueda global'} },
  { path: 'grafica1',  component: Grafica1Component, data: {titulo: 'Grafica 1'} },
  { path: 'progress',  component: ProgressComponent, data: {titulo: 'Progress'} },
  { path: 'promesas',  component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'perfil',  component: PerfilComponent, data: {titulo: 'Mi Perfil'} },
  { path: 'rxjs',  component: RxjsComponent, data: {titulo: 'RxJs'} },

  //Mantenimientos
  { path: 'usuarios',  canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Manteniemiento de usuarios'} },
  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitles'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mi medico'} },
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }

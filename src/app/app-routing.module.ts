import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoFoundComponent } from './pages/no-found/no-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { PagesComponent } from './pages/pages/pages.component';

const ROUTES: Routes = [
  { 
    path: '', 
    component: PagesComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'grafica1',  component: Grafica1Component },
      { path: 'progress',  component: ProgressComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
  { path: 'login',     component: LoginComponent },
  { path: 'signup',    component: SignupComponent },
  { path: '**', component: NoFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( ROUTES )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

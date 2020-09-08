import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages/pages.component';

const ROUTES: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent, 
    children: [
      { path: '', component: DashboardComponent },
      { path: 'grafica1',  component: Grafica1Component },
      { path: 'progress',  component: ProgressComponent }
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

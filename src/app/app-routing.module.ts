import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoFoundComponent } from './pages/no-found/no-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const ROUTES: Routes = [
  //path: 'dashboard' PageRouting
  //path: 'auth AuthRouting
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: NoFoundComponent,  }
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

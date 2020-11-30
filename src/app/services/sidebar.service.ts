import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any = [];

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard !!!',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Graficos', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'Rxjs', url: 'rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //       { titulo: 'Hospitales', url: 'hospitales' }
  //     ]
  //   }
  // ];

  constructor() { }

  cargarMenu() {
    return this.menu = JSON.parse( localStorage.getItem('menu')) || [];
  }

}

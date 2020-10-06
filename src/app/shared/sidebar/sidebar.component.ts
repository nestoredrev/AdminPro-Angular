import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public imgUrl = '';
  public usuario: Usuario;

  constructor(private sideBarService: SidebarService,
              private router: Router,
              private usuarioService: UsuarioService) {
    this.menuItems = this.sideBarService.menu;
    this.imgUrl = this.usuarioService.usuario.imagenUrl;
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  logout()
  {
    this.usuarioService.logout();
  }

}

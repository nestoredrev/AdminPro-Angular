import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private sideBarService: SidebarService,
              private router: Router,
              private usuarioService: UsuarioService) {
    this.menuItems = this.sideBarService.menu;
  }

  ngOnInit() {
  }

  logout()
  {
    this.usuarioService.logout();
  }

}

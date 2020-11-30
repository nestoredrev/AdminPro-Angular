import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public imgUrl = '';
  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router ) {
    this.imgUrl  = this.usuarioService.usuario.imagenUrl;
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar( termino:string ) {
    
    if(termino.length <= 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}

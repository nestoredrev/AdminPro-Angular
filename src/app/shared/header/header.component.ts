import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public imgUrl = '';
  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService ) {
    this.imgUrl  = this.usuarioService.usuario.imagenUrl;
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  logout()
  {
    this.usuarioService.logout();
  }

}

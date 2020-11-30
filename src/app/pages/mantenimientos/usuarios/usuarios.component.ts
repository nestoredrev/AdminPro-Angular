import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';

import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalUsuarios: number;
  public totalUsuariosTemp: number;
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(public usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) {}

  ngOnInit() {

    this.cargarUsuarios();

    // Al actualizar la foto tambien actualizar la tabla de nuevo
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(img => this.cargarUsuarios());

  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios()
  {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios(this.desde).subscribe((respuesta:any) => {
      this.usuarios = respuesta.usuarios;

      this.usuarios.forEach(user => {
        return user.editable = false;
      })

      this.usuariosTemp = this.usuarios;
      this.totalUsuarios = respuesta.total;
      this.totalUsuariosTemp = this.totalUsuarios;
      this.cargando = false;
    })
  }

  cambiarPagina( valor:number )
  {
    this.desde += valor;
    
    if( this.desde < 0 )
    {
      this.desde = 0;
    }
    else if (this.desde > this.totalUsuarios)
    {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(texto:string)
  {
    if(texto.length === 0)
    {
      this.totalUsuarios = this.totalUsuariosTemp;
      this.usuarios = this.usuariosTemp;
      return;
    }
    
    this.busquedasService.buscar('usuarios', texto).subscribe((respuesta: any) => {
      this.usuarios = respuesta.usuarios;
      this.totalUsuarios = respuesta.total;
    })
  }

  borrarUsuario(usuario: Usuario)
  {

    if(usuario.uid === this.usuarioService.uid)
    {
      return Swal.fire({
        title: 'Error',
        text: 'No se puede borrar a uno mismo',
        icon: 'warning'
      })
    }

    Swal.fire({
      title: `Esta usted seguro de borrar el usuario?`,
      text: `Usuario a borrar: ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.borrarUsuario(usuario.uid).subscribe(usuarioBorrado => {
      
          Swal.fire(
            'Borrado!',
            `El usuario <b>${usuario.nombre}</b> ha sido borrado correctamente`,
            'success'
          )

          this.cargarUsuarios();

        })
      }
    })
  }

  editarUsuario(usuario:Usuario)
  {
    usuario.editable = !usuario.editable;

    if(!usuario.editable)
    {
      this.usuarioService.editarUsuario(usuario).subscribe( respuesta => {
        
        Swal.fire(
          'Editar!',
          `El usuario <b>${usuario.nombre}</b> ha sido guardado correctamente`,
          'success'
        )

        this.cargarUsuarios();
      })
    }
  }


  abrirModal(usuario: Usuario)
  {
    this.modalImagenService.abrirModal('usuarios',usuario.uid, usuario.img);
  }

}

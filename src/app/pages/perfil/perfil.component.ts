import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ValidadoresService } from '../../services/validadores.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario = this.usuarioService.usuario;
  public imagenAsubir: File;
  public imgTemp:any = null;

  public formEditProfile = this.fb.group({
    nombre: [ this.usuario.nombre || '', [Validators.required, Validators.minLength(3)] ],
    email: [ this.usuario.email || '',  [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")] ],
    password: [ '', [ Validators.required, Validators.minLength(3) ] ],
    password2: [ '' ],
  },
  {
    validators: [this.myValidators.passwordsIguales('password', 'password2')]
  })

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private myValidators: ValidadoresService,
              private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  editarPerfil()
  {

    if(this.formEditProfile.valid)
    {
       const data = this.formEditProfile.value;
      //const data = this.formEditProfile.getRawValue(); // para obtener el valor del campo disable


      this.usuarioService.editarUsuario(data)
          .subscribe( (respuesta:any) => {

            this.usuario.nombre = respuesta.usuarioActualizado.nombre;
            this.usuario.email = respuesta.usuarioActualizado.email;

            Swal.fire({
              title: 'Perfil actualizado !',
              icon: 'success'
            })
          },(err) => {
              console.log(err);
              Swal.fire({
                title: 'Error',
                text: err.error.msg,
                icon: 'error'
              })
          });
    }
    else
    {
      Swal.fire({
        title: 'Error',
        text: 'El formulario no es valido',
        icon: 'error'
      })
    }
  }

  cambiarImagen(evento:any)
  {
    const archivo:File = evento.target.files[0];

    if(!archivo)
    {
      // En el caso de que no hay archivo o el usuario ha dado al boton de cancelar
      // Se visualizara la imagen establecida en el objeto Usuario en la propiedad img
      return this.imgTemp = null;
    }
    else
    {
      // Previsualizar la imagen en base64
      const reader = new FileReader();
      reader.readAsDataURL( archivo );
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }


      // Preparar la imagen para subirla al servidor
      this.imagenAsubir = archivo;
    }
  }

  subirImagen()
  {
    this.fileUploadService.uploadFile(this.imagenAsubir, 'usuarios')
                          .then( (respuesta:any) => {
                            if(respuesta.ok)
                            {
                              this.usuario.img = respuesta.nombreArchivo;
                              Swal.fire({
                                title: 'Foto de perfil actualizada!',
                                icon: 'success'
                              })
                            }
                            else
                            {
                              Swal.fire({
                                title: 'Error',
                                text: respuesta.err,
                                icon: 'error'
                              })
                            }
                          })
                          .catch(err => {
                            console.log(err);
                            Swal.fire({
                              title: 'Error',
                              text: err,
                              icon: 'error'
                            })
                          })
  }

}

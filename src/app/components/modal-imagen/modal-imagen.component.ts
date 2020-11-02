import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';



@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenAsubir: File;
  public imgTemp:any = null;
  
  constructor(public modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService.uploadFile(this.imagenAsubir, tipo, id)
                          .then( (respuesta:any) => {
                            if(respuesta.ok)
                            {
                              Swal.fire({
                                title: 'Foto de perfil actualizada!',
                                icon: 'success'
                              })
                              this.modalImagenService.nuevaImagen.emit(respuesta.nombreArchivo);
                              this.cerrarModal();
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public base_url = environment.base_url;
  public usuario: Usuario;
  public token:string = this.usuarioServices.token;
  public uid:string = this.usuarioServices.uid;

  constructor(private http: HttpClient, private usuarioServices: UsuarioService) {
    this.usuario = this.usuarioServices.usuario;
  }


  // Peticion angular
  // uploadFile(tipo:string, file:File)
  // {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'x-token': this.token
  //     })
  //   }
  //   const url = `${this.base_url}/upload/${tipo}/${this.uid}`;

  //   return this.http.post(url, file, httpOptions);
  // }

  async uploadFile (archivo:File, tipo: 'usuarios'|'medicos'|'hospitales', id:string)
  {
    try {
      const url = `${this.base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const respuesta = await fetch( url, {
        method: 'POST',
        headers: {
          'x-token': this.token
        },
        body: formData
      });

      // obtener el body de la respuesta de fetch
      const dataResponse = await respuesta.json();
      return dataResponse;

    } catch (error) {
      console.log(error);
      return error;
      
    }
  }



}

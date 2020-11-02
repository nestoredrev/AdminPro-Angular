import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  // estandar _ que la propiedad es privada
  private _ocultarModal: boolean = true;
  private _base_url = environment.base_url;
  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitales',
      id: string,
      img: string = 'no-img'
      ) {
      this._ocultarModal = false;
      this.tipo = tipo;
      this.id = id;
      this.img = img;

      if( this.img.includes('https') ){
        this.img = img;
      }
      else
      {
        this.img = `${ this._base_url }/upload/${ tipo }/${ img }`;
      }

      
  }

  cerrarModal(){
    this._ocultarModal = true;
  }

}

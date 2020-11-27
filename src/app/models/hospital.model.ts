import { Usuario } from './usuario.model';

export class Hospital {
    
    id: string;
    nombre: string;
    img: string;
    usuario: Usuario;

    constructor(
        nombre:string,
        id?: string,
        img?: string,
        usuario?: Usuario
    ){
        this.nombre = nombre;
        this.id = id;
        this.usuario = usuario;
        this.img = img;
    }
}
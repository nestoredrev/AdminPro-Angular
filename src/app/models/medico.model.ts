import { Usuario } from './usuario.model';
import { Hospital } from './hospital.model';

export class Medico {
    
    id: string;
    nombre: string;
    img: string;
    usuario: Usuario;
    hospital: Hospital;

    constructor(
        nombre:string,
        id?: string,
        img?: string,
        usuario?: Usuario,
        hospital?: Hospital
    ){}
}
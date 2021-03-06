import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public uid: string,
        public nombre:string,
        public email:string,
        public img?:string,
        public google?:string,
        public role?:string,
        public editable?: boolean
    ) {}

    // A los metodos get no hay que ponerle las llaves al llamarlos
    get imagenUrl()
    {

        if(!this.img)
        {
            return `${base_url}/upload/usuarios/no-image`;
        }
        else
        {
            // Obtener la foto de perfil de los usuarios logeados a traves de Google
            if( this.img.includes('https') )
            {
                return this.img;
            }

            return `${base_url}/upload/usuarios/${this.img}`;
        }
    }
}
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string,  tipo:'usuarios'|'hospitales'|'medicos'): string {
    
    if(!imagen)
    {
        return `${base_url}/upload/${tipo}/no-image`;
    }
    else
    {
        // Obtener la foto de perfil de los usuarios logeados a traves de Google
        if( imagen.includes('https') )
        {
            return imagen;
        }

        return `${base_url}/upload/${tipo}/${imagen}`;
    }

  }

}

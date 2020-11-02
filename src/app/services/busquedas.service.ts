import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers()
  {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]):Usuario[]{
    return resultados.map(
      user => new Usuario(user.uid, user.nombre, user.email, user.img, user.google, user.role)
    )
  }

  buscar(coleccion:string, texto:string)
  {
    const url = `${this.base_url}/todo/collection/${coleccion}/${texto}`;
    return this.http.get(url, this.headers)
                    .pipe(
                      map((resp:any) => {


                        switch (coleccion)
                        {
                          case 'usuarios':
                            return {
                              usuarios: this.transformarUsuarios(resp.resultados),
                              total: resp.resultados.length
                            }
                          break;
                          case 'medicos':
                            
                          break;
                          case 'hospitales':
                            
                            break;
                        
                          default:
                            break;
                        }
                      })
                    )
  }

}

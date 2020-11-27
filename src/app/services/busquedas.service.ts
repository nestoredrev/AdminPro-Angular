import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  private transformarHospitales(resultados: any[]):Hospital[]{
    return resultados;
  }

  private transformarMedicos(resultados: any[]):Medico[]{
    return resultados;
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
                          case 'medicos':
                            return {
                              medicos: this.transformarMedicos(resp.resultados),
                              total: resp.resultados.length
                            }
                          case 'hospitales':
                            return {
                              hospitales: this.transformarHospitales(resp.resultados),
                              total: resp.resultados.length
                            }        
                          default:
                            return [];
                        }
                      })
                    )
  }

}

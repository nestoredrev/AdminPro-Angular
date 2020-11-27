import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { delay, map, tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  obtenerMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers).pipe(
      map((res: {ok: boolean, medicos: Medico}) => {
        return res.medicos;
      }),
      delay(500)
    )
  }


  obtenerMedico( id:string ){
    const url = `${base_url}/medicos/${ id }`;
    return this.http.get(url, this.headers).pipe(
      map((res: {ok: boolean, medicoDB: Medico}) => {
        return res.medicoDB;
      }),
      delay(500)
    )
  }


  crearMedico( medico: Medico )
  {
    const url = `${base_url}/medicos/`
    return this.http.post( url, medico, this.headers ).pipe(
      tap( res => {
        console.log(res);
      }),
      map( (res:{ok: boolean, medicoDB: Medico[]}) => {
        return res.medicoDB;
      })
    )
  }


  actualizarMedico( id:string, medico: Medico )
  {
    const url = `${base_url}/medicos/${id}`
    return this.http.put( url, medico, this.headers ).pipe(
      map( (res:{ok: boolean, medico: Medico[]}) => {
        return res.medico;
      })
    )
  }


  borrarMedico( id:string )
  {
    const url = `${base_url}/medicos/${id}`
    return this.http.delete( url, this.headers ).pipe(
      tap( res => {
        console.log(res);
      })
    )
  }

}

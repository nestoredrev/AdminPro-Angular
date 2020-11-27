import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {


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


  obtenerHospitales()
  {
    const url = `${base_url}/hospitales/`
    return this.http.get(url).pipe(
      tap( res => {
        console.log(res);
      }),
      map( (res:{ok: boolean, hospitales: Hospital[]}) => {
        return res.hospitales;
      })
    )
  }

  
  crearHospital( nombre:string )
  {
    const url = `${base_url}/hospitales/`
    return this.http.post( url, {nombre}, this.headers ).pipe(
      tap( res => {
        // console.log(res);
      }),
      map( (res:{ok: boolean, hospitalDB: Hospital[]}) => {
        return res.hospitalDB;
      })
    )
  }


  actualizarHospital( id:string, nombre:string )
  {
    const url = `${base_url}/hospitales/${id}`
    return this.http.put( url, {nombre}, this.headers ).pipe(
      tap( res => {
        console.log(res);
      })
    )
  }


  borrarHospital( id:string )
  {
    const url = `${base_url}/hospitales/${id}`
    return this.http.delete( url, this.headers ).pipe(
      tap( res => {
        console.log(res);
      })
    )
  }
}

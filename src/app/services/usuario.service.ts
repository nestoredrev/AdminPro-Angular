import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  base_url = 'http://localhost:3000/api';
  public auth2: any; 

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
              }


    googleInit()
    {
      return new Promise( (resolve, reject)  => {
        gapi.load('auth2', () => {
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          this.auth2 = gapi.auth2.init({
            client_id: '874061981589-bdaq92esohokehnbg0ikco110pglljpa.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
          });
          resolve();
        });
      }) 
  }


  signUp(data)
  {
    const url = `${this.base_url}/usuarios`;
    return this.http.post(url, data)
                    .pipe(
                      tap((res:any) => {
                        // tap es para ver los datos de la peticion
                        localStorage.setItem('token', res.token);
                      })
                    )
  }

  logIn(data)
  {
    const url = `${this.base_url}/login`;
    return this.http.post(url, data)
                    .pipe(
                      tap((res:any) => {
                        localStorage.setItem('token', res.token);
                      })
                    )
  }

  loginGoogle(token)
  {
    const url = `${this.base_url}/login/google`;
    return this.http.post(url, {token})
                    .pipe(
                      tap((res:any) => {
                        localStorage.setItem('token', res.token);
                      })
                    )
  }

  validarToken():Observable<boolean>
  {
    const token = localStorage.getItem('token') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token
      })
    }


    const url = `${this.base_url}/login/renew`;
    return this.http.get(url, httpOptions)
                    .pipe(
                      tap( (res:any) => {
                        localStorage.setItem('token', res.token);
                      }),
                      map( res => true ),
                      catchError( error => of(false) ) // atrapara el error del flujo del pipe y devuelve un nuevo observable como boleano en este caso false
                    )
  }


  logout()
  {
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run(() => { // Ngzone es para ejecutar codigo de angular fuera de su ambito para no perder el ciclo de vida
        this.router.navigateByUrl('/login');
      });
    });
  }
}

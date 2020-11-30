import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public base_url = environment.base_url;
  public auth2: any; 
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
              }

    get token():string {
      return localStorage.getItem('token') || '';
    }

    get uid():string {
      return this.usuario.uid || '';
    }

    get role():string {
      return this.usuario.role;
    }

    get headers()
    {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    guardarLocalStorage (token: string, menu: any) {
      localStorage.setItem('token', token);
      localStorage.setItem('menu', JSON.stringify(menu));
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

  // Crear usuario
  signUp(data)
  {
    const url = `${this.base_url}/usuarios`;
    return this.http.post(url, data)
                    .pipe(
                      tap((res:any) => {
                        // tap es para ver los datos de la peticion
                        this.guardarLocalStorage( res.token, res.menu );
                      })
                    )
  }

  // Editar usuario-perfil
  editarPerfilUsuario(dataForm)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    }
    const url = `${this.base_url}/usuarios/perfil/${this.uid}`;

    const data = {
      ...dataForm,
      role: this.usuario.role
    }

    return this.http.put(url, data, httpOptions);
  }

    // Editar usuario tabla
    editarUsuario(usuario:Usuario)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-token': this.token
        })
      }
      const url = `${this.base_url}/usuarios/${usuario.uid}`;
  
      return this.http.put(url, usuario, httpOptions);
    }

  // Obtener usuarios
  obtenerUsuarios(desde: number = 0)
  {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'x-token': this.token
    //   })
    // }
    const url = `${this.base_url}/usuarios?desde=${desde}`;

    return this.http.get(url, this.headers)
                    .pipe(
                      map( (resp:any) => {
                        const total = resp.totalRegistros;
                        const usuarios = resp.usuarios.map( 
                          user => new Usuario(user.uid, user.nombre, user.email, user.img, user.google, user.role)
                          )
                        return {
                          usuarios,
                          total
                        }
                      })
                    )
  }

  // Borrar usuario
  borrarUsuario(uid:string)
  {
    const url = `${this.base_url}/usuarios/${uid}`;
    return this.http.delete(url, this.headers);
  }

  logIn(data)
  {
    const url = `${this.base_url}/login`;
    return this.http.post(url, data)
                    .pipe(
                      tap((res:any) => {
                        this.guardarLocalStorage( res.token, res.menu );
                      })
                    )
  }

  loginGoogle(token)
  {
    const url = `${this.base_url}/login/google`;
    return this.http.post(url, {token})
                    .pipe(
                      tap((res:any) => {
                        this.guardarLocalStorage( res.token, res.menu );
                      })
                    )
  }

  validarToken():Observable<boolean>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    }


    const url = `${this.base_url}/login/renew`;
    return this.http.get(url, httpOptions)
                    .pipe(
                      map( (res:any) => {
                        const { uid, nombre, email, img = '', google, role } = res.usuario;
                        this.usuario = new Usuario(uid, nombre, email, img, google, role);
                        this.guardarLocalStorage( res.token, res.menu );
                        return true;
                      }),
                      catchError( error => of(false) ) // atrapara el error del flujo del pipe y devuelve un nuevo observable como boleano en este caso false
                    )
  }


  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {
      this.ngZone.run(() => { // Ngzone es para ejecutar codigo de angular fuera de su ambito para no perder el ciclo de vida
        this.router.navigateByUrl('/login');
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {}
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
    .pipe(
      tap(estaAutentificado => {
        // estaAutentificado Lo que nos devuelve el map
        if( !estaAutentificado )
        {
          this.router.navigateByUrl('/login');
        }
      })
    )
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.usuarioService.validarToken()
                                .pipe(
                                  tap(estaAutentificado => {
                                    // estaAutentificado Lo que nos devuelve el map
                                    if( !estaAutentificado )
                                    {
                                      this.router.navigateByUrl('/login');
                                    }
                                  })
                                )
  }
  
}

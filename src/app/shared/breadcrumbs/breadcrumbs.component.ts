import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo:string = '';
  public tituloSubs$: Subscription;

  constructor( private router: Router ) {
    this.tituloSubs$ = this.getArgomentosRuta()
                      .subscribe( data => {
                        this.titulo = data.titulo;
                        document.title = `AdminPro - ${data.titulo}`; // Cambiar el titulo de la pestaña del navegador
                      });

  }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    // Hay que desescribirse cuando el usuario por ejemplo cierra sesion
    this.tituloSubs$.unsubscribe();
  }

  getArgomentosRuta()
  {
    return this.router.events
    .pipe(
      filter( evento => {
        return evento instanceof ActivationEnd
      }),
      filter( (evento: ActivationEnd) => {
        return evento.snapshot.firstChild === null;
      }),
      map((evento: ActivationEnd) => {
        return evento.snapshot.data;
      })
    )
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  public intervalSubs: Subscription;

  constructor() {


    // el pipe sirve la transformar o reintentar de reacer la informacion
    this.retornaObservable().pipe(
      retry(1) // Numero de intentos de retry
    ).subscribe( next => console.log(next), 
                   error => console.warn(error), 
                   () => console.info('Ha acabado') // Complete
                   )

    this.intervalSubs = this.retornaIntervalo()
    .subscribe( valor => {
      console.log(valor);
    }
    )

  }

  ngOnInit() {

  }

  ngOnDestroy()
  {
    /*
     Desiscribirle del observable cuando el componente se destruya para
     no seguir ejecutandose el intervalo.
    */
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo():Observable<number>
  {
    // Todo lo que se ejecutra en el pipe es secuencial
    return interval(500)
                       .pipe(
                         take(10), // Numero maximo para el valor next
                         map( valor => {
                           return valor + 1; // El map sirve para transformar la informacion que recibe el Observable
                         }),
                         filter(valor => (valor % 2 ===0 ? true : false)) // Filtra la infromacion
                       )
  }

  //Funcion que devuelve un Observable
  retornaObservable(): Observable<number> {
    let i = 0;
    // El sinbolo de dolar simplemente indica que devuelve un Observable
    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if(i === 4)
        {
          // Hay que llamar siempre el complete porque siempre se estara ejecutando y se puede desbordar la memoria
          clearInterval(intervalo);
          observer.complete();
        }


        if(i === 2)
        {
          i = 0;
          observer.error('Ha llegado a 2');
        }

      },1000);

    });

    return obs$;
  }

}

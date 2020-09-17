import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    /*
      ==> PROMESAS <==

      Realizar tareas da manera de asincrona es decir ejecutar antes de algun otro codigo.
    */
    // const promesa = new Promise( ( resolve, reject) => {
      
    //   const condicion = false;

    //   if(condicion)
    //   {
    //     resolve('La promesa se a resuelto correctamente');
    //   }
    //   else
    //   {
    //     reject('La promesa ha fallado');
    //   }
    // });

    // promesa.then( (mensaje) => {
    //   console.log(mensaje);
    // }).catch( error => {
    //   console.log(error);
    // });

    /*
      ==> Funcion que retorna promesas <==

    */
    this.getUsuarios().then( usuarios => console.log(usuarios));
    console.log('Fin del Init');
  }

  getUsuarios()
  {
    const promesa = new Promise( ( resolve, reject ) => {

      fetch('https://reqres.in/api/users?page=2')
      .then(respuesta => respuesta.json())
      .then(body => resolve (body.data))
      .catch(error => reject(error))

    });

    return promesa;
  }

}

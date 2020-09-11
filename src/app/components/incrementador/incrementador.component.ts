import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  // Recibir valor desde el padre
  @Input() progreso: number = 80;
  
  // Enviar valores hacia el padre
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  
  // Cambiar el nombre del argumento de progreso a valor
  //@Input('valor') progreso: number = 80;
  

  
  constructor() { }

  cambiarValor( valor:number )
  {
    if(this.progreso >= 100 && valor >= 0)
    {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if(this.progreso <= 0 && valor <= 0)
    {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
  }

  onChange( nuevoValor: number )
  {
    if( nuevoValor >= 100 )
    {
      this.progreso = 100;
    }
    else if(nuevoValor <= 0)
    {
      this.progreso = 0;
    }
    else{
      this.progreso = nuevoValor;
    }


    this.valorSalida.emit( this.progreso );
  }

  ngOnInit() {
  }

}

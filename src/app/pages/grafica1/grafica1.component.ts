import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  public titulo1:string = "Ventas";
  public labels1:string[] = ['Vodka', 'Whisky', 'Beer'];
  public data1:number[] = [30 , 65 , 15];

  constructor() { }

  ngOnInit() {
  }



}

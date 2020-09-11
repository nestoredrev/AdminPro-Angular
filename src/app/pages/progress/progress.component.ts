import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progreso1: number = 25;

  constructor() {}

  get getProgreso1()
  {
    return `${this.progreso1}%`
  }

  getValorHijo( valor: number )
  {
    this.progreso1 = valor;
  }

  ngOnInit() {
  }

}

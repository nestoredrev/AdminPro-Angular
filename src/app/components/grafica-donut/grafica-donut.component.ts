import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica-donut',
  templateUrl: './grafica-donut.component.html',
  styleUrls: ['./grafica-donut.component.css']
})
export class GraficaDonutComponent implements OnInit {

  // Valores por defecto si no vienen las propiedades en el componente
  @Input() titulo:string = 'Sin titulo';
  @Input() etiquetas:Label[] = ['Sin titulo 1', 'Sin titulo 2', 'Sin titulo 3'];
  @Input() data: MultiDataSet = [
    [1, 2 ,3]
  ];

  public doughnutChartType: ChartType = 'doughnut';

  public lineChartColors: Color[] = [
    {
      backgroundColor: ['#FF00FF', '#00ff78', '#FB6421']
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}

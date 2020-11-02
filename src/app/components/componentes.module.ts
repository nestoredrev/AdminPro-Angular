import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule, ThemeService } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficaDonutComponent } from './grafica-donut/grafica-donut.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementadorComponent, 
    GraficaDonutComponent, 
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    GraficaDonutComponent,
    ModalImagenComponent
  ],
  providers:[ThemeService]
})
export class ComponentesModule { }

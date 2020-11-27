import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelos
import { Medico } from '../../../models/medico.model';

// Servicios
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[] = [];
  tempMedicos: Medico[] = [];
  cargando: boolean = true;
  imgSubs: Subscription; 

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService ) { }

  ngOnInit() {
    this.cargarMedicos();
    
    // Cuando se actualiza la foto recargar los medicos
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100))
                       .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.obtenerMedicos().subscribe( (medicos:any) => {
      this.cargando = false;
      this.medicos = medicos;
      this.tempMedicos = medicos;
    })
  }

  borrarMedico( medico: Medico ) {
    Swal.fire({
      title: `Esta usted seguro de borrar el medico?`,
      text: `Medico a borrar: ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.borrarMedico(medico.id).subscribe(medicoBorrado => {
      
          Swal.fire(
            'Borrado!',
            `El usuario <b>${medico.nombre}</b> ha sido borrado correctamente`,
            'success'
          )

          this.cargarMedicos();
        })
      }
    })
  }


  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.id, medico.img);
  }


  buscar( termino: string ) {
    
    if( termino.trim() ) {
          this.busquedasService.buscar( 'medicos', termino ).subscribe( (respuesta:any) => {
            
            this.medicos = respuesta.medicos;
          })
    }
    else {
      this.medicos = this.tempMedicos;
    }
  }



}

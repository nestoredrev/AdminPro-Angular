import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from '../../../services/hospital.service';

import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public tempHospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private hospitalesService: HospitalesService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnInit() {
    this.cargarHospitales();

    // Cuando se actualiza la foto recargar los hospitales
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100))
                       .subscribe(img => this.cargarHospitales());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }
  

  cargarHospitales()
  {
    this.cargando = true;
    this.hospitalesService.obtenerHospitales()
        .subscribe(hospitales => {
          this.cargando = false;
          this.hospitales = hospitales;
          this.tempHospitales = hospitales;
        })
  }

  async crearHospital()
  {

    const valor = await Swal.fire<string>({
      title: 'Insertar hospital',
      input: 'text',
      inputPlaceholder: 'Nombre hospital',
      showCancelButton: true
    })
    
    if (valor.value) {
      this.hospitalesService.crearHospital(valor.value.trim()).subscribe( (hospital:any) => {
        this.hospitales.push(hospital);
      }); 
    }
  }

  actualizarHospital( hospital: Hospital )
  {
    this.hospitalesService.actualizarHospital(hospital.id, hospital.nombre).subscribe( (res:any) => {

      Swal.fire(
        'Editar!',
        `El hospital <b>${hospital.nombre}</b> ha sido editado correctamente`,
        'success'
      )

      this.cargarHospitales();
    })
  }

  borrarHospital( hospital: Hospital )
  {
    this.hospitalesService.borrarHospital(hospital.id).subscribe( res => {
      
      Swal.fire(
        'Borrado!',
        `El usuario <b>${hospital.nombre}</b> ha sido borrado correctamente`,
        'success'
      )

      this.cargarHospitales();
    })
  }


  abrirModal(hospital: Hospital)
  {
    this.modalImagenService.abrirModal('hospitales',hospital.id, hospital.img);
  }

  buscarHospital( termino: string ) {
    
    if( termino.trim() ) {
          this.busquedasService.buscar( 'hospitales', termino ).subscribe( (respuesta:any) => {
            
            this.hospitales = respuesta.hospitales;
          })
    }
    else {
      this.hospitales = this.tempHospitales;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MedicoService } from '../../../../services/medico.service';
import { HospitalesService } from '../../../../services/hospital.service';

import { Hospital } from '../../../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';


import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  formMedico: FormGroup;
  hospitales: Hospital[] = [];
  hospitalSeleccionado: Hospital;
  medicoSeleccionado: Medico;
  parametrosUrl: any;

  constructor(private fb: FormBuilder,
              private medicoService: MedicoService,
              private hospitalesService: HospitalesService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
    this.initFormMedico();
    this.obterUrlParams();
    this.obtenerHospitales();
    this.getSelectedHospital();
    this.obtenerMedicoById();
  }

  obtenerMedicoById() {
    const parametro = this.parametrosUrl;
    const getId:string = parametro['id'];
    if(getId.toLocaleLowerCase() !== 'nuevo') {
      this.medicoService.obtenerMedico(getId).pipe(delay(100)).subscribe( (medico:any) => {
        
        // Incializar el formulario y la foto del perfil del medico si el id de la url es valido.
        // El delay es simplemente esperarse un poco para crear el formGroup y despues inicialiar el form
        this.medicoSeleccionado = medico;
        const { nombre, hospital:{ _id } } = medico;
        this.formMedico.setValue( { nombre, hospital:_id } );

      },(err => {
        Swal.fire(
          'Err al cargar el medico',
          `<b>${err.error.error.id['msg']}, Id no valido!</b>`,
          'error'
        ).then(res => {
          this.router.navigateByUrl(`/dashboard/medicos`);
        })
      }))
    }
  }

  editarMedico() {
    
    const medicoData =  this.formMedico.value;

    if(!medicoData) {
      return;
    }

    if(this.medicoSeleccionado) {
      const id = this.medicoSeleccionado.id;
      this.actualizarMedico(id, medicoData);
    }
    else {
      this.crearMedico(medicoData);
    }
  }

  initFormMedico() {

    this.formMedico = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
  }

  crearMedico(medicoData) {
    this.medicoService.crearMedico(medicoData).subscribe((medicoNuevo:any) => {
        
      Swal.fire(
        'Creado!',
        `El medico <b>${medicoNuevo.nombre}</b> se ha creado correctamente`,
        'success'
      )
      this.router.navigateByUrl(`/dashboard/medico/${ medicoNuevo.id }`);
    },(err => {
      Swal.fire(
        'Error al crear medico',
        `<b>${err.error.msg}</b>`,
        'error'
      ).then( res => {
        this.router.navigateByUrl(`/dashboard/medicos`);
      })
    }));
  }

  actualizarMedico(id, medicoData) {
    this.medicoService.actualizarMedico(id, medicoData).subscribe((medicoActualizado:any) => {
        
      Swal.fire(
        'Actualizado!',
        `El medico <b>${medicoActualizado.nombre}</b> se ha actualizado correctamente`,
        'success'
      )
      this.router.navigateByUrl(`/dashboard/medico/${ medicoActualizado.id }`);
    },(err => {
      Swal.fire(
        'Error al actualizar medico',
        `<b>${err.error.msg}</b>`,
        'error'
      ).then(res => {
        this.router.navigateByUrl(`/dashboard/medicos`);
      })
    }));
  }

  obtenerHospitales() {
    this.hospitalesService.obtenerHospitales().subscribe( (hospitales:any) => {
      this.hospitales = hospitales;
    })
  }

  getSelectedHospital() {
    this.formMedico.get('hospital').valueChanges.subscribe( valueSelected => {
      this.hospitalSeleccionado = this.hospitales.find( hospital => hospital.id === valueSelected);
    })
  }

  obterUrlParams() {
    this.activatedRoute.params.subscribe( params => {
      this.parametrosUrl = params;
    })
  }

}

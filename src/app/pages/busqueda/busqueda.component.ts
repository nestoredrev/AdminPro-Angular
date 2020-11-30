import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[]    = [];
  medicos: Medico[]      = [];
  hospitales: Hospital[] = [];
  termino: string = '';

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService,
               private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe ( ({termino}) => {
      this.termino = termino;
      this.getDataBusquedaGlobal( termino );
    });
  }

  getDataBusquedaGlobal( termino:string ) {
    this.busquedasService.busquedaGlobal(termino).subscribe ( (resp:any) => {
      console.log(resp, 'BUSQUEDA');
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    })
  }

  abrirMedico(medico: Medico) {
    this.router.navigateByUrl(`/dashboard/medico/${medico.id}`);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Formulario por defecto
  public registerForm = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3) ] ],
    email: [ '', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]  ],
    password: [ '', [ Validators.required, Validators.minLength(3) ] ],
    password2: [ '' ],
    terminos: [ false, Validators.requiredTrue ]
  },
   {
    validators: this.myValidators.passwordsIguales('password', 'password2')
   }
  );

  constructor(private fb: FormBuilder, 
              private myValidators: ValidadoresService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
  }

  crearUsuario()
  {
    if(this.registerForm.valid)
    {
      const data = this.registerForm.value;
      this.usuarioService.signUp(data)
          .subscribe( (respuesta:any) => {

            Swal.fire({
              title: 'Registro completado',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((event) => {
              this.router.navigateByUrl('/dashboard');
            })
      },(err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
    }
    else
    {
      alert('El formulario no es valido');
    }
  }

}

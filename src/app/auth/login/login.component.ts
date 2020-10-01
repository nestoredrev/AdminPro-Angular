import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';


declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public auth2: any;

  public formLogin = this.fb.group({
    email: [localStorage.getItem('email') || '', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")] ],
    password: ['', [ Validators.required, Validators.minLength(3) ]],
    remember: [ localStorage.getItem('remember') || false],
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone
             ) { }

  ngOnInit() {
    this.renderButton();
  }

  // Login Normal
  logIn()
  {

    if(this.formLogin.invalid)
    {
      Swal.fire({
        title: 'Error',
        text: 'Formulario incorrecto',
        icon: 'error'
      })
    }
    else
    {
      let data = this.formLogin.value;
      
      this.usuarioService.logIn(data).subscribe((respuesta:any) => {
          

          if(this.formLogin.get('remember').value)
          {
            localStorage.setItem('email', this.formLogin.get('email').value);
            localStorage.setItem('remember', 'true');
          }
          else
          {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }

          this.router.navigateByUrl('/dashboard');

      }, (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.error,
            icon: 'error'
          })
      })
    }
  }

  // Login Google
  renderButton() {
      gapi.signin2.render('signInBtnGoogle', {
        'scope': 'profile email picture',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
      });
      this.startApp();
  }

  // Google btn personalizado
  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('signInBtnGoogle'));
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
              let id_token = googleUser.getAuthResponse().id_token;
              
              this.usuarioService.loginGoogle(id_token).subscribe((respuesta:any) => {
                this.ngZone.run(() => { // Ngzone es para ejecutar codigo de angular fuera de su ambito para no perder el ciclo de vida
                  this.router.navigateByUrl('/dashboard');
                });
              });
              
        }, (error) => {
          console.log(JSON.stringify(error, undefined, 2));
        });
  }

}

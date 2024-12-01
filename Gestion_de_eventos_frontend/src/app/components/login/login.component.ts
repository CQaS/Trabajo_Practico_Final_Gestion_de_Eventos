import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/interfaces/admin';
import { ExisteTokenService } from 'src/app/services/existe-token.service';
import { MsjerrorService } from 'src/app/services/msjerror.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  existeToken = false;

  constructor(
    private toast: ToastrService,
    private _usuarioService: UsuarioService,
    private router: Router,
    private _msjError: MsjerrorService,
    private existe_token: ExisteTokenService
  ) {}

  ngOnInit(): void {
    this.existeToken = this.existe_token.existeToken();
    if (this.existeToken) {
      this.router.navigate(['/dashboard']);
    }
  }

  /* 
Función para manejar el proceso de inicio de sesión del administrador:
- Método: ingresar
- Descripción: Esta función valida las credenciales del administrador y gestiona el proceso de autenticación.

Descripción del funcionamiento:
- Se verifica si los campos de nombre de usuario (username) y contraseña (password) están vacíos:
  - Si alguno de los campos está vacío, se muestra una advertencia utilizando el servicio toast, indicando que faltan campos, y se termina la ejecución de la función.
- Se crea un objeto admin de tipo Admin que contiene las credenciales ingresadas.
- Se registra el objeto admin en la consola para fines de depuración.
- Se establece una variable loading en true para indicar que se está procesando la solicitud.
- Se llama al método login del servicio _usuarioService, pasando el objeto admin como argumento:
  - En caso de éxito (next):
    - Se registra el token recibido en la consola.
    - Se navega a la ruta 'listaDeEventos' utilizando el router.
    - Se almacena el token en el localStorage para su uso en futuras solicitudes.
  - En caso de error (error):
    - Se invoca el método msjErrors del servicio _msjError para manejar y mostrar el error al usuario.
    - Se establece loading en false para indicar que la solicitud ha finalizado.

Esta función está diseñada para facilitar el inicio de sesión del administrador, asegurando que se validen las credenciales antes de proceder y gestionando adecuadamente los resultados de la autenticación.
*/
  ingresar() {
    if (this.username == '' || this.password == '') {
      this.toast.warning('Faltan campos', 'Alerta');
      return;
    }

    const admin: Admin = {
      username: this.username,
      password: this.password,
    };

    console.log('admin', admin);
    this.loading = true;
    this._usuarioService.login(admin).subscribe({
      next: (T) => {
        console.log(T.token);
        this.router.navigate(['listaDeEventos']);
        localStorage.setItem('token', T.token);
      },
      error: (e: HttpErrorResponse) => {
        this._msjError.msjErrors(e);
        this.loading = false;
      },
    });
  }
}

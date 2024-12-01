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

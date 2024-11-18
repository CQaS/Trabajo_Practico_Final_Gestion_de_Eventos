import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/interfaces/admin';
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

  constructor(
    private toast: ToastrService,
    private _usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', T.token);
      },
      error: (e: HttpErrorResponse) => {
        this.msjErrors(e);
        this.loading = false;
      },
    });
  }

  msjErrors(e: HttpErrorResponse) {
    console.log(e);
    if (e.error.Error) {
      this.toast.error(e.error.Error, 'Error');
    } else {
      this.toast.error('Upps algo ocurrio!!!', 'Error');
    }
  }
}

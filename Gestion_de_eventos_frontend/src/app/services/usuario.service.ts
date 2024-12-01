import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from '../interfaces/admin';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { MsjerrorService } from './msjerror.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private _msjError: MsjerrorService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/';
  }

  /* 
Función para autenticar a un administrador:
- Método: login
- Parámetro: admin (Admin) - Objeto que contiene las credenciales del administrador (por ejemplo, nombre de usuario y contraseña).
- Retorna: Observable<{ token: string }> - Un observable que emite un objeto que contiene el token de autenticación.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP POST a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'admin/login'.
- Se envía el objeto admin como cuerpo de la solicitud, que incluye las credenciales necesarias para la autenticación.
- La función espera recibir una respuesta del servidor que contenga un token de autenticación, el cual se utiliza para validar futuras solicitudes del administrador.

Esta función está diseñada para facilitar el proceso de inicio de sesión del administrador, permitiendo obtener un token que se utilizará para acceder a áreas protegidas de la aplicación.
*/
  login(admin: Admin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.myAppUrl}${this.myApiUrl}admin/login`,
      admin
    );
  }
}

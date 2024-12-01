import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MsjerrorService } from '../services/msjerror.service';

@Injectable()
export class TokenizarInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _msjError: MsjerrorService) {}

  /* 
Intercepción de solicitudes HTTP para agregar autenticación y manejar errores:
- Método: intercept
- Parámetros:
  - request (HttpRequest<unknown>) - La solicitud HTTP que se va a interceptar.
  - next (HttpHandler) - El siguiente manejador en la cadena de interceptores.
- Retorna: Observable<HttpEvent<unknown>> - Un observable que emite los eventos de la solicitud HTTP.

Descripción del funcionamiento:
- Se obtiene el token de autenticación almacenado en el localStorage bajo la clave 'token'.
- Si el token existe, se clona la solicitud original, añadiendo un encabezado 'Authorization' con el valor `Bearer ${token}`. Esto permite que el servidor reconozca al usuario autenticado en las solicitudes subsiguientes.
- Se llama al siguiente manejador en la cadena utilizando next.handle(request), pasando la solicitud modificada:
  - Se utiliza el operador pipe para manejar errores que puedan surgir durante la solicitud.
  - En caso de error (catchError):
    - Si el error tiene un estado 401 (no autorizado), se invoca el método msjErrors del servicio _msjError para manejar y mostrar el error al usuario.
    - Se redirige al usuario a la ruta '/login' para que pueda autenticarse nuevamente.
    - Se lanza un nuevo error genérico con un mensaje 'Error' para que otros manejadores de errores puedan capturarlo si es necesario.

Esta función está diseñada para facilitar la gestión de autenticación en las solicitudes HTTP, asegurando que las credenciales del usuario se envíen correctamente y manejando adecuadamente los errores de autorización.
*/
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          this._msjError.msjErrors(e);
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error('Error'));
      })
    );
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MsjerrorService {
  constructor(private toast: ToastrService) {}

  /* 
Función para manejar y mostrar mensajes de error:
- Método: msjErrors
- Parámetro: e (HttpErrorResponse) - Objeto que representa la respuesta de error de una solicitud HTTP.

Descripción del funcionamiento:
- Se registra el objeto de error en la consola para facilitar la depuración.
- Se verifica si existe un mensaje de error específico en la propiedad 'Error' del objeto e.error:
  - Si existe, se muestra un mensaje de error utilizando el servicio toast, presentando el mensaje de error específico.
  - Si no existe, se muestra un mensaje genérico indicando que ocurrió un problema, utilizando también el servicio toast.

Esta función está diseñada para proporcionar retroalimentación visual al usuario en caso de errores durante las operaciones HTTP, mejorando la experiencia del usuario al informar sobre problemas de manera clara y concisa.
*/
  msjErrors(e: HttpErrorResponse) {
    console.log(e);
    if (e.error.Error) {
      this.toast.error(e.error.Error, 'Error');
    } else {
      this.toast.error('Upps algo ocurrio!!!', 'Error');
    }
  }
}

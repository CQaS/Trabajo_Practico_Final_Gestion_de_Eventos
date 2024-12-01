import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsjerrorService } from './msjerror.service';
import { environment } from 'src/environments/environment';
import { RegistroAsistencia } from '../interfaces/registroAsistencia';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class RegistroAsistenciaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private _msjError: MsjerrorService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/asistencia/';
  }

  /* 
Función para agregar un registro de asistencia de un usuario a un evento:
- Método: addRegistroAsistencia_Usuario
- Parámetros:
  - idDelevento (number) - Identificador único del evento al que se desea registrar la asistencia.
  - us (Usuario) - Objeto que representa al usuario que está registrando su asistencia.
- Retorna: Observable<HttpResponse<any>> - Un observable que emite la respuesta de la solicitud HTTP.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP POST a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'crear_registroAsistencia/' seguido del ID del evento.
- Se envía el objeto us como cuerpo de la solicitud, que contiene los datos del usuario que está registrando su asistencia al evento.
- La función espera recibir una respuesta del servidor, que puede incluir información sobre el éxito o fracaso de la operación.

Esta función está diseñada para facilitar el registro de asistencia de usuarios a eventos específicos, permitiendo a los usuarios confirmar su participación mediante el envío de sus datos.
*/
  addRegistroAsistencia_Usuario(
    idDelevento: number,
    us: Usuario
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}crear_registroAsistencia/${idDelevento}`,
      us
    );
  }

  /* 
Función para editar un registro de asistencia existente:
- Método: editRegistroAsistencia
- Parámetros:
  - id (number) - Identificador único del registro de asistencia que se desea editar.
  - registro (RegistroAsistencia) - Objeto que contiene la información actualizada del registro de asistencia.
- Retorna: Observable<HttpResponse<any>> - Un observable que emite la respuesta de la solicitud HTTP.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP PUT a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'editar_registroAsistencia/' seguido del ID del registro.
- Se envía el objeto registro como cuerpo de la solicitud, que contiene los datos actualizados para el registro de asistencia especificado.
- La función espera recibir una respuesta del servidor, que puede incluir información sobre el éxito o fracaso de la operación.

Esta función está diseñada para facilitar la actualización de registros de asistencia existentes en el servidor, permitiendo a los usuarios modificar los detalles de un registro específico mediante el envío de datos estructurados.
*/
  editRegistroAsistencia(
    id: number,
    registro: RegistroAsistencia
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${this.myAppUrl}${this.myApiUrl}editar_registroAsistencia/${id}`,
      registro
    );
  }

  /* 
Función para obtener la lista de usuarios asistentes a un evento:
- Método: getlistarUsuariosAsistentes
- Parámetro: id (number) - Identificador único del evento del cual se desean listar los usuarios asistentes.
- Retorna: Observable<RegistroAsistencia[]> - Un observable que emite un arreglo de objetos RegistroAsistencia.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP GET a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'listarUsuariosAsistentes/' seguido del ID del evento.
- Se utiliza el operador 'pipe' para manejar el flujo de datos y gestionar errores.
- En caso de que ocurra un error durante la solicitud:
  - Se registra un mensaje de error en la consola.
  - Se invoca el método msjErrors del servicio _msjError para manejar y mostrar el error al usuario.
  - Se lanza un nuevo error con un mensaje específico, utilizando el mensaje de error devuelto por la API o un mensaje genérico 'Error Desconocido'.

Esta función está diseñada para facilitar la obtención de registros de asistencia de usuarios a un evento específico, gestionando adecuadamente cualquier error que pueda surgir durante el proceso.
*/
  getlistarUsuariosAsistentes(id: number): Observable<RegistroAsistencia[]> {
    return this.http
      .get<RegistroAsistencia[]>(
        `${this.myAppUrl}${this.myApiUrl}listarUsuariosAsistentes/${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error al obtener los registros', err);
          this._msjError.msjErrors(err);

          return throwError(
            () => new Error(err.error?.Error || 'Error Desconocido')
          );
        })
      );
  }
}

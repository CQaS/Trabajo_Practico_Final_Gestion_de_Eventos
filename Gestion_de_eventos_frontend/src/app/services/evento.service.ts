import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../interfaces/evento';
import { ToastrService } from 'ngx-toastr';
import { MsjerrorService } from './msjerror.service';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private _msjError: MsjerrorService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/eventos/';
  }

  /* 
Función para obtener la lista de eventos:
- Método: getListaEventos
- Retorna: Observable<Evento[]> - Un observable que emite un arreglo de objetos Evento.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP GET a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'eventos_lista/' para obtener la lista de eventos disponibles.
- Se utiliza el operador 'pipe' para manejar el flujo de datos y gestionar errores.
- En caso de que ocurra un error durante la solicitud:
  - Se registra un mensaje de error en la consola.
  - Se invoca el método msjErrors del servicio _msjError para manejar y mostrar el error al usuario.
  - Se lanza un nuevo error con un mensaje específico, utilizando el mensaje de error devuelto por la API o un mensaje genérico 'Error desconocido'.

Esta función está diseñada para facilitar la obtención de eventos desde el servidor, gestionando adecuadamente cualquier error que pueda surgir durante el proceso.
*/
  getListaEventos(): Observable<Evento[]> {
    /* const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); */

    return this.http
      .get<Evento[]>(`${this.myAppUrl}${this.myApiUrl}eventos_lista/`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error al obtener los eventos:', err);
          this._msjError.msjErrors(err);

          return throwError(
            () => new Error(err.error?.Error || 'Error desconocido')
          );
        })
      );
  }

  /* 
Función para obtener un evento por su ID:
- Método: getEventoById
- Parámetro: id (number) - Identificador único del evento que se desea obtener.
- Retorna: Observable<Evento> - Un observable que emite un objeto Evento.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP GET a la URL construida a partir de myAppUrl y myApiUrl, añadiendo el ID del evento al final de la ruta.
- Se espera recibir un objeto Evento que representa el evento correspondiente al ID proporcionado.

Esta función permite recuperar los detalles de un evento específico utilizando su identificador único, facilitando así la visualización o manipulación de la información del evento.
*/
  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  /* 
Función para agregar un nuevo evento:
- Método: addEvento
- Parámetro: evento (Evento) - Objeto que contiene la información del evento a crear.
- Retorna: Observable<HttpResponse<any>> - Un observable que emite la respuesta de la solicitud HTTP.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP POST a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'crear_evento'.
- Se envía el objeto evento como cuerpo de la solicitud, que contiene todos los datos necesarios para crear el nuevo evento.
- La función espera recibir una respuesta del servidor, que puede incluir información sobre el éxito o fracaso de la operación.

Esta función está diseñada para facilitar la creación de nuevos eventos en el servidor, permitiendo a los usuarios agregar eventos mediante el envío de datos estructurados.
*/
  addEvento(evento: Evento): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}crear_evento`,
      evento
    );
  }

  /* 
Función para editar un evento existente:
- Método: editEvento
- Parámetros:
  - id (number) - Identificador único del evento que se desea editar.
  - evento (Evento) - Objeto que contiene la información actualizada del evento.
- Retorna: Observable<HttpResponse<any>> - Un observable que emite la respuesta de la solicitud HTTP.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP PUT a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'editar_evento/' seguido del ID del evento.
- Se envía el objeto evento como cuerpo de la solicitud, que contiene los datos actualizados para el evento especificado.
- La función espera recibir una respuesta del servidor, que puede incluir información sobre el éxito o fracaso de la operación.

Esta función está diseñada para facilitar la actualización de eventos existentes en el servidor, permitiendo a los usuarios modificar los detalles de un evento específico mediante el envío de datos estructurados.
*/
  editEvento(id: number, evento: Evento): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${this.myAppUrl}${this.myApiUrl}editar_evento/${id}`,
      evento
    );
  }

  /* 
Función para eliminar un evento existente:
- Método: deleteEvento
- Parámetro: id (number) - Identificador único del evento que se desea eliminar.
- Retorna: Observable<HttpResponse<any>> - Un observable que emite la respuesta de la solicitud HTTP.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP DELETE a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'eliminar_evento/' seguido del ID del evento.
- La función espera recibir una respuesta del servidor, que puede incluir información sobre el éxito o fracaso de la operación.

Esta función está diseñada para facilitar la eliminación de eventos en el servidor, permitiendo a los usuarios eliminar un evento específico mediante su identificador único.
*/
  deleteEvento(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      `${this.myAppUrl}${this.myApiUrl}eliminar_evento/${id}`
    );
  }

  /* 
Función para obtener la lista de eventos próximos:
- Método: getEventosProximos
- Retorna: Observable<Evento[]> - Un observable que emite un arreglo de objetos Evento.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP GET a la URL construida a partir de myAppUrl y myApiUrl, accediendo al endpoint 'eventos_proximos/' para obtener la lista de eventos que están por ocurrir.
- Se utiliza el operador 'pipe' para manejar el flujo de datos y gestionar errores.
- En caso de que ocurra un error durante la solicitud:
  - Se registra un mensaje de error en la consola.
  - Se invoca el método msjErrors del servicio _msjError para manejar y mostrar el error al usuario.
  - Se lanza un nuevo error con un mensaje específico, utilizando el mensaje de error devuelto por la API o un mensaje genérico 'Error desconocido'.

Esta función está diseñada para facilitar la obtención de eventos que se llevarán a cabo en un futuro cercano, gestionando adecuadamente cualquier error que pueda surgir durante el proceso.
*/
  getEventosProximos(): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(`${this.myAppUrl}${this.myApiUrl}eventos_proximos/`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error al obtener los eventos:', err);
          this._msjError.msjErrors(err);

          return throwError(
            () => new Error(err.error?.Error || 'Error desconocido')
          );
        })
      );
  }
}

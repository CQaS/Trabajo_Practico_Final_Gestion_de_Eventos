import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsjerrorService } from './msjerror.service';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Certificado } from '../interfaces/certificado';

@Injectable({
  providedIn: 'root',
})
export class CertificadosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private _msjError: MsjerrorService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/certificados/';
  }

  /* 
Función para obtener la lista de certificados:
- Método: getlistarCertificados
- Parámetro: email (string) - Correo electrónico del usuario para filtrar los certificados.
- Retorna: Observable<Certificado[]> - Un observable que emite un arreglo de objetos Certificado.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP GET a la URL construida a partir de myAppUrl y myApiUrl, añadiendo 'listar/' seguido del email proporcionado.
- Se utiliza el operador 'pipe' para manejar el flujo de datos y gestionar errores.
- En caso de que ocurra un error durante la solicitud:
  - Se registra un mensaje de error en la consola.
  - Se invoca el método msjErrors del servicio _msjError para manejar y mostrar el error al usuario.
  - Se lanza un nuevo error con un mensaje específico, utilizando el mensaje de error devuelto por la API o un mensaje genérico 'Error Desconocido'.

Esta función está diseñada para facilitar la obtención de certificados asociados a un usuario específico, manejando adecuadamente cualquier error que pueda surgir durante el proceso.
*/
  getlistarCertificados(email: string): Observable<Certificado[]> {
    return this.http
      .get<Certificado[]>(`${this.myAppUrl}${this.myApiUrl}listar/${email}`)
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

  /* 
Función para obtener un certificado por su código:
- Método: obtenerCertificadoPorCodigo
- Parámetro: codigo (string) - Código único del certificado que se desea obtener.
- Retorna: Observable<string> - Un observable que emite el contenido del certificado en formato de texto.

Descripción del funcionamiento:
- Se realiza una solicitud HTTP GET a la URL construida a partir de myAppUrl y myApiUrl, añadiendo 'imprimir/' seguido del código proporcionado.
- Se especifica el tipo de respuesta como 'text', lo que indica que se espera recibir el contenido del certificado en formato de texto plano.

Esta función permite recuperar un certificado específico utilizando su código, facilitando la impresión o visualización del mismo.
*/
  obtenerCertificadoPorCodigo(codigo: string): Observable<string> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}imprimir/${codigo}`, {
      responseType: 'text',
    });
  }
}

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

  addRegistroAsistencia_Usuario(
    idDelevento: number,
    us: Usuario
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}crear_registroAsistencia/${idDelevento}`,
      us
    );
  }

  editRegistroAsistencia(
    id: number,
    registro: RegistroAsistencia
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${this.myAppUrl}${this.myApiUrl}editar_registroAsistencia/${id}`,
      registro
    );
  }

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

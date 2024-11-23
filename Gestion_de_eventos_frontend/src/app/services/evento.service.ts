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

  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addEvento(evento: Evento): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}crear_evento`,
      evento
    );
  }

  editEvento(id: number, evento: Evento): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${this.myAppUrl}${this.myApiUrl}editar_evento/${id}`,
      evento
    );
  }

  deleteEvento(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      `${this.myAppUrl}${this.myApiUrl}eliminar_evento/${id}`
    );
  }

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

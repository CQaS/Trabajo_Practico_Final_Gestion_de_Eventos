import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../interfaces/evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/eventos/';
  }

  getListaEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(
      `${this.myAppUrl}${this.myApiUrl}eventos_lista/`
    );
  }

  addEvento(evento: Evento): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.myAppUrl}${this.myApiUrl}crear_evento`,
      evento
    );
  }

  deleteEvento(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      `${this.myAppUrl}${this.myApiUrl}eliminar_evento/${id}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
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
    this.myApiUrl = 'api/eventos/eventos_lista/';
  }

  getListaEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}

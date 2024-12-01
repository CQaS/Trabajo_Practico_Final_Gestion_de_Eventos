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
}

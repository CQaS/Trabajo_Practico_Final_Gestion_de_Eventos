import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from '../interfaces/admin';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { MsjerrorService } from './msjerror.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private _msjError: MsjerrorService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/';
  }

  login(admin: Admin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.myAppUrl}${this.myApiUrl}admin/login`,
      admin
    );
  }
}

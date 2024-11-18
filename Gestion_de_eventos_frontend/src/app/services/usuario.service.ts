import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from '../interfaces/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/admin';
  }

  login(admin: Admin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.myAppUrl}${this.myApiUrl}/login`,
      admin
    );
  }
}

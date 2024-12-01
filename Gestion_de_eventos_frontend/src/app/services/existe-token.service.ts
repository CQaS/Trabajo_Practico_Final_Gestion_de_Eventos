import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExisteTokenService {
  constructor() {}

  existeToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

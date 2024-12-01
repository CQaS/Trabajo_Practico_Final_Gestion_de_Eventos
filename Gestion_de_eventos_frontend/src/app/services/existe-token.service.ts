import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExisteTokenService {
  constructor() {}

  /* 
Función para verificar la existencia de un token en el almacenamiento local:
- Método: existeToken
- Retorna: boolean - Devuelve true si el token existe, de lo contrario false.

Descripción del funcionamiento:
- Se intenta obtener el token almacenado en el localStorage bajo la clave 'token'.
- La función utiliza el operador de negación doble (!!) para convertir el valor obtenido en un booleano:
  - Si el token existe y no es null o undefined, se devuelve true.
  - Si el token no existe, se devuelve false.

Esta función está diseñada para facilitar la verificación de la autenticación del usuario, permitiendo determinar si hay un token válido almacenado que indique que el usuario ha iniciado sesión.
*/
  existeToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

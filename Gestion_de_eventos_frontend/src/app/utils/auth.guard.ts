import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/* 
Guardia de autenticación para proteger rutas en la aplicación:
- Clase: AuthGuard
- Implementa: CanActivate - Interfaz que permite controlar el acceso a las rutas.

Descripción del funcionamiento:
- Constructor:
  - Se inyecta el servicio Router para manejar la navegación entre rutas.

- Método: canActivate
  - Parámetros:
    - route (ActivatedRouteSnapshot) - Información sobre la ruta que se está activando.
    - state (RouterStateSnapshot) - Información sobre el estado de la ruta.
  - Retorna: 
    - Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree - Indica si se puede activar la ruta o no.

Descripción del funcionamiento del método canActivate:
- Se obtiene el token de autenticación almacenado en el localStorage bajo la clave 'token'.
- Si el token es undefined (no existe):
  - Se registra un mensaje en la consola indicando que no hay token.
  - Se redirige al usuario a la ruta '/login' para que pueda autenticarse.
- Si el token existe, se retorna true, permitiendo que la ruta sea activada.

Esta clase está diseñada para proteger las rutas de la aplicación, asegurando que solo los usuarios autenticados puedan acceder a ciertas áreas. Si un usuario no está autenticado, será redirigido a la página de inicio de sesión.
*/
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    if (token == undefined) {
      console.log('sin Token');
      this.router.navigate(['/login']);
    }
    return true;
  }
}

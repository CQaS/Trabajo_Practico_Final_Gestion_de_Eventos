import { Router } from '@angular/router';

/* 
Función para navegar a la lista de certificados con un parámetro de consulta:
- Función: buscarCertif
- Parámetros:
  - router (Router) - Servicio Router para manejar la navegación entre rutas.
  - param (string) - Correo electrónico o identificador del certificado que se desea buscar.

Descripción del funcionamiento:
- Se registra en la consola el valor del parámetro param, que representa el email que se está buscando.
- Se utiliza el método navigate del servicio router para redirigir al usuario a la ruta '/listadecertificados':
  - Se pasan parámetros de consulta (queryParams) que incluyen el email como una propiedad llamada email, cuyo valor es el contenido de param.

Esta función está diseñada para facilitar la navegación a la página de lista de certificados, permitiendo que se pase un parámetro de búsqueda que puede ser utilizado en esa página para filtrar o mostrar certificados relacionados con el email proporcionado.
*/
export function buscarCertif(router: Router, param: string) {
  console.log('Email/Certificado', param);
  router.navigate(['/listadecertificados'], {
    queryParams: { email: param },
  });
}

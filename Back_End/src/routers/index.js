import routesUsuarios from "./usuarios.routes.js"
import routesOrganizadores from './organizadores.routes.js'
import routesEventos from './eventos.routes.js'
import routesAsistencia from './registroAsistencia.routes.js'
import routesCertificados from './certificados.routes.js'
import routesAdmin from './admin.routes.js'


/* 
Exporta un arreglo de objetos que define las rutas principales de la aplicación.
Cada objeto contiene:
- "path": la ruta base para un recurso específico (por ejemplo, '/usuarios').
- "router": el enrutador correspondiente que maneja las solicitudes para esa ruta.

Estas rutas incluyen:
- '/usuarios': Maneja todo lo relacionado con los usuarios.
- '/organizadores': Rutas para gestionar organizadores.
- '/eventos': Rutas para la gestión de eventos.
- '/asistencia': Rutas relacionadas con el registro de asistencia.
- '/certificados': Rutas para gestionar los certificados.
- '/admin': Rutas específicas para funciones administrativas.
*/

export default [{
        path: '/usuarios',
        router: routesUsuarios
    },
    {
        path: '/organizadores',
        router: routesOrganizadores
    },
    {
        path: '/eventos',
        router: routesEventos
    },
    {
        path: '/asistencia',
        router: routesAsistencia
    },
    {
        path: '/certificados',
        router: routesCertificados
    },
    {
        path: '/admin',
        router: routesAdmin
    },
]
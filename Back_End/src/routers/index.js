import routesUsuarios from "./usuarios.routes.js"
import routesOrganizadores from './organizadores.routes.js'
import routesEventos from './eventos.routes.js'
import routesAsistencia from './registroAsistencia.routes.js'
import routesCertificados from './certificados.routes.js'
import routesAdmin from './admin.routes.js'


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
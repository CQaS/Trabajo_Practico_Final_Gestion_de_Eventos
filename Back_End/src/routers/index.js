import routesUsuarios from "./usuarios.routes.js"
import routesCertificados from './certificados.routes.js'
import routesAsistencia from './registroAsistencia.routes.js'
import routesEventos from './eventos.routes.js'
import routesOrganizadores from './organizadores.routes.js'


export default [{
        path: '/usuarios',
        router: routesUsuarios
    },
    {
        path: '/certificados',
        router: routesCertificados
    },
    {
        path: '/asistencia',
        router: routesAsistencia
    },
    {
        path: '/eventos',
        router: routesEventos
    },

    {
        path: '/organizadores',
        router: routesOrganizadores
    },

]
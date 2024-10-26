import {
    Router
} from "express"
import {
    organizadores_lista,
    organizador_porid,
    crear_organizador,
    editar_organizador,
    eliminar_organizador
}
from "../controllers/organizador.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    organizadorSchema
} from "../schemas/organizador.schema.js"

const routesOrganizadores = Router()

routesOrganizadores.get('/organizadores_lista', organizadores_lista)
routesOrganizadores.get('/:id', organizador_porid)
routesOrganizadores.post('/crear_organizador', validarSchemmaGenerico(organizadorSchema), crear_organizador)
routesOrganizadores.put('/editar_organizador/:id', validarSchemmaGenerico(organizadorSchema), editar_organizador)
routesOrganizadores.delete('/eliminar_organizador/:id', eliminar_organizador)

export default routesOrganizadores
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
import {
    esAutentico
} from "../middlewares/esAutentico.js"

const routesOrganizadores = Router()

routesOrganizadores.get('/organizadores_lista', esAutentico, organizadores_lista)
routesOrganizadores.get('/:id', esAutentico, organizador_porid)
routesOrganizadores.post('/crear_organizador', esAutentico, validarSchemmaGenerico(organizadorSchema), crear_organizador)
routesOrganizadores.put('/editar_organizador/:id', esAutentico, validarSchemmaGenerico(organizadorSchema), editar_organizador)
routesOrganizadores.delete('/eliminar_organizador/:id', esAutentico, eliminar_organizador)

export default routesOrganizadores
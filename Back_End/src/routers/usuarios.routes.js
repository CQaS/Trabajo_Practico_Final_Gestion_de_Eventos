import {
    Router
} from "express"
import {
    usuarios_lista,
    crear_usuario,
} from "../controllers/usuario.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    usuarioSchema
} from "../schemas/usuario.schema.js"

const routesUsuarios = Router()

routesUsuarios.get('/usuarios_lista', usuarios_lista)
/* routesUsuarios.get('/recibo_cliente/:id', recibo_cliente)
 */
routesUsuarios.post('/crear_usuarios', validarSchemmaGenerico(usuarioSchema), crear_usuario)
/*
routesUsuarios.put('/editar_cliente/:id', validarSchemmaGenerico(ClientesSchema), editar_cliente)
routesUsuarios.delete('/eliminar_cliente/:id', eliminar_cliente) */

export default routesUsuarios
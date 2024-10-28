import {
    Router
} from "express"
import {
    usuarios_lista,
    usuario_porid,
    crear_usuario,
    editar_usuario,
    eliminar_usuario
} from "../controllers/usuario.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    usuarioSchema
} from "../schemas/usuario.schema.js"
import {
    esAutentico
} from '../middlewares/esAutentico.js'

const routesUsuarios = Router()

routesUsuarios.get('/usuarios_lista', esAutentico, usuarios_lista)
routesUsuarios.get('/:id', usuario_porid)
routesUsuarios.post('/crear_usuario', validarSchemmaGenerico(usuarioSchema), crear_usuario)
routesUsuarios.put('/editar_usuario/:id', validarSchemmaGenerico(usuarioSchema), editar_usuario)
routesUsuarios.delete('/eliminar_usuario/:id', eliminar_usuario)

export default routesUsuarios
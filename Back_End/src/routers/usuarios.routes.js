import {
    Router
} from "express"
import {
    usuarios_lista,
    usuario_porid,
    usuario_porDni,
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
routesUsuarios.get('/:id', esAutentico, usuario_porid)
routesUsuarios.get('/dni/:dni', esAutentico, usuario_porDni)
routesUsuarios.post('/crear_usuario', esAutentico, validarSchemmaGenerico(usuarioSchema), crear_usuario)
routesUsuarios.put('/editar_usuario/:id', esAutentico, validarSchemmaGenerico(usuarioSchema), editar_usuario)
routesUsuarios.delete('/eliminar_usuario/:id', esAutentico, eliminar_usuario)

export default routesUsuarios
import {
    Router
} from "express"
import {
    registroAsistencia_lista,
    listarUsuariosAsistentes,
    registroAsistencia_porid,
    crear_registroAsistencia,
    editar_registroAsistencia,
    eliminar_registroAsistencia
} from "../controllers/registroAsistencia.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    registroAsistenciaSchema
} from "../schemas/registro_asistencia.schema.js"
import {
    usuarioSchema
} from "../schemas/usuario.schema.js"
import {
    esAutentico
} from "../middlewares/esAutentico.js"

const routesRegistroAsistencia = Router()

routesRegistroAsistencia.get('/registroAsistencia_lista', esAutentico, registroAsistencia_lista)
routesRegistroAsistencia.get('/listarUsuariosAsistentes/:eventoid', esAutentico, listarUsuariosAsistentes)
routesRegistroAsistencia.get('/:id', esAutentico, registroAsistencia_porid)
routesRegistroAsistencia.post('/crear_registroAsistencia/:id', validarSchemmaGenerico(usuarioSchema), crear_registroAsistencia)
routesRegistroAsistencia.put('/editar_registroAsistencia/:id', esAutentico, validarSchemmaGenerico(registroAsistenciaSchema), editar_registroAsistencia)
routesRegistroAsistencia.delete('/eliminar_registroAsistencia/:id', esAutentico, eliminar_registroAsistencia)

export default routesRegistroAsistencia
import {
    Router
} from "express"
import {
    registroAsistencia_lista,
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

const routesRegistroAsistencia = Router()

routesRegistroAsistencia.get('/registroAsistencia_lista', registroAsistencia_lista)
routesRegistroAsistencia.get('/:id', registroAsistencia_porid)
routesRegistroAsistencia.post('/crear_registroAsistencia', validarSchemmaGenerico(registroAsistenciaSchema), crear_registroAsistencia)
routesRegistroAsistencia.put('/editar_registroAsistencia/:id', validarSchemmaGenerico(registroAsistenciaSchema), editar_registroAsistencia)
routesRegistroAsistencia.delete('/eliminar_registroAsistencia/:id', eliminar_registroAsistencia)

export default routesRegistroAsistencia
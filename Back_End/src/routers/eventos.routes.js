import {
    Router
} from "express"
import {
    eventos_lista,
    evento_porid,
    crear_evento,
    editar_evento,
    eliminar_evento
} from "../controllers/evento.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    eventoSchema
} from "../schemas/evento.schema.js"

const routesEventos = Router()

routesEventos.get('/eventos_lista', eventos_lista)
routesEventos.get('/:id', evento_porid)
routesEventos.post('/crear_evento', validarSchemmaGenerico(eventoSchema), crear_evento)
routesEventos.put('/editar_evento/:id', validarSchemmaGenerico(eventoSchema), editar_evento)
routesEventos.delete('/eliminar_evento/:id', eliminar_evento)

export default routesEventos
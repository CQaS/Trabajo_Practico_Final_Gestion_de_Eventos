import {
    Router
} from "express"
import {
    eventos_lista,
    evento_porid,
    eventos_proximos,
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
import {
    esAutentico
} from "../middlewares/esAutentico.js"

const routesEventos = Router()

routesEventos.get('/eventos_lista', esAutentico, eventos_lista)
routesEventos.get('/eventos_proximos', eventos_proximos)
routesEventos.get('/:id', evento_porid)
routesEventos.post('/crear_evento', esAutentico, validarSchemmaGenerico(eventoSchema), crear_evento)
routesEventos.put('/editar_evento/:id', esAutentico, validarSchemmaGenerico(eventoSchema), editar_evento)
routesEventos.delete('/eliminar_evento/:id', esAutentico, eliminar_evento)

export default routesEventos
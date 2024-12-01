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

/* Definición de las rutas para el manejo de eventos en la API.
   - `GET /eventos_lista`: Obtiene la lista de eventos, protegido por autenticación.
   - `GET /eventos_proximos`: Obtiene los eventos próximos, sin autenticación requerida.
   - `GET /:id`: Obtiene un evento por su ID.
   - `POST /crear_evento`: Crea un nuevo evento, protegido por autenticación y validación del esquema de datos.
   - `PUT /editar_evento/:id`: Edita un evento existente por su ID, protegido por autenticación y validación del esquema de datos.
   - `DELETE /eliminar_evento/:id`: Elimina un evento por su ID, protegido por autenticación. */

routesEventos.get('/eventos_lista', esAutentico, eventos_lista)
routesEventos.get('/eventos_proximos', eventos_proximos)
routesEventos.get('/:id', evento_porid)
routesEventos.post('/crear_evento', esAutentico, validarSchemmaGenerico(eventoSchema), crear_evento)
routesEventos.put('/editar_evento/:id', esAutentico, validarSchemmaGenerico(eventoSchema), editar_evento)
routesEventos.delete('/eliminar_evento/:id', esAutentico, eliminar_evento)

export default routesEventos
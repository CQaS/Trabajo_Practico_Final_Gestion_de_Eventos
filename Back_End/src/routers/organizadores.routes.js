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

/* 
Rutas para gestionar los organizadores del sistema:
- `GET /organizadores_lista`: Obtiene la lista de todos los organizadores, protegida por el middleware `esAutentico`.
- `GET /:id`: Obtiene los datos de un organizador por su ID, protegido por el middleware `esAutentico`.
- `POST /crear_organizador`: Crea un nuevo organizador. Requiere validación de los datos del cuerpo de la solicitud usando el esquema `organizadorSchema` y el middleware `validarSchemmaGenerico`.
- `PUT /editar_organizador/:id`: Actualiza los datos de un organizador por su ID, también requiere validación de los datos y protección de autenticación.
- `DELETE /eliminar_organizador/:id`: Elimina un organizador por su ID, protegido por el middleware `esAutentico`.

Estas rutas están diseñadas para gestionar los organizadores, permitiendo su listado, creación, edición y eliminación, con validaciones y autenticación adecuada.
*/

routesOrganizadores.get('/organizadores_lista', esAutentico, organizadores_lista)
routesOrganizadores.get('/:id', esAutentico, organizador_porid)
routesOrganizadores.post('/crear_organizador', esAutentico, validarSchemmaGenerico(organizadorSchema), crear_organizador)
routesOrganizadores.put('/editar_organizador/:id', esAutentico, validarSchemmaGenerico(organizadorSchema), editar_organizador)
routesOrganizadores.delete('/eliminar_organizador/:id', esAutentico, eliminar_organizador)

export default routesOrganizadores
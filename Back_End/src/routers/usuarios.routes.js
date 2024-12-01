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

/* 
Define las rutas relacionadas con los usuarios utilizando un enrutador de Express:
- `GET /usuarios_lista`: Obtiene una lista de usuarios autenticados.
- `GET /:id`: Obtiene un usuario específico por su ID.
- `GET /dni/:dni`: Obtiene un usuario específico por su DNI.
- `POST /crear_usuario`: Crea un nuevo usuario, validando el esquema con `usuarioSchema`.
- `PUT /editar_usuario/:id`: Edita un usuario por ID, validando el esquema con `usuarioSchema`.
- `DELETE /eliminar_usuario/:id`: Elimina un usuario específico por ID.

En todas las rutas, se verifica la autenticidad del usuario con el middleware `esAutentico`.
*/

routesUsuarios.get('/usuarios_lista', esAutentico, usuarios_lista)
routesUsuarios.get('/:id', esAutentico, usuario_porid)
routesUsuarios.get('/dni/:dni', esAutentico, usuario_porDni)
routesUsuarios.post('/crear_usuario', esAutentico, validarSchemmaGenerico(usuarioSchema), crear_usuario)
routesUsuarios.put('/editar_usuario/:id', esAutentico, validarSchemmaGenerico(usuarioSchema), editar_usuario)
routesUsuarios.delete('/eliminar_usuario/:id', esAutentico, eliminar_usuario)

export default routesUsuarios
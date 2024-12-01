import {
    Router
} from "express"
import {
    login,
    logout
} from "../controllers/admin.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    adminSchema
} from "../schemas/admin.schema.js"

const routesAdmin = Router()

/* 
Configuración de rutas para el administrador:
- Se crea un enrutador utilizando Router() para manejar las rutas relacionadas con la administración.
- Se define una ruta POST para '/login':
  - Utiliza la función validarSchemmaGenerico con el esquema adminSchema para validar los datos de entrada antes de proceder con la función login.
- Se define una ruta POST para '/logout':
  - Llama a la función logout para manejar la lógica de cierre de sesión del administrador.

Este conjunto de rutas está diseñado para gestionar la autenticación del administrador, asegurando que se validen adecuadamente los datos de inicio de sesión antes de permitir el acceso y proporcionando un mecanismo para cerrar sesión.
*/
routesAdmin.post('/login', validarSchemmaGenerico(adminSchema), login)
routesAdmin.post('/logout', logout)

export default routesAdmin
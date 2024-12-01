import {
    Router
} from "express"
import {
    certificados_lista,
    certificado_porid,
    certificado_porEmail,
    certificado_porCodigo,
    crear_certificado,
    editar_certificado,
    eliminar_certificado
} from "../controllers/certificado.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    certificadoSchema
} from "../schemas/certificado.schema.js"
import {
    esAutentico
} from "../middlewares/esAutentico.js"

const routesCertificados = Router()

/* 
Rutas para gestionar certificados:
- `GET /certificados_lista`: Obtiene la lista de todos los certificados, protegido por el middleware `esAutentico`.
- `GET /:id`: Obtiene un certificado específico por su ID, protegido por el middleware `esAutentico`.
- `GET /listar/:email`: Lista certificados asociados a un correo electrónico específico.
- `GET /imprimir/:codigo`: Obtiene un certificado por su código único para impresión o descarga.
- `POST /crear_certificado`: Crea un nuevo certificado. Requiere autenticación (`esAutentico`) y validación de datos con `certificadoSchema` a través de `validarSchemmaGenerico`.
- `PUT /editar_certificado/:id`: Actualiza un certificado existente por su ID. Requiere autenticación y validación de datos con `certificadoSchema`.
- `DELETE /eliminar_certificado/:id`: Elimina un certificado por su ID. Protegido por el middleware `esAutentico`.

Estas rutas están diseñadas para realizar operaciones CRUD sobre certificados, con seguridad y validaciones necesarias.
*/

routesCertificados.get('/certificados_lista', esAutentico, certificados_lista)
routesCertificados.get('/:id', esAutentico, certificado_porid)
routesCertificados.get('/listar/:email', certificado_porEmail)
routesCertificados.get('/imprimir/:codigo', certificado_porCodigo)
routesCertificados.post('/crear_certificado', esAutentico, validarSchemmaGenerico(certificadoSchema), crear_certificado)
routesCertificados.put('/editar_certificado/:id', esAutentico, validarSchemmaGenerico(certificadoSchema), editar_certificado)
routesCertificados.delete('/eliminar_certificado/:id', esAutentico, eliminar_certificado)

export default routesCertificados
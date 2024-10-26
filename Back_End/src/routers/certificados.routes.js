import {
    Router
} from "express"
import {
    certificados_lista,
    certificado_porid,
    certificado_porEmail,
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

const routesCertificados = Router()

routesCertificados.get('/certificados_lista', certificados_lista)
routesCertificados.get('/:id', certificado_porid)
routesCertificados.get('/descarga/:email', certificado_porEmail)
routesCertificados.post('/crear_certificado', validarSchemmaGenerico(certificadoSchema), crear_certificado)
routesCertificados.put('/editar_certificado/:id', validarSchemmaGenerico(certificadoSchema), editar_certificado)
routesCertificados.delete('/eliminar_certificado/:id', eliminar_certificado)

export default routesCertificados
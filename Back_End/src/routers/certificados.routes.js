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

routesCertificados.get('/certificados_lista', esAutentico, certificados_lista)
routesCertificados.get('/:id', esAutentico, certificado_porid)
routesCertificados.get('/listar/:email', certificado_porEmail)
routesCertificados.get('/imprimir/:codigo', certificado_porCodigo)
routesCertificados.post('/crear_certificado', esAutentico, validarSchemmaGenerico(certificadoSchema), crear_certificado)
routesCertificados.put('/editar_certificado/:id', esAutentico, validarSchemmaGenerico(certificadoSchema), editar_certificado)
routesCertificados.delete('/eliminar_certificado/:id', esAutentico, eliminar_certificado)

export default routesCertificados
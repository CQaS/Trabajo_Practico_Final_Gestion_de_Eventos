import {
    obtenerCertificados,
    obteneCertificadoPorId,
    obteneCertificadoPorEmail,
    guardarCertificado,
    eliminarCertificado
} from '../querys/certificados.querys.js'

import {
    obteneRegistroPorId
} from '../querys/registros.querys.js'

export const certificados_lista = async (req, res) => {
    try {
        const _obtenerCertificados = await obtenerCertificados()
        console.log(_obtenerCertificados)
        console.log(_obtenerCertificados.length)
        res.json({
            ok: _obtenerCertificados
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const certificado_porid = async (req, res) => {

    try {
        const id = req.params.id
        let C = null

        let _certificadoPorId = await obteneCertificadoPorId(id)
        _certificadoPorId != null ? C = {
            ok: _certificadoPorId
        } : C = {
            Error: 'certificado no encontrado!'
        }
        res.json(C)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const certificado_porEmail = async (req, res) => {

    try {
        const email = req.params.email
        let Des = null

        let _certificadoPorEmail = await obteneCertificadoPorEmail(email)
        _certificadoPorEmail.length > 0 ? res.status(200).json(_certificadoPorEmail) : res.status(401).json({
            Error: 'Sin Certificaados'
        })


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const crear_certificado = async (req, res) => {

    /* {
  "registro_id": 1,
  "url_certificado": "http://ejemplo.com",
}
 */


    try {
        const {
            registro_id
        } = req.body

        const existeRegistro = await obteneRegistroPorId(registro_id)

        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${registro_id}`
            })
        }

        const CertificadoGuardado = await guardarCertificado(0, req.body)

        if (CertificadoGuardado.ok) {

            return res.status(200).json(CertificadoGuardado)
        }

        if (CertificadoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Certificado!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const editar_certificado = async (req, res) => {
    try {
        const id = req.params.id
        const {
            registro_id
        } = req.body


        let _certificadoPorId = await obteneCertificadoPorId(id)
        if (_certificadoPorId == null) {
            return res.status(404).json({
                Error: `certificado: ${id} no encontrado!`
            })
        }

        const existeRegistro = await obteneRegistroPorId(registro_id)

        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${registro_id}`
            })
        }

        const CertificadoGuardado = await guardarCertificado(id, req.body)

        if (CertificadoGuardado.ok) {

            return res.status(200).json(CertificadoGuardado)
        }

        if (CertificadoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Certificado!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const eliminar_certificado = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarCertificado(id)
        if (resultado.Error) {
            return res.status(404).json({
                Error: resultado.Error
            })
        }

        res.status(200).json(resultado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}
import {
    obtenerRegistros,
    obtenerRegistrosAsistentes,
    obteneRegistroPorId,
    guardarRegistroAsistencia,
    eliminarRegistroAsistencia,
    verificarExistenciaDeRegistro
} from '../querys/registros.querys.js'
import {
    obtenerUsuarioPorId
} from '../querys/usuarios.querys.js'
import {
    obteneEventoPorId
} from '../querys/eventos.querys.js'
import {
    guardarCertificado
} from '../querys/certificados.querys.js'

import {
    generarHTML_CodigoAleatorio
} from '../lib/generarPlantillaHTML.codigoURL.js'

export const registroAsistencia_lista = async (req, res) => {
    try {
        const _obtenerRegistroAsistencia = await obtenerRegistros()
        console.log(_obtenerRegistroAsistencia)
        console.log(_obtenerRegistroAsistencia.length)
        res.json({
            ok: _obtenerRegistroAsistencia
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const listarUsuariosAsistentes = async (req, res) => {
    try {
        const eventoid = req.params.eventoid

        const _listarUsuariosAsistentes = await obtenerRegistrosAsistentes(eventoid)
        console.log(_listarUsuariosAsistentes)
        console.log(_listarUsuariosAsistentes.length)
        res.json({
            ok: _listarUsuariosAsistentes
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const registroAsistencia_porid = async (req, res) => {

    try {
        const id = req.params.id
        let A = null

        let _registroAsistenciaPorId = await obteneRegistroPorId(id)
        _registroAsistenciaPorId != null ? A = {
            ok: _registroAsistenciaPorId
        } : A = {
            Error: 'Registro de Asistencia no encontrado!'
        }
        res.json(A)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const crear_registroAsistencia = async (req, res) => {

    /* {
  "evento_id" : 7, 
  "usuario_id" : 5,
}
 */


    try {
        const {
            evento_id,
            usuario_id
        } = req.body

        const existeUsuario = await obtenerUsuarioPorId(usuario_id)
        if (existeUsuario == null) {
            return res.status(404).json({
                Error: `Usuario no existe: ${usuario_id}`
            })
        }

        const _eventoPorId = await obteneEventoPorId(evento_id)
        if (_eventoPorId == null) {
            return res.status(404).json({
                Error: `Evento: ${evento_id} no encontrado!`
            })
        }

        let existenciaDeRegistro = await verificarExistenciaDeRegistro(evento_id, usuario_id)
        if (existenciaDeRegistro != null) {
            return res.status(409).json({
                Error: `El Usuario: ${existeUsuario.nombre_usuario}, ya se encuentra registrado en el Evento: ${_eventoPorId.nombre_evento}!`
            })
        }

        const registroAsistenciaGuardado = await guardarRegistroAsistencia(0, req.body)

        if (registroAsistenciaGuardado.ok) {

            return res.status(200).json(registroAsistenciaGuardado)
        }

        if (registroAsistenciaGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Registro de Asistencia!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const editar_registroAsistencia = async (req, res) => {

    try {
        const id = req.params.id
        const {
            evento_id,
            usuario_id
        } = req.body

        const existeRegistro = await obteneRegistroPorId(id)
        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${id}`
            })
        }

        let _usuarioPorId = await obtenerUsuarioPorId(usuario_id)
        if (_usuarioPorId == null) {
            return res.status(404).json({
                Error: `Usuario: ${usuario_id} no encontrado!`
            })
        }

        let _eventoPorId = await obteneEventoPorId(evento_id)
        if (_eventoPorId == null) {
            return res.status(404).json({
                Error: `Evento: ${evento_id} no encontrado!`
            })
        }


        const _registroAsistenciaGuardado = await guardarRegistroAsistencia(id, req.body)

        if (_registroAsistenciaGuardado.ok && _registroAsistenciaGuardado.asistio) {

            const datosCertificado = {
                nombreCompleto: _usuarioPorId.nombre_usuario,
                nombreEvento: _eventoPorId.nombre_evento,
                fechaEvento: _eventoPorId.fecha_evento,
                lugarEvento: _eventoPorId.ubicacion_evento,
                fechaEmision: new Date().toISOString().split('T')[0],
            }

            const URL_GCA = await generarHTML_CodigoAleatorio(datosCertificado)

            if (!URL_GCA) {
                _registroAsistenciaGuardado.transaction ? _registroAsistenciaGuardado.transaction.rollback() : null
                return res.status(404).json({
                    Error: 'Error Inesperado!!'
                })
            }

            const dataCertificado = {
                "registro_id": id,
                "url_certificado": URL_GCA,
            }

            _registroAsistenciaGuardado.transaction ? _registroAsistenciaGuardado.transaction.commit() : null
            const CertificadoGuardado = await guardarCertificado(0, dataCertificado)

            if (CertificadoGuardado.ok) {

                _registroAsistenciaGuardado.transaction = 'commit'

                return res.status(200).json({
                    ok: {
                        Registro: _registroAsistenciaGuardado,
                        Certificado: CertificadoGuardado
                    }
                })
            }

            if (CertificadoGuardado.Error) {

                _registroAsistenciaGuardado.transaction ? _registroAsistenciaGuardado.transaction.rollback() : null

                return res.status(404).json({
                    Error: 'Error al guardar el Certificado!'
                })
            }

        } else if (_registroAsistenciaGuardado.ok) {

            _registroAsistenciaGuardado.transaction ? _registroAsistenciaGuardado.transaction.commit() : null

            return res.status(200).json(_registroAsistenciaGuardado)

        }

        if (_registroAsistenciaGuardado.Error) {

            _registroAsistenciaGuardado.transaction ? _registroAsistenciaGuardado.transaction.rollback() : null

            return res.status(404).json({
                Error: 'Error al guardar el Registro de Asistencia!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const eliminar_registroAsistencia = async (req, res) => {

    try {
        const id = req.params.id
        const resultado = await eliminarRegistroAsistencia(id)
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
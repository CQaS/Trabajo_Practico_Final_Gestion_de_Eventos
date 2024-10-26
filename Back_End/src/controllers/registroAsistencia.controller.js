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

export const registroAsistencia_lista = async (req, res) => {
    try {
        const _obtenerRegistroAsistencia = await obtenerRegistros()
        console.log(_obtenerRegistroAsistencia)
        console.log(_obtenerRegistroAsistencia.length)
        res.json(_obtenerRegistroAsistencia)

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
        res.json(_listarUsuariosAsistentes)

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

        let _registroAsistenciaPorId = await obteneRegistroPorId(id)
        _registroAsistenciaPorId != null ? console.log(_registroAsistenciaPorId) : _registroAsistenciaPorId = {
            Error: 'Registro de Asistencia no encontrado!'
        }
        res.json(_registroAsistenciaPorId)

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

        const existeRegistro = await obteneRegistroPorId(id)

        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${id}`
            })
        }

        const _registroAsistenciaGuardado = await guardarRegistroAsistencia(id, req.body)

        if (_registroAsistenciaGuardado.ok) {

            return res.status(200).json(_registroAsistenciaGuardado)
        }

        if (_registroAsistenciaGuardado.Error) {

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
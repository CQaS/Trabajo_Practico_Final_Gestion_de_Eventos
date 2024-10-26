import {
    obtenerEventos,
    obteneEventoPorId,
    guardarEvento,
    eliminarEvento
} from '../querys/eventos.querys.js'

export const eventos_lista = async (req, res) => {
    try {
        const _obtenerEventos = await obtenerEventos()
        console.log(_obtenerEventos)
        console.log(_obtenerEventos.length)
        res.json(_obtenerEventos)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const evento_porid = async (req, res) => {

    try {
        const id = req.params.id

        let _eventoPorId = await obteneEventoPorId(id)
        _eventoPorId != null ? console.log(_eventoPorId) : _eventoPorId = {
            Error: 'Evento no encontrado!'
        }
        res.json(_eventoPorId)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const crear_evento = async (req, res) => {

    /* {
  "nombre_evento" : "aha", 
  "fecha_evento" : "2020", 
  "ubicacion_evento" : "aha", 
  "descripcion_evento" : "aha", 
  "organizador_id" : 6,
}
 */


    try {
        const {
            organizador_id
        } = req.body

        /* const existeRegistro = await obteneRegistroPorId(registro_id)

        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${registro_id}`
            })
        } */

        const EventoGuardado = await guardarEvento(0, req.body)

        if (EventoGuardado.ok) {

            return res.status(200).json(EventoGuardado)
        }

        if (EventoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Evento!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const editar_evento = async (req, res) => {
    try {
        const id = req.params.id
        const {
            organizador_id
        } = req.body


        /* let _EventoPorId = await obteneEventoPorId(id)
        if (_EventoPorId == null) {
            return res.status(404).json({
                Error: `Evento: ${id} no encontrado!`
            })
        } */

        const EventoGuardado = await guardarEvento(id, req.body)

        if (EventoGuardado.ok) {

            return res.status(200).json(EventoGuardado)
        }

        if (EventoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Evento!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const eliminar_evento = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarEvento(id)
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
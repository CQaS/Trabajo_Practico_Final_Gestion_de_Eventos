import {
    obtenerEventos,
    obtenerEventosProximos,
    obteneEventoPorId,
    guardarEvento,
    eliminarEvento
} from '../querys/eventos.querys.js'

import {
    obteneOrganizadorPorId
} from '../querys/organizadores.querys.js'

/* Función asíncrona que maneja la solicitud para obtener la lista de eventos.
   - Intenta obtener los eventos a través de la función `obtenerEventos`.
   - Si tiene éxito, imprime los eventos y su longitud en la consola, y devuelve los eventos en formato JSON.
   - Si ocurre un error, captura la excepción, muestra el error en la consola y responde con un mensaje de error 500 (internal server error). */

export const eventos_lista = async (req, res) => {
    try {
        const _obtenerEventos = await obtenerEventos()
        console.log(_obtenerEventos)
        console.log(_obtenerEventos.length)
        /* res.json({
            ok: _obtenerEventos
        }) */
        res.json(_obtenerEventos)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* Función asíncrona que maneja la solicitud para obtener la lista de eventos próximos.
   - Intenta obtener los eventos próximos a través de la función `obtenerEventosProximos`.
   - Si tiene éxito, imprime los eventos y su longitud en la consola, y devuelve los eventos próximos en formato JSON.
   - Si ocurre un error, captura la excepción, muestra el error en la consola y responde con un mensaje de error 500 (internal server error). */

export const eventos_proximos = async (req, res) => {
    try {
        const _obtenerEventosProximos = await obtenerEventosProximos()
        console.log(_obtenerEventosProximos)
        console.log(_obtenerEventosProximos.length)
        /* res.status(200).json({
            ok: _obtenerEventosProximos
        }) */
        res.json(_obtenerEventosProximos)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* Función asíncrona que maneja la solicitud para obtener un evento por su ID.
   - Obtiene el ID del evento desde los parámetros de la solicitud.
   - Intenta obtener el evento usando la función `obteneEventoPorId`.
   - Si el evento es encontrado, responde con un código de estado 200 y los datos del evento en formato JSON.
   - Si el evento no es encontrado, responde con un código de estado 404 y un mensaje de error.
   - Si ocurre un error durante la ejecución, captura la excepción, muestra el error en la consola y responde con un código de estado 500 (internal server error). */

export const evento_porid = async (req, res) => {

    try {
        const id = req.params.id
        let E = null

        let _eventoPorId = await obteneEventoPorId(id)
        _eventoPorId != null ? res.status(200).json(_eventoPorId) : res.status(404).json({
            Error: 'Algo fallo'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* Función asíncrona que maneja la solicitud para crear un nuevo evento.
   - Recibe los datos del evento desde el cuerpo de la solicitud (`req.body`).
   - Extrae el `organizador_id` y busca si el organizador existe en la base de datos usando la función `obteneOrganizadorPorId`.
   - Si el organizador no se encuentra, responde con un código de estado 404 y un mensaje de error.
   - Si el organizador es encontrado, intenta guardar el evento en la base de datos usando la función `guardarEvento`.
   - Si el evento se guarda correctamente, responde con un código de estado 200 y los datos del evento guardado.
   - Si ocurre un error al guardar el evento, responde con un código de estado 404 y un mensaje de error.
   - En caso de error en cualquier parte del proceso, captura la excepción, muestra el error en la consola y responde con un código de estado 500 (internal server error). */

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

        const _organizadorPorId = await obteneOrganizadorPorId(organizador_id)

        if (_organizadorPorId == null) {
            return res.status(404).json({
                Error: `Organizador no encontrado!: ${organizador_id}`
            })
        }

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

/* Función asíncrona que maneja la solicitud para editar un evento existente.
   - Obtiene el ID del evento desde los parámetros de la solicitud (`req.params.id`) y el `organizador_id` desde el cuerpo de la solicitud (`req.body`).
   - (Comentado) Intenta obtener el evento por ID usando la función `obteneEventoPorId`. Si el evento no es encontrado, responde con un código de estado 404 y un mensaje de error.
   - Llama a la función `guardarEvento` para guardar los cambios del evento con el ID proporcionado.
   - Si el evento se guarda correctamente, responde con un código de estado 200 y los datos del evento guardado.
   - Si ocurre un error al guardar el evento, responde con un código de estado 404 y un mensaje de error.
   - Si ocurre un error durante el proceso, captura la excepción, muestra el error en la consola y responde con un código de estado 500 (internal server error). */

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

/* Función asíncrona que maneja la solicitud para eliminar un evento.
   - Obtiene el ID del evento desde los parámetros de la solicitud (`req.params.id`).
   - Llama a la función `eliminarEvento` para eliminar el evento con el ID proporcionado.
   - Si ocurre un error al eliminar el evento (el resultado contiene un campo `Error`), responde con un código de estado 404 y el mensaje de error correspondiente.
   - Si la eliminación es exitosa, responde con un código de estado 200 y los datos del resultado de la eliminación.
   - Si ocurre un error durante el proceso, captura la excepción, muestra el error en la consola y responde con un código de estado 500 (internal server error). */

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
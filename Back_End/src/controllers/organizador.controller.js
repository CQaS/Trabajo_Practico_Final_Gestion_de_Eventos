import {
    obtenerOrganizadores,
    obteneOrganizadorPorId,
    guardarOrganizador,
    eliminarOrganizador
} from '../querys/organizadores.querys.js'

/* 
Controlador para obtener la lista de organizadores:
- Llama a la función `obtenerOrganizadores` para obtener todos los organizadores del sistema.
- Si la operación es exitosa, responde con un código de estado 200 y los datos de los organizadores obtenidos.
- Si ocurre un error durante la obtención de los datos, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la solicitud de la lista de organizadores en el sistema.
*/

export const organizadores_lista = async (req, res) => {
    try {
        const _obtenerOrganizadores = await obtenerOrganizadores()
        console.log(_obtenerOrganizadores)
        console.log(_obtenerOrganizadores.length)
        res.json({
            ok: _obtenerOrganizadores
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para obtener un organizador por su ID:
- Extrae el ID del organizador desde los parámetros de la solicitud (`req.params.id`).
- Llama a la función `obteneOrganizadorPorId` para obtener los datos del organizador con el ID proporcionado.
- Si el organizador es encontrado, responde con un código de estado 200 y los datos del organizador.
- Si el organizador no se encuentra, responde con un mensaje de error indicando que el organizador no fue encontrado.
- Si ocurre un error inesperado, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la obtención de un organizador por su ID.
*/

export const organizador_porid = async (req, res) => {

    try {
        const id = req.params.id
        let O = null

        let _organizadorPorId = await obteneOrganizadorPorId(id)
        _organizadorPorId != null ? O = {
            ok: _organizadorPorId
        } : O = {
            Error: 'Organizador no encontrado!'
        }
        res.json(O)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para crear un nuevo organizador:
- Recibe los datos del organizador a través del cuerpo de la solicitud (`req.body`).
- Llama a la función `guardarOrganizador` para guardar los datos del nuevo organizador en la base de datos.
- Si el organizador es guardado correctamente, responde con un código de estado 200 y los datos del organizador guardado.
- Si ocurre un error al guardar el organizador, responde con un código de estado 404 y un mensaje de error indicando que no se pudo guardar el organizador.
- Si ocurre un error inesperado durante el proceso, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la creación de un nuevo organizador en el sistema.
*/

export const crear_organizador = async (req, res) => {

    /* {
  "`nombre_organizador" : "aha", 
  "email_organizador" : "aha", 
  "tipo_organizador" : "aha", 
  "nombre_empresa" : "aha", 
  "nif_empresa" : "aha",
}
 */

    try {

        const organizadorGuardado = await guardarOrganizador(0, req.body)

        if (organizadorGuardado.ok) {

            return res.status(200).json(organizadorGuardado)
        }

        if (organizadorGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el organizador!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para editar un organizador existente:
- Recibe el `id` del organizador desde los parámetros de la solicitud (`req.params.id`).
- Verifica si el organizador con el `id` proporcionado existe en la base de datos llamando a la función `obteneOrganizadorPorId`.
  - Si no se encuentra el organizador, responde con un código de estado 404 y un mensaje de error indicando que el organizador no fue encontrado.
- Si el organizador existe, llama a la función `guardarOrganizador` para actualizar los datos del organizador con la nueva información proporcionada en `req.body`.
- Si la actualización es exitosa, responde con un código de estado 200 y los datos del organizador actualizado.
- Si ocurre un error al guardar el organizador, responde con un código de estado 404 y un mensaje de error indicando que no se pudo guardar el organizador.
- Si ocurre un error inesperado durante el proceso, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la actualización de un organizador existente en el sistema.
*/

export const editar_organizador = async (req, res) => {
    try {
        const id = req.params.id

        let _organizadorPorId = await obteneOrganizadorPorId(id)
        if (_organizadorPorId == null) {
            return res.status(404).json({
                Error: `organizador: ${id} no encontrado!`
            })
        }

        const organizadorGuardado = await guardarOrganizador(id, req.body)

        if (organizadorGuardado.ok) {

            return res.status(200).json(organizadorGuardado)
        }

        if (organizadorGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el organizador!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para eliminar un organizador:
- Recibe el `id` del organizador desde los parámetros de la solicitud (`req.params.id`).
- Llama a la función `eliminarOrganizador` para intentar eliminar el organizador correspondiente en la base de datos.
  - Si ocurre un error al eliminar el organizador, responde con un código de estado 404 y un mensaje de error indicando que no se pudo eliminar el organizador.
- Si la eliminación es exitosa, responde con un código de estado 200 y los detalles del resultado de la eliminación.
- Si ocurre un error inesperado durante el proceso, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la eliminación de un organizador del sistema.
*/

export const eliminar_organizador = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarOrganizador(id)
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
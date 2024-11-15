import {
    obtenerOrganizadores,
    obteneOrganizadorPorId,
    guardarOrganizador,
    eliminarOrganizador
} from '../querys/organizadores.querys.js'

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
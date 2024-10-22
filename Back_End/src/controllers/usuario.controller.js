import {
    obtenerUsuarios,
    guardarUsuario,
    obtenerUsuarioPorId,
    eliminarUsuario,
    consultarDni,
    consultarEmail
} from '../querys/usuarios.querys.js'

export const usuarios_lista = async (req, res) => {
    try {
        const _obtenerUsuarios = await obtenerUsuarios()
        console.log(_obtenerUsuarios)
        console.log(_obtenerUsuarios.length)
        res.json(_obtenerUsuarios)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const crear_usuario = async (req, res) => {

    /* {
  "nombre_usuario": "Juan Pérez",
  "email_usuario": "juan.perez@example.com",
  "telefono_usuario": 3124567890,
  "direccion_usuario": "Calle Falsa 123, Ciudad XYZ",
  "sexo_usuario": "Masculino",
  "dni_usuario": "12345678"
}
 */


    try {
        const {
            email_usuario,
            dni_usuario
        } = req.body

        const existeDNI = await consultarDni(dni_usuario)
        console.log(existeDNI)

        if (existeDNI != null) {
            return res.status(404).json({
                Error: `DNI ya existe: ${dni_usuario}`
            })
        }

        const existeEmail = await consultarEmail(email_usuario)

        if (existeEmail != null) {
            return res.status(404).json({
                Error: `Email ya existe: ${email_usuario}`
            })
        }

        const UsuarioGuardado = await guardarUsuario(0, req.body)

        if (UsuarioGuardado.ok) {

            return res.status(200).json(UsuarioGuardado)
        }

        if (UsuarioGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Usuario!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const editar_cliente = async (req, res) => {
    try {
        const id = req.params.id
        const {
            dni_cliente,
            rg_cliente,
            email_cliente
        } = req.body

        const el_cliente = await consultarCliente(id)
        if (el_cliente == null) {
            return res.status(404).json({
                Error: "Cliente no encontrado"
            })
        }

        if (dni_cliente != el_cliente.dni_cliente) {
            const existeDNI = await consultarDni(dni_cliente)
            console.log(existeDNI)

            if (existeDNI.length > 0) {
                return res.status(404).json({
                    Error: `DNI ya existe: ${dni_cliente}`
                })
            }
        }

        if (rg_cliente != el_cliente.rg_cliente) {
            const existeRG = await consultarRG(rg_cliente)

            if (existeRG.length > 0) {
                return res.status(404).json({
                    Error: `RG ya existe: ${rg_cliente}`
                })
            }
        }

        if (email_cliente != el_cliente.email_cliente) {
            const existeEmail = await consultarEmail(email_cliente)

            if (existeEmail.length > 0) {
                return res.status(404).json({
                    Error: `Email ya existe: ${email_cliente}`
                })
            }
        }

        const ClienteGuardado = await guardarCliente(id, req.body)

        if (ClienteGuardado.ok) {

            return res.status(200).json(ClienteGuardado)
        }

        if (ClienteGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Cliente!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const eliminar_cliente = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarCliente(id)
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
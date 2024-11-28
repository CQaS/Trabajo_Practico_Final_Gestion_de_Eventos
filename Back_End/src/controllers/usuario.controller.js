import {
    obtenerUsuarios,
    guardarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarioPorDni,
    eliminarUsuario,
    consultarDni,
    consultarEmail
} from '../querys/usuarios.querys.js'

export const usuarios_lista = async (req, res) => {
    try {
        const _obtenerUsuarios = await obtenerUsuarios()
        console.log(_obtenerUsuarios)
        console.log(_obtenerUsuarios.length)
        res.status(200).json({
            ok: _obtenerUsuarios
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const usuario_porid = async (req, res) => {

    try {
        const id = req.params.id
        let U = null

        let _usuarioPorId = await obtenerUsuarioPorId(id)
        _usuarioPorId != null ? U = {
            ok: _usuarioPorId
        } : U = {
            Error: 'Usuario no encontrado!'
        }
        res.json(U)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const usuario_porDni = async (req, res) => {

    try {
        const dni = req.params.dni
        let U = null

        let _usuarioPordni = await obtenerUsuarioPorDni(dni)
        _usuarioPordni != null ? U = _usuarioPordni : U = {
            Error: `Usuario con DNI ${dni} no encontrado!`
        }
        res.json(U)

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

export const editar_usuario = async (req, res) => {
    try {
        const id = req.params.id
        const {
            email_usuario,
            dni_usuario
        } = req.body


        let _usuarioPorId = await obtenerUsuarioPorId(id)
        if (_usuarioPorId == null) {
            return res.status(404).json({
                Error: `Usuario: ${id} no encontrado!`
            })
        }

        if (dni_usuario != _usuarioPorId.dni_usuario) {
            const existeDNI = await consultarDni(dni_usuario)
            console.log(existeDNI)

            if (existeDNI != null) {
                return res.status(404).json({
                    Error: `DNI ya existe: ${dni_usuario}`
                })
            }
        }

        if (email_usuario != _usuarioPorId.email_usuario) {
            const existeEmail = await consultarEmail(email_usuario)

            if (existeEmail != null) {
                return res.status(404).json({
                    Error: `Email ya existe: ${email_usuario}`
                })
            }
        }

        const UsuarioGuardado = await guardarUsuario(id, req.body)

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

export const eliminar_usuario = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarUsuario(id)
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
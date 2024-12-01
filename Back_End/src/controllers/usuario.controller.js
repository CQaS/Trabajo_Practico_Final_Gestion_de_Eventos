import {
    obtenerUsuarios,
    guardarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarioPorDni,
    eliminarUsuario,
    consultarDni,
    consultarEmail
} from '../querys/usuarios.querys.js'

/* 
Controlador para obtener la lista de usuarios:
- Intenta obtener los usuarios mediante la función `obtenerUsuarios()`.
- Si la operación es exitosa, responde con un código de estado 200 y los usuarios obtenidos en formato JSON.
- Si ocurre un error durante la operación, se captura y responde con un código de estado 500 y un mensaje de error genérico.

Este controlador se encarga de gestionar la solicitud para obtener la lista de usuarios y manejar posibles errores.
*/

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

/* 
Controlador para obtener un usuario por su ID:
- Extrae el ID del usuario desde los parámetros de la solicitud (`req.params.id`).
- Llama a la función `obtenerUsuarioPorId` para obtener los detalles del usuario.
- Si el usuario es encontrado, responde con el usuario en formato JSON con la clave `ok`.
- Si no se encuentra el usuario, responde con un mensaje de error.
- Si ocurre un error durante la operación, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la solicitud para obtener un usuario específico por su ID.
*/

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

/* 
Controlador para obtener un usuario por su DNI:
- Extrae el DNI del usuario desde los parámetros de la solicitud (`req.params.dni`).
- Llama a la función `obtenerUsuarioPorDni` para obtener los detalles del usuario.
- Si el usuario es encontrado, responde con los datos del usuario en formato JSON.
- Si no se encuentra el usuario, responde con un mensaje de error indicando que no se encontró el usuario con el DNI proporcionado.
- Si ocurre un error durante la operación, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la solicitud para obtener un usuario específico por su DNI.
*/

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

/* 
Controlador para crear un nuevo usuario:
- Extrae los datos necesarios del cuerpo de la solicitud (`email_usuario` y `dni_usuario`).
- Verifica si el DNI del usuario ya existe llamando a la función `consultarDni`. Si el DNI ya está registrado, responde con un error 404.
- Verifica si el email del usuario ya existe llamando a la función `consultarEmail`. Si el email ya está registrado, responde con un error 404.
- Si ambos el DNI y el email son válidos, guarda el usuario llamando a la función `guardarUsuario`.
- Si el usuario es guardado exitosamente, responde con un código de estado 200 y los datos del usuario guardado.
- Si ocurre un error al guardar el usuario, responde con un error 404.
- Si ocurre un error inesperado, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la lógica de creación de un usuario y la verificación de duplicados en el sistema.
*/

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

/* 
Controlador para editar los datos de un usuario existente:
- Extrae el ID del usuario desde los parámetros de la solicitud (`req.params.id`) y los datos del cuerpo de la solicitud (`email_usuario`, `dni_usuario`).
- Verifica si el usuario con el ID proporcionado existe llamando a `obtenerUsuarioPorId`. Si no se encuentra, responde con un error 404.
- Si el DNI o el email han cambiado, verifica que no existan en otros usuarios mediante las funciones `consultarDni` y `consultarEmail`. Si alguno de estos ya está registrado, responde con un error 404.
- Si no hay conflictos, guarda los nuevos datos del usuario llamando a `guardarUsuario`.
- Si el usuario se guarda exitosamente, responde con un código de estado 200 y los datos del usuario actualizado.
- Si ocurre un error al guardar el usuario, responde con un error 404.
- Si ocurre un error inesperado, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador gestiona la actualización de los datos de un usuario y valida que no haya duplicados en el sistema.
*/

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

/* 
Controlador para eliminar un usuario:
- Extrae el ID del usuario desde los parámetros de la solicitud (`req.params.id`).
- Llama a la función `eliminarUsuario` para eliminar el usuario con el ID proporcionado.
- Si ocurre un error durante la eliminación (por ejemplo, el usuario no existe), responde con un error 404.
- Si la eliminación es exitosa, responde con un código de estado 200 y el resultado de la eliminación.
- Si ocurre un error inesperado, responde con un código de estado 500 y un mensaje de error genérico.

Este controlador maneja la eliminación de un usuario del sistema.
*/

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
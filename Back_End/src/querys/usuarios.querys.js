import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    Usuarios
} from '../models/asociacion.js'

/* 
Función para obtener todos los usuarios de la base de datos:
- Utiliza la función findAll de Sequelize para recuperar todos los registros de la tabla Usuarios.
- Si la operación es exitosa, devuelve la lista de usuarios obtenidos.
- En caso de error durante la consulta (por ejemplo, problemas de conexión a la base de datos), captura la excepción y lanza un nuevo error con un mensaje descriptivo que incluye el mensaje del error original.

Esta función está diseñada para facilitar la recuperación de todos los usuarios almacenados en la base de datos, gestionando errores de manera efectiva y proporcionando información clara sobre cualquier problema que pueda ocurrir.
*/
const obtenerUsuarios = async () => {
    try {
        const usuarios = await Usuarios.findAll()
        return usuarios
    } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message)
    }
}

/* 
Función para obtener un usuario por su ID:
- Utiliza el modelo `Usuarios` para realizar la búsqueda del usuario en la base de datos usando el método `findByPk`.
- Si la búsqueda tiene éxito, devuelve el usuario encontrado.
- En caso de error (por ejemplo, si la consulta a la base de datos falla), captura la excepción y lanza un nuevo error con un mensaje detallado sobre el fallo.

Esta función es útil para obtener un usuario específico por su ID y maneja adecuadamente los errores que puedan surgir durante el proceso de consulta.
*/


const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await Usuarios.findByPk(id)
        return usuario
    } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message)
    }
}

/* 
Función para obtener un usuario por su DNI:
- Recibe un parámetro dni, que es el número de documento de identidad del usuario que se desea buscar.
- Utiliza la función findOne de Sequelize para buscar un registro en la tabla Usuarios donde el campo dni_usuario coincide con el valor proporcionado.
- Si la búsqueda es exitosa, devuelve el usuario encontrado (o null si no existe).
- En caso de error durante la consulta (por ejemplo, problemas de conexión a la base de datos), captura la excepción y lanza un nuevo error con un mensaje descriptivo que incluye el mensaje del error original.

Esta función está diseñada para facilitar la búsqueda de un usuario específico en la base de datos utilizando su DNI, gestionando errores de manera efectiva y proporcionando información clara sobre cualquier problema que pueda ocurrir.
*/
const obtenerUsuarioPorDni = async (dni) => {
    try {
        const usuario = await Usuarios.findOne({
            where: {
                dni_usuario: dni
            }
        })
        return usuario
    } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message)
    }
}

/* Función asíncrona que guarda o actualiza un usuario en la base de datos.
   - Si el `id` es 0, crea un nuevo usuario en la base de datos utilizando el método `create` del modelo `Usuarios`.
   - Si el `id` es diferente de 0, actualiza los datos de un usuario existente utilizando el método `update` del modelo `Usuarios`.
   - Si no se realiza ninguna actualización, informa que los datos del usuario son los mismos.
   - Si ocurre un error de validación, clave foránea, base de datos o restricción única, captura y maneja el error apropiadamente, respondiendo con el error específico.
   - Si ocurre un error inesperado, lanza un nuevo error con un mensaje personalizado. */

const guardarUsuario = async (id, datosUsuario) => {

    try {
        if (id == 0) {

            const nuevoUsuario = await Usuarios.create(datosUsuario)
            console.log('Usuario guardado:', nuevoUsuario)
            return {
                ok: 'Usuario creado existosamente!',
                data: nuevoUsuario,
                id_usuario_nuevo: nuevoUsuario.id_usuario
            }

        } else {

            console.log('Usuario A guardar:', datosUsuario)

            const [actualizacion] = await Usuarios.update(datosUsuario, {
                where: {
                    id_usuario: id
                }
            })

            if (actualizacion === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Usuario son los mismos!",
                    data: datosUsuario
                }
            }

            return {
                ok: "Usuario actualizado exitosamente!",
                data: datosUsuario
            }
        }

    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            console.error('Error de validación:', error.errors)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Error de clave foránea:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('Error de base de datos:', error)
            return {
                Error: error
            }
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error de restricción única:', error)
            return {
                Error: error
            }
        } else {
            console.error('Error al crear/editar el usuario:', error)
            throw new Error('Error al crear/editar el usuario: ' + error.message)
        }
    }
}

/* 
Función para eliminar un usuario de la base de datos:
- Recibe un parámetro id, que es el identificador del usuario que se desea eliminar.
- Utiliza la función findByPk de Sequelize para buscar el usuario correspondiente en la base de datos.
- Si no se encuentra el usuario, devuelve un objeto con una propiedad Error indicando que el usuario no fue encontrado.
- Si el usuario existe, llama al método destroy para eliminarlo de la base de datos.
- Devuelve un objeto indicando que la eliminación fue exitosa con un mensaje de confirmación.

En caso de error durante el proceso (por ejemplo, problemas de conexión a la base de datos), captura la excepción y devuelve un objeto con una propiedad Error que contiene un mensaje descriptivo del error.

Esta función está diseñada para manejar la eliminación de usuarios, proporcionando mensajes claros sobre el resultado de la operación y gestionando errores de manera efectiva.
*/
const eliminarUsuario = async (id) => {
    try {
        const usuario = await Usuarios.findByPk(id)
        if (!usuario) {
            return {
                Error: 'Usuario no encontrado'
            }
        }
        await usuario.destroy()
        return {
            ok: 'Usuario eliminado con Exito!'
        }
    } catch (error) {
        return {
            Error: 'Error al eliminar el usuario: ' + error.message
        }
    }
}

/* Función asíncrona que consulta si existe un usuario con un DNI específico.
   - Sincroniza el modelo `Usuarios` con la base de datos antes de realizar la consulta.
   - Utiliza el método `findOne` para buscar un usuario cuyo campo `dni_usuario` coincida con el `dni` proporcionado.
   - Si encuentra un usuario, lo retorna; si no, retorna `null`. */

const consultarDni = async (dni) => {
    await Usuarios.sync()
    return await Usuarios.findOne({
        where: {
            dni_usuario: dni
        }
    })
}

const consultarEmail = async (email) => {
    await Usuarios.sync()
    return await Usuarios.findOne({
        where: {
            email_usuario: email
        }
    })
}

export {
    obtenerUsuarios,
    guardarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarioPorDni,
    eliminarUsuario,
    consultarDni,
    consultarEmail
}
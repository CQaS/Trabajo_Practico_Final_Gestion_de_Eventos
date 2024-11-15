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

const obtenerUsuarios = async () => {
    try {
        const usuarios = await Usuarios.findAll()
        return usuarios
    } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message)
    }
}

const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await Usuarios.findByPk(id)
        return usuario
    } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message)
    }
}

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
    eliminarUsuario,
    consultarDni,
    consultarEmail
}
import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    RegistroAsistencia
} from '../models/asociacion.js'

const obtenerRegistros = async () => {
    try {
        const _registroAsistencia = await RegistroAsistencia.findAll()
        return _registroAsistencia
    } catch (error) {
        throw new Error('Error al obtener los Registro de Asistencia: ' + error.message)
    }
}

const obteneRegistroPorId = async (id) => {
    try {
        const _registroAsistencia = await RegistroAsistencia.findByPk(id)
        return _registroAsistencia
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el Registro de Asistencia: ' + error.message)
    }
}

const guardarRegistroAsistencia = async (id, nuevoRegistro) => {

    try {
        if (id == 0) {

            const _registroAsistencia = await RegistroAsistencia.create(nuevoRegistro)
            console.log('Registro de Asistencia guardado:', _registroAsistencia)
            return {
                ok: 'Registro de Asistencia creado existosamente!',
                data: _registroAsistencia,
                id_registroAsistencia_nuevo: _registroAsistencia.id_registro
            }

        } else {

            console.log('Registro de Asistencia A guardar:', nuevoRegistro)

            const [actualizacion] = await RegistroAsistencia.update(nuevoRegistro, {
                where: {
                    id_registro: id
                }
            })

            if (actualizacion === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Registro de Asistencia son los mismos!",
                    data: nuevoRegistro
                }
            }

            return {
                ok: "Registro de Asistencia actualizado exitosamente!",
                data: nuevoRegistro
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
            console.error('Error al crear el Registro de Asistencia:', error)
            throw new Error('Error al crear el Registro de Asistencia: ' + error.message)
        }
    }
}

const eliminarRegistroAsistencia = async (id) => {
    try {
        const _registroAsistencia = await RegistroAsistencia.findByPk(id)
        if (!_registroAsistencia) {
            return {
                Error: 'Registro de Asistencia no encontrado'
            }
        }
        await RegistroAsistencia.destroy()
        return {
            ok: 'Registro de Asistencia eliminado con Exito!'
        }
    } catch (error) {
        return {
            Error: 'Error al eliminar el Registro de Asistencia: ' + error.message
        }
    }
}

export {
    obtenerRegistros,
    obteneRegistroPorId,
    guardarRegistroAsistencia,
    eliminarRegistroAsistencia
}
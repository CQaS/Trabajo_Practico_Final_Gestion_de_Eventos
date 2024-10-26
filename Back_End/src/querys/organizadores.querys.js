import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    Organizador
} from '../models/asociacion.js'

const obtenerOrganizadores = async () => {
    try {
        const _organizador = await Organizador.findAll()
        return _organizador
    } catch (error) {
        throw new Error('Error al obtener los organizador: ' + error.message)
    }
}

const obteneOrganizadorPorId = async (id) => {
    try {
        const _organizador = await Organizador.findByPk(id)
        return _organizador
    } catch (error) {
        throw new Error('Error al obtener el Organizador: ' + error.message)
    }
}

const guardarOrganizador = async (id, datosOrganizador) => {

    try {
        if (id == 0) {

            const nuevoOrganizador = await Organizador.create(datosOrganizador)
            console.log('Organizador guardado:', nuevoOrganizador)
            return {
                ok: 'Organizador creado existosamente!',
                data: nuevoOrganizador,
                id_organizador_nuevo: nuevoOrganizador.id_organizador
            }

        } else {

            console.log('Organizador A guardar:', datosOrganizador)

            const [actualizacion] = await Organizador.update(datosOrganizador, {
                where: {
                    id_organizador: id
                }
            })

            if (actualizacion === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Organizador son los mismos!",
                    data: datosOrganizador
                }
            }

            return {
                ok: "Organizador actualizado exitosamente!",
                data: datosOrganizador
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
            console.error('Error al crear el Organizador:', error)
            throw new Error('Error al crear el Organizador: ' + error.message)
        }
    }
}

const eliminarOrganizador = async (id) => {
    try {
        const _organizador = await Organizador.findByPk(id)
        if (!_organizador) {
            return {
                Error: 'Organizador no encontrado'
            }
        }
        await _organizador.destroy()
        return {
            ok: 'Organizador eliminado con Exito!'
        }
    } catch (error) {
        return {
            Error: 'Error al eliminar el Organizado: ' + error.message
        }
    }
}

export {
    obtenerOrganizadores,
    obteneOrganizadorPorId,
    guardarOrganizador,
    eliminarOrganizador,
}
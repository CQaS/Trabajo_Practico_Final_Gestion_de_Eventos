import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    Evento,
    RegistroAsistencia,
    Organizador
} from '../models/asociacion.js'

const obtenerEventos = async () => {
    try {
        const _evento = await Evento.findAll({
            include: [{
                model: Organizador,
                as: 'organizador', // Alias correcto
                required: true,
            }, ]
        })
        return _evento
    } catch (error) {
        throw new Error('Error al obtener los Evento: ' + error.message)
    }
}

const obtenerEventosProximos = async () => {

    try {
        const _evento = await Evento.findAll({
            where: {
                fecha_evento: {
                    [Op.gte]: new Date(),
                },
            },
            include: [{
                model: Organizador,
                as: 'organizador', // Alias correcto
                required: true,
            }, ],
            order: [
                ['fecha_evento', 'ASC']
            ],
        })

        return _evento

    } catch (error) {
        throw new Error('Error al obtener los Evento: ' + error.message)
    }
}

const obteneEventoPorId = async (id) => {
    try {
        const _evento = await Evento.findByPk(id)
        return _evento
    } catch (error) {
        throw new Error('Error al obtener el Evento: ' + error.message)
    }
}

const guardarEvento = async (id, datosEvento) => {

    try {
        if (id == 0) {

            const nuevoEvento = await Evento.create(datosEvento)
            console.log('Evento guardado:', nuevoEvento)
            return {
                ok: 'Evento creado existosamente!',
                data: nuevoEvento,
                id_Evento_nuevo: nuevoEvento.id_evento
            }

        } else {

            console.log('Evento A guardar:', datosEvento)

            const [actualizacion] = await Evento.update(datosEvento, {
                where: {
                    id_evento: id
                }
            })

            if (actualizacion === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Evento son los mismos!",
                    data: datosEvento
                }
            }

            return {
                ok: "Evento actualizado exitosamente!",
                data: datosEvento
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
            console.error('Error al crear el Evento:', error)
            throw new Error('Error al crear el Evento: ' + error.message)
        }
    }
}

const eliminarEvento = async (id) => {
    try {
        const _evento = await Evento.findByPk(id)
        if (!_evento) {
            return {
                Error: 'Evento no encontrado'
            }
        }

        const existeRegistroDeAsistencia = await RegistroAsistencia.findAll({
            where: {
                evento_id: id
            }
        })

        existeRegistroDeAsistencia.length > 0 ? console.log('Registro de Asistencia', existeRegistroDeAsistencia) : console.log('no Registro de Asistencia', existeRegistroDeAsistencia)

        await _evento.destroy()
        return {
            ok: 'Evento eliminado con Exito!'
        }
    } catch (error) {
        return {
            Error: 'Error al eliminar el Evento: ' + error.message
        }
    }
}

export {
    obtenerEventos,
    obtenerEventosProximos,
    obteneEventoPorId,
    guardarEvento,
    eliminarEvento,
}
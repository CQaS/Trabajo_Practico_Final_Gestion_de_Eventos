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

/* Función asíncrona que obtiene los eventos próximos desde la base de datos.
   - Utiliza el modelo `Evento` para realizar una consulta con una condición de que la fecha del evento sea mayor o igual a la fecha actual.
   - Incluye el modelo `Organizador` para obtener información relacionada con el organizador del evento.
   - Los eventos se ordenan por fecha de evento de manera ascendente.
   - Si la consulta es exitosa, devuelve la lista de eventos.
   - Si ocurre un error, lanza una excepción con el mensaje de error. */

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

/* Función asíncrona que obtiene un evento por su ID utilizando el método `findByPk` de Sequelize.
   - Intenta buscar el evento en la base de datos usando el ID proporcionado.
   - Si encuentra el evento, lo devuelve.
   - Si ocurre un error, lanza una excepción con el mensaje de error detallado. */

const obteneEventoPorId = async (id) => {
    try {
        const _evento = await Evento.findByPk(id)
        return _evento
    } catch (error) {
        throw new Error('Error al obtener el Evento: ' + error.message)
    }
}

/* Función asíncrona que maneja el proceso de guardar un evento en la base de datos.
   - Si el ID es 0, crea un nuevo evento utilizando los datos proporcionados en `datosEvento`.
   - Si el evento se guarda correctamente, responde con un mensaje de éxito, los datos del evento y el ID del nuevo evento.
   - Si el ID no es 0, intenta actualizar el evento existente con los nuevos datos.
   - Si no se realizan cambios (porque los datos del evento son los mismos), devuelve un mensaje indicando que no hubo cambios.
   - Si se actualiza correctamente, responde con un mensaje de éxito y los datos del evento actualizado.
   - En caso de error, maneja diferentes tipos de errores de Sequelize (validación, clave foránea, base de datos, restricción única) y responde con el mensaje de error correspondiente.
   - Si ocurre un error no específico, lanza una excepción con el mensaje de error detallado. */

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

/* Función asíncrona que maneja el proceso de eliminación de un evento.
   - Busca el evento en la base de datos utilizando el ID proporcionado con `Evento.findByPk`.
   - Si no se encuentra el evento, devuelve un objeto con un mensaje de error.
   - Verifica si existen registros de asistencia asociados al evento consultando la tabla `RegistroAsistencia` mediante `findAll` con el `evento_id`.
   - Si existen registros de asistencia, imprime un mensaje en la consola con los registros encontrados.
   - Si no hay registros de asistencia, imprime un mensaje indicando que no existen.
   - Si el evento es encontrado, procede a eliminarlo utilizando el método `destroy` de Sequelize.
   - Si la eliminación es exitosa, devuelve un mensaje de éxito.
   - En caso de error, captura la excepción y devuelve un mensaje de error con la descripción del problema. */

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
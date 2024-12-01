import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    Usuarios,
    RegistroAsistencia
} from '../models/asociacion.js'

/* Función asíncrona que obtiene todos los registros de asistencia de la base de datos.
   - Intenta obtener los registros utilizando el método `findAll` del modelo `RegistroAsistencia`.
   - Si tiene éxito, retorna los registros obtenidos.
   - Si ocurre un error, captura la excepción y lanza un nuevo error con un mensaje personalizado. */

const obtenerRegistros = async () => {
    try {
        const _registroAsistencia = await RegistroAsistencia.findAll()
        return _registroAsistencia
    } catch (error) {
        throw new Error('Error al obtener los Registro de Asistencia: ' + error.message)
    }
}

/* Función asíncrona que obtiene los registros de asistencia de los usuarios para un evento específico.
   - Recibe el `evento_id` como parámetro y utiliza el método `findAll` del modelo `RegistroAsistencia` para consultar los registros.
   - Filtra los registros por `evento_id` y incluye los datos relacionados de los usuarios a través de la relación definida en el modelo.
   - Ordena los resultados por el campo `asistio` en orden descendente.
   - Si tiene éxito, imprime los registros de los asistentes en la consola y retorna los registros obtenidos.
   - Si ocurre un error, captura la excepción y lanza un nuevo error con un mensaje personalizado. */

const obtenerRegistrosAsistentes = async (evento_id) => {

    try {
        const _registroAsistentes = await RegistroAsistencia.findAll({
            where: {
                evento_id: evento_id
            },
            include: [{
                model: Usuarios,
                as: 'usuarios'
            }],
            order: [
                ['asistio', 'DESC']
            ]
        })

        console.log('_registroAsistentes', _registroAsistentes)

        return _registroAsistentes

    } catch (error) {
        throw new Error('Error al obtener los Registro de Asistencia: ' + error.message)
    }
}

/* Función asíncrona que obtiene un registro de asistencia específico por su ID.
   - Utiliza el método `findByPk` del modelo `RegistroAsistencia` para obtener el registro correspondiente al `id`.
   - Si tiene éxito, retorna el registro de asistencia encontrado.
   - Si ocurre un error, captura la excepción, muestra el error en la consola y lanza un nuevo error con un mensaje personalizado. */

const obteneRegistroPorId = async (id) => {
    try {
        const _registroAsistencia = await RegistroAsistencia.findByPk(id)
        return _registroAsistencia
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el Registro de Asistencia: ' + error.message)
    }
}

/* Función asíncrona que verifica si un usuario ya está registrado en un evento específico.
   - Utiliza el método `findOne` del modelo `RegistroAsistencia` para buscar un registro con el `evento_id` y el `usuario_id` proporcionados.
   - Si encuentra un registro, lo retorna; si no, retorna `null`.
   - Si ocurre un error durante la consulta, captura la excepción, muestra el error en la consola y lanza un nuevo error con un mensaje personalizado. */

const verificarExistenciaDeRegistro = async (evento, usuario) => {

    try {
        const registroExistente = await RegistroAsistencia.findOne({
            where: {
                evento_id: evento,
                usuario_id: usuario,
            },
        })
        return registroExistente

    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el Registro de Asistencia: ' + error.message)
    }
}

/* Función asíncrona que guarda o actualiza un registro de asistencia en la base de datos.
   - Si el `id` es 0, crea un nuevo registro de asistencia utilizando el método `create` del modelo `RegistroAsistencia`.
   - Si el `id` es diferente de 0, actualiza el registro existente con el método `update` del modelo `RegistroAsistencia`.
   - Si el campo `asistio` es `true`, asigna la fecha actual como `fecha_confirmacion`.
   - Si no se realiza ninguna actualización, informa que los datos del registro de asistencia son los mismos.
   - Si ocurre un error de validación, clave foránea, base de datos o restricción única, captura y maneja el error apropiadamente, respondiendo con el error específico.
   - Si ocurre un error inesperado, lanza un nuevo error con un mensaje personalizado. */

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

            const T = await sequelize.transaction()

            if (nuevoRegistro.asistio) {
                let hoy = new Date().toISOString().split('T')[0]
                nuevoRegistro.fecha_confirmacion = hoy
            }

            const [actualizacion] = await RegistroAsistencia.update(nuevoRegistro, {
                where: {
                    id_registro: id
                }
            })

            if (actualizacion === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Registro de Asistencia son los mismos!",
                    data: nuevoRegistro,
                    asistio: nuevoRegistro.asistio
                }
            }

            return {
                ok: "Registro de Asistencia actualizado exitosamente!",
                data: nuevoRegistro,
                asistio: nuevoRegistro.asistio
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

/* 
Función para eliminar un registro de asistencia por su ID:
- Busca el registro de asistencia en la base de datos utilizando `findByPk`.
- Si no se encuentra el registro, retorna un objeto con un mensaje de error indicando que no fue encontrado.
- Si el registro existe, lo elimina utilizando el método `destroy` del modelo `RegistroAsistencia`.
- Retorna un objeto con un mensaje de éxito si la eliminación fue exitosa.
- En caso de error durante la operación, captura la excepción y devuelve un objeto con un mensaje de error detallado.

Esta función está diseñada para manejar la eliminación de registros de asistencia, asegurando un manejo claro de errores y resultados esperados.
*/

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
    obtenerRegistrosAsistentes,
    obteneRegistroPorId,
    guardarRegistroAsistencia,
    eliminarRegistroAsistencia,
    verificarExistenciaDeRegistro
}
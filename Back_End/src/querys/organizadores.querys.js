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

/* 
Función para obtener la lista de organizadores desde la base de datos:
- Intenta recuperar todos los organizadores usando el método `findAll` de Sequelize, que busca todos los registros en la tabla `Organizador`.
- Si la consulta es exitosa, retorna la lista de organizadores.
- Si ocurre un error durante la consulta, lanza una excepción con un mensaje detallado del error.

Esta función se usa para obtener todos los organizadores registrados en la base de datos.
*/

const obtenerOrganizadores = async () => {
    try {
        const _organizador = await Organizador.findAll()
        return _organizador
    } catch (error) {
        throw new Error('Error al obtener los organizador: ' + error.message)
    }
}

/* 
Función para obtener un organizador por su ID desde la base de datos:
- Intenta recuperar el organizador con el `id` proporcionado usando el método `findByPk` de Sequelize, que busca un registro por su clave primaria (PK).
- Si la consulta es exitosa, retorna el organizador correspondiente al ID.
- Si ocurre un error durante la consulta, lanza una excepción con un mensaje detallado del error.

Esta función se usa para obtener un organizador específico a partir de su ID.
*/

const obteneOrganizadorPorId = async (id) => {
    try {
        const _organizador = await Organizador.findByPk(id)
        return _organizador
    } catch (error) {
        throw new Error('Error al obtener el Organizador: ' + error.message)
    }
}

/*
Creación de un nuevo organizador(cuando id == 0):
Si el id proporcionado es 0, la función crea un nuevo organizador usando el método create de Sequelize.
Si la creación es exitosa, devuelve un objeto con un mensaje de éxito, los datos del nuevo organizador y el id del organizador recién creado.

Actualización de un organizador existente(cuando id != 0):
Si el id no es 0, la función intenta actualizar un organizador existente en la base de datos con los datos proporcionados.
Si la actualización no afecta ningún registro(es decir, si los datos del organizador no cambian), la función devuelve un mensaje indicando que no se realizaron cambios.
Si la actualización es exitosa, devuelve un mensaje de éxito junto con los datos del organizador actualizado.
Manejo de errores:

Si ocurre un error, la función evalúa el tipo de error y maneja diferentes casos:
SequelizeValidationError: Error relacionado con la validación de los datos.
SequelizeForeignKeyConstraintError: Error relacionado con una restricción de clave foránea.
SequelizeDatabaseError: Error general de base de datos.
SequelizeUniqueConstraintError: Error relacionado con restricciones de unicidad en los campos.
Si no es un error conocido, lanza un error general con el mensaje correspondiente.
 */
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

/* Función asíncrona para eliminar un organizador a partir de su ID. 
   Intenta encontrar al organizador en la base de datos usando el método `findByPk` con el ID proporcionado.
   Si no se encuentra el organizador, devuelve un mensaje de error. 
   Si se encuentra, lo elimina de la base de datos y retorna un mensaje de éxito.
   En caso de error, captura la excepción y devuelve un mensaje de error detallado. 
*/

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
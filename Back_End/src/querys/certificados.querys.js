import {
    Op,
    Sequelize as SequelizeLib
} from 'sequelize'

import SDM from "../db/sequelize_db.js"
const {
    sequelize
} = SDM

import {
    Certificados,
    RegistroAsistencia,
    Usuarios
} from '../models/asociacion.js'

/* 
Función para obtener la lista de certificados:
- Utiliza el modelo `Certificados` para recuperar todos los registros de la base de datos mediante el método `findAll`.
- Si la operación es exitosa, retorna la lista de certificados obtenida.
- Si ocurre un error durante la consulta, lanza una excepción con un mensaje detallado que describe el fallo.

Esta función está diseñada para centralizar la lógica de recuperación de certificados desde la base de datos, manejando errores de manera adecuada.
*/

const obtenerCertificados = async () => {
    try {
        const certificados = await Certificados.findAll()
        return certificados
    } catch (error) {
        throw new Error('Error al obtener los Certificados: ' + error.message)
    }
}

/* 
Función para obtener un certificado por su ID:
- Utiliza el método `findByPk` del modelo `Certificados` para buscar un certificado en la base de datos basado en su ID.
- Si la operación es exitosa, retorna el certificado encontrado o `null` si no existe un registro con el ID proporcionado.
- Si ocurre un error durante la consulta, lanza una excepción con un mensaje detallado que incluye la descripción del fallo.

Esta función abstrae la lógica de búsqueda por ID en la base de datos, garantizando un manejo adecuado de excepciones.
*/

const obteneCertificadoPorId = async (id) => {
    try {
        const Certificado = await Certificados.findByPk(id)
        return Certificado
    } catch (error) {
        throw new Error('Error al obtener el Certificado: ' + error.message)
    }
}

/* 
Función para obtener certificados por correo electrónico:
- Utiliza el método `findAll` del modelo `Certificados` para buscar certificados asociados a un correo electrónico específico.
- Realiza una consulta que incluye una relación con el modelo `RegistroAsistencia`, filtrando solo los registros donde `asistio` sea `true`.
- Luego, dentro de la relación `RegistroAsistencia`, busca los registros de `Usuarios` que coincidan con el correo electrónico proporcionado en el parámetro `email`.
- Solo recupera los atributos `id_certificado` y `url_certificado` de la tabla `Certificados`.
- Si la operación es exitosa, retorna los certificados encontrados.
- Si ocurre un error durante la consulta, lanza una excepción con un mensaje detallado que describe el fallo.

Esta función está diseñada para recuperar los certificados asociados a un correo electrónico dado, filtrando por aquellos registros de asistencia donde el usuario haya asistido al evento.
*/

const obteneCertificadoPorEmail = async (email) => {

    try {
        const _certificados = await Certificados.findAll({
            attributes: ['id_certificado', 'url_certificado'],
            include: [{
                model: RegistroAsistencia,
                as: 'registroAsistencia', // Alias correcto
                required: true,
                where: {
                    asistio: true
                },
                include: [{
                    model: Usuarios,
                    as: 'usuarios', // Alias correcto
                    required: true,
                    where: {
                        email_usuario: email
                    },
                }, ],
            }, ],
        })

        return _certificados

    } catch (error) {
        throw new Error('Error al obtener el Certificado: ' + error.message)
    }
}

/* 
Función para guardar un certificado en la base de datos:
- Recibe dos parámetros: id (que indica si es un nuevo certificado o uno existente) y datosCertificado (los datos del certificado a guardar).
- Si el id es 0, se considera que se está creando un nuevo certificado:
  - Llama a la función Certificados.create para guardar los datos en la base de datos.
  - Imprime en consola el certificado guardado y devuelve un objeto que indica que la creación fue exitosa, junto con los datos del nuevo certificado y su id.
- Si el id es diferente de 0, se intenta actualizar un certificado existente:
  - Imprime en consola los datos del certificado que se intentan guardar.
  - Llama a la función Certificados.update para actualizar los datos del certificado en la base de datos, utilizando el id proporcionado.
  - Si no se realizan cambios (actualizacion === 0), devuelve un mensaje indicando que los datos son los mismos.
  - Si la actualización es exitosa, devuelve un mensaje indicando que el certificado fue actualizado exitosamente.
- En caso de error durante el proceso:
  - Captura errores específicos de Sequelize (como validación, clave foránea, errores de base de datos y restricciones únicas) y registra el error correspondiente en la consola, devolviendo un objeto con el error.
  - Si se produce un error no manejado, lanza una nueva excepción con un mensaje genérico.

Esta función está diseñada para manejar tanto la creación como la actualización de certificados, proporcionando mensajes claros sobre el estado de las operaciones y gestionando errores específicos de manera efectiva.
*/

const guardarCertificado = async (id, datosCertificado) => {

    try {
        if (id == 0) {

            const nuevoCertificado = await Certificados.create(datosCertificado)
            console.log('Certificado guardado:', nuevoCertificado)
            return {
                ok: 'Certificado creado existosamente!',
                data: nuevoCertificado,
                id_certificado_nuevo: nuevoCertificado.id_certificado
            }

        } else {

            console.log('Certificado A guardar:', datosCertificado)

            const [actualizacion] = await Certificados.update(datosCertificado, {
                where: {
                    id_Certificado: id
                }
            })

            if (actualizacion === 0) {
                return {
                    ok: "No se realizaron cambios, los datos del Certificado son los mismos!",
                    data: datosCertificado
                }
            }

            return {
                ok: "Certificado actualizado exitosamente!",
                data: datosCertificado
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
            console.error('Error al crear el Certificado:', error)
            throw new Error('Error al crear el Certificado: ' + error.message)
        }
    }
}

/* 
Función para eliminar un certificado de la base de datos:
- Recibe un parámetro id, que es el identificador del certificado a eliminar.
- Intenta buscar el certificado correspondiente utilizando la función findByPk de Sequelize.
- Si no se encuentra el certificado, devuelve un objeto con una propiedad Error indicando que el certificado no fue encontrado.
- Si el certificado existe, llama al método destroy para eliminarlo de la base de datos.
- Devuelve un objeto indicando que la eliminación fue exitosa con un mensaje de confirmación.

En caso de error durante el proceso (por ejemplo, problemas de conexión a la base de datos), captura la excepción y devuelve un objeto con una propiedad Error que contiene un mensaje descriptivo del error.

Esta función está diseñada para manejar la eliminación de certificados, proporcionando mensajes claros sobre el resultado de la operación y gestionando errores de manera efectiva.
*/
const eliminarCertificado = async (id) => {
    try {
        const certificado = await Certificados.findByPk(id)
        if (!certificado) {
            return {
                Error: 'Certificados no encontrado'
            }
        }
        await certificado.destroy()
        return {
            ok: 'Certificados eliminado con Exito!'
        }
    } catch (error) {
        return {
            Error: 'Error al eliminar el Certificados: ' + error.message
        }
    }
}

export {
    obtenerCertificados,
    obteneCertificadoPorId,
    obteneCertificadoPorEmail,
    guardarCertificado,
    eliminarCertificado,
}
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

const obtenerCertificados = async () => {
    try {
        const certificados = await Certificados.findAll()
        return certificados
    } catch (error) {
        throw new Error('Error al obtener los Certificados: ' + error.message)
    }
}

const obteneCertificadoPorId = async (id) => {
    try {
        const Certificado = await Certificados.findByPk(id)
        return Certificado
    } catch (error) {
        throw new Error('Error al obtener el Certificado: ' + error.message)
    }
}

const obteneCertificadoPorEmail = async (email) => {

    try {
        const _certificados = await Certificados.findAll({
            attributes: ['url_certificado'],
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
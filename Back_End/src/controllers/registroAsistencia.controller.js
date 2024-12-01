import {
    obtenerRegistros,
    obtenerRegistrosAsistentes,
    obteneRegistroPorId,
    guardarRegistroAsistencia,
    eliminarRegistroAsistencia,
    verificarExistenciaDeRegistro
} from '../querys/registros.querys.js'
import {
    consultarDni,
    consultarEmail,
    guardarUsuario,
    obtenerUsuarioPorId
} from '../querys/usuarios.querys.js'
import {
    obteneEventoPorId
} from '../querys/eventos.querys.js'
import {
    guardarCertificado
} from '../querys/certificados.querys.js'

import {
    generarHTML_CodigoAleatorio
} from '../lib/generarPlantillaHTML.codigoURL.js'

/* Función asíncrona que maneja la solicitud para obtener la lista de registros de asistencia.
   - Intenta obtener los registros de asistencia mediante la función `obtenerRegistros`.
   - Si tiene éxito, imprime los registros y su longitud en la consola, y devuelve los registros en formato JSON.
   - Si ocurre un error, captura la excepción, muestra el error en la consola y responde con un mensaje de error 500 (internal server error). */

export const registroAsistencia_lista = async (req, res) => {
    try {
        const _obtenerRegistroAsistencia = await obtenerRegistros()
        console.log(_obtenerRegistroAsistencia)
        console.log(_obtenerRegistroAsistencia.length)
        res.json({
            ok: _obtenerRegistroAsistencia
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* Función asíncrona que maneja la solicitud para obtener la lista de usuarios asistentes a un evento específico.
   - Obtiene el `eventoid` desde los parámetros de la URL.
   - Intenta obtener la lista de asistentes mediante la función `obtenerRegistrosAsistentes` utilizando el `eventoid`.
   - Si tiene éxito, imprime los asistentes y su longitud en la consola, y devuelve los asistentes en formato JSON.
   - Si ocurre un error, captura la excepción, muestra el error en la consola y responde con un mensaje de error 500 (internal server error). */

export const listarUsuariosAsistentes = async (req, res) => {
    try {
        const eventoid = req.params.eventoid

        const _listarUsuariosAsistentes = await obtenerRegistrosAsistentes(eventoid)
        console.log(_listarUsuariosAsistentes)
        console.log(_listarUsuariosAsistentes.length)
        res.json(_listarUsuariosAsistentes)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* Función asíncrona que maneja la solicitud para obtener un registro de asistencia específico por su ID.
   - Obtiene el `id` desde los parámetros de la URL.
   - Intenta obtener el registro de asistencia correspondiente mediante la función `obteneRegistroPorId`.
   - Si el registro se encuentra, devuelve el registro en formato JSON con una respuesta exitosa.
   - Si no se encuentra el registro, devuelve un mensaje de error indicando que no se encontró el registro.
   - Si ocurre un error, captura la excepción, muestra el error en la consola y responde con un mensaje de error 500 (internal server error). */

export const registroAsistencia_porid = async (req, res) => {

    try {
        const id = req.params.id
        let A = null

        let _registroAsistenciaPorId = await obteneRegistroPorId(id)
        _registroAsistenciaPorId != null ? A = {
            ok: _registroAsistenciaPorId
        } : A = {
            Error: 'Registro de Asistencia no encontrado!'
        }
        res.json(A)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* Función asíncrona que maneja la solicitud para crear un registro de asistencia para un usuario en un evento.
   - Obtiene el `evento_id` de los parámetros de la URL y los datos del usuario (`nombre_usuario`, `dni_usuario`) del cuerpo de la solicitud.
   - Verifica si el evento existe; si no, responde con un error 404.
   - Comprueba si el usuario ya existe mediante su DNI; si no, crea un nuevo usuario y guarda sus datos.
   - Verifica si el usuario ya está registrado para el evento; si es así, responde con un error 409.
   - Si no hay problemas, guarda el registro de asistencia para el usuario y el evento, y responde con el éxito de la operación.
   - Si ocurre un error en alguna de las etapas, captura la excepción y responde con un error 500 (internal server error). */

export const crear_registroAsistencia = async (req, res) => {

    /* {
  "evento_id" : 7, 
  "usuario_id" : 5,
}
 */


    try {
        const evento_id = req.params.id
        const {
            nombre_usuario,
            dni_usuario
        } = req.body

        const _eventoPorId = await obteneEventoPorId(evento_id)
        if (_eventoPorId == null) {
            return res.status(404).json({
                Error: `Evento: ${evento_id} no encontrado!`
            })
        }

        let usuarioVefi = null

        const existeDNI = await consultarDni(dni_usuario)

        console.log(existeDNI)

        if (existeDNI == null) {
            const UsuarioGuardado = await guardarUsuario(0, req.body)

            if (UsuarioGuardado.ok) {

                usuarioVefi = UsuarioGuardado.id_usuario_nuevo
            }

            if (UsuarioGuardado.Error) {

                return res.status(404).json({
                    Error: 'Error al guardar el Usuario!'
                })
            }

        } else {
            usuarioVefi = existeDNI.id_usuario
        }

        let existenciaDeRegistro = await verificarExistenciaDeRegistro(evento_id, usuarioVefi)
        if (existenciaDeRegistro != null) {
            console.log(`El Usuario: ${nombre_usuario}, ya se encuentra registrado en el Evento: ${_eventoPorId.nombre_evento}!`)
            return res.status(409).json({
                Error: `El Usuario: ${nombre_usuario}, ya se encuentra registrado en el Evento: ${_eventoPorId.nombre_evento}!`
            })
        }

        const asistir = {
            "usuario_id": usuarioVefi,
            "evento_id": evento_id
        }

        const registroAsistenciaGuardado = await guardarRegistroAsistencia(0, asistir)

        if (registroAsistenciaGuardado.ok) {

            return res.status(200).json(registroAsistenciaGuardado)
        }

        if (registroAsistenciaGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Registro de Asistencia!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Esta función maneja la edición de un registro de asistencia a un evento. Primero, verifica si el registro de asistencia existe y si los usuarios y eventos relacionados también existen. Luego, guarda el registro de asistencia actualizado en la base de datos.

Si el registro se guarda correctamente, se genera un certificado para el usuario, lo cual incluye detalles como el nombre del usuario, el evento, la fecha, y la ubicación. Este certificado se guarda en la base de datos con un enlace único generado. Si todo se ejecuta correctamente, se envía una respuesta con los datos del registro y el certificado.

En caso de algún error en cualquiera de las operaciones (como no encontrar el registro, el usuario o el evento, o fallos al guardar el registro o certificado), la función envía una respuesta de error correspondiente con el mensaje adecuado.

Se incluyen múltiples verificaciones y respuestas de error detalladas para cada etapa del proceso, lo cual mejora la claridad y la seguridad del flujo de trabajo.
*/

export const editar_registroAsistencia = async (req, res) => {

    try {
        const id = req.params.id
        const {
            evento_id,
            usuario_id
        } = req.body

        const existeRegistro = await obteneRegistroPorId(id)
        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${id}`
            })
        }

        let _usuarioPorId = await obtenerUsuarioPorId(usuario_id)
        if (_usuarioPorId == null) {
            return res.status(404).json({
                Error: `Usuario: ${usuario_id} no encontrado!`
            })
        }

        let _eventoPorId = await obteneEventoPorId(evento_id)
        if (_eventoPorId == null) {
            return res.status(404).json({
                Error: `Evento: ${evento_id} no encontrado!`
            })
        }


        const _registroAsistenciaGuardado = await guardarRegistroAsistencia(id, req.body)

        if (_registroAsistenciaGuardado.ok && _registroAsistenciaGuardado.asistio) {

            const datosCertificado = {
                nombreCompleto: _usuarioPorId.nombre_usuario,
                nombreEvento: _eventoPorId.nombre_evento,
                fechaEvento: _eventoPorId.fecha_evento,
                lugarEvento: _eventoPorId.ubicacion_evento,
                fechaEmision: new Date().toISOString().split('T')[0],
            }

            const URL_GCA = await generarHTML_CodigoAleatorio(datosCertificado)

            if (!URL_GCA) {
                return res.status(404).json({
                    Error: 'Error Inesperado!!'
                })
            }

            const dataCertificado = {
                "registro_id": id,
                "url_certificado": URL_GCA,
            }
            const CertificadoGuardado = await guardarCertificado(0, dataCertificado)

            if (CertificadoGuardado.ok) {

                return res.status(200).json({
                    ok: {
                        Registro: _registroAsistenciaGuardado,
                        Certificado: CertificadoGuardado
                    }
                })
            }

            if (CertificadoGuardado.Error) {

                return res.status(404).json({
                    Error: 'Error al guardar el Certificado!'
                })
            }

        } else if (_registroAsistenciaGuardado.ok) {

            return res.status(200).json(_registroAsistenciaGuardado)

        }

        if (_registroAsistenciaGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Registro de Asistencia!'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para eliminar un registro de asistencia:
- Recibe el ID del registro a eliminar desde los parámetros de la solicitud (`req.params.id`).
- Llama a la función `eliminarRegistroAsistencia` para ejecutar la eliminación del registro en la base de datos.
- Si la función devuelve un error, responde con un estado HTTP 404 y el mensaje de error correspondiente.
- Si la eliminación es exitosa, responde con un estado HTTP 200 y los detalles del resultado.
- Maneja errores inesperados mediante un bloque `catch`, registrando el error en la consola y devolviendo un estado HTTP 500 con un mensaje de error genérico.

Esta función está diseñada para gestionar la eliminación de registros de asistencia, asegurando un manejo adecuado de errores y respuestas claras al cliente.
*/

export const eliminar_registroAsistencia = async (req, res) => {

    try {
        const id = req.params.id
        const resultado = await eliminarRegistroAsistencia(id)
        if (resultado.Error) {
            return res.status(404).json({
                Error: resultado.Error
            })
        }

        res.status(200).json(resultado)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}
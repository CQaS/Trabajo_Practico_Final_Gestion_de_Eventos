import fs from 'fs'
import path from 'path'
import {
    fileURLToPath
} from 'url'
import {
    obtenerCertificados,
    obteneCertificadoPorId,
    obteneCertificadoPorEmail,
    guardarCertificado,
    eliminarCertificado
} from '../querys/certificados.querys.js'

import {
    obteneRegistroPorId
} from '../querys/registros.querys.js'

/* 
Controlador para listar todos los certificados:
- Llama a la función `obtenerCertificados` para recuperar la lista de certificados desde la base de datos.
- Registra en la consola los certificados obtenidos y la cantidad de elementos en el resultado.
- Si la operación es exitosa, responde con un estado HTTP 200 y un objeto JSON que contiene la lista de certificados en el atributo `ok`.
- Si ocurre un error durante la operación, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje de error genérico.

Este controlador está diseñado para proporcionar un listado completo de los certificados almacenados, con manejo adecuado de errores y registros para depuración.
*/

export const certificados_lista = async (req, res) => {
    try {
        const _obtenerCertificados = await obtenerCertificados()
        console.log(_obtenerCertificados)
        console.log(_obtenerCertificados.length)
        res.json({
            ok: _obtenerCertificados
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para obtener un certificado por su ID:
- Recupera el ID del certificado desde los parámetros de la solicitud (`req.params.id`).
- Llama a la función `obteneCertificadoPorId` para buscar el certificado en la base de datos.
- Si el certificado es encontrado, construye una respuesta con el atributo `ok` que contiene los datos del certificado.
- Si no se encuentra, construye una respuesta con un atributo `Error` indicando que el certificado no fue encontrado.
- Envía la respuesta como un objeto JSON.
- Si ocurre un error inesperado, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje genérico de error.

Este controlador está diseñado para recuperar certificados específicos basados en su ID, asegurando un manejo claro de errores y resultados.
*/

export const certificado_porid = async (req, res) => {

    try {
        const id = req.params.id
        let C = null

        let _certificadoPorId = await obteneCertificadoPorId(id)
        _certificadoPorId != null ? C = {
            ok: _certificadoPorId
        } : C = {
            Error: 'certificado no encontrado!'
        }
        res.json(C)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para obtener certificados por correo electrónico:
- Recupera el correo electrónico desde los parámetros de la solicitud (`req.params.email`).
- Llama a la función `obteneCertificadoPorEmail` para buscar certificados asociados al correo proporcionado.
- Si se encuentran certificados, responde con un estado HTTP 200 y los datos de los certificados como un objeto JSON.
- Si no se encuentran certificados, responde con un estado HTTP 401 y un mensaje JSON indicando "Sin Certificados".
- En caso de error inesperado, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje genérico de error.

Este controlador está diseñado para buscar certificados asociados a un correo electrónico específico, manejando tanto resultados vacíos como excepciones inesperadas.
*/

export const certificado_porEmail = async (req, res) => {

    try {
        const email = req.params.email

        let _certificadoPorEmail = await obteneCertificadoPorEmail(email)
        _certificadoPorEmail.length > 0 ? res.status(200).json(_certificadoPorEmail) : res.status(401).json({
            Error: 'Sin Certificaados'
        })


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para obtener un certificado por código:
- Recupera el código desde los parámetros de la solicitud (req.params.codigo).
- Imprime el código en la consola para fines de depuración.
- Determina la ruta del archivo del certificado basado en el código proporcionado, construyendo la ruta correspondiente en el sistema de archivos.
- Lee el archivo HTML del certificado utilizando fs.readFile.
- Si ocurre un error al leer el archivo (por ejemplo, si no existe), registra el error en la consola y responde con un estado HTTP 404 y un mensaje "Certificado no encontrado".
- Si se lee correctamente el archivo, imprime su contenido en la consola y responde con un estado HTTP 200, enviando los datos del certificado.
- En caso de un error inesperado durante la ejecución, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje JSON indicando que algo falló.

Este controlador está diseñado para manejar la recuperación de certificados basados en un código específico, gestionando tanto errores de archivo como excepciones generales.
*/
export const certificado_porCodigo = async (req, res) => {

    try {
        const {
            codigo
        } = req.params

        console.log('codigo', codigo)
        const __filename = fileURLToPath(
            import.meta.url)
        const __dirname = path.dirname(__filename)

        const filePath = path.join(__dirname, `../certificados/certificado_${codigo}.html`)

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error leyendo el archivo:', err)
                return res.status(404).send('Certificado no encontrado')
            }
            console.log('imprimir', data)
            res.status(200).send(data)
        })


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

/* 
Controlador para crear un certificado:
- Espera un cuerpo de solicitud (req.body) que contenga un "registro_id" y una "url_certificado".
- Verifica si el registro de asistencia asociado al "registro_id" existe llamando a la función obteneRegistroPorId.
- Si no se encuentra el registro, responde con un estado HTTP 404 y un mensaje JSON indicando que el registro no existe.
- Si el registro existe, intenta guardar el certificado utilizando la función guardarCertificado, pasando 0 como primer argumento y el cuerpo de la solicitud como segundo.
- Si el certificado se guarda correctamente (indicado por CertificadoGuardado.ok), responde con un estado HTTP 200 y los datos del certificado guardado.
- Si ocurre un error al guardar el certificado (indicado por CertificadoGuardado.Error), responde con un estado HTTP 404 y un mensaje JSON indicando que hubo un error al guardar.
- En caso de un error inesperado durante la ejecución, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje JSON indicando que algo falló.

Este controlador está diseñado para gestionar la creación de certificados, asegurando que solo se creen cuando hay un registro de asistencia válido asociado.
*/
export const crear_certificado = async (req, res) => {

    /* {
  "registro_id": 1,
  "url_certificado": "http://ejemplo.com",
}
 */


    try {
        const {
            registro_id
        } = req.body

        const existeRegistro = await obteneRegistroPorId(registro_id)

        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${registro_id}`
            })
        }

        const CertificadoGuardado = await guardarCertificado(0, req.body)

        if (CertificadoGuardado.ok) {

            return res.status(200).json(CertificadoGuardado)
        }

        if (CertificadoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Certificado!'
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
Controlador para editar un certificado existente:
- Recupera el id del certificado desde los parámetros de la solicitud (req.params.id).
- Extrae el registro_id del cuerpo de la solicitud (req.body).
- Busca el certificado correspondiente al id utilizando la función obteneCertificadoPorId.
- Si no se encuentra el certificado, responde con un estado HTTP 404 y un mensaje JSON indicando que el certificado no fue encontrado.
- Verifica si el registro de asistencia asociado al registro_id existe llamando a la función obteneRegistroPorId.
- Si no se encuentra el registro, responde con un estado HTTP 404 y un mensaje JSON indicando que el registro de asistencia no existe.
- Si ambos, el certificado y el registro, son válidos, intenta guardar los cambios utilizando la función guardarCertificado, pasando el id del certificado y los datos del cuerpo de la solicitud.
- Si la operación de guardado es exitosa (indicado por CertificadoGuardado.ok), responde con un estado HTTP 200 y los datos del certificado guardado.
- Si ocurre un error al guardar (indicado por CertificadoGuardado.Error), responde con un estado HTTP 404 y un mensaje JSON indicando que hubo un error al guardar el certificado.
- En caso de un error inesperado durante la ejecución, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje JSON indicando que algo falló.

Este controlador está diseñado para gestionar la edición de certificados existentes, asegurando que se validen tanto los certificados como los registros de asistencia antes de realizar cualquier cambio.
*/
export const editar_certificado = async (req, res) => {
    try {
        const id = req.params.id
        const {
            registro_id
        } = req.body


        let _certificadoPorId = await obteneCertificadoPorId(id)
        if (_certificadoPorId == null) {
            return res.status(404).json({
                Error: `certificado: ${id} no encontrado!`
            })
        }

        const existeRegistro = await obteneRegistroPorId(registro_id)

        if (existeRegistro == null) {
            return res.status(404).json({
                Error: `Registro de asistencia no existe: ${registro_id}`
            })
        }

        const CertificadoGuardado = await guardarCertificado(id, req.body)

        if (CertificadoGuardado.ok) {

            return res.status(200).json(CertificadoGuardado)
        }

        if (CertificadoGuardado.Error) {

            return res.status(404).json({
                Error: 'Error al guardar el Certificado!'
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
Controlador para eliminar un certificado:
- Recupera el id del certificado a eliminar desde los parámetros de la solicitud (req.params.id).
- Llama a la función eliminarCertificado, pasando el id, para intentar eliminar el certificado correspondiente.
- Si la función de eliminación devuelve un objeto con una propiedad Error, responde con un estado HTTP 404 y un mensaje JSON que contiene el error.
- Si la eliminación es exitosa (sin errores), responde con un estado HTTP 200 y los datos del resultado de la operación.

En caso de un error inesperado durante la ejecución, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje JSON indicando que algo falló.

Este controlador está diseñado para gestionar la eliminación de certificados, proporcionando respuestas claras sobre el estado de la operación y manejando errores de manera efectiva.
*/
export const eliminar_certificado = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await eliminarCertificado(id)
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
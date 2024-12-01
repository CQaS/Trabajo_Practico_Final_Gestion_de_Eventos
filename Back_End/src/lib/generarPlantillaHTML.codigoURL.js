import fs from 'fs'
import path from 'path'
import {
    fileURLToPath
} from 'url'
import {
    plantilla
} from '../template/tem.js'

/* 
Función para generar un código aleatorio:
- Utiliza `Math.random()` para generar un número aleatorio.
- Convierte el número a base 36 (usando `toString(36)`) para obtener una representación alfanumérica.
- Usa `substring(2, 10)` para tomar 8 caracteres a partir del tercer carácter (omitiendo el prefijo '0.' de la representación inicial).

El código generado es un string alfanumérico de 8 caracteres, ideal para crear identificadores únicos ligeros y simples.
*/

const generarCodigoAleatorio = () => {

    return Math.random().toString(36).substring(2, 10)
}

/* 
Función para generar un archivo HTML de certificado con un código aleatorio:
- Genera un código aleatorio utilizando la función `generarCodigoAleatorio`.
- Resuelve la ruta del archivo actual (`__filename`) y del directorio (`__dirname`) para construir la ruta donde se guardará el archivo HTML del certificado.
- Usa la función `fs.writeFile` para crear y escribir el contenido HTML del certificado en un archivo, utilizando una plantilla generada con los datos proporcionados.
- Si ocurre un error al escribir el archivo, se registra en la consola y se asigna `null` al código generado.
- Retorna el código generado o `null` si hubo algún fallo durante el proceso.
- Captura errores inesperados en el bloque `catch` y también devuelve `null` en caso de fallo.

Esta función está diseñada para generar certificados personalizados y almacenarlos en el sistema de archivos, asegurando el manejo adecuado de errores durante el proceso.
*/

export const generarHTML_CodigoAleatorio = async (datos) => {

    let codigo = ''

    try {

        codigo = generarCodigoAleatorio()

        const __filename = fileURLToPath(
            import.meta.url)
        const __dirname = path.dirname(__filename)

        const pathCertificadoHTML = path.join(__dirname, `../certificados/certificado_${codigo}.html`)

        fs.writeFile(pathCertificadoHTML, plantilla(datos), 'utf8', (err) => {

            if (err) {

                console.error('Error al escribir en el archivo:', err)
                codigo = null
            }
        })

        return codigo

    } catch (error) {

        console.error('Error al generar el certificado:', error)
        return codigo = null
    }
}
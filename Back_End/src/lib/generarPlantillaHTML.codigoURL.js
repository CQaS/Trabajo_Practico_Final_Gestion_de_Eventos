import fs from 'fs'
import path from 'path'
import {
    fileURLToPath
} from 'url'
import {
    plantilla
} from '../template/tem.js'

const generarCodigoAleatorio = () => {

    return Math.random().toString(36).substring(2, 10)
}

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
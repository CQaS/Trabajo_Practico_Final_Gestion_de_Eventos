import fs from 'fs'
import path from 'path'
import pdf from 'html-pdf-node'
import puppeteer from 'puppeteer'
import {
    fileURLToPath
} from 'url'

const generarCodigoAleatorio = () => {

    return Math.random().toString(36).substring(2, 10)
}

export const generarHTML_CodigoAleatorio = async (datos) => {

    const {
        nombreCompleto,
        nombreEvento,
        fechaEvento,
        lugarEvento,
        fechaEmision
    } = datos

    let codigo = ''

    try {

        codigo = generarCodigoAleatorio()

        /* let html = fs.readFileSync('./src/template/tem.html', 'utf-8')
        html = html
            .replace('{{nombreCompleto}}', nombreCompleto)
            .replace('{{nombreEvento}}', nombreEvento)
            .replace('{{fechaEvento}}', fechaEvento)
            .replace('{{lugarEvento}}', lugarEvento)
            .replace('{{fechaEmision}}', fechaEmision)

        const __filename = fileURLToPath(
            import.meta.url)
        const __dirname = path.dirname(__filename)

        const filePath = path.join(__dirname, 'certificados', `${codigo}.pdf`)

        const options = {
            format: 'A4',
            printBackground: true,
            browser: puppeteer,
        };
        const file = {
            content: html
        }

        await pdf.generatePdf(file, options).then((buffer) => {
            fs.writeFileSync(filePath, buffer)
            console.log(`Certificado guardado: ${filePath}`)
        }) */

        return codigo

    } catch (error) {

        console.error('Error al generar el certificado:', error)
        return codigo = null
    }
}
import app from "./app.js"
import {
    PORT
} from './config.js'

/* 
Inicia el servidor en el puerto especificado y muestra un mensaje en la consola 
indicando la URL donde está corriendo el servidor.
*/
app.listen(PORT, () => {
    console.log(`server http://localhost:${PORT}`)
})
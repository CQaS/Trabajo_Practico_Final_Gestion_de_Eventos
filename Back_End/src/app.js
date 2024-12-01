import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routers/index.js'
import bodyParser from 'body-parser'
import {
    SECRET_KEY
} from './config.js'

const app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))

app.use(bodyParser.json())

/* 
Recorre todas las rutas definidas en el arreglo "routes" y las registra en la aplicación.
Cada ruta se compone de un "path" y un "router".
Se añade el prefijo "/api" a cada "path" antes de asignar el router correspondiente.
*/
routes.forEach(({
    path,
    router
}) => {
    app.use('/api' + path, router)
})

/* 
Middleware para manejar rutas no encontradas.
Si ninguna ruta definida coincide con la solicitud, responde con un error 404 
y un mensaje en formato JSON indicando que la ruta no fue encontrada.
*/
app.use((req, res, next) => {
    res.status(404).json({
        Error: 'Ruta no encontrada'
    })
})

export default app
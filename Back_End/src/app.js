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

const corsOptions = {
    origin: ['http://127.0.0.1:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
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

routes.forEach(({
    path,
    router
}) => {
    app.use('/api' + path, router)
})

// Middleware para manejar rutas no existentes
app.use((req, res, next) => {
    res.status(404).json({
        Error: 'Ruta no encontrada'
    })
})

export default app
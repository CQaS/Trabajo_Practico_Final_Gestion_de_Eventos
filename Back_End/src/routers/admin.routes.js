import {
    Router
} from "express"
import {
    login,
    logout
} from "../controllers/admin.controller.js"
import {
    validarSchemmaGenerico
} from "../middlewares/validarSchema.middleware.js"
import {
    adminSchema
} from "../schemas/admin.schema.js"

const routesAdmin = Router()


routesAdmin.post('/login', validarSchemmaGenerico(adminSchema), login)
routesAdmin.post('/logout', logout)

export default routesAdmin
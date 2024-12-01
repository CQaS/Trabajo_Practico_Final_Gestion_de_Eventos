import jwt from 'jsonwebtoken'
import {
    SECRET_KEY
} from '../config.js'
import Invalid_tokens from '../models/invalid_tokens.models.js'

/* 
Middleware para verificar la autenticidad del usuario mediante un token JWT en la cabecera "Authorization".
- Se comprueba si el token está presente y tiene el formato correcto ("Bearer <token>").
- Si el token está presente, se verifica que no esté en la lista de tokens inválidos.
- Se valida el token usando `jwt.verify` y la clave secreta.
- Si el token es válido, se llama a `next()` para continuar con la solicitud.
- Si el token no es válido o falta, se responde con un error 401 y un mensaje adecuado.

Este middleware asegura que solo los usuarios autenticados puedan acceder a las rutas protegidas.
*/

export const esAutentico = async (req, res, next) => {

    const headerToken = req.headers['authorization']
    console.log(req.headers)


    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.split(' ')[1]

            if (!bearerToken) {
                return res.status(401).json({
                    Error: 'Token inválido'
                })
            }

            const result = await Invalid_tokens.findOne({
                where: {
                    token: bearerToken
                }
            })

            if (result !== null) {
                return res.status(401).json({
                    Error: 'Token inválido'
                })
            }

            jwt.verify(bearerToken, SECRET_KEY || 'und7dj383902hd')
            next()

        } catch (error) {
            console.log('esAutentico => 40', error)
            res.status(401).json({
                Error: 'token no valido'
            })
        }

    } else {
        res.status(401).json({
            Error: 'Acceso denegado'
        })
    }
}
import jwt from 'jsonwebtoken'
import {
    SECRET_KEY
} from '../config.js'
import Invalid_tokens from '../models/invalid_tokens.models.js'

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
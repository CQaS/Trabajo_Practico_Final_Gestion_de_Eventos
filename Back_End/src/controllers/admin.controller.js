import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    SECRET_KEY
} from '../config.js'
import Invalid_tokens from '../models/invalid_tokens.models.js'
import {
    CheckLimitInvalidTokens
} from '../lib/checkLomitInvalidTokens.js'

const users = [{
        username: 'admin',
        password: '$2a$10$z3X8C.j3NiyIPSrkem1j7eRRkBfpAdX4t4ZWeK31Nw/ZawrsTRv3G'
    },
    {
        username: 'user1',
        password: '$2a$10$rCJ2GTJspGnJ84uS2zRohOf2mtZYSxYqaU9BuXZssKR2uD7GMp/26'
    },
    {
        username: 'user2',
        password: '$2a$10$lvyvNwwpgB8GHPF3oGphu.nVt8.UShCmurTLmaiAZWx5Hy855kMSS'
    }
]

export const login = async (req, res) => {
    try {

        const {
            username,
            password
        } = req.body

        const user = users.find(
            (u) => u.username === username
        )

        if (!user) {

            return res.status(401).json({
                Error: 'Usuario o contraseña incorrectos'
            })
        }

        const passwordHash = await bcrypt.compare(password, user.password)
        if (!passwordHash) {

            return res.status(401).json({
                Error: 'Usuario o contraseña incorrectos'
            })
        }

        const token = jwt.sign({
            user,
        }, SECRET_KEY || 'und7dj383902hd')

        res.header('Authorization', `Bearer ${token}`)

        res.json({
            token
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const logout = async (req, res) => {

    const headerToken = req.headers['authorization']
    console.log(req.headers)


    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.split(' ')[1]
            if (!bearerToken) {
                return res.status(401).json({
                    Error: 'Algo Fallo, null Token'
                })
            }

            await Invalid_tokens.create({
                token: bearerToken
            });
            console.log('Token invalidado correctamente')

            await CheckLimitInvalidTokens()

            res.status(200).json({
                ok: 'Session finalizado correctamente!'
            })

        } catch (error) {

            console.log(error)
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
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

/* 
Controlador para manejar el inicio de sesión de un usuario:
- Extrae el nombre de usuario (username) y la contraseña (password) del cuerpo de la solicitud (req.body).
- Busca el usuario correspondiente en la lista de usuarios (users) utilizando el nombre de usuario.
- Si no se encuentra el usuario, responde con un estado HTTP 401 y un mensaje JSON indicando que el usuario o la contraseña son incorrectos.
- Si se encuentra el usuario, utiliza bcrypt para comparar la contraseña proporcionada con la contraseña almacenada (hash) del usuario.
- Si la comparación falla, responde nuevamente con un estado HTTP 401 y un mensaje JSON indicando que el usuario o la contraseña son incorrectos.
- Si las credenciales son válidas, genera un token JWT utilizando jwt.sign, incluyendo los datos del usuario y una clave secreta (SECRET_KEY o una clave por defecto).
- Establece el token en el encabezado de respuesta 'Authorization' con el formato 'Bearer {token}'.
- Responde con un objeto JSON que contiene el token generado.

En caso de un error inesperado durante la ejecución, captura la excepción, registra el error en la consola y responde con un estado HTTP 500 y un mensaje JSON indicando que algo falló.

Este controlador está diseñado para gestionar la autenticación de usuarios, proporcionando un mecanismo seguro para iniciar sesión y generando tokens JWT para sesiones autenticadas.
*/
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

/* 
Controlador para manejar el cierre de sesión de un usuario:
- Recupera el token de autorización del encabezado de la solicitud (req.headers['authorization']) y lo imprime en la consola para depuración.
- Verifica si el encabezado contiene un token y si comienza con 'Bearer ':
  - Si el token es válido, intenta procesar la invalidación del token.
  - Extrae el token del encabezado dividiendo la cadena y obteniendo la segunda parte.
  - Si no se encuentra un token después de la división, responde con un estado HTTP 401 y un mensaje JSON indicando que hubo un problema (null Token).
  - Si se encuentra un token, lo guarda en la base de datos de tokens inválidos utilizando Invalid_tokens.create.
  - Imprime un mensaje en la consola indicando que el token fue invalidado correctamente.
  - Llama a la función CheckLimitInvalidTokens para realizar cualquier verificación adicional relacionada con los límites de tokens inválidos.
  - Responde con un estado HTTP 200 y un mensaje JSON indicando que la sesión se ha finalizado correctamente.
- Si ocurre algún error durante este proceso, captura la excepción, imprime el error en la consola y responde con un estado HTTP 401 y un mensaje JSON indicando que el token no es válido.
- Si no se encuentra un token en el encabezado de autorización, responde con un estado HTTP 401 y un mensaje JSON indicando que el acceso ha sido denegado.

Este controlador está diseñado para gestionar el cierre de sesión, asegurando que los tokens sean invalidados correctamente y proporcionando respuestas claras sobre el estado de la operación.
*/
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
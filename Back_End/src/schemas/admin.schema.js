import {
    z
} from 'zod'
import {
    usernamePattern
} from '../config.js'

export const adminSchema = z.object({

    username: z
        .string()
        .min(2, {
            message: 'El Username debe tener al menos 2 caracteres.'
        })
        .regex(usernamePattern, {
            message: 'El Username solo puede contener letras.'
        }),

    password: z
        .string()
        .min(2, {
            message: 'El Password debe tener al menos 2 caracteres.'
        })
        .regex(usernamePattern, {
            message: 'El Password solo puede contener letras.'
        }),
})
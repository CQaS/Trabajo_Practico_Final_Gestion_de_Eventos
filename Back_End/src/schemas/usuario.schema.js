import {
    z
} from 'zod'
import {
    pattern_Nombre,
    pattern_soloNumeros
} from '../config.js'

export const usuarioSchema = z.object({

    nombre_usuario: z
        .string()
        .min(2, {
            message: 'El nombre debe tener al menos 2 caracteres.'
        })
        .max(100, {
            message: 'El nombre no puede exceder los 100 caracteres.'
        })
        .regex(pattern_Nombre, {
            message: 'El nombre solo puede contener letras y espacios.'
        }),

    email_usuario: z
        .string()
        .email({
            message: 'Debe ser un correo electrónico válido.'
        }),

    telefono_usuario: z
        .number()
        .int()
        .max(9999999999, {
            message: "El teléfono no puede exceder 10 dígitos"
        }),

    direccion_usuario: z
        .string()
        .max(255, {
            message: 'La dirección no puede exceder los 255 caracteres.'
        }),

    sexo_usuario: z
        .enum(['M', 'F', 'O'], {
            message: 'El sexo debe ser M (Masculino), F (Femenino) o O (Otro).'
        }),

    dni_usuario: z
        .string()
        .regex(pattern_soloNumeros, {
            message: 'El DNI debe contener entre 7 y 8 dígitos.'
        }),
})
import {
    z
} from 'zod';

export const organizadorSchema = z.object({
    nombre: z
        .string()
        .min(2, {
            message: 'El nombre debe tener al menos 2 caracteres.'
        })
        .max(100, {
            message: 'El nombre no puede exceder los 100 caracteres.'
        }),

    email: z
        .string()
        .email({
            message: 'Debe ser un correo electrónico válido.'
        }),

    telefono: z
        .string()
        .regex(/^\+?\d{7,15}$/, {
            message: 'El teléfono debe tener entre 7 y 15 dígitos y puede incluir un prefijo internacional.'
        }),

    tipo: z
        .enum(['Persona', 'Empresa'], {
            message: 'El tipo debe ser Persona o Empresa.'
        }),

    direccion: z
        .string()
        .max(255, {
            message: 'La dirección no puede exceder los 255 caracteres.'
        })
        .optional(),
})
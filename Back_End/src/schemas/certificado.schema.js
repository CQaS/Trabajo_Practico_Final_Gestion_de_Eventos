import {
    z
} from 'zod';

export const certificadoSchema = z.object({
    registro_id: z
        .number({
            message: 'El ID del registro de asistencia debe ser un número.'
        })
        .int({
            message: 'El ID del registro de asistencia debe ser un entero.'
        }),

    url_certificado: z
        .string()
        .url({
            message: 'La URL del certificado debe ser una dirección web válida.'
        }),

    fecha_emision: z
        .string()
        .optional()
        .or(z.literal(''))
        .refine((value) => !isNaN(Date.parse(value)), {
            message: 'Fecha de emision debe ser una fecha válida.'
        }),
})
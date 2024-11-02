import {
    z
} from 'zod';

export const eventoSchema = z.object({
    nombre_evento: z
        .string()
        .min(2, {
            message: 'El nombre del evento debe tener al menos 2 caracteres.'
        })
        .max(100, {
            message: 'El nombre del evento no puede exceder los 100 caracteres.'
        }),

    fecha_evento: z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), {
            message: 'Debe ser una fecha válida.'
        }),

    ubicacion_evento: z
        .string()
        .min(5, {
            message: 'La ubicación debe tener al menos 5 caracteres.'
        })
        .max(255, {
            message: 'La ubicación no puede exceder los 255 caracteres.'
        }),

    descripcion_evento: z
        .string()
        .max(500, {
            message: 'La descripción no puede exceder los 500 caracteres.'
        })
        .optional(),

    organizador_id: z
        .number({
            message: 'El ID del organizador debe ser un número.'
        })
        .int({
            message: 'El ID del organizador debe ser un entero.'
        }),
})
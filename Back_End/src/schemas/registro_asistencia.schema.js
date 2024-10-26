import {
    z
} from 'zod';

export const registroAsistenciaSchema = z.object({
    usuario_id: z
        .number({
            message: 'El ID del usuario debe ser un número.'
        })
        .int({
            message: 'El ID del usuario debe ser un entero.'
        }),

    evento_id: z
        .number({
            message: 'El ID del evento debe ser un número.'
        })
        .int({
            message: 'El ID del evento debe ser un entero.'
        }),

    asistio: z
        .boolean()
        .default(false),
})
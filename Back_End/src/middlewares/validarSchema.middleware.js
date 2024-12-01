/* 
Middleware para validar un cuerpo de solicitud contra un esquema genérico utilizando Zod:
- Recibe un esquema de validación (`schema`) y lo aplica al cuerpo de la solicitud (`req.body`).
- Si la validación es exitosa, se llama a `next()` para pasar al siguiente middleware o controlador.
- Si la validación falla, captura el error, mapea los mensajes de error y las rutas, y los registra en la consola.
- Luego, responde con un código de estado 400 y un objeto JSON que detalla los errores de validación (campos requeridos y mensajes asociados).

Este middleware asegura que el cuerpo de la solicitud cumpla con el esquema esperado antes de continuar con el procesamiento.
*/

export const validarSchemmaGenerico = (schema) => (req, res, next) => {
    try {
        console.log(req.body)
        schema.parse(req.body)
        next()
    } catch (e) {
        console.log('Error parsing schema')
        console.log(e.errors.map((ERR) => ERR.message))
        console.log(e.errors.map((ERR) => ERR.path))

        const requeridos = {}
        e.errors.forEach((ERR) => {
            console.log('schemma ERROR:', ERR.message)
            const campos = ERR.path[0]
            requeridos[`Es requerido => ${campos}`] = `${ERR.message}!`
        })
        const jsonResult = JSON.stringify(requeridos, null, 2)

        console.log(jsonResult)
        return res.status(400).json(requeridos)
    }
}
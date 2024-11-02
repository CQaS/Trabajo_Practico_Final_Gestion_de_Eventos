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
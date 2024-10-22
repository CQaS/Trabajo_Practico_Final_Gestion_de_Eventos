export const validarSchemmaGenerico = (schema) => (req, res, next) => {
    try {
        console.log(req.body)
        schema.parse(req.body)
        next()
    } catch (e) {
        console.log(e.errors.map((ERR) => ERR.message))
        return res.status(400).json(e.errors.map((ERR) => ERR.message))
    }
}
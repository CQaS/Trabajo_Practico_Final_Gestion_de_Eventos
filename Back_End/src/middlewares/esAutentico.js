export const esAutentico = (req, res, next) => {

    if (req.session.user) {
        return next()
    }
    return res.status(403).json({
        Error: 'No estás autorizado a realizar esta acción'
    })
}
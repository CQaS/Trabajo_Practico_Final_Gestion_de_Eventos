const users = [{
        username: 'admin',
        password: 'password'
    },
    {
        username: 'user1',
        password: '123456'
    },
    {
        username: 'user2',
        password: 'qwerty'
    }
]

export const login = (req, res) => {
    try {

        const {
            username,
            password
        } = req.body

        const user = users.find(
            (u) => u.username === username && u.password === password
        )

        if (user) {

            req.session.user = {
                username: user.username
            }

            return res.status(200).json({
                ok: 'Inicio de sesión exitoso'
            })

        } else {

            return res.status(401).json({
                error: 'Usuario o contraseña incorrectos'
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            Error: 'Algo fallo'
        })

    }
}

export const logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).json({
                error: 'Error al cerrar sesión'
            })
        }
        res.clearCookie('connect.sid')
        return res.status(200).json({
            ok: 'Cierre de sesión exitoso'
        })
    })
}